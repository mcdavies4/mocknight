"use client";

import { useEffect, useState } from "react";

const LANG_NAME: Record<string, string> = { zh: "Chinese", ja: "Japanese", ko: "Korean", ru: "Russian" };

/**
 * Listening questions: the device speaks the text in the target language (Web Speech API).
 * No audio files to host. If the device has no voice for the language, the learner can show the words.
 */
export function Listen({ text, lang, revealed = false, autoPlay = false }: { text: string; lang: string; revealed?: boolean; autoPlay?: boolean }) {
  const [status, setStatus] = useState<"loading" | "ready" | "novoice" | "unsupported">("loading");
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [playing, setPlaying] = useState(false);
  const [plays, setPlays] = useState(0);
  const [show, setShow] = useState(false);
  const base = lang.split("-")[0].toLowerCase();
  const name = LANG_NAME[base] ?? "this language";

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setStatus("unsupported");
      return;
    }
    const synth = window.speechSynthesis;
    const norm = (l: string) => l.replace("_", "-").toLowerCase();
    const choose = () => {
      const voices = synth.getVoices();
      if (!voices.length) return false;
      const v = voices.find((x) => norm(x.lang) === lang.toLowerCase()) ?? voices.find((x) => norm(x.lang).startsWith(base));
      setVoice(v ?? null);
      setStatus(v ? "ready" : "novoice");
      return true;
    };
    if (!choose()) synth.addEventListener?.("voiceschanged", choose);
    // Some browsers never fire voiceschanged; still let people try with the language tag alone.
    const t = setTimeout(() => setStatus((s) => (s === "loading" ? "novoice" : s)), 2500);
    return () => {
      clearTimeout(t);
      synth.removeEventListener?.("voiceschanged", choose);
      synth.cancel();
    };
  }, [lang, base]);

  function play(rate: number) {
    try {
      const synth = window.speechSynthesis;
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang;
      if (voice) u.voice = voice;
      u.rate = rate;
      u.onend = () => setPlaying(false);
      u.onerror = () => setPlaying(false);
      setPlaying(true);
      setPlays((n) => n + 1);
      synth.speak(u);
    } catch {
      setStatus("unsupported");
    }
  }

  useEffect(() => {
    if (autoPlay && status === "ready" && plays === 0) play(0.9);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, status]);

  const canPlay = status === "ready" || status === "novoice";
  const words = revealed || show;

  return (
    <div className="listen" lang={lang}>
      <div className="listen-row">
        <button type="button" className="btn listen-play" onClick={() => play(0.9)} disabled={!canPlay}>
          {playing ? "🔊 Playing…" : plays ? "🔁 Play again" : "▶️ Listen"}
        </button>
        <button type="button" className="btn secondary listen-slow" onClick={() => play(0.6)} disabled={!canPlay}>
          🐢 Slower
        </button>
        {!words && (
          <button type="button" className="link-btn small" onClick={() => setShow(true)}>
            Show the words
          </button>
        )}
      </div>
      {status === "novoice" && !words && (
        <p className="muted small" style={{ margin: "6px 0 0" }}>
          If you hear nothing, your device has no {name} voice. Add one in your phone&apos;s text-to-speech settings, or tap &quot;Show the words&quot;.
        </p>
      )}
      {status === "unsupported" && !words && (
        <p className="muted small" style={{ margin: "6px 0 0" }}>
          This browser can&apos;t play audio. Tap &quot;Show the words&quot; to read it instead.
        </p>
      )}
      {words && <p className="listen-text">{text}</p>}
    </div>
  );
}
