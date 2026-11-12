import { NextResponse } from "next/server";
import { getBot } from "@/bot/bot";
import { applySuccessfulPayment, verifyPaystackSignature } from "@/lib/payments";
import { formatWat } from "@/lib/time";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const raw = await req.text();
  if (!verifyPaystackSignature(raw, req.headers.get("x-paystack-signature"))) {
    return NextResponse.json({ error: "bad signature" }, { status: 401 });
  }
  const event = JSON.parse(raw) as { event: string; data: { reference: string; amount: number; status: string; currency: string } };
  if (event.event !== "charge.success" || event.data.status !== "success" || event.data.currency !== "NGN") {
    return NextResponse.json({ ok: true });
  }

  const applied = await applySuccessfulPayment(event.data.reference, event.data.amount, event.data.currency);
  if (applied && applied.student.telegram_id) {
    const api = getBot().api;
    const text =
      applied.kind === "premium"
        ? `⭐ Payment received — you're Premium until ${formatWat(applied.until)}. Your next drill will have more questions. Let's go! 🚀`
        : `✅ Payment received — ${applied.seats} Premium seats for *${applied.group.name}* until ${formatWat(applied.until)}. Seats are assigned to your earliest-joined students.`;
    try {
      await api.sendMessage(applied.student.telegram_id, text, { parse_mode: "Markdown" });
    } catch (e) {
      console.error("payment notify failed", e);
    }
  }
  return NextResponse.json({ ok: true });
}
