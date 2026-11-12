/**
 * Build the question bank into data/bank/*.json.
 *   npm run build-bank
 * Then import:
 *   npm run import-questions -- data/bank/all.json --reviewed --source=bank-v1
 */
import { mkdirSync, writeFileSync } from "node:fs";
import type { Q } from "./bank/lib";
import { reseed } from "./bank/lib";
import { maths } from "./bank/mth";
import { physics } from "./bank/phy";
import { chemistry } from "./bank/chm";
import { economics } from "./bank/eco";
import { english } from "./bank/eng";
import { biology } from "./bank/bio";
import { government } from "./bank/gov";
import { lifeInTheUK } from "./bank/luk";
import { fireSafety } from "./bank/fire";

const builders: [string, () => Q[]][] = [
  ["MTH", maths], ["PHY", physics], ["CHM", chemistry], ["ECO", economics], ["ENG", english], ["BIO", biology], ["GOV", government], ["LUK", lifeInTheUK], ["FIR", fireSafety],
];

mkdirSync("data/bank", { recursive: true });
const all: Q[] = [];
let failed = false;

for (const [code, build] of builders) {
  reseed(code.split("").reduce((s, c) => s * 31 + c.charCodeAt(0), 7));
  const raw = build();
  const seen = new Set<string>();
  const qs: Q[] = [];
  const problems: string[] = [];
  for (const q of raw) {
    if (seen.has(q.body)) continue;
    seen.add(q.body);
    const opts = q.options.map((o) => o.trim().toLowerCase());
    if (q.options.length < 2 || q.options.length > 5) problems.push(`options count: ${q.body}`);
    if (new Set(opts).size !== q.options.length) problems.push(`duplicate options: ${q.body}`);
    if (q.answer < 0 || q.answer >= q.options.length) problems.push(`bad answer: ${q.body}`);
    if (q.options.some((o) => !o || /\bNaN\b|undefined|Infinity/.test(o))) problems.push(`bad option text: ${q.body} → ${q.options.join(" | ")}`);
    if (/\bNaN\b|undefined|Infinity/.test(q.body + q.explanation)) problems.push(`bad text: ${q.body}`);
    qs.push(q);
  }
  if (problems.length) {
    failed = true;
    console.error(`${code} problems:\n  ` + problems.join("\n  "));
  }
  const topics = new Set(qs.map((q) => q.topic)).size;
  console.log(`${code}: ${qs.length} questions across ${topics} topics${qs.length < (code === "FIR" ? 120 : 300) ? "  ⚠ under target" : ""}`);
  writeFileSync(`data/bank/${code}.json`, JSON.stringify(qs, null, 1));
  all.push(...qs);
}
writeFileSync("data/bank/all.json", JSON.stringify(all, null, 1));
console.log(`Total: ${all.length}`);
if (failed) process.exit(1);
