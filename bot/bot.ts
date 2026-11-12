import { Bot, Context, InlineKeyboard, type Api } from "grammy";
import { env } from "@/lib/env";
import { db, must } from "@/lib/supabase";
import { getStudentByTelegram, isPremium, updateStudent, upsertStudent } from "@/lib/students";
import { STATES, subjectName } from "@/lib/subjects";
import { getTrack, TRACKS, type TrackCode } from "@/lib/tracks";
import { getProgress } from "@/lib/progress";
import { formatHour, formatWat, nextSundayWat, watToUtc } from "@/lib/time";
import { getOrCreateTodaySession, recordDrillAnswer, sendCurrentQuestion, streakDays } from "@/lib/drill";
import { getLatestFinishedWeeklyMock, getOpenWeeklyMock, WEEKLY } from "@/lib/mock";
import { createCheckout } from "@/lib/payments";
import { createGroup, getGroupByCode, groupsOwnedBy, joinGroup, joinLink, memberCount } from "@/lib/groups";
import { signToken } from "@/lib/auth";
import { money, naira, PLANS, SEAT_PRICE_KOBO, FREE_DAILY_QUESTIONS, PREMIUM_DAILY_QUESTIONS } from "@/lib/pricing";
import type { Student } from "@/lib/types";
import { menuKb, statesKb, subjectsKb, timeKb, trackKb } from "./keyboards";

type Ctx = Context & { student?: Student };

const LETTERS = ["A", "B", "C", "D", "E"];
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
const isPrivate = (ctx: Ctx) => ctx.chat?.type === "private";

let bot: Bot<Ctx> | null = null;

export function getBot(): Bot<Ctx> {
  if (bot) return bot;
  bot = new Bot<Ctx>(env.botToken);
  register(bot);
  return bot;
}

// ---------------------------------------------------------------------------
// Onboarding prompts
// ---------------------------------------------------------------------------
async function promptStep(api: Api, s: Student) {
  const chat = s.telegram_id!;
  switch (s.onboarding_step) {
    case "exam":
      return api.sendMessage(chat, "What are you preparing for?", { reply_markup: trackKb() });
    case "subjects":
      return api.sendMessage(chat, subjectsText(s), { reply_markup: subjectsKb(s) });
    case "state":
      return api.sendMessage(chat, "Which state are you in? (for the state leaderboard)", { reply_markup: statesKb() });
    case "school":
      return api.sendMessage(chat, "What's the name of your school? Type it below, or send /skip.");
    case "time":
      return api.sendMessage(chat, `What time should your daily practice arrive? (${s.track === "LUK" ? "UK" : "Nigeria"} time)`, { reply_markup: timeKb() });
    default:
      return api.sendMessage(chat, "What would you like to do?", { reply_markup: menuKb(s) });
  }
}

function subjectsText(s: Student) {
  const t = getTrack(s.track);
  return `Pick your ${t.short} subjects.\n${t.subjectNote}.\n\nTap to select, then tap Done.`;
}

async function welcome(api: Api, s: Student) {
  const premium = await isPremium(s);
  const t = getTrack(s.track);
  const n = premium ? PREMIUM_DAILY_QUESTIONS : FREE_DAILY_QUESTIONS;
  const lines =
    t.code === "LUK"
      ? [
          `You're set, ${s.first_name ?? "friend"} 🇬🇧`,
          "",
          `📝 *Daily practice* at ${formatHour(s.drill_hour)}: ${n} questions from the handbook topics. Anything you miss comes back until you get it right.`,
          `🧪 *Practice tests*: exactly like the real test — ${t.mock.total} questions, ${t.mock.minutes} minutes, ${Math.ceil((t.mock.total! * t.mock.passPct!) / 100)} correct to pass.`,
          `📈 *Readiness score*: aim for 3 passes in a row before you book your £50 test.`,
          "",
          "Want to start now?",
        ]
      : [
          `You're set, ${s.first_name ?? "champ"} 🎯`,
          "",
          `📝 *Daily drill* at ${formatHour(s.drill_hour)}: ${n} questions in your subjects. Questions you miss come back until you get them right.`,
          `🏆 *Mock Night* every Sunday ${formatHour(WEEKLY.startHour)}: everyone in Nigeria sits the same timed CBT. Leaderboard Monday morning.`,
          `🖥 *Practice CBT*: a real exam-style screen with timer and calculator.`,
          "",
          "Want to do your first drill now?",
        ];
  return api.sendMessage(s.telegram_id!, lines.join("\n"), { parse_mode: "Markdown", reply_markup: menuKb(s) });
}

