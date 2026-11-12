export const metadata = { title: "Payment — Mock Night" };

export default async function Paid({ searchParams }: { searchParams: Promise<{ to?: string; cancelled?: string }> }) {
  const { to, cancelled } = await searchParams;
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  const web = to === "web";
  return (
    <div className="center">
      <div>
        <h1>{cancelled ? "Payment cancelled" : "Thank you 🎉"}</h1>
        <p className="muted">
          {cancelled
            ? "No money was taken. You can try again any time."
            : web
              ? "Your payment is being confirmed — your account will update within a minute."
              : "Your payment is being confirmed. You'll get a message in Telegram within a minute."}
        </p>
        {web ? (
          <a className="btn" href="/app">Back to your dashboard</a>
        ) : (
          bot && <a className="btn" href={`https://t.me/${bot}`}>Back to Telegram</a>
        )}
      </div>
    </div>
  );
}
