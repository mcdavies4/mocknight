import Link from "next/link";
import { TRACKS, type TrackCode } from "@/lib/tracks";
import { TRACK_GROUPS } from "@/lib/track-groups";

export const metadata = {
  title: "Explore exam pathways — Mock Night",
  description:
    "Explore academic exams, professional certification preparation and workplace training pathways available on Mock Night.",
};

const PATHS: Record<TrackCode, string> = {
  JAMB: "/exam/JAMB",
  WAEC: "/exam/WAEC",
  PUTME: "/exam/PUTME",
  WASSCE_GH: "/exam/WASSCE_GH",
  LUK: "/life-in-the-uk",
  FIRE: "/fire-marshal",
  DRIVE: "/exam/DRIVE",
  FSE: "/exam/FSE",
  FSM: "/exam/FSM",
  CARE: "/exam/CARE",
  CITB: "/exam/CITB",
  SIA: "/exam/SIA",
  FOOD: "/exam/FOOD",
  CAREW: "/exam/CAREW",
  HSE: "/exam/HSE",
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
  NCEE: "/exam/NCEE",
  JSCE: "/exam/JSCE",
  NGCS: "/exam/NGCS",
  PTE: "/exam/PTE",
  CELPIP: "/exam/CELPIP",
  IOSH: "/exam/IOSH",
  OILGAS: "/exam/OILGAS",
  NDT: "/exam/NDT",
  WELDINSP: "/exam/WELDINSP",
  APIINSP: "/exam/APIINSP",
  COATING: "/exam/COATING",
  ETEXIT: "/exam/ETEXIT",
  CSEE: "/exam/CSEE",
  UCE: "/exam/UCE",
  CMGCE: "/exam/CMGCE",
  SALEARN: "/exam/SALEARN",
  MATRIC: "/exam/MATRIC",
  KCPA: "/exam/KCPA",
  CARESR: "/exam/CARESR",
  FIRSTAID: "/exam/FIRSTAID",
  SERU: "/exam/SERU",
  HGV: "/exam/HGV",
  ELEC18: "/exam/ELEC18",
  EYTA: "/exam/EYTA",
  WAREHOUSE: "/exam/WAREHOUSE",
  NHSHCA: "/exam/NHSHCA",
  BA: "/exam/BA",
  ISC2CC: "/exam/ISC2CC",
  AWSSAA: "/exam/AWSSAA",
  AICERT: "/exam/AICERT",
  SFADMIN: "/exam/SFADMIN",
  NEET: "/exam/NEET",
  JEE: "/exam/JEE",
  GRE: "/exam/GRE",
  CSEPH: "/exam/CSEPH",
  AAT: "/exam/AAT",
  NGREC: "/exam/NGREC",
  UCAT: "/exam/UCAT",
  KCSE: "/exam/KCSE",
  BECE: "/exam/BECE",
  MDCAT: "/exam/MDCAT",
  PM: "/project-management",
  ETH: "/ethiopia",
  SSC: "/ssc",
  SAT: "/digital-sat",
  ITF: "/exam/ITF",
  CCST: "/exam/CCST",
  AWS: "/exam/AWS",
  AZF: "/exam/AZF",
  PYT: "/exam/PYT",
  SEC: "/exam/SEC",
  DAT: "/exam/DAT",
  AIA: "/exam/AIA",
  CON: "/exam/CON",
  BKP: "/exam/BKP",
};

const GROUPS = TRACK_GROUPS.map((g) => ({ title: `${g.emoji} ${g.title}`, description: g.description, codes: g.codes }));

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
