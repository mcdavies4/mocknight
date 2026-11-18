import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Listen } from "@/components/listen";
import { db } from "@/lib/supabase";

export const metadata: Metadata = { title: "Listening question | Mock Night", robots: { index: false } };
export const revalidate = 86400;

/** Opened from the Telegram bot: plays a listening question in the phone's own voice. */
export default async function ListenPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^[0-9a-f-]{36}$/i.test(id)) notFound();
  const { data } = await db().from("questions").select("audio_text, audio_lang").eq("id", id).maybeSingle();
  if (!data?.audio_text || !data.audio_lang) notFound();
  return (
    <main className="wrap" style={{ maxWidth: 520, paddingTop: 24 }}>
      <h1 style={{ fontSize: 22 }}>🎧 Listen</h1>
      <p className="muted small">Listen as many times as you like, then close this and answer in the chat.</p>
      <div className="card">
        <Listen text={data.audio_text} lang={data.audio_lang} autoPlay />
      </div>
    </main>
  );
}
