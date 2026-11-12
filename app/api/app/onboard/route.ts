import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { updateStudent } from "@/lib/students";
import { regionsFor, TRACKS, type TrackCode } from "@/lib/tracks";
import { attachReferrer } from "@/lib/referrals";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  const t = TRACKS[body.track as TrackCode];
  if (!t) return NextResponse.json({ error: "BAD_TRACK" }, { status: 400 });
  if (t.launchStatus === "preparing") {
    return NextResponse.json({ error: "TRACK_PREPARING" }, { status: 409 });
  }

  let subjects: string[] = t.subjects;
  if (t.subjectMode === "multi") {
    const picked = Array.isArray(body.subjects) ? body.subjects.filter((s: unknown) => typeof s === "string" && t.subjects.includes(s as string)) : [];
    subjects = [...new Set([...t.compulsory, ...picked])];
    if (subjects.length < t.minSubjects || subjects.length > t.maxSubjects) {
      return NextResponse.json({ error: "BAD_SUBJECTS", note: t.subjectNote }, { status: 400 });
    }
  }
  const state = t.askState && regionsFor(t).includes(body.state) ? body.state : student.state;
  const school = t.askSchool && typeof body.school === "string" ? body.school.trim().slice(0, 80) || null : student.school;
  const firstName = typeof body.firstName === "string" && body.firstName.trim() ? body.firstName.trim().slice(0, 40) : student.first_name;

  try {
    if (typeof body.ref === "string") await attachReferrer(student, body.ref);
    await updateStudent(student.id, {
      track: t.code,
      exam: t.code === "JAMB" || t.code === "WAEC" ? t.code : null,
      subjects,
      state,
      school,
      first_name: firstName,
      onboarding_step: "done",
    });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
