from pathlib import Path
from datetime import datetime
import shutil, sys, tempfile

root = Path.cwd()
required = ["lib/tracks.ts","lib/subjects.ts","lib/pricing.ts","bot/bot.ts","bot/keyboards.ts","app/exams/page.tsx","app/page.tsx","package.json"]
missing = [x for x in required if not (root/x).is_file()]
if missing:
    raise SystemExit("Run from the Mock Night project root. Missing: " + ", ".join(missing))
backup = Path(tempfile.mkdtemp(prefix="mocknight-tech-backup-"))
saved = set()

def patch(path, old, new, label):
    p = root/path
    s = p.read_text(encoding="utf-8")
    if new in s:
        print("Already applied:", label); return
    if old not in s:
        raise RuntimeError("Safe insertion point not found for " + label + " in " + path)
    if path not in saved:
        shutil.copy2(p, backup/path.replace("/","__")); saved.add(path)
    p.write_text(s.replace(old,new,1),encoding="utf-8")
    print("Updated",path)

def create(path, content):
    p=root/path
    if p.exists():
        if p.read_text(encoding="utf-8")==content:
            print("Already exists:",path); return
        raise RuntimeError(path+" already exists with different content; refusing to overwrite.")
    p.parent.mkdir(parents=True,exist_ok=True)
    p.write_text(content,encoding="utf-8")
    print("Created",path)

track_codes = '"JAMB" | "WAEC" | "PUTME" | "WASSCE_GH" | "LUK"'
patch("lib/tracks.ts",track_codes,
      '"JAMB" | "WAEC" | "PUTME" | "WASSCE_GH" | "ITF" | "CCST" | "AWS" | "AZF" | "PYT" | "LUK',"track codes")
patch("lib/tracks.ts",'currency: "NGN" | "GBP" | "ETB" | "INR";',
      'currency: "NGN" | "GBP" | "ETB" | "INR" | "USD";',"USD currency")
patch("lib/tracks.ts","  NMC: {",'\n  ITF: {\n    code: "ITF", name: "IT Support Fundamentals", short: "IT Support",\n    emoji: "🖥️", kind: "professional", region: "GLOBAL", currency: "USD",\n    subjectMode: "single", subjects: ["ITF"], compulsory: ["ITF"], minSubjects: 1, maxSubjects: 1, subjectNote: "",\n    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },\n    weeklyMock: false, askState: false, askSchool: false, plans: ["itf_pass"],\n    tagline: "Original entry-level IT support practice: devices, operating systems, helpdesk and troubleshooting",\n    timeZone: "UTC", timeLabel: "UTC", audience: "a beginner preparing for an entry-level IT support or helpdesk role",\n  },\n  CCST: {\n    code: "CCST", name: "Cisco CCST Networking (100-150) Practice", short: "CCST Networking",\n    emoji: "🌐", kind: "professional", region: "GLOBAL", currency: "USD",\n    subjectMode: "single", subjects: ["CCN"], compulsory: ["CCN"], minSubjects: 1, maxSubjects: 1, subjectNote: "",\n    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },\n    weeklyMock: false, askState: false, askSchool: false, plans: ["ccst_pass"],\n    tagline: "Original practice mapped to Cisco\'s published CCST Networking exam topics",\n    timeZone: "UTC", timeLabel: "UTC", audience: "a learner preparing for Cisco CCST Networking exam 100-150",\n  },\n  AWS: {\n    code: "AWS", name: "AWS Certified Cloud Practitioner (CLF-C02) Practice", short: "AWS Cloud Practitioner",\n    emoji: "☁️", kind: "professional", region: "GLOBAL", currency: "USD",\n    subjectMode: "single", subjects: ["AWC"], compulsory: ["AWC"], minSubjects: 1, maxSubjects: 1, subjectNote: "",\n    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },\n    weeklyMock: false, askState: false, askSchool: false, plans: ["aws_pass"],\n    tagline: "Original practice across cloud concepts, security, services and billing",\n    timeZone: "UTC", timeLabel: "UTC", audience: "a beginner preparing for the AWS Certified Cloud Practitioner CLF-C02 exam",\n  },\n  AZF: {\n    code: "AZF", name: "Microsoft Azure Fundamentals (AZ-900) Practice", short: "Azure Fundamentals",\n    emoji: "🔷", kind: "professional", region: "GLOBAL", currency: "USD",\n    subjectMode: "single", subjects: ["AZF"], compulsory: ["AZF"], minSubjects: 1, maxSubjects: 1, subjectNote: "",\n    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },\n    weeklyMock: false, askState: false, askSchool: false, plans: ["az900_pass"],\n    tagline: "Original practice aligned to the current AZ-900 skills-measured guide",\n    timeZone: "UTC", timeLabel: "UTC", audience: "a learner preparing for Microsoft Azure Fundamentals AZ-900",\n  },\n  PYT: {\n    code: "PYT", name: "Python Programming Foundations (PCEP-30-03 aligned)", short: "Python Foundations",\n    emoji: "🐍", kind: "professional", region: "GLOBAL", currency: "USD",\n    subjectMode: "single", subjects: ["PCE"], compulsory: ["PCE"], minSubjects: 1, maxSubjects: 1, subjectNote: "",\n    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },\n    weeklyMock: false, askState: false, askSchool: false, plans: ["python_pass"],\n    tagline: "Original Python practice across syntax, control flow, collections, functions and files",\n    timeZone: "UTC", timeLabel: "UTC", audience: "a beginner learning Python and preparing for Python Institute PCEP-30-03",\n  },\n'+"  NMC: {","technology tracks")
patch("lib/tracks.ts","export const TRACK_LIST = Object.values(TRACKS);",
      'export const TRACK_LIST = Object.values(TRACKS);\nexport const TECH_TRACK_CODES = ["ITF", "CCST", "AWS", "AZF", "PYT"] as const;',"technology code list")

