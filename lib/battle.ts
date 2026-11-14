// Group quiz battles: /battle in a Telegram group runs a live, timed quiz (quiz polls with open_period).
// When Telegram closes a poll it sends us a `poll` update, which triggers the next question —
// so no long-running process is needed on Vercel.
import { InlineKeyboard, type Api } from "grammy";
import type { PollAnswer, Poll } from "grammy/types";
import { db, must } from "./supabase";
import { env } from "./env";
import { fitsPoll } from "./drill";
import { mockSubjects } from "./mock";
import { localiseQuestion, nigeriaOnlyFor } from "./localise";
import { subjectName } from "./subjects";
import { getTrack } from "./tracks";
import type { Question, Student } from "./types";

export const BATTLE_DEFAULT_QUESTIONS = 10;
export const BATTLE_MIN = 5;
export const BATTLE_MAX = 20;
export const BATTLE_SECONDS = 20;
const SPEED_BONUS = 5;

interface Battle {
  id: string;
  chat_id: number;
  chat_title: string | null;
  started_by: string | null;
  track: string | null;
  question_ids: string[];
  position: number;
  seconds: number;
  status: "running" | "finished" | "cancelled";
}

const header = (b: Battle, pos: number, subject: string) => `⚔️ Q${pos + 1}/${b.question_ids.length} · ${subjectName(subject)}\n`;

export async function runningBattle(chatId: number): Promise<Battle | null> {
  const { data } = await db().from("battles").select("*").eq("chat_id", chatId).eq("status", "running").maybeSingle();
  return (data as Battle | null) ?? null;
}

/** Pick questions from the starter's course that fit in a Telegram poll. */
async function pickQuestions(student: Student, count: number): Promise<Question[]> {
  const subjects = mockSubjects(student);
  if (!subjects.length) return [];
  const per = Math.ceil((count * 2) / subjects.length);
  const pool: Question[] = [];
  for (const subject of subjects) {
    const rows = must(await db().rpc("pick_random_questions", { p_subject: subject, p_limit: per, p_exclude: [] }), "battle pick") as Question[];
    pool.push(...rows.filter((q) => !nigeriaOnlyFor(q, student.track) && fitsPoll(localiseQuestion(q, student.track), "⚔️ Q20/20 · " + subjectName(q.subject_code) + "\n")));
  }
  // Interleave subjects so the battle isn't all one topic
  const bySubject = new Map<string, Question[]>();
  for (const q of pool) bySubject.set(q.subject_code, [...(bySubject.get(q.subject_code) ?? []), q]);
  const out: Question[] = [];
  while (out.length < count && [...bySubject.values()].some((l) => l.length)) {
    for (const list of bySubject.values()) if (list.length && out.length < count) out.push(list.shift()!);
  }
  return out;
}

export async function startBattle(api: Api, chat: { id: number; title?: string }, student: Student, count: number) {
  if (!student.track) return { error: "NO_TRACK" as const };
  if (await runningBattle(chat.id)) return { error: "RUNNING" as const };
  const qs = await pickQuestions(student, count);
  if (qs.length < BATTLE_MIN) return { error: "NO_QUESTIONS" as const };

  const { data, error } = await db()
    .from("battles")
    .insert({ chat_id: chat.id, chat_title: chat.title ?? null, started_by: student.id, track: student.track, question_ids: qs.map((q) => q.id), seconds: BATTLE_SECONDS })
    .select()
    .single();
  if (error) return { error: "RUNNING" as const }; // unique index: someone started one at the same moment
  const battle = data as Battle;

  const t = getTrack(student.track);
  await api.sendMessage(
    chat.id,
    `⚔️ *Quiz battle!* ${t.emoji} ${t.short}\n\n${qs.length} questions · ${battle.seconds} seconds each.\nAnswer fast — correct answers score 10 points, plus up to ${SPEED_BONUS} bonus points for speed.\n\nFirst question coming up…`,
    { parse_mode: "Markdown", reply_markup: new InlineKeyboard().text("⏭ Skip question", `bt:next:${battle.id}`).text("⛔ End", `bt:end:${battle.id}`) },
  );
  await sendBattleQuestion(api, battle, 0, qs[0]);
  return { battle };
}

async function sendBattleQuestion(api: Api, battle: Battle, pos: number, question?: Question) {
  const raw = question ?? (must(await db().from("questions").select("*").eq("id", battle.question_ids[pos]).single(), "battle q") as Question);
  const q = localiseQuestion(raw, battle.track);
  const sent = await api.sendPoll(battle.chat_id, header(battle, pos, q.subject_code) + q.body, q.options.map((text) => ({ text })), {
    type: "quiz",
    is_anonymous: false,
    correct_option_id: q.answer_index,
    open_period: battle.seconds,
    explanation: q.explanation ? (q.explanation.length > 190 ? q.explanation.slice(0, 189) + "…" : q.explanation) : undefined,
  } as Parameters<Api["sendPoll"]>[3]);
  if (!sent.poll) return;
  await db().from("battle_polls").insert({ poll_id: sent.poll.id, battle_id: battle.id, position: pos, question_id: q.id, message_id: sent.message_id, answer_index: q.answer_index });
  await db().from("battles").update({ position: pos }).eq("id", battle.id);
}

