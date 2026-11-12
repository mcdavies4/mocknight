import { db } from "./supabase";
import { isPremium } from "./students";
import { getTrack } from "./tracks";
import { subjectName } from "./subjects";
import { AI_FREE_PER_DAY, AI_PREMIUM_PER_DAY } from "./pricing";
import type { Question, Student } from "./types";

const LETTERS = ["A", "B", "C", "D", "E"];
const MODEL = process.env.AI_MODEL ?? "claude-haiku-5-5";

export type ExplainResult =
  | { ok: true; text: string; remaining: number | null }
  | { ok: false; error: "DISABLED" | "LIMIT" | "NOT_ANSWERED" | "FAILED"; limit?: number };

/**
 * Explain why the right answer is right (and the learner's choice wrong).
 * Only for questions the learner has already answered, so it can't be used to cheat in a live test.
 * Cached per (question, chosen option); cached answers don't count towards the daily limit.
 */
export async function explain(student: Student, questionId: string): Promise<ExplainResult> {
  const { data: att } = await db()
    .from("attempts")
    .select("chosen")
    .eq("student_id", student.id)
    .eq("question_id", questionId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (!att) return { ok: false, error: "NOT_ANSWERED" };
  const chosen = (att.chosen ?? -1) as number;

  const { data: cached } = await db().from("ai_explanations").select("text").eq("question_id", questionId).eq("chosen", chosen).maybeSingle();
  if (cached) return { ok: true, text: cached.text, remaining: null };

  if (!process.env.ANTHROPIC_API_KEY) return { ok: false, error: "DISABLED" };

  const limit = (await isPremium(student)) ? AI_PREMIUM_PER_DAY : AI_FREE_PER_DAY;
  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);
  const { count } = await db()
    .from("ai_requests")
    .select("*", { count: "exact", head: true })
    .eq("student_id", student.id)
    .gte("created_at", since.toISOString());
  if ((count ?? 0) >= limit) return { ok: false, error: "LIMIT", limit };

  const { data: q } = await db().from("questions").select("*").eq("id", questionId).single();
  if (!q) return { ok: false, error: "FAILED" };
  const text = await callModel(q as Question, chosen, student);
  if (!text) return { ok: false, error: "FAILED" };

  await db().from("ai_requests").insert({ student_id: student.id, question_id: questionId });
  await db().from("ai_explanations").upsert({ question_id: questionId, chosen, text });
  return { ok: true, text, remaining: limit - (count ?? 0) - 1 };
}

async function callModel(q: Question, chosen: number, student: Student): Promise<string | null> {
  const track = getTrack(student.track);
  const audience =
    track.kind === "school"
      ? "a West African secondary school student preparing for JAMB/WAEC-style exams"
      : track.code === "LUK"
        ? "an adult preparing for the UK 'Life in the UK' citizenship test"
        : "an adult worker learning workplace fire safety in the UK";
  const opts = q.options.map((o, i) => `${LETTERS[i]}. ${o}`).join("\n");
  const prompt = `You are a patient, encouraging tutor for ${audience}.

Subject: ${subjectName(q.subject_code)}${q.topic ? ` — ${q.topic}` : ""}
Question: ${q.body}
Options:
${opts}
Correct answer: ${LETTERS[q.answer_index]}. ${q.options[q.answer_index]}
${chosen >= 0 && chosen !== q.answer_index ? `The learner chose: ${LETTERS[chosen]}. ${q.options[chosen]}` : chosen === q.answer_index ? "The learner chose the correct answer." : "The learner did not answer."}
${q.explanation ? `Reference note: ${q.explanation}` : ""}

Explain in simple, clear English (max 110 words):
1. Why the correct answer is right — show the working for calculations, step by step.
2. ${chosen >= 0 && chosen !== q.answer_index ? "Why the learner's choice is wrong, naming the likely mistake." : "One quick tip to remember it."}
3. A short memory tip if helpful.
Plain text only. No headings, no markdown symbols like ** or #. Do not invent facts beyond the question and reference note.`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY!, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 400, messages: [{ role: "user", content: prompt }] }),
    });
    if (!res.ok) {
      console.error("AI explain failed", res.status, await res.text().catch(() => ""));
      return null;
    }
    const json = (await res.json()) as { content?: { type: string; text?: string }[] };
    const text = json.content?.map((c) => c.text ?? "").join("").trim();
    return text ? text.replace(/\*\*/g, "").replace(/^#+\s*/gm, "") : null;
  } catch (e) {
    console.error("AI explain error", e);
    return null;
  }
}
