// IELTS Writing Task 2 marking: learner sends /essay <question + essay>, Claude returns a band estimate per criterion and fixes.
import { db } from "./supabase";
import { isFounder, isPremium } from "./students";
import type { Student } from "./types";

const MODEL = process.env.ESSAY_MODEL ?? "claude-sonnet-5-5";
export const ESSAY_FREE_PER_DAY = 1;
export const ESSAY_PREMIUM_PER_DAY = 5;

export type EssayResult = { ok: true; text: string; remaining: number | null } | { ok: false; error: "TOO_SHORT" | "TOO_LONG" | "LIMIT" | "DISABLED" | "FAILED"; limit?: number };

export async function markEssay(student: Student, text: string): Promise<EssayResult> {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  if (words < 120) return { ok: false, error: "TOO_SHORT" };
  if (words > 700) return { ok: false, error: "TOO_LONG" };
  if (!process.env.ANTHROPIC_API_KEY) return { ok: false, error: "DISABLED" };

  const founder = isFounder(student);
  const limit = founder ? 1000 : (await isPremium(student)) ? ESSAY_PREMIUM_PER_DAY : ESSAY_FREE_PER_DAY;
  const since = new Date();
  since.setUTCHours(0, 0, 0, 0);
  const { count } = await db().from("essay_reviews").select("*", { count: "exact", head: true }).eq("student_id", student.id).gte("created_at", since.toISOString());
  if ((count ?? 0) >= limit) return { ok: false, error: "LIMIT", limit };

  const prompt = `You are an experienced IELTS examiner. Assess this IELTS Writing Task 2 response using the public band descriptors.
The learner's message may begin with the task question; if it does, judge Task Response against it.

---
${text.trim()}
---

Reply in plain text (no markdown symbols), max 260 words, in this format:
Estimated band: X.X (Task Response X, Coherence and Cohesion X, Lexical Resource X, Grammatical Range and Accuracy X)
Word count: ${words}${words < 250 ? " (under 250 — this is penalised)" : ""}
What works: 2 short points.
To reach the next band: 3 specific, actionable fixes quoting the learner's words.
Better versions: rewrite 2 weak sentences from the essay.
Be honest and calibrated; do not inflate scores. If it is not an essay, say so briefly.`;
  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "x-api-key": process.env.ANTHROPIC_API_KEY!, "anthropic-version": "2023-06-01", "content-type": "application/json" },
      body: JSON.stringify({ model: MODEL, max_tokens: 900, messages: [{ role: "user", content: prompt }] }),
    });
    if (!res.ok) return { ok: false, error: "FAILED" };
    const json = (await res.json()) as { content?: { text?: string }[] };
    const out = json.content?.map((c) => c.text ?? "").join("").replace(/\*\*/g, "").replace(/^#+\s*/gm, "").trim();
    if (!out) return { ok: false, error: "FAILED" };
    const band = out.match(/Estimated band:\s*([\d.]+)/i)?.[1] ?? null;
    await db().from("essay_reviews").insert({ student_id: student.id, words, band });
    return { ok: true, text: out, remaining: founder ? null : limit - (count ?? 0) - 1 };
  } catch {
    return { ok: false, error: "FAILED" };
  }
}
