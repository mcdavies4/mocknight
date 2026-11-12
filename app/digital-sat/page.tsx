import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital SAT practice on Telegram | Mock Night",
  description:
    "Prepare for the Digital SAT with original Reading and Writing and Math practice questions, timed module tests, daily Telegram drills and explanations.",
};

const FAQ: [string, string][] = [
  ["Are these official College Board questions?", "No. Mock Night uses independently written SAT-style practice questions. It is not affiliated with or endorsed by the College Board."],
  ["How long are the practice tests?", "Reading and Writing Module 1 practice has 27 questions and a 32-minute timer. Math Module 1 practice has 22 questions and a 35-minute timer."],
  ["Does this reproduce the complete Digital SAT?", "Not yet. This initial release provides one-module practice for each section. Adaptive routing into Module 2 and a complete official-length test are not included."],
];

export default function DigitalSatPage() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <section className="hero">
        <div className="muted small">🌐 DIGITAL SAT · GLOBAL PRACTICE</div>
        <h1>Build your Digital SAT confidence, one module at a time.</h1>
        <p className="muted">
          Daily Reading and Writing and Math questions on Telegram, timed module practice,
          answer explanations and a revision loop for questions you miss.
        </p>
        {bot ? <a className="btn" href={`https://t.me/${bot}`}>Start free on Telegram</a> : <Link className="btn" href="/app">Open Mock Night</Link>}
      </section>

      <div className="grid2">
        <div className="card">
          <b>📖 Reading and Writing</b>
          <p className="muted small">27 original questions · 32 minutes · Module 1 practice.</p>
        </div>
        <div className="card">
          <b>🧮 Math</b>
          <p className="muted small">22 original questions · 35 minutes · Module 1 practice.</p>
        </div>
        <div className="card">
          <b>📝 Daily Telegram drills</b>
          <p className="muted small">Short daily practice from both subjects, with explanations and revision of missed questions.</p>
        </div>
        <div className="card">
          <b>🎯 Timed practice</b>
          <p className="muted small">Choose Reading and Writing or Math from your Telegram menu whenever you are ready.</p>
        </div>
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

      <p className="muted small" style={{ marginTop: 32 }}>
        Independent practice resource — not affiliated with or endorsed by the College Board. A product of The 36th Solutions Ltd.
      </p>
    </main>
  );
}
