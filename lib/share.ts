import { db } from "./supabase";
import { getTrack, mockConfig } from "./tracks";
import { env } from "./env";

export interface ShareData {
  attemptId: string;
  firstName: string;
  trackName: string;
  trackEmoji: string;
  headline: string; // "312/400", "PASSED", "78%"
  sub: string; // "21/24 correct · 18 needed"
  kindLabel: string; // "Mock Night", "Practice test"
  rank: string | null; // "#4 of 312 in Nigeria · #1 in Lagos"
  refCode: string | null;
  passed: boolean | null;
}

/** Everything needed to render a shareable result card. Only first names are shown. */
export async function getShareData(attemptId: string): Promise<ShareData | null> {
  if (!/^[0-9a-f-]{36}$/.test(attemptId)) return null;
  const { data: a } = await db()
    .from("mock_attempts")
    .select("id, mock_id, student_id, raw_score, total, scaled_score, submitted_at, mocks(kind, track, variant, title, results_posted), students(first_name, track, ref_code)")
    .eq("id", attemptId)
    .maybeSingle();
  if (!a || !a.submitted_at) return null;
  const mock = (Array.isArray(a.mocks) ? a.mocks[0] : a.mocks) as { kind: string; track: string | null; variant: string | null; title: string; results_posted: boolean };
  const st = (Array.isArray(a.students) ? a.students[0] : a.students) as { first_name: string | null; track: string | null; ref_code: string | null };
  const track = getTrack(mock.kind === "weekly" ? st.track : mock.track ?? st.track);
  const scaled = Number(a.scaled_score ?? 0);

  let headline = `${Math.round(scaled)}%`;
  let sub = `${a.raw_score}/${a.total} correct`;
  let passed: boolean | null = null;
  const cfg = mockConfig(track, mock.variant);
  if (cfg.passPct) {
    const needed = Math.ceil(((a.total ?? 0) * cfg.passPct) / 100);
    passed = (a.raw_score ?? 0) >= needed;
    headline = passed ? "PASSED" : `${a.raw_score}/${a.total}`;
    sub = `${a.raw_score}/${a.total} correct · ${needed} needed to pass`;
  } else if (track.mock.scoreStyle === "jamb400") {
    headline = `${Math.round((scaled / 100) * 400)}/400`;
    sub = `${a.raw_score}/${a.total} correct · ${Math.round(scaled)}%`;
  }

  let rank: string | null = null;
  if (mock.kind === "weekly" && mock.results_posted) {
    const { data: ranks } = await db().rpc("mock_ranks", { p_mock: a.mock_id });
    const me = (ranks as any[] | null)?.find((r) => r.student_id === a.student_id);
    if (me) rank = `#${me.rank} of ${me.total} overall${me.state ? ` · #${me.state_rank} in ${me.state}` : ""}`;
  }

  return {
    attemptId,
    firstName: st.first_name ?? "A student",
    trackName: track.name,
    trackEmoji: track.emoji,
    headline,
    sub,
    kindLabel: mock.kind === "weekly" ? mock.title : cfg.label ?? (track.subjectMode === "single" ? "Practice test" : "Practice CBT"),
    rank,
    refCode: st.ref_code,
    passed,
  };
}

export const shareUrl = (attemptId: string) => `${env.appUrl}/r/${attemptId}`;