// ---------------------------------------------------------------------------
// Drill
// ---------------------------------------------------------------------------
async function startDrill(api: Api, s: Student) {
  if (s.onboarding_step !== "done") return promptStep(api, s);
  let session;
  try {
    session = await getOrCreateTodaySession(s);
  } catch (e) {
    if ((e as Error).message === "NO_QUESTIONS") {
      return api.sendMessage(s.telegram_id!, "No questions available for your subjects yet — check back soon.");
    }
    throw e;
  }
  if (session.finished_at) {
    return api.sendMessage(
      s.telegram_id!,
      `You've done today's drill: ${session.correct}/${session.question_ids.length} ✅\nCome back tomorrow, or sharpen up with a practice CBT.`,
      { reply_markup: new InlineKeyboard().webApp("🖥 Practice CBT", `${env.appUrl}/mock`) },
    );
  }
  // Void any previously-sent unanswered message so old polls can't double-advance
  await db().from("drill_messages").update({ answered: true }).eq("session_id", session.id).eq("answered", false);
  if (session.position === 0) {
    await api.sendMessage(
      s.telegram_id!,
      `Today's drill: ${session.question_ids.length} questions${session.review_count ? ` (${session.review_count} from your review box 🔁)` : ""}. Go!`,
    );
  }
  return sendCurrentQuestion(api, s, session);
}

async function afterAnswer(api: Api, s: Student, explanation: string | null, showFullExplanation: boolean) {
  if (showFullExplanation && explanation && explanation.length > 200) {
    await api.sendMessage(s.telegram_id!, `💡 ${explanation}`);
  }
}

// ---------------------------------------------------------------------------
// Stats / Mock Night / Leaderboard
// ---------------------------------------------------------------------------
async function sendStats(api: Api, s: Student) {
  const t = getTrack(s.track);
  const p = await getProgress(s);
  const premium = await isPremium(s);
  const subjectLines = p.last7
    .sort((a, b) => a.correct / a.total - b.correct / b.total)
    .map(({ subject, correct, total }) => {
      const pct = Math.round((correct / total) * 100);
      const bar = "▓".repeat(Math.round(pct / 10)) + "░".repeat(10 - Math.round(pct / 10));
      return `${subjectName(subject).padEnd(14)} ${bar} ${pct}% (${total})`;
    });

  const lines = [
    `📊 *Your stats — ${t.short}*`,
    `🔥 Streak: ${p.streak} day${p.streak === 1 ? "" : "s"}`,
    `✍️ Questions answered: ${p.answeredAllTime}`,
    `🔁 In review box: ${p.reviewBox}`,
  ];
  if (t.mock.passPct) {
    lines.push(
      `🧪 Practice tests taken: ${p.practice.taken}${p.practice.lastScores.length ? ` (last: ${p.practice.lastScores.join("%, ")}%)` : ""}`,
      `✅ Passes in a row: ${p.practice.passesInARow ?? 0}`,
      `📈 Readiness: ${p.practice.readiness === null ? "take a practice test to see it" : `${p.practice.readiness}%`}`,
      p.practice.passesInARow !== null && p.practice.passesInARow >= 3 ? "🎉 3+ passes in a row — you're ready to book your test." : "_Aim for 3 passes in a row before booking._",
    );
  } else {
    lines.push(
      p.lastMockNight !== null ? `🏆 Last Mock Night: ${p.lastMockNight.toFixed(0)}% (≈${Math.round((p.lastMockNight / 100) * 400)}/400)` : "🏆 Mock Night: not taken yet",
    );
  }
  lines.push(`⭐ Plan: ${premium ? "Premium" : "Free"}`, "");
  lines.push(subjectLines.length ? "*Last 7 days* (weakest first)\n```\n" + subjectLines.join("\n") + "\n```" : "_No answers in the last 7 days yet._");
  return api.sendMessage(s.telegram_id!, lines.join("\n"), { parse_mode: "Markdown", reply_markup: menuKb(s) });
}

