import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { completeLesson, courseStatus, getLessons } from "@/lib/courses";

export const dynamic = "force-dynamic";

/** { id } → lesson content; { id, complete: true } → mark done and return updated status. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  const lesson = getLessons(student.track).find((l) => l.id === body.id);
  if (!lesson) return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
  try {
    if (body.complete) {
      await completeLesson(student, lesson.id);
      return NextResponse.json({ ok: true, status: await courseStatus(student) });
    }
    return NextResponse.json({ lesson });
  } catch (e) {
    return errorResponse(e);
  }
}
