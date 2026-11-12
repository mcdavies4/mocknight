import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { explain } from "@/lib/ai";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  if (typeof body.questionId !== "string") return NextResponse.json({ error: "BAD_INPUT" }, { status: 400 });
  try {
    const r = await explain(student, body.questionId);
    return r.ok ? NextResponse.json(r) : NextResponse.json(r, { status: r.error === "FAILED" ? 502 : 400 });
  } catch (e) {
    return errorResponse(e);
  }
}
