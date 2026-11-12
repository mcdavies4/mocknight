import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { completeSession, recordDrillAnswer } from "@/lib/drill";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  const messageId = Number(body.messageId), chosen = Number(body.chosen);
  if (!Number.isInteger(messageId) || !Number.isInteger(chosen) || chosen < 0 || chosen > 4) {
    return NextResponse.json({ error: "BAD_INPUT" }, { status: 400 });
  }
  try {
    const res = await recordDrillAnswer(student, messageId, chosen);
    if (!res) return NextResponse.json({ error: "STALE" }, { status: 409 });
    const done = res.session.position >= res.session.question_ids.length;
    return NextResponse.json({
      correct: res.correct,
      answer: res.question.answer_index,
      explanation: res.question.explanation,
      done,
      summary: done ? await completeSession(student, res.session) : null,
    });
  } catch (e) {
    return errorResponse(e);
  }
}
