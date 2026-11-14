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
  /** Optional fixed price in Telegram Stars (otherwise derived from amount — see lib/stars.ts) */
  stars?: number;
}

// Stars prices: learners buy Stars in Telegram at roughly $0.02 each (app store pricing), so 50 Stars ≈ $1 to them.
// You receive about $0.013 per Star, i.e. roughly 65% of the card price after Apple/Google's cut.
export const PLANS: Record<string, Plan> = {
  student_month: { code: "student_month", label: "Premium — 30 days", amount: 1_500_00, currency: "NGN", days: 30, provider: "paystack", stars: 50 },
  student_season: { code: "student_season", label: "Premium — till exam (120 days)", amount: 4_000_00, currency: "NGN", days: 120, provider: "paystack", stars: 150 },
  luk_pass: { code: "luk_pass", label: "Life in the UK — full access, 90 days", amount: 7_99, currency: "GBP", days: 90, provider: "stripe", stars: 500 },
  nmc_pass: { code: "nmc_pass", label: "NMC CBT — full access, 90 days", amount: 19_99, currency: "GBP", days: 90, provider: "stripe", stars: 1250 },
  us_cit: { code: "us_cit", label: "US Citizenship Test — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  ca_cit: { code: "ca_cit", label: "Canadian Citizenship Test — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  au_cit: { code: "au_cit", label: "Australian Citizenship Test — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  gulf_pass: { code: "gulf_pass", label: "Gulf nursing licence — 90 days", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  ielts_pass: { code: "ielts_pass", label: "IELTS Premium — 90 days (incl. essay marking)", amount: 9_99, currency: "GBP", days: 90, provider: "stripe", stars: 650 },
  ielts_pass_ngn: { code: "ielts_pass_ngn", label: "IELTS Premium — 90 days (pay in naira)", amount: 7_500_00, currency: "NGN", days: 90, provider: "paystack", stars: 250 },
  grad_pass: { code: "grad_pass", label: "Graduate Aptitude — 90 days", amount: 5_000_00, currency: "NGN", days: 90, provider: "paystack", stars: 150 },
  ibps_quarter: { code: "ibps_quarter", label: "Bank PO Premium — 90 days", amount: 199_00, currency: "INR", days: 90, provider: "stripe", stars: 125 },
  acca_pass: { code: "acca_pass", label: "ACCA Applied Knowledge — 90 days", amount: 14_99, currency: "GBP", days: 90, provider: "stripe", stars: 1000 },
  ican_pass: { code: "ican_pass", label: "ICAN Foundation — 90 days", amount: 10_000_00, currency: "NGN", days: 90, provider: "paystack", stars: 300 },
  itil_pass: { code: "itil_pass", label: "ITIL 4 Foundation — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  sixsig_pass: { code: "sixsig_pass", label: "Six Sigma Green Belt — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  eleven_pass: { code: "eleven_pass", label: "11+ Premium — 90 days", amount: 9_99, currency: "GBP", days: 90, provider: "stripe", stars: 650 },
  oet_pass: { code: "oet_pass", label: "OET Premium — 90 days", amount: 14_99, currency: "GBP", days: 90, provider: "stripe", stars: 1000 },
  oet_pass_ngn: { code: "oet_pass_ngn", label: "OET Premium — 90 days (pay in naira)", amount: 12_000_00, currency: "NGN", days: 90, provider: "paystack", stars: 400 },
  ucat_pass: { code: "ucat_pass", label: "UCAT Premium — 90 days", amount: 14_99, currency: "GBP", days: 90, provider: "stripe", stars: 1000 },
  kcse_month: { code: "kcse_month", label: "KCSE Premium — 30 days", amount: 2_99, currency: "USD", days: 30, provider: "stripe", stars: 150 },
  kcse_season: { code: "kcse_season", label: "KCSE Premium — till exam (120 days)", amount: 7_99, currency: "USD", days: 120, provider: "stripe", stars: 400 },
  mdcat_pass: { code: "mdcat_pass", label: "MDCAT Premium — 90 days", amount: 4_99, currency: "USD", days: 90, provider: "stripe", stars: 250 },
  neet_quarter: { code: "neet_quarter", label: "NEET Premium — 90 days", amount: 199_00, currency: "INR", days: 90, provider: "stripe", stars: 125 },
  neet_year: { code: "neet_year", label: "NEET Premium — 12 months", amount: 499_00, currency: "INR", days: 365, provider: "stripe", stars: 300 },
  jee_quarter: { code: "jee_quarter", label: "JEE Premium — 90 days", amount: 199_00, currency: "INR", days: 90, provider: "stripe", stars: 125 },
  jee_year: { code: "jee_year", label: "JEE Premium — 12 months", amount: 499_00, currency: "INR", days: 365, provider: "stripe", stars: 300 },
  gre_pass: { code: "gre_pass", label: "GRE / GMAT Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  cseph_pass: { code: "cseph_pass", label: "Civil Service Exam Premium — 90 days", amount: 4_99, currency: "USD", days: 90, provider: "stripe", stars: 250 },
  aat_pass: { code: "aat_pass", label: "AAT Premium — 90 days", amount: 9_99, currency: "GBP", days: 90, provider: "stripe", stars: 650 },
  ngrec_pass: { code: "ngrec_pass", label: "Recruitment tests Premium — 60 days", amount: 3_000_00, currency: "NGN", days: 60, provider: "paystack", stars: 100 },
  ncee_pass: { code: "ncee_pass", label: "Common Entrance Premium — till exam (120 days)", amount: 3_000_00, currency: "NGN", days: 120, provider: "paystack", stars: 100 },
  jsce_pass: { code: "jsce_pass", label: "Junior WAEC Premium — till exam (120 days)", amount: 3_000_00, currency: "NGN", days: 120, provider: "paystack", stars: 100 },
  ngcs_pass: { code: "ngcs_pass", label: "Promotion exam Premium — 90 days", amount: 5_000_00, currency: "NGN", days: 90, provider: "paystack", stars: 150 },
  pte_pass: { code: "pte_pass", label: "PTE Premium — 90 days", amount: 9_99, currency: "GBP", days: 90, provider: "stripe", stars: 650 },
  pte_pass_ngn: { code: "pte_pass_ngn", label: "PTE Premium — 90 days (pay in naira)", amount: 7_500_00, currency: "NGN", days: 90, provider: "paystack", stars: 250 },
  celpip_pass: { code: "celpip_pass", label: "CELPIP Premium — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  celpip_pass_ngn: { code: "celpip_pass_ngn", label: "CELPIP Premium — 90 days (pay in naira)", amount: 7_500_00, currency: "NGN", days: 90, provider: "paystack", stars: 250 },
  iosh_pass: { code: "iosh_pass", label: "IOSH Managing Safely Premium — 60 days", amount: 9_99, currency: "GBP", days: 60, provider: "stripe", stars: 650 },
  iosh_pass_ngn: { code: "iosh_pass_ngn", label: "IOSH Managing Safely Premium — 60 days (pay in naira)", amount: 7_500_00, currency: "NGN", days: 60, provider: "paystack", stars: 250 },
  oilgas_pass: { code: "oilgas_pass", label: "Oil & gas Premium — 90 days", amount: 7_500_00, currency: "NGN", days: 90, provider: "paystack", stars: 250 },
  oilgas_pass_usd: { code: "oilgas_pass_usd", label: "Oil & gas Premium — 90 days (card, USD)", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  ndt_pass: { code: "ndt_pass", label: "NDT Premium — 90 days", amount: 10_000_00, currency: "NGN", days: 90, provider: "paystack", stars: 300 },
  ndt_pass_usd: { code: "ndt_pass_usd", label: "NDT Premium — 90 days (card, USD)", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  weld_pass: { code: "weld_pass", label: "Welding inspector Premium — 90 days", amount: 15_000_00, currency: "NGN", days: 90, provider: "paystack", stars: 450 },
  weld_pass_usd: { code: "weld_pass_usd", label: "Welding inspector Premium — 90 days (card, USD)", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  api_pass: { code: "api_pass", label: "API 510 / 570 Premium — 90 days", amount: 24_99, currency: "USD", days: 90, provider: "stripe", stars: 1250 },
  api_pass_ngn: { code: "api_pass_ngn", label: "API 510 / 570 Premium — 90 days (pay in naira)", amount: 20_000_00, currency: "NGN", days: 90, provider: "paystack", stars: 600 },
  coat_pass: { code: "coat_pass", label: "Coating inspector Premium — 90 days", amount: 12_000_00, currency: "NGN", days: 90, provider: "paystack", stars: 360 },
  coat_pass_usd: { code: "coat_pass_usd", label: "Coating inspector Premium — 90 days (card, USD)", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  exit_pass: { code: "exit_pass", label: "Exit Exam Premium — till exam (120 days)", amount: 4_99, currency: "USD", days: 120, provider: "stripe", stars: 250 },
  csee_season: { code: "csee_season", label: "CSEE Premium — till exam (120 days)", amount: 5_99, currency: "USD", days: 120, provider: "stripe", stars: 300 },
  uce_season: { code: "uce_season", label: "UCE Premium — till exam (120 days)", amount: 5_99, currency: "USD", days: 120, provider: "stripe", stars: 300 },
  gce_season: { code: "gce_season", label: "GCE Premium — till exam (120 days)", amount: 5_99, currency: "USD", days: 120, provider: "stripe", stars: 300 },
  k53_pass: { code: "k53_pass", label: "Learner's licence Premium — 60 days", amount: 3_99, currency: "USD", days: 60, provider: "stripe", stars: 200 },
  matric_season: { code: "matric_season", label: "Matric Premium — till exams (120 days)", amount: 5_99, currency: "USD", days: 120, provider: "stripe", stars: 300 },
  kcpa_pass: { code: "kcpa_pass", label: "CPA Kenya Premium — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  caresr_pass: { code: "caresr_pass", label: "Senior carer Premium — 60 days", amount: 7_99, currency: "GBP", days: 60, provider: "stripe", stars: 500 },
  caresr_pass_ngn: { code: "caresr_pass_ngn", label: "Senior carer Premium — 60 days (pay in naira)", amount: 5_000_00, currency: "NGN", days: 60, provider: "paystack", stars: 150 },
  firstaid_pass: { code: "firstaid_pass", label: "First aid Premium — 30 days", amount: 4_99, currency: "GBP", days: 30, provider: "stripe", stars: 325 },
  seru_pass: { code: "seru_pass", label: "SERU Premium — 60 days", amount: 9_99, currency: "GBP", days: 60, provider: "stripe", stars: 650 },
  hgv_pass: { code: "hgv_pass", label: "HGV driver Premium — 90 days", amount: 9_99, currency: "GBP", days: 90, provider: "stripe", stars: 650 },
  plab_pass: { code: "plab_pass", label: "PLAB 1 — full access, 90 days", amount: 24_99, currency: "GBP", days: 90, provider: "stripe", stars: 1550 },
  nclex_pass: { code: "nclex_pass", label: "NCLEX-RN — full access, 90 days", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  pm_pass: { code: "pm_pass", label: "Project Management — full access, 90 days", amount: 14_99, currency: "GBP", days: 90, provider: "stripe", stars: 1000 },
  pm_pass_ngn: { code: "pm_pass_ngn", label: "Project Management — 90 days (pay in naira)", amount: 12_000_00, currency: "NGN", days: 90, provider: "paystack", stars: 400 },
  // Ethiopia: card payments via Stripe in USD (Chapa needs an Ethiopian business licence — switch back to provider "chapa" + ETB if you get one)
  eth_month: { code: "eth_month", label: "Grade 12 Premium — 30 days", amount: 2_99, currency: "USD", days: 30, provider: "stripe", stars: 150 },
  eth_season: { code: "eth_season", label: "Grade 12 Premium — till exam (120 days)", amount: 7_99, currency: "USD", days: 120, provider: "stripe", stars: 400 },
  ssc_quarter: { code: "ssc_quarter", label: "SSC Premium — 90 days", amount: 199_00, currency: "INR", days: 90, provider: "stripe", stars: 125 },
  ssc_year: { code: "ssc_year", label: "SSC Premium — 12 months", amount: 499_00, currency: "INR", days: 365, provider: "stripe", stars: 300 },
  drive_pass: { code: "drive_pass", label: "Driving Theory — 30 days", amount: 5_99, currency: "GBP", days: 30, provider: "stripe", stars: 350 },
  fse_pass: { code: "fse_pass", label: "Functional Skills English — 30 days", amount: 7_99, currency: "GBP", days: 30, provider: "stripe", stars: 500 },
  fsm_pass: { code: "fsm_pass", label: "Functional Skills Maths — 30 days", amount: 7_99, currency: "GBP", days: 30, provider: "stripe", stars: 500 },
  care_pass: { code: "care_pass", label: "Care Certificate Revision — 90 days", amount: 9_99, currency: "GBP", days: 90, provider: "stripe", stars: 600 },
  citb_pass: { code: "citb_pass", label: "CITB HS&E Operatives Practice — 30 days", amount: 5_99, currency: "GBP", days: 30, provider: "stripe", stars: 350 },
  sia_pass: { code: "sia_pass", label: "SIA Door Supervisor Revision — 30 days", amount: 7_99, currency: "GBP", days: 30, provider: "stripe", stars: 500 },
  food_pass: { code: "food_pass", label: "Food Safety Level 2 Practice — 30 days", amount: 4_99, currency: "GBP", days: 30, provider: "stripe", stars: 300 },
  carew_pass: { code: "carew_pass", label: "Care Workforce Essentials — 30 days", amount: 4_99, currency: "GBP", days: 30, provider: "stripe", stars: 300 },
  hse_pass: { code: "hse_pass", label: "Workplace Health & Safety — 30 days", amount: 4_99, currency: "GBP", days: 30, provider: "stripe", stars: 300 },

  itf_pass: { code: "itf_pass", label: "IT Support Fundamentals — 90 days", amount: 999, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  ccst_pass: { code: "ccst_pass", label: "Cisco CCST Networking Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  aws_pass: { code: "aws_pass", label: "AWS Cloud Practitioner Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  az900_pass: { code: "az900_pass", label: "Azure Fundamentals AZ-900 Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  python_pass: { code: "python_pass", label: "Python Foundations — 90 days", amount: 999, currency: "USD", days: 90, provider: "stripe", stars: 500 },

  sec_pass: { code: "sec_pass", label: "Cybersecurity Fundamentals — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  dat_pass: { code: "dat_pass", label: "Data Analytics Foundations — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  aia_pass: { code: "aia_pass", label: "AI & Workplace Automation — 90 days", amount: 999, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  con_pass: { code: "con_pass", label: "Construction & Site Management — 90 days", amount: 799, currency: "GBP", days: 90, provider: "stripe", stars: 500 },
  bkp_pass: { code: "bkp_pass", label: "Bookkeeping & Payroll — 90 days", amount: 799, currency: "GBP", days: 90, provider: "stripe", stars: 500 },
  fire_individual: { code: "fire_individual", label: "Fire Marshal course + certificate (12 months)", amount: 14_99, currency: "GBP", days: 365, provider: "stripe", stars: 1000 },
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
