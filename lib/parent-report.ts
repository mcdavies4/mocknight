import { db, must } from "./supabase";
import { sendEmail } from "./notify";
import { getProgress } from "./progress";
import { getTrack } from "./tracks";
import { subjectName } from "./subjects";
import { env } from "./env";
import type { Student } from "./types";

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Sunday-evening progress email to parents/guardians who were added with /parent or in web settings. */
export async function sendParentReports(today: string) {
  if (!process.env.RESEND_API_KEY) return 0;
  const students = must(
    await db()
      .from("students")
      .select("*")
      .not("parent_email", "is", null)
      .eq("onboarding_step", "done")
      .or(`parent_report_sent.is.null,parent_report_sent.lt.${today}`)
      .limit(300),
    "parent report students",
  ) as Student[];

  let sent = 0;
  for (const s of students) {
    await db().from("students").update({ parent_report_sent: today }).eq("id", s.id);
    const p = await getProgress(s);
    const { count: drills } = await db()
      .from("drill_sessions")
      .select("*", { count: "exact", head: true })
      .eq("student_id", s.id)
      .gte("finished_at", new Date(Date.now() - 7 * 86400_000).toISOString());
    const answered = p.last7.reduce((a, b) => a + b.total, 0);
    const correct = p.last7.reduce((a, b) => a + b.correct, 0);
    const weakest = [...p.last7].filter((x) => x.total >= 3).sort((a, b) => a.correct / a.total - b.correct / b.total)[0];
    const t = getTrack(s.track);
    const name = esc(s.first_name ?? "Your child");

    const row = (label: string, value: string) =>
      `<tr><td style="padding:8px 0;color:#667085;font-size:14px;">${label}</td><td style="padding:8px 0;text-align:right;font-weight:600;font-size:14px;color:#101828;">${value}</td></tr>`;
    const verdict =
      (drills ?? 0) >= 5 ? `${name} practised consistently this week. 👏` : (drills ?? 0) >= 2 ? `${name} practised on some days this week — encourage a daily habit.` : `${name} hardly practised this week. A gentle nudge could help.`;

    const html = `<div style="background:#f2f4f7;padding:24px 0;font-family:-apple-system,Segoe UI,Roboto,Arial,sans-serif;">
<table role="presentation" width="100%"><tr><td align="center">
<table role="presentation" width="100%" style="max-width:480px;background:#fff;border-radius:14px;padding:28px;">
<tr><td>
<p style="margin:0;color:#667085;font-size:13px;">Mock Night · Weekly report</p>
<h1 style="margin:6px 0 4px;font-size:22px;color:#101828;">${name}'s week</h1>
<p style="margin:0 0 16px;color:#344054;font-size:15px;">${esc(t.name)}</p>
<p style="margin:0 0 16px;color:#344054;font-size:15px;line-height:1.5;">${verdict}</p>
<table role="presentation" width="100%" style="border-top:1px solid #eaecf0;">
${row("Days practised (last 7)", `${drills ?? 0} / 7`)}
${row("Questions answered", String(answered))}
${row("Accuracy", answered ? `${Math.round((correct / answered) * 100)}%` : "—")}
${row("Current streak", `${p.streak} day${p.streak === 1 ? "" : "s"}`)}
${p.lastMockNight !== null ? row("Last Sunday Mock Night", `${Math.round(p.lastMockNight)}%`) : ""}
${p.practice.lastScores.length ? row("Recent practice tests", p.practice.lastScores.map((x) => `${x}%`).join(", ")) : ""}
${weakest ? row("Needs most work", esc(subjectName(weakest.subject))) : ""}
</table>
<p style="margin:20px 0 0;color:#667085;font-size:13px;line-height:1.5;">You're receiving this because ${name} added your email to Mock Night. To stop these emails, ask ${name} to send /parent off in the app, or reply to this email.</p>
<p style="margin:12px 0 0;color:#98a2b3;font-size:12px;"><a href="${env.appUrl}" style="color:#98a2b3;">${env.appUrl.replace(/^https?:\/\//, "")}</a> · The 36th Solutions Ltd</p>
</td></tr></table></td></tr></table></div>`;

    if (await sendEmail(s.parent_email!, `${s.first_name ?? "Your child"}'s Mock Night week: ${drills ?? 0}/7 days practised`, html)) sent++;
  }
  return sent;
}
