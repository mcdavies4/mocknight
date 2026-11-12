import Link from "next/link";

export default function Home() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap" style={{ maxWidth: 880 }}>
      <section className="hero">
        <h1>Practise a little every day. Walk into your exam ready.</h1>
        <p className="muted">Daily questions that repeat what you get wrong, full timed practice tests, and a clear score of how ready you are.</p>
      </section>

      <div className="grid2">
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🇬🇧 Life in the UK Test</h2>
          <p>24-question practice tests in 45 minutes — exactly like the real test. Daily practice, a readiness score, and explanations for every answer.</p>
          <Link className="btn block" href="/life-in-the-uk">Start practising</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🎓 JAMB & WAEC</h2>
          <p>Daily drills on Telegram, a real CBT practice screen, and <b>Mock Night</b> — the same exam for every student in Nigeria, every Sunday at 8pm.</p>
          {bot && <a className="btn block" href={`https://t.me/${bot}`}>Start on Telegram</a>}
          <Link className="btn secondary block" style={{ marginTop: 8 }} href="/app">Or use the web app</Link>
        </div>
      </div>

      <div className="grid2" style={{ marginTop: 12 }}>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🩺 NMC CBT for nurses</h2>
          <p>Part A numeracy and Part B clinical practice tests for internationally educated nurses joining the UK register.</p>
          <Link className="btn block" href="/nmc-cbt">Start practising</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>📋 Project Management</h2>
          <p>PRINCE2 7 Foundation, Scrum PSM I and CAPM-style practice tests, with daily questions on Telegram.</p>
          <Link className="btn block" href="/project-management">Start practising</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🧯 Fire Marshal training</h2>
          <p>8 short online modules, a final assessment and a certificate valid for 12 months. Company accounts with training records.</p>
          <Link className="btn block" href="/fire-marshal">Learn more</Link>
        </div>
        <div className="card">
          <h2 style={{ marginTop: 0 }}>🏛️ Post-UTME & 🇬🇭 WASSCE Ghana</h2>
          <p>Fast timed screening practice for university admission, and free WASSCE practice for students in Ghana.</p>
          <Link className="btn secondary block" href="/app">Start practising</Link>
        </div>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        👩🏾‍🏫 <b>Tutors, schools and training providers:</b> one link for your learners, a dashboard of who&apos;s practising, and weekly results.
        {bot && <> Message <a href={`https://t.me/${bot}`}>@{bot}</a> and send <code>/newgroup</code>.</>}
      </div>
      <p className="muted small" style={{ marginTop: 32 }}>A product of The 36th Solutions Ltd.</p>
    </main>
  );
}