async function sendMockNightInfo(api: Api, s: Student) {
  if (!getTrack(s.track).weeklyMock) {
    return api.sendMessage(s.telegram_id!, "Mock Night is for JAMB and WAEC students. Use 🧪 Practice test for full timed tests.", { reply_markup: menuKb(s) });
  }
  const open = await getOpenWeeklyMock();
  if (open) {
    return api.sendMessage(
      s.telegram_id!,
      `🔴 *Mock Night is LIVE*\n${WEEKLY.minutes} minutes, ${WEEKLY.perSubject} questions per subject. Doors close ${formatWat(open.ends_at!)}.`,
      { parse_mode: "Markdown", reply_markup: new InlineKeyboard().webApp("Start Mock Night ▶️", `${env.appUrl}/mock?mock=${open.id}`) },
    );
  }
  const next = watToUtc(nextSundayWat(), WEEKLY.startHour);
  const when = next.getTime() < Date.now() ? watToUtc(nextSundayWat(new Date(Date.now() + 86400_000)), WEEKLY.startHour) : next;
  return api.sendMessage(
    s.telegram_id!,
    [
      `🏆 *Mock Night* — every Sunday at ${formatHour(WEEKLY.startHour)}`,
      `Next one: *${formatWat(when.toISOString())}*`,
      "",
      `• Same questions for every student in Nigeria`,
      `• ${WEEKLY.minutes} minutes, CBT format, ${WEEKLY.perSubject} questions per subject`,
      `• National + state leaderboard Monday 8am`,
      `• Free for everyone`,
      "",
      `I'll remind you at 6pm on Sunday.`,
    ].join("\n"),
    { parse_mode: "Markdown", reply_markup: new InlineKeyboard().text("📈 Last leaderboard", "lb") },
  );
}

async function sendLeaderboard(api: Api, chatId: number, s?: Student, groupId?: string) {
  const mock = await getLatestFinishedWeeklyMock();
  if (!mock) return api.sendMessage(chatId, "No Mock Night results yet. The first one is this Sunday!");
  const top = must(await db().rpc("mock_leaderboard", { p_mock: mock.id, p_limit: 10, p_group: groupId ?? null }), "lb") as any[];
  const lines = top.map(
    (r) => `${medal(r.rank)} ${r.first_name ?? "Student"}${r.state ? ` (${r.state})` : ""} — ${Number(r.scaled_score).toFixed(0)}%`,
  );
  let mine = "";
  if (s) {
    const ranks = must(await db().rpc("mock_ranks", { p_mock: mock.id }), "ranks") as any[];
    const me = ranks.find((r) => r.student_id === s.id);
    if (me) mine = `\n\nYou: #${me.rank} of ${me.total} nationally · #${me.state_rank} in ${me.state ?? "your state"} · ${Number(me.scaled_score).toFixed(0)}%`;
  }
  return api.sendMessage(chatId, `🏆 *${mock.title}*${groupId ? " — your group" : ""}\n\n${lines.join("\n") || "No entries."}${mine}`, {
    parse_mode: "Markdown",
  });
}

const medal = (rank: number) => (rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : `${rank}.`);

