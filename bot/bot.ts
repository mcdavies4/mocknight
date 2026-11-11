import { Bot, Context, InlineKeyboard, type Api } from "grammy";
import { env } from "@/lib/env";
import { db, must } from "@/lib/supabase";
import { getStudentByTelegram, isPremium, updateStudent, upsertStudent } from "@/lib/students";
import { EXAM_RULES, STATES, subjectName } from "@/lib/subjects";
import { formatHour, formatWat, nextSundayWat, watToUtc } from "@/lib/time";
import { getOrCreateTodaySession, recordDrillAnswer, sendCurrentQuestion, streakDays } from "@/lib/drill";
import { getLatestFinishedWeeklyMock, getOpenWeeklyMock, WEEKLY } from "@/lib/mock";
import { createCheckout } from "@/lib/paystack";
import { createGroup, getGroupByCode, groupsOwnedBy, joinGroup, joinLink, memberCount } from "@/lib/groups";
import { signToken } from "@/lib/auth";
import { naira, PLANS, SEAT_PRICE_KOBO, FREE_DAILY_QUESTIONS, PREMIUM_DAILY_QUESTIONS } from "@/lib/pricing";
import type { Exam, Student } from "@/lib/types";
import { examKb, menuKb, statesKb, subjectsKb, timeKb } from "./keyboards";

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
  const chat = s.telegram_id;
  switch (s.onboarding_step) {
    case "exam":
      return api.sendMessage(chat, "Which exam are you preparing for?", { reply_markup: examKb() });
    case "subjects":
      return api.sendMessage(chat, subjectsText(s), { reply_markup: subjectsKb(s) });
    case "state":
      return api.sendMessage(chat, "Which state are you in? (for the state leaderboard)", { reply_markup: statesKb() });
    case "school":
      return api.sendMessage(chat, "What's the name of your school? Type it below, or send /skip.");
    case "time":
      return api.sendMessage(chat, "What time should your daily drill arrive? (Nigeria time)", { reply_markup: timeKb() });
    default:
      return api.sendMessage(chat, "What would you like to do?", { reply_markup: menuKb() });
  }
}

function subjectsText(s: Student) {
  const rules = EXAM_RULES[s.exam ?? "JAMB"];
  return `Pick your ${s.exam} subjects.\n${rules.note}.\n\nTap to select, then tap Done.`;
}

async function welcome(api: Api, s: Student) {
  const premium = await isPremium(s);
  const text = [
    `You're set, ${s.first_name ?? "champ"} 🎯`,
    "",
    `📝 *Daily drill* at ${formatHour(s.drill_hour)}: ${premium ? PREMIUM_DAILY_QUESTIONS : FREE_DAILY_QUESTIONS} questions in your subjects. Questions you miss come back until you get them right.`,
    `🏆 *Mock Night* every Sunday ${formatHour(WEEKLY.startHour)}: everyone in Nigeria sits the same timed CBT. Leaderboard Monday morning.`,
    `🖥 *Practice CBT*: a real exam-style screen with timer and calculator.`,
    "",
    "Want to do your first drill now?",
  ].join("\n");
  return api.sendMessage(s.telegram_id, text, { parse_mode: "Markdown", reply_markup: menuKb() });
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
      return api.sendMessage(s.telegram_id, "No questions available for your subjects yet — check back soon.");
    }
    throw e;
  }
  if (session.finished_at) {
    return api.sendMessage(
      s.telegram_id,
      `You've done today's drill: ${session.correct}/${session.question_ids.length} ✅\nCome back tomorrow, or sharpen up with a practice CBT.`,
      { reply_markup: new InlineKeyboard().webApp("🖥 Practice CBT", `${env.appUrl}/mock`) },
    );
  }
  // Void any previously-sent unanswered message so old polls can't double-advance
  await db().from("drill_messages").update({ answered: true }).eq("session_id", session.id).eq("answered", false);
  if (session.position === 0) {
    await api.sendMessage(
      s.telegram_id,
      `Today's drill: ${session.question_ids.length} questions${session.review_count ? ` (${session.review_count} from your review box 🔁)` : ""}. Go!`,
    );
  }
  return sendCurrentQuestion(api, s, session);
}

