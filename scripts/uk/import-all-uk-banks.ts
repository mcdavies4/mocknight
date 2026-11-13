import "../load-env";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

type Row = { subject: string; topic: string; body: string; options: string[]; answer: number; explanation: string; difficulty: number; exams: string[] };
const files = ["data/uk/uk-six-banks.json", "data/uk/uk-five-expansion-banks.json"];
const rows = files.flatMap((file) => JSON.parse(readFileSync(file, "utf8")) as Row[]);
const expected: Record<string, string> = {
  FSM1: "FSM", FSM2: "FSM", FSE1: "FSE", FSE2: "FSE", DRV: "DRIVE", CAR: "CARE",
  CTH: "CITB", SIAQ: "SIA", FOD: "FOOD", CWR: "CAREW", WHS: "HSE",
};
const required = Object.keys(expected);
const errors: string[] = [];
for (const code of required) {
  const count = rows.filter((r) => r.subject === code).length;
  if (count !== 100) errors.push(`${code}: expected 100 questions, found ${count}`);
}
const seen = new Set<string>();
for (const [i, r] of rows.entries()) {
  if (!required.includes(r.subject)) errors.push(`Row ${i + 1}: unknown subject ${r.subject}`);
  if (!r.body?.trim() || !r.topic?.trim() || !r.explanation?.trim()) errors.push(`Row ${i + 1}: missing text`);
  if (!Array.isArray(r.options) || r.options.length !== 4 || new Set(r.options).size !== 4) errors.push(`Row ${i + 1}: expected four distinct options`);
  if (!Number.isInteger(r.answer) || r.answer < 0 || r.answer > 3) errors.push(`Row ${i + 1}: invalid answer index`);
  if (JSON.stringify(r.exams) !== JSON.stringify([expected[r.subject]])) errors.push(`Row ${i + 1}: incorrect exam mapping`);
  const key = `${r.subject}:${r.body.trim().toLowerCase()}`;
  if (seen.has(key)) errors.push(`Row ${i + 1}: duplicate question body`);
  seen.add(key);
}
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
const url = process.env.SUPABASE_URL?.trim();
const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
if (!url || !key || /PLACEHOLDER|YOUR[-_ ]/i.test(url + key)) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local"); process.exit(1);
}
const db = createClient(url, key, { auth: { persistSession: false } });
const { data: subjects, error: subjectError } = await db.from("subjects").select("code,exams").in("code", required);
if (subjectError) throw subjectError;
for (const code of required) {
  const subject = subjects?.find((s) => s.code === code);
  if (!subject) throw new Error(`Subject ${code} missing. Apply migrations 0007, 0008 and 0009 in Supabase SQL Editor first.`);
  if (JSON.stringify(subject.exams) !== JSON.stringify([expected[code]])) throw new Error(`Subject ${code} has an unexpected exam mapping. No further imports performed.`);
}
let inserted = 0, skipped = 0;
for (const r of rows) {
  const { data: old, error: findError } = await db.from("questions").select("id").eq("subject_code", r.subject).eq("body", r.body).limit(1);
  if (findError) throw findError;
  if (old?.length) { skipped++; continue; }
  const { error } = await db.from("questions").insert({
    subject_code: r.subject, topic: r.topic, body: r.body, options: r.options,
    answer_index: r.answer, explanation: r.explanation, difficulty: r.difficulty,
    exams: r.exams, reviewed: false, practice_published: true, source: "ai-authored-practice-v1",
  });
  if (error) throw new Error(`${r.subject} import stopped: ${error.message}`);
  inserted++;
}
for (const code of required) {
  const { count, error } = await db.from("questions").select("id", { count: "exact", head: true })
    .eq("subject_code", code).or("reviewed.eq.true,practice_published.eq.true");
  if (error) throw error;
  if ((count ?? 0) < 100) throw new Error(`${code} verification failed: ${count ?? 0} published questions`);
}
console.log(`UK pathways import complete. Inserted ${inserted}; existing rows skipped ${skipped}.`);
console.log("Verified 100 published questions in each of 11 subject banks (1,100 total). All five new pathways use the existing Telegram drill and mock engine.");
console.log("Content is AI-authored practice material, not official exam questions or independently human-verified material.");
