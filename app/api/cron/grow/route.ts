import { after, NextResponse } from "next/server";
import { env } from "@/lib/env";
import { growOnce } from "@/lib/grow";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

// Question factory. Call every 5 minutes from cron-job.org with the header
// `Authorization: Bearer <CRON_SECRET>` (or ?secret=<CRON_SECRET>).
// Each call does one step: generate a batch, or verify + insert the waiting batch.
// It replies straight away and does the work in the background, so cron services
// with short timeouts (cron-job.org: 30 s) never see a failure.
//   ?wait=1        run in the foreground and return the result (for testing in a browser)
//   ?subject=PLB   grow one specific bank
function authorized(req: Request) {
  const url = new URL(req.url);
  return req.headers.get("authorization") === `Bearer ${env.cronSecret}` || url.searchParams.get("secret") === env.cronSecret;
}

export async function GET(req: Request) {
  if (!authorized(req)) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const url = new URL(req.url);
  const subject = url.searchParams.get("subject")?.toUpperCase() || undefined;
  if (url.searchParams.get("wait") === "1") return NextResponse.json({ ok: true, result: await growOnce(subject) });
  after(async () => {
    try {
      const result = await growOnce(subject);
      console.log("grow step", JSON.stringify(result));
    } catch (e) {
      console.error("grow step failed", e);
    }
  });
  return NextResponse.json({ ok: true, accepted: true }, { status: 202 });
}
