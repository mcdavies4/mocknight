import { db, must } from "./supabase";
import { getTrack } from "./tracks";
import { streakDays } from "./drill";
import type { Student } from "./types";

export interface Progress {
  streak: number;
  answeredAllTime: number;
  reviewBox: number;
  last7: { subject: string; correct: number; total: number }[];
  practice: { taken: number; lastScores: number[]; passesInARow: number | null; readiness: number | null };
  lastMockNight: number | null;
}

/** Readiness (pass/fail tracks): average of the last 5 practice tests, as % of the pass mark reached. */
export async function getProgress(student: Student): Promise<Progress> {
  const track = getTrack(student.track);
  const since = new Date(Date.now() - 7 * 86400_000).toISOString();

  const [rows, all, box, streak, practice, lastNight] = await Promise.all([
    db().from("attempts").select("correct, questions(subject_code)").eq("student_id", student.id).gte("created_at", since),
    db().from("attempts").select("*", { count: "exact", head: true }).eq("student_id", student.id),
    db().from("review_items").select("*", { count: "exact", head: true }).eq("student_id", student.id),
    streakDays(student.id),
    db()
      .from("mock_attempts")
      .select("raw_score, total, scaled_score, submitted_at, mocks!inner(kind, track)")
      .eq("student_id", student.id)
      .eq("mocks.kind", "practice")
      .not("submitted_at", "is", null)
      .order("submitted_at", { ascending: false })
      .limit(10),
    db()
      .from("mock_attempts")
      .select("scaled_score, mocks!inner(kind)")
      .eq("student_id", student.id)
      .eq("mocks.kind", "weekly")
      .not("submitted_at", "is", null)
      .order("submitted_at", { ascending: false })
      .limit(1)
      .maybeSingle(),
  ]);

  const per = new Map<string, { correct: number; total: number }>();
  for (const r of must(rows, "progress rows") as any[]) {
    const q = Array.isArray(r.questions) ? r.questions[0] : r.questions;
    const k = q?.subject_code ?? "?";
    const p = per.get(k) ?? { correct: 0, total: 0 };
    p.total++;
    if (r.correct) p.correct++;
    per.set(k, p);
  }

  const tests = ((must(practice, "practice") as any[]) ?? []).filter((t) => {
    const m = Array.isArray(t.mocks) ? t.mocks[0] : t.mocks;
    return (m?.track ?? track.code) === track.code;
  });
  const scores = tests.map((t) => Math.round(Number(t.scaled_score)));
  let passesInARow: number | null = null;
  let readiness: number | null = null;
  if (track.mock.passPct && tests.length) {
    passesInARow = 0;
    for (const t of tests) {
      if (t.raw_score >= Math.ceil((t.total * track.mock.passPct) / 100)) passesInARow++;
      else break;
    }
    const last5 = scores.slice(0, 5);
    const avg = last5.reduce((a, b) => a + b, 0) / last5.length;
    readiness = Math.min(100, Math.round((avg / track.mock.passPct) * 100 * (last5.length >= 3 ? 1 : 0.8)));
  }

  return {
    streak,
    answeredAllTime: all.count ?? 0,
    reviewBox: box.count ?? 0,
    last7: [...per.entries()].map(([subject, p]) => ({ subject, ...p })),
    practice: { taken: tests.length, lastScores: scores.slice(0, 5), passesInARow, readiness },
    lastMockNight: lastNight.data ? Number(lastNight.data.scaled_score) : null,
  };
}
