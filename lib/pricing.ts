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
};

/** Tutor seat price per student per 30 days (Paystack, NGN). */
export const SEAT_PRICE_KOBO = 800_00;
export const SEAT_DAYS = 30;

export const FREE_DAILY_QUESTIONS = 10;
export const PREMIUM_DAILY_QUESTIONS = 20;
export const FREE_PRACTICE_MOCKS_PER_WEEK = 1;

export function money(amount: number, currency: Currency = "NGN") {
  return currency === "GBP" ? `£${(amount / 100).toFixed(2)}` : `₦${(amount / 100).toLocaleString("en-NG")}`;
}
/** @deprecated use money() */
export const naira = (kobo: number) => money(kobo, "NGN");
