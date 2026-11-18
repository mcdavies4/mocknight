import type { Metadata } from "next";
import Link from "next/link";

const EMAIL = "the36thltd@outlook.com";
const mail = `mailto:${EMAIL}?subject=${encodeURIComponent("Delete my Mock Night account")}&body=${encodeURIComponent(
  "Please delete my Mock Night account and data.\n\nEmail I sign in with (or my Telegram username):\n\n",
)}`;

export const metadata: Metadata = {
  title: "Delete your account | Mock Night",
  description: "How to delete your Mock Night account and the data we hold about you.",
  alternates: { canonical: "/delete-account" },
};

export default function DeleteAccount() {
  return (
    <main className="wrap" style={{ maxWidth: 720 }}>
      <h1>Delete your Mock Night account</h1>
      <p className="muted">Mock Night is run by The 36th Solutions Ltd. You can ask us to delete your account and data at any time, whether you use the web app, the Android app or Telegram.</p>

      <h2>How to ask</h2>
      <ol>
        <li>Email <a href={mail}>{EMAIL}</a> with the subject <b>“Delete my Mock Night account”</b>.</li>
        <li>Tell us the email address you sign in with, or your Telegram username.</li>
        <li>We confirm and delete your account within 30 days (usually within 2 working days).</li>
      </ol>
      <p><a className="btn" href={mail}>Email a deletion request</a></p>

      <h2>What we delete</h2>
      <ul>
        <li>Your account: name, email address and Telegram ID</li>
        <li>Your exam choice, settings and reminder preferences</li>
        <li>Your practice history: answers, test results, streaks and readiness scores</li>
      </ul>

      <h2>What we keep</h2>
      <ul>
        <li>Payment records (amount, date and reference), for up to 6 years, because tax law requires it. These are not linked to your practice data once your account is deleted.</li>
      </ul>
      <p className="muted small">See our <Link href="/privacy">privacy policy</Link> for more detail.</p>
    </main>
  );
}
