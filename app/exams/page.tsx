import Link from "next/link";
import { TRACKS, type TrackCode } from "@/lib/tracks";

export const metadata = {
  title: "Explore exam pathways — Mock Night",
  description:
    "Explore academic exams, professional certification preparation and workplace training pathways available on Mock Night.",
};

const PATHS: Record<TrackCode, string> = {
  JAMB: "/app",
  WAEC: "/app",
  PUTME: "/app",
  WASSCE_GH: "/app",
  LUK: "/life-in-the-uk",
  FIRE: "/fire-marshal",
  NMC: "/nmc-cbt",
  PM: "/project-management",
  ETH: "/ethiopia",
  SSC: "/ssc",
};

const GROUPS: { title: string; description: string; codes: TrackCode[] }[] = [
  {
    title: "Academic & admissions exams",
    description: "Prepare for school-leaving, university-entry and national examinations.",
    codes: ["JAMB", "WAEC", "PUTME", "WASSCE_GH", "ETH"],
  },
  {
    title: "Professional & career exams",
    description: "Practise for professional qualifications and career progression tests.",
    codes: ["PM", "NMC", "SSC"],
  },
  {
    title: "Citizenship & workplace training",
    description: "Build confidence for a UK knowledge test or structured workplace training.",
    codes: ["LUK", "FIRE"],
  },
];

export default function ExamsPage() {
  return (
    <main className="wrap" style={{ maxWidth: 960 }}>
      <section className="hero">
        <p className="muted small">MOCK NIGHT · EXAM PATHWAYS</p>
        <h1>What are you preparing for?</h1>
        <p className="muted">
          Choose a pathway to find the practice tests and learning tools currently
          available. New qualifications will be added as their exam formats and
          question banks are reviewed.
        </p>
      </section>

      {GROUPS.map((group) => (
        <section key={group.title} style={{ marginTop: 28 }}>
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
