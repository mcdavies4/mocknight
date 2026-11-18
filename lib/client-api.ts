"use client";
import { getAccessToken } from "./supabase-browser";

type TgWebApp = {
  initData: string;
  ready: () => void;
  expand: () => void;
  close: () => void;
  openTelegramLink?: (url: string) => void;
  openLink?: (url: string) => void;
  enableClosingConfirmation?: () => void;
  disableClosingConfirmation?: () => void;
  HapticFeedback?: { impactOccurred: (s: "light" | "medium" | "heavy") => void; notificationOccurred: (t: "success" | "error" | "warning") => void };
};

declare global {
  interface Window {
    Telegram?: { WebApp: TgWebApp };
  }
}

export const tg = (): TgWebApp | undefined => (typeof window !== "undefined" ? window.Telegram?.WebApp : undefined);
export const inTelegram = () => !!tg()?.initData;

/** POST to our API, authenticated as the Telegram user (Mini App) or the signed-in web user. */
export async function api<T>(path: string, body: Record<string, unknown> = {}): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  const payload: Record<string, unknown> = { ...body };
  if (inTelegram()) payload.initData = tg()!.initData;
  else {
    const token = await getAccessToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(path, { method: "POST", headers, body: JSON.stringify(payload) });
  const json = await res.json().catch(() => ({ error: "NETWORK" }));
  if (!res.ok) throw Object.assign(new Error(json.error ?? "ERROR"), { data: json });
  return json as T;
}

/** Leave the current screen: close the Mini App in Telegram, or go to the web dashboard. */
export function goHome() {
  if (inTelegram()) tg()!.close();
  else window.location.href = "/app";
}

/** Share a result link: Telegram share sheet in the Mini App, native share / WhatsApp on the web. */
export async function shareLink(url: string, text: string) {
  const w = tg();
  if (inTelegram() && w?.openTelegramLink) {
    w.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`);
    return;
  }
  if (typeof navigator !== "undefined" && navigator.share) {
    try {
      await navigator.share({ title: "Mock Night", text, url });
      return;
    } catch {
      /* cancelled — fall through */
    }
  }
  window.open(`https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`, "_blank");
}

/** Share the result card itself as an image (WhatsApp status, Instagram story) where the browser allows it. */
export async function shareImage(imageUrl: string, text: string, pageUrl: string) {
  if (!inTelegram() && typeof navigator !== "undefined" && navigator.canShare) {
    try {
      const blob = await (await fetch(imageUrl)).blob();
      const file = new File([blob], "mock-night-result.png", { type: blob.type || "image/png" });
      if (navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], text: `${text} ${pageUrl}` });
        return;
      }
    } catch (e) {
      if ((e as Error)?.name === "AbortError") return; // user closed the share sheet
    }
  }
  openExternal(imageUrl);
}

export function openExternal(url: string) {
  const w = tg();
  if (inTelegram() && w?.openLink) w.openLink(url);
  else window.open(url, "_blank");
}
