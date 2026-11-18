import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { isFounder } from "@/lib/students";
import { db } from "@/lib/supabase";
import { getTrack } from "@/lib/tracks";

export const dynamic = "force-dynamic";

// Founder-only list of learners (name, email, Telegram, exam, activity) for /admin.
export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  if (!isFounder(student)) return NextResponse.json({ error: "FORBIDDEN" }, { status: 403 });
  try {
    const { data, error } = await db().rpc("admin_users", { p_limit: 2000 });
    if (error) throw error;
    const label = (code: string | null) => {
      if (!code) return null;
      try { const t = getTrack(code); return `${t.emoji} ${t.short}`; } catch { return code; }
    };
    const users = (data ?? []).map((u: Record<string, unknown>) => ({ ...u, track_label: label(u.track as string | null) }));
    return NextResponse.json({ users });
  } catch (e) {
    return errorResponse(e);
  }
}
