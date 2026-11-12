import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { createLinkCode } from "@/lib/referrals";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  if (student.telegram_id) return NextResponse.json({ error: "ALREADY_LINKED" }, { status: 400 });
  try {
    return NextResponse.json({ url: await createLinkCode(student.id) });
  } catch (e) {
    return errorResponse(e);
  }
}
