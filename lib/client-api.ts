"use client";
import { getAccessToken } from "./supabase-browser";

type TgWebApp = {
  initData: string;
  ready: () => void;
  expand: () => void;
  close: () => void;
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
