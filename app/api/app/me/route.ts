import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { accessKind, trialDaysLeft } from "@/lib/students";
import { getProgress } from "@/lib/progress";
import { getTodaySession } from "@/lib/drill";
import { getTrack, regionsFor, TRACK_LIST, variantsFor } from "@/lib/tracks";
import { money, PLANS, FREE_DAILY_QUESTIONS, PREMIUM_DAILY_QUESTIONS } from "@/lib/pricing";
import { subjectName } from "@/lib/subjects";
import { referralCount, refLinks } from "@/lib/referrals";
import { courseStatus } from "@/lib/courses";
import { REFERRAL_DAYS } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  try {
    const track = student.track ? getTrack(student.track) : null;
    const onboarded = student.onboarding_step === "done";
    const [access, progress, today, refs, course] = await Promise.all([
      accessKind(student),
      onboarded ? getProgress(student) : Promise.resolve(null),
      onboarded ? getTodaySession(student) : Promise.resolve(null),
      referralCount(student.id),
      onboarded ? courseStatus(student) : Promise.resolve(null),
    ]);
    return NextResponse.json({
      student: {
        firstName: student.first_name,
        email: student.email,
        track: student.track,
        subjects: student.subjects,
        state: student.state,
        school: student.school,
        onboarded,
        premiumUntil: student.premium_until,
        parentEmail: student.parent_email,
        fullName: student.full_name,
        telegramLinked: !!student.telegram_id,
      },
      referral: { ...refLinks(student), ...refs, days: REFERRAL_DAYS },
      course,
      premium: access !== "free",
      access,
      trialDaysLeft: access === "trial" ? trialDaysLeft(student) : 0,
      dailyQuestions: access !== "free" ? PREMIUM_DAILY_QUESTIONS : FREE_DAILY_QUESTIONS,
      progress,
      today: today ? { position: today.position, total: today.question_ids.length, correct: today.correct, finished: !!today.finished_at } : null,
      track: track && {
        code: track.code, name: track.name, short: track.short, emoji: track.emoji, subjectMode: track.subjectMode,
        mock: track.mock, weeklyMock: track.weeklyMock, kind: track.kind, hasCourse: !!track.course, mockVariants: variantsFor(track, student.subjects),
      },
      plans: (track?.plans ?? []).map((c) => ({ code: c, label: PLANS[c].label, price: money(PLANS[c].amount, PLANS[c].currency) })),
      // for onboarding
      tracks: TRACK_LIST.map((t) => ({
        code: t.code, name: t.name, emoji: t.emoji, tagline: t.tagline, subjectMode: t.subjectMode,
        subjects: t.subjects.map((code) => ({ code, name: subjectName(code) })), compulsory: t.compulsory,
        minSubjects: t.minSubjects, maxSubjects: t.maxSubjects, subjectNote: t.subjectNote, askState: t.askState, askSchool: t.askSchool,
        regions: regionsFor(t), regionLabel: t.regionLabel ?? "State", schoolLabel: t.schoolLabel ?? "School (optional)",
      })),
    });
  } catch (e) {
    return errorResponse(e);
  }
}
