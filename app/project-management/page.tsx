import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PRINCE2, Scrum PSM I & CAPM practice tests | Mock Night",
  description:
    "Project management exam practice: timed PRINCE2 7 Foundation, Scrum PSM I-style and CAPM-style tests, daily questions on Telegram, worked earned value and PERT calculations, and a readiness score.",
};

const FAQ: [string, string][] = [
  ["Which exams does this cover?", "PRINCE2® 7 Foundation (60 questions, 60 minutes, 36 to pass), Scrum.org PSM I (80 questions, 60 minutes, 85% to pass) and PMI CAPM fundamentals. Pick one, two or all three."],
  ["Are these the official exam questions?", "No. Every question is written independently for practice, based on the published frameworks. Use the official manuals, the Scrum Guide and PMI materials alongside us."],
  ["Does it help with the maths?", "Yes. Earned value (CV, SV, CPI, SPI, EAC), PERT estimates, communication channels and critical path questions all show the working, and you can ask for an AI explanation of any mistake."],
  ["How does daily practice work?", "Short daily drills on Telegram or the web. Questions you get wrong come back after 1, 2, 4, 8 and 16 days until you've got them."],
  ["Can I pay in naira?", "Yes. It's £14.99 for 90 days by card, or ₦12,000 for 90 days through Paystack."],
];

export default function ProjectManagement() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <section className="hero">
        <div className="muted small">📋 Project management certifications</div>
        <h1>Pass PRINCE2, Scrum and CAPM with 10 minutes a day.</h1>
        <p className="muted">Exam-format timed tests, daily questions that keep coming back to your weak spots, and worked answers for every calculation.</p>
        <Link className="btn" href="/app?track=PM">Start free for 14 days</Link>
      </section>

      <div className="grid2">
        <div className="card"><b>👑 PRINCE2® 7 Foundation</b><p className="muted small">Principles, practices, processes, roles, tolerances, management products and the PRINCE2 7 changes. 60 questions in 60 minutes.</p></div>
        <div className="card"><b>🔄 Scrum — PSM I style</b><p className="muted small">Accountabilities, events and time-boxes, artifacts and commitments, values and real scenarios from the 2020 Scrum Guide. 80 questions in 60 minutes.</p></div>
        <div className="card"><b>📊 CAPM-style fundamentals</b><p className="muted small">Predictive and agile concepts, earned value, PERT, critical path, contracts, risk and quality. 50-question timed sets.</p></div>
        <div className="card"><b>📈 Readiness score</b><p className="muted small">See when you&apos;re consistently passing before you pay for the real exam.</p></div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <b>Free:</b> daily questions and a practice test each week.<br />
        <b>Full access — £14.99 (or ₦12,000) for 90 days:</b> unlimited timed tests for all three exams and 40 AI explanations a day.
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
        <Link className="btn" href="/app?track=PM">Start practising</Link>
        {bot && <> <a className="btn secondary" href={`https://t.me/${bot}`} style={{ marginLeft: 8 }}>Use Telegram instead</a></>}
      </p>
      <p className="muted small" style={{ marginTop: 32 }}>
        Independent practice resource. PRINCE2® is a registered trademark of PeopleCert. Not affiliated with or endorsed by PeopleCert/AXELOS, Scrum.org or the Project Management Institute (PMI). CAPM is a mark of PMI. A product of The 36th Solutions Ltd.
      </p>
    </main>
  );
}