patch("lib/subjects.ts",'  WHS: "Workplace Health and Safety Essentials",\n};',
      '  WHS: "Workplace Health and Safety Essentials",\n  ITF: "IT Support Fundamentals",\n  CCN: "Cisco CCST Networking",\n  AWC: "AWS Cloud Practitioner",\n  AZF: "Azure Fundamentals",\n  PCE: "Python Programming Foundations",\n};',"subject names")

patch("lib/pricing.ts","  fire_individual: {",
      '  itf_pass: { code: "itf_pass", label: "IT Support Fundamentals — 90 days", amount: 999, currency: "USD", days: 90, provider: "stripe" },\n'
      '  ccst_pass: { code: "ccst_pass", label: "Cisco CCST Networking Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe" },\n'
      '  aws_pass: { code: "aws_pass", label: "AWS Cloud Practitioner Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe" },\n'
      '  az900_pass: { code: "az900_pass", label: "Azure Fundamentals AZ-900 Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe" },\n'
      '  python_pass: { code: "python_pass", label: "Python Foundations — 90 days", amount: 999, currency: "USD", days: 90, provider: "stripe" },\n\n'
      '  fire_individual: {',"individual technology plans")

patch("bot/keyboards.ts",'import { getTrack, regionsFor, TRACK_LIST, variantsFor } from "@/lib/tracks";',
      'import { getTrack, regionsFor, TRACK_LIST, TECH_TRACK_CODES, variantsFor } from "@/lib/tracks";',"keyboard import")
patch("bot/keyboards.ts",'export function subjectsKb(student: Student) {',
      'export function techTrackKb() {\n'
      '  const kb = new InlineKeyboard();\n'
      '  TRACK_LIST.filter((t) => TECH_TRACK_CODES.includes(t.code as (typeof TECH_TRACK_CODES)[number]))\n'
      '    .forEach((t) => kb.text(`${t.emoji} ${t.name}`, `ob:track:${t.code}`).row());\n'
      '  return kb;\n'
      '}\n\n'
      'export function subjectsKb(student: Student) {',"Telegram technology keyboard")
patch("bot/bot.ts",'import { menuKb, statesKb, subjectsKb, timeKb, trackKb } from "./keyboards";',
      'import { menuKb, statesKb, subjectsKb, techTrackKb, timeKb, trackKb } from "./keyboards";',"bot keyboard import")
