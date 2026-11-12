import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ethiopia Grade 12 national exam practice on Telegram | Mock Night",
  description:
    "Free Grade 12 national exam (ESSLCE) practice for Ethiopian students: daily questions on Telegram, timed online CBT tests in English, Maths, Aptitude and your stream subjects, with explanations.",
};

const FAQ: [string, string][] = [
  ["Which subjects are covered?", "English, Mathematics and Scholastic Aptitude for everyone, plus Biology, Chemistry and Physics for Natural Science, or Economics, Geography and History for Social Science."],
  ["Is it like the real exam?", "The national exam is moving online, so we give you the same kind of timed computer test: choose an answer, flag questions, and get your score with each subject out of 100. 50% is the pass line."],
  ["Are these real past papers?", "No. Questions are written independently for practice, following the Grade 9–12 curriculum. Use your textbooks and the Ministry's model exams too."],
  ["How do I pay?", "Practice is free for 14 days. After that, Premium is 150 Birr for 30 days or 400 Birr until the exam, with Telebirr, CBE Birr or card through Chapa."],
];

export default function Ethiopia() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <section className="hero">
        <div className="muted small">🇪🇹 Grade 12 National Exam</div>
        <h1>Practise for the Grade 12 exam every day — on Telegram.</h1>
        <p className="muted">Daily questions that come back until you get them right, timed CBT tests like the online exam, and a clear explanation for every answer.</p>
        {bot ? <a className="btn" href={`https://t.me/${bot}?start=eth`}>Start free on Telegram</a> : <Link className="btn" href="/app?track=ETH">Start free</Link>}
      </section>

      <div className="grid2">
        <div className="card"><b>📝 All 6 papers</b><p className="muted small">English, Maths, Aptitude + Natural (Biology, Chemistry, Physics) or Social (Economics, Geography, History).</p></div>
        <div className="card"><b>💻 Online exam practice</b><p className="muted small">Timed CBT tests on your phone, scored like the real exam: each subject out of 100.</p></div>
        <div className="card"><b>🧠 Aptitude made easy</b><p className="muted small">Number series, coding, directions, calendars and clocks — with the working shown.</p></div>
        <div className="card"><b>🔁 Learn from mistakes</b><p className="muted small">Questions you miss come back after 1, 2, 4, 8 and 16 days.</p></div>
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
        <Link className="btn" href="/app?track=ETH">Use the web app</Link>
        {bot && <> <a className="btn secondary" href={`https://t.me/${bot}`} style={{ marginLeft: 8 }}>Open Telegram</a></>}
      </p>
      <p className="muted small" style={{ marginTop: 32 }}>
        Independent practice resource — not affiliated with the Ministry of Education or the Educational Assessment and Examinations Service (EAES). A product of The 36th Solutions Ltd.
      </p>
    </main>
  );
}
