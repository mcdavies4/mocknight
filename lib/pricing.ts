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
  student_month: { code: "student_month", label: "Premium — 30 days", amount: 1_99, currency: "USD", days: 30, provider: "stripe", stars: 50 },
  student_season: { code: "student_season", label: "Premium — till exam (120 days)", amount: 3_99, currency: "USD", days: 120, provider: "stripe", stars: 150 },
  luk_pass: { code: "luk_pass", label: "Life in the UK — full access, 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  nmc_pass: { code: "nmc_pass", label: "NMC CBT — full access, 90 days", amount: 24_99, currency: "USD", days: 90, provider: "stripe", stars: 1250 },
  us_cit: { code: "us_cit", label: "US Citizenship Test — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  ca_cit: { code: "ca_cit", label: "Canadian Citizenship Test — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  au_cit: { code: "au_cit", label: "Australian Citizenship Test — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  gulf_pass: { code: "gulf_pass", label: "Gulf nursing licence — 90 days", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  ielts_pass: { code: "ielts_pass", label: "IELTS Premium — 90 days (incl. essay marking)", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  grad_pass: { code: "grad_pass", label: "Graduate Aptitude — 90 days", amount: 4_99, currency: "USD", days: 90, provider: "stripe", stars: 150 },
  ibps_quarter: { code: "ibps_quarter", label: "Bank PO Premium — 90 days", amount: 2_99, currency: "USD", days: 90, provider: "stripe", stars: 125 },
  acca_pass: { code: "acca_pass", label: "ACCA Applied Knowledge — 90 days", amount: 18_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  ican_pass: { code: "ican_pass", label: "ICAN Foundation — 90 days", amount: 7_99, currency: "USD", days: 90, provider: "stripe", stars: 300 },
  itil_pass: { code: "itil_pass", label: "ITIL 4 Foundation — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  sixsig_pass: { code: "sixsig_pass", label: "Six Sigma Green Belt — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  eleven_pass: { code: "eleven_pass", label: "11+ Premium — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  oet_pass: { code: "oet_pass", label: "OET Premium — 90 days", amount: 18_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  ucat_pass: { code: "ucat_pass", label: "UCAT Premium — 90 days", amount: 18_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  kcse_month: { code: "kcse_month", label: "KCSE Premium — 30 days", amount: 2_99, currency: "USD", days: 30, provider: "stripe", stars: 150 },
  kcse_season: { code: "kcse_season", label: "KCSE Premium — till exam (120 days)", amount: 7_99, currency: "USD", days: 120, provider: "stripe", stars: 400 },
  mdcat_pass: { code: "mdcat_pass", label: "MDCAT Premium — 90 days", amount: 4_99, currency: "USD", days: 90, provider: "stripe", stars: 250 },
  neet_quarter: { code: "neet_quarter", label: "NEET Premium — 90 days", amount: 2_99, currency: "USD", days: 90, provider: "stripe", stars: 125 },
  neet_year: { code: "neet_year", label: "NEET Premium — 12 months", amount: 5_99, currency: "USD", days: 365, provider: "stripe", stars: 300 },
  jee_quarter: { code: "jee_quarter", label: "JEE Premium — 90 days", amount: 2_99, currency: "USD", days: 90, provider: "stripe", stars: 125 },
  jee_year: { code: "jee_year", label: "JEE Premium — 12 months", amount: 5_99, currency: "USD", days: 365, provider: "stripe", stars: 300 },
  gre_pass: { code: "gre_pass", label: "GRE / GMAT Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  cseph_pass: { code: "cseph_pass", label: "Civil Service Exam Premium — 90 days", amount: 4_99, currency: "USD", days: 90, provider: "stripe", stars: 250 },
  aat_pass: { code: "aat_pass", label: "AAT Premium — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  ngrec_pass: { code: "ngrec_pass", label: "Recruitment tests Premium — 60 days", amount: 2_99, currency: "USD", days: 60, provider: "stripe", stars: 100 },
  ncee_pass: { code: "ncee_pass", label: "Common Entrance Premium — till exam (120 days)", amount: 2_99, currency: "USD", days: 120, provider: "stripe", stars: 100 },
  jsce_pass: { code: "jsce_pass", label: "Junior WAEC Premium — till exam (120 days)", amount: 2_99, currency: "USD", days: 120, provider: "stripe", stars: 100 },
  ngcs_pass: { code: "ngcs_pass", label: "Promotion exam Premium — 90 days", amount: 4_99, currency: "USD", days: 90, provider: "stripe", stars: 150 },
  pte_pass: { code: "pte_pass", label: "PTE Premium — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  celpip_pass: { code: "celpip_pass", label: "CELPIP Premium — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  iosh_pass: { code: "iosh_pass", label: "IOSH Managing Safely Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  oilgas_pass_usd: { code: "oilgas_pass_usd", label: "Oil & gas Premium — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  ndt_pass_usd: { code: "ndt_pass_usd", label: "NDT Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  weld_pass_usd: { code: "weld_pass_usd", label: "Welding inspector Premium — 90 days", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  api_pass: { code: "api_pass", label: "API 510 / 570 Premium — 90 days", amount: 24_99, currency: "USD", days: 90, provider: "stripe", stars: 1250 },
  coat_pass_usd: { code: "coat_pass_usd", label: "Coating inspector Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  exit_pass: { code: "exit_pass", label: "Exit Exam Premium — till exam (120 days)", amount: 4_99, currency: "USD", days: 120, provider: "stripe", stars: 250 },
  csee_season: { code: "csee_season", label: "CSEE Premium — till exam (120 days)", amount: 5_99, currency: "USD", days: 120, provider: "stripe", stars: 300 },
  uce_season: { code: "uce_season", label: "UCE Premium — till exam (120 days)", amount: 5_99, currency: "USD", days: 120, provider: "stripe", stars: 300 },
  gce_season: { code: "gce_season", label: "GCE Premium — till exam (120 days)", amount: 5_99, currency: "USD", days: 120, provider: "stripe", stars: 300 },
  k53_pass: { code: "k53_pass", label: "Learner's licence Premium — 60 days", amount: 3_99, currency: "USD", days: 60, provider: "stripe", stars: 200 },
  matric_season: { code: "matric_season", label: "Matric Premium — till exams (120 days)", amount: 5_99, currency: "USD", days: 120, provider: "stripe", stars: 300 },
  uace_season: { code: "uace_season", label: "UACE Premium — till exam (120 days)", amount: 5_99, currency: "USD", days: 120, provider: "stripe", stars: 300 },
  acsee_season: { code: "acsee_season", label: "ACSEE Premium — till exam (120 days)", amount: 5_99, currency: "USD", days: 120, provider: "stripe", stars: 300 },
  rwa_season: { code: "rwa_season", label: "Rwanda S6 Premium — till exam (120 days)", amount: 5_99, currency: "USD", days: 120, provider: "stripe", stars: 300 },
  cpaug_pass: { code: "cpaug_pass", label: "CPA Uganda Premium — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  cpatz_pass: { code: "cpatz_pass", label: "CPA Tanzania Premium — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  kedrv_pass: { code: "kedrv_pass", label: "Kenya driving test Premium — 30 days", amount: 2_99, currency: "USD", days: 30, provider: "stripe", stars: 150 },
  ugdrv_pass: { code: "ugdrv_pass", label: "Uganda driving test Premium — 30 days", amount: 2_99, currency: "USD", days: 30, provider: "stripe", stars: 150 },
  tzdrv_pass: { code: "tzdrv_pass", label: "Tanzania driving test Premium — 30 days", amount: 2_99, currency: "USD", days: 30, provider: "stripe", stars: 150 },
  rwdrv_pass: { code: "rwdrv_pass", label: "Rwanda driving test Premium — 30 days", amount: 2_99, currency: "USD", days: 30, provider: "stripe", stars: 150 },
  kcpa_pass: { code: "kcpa_pass", label: "CPA Kenya Premium — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  caresr_pass: { code: "caresr_pass", label: "Senior carer Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  firstaid_pass: { code: "firstaid_pass", label: "First aid Premium — 30 days", amount: 5_99, currency: "USD", days: 30, provider: "stripe", stars: 325 },
  seru_pass: { code: "seru_pass", label: "SERU Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  hgv_pass: { code: "hgv_pass", label: "HGV driver Premium — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  elec_pass: { code: "elec_pass", label: "18th Edition Premium — 60 days", amount: 18_99, currency: "USD", days: 60, provider: "stripe", stars: 1000 },
  eyta_pass: { code: "eyta_pass", label: "Teaching assistant Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  warehouse_pass: { code: "warehouse_pass", label: "Warehouse & forklift Premium — 30 days", amount: 5_99, currency: "USD", days: 30, provider: "stripe", stars: 325 },
  hca_pass: { code: "hca_pass", label: "NHS HCA Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  ba_pass: { code: "ba_pass", label: "Business Analyst Premium — 90 days", amount: 15_99, currency: "USD", days: 90, provider: "stripe", stars: 850 },
  isc2_pass: { code: "isc2_pass", label: "ISC2 CC Premium — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  saa_pass: { code: "saa_pass", label: "AWS Solutions Architect Premium — 90 days", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  gcp_pass: { code: "gcp_pass", label: "Google Cloud Digital Leader Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  az104_pass: { code: "az104_pass", label: "Azure Administrator Premium — 90 days", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  cissp_pass: { code: "cissp_pass", label: "CISSP Premium — 90 days", amount: 24_99, currency: "USD", days: 90, provider: "stripe", stars: 1250 },
  devops_pass: { code: "devops_pass", label: "DevOps & Kubernetes Premium — 60 days", amount: 14_99, currency: "USD", days: 60, provider: "stripe", stars: 750 },
  digmkt_pass: { code: "digmkt_pass", label: "Digital marketing Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  hrcert_pass: { code: "hrcert_pass", label: "HR certification Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  pspo_pass: { code: "pspo_pass", label: "Product Owner Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  hsk_pass: { code: "hsk_pass", label: "HSK Chinese Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  csca_pass: { code: "csca_pass", label: "CSCA Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  jlpt_pass: { code: "jlpt_pass", label: "JLPT Japanese Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  eps_pass: { code: "eps_pass", label: "EPS-TOPIK Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  pnle_pass: { code: "pnle_pass", label: "PNLE Premium — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  let_pass: { code: "let_pass", label: "LET Premium — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  sgbtt_pass: { code: "sgbtt_pass", label: "Singapore BTT Premium — 60 days", amount: 7_99, currency: "USD", days: 60, provider: "stripe", stars: 400 },
  torfl_pass: { code: "torfl_pass", label: "TORFL Russian Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  rumig_pass: { code: "rumig_pass", label: "Russia migrant exam Premium — 30 days", amount: 7_99, currency: "USD", days: 30, provider: "stripe", stars: 400 },
  lid_pass: { code: "lid_pass", label: "Leben in Deutschland Premium — 60 days", amount: 7_99, currency: "USD", days: 60, provider: "stripe", stars: 400 },
  gera1_pass: { code: "gera1_pass", label: "German A1 Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  istqb_pass: { code: "istqb_pass", label: "ISTQB Foundation Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  psm_pass: { code: "psm_pass", label: "Scrum Master Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  netplus_pass: { code: "netplus_pass", label: "Network+ Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  aicert_pass: { code: "aicert_pass", label: "AI certifications Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  sfa_pass: { code: "sfa_pass", label: "Salesforce Admin Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  plab_pass: { code: "plab_pass", label: "PLAB 1 — full access, 90 days", amount: 29_99, currency: "USD", days: 90, provider: "stripe", stars: 1550 },
  nclex_pass: { code: "nclex_pass", label: "NCLEX-RN — full access, 90 days", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  pm_pass: { code: "pm_pass", label: "Project Management — full access, 90 days", amount: 18_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  // Ethiopia: card payments via Stripe in USD (Chapa needs an Ethiopian business licence — switch back to provider "chapa" + ETB if you get one)
  eth_month: { code: "eth_month", label: "Grade 12 Premium — 30 days", amount: 2_99, currency: "USD", days: 30, provider: "stripe", stars: 150 },
  eth_season: { code: "eth_season", label: "Grade 12 Premium — till exam (120 days)", amount: 7_99, currency: "USD", days: 120, provider: "stripe", stars: 400 },
  ged_pass: { code: "ged_pass", label: "GED Premium — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  teas_pass: { code: "teas_pass", label: "ATI TEAS Premium — 60 days", amount: 14_99, currency: "USD", days: 60, provider: "stripe", stars: 750 },
  cna_pass: { code: "cna_pass", label: "CNA Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  asvab_pass: { code: "asvab_pass", label: "ASVAB Premium — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  upsc_quarter: { code: "upsc_quarter", label: "UPSC Prelims Premium — 90 days", amount: 3_49, currency: "USD", days: 90, provider: "stripe", stars: 150 },
  upsc_year: { code: "upsc_year", label: "UPSC Prelims Premium — 12 months", amount: 6_99, currency: "USD", days: 365, provider: "stripe", stars: 350 },
  rrb_quarter: { code: "rrb_quarter", label: "Railways Premium — 90 days", amount: 2_99, currency: "USD", days: 90, provider: "stripe", stars: 125 },
  rrb_year: { code: "rrb_year", label: "Railways Premium — 12 months", amount: 5_99, currency: "USD", days: 365, provider: "stripe", stars: 300 },
  ctet_quarter: { code: "ctet_quarter", label: "CTET Premium — 90 days", amount: 2_99, currency: "USD", days: 90, provider: "stripe", stars: 125 },
  ctet_year: { code: "ctet_year", label: "CTET Premium — 12 months", amount: 5_99, currency: "USD", days: 365, provider: "stripe", stars: 300 },
  cat_quarter: { code: "cat_quarter", label: "CAT Premium — 90 days", amount: 3_99, currency: "USD", days: 90, provider: "stripe", stars: 175 },
  cat_year: { code: "cat_year", label: "CAT Premium — 12 months", amount: 7_99, currency: "USD", days: 365, provider: "stripe", stars: 400 },
  gcse_pass: { code: "gcse_pass", label: "GCSE Premium — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  csjt_pass: { code: "csjt_pass", label: "Civil Service Judgement Test — 30 days", amount: 9_99, currency: "USD", days: 30, provider: "stripe", stars: 500 },
  toefl_pass: { code: "toefl_pass", label: "TOEFL Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  det_pass: { code: "det_pass", label: "Duolingo English Test Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  cdl_pass: { code: "cdl_pass", label: "CDL Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  g1_pass: { code: "g1_pass", label: "Ontario G1 Premium — 60 days", amount: 7_99, currency: "USD", days: 60, provider: "stripe", stars: 400 },
  aplus_pass: { code: "aplus_pass", label: "CompTIA A+ Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  ccna_pass: { code: "ccna_pass", label: "CCNA Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  jupeb_pass: { code: "jupeb_pass", label: "JUPEB Premium — till exam (180 days)", amount: 3_99, currency: "USD", days: 180, provider: "stripe", stars: 150 },
  trcn_pass: { code: "trcn_pass", label: "TRCN PQE Premium — 90 days", amount: 2_99, currency: "USD", days: 90, provider: "stripe", stars: 150 },
  teachdig_pass: { code: "teachdig_pass", label: "Teacher digital skills Premium — 60 days", amount: 1_99, currency: "USD", days: 60, provider: "stripe", stars: 100 },
  gtle_pass: { code: "gtle_pass", label: "GTLE Premium — 90 days", amount: 2_99, currency: "USD", days: 90, provider: "stripe", stars: 150 },
  pcnpep_pass: { code: "pcnpep_pass", label: "PCN PEP Premium — 90 days", amount: 5_99, currency: "USD", days: 90, provider: "stripe", stars: 250 },
  mlscn_pass: { code: "mlscn_pass", label: "MLSCN Premium — 90 days", amount: 5_99, currency: "USD", days: 90, provider: "stripe", stars: 250 },
  nmcn_pass: { code: "nmcn_pass", label: "NMCN Premium — 90 days", amount: 5_99, currency: "USD", days: 90, provider: "stripe", stars: 250 },
  usmle_pass: { code: "usmle_pass", label: "USMLE Step 1 Premium — 90 days", amount: 29_99, currency: "USD", days: 90, provider: "stripe", stars: 1500 },
  gulfph_pass: { code: "gulfph_pass", label: "Gulf Pharmacist Premium — 90 days", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  gulfdr_pass: { code: "gulfdr_pass", label: "Gulf Doctor Premium — 90 days", amount: 24_99, currency: "USD", days: 90, provider: "stripe", stars: 1250 },
  uaedrv_pass: { code: "uaedrv_pass", label: "UAE Driving Theory Premium — 60 days", amount: 9_99, currency: "USD", days: 60, provider: "stripe", stars: 500 },
  tls_pass: { code: "tls_pass", label: "UAE Teacher Licence Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  gulflab_pass: { code: "gulflab_pass", label: "Gulf Lab Technologist Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  gulfpt_pass: { code: "gulfpt_pass", label: "Gulf Physiotherapist Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  gulfden_pass: { code: "gulfden_pass", label: "Gulf Dentist Premium — 90 days", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  pic_pass: { code: "pic_pass", label: "Dubai PIC Food Safety — 30 days", amount: 7_99, currency: "USD", days: 30, provider: "stripe", stars: 400 },
  sira_pass: { code: "sira_pass", label: "SIRA Security Guard — 30 days", amount: 7_99, currency: "USD", days: 30, provider: "stripe", stars: 400 },
  dmv_pass: { code: "dmv_pass", label: "DMV permit test Premium — 30 days", amount: 4_99, currency: "USD", days: 30, provider: "stripe", stars: 250 },
  ptcb_pass: { code: "ptcb_pass", label: "Pharmacy Tech (PTCB) Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  phleb_pass: { code: "phleb_pass", label: "Phlebotomy Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  ccma_pass: { code: "ccma_pass", label: "Medical Assistant (CCMA) Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  cpc_pass: { code: "cpc_pass", label: "Medical Coding (CPC) Premium — 90 days", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  nclexpn_pass: { code: "nclexpn_pass", label: "NCLEX-PN Premium — 90 days", amount: 19_99, currency: "USD", days: 90, provider: "stripe", stars: 1000 },
  hesi_pass: { code: "hesi_pass", label: "HESI A2 Premium — 60 days", amount: 14_99, currency: "USD", days: 60, provider: "stripe", stars: 750 },
  realest_pass: { code: "realest_pass", label: "Real Estate Licence Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  lifeins_pass: { code: "lifeins_pass", label: "Life & Health Insurance Premium — 60 days", amount: 12_99, currency: "USD", days: 60, provider: "stripe", stars: 650 },
  servsafe_pass: { code: "servsafe_pass", label: "ServSafe Manager Premium — 30 days", amount: 9_99, currency: "USD", days: 30, provider: "stripe", stars: 500 },
  epa608_pass: { code: "epa608_pass", label: "EPA 608 Premium — 30 days", amount: 9_99, currency: "USD", days: 30, provider: "stripe", stars: 500 },
  act_pass: { code: "act_pass", label: "ACT Premium — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  hiset_pass: { code: "hiset_pass", label: "HiSET Premium — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  praxis_pass: { code: "praxis_pass", label: "Praxis Core Premium — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  sie_pass: { code: "sie_pass", label: "SIE Premium — 90 days", amount: 14_99, currency: "USD", days: 90, provider: "stripe", stars: 750 },
  ssc_quarter: { code: "ssc_quarter", label: "SSC Premium — 90 days", amount: 2_99, currency: "USD", days: 90, provider: "stripe", stars: 125 },
  ssc_year: { code: "ssc_year", label: "SSC Premium — 12 months", amount: 5_99, currency: "USD", days: 365, provider: "stripe", stars: 300 },
  drive_pass: { code: "drive_pass", label: "Driving Theory — 30 days", amount: 6_99, currency: "USD", days: 30, provider: "stripe", stars: 350 },
  fse_pass: { code: "fse_pass", label: "Functional Skills English — 30 days", amount: 9_99, currency: "USD", days: 30, provider: "stripe", stars: 500 },
  fsm_pass: { code: "fsm_pass", label: "Functional Skills Maths — 30 days", amount: 9_99, currency: "USD", days: 30, provider: "stripe", stars: 500 },
  care_pass: { code: "care_pass", label: "Care Certificate Revision — 90 days", amount: 12_99, currency: "USD", days: 90, provider: "stripe", stars: 600 },
  citb_pass: { code: "citb_pass", label: "CITB HS&E Operatives Practice — 30 days", amount: 6_99, currency: "USD", days: 30, provider: "stripe", stars: 350 },
  sia_pass: { code: "sia_pass", label: "SIA Door Supervisor Revision — 30 days", amount: 9_99, currency: "USD", days: 30, provider: "stripe", stars: 500 },
  food_pass: { code: "food_pass", label: "Food Safety Level 2 Practice — 30 days", amount: 5_99, currency: "USD", days: 30, provider: "stripe", stars: 300 },
  carew_pass: { code: "carew_pass", label: "Care Workforce Essentials — 30 days", amount: 5_99, currency: "USD", days: 30, provider: "stripe", stars: 300 },
  hse_pass: { code: "hse_pass", label: "Workplace Health & Safety — 30 days", amount: 5_99, currency: "USD", days: 30, provider: "stripe", stars: 300 },

  itf_pass: { code: "itf_pass", label: "IT Support Fundamentals — 90 days", amount: 999, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  ccst_pass: { code: "ccst_pass", label: "Cisco CCST Networking Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  aws_pass: { code: "aws_pass", label: "AWS Cloud Practitioner Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  az900_pass: { code: "az900_pass", label: "Azure Fundamentals AZ-900 Practice — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  python_pass: { code: "python_pass", label: "Python Foundations — 90 days", amount: 999, currency: "USD", days: 90, provider: "stripe", stars: 500 },

  sec_pass: { code: "sec_pass", label: "CompTIA Security+ Premium — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  dat_pass: { code: "dat_pass", label: "Data Analyst — 90 days", amount: 1299, currency: "USD", days: 90, provider: "stripe", stars: 650 },
  aia_pass: { code: "aia_pass", label: "AI & Workplace Automation — 90 days", amount: 999, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  con_pass: { code: "con_pass", label: "Construction & Site Management — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  bkp_pass: { code: "bkp_pass", label: "Bookkeeping & Payroll — 90 days", amount: 9_99, currency: "USD", days: 90, provider: "stripe", stars: 500 },
  fire_individual: { code: "fire_individual", label: "Fire Marshal course + certificate (12 months)", amount: 18_99, currency: "USD", days: 365, provider: "stripe", stars: 1000 },
};

/** Seats bought by a tutor/company for their learners. All charged in USD via Stripe. */
// Keyed by the group's type ("GBP" = workplace/course groups, kept for existing rows); `currency` is what's charged.
export const SEATS: Record<SeatCurrency, { amount: number; currency: Currency; days: number; provider: "paystack" | "stripe"; per: string }> = {
  NGN: { amount: 99, currency: "USD", days: 30, provider: "stripe", per: "per student / 30 days" },
  GBP: { amount: 7_99, currency: "USD", days: 365, provider: "stripe", per: "per staff member / 12 months" },
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
