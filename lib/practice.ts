// Public practice-question pages (/practice/...) for search: a fixed, stable sample of
// questions per exam and subject, with answers and explanations.
import { unstable_cache } from "next/cache";
import { db } from "./supabase";
import { TRACK_LIST, TRACKS, type Track, type TrackCode } from "./tracks";
import { subjectName } from "./subjects";
import { localiseQuestion, nigeriaOnlyFor } from "./localise";

export const PER_PAGE = 10;

export interface PracticeQ { id: string; topic: string | null; body: string; options: string[]; answer: number; explanation: string | null; audio?: { text: string; lang: string; id?: string } | null }
export interface PracticeSubject { code: string; name: string; slug: string }

export const slugify = (s: string) =>
  s.toLowerCase().replace(/&/g, " and ").replace(/[()'’.,]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

export const examSlug = (t: Track) => t.code.toLowerCase();
export const trackFromSlug = (slug: string): Track | null => TRACKS[slug.toUpperCase() as TrackCode] ?? null;

export function practiceSubjects(t: Track): PracticeSubject[] {
  const seen = new Set<string>();
  return t.subjects.map((code) => {
    const name = subjectName(code);
    let slug = slugify(name) || code.toLowerCase();
    if (seen.has(slug)) slug = `${slug}-${code.toLowerCase()}`;
    seen.add(slug);
    return { code, name, slug };
  });
}

export const findSubject = (t: Track, slug: string) => practiceSubjects(t).find((s) => s.slug === slug) ?? null;

/** Every exam/subject pair, for the sitemap. */
export const allPracticePaths = () =>
  TRACK_LIST.flatMap((t) => practiceSubjects(t).map((s) => `/practice/${examSlug(t)}/${s.slug}`));

// Different exams that share a subject bank get a different slice, so pages aren't duplicates.
function hash(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619);
  return h >>> 0;
}

const cachedPractice = unstable_cache(
  async (trackCode: string, subjectCode: string): Promise<PracticeQ[]> => {
    {
      const head = await db().from("questions").select("id", { count: "exact", head: true }).eq("subject_code", subjectCode).or("reviewed.eq.true,practice_published.eq.true");
      const n = head.count ?? 0;
      if (head.error) throw new Error(head.error.message);
      if (!n) return [];
      const take = PER_PAGE * 2; // extra room to drop Nigeria-only questions on other tracks
      const offset = n > take ? hash(`${trackCode}:${subjectCode}`) % (n - take) : 0;
      const { data, error } = await db()
        .from("questions")
        .select("id, topic, body, options, answer_index, explanation, audio_text, audio_lang")
        .eq("subject_code", subjectCode)
        .or("reviewed.eq.true,practice_published.eq.true")
        .order("id")
        .range(offset, offset + take - 1);
      if (error || !data) throw new Error(error?.message ?? "no data");
      return data
        .filter((q) => !nigeriaOnlyFor(q, trackCode))
        .slice(0, PER_PAGE)
        .map((q) => {
          const l = localiseQuestion({ body: q.body, options: q.options as string[], explanation: q.explanation }, trackCode);
          return { id: q.id, topic: q.topic, body: l.body, options: l.options, answer: q.answer_index, explanation: l.explanation ?? null, audio: q.audio_text && q.audio_lang ? { text: q.audio_text, lang: q.audio_lang, id: q.id } : null };
        });
    }
  },
  ["practice-v3"],
  { revalidate: 86400 },
);

/** Errors aren't cached, so a database hiccup doesn't leave a page empty for a day. */
export async function getPracticeQuestions(trackCode: string, subjectCode: string): Promise<PracticeQ[]> {
  try {
    return await cachedPractice(trackCode, subjectCode);
  } catch {
    return [];
  }
}