async function afterAnswer(api: Api, s: Student, explanation: string | null, showFullExplanation: boolean) {
  if (showFullExplanation && explanation && explanation.length > 200) {
    await api.sendMessage(s.telegram_id, `💡 ${explanation}`);
  }
}

// ---------------------------------------------------------------------------
// Stats / Mock Night / Leaderboard
// ---------------------------------------------------------------------------
async function sendStats(api: Api, s: Student) {
  const since = new Date(Date.now() - 7 * 86400_000).toISOString();
  const rows = must(
    await db().from("attempts").select("correct, questions(subject_code)").eq("student_id", s.id).gte("created_at", since),
    "stats",
  ) as any[];
  const per = new Map<string, { c: number; t: number }>();
  for (const r of rows) {
    const q = Array.isArray(r.questions) ? r.questions[0] : r.questions;
    const k = q?.subject_code ?? "?";
    const p = per.get(k) ?? { c: 0, t: 0 };
    p.t++;
    if (r.correct) p.c++;
    per.set(k, p);
  }
  const { count: allTime } = await db().from("attempts").select("*", { count: "exact", head: true }).eq("student_id", s.id);
  const { count: reviewBox } = await db().from("review_items").select("*", { count: "exact", head: true }).eq("student_id", s.id);
  const streak = await streakDays(s.id);
  const { data: lastMock } = await db()
    .from("mock_attempts")
    .select("scaled_score, submitted_at, mocks!inner(kind)")
    .eq("student_id", s.id)
    .eq("mocks.kind", "weekly")
    .not("submitted_at", "is", null)
    .order("submitted_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  const premium = await isPremium(s);

  const subjectLines = [...per.entries()]
    .sort((a, b) => a[1].c / a[1].t - b[1].c / b[1].t)
    .map(([code, p]) => {
      const pct = Math.round((p.c / p.t) * 100);
      const bar = "▓".repeat(Math.round(pct / 10)) + "░".repeat(10 - Math.round(pct / 10));
      return `${subjectName(code).padEnd(12)} ${bar} ${pct}% (${p.t})`;
    });

  const text = [
    `📊 *Your stats*`,
    `🔥 Streak: ${streak} day${streak === 1 ? "" : "s"}`,
    `✍️ Questions answered: ${allTime ?? 0}`,
    `🔁 In review box: ${reviewBox ?? 0}`,
    lastMock ? `🏆 Last Mock Night: ${Number(lastMock.scaled_score).toFixed(0)}% (≈${Math.round((Number(lastMock.scaled_score) / 100) * 400)}/400)` : `🏆 Mock Night: not taken yet`,
    `⭐ Plan: ${premium ? "Premium" : "Free"}`,
    "",
    subjectLines.length ? "*Last 7 days* (weakest first)\n```\n" + subjectLines.join("\n") + "\n```" : "_No answers in the last 7 days yet._",
  ].join("\n");
  return api.sendMessage(s.telegram_id, text, { parse_mode: "Markdown", reply_markup: menuKb() });
}

async function sendMockNightInfo(api: Api, s: Student) {
  const open = await getOpenWeeklyMock();
  if (open) {
    return api.sendMessage(
      s.telegram_id,
      `🔴 *Mock Night is LIVE*\n${WEEKLY.minutes} minutes, ${WEEKLY.perSubject} questions per subject. Doors close ${formatWat(open.ends_at!)}.`,
      { parse_mode: "Markdown", reply_markup: new InlineKeyboard().webApp("Start Mock Night ▶️", `${env.appUrl}/mock?mock=${open.id}`) },
    );
  }
  const next = watToUtc(nextSundayWat(), WEEKLY.startHour);
  const when = next.getTime() < Date.now() ? watToUtc(nextSundayWat(new Date(Date.now() + 86400_000)), WEEKLY.startHour) : next;
  return api.sendMessage(
    s.telegram_id,
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
  const kb = new InlineKeyboard()
    .text(`${PLANS.student_month.label} · ${naira(PLANS.student_month.amountKobo)}`, "pay:student_month")
    .row()
    .text(`${PLANS.student_season.label} · ${naira(PLANS.student_season.amountKobo)}`, "pay:student_season");
  return api.sendMessage(
    s.telegram_id,
    [
      premium && s.premium_until ? `⭐ You're Premium until ${formatWat(s.premium_until)}.\n` : "",
      "*Premium*",
      `• ${PREMIUM_DAILY_QUESTIONS} drill questions a day (free: ${FREE_DAILY_QUESTIONS})`,
      "• Unlimited practice CBT mocks (free: 1 a week)",
      "• Mock Night stays free for everyone",
      "",
      "Pay with card, transfer or USSD via Paystack. A parent can pay — just forward them the link.",
    ].join("\n"),
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
        `Welcome to *Mock Night* 👋\n\nDaily JAMB & WAEC drills on Telegram, a real CBT practice screen, and a nationwide mock every Sunday night.\n\nLet's set you up — takes 30 seconds.`,
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
      ? ctx.reply("Open the practice CBT 👇 (timer, question map and calculator — just like the exam hall)", {
          reply_markup: new InlineKeyboard().webApp("🖥 Start practice CBT", `${env.appUrl}/mock`),
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
    isPrivate(ctx) ? ctx.reply("When should your daily drill arrive? (Nigeria time)", { reply_markup: timeKb() }) : undefined,
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
  bot.callbackQuery(/^ob:exam:(JAMB|WAEC)$/, async (ctx) => {
    const exam = ctx.match[1] as Exam;
    const s = ctx.student!;
    const rules = EXAM_RULES[exam];
    const keep = s.exam === exam ? s.subjects : [];
    const subjects = [...new Set([...rules.compulsory, ...keep])];
    const u = await updateStudent(s.id, { exam, subjects, onboarding_step: "subjects" });
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(subjectsText(u), { reply_markup: subjectsKb(u) });
  });

  bot.callbackQuery(/^ob:sub:([A-Z]{3})$/, async (ctx) => {
    const code = ctx.match[1];
    const s = ctx.student!;
    const rules = EXAM_RULES[s.exam ?? "JAMB"];
    if (rules.compulsory.includes(code)) return ctx.answerCallbackQuery({ text: `${subjectName(code)} is compulsory for ${s.exam}.` });
    let subjects = s.subjects;
    if (subjects.includes(code)) subjects = subjects.filter((c) => c !== code);
    else {
      if (subjects.length >= rules.max) return ctx.answerCallbackQuery({ text: `${s.exam}: ${rules.note}. Unselect one first.`, show_alert: true });
      subjects = [...subjects, code];
    }
    const u = await updateStudent(s.id, { subjects });
    await ctx.answerCallbackQuery();
    await ctx.editMessageReplyMarkup({ reply_markup: subjectsKb(u) });
  });

  bot.callbackQuery("ob:subdone", async (ctx) => {
    const s = ctx.student!;
    const rules = EXAM_RULES[s.exam ?? "JAMB"];
    if (s.subjects.length < rules.min) return ctx.answerCallbackQuery({ text: `${s.exam}: ${rules.note}.`, show_alert: true });
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(`Subjects: ${s.subjects.map(subjectName).join(", ")} ✅`);
    // Returning users (from /settings) already have a state — skip straight to done
    const u = await updateStudent(s.id, { onboarding_step: s.state ? "done" : "state" });
    if (u.onboarding_step === "done") return ctx.reply("Settings saved ✅", { reply_markup: menuKb() });
    return promptStep(ctx.api, u);
  });

  bot.callbackQuery(/^ob:st:(\d+)$/, async (ctx) => {
    const state = STATES[Number(ctx.match[1])];
    if (!state) return ctx.answerCallbackQuery();
    const u = await updateStudent(ctx.student!.id, { state, onboarding_step: "school" });
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
    return ctx.reply("Tap an option below 👇", { reply_markup: menuKb() });
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
  bot.callbackQuery(/^pay:(student_month|student_season)$/, async (ctx) => {
    await ctx.answerCallbackQuery({ text: "Creating your payment link…" });
    const plan = ctx.match[1] as keyof typeof PLANS;
    const url = await createCheckout(ctx.student!, plan);
    return ctx.reply(`${PLANS[plan].label} — ${naira(PLANS[plan].amountKobo)}\nYou'll get a message here as soon as it's paid.`, {
      reply_markup: new InlineKeyboard().url(`Pay ${naira(PLANS[plan].amountKobo)}`, url),
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