async function sendPremium(api: Api, s: Student) {
  const premium = await isPremium(s);
  const t = getTrack(s.track);
  const kb = new InlineKeyboard();
  for (const code of t.plans) kb.text(`${PLANS[code].label} · ${money(PLANS[code].amount, PLANS[code].currency)}`, `pay:${code}`).row();
  const perks =
    t.subjectMode === "single"
      ? [`• ${PREMIUM_DAILY_QUESTIONS} practice questions a day (free: ${FREE_DAILY_QUESTIONS})`, "• Unlimited full practice tests (free: 1 a week)", "• Readiness score and review of every mistake", "", "Pay securely by card via Stripe."]
      : [`• ${PREMIUM_DAILY_QUESTIONS} drill questions a day (free: ${FREE_DAILY_QUESTIONS})`, "• Unlimited practice CBT mocks (free: 1 a week)", "• Mock Night stays free for everyone", "", "Pay with card, transfer or USSD via Paystack. A parent can pay — just forward them the link."];
  return api.sendMessage(
    s.telegram_id!,
    [premium && s.premium_until ? `⭐ You're Premium until ${formatWat(s.premium_until)}.\n` : "", "*Premium*", ...perks].join("\n"),
    { parse_mode: "Markdown", reply_markup: kb },
  );
}

