// Amounts in minor units (kobo, pence, santim, paise). Change here, nowhere else.
export type Currency = "NGN" | "GBP" | "ETB" | "INR" | "USD";
export type SeatCurrency = "NGN" | "GBP";

export interface Plan {
  code: string;
  label: string;
  amount: number;
  currency: Currency;
  days: number;
  provider: "paystack" | "stripe" | "chapa";
}

export const PLANS: Record<string, Plan> = {
  student_month: { code: "student_month", label: "Premium — 30 days", amount: 1_500_00, currency: "NGN", days: 30, provider: "paystack" },
  student_season: { code: "student_season", label: "Premium — till exam (120 days)", amount: 4_000_00, currency: "NGN", days: 120, provider: "paystack" },
  luk_pass: { code: "luk_pass", label: "Life in the UK — full access, 90 days", amount: 7_99, currency: "GBP", days: 90, provider: "stripe" },
  nmc_pass: { code: "nmc_pass", label: "NMC CBT — full access, 90 days", amount: 19_99, currency: "GBP", days: 90, provider: "stripe" },
  pm_pass: { code: "pm_pass", label: "Project Management — full access, 90 days", amount: 14_99, currency: "GBP", days: 90, provider: "stripe" },
  pm_pass_ngn: { code: "pm_pass_ngn", label: "Project Management — 90 days (pay in naira)", amount: 12_000_00, currency: "NGN", days: 90, provider: "paystack" },
  // Ethiopia: card payments via Stripe in USD (Chapa needs an Ethiopian business licence — switch back to provider "chapa" + ETB if you get one)
  eth_month: { code: "eth_month", label: "Grade 12 Premium — 30 days", amount: 2_99, currency: "USD", days: 30, provider: "stripe" },
  eth_season: { code: "eth_season", label: "Grade 12 Premium — till exam (120 days)", amount: 7_99, currency: "USD", days: 120, provider: "stripe" },
  ssc_quarter: { code: "ssc_quarter", label: "SSC Premium — 90 days", amount: 199_00, currency: "INR", days: 90, provider: "stripe" },
  ssc_year: { code: "ssc_year", label: "SSC Premium — 12 months", amount: 499_00, currency: "INR", days: 365, provider: "stripe" },
  drive_pass: { code: "drive_pass", label: "Driving Theory — 30 days", amount: 5_99, currency: "GBP", days: 30, provider: "stripe" },
  fse_pass: { code: "fse_pass", label: "Functional Skills English — 30 days", amount: 7_99, currency: "GBP", days: 30, provider: "stripe" },
  fsm_pass: { code: "fsm_pass", label: "Functional Skills Maths — 30 days", amount: 7_99, currency: "GBP", days: 30, provider: "stripe" },
  care_pass: { code: "care_pass", label: "Care Certificate Revision — 90 days", amount: 9_99, currency: "GBP", days: 90, provider: "stripe" },
  citb_pass: { code: "citb_pass", label: "CITB HS&E Operatives Practice — 30 days", amount: 5_99, currency: "GBP", days: 30, provider: "stripe" },
  sia_pass: { code: "sia_pass", label: "SIA Door Supervisor Revision — 30 days", amount: 7_99, currency: "GBP", days: 30, provider: "stripe" },
  food_pass: { code: "food_pass", label: "Food Safety Level 2 Practice — 30 days", amount: 4_99, currency: "GBP", days: 30, provider: "stripe" },
  carew_pass: { code: "carew_pass", label: "Care Workforce Essentials — 30 days", amount: 4_99, currency: "GBP", days: 30, provider: "stripe" },
  hse_pass: { code: "hse_pass", label: "Workplace Health & Safety — 30 days", amount: 4_99, currency: "GBP", days: 30, provider: "stripe" },

  itf_pass: { code: "itf_pass", label: "IT Support Fundamentals — 90 days", amount: 999, currency: "USD", days: 90, provider: "stripe" },
  ccst_pass: { code: "ccst_pass", label: "Cisco CCST Networking Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe" },
  aws_pass: { code: "aws_pass", label: "AWS Cloud Practitioner Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe" },
  az900_pass: { code: "az900_pass", label: "Azure Fundamentals AZ-900 Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe" },
  python_pass: { code: "python_pass", label: "Python Foundations — 90 days", amount: 999, currency: "USD", days: 90, provider: "stripe" },

  sec_pass: { code: "sec_pass", label: "Cybersecurity Fundamentals — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe" },
  dat_pass: { code: "dat_pass", label: "Data Analytics Foundations — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe" },
  aia_pass: { code: "aia_pass", label: "AI & Workplace Automation — 90 days", amount: 999, currency: "USD", days: 90, provider: "stripe" },
  con_pass: { code: "con_pass", label: "Construction & Site Management — 90 days", amount: 799, currency: "GBP", days: 90, provider: "stripe" },
  bkp_pass: { code: "bkp_pass", label: "Bookkeeping & Payroll — 90 days", amount: 799, currency: "GBP", days: 90, provider: "stripe" },
  fire_individual: { code: "fire_individual", label: "Fire Marshal course + certificate (12 months)", amount: 14_99, currency: "GBP", days: 365, provider: "stripe" },
};

/** Seats bought by a tutor/company for their learners. NGN via Paystack, GBP via Stripe. */
export const SEATS: Record<SeatCurrency, { amount: number; days: number; provider: "paystack" | "stripe"; per: string }> = {
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
  const v = amount / 100;
  if (currency === "GBP") return `£${v.toFixed(2)}`;
  if (currency === "ETB") return `${v.toLocaleString("en-US")} Birr`;
  if (currency === "USD") return `$${v.toFixed(2)}`;
  if (currency === "INR") return `₹${v.toLocaleString("en-IN")}`;
  return `₦${v.toLocaleString("en-NG")}`;
}
/** @deprecated use money() */
export const naira = (kobo: number) => money(kobo, "NGN");
