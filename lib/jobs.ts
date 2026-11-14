import { ALLOWED_UPDATES, BOT_COMMANDS } from "./telegram-updates";
import { expireStaleBattles } from "./battle";
import { InlineKeyboard, type Api } from "grammy";
import { db, must } from "./supabase";
import { env } from "./env";
import { broadcast } from "./broadcast";
import { sendParentReports } from "./parent-report";
import { sendCertificateReminders } from "./courses";
import { watNow, formatHour } from "./time";
import { closeExpiredAttempts, ensureWeeklyMock, WEEKLY } from "./mock";
import type { Mock, TutorGroup } from "./types";
import { SCHOOL_TRACKS, tracksByZone } from "./tracks";

type Recipient = { id: string; telegram_id: number; first_name: string | null };

/** Telegram users who finished onboarding and haven't blocked the bot. */
async function activeStudents(extra?: (q: any) => any): Promise<Recipient[]> {
  let q = db()
    .from("students")
    .select("id, telegram_id, first_name")
    .eq("onboarding_step", "done")
    .eq("blocked", false)
    .not("telegram_id", "is", null);
  if (extra) q = extra(q);
  return must(await q.limit(5000), "active students") as Recipient[];
}

/** Runs every hour (Vercel cron or any external cron hitting /api/cron). */
/** Make sure Telegram sends every update type we need (e.g. pre_checkout_query for Stars) without re-running set-webhook by hand. */
async function ensureWebhookUpdates(api: Api) {
  try {
    const info = await api.getWebhookInfo();
    const have = new Set(info.allowed_updates ?? []);
    if (info.url && !ALLOWED_UPDATES.every((u) => have.has(u))) {
      await api.setWebhook(info.url, { secret_token: env.webhookSecret, allowed_updates: [...ALLOWED_UPDATES] });
      console.log("webhook allowed_updates refreshed");
    }
    // Keep the command menu in sync with the code (no need to run set-webhook locally)
    const current = (await api.getMyCommands()).map((c) => c.command).join(",");
    if (current !== BOT_COMMANDS.map((c) => c.command).join(",")) {
      await api.setMyCommands(BOT_COMMANDS.map((c) => ({ ...c })));
      console.log("bot commands refreshed");
    }
  } catch (e) {
    console.error("ensureWebhookUpdates failed", e);
  }
}

export async function runHourly(api: Api) {
  await ensureWebhookUpdates(api);
  await expireStaleBattles().catch((e) => console.error("expireStaleBattles", e));
  const { date, hour, weekday } = watNow();
  const log: Record<string, unknown> = { date, hour, weekday };

  // 1. Daily drill prompts for students whose drill hour is now
  // Each track's drill hour is in its own local time (WAT, UK, Ethiopia, India…).
  const zoneClauses = Object.entries(tracksByZone()).map(([tz, codes]) => `and(track.in.(${codes.join(",")}),drill_hour.eq.${hourIn(tz)})`);
  const due = await activeStudents((q) =>
    q
      .or([...zoneClauses, `and(track.is.null,drill_hour.eq.${hour})`].join(","))
      .or(`last_drill_prompt.is.null,last_drill_prompt.lt.${date}`),
  );
  if (due.length) {
    // Mark first so an overlapping run can't double-send
    await db().from("students").update({ last_drill_prompt: date }).in("id", due.map((s) => s.id));
    log.drillPrompts = await broadcast(api, due, (api, s) =>
      api.sendMessage(s.telegram_id, `📝 ${s.first_name ?? "Hi"}, your daily drill is ready. Keep the streak going 🔥`, {
        reply_markup: new InlineKeyboard().text("Start drill ▶️", "drill:start"),
      }),
    );
  }

  // 2. Sunday: create Mock Night, remind, open
  if (weekday === 0 && hour >= 18) {
    const mock = await ensureWeeklyMock(date);

    if (hour < WEEKLY.startHour && !mock.reminder_sent) {
      await db().from("mocks").update({ reminder_sent: true }).eq("id", mock.id);
      const all = await activeStudents((q) => q.in("track", SCHOOL_TRACKS));
      log.reminders = await broadcast(api, all, (api, s) =>
        api.sendMessage(
          s.telegram_id,
          `⏰ Mock Night starts at ${formatHour(WEEKLY.startHour)} tonight. Same questions for every student — ${WEEKLY.minutes} minutes, CBT format. Charge your phone and find a quiet spot.`,
        ),
      );
    }

    if (hour >= WEEKLY.startHour && hour < WEEKLY.lastStartHour && !mock.opened_sent) {
      await db().from("mocks").update({ opened_sent: true }).eq("id", mock.id);
      const all = await activeStudents((q) => q.in("track", SCHOOL_TRACKS));
      log.opened = await broadcast(api, all, (api, s) =>
        api.sendMessage(s.telegram_id, `🔴 *Mock Night is LIVE!* Doors close at ${formatHour(WEEKLY.lastStartHour)}. Good luck 🍀`, {
          parse_mode: "Markdown",
          reply_markup: new InlineKeyboard().webApp("Start Mock Night ▶️", `${env.appUrl}/mock?mock=${mock.id}`),
        }),
      );
    }
  }

  // 2b. Sunday evening: weekly reports to parents
  if (weekday === 0 && hour === 18) {
    log.parentReports = await sendParentReports(date);
  }

  // 2c. Daily at 9am WAT: certificate refresher reminders
  if (hour === 9) {
    log.certReminders = await sendCertificateReminders();
  }

  // 2d. Daily at 10am WAT: "your free trial ends in 2 days" (each account gets this once)
  if (hour === 10) {
    log.trialReminders = await sendTrialReminders(api);
  }

  // 3. Monday morning: results
  if (weekday === 1 && hour >= 8) {
    log.results = await postWeeklyResults(api);
  }

  return log;
}

