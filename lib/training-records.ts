import { db } from "./supabase";

export interface TrainingRecord {
  student_id: string;
  modules: number;
  cert_no: string | null;
  issued_at: string | null;
  expires_at: string | null;
  status: "valid" | "expiring" | "expired" | "none";
}

/** Course progress + latest certificate for each member (used by the company dashboard and CSV export). */
export async function trainingRecords(studentIds: string[]): Promise<Map<string, TrainingRecord>> {
  const out = new Map<string, TrainingRecord>();
  if (!studentIds.length) return out;
  const [{ data: lp }, { data: certs }] = await Promise.all([
    db().from("lesson_progress").select("student_id").in("student_id", studentIds),
    db().from("certificates").select("student_id, cert_no, issued_at, expires_at").in("student_id", studentIds).order("issued_at", { ascending: false }),
  ]);
  for (const id of studentIds) out.set(id, { student_id: id, modules: 0, cert_no: null, issued_at: null, expires_at: null, status: "none" });
  for (const r of lp ?? []) out.get(r.student_id)!.modules++;
  const soon = Date.now() + 30 * 86400_000;
  for (const c of certs ?? []) {
    const rec = out.get(c.student_id)!;
    if (rec.cert_no) continue; // keep latest
    rec.cert_no = c.cert_no;
    rec.issued_at = c.issued_at;
    rec.expires_at = c.expires_at;
    const exp = new Date(c.expires_at).getTime();
    rec.status = exp < Date.now() ? "expired" : exp < soon ? "expiring" : "valid";
  }
  return out;
}
