import { localiseQuestion, nigeriaOnlyFor } from "./localise";
import type { Api } from "grammy";
import { InlineKeyboard } from "grammy";
import { db, must } from "./supabase";
import { env } from "./env";
import { rewardReferral } from "./referrals";
import { isPremium } from "./students";
import { watDateAddDays, watNow } from "./time";
import { FREE_DAILY_QUESTIONS, PREMIUM_DAILY_QUESTIONS } from "./pricing";
import { subjectName } from "./subjects";
import type { DrillSession, Question, Student } from "./types";

const LETTERS = ["A", "B", "C", "D", "E"];

// Telegram quiz poll limits
const POLL_QUESTION_MAX = 300;
const POLL_OPTION_MAX = 100;
const POLL_EXPLANATION_MAX = 200;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export async function getQuestion(id: string): Promise<Question> {
  return must(await db().from("questions").select("*").eq("id", id).single(), "get question") as Question;
}

export async function getTodaySession(student: Student): Promise<DrillSession | null> {
  const { date } = watNow();
  const { data, error } = await db()
    .from("drill_sessions")
    .select("*")
    .eq("student_id", student.id)
    .eq("drill_date", date)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data as DrillSession | null;
}

/** Build today's drill: due review questions first, then fresh questions spread across subjects. */
export async function getOrCreateTodaySession(student: Student): Promise<DrillSession> {
  const existing = await getTodaySession(student);
  if (existing) return existing;

  const { date } = watNow();
  const count = (await isPremium(student)) ? PREMIUM_DAILY_QUESTIONS : FREE_DAILY_QUESTIONS;
  const subjects = student.subjects.length ? student.subjects : ["ENG"];

  // 1. Review box — at most half the drill so there's always new material
  const due = must(
    await db()
      .from("review_items")
      .select("question_id")
      .eq("student_id", student.id)
      .lte("due_on", date)
      .order("due_on", { ascending: true })
      .limit(Math.ceil(count / 2)),
    "due reviews",
  ) as { question_id: string }[];
  const reviewIds = due.map((r) => r.question_id);

  // 2. Fresh questions, round-robin across subjects
  const remaining = count - reviewIds.length;
  const perSubject = Math.ceil(remaining / subjects.length);
  const fresh: string[] = [];
  for (const subject of shuffle(subjects)) {
    const rows = must(
      await db().rpc("pick_new_questions", { p_student: student.id, p_subject: subject, p_limit: perSubject }),
      "pick new",
    ) as Question[];
    let ids = rows.filter((q) => !nigeriaOnlyFor(q, student.track)).map((q) => q.id);
    if (ids.length < perSubject) {
      // Student has seen everything in this subject — recycle old questions
      const extra = must(
        await db().rpc("pick_random_questions", {
          p_subject: subject,
          p_limit: perSubject - ids.length,
          p_exclude: [...ids, ...reviewIds],
        }),
        "pick random",
      ) as Question[];
      ids = ids.concat(extra.filter((q) => !nigeriaOnlyFor(q, student.track)).map((q) => q.id));
    }
    fresh.push(...ids);
  }

  const questionIds = [...reviewIds, ...shuffle(fresh).slice(0, remaining)];
  if (questionIds.length === 0) throw new Error("NO_QUESTIONS");

  const { data, error } = await db()
    .from("drill_sessions")
    .insert({ student_id: student.id, drill_date: date, question_ids: questionIds, review_count: reviewIds.length })
    .select()
    .single();
  if (error) {
    // Unique violation = a parallel request created it first
    const again = await getTodaySession(student);
    if (again) return again;
    throw new Error(error.message);
  }
  return data as DrillSession;
}

export function fitsPoll(q: Question, header: string) {
  return (
    header.length + q.body.length <= POLL_QUESTION_MAX &&
    q.options.every((o) => o.length <= POLL_OPTION_MAX) &&
    q.options.length >= 2
  );
}

function truncate(s: string, n: number) {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}

/** Send the session's current question (or the summary if finished). */
export async function sendCurrentQuestion(api: Api, student: Student, session: DrillSession): Promise<void> {
  const chatId = student.telegram_id!;
  if (session.position >= session.question_ids.length) {
    await finishSession(api, student, session);
    return;
  }

  const q = localiseQuestion(await getQuestion(session.question_ids[session.position]), student.track);
  const isReview = session.position < session.review_count;
  const header = `Q${session.position + 1}/${session.question_ids.length} · ${subjectName(q.subject_code)}${isReview ? " · 🔁 review" : ""}\n`;

  const msg = must(
    await db().from("drill_messages").insert({ session_id: session.id, question_id: q.id }).select().single(),
    "insert drill msg",
  ) as { id: number };

  let sentAsPoll = false;
  if (fitsPoll(q, header)) {
    try {
      // Send both the classic (correct_option_id) and newer (correct_option_ids) fields — Telegram ignores the one it doesn't use.
      const extra = {
        type: "quiz",
        is_anonymous: false,
        correct_option_id: q.answer_index,
        correct_option_ids: [q.answer_index],
        explanation: q.explanation ? truncate(q.explanation, POLL_EXPLANATION_MAX) : undefined,
      } as unknown as Parameters<Api["sendPoll"]>[3];
      const sent = await api.sendPoll(chatId, header + q.body, q.options.map((text) => ({ text })), extra);
      if (sent.poll) {
        await db().from("drill_messages").update({ poll_id: sent.poll.id }).eq("id", msg.id);
        sentAsPoll = true;
      }
    } catch (e) {
      console.error("sendPoll failed, falling back to buttons", e);
    }
  }
  if (!sentAsPoll) {
    // Long question: plain message + A/B/C/D buttons
    const text =
      header +
      "\n" +
      q.body +
      "\n\n" +
      q.options.map((o, i) => `${LETTERS[i]}. ${o}`).join("\n");
    const kb = new InlineKeyboard();
    q.options.forEach((_, i) => kb.text(LETTERS[i], `a:${msg.id}:${i}`));
    await api.sendMessage(chatId, text, { reply_markup: kb });
  }
}

