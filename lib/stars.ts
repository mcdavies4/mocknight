// Telegram Stars (currency "XTR") — Telegram's in-app payment for digital goods.
// Learners pay inside the chat; you withdraw earnings from the bot's balance via Fragment.
import type { Plan } from "./pricing";

/** Rough USD value of 1 unit of each currency — only used to suggest a Stars price. Set Plan.stars to override. */
const USD_PER_UNIT: Record<string, number> = { USD: 1, GBP: 1.27, NGN: 1 / 1550, INR: 1 / 84, ETB: 1 / 130 };
/** Approximate USD a developer receives per Star. */
const USD_PER_STAR = 0.013;

export const STARS_ENABLED = process.env.TELEGRAM_STARS !== "off";

export function starsFor(plan: Plan): number {
  if (plan.stars) return plan.stars;
  const usd = (plan.amount / 100) * (USD_PER_UNIT[plan.currency] ?? 1);
  return Math.max(5, Math.ceil(usd / USD_PER_STAR / 5) * 5);
}
