import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { createCheckout } from "@/lib/payments";
import { getTrack } from "@/lib/tracks";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  const plan = String(body.plan ?? "");
  if (!getTrack(student.track).plans.includes(plan)) return NextResponse.json({ error: "BAD_PLAN" }, { status: 400 });
  try {
    return NextResponse.json({ url: await createCheckout(student, plan, { returnTo: "web" }) });
  } catch (e) {
    return errorResponse(e);
  }
}
