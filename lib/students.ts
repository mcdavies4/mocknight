import { db, must } from "./supabase";
import type { Student } from "./types";
import { TRIAL_DAYS } from "./pricing";

const list = (v: string | undefined) => (v ?? "").split(",").map((x) => x.trim().toLowerCase()).filter(Boolean);

/** Founder / staff accounts with permanent unlimited access (FOUNDER_TELEGRAM_IDS, FOUNDER_EMAILS env vars). */
export function isFounder(s: Student): boolean {
  const ids = list(process.env.FOUNDER_TELEGRAM_IDS);
  const emails = list(process.env.FOUNDER_EMAILS);
  return (!!s.telegram_id && ids.includes(String(s.telegram_id))) || (!!s.email && emails.includes(s.email.toLowerCase()));
}

/** End of the free full-access trial for this account, or null if trials are off. */
export function trialEndsAt(s: Student): Date | null {
  if (!TRIAL_DAYS || !s.created_at) return null;
  return new Date(new Date(s.created_at).getTime() + TRIAL_DAYS * 86400_000);
}

export function inTrial(s: Student): boolean {
  const end = trialEndsAt(s);
  return !!end && end > new Date();
}

export function trialDaysLeft(s: Student): number {
  const end = trialEndsAt(s);
  return end ? Math.max(0, Math.ceil((end.getTime() - Date.now()) / 86400_000)) : 0;
}

export type AccessKind = "founder" | "paid" | "seat" | "trial" | "free";

/** Why this learner has (or hasn't) full access. */
export async function accessKind(student: Student): Promise<AccessKind> {
  if (isFounder(student)) return "founder";
  if (student.premium_until && new Date(student.premium_until) > new Date()) return "paid";
  if (await hasSeat(student)) return "seat";
  if (inTrial(student)) return "trial";
  return "free";
}

/** Full access paid for (or founder) — excludes the free trial. Used for certificates. */
export async function hasPaidAccess(student: Student): Promise<boolean> {
  const k = await accessKind(student);
  return k === "founder" || k === "paid" || k === "seat";
}

export async function upsertStudent(tg: { id: number; first_name?: string; username?: string }): Promise<Student> {
  const existing = await getStudentByTelegram(tg.id);
  if (existing) {
    if (existing.first_name !== (tg.first_name ?? null) || existing.username !== (tg.username ?? null) || existing.blocked) {
      const updated = must(
        await db()
          .from("students")
          .update({ first_name: tg.first_name ?? null, username: tg.username ?? null, blocked: false })
          .eq("id", existing.id)
          .select()
          .single(),
        "update student",
      );
      return updated as Student;
    }
    return existing;
  }
  return must(
    await db()
      .from("students")
      .insert({ telegram_id: tg.id, first_name: tg.first_name ?? null, username: tg.username ?? null })
      .select()
      .single(),
    "insert student",
  ) as Student;
}

export async function getStudentByTelegram(telegramId: number): Promise<Student | null> {
  const { data, error } = await db().from("students").select("*").eq("telegram_id", telegramId).maybeSingle();
  if (error) throw new Error(error.message);
  return data as Student | null;
}

export async function getStudent(id: string): Promise<Student | null> {
  const { data, error } = await db().from("students").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as Student | null;
}

export async function updateStudent(id: string, patch: Partial<Student>): Promise<Student> {
  return must(await db().from("students").update(patch).eq("id", id).select().single(), "update student") as Student;
}

/** Premium if the student paid, or holds a seat in a tutor group with an active subscription. */
export async function isPremium(student: Student): Promise<boolean> {
  return (await accessKind(student)) !== "free";
}

async function hasSeat(student: Student): Promise<boolean> {
  const { data, error } = await db()
    .from("group_members")
    .select("has_seat, tutor_groups!inner(paid_until)")
    .eq("student_id", student.id)
    .eq("has_seat", true);
  if (error) throw new Error(error.message);
  const now = new Date();
  return (data ?? []).some((row: any) => {
    const g = Array.isArray(row.tutor_groups) ? row.tutor_groups[0] : row.tutor_groups;
    return g?.paid_until && new Date(g.paid_until) > now;
  });
}
