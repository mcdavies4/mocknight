import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";
import { db } from "@/lib/supabase";
import { trainingRecords } from "@/lib/training-records";
import { getLessons } from "@/lib/courses";

export const dynamic = "force-dynamic";

const csv = (v: unknown) => {
  const s = v === null || v === undefined ? "" : String(v);
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};
const d = (iso: string | null) => (iso ? new Date(iso).toISOString().slice(0, 10) : "");

/** Training records CSV for a company group (owner only). */
export async function GET(req: Request) {
  const auth = verifyToken((await cookies()).get("mn_dash")?.value);
  if (!auth) return new Response("Link expired — send /dashboard to the bot for a new one.", { status: 401 });
  const groupId = new URL(req.url).searchParams.get("group") ?? "";
  const { data: group } = await db().from("tutor_groups").select("*").eq("id", groupId).maybeSingle();
  if (!group || group.owner_student_id !== auth.sid) return new Response("Not found", { status: 404 });

  const { data: members } = await db()
    .from("group_members")
    .select("joined_at, students(id, first_name, full_name, username, email)")
    .eq("group_id", group.id);
  const rows = (members ?? []).map((m: any) => ({ joined: m.joined_at, s: Array.isArray(m.students) ? m.students[0] : m.students }));
  const recs = await trainingRecords(rows.map((r) => r.s.id));
  const total = getLessons("FIRE").length;

  const header = ["Name", "Telegram", "Email", "Joined", "Modules completed", "Certificate number", "Issued", "Expires", "Status"];
  const lines = rows.map(({ joined, s }) => {
    const r = recs.get(s.id)!;
    return [s.full_name ?? s.first_name ?? "", s.username ? `@${s.username}` : "", s.email ?? "", d(joined), `${r.modules}/${total}`, r.cert_no ?? "", d(r.issued_at), d(r.expires_at), r.status]
      .map(csv)
      .join(",");
  });
  const body = [header.join(","), ...lines].join("\n");
  const name = `${group.name.replace(/[^A-Za-z0-9]+/g, "-")}-training-records-${new Date().toISOString().slice(0, 10)}.csv`;
  return new Response(body, { headers: { "Content-Type": "text/csv; charset=utf-8", "Content-Disposition": `attachment; filename="${name}"` } });
}
