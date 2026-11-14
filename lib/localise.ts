// Shared school banks (MTH, ECO, PHY…) were written for Nigeria and use naira.
// When they're served to another country's track, swap the currency so the question reads naturally,
// and skip the few questions that only make sense in Nigeria.

/** Replace a word, keeping a leading capital ("Naira" → "Birr"). */
const word = (to: string) => (m: string) => (m[0] === m[0].toUpperCase() ? to[0].toUpperCase() + to.slice(1) : to);
const rules = (symbol: string, major: string, minor: string): [RegExp, string | ((m: string) => string)][] => [
  [/₦\s?/g, symbol],
  [/\bnaira\b/gi, word(major)],
  [/\bkobo\b/gi, word(minor)],
];
const RULES: Record<string, ReturnType<typeof rules>> = {
  ETH: rules("Br ", "birr", "santim"),
  WASSCE_GH: rules("GH₵", "cedis", "pesewas"),
};
const NIGERIAN_TRACKS = new Set(["JAMB", "WAEC", "PUTME"]);
const NIGERIA_ONLY = /\b(Nigeria|Nigerian|Lagos|Abuja|Kano|Ibadan|Port Harcourt|CBN|NNPC|INEC)\b/;

export function localiseText(s: string, trackCode?: string | null): string;
export function localiseText(s: string | null, trackCode?: string | null): string | null;
export function localiseText(s: string | null, trackCode?: string | null) {
  const list = trackCode ? RULES[trackCode] : undefined;
  if (!s || !list) return s;
  return list.reduce((out, [re, to]) => out.replace(re, to as string), s);
}

export function localiseQuestion<T extends { body: string; options: string[]; explanation?: string | null }>(q: T, trackCode?: string | null): T {
  if (!trackCode || !RULES[trackCode]) return q;
  return { ...q, body: localiseText(q.body, trackCode), options: q.options.map((o) => localiseText(o, trackCode)), explanation: localiseText(q.explanation ?? null, trackCode) };
}

/** True when a question only makes sense for Nigerian students and the learner is on another track. */
export function nigeriaOnlyFor(q: { body: string; options: string[] }, trackCode?: string | null) {
  if (!trackCode || NIGERIAN_TRACKS.has(trackCode)) return false;
  return NIGERIA_ONLY.test(q.body) || q.options.some((o) => NIGERIA_ONLY.test(o));
}
