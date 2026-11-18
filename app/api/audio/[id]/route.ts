import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";
import { synthesize, ttsConfigured, type AudioFormat } from "@/lib/tts";

export const runtime = "nodejs";

const TYPES: Record<AudioFormat, string> = { mp3: "audio/mpeg", ogg: "audio/ogg" };
const CACHE = "public, max-age=31536000, immutable";

/**
 * Recorded audio for a listening question. Made with Google Text-to-Speech the first time it's asked for,
 * stored in the public "audio" bucket, then served from cache. ?fmt=ogg gives OGG/Opus for Telegram voice notes.
 */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) return NextResponse.json({ error: "bad id" }, { status: 400 });
  const fmt: AudioFormat = new URL(req.url).searchParams.get("fmt") === "ogg" ? "ogg" : "mp3";
  const path = `${id}.${fmt}`;
  const bucket = db().storage.from("audio");

  const stored = await bucket.download(path);
  if (stored.data) return new Response(stored.data, { headers: { "Content-Type": TYPES[fmt], "Cache-Control": CACHE } });

  if (!ttsConfigured()) return NextResponse.json({ error: "audio not available" }, { status: 503 });
  const { data: q } = await db().from("questions").select("audio_text, audio_lang").eq("id", id).maybeSingle();
  if (!q?.audio_text || !q.audio_lang) return NextResponse.json({ error: "not found" }, { status: 404 });

  try {
    const bytes = await synthesize(q.audio_text, q.audio_lang, fmt);
    await bucket.upload(path, bytes, { contentType: TYPES[fmt], upsert: true });
    return new Response(new Uint8Array(bytes), { headers: { "Content-Type": TYPES[fmt], "Cache-Control": CACHE } });
  } catch (e) {
    console.error("tts failed", e);
    return NextResponse.json({ error: "audio not available" }, { status: 503 });
  }
}
