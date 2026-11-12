import { randomInt } from "node:crypto";
import fire from "@/data/courses/FIRE.json";
import { db, must } from "./supabase";
import { getTrack } from "./tracks";
import { notifyTelegram, sendEmail } from "./notify";
import { hasPaidAccess, isPremium } from "./students";
import { TRIAL_INCLUDES_CERTIFICATES } from "./pricing";
import { env } from "./env";
import type { Student } from "./types";

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  body: string[];
  keyPoints: string[];
}

const COURSES: Record<string, Lesson[]> = { FIRE: fire as Lesson[] };

export function getLessons(trackCode: string | null | undefined): Lesson[] {
  return COURSES[trackCode ?? ""] ?? [];
}

export interface Certificate {
  id: string;
  cert_no: string;
  student_id: string;
  track: string;
  full_name: string;
  score_pct: number;
  issued_at: string;
  expires_at: string;
}

export interface CourseStatus {
  lessons: { id: string; title: string; minutes: number; done: boolean }[];
  done: number;
  total: number;
  bestPass: { score: number; at: string } | null;
  certificate: (Certificate & { valid: boolean; url: string }) | null;
  eligible: boolean;
}

export async function courseStatus(student: Student): Promise<CourseStatus | null> {
  const track = getTrack(student.track);
  if (!track.course) return null;
  const lessons = getLessons(track.code);
  const [{ data: progress }, best, { data: cert }] = await Promise.all([
    db().from("lesson_progress").select("lesson_id").eq("student_id", student.id).eq("track", track.code),
    bestPass(student),
    db().from("certificates").select("*").eq("student_id", student.id).eq("track", track.code).order("issued_at", { ascending: false }).limit(1).maybeSingle(),
  ]);
  const doneIds = new Set((progress ?? []).map((p) => p.lesson_id));
  const list = lessons.map((l) => ({ id: l.id, title: l.title, minutes: l.minutes, done: doneIds.has(l.id) }));
  const done = list.filter((l) => l.done).length;
  const c = cert as Certificate | null;
  return {
    lessons: list,
    done,
    total: lessons.length,
    bestPass: best,
    certificate: c ? { ...c, valid: new Date(c.expires_at) > new Date(), url: `${env.appUrl}/api/cert/${c.cert_no}` } : null,
    eligible: done === lessons.length && !!best,
  };
}

/** Best passing final-assessment score in the last 12 months. */
async function bestPass(student: Student): Promise<{ score: number; at: string } | null> {
  const track = getTrack(student.track);
  const since = new Date(Date.now() - 365 * 86400_000).toISOString();
  const { data } = await db()
    .from("mock_attempts")
    .select("raw_score, total, scaled_score, submitted_at, mocks!inner(kind, track)")
    .eq("student_id", student.id)
    .eq("mocks.kind", "practice")
    .eq("mocks.track", track.code)
    .not("submitted_at", "is", null)
    .gte("submitted_at", since)
    .order("scaled_score", { ascending: false })
    .limit(20);
  const pass = (data ?? []).find((a: any) => a.raw_score >= Math.ceil((a.total * (track.mock.passPct ?? 80)) / 100));
  return pass ? { score: Math.round(Number(pass.scaled_score)), at: pass.submitted_at } : null;
}

export async function completeLesson(student: Student, lessonId: string) {
  const track = getTrack(student.track);
  if (!getLessons(track.code).some((l) => l.id === lessonId)) return false;
  await db().from("lesson_progress").upsert({ student_id: student.id, track: track.code, lesson_id: lessonId }, { onConflict: "student_id,track,lesson_id" });
  return true;
}

export async function nextLesson(student: Student): Promise<Lesson | null> {
  const status = await courseStatus(student);
  if (!status) return null;
  const next = status.lessons.find((l) => !l.done);
  return next ? getLessons(student.track).find((l) => l.id === next.id)! : null;
}

const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export type IssueResult = { ok: true; certificate: Certificate } | { ok: false; error: "NOT_COURSE" | "NOT_ELIGIBLE" | "BAD_NAME" | "NOT_PAID" };

/** Issue (or re-issue after expiry) a certificate. Returns the existing valid one if there is one. */
export async function issueCertificate(student: Student, fullNameRaw: string | null | undefined): Promise<IssueResult> {
  const track = getTrack(student.track);
  if (!track.course) return { ok: false, error: "NOT_COURSE" };
  const status = await courseStatus(student);
  if (status?.certificate?.valid) return { ok: true, certificate: status.certificate };
  if (!status?.eligible || !status.bestPass) return { ok: false, error: "NOT_ELIGIBLE" };
  // Certificates need the paid course (individual plan or an employer seat)
  const allowed = TRIAL_INCLUDES_CERTIFICATES ? await isPremium(student) : await hasPaidAccess(student);
  if (track.plans.length && !allowed) return { ok: false, error: "NOT_PAID" };

  const fullName = (fullNameRaw ?? student.full_name ?? "").replace(/\s+/g, " ").trim().slice(0, 80);
  if (fullName.length < 3 || !/\s/.test(fullName)) return { ok: false, error: "BAD_NAME" };
  if (fullName !== student.full_name) await db().from("students").update({ full_name: fullName }).eq("id", student.id);

  const ymd = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const certNo = `MN-${track.code}-${ymd}-${Array.from({ length: 6 }, () => ALPHA[randomInt(ALPHA.length)]).join("")}`;
  const cert = must(
    await db()
      .from("certificates")
      .insert({
        cert_no: certNo,
        student_id: student.id,
        track: track.code,
        full_name: fullName,
        score_pct: status.bestPass.score,
        expires_at: new Date(Date.now() + track.course.certificateDays * 86400_000).toISOString(),
      })
      .select()
      .single(),
    "issue certificate",
  ) as Certificate;
  return { ok: true, certificate: cert };
}

export async function getCertificate(certNo: string): Promise<Certificate | null> {
  if (!/^MN-[A-Z_]+-\d{8}-[A-Z0-9]{6}$/.test(certNo)) return null;
  const { data } = await db().from("certificates").select("*").eq("cert_no", certNo).maybeSingle();
  return data as Certificate | null;
}

/** Remind learners 30 days before a certificate expires. Runs once a day from the cron. */
export async function sendCertificateReminders() {
  const soon = new Date(Date.now() + 30 * 86400_000).toISOString();
  const rows = must(
    await db()
      .from("certificates")
      .select("id, cert_no, track, expires_at, students(telegram_id, email, first_name)")
      .eq("reminder_sent", false)
      .lte("expires_at", soon)
      .gt("expires_at", new Date().toISOString())
      .limit(200),
    "cert reminders",
  ) as any[];
  for (const c of rows) {
    await db().from("certificates").update({ reminder_sent: true }).eq("id", c.id);
    const st = Array.isArray(c.students) ? c.students[0] : c.students;
    const t = getTrack(c.track);
    const when = new Date(c.expires_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
    const text = `⏰ Your ${t.course?.certificateTitle ?? t.name} certificate expires on ${when}. Do a quick refresher and retake the final assessment to renew it.`;
    await notifyTelegram(st?.telegram_id, text);
    if (st?.email) {
      await sendEmail(
        st.email,
        `Your ${t.short} certificate expires on ${when}`,
        `<p>Hi ${st.first_name ?? "there"},</p><p>${text}</p><p><a href="${env.appUrl}/app">Open Mock Night</a></p>`,
      );
    }
  }
  return rows.length;
}
