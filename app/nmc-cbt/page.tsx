import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NMC CBT practice tests — Part A numeracy & Part B clinical | Mock Night",
  description:
    "Practise for the NMC CBT (Test of Competence Part 1): timed Part A numeracy and Part B clinical tests, daily questions, step-by-step drug calculation explanations and a readiness score.",
};

const FAQ: [string, string][] = [
  ["What is the NMC CBT?", "Part 1 of the NMC Test of Competence for internationally educated nurses. Part A is numeracy (15 questions, 30 minutes) and Part B is clinical (100 questions, 2 hours 30 minutes). Each part is passed separately."],
  ["What does the real test cost?", "£83 for both parts, booked through Pearson VUE. Passing first time saves the resit fee and weeks of waiting."],
  ["Are these the real NMC questions?", "No. All questions are written independently for practice. Use the NMC's own guidance and the Pearson VUE practice test alongside us."],
  ["What pass marks do you use?", "Part A practice tests need 13 of 15. Part B pass marks are set by the NMC for each test version, so we use 65% as a practice target — aim to beat it comfortably."],
  ["Does it help with drug calculations?", "Yes — every numeracy question shows the working, and you can ask for a step-by-step AI explanation of any mistake."],
];

export default function NmcCbt() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <section className="hero">
        <div className="muted small">🩺 NMC CBT practice</div>
        <h1>Pass your NMC CBT first time.</h1>
        <p className="muted">Timed Part A and Part B practice tests, daily questions that repeat your weak spots, and clear working for every drug calculation.</p>
        <Link className="btn" href="/app?track=NMC">Start free</Link>
      </section>

      <div className="grid2">
        <div className="card"><b>🧮 Part A — Numeracy</b><p className="muted small">Tablets, liquids, IV rates, drip rates, weight-based doses, conversions and fluid balance. 15 questions in 30 minutes.</p></div>
        <div className="card"><b>🩺 Part B — Clinical</b><p className="muted small">The Code, NEWS2 and deterioration, infection control, medicines, consent and capacity, safeguarding and fundamentals of care.</p></div>
        <div className="card"><b>🔁 Daily practice</b><p className="muted small">Questions you miss come back after 1, 2, 4, 8 and 16 days until they stick.</p></div>
        <div className="card"><b>📈 Readiness score</b><p className="muted small">Know when you&apos;re consistently passing before you book.</p></div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <b>Free:</b> 10 daily questions + 1 practice test a week.<br />
        <b>Full access — £19.99 for 90 days:</b> 20 daily questions, unlimited Part A and Part B tests, and 40 AI explanations a day.
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
        <Link className="btn" href="/app?track=NMC">Start practising</Link>
        {bot && <> <a className="btn secondary" href={`https://t.me/${bot}`} style={{ marginLeft: 8 }}>Use Telegram instead</a></>}
      </p>
      <p className="muted small" style={{ marginTop: 32 }}>
        Independent practice resource — not affiliated with the Nursing and Midwifery Council or Pearson VUE. A product of The 36th Solutions Ltd.
      </p>
    </main>
  );
}
