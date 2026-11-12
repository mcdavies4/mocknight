import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { isPremium } from "@/lib/students";
import { getProgress } from "@/lib/progress";
import { getTodaySession } from "@/lib/drill";
import { getTrack, TRACK_LIST } from "@/lib/tracks";
import { money, PLANS, FREE_DAILY_QUESTIONS, PREMIUM_DAILY_QUESTIONS } from "@/lib/pricing";
import { STATES, subjectName } from "@/lib/subjects";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  try {
    const track = student.track ? getTrack(student.track) : null;
    const [premium, progress, today] = await Promise.all([
      isPremium(student),
      student.onboarding_step === "done" ? getProgress(student) : Promise.resolve(null),
      student.onboarding_step === "done" ? getTodaySession(student) : Promise.resolve(null),
    ]);
    return NextResponse.json({
      student: {
        firstName: student.first_name,
        email: student.email,
        track: student.track,
        subjects: student.subjects,
        state: student.state,
        school: student.school,
        onboarded: student.onboarding_step === "done",
        premiumUntil: student.premium_until,
      },
      premium,
      dailyQuestions: premium ? PREMIUM_DAILY_QUESTIONS : FREE_DAILY_QUESTIONS,
      progress,
      today: today ? { position: today.position, total: today.question_ids.length, correct: today.correct, finished: !!today.finished_at } : null,
      track: track && {
        code: track.code, name: track.name, short: track.short, emoji: track.emoji, subjectMode: track.subjectMode,
        mock: track.mock, weeklyMock: track.weeklyMock,
      },
      plans: (track?.plans ?? []).map((c) => ({ code: c, label: PLANS[c].label, price: money(PLANS[c].amount, PLANS[c].currency) })),
      // for onboarding
      tracks: TRACK_LIST.map((t) => ({
        code: t.code, name: t.name, emoji: t.emoji, tagline: t.tagline, subjectMode: t.subjectMode,
        subjects: t.subjects.map((code) => ({ code, name: subjectName(code) })), compulsory: t.compulsory,
        minSubjects: t.minSubjects, maxSubjects: t.maxSubjects, subjectNote: t.subjectNote, askState: t.askState, askSchool: t.askSchool,
      })),
      states: STATES,
    });
  } catch (e) {
    return errorResponse(e);
  }
}
