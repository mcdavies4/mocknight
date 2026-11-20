import Link from "next/link";
import type { Metadata } from "next";
import { OFFICIAL_SOURCES } from "@/lib/official-sources";
import { TRACKS, type TrackCode } from "@/lib/tracks";

export const metadata: Metadata = {
  title: "Official sources and disclaimer | Mock Night",
  description: "Mock Night is an independent practice app, not a government service. Here are the official websites for every exam that involves government or regulatory information.",
  alternates: { canonical: "/sources" },
};

export default function SourcesPage() {
  const rows = Object.entries(OFFICIAL_SOURCES)
    .filter(([code]) => code in TRACKS)
    .map(([code, src]) => ({ code, name: TRACKS[code as TrackCode].name, src }))
    .sort((a, b) => a.name.localeCompare(b.name));
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <h1>Official sources and disclaimer</h1>
      <div className="card" style={{ marginTop: 12 }}>
        <p style={{ margin: 0 }}>
          <b>Mock Night is not a government app.</b> We are not affiliated with, endorsed by or acting for any government,
          government agency, exam board or regulator, and we don&apos;t provide or process any government service.
          Mock Night is an independent practice tool made by The 36th Solutions Ltd. Our questions are original practice
          questions, not official exam papers.
        </p>
        <p className="muted small" style={{ marginBottom: 0 }}>
          Information about exams (format, pass marks, dates, fees and rules) is summarised from the official sources below.
          It can change, so always confirm it on the official website before you register, pay or travel.
        </p>
      </div>
      <h2 style={{ marginTop: 24 }}>Official websites by exam</h2>
      <ul>
        {rows.map((r) => (
          <li key={r.code} style={{ marginBottom: 6 }}>
            <Link href={`/exam/${r.code}`}>{r.name}</Link>:{" "}
            {r.src.map(([n, u], i) => (
              <span key={u}>{i ? "; " : ""}{n} — <a href={u} target="_blank" rel="noopener noreferrer">{u}</a></span>
            ))}
          </li>
        ))}
      </ul>
    </main>
  );
}
