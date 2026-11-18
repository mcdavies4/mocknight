import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy | Mock Night",
  description: "How Mock Night collects, uses and protects your data on the website, the web app, the Android app and Telegram.",
  alternates: { canonical: "/privacy" },
};

const EMAIL = "the36thltd@outlook.com";

export default function Privacy() {
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <section className="hero">
        <div className="muted small">Last updated 17 November 2026</div>
        <h1>Privacy policy</h1>
        <p className="muted">
          Mock Night is run by The 36th Solutions Ltd. This policy covers mocknight.online, the Mock Night web app, the Mock Night
          Android app and the @MocknightNGbot Telegram bot.
        </p>
      </section>
      <div className="card prose" style={{ padding: 24 }}>
        <h2>What we collect</h2>
        <ul>
          <li><b>Account details:</b> your Telegram ID, name and username when you use the bot or sign in with Telegram, or the email address you give us.</li>
          <li><b>Your study choices:</b> the exam and subjects you pick, and optional details such as your state, region or school.</li>
          <li><b>Practice activity:</b> your answers, scores, streaks and progress, so we can track your weak topics and show your results.</li>
          <li><b>Payments:</b> which plan you bought and when. Card and bank details are handled by our payment providers (Stripe and Telegram) and never reach us.</li>
          <li><b>Notifications:</b> if you turn on reminders, a push subscription token for your browser or device.</li>
          <li><b>Usage and device data:</b> pages visited, device type and approximate location from your IP address, through Google Tag Manager and our hosting provider.</li>
          <li><b>Messages you send us:</b> including essays you submit for marking.</li>
        </ul>
        <h2>How we use it</h2>
        <ul>
          <li>To run your account, pick your daily questions, mark mocks and show your progress.</li>
          <li>To send the reminders you asked for.</li>
          <li>To process payments and unlock Premium.</li>
          <li>To fix problems, prevent abuse and improve our questions and features.</li>
        </ul>
        <p>We do not sell your data and we do not show third-party ads.</p>
        <h2>Who we share it with</h2>
        <p>
          Only service providers that help us run Mock Night: Supabase (database), Vercel (hosting), Telegram (bot messages), Stripe (payments),
          Google (Tag Manager and analytics) and an AI provider that marks essays you choose to submit. They may only use
          your data to provide their service to us. Some are based outside your country; we rely on their standard contractual protections.
        </p>
        <h2>How long we keep it</h2>
        <p>We keep your account and practice history while your account is active. Payment records are kept as long as the law requires. You can ask us to delete your data at any time.</p>
        <h2>Your rights</h2>
        <p>
          You can ask to see, correct, export or delete your data, or object to how we use it, by emailing <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
          If you are in the UK or EU you can also complain to your data protection regulator (in the UK, the ICO).
        </p>
        <h2>Children</h2>
        <p>Mock Night is for students aged 13 and over. If you are under the age of digital consent where you live, ask a parent or guardian before using it.</p>
        <h2>Security</h2>
        <p>Data is encrypted in transit, and access to our database is restricted.</p>
        <h2>Changes</h2>
        <p>If we change this policy we will update the date at the top of this page.</p>
        <h2>Contact</h2>
        <p>The 36th Solutions Ltd · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>
      </div>
    </main>
  );
}
