"use client";
import { useState } from "react";
import { browserDb, browserDbReady } from "@/lib/supabase-browser";

/** One-field sign-up: email → magic link that opens the web app on this exam. */
export function EmailStart({ track, title, text, button = "Send my free access link", compact = false }: {
  track?: string; title?: string; text?: string; button?: string; compact?: boolean;
}) {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "sent">("idle");
  const [err, setErr] = useState("");
  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    if (!browserDbReady()) { window.location.href = `/app${track ? `?track=${track}` : ""}`; return; }
    setState("busy");
    const redirect = `${window.location.origin}/app${track ? `?track=${track}` : ""}`;
    const { error } = await browserDb().auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: redirect } });
    if (error) { setErr(error.message); setState("idle"); } else setState("sent");
  };
  return (
    <div className={compact ? "" : "card email-start"}>
      {title ? <b>{title}</b> : null}
      {text ? <p className="muted small" style={{ margin: "4px 0 10px" }}>{text}</p> : null}
      {state === "sent" ? (
        <p style={{ margin: 0 }}>📬 Check your email — we sent a link to <b>{email}</b>. Open it on this device to start. (Check spam if it&apos;s not there in a minute.)</p>
      ) : (
        <form onSubmit={send} className="email-start-row">
          <input className="input" type="email" required placeholder="you@example.com" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Your email" />
          <button className="btn" disabled={state === "busy"}>{state === "busy" ? "Sending…" : button}</button>
        </form>
      )}
      {err ? <p className="small" style={{ color: "var(--bad)", marginBottom: 0 }}>{err}</p> : null}
      {state !== "sent" ? <p className="muted small" style={{ margin: "8px 0 0" }}>Free for 14 days, no card needed. No password — we email you a sign-in link.</p> : null}
    </div>
  );
}
