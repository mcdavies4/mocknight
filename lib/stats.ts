// Public credibility numbers, counted live from the database and cached for an hour.
import { unstable_cache } from "next/cache";
import { db } from "./supabase";
import { TRACK_LIST } from "./tracks";

export interface SiteStats { questions: number; exams: number; countries: number; answers: number | null; learners: number | null }

// Only show activity numbers once they're big enough to build trust rather than undermine it.
const SHOW_ANSWERS_FROM = 10_000;
const SHOW_LEARNERS_FROM = 1_000;

export const getSiteStats = unstable_cache(
  async (): Promise<SiteStats | null> => {
    try {
      const [q, a, s] = await Promise.all([
        db().from("questions").select("id", { count: "exact", head: true }).or("reviewed.eq.true,practice_published.eq.true"),
        db().from("attempts").select("id", { count: "exact", head: true }),
        db().from("students").select("id", { count: "exact", head: true }),
      ]);
      if (q.error || q.count == null) return null;
      return {
        questions: q.count,
        exams: TRACK_LIST.length,
        countries: new Set(TRACK_LIST.map((t) => t.region).filter((r) => r !== "GLOBAL")).size,
        answers: (a.count ?? 0) >= SHOW_ANSWERS_FROM ? a.count : null,
        learners: (s.count ?? 0) >= SHOW_LEARNERS_FROM ? s.count : null,
      };
    } catch {
      return null;
    }
  },
  ["site-stats-v1"],
  { revalidate: 3600 },
);

/** 11,533 → "11,500+" (rounds down so the claim is always true). */
export function plus(n: number) {
  const step = n >= 100_000 ? 1000 : n >= 1000 ? 100 : 10;
  return `${(Math.floor(n / step) * step).toLocaleString("en-GB")}+`;
}
