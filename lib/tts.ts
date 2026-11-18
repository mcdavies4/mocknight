// Google Cloud Text-to-Speech for listening questions. The key lives only in GOOGLE_TTS_API_KEY.

export type AudioFormat = "mp3" | "ogg";

// Natural (WaveNet) voices per language; falls back to the language's default voice if a name is unavailable.
const VOICES: Record<string, { languageCode: string; name: string }> = {
  "zh-CN": { languageCode: "cmn-CN", name: "cmn-CN-Wavenet-A" },
  "ja-JP": { languageCode: "ja-JP", name: "ja-JP-Wavenet-B" },
  "ko-KR": { languageCode: "ko-KR", name: "ko-KR-Wavenet-A" },
  "ru-RU": { languageCode: "ru-RU", name: "ru-RU-Wavenet-A" },
};

export const ttsConfigured = () => !!process.env.GOOGLE_TTS_API_KEY;

export async function synthesize(text: string, lang: string, format: AudioFormat): Promise<Buffer> {
  const key = process.env.GOOGLE_TTS_API_KEY;
  if (!key) throw new Error("GOOGLE_TTS_API_KEY not set");
  const v = VOICES[lang] ?? { languageCode: lang, name: "" };
  const audioConfig = { audioEncoding: format === "ogg" ? "OGG_OPUS" : "MP3", speakingRate: 0.9 };
  const call = async (voice: Record<string, string>) => {
    const res = await fetch(`https://texttospeech.googleapis.com/v1/text:synthesize?key=${encodeURIComponent(key)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input: { text }, voice, audioConfig }),
      cache: "no-store",
    });
    const body = (await res.json().catch(() => ({}))) as { audioContent?: string; error?: { message?: string } };
    if (!res.ok || !body.audioContent) throw new Error(`TTS ${res.status}: ${body.error?.message ?? "no audio"}`);
    return Buffer.from(body.audioContent, "base64");
  };
  try {
    return await call(v.name ? { languageCode: v.languageCode, name: v.name } : { languageCode: v.languageCode });
  } catch (e) {
    if (!v.name) throw e;
    return call({ languageCode: v.languageCode });
  }
}
