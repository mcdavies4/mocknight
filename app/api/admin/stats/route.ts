import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { isFounder } from "@/lib/students";
import { adminStats } from "@/lib/admin";
import { db } from "@/lib/supabase";
import { getTrack } from "@/lib/tracks";
import { subjectName } from "@/lib/subjects";

export const dynamic = "force-dynamic";

// Founder-only numbers for the /admin dashboard (FOUNDER_TELEGRAM_IDS / FOUNDER_EMAILS).
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  if (!isFounder(student)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  try {
    const days = Math.min(180, Math.max(7, Number(body.days) || 30));
    const [stats, series] = await Promise.all([adminStats(), db().rpc("admin_timeseries", { p_days: days })]);
    if (series.error) throw series.error;
    const label = (code: string) => { try { const t = getTrack(code); return `${t.emoji} ${t.short}`; } catch { return code; } };
    return NextResponse.json({
      stats: { ...stats, tracks: stats.tracks.map((t) => ({ ...t, label: label(t.track) })) },
      series: {
        ...series.data,
        top_subjects_7d: (series.data.top_subjects_7d ?? []).map((s: { subject: string }) => ({ ...s, name: subjectName(s.subject) })),
      },
      generatedAt: new Date().toISOString(),
    });
  } catch (e) {
    return errorResponse(e);
  }
}
