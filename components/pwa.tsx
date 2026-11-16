"use client";
// Installable web app: registers the service worker, offers "Install the app" and daily reminder notifications.
import { useEffect, useState } from "react";
import { getAccessToken } from "@/lib/supabase-browser";

type BIP = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
const inTelegram = () => typeof window !== "undefined" && Boolean((window as any).Telegram?.WebApp?.initData);
export const isStandalone = () =>
  typeof window !== "undefined" && (window.matchMedia("(display-mode: standalone)").matches || (navigator as any).standalone === true);
const isIOS = () => typeof navigator !== "undefined" && /iphone|ipad|ipod/i.test(navigator.userAgent);

let deferred: BIP | null = null;

/** Mount once (in the root layout). */
export function PwaRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator) || inTelegram()) return;
    navigator.serviceWorker.register("/sw.js").catch(() => undefined);
    const onPrompt = (e: Event) => { e.preventDefault(); deferred = e as BIP; window.dispatchEvent(new Event("mn-installable")); };
    window.addEventListener("beforeinstallprompt", onPrompt);
    return () => window.removeEventListener("beforeinstallprompt", onPrompt);
  }, []);
  return null;
}

/** "Install the app" button: native prompt on Android/desktop Chrome, instructions on iPhone. Hidden once installed. */
export function InstallButton({ className = "btn secondary block", label = "📲 Install the app" }: { className?: string; label?: string }) {
  const [show, setShow] = useState(false);
  const [iosHelp, setIosHelp] = useState(false);
  useEffect(() => {
    if (inTelegram() || isStandalone()) return;
    setShow(isIOS() || Boolean(deferred));
    const on = () => setShow(true);
    window.addEventListener("mn-installable", on);
    return () => window.removeEventListener("mn-installable", on);
  }, []);
  if (!show) return null;
  const click = async () => {
    if (deferred) { await deferred.prompt(); await deferred.userChoice.catch(() => undefined); deferred = null; setShow(false); return; }
    setIosHelp(true);
  };
  return (
    <>
      <button className={className} onClick={click}>{label}</button>
      {iosHelp && (
        <div className="card" style={{ marginTop: 10 }}>
          <b>Add Mock Night to your home screen</b>
          <ol className="small" style={{ margin: "8px 0 0", paddingLeft: 20, lineHeight: 1.6 }}>
            <li>Open this page in <b>Safari</b>.</li>
            <li>Tap the <b>Share</b> button (the square with an arrow).</li>
            <li>Choose <b>Add to Home Screen</b>, then <b>Add</b>.</li>
          </ol>
          <p className="muted small" style={{ marginBottom: 0 }}>Then open Mock Night from your home screen to turn on daily reminders.</p>
        </div>
      )}
    </>
  );
}

function b64ToBytes(b64: string) {
  const pad = "=".repeat((4 - (b64.length % 4)) % 4);
  const raw = atob((b64 + pad).replace(/-/g, "+").replace(/_/g, "/"));
  return Uint8Array.from(raw, (c) => c.charCodeAt(0));
}

/** Card that turns daily reminder notifications on or off for this device. */
export function ReminderCard() {
  const [state, setState] = useState<"hidden" | "off" | "on" | "busy" | "blocked" | "ios-install">("hidden");
  useEffect(() => {
    (async () => {
      if (inTelegram()) return;
      if (!("serviceWorker" in navigator) || !("PushManager" in window) || !("Notification" in window)) {
        if (isIOS() && !isStandalone()) setState("ios-install");
        return;
      }
      if (Notification.permission === "denied") return setState("blocked");
      const reg = await navigator.serviceWorker.ready;
      setState((await reg.pushManager.getSubscription()) ? "on" : "off");
    })().catch(() => undefined);
  }, []);
  if (state === "hidden") return null;

  const call = async (method: "POST" | "DELETE", body: unknown) => {
    const token = await getAccessToken();
    const res = await fetch("/api/app/push", { method, headers: { "content-type": "application/json", ...(token ? { authorization: `Bearer ${token}` } : {}) }, body: JSON.stringify(body) });
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  };
  const turnOn = async () => {
    setState("busy");
    try {
      if ((await Notification.requestPermission()) !== "granted") return setState("blocked");
      const { publicKey } = await (await fetch("/api/app/push")).json();
      if (!publicKey) throw new Error("no key");
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: b64ToBytes(publicKey) });
      await call("POST", { subscription: sub.toJSON() });
      setState("on");
    } catch { setState("off"); alert("Couldn't turn on reminders. Please try again."); }
  };
  const turnOff = async () => {
    setState("busy");
    try {
      const reg = await navigator.serviceWorker.ready;
      const sub = await reg.pushManager.getSubscription();
      if (sub) { await call("DELETE", { endpoint: sub.endpoint }).catch(() => undefined); await sub.unsubscribe(); }
    } finally { setState("off"); }
  };

  return (
    <div className="card">
      <b>🔔 Daily reminders</b>
      {state === "ios-install" ? (
        <p className="muted small" style={{ margin: "4px 0 10px" }}>On iPhone, add Mock Night to your home screen first, then open it from there to turn on reminders.</p>
      ) : state === "blocked" ? (
        <p className="muted small" style={{ margin: "4px 0 0" }}>Notifications are blocked for this site. Allow them in your browser or phone settings to get reminders.</p>
      ) : (
        <p className="muted small" style={{ margin: "4px 0 10px" }}>
          {state === "on" ? "On ✅ — we'll remind you on this device at your practice time." : "Get a nudge on this phone when your daily questions are ready."}
        </p>
      )}
      {state === "ios-install" && <InstallButton />}
      {(state === "off" || state === "busy") && <button className="btn block" disabled={state === "busy"} onClick={turnOn}>Turn on reminders</button>}
      {state === "on" && <button className="btn secondary block" onClick={turnOff}>Turn off on this device</button>}
    </div>
  );
}
