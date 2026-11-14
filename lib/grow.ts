// Question factory: grows thin banks automatically.
//  1. pick the subject furthest below its target (lib/bank-targets.ts)
//  2. a generator model writes a batch of new questions, steered away from what already exists (saved to grow_batches)
//  3. on the next run, a verifier model answers each question BLIND (no answer key); only questions where it agrees
//     with the key, is confident and flags no problem are kept
//  4. near-duplicates of existing questions are dropped, the rest are inserted and the run is logged
import { db, must } from "./supabase";
import { CODE_ONLY, HIGH_STAKES, targetFor } from "./bank-targets";
import { subjectName } from "./subjects";
import { TRACK_LIST } from "./tracks";

export const GENERATOR_MODEL = process.env.GROW_MODEL ?? "claude-sonnet-5-5";
export const VERIFIER_MODEL = process.env.GROW_VERIFY_MODEL ?? "claude-sonnet-5-5";
export const STRICT_VERIFIER_MODEL = process.env.GROW_STRICT_MODEL ?? "claude-opus-5-5";
export const AUTO_PUBLISH = process.env.GROW_AUTO_PUBLISH !== "false";
const BATCH = Number(process.env.GROW_BATCH ?? 8);

export interface Candidate {
  topic: string;
  body: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: number;
}

interface SubjectInfo {
  code: string;
  name: string;
  exams: string[];
  trackNames: string[];
  audience: string;
  optionCount: number;
}

// ---------------------------------------------------------------------------
// Which subject to grow
// ---------------------------------------------------------------------------
export async function bankStatus(): Promise<{ code: string; live: number; target: number }[]> {
  const subjects = TRACK_LIST.flatMap((t) => t.subjects);
  const unique = [...new Set(subjects)].filter((s) => !CODE_ONLY.has(s));
  const counts = must(await db().from("bank_counts").select("subject_code, live"), "bank counts") as { subject_code: string; live: number }[];
  const live = new Map(counts.map((c) => [c.subject_code, Number(c.live)]));
  const out = unique.map((code) => ({ code, live: live.get(code) ?? 0, target: targetFor(code) }));
  return out.sort((a, b) => a.live / a.target - b.live / b.target);
}

function subjectInfo(code: string, exams: string[]): SubjectInfo {
  const tracks = TRACK_LIST.filter((t) => t.subjects.includes(code));
  const main = tracks[0];
  return {
    code,
    name: subjectName(code),
    exams,
    trackNames: tracks.map((t) => t.name),
    audience: main?.audience ?? (main?.kind === "school" ? "a West African secondary school student preparing for JAMB/WAEC exams" : "an adult learner preparing for a professional exam"),
    optionCount: code === "PLB" ? 5 : 4,
  };
}

// ---------------------------------------------------------------------------
// Model calls
// ---------------------------------------------------------------------------
async function callClaude(model: string, prompt: string, maxTokens: number): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": process.env.ANTHROPIC_API_KEY!, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model, max_tokens: maxTokens, messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) throw new Error(`Anthropic ${res.status}: ${(await res.text().catch(() => "")).slice(0, 300)}`);
  const json = (await res.json()) as { content?: { text?: string }[] };
  return json.content?.map((c) => c.text ?? "").join("") ?? "";
}

/** Pull the first JSON array out of a model reply (tolerates prose or code fences around it). */
export function extractJsonArray(text: string): unknown[] {
  const start = text.indexOf("[");
  const end = text.lastIndexOf("]");
  if (start < 0 || end <= start) return [];
  try {
    const v = JSON.parse(text.slice(start, end + 1));
    return Array.isArray(v) ? v : [];
  } catch {
    return [];
  }
}

