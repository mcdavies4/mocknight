import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { db } from "@/lib/supabase";
import { pushPublicKey } from "@/lib/push";

export const dynamic = "force-dynamic";

// Public key for subscribing (read at request time, so no rebuild is needed after setting it).
export async function GET() {
  return NextResponse.json({ publicKey: pushPublicKey() || null });
}

// Save this device's push subscription for the signed-in learner.
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const student = await authRequest(req, body);
    if (!student) return unauthorized();
    const s = body.subscription;
    if (!s?.endpoint || !s?.keys?.p256dh || !s?.keys?.auth) return NextResponse.json({ error: "BAD_SUBSCRIPTION" }, { status: 400 });
    const { error } = await db().from("push_subscriptions").upsert(
      { endpoint: s.endpoint, p256dh: s.keys.p256dh, auth: s.keys.auth, student_id: student.id, user_agent: req.headers.get("user-agent")?.slice(0, 200) ?? null },
      { onConflict: "endpoint" },
    );
    if (error) throw error;
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}

export async function DELETE(req: Request) {
  try {
    const body = await req.json();
    const student = await authRequest(req, body);
    if (!student) return unauthorized();
    if (body.endpoint) await db().from("push_subscriptions").delete().eq("endpoint", body.endpoint).eq("student_id", student.id);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
