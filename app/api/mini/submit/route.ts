import { NextResponse } from "next/server";
import { submitAttempt } from "@/lib/mock";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  try {
    return NextResponse.json(await submitAttempt(String(body.attemptId), student.id, body.answers));
  } catch (e) {
    return errorResponse(e);
  }
}
