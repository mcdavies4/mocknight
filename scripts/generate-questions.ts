/**
 * Draft new questions with Claude, aligned to the JAMB/WAEC syllabus.
 * Output goes to data/generated/ for a TEACHER TO CHECK before import.
 *
 *   npm run generate-questions -- PHY "Current electricity" 20
 *   # teacher checks data/generated/PHY-....json, then:
 *   npm run import-questions -- data/generated/PHY-....json --reviewed --source=ai+teacher
 */
import "dotenv/config";
import { mkdirSync, writeFileSync } from "node:fs";

const [subject, topic, countRaw] = process.argv.slice(2);
const count = Number(countRaw ?? 15);
if (!subject || !topic) {
  console.error('Usage: npm run generate-questions -- <SUBJECT_CODE> "<topic>" [count]');
  process.exit(1);
}

const prompt = `You are an experienced Nigerian secondary-school examiner writing ORIGINAL practice questions
in the style of JAMB UTME and WAEC WASSCE objective papers.

Subject code: ${subject}
Topic: ${topic}
Number of questions: ${count}

Rules:
- Original questions only. Do not copy past papers or textbooks word for word.
- Exactly 4 options each, one unambiguously correct answer. Plausible distractors based on common student mistakes.
- Keep each question under 280 characters and each option under 90 characters where possible.
- Use Nigerian context where natural (names, places, naira).
- Use Unicode for maths/science (x², H₂O, √, π, °) — no LaTeX.
- Mix difficulty: about 30% easy (1), 50% medium (2), 20% hard (3).
- Explanation: 1–2 sentences showing the working or reason, under 200 characters.
- Double-check every calculation.

Return ONLY a JSON array, no prose, in this shape:
[{"subject":"${subject}","topic":"${topic}","body":"...","options":["...","...","...","..."],"answer":0,"explanation":"...","difficulty":2}]`;

const res = await fetch("https://api.anthropic.com/v1/messages", {
  method: "POST",
  headers: {
    "x-api-key": process.env.ANTHROPIC_API_KEY!,
    "anthropic-version": "2023-06-01",
    "content-type": "application/json",
  },
  body: JSON.stringify({ model: "claude-sonnet-5-5", max_tokens: 8000, messages: [{ role: "user", content: prompt }] }),
});
const json = (await res.json()) as any;
if (!res.ok) {
  console.error(json);
  process.exit(1);
}
const text: string = json.content?.map((c: any) => c.text ?? "").join("") ?? "";
const start = text.indexOf("[");
const end = text.lastIndexOf("]");
const questions = JSON.parse(text.slice(start, end + 1));

mkdirSync("data/generated", { recursive: true });
const out = `data/generated/${subject}-${topic.replace(/\W+/g, "_")}-${Date.now()}.json`;
writeFileSync(out, JSON.stringify(questions, null, 2));
console.log(`Wrote ${questions.length} questions to ${out}\nHave a teacher check them, then import with --reviewed.`);
