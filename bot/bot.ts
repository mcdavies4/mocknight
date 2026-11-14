import { Bot, Context, InlineKeyboard, type Api } from "grammy";
import { env } from "@/lib/env";
import { db, must } from "@/lib/supabase";
import { accessKind, getStudentByTelegram, isFounder, isPremium, trialDaysLeft, updateStudent, upsertStudent } from "@/lib/students";
import { subjectName } from "@/lib/subjects";
import { getTrack, regionsFor, timeLabelFor, TRACKS, variantsFor, type TrackCode } from "@/lib/tracks";
import { getProgress } from "@/lib/progress";
import { explain } from "@/lib/ai";
import { completeLesson, courseStatus, getLessons, issueCertificate, nextLesson } from "@/lib/courses";
import { formatHour, formatWat, nextSundayWat, watToUtc } from "@/lib/time";
import { getOrCreateTodaySession, recordDrillAnswer, sendCurrentQuestion, streakDays } from "@/lib/drill";
import { getLatestFinishedWeeklyMock, getOpenWeeklyMock, WEEKLY } from "@/lib/mock";
import { applySuccessfulPayment, checkStarsCheckout, createCheckout, createStarsPayment, refundStarsPayment } from "@/lib/payments";
import { STARS_ENABLED, starsFor } from "@/lib/stars";
import { BATTLE_DEFAULT_QUESTIONS, BATTLE_MAX, BATTLE_MIN, endBattle, onPollClosed, recordBattleAnswer, runningBattle, skipQuestion, startBattle } from "@/lib/battle";
import { createGroup, getGroupByCode, groupsOwnedBy, joinGroup, joinLink, memberCount } from "@/lib/groups";
import { signToken } from "@/lib/auth";
import { attachReferrer, redeemLinkCode, referralCount, refLinks } from "@/lib/referrals";
import { REFERRAL_DAYS } from "@/lib/pricing";
import { money, PLANS, SEATS, FREE_DAILY_QUESTIONS, PREMIUM_DAILY_QUESTIONS } from "@/lib/pricing";
import type { Student } from "@/lib/types";
import { menuKb, statesKb, subjectsKb, techTrackKb, timeKb, trackKb } from "./keyboards";

