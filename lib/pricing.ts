// All prices in kobo (₦1 = 100 kobo). Change here, nowhere else.
export const PLANS = {
  student_month: { label: "Premium — 30 days", amountKobo: 1_500_00, days: 30 },
  student_season: { label: "Premium — till exam (120 days)", amountKobo: 4_000_00, days: 120 },
} as const;

/** Tutor seat price per student per 30 days. */
export const SEAT_PRICE_KOBO = 800_00;
export const SEAT_DAYS = 30;

export const FREE_DAILY_QUESTIONS = 10;
export const PREMIUM_DAILY_QUESTIONS = 20;
export const FREE_PRACTICE_MOCKS_PER_WEEK = 1;

export const naira = (kobo: number) => `₦${(kobo / 100).toLocaleString("en-NG")}`;
