import { NextResponse } from "next/server";
import { saveAnswers } from "@/lib/mock";
import { authStudent, errorResponse, unauthorized } from "../_shared";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authStudent(body.initData);
  if (!student) return unauthorized();
  try {
    await saveAnswers(String(body.attemptId), student.id, body.answers);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
