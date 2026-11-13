// A "track" is anything a learner prepares for: an exam, a test, a work course.
// Add a track here + its questions (subject code) and it works across bot, web, drills and mocks.
import { STATES } from "./subjects";

export type TrackCode = "JAMB" | "WAEC" | "PUTME" | "WASSCE_GH" | "ITF" | "CCST" | "AWS" | "AZF" | "PYT" | "LUK" | "FIRE" | "DRIVE" | "FSE" | "FSM" | "CARE" | "CITB" | "SIA" | "FOOD" | "CAREW" | "HSE" | "NMC" | "PM" | "ETH" | "SSC" | "SAT";
export type ScoreStyle = "jamb400" | "percent" | "passfail" | "esslce" | "marks";
export type TimeZone = "Africa/Lagos" | "Europe/London" | "Africa/Addis_Ababa" | "Asia/Kolkata" | "UTC";
/** Negative marking, e.g. SSC: +2 correct, −0.5 wrong */
export interface Marking { correct: number; wrong: number }

export interface MockVariant {
  key: string;
  label: string;
  short: string;
  subjects: string[];
  total: number;
  minutes: number;
  passPct?: number;
  note?: string;
  marking?: Marking;
}

export interface Track {
  code: TrackCode;
  name: string;
  short: string;
  emoji: string;
  kind: "school" | "citizenship" | "work" | "professional";
  region: "NG" | "GH" | "WA" | "UK" | "GLOBAL" | "ET" | "IN";
  currency: "NGN" | "GBP" | "ETB" | "INR" | "USD";
  subjectMode: "multi" | "single";
  subjects: string[];
  compulsory: string[];
  minSubjects: number;
  maxSubjects: number;
  subjectNote: string;
  mock: { perSubject?: number; total?: number; minutes: number; passPct?: number; scoreStyle: ScoreStyle; maxSubjects: number; marking?: Marking };
  weeklyMock: boolean;
  askState: boolean;
  /** Region list for the state/region question (defaults to Nigerian states) */
  regions?: string[];
  regionLabel?: string;
  askSchool: boolean;
  schoolLabel?: string;
  plans: string[];
  tagline: string;
  /** Courses: lessons in data/courses/<code>.json + certificate on passing the final test */
  course?: { certificateDays: number; certificateTitle: string };
  /** Hours are UK time for UK tracks, WAT otherwise */
  timeZone: TimeZone;
  /** Label for drill times, e.g. "Ethiopia time" */
  timeLabel?: string;
  /** Tracks whose real test has separate parts (e.g. NMC Part A / Part B) */
  mockVariants?: MockVariant[];
  /** Who the AI tutor is talking to */
  audience?: string;
}

const SCHOOL_SUBJECTS = ["ENG", "MTH", "PHY", "CHM", "BIO", "ECO", "GOV"];

export const GHANA_REGIONS = [
  "Ahafo", "Ashanti", "Bono", "Bono East", "Central", "Eastern", "Greater Accra", "North East",
  "Northern", "Oti", "Savannah", "Upper East", "Upper West", "Volta", "Western", "Western North",
];

