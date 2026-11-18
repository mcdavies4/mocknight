import { getPracticeQuestions } from "@/lib/practice";
import { getTrack, type TrackCode } from "@/lib/tracks";
import { TryQuiz, type TryQ } from "./try-quiz";

/** Server wrapper: five sample questions spread across the exam's first subjects, then the try-it quiz. */
export async function ExamTry({ code }: { code: string }) {
  const t = getTrack(code as TrackCode);
  const sets = await Promise.all(t.subjects.slice(0, 5).map((s) => getPracticeQuestions(t.code, s)));
  const out: TryQ[] = [];
  for (let round = 0; out.length < 5 && round < 5; round++)
    for (const set of sets) {
      const q = set[round];
      if (q && out.length < 5) out.push({ id: q.id, body: q.body, options: q.options, answer: q.answer, explanation: q.explanation, audio: q.audio });
    }
  return <TryQuiz questions={out} track={t.code} short={t.short} />;
}
