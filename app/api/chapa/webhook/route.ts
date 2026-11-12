import { NextResponse } from "next/server";
import { getBot } from "@/bot/bot";
import { applySuccessfulPayment, verifyChapa } from "@/lib/payments";
import { formatWat } from "@/lib/time";

export const dynamic = "force-dynamic";

/**
 * Chapa calls this as the callback_url (GET with ?trx_ref=…&status=…) and, if you enable it in the
 * dashboard, as a webhook (POST JSON with tx_ref). Either way we re-verify with Chapa's API before giving access.
 */
async function handle(reference: string | null) {
  if (!reference || !reference.startsWith("mn_")) return NextResponse.json({ ok: true });
  const v = await verifyChapa(reference);
  if (!v.ok) return NextResponse.json({ ok: true, verified: false });
  const applied = await applySuccessfulPayment(reference, v.amount, v.currency);
  if (applied && applied.kind === "premium" && applied.student.telegram_id) {
    try {
      await getBot().api.sendMessage(applied.student.telegram_id, `⭐ Payment received — you're Premium until ${formatWat(applied.until)}. Let's go! 🚀`);
    } catch (e) {
      console.error("chapa notify failed", e);
    }
  }
  return NextResponse.json({ ok: true });
}

export async function GET(req: Request) {
  const u = new URL(req.url);
  return handle(u.searchParams.get("trx_ref") ?? u.searchParams.get("tx_ref"));
}

export async function POST(req: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await req.json();
  } catch {}
  const ref = (body.tx_ref ?? body.trx_ref ?? (body.data as any)?.tx_ref) as string | undefined;
  return handle(ref ?? null);
}
