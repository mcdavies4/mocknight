import { db, must } from "./supabase";
import type { Student } from "./types";

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
  if (student.premium_until && new Date(student.premium_until) > new Date()) return true;
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
