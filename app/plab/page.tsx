import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PLAB 1 practice questions & 180-question mocks | Mock Night",
  description:
    "PLAB 1 preparation for international medical graduates: best-of-five clinical questions based on UK practice, full 180-question timed mocks, daily questions on Telegram and explanations for every answer.",
};

const FAQ: [string, string][] = [
  ["How close is it to the real PLAB 1?", "The real exam is 180 single-best-answer questions with five options in 3 hours, with no negative marking. Our full mock uses exactly that format and timing, plus 90-question and 30-question papers for shorter sessions."],
  ["What does it cover?", "Medicine, surgery, paediatrics, obstetrics and gynaecology, psychiatry, emergencies, prescribing, ethics and law (GMC guidance) and calculations like CURB-65, anion gap and paediatric fluids — written to UK practice (NICE, BNF)."],
  ["Are these real PLAB questions or recalls?", "No. Every question is written independently for practice. Use them alongside NICE CKS, the BNF and GMC Good Medical Practice."],
  ["What does it cost?", "Free for 14 days. Then £24.99 for 90 days by card, or 1,550 Telegram Stars inside the bot."],
];

export default function Plab() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <section className="hero">
        <div className="muted small">⚕️ PLAB 1 · GMC</div>
        <h1>Pass PLAB 1 with timed, UK-focused practice.</h1>
        <p className="muted">Full 180-question mocks at one minute per question, daily questions on Telegram that keep coming back until you&apos;ve got them, and a clear UK-practice explanation for every answer.</p>
        {bot ? <a className="btn" href={`https://t.me/${bot}?start=plab`}>Start free on Telegram</a> : <Link className="btn" href="/app?track=PLAB">Start free</Link>}
      </section>

      <div className="grid2">
        <div className="card"><b>⏱️ Full 180-question mocks</b><p className="muted small">Five options, single best answer, 3 hours — exactly like the real paper.</p></div>
        <div className="card"><b>🇬🇧 UK practice</b><p className="muted small">Explanations follow NICE, BNF and GMC principles — what the examiners expect from an FY2-level doctor.</p></div>
        <div className="card"><b>⚖️ Ethics & law</b><p className="muted small">Capacity, consent, confidentiality, Fraser competence, DVLA and duty of candour.</p></div>
        <div className="card"><b>🧮 Scores & calculations</b><p className="muted small">CURB-65, GCS, anion gap, paediatric maintenance fluids and BMI with worked answers.</p></div>
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
        <Link className="btn" href="/app?track=PLAB">Use the web app</Link>
        {bot && <> <a className="btn secondary" href={`https://t.me/${bot}`} style={{ marginLeft: 8 }}>Open Telegram</a></>}
      </p>
      <p className="muted small" style={{ marginTop: 32 }}>
        Independent practice resource — not affiliated with or endorsed by the General Medical Council (GMC). A product of The 36th Solutions Ltd.
      </p>
    </main>
  );
}
