import "./load-env";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

type Row = {
  track: "ITF" | "CCST" | "AWS" | "AZF" | "PYT" | "SEC" | "DAT" | "AIA" | "CON" | "BKP";
  subject: "ITF" | "CCN" | "AWC" | "AZF" | "PCE" | "SECQ" | "DAQ" | "AIQ" | "CONQ" | "BKQ";
  objective: string; topic: string; body: string; options: string[];
  answer: number; explanation: string; difficulty?: number; source: string;
};

const file = process.argv[2];
if (!file) throw new Error("Usage: npx tsx scripts/import-technology-questions.ts data/technology/questions.json");
const url = process.env.SUPABASE_URL?.trim();
const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
if (!url || !key || /YOUR[-_ ]|PLACEHOLDER|CHANGE[-_ ]ME|^xxxx/i.test(key)) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Keep credentials in your private .env.import.local.");
}
const mapping: Record<string, string> = {
  ITF: "ITF", CCST: "CCN", AWS: "AWC", AZF: "AZF", PYT: "PCE",
  SEC: "SECQ", DAT: "DAQ", AIA: "AIQ", CON: "CONQ", BKP: "BKQ"
};
const rows = JSON.parse(readFileSync(file, "utf8")) as Row[];
if (!Array.isArray(rows) || !rows.length) throw new Error("Question file must be a non-empty JSON array.");
const seen = new Set<string>();
for (const [i, r] of rows.entries()) {
  if (!mapping[r.track] || mapping[r.track] !== r.subject) throw new Error(`Row ${i + 1}: invalid track/subject mapping.`);
  if (![r.objective, r.topic, r.body, r.explanation, r.source].every((x) => typeof x === "string" && x.trim())) throw new Error(`Row ${i + 1}: missing objective/topic/body/explanation/source.`);
  if (!Array.isArray(r.options) || r.options.length !== 4 || r.options.some((x) => !x?.trim())) throw new Error(`Row ${i + 1}: exactly four options are required.`);
  if (new Set(r.options.map((x) => x.trim().toLowerCase())).size !== 4) throw new Error(`Row ${i + 1}: duplicate options.`);
  if (!Number.isInteger(r.answer) || r.answer < 0 || r.answer > 3) throw new Error(`Row ${i + 1}: answer must be 0–3.`);
  const fingerprint = `${r.subject}:${r.body.trim().toLowerCase()}`;
  if (seen.has(fingerprint)) throw new Error(`Row ${i + 1}: duplicate question stem.`);
  seen.add(fingerprint);
}
const sb = createClient(url, key, { auth: { persistSession: false } });
let inserted = 0, skipped = 0;
for (const r of rows) {
  const { data: existing, error: lookupError } = await sb.from("questions")
    .select("id").eq("subject_code", r.subject).eq("body", r.body.trim()).limit(1);
  if (lookupError) throw new Error(`Lookup failed: ${lookupError.message}. Confirm migration 0008 is installed.`);
  if (existing?.length) { skipped++; continue; }
  const { error } = await sb.from("questions").insert({
    subject_code: r.subject, topic: `${r.objective.trim()} · ${r.topic.trim()}`,
    body: r.body.trim(), options: r.options.map((x) => x.trim()), answer_index: r.answer,
    explanation: r.explanation.trim(), difficulty: r.difficulty ?? 2, exams: [r.track],
    reviewed: false, practice_published: true,
    source: `Mock Night original practice; blueprint/source: ${r.source.trim()}`,
  });
  if (error) throw new Error(`Insert failed for "${r.body.slice(0, 60)}": ${error.message}`);
  inserted++;
}
console.log(`Imported ${inserted}; skipped existing ${skipped}. reviewed=false; practice_published=true.`);
