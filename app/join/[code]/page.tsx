import JoinRedirect from "./redirect";

export const metadata = { title: "You're invited — Mock Night" };

export default async function Join({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <JoinRedirect code={code.replace(/[^A-Za-z0-9]/g, "").slice(0, 12)} bot={process.env.TELEGRAM_BOT_USERNAME ?? ""} />;
}
