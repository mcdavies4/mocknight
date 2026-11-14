import { NextResponse } from "next/server";
import { env } from "@/lib/env";
import { growOnce } from "@/lib/grow";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Call every 5 minutes from cron-job.org (Authorization: Bearer $CRON_SECRET).
// Each call does one step: generate a batch, or verify + insert the waiting batch.
// Optional: ?subject=PLB to grow one bank.
function authorized(req: Request) {
  const url = new URL(req.url);
  return req.headers.get("authorization") === `Bearer ${env.cronSecret}` || url.searchParams.get("secret") === env.cronSecret;
}

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const subject = url.searchParams.get("subject")?.toUpperCase() || undefined;
  return NextResponse.json({ ok: true, result: await growOnce(subject) });
}
