import { InlineKeyboard, type Api } from "grammy";
import { db, must } from "./supabase";
import { env } from "./env";
import { broadcast } from "./broadcast";
import { watNow, formatHour } from "./time";
import { closeExpiredAttempts, ensureWeeklyMock, WEEKLY } from "./mock";
import type { Mock, Student, TutorGroup } from "./types";

type Recipient = Pick<Student, "id" | "telegram_id" | "first_name">;

async function activeStudents(extra?: (q: any) => any): Promise<Recipient[]> {
  let q = db().from("students").select("id, telegram_id, first_name").eq("onboarding_step", "done").eq("blocked", false);
  if (extra) q = extra(q);
  return must(await q.limit(5000), "active students") as Recipient[];
}

/** Runs every hour (Vercel cron or any external cron hitting /api/cron). */
export async function runHourly(api: Api) {
  const { date, hour, weekday } = watNow();
  const log: Record<string, unknown> = { date, hour, weekday };

  // 1. Daily drill prompts for students whose drill hour is now
  const due = await activeStudents((q) =>
    q.eq("drill_hour", hour).or(`last_drill_prompt.is.null,last_drill_prompt.lt.${date}`),
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
      const all = await activeStudents();
      log.reminders = await broadcast(api, all, (api, s) =>
        api.sendMessage(
          s.telegram_id,
          `⏰ Mock Night starts at ${formatHour(WEEKLY.startHour)} tonight. Same questions for everyone in Nigeria — ${WEEKLY.minutes} minutes, CBT format. Charge your phone and find a quiet spot.`,
        ),
      );
    }

    if (hour >= WEEKLY.startHour && hour < WEEKLY.lastStartHour && !mock.opened_sent) {
      await db().from("mocks").update({ opened_sent: true }).eq("id", mock.id);
      const all = await activeStudents();
      log.opened = await broadcast(api, all, (api, s) =>
        api.sendMessage(s.telegram_id, `🔴 *Mock Night is LIVE!* Doors close at ${formatHour(WEEKLY.lastStartHour)}. Good luck 🍀`, {
          parse_mode: "Markdown",
          reply_markup: new InlineKeyboard().webApp("Start Mock Night ▶️", `${env.appUrl}/mock?mock=${mock.id}`),
        }),
      );
    }
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

  const top = must(await db().rpc("mock_leaderboard", { p_mock: m.id, p_limit: 5 }), "top") as any[];
  const topText = top
    .map((r) => `${r.rank}. ${r.first_name ?? "Student"}${r.state ? ` (${r.state})` : ""} — ${Number(r.scaled_score).toFixed(0)}%`)
    .join("\n");

  const sent = await broadcast(
    api,
    ranks.map((r) => ({ ...r, id: r.student_id })),
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