// ---------------------------------------------------------------------------
// Handlers
// ---------------------------------------------------------------------------
function register(bot: Bot<Ctx>) {
  // Load / create the student for every update from a real user
  bot.use(async (ctx, next) => {
    if (ctx.from && !ctx.from.is_bot) ctx.student = await upsertStudent(ctx.from);
    await next();
  });

  bot.command("start", async (ctx) => {
    const s = ctx.student!;
    if (!isPrivate(ctx)) return ctx.reply(`Message me privately to start: https://t.me/${env.botUsername}`);
    const payload = ctx.match?.trim() ?? "";

    if (payload.startsWith("g_")) {
      const group = await getGroupByCode(payload.slice(2));
      if (group) {
        const res = await joinGroup(s, group);
        await ctx.reply(
          res.already
            ? `You're already in *${group.name}*.`
            : `You've joined *${group.name}* 🎉${res.seat ? "\nYour tutor has given you Premium." : ""}`,
          { parse_mode: "Markdown" },
        );
      } else {
        await ctx.reply("That group link isn't valid any more — ask your tutor for a new one.");
      }
    } else if (s.onboarding_step === "exam") {
      await ctx.reply(
        `Welcome to *Mock Night* 👋\n\nExam practice that lives in Telegram: daily drills, real timed practice tests and progress tracking — for JAMB, WAEC and the Life in the UK test.\n\nLet's set you up — takes 30 seconds.`,
        { parse_mode: "Markdown" },
      );
    }

    if (payload === "mn" && s.onboarding_step === "done") return sendMockNightInfo(ctx.api, s);
    return promptStep(ctx.api, s);
  });

  bot.command("help", (ctx) =>
    ctx.reply(
      [
        "*Students*",
        "/drill — today's drill",
        "/cbt — practice CBT",
        "/mocknight — Sunday Mock Night",
        "/leaderboard — last Mock Night results",
        "/stats — your progress",
        "/premium — upgrade",
        "/settings — exam, subjects, state",
        "/time — change drill time",
        "/join CODE — join your tutor's group",
        "",
        "*Tutors & tutorial centres*",
        "/newgroup Name — create a group with a join link",
        "/mygroups — your groups",
        "/seats N — give N students Premium",
        "/dashboard — see every student's progress",
        "/linkgroup CODE — send in your Telegram group to get weekly results posted there",
      ].join("\n"),
      { parse_mode: "Markdown" },
    ),
  );

  bot.command("drill", (ctx) => (isPrivate(ctx) ? startDrill(ctx.api, ctx.student!) : undefined));
  bot.command("stats", (ctx) => (isPrivate(ctx) ? sendStats(ctx.api, ctx.student!) : undefined));
  bot.command("premium", (ctx) => (isPrivate(ctx) ? sendPremium(ctx.api, ctx.student!) : undefined));
  bot.command("mocknight", (ctx) => (isPrivate(ctx) ? sendMockNightInfo(ctx.api, ctx.student!) : undefined));
  bot.command("cbt", (ctx) =>
    isPrivate(ctx)
      ? ctx.reply("Open a full timed practice test 👇", {
          reply_markup: new InlineKeyboard().webApp("▶️ Start practice test", `${env.appUrl}/mock`),
        })
      : undefined,
  );

  bot.command("leaderboard", async (ctx) => {
    if (isPrivate(ctx)) return sendLeaderboard(ctx.api, ctx.chat.id, ctx.student);
    // In a linked Telegram group: show that tutor group's leaderboard
    const { data: g } = await db().from("tutor_groups").select("id").eq("telegram_chat_id", ctx.chat.id).maybeSingle();
    return sendLeaderboard(ctx.api, ctx.chat.id, undefined, g?.id);
  });

  bot.command("settings", async (ctx) => {
    if (!isPrivate(ctx)) return;
    const s = await updateStudent(ctx.student!.id, { onboarding_step: "exam" });
    return promptStep(ctx.api, s);
  });

  bot.command("time", (ctx) =>
    isPrivate(ctx) ? ctx.reply(`When should your daily practice arrive? (${ctx.student!.track === "LUK" ? "UK" : "Nigeria"} time)`, { reply_markup: timeKb() }) : undefined,
  );

  bot.command("skip", async (ctx) => {
    const s = ctx.student!;
    if (!isPrivate(ctx) || s.onboarding_step !== "school") return;
    const u = await updateStudent(s.id, { onboarding_step: "time" });
    return promptStep(ctx.api, u);
  });

  bot.command("join", async (ctx) => {
    if (!isPrivate(ctx)) return;
    const code = ctx.match?.trim();
    if (!code) return ctx.reply("Send it like this: /join ABC123");
    const group = await getGroupByCode(code);
    if (!group) return ctx.reply("No group with that code. Check with your tutor.");
    const res = await joinGroup(ctx.student!, group);
    return ctx.reply(res.already ? `You're already in ${group.name}.` : `Joined ${group.name} 🎉${res.seat ? " — you have Premium." : ""}`);
  });

  // ---- Tutor commands ------------------------------------------------------
  bot.command("newgroup", async (ctx) => {
    if (!isPrivate(ctx)) return;
    const name = ctx.match?.trim();
    if (!name) return ctx.reply("Give your group a name, e.g.\n/newgroup Excel Tutorials Lugbe");
    const group = await createGroup(ctx.student!, name);
    return ctx.reply(
      [
        `✅ *${group.name}* created. Code: \`${group.join_code}\``,
        "",
        "Share this link with your students — one tap and they're in:",
        joinLink(env.botUsername, group),
        "",
        `• /seats N — give N students Premium (${naira(SEAT_PRICE_KOBO)} per student / 30 days)`,
        "• /dashboard — see who's practising and their scores",
        `• Add me to your Telegram group and send \`/linkgroup ${group.join_code}\` there to get weekly results posted`,
      ].join("\n"),
      { parse_mode: "Markdown", link_preview_options: { is_disabled: true } },
    );
  });

  bot.command("mygroups", async (ctx) => {
    if (!isPrivate(ctx)) return;
    const groups = await groupsOwnedBy(ctx.student!.id);
    if (!groups.length) return ctx.reply("You don't have any groups yet. Create one with /newgroup Name");
    const lines = await Promise.all(
      groups.map(async (g) => {
        const n = await memberCount(g.id);
        const active = g.paid_until && new Date(g.paid_until) > new Date();
        return `*${g.name}* (\`${g.join_code}\`)\n${n} students · ${active ? `${g.paid_seats} Premium seats until ${formatWat(g.paid_until!)}` : "no paid seats"}\n${joinLink(env.botUsername, g)}`;
      }),
    );
    return ctx.reply(lines.join("\n\n"), { parse_mode: "Markdown", link_preview_options: { is_disabled: true } });
  });

  bot.command("seats", async (ctx) => {
    if (!isPrivate(ctx)) return;
    const [nRaw, codeRaw] = (ctx.match ?? "").trim().split(/\s+/);
    const n = Number(nRaw);
    if (!Number.isInteger(n) || n < 1 || n > 1000) return ctx.reply("Send it like this: /seats 30  (or /seats 30 ABC123 if you have several groups)");
    const groups = await groupsOwnedBy(ctx.student!.id);
    const group = codeRaw ? groups.find((g) => g.join_code === codeRaw.toUpperCase()) : groups[0];
    if (!group) return ctx.reply("Create a group first with /newgroup Name");
    const url = await createCheckout(ctx.student!, "seats", { group, seats: n });
    return ctx.reply(`${n} Premium seats for *${group.name}* — ${naira(n * SEAT_PRICE_KOBO)} for 30 days.\nSeats go to your earliest-joined students first.`, {
      parse_mode: "Markdown",
      reply_markup: new InlineKeyboard().url(`Pay ${naira(n * SEAT_PRICE_KOBO)}`, url),
    });
  });

  bot.command("dashboard", async (ctx) => {
    if (!isPrivate(ctx)) return;
    const groups = await groupsOwnedBy(ctx.student!.id);
    if (!groups.length) return ctx.reply("The dashboard is for tutors. Create a group first with /newgroup Name");
    const token = signToken({ sid: ctx.student!.id, exp: Math.floor(Date.now() / 1000) + 3600 });
    return ctx.reply("Your dashboard link (valid for 1 hour, don't share it):", {
      reply_markup: new InlineKeyboard().url("📋 Open dashboard", `${env.appUrl}/dashboard/auth?t=${encodeURIComponent(token)}`),
    });
  });

  bot.command("linkgroup", async (ctx) => {
    if (isPrivate(ctx)) return ctx.reply("Send this command inside your Telegram group (add me to the group first).");
    const code = ctx.match?.trim();
    if (!code) return ctx.reply("Send it like this: /linkgroup ABC123");
    const group = await getGroupByCode(code);
    if (!group || group.owner_student_id !== ctx.student?.id) return ctx.reply("Only the tutor who created that group can link it.");
    await db().from("tutor_groups").update({ telegram_chat_id: ctx.chat.id }).eq("id", group.id);
    return ctx.reply(
      `✅ Linked to *${group.name}*. I'll post your students' Mock Night results here every Monday.\n\nStudents join here: ${joinLink(env.botUsername, group)}`,
      { parse_mode: "Markdown", link_preview_options: { is_disabled: true } },
    );
  });

  // ---- Onboarding callbacks -----------------------------------------------
  bot.callbackQuery(/^ob:track:([A-Z]+)$/, async (ctx) => {
    const code = ctx.match[1] as TrackCode;
    if (!TRACKS[code]) return ctx.answerCallbackQuery();
    const t = TRACKS[code];
    const s = ctx.student!;
    await ctx.answerCallbackQuery();
    if (t.subjectMode === "single") {
      const u = await updateStudent(s.id, { track: code, subjects: t.subjects, onboarding_step: s.drill_hour && s.onboarding_step === "exam" && s.track ? "done" : "time" });
      await ctx.editMessageText(`${t.emoji} ${t.name} ✅`);
      return u.onboarding_step === "done" ? ctx.reply("Settings saved ✅", { reply_markup: menuKb(u) }) : promptStep(ctx.api, u);
    }
    const keep = s.track === code ? s.subjects : [];
    const subjects = [...new Set([...t.compulsory, ...keep.filter((x) => t.subjects.includes(x))])];
    const u = await updateStudent(s.id, { track: code, exam: code === "JAMB" || code === "WAEC" ? code : null, subjects, onboarding_step: "subjects" });
    await ctx.editMessageText(subjectsText(u), { reply_markup: subjectsKb(u) });
  });

  bot.callbackQuery(/^ob:sub:([A-Z]{3})$/, async (ctx) => {
    const code = ctx.match[1];
    const s = ctx.student!;
    const t = getTrack(s.track);
    if (!t.subjects.includes(code)) return ctx.answerCallbackQuery();
    if (t.compulsory.includes(code)) return ctx.answerCallbackQuery({ text: `${subjectName(code)} is compulsory for ${t.short}.` });
    let subjects = s.subjects;
    if (subjects.includes(code)) subjects = subjects.filter((c) => c !== code);
    else {
      if (subjects.length >= t.maxSubjects) return ctx.answerCallbackQuery({ text: `${t.short}: ${t.subjectNote}. Unselect one first.`, show_alert: true });
      subjects = [...subjects, code];
    }
    const u = await updateStudent(s.id, { subjects });
    await ctx.answerCallbackQuery();
    await ctx.editMessageReplyMarkup({ reply_markup: subjectsKb(u) });
  });

  bot.callbackQuery("ob:subdone", async (ctx) => {
    const s = ctx.student!;
    const t = getTrack(s.track);
    if (s.subjects.length < t.minSubjects) return ctx.answerCallbackQuery({ text: `${t.short}: ${t.subjectNote}.`, show_alert: true });
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(`Subjects: ${s.subjects.map(subjectName).join(", ")} ✅`);
    // Returning users (from /settings) already have a state — skip straight to done
    const u = await updateStudent(s.id, { onboarding_step: s.state || !t.askState ? "done" : "state" });
    if (u.onboarding_step === "done") return ctx.reply("Settings saved ✅", { reply_markup: menuKb(u) });
    return promptStep(ctx.api, u);
  });

  bot.callbackQuery(/^ob:st:(\d+)$/, async (ctx) => {
    const state = STATES[Number(ctx.match[1])];
    if (!state) return ctx.answerCallbackQuery();
    const u = await updateStudent(ctx.student!.id, { state, onboarding_step: getTrack(ctx.student!.track).askSchool ? "school" : "time" });
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(`State: ${state} ✅`);
    return promptStep(ctx.api, u);
  });

  bot.callbackQuery(/^ob:t:(\d+)$/, async (ctx) => {
    const hour = Number(ctx.match[1]);
    const s = ctx.student!;
    const finishing = s.onboarding_step === "time";
    const u = await updateStudent(s.id, { drill_hour: hour, ...(finishing ? { onboarding_step: "done" as const } : {}) });
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(`Daily drill time: ${formatHour(hour)} ✅`);
    if (finishing) return welcome(ctx.api, u);
  });

  // School name (free text during onboarding)
  bot.on("message:text", async (ctx, next) => {
    const s = ctx.student!;
    if (!isPrivate(ctx) || ctx.message.text.startsWith("/")) return next();
    if (s.onboarding_step === "school") {
      const u = await updateStudent(s.id, { school: ctx.message.text.trim().slice(0, 80), onboarding_step: "time" });
      return promptStep(ctx.api, u);
    }
    if (s.onboarding_step !== "done") return promptStep(ctx.api, s);
    return ctx.reply("Tap an option below 👇", { reply_markup: menuKb(s) });
  });

  // ---- Menu callbacks -----------------------------------------------------
  bot.callbackQuery("drill:start", async (ctx) => {
    await ctx.answerCallbackQuery();
    return startDrill(ctx.api, ctx.student!);
  });
  bot.callbackQuery("stats", async (ctx) => {
    await ctx.answerCallbackQuery();
    return sendStats(ctx.api, ctx.student!);
  });
  bot.callbackQuery("mn:info", async (ctx) => {
    await ctx.answerCallbackQuery();
    return sendMockNightInfo(ctx.api, ctx.student!);
  });
  bot.callbackQuery("lb", async (ctx) => {
    await ctx.answerCallbackQuery();
    return sendLeaderboard(ctx.api, ctx.chat!.id, ctx.student);
  });
  bot.callbackQuery("settings", async (ctx) => {
    await ctx.answerCallbackQuery();
    const s = await updateStudent(ctx.student!.id, { onboarding_step: "exam" });
    return promptStep(ctx.api, s);
  });
  bot.callbackQuery("pay:menu", async (ctx) => {
    await ctx.answerCallbackQuery();
    return sendPremium(ctx.api, ctx.student!);
  });
  bot.callbackQuery(/^pay:([a-z_]+)$/, async (ctx) => {
    const code = ctx.match[1];
    const plan = PLANS[code];
    if (!plan || !getTrack(ctx.student!.track).plans.includes(code)) return ctx.answerCallbackQuery();
    await ctx.answerCallbackQuery({ text: "Creating your payment link…" });
    const url = await createCheckout(ctx.student!, code, { returnTo: "telegram" });
    const price = money(plan.amount, plan.currency);
    return ctx.reply(`${plan.label} — ${price}\nYou'll get a message here as soon as it's paid.`, {
      reply_markup: new InlineKeyboard().url(`Pay ${price}`, url),
    });
  });

  // ---- Drill answers --------------------------------------------------------
  // Quiz poll answers
  bot.on("poll_answer", async (ctx) => {
    const s = ctx.student ?? (await getStudentByTelegram(ctx.pollAnswer.user!.id));
    if (!s) return;
    const chosen = ctx.pollAnswer.option_ids[0];
    if (chosen === undefined) return;
    const { data: msg } = await db().from("drill_messages").select("id").eq("poll_id", ctx.pollAnswer.poll_id).maybeSingle();
    if (!msg) return;
    const res = await recordDrillAnswer(s, msg.id, chosen);
    if (!res) return;
    await afterAnswer(ctx.api, s, res.question.explanation, true);
    await sleep(700); // let them read Telegram's explanation popup
    await sendCurrentQuestion(ctx.api, s, res.session);
  });

  // Button answers (long questions)
  bot.callbackQuery(/^a:(\d+):(\d)$/, async (ctx) => {
    const s = ctx.student!;
    const res = await recordDrillAnswer(s, Number(ctx.match[1]), Number(ctx.match[2]));
    if (!res) return ctx.answerCallbackQuery({ text: "Already answered." });
    await ctx.answerCallbackQuery({ text: res.correct ? "✅ Correct!" : "❌ Not quite" });
    const q = res.question;
    const verdict = res.correct
      ? `\n\n✅ Correct — ${LETTERS[q.answer_index]}`
      : `\n\n❌ You chose ${LETTERS[Number(ctx.match[2])]}. Answer: ${LETTERS[q.answer_index]}. ${q.options[q.answer_index]}`;
    const base = ctx.callbackQuery.message && "text" in ctx.callbackQuery.message ? ctx.callbackQuery.message.text ?? "" : "";
    await ctx.editMessageText((base + verdict + (q.explanation ? `\n💡 ${q.explanation}` : "")).slice(0, 4096));
    await sendCurrentQuestion(ctx.api, s, res.session);
  });

  // Mark users who block the bot
  bot.on("my_chat_member", async (ctx) => {
    if (ctx.chat.type === "private" && ctx.myChatMember.new_chat_member.status === "kicked" && ctx.student) {
      await db().from("students").update({ blocked: true }).eq("id", ctx.student.id);
    }
  });

  bot.catch((err) => {
    console.error("bot error", err.error);
  });
}
