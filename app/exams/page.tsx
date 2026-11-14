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
  DRIVE: "/app?track=DRIVE",
  FSE: "/app?track=FSE",
  FSM: "/app?track=FSM",
  CARE: "/app?track=CARE",
  CITB: "/app?track=CITB",
  SIA: "/app?track=SIA",
  FOOD: "/app?track=FOOD",
  CAREW: "/app?track=CAREW",
  HSE: "/app?track=HSE",
  NMC: "/nmc-cbt",
  NCLEX: "/nclex",
  PLAB: "/plab",
  USCIT: "/exam/USCIT",
  CANCIT: "/exam/CANCIT",
  AUSCIT: "/exam/AUSCIT",
  GULFN: "/exam/GULFN",
  IELTS: "/exam/IELTS",
  GRAD: "/exam/GRAD",
  IBPS: "/exam/IBPS",
  ACCA: "/exam/ACCA",
  ICAN: "/exam/ICAN",
  ITIL: "/exam/ITIL",
  SIXSIG: "/exam/SIXSIG",
  ELEVEN: "/exam/ELEVEN",
  NECO: "/exam/NECO",
  OET: "/exam/OET",
  UCAT: "/exam/UCAT",
  KCSE: "/exam/KCSE",
  BECE: "/exam/BECE",
  MDCAT: "/exam/MDCAT",
  PM: "/project-management",
  ETH: "/ethiopia",
  SSC: "/ssc",
  SAT: "/digital-sat",
  ITF: "/app?track=ITF",
  CCST: "/app?track=CCST",
  AWS: "/app?track=AWS",
  AZF: "/app?track=AZF",
  PYT: "/app?track=PYT",
  SEC: "/app?track=SEC",
  DAT: "/app?track=DAT",
  AIA: "/app?track=AIA",
  CON: "/app?track=CON",
  BKP: "/app?track=BKP",
};

const GROUPS: { title: string; description: string; codes: TrackCode[] }[] = [
  {
    title: "Moving abroad",
    description: "Citizenship tests, English and professional licensing for doctors and nurses relocating.",
    codes: ["LUK", "USCIT", "CANCIT", "AUSCIT", "IELTS", "OET", "PLAB", "NMC", "NCLEX", "GULFN"],
  },
  {
    title: "Academic & admissions exams",
    description: "Prepare for school-leaving, university-entry and national examinations.",
    codes: ["JAMB", "WAEC", "NECO", "PUTME", "WASSCE_GH", "KCSE", "BECE", "ETH", "MDCAT", "SAT", "UCAT", "ELEVEN"],
  },
  {
    title: "Professional & career exams",
    description: "Practise for professional qualifications, graduate assessments and career progression tests.",
    codes: ["PM", "ACCA", "ICAN", "GRAD", "IBPS", "SSC", "ITIL", "SIXSIG", "BKP", "CON"],
  },
  {
    title: "Technology & digital skills",
    description: "Build practical IT, networking, cloud, data, security and programming knowledge.",
    codes: ["ITF", "CCST", "AWS", "AZF", "PYT", "SEC", "DAT", "AIA"],
  },
  {
    title: "UK workplace & licences",
    description: "Build confidence for UK tests and structured workplace training.",
    codes: ["DRIVE", "CITB", "SIA", "FSE", "FSM", "FIRE", "CARE", "FOOD", "CAREW", "HSE"],
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
          available. New qualifications and question banks are added as they become available. Some UK pathways use original AI-authored practice questions, which are not official exam questions or independently human-verified material.
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
