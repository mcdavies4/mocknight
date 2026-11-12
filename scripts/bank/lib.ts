// Shared helpers for the question-bank generators.
export interface Q {
  subject: string;
  topic: string;
  body: string;
  options: string[];
  answer: number;
  explanation: string;
  difficulty: 1 | 2 | 3;
}

// Deterministic RNG so the bank is reproducible
let seed = 20261111;
export function reseed(s: number) {
  seed = s;
}
export function rand() {
  seed |= 0;
  seed = (seed + 0x6d2b79f5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}
export const ri = (min: number, max: number) => min + Math.floor(rand() * (max - min + 1));
export const pick = <T>(arr: readonly T[]): T => arr[Math.floor(rand() * arr.length)];
export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
export const sample = <T>(arr: readonly T[], n: number) => shuffle(arr).slice(0, n);

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
export function frac(n: number, d: number) {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  n /= g;
  d /= g;
  return d === 1 ? `${n}` : `${n}/${d}`;
}

/** Format numbers cleanly: no float noise, thousands separators for big ints. */
export function fmt(x: number, unit = ""): string {
  const r = Math.round(x * 1e6) / 1e6;
  let s = Number.isInteger(r) && Math.abs(r) >= 10000 ? r.toLocaleString("en-US") : String(r);
  return unit ? `${s} ${unit}`.replace(" %", "%") : s;
}

/**
 * Build a multiple-choice question. Options are shuffled; duplicates and
 * any distractor equal to the correct answer are dropped.
 */
export function mcq(
  subject: string,
  topic: string,
  body: string,
  correct: string,
  distractors: string[],
  explanation: string,
  difficulty: 1 | 2 | 3 = 2,
  n = 4,
): Q {
  const seen = new Set([norm(correct)]);
  const wrong: string[] = [];
  for (const d of distractors) {
    if (!d || seen.has(norm(d))) continue;
    seen.add(norm(d));
    wrong.push(d);
    if (wrong.length === n - 1) break;
  }
  if (wrong.length < n - 1) throw new Error(`Not enough distractors for: ${body} (${correct}) got ${wrong.join("|")}`);
  const options = shuffle([correct, ...wrong]);
  return { subject, topic, body, options, answer: options.indexOf(correct), explanation, difficulty };
}
const norm = (s: string) => s.trim().toLowerCase();

/** Numeric distractors: given plausible wrong values, top up with nearby values. */
export function numOpts(correct: number, plausible: number[], unit = "", allowNeg = false): string[] {
  const out: string[] = [];
  const c = fmt(correct, unit);
  const decimals = (v: number) => (String(Math.round(v * 1e6) / 1e6).split(".")[1] ?? "").length;
  const maxDp = Math.max(2, decimals(correct));
  const push = (v: number) => {
    if (!Number.isFinite(v) || (!allowNeg && v < 0)) return;
    if (decimals(v) > maxDp) return; // no ugly 3.285714-style distractors
    const s = fmt(v, unit);
    if (s !== c && !out.includes(s)) out.push(s);
  };
  plausible.forEach(push);
  const step = Math.abs(correct) >= 10 ? Math.max(1, Math.round(Math.abs(correct) / 10)) : 1;
  for (let k = 1; out.length < 6 && k < 20; k++) {
    push(correct + k * step);
    push(correct - k * step);
    push(correct * 2);
  }
  return out;
}

/** Distractors drawn from other items' answers (for fact tables). */
export function others<T>(items: readonly T[], self: T, get: (t: T) => string, n = 6): string[] {
  const own = get(self);
  return shuffle(items.filter((i) => i !== self).map(get)).filter((v, i, a) => v !== own && a.indexOf(v) === i).slice(0, n);
}

/** Generate up to `count` unique-bodied questions from a template. */
export function repeat(count: number, make: () => Q | null, maxTries = count * 30): Q[] {
  const out: Q[] = [];
  const bodies = new Set<string>();
  for (let t = 0; t < maxTries && out.length < count; t++) {
    const q = make();
    if (!q || bodies.has(q.body)) continue;
    bodies.add(q.body);
    out.push(q);
  }
  return out;
}