/**
 * Record an answer to a drill message. Returns null if it was already answered
 * (double taps, poll re-votes) so callers can ignore it.
 */
export async function recordDrillAnswer(
  student: Student,
  drillMessageId: number,
  chosen: number,
): Promise<{ correct: boolean; question: Question; session: DrillSession } | null> {
  // Claim the message atomically
  const { data: claimed, error } = await db()
    .from("drill_messages")
    .update({ answered: true })
    .eq("id", drillMessageId)
    .eq("answered", false)
    .select("id, session_id, question_id")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!claimed) return null;

  const session = must(
    await db().from("drill_sessions").select("*").eq("id", claimed.session_id).single(),
    "get session",
  ) as DrillSession;
  if (session.student_id !== student.id) return null;
  // Stale message (e.g. an old poll after the drill was resent) — ignore
  if (session.question_ids[session.position] !== claimed.question_id) return null;

  const question = localiseQuestion(await getQuestion(claimed.question_id), student.track);
  const correct = chosen === question.answer_index;

  await db().from("attempts").insert({
    student_id: student.id,
    question_id: question.id,
    chosen,
    correct,
    context: "drill",
  });
  await updateReviewBox(student.id, question.id, correct);

  const updated = must(
    await db()
      .from("drill_sessions")
      .update({ position: session.position + 1, correct: session.correct + (correct ? 1 : 0) })
      .eq("id", session.id)
      .select()
      .single(),
    "advance session",
  ) as DrillSession;

  return { correct, question, session: updated };
}

/** Leitner box: wrong → due tomorrow; right on a review item → double the interval; mastered after 16 days. */
export async function updateReviewBox(studentId: string, questionId: string, correct: boolean) {
  const { date } = watNow();
  const { data: item } = await db()
    .from("review_items")
    .select("interval_days")
    .eq("student_id", studentId)
    .eq("question_id", questionId)
    .maybeSingle();

  if (!correct) {
    await db()
      .from("review_items")
      .upsert({ student_id: studentId, question_id: questionId, due_on: watDateAddDays(date, 1), interval_days: 1 });
    return;
  }
  if (!item) return;
  const next = (item.interval_days as number) * 2;
  if (next > 16) {
    await db().from("review_items").delete().eq("student_id", studentId).eq("question_id", questionId);
  } else {
    await db()
      .from("review_items")
      .update({ interval_days: next, due_on: watDateAddDays(date, next) })
      .eq("student_id", studentId)
      .eq("question_id", questionId);
  }
}

export async function streakDays(studentId: string): Promise<number> {
  const rows = must(
    await db()
      .from("drill_sessions")
      .select("drill_date")
      .eq("student_id", studentId)
      .not("finished_at", "is", null)
      .order("drill_date", { ascending: false })
      .limit(120),
    "streak",
  ) as { drill_date: string }[];
  const dates = new Set(rows.map((r) => r.drill_date));
  let { date } = watNow();
  if (!dates.has(date)) date = watDateAddDays(date, -1); // today not done yet doesn't break the streak
  let streak = 0;
  while (dates.has(date)) {
    streak++;
    date = watDateAddDays(date, -1);
  }
  return streak;
}

export interface DrillSummary {
  correct: number;
  total: number;
  pct: number;
  streak: number;
  reviewBox: number;
  premium: boolean;
}

/** Mark a session finished and summarise it (used by bot and web). */
export async function completeSession(student: Student, session: DrillSession): Promise<DrillSummary> {
  if (!session.finished_at) {
    await db().from("drill_sessions").update({ finished_at: new Date().toISOString() }).eq("id", session.id).is("finished_at", null);
    await rewardReferral(student.id).catch((e) => console.error("referral reward failed", e));
  }
  const total = session.question_ids.length;
  const { count } = await db().from("review_items").select("*", { count: "exact", head: true }).eq("student_id", student.id);
  return {
    correct: session.correct,
    total,
    pct: Math.round((session.correct / total) * 100),
    streak: await streakDays(student.id),
    reviewBox: count ?? 0,
    premium: await isPremium(student),
  };
}

async function finishSession(api: Api, student: Student, session: DrillSession) {
  const { total, pct, streak, reviewBox: reviewCount, premium } = await completeSession(student, session);

  const lines = [
    `✅ Drill done: *${session.correct}/${total}* (${pct}%)`,
    `🔥 Streak: *${streak} day${streak === 1 ? "" : "s"}*`,
    `🔁 ${reviewCount ?? 0} question${reviewCount === 1 ? "" : "s"} in your review box — they'll come back until you get them right.`,
    "",
    pct >= 80 ? "Strong work. Keep the streak alive tomorrow." : "Every wrong answer today is one you won't miss in the exam.",
  ];
  if (!premium) lines.push("", `_Free plan: ${FREE_DAILY_QUESTIONS} questions/day. Premium gets ${PREMIUM_DAILY_QUESTIONS} + unlimited CBT practice → /premium_`);

  await api.sendMessage(student.telegram_id!, lines.join("\n"), {
    parse_mode: "Markdown",
    reply_markup: new InlineKeyboard().webApp(student.track === "LUK" ? "📝 Practice test" : "🖥 Practice CBT", `${env.appUrl}/mock`).text("📊 My stats", "stats"),
  });
}
