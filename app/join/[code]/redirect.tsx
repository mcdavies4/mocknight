"use client";
import { useEffect } from "react";

/** Remember who invited this visitor, then offer web or Telegram. */
export default function JoinRedirect({ code, bot }: { code: string; bot: string }) {
  useEffect(() => {
    try {
      localStorage.setItem("mn_ref", code);
    } catch {}
  }, [code]);
  return (
    <main className="wrap" style={{ maxWidth: 480, paddingTop: 48 }}>
      <h1 style={{ marginBottom: 6 }}>You&apos;re invited 🎁</h1>
      <p className="muted">Join Mock Night and finish your first practice — you and your friend both get free Premium days.</p>
      <a className="btn block" href={`/app?ref=${code}`}>Continue on the web</a>
      {bot && (
        <a className="btn secondary block" style={{ marginTop: 10 }} href={`https://t.me/${bot}?start=r_${code}`}>
          Continue on Telegram
        </a>
      )}
    </main>
  );
}
