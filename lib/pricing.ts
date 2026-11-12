// Amounts in minor units (kobo for NGN, pence for GBP). Change here, nowhere else.
export type Currency = "NGN" | "GBP";

export interface Plan {
  code: string;
  label: string;
  amount: number;
  currency: Currency;
  days: number;
  provider: "paystack" | "stripe";
}

export const PLANS: Record<string, Plan> = {
  student_month: { code: "student_month", label: "Premium — 30 days", amount: 1_500_00, currency: "NGN", days: 30, provider: "paystack" },
  student_season: { code: "student_season", label: "Premium — till exam (120 days)", amount: 4_000_00, currency: "NGN", days: 120, provider: "paystack" },
  luk_pass: { code: "luk_pass", label: "Life in the UK — full access, 90 days", amount: 7_99, currency: "GBP", days: 90, provider: "stripe" },
  nmc_pass: { code: "nmc_pass", label: "NMC CBT — full access, 90 days", amount: 19_99, currency: "GBP", days: 90, provider: "stripe" },
  fire_individual: { code: "fire_individual", label: "Fire Marshal course + certificate (12 months)", amount: 14_99, currency: "GBP", days: 365, provider: "stripe" },
};

/** Seats bought by a tutor/company for their learners. NGN via Paystack, GBP via Stripe. */
export const SEATS: Record<Currency, { amount: number; days: number; provider: "paystack" | "stripe"; per: string }> = {
  NGN: { amount: 800_00, days: 30, provider: "paystack", per: "per student / 30 days" },
  GBP: { amount: 6_00, days: 365, provider: "stripe", per: "per staff member / 12 months" },
};
/** @deprecated use SEATS.NGN */
export const SEAT_PRICE_KOBO = SEATS.NGN.amount;
export const SEAT_DAYS = SEATS.NGN.days;

/** Every new account gets full access for this many days after joining (override with TRIAL_DAYS env, 0 = off) */
export const TRIAL_DAYS = Number(process.env.TRIAL_DAYS ?? 14);
/** Whether the free trial also unlocks paid certificates (Fire Marshal). Off by default. */
export const TRIAL_INCLUDES_CERTIFICATES = process.env.TRIAL_INCLUDES_CERTIFICATES === "true";
export const FOUNDER_AI_PER_DAY = 1000;

/** AI explanations per day */
export const AI_FREE_PER_DAY = 3;
export const AI_PREMIUM_PER_DAY = 40;
/** Referral reward: both sides get this many Premium days when the friend completes their first practice */
export const REFERRAL_DAYS = 3;
export const REFERRAL_MAX_REWARDS = 20;

export const FREE_DAILY_QUESTIONS = 10;
export const PREMIUM_DAILY_QUESTIONS = 20;
export const FREE_PRACTICE_MOCKS_PER_WEEK = 1;

export function money(amount: number, currency: Currency = "NGN") {
  return currency === "GBP" ? `£${(amount / 100).toFixed(2)}` : `₦${(amount / 100).toLocaleString("en-NG")}`;
}
/** @deprecated use money() */
export const naira = (kobo: number) => money(kobo, "NGN");
