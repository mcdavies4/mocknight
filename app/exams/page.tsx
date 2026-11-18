import { PATHS } from "@/lib/exam-links";
import Link from "next/link";
import { SearchBox } from "@/components/search-box";
import { TRACKS, type TrackCode } from "@/lib/tracks";
import { TRACK_GROUPS } from "@/lib/track-groups";

export const metadata = {
  title: "Explore exam pathways — Mock Night",
  description:
    "Explore academic exams, professional certification preparation and workplace training pathways available on Mock Night.",
};



const GROUPS = TRACK_GROUPS.map((g) => ({ key: g.key, title: `${g.emoji} ${g.title}`, description: g.description, codes: g.codes }));

export default function ExamsPage() {
  return (
    <main className="wrap" style={{ maxWidth: 960 }}>
      <section className="hero">
        <p className="muted small">MOCK NIGHT · EXAM PATHWAYS</p>
        <h1>What are you preparing for?</h1>
        <p className="muted">
          Choose a pathway to find the practice tests and learning tools currently
          available. New qualifications and question banks are added as they become available. Some UK pathways use original AI-authored practice questions, which are not official exam questions or independently human-verified material.
        </p>
        <SearchBox />
      </section>

      {GROUPS.map((group) => (
        <section key={group.title} id={group.key} style={{ marginTop: 28 }}>
          <h2>{group.title}</h2>
          <p className="muted">{group.description}</p>
          <div className="grid2">
            {group.codes.map((code) => {
              const track = TRACKS[code];
              return (
                <article className="card" key={code}>
                  <h3 style={{ marginTop: 0 }}>
                    {track.emoji} {track.name}
                  </h3>
                  <p>{track.tagline}</p>
                  <p className="muted small">
                    {track.region === "GLOBAL"
                      ? "Global pathway"
                      : `Region: ${track.region}`}
                    {" · "}
                    {track.kind === "professional"
                      ? "Professional preparation"
                      : track.kind === "work"
                        ? "Workplace training"
                        : track.kind === "citizenship"
                          ? "Citizenship test"
                          : "Academic preparation"}
                  </p>
                  <Link className="btn block" href={PATHS[code]}>
                    Explore pathway
                  </Link>
                </article>
              );
            })}
          </div>
        </section>
      ))}

      <section className="card" style={{ marginTop: 28 }}>
        <h2 style={{ marginTop: 0 }}>🌍 Technology & Digital Careers</h2>
        <p className="muted">Explore global IT support, networking, cloud and Python pathways.</p>
        <Link className="btn" href="/technology">Explore technology pathways</Link>
      </section>

      <section className="card" style={{ marginTop: 28 }}>
        <h2 style={{ marginTop: 0 }}>Prefer Telegram?</h2>
        <p className="muted">
          Open the Mock Night bot and send <code>/exams</code> to browse or change
          your exam pathway. Your existing Telegram account and practice history
          stay in place.
        </p>
        <Link className="btn secondary" href="/app">
          Open the web app
        </Link>
      </section>
    </main>
  );
}
