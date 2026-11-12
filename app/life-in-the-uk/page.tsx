import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Life in the UK Test practice — 24-question mock tests | Mock Night",
  description:
    "Practise for the Life in the UK Test with full 24-question, 45-minute mock tests, daily practice that repeats your mistakes, and a readiness score. Pass first time and save the £50 retake fee.",
};

const FAQ: [string, string][] = [
  ["What is the format of the Life in the UK Test?", "24 multiple-choice questions in 45 minutes. You need at least 18 correct (75%) to pass. Our practice tests use exactly the same format."],
  ["How much does the real test cost?", "£50 per attempt, booked through GOV.UK. Failing means paying again, so it pays to be ready before you book."],
  ["Are these the official questions?", "No. Every question is written independently from the topics in the official handbook, Life in the United Kingdom: A Guide for New Residents. Always read the handbook too."],
  ["How do I know when I'm ready?", "Your dashboard shows a readiness score from your recent practice tests. We suggest booking once you pass 3 practice tests in a row."],
  ["Can I practise on my phone?", "Yes — it works in any phone browser. You can also get a daily practice reminder on Telegram."],
];

export default function LifeInTheUK() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <section className="hero">
        <div className="muted small">🇬🇧 Life in the UK Test practice</div>
        <h1>Pass the Life in the UK Test first time.</h1>
        <p className="muted">Full mock tests in the real format, 10 minutes of daily practice, and a readiness score that tells you when to book.</p>
        <Link className="btn" href="/app?track=LUK">Start free — no card needed</Link>
      </section>

      <div className="grid2">
        <div className="card"><b>🧪 Real-format mock tests</b><p className="muted small">24 questions, 45 minutes, 18 to pass. Every answer explained.</p></div>
        <div className="card"><b>🔁 Practice that remembers</b><p className="muted small">Questions you miss come back after 1, 2, 4, 8 and 16 days until they stick.</p></div>
        <div className="card"><b>📈 Readiness score</b><p className="muted small">Know when you&apos;re ready before you spend £50 on the real test.</p></div>
        <div className="card"><b>📚 All handbook topics</b><p className="muted small">History, traditions, government, the law, everyday life, and famous people and places.</p></div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <b>Free:</b> 10 daily questions + 1 full practice test a week.<br />
        <b>Full access — £7.99 for 90 days:</b> 20 daily questions + unlimited practice tests.
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
        <Link className="btn" href="/app?track=LUK">Start practising</Link>
        {bot && <> <a className="btn secondary" href={`https://t.me/${bot}`} style={{ marginLeft: 8 }}>Use Telegram instead</a></>}
      </p>
      <p className="muted small" style={{ marginTop: 32 }}>
        Not affiliated with the Home Office. Book the official test only at gov.uk/life-in-the-uk-test. A product of The 36th Solutions Ltd.
      </p>
    </main>
  );
}