// ---------------------------------------------------------------------------
// Validation & de-duplication
// ---------------------------------------------------------------------------
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9 ]+/g, " ").replace(/\s+/g, " ").trim();
const shingles = (s: string) => {
  const w = norm(s).split(" ");
  const set = new Set<string>();
  for (let i = 0; i < w.length - 2; i++) set.add(`${w[i]} ${w[i + 1]} ${w[i + 2]}`);
  return set;
};
export function similarity(a: string, b: string) {
  const A = shingles(a), B = shingles(b);
  if (!A.size || !B.size) return norm(a) === norm(b) ? 1 : 0;
  let inter = 0;
  for (const x of A) if (B.has(x)) inter++;
  return inter / Math.min(A.size, B.size);
}

const BANNED = /\b(all of the above|none of the above|both a and b|all of these)\b/i;

export function validCandidate(c: unknown, optionCount: number): c is Candidate {
  const q = c as Candidate;
  if (!q || typeof q.body !== "string" || !Array.isArray(q.options) || typeof q.answer !== "number") return false;
  if (q.options.length !== optionCount || q.answer < 0 || q.answer >= optionCount || !Number.isInteger(q.answer)) return false;
  if (q.body.length < 15 || q.body.length > 900 || !q.explanation || q.explanation.length < 10) return false;
  if (q.options.some((o) => typeof o !== "string" || !o.trim() || o.length > 160 || BANNED.test(o))) return false;
  if (new Set(q.options.map(norm)).size !== q.options.length) return false;
  return true;
}

// ---------------------------------------------------------------------------
// Prompts
// ---------------------------------------------------------------------------
function generatorPrompt(s: SubjectInfo, topics: { topic: string; n: number }[], recent: string[], count: number) {
  const letters = "ABCDE".slice(0, s.optionCount).split("").join(", ");
  return `You write original practice questions for Mock Night, an exam-prep app.

Subject: ${s.name} (code ${s.code})
Used for: ${s.trackNames.join("; ")}
Learner: ${s.audience}

Existing topics and how many questions each already has (favour official syllabus areas that are missing or thin):
${topics.map((t) => `- ${t.topic}: ${t.n}`).join("\n") || "- (none yet)"}

Do NOT repeat or closely paraphrase these existing questions:
${recent.map((b) => `- ${b.slice(0, 140)}`).join("\n")}

Write ${count} NEW multiple-choice questions at real-exam standard.
Rules:
- Exactly ${s.optionCount} options (${letters}) and exactly ONE unambiguously correct answer. Distractors must be plausible but clearly wrong to an expert.
- Match the real exam's style and difficulty; mix difficulty 1 (easy), 2 (medium) and 3 (hard), mostly 2.
- Only use facts that are stable, uncontroversial and current. If you are not certain a fact is correct, do not use it. No current affairs, no named living office-holders, no prices or statistics that change.
- For calculations, keep numbers clean and put the full working in the explanation.
- Never use "all of the above" / "none of the above". Options under 120 characters. Question under 600 characters.
- Explanations: 1–3 sentences saying why the answer is right (and the key trap if useful). British English unless the exam is American (NCLEX, SAT).
- Do not copy from copyrighted question banks or past papers; write original questions.

Return ONLY a JSON array, no other text:
[{"topic": "...", "body": "...", "options": ["...", ...], "answer": <0-based index of the correct option>, "explanation": "...", "difficulty": 1|2|3}]`;
}

function verifierPrompt(s: SubjectInfo, qs: Candidate[]) {
  const L = "ABCDE";
  return `You are a strict examiner checking practice questions for: ${s.trackNames.join("; ")} (subject: ${s.name}).
Answer each question yourself, independently. Then judge the question's quality.

${qs.map((q, i) => `Q${i}: ${q.body}\n${q.options.map((o, j) => `  ${L[j]}. ${o}`).join("\n")}`).join("\n\n")}

For each question return:
- "i": the question number
- "answer": the 0-based index of the single best answer in your expert judgement
- "confident": true only if you are highly confident AND exactly one option is defensibly correct
- "issue": "" if the question is accurate, current, unambiguous and exam-appropriate; otherwise a short description of the problem (factual error, ambiguity, two correct options, outdated guidance, culturally inappropriate, etc.)

Return ONLY a JSON array: [{"i": 0, "answer": 2, "confident": true, "issue": ""}, ...]`;
}