/** poll_answer: returns true if this answer belonged to a battle. */
export async function recordBattleAnswer(answer: PollAnswer, studentId: string | null): Promise<boolean> {
  const { data: bp } = await db().from("battle_polls").select("*").eq("poll_id", answer.poll_id).maybeSingle();
  if (!bp) return false;
  const user = answer.user;
  const chosen = answer.option_ids[0];
  if (!user || chosen === undefined || bp.closed) return true;
  const { data: b } = await db().from("battles").select("seconds").eq("id", bp.battle_id).single();
  const correct = chosen === bp.answer_index;
  const elapsed = (Date.now() - new Date(bp.sent_at).getTime()) / 1000;
  const speed = Math.max(0, Math.round(SPEED_BONUS * (1 - elapsed / (b?.seconds ?? BATTLE_SECONDS))));
  await db().from("battle_answers").upsert(
    {
      poll_id: bp.poll_id, battle_id: bp.battle_id, telegram_user_id: user.id, student_id: studentId,
      name: [user.first_name, user.last_name].filter(Boolean).join(" ").slice(0, 60) || user.username || "Player",
      correct, points: correct ? 10 + speed : 0,
    },
    { onConflict: "poll_id,telegram_user_id", ignoreDuplicates: true },
  );
  return true;
}

/** `poll` update: when a battle poll closes, send the next question or finish. */
export async function onPollClosed(api: Api, poll: Poll) {
  if (!poll.is_closed) return;
  await advance(api, poll.id);
}

/** Close the given poll (if still open) and move the battle on. Safe to call twice. */
async function advance(api: Api, pollId: string) {
  const { data: claimed } = await db().from("battle_polls").update({ closed: true }).eq("poll_id", pollId).eq("closed", false).select("*").maybeSingle();
  if (!claimed) return;
  const battle = (await db().from("battles").select("*").eq("id", claimed.battle_id).single()).data as Battle | null;
  if (!battle || battle.status !== "running" || claimed.position !== battle.position) return;
  const next = claimed.position + 1;
  if (next < battle.question_ids.length) return sendBattleQuestion(api, battle, next);
  return finishBattle(api, battle, "finished");
}

/** Skip button: close the current poll now. */
export async function skipQuestion(api: Api, battleId: string) {
  const { data: bp } = await db().from("battle_polls").select("poll_id, message_id").eq("battle_id", battleId).eq("closed", false).order("position", { ascending: false }).limit(1).maybeSingle();
  if (!bp) return;
  const { data: b } = await db().from("battles").select("chat_id").eq("id", battleId).single();
  if (b && bp.message_id) await api.stopPoll(b.chat_id, Number(bp.message_id)).catch(() => undefined);
  await advance(api, bp.poll_id);
}

/** Battles left running (e.g. a missed update) are tidied up by the hourly job. */
export async function expireStaleBattles() {
  const cutoff = new Date(Date.now() - 2 * 3600_000).toISOString();
  await db().from("battles").update({ status: "cancelled", finished_at: new Date().toISOString() }).eq("status", "running").lt("created_at", cutoff);
}

export async function finishBattle(api: Api, battle: Battle, status: "finished" | "cancelled") {
  const { data: done } = await db().from("battles").update({ status, finished_at: new Date().toISOString() }).eq("id", battle.id).eq("status", "running").select("id").maybeSingle();
  if (!done) return;
  await db().from("battle_polls").update({ closed: true }).eq("battle_id", battle.id);

  const rows = (await db().from("battle_answers").select("telegram_user_id, name, correct, points").eq("battle_id", battle.id)).data ?? [];
  const totals = new Map<number, { name: string; points: number; correct: number }>();
  for (const r of rows) {
    const t = totals.get(r.telegram_user_id) ?? { name: r.name ?? "Player", points: 0, correct: 0 };
    t.points += r.points;
    t.correct += r.correct ? 1 : 0;
    totals.set(r.telegram_user_id, t);
  }
  const ranked = [...totals.values()].sort((a, b) => b.points - a.points || b.correct - a.correct);
  const medal = (i: number) => (i === 0 ? "🥇" : i === 1 ? "🥈" : i === 2 ? "🥉" : `${i + 1}.`);
  const asked = status === "finished" ? battle.question_ids.length : battle.position + 1;
  const lines = ranked.slice(0, 10).map((p, i) => `${medal(i)} ${escapeMd(p.name)} — *${p.points}* pts (${p.correct}/${asked})`);
  const title = status === "finished" ? "🏁 *Battle over!*" : "⛔ *Battle ended early.*";
  const winner = ranked[0] ? `\n\n👑 Champion: *${escapeMd(ranked[0].name)}*` : "";
  await api.sendMessage(
    battle.chat_id,
    `${title}\n\n${lines.join("\n") || "Nobody answered this time 😅"}${winner}\n\nWant daily practice that targets your weak spots? Tap below — it's free.`,
    {
      parse_mode: "Markdown",
      reply_markup: new InlineKeyboard().url("📚 Practise privately", `https://t.me/${env.botUsername}?start=battle`).row().text("🔁 Rematch", "bt:again"),
    },
  );
}

export async function endBattle(api: Api, battleId: string) {
  const { data } = await db().from("battles").select("*").eq("id", battleId).maybeSingle();
  if (data) await finishBattle(api, data as Battle, "cancelled");
}

const escapeMd = (s: string) => s.replace(/([_*`\[])/g, "\\$1");
