import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { isFounder } from "@/lib/students";
import { db } from "@/lib/supabase";
import { tgApi, sendEmail } from "@/lib/notify";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type Audience = "user" | "all" | "telegram" | "email";
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);
const site = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mocknight.online";

// Founder-only: message one learner, or everyone, by Telegram (bot) and/or email.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  if (!isFounder(student)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  const text = String(body.text ?? "").trim();
  const subject = String(body.subject ?? "").trim() || "A message from Mock Night";
  const audience = (body.audience ?? "user") as Audience;
  const dryRun = !!body.dryRun;
  if (!text && !dryRun) return NextResponse.json({ error: "Write a message first" }, { status: 400 });
  if (text.length > 3500) return NextResponse.json({ error: "Keep it under 3,500 characters" }, { status: 400 });
  try {
    let q = db().from("students").select("id, full_name, first_name, email, telegram_id");
    if (audience === "user") q = q.eq("id", String(body.userId ?? ""));
    const { data, error } = await q.limit(5000);
    if (error) throw error;
    const rows = (data ?? []) as { id: string; full_name: string | null; first_name: string | null; email: string | null; telegram_id: number | null }[];
    const viaTg = audience !== "email";
    const viaEmail = audience !== "telegram";
    // One channel per person: Telegram if they have it (and it's allowed), otherwise email.
    const plan = rows.map((r) => ({ r, ch: viaTg && r.telegram_id ? "tg" : viaEmail && r.email ? "email" : null })).filter((p) => p.ch);
    if (dryRun) return NextResponse.json({ telegram: plan.filter((p) => p.ch === "tg").length, email: plan.filter((p) => p.ch === "email").length });
    let tg = 0, mail = 0, failed = 0;
    for (const { r, ch } of plan) {
      const hi = (r.first_name || r.full_name || "").trim().split(" ")[0];
      const personal = text.replace(/\{name\}/g, hi || "there");
      try {
        if (ch === "tg") {
          await tgApi().sendMessage(r.telegram_id!, personal, { link_preview_options: { is_disabled: true } });
          tg++;
          await new Promise((res) => setTimeout(res, 40)); // stay under Telegram's rate limit
        } else {
          const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0B2F22">${esc(personal).replace(/\n/g, "<br>")}<p style="margin-top:24px"><a href="${site}/app" style="background:#0B2F22;color:#fff;padding:10px 16px;border-radius:8px;text-decoration:none">Open Mock Night</a></p><p style="color:#888;font-size:12px;margin-top:24px">You're getting this because you signed up to Mock Night. Reply to this email if you'd rather not hear from us.</p></div>`;
          if (await sendEmail(r.email!, subject, html)) mail++; else failed++;
        }
      } catch (e) {
        console.error("admin message failed", r.id, e);
        failed++;
      }
    }
    return NextResponse.json({ telegram: tg, email: mail, failed });
  } catch (e) {
    return errorResponse(e);
  }
}
