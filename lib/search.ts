// Site search: exams (typo-tolerant, with synonyms), subject practice pages, blog guides and
// matching practice questions, plus recommendations when the match is loose.
import { TRACK_LIST, TRACKS, type Track, type TrackCode } from "./tracks";
import { TRACK_GROUPS, groupFor, trackAliases } from "./track-groups";
import { subjectName } from "./subjects";
import { POSTS } from "./blog";
import { PATHS } from "./exam-links";
import { examSlug, practiceSubjects } from "./practice";

export const norm = (s: string) => s.toLowerCase().normalize("NFKD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9+ ]/g, " ").replace(/\s+/g, " ").trim();

const STOP = new Set(["the", "in", "of", "and", "for", "a", "an", "to", "test", "tests", "exam", "exams", "practice", "practise", "my", "how", "i", "want", "need", "help", "with", "on", "questions", "question", "past", "free", "online", "prep", "preparation", "study", "pass", "is", "what", "do", "me", "get"]);

// Words people use interchangeably. Each group is expanded both ways.
const SYNONYMS: string[][] = [
  ["driving", "driver", "drive", "licence", "license", "permit", "dmv", "learner", "learners", "theory", "road"],
  ["nurse", "nursing", "nurses", "rn", "midwife", "midwifery"],
  ["doctor", "doctors", "medical", "medicine", "physician", "mbbs"],
  ["uk", "britain", "british", "england", "united kingdom", "london"],
  ["us", "usa", "america", "american", "united states", "states"],
  ["maths", "math", "mathematics", "quant", "numeracy", "arithmetic"],
  ["accounting", "accountant", "accounts", "accountancy", "bookkeeping", "cpa", "acca"],
  ["english", "language", "grammar"],
  ["citizenship", "naturalisation", "naturalization", "citizen", "passport", "settlement", "ilr"],
  ["pharmacy", "pharmacist", "pharmacists", "pharm"],
  ["dentist", "dental", "dentistry"],
  ["physio", "physiotherapy", "physiotherapist", "physical therapy"],
  ["lab", "laboratory", "medical laboratory", "lab technologist", "biomedical"],
  ["security", "cyber", "cybersecurity", "guard"],
  ["it", "tech", "technology", "computer", "computing", "comptia"],
  ["university", "uni", "admission", "admissions", "entrance", "college"],
  ["job", "jobs", "career", "work", "recruitment", "employment"],
  ["school", "secondary", "high school", "o level", "a level", "olevel", "alevel"],
  ["food", "hygiene", "catering", "restaurant", "kitchen"],
  ["fire", "fire safety", "fire marshal", "fire warden"],
  ["care", "carer", "caregiver", "care worker", "healthcare assistant", "hca"],
  ["insurance", "insurer", "life insurance"],
  ["real estate", "realtor", "property", "estate agent"],
  ["oil", "gas", "oil and gas", "petroleum", "offshore"],
  ["nigeria", "nigerian", "naija"], ["ghana", "ghanaian"], ["kenya", "kenyan"], ["uganda", "ugandan"], ["tanzania", "tanzanian"],
  ["rwanda", "rwandan"], ["ethiopia", "ethiopian"], ["india", "indian"], ["canada", "canadian"], ["australia", "australian"],
  ["south africa", "south african", "sa"], ["dubai", "uae", "emirates", "abu dhabi"], ["saudi", "ksa", "saudi arabia"],
  ["philippines", "filipino", "pinoy"], ["pakistan", "pakistani"], ["cameroon", "cameroonian"],
];
const SYN = new Map<string, Set<string>>();
for (const g of SYNONYMS) for (const w of g) {
  const set = SYN.get(w) ?? new Set<string>();
  g.forEach((x) => set.add(x));
  SYN.set(w, set);
}

const REGION = new Set(SYNONYMS.slice(SYNONYMS.findIndex((g) => g[0] === "nigeria")).flat().concat(["uk", "britain", "british", "england", "united kingdom", "london", "us", "usa", "america", "american", "united states", "states"]));

const stem = (w: string) => (w.length > 4 && w.endsWith("s") && !/(ss|ics|us|is)$/.test(w) ? w.slice(0, -1) : w);

function edits(a: string, b: string, max: number) {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  let prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    let best = i;
    for (let j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
      best = Math.min(best, cur[j]);
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}
const fuzzyMax = (w: string) => (w.length >= 8 ? 2 : w.length >= 4 ? 1 : 0);

let VOCAB: Set<string> | null = null;
/** Every word that appears somewhere in the exam index, so real words aren't "corrected". */
function vocab() {
  if (!VOCAB) VOCAB = new Set(index().flatMap((x) => `${x.core} ${x.core2} ${x.extra}`.split(" ")));
  return VOCAB;
}

/** Correct a misspelt word to a known synonym ("acountant" → "accountant"). */
function fixWord(w: string) {
  if (SYN.has(w) || w.length < 5 || vocab().has(w)) return w;
  const max = fuzzyMax(w);
  for (const k of SYN.keys()) if (!k.includes(" ") && edits(w, k, max) <= max) return k;
  return w;
}

interface Indexed { t: Track; code: string; short: string; name: string; core: string; core2: string; extra: string; tokens: string[] }
let INDEX: Indexed[] | null = null;
function index(): Indexed[] {
  if (INDEX) return INDEX;
  INDEX = TRACK_LIST.map((t) => {
    const g = groupFor(t.code);
    const core = norm(`${t.code.replace("_", " ")} ${t.short} ${t.name}`);
    const core2 = norm(trackAliases(t.code));
    const extra = norm(`${t.subjects.map(subjectName).join(" ")} ${g?.title ?? ""} ${t.tagline} ${t.audience} ${t.region}`);
    return { t, code: t.code.toLowerCase(), short: norm(t.short), name: norm(t.name), core, core2, extra, tokens: [...new Set(`${core} ${core2}`.split(" "))].filter((x) => x.length >= 4) };
  });
  return INDEX;
}

const has = (hay: string, w: string, minPrefix = 4) => ` ${hay} `.includes(` ${w} `) || (w.length >= minPrefix && ` ${hay}`.includes(` ${w}`));

export interface ExamHit { track: Track; score: number; path: string; corrected?: string }

/** Exams ranked for a query, tolerant of typos and alternative wording. */
export function searchExams(query: string, limit = 8): ExamHit[] {
  const q = norm(query);
  if (!q) return [];
  const words = q.split(" ").filter((w) => !STOP.has(w)).map(stem).map(fixWord);
  if (!words.length) return [];
  const scored = index().map((x) => {
    let score = 0;
    let matched = 0;
    let corrected: string | undefined;
    if (q === x.code || q === x.short || q === x.name) score += 120;
    else if (x.short.startsWith(q) || x.name.startsWith(q)) score += 50;
    for (const [wi, w] of words.entries()) {
      const alts = SYN.get(w) ?? new Set([w]);
      const pre = wi === words.length - 1 ? 3 : 4; // the word still being typed can be a short prefix
      let best = 0;
      const k = REGION.has(w) ? 0.5 : 1;
      for (const a of alts) {
        const exact = a === w;
        if (has(x.core, a, pre)) best = Math.max(best, (exact ? 14 : 10) * k);
        else if (has(x.core2, a, pre)) best = Math.max(best, (exact ? 11 : 8) * k);
        else if (has(x.extra, a)) best = Math.max(best, (exact ? 5 : 3) * k);
      }
      if (!best && !vocab().has(w)) {
        const max = fuzzyMax(w);
        if (max) for (const tok of x.tokens) if (edits(w, tok, max) <= max) { best = 7; corrected = tok; break; }
      }
      if (best) matched++;
      score += best;
    }
    if (words.length > 1 && matched === words.length) score += 15;
    return { track: x.t, score, path: PATHS[x.t.code], corrected };
  }).filter((h) => h.score >= 5).sort((a, b) => b.score - a.score);
  const top = scored[0]?.score ?? 0;
  return scored.filter((h) => h.score >= top * 0.45).slice(0, limit);
}

export interface SubjectHit { subject: string; name: string; links: { track: Track; href: string }[] }

/** "physics", "road signs" → practice pages for that subject across the most relevant exams. */
export function searchSubjects(query: string, preferred: TrackCode[] = []): SubjectHit[] {
  const q = norm(query);
  const words = q.split(" ").filter((w) => !STOP.has(w) && !REGION.has(w)).map(stem).map(fixWord);
  if (!words.length) return [];
  const bySubject = new Map<string, Track[]>();
  for (const t of TRACK_LIST) for (const s of t.subjects) bySubject.set(s, [...(bySubject.get(s) ?? []), t]);
  const hits: (SubjectHit & { score: number })[] = [];
  for (const [code, tracks] of bySubject) {
    const name = subjectName(code);
    const n = norm(name);
    let score = 0;
    for (const w of words) {
      const alts = SYN.get(w) ?? new Set([w]);
      if ([...alts].some((a) => has(n, a))) score += 10;
      else if (fuzzyMax(w) && n.split(" ").some((tok) => tok.length >= 4 && edits(w, tok, fuzzyMax(w)) <= fuzzyMax(w))) score += 6;
    }
    if (!score) continue;
    const ordered = [...tracks].sort((a, b) => Number(preferred.includes(b.code)) - Number(preferred.includes(a.code)));
    const links = ordered.slice(0, 6).map((t) => {
      const ps = practiceSubjects(t).find((p) => p.code === code)!;
      return { track: t, href: `/practice/${examSlug(t)}/${ps.slug}` };
    });
    hits.push({ subject: code, name, links, score });
  }
  return hits.sort((a, b) => b.score - a.score).slice(0, 3);
}

export interface GuideHit { slug: string; title: string; description: string }

export function searchGuides(query: string, examCodes: string[] = []): GuideHit[] {
  const words = norm(query).split(" ").filter((w) => !STOP.has(w) && w.length >= 3).map(stem);
  return POSTS.map((p) => {
    const hay = norm(`${p.title} ${p.description} ${p.tag}`);
    let score = examCodes.includes(p.exam ?? "") ? 20 : 0;
    for (const w of words) if ([...(SYN.get(w) ?? new Set([w]))].some((a) => has(hay, a))) score += 6;
    return { p, score };
  }).filter((x) => x.score >= 6).sort((a, b) => b.score - a.score).slice(0, 3)
    .map(({ p }) => ({ slug: p.slug, title: p.title, description: p.description }));
}

/** Exams people in the same situation also prepare for: same category, then most shared subjects. */
export function relatedExams(codes: TrackCode[], limit = 6): Track[] {
  if (!codes.length) return [];
  const seen = new Set<string>(codes);
  const base = TRACKS[codes[0]];
  const g = groupFor(base.code);
  const shared = (t: Track) => t.subjects.filter((s) => base.subjects.includes(s)).length;
  const pool = TRACK_LIST.filter((t) => !seen.has(t.code)).map((t) => ({
    t,
    score: (g?.codes.includes(t.code) ? 10 : 0) + shared(t) * 3 + (t.region === base.region ? 4 : 0) + (t.kind === base.kind ? 2 : 0),
  }));
  return pool.filter((x) => x.score >= 6).sort((a, b) => b.score - a.score).slice(0, limit).map((x) => x.t);
}

/** Starting points when nothing matches. */
export const POPULAR: TrackCode[] = ["JAMB", "WAEC", "LUK", "DRIVE", "NMC", "NCLEX", "IELTS", "KCSE", "DMVCA", "PM"];

export const groupsForBrowse = () => TRACK_GROUPS.map((g) => ({ key: g.key, emoji: g.emoji, title: g.title }));
