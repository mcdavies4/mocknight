import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Online Fire Marshal / Fire Warden training with certificate | Mock Night",
  description:
    "Fire marshal and fire warden awareness training online: 8 short modules, final assessment, 12-month certificate, refresher reminders and training records for employers.",
};

const MODULES = [
  "Fire safety law and your role",
  "How fire starts and spreads",
  "Causes of fire and prevention",
  "Alarms, detection and emergency lighting",
  "Fire doors, escape routes and signs",
  "Fire extinguishers and fire blankets",
  "Evacuation and the fire marshal's actions",
  "Drills, records and continuous improvement",
];

export default function FireMarshal() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap" style={{ maxWidth: 860 }}>
      <section className="hero">
        <div className="muted small">🧯 Workplace training</div>
        <h1>Fire Marshal training your team will actually finish.</h1>
        <p className="muted">Short modules on any phone, a final assessment, and a certificate valid for 12 months — with training records ready for your fire risk assessment and insurer.</p>
        <Link className="btn" href="/app?track=FIRE">Start the course</Link>
      </section>

      <div className="grid2">
        <div className="card">
          <b>📚 What&apos;s covered</b>
          <ol style={{ margin: "8px 0 0", paddingLeft: 20 }}>{MODULES.map((m) => <li key={m}>{m}</li>)}</ol>
        </div>
        <div className="card">
          <b>✅ How it works</b>
          <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>
            <li>About 30 minutes of reading, one module at a time</li>
            <li>Daily practice questions to make it stick</li>
            <li>Final assessment: 20 questions, 80% to pass</li>
            <li>PDF certificate with an online verification link</li>
            <li>Reminder before the certificate expires</li>
          </ul>
        </div>
      </div>

      <div className="grid2" style={{ marginTop: 12 }}>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>For individuals</h3>
          <p><b>£14.99</b> — full course, assessment and 12-month certificate.</p>
          <Link className="btn block" href="/app?track=FIRE">Get started</Link>
        </div>
        <div className="card">
          <h3 style={{ marginTop: 0 }}>For employers</h3>
          <p><b>£6 per staff member</b> per year. One join link for your team, a live dashboard of who has completed and who is due, and a CSV of training records.</p>
          {bot && <a className="btn secondary block" href={`https://t.me/${bot}`}>Set up a company account</a>}
          <p className="muted small" style={{ marginBottom: 0 }}>In the bot: choose Fire Marshal, then send <code>/newgroup Your Company</code> and <code>/seats 25</code>.</p>
        </div>
      </div>

      <p className="muted small" style={{ marginTop: 28 }}>
        This is online fire safety awareness training aligned with the Regulatory Reform (Fire Safety) Order 2005 and common UK practice. It supports, but does not replace, practical
        site-specific training and your organisation&apos;s fire risk assessment. A product of The 36th Solutions Ltd.
      </p>
    </main>
  );
}