// ---------------------------------------------------------------------------
// One growth run
// ---------------------------------------------------------------------------
export interface GrowResult {
  step: "generate" | "verify" | "idle";
  subject: string;
  generated: number;
  verified: number;
  duplicates: number;
  inserted: number;
  rejected: { body: string; reason: string }[];
  error?: string;
}

const empty = (step: GrowResult["step"], subject: string): GrowResult => ({ step, subject, generated: 0, verified: 0, duplicates: 0, inserted: 0, rejected: [] });

/**
 * One factory step, kept short enough for a 60-second serverless function:
 * if a generated batch is waiting, verify and insert it; otherwise generate a new batch for the thinnest bank.
 */
export async function growOnce(forceSubject?: string): Promise<GrowResult> {
  if (!process.env.ANTHROPIC_API_KEY) return { ...empty("idle", "-"), error: "ANTHROPIC_API_KEY not set" };
  // Housekeeping: retry batches whose run timed out mid-verification; drop batches that keep failing for a day
  await db().from("grow_batches").update({ status: "pending" }).eq("status", "verifying").lt("created_at", new Date(Date.now() - 10 * 60_000).toISOString());
  await db().from("grow_batches").update({ status: "done" }).eq("status", "pending").lt("created_at", new Date(Date.now() - 86_400_000).toISOString());
  const { data: waiting } = await db().from("grow_batches").select("*").eq("status", "pending").order("created_at").limit(1).maybeSingle();
  if (waiting) return verifyBatch(waiting as GrowBatch);
  return generateBatch(forceSubject);
}

interface GrowBatch { id: number; subject_code: string; candidates: Candidate[]; status: string }

async function context(code: string) {
  const existing = must(await db().from("questions").select("body, topic").eq("subject_code", code).limit(5000), "existing bodies") as { body: string; topic: string | null }[];
  const { data: subj } = await db().from("subjects").select("exams").eq("code", code).maybeSingle();
  return { existing, info: subjectInfo(code, (subj?.exams as string[] | undefined) ?? []) };
}

async function generateBatch(forceSubject?: string): Promise<GrowResult> {
  const status = await bankStatus();
  const pick = forceSubject ? status.find((x) => x.code === forceSubject) : status.find((x) => x.live < x.target);
  if (!pick) return { ...empty("idle", "-"), error: "all banks at target" };
  const result = empty("generate", pick.code);
  try {
    const { existing, info } = await context(pick.code);
    const topicCounts = new Map<string, number>();
    for (const r of existing) topicCounts.set(r.topic ?? "General", (topicCounts.get(r.topic ?? "General") ?? 0) + 1);
    const topics = [...topicCounts.entries()].map(([topic, n]) => ({ topic, n })).sort((a, b) => a.n - b.n).slice(0, 40);
    const recent = [...existing].sort(() => Math.random() - 0.5).slice(0, 40).map((r) => r.body);

    const raw = extractJsonArray(await callClaude(GENERATOR_MODEL, generatorPrompt(info, topics, recent, BATCH), 6000));
    const candidates = raw.filter((c) => validCandidate(c, info.optionCount)) as Candidate[];
    for (const c of raw) if (!validCandidate(c, info.optionCount)) result.rejected.push({ body: String((c as Candidate)?.body ?? "").slice(0, 80), reason: "failed format checks" });
    result.generated = candidates.length;
    if (candidates.length) await db().from("grow_batches").insert({ subject_code: pick.code, candidates, status: "pending" });
  } catch (e) {
    result.error = (e as Error).message;
  }
  return logRun(result);
}