patch("bot/bot.ts",'  // Browse or switch exam pathways without creating a new Telegram account.\n  bot.command("exams", async (ctx) => {',
      '  bot.command("tech", async (ctx) => {\n'
      '    if (!isPrivate(ctx)) return;\n'
      '    await updateStudent(ctx.student!.id, { onboarding_step: "exam" });\n'
      '    return ctx.reply("🌍 *Technology & Digital Careers*\\\\nChoose a pathway:", { parse_mode: "Markdown", reply_markup: techTrackKb() });\n'
      '  });\n\n'
      '  // Browse or switch exam pathways without creating a new Telegram account.\n'
      '  bot.command("exams", async (ctx) => {',"Telegram /tech command")

patch("app/exams/page.tsx",'      <section className="card" style={{ marginTop: 28 }}>\n        <h2 style={{ marginTop: 0 }}>Prefer Telegram?</h2>',
      '      <section className="card" style={{ marginTop: 28 }}>\n'
      '        <h2 style={{ marginTop: 0 }}>🌍 Technology & Digital Careers</h2>\n'
      '        <p className="muted">Explore global IT support, networking, cloud and Python pathways.</p>\n'
      '        <Link className="btn" href="/technology">Explore technology pathways</Link>\n'
      '      </section>\n\n'
      '      <section className="card" style={{ marginTop: 28 }}>\n'
      '        <h2 style={{ marginTop: 0 }}>Prefer Telegram?</h2>',"technology link")
patch("app/page.tsx",'      <div className="grid2">',
      '      <section className="card" style={{ marginBottom: 12 }}>\n'
      '        <h2 style={{ marginTop: 0 }}>🌍 Technology & Digital Careers</h2>\n'
      '        <p>Global IT support, Cisco networking, AWS, Azure and Python learning pathways — with practice on web and Telegram.</p>\n'
      '        <Link className="btn" href="/technology">Explore technology pathways</Link>\n'
      '      </section>\n\n'
      '      <div className="grid2">',"home page technology link")

patch("package.json",'"import-questions": "tsx scripts/import-questions.ts",',
      '"import-questions": "tsx scripts/import-questions.ts",\n    "import-technology-questions": "tsx scripts/import-technology-questions.ts",',"import script")