export const TRACKS: Record<TrackCode, Track> = {
  JAMB: {
    code: "JAMB", name: "JAMB (UTME)", short: "JAMB", emoji: "🎓", kind: "school", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: SCHOOL_SUBJECTS, compulsory: ["ENG"], minSubjects: 4, maxSubjects: 4, subjectNote: "Use of English + 3 subjects (4 total)",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "jamb400", maxSubjects: 4 }, weeklyMock: true, askState: true, askSchool: true,
    plans: ["student_month", "student_season"], tagline: "Daily drills, CBT practice and Sunday Mock Night", timeZone: "Africa/Lagos",
  },
  WAEC: {
    code: "WAEC", name: "WAEC (WASSCE) — Nigeria", short: "WAEC", emoji: "📘", kind: "school", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: SCHOOL_SUBJECTS, compulsory: ["ENG", "MTH"], minSubjects: 4, maxSubjects: 6, subjectNote: "English + Maths + 2 to 4 more",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: true, askState: true, askSchool: true,
    plans: ["student_month", "student_season"], tagline: "Daily drills, CBT practice and Sunday Mock Night", timeZone: "Africa/Lagos",
  },
  PUTME: {
    code: "PUTME", name: "Post-UTME screening", short: "Post-UTME", emoji: "🏛️", kind: "school", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: SCHOOL_SUBJECTS, compulsory: ["ENG"], minSubjects: 4, maxSubjects: 4, subjectNote: "English + the 3 subjects for your course",
    mock: { perSubject: 12, minutes: 40, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: true, askSchool: true,
    schoolLabel: "Which university are you applying to?", plans: ["student_month", "student_season"],
    tagline: "Fast-paced timed tests to beat your university screening", timeZone: "Africa/Lagos",
  },
  WASSCE_GH: {
    code: "WASSCE_GH", name: "WASSCE — Ghana", short: "WASSCE Ghana", emoji: "🇬🇭", kind: "school", region: "GH", currency: "NGN",
    subjectMode: "multi", subjects: SCHOOL_SUBJECTS, compulsory: ["ENG", "MTH"], minSubjects: 4, maxSubjects: 6, subjectNote: "English + Core Maths + your electives",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: true, askState: true,
    regions: GHANA_REGIONS, regionLabel: "Which region are you in?", askSchool: true,
    plans: [], tagline: "Free daily drills, CBT practice and Sunday Mock Night", timeZone: "Africa/Lagos",
  },
  LUK: {
    code: "LUK", name: "Life in the UK Test", short: "Life in the UK", emoji: "🇬🇧", kind: "citizenship", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["LUK"], compulsory: ["LUK"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 24, minutes: 45, passPct: 75, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["luk_pass"], tagline: "Pass first time: 24-question mock tests, daily practice, readiness score", timeZone: "Europe/London",
  },
  FIRE: {
    code: "FIRE", name: "Fire Marshal / Fire Warden", short: "Fire Marshal", emoji: "🧯", kind: "work", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["FIR"], compulsory: ["FIR"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 30, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: true,
    schoolLabel: "Employer / workplace (optional)", plans: ["fire_individual"],
    tagline: "8 short modules, a final assessment and a certificate valid for 12 months", timeZone: "Europe/London",
    course: { certificateDays: 365, certificateTitle: "Fire Marshal / Fire Warden Training" },
  },
  DRIVE: {
    code: "DRIVE", name: "UK Driving Theory", short: "Driving Theory",
    emoji: "🚗", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["DRV"], compulsory: ["DRV"],
    minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 50, minutes: 57, passPct: 86, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["drive_pass"],
    tagline: "Practise UK driving theory multiple-choice questions and build test confidence",
    timeZone: "Europe/London",
    audience: "UK car driving theory test candidates",
  },

  FSE: {
    code: "FSE", name: "Functional Skills English", short: "Functional English",
    emoji: "📖", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "multi", subjects: ["FSE1", "FSE2"],
    compulsory: [], minSubjects: 1, maxSubjects: 1,
    subjectNote: "Choose Level 1 or Level 2",
    mock: { total: 20, minutes: 45, passPct: 60, scoreStyle: "percent", maxSubjects: 1 },
    mockVariants: [
      { key: "L1", label: "Level 1", short: "Level 1", subjects: ["FSE1"], total: 20, minutes: 45, passPct: 60, note: "20 questions · 45 minutes · practice target 60%" },
      { key: "L2", label: "Level 2", short: "Level 2", subjects: ["FSE2"], total: 20, minutes: 45, passPct: 60, note: "20 questions · 45 minutes · practice target 60%" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["fse_pass"],
    tagline: "Build English skills with Level 1 and Level 2 practice",
    timeZone: "Europe/London",
  },

  FSM: {
    code: "FSM", name: "Functional Skills Maths", short: "Functional Maths",
    emoji: "🔢", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "multi", subjects: ["FSM1", "FSM2"],
    compulsory: [], minSubjects: 1, maxSubjects: 1,
    subjectNote: "Choose Level 1 or Level 2",
    mock: { total: 20, minutes: 45, passPct: 60, scoreStyle: "percent", maxSubjects: 1 },
    mockVariants: [
      { key: "L1", label: "Level 1", short: "Level 1", subjects: ["FSM1"], total: 20, minutes: 45, passPct: 60, note: "20 questions · 45 minutes · practice target 60%" },
      { key: "L2", label: "Level 2", short: "Level 2", subjects: ["FSM2"], total: 20, minutes: 45, passPct: 60, note: "20 questions · 45 minutes · practice target 60%" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["fsm_pass"],
    tagline: "Practise essential maths skills at Level 1 and Level 2",
    timeZone: "Europe/London",
  },

  CARE: {
    code: "CARE", name: "Care Certificate Revision", short: "Care Certificate",
    emoji: "🩺", kind: "work", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["CAR"], compulsory: ["CAR"],
    minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 45, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["care_pass"],
    tagline: "Revise the Care Certificate standards with practice questions",
    timeZone: "Europe/London",
    audience: "People undertaking Care Certificate learning and workplace assessment",
  },

  CITB: {
    code: "CITB", name: "CITB HS&E — Operatives Practice", short: "CITB Operatives",
    emoji: "🏗️", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["CTH"], compulsory: ["CTH"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 50, minutes: 45, passPct: 90, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["citb_pass"],
    tagline: "Original practice for construction health, safety and environmental awareness",
    timeZone: "Europe/London", audience: "a construction worker preparing for the CITB Health, Safety and Environment Operatives test",
  },
  SIA: {
    code: "SIA", name: "SIA Door Supervisor — Revision", short: "SIA Door Supervisor",
    emoji: "🛡️", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["SIAQ"], compulsory: ["SIAQ"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 40, minutes: 60, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["sia_pass"],
    tagline: "Practice security knowledge, communication, conflict management and safeguarding",
    timeZone: "Europe/London", audience: "a learner revising for an SIA Door Supervisor licence-linked qualification",
  },
  FOOD: {
    code: "FOOD", name: "Food Safety & Hygiene — Level 2 Practice", short: "Food Safety Level 2",
    emoji: "🥗", kind: "work", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["FOD"], compulsory: ["FOD"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 40, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["food_pass"],
    tagline: "Practise food hygiene, contamination control, temperature safety and allergens",
    timeZone: "Europe/London", audience: "a food handler or supervisor studying food safety and hygiene at Level 2 depth",
  },
  CAREW: {
    code: "CAREW", name: "Care Workforce Essentials", short: "Care Workforce",
    emoji: "🤝", kind: "work", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["CWR"], compulsory: ["CWR"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 45, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["carew_pass"],
    tagline: "Practical care scenarios covering dignity, safeguarding, communication and safe support",
    timeZone: "Europe/London", audience: "a new or developing adult social care worker revising practical care knowledge",
  },
  HSE: {
    code: "HSE", name: "Workplace Health & Safety Essentials", short: "Workplace H&S",
    emoji: "🦺", kind: "work", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["WHS"], compulsory: ["WHS"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 40, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["hse_pass"],
    tagline: "Build practical knowledge of risk assessment, COSHH, PPE and workplace hazards",
    timeZone: "Europe/London", audience: "a UK worker building general workplace health and safety awareness",
  },

  ITF: {
    code: "ITF", name: "IT Support Fundamentals", short: "IT Support",
    emoji: "🖥️", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["ITF"], compulsory: ["ITF"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["itf_pass"],
    tagline: "Original entry-level IT support practice: devices, operating systems, helpdesk and troubleshooting",
    timeZone: "UTC", timeLabel: "UTC", audience: "a beginner preparing for an entry-level IT support or helpdesk role",
  },
  CCST: {
    code: "CCST", name: "Cisco CCST Networking (100-150) Practice", short: "CCST Networking",
    emoji: "🌐", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["CCN"], compulsory: ["CCN"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["ccst_pass"],
    tagline: "Original practice mapped to Cisco's published CCST Networking exam topics",
    timeZone: "UTC", timeLabel: "UTC", audience: "a learner preparing for Cisco CCST Networking exam 100-150",
  },
  AWS: {
    code: "AWS", name: "AWS Certified Cloud Practitioner (CLF-C02) Practice", short: "AWS Cloud Practitioner",
    emoji: "☁️", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["AWC"], compulsory: ["AWC"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["aws_pass"],
    tagline: "Original practice across cloud concepts, security, services and billing",
    timeZone: "UTC", timeLabel: "UTC", audience: "a beginner preparing for the AWS Certified Cloud Practitioner CLF-C02 exam",
  },
  AZF: {
    code: "AZF", name: "Microsoft Azure Fundamentals (AZ-900) Practice", short: "Azure Fundamentals",
    emoji: "🔷", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["AZF"], compulsory: ["AZF"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["az900_pass"],
    tagline: "Original practice aligned to the current AZ-900 skills-measured guide",
    timeZone: "UTC", timeLabel: "UTC", audience: "a learner preparing for Microsoft Azure Fundamentals AZ-900",
  },
  PYT: {
    code: "PYT", name: "Python Programming Foundations (PCEP-30-03 aligned)", short: "Python Foundations",
    emoji: "🐍", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["PCE"], compulsory: ["PCE"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["python_pass"],
    tagline: "Original Python practice across syntax, control flow, collections, functions and files",
    timeZone: "UTC", timeLabel: "UTC", audience: "a beginner learning Python and preparing for Python Institute PCEP-30-03",
  },
  NMC: {
    code: "NMC", name: "NMC CBT (nursing)", short: "NMC CBT", emoji: "🩺", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["NMN", "NMC"], compulsory: ["NMN", "NMC"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    // Default/headline mock = Part B (clinical). Variants below are offered as separate practice tests.
    mock: { total: 100, minutes: 150, passPct: 65, scoreStyle: "passfail", maxSubjects: 1 },
    mockVariants: [
      { key: "A", label: "Part A — Numeracy", short: "Part A", subjects: ["NMN"], total: 15, minutes: 30, passPct: 87, note: "15 questions · 30 min · 13 to pass" },
      { key: "B", label: "Part B — Clinical", short: "Part B", subjects: ["NMC"], total: 100, minutes: 150, passPct: 65, note: "100 questions · 2 h 30 min · practice pass mark 65%" },
      { key: "B50", label: "Part B — Quick 50", short: "Quick 50", subjects: ["NMC"], total: 50, minutes: 75, passPct: 65, note: "50 questions · 75 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["nmc_pass"], tagline: "Part A numeracy and Part B clinical practice tests for the NMC CBT", timeZone: "Europe/London",
    audience: "an internationally educated nurse preparing for the UK NMC CBT (Test of Competence Part 1)",
  },
  PM: {
    code: "PM", name: "Project Management (PRINCE2, Scrum, CAPM)", short: "Project Management", emoji: "📋", kind: "professional", region: "GLOBAL", currency: "GBP",
    subjectMode: "multi", subjects: ["PRN", "SCR", "PMF"], compulsory: [], minSubjects: 1, maxSubjects: 3, subjectNote: "Pick the certifications you're preparing for",
    mock: { total: 60, minutes: 60, passPct: 60, scoreStyle: "passfail", maxSubjects: 1 },
    mockVariants: [
      { key: "PRN", label: "PRINCE2® 7 Foundation", short: "PRINCE2", subjects: ["PRN"], total: 60, minutes: 60, passPct: 60, note: "60 questions · 60 min · 36 to pass" },
      { key: "SCR", label: "Scrum — PSM I style", short: "Scrum", subjects: ["SCR"], total: 80, minutes: 60, passPct: 85, note: "80 questions · 60 min · 85% to pass" },
      { key: "PMF", label: "CAPM-style fundamentals", short: "CAPM", subjects: ["PMF"], total: 50, minutes: 60, passPct: 70, note: "50 questions · 60 min · practice target 70%" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["pm_pass", "pm_pass_ngn"], tagline: "PRINCE2 Foundation, Scrum PSM I and CAPM practice tests", timeZone: "Europe/London",
    audience: "a working professional preparing for project management certifications (PRINCE2 7 Foundation, Scrum.org PSM I, PMI CAPM)",
  },
  ETH: {
    code: "ETH", name: "Ethiopia Grade 12 National Exam", short: "Grade 12 Ethiopia", emoji: "🇪🇹", kind: "school", region: "ET", currency: "ETB",
    subjectMode: "multi", subjects: ["ENG", "MTH", "APT", "BIO", "CHM", "PHY", "ECO", "GEO", "HIS"], compulsory: ["ENG", "MTH", "APT"], minSubjects: 6, maxSubjects: 6,
    subjectNote: "English, Maths and Aptitude + your 3 stream subjects (Natural: Biology, Chemistry, Physics · Social: Economics, Geography, History)",
    mock: { perSubject: 15, minutes: 90, passPct: 50, scoreStyle: "esslce", maxSubjects: 6 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["eth_month", "eth_season"], tagline: "Grade 12 national exam practice: daily questions and timed CBT tests", timeZone: "Africa/Addis_Ababa", timeLabel: "Ethiopia",
    audience: "an Ethiopian Grade 12 student preparing for the national university entrance exam (ESSLCE), taught in English",
  },
  SSC: {
    code: "SSC", name: "SSC CGL / CHSL (India)", short: "SSC CGL", emoji: "🇮🇳", kind: "professional", region: "IN", currency: "INR",
    subjectMode: "multi", subjects: ["APT", "GAI", "QNT", "ENG"], compulsory: ["APT", "GAI", "QNT", "ENG"], minSubjects: 4, maxSubjects: 4,
    subjectNote: "All four Tier 1 sections",
    mock: { perSubject: 25, minutes: 60, scoreStyle: "marks", maxSubjects: 4, marking: { correct: 2, wrong: 0.5 } },
    mockVariants: [
      { key: "T1", label: "Tier 1 full mock", short: "Tier 1", subjects: ["APT", "GAI", "QNT", "ENG"], total: 25, minutes: 60, marking: { correct: 2, wrong: 0.5 }, note: "100 questions · 60 min · +2 / −0.5" },
      { key: "QA", label: "Quant sectional", short: "Quant", subjects: ["QNT"], total: 25, minutes: 20, marking: { correct: 2, wrong: 0.5 }, note: "25 questions · 20 min" },
      { key: "RS", label: "Reasoning sectional", short: "Reasoning", subjects: ["APT"], total: 25, minutes: 15, marking: { correct: 2, wrong: 0.5 }, note: "25 questions · 15 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["ssc_quarter", "ssc_year"], tagline: "SSC CGL Tier 1 mocks with negative marking, daily questions and sectionals", timeZone: "Asia/Kolkata", timeLabel: "India (IST)",
    audience: "an Indian candidate preparing for SSC CGL/CHSL and similar government job exams (reasoning, quantitative aptitude, English, general awareness)",
  },
  SAT: {
    code: "SAT", name: "Digital SAT", short: "Digital SAT", emoji: "🌐", kind: "school", region: "GLOBAL", currency: "GBP",
    subjectMode: "single", subjects: ["SRW", "SMT"], compulsory: ["SRW", "SMT"], minSubjects: 2, maxSubjects: 2,
    subjectNote: "Both Reading and Writing and Math are included",
    mock: { total: 27, minutes: 32, scoreStyle: "percent", maxSubjects: 1 },
    mockVariants: [
      { key: "RW", label: "Reading and Writing — Module 1 practice", short: "Reading & Writing", subjects: ["SRW"], total: 27, minutes: 32, note: "27 original questions · 32 minutes · Module 1 practice" },
      { key: "MATH", label: "Math — Module 1 practice", short: "Math", subjects: ["SMT"], total: 22, minutes: 35, note: "22 original questions · 35 minutes · Module 1 practice" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: [], tagline: "Original Digital SAT-style daily drills and timed section practice", timeZone: "UTC", timeLabel: "UTC",
    audience: "a global student preparing for the College Board Digital SAT, with original practice questions rather than copied official test items",
  },
};

export const TRACK_LIST = Object.values(TRACKS);
export const TECH_TRACK_CODES = ["ITF", "CCST", "AWS", "AZF", "PYT"] as const;
export const SCHOOL_TRACKS = TRACK_LIST.filter((t) => t.weeklyMock).map((t) => t.code);
export const UK_TIME_TRACKS = TRACK_LIST.filter((t) => t.timeZone === "Europe/London").map((t) => t.code);

/** e.g. "UK", "Nigeria", "Ethiopia" — used in "What time should your daily practice arrive? (… time)" */
export function timeLabelFor(t: Track) {
  return t.timeLabel ?? (t.timeZone === "Europe/London" ? "UK" : t.region === "GH" ? "West Africa (Lagos)" : "Nigeria");
}

/** Track codes grouped by the time zone their drill hour is in */
export function tracksByZone(): Record<string, string[]> {
  const out: Record<string, string[]> = {};
  for (const t of TRACK_LIST) (out[t.timeZone] ??= []).push(t.code);
  return out;
}

export function getTrack(code: string | null | undefined): Track {
  return TRACKS[(code as TrackCode) ?? "JAMB"] ?? TRACKS.JAMB;
}

export function regionsFor(t: Track) {
  return t.regions ?? STATES;
}

/** Questions per subject in a practice mock. */
export function mockPerSubject(t: Track) {
  return t.subjectMode === "single" ? t.mock.total! : t.mock.perSubject!;
}

/** Mock settings for a track, or one of its variants (NMC Part A / Part B). */
export function mockConfig(t: Track, variantKey?: string | null) {
  const v = variantKey ? t.mockVariants?.find((x) => x.key === variantKey) : undefined;
  if (v) return { variant: v.key, label: v.label, subjects: v.subjects, perSubject: v.total, minutes: v.minutes, passPct: v.passPct, scoreStyle: t.mock.scoreStyle, marking: v.marking ?? t.mock.marking };
  if (t.mockVariants?.length) {
    const d = t.mockVariants.find((x) => x.key === "B") ?? t.mockVariants[0];
    return { variant: d.key, label: d.label, subjects: d.subjects, perSubject: d.total, minutes: d.minutes, passPct: d.passPct, scoreStyle: t.mock.scoreStyle, marking: d.marking ?? t.mock.marking };
  }
  return { variant: null, label: null, subjects: null as string[] | null, perSubject: mockPerSubject(t), minutes: t.mock.minutes, passPct: t.mock.passPct, scoreStyle: t.mock.scoreStyle, marking: t.mock.marking };
}

/** Practice-test variants relevant to this learner (multi-subject tracks only show variants for chosen subjects). */
export function variantsFor(t: Track, subjects: string[]): MockVariant[] {
  const all = t.mockVariants ?? [];
  if (t.subjectMode !== "multi") return all;
  const mine = all.filter((v) => v.subjects.some((s) => subjects.includes(s)));
  return mine.length ? mine : all;
}
