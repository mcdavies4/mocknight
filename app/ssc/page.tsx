import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SSC CGL Tier 1 mock tests with negative marking on Telegram | Mock Night",
  description:
    "SSC CGL / CHSL practice: full Tier 1 mocks (100 questions, 60 minutes, +2/−0.5), reasoning and quant sectionals, daily questions on Telegram and worked solutions.",
};

const FAQ: [string, string][] = [
  ["What's in the Tier 1 mock?", "25 questions each from General Intelligence & Reasoning, General Awareness, Quantitative Aptitude and English — 100 questions in 60 minutes, marked +2 for correct and −0.5 for wrong, like the real exam."],
  ["Does it cover current affairs?", "Not yet. General Awareness covers static GK — polity, history, geography, science, economy and culture."],
  ["Are these previous year papers?", "No. Questions are written independently in the SSC style. Every quant and reasoning question shows the working."],
  ["What does it cost?", "Free for 14 days. Then ₹199 for 90 days or ₹499 for 12 months."],
];

export default function Ssc() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <section className="hero">
        <div className="muted small">🇮🇳 SSC CGL · CHSL</div>
        <h1>SSC Tier 1 mocks with real negative marking.</h1>
        <p className="muted">Full mocks and sectionals on your phone, daily questions on Telegram, and step-by-step solutions for every quant and reasoning question.</p>
        {bot ? <a className="btn" href={`https://t.me/${bot}?start=ssc`}>Start free on Telegram</a> : <Link className="btn" href="/app?track=SSC">Start free</Link>}
      </section>

      <div className="grid2">
        <div className="card"><b>🧪 Tier 1 full mock</b><p className="muted small">100 questions · 60 minutes · +2 / −0.5 · section-wise score.</p></div>
        <div className="card"><b>⚡ Sectionals</b><p className="muted small">Quick quant and reasoning tests when you only have 15–20 minutes.</p></div>
        <div className="card"><b>🧮 Worked solutions</b><p className="muted small">Percentages, profit & loss, interest, time & work, trains, series, coding, clocks and calendars.</p></div>
        <div className="card"><b>🔁 Smart revision</b><p className="muted small">Wrong answers come back after 1, 2, 4, 8 and 16 days.</p></div>
      </div>

      <section className="faq" style={{ marginTop: 24 }}>
        <h2>Questions</h2>
        {FAQ.map(([q, a]) => (
          <div key={q}>
            <h3>{q}</h3>
            <p className="muted">{a}</p>
          </div>
        ))}
      </section>

      <p style={{ marginTop: 28 }}>
        <Link className="btn" href="/app?track=SSC">Use the web app</Link>
        {bot && <> <a className="btn secondary" href={`https://t.me/${bot}`} style={{ marginLeft: 8 }}>Open Telegram</a></>}
      </p>
      <p className="muted small" style={{ marginTop: 32 }}>
        Independent practice resource — not affiliated with the Staff Selection Commission. A product of The 36th Solutions Ltd.
      </p>
    </main>
  );
}
