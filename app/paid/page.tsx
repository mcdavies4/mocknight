export const metadata = { title: "Payment received — Mock Night" };

export default function Paid() {
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  return (
    <div className="center">
      <div>
        <h1>Thank you 🎉</h1>
        <p className="muted">Your payment is being confirmed. You'll get a message in Telegram within a minute.</p>
        {bot && (
          <a className="btn" href={`https://t.me/${bot}`}>
            Back to Telegram
          </a>
        )}
      </div>
    </div>
  );
}
