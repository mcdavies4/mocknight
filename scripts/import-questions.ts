/**
 * Import questions from a JSON file into Supabase.
 *
 *   npm run import-questions -- data/questions.seed.json --reviewed
 *
 * JSON format: [{ subject, topic?, body, options[], answer (0-based), explanation?, difficulty? }]
 * Pass --reviewed only after a teacher has checked the file. Unreviewed questions are stored but never served.
 */
import "dotenv/config";
import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

interface Row {
  subject: string;
  topic?: string;
  body: string;
  options: string[];
  answer: number;
  explanation?: string;
  difficulty?: number;
  exams?: string[];
}

const file = process.argv[2];
const reviewed = process.argv.includes("--reviewed");
const source = process.argv.find((a) => a.startsWith("--source="))?.split("=")[1] ?? "import";
if (!file) {
  console.error("Usage: npm run import-questions -- <file.json> [--reviewed] [--source=name]");
  process.exit(1);
}

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, { auth: { persistSession: false } });
const rows = JSON.parse(readFileSync(file, "utf8")) as Row[];

const problems: string[] = [];
rows.forEach((r, i) => {
  if (!r.subject || !r.body || !Array.isArray(r.options)) problems.push(`#${i}: missing subject/body/options`);
  else if (r.options.length < 2 || r.options.length > 5) problems.push(`#${i}: needs 2–5 options`);
  else if (!Number.isInteger(r.answer) || r.answer < 0 || r.answer >= r.options.length) problems.push(`#${i}: answer index out of range`);
  else if (new Set(r.options.map((o) => o.trim().toLowerCase())).size !== r.options.length) problems.push(`#${i}: duplicate options`);
});
if (problems.length) {
  console.error("Fix these first:\n" + problems.join("\n"));
  process.exit(1);
}

const toRow = (r: Row) => ({
  subject_code: r.subject.toUpperCase(),
  topic: r.topic ?? null,
  body: r.body.trim(),
  options: r.options.map((o) => o.trim()),
  answer_index: r.answer,
  explanation: r.explanation ?? null,
  difficulty: r.difficulty ?? 2,
  exams: r.exams ?? ["JAMB", "WAEC"],
  reviewed,
  source,
});

let inserted = 0;
let skipped = 0;
const BATCH = 200;
for (let i = 0; i < rows.length; i += BATCH) {
  const chunk = rows.slice(i, i + BATCH);
  const { error } = await sb.from("questions").insert(chunk.map(toRow));
  if (!error) {
    inserted += chunk.length;
  } else {
    // A duplicate in the batch: fall back to one-by-one for this batch
    for (const r of chunk) {
      const { error: e } = await sb.from("questions").insert(toRow(r));
      if (!e) inserted++;
      else {
        skipped++;
        if (e.code !== "23505") console.error(r.body.slice(0, 60), "→", e.message);
      }
    }
  }
  process.stdout.write(`\r${Math.min(i + BATCH, rows.length)}/${rows.length}`);
}
console.log(`\nInserted ${inserted}, skipped ${skipped} (duplicates/errors). reviewed=${reviewed}`);
