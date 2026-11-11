export default function Home() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <main className="wrap" style={{ paddingTop: 48 }}>
      <h1 style={{ fontSize: 40, lineHeight: 1.1, margin: "0 0 12px" }}>Mock Night</h1>
      <p style={{ fontSize: 20 }}>JAMB & WAEC prep that lives in Telegram.</p>
      <div className="card">📝 <b>Daily drill</b> — questions in your subjects at the time you choose. Miss one and it comes back until you get it right.</div>
      <div className="card">🖥 <b>Real CBT practice</b> — timer, question map and calculator, just like the exam hall.</div>
      <div className="card">🏆 <b>Mock Night, every Sunday 8pm</b> — the same exam for every student in Nigeria. National and state leaderboard on Monday.</div>
      <div className="card">👩🏾‍🏫 <b>For tutors & tutorial centres</b> — one link for your students, a dashboard of who's practising, and weekly results posted to your group.</div>
      {bot && (
        <p style={{ marginTop: 24 }}>
          <a className="btn" href={`https://t.me/${bot}`}>Start on Telegram</a>
        </p>
      )}
    </main>
  );
}
