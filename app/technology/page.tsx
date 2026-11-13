import Link from "next/link";
import { TRACKS } from "@/lib/tracks";

export const metadata = {
  title: "Technology & Digital Careers — Mock Night",
  description: "Global technology learning and original certification-preparation practice on Mock Night.",
};

const CODES = ["ITF", "CCST", "AWS", "AZF", "PYT"] as const;

export default function TechnologyPage() {
  return (
    <main className="wrap" style={{ maxWidth: 960 }}>
      <section className="hero">
        <p className="muted small">MOCK NIGHT · GLOBAL TECHNOLOGY</p>
        <h1>Technology & Digital Careers</h1>
        <p className="muted">
          Build practical technology knowledge and prepare with original practice questions,
          explanations, timed tests and progress tracking. These are independent Mock Night
          learning resources, not official vendor exam questions or certification awards.
        </p>
      </section>
      <div className="grid2">
        {CODES.map((code) => {
          const track = TRACKS[code];
          return (
            <article className="card" key={code}>
              <h2 style={{ marginTop: 0 }}>{track.emoji} {track.name}</h2>
              <p>{track.tagline}</p>
              <p className="muted small">Global pathway · Original practice · 10-question timed practice test</p>
              <Link className="btn block" href={`/app?track=${code}`}>Explore pathway</Link>
            </article>
          );
        })}
      </div>
      <section className="card" style={{ marginTop: 20 }}>
        <h2 style={{ marginTop: 0 }}>Practise on Telegram</h2>
        <p className="muted">Open the Mock Night bot and send <code>/tech</code> to choose a technology pathway and start daily practice.</p>
      </section>
    </main>
  );
}
