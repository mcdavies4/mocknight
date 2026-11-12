import { Api, InlineKeyboard } from "grammy";
import { env } from "./env";

let api: Api | null = null;
/** Bare Telegram API client for sending from library code (no bot handlers). */
export function tgApi(): Api {
  api ??= new Api(env.botToken);
  return api;
}

export async function notifyTelegram(telegramId: number | null | undefined, text: string, kb?: InlineKeyboard) {
  if (!telegramId) return;
  try {
    await tgApi().sendMessage(telegramId, text, { parse_mode: "Markdown", reply_markup: kb, link_preview_options: { is_disabled: true } });
  } catch (e) {
    console.error("notifyTelegram failed", telegramId, e);
  }
}

/** Send an email through Resend's HTTP API. No-ops if RESEND_API_KEY isn't set. */
export async function sendEmail(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  if (!key || !from) return false;
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from, to, subject, html }),
  });
  if (!res.ok) console.error("sendEmail failed", res.status, await res.text().catch(() => ""));
  return res.ok;
}
