"use client";

import { useEffect, useRef, useState } from "react";

const LANG_NAME: Record<string, string> = { zh: "Chinese", ja: "Japanese", ko: "Korean", ru: "Russian", de: "German" };

/**
 * Listening questions. Plays recorded audio (Google Text-to-Speech, /api/audio/[id]) when there's a question id.
 * If that fails, or there's no id, the device's own voice reads the text (Web Speech API).
 * "Show the words" is always there as a last resort.
 */
export function Listen({ text, lang, id, revealed = false, autoPlay = false }: { text: string; lang: string; id?: string; revealed?: boolean; autoPlay?: boolean }) {
  const [mode, setMode] = useState<"recorded" | "device" | "none">(id ? "recorded" : "device");
  const [voice, setVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [voiceStatus, setVoiceStatus] = useState<"loading" | "ready" | "novoice" | "unsupported">("loading");
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [plays, setPlays] = useState(0);
  const [show, setShow] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const base = lang.split("-")[0].toLowerCase();
  const name = LANG_NAME[base] ?? "this language";

  // Device voices (fallback)
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window) || typeof SpeechSynthesisUtterance === "undefined") {
      setVoiceStatus("unsupported");
      return;
    }
    const synth = window.speechSynthesis;
    const norm = (l: string) => l.replace("_", "-").toLowerCase();
    const choose = () => {
      const voices = synth.getVoices();
      if (!voices.length) return false;
      const v = voices.find((x) => norm(x.lang) === lang.toLowerCase()) ?? voices.find((x) => norm(x.lang).startsWith(base));
      setVoice(v ?? null);
      setVoiceStatus(v ? "ready" : "novoice");
      return true;
    };
    if (!choose()) synth.addEventListener?.("voiceschanged", choose);
    const t = setTimeout(() => setVoiceStatus((s) => (s === "loading" ? "novoice" : s)), 2500);
    return () => {
      clearTimeout(t);
      synth.removeEventListener?.("voiceschanged", choose);
      synth.cancel();
    };
  }, [lang, base]);

  useEffect(() => () => audioRef.current?.pause(), []);

  function speakDevice(rate: number) {
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
      synth.speak(u);
    } catch {
      setMode("none");
    }
  }

  function play(slow: boolean) {
    setPlays((n) => n + 1);
    if (mode === "recorded" && id) {
      let a = audioRef.current;
      if (!a) {
        a = new Audio(`/api/audio/${id}`);
        a.preload = "auto";
        a.onplaying = () => {
          setLoading(false);
          setPlaying(true);
        };
        a.onended = () => setPlaying(false);
        a.onpause = () => setPlaying(false);
        a.onerror = () => {
          // Recorded audio unavailable: use the device's voice instead.
          setLoading(false);
          setPlaying(false);
          setMode("device");
          speakDevice(slow ? 0.6 : 0.9);
        };
        audioRef.current = a;
      }
      a.playbackRate = slow ? 0.7 : 1;
      a.currentTime = 0;
      setLoading(true);
      a.play().catch(() => setLoading(false));
      return;
    }
    if (mode === "device") speakDevice(slow ? 0.6 : 0.9);
  }

  useEffect(() => {
    if (!autoPlay || plays > 0) return;
    if (mode === "recorded") play(false);
    else if (mode === "device" && voiceStatus === "ready") play(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoPlay, voiceStatus]);

  const canPlay = mode === "recorded" || (mode === "device" && voiceStatus !== "unsupported");
  const words = revealed || show;

  return (
    <div className="listen" lang={lang}>
      <div className="listen-row">
        <button type="button" className="btn listen-play" onClick={() => play(false)} disabled={!canPlay}>
          {loading ? "⏳ Loading…" : playing ? "🔊 Playing…" : plays ? "🔁 Play again" : "▶️ Listen"}
        </button>
        <button type="button" className="btn secondary listen-slow" onClick={() => play(true)} disabled={!canPlay}>
          🐢 Slower
        </button>
        {!words && (
          <button type="button" className="link-btn small" onClick={() => setShow(true)}>
            Show the words
          </button>
        )}
      </div>
      {mode === "device" && voiceStatus === "novoice" && !words && (
        <p className="muted small" style={{ margin: "6px 0 0" }}>
          If you hear nothing, your device has no {name} voice. Add one in your phone&apos;s text-to-speech settings, or tap &quot;Show the words&quot;.
        </p>
      )}
      {(mode === "none" || (mode === "device" && voiceStatus === "unsupported")) && !words && (
        <p className="muted small" style={{ margin: "6px 0 0" }}>
          Audio can&apos;t play here. Tap &quot;Show the words&quot; to read it instead.
        </p>
      )}
      {words && <p className="listen-text">{text}</p>}
    </div>
  );
}