export async function postWeeklyResults(api: Api) {
  const { data: mock } = await db()
    .from("mocks")
    .select("*")
    .eq("kind", "weekly")
    .eq("results_posted", false)
    .lte("ends_at", new Date(Date.now() - WEEKLY.minutes * 60_000).toISOString())
    .order("starts_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!mock) return 0;
  const m = mock as Mock;

  await db().from("mocks").update({ results_posted: true }).eq("id", m.id);
  await closeExpiredAttempts(m.id);

  const ranks = must(await db().rpc("mock_ranks", { p_mock: m.id }), "ranks") as {
    student_id: string; telegram_id: number; rank: number; total: number; scaled_score: number; state_rank: number; state: string | null;
  }[];
  if (!ranks.length) return 0;

  const attemptIds = new Map(
    ((await db().from("mock_attempts").select("id, student_id").eq("mock_id", m.id).not("submitted_at", "is", null)).data ?? []).map((r: any) => [r.student_id, r.id]),
  );
  const top = must(await db().rpc("mock_leaderboard", { p_mock: m.id, p_limit: 5 }), "top") as any[];
  const topText = top
    .map((r) => `${r.rank}. ${r.first_name ?? "Student"}${r.state ? ` (${r.state})` : ""} — ${Number(r.scaled_score).toFixed(0)}%`)
    .join("\n");

  const sent = await broadcast(
    api,
    ranks.filter((r) => r.telegram_id).map((r) => ({ ...r, id: r.student_id })),
    (api, r) =>
      api.sendMessage(
        r.telegram_id,
        [
          `🏆 *${m.title} results*`,
          "",
          `Your score: *${Number(r.scaled_score).toFixed(0)}%* (≈${Math.round((r.scaled_score / 100) * 400)}/400)`,
          `Nigeria: *#${r.rank}* of ${r.total}`,
          r.state ? `${r.state}: *#${r.state_rank}*` : "",
          "",
          "*Top 5 nationally*",
          topText,
          "",
          "Your wrong answers are now in your review box — they'll show up in your drills this week.",
          attemptIds.get(r.student_id) ? `\n📤 Share your result card: ${env.appUrl}/r/${attemptIds.get(r.student_id)}` : "",
        ]
          .filter((l) => l !== "")
          .join("\n"),
        { parse_mode: "Markdown" },
      ),
  );

  // Post group leaderboards into linked Telegram groups
  const groups = must(await db().from("tutor_groups").select("*").not("telegram_chat_id", "is", null), "linked groups") as TutorGroup[];
  for (const g of groups) {
    const rows = must(await db().rpc("mock_leaderboard", { p_mock: m.id, p_limit: 10, p_group: g.id }), "group lb") as any[];
    if (!rows.length) continue;
    const text = `🏆 *${g.name} — ${m.title}*\n\n` + rows.map((r) => `${r.rank}. ${r.first_name ?? "Student"} — ${Number(r.scaled_score).toFixed(0)}%`).join("\n");
    try {
      await api.sendMessage(g.telegram_chat_id!, text, { parse_mode: "Markdown" });
    } catch (e) {
      console.error("group post failed", g.id, e);
    }
  }
  return sent;
}

function hourIn(timeZone: string) {
  return Number(new Date().toLocaleString("en-GB", { timeZone, hour: "2-digit", hour12: false })) % 24;
}

async function sendTrialReminders(api: Api) {
  const { TRIAL_DAYS } = await import("./pricing");
  if (!TRIAL_DAYS || TRIAL_DAYS < 3) return 0;
  const from = new Date(Date.now() - (TRIAL_DAYS - 2) * 86400_000).toISOString();
  const to = new Date(Date.now() - (TRIAL_DAYS - 3) * 86400_000).toISOString();
  const rows = await activeStudents((q) => q.gte("created_at", from).lt("created_at", to).is("premium_until", null));
  return broadcast(api, rows, (api, s) =>
    api.sendMessage(
      s.telegram_id,
      `⏳ ${s.first_name ?? "Hi"}, your free trial ends in 2 days. After that you'll be on the free plan (10 daily questions, 1 practice test a week). Keep full access → /premium`,
    ),
  );
}