async function verifyBatch(batch: GrowBatch): Promise<GrowResult> {
  const result = empty("verify", batch.subject_code);
  // Claim the batch so two overlapping cron calls don't both process it
  const { data: claimed } = await db().from("grow_batches").update({ status: "verifying" }).eq("id", batch.id).eq("status", "pending").select("id").maybeSingle();
  if (!claimed) return { ...result, step: "idle" };
  try {
    const { existing, info } = await context(batch.subject_code);
    const candidates = batch.candidates;
    result.generated = candidates.length;

    // Blind verification (stronger model for high-stakes exams)
    const verifier = HIGH_STAKES.has(batch.subject_code) ? STRICT_VERIFIER_MODEL : VERIFIER_MODEL;
    const verdicts = extractJsonArray(await callClaude(verifier, verifierPrompt(info, candidates), 3000)) as { i: number; answer: number; confident: boolean; issue: string }[];
    const byIndex = new Map(verdicts.map((v) => [Number(v.i), v]));
    const passed: Candidate[] = [];
    candidates.forEach((c, i) => {
      const v = byIndex.get(i);
      if (!v) return result.rejected.push({ body: c.body.slice(0, 80), reason: "no verdict" });
      if (Number(v.answer) !== c.answer) return result.rejected.push({ body: c.body.slice(0, 80), reason: `verifier chose ${"ABCDE"[Number(v.answer)] ?? "?"}, key was ${"ABCDE"[c.answer]}` });
      if (!v.confident || (v.issue && v.issue.trim())) return result.rejected.push({ body: c.body.slice(0, 80), reason: v.issue?.trim() || "verifier not confident" });
      passed.push(c);
    });
    result.verified = passed.length;

    // De-duplicate against the bank and within the batch
    const bodies = existing.map((r) => r.body);
    const fresh: Candidate[] = [];
    for (const c of passed) {
      if ([...bodies, ...fresh.map((f) => f.body)].some((b) => similarity(b, c.body) >= 0.6)) {
        result.duplicates++;
        continue;
      }
      fresh.push(c);
    }

    if (fresh.length) {
      const rows = fresh.map((c) => ({
        subject_code: batch.subject_code,
        exams: info.exams,
        topic: (c.topic || "General").slice(0, 80),
        body: c.body.trim(),
        options: c.options.map((o) => o.trim()),
        answer_index: c.answer,
        explanation: c.explanation.trim(),
        difficulty: [1, 2, 3].includes(Number(c.difficulty)) ? Number(c.difficulty) : 2,
        reviewed: false,
        practice_published: AUTO_PUBLISH,
        source: `ai-grow:${GENERATOR_MODEL}:verified-by:${verifier}`,
      }));
      must(await db().from("questions").insert(rows), "insert grown questions");
      result.inserted = rows.length;
    }
    await db().from("grow_batches").update({ status: "done" }).eq("id", batch.id);
  } catch (e) {
    result.error = (e as Error).message;
    // Put it back so the next run retries (gives up after it has been around for a day)
    await db().from("grow_batches").update({ status: "pending" }).eq("id", batch.id);
  }
  return logRun(result);
}

async function logRun(r: GrowResult) {
  await db().from("grow_runs").insert({
    step: r.step,
    subject_code: r.subject, generated: r.generated, verified: r.verified, duplicates: r.duplicates, inserted: r.inserted,
    rejected: r.rejected.slice(0, 20), error: r.error ?? null,
  });
  return r;
}

/** A learner flagged a question. Unreviewed questions are hidden after 2 reports until someone checks them. */
export async function reportQuestion(questionId: string, studentId: string) {
  await db().from("question_reports").upsert({ question_id: questionId, student_id: studentId }, { onConflict: "question_id,student_id", ignoreDuplicates: true });
  const { count } = await db().from("question_reports").select("*", { count: "exact", head: true }).eq("question_id", questionId);
  if ((count ?? 0) >= 2) await db().from("questions").update({ practice_published: false }).eq("id", questionId).eq("reviewed", false);
  return count ?? 0;
}
