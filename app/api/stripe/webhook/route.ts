import { NextResponse } from "next/server";
import { getBot } from "@/bot/bot";
import { applySuccessfulPayment, verifyStripeSignature } from "@/lib/payments";
import { formatWat } from "@/lib/time";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const raw = await req.text();
  if (!verifyStripeSignature(raw, req.headers.get("stripe-signature"))) {
    return NextResponse.json({ error: "bad signature" }, { status: 400 });
  }
  const event = JSON.parse(raw) as {
    type: string;
    data: { object: { client_reference_id?: string; metadata?: { reference?: string }; amount_total?: number; currency?: string; payment_status?: string } };
  };
  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return NextResponse.json({ ok: true });
  }
  const s = event.data.object;
  if (s.payment_status !== "paid") return NextResponse.json({ ok: true });
  const reference = s.metadata?.reference ?? s.client_reference_id;
  if (!reference) return NextResponse.json({ ok: true });

  const applied = await applySuccessfulPayment(reference, s.amount_total ?? 0, s.currency ?? "");
  if (applied?.student.telegram_id) {
    const text =
      applied.kind === "premium"
        ? `⭐ Payment received — you have full access until ${formatWat(applied.until)}. Good luck! 🍀`
        : `✅ Payment received — ${applied.seats} seats for ${applied.group.name} until ${formatWat(applied.until)}. Seats go to your earliest-joined learners.`;
    try {
      await getBot().api.sendMessage(applied.student.telegram_id, text);
    } catch (e) {
      console.error("stripe notify failed", e);
    }
  }
  return NextResponse.json({ ok: true });
}
