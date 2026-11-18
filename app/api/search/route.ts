import { searchExams } from "@/lib/search";

// Typeahead suggestions for the search box (exams only; the /search page does the full search).
export function GET(req: Request) {
  const q = (new URL(req.url).searchParams.get("q") ?? "").slice(0, 80);
  const hits = searchExams(q, 6).map((h) => ({ code: h.track.code, name: h.track.name, short: h.track.short, emoji: h.track.emoji, path: h.path }));
  return Response.json({ hits }, { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } });
}
