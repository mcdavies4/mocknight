import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NCLEX-RN practice questions on Telegram | Mock Night",
  description:
    "NCLEX-RN practice for internationally educated nurses: prioritisation, delegation, infection control, pharmacology and dosage calculations, with daily questions on Telegram and timed practice tests.",
};

const FAQ: [string, string][] = [
  ["What does it cover?", "All eight NCLEX client-needs areas: management of care, safety and infection control, health promotion, psychosocial integrity, basic care, pharmacology, reduction of risk potential and physiological adaptation — plus dosage, IV rate and weight-based calculations with the working shown."],
  ["Is it like the real NCLEX?", "The real exam is computer-adaptive (85–150 questions) and includes case studies and select-all-that-apply items. Our practice tests use single-best-answer questions in a timed 85-question format to build the clinical judgement and speed you need."],
  ["Are these real NCLEX questions?", "No. Every question is written independently for practice using US units and US nursing practice. Use them alongside official NCSBN resources and your review course."],
  ["How much is it?", "Free for 14 days. Then $19.99 for 90 days by card, or 1,000 Telegram Stars inside the bot."],
];

export default function Nclex() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <section className="hero">
        <div className="muted small">🏥 NCLEX-RN</div>
        <h1>Pass the NCLEX with 15 minutes of practice a day.</h1>
        <p className="muted">Questions arrive on Telegram every day, the ones you miss come back until you've mastered them, and every calculation shows its working.</p>
        {bot ? <a className="btn" href={`https://t.me/${bot}?start=nclex`}>Start free on Telegram</a> : <Link className="btn" href="/app?track=NCLEX">Start free</Link>}
      </section>

      <div className="grid2">
        <div className="card"><b>🚨 Prioritisation & delegation</b><p className="muted small">Who to see first, what to delegate to an LPN or UAP, and when to escalate.</p></div>
        <div className="card"><b>💊 Pharmacology</b><p className="muted small">Antidotes, high-alert drugs, insulin, anticoagulants, IV fluids and transfusion safety.</p></div>
        <div className="card"><b>🧮 Dosage calculations</b><p className="muted small">Tablets and liquids, IV pump rates, drip rates, weight-based paediatric doses and heparin infusions.</p></div>
        <div className="card"><b>⏱️ Timed practice tests</b><p className="muted small">85-question practice exams and quick 30-question sets with a readiness score.</p></div>
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
        <Link className="btn" href="/app?track=NCLEX">Use the web app</Link>
        {bot && <> <a className="btn secondary" href={`https://t.me/${bot}`} style={{ marginLeft: 8 }}>Open Telegram</a></>}
      </p>
      <p className="muted small" style={{ marginTop: 32 }}>
        Independent practice resource. NCLEX® and NCLEX-RN® are registered trademarks of the National Council of State Boards of Nursing (NCSBN), which does not endorse this product. A product of The 36th Solutions Ltd.
      </p>
    </main>
  );
}
