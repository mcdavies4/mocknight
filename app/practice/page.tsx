import { examCountLabel } from "@/lib/exam-count";
import Link from "next/link";
import type { Metadata } from "next";
import { TRACKS } from "@/lib/tracks";
import { TRACK_GROUPS } from "@/lib/track-groups";
import { examSlug } from "@/lib/practice";

export const metadata: Metadata = {
  title: `Free practice questions with answers for ${examCountLabel()} exams | Mock Night`,
  description: "Free sample questions with answers and explanations for JAMB, WAEC, KCSE, driving theory tests, NCLEX, NMC CBT, Life in the UK, US DMV permit tests, CPA and more.",
  alternates: { canonical: "/practice" },
};

export default function PracticeIndex() {
  return (
    <main className="wrap" style={{ maxWidth: 900 }}>
      <section className="hero">
        <div className="muted small">📝 Free practice questions</div>
        <h1>Free practice questions with answers</h1>
        <p className="muted">Pick your exam to try sample questions by subject, each with the answer and a clear explanation.</p>
      </section>
      {TRACK_GROUPS.map((g) => (
        <section key={g.key} style={{ marginTop: 20 }}>
          <h2>{g.emoji} {g.title}</h2>
          <div className="practice-links">
            {g.codes.filter((c) => TRACKS[c]).map((c) => (
              <Link key={c} href={`/practice/${examSlug(TRACKS[c])}`} className="chip">{TRACKS[c].short}</Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
