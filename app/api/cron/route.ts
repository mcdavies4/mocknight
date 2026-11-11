import { NextResponse } from "next/server";
import { getBot } from "@/bot/bot";
import { env } from "@/lib/env";
import { runHourly } from "@/lib/jobs";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Vercel Cron sends `Authorization: Bearer $CRON_SECRET`.
// External crons (cron-job.org etc.) can use ?secret=... instead.
function authorized(req: Request) {
  const url = new URL(req.url);
  return req.headers.get("authorization") === `Bearer ${env.cronSecret}` || url.searchParams.get("secret") === env.cronSecret;
}

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const bot = getBot();
  await bot.init();
  const log = await runHourly(bot.api);
  return NextResponse.json({ ok: true, ...log });
}