type Ctx = Context & { student?: Student };
const zoneLabel = (s: Student) => timeLabelFor(getTrack(s.track));

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
      return api.sendMessage(chat, `${getTrack(s.track).regionLabel ?? "Which state are you in?"} (for the leaderboard)`, { reply_markup: statesKb(s) });
    case "school":
      return api.sendMessage(chat, `${getTrack(s.track).schoolLabel ?? "What's the name of your school?"} Type it below, or send /skip.`);
    case "time":
      return api.sendMessage(chat, `What time should your daily practice arrive? (${zoneLabel(s)} time)`, { reply_markup: timeKb() });
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
  const trial = (await accessKind(s)) === "trial" ? trialDaysLeft(s) : 0;
  const t = getTrack(s.track);
  const n = premium ? PREMIUM_DAILY_QUESTIONS : FREE_DAILY_QUESTIONS;
  const vs = variantsFor(t, s.subjects);
  const lines = vs.length
    ? [
        `Welcome, ${s.first_name ?? "there"} ${t.emoji}`,
        "",
        `📝 *Daily practice* at ${formatHour(s.drill_hour)} (${zoneLabel(s)} time) in ${s.subjects.map(subjectName).join(", ")}. Anything you miss comes back until you get it right.`,
        ...vs.map((v) => `🧪 *${v.label}*: ${v.note ?? ""}`),
        t.code === "NMC" ? `📈 *Readiness score*: book your £83 CBT once you're passing consistently.` : `📈 *Readiness score*: book your exam once you're passing consistently.`,
        t.code === "NMC" ? `🤖 Get any wrong answer explained step by step — great for drug calculations.` : `🤖 Get any wrong answer explained step by step.`,
        "",
        "Start with today's practice?",
      ]
    : t.course
    ? [
        `Welcome, ${s.first_name ?? "there"} 🧯`,
        "",
        `📚 *${getLessons(t.code).length} short modules* — about 30 minutes in total. Read one a day or all at once.`,
        `📝 *Daily practice* at ${formatHour(s.drill_hour)} (UK time) to make it stick.`,
        `🧪 *Final assessment*: ${t.mock.total} questions, ${t.mock.passPct}% to pass.`,
        `🎓 *Certificate* valid for 12 months, with a reminder before it expires.`,
        "",
        "Start with module 1?",
      ]
    : t.code === "LUK"
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
          `🏆 *Mock Night* every Sunday ${formatHour(WEEKLY.startHour)}: every student sits the same timed CBT. Leaderboard Monday morning.`,
          `🖥 *Practice CBT*: a real exam-style screen with timer and calculator.`,
          "",
          "Want to do your first drill now?",
        ];
  if (trial) lines.splice(1, 0, `🎁 *Everything is free for your first ${trial} days* — unlimited tests, 20 daily questions and AI explanations.`, "");
  return api.sendMessage(s.telegram_id!, lines.join("\n"), {
    parse_mode: "Markdown",
    reply_markup: t.course ? new InlineKeyboard().text("📚 Start module 1", "lesson:next").row().text("Menu", "menu") : menuKb(s),
  });
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
  const kind = await accessKind(s);
  const planLabel = { founder: "👑 Founder (unlimited)", paid: "Premium", seat: "Premium (via your group)", trial: `🎁 Free trial — ${trialDaysLeft(s)} day(s) left`, free: "Free" }[kind];
  lines.push(`⭐ Plan: ${planLabel}`, "");
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
      `• Same questions for every student`,
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
  const kind = await accessKind(s);
  if (kind === "founder") return api.sendMessage(s.telegram_id!, "👑 You have founder access — everything is unlocked, permanently.");
  const premium = kind === "paid" || kind === "seat";
  const t = getTrack(s.track);
  if (!t.plans.length) {
    return api.sendMessage(s.telegram_id!, `🎉 ${t.short} is completely free right now — unlimited drills and practice tests. Tell your friends: /invite`, { reply_markup: menuKb(s) });
  }
  const kb = new InlineKeyboard();
  for (const code of t.plans) {
    kb.text(`💳 ${PLANS[code].label} · ${money(PLANS[code].amount, PLANS[code].currency)}`, `pay:${code}`).row();
    if (STARS_ENABLED) kb.text(`⭐ Same with ${starsFor(PLANS[code])} Telegram Stars`, `stars:${code}`).row();
  }
  const perks =
    t.subjectMode === "single"
      ? [`• ${PREMIUM_DAILY_QUESTIONS} practice questions a day (free: ${FREE_DAILY_QUESTIONS})`, "• Unlimited full practice tests (free: 1 a week)", "• Readiness score and review of every mistake", "", STARS_ENABLED ? "Pay by card via Stripe, or with Telegram Stars ⭐ without leaving the chat." : "Pay securely by card via Stripe."]
      : [`• ${PREMIUM_DAILY_QUESTIONS} drill questions a day (free: ${FREE_DAILY_QUESTIONS})`, "• Unlimited practice CBT mocks (free: 1 a week)", "• Mock Night stays free for everyone", "", "Pay with card, transfer or USSD via Paystack (a parent can pay — just forward them the link)" + (STARS_ENABLED ? ", or with Telegram Stars ⭐ right here in the chat." : ".")];
  return api.sendMessage(
    s.telegram_id!,
    [
      premium && s.premium_until ? `⭐ You're Premium until ${formatWat(s.premium_until)}.\n` : "",
      kind === "trial" ? `🎁 You're on a free trial with everything unlocked — ${trialDaysLeft(s)} day(s) left. Upgrade any time to keep full access afterwards.\n` : "",
      "*Premium*",
      ...perks,
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

    if (payload.startsWith("l_")) {
      const res = await redeemLinkCode(payload.slice(2), s);
      const msg = {
        linked: "✅ Telegram is now connected to your web account. Your progress is shared, and daily reminders will come here.",
        already: "This Telegram account is already connected ✅",
        expired: "That link has expired. Open your dashboard on the web and tap 'Connect Telegram' again.",
        other_telegram: "That web account is already connected to a different Telegram account.",
      }[res];
      await ctx.reply(msg);
      if (res === "linked") {
        const merged = await getStudentByTelegram(ctx.from!.id);
        if (merged) return promptStep(ctx.api, merged);
      }
      return;
    }

    if (payload.startsWith("r_")) {
      if (await attachReferrer(s, payload.slice(2))) {
        await ctx.reply(`🎁 You were invited by a friend — finish your first practice and you'll both get ${REFERRAL_DAYS} days of Premium.`);
      }
    }

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
      // Deep links like t.me/<bot>?start=eth or ?start=ssc pre-select the exam
      const pre = TRACKS[payload.toUpperCase() as TrackCode];
      if (pre) {
        await ctx.reply(`Welcome to *Mock Night* 👋\n\n${pre.emoji} *${pre.name}*: ${pre.tagline}.\n\nLet's set you up — takes 30 seconds.`, { parse_mode: "Markdown" });
        const u = await updateStudent(s.id, {
          track: pre.code,
          subjects: pre.subjectMode === "single" ? pre.subjects : pre.compulsory,
          onboarding_step: pre.subjectMode === "single" ? (pre.askSchool ? "school" : "time") : "subjects",
        });
        if (pre.subjectMode === "multi") return ctx.reply(subjectsText(u), { reply_markup: subjectsKb(u) });
        return promptStep(ctx.api, u);
      }
      await ctx.reply(
        `🌿 *Mock Night*\n*Prepare Smarter. Perform Better.*\n\nPractise for school exams, professional certifications and workplace courses with daily drills, timed mock tests, clear explanations and progress tracking — on Telegram and the web.\n\nLet's set you up — takes 30 seconds.`,
        { parse_mode: "Markdown" },
      );
    }

    if (payload === "mn" && s.onboarding_step === "done") return sendMockNightInfo(ctx.api, s);
    return promptStep(ctx.api, s);
  });

  const sendInvite = async (api: Api, s: Student) => {
    const links = refLinks(s);
    const { joined, rewarded } = await referralCount(s.id);
    return api.sendMessage(
      s.telegram_id!,
      [
        "🎁 *Invite friends, get Premium*",
        `When a friend joins with your link and finishes their first practice, you *both* get ${REFERRAL_DAYS} days of Premium.`,
        "",
        `Telegram link: ${links.telegram}`,
        `Web link: ${links.web}`,
        "",
        `Friends joined: ${joined} · Rewards earned: ${rewarded}`,
      ].join("\n"),
      {
        parse_mode: "Markdown",
        link_preview_options: { is_disabled: true },
        reply_markup: new InlineKeyboard().url(
          "📤 Share my link",
          `https://t.me/share/url?url=${encodeURIComponent(links.telegram)}&text=${encodeURIComponent("I'm practising for my exam with Mock Night — join me 👇")}`,
        ),
      },
    );
  };
  bot.command("invite", (ctx) => (isPrivate(ctx) ? sendInvite(ctx.api, ctx.student!) : undefined));
  bot.callbackQuery("invite", async (ctx) => {
    await ctx.answerCallbackQuery();
    return sendInvite(ctx.api, ctx.student!);
  });

  bot.command("parent", async (ctx) => {
    if (!isPrivate(ctx)) return;
    const email = (ctx.match ?? "").trim();
    if (email.toLowerCase() === "off") {
      await updateStudent(ctx.student!.id, { parent_email: null });
      return ctx.reply("Weekly parent reports turned off.");
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return ctx.reply("Send your parent's or guardian's email like this:\n/parent mum@example.com\n\nThey'll get a short progress report every Sunday. Send /parent off to stop.");
    }
    await updateStudent(ctx.student!.id, { parent_email: email.toLowerCase() });
    return ctx.reply(`✅ Weekly progress reports will go to ${email} every Sunday evening.`);
  });
  bot.command("whoami", (ctx) =>
    ctx.reply(`Your Telegram ID: \`${ctx.from?.id}\``, { parse_mode: "Markdown" }),
  );

  bot.command("help", (ctx) =>
    ctx.reply(
      [
        "🌿 *Mock Night — Prepare Smarter. Perform Better.*",
        "",
        "*Student commands*",
        "/drill — today's drill",
        "/cbt — practice CBT",
        "/mocknight — Sunday Mock Night",
        "/leaderboard — last Mock Night results",
        "/stats — your progress",
        "/premium — upgrade",
        "/settings — exam, subjects, state",
        "/exams — browse or change your exam pathway",
        "/time — change drill time",
        "/join CODE — join your tutor's group",
        "/invite — invite friends, earn Premium",
        "/parent email — weekly report for a parent",
        "/explain — get the last question explained",
        "/lesson — next course module (Fire Marshal)",
        "/certificate — get your course certificate",
        "/battle — start a quiz battle in a group chat",
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

  // ---- Group quiz battles -----------------------------------------------------
  const canControlBattle = async (ctx: Ctx, startedBy: string | null) => {
    if (startedBy && startedBy === ctx.student?.id) return true;
    if (!ctx.chat || !ctx.from) return false;
    const m = await ctx.api.getChatMember(ctx.chat.id, ctx.from.id).catch(() => null);
    return m?.status === "creator" || m?.status === "administrator";
  };
  const launchBattle = async (ctx: Ctx, count: number) => {
    const res = await startBattle(ctx.api, { id: ctx.chat!.id, title: "title" in ctx.chat! ? ctx.chat.title : undefined }, ctx.student!, count);
    if ("battle" in res) return;
    if (res.error === "NO_TRACK")
      return ctx.reply(`${ctx.from?.first_name ?? "You"}, pick your course first so I know which questions to use 👉 https://t.me/${env.botUsername}?start=battle`);
    if (res.error === "RUNNING") return ctx.reply("A battle is already running here. Finish it first, or an admin can send /battle stop.");
    return ctx.reply("Not enough questions for a battle in that course yet — try another course.");
  };

  bot.command("battle", async (ctx) => {
    if (isPrivate(ctx)) {
      return ctx.reply("⚔️ Quiz battles run in group chats. Add me to your class or study group, then send /battle there.\n\nTip: /battle 15 for 15 questions.", {
        reply_markup: new InlineKeyboard().url("➕ Add me to a group", `https://t.me/${env.botUsername}?startgroup=battle`),
      });
    }
    const arg = (ctx.match ?? "").trim().toLowerCase();
    if (arg === "stop" || arg === "end") {
      const b = await runningBattle(ctx.chat.id);
      if (!b) return ctx.reply("No battle is running.");
      if (!(await canControlBattle(ctx, b.started_by))) return ctx.reply("Only the person who started the battle or a group admin can stop it.");
      return endBattle(ctx.api, b.id);
    }
    const n = Math.min(BATTLE_MAX, Math.max(BATTLE_MIN, Number.parseInt(arg, 10) || BATTLE_DEFAULT_QUESTIONS));
    return launchBattle(ctx, n);
  });
  bot.callbackQuery(/^bt:(next|end):([0-9a-f-]+)$/, async (ctx) => {
    const [, action, id] = ctx.match;
    const { data: b } = await db().from("battles").select("started_by, status").eq("id", id).maybeSingle();
    if (!b || b.status !== "running") return ctx.answerCallbackQuery({ text: "This battle has finished." });
    if (!(await canControlBattle(ctx, b.started_by))) return ctx.answerCallbackQuery({ text: "Only the starter or an admin can do that.", show_alert: true });
    await ctx.answerCallbackQuery();
    return action === "next" ? skipQuestion(ctx.api, id) : endBattle(ctx.api, id);
  });
  bot.callbackQuery("bt:again", async (ctx) => {
    await ctx.answerCallbackQuery();
    if (!ctx.chat || isPrivate(ctx)) return;
    return launchBattle(ctx, BATTLE_DEFAULT_QUESTIONS);
  });
  bot.on("poll", (ctx) => onPollClosed(ctx.api, ctx.poll));

  bot.command("drill", (ctx) => (isPrivate(ctx) ? startDrill(ctx.api, ctx.student!) : undefined));
  bot.command("stats", (ctx) => (isPrivate(ctx) ? sendStats(ctx.api, ctx.student!) : undefined));
  bot.command("premium", (ctx) => (isPrivate(ctx) ? sendPremium(ctx.api, ctx.student!) : undefined));
  bot.command("mocknight", (ctx) => (isPrivate(ctx) ? sendMockNightInfo(ctx.api, ctx.student!) : undefined));
  bot.command("cbt", (ctx) => {
    if (!isPrivate(ctx)) return;
    const t = getTrack(ctx.student!.track);
    const kb = new InlineKeyboard();
    const vs = variantsFor(t, ctx.student!.subjects);
    if (vs.length) vs.forEach((v) => kb.webApp(`▶️ ${v.label}`, `${env.appUrl}/mock?variant=${v.key}`).row());
    else kb.webApp("▶️ Start practice test", `${env.appUrl}/mock`);
    const lines = vs.length ? ["Choose a practice test 👇", ...vs.map((v) => `• *${v.label}* — ${v.note ?? ""}`)] : ["Open a full timed practice test 👇"];
    return ctx.reply(lines.join("\n"), { parse_mode: "Markdown", reply_markup: kb });
  });

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

  bot.command("tech", async (ctx) => {
    if (!isPrivate(ctx)) return;
    await updateStudent(ctx.student!.id, { onboarding_step: "exam" });
    return ctx.reply("🌍 *Technology & Digital Careers*\\nChoose a pathway:", { parse_mode: "Markdown", reply_markup: techTrackKb() });
  });

  // Browse or switch exam pathways without creating a new Telegram account.
  bot.command("exams", async (ctx) => {
    if (!isPrivate(ctx)) return;
    const s = await updateStudent(ctx.student!.id, { onboarding_step: "exam" });
    return promptStep(ctx.api, s);
  });

  bot.command("time", (ctx) =>
    isPrivate(ctx) ? ctx.reply(`When should your daily practice arrive? (${zoneLabel(ctx.student!)} time)`, { reply_markup: timeKb() }) : undefined,
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
    const tc = getTrack(ctx.student!.track).currency;
    const cur = tc === "GBP" ? "GBP" : "NGN";
    const group = await createGroup(ctx.student!, name, cur);
    const seat = SEATS[cur];
    return ctx.reply(
      [
        `✅ *${group.name}* created. Code: \`${group.join_code}\``,
        "",
        "Share this link with your students — one tap and they're in:",
        joinLink(env.botUsername, group),
        "",
        `• /seats N — give N learners full access (${money(seat.amount, cur)} ${seat.per})`,
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
    const url = await createCheckout(ctx.student!, "seats", { group, seats: n, returnTo: "telegram" });
    const seat = SEATS[group.currency ?? "NGN"];
    const total = money(n * seat.amount, group.currency ?? "NGN");
    return ctx.reply(`${n} seats for *${group.name}* — ${total} (${money(seat.amount, group.currency ?? "NGN")} ${seat.per}).\nSeats go to your earliest-joined learners first.`, {
      parse_mode: "Markdown",
      reply_markup: new InlineKeyboard().url(`Pay ${total}`, url),
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
      const returning = s.onboarding_step === "exam" && !!s.track;
      const u = await updateStudent(s.id, { track: code, subjects: t.subjects, onboarding_step: returning ? "done" : t.askSchool ? "school" : "time" });
      await ctx.editMessageText(`${t.emoji} ${t.name} ✅`);
      return u.onboarding_step === "done" ? ctx.reply("Settings saved ✅", { reply_markup: menuKb(u) }) : promptStep(ctx.api, u);
    }
    const keep = s.track === code ? s.subjects : [];
    const subjects = [...new Set([...t.compulsory, ...keep.filter((x) => t.subjects.includes(x))])];
    const u = await updateStudent(s.id, { track: code, exam: code === "JAMB" || code === "WAEC" ? code : null, subjects, onboarding_step: "subjects" });
    await ctx.editMessageText(subjectsText(u), { reply_markup: subjectsKb(u) });
  });

  bot.callbackQuery(/^ob:sub:([A-Z0-9]{3,5})$/, async (ctx) => {
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
    if (s.subjects.length < t.minSubjects || s.subjects.length > t.maxSubjects) return ctx.answerCallbackQuery({ text: `${t.short}: ${t.subjectNote}.`, show_alert: true });
    await ctx.answerCallbackQuery();
    await ctx.editMessageText(`Subjects: ${s.subjects.map(subjectName).join(", ")} ✅`);
    // Returning users (from /settings) already have a state — skip straight to done
    const next = t.askState ? (s.state ? "done" : "state") : t.kind === "school" ? "done" : "time";
    const u = await updateStudent(s.id, { onboarding_step: next });
    if (u.onboarding_step === "done") return ctx.reply("Settings saved ✅", { reply_markup: menuKb(u) });
    return promptStep(ctx.api, u);
  });

  bot.callbackQuery(/^ob:st:(\d+)$/, async (ctx) => {
    const state = regionsFor(getTrack(ctx.student!.track))[Number(ctx.match[1])];
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
  bot.callbackQuery("menu", async (ctx) => {
    await ctx.answerCallbackQuery();
    return ctx.reply("What would you like to do?", { reply_markup: menuKb(ctx.student!) });
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
  bot.callbackQuery("exams", async (ctx) => {
    await ctx.answerCallbackQuery();
    const s = await updateStudent(ctx.student!.id, { onboarding_step: "exam" });
    return promptStep(ctx.api, s);
  });
  bot.callbackQuery("pay:menu", async (ctx) => {
    await ctx.answerCallbackQuery();
    return sendPremium(ctx.api, ctx.student!);
  });
  bot.callbackQuery(/^pay:([a-z0-9_]+)$/, async (ctx) => {
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

  // ---- Telegram Stars --------------------------------------------------------
  bot.callbackQuery(/^stars:([a-z0-9_]+)$/, async (ctx) => {
    const code = ctx.match[1];
    if (!STARS_ENABLED || !PLANS[code] || !getTrack(ctx.student!.track).plans.includes(code)) return ctx.answerCallbackQuery();
    await ctx.answerCallbackQuery();
    const { reference, stars, plan } = await createStarsPayment(ctx.student!, code);
    return ctx.replyWithInvoice(
      plan.label.slice(0, 32),
      `${plan.label}. Full access for ${plan.days} days, added to any time you already have.`.slice(0, 255),
      reference,
      "XTR",
      [{ label: plan.label.slice(0, 32), amount: stars }],
    );
  });

  bot.on("pre_checkout_query", async (ctx) => {
    const q = ctx.preCheckoutQuery;
    const s = ctx.student ?? (await getStudentByTelegram(q.from.id));
    const problem = s ? await checkStarsCheckout(q.invoice_payload, s.id, q.total_amount, q.currency) : "Please tap /start first.";
    return problem ? ctx.answerPreCheckoutQuery(false, { error_message: problem }) : ctx.answerPreCheckoutQuery(true);
  });

  bot.on("message:successful_payment", async (ctx) => {
    const p = ctx.message.successful_payment;
    if (p.currency !== "XTR") return;
    const applied = await applySuccessfulPayment(p.invoice_payload, p.total_amount, "XTR");
    await db().from("payments").update({ telegram_charge_id: p.telegram_payment_charge_id }).eq("reference", p.invoice_payload);
    if (!applied) return ctx.reply("We received your Stars but couldn't apply them automatically. Message support with this code and we'll sort it: " + p.telegram_payment_charge_id);
    if (applied.kind === "premium") return ctx.reply(`⭐ Thank you! You're Premium until ${formatWat(applied.until)}. Let's go 🚀`, { reply_markup: menuKb(applied.student) });
  });

  /** Founder-only: /refund <telegram_payment_charge_id> */
  bot.command("refund", async (ctx) => {
    if (!isFounder(ctx.student!)) return;
    const chargeId = ctx.match?.trim();
    if (!chargeId) return ctx.reply("Usage: /refund <charge id>");
    try {
      const r = await refundStarsPayment(ctx.api, chargeId);
      return ctx.reply(r ? `Refunded ${r.payment.amount_kobo} Stars to ${r.student.first_name ?? "the learner"} and removed the Premium days.` : "No successful Stars payment with that charge id.");
    } catch (e) {
      return ctx.reply(`Refund failed: ${(e as Error).message}`);
    }
  });

  // ---- Drill answers --------------------------------------------------------
  // Quiz poll answers
  bot.on("poll_answer", async (ctx) => {
    if (await recordBattleAnswer(ctx.pollAnswer, ctx.student?.id ?? null)) return;
    const s = ctx.student ?? (await getStudentByTelegram(ctx.pollAnswer.user!.id));
    if (!s) return;
    const chosen = ctx.pollAnswer.option_ids[0];
    if (chosen === undefined) return;
    const { data: msg } = await db().from("drill_messages").select("id").eq("poll_id", ctx.pollAnswer.poll_id).maybeSingle();
    if (!msg) return;
    const res = await recordDrillAnswer(s, msg.id, chosen);
    if (!res) return;
    await afterAnswer(ctx.api, s, res.question.explanation, true);
    if (!res.correct) {
      await ctx.api.sendMessage(s.telegram_id!, "Not quite — want it explained?", {
        reply_markup: new InlineKeyboard().text("🤖 Explain it to me", `ex:${res.question.id}`),
        disable_notification: true,
      });
    }
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
    await ctx.editMessageText((base + verdict + (q.explanation ? `\n💡 ${q.explanation}` : "")).slice(0, 4096), {
      reply_markup: res.correct ? undefined : new InlineKeyboard().text("🤖 Explain it to me", `ex:${q.id}`),
    });
    await sendCurrentQuestion(ctx.api, s, res.session);
  });

  // ---- Courses (lessons + certificates) -------------------------------------
  const sendLesson = async (api: Api, s: Student, lessonId?: string) => {
    const lessons = getLessons(s.track);
    if (!lessons.length) return api.sendMessage(s.telegram_id!, "Lessons are only available on course tracks (e.g. Fire Marshal). Change course in ⚙️ Settings.");
    const lesson = lessonId ? lessons.find((l) => l.id === lessonId) : await nextLesson(s);
    if (!lesson) {
      const st = await courseStatus(s);
      return api.sendMessage(
        s.telegram_id!,
        st?.bestPass
          ? "✅ You've finished every module and passed the final assessment. Get your certificate with /certificate"
          : "✅ You've finished every module! Now take the final assessment (20 questions, 80% to pass) to earn your certificate.",
        { reply_markup: st?.bestPass ? undefined : new InlineKeyboard().webApp("🧪 Final assessment", `${env.appUrl}/mock`) },
      );
    }
    const text = [`📚 *${lesson.title}*  _(${lesson.minutes} min)_`, "", ...lesson.body, "", "*Key points*", ...lesson.keyPoints.map((k) => `• ${k}`)].join("\n");
    return api.sendMessage(s.telegram_id!, text.slice(0, 4000), {
      parse_mode: "Markdown",
      reply_markup: new InlineKeyboard().text("✅ Done — next module", `lesson:done:${lesson.id}`),
    });
  };
  bot.command("lesson", (ctx) => (isPrivate(ctx) ? sendLesson(ctx.api, ctx.student!) : undefined));
  bot.callbackQuery("lesson:next", async (ctx) => {
    await ctx.answerCallbackQuery();
    return sendLesson(ctx.api, ctx.student!);
  });
  bot.callbackQuery(/^lesson:done:([a-z0-9-]+)$/, async (ctx) => {
    await completeLesson(ctx.student!, ctx.match[1]);
    const st = await courseStatus(ctx.student!);
    await ctx.answerCallbackQuery({ text: `Module complete (${st?.done}/${st?.total}) ✅` });
    await ctx.editMessageReplyMarkup({ reply_markup: undefined }).catch(() => {});
    return sendLesson(ctx.api, ctx.student!);
  });

  bot.command("name", async (ctx) => {
    if (!isPrivate(ctx)) return;
    const name = (ctx.match ?? "").trim();
    if (name.split(/\s+/).length < 2) return ctx.reply("Send your full name as it should appear on your certificate, e.g.\n/name Chidinma Okafor");
    await updateStudent(ctx.student!.id, { full_name: name.slice(0, 80) });
    return ctx.reply(`Saved: ${name}. Now send /certificate`);
  });

  bot.command("certificate", async (ctx) => {
    if (!isPrivate(ctx)) return;
    const s = ctx.student!;
    const st = await courseStatus(s);
    if (!st) return ctx.reply("Certificates are available on course tracks such as Fire Marshal.");
    if (!st.certificate?.valid && !st.eligible) {
      return ctx.reply(
        `To earn your certificate:\n${st.done === st.total ? "✅" : "▫️"} Complete all modules (${st.done}/${st.total}) — /lesson\n${st.bestPass ? "✅" : "▫️"} Pass the final assessment (80%)`,
        { reply_markup: new InlineKeyboard().webApp("🧪 Final assessment", `${env.appUrl}/mock`) },
      );
    }
    if (!st.certificate?.valid && !s.full_name) return ctx.reply("Almost there! Send your full name for the certificate, e.g.\n/name Chidinma Okafor");
    const r = await issueCertificate(s, s.full_name);
    if (!r.ok) {
      if (r.error === "NOT_PAID") return sendPremium(ctx.api, s).then(() => ctx.reply("☝️ Your certificate is included with the full course (or a seat from your employer)."));
      return ctx.reply(r.error === "BAD_NAME" ? "Please send your first and last name with /name" : "You're not eligible yet — finish all modules and pass the final assessment.");
    }
    const c = r.certificate;
    return ctx.reply(
      `🎓 Certificate ${c.cert_no}\nValid until ${new Date(c.expires_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}.\nAnyone can verify it at ${env.appUrl}/verify/${c.cert_no}`,
      { reply_markup: new InlineKeyboard().url("📄 Download certificate (PDF)", `${env.appUrl}/api/cert/${c.cert_no}`), link_preview_options: { is_disabled: true } },
    );
  });

  // AI explanations
  const sendExplanation = async (ctx: Ctx, questionId: string) => {
    await ctx.api.sendChatAction(ctx.chat!.id, "typing").catch(() => {});
    const r = await explain(ctx.student!, questionId);
    if (r.ok) return ctx.reply(`🤖 ${r.text}${r.remaining !== null && r.remaining <= 2 ? `\n\n(${r.remaining} explanation${r.remaining === 1 ? "" : "s"} left today)` : ""}`);
    const msg = {
      LIMIT: `You've used today's ${r.limit} free explanations. Premium gets 40 a day → /premium`,
      DISABLED: "Explanations aren't switched on yet — check back soon.",
      NOT_ANSWERED: "Answer the question first, then I can explain it.",
      FAILED: "Sorry, I couldn't get an explanation just now. Try again in a minute.",
    }[r.error];
    return ctx.reply(msg);
  };
  bot.callbackQuery(/^ex:([0-9a-f-]{36})$/, async (ctx) => {
    await ctx.answerCallbackQuery();
    return sendExplanation(ctx, ctx.match[1]);
  });
  bot.command("explain", async (ctx) => {
    if (!isPrivate(ctx)) return;
    const { data } = await db()
      .from("attempts")
      .select("question_id")
      .eq("student_id", ctx.student!.id)
      .eq("correct", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (!data) return ctx.reply("No wrong answers to explain yet — nice! 🎯");
    return sendExplanation(ctx, data.question_id);
  });

  // Mark users who block the bot
  bot.on("my_chat_member", async (ctx) => {
    if (ctx.chat.type === "private" && ctx.myChatMember.new_chat_member.status === "kicked" && ctx.student) {
      await db().from("students").update({ blocked: true }).eq("id", ctx.student.id);
    }
    const was = ctx.myChatMember.old_chat_member.status, now = ctx.myChatMember.new_chat_member.status;
    if (ctx.chat.type !== "private" && (was === "left" || was === "kicked") && (now === "member" || now === "administrator")) {
      await ctx.reply("👋 Hi everyone! I'm Mock Night. Send /battle to start a live quiz battle — fastest correct answers win. /battle 15 for a longer one.");
    }
  });

  bot.catch(async (err) => {
    console.error("bot error", err.error);
    // Tell the user something went wrong instead of going silent (short reason helps debugging)
    const reason = err.error instanceof Error ? err.error.message : String(err.error);
    try {
      if (err.ctx.chat?.type === "private") await err.ctx.reply(`⚠️ Sorry, something went wrong. Please try again.\n(${reason.slice(0, 140)})`);
    } catch {
      /* ignore */
    }
  });
}
