import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { completeSession, getOrCreateTodaySession, getQuestion } from "@/lib/drill";
import { db, must } from "@/lib/supabase";
import { subjectName } from "@/lib/subjects";

export const dynamic = "force-dynamic";

/** Returns the current drill question (answer hidden), or the summary when the drill is finished. */
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  if (student.onboarding_step !== "done") return NextResponse.json({ error: "ONBOARDING" }, { status: 400 });
  try {
    let session;
    try {
      session = await getOrCreateTodaySession(student);
    } catch (e) {
      if ((e as Error).message === "NO_QUESTIONS") return NextResponse.json({ error: "NO_QUESTIONS" }, { status: 400 });
      throw e;
    }
    if (session.position >= session.question_ids.length) {
      return NextResponse.json({ done: true, summary: await completeSession(student, session) });
    }
    // Void stale messages, then issue one for the current question
    await db().from("drill_messages").update({ answered: true }).eq("session_id", session.id).eq("answered", false);
    const q = await getQuestion(session.question_ids[session.position]);
    const msg = must(await db().from("drill_messages").insert({ session_id: session.id, question_id: q.id }).select("id").single(), "msg") as { id: number };
    return NextResponse.json({
      done: false,
      messageId: msg.id,
      position: session.position,
      total: session.question_ids.length,
      isReview: session.position < session.review_count,
      subject: subjectName(q.subject_code),
      topic: q.topic,
      body: q.body,
      options: q.options,
    });
  } catch (e) {
    return errorResponse(e);
  }
}