create("app/technology/page.tsx",'import Link from "next/link";\nimport { TRACKS } from "@/lib/tracks";\n\nexport const metadata = {\n  title: "Technology & Digital Careers — Mock Night",\n  description: "Global technology learning and original certification-preparation practice on Mock Night.",\n};\n\nconst CODES = ["ITF", "CCST", "AWS", "AZF", "PYT"] as const;\n\nexport default function TechnologyPage() {\n  return (\n    <main className="wrap" style={{ maxWidth: 960 }}>\n      <section className="hero">\n        <p className="muted small">MOCK NIGHT · GLOBAL TECHNOLOGY</p>\n        <h1>Technology & Digital Careers</h1>\n        <p className="muted">\n          Build practical technology knowledge and prepare with original practice questions,\n          explanations, timed tests and progress tracking. These are independent Mock Night\n          learning resources, not official vendor exam questions or certification awards.\n        </p>\n      </section>\n      <div className="grid2">\n        {CODES.map((code) => {\n          const track = TRACKS[code];\n          return (\n            <article className="card" key={code}>\n              <h2 style={{ marginTop: 0 }}>{track.emoji} {track.name}</h2>\n              <p>{track.tagline}</p>\n              <p className="muted small">Global pathway · Original practice · 10-question timed practice test</p>\n              <Link className="btn block" href={`/app?track=${code}`}>Explore pathway</Link>\n            </article>\n          );\n        })}\n      </div>\n      <section className="card" style={{ marginTop: 20 }}>\n        <h2 style={{ marginTop: 0 }}>Practise on Telegram</h2>\n        <p className="muted">Open the Mock Night bot and send <code>/tech</code> to choose a technology pathway and start daily practice.</p>\n      </section>\n    </main>\n  );\n}\n')
create("supabase/migrations/0010_global_technology.sql","-- Mock Night: first global technology pathways. Safe to re-run.\ninsert into subjects (code, name, exams) values\n  ('ITF', 'IT Support Fundamentals', '{ITF}'),\n  ('CCN', 'Cisco CCST Networking', '{CCST}'),\n  ('AWC', 'AWS Cloud Practitioner', '{AWS}'),\n  ('AZF', 'Azure Fundamentals', '{AZF}'),\n  ('PCE', 'Python Programming Foundations', '{PYT}')\non conflict (code) do nothing;\n")
create("scripts/import-technology-questions.ts",'import "./load-env";\nimport { readFileSync } from "node:fs";\nimport { createClient } from "@supabase/supabase-js";\n\ntype Row = {\n  track: "ITF" | "CCST" | "AWS" | "AZF" | "PYT";\n  subject: "ITF" | "CCN" | "AWC" | "AZF" | "PCE";\n  objective: string; topic: string; body: string; options: string[];\n  answer: number; explanation: string; difficulty?: number; source: string;\n};\n\nconst file = process.argv[2];\nif (!file) throw new Error("Usage: npx tsx scripts/import-technology-questions.ts data/technology/questions.json");\nconst url = process.env.SUPABASE_URL?.trim();\nconst key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();\nif (!url || !key || /YOUR[-_ ]|PLACEHOLDER|CHANGE[-_ ]ME|^xxxx/i.test(key)) {\n  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Keep credentials in your private .env.import.local.");\n}\nconst mapping: Record<string, string> = { ITF: "ITF", CCST: "CCN", AWS: "AWC", AZF: "AZF", PYT: "PCE" };\nconst rows = JSON.parse(readFileSync(file, "utf8")) as Row[];\nif (!Array.isArray(rows) || !rows.length) throw new Error("Question file must be a non-empty JSON array.");\nconst seen = new Set<string>();\nfor (const [i, r] of rows.entries()) {\n  if (!mapping[r.track] || mapping[r.track] !== r.subject) throw new Error(`Row ${i + 1}: invalid track/subject mapping.`);\n  if (![r.objective, r.topic, r.body, r.explanation, r.source].every((x) => typeof x === "string" && x.trim())) throw new Error(`Row ${i + 1}: missing objective/topic/body/explanation/source.`);\n  if (!Array.isArray(r.options) || r.options.length !== 4 || r.options.some((x) => !x?.trim())) throw new Error(`Row ${i + 1}: exactly four options are required.`);\n  if (new Set(r.options.map((x) => x.trim().toLowerCase())).size !== 4) throw new Error(`Row ${i + 1}: duplicate options.`);\n  if (!Number.isInteger(r.answer) || r.answer < 0 || r.answer > 3) throw new Error(`Row ${i + 1}: answer must be 0–3.`);\n  const fingerprint = `${r.subject}:${r.body.trim().toLowerCase()}`;\n  if (seen.has(fingerprint)) throw new Error(`Row ${i + 1}: duplicate question stem.`);\n  seen.add(fingerprint);\n}\nconst sb = createClient(url, key, { auth: { persistSession: false } });\nlet inserted = 0, skipped = 0;\nfor (const r of rows) {\n  const { data: existing, error: lookupError } = await sb.from("questions")\n    .select("id").eq("subject_code", r.subject).eq("body", r.body.trim()).limit(1);\n  if (lookupError) throw new Error(`Lookup failed: ${lookupError.message}. Confirm migration 0008 is installed.`);\n  if (existing?.length) { skipped++; continue; }\n  const { error } = await sb.from("questions").insert({\n    subject_code: r.subject, topic: `${r.objective.trim()} · ${r.topic.trim()}`,\n    body: r.body.trim(), options: r.options.map((x) => x.trim()), answer_index: r.answer,\n    explanation: r.explanation.trim(), difficulty: r.difficulty ?? 2, exams: [r.track],\n    reviewed: false, practice_published: true,\n    source: `Mock Night original practice; blueprint/source: ${r.source.trim()}`,\n  });\n  if (error) throw new Error(`Insert failed for "${r.body.slice(0, 60)}": ${error.message}`);\n  inserted++;\n}\nconsole.log(`Imported ${inserted}; skipped existing ${skipped}. reviewed=false; practice_published=true.`);\n')
print("Technology expansion installed locally. Backup folder:",backup.name)
