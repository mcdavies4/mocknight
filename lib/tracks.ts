// A "track" is anything a learner prepares for: an exam, a test, a work course.
// Add a track here + its questions (subject code) and it works across bot, web, drills and mocks.
import { STATES } from "./subjects";

export type TrackCode = "JAMB" | "WAEC" | "PUTME" | "WASSCE_GH" | "ITF" | "CCST" | "AWS" | "AZF" | "PYT" | "SEC" | "DAT" | "AIA" | "CON" | "BKP" | "LUK" | "FIRE" | "DRIVE" | "FSE" | "FSM" | "CARE" | "CITB" | "SIA" | "FOOD" | "CAREW" | "HSE" | "NMC" | "PM" | "ETH" | "SSC" | "SAT" | "NCLEX" | "PLAB" | "USCIT" | "CANCIT" | "AUSCIT" | "GULFN" | "IELTS" | "GRAD" | "IBPS" | "ACCA" | "ICAN" | "ITIL" | "SIXSIG" | "ELEVEN" | "NECO" | "OET" | "UCAT" | "KCSE" | "BECE" | "MDCAT" | "NEET" | "JEE" | "GRE" | "CSEPH" | "AAT" | "NGREC" | "NCEE" | "JSCE" | "NGCS" | "PTE" | "CELPIP" | "IOSH" | "OILGAS" | "NDT" | "WELDINSP" | "APIINSP" | "COATING" | "ETEXIT" | "CSEE" | "UCE" | "CMGCE" | "SALEARN" | "MATRIC" | "KCPA" | "CARESR" | "FIRSTAID" | "SERU" | "HGV" | "ELEC18" | "EYTA" | "WAREHOUSE" | "NHSHCA" | "BA" | "ISC2CC" | "AWSSAA" | "AICERT" | "SFADMIN" | "GED" | "TEAS" | "CNA" | "ASVAB" | "UPSC" | "RRB" | "CTET" | "CAT" | "GCSE" | "CSJT" | "TOEFL" | "DUOLINGO" | "CDL" | "G1ON" | "APLUS" | "CCNA" | "JUPEB" | "NABTEB" | "NMCN" | "USMLE" | "GULFPH" | "GULFDR" | "UAEDRV" | "UAETLS" | "GULFLAB" | "GULFPT" | "GULFDEN" | "DUBAIPIC" | "SIRA" | "DMVCA" | "DMVTX" | "DMVFL" | "DMVNY" | "DMVGA" | "PTCB" | "PHLEB" | "CCMA" | "CPC" | "NCLEXPN" | "HESI" | "REALEST" | "LIFEINS" | "SERVSAFE" | "EPA608" | "ACT" | "HISET" | "PRAXIS" | "SIE" | "UACE" | "ACSEE" | "RWA6" | "CPAUG" | "CPATZ" | "KEDRV" | "UGDRV" | "TZDRV" | "RWDRV" | "GCPCDL" | "AZ104" | "CISSP" | "DEVOPS" | "DIGMKT" | "HRCERT" | "PSPO";
export type ScoreStyle = "jamb400" | "percent" | "passfail" | "esslce" | "marks";
export type TimeZone = "Africa/Lagos" | "Europe/London" | "Africa/Addis_Ababa" | "Asia/Kolkata" | "UTC" | "America/New_York" | "America/Toronto" | "Australia/Sydney" | "Asia/Dubai" | "Africa/Nairobi" | "Asia/Karachi" | "Asia/Manila" | "Africa/Johannesburg";
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
  region: "NG" | "GH" | "WA" | "UK" | "GLOBAL" | "ET" | "IN" | "US" | "CA" | "AU" | "GULF" | "KE" | "PK" | "PH" | "TZ" | "UG" | "CM" | "ZA" | "RW";
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
    mock: { total: 40, minutes: 45, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["itf_pass"],
    tagline: "Original entry-level IT support practice: devices, operating systems, helpdesk and troubleshooting",
    timeZone: "UTC", timeLabel: "UTC", audience: "a beginner preparing for an entry-level IT support or helpdesk role",
  },
  CCST: {
    code: "CCST", name: "Cisco CCST Networking (100-150) Practice", short: "CCST Networking",
    emoji: "🌐", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["CCN"], compulsory: ["CCN"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 50, minutes: 50, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["ccst_pass"],
    tagline: "Original practice mapped to Cisco's published CCST Networking exam topics",
    timeZone: "UTC", timeLabel: "UTC", audience: "a learner preparing for Cisco CCST Networking exam 100-150",
  },
  AWS: {
    code: "AWS", name: "AWS Certified Cloud Practitioner (CLF-C02) Practice", short: "AWS Cloud Practitioner",
    emoji: "☁️", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["AWC"], compulsory: ["AWC"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 65, minutes: 90, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["aws_pass"],
    tagline: "Original practice across cloud concepts, security, services and billing",
    timeZone: "UTC", timeLabel: "UTC", audience: "a beginner preparing for the AWS Certified Cloud Practitioner CLF-C02 exam",
  },
  AZF: {
    code: "AZF", name: "Microsoft Azure Fundamentals (AZ-900) Practice", short: "Azure Fundamentals",
    emoji: "🔷", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["AZF"], compulsory: ["AZF"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 40, minutes: 45, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["az900_pass"],
    tagline: "Original practice aligned to the current AZ-900 skills-measured guide",
    timeZone: "UTC", timeLabel: "UTC", audience: "a learner preparing for Microsoft Azure Fundamentals AZ-900",
  },
  PYT: {
    code: "PYT", name: "Python Programming Foundations (PCEP-30-03 aligned)", short: "Python Foundations",
    emoji: "🐍", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["PCE"], compulsory: ["PCE"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 40, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["python_pass"],
    tagline: "Original Python practice across syntax, control flow, collections, functions and files",
    timeZone: "UTC", timeLabel: "UTC", audience: "a beginner learning Python and preparing for Python Institute PCEP-30-03",
  },
  SEC: {
    code: "SEC", name: "CompTIA Security+ (SY0-701)", short: "Security+",
    emoji: "🔐", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["SYP", "SECQ"], compulsory: ["SYP", "SECQ"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 45, minutes: 60, passPct: 75, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["sec_pass"],
    tagline: "CompTIA Security+ practice: cryptography, PKI, attacks, controls, architecture, operations and risk calculations",
    timeZone: "UTC", timeLabel: "UTC", audience: "a learner preparing for CompTIA Security+ SY0-701 or building foundational cybersecurity knowledge",
  },
  DAT: {
    code: "DAT", name: "Data Analyst (SQL, Excel, Power BI PL-300, Tableau, statistics)", short: "Data Analyst",
    emoji: "📊", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "multi", subjects: ["DAQ", "SQQ", "XLQ", "PBI", "TBL", "STQ"], compulsory: [], minSubjects: 1, maxSubjects: 6,
    subjectNote: "Pick the skills and exams you're working on",
    mock: { perSubject: 10, minutes: 30, passPct: 70, scoreStyle: "passfail", maxSubjects: 6 },
    mockVariants: [
      { key: "SQL", label: "SQL test", short: "SQL", subjects: ["SQQ"], total: 25, minutes: 30, passPct: 70, note: "25 questions · 30 min" },
      { key: "XL", label: "Excel test (MO-200 style)", short: "Excel", subjects: ["XLQ"], total: 25, minutes: 30, passPct: 70, note: "25 questions · 30 min" },
      { key: "PL300", label: "Power BI PL-300 practice", short: "PL-300", subjects: ["PBI", "DAQ"], total: 25, minutes: 100, passPct: 70, note: "50 questions · 100 min" },
      { key: "TAB", label: "Tableau Desktop Specialist practice", short: "Tableau", subjects: ["TBL", "DAQ"], total: 15, minutes: 45, passPct: 75, note: "30 questions · 45 min" },
      { key: "STAT", label: "Statistics test", short: "Statistics", subjects: ["STQ"], total: 20, minutes: 25, passPct: 70, note: "20 questions · 25 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false, plans: ["dat_pass"],
    tagline: "Become a data analyst: SQL, Excel, Power BI PL-300, Tableau and statistics, with worked answers",
    timeZone: "UTC", timeLabel: "UTC", audience: "someone training to become a data analyst, practising SQL, Excel, Power BI (PL-300), Tableau and statistics",
  },
  AIA: {
    code: "AIA", name: "AI & Workplace Automation", short: "AI & Automation",
    emoji: "🤖", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["AIQ"], compulsory: ["AIQ"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["aia_pass"],
    tagline: "AI literacy, prompting, verification, responsible use and workflow automation",
    timeZone: "UTC", timeLabel: "UTC", audience: "a professional learning to use AI tools responsibly at work",
  },
  CON: {
    code: "CON", name: "Construction & Site Management Essentials", short: "Site Management",
    emoji: "🏗️", kind: "work", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["CONQ"], compulsory: ["CONQ"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["con_pass"],
    tagline: "Site safety, risk controls, coordination, quality and documentation practice",
    timeZone: "Europe/London", audience: "a construction worker or aspiring site supervisor",
  },
  BKP: {
    code: "BKP", name: "Bookkeeping & Payroll Foundations", short: "Bookkeeping & Payroll",
    emoji: "🧾", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["BKQ"], compulsory: ["BKQ"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 10, minutes: 15, passPct: 70, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false, plans: ["bkp_pass"],
    tagline: "Double-entry, invoices, reconciliations, payroll calculations and controls",
    timeZone: "Europe/London", audience: "a learner building entry-level bookkeeping and payroll knowledge",
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
  USCIT: {
    code: "USCIT", name: "US Citizenship Test (civics)", short: "US Citizenship", emoji: "🇺🇸", kind: "citizenship", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["USC"], compulsory: ["USC"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 20, passPct: 60, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["us_cit"], tagline: "US naturalization civics practice: American government, history and symbols", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "an immigrant preparing for the USCIS naturalization civics test",
  },
  CANCIT: {
    code: "CANCIT", name: "Canadian Citizenship Test", short: "Canada Citizenship", emoji: "🇨🇦", kind: "citizenship", region: "CA", currency: "USD",
    subjectMode: "single", subjects: ["CAN"], compulsory: ["CAN"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 30, passPct: 75, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["ca_cit"], tagline: "Discover Canada practice: 20-question tests, 15 correct to pass", timeZone: "America/Toronto", timeLabel: "Canada Eastern",
    audience: "a permanent resident preparing for the Canadian citizenship test based on the Discover Canada guide",
  },
  AUSCIT: {
    code: "AUSCIT", name: "Australian Citizenship Test", short: "Australia Citizenship", emoji: "🇦🇺", kind: "citizenship", region: "AU", currency: "USD",
    subjectMode: "single", subjects: ["AUS"], compulsory: ["AUS"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 45, passPct: 75, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["au_cit"], tagline: "Our Common Bond practice: Australian values, government and history", timeZone: "Australia/Sydney", timeLabel: "Sydney",
    audience: "a permanent resident preparing for the Australian citizenship test based on 'Australian Citizenship: Our Common Bond'",
  },
  GULFN: {
    code: "GULFN", name: "Gulf nursing licence (DHA, DOH/HAAD, SCFHS, QCHP — Prometric)", short: "Gulf Nursing", emoji: "🕌", kind: "professional", region: "GULF", currency: "USD",
    subjectMode: "single", subjects: ["GNX", "NMC"], compulsory: ["GNX", "NMC"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 100, minutes: 120, passPct: 60, scoreStyle: "passfail", maxSubjects: 1 },
    mockVariants: [
      { key: "FULL", label: "Prometric-style practice — 100 questions", short: "Full 100", subjects: ["GNX", "NMC"], total: 50, minutes: 120, passPct: 60, note: "100 questions · 2 hours · practice pass mark 60%" },
      { key: "Q30", label: "Quick 30", short: "Quick 30", subjects: ["GNX"], total: 30, minutes: 40, passPct: 60, note: "30 questions · 40 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["gulf_pass"], tagline: "Prometric practice for nurses moving to the UAE, Saudi Arabia, Qatar, Oman and Kuwait", timeZone: "Asia/Dubai", timeLabel: "Gulf (UAE)",
    audience: "an internationally educated nurse preparing for a Gulf nursing licence exam (DHA, DOH/HAAD, SCFHS, QCHP, Prometric), using SI units and international nursing practice",
  },
  IELTS: {
    code: "IELTS", name: "IELTS (grammar, vocabulary & AI-marked writing)", short: "IELTS", emoji: "📝", kind: "professional", region: "GLOBAL", currency: "GBP",
    subjectMode: "single", subjects: ["IEV"], compulsory: ["IEV"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 40, minutes: 40, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["ielts_pass"], tagline: "Daily grammar and vocabulary drills plus Writing Task 2 marking with a band estimate", timeZone: "UTC", timeLabel: "UTC",
    audience: "an adult preparing for IELTS Academic or General Training to study, work or migrate abroad",
  },
  GRAD: {
    code: "GRAD", name: "Graduate aptitude tests (SHL-style numerical, verbal, logical)", short: "Graduate Aptitude", emoji: "💼", kind: "professional", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: ["QNT", "VRB", "APT"], compulsory: ["QNT", "VRB", "APT"], minSubjects: 3, maxSubjects: 3, subjectNote: "Numerical, verbal and logical reasoning",
    mock: { perSubject: 15, minutes: 45, scoreStyle: "percent", maxSubjects: 3 },
    mockVariants: [
      { key: "ALL", label: "Full aptitude assessment", short: "Full test", subjects: ["QNT", "VRB", "APT"], total: 15, minutes: 45, note: "45 questions · 45 min" },
      { key: "NUM", label: "Numerical reasoning", short: "Numerical", subjects: ["QNT"], total: 20, minutes: 25, note: "20 questions · 25 min" },
      { key: "VER", label: "Verbal reasoning", short: "Verbal", subjects: ["VRB"], total: 20, minutes: 20, note: "20 questions · 20 min" },
      { key: "LOG", label: "Logical reasoning", short: "Logical", subjects: ["APT"], total: 20, minutes: 20, note: "20 questions · 20 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["grad_pass"], tagline: "Pass bank, oil & gas and Big 4 graduate assessments: timed numerical, verbal and logical tests", timeZone: "Africa/Lagos",
    audience: "a graduate preparing for employer aptitude tests (SHL/Kenexa/Cubiks style numerical, verbal and logical reasoning) for graduate trainee jobs",
  },
  IBPS: {
    code: "IBPS", name: "IBPS PO / SBI PO (India banking)", short: "Bank PO", emoji: "🏦", kind: "professional", region: "IN", currency: "INR",
    subjectMode: "multi", subjects: ["APT", "QNT", "ENG"], compulsory: ["APT", "QNT", "ENG"], minSubjects: 3, maxSubjects: 3, subjectNote: "Reasoning, Quantitative Aptitude and English",
    mock: { perSubject: 33, minutes: 60, scoreStyle: "marks", maxSubjects: 3, marking: { correct: 1, wrong: 0.25 } }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["ibps_quarter"], tagline: "Bank PO prelims mocks with negative marking: reasoning, quant and English", timeZone: "Asia/Kolkata", timeLabel: "India (IST)",
    audience: "an Indian candidate preparing for IBPS PO / SBI PO banking exams (reasoning, quantitative aptitude, English)",
  },
  ACCA: {
    code: "ACCA", name: "ACCA Applied Knowledge (BT, MA, FA)", short: "ACCA", emoji: "📒", kind: "professional", region: "GLOBAL", currency: "GBP",
    subjectMode: "multi", subjects: ["ABT", "AMA", "AFA"], compulsory: [], minSubjects: 1, maxSubjects: 3, subjectNote: "Pick the papers you're sitting",
    mock: { total: 50, minutes: 120, passPct: 50, scoreStyle: "passfail", maxSubjects: 1 },
    mockVariants: [
      { key: "BT", label: "Business & Technology", short: "BT", subjects: ["ABT"], total: 50, minutes: 120, passPct: 50, note: "50 questions · 2 hours · 50% to pass" },
      { key: "MA", label: "Management Accounting", short: "MA", subjects: ["AMA"], total: 50, minutes: 120, passPct: 50, note: "50 questions · 2 hours · 50% to pass" },
      { key: "FA", label: "Financial Accounting", short: "FA", subjects: ["AFA"], total: 50, minutes: 120, passPct: 50, note: "50 questions · 2 hours · 50% to pass" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["acca_pass"], tagline: "ACCA BT, MA and FA practice with worked calculations", timeZone: "Europe/London",
    audience: "an ACCA student preparing for the Applied Knowledge computer-based exams (Business & Technology, Management Accounting, Financial Accounting)",
  },
  ICAN: {
    code: "ICAN", name: "ICAN Foundation (Nigeria)", short: "ICAN", emoji: "🧮", kind: "professional", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: ["ABT", "AMA", "AFA"], compulsory: [], minSubjects: 1, maxSubjects: 3, subjectNote: "Business & Finance, Management Information, Financial Accounting",
    mock: { total: 50, minutes: 90, passPct: 50, scoreStyle: "passfail", maxSubjects: 1 },
    mockVariants: [
      { key: "BF", label: "Business, Management & Finance", short: "Business", subjects: ["ABT"], total: 50, minutes: 90, passPct: 50, note: "50 questions · 90 min" },
      { key: "MI", label: "Management Information", short: "Mgt info", subjects: ["AMA"], total: 50, minutes: 90, passPct: 50, note: "50 questions · 90 min" },
      { key: "FA", label: "Financial Accounting", short: "Fin acct", subjects: ["AFA"], total: 50, minutes: 90, passPct: 50, note: "50 questions · 90 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["ican_pass"], tagline: "ICAN Foundation practice: accounting, costing and business questions with working", timeZone: "Africa/Lagos",
    audience: "a Nigerian student preparing for the ICAN Foundation level exams",
  },
  ITIL: {
    code: "ITIL", name: "ITIL 4 Foundation", short: "ITIL 4", emoji: "🛠️", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["ITL"], compulsory: ["ITL"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 40, minutes: 60, passPct: 65, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["itil_pass"], tagline: "ITIL 4 Foundation practice: 40 questions, 60 minutes, 26 to pass", timeZone: "UTC", timeLabel: "UTC",
    audience: "an IT professional preparing for the ITIL 4 Foundation exam",
  },
  SIXSIG: {
    code: "SIXSIG", name: "Lean Six Sigma Green Belt", short: "Six Sigma", emoji: "📈", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["SSG"], compulsory: ["SSG"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 50, minutes: 90, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["sixsig_pass"], tagline: "Green Belt practice: DMAIC, Lean tools, statistics and DPMO calculations", timeZone: "UTC", timeLabel: "UTC",
    audience: "a professional preparing for a Lean Six Sigma Green Belt certification exam",
  },
  ELEVEN: {
    code: "ELEVEN", name: "UK 11+ (verbal reasoning & maths)", short: "11+", emoji: "🎒", kind: "school", region: "UK", currency: "GBP",
    subjectMode: "multi", subjects: ["VRS", "ELM"], compulsory: ["VRS", "ELM"], minSubjects: 2, maxSubjects: 2, subjectNote: "Verbal reasoning + maths",
    mock: { perSubject: 25, minutes: 50, scoreStyle: "percent", maxSubjects: 2 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["eleven_pass"], tagline: "11+ practice for grammar school entry: verbal reasoning and maths, a little every day", timeZone: "Europe/London",
    audience: "a 10-year-old child in England preparing for the 11+ grammar school entrance test (GL-style verbal reasoning and KS2 maths); keep language simple and encouraging",
  },
  NECO: {
    code: "NECO", name: "NECO (SSCE) — Nigeria", short: "NECO", emoji: "📗", kind: "school", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: SCHOOL_SUBJECTS, compulsory: ["ENG", "MTH"], minSubjects: 4, maxSubjects: 6, subjectNote: "English + Maths + 2 to 4 more",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: true, askSchool: true,
    plans: ["student_month", "student_season"], tagline: "Daily drills and CBT practice for the NECO SSCE", timeZone: "Africa/Lagos",
    audience: "a Nigerian secondary school student preparing for the NECO SSCE",
  },
  OET: {
    code: "OET", name: "OET (Occupational English Test) for nurses and doctors", short: "OET", emoji: "🩺", kind: "professional", region: "GLOBAL", currency: "GBP",
    subjectMode: "single", subjects: ["OEH"], compulsory: ["OEH"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 40, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["oet_pass"], tagline: "Healthcare English for OET grade B: clinical vocabulary, letter writing and role-play language", timeZone: "UTC", timeLabel: "UTC",
    audience: "an overseas nurse or doctor preparing for OET (grade B) to register with the NMC, GMC or another regulator",
  },
  UCAT: {
    code: "UCAT", name: "UCAT (UK medicine and dentistry admissions)", short: "UCAT", emoji: "🧠", kind: "school", region: "UK", currency: "GBP",
    subjectMode: "multi", subjects: ["VRB", "UDM", "QNT", "USJ"], compulsory: ["VRB", "UDM", "QNT", "USJ"], minSubjects: 4, maxSubjects: 4, subjectNote: "All four UCAT subtests",
    mock: { perSubject: 15, minutes: 50, scoreStyle: "percent", maxSubjects: 4 },
    mockVariants: [
      { key: "FULL", label: "Full UCAT practice", short: "Full test", subjects: ["VRB", "UDM", "QNT", "USJ"], total: 15, minutes: 50, note: "60 questions · 50 min" },
      { key: "VR", label: "Verbal reasoning", short: "Verbal", subjects: ["VRB"], total: 20, minutes: 10, note: "20 questions · 10 min" },
      { key: "DM", label: "Decision making", short: "Decision", subjects: ["UDM"], total: 15, minutes: 16, note: "15 questions · 16 min" },
      { key: "QR", label: "Quantitative reasoning", short: "Quant", subjects: ["QNT"], total: 18, minutes: 13, note: "18 questions · 13 min" },
      { key: "SJ", label: "Situational judgement", short: "SJT", subjects: ["USJ"], total: 20, minutes: 8, note: "20 questions · 8 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["ucat_pass"], tagline: "UCAT practice at real speed: verbal, decision making, quant and situational judgement", timeZone: "Europe/London",
    audience: "a UK sixth-form student preparing for the UCAT for medicine or dentistry",
  },
  KCSE: {
    code: "KCSE", name: "KCSE (Kenya Certificate of Secondary Education)", short: "KCSE", emoji: "🇰🇪", kind: "school", region: "KE", currency: "USD",
    subjectMode: "multi", subjects: ["ENG", "MTH", "BIO", "CHM", "PHY", "GEO"], compulsory: ["ENG", "MTH"], minSubjects: 3, maxSubjects: 6, subjectNote: "English + Maths + your sciences and humanities",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: false, askSchool: true,
    plans: ["kcse_month", "kcse_season"], tagline: "KCSE revision: daily questions and timed practice in English, Maths and the sciences", timeZone: "Africa/Nairobi", timeLabel: "Kenya",
    audience: "a Kenyan Form 4 student preparing for the KCSE",
  },
  BECE: {
    code: "BECE", name: "BECE (Ghana)", short: "BECE", emoji: "🇬🇭", kind: "school", region: "GH", currency: "USD",
    subjectMode: "multi", subjects: ["ENG", "MTH", "ISC", "SST"], compulsory: ["ENG", "MTH", "ISC", "SST"], minSubjects: 4, maxSubjects: 4, subjectNote: "English, Maths, Integrated Science and Social Studies",
    mock: { perSubject: 15, minutes: 40, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: true,
    regions: GHANA_REGIONS, regionLabel: "Which region are you in?", askSchool: true,
    plans: [], tagline: "Free BECE practice: English, Maths, Integrated Science and Social Studies", timeZone: "UTC", timeLabel: "Ghana",
    audience: "a Ghanaian JHS 3 pupil preparing for the BECE; keep explanations simple",
  },
  MDCAT: {
    code: "MDCAT", name: "MDCAT (Pakistan medical college entry)", short: "MDCAT", emoji: "🇵🇰", kind: "school", region: "PK", currency: "USD",
    subjectMode: "multi", subjects: ["BIO", "CHM", "PHY", "ENG", "APT"], compulsory: ["BIO", "CHM", "PHY", "ENG", "APT"], minSubjects: 5, maxSubjects: 5,
    subjectNote: "Biology, Chemistry, Physics, English and Logical Reasoning",
    mock: { perSubject: 20, minutes: 100, scoreStyle: "percent", maxSubjects: 5 },
    mockVariants: [
      { key: "FULL", label: "Full MDCAT mock", short: "Full mock", subjects: ["BIO", "CHM", "PHY", "ENG", "APT"], total: 20, minutes: 100, note: "100 questions · 100 min" },
      { key: "BIO", label: "Biology sectional", short: "Biology", subjects: ["BIO"], total: 30, minutes: 30, note: "30 questions · 30 min" },
      { key: "CHM", label: "Chemistry sectional", short: "Chemistry", subjects: ["CHM"], total: 25, minutes: 25, note: "25 questions · 25 min" },
      { key: "PHY", label: "Physics sectional", short: "Physics", subjects: ["PHY"], total: 25, minutes: 25, note: "25 questions · 25 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["mdcat_pass"], tagline: "MDCAT practice: full mocks and Biology, Chemistry and Physics sectionals", timeZone: "Asia/Karachi", timeLabel: "Pakistan",
    audience: "a Pakistani student preparing for the MDCAT for entry to medical or dental college",
  },
  NEET: {
    code: "NEET", name: "NEET UG (India medical entrance)", short: "NEET UG", emoji: "🩻", kind: "school", region: "IN", currency: "INR",
    subjectMode: "multi", subjects: ["BIO", "CHM", "PHY"], compulsory: ["BIO", "CHM", "PHY"], minSubjects: 3, maxSubjects: 3, subjectNote: "Biology, Chemistry and Physics",
    mock: { perSubject: 30, minutes: 100, scoreStyle: "marks", maxSubjects: 3, marking: { correct: 4, wrong: 1 } },
    mockVariants: [
      { key: "FULL", label: "NEET mini mock", short: "Mini mock", subjects: ["BIO", "CHM", "PHY"], total: 30, minutes: 100, marking: { correct: 4, wrong: 1 }, note: "90 questions · 100 min · +4 / −1" },
      { key: "BIO", label: "Biology sectional", short: "Biology", subjects: ["BIO"], total: 45, minutes: 50, marking: { correct: 4, wrong: 1 }, note: "45 questions · 50 min" },
      { key: "CHM", label: "Chemistry sectional", short: "Chemistry", subjects: ["CHM"], total: 45, minutes: 50, marking: { correct: 4, wrong: 1 }, note: "45 questions · 50 min" },
      { key: "PHY", label: "Physics sectional", short: "Physics", subjects: ["PHY"], total: 45, minutes: 50, marking: { correct: 4, wrong: 1 }, note: "45 questions · 50 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["neet_quarter", "neet_year"], tagline: "NEET UG practice with real +4 / −1 marking: Biology, Chemistry and Physics", timeZone: "Asia/Kolkata", timeLabel: "India (IST)",
    audience: "an Indian Class 12 student preparing for NEET UG for MBBS/BDS admission (NCERT syllabus)",
  },
  JEE: {
    code: "JEE", name: "JEE Main (India engineering entrance)", short: "JEE Main", emoji: "⚙️", kind: "school", region: "IN", currency: "INR",
    subjectMode: "multi", subjects: ["MTH", "PHY", "CHM"], compulsory: ["MTH", "PHY", "CHM"], minSubjects: 3, maxSubjects: 3, subjectNote: "Maths, Physics and Chemistry",
    mock: { perSubject: 25, minutes: 180, scoreStyle: "marks", maxSubjects: 3, marking: { correct: 4, wrong: 1 } },
    mockVariants: [
      { key: "FULL", label: "JEE Main full mock", short: "Full mock", subjects: ["MTH", "PHY", "CHM"], total: 25, minutes: 180, marking: { correct: 4, wrong: 1 }, note: "75 questions · 3 hours · +4 / −1" },
      { key: "MTH", label: "Maths sectional", short: "Maths", subjects: ["MTH"], total: 25, minutes: 60, marking: { correct: 4, wrong: 1 }, note: "25 questions · 60 min" },
      { key: "PHY", label: "Physics sectional", short: "Physics", subjects: ["PHY"], total: 25, minutes: 60, marking: { correct: 4, wrong: 1 }, note: "25 questions · 60 min" },
      { key: "CHM", label: "Chemistry sectional", short: "Chemistry", subjects: ["CHM"], total: 25, minutes: 60, marking: { correct: 4, wrong: 1 }, note: "25 questions · 60 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["jee_quarter", "jee_year"], tagline: "JEE Main practice with +4 / −1 marking: Maths, Physics and Chemistry", timeZone: "Asia/Kolkata", timeLabel: "India (IST)",
    audience: "an Indian Class 12 student preparing for JEE Main for engineering admission",
  },
  GRE: {
    code: "GRE", name: "GRE / GMAT (quantitative & verbal)", short: "GRE / GMAT", emoji: "🎓", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "multi", subjects: ["QNT", "VRB"], compulsory: ["QNT", "VRB"], minSubjects: 2, maxSubjects: 2, subjectNote: "Quantitative and verbal reasoning",
    mock: { perSubject: 20, minutes: 60, scoreStyle: "percent", maxSubjects: 2 },
    mockVariants: [
      { key: "FULL", label: "Quant + verbal test", short: "Full test", subjects: ["QNT", "VRB"], total: 20, minutes: 60, note: "40 questions · 60 min" },
      { key: "Q", label: "Quant section", short: "Quant", subjects: ["QNT"], total: 20, minutes: 30, note: "20 questions · 30 min" },
      { key: "V", label: "Verbal section", short: "Verbal", subjects: ["VRB"], total: 20, minutes: 30, note: "20 questions · 30 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["gre_pass"], tagline: "Quant and verbal practice for the GRE and GMAT — study abroad and MBA admissions", timeZone: "UTC", timeLabel: "UTC",
    audience: "a graduate applicant preparing for the GRE or GMAT for a master's or MBA abroad",
  },
  CSEPH: {
    code: "CSEPH", name: "Philippine Civil Service Exam (CSE-PPT)", short: "Civil Service PH", emoji: "🇵🇭", kind: "professional", region: "PH", currency: "USD",
    subjectMode: "multi", subjects: ["ENG", "QNT", "VRB", "PHC"], compulsory: ["ENG", "QNT", "VRB", "PHC"], minSubjects: 4, maxSubjects: 4,
    subjectNote: "Verbal ability, numerical ability, analytical ability and general information",
    mock: { perSubject: 15, minutes: 60, passPct: 80, scoreStyle: "passfail", maxSubjects: 4 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["cseph_pass"], tagline: "Civil Service Exam practice: verbal, numerical, analytical and the Philippine Constitution", timeZone: "Asia/Manila", timeLabel: "Philippines",
    audience: "a Filipino preparing for the Civil Service Exam (Professional or Subprofessional) to work in government",
  },
  AAT: {
    code: "AAT", name: "AAT accounting (Levels 2–3)", short: "AAT", emoji: "🧾", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "multi", subjects: ["BKQ", "AFA"], compulsory: ["BKQ", "AFA"], minSubjects: 2, maxSubjects: 2, subjectNote: "Bookkeeping and financial accounting",
    mock: { perSubject: 20, minutes: 60, passPct: 70, scoreStyle: "passfail", maxSubjects: 2 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["aat_pass"], tagline: "AAT bookkeeping and accounting practice with worked double entry", timeZone: "Europe/London",
    audience: "a UK learner studying AAT Level 2 or 3 accounting and bookkeeping",
  },
  NGREC: {
    code: "NGREC", name: "Recruitment aptitude tests (Nigeria)", short: "Recruitment tests", emoji: "🪖", kind: "professional", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: ["APT", "ENG", "MTH", "GOV"], compulsory: ["APT", "ENG", "MTH", "GOV"], minSubjects: 4, maxSubjects: 4,
    subjectNote: "Reasoning, English, Maths and general knowledge",
    mock: { perSubject: 15, minutes: 60, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: true, askSchool: false,
    plans: ["ngrec_pass"], tagline: "Practice for Police, Army, Customs, Immigration and graduate trainee aptitude tests", timeZone: "Africa/Lagos",
    audience: "a Nigerian applicant preparing for a government agency or company recruitment aptitude test (reasoning, English, maths, general knowledge)",
  },
  NCEE: {
    code: "NCEE", name: "Common Entrance (NCEE) — Primary 6 to JSS1", short: "Common Entrance", emoji: "🎒", kind: "school", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: ["ELM", "VRS", "NGS"], compulsory: ["ELM", "VRS", "NGS"], minSubjects: 3, maxSubjects: 3,
    subjectNote: "Maths, verbal reasoning and general studies",
    mock: { perSubject: 20, minutes: 60, scoreStyle: "percent", maxSubjects: 3 }, weeklyMock: false, askState: true, askSchool: true,
    plans: ["ncee_pass"], tagline: "Common Entrance practice for Unity Colleges and state schools: maths, verbal reasoning and general studies", timeZone: "Africa/Lagos",
    audience: "a Nigerian Primary 6 pupil (about 10–11 years old) preparing for the National Common Entrance Examination; use very simple language",
  },
  JSCE: {
    code: "JSCE", name: "Junior WAEC / BECE (JSS3, Nigeria)", short: "Junior WAEC", emoji: "📗", kind: "school", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: ["ENG", "MTH", "ISC", "CVE"], compulsory: ["ENG", "MTH"], minSubjects: 2, maxSubjects: 4,
    subjectNote: "English, Maths, Basic Science and Civic Education",
    mock: { perSubject: 15, minutes: 45, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: true, askSchool: true,
    plans: ["jsce_pass"], tagline: "Junior WAEC (BECE) practice for JSS3: English, Maths, Basic Science and Civic Education", timeZone: "Africa/Lagos",
    audience: "a Nigerian JSS3 student preparing for the Basic Education Certificate Examination (Junior WAEC); keep explanations simple",
  },
  NGCS: {
    code: "NGCS", name: "Civil service promotion exams (Nigeria)", short: "Civil service promotion", emoji: "🏛️", kind: "professional", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: ["PSR", "GOV", "ENG"], compulsory: ["PSR", "GOV", "ENG"], minSubjects: 3, maxSubjects: 3,
    subjectNote: "Public Service Rules and Financial Regulations, government and English",
    mock: { perSubject: 20, minutes: 60, passPct: 60, scoreStyle: "passfail", maxSubjects: 3 }, weeklyMock: false, askState: true, askSchool: false,
    plans: ["ngcs_pass"], tagline: "Promotion exam practice for federal and state civil servants: Public Service Rules, Financial Regulations and general knowledge", timeZone: "Africa/Lagos",
    audience: "a Nigerian civil servant preparing for a federal or state promotion examination (Public Service Rules, Financial Regulations, constitution, office practice)",
  },
  PTE: {
    code: "PTE", name: "PTE Academic (English test)", short: "PTE Academic", emoji: "🗣️", kind: "professional", region: "GLOBAL", currency: "GBP",
    subjectMode: "multi", subjects: ["IEV", "VRB"], compulsory: ["IEV", "VRB"], minSubjects: 2, maxSubjects: 2, subjectNote: "Grammar, vocabulary and reading",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 2 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["pte_pass"], tagline: "PTE Academic practice for study, work and visas in the UK, Australia, Canada and New Zealand", timeZone: "UTC", timeLabel: "UTC",
    audience: "someone preparing for PTE Academic for study, work or a visa abroad",
  },
  CELPIP: {
    code: "CELPIP", name: "CELPIP-General (Canada English test)", short: "CELPIP", emoji: "🇨🇦", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "multi", subjects: ["IEV", "VRB"], compulsory: ["IEV", "VRB"], minSubjects: 2, maxSubjects: 2, subjectNote: "Grammar, vocabulary and reading",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 2 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["celpip_pass"], tagline: "CELPIP-General practice for Canada Express Entry and citizenship", timeZone: "UTC", timeLabel: "UTC",
    audience: "someone preparing for CELPIP-General for Canadian permanent residence (Express Entry) or citizenship",
  },
  IOSH: {
    code: "IOSH", name: "IOSH Managing Safely", short: "IOSH Managing Safely", emoji: "🦺", kind: "professional", region: "GLOBAL", currency: "GBP",
    subjectMode: "single", subjects: ["IMS"], compulsory: ["IMS"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 25, minutes: 45, passPct: 60, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["iosh_pass"], tagline: "IOSH Managing Safely revision: risk, hazards, controls, incidents and measuring performance", timeZone: "UTC", timeLabel: "UTC",
    audience: "a supervisor or manager taking IOSH Managing Safely, often in construction, oil and gas or facilities",
  },
  OILGAS: {
    code: "OILGAS", name: "Oil & gas careers: HSE and industry knowledge", short: "Oil & gas", emoji: "🛢️", kind: "professional", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: ["OGS", "ONG", "ODP"], compulsory: ["OGS", "ONG"], minSubjects: 2, maxSubjects: 3, subjectNote: "HSE essentials, industry knowledge, and drilling & production",
    mock: { perSubject: 15, minutes: 45, passPct: 70, scoreStyle: "passfail", maxSubjects: 3 },
    mockVariants: [
      { key: "FULL", label: "HSE + industry test", short: "Full test", subjects: ["OGS", "ONG"], total: 20, minutes: 40, note: "40 questions · 40 min" },
      { key: "HSE", label: "HSE essentials", short: "HSE", subjects: ["OGS"], total: 20, minutes: 20, note: "20 questions · 20 min" },
      { key: "IND", label: "Industry knowledge", short: "Industry", subjects: ["ONG"], total: 20, minutes: 20, note: "20 questions · 20 min" },
      { key: "DRL", label: "Drilling & production", short: "Drilling", subjects: ["ODP"], total: 20, minutes: 25, note: "20 questions · 25 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["oilgas_pass_usd"], tagline: "Get oil & gas ready: H₂S, permits, confined space and fire safety, plus the industry knowledge interviewers ask about", timeZone: "Africa/Lagos",
    audience: "a Nigerian graduate, technician or career changer preparing for oil and gas jobs, graduate trainee interviews or site HSE inductions",
  },
  NDT: {
    code: "NDT", name: "NDT (non-destructive testing) Level 1–2", short: "NDT", emoji: "🔬", kind: "professional", region: "GLOBAL", currency: "NGN",
    subjectMode: "multi", subjects: ["NDG", "NPT", "NMT", "NUT", "NRT"], compulsory: ["NDG"], minSubjects: 2, maxSubjects: 5,
    subjectNote: "General theory plus the methods you're certifying in (PT, MT, UT, RT)",
    mock: { perSubject: 10, minutes: 60, passPct: 70, scoreStyle: "passfail", maxSubjects: 5 },
    mockVariants: [
      { key: "GEN", label: "General theory (Level 2)", short: "General", subjects: ["NDG"], total: 40, minutes: 60, passPct: 70, note: "40 questions · 60 min · 70% to pass" },
      { key: "PT", label: "Penetrant testing (PT)", short: "PT", subjects: ["NPT"], total: 30, minutes: 45, passPct: 70, note: "30 questions · 45 min" },
      { key: "MT", label: "Magnetic particle testing (MT)", short: "MT", subjects: ["NMT"], total: 30, minutes: 45, passPct: 70, note: "30 questions · 45 min" },
      { key: "UT", label: "Ultrasonic testing (UT)", short: "UT", subjects: ["NUT"], total: 30, minutes: 45, passPct: 70, note: "30 questions · 45 min" },
      { key: "RT", label: "Radiography and radiation safety (RT)", short: "RT", subjects: ["NRT"], total: 30, minutes: 45, passPct: 70, note: "30 questions · 45 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["ndt_pass_usd"], tagline: "NDT exam practice for ISO 9712 (PCN), ASNT and CSWIP: general theory plus PT, MT, UT and RT with radiation safety", timeZone: "Africa/Lagos",
    audience: "an NDT technician or trainee preparing for Level 1 or Level 2 theory exams (ISO 9712/PCN or ASNT SNT-TC-1A), often working in oil and gas, pipelines or fabrication",
  },
  WELDINSP: {
    code: "WELDINSP", name: "Welding inspector (CSWIP 3.1 / AWS CWI)", short: "Welding inspector", emoji: "🔥", kind: "professional", region: "GLOBAL", currency: "NGN",
    subjectMode: "multi", subjects: ["WIN", "NDG"], compulsory: ["WIN", "NDG"], minSubjects: 2, maxSubjects: 2, subjectNote: "Welding inspection plus NDT and weld defects",
    mock: { perSubject: 20, minutes: 60, passPct: 70, scoreStyle: "passfail", maxSubjects: 2 },
    mockVariants: [
      { key: "FULL", label: "Welding inspector mock", short: "Full mock", subjects: ["WIN", "NDG"], total: 20, minutes: 60, passPct: 70, note: "40 questions · 60 min · 70% to pass" },
      { key: "WIN", label: "Welding technology", short: "Welding", subjects: ["WIN"], total: 30, minutes: 45, passPct: 70, note: "30 questions · 45 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["weld_pass_usd"], tagline: "Welding inspector exam practice: processes, cracking, WPS/PQR, testing, symbols and heat-input calculations", timeZone: "Africa/Lagos",
    audience: "a welder, QC technician or NDT technician preparing for CSWIP 3.1 or AWS CWI welding inspector exams, often in oil and gas fabrication",
  },
  APIINSP: {
    code: "APIINSP", name: "API 510 / 570 inspector", short: "API 510 / 570", emoji: "🏭", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["INS"], compulsory: ["INS"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 40, minutes: 80, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["api_pass"], tagline: "API 510 and 570 practice: codes, damage mechanisms and the corrosion-rate, remaining-life and thickness calculations", timeZone: "Africa/Lagos",
    audience: "an experienced inspector preparing for the API 510 (pressure vessel) or API 570 (piping) inspector certification exam",
  },
  COATING: {
    code: "COATING", name: "Coating & corrosion inspector (AMPP CIP Level 1)", short: "Coating inspector", emoji: "🎨", kind: "professional", region: "GLOBAL", currency: "NGN",
    subjectMode: "single", subjects: ["COR"], compulsory: ["COR"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 45, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["coat_pass_usd"], tagline: "Coating inspector practice: corrosion, surface preparation, dew point, DFT/WFT and inspection instruments", timeZone: "Africa/Lagos",
    audience: "a painter, blaster or QC technician preparing for AMPP (NACE) CIP Level 1 or similar coating inspector training",
  },
  PLAB: {
    code: "PLAB", name: "PLAB 1 (UK GMC — doctors)", short: "PLAB 1", emoji: "⚕️", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["PLB"], compulsory: ["PLB"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 180, minutes: 180, passPct: 63, scoreStyle: "passfail", maxSubjects: 1 },
    mockVariants: [
      { key: "FULL", label: "Full PLAB 1 mock — 180 questions", short: "Full 180", subjects: ["PLB"], total: 180, minutes: 180, passPct: 63, note: "180 questions · 3 hours · practice pass mark 63%" },
      { key: "HALF", label: "Half paper — 90 questions", short: "Half 90", subjects: ["PLB"], total: 90, minutes: 90, passPct: 63, note: "90 questions · 90 min" },
      { key: "Q30", label: "Quick 30", short: "Quick 30", subjects: ["PLB"], total: 30, minutes: 30, passPct: 63, note: "30 questions · 30 min — one minute per question" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["plab_pass"], tagline: "PLAB 1 best-of-five practice for international medical graduates, timed to the real paper", timeZone: "Europe/London",
    audience: "an international medical graduate (often from Nigeria, Ghana, India or Pakistan) preparing for the UK GMC PLAB 1 exam, using UK practice (NICE, BNF, GMC guidance)",
  },
  NCLEX: {
    code: "NCLEX", name: "NCLEX-RN (US nursing licence)", short: "NCLEX-RN", emoji: "🏥", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["NCX"], compulsory: ["NCX"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 85, minutes: 150, passPct: 65, scoreStyle: "passfail", maxSubjects: 1 },
    mockVariants: [
      { key: "FULL", label: "NCLEX-RN practice — 85 questions", short: "Full 85", subjects: ["NCX"], total: 85, minutes: 150, passPct: 65, note: "85 questions · 2 h 30 min · practice target 65%" },
      { key: "Q30", label: "Quick 30", short: "Quick 30", subjects: ["NCX"], total: 30, minutes: 45, passPct: 65, note: "30 questions · 45 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["nclex_pass"], tagline: "NCLEX-RN practice: prioritisation, delegation, pharmacology and dosage calculations", timeZone: "UTC", timeLabel: "UTC",
    audience: "an internationally educated nurse (often from Nigeria, Ghana, the Philippines or India) preparing for the US NCLEX-RN, using US units and US nursing practice",
  },
  PM: {
    code: "PM", name: "Project Management (PRINCE2, APM, Scrum, Agile, CAPM, PMP)", short: "Project Management", emoji: "📋", kind: "professional", region: "GLOBAL", currency: "GBP",
    subjectMode: "multi", subjects: ["PRN", "APM", "SCR", "AGP", "PMF", "PMP"], compulsory: [], minSubjects: 1, maxSubjects: 6, subjectNote: "Pick the certifications you're preparing for",
    mock: { total: 60, minutes: 60, passPct: 60, scoreStyle: "passfail", maxSubjects: 1 },
    mockVariants: [
      { key: "PRN", label: "PRINCE2® 7 Foundation", short: "PRINCE2", subjects: ["PRN"], total: 60, minutes: 60, passPct: 60, note: "60 questions · 60 min · 36 to pass" },
      { key: "APM", label: "APM PFQ", short: "APM PFQ", subjects: ["APM"], total: 60, minutes: 60, passPct: 60, note: "60 questions · 60 min · 60% to pass" },
      { key: "SCR", label: "Scrum — PSM I style", short: "Scrum", subjects: ["SCR"], total: 80, minutes: 60, passPct: 85, note: "80 questions · 60 min · 85% to pass" },
      { key: "AGP", label: "Agile & Product Owner (PSPO / PMI-ACP style)", short: "Agile / PSPO", subjects: ["AGP", "SCR"], total: 20, minutes: 45, passPct: 75, note: "40 questions · 45 min" },
      { key: "PMF", label: "CAPM-style fundamentals", short: "CAPM", subjects: ["PMF"], total: 50, minutes: 60, passPct: 70, note: "50 questions · 60 min · practice target 70%" },
      { key: "PMP", label: "PMP-style practice", short: "PMP", subjects: ["PMP", "PMF"], total: 45, minutes: 120, passPct: 65, note: "90 questions · 2 hours · situational + calculations" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["pm_pass"], tagline: "PRINCE2, APM PFQ, Scrum PSM I, Agile/PSPO, CAPM and PMP practice tests", timeZone: "Europe/London",
    audience: "a working professional preparing for project management certifications (PRINCE2 7 Foundation, APM PFQ, Scrum.org PSM I and PSPO, PMI CAPM, PMI-ACP and PMP)",
  },
  SALEARN: {
    code: "SALEARN", name: "South Africa learner's licence (K53)", short: "Learner's licence SA", emoji: "🚗", kind: "professional", region: "ZA", currency: "USD",
    subjectMode: "single", subjects: ["K53"], compulsory: ["K53"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 30, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["k53_pass"], tagline: "Learner's licence practice: rules of the road, road signs and vehicle controls", timeZone: "Africa/Johannesburg", timeLabel: "South Africa",
    audience: "a South African preparing for the K53 learner's licence test (rules of the road, road signs, vehicle controls)",
  },
  MATRIC: {
    code: "MATRIC", name: "South Africa Matric (NSC Grade 12)", short: "Matric SA", emoji: "🇿🇦", kind: "school", region: "ZA", currency: "USD",
    subjectMode: "multi", subjects: ["ENG", "MTH", "PHY", "CHM", "BIO", "GEO", "ACC", "ECO"], compulsory: ["ENG", "MTH"], minSubjects: 3, maxSubjects: 8,
    subjectNote: "English and Maths plus Physical Sciences, Life Sciences, Geography, Accounting or Economics",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: false, askSchool: true,
    plans: ["matric_season"], tagline: "Matric (NSC) revision: English, Maths, Physical and Life Sciences, Geography, Accounting and Economics", timeZone: "Africa/Johannesburg", timeLabel: "South Africa",
    audience: "a South African Grade 12 learner preparing for the National Senior Certificate (Matric) exams",
  },
  KCPA: {
    code: "KCPA", name: "Kenya CPA (KASNEB)", short: "CPA Kenya", emoji: "📒", kind: "professional", region: "KE", currency: "USD",
    subjectMode: "multi", subjects: ["AFA", "AMA", "ABT", "EXE", "KEL"], compulsory: [], minSubjects: 1, maxSubjects: 5,
    subjectNote: "Financial and management accounting, business, economics, and Kenyan law and tax",
    mock: { perSubject: 15, minutes: 60, passPct: 50, scoreStyle: "passfail", maxSubjects: 3 },
    mockVariants: [
      { key: "FA", label: "Financial Accounting", short: "Financial Acc", subjects: ["AFA"], total: 40, minutes: 60, passPct: 50, note: "40 questions · 60 min" },
      { key: "MA", label: "Management Accounting", short: "Management Acc", subjects: ["AMA"], total: 40, minutes: 60, passPct: 50, note: "40 questions · 60 min" },
      { key: "LAW", label: "Business Law & Tax (Kenya)", short: "Law & Tax", subjects: ["KEL"], total: 30, minutes: 45, passPct: 50, note: "30 questions · 45 min" },
      { key: "ECON", label: "Economics", short: "Economics", subjects: ["EXE"], total: 30, minutes: 45, passPct: 50, note: "30 questions · 45 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["kcpa_pass"], tagline: "CPA (KASNEB) practice: accounting, business law, Kenyan tax and economics", timeZone: "Africa/Nairobi", timeLabel: "Kenya",
    audience: "a Kenyan student preparing for KASNEB CPA papers (foundation and intermediate levels)",
  },
  CARESR: {
    code: "CARESR", name: "Senior carer: medication & the law (Level 3)", short: "Senior carer", emoji: "🩺", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["CML"], compulsory: ["CML"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 25, minutes: 30, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["caresr_pass"], tagline: "Step up to senior carer: medication, Mental Capacity Act, Care Act, CQC and spotting deterioration", timeZone: "Europe/London",
    audience: "a UK care worker (often recently arrived from abroad) stepping up to senior carer or studying the Level 3 Diploma in Adult Care",
  },
  FIRSTAID: {
    code: "FIRSTAID", name: "Emergency First Aid at Work", short: "First aid at work", emoji: "⛑️", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["EFA"], compulsory: ["EFA"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 20, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["firstaid_pass"], tagline: "Emergency First Aid at Work revision: CPR, choking, bleeding, burns and medical emergencies", timeZone: "Europe/London",
    audience: "a UK worker taking an Emergency First Aid at Work course, often for care, security, construction or warehouse jobs",
  },
  SERU: {
    code: "SERU", name: "London private hire (SERU)", short: "SERU (private hire)", emoji: "🚕", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["SRU"], compulsory: ["SRU"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 30, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["seru_pass"], tagline: "TfL SERU practice for London private hire (Uber, Bolt) drivers: licensing, equality and safeguarding", timeZone: "Europe/London",
    audience: "someone applying for a London private hire (PHV) driver licence and preparing for TfL's SERU assessment",
  },
  HGV: {
    code: "HGV", name: "HGV / LGV driver theory & Driver CPC", short: "HGV driver", emoji: "🚛", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["LGV"], compulsory: ["LGV"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 40, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["hgv_pass"], tagline: "HGV/LGV theory and Driver CPC: drivers' hours, licence categories, speed limits, brakes and safety", timeZone: "Europe/London",
    audience: "someone training as an HGV/LGV or bus driver in the UK, preparing for the theory test and Driver CPC",
  },
  ELEC18: {
    code: "ELEC18", name: "18th Edition wiring regulations (BS 7671)", short: "18th Edition", emoji: "⚡", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["BSR"], compulsory: ["BSR"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 60, passPct: 60, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["elec_pass"], tagline: "18th Edition (BS 7671) practice: earthing, protection, circuits, special locations, testing and certification", timeZone: "Europe/London",
    audience: "a UK electrician or electrical trainee preparing for the 18th Edition (BS 7671) wiring regulations exam",
  },
  EYTA: {
    code: "EYTA", name: "Teaching assistant & Early Years (Level 3)", short: "Teaching assistant", emoji: "🧸", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["EYT"], compulsory: ["EYT"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 25, minutes: 30, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["eyta_pass"], tagline: "Teaching assistant and nursery practice: EYFS, safeguarding, SEND, phonics and child development", timeZone: "Europe/London",
    audience: "someone working or training as a teaching assistant or early years practitioner in England (Level 3)",
  },
  WAREHOUSE: {
    code: "WAREHOUSE", name: "Warehouse & forklift (theory)", short: "Warehouse & forklift", emoji: "📦", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["WHF"], compulsory: ["WHF"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 20, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["warehouse_pass"], tagline: "Warehouse and forklift theory: LOLER, manual handling, safe truck operation, racking and stock control", timeZone: "Europe/London",
    audience: "someone starting warehouse or forklift work in the UK",
  },
  NHSHCA: {
    code: "NHSHCA", name: "NHS healthcare assistant (role & interview)", short: "NHS healthcare assistant", emoji: "🏥", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["HCA"], compulsory: ["HCA"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 25, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["hca_pass"], tagline: "Get ready for NHS healthcare assistant jobs: values, observations, infection control and interview answers", timeZone: "Europe/London",
    audience: "someone applying for or starting an NHS healthcare assistant (HCA) role, often recently arrived in the UK",
  },
  BA: {
    code: "BA", name: "Business Analyst (BCS Foundation / IIBA ECBA)", short: "Business Analyst", emoji: "🧭", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["BAF"], compulsory: ["BAF"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 40, minutes: 60, passPct: 65, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["ba_pass"], tagline: "Business analysis practice: BABOK, POPIT, CATWOE, requirements, elicitation and modelling", timeZone: "Europe/London", timeLabel: "UK",
    audience: "someone moving into business analysis, preparing for the BCS Foundation Certificate in Business Analysis or IIBA ECBA",
  },
  GED: {
    code: "GED", name: "GED (US high school equivalency)", short: "GED", emoji: "🎓", kind: "school", region: "US", currency: "USD",
    subjectMode: "multi", subjects: ["MTH", "ENG", "GSS", "GSC"], compulsory: ["MTH", "ENG", "GSS", "GSC"], minSubjects: 4, maxSubjects: 4, subjectNote: "All four GED subjects: Math, Reasoning Through Language Arts, Social Studies and Science",
    mock: { perSubject: 15, minutes: 80, scoreStyle: "percent", maxSubjects: 4 },
    mockVariants: [
      { key: "MATH", label: "Mathematical Reasoning practice", short: "Math", subjects: ["MTH"], total: 30, minutes: 60, note: "30 questions · 60 min" },
      { key: "RLA", label: "Language Arts practice", short: "Language Arts", subjects: ["ENG"], total: 30, minutes: 45, note: "30 questions · 45 min" },
      { key: "SS", label: "Social Studies practice", short: "Social Studies", subjects: ["GSS"], total: 30, minutes: 45, note: "30 questions · 45 min" },
      { key: "SCI", label: "Science practice", short: "Science", subjects: ["GSC"], total: 30, minutes: 45, note: "30 questions · 45 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["ged_pass"], tagline: "GED practice for all four subjects: Math, Language Arts, Social Studies and Science", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "an adult in the United States studying for the GED high school equivalency test",
  },
  TEAS: {
    code: "TEAS", name: "ATI TEAS (nursing school entrance)", short: "ATI TEAS", emoji: "🩺", kind: "professional", region: "US", currency: "USD",
    subjectMode: "multi", subjects: ["TSC", "MTH", "ENG", "VRB"], compulsory: ["TSC", "MTH", "ENG", "VRB"], minSubjects: 4, maxSubjects: 4, subjectNote: "Science, Math, English and Reading",
    mock: { perSubject: 15, minutes: 75, scoreStyle: "percent", maxSubjects: 4 },
    mockVariants: [
      { key: "FULL", label: "TEAS mixed practice", short: "Mixed", subjects: ["TSC", "MTH", "ENG", "VRB"], total: 15, minutes: 75, note: "60 questions · 75 min" },
      { key: "SCI", label: "Science sectional", short: "Science", subjects: ["TSC"], total: 50, minutes: 60, note: "50 questions · 60 min" },
      { key: "MATH", label: "Math sectional", short: "Math", subjects: ["MTH"], total: 38, minutes: 57, note: "38 questions · 57 min" },
      { key: "ENG", label: "English sectional", short: "English", subjects: ["ENG"], total: 37, minutes: 37, note: "37 questions · 37 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["teas_pass"], tagline: "ATI TEAS practice for nursing school: anatomy and physiology, science, math and English", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US student applying to nursing school and preparing for the ATI TEAS (science, anatomy and physiology, math, English and reading)",
  },
  CNA: {
    code: "CNA", name: "CNA (certified nursing assistant) written exam", short: "CNA", emoji: "🤝", kind: "professional", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["CNA"], compulsory: ["CNA"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 60, minutes: 90, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["cna_pass"], tagline: "CNA written exam practice: infection control, resident rights, safety, vital signs and personal care", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a nurse aide trainee in the United States preparing for the state CNA written (knowledge) exam",
  },
  ASVAB: {
    code: "ASVAB", name: "ASVAB (US military entrance)", short: "ASVAB", emoji: "🎖️", kind: "professional", region: "US", currency: "USD",
    subjectMode: "multi", subjects: ["MTH", "ENG", "GSC", "AMC", "AEI"], compulsory: ["MTH", "ENG", "GSC", "AMC", "AEI"], minSubjects: 5, maxSubjects: 5, subjectNote: "AFQT (math and verbal) plus science, mechanical and electronics",
    mock: { perSubject: 12, minutes: 70, scoreStyle: "percent", maxSubjects: 5 },
    mockVariants: [
      { key: "AFQT", label: "AFQT practice (math and verbal)", short: "AFQT", subjects: ["MTH", "ENG"], total: 25, minutes: 60, note: "50 questions · 60 min" },
      { key: "TECH", label: "Mechanical and electronics", short: "Mech & elec", subjects: ["AMC", "AEI"], total: 20, minutes: 40, note: "40 questions · 40 min" },
      { key: "SCI", label: "General Science", short: "Science", subjects: ["GSC"], total: 25, minutes: 20, note: "25 questions · 20 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["asvab_pass"], tagline: "ASVAB practice: AFQT math and verbal, general science, mechanical comprehension and electronics", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US applicant preparing for the ASVAB to join the military",
  },
  UPSC: {
    code: "UPSC", name: "UPSC Civil Services Prelims (India)", short: "UPSC Prelims", emoji: "🏛️", kind: "professional", region: "IN", currency: "INR",
    subjectMode: "multi", subjects: ["IPL", "HIS", "GEO", "IEC", "ENV", "GAI", "APT", "QNT", "ENG"], compulsory: ["IPL", "HIS", "GEO", "IEC", "ENV", "GAI", "APT", "QNT", "ENG"], minSubjects: 9, maxSubjects: 9, subjectNote: "General Studies Paper I and CSAT",
    mock: { perSubject: 11, minutes: 120, scoreStyle: "marks", maxSubjects: 9, marking: { correct: 2, wrong: 0.66 } },
    mockVariants: [
      { key: "GS1", label: "General Studies Paper I", short: "GS Paper I", subjects: ["IPL", "HIS", "GEO", "IEC", "ENV", "GAI"], total: 17, minutes: 120, marking: { correct: 2, wrong: 0.66 }, note: "102 questions · 2 hours · +2 / −0.66" },
      { key: "CSAT", label: "CSAT (Paper II)", short: "CSAT", subjects: ["APT", "QNT", "ENG"], total: 27, minutes: 120, marking: { correct: 2.5, wrong: 0.83 }, note: "81 questions · 2 hours · qualifying at 33%" },
      { key: "POL", label: "Polity sectional", short: "Polity", subjects: ["IPL"], total: 30, minutes: 35, marking: { correct: 2, wrong: 0.66 }, note: "30 questions · 35 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["upsc_quarter", "upsc_year"], tagline: "UPSC Prelims practice: polity, history, geography, economy, environment and CSAT with negative marking", timeZone: "Asia/Kolkata", timeLabel: "India (IST)",
    audience: "an Indian aspirant preparing for the UPSC Civil Services Preliminary Examination (General Studies Paper I and CSAT)",
  },
  RRB: {
    code: "RRB", name: "RRB NTPC / Group D (Indian Railways)", short: "Railways (RRB)", emoji: "🚆", kind: "professional", region: "IN", currency: "INR",
    subjectMode: "multi", subjects: ["GAI", "QNT", "APT"], compulsory: ["GAI", "QNT", "APT"], minSubjects: 3, maxSubjects: 3, subjectNote: "General Awareness, Mathematics and Reasoning",
    mock: { perSubject: 33, minutes: 90, scoreStyle: "marks", maxSubjects: 3, marking: { correct: 1, wrong: 0.33 } },
    mockVariants: [
      { key: "CBT1", label: "CBT-1 full mock", short: "Full mock", subjects: ["GAI", "QNT", "APT"], total: 33, minutes: 90, marking: { correct: 1, wrong: 0.33 }, note: "99 questions · 90 min · +1 / −⅓" },
      { key: "MATH", label: "Mathematics sectional", short: "Maths", subjects: ["QNT"], total: 30, minutes: 25, marking: { correct: 1, wrong: 0.33 }, note: "30 questions · 25 min" },
      { key: "GA", label: "General Awareness sectional", short: "General Awareness", subjects: ["GAI"], total: 40, minutes: 25, marking: { correct: 1, wrong: 0.33 }, note: "40 questions · 25 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["rrb_quarter", "rrb_year"], tagline: "Railway exam mocks with negative marking: general awareness, maths and reasoning", timeZone: "Asia/Kolkata", timeLabel: "India (IST)",
    audience: "an Indian candidate preparing for Railway Recruitment Board exams such as RRB NTPC and Group D",
  },
  CTET: {
    code: "CTET", name: "CTET (India teacher eligibility)", short: "CTET", emoji: "🧑‍🏫", kind: "professional", region: "IN", currency: "INR",
    subjectMode: "multi", subjects: ["CDP", "ENG", "QNT"], compulsory: ["CDP", "ENG", "QNT"], minSubjects: 3, maxSubjects: 3, subjectNote: "Child Development & Pedagogy, English and Mathematics",
    mock: { perSubject: 30, minutes: 90, scoreStyle: "percent", maxSubjects: 3 },
    mockVariants: [
      { key: "MIX", label: "CTET mixed mock", short: "Mixed mock", subjects: ["CDP", "ENG", "QNT"], total: 30, minutes: 90, note: "90 questions · 90 min · no negative marking" },
      { key: "CDP", label: "Child Development & Pedagogy", short: "CDP", subjects: ["CDP"], total: 30, minutes: 30, note: "30 questions · 30 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["ctet_quarter", "ctet_year"], tagline: "CTET practice: child development and pedagogy (Piaget, Vygotsky, RTE, NEP), English and maths", timeZone: "Asia/Kolkata", timeLabel: "India (IST)",
    audience: "an Indian teacher candidate preparing for CTET or a state TET (child development and pedagogy, language and mathematics)",
  },
  CAT: {
    code: "CAT", name: "CAT (IIM MBA entrance)", short: "CAT", emoji: "📈", kind: "school", region: "IN", currency: "INR",
    subjectMode: "multi", subjects: ["ENG", "APT", "QNT"], compulsory: ["ENG", "APT", "QNT"], minSubjects: 3, maxSubjects: 3, subjectNote: "Verbal ability, logical reasoning and quantitative aptitude",
    mock: { perSubject: 22, minutes: 120, scoreStyle: "marks", maxSubjects: 3, marking: { correct: 3, wrong: 1 } },
    mockVariants: [
      { key: "FULL", label: "CAT-style full mock", short: "Full mock", subjects: ["ENG", "APT", "QNT"], total: 22, minutes: 120, marking: { correct: 3, wrong: 1 }, note: "66 questions · 2 hours · +3 / −1" },
      { key: "QA", label: "Quantitative Ability sectional", short: "QA", subjects: ["QNT"], total: 22, minutes: 40, marking: { correct: 3, wrong: 1 }, note: "22 questions · 40 min" },
      { key: "LR", label: "Logical Reasoning sectional", short: "LR", subjects: ["APT"], total: 22, minutes: 40, marking: { correct: 3, wrong: 1 }, note: "22 questions · 40 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["cat_quarter", "cat_year"], tagline: "CAT practice with +3 / −1 marking: verbal ability, logical reasoning and quantitative aptitude", timeZone: "Asia/Kolkata", timeLabel: "India (IST)",
    audience: "an Indian graduate preparing for the CAT exam for IIM and other MBA admissions",
  },
  GCSE: {
    code: "GCSE", name: "GCSE Maths and English (UK)", short: "GCSE", emoji: "📝", kind: "school", region: "UK", currency: "GBP",
    subjectMode: "multi", subjects: ["GCM", "MTH", "GEL", "ENG"], compulsory: [], minSubjects: 1, maxSubjects: 4, subjectNote: "Choose Maths, English or both",
    mock: { perSubject: 15, minutes: 60, scoreStyle: "percent", maxSubjects: 4 },
    mockVariants: [
      { key: "MATH", label: "GCSE Maths practice", short: "Maths", subjects: ["GCM", "MTH"], total: 20, minutes: 60, note: "40 questions · 60 min" },
      { key: "ENG", label: "GCSE English Language practice", short: "English", subjects: ["GEL", "ENG"], total: 15, minutes: 40, note: "30 questions · 40 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["gcse_pass"], tagline: "GCSE Maths and English practice for grade 4 and above: worked maths answers and English language skills", timeZone: "Europe/London", timeLabel: "UK time",
    audience: "an adult or teenager in the UK aiming for a grade 4 or above in GCSE Maths or English Language, often a resit for work, nursing or an apprenticeship",
  },
  CSJT: {
    code: "CSJT", name: "Civil Service Judgement Test (UK)", short: "Civil Service JT", emoji: "🏛️", kind: "professional", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["CSJ"], compulsory: ["CSJ"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 30, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["csjt_pass"], tagline: "Civil Service Judgement Test practice based on the Civil Service Behaviours and values", timeZone: "Europe/London", timeLabel: "UK time",
    audience: "a job applicant in the UK practising for the Civil Service Judgement Test, which uses work scenarios linked to the Civil Service Behaviours and the Civil Service Code",
  },
  TOEFL: {
    code: "TOEFL", name: "TOEFL iBT", short: "TOEFL", emoji: "🎓", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "multi", subjects: ["AEN", "IEV", "VRB", "ENG"], compulsory: ["AEN", "IEV", "VRB", "ENG"], minSubjects: 4, maxSubjects: 4, subjectNote: "Academic vocabulary, reading and grammar",
    mock: { perSubject: 10, minutes: 40, scoreStyle: "percent", maxSubjects: 4 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["toefl_pass"], tagline: "TOEFL iBT practice: academic vocabulary, reading for inference and grammar", timeZone: "UTC", timeLabel: "UTC",
    audience: "an international student preparing for the TOEFL iBT for university admission abroad",
  },
  DUOLINGO: {
    code: "DUOLINGO", name: "Duolingo English Test", short: "Duolingo English", emoji: "🦉", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "multi", subjects: ["AEN", "IEV", "ENG"], compulsory: ["AEN", "IEV", "ENG"], minSubjects: 3, maxSubjects: 3, subjectNote: "Academic vocabulary, reading and grammar",
    mock: { perSubject: 12, minutes: 30, scoreStyle: "percent", maxSubjects: 3 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["det_pass"], tagline: "Duolingo English Test practice: vocabulary, reading and grammar", timeZone: "UTC", timeLabel: "UTC",
    audience: "an international student preparing for the Duolingo English Test for university admission",
  },
  CDL: {
    code: "CDL", name: "US CDL general knowledge test", short: "CDL", emoji: "🚛", kind: "work", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["CDL"], compulsory: ["CDL"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 36, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["cdl_pass"], tagline: "CDL general knowledge practice: inspection, hours of service, space management and emergencies", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a driver in the United States preparing for the commercial driver's licence (CDL) general knowledge test",
  },
  G1ON: {
    code: "G1ON", name: "Ontario G1 driver's knowledge test", short: "Ontario G1", emoji: "🍁", kind: "work", region: "CA", currency: "USD",
    subjectMode: "single", subjects: ["OG1"], compulsory: ["OG1"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 30, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["g1_pass"], tagline: "Ontario G1 practice: rules of the road, road signs and the graduated licensing rules", timeZone: "America/Toronto", timeLabel: "Canada Eastern",
    audience: "a new driver or newcomer in Ontario preparing for the G1 knowledge test",
  },
  APLUS: {
    code: "APLUS", name: "CompTIA A+ (Core 1 and 2)", short: "CompTIA A+", emoji: "🛠️", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["APL", "ITF"], compulsory: ["APL", "ITF"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 45, minutes: 60, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["aplus_pass"], tagline: "CompTIA A+ practice: ports, hardware, networking, Windows and Linux commands, security and troubleshooting", timeZone: "UTC", timeLabel: "UTC",
    audience: "a learner preparing for CompTIA A+ Core 1 (220-1101) and Core 2 (220-1102) for an IT support career",
  },
  CCNA: {
    code: "CCNA", name: "Cisco CCNA (200-301)", short: "CCNA", emoji: "🌐", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["CCX", "CCN"], compulsory: ["CCX", "CCN"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 50, minutes: 60, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["ccna_pass"], tagline: "CCNA practice with generated subnetting: switching, VLANs, OSPF, ACLs, NAT, IPv6 and automation", timeZone: "UTC", timeLabel: "UTC",
    audience: "a networking student preparing for the Cisco CCNA 200-301 exam",
  },
  JUPEB: {
    code: "JUPEB", name: "JUPEB (Nigeria direct entry)", short: "JUPEB", emoji: "🎓", kind: "school", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: SCHOOL_SUBJECTS, compulsory: [], minSubjects: 3, maxSubjects: 3, subjectNote: "Choose your three JUPEB subjects",
    mock: { perSubject: 15, minutes: 45, scoreStyle: "percent", maxSubjects: 3 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["jupeb_pass"], tagline: "JUPEB practice in your three subjects for direct entry to 200 level", timeZone: "Africa/Lagos", timeLabel: "Nigeria (WAT)",
    audience: "a Nigerian JUPEB student preparing for direct entry into 200 level at university",
  },
  NABTEB: {
    code: "NABTEB", name: "NABTEB (Nigeria)", short: "NABTEB", emoji: "📗", kind: "school", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: SCHOOL_SUBJECTS, compulsory: ["ENG", "MTH"], minSubjects: 4, maxSubjects: 6, subjectNote: "English + Maths + 2 to 4 more",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["student_month", "student_season"], tagline: "NABTEB practice: daily questions and timed CBT tests in your subjects", timeZone: "Africa/Lagos", timeLabel: "Nigeria (WAT)",
    audience: "a Nigerian student preparing for the NABTEB NBC/NTC examinations",
  },
  NMCN: {
    code: "NMCN", name: "NMCN nursing licensure (Nigeria)", short: "NMCN", emoji: "🩺", kind: "professional", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: ["NGN", "NCX", "NMN"], compulsory: ["NGN", "NCX", "NMN"], minSubjects: 3, maxSubjects: 3, subjectNote: "Nursing practice, clinical judgement and drug calculations",
    mock: { perSubject: 15, minutes: 60, scoreStyle: "percent", maxSubjects: 3 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["nmcn_pass"], tagline: "NMCN licensure practice: nursing process, maternal and child health, clinical judgement and drug calculations", timeZone: "Africa/Lagos", timeLabel: "Nigeria (WAT)",
    audience: "a nursing student in Nigeria preparing for the Nursing and Midwifery Council of Nigeria (NMCN) licensing examination",
  },
  USMLE: {
    code: "USMLE", name: "USMLE Step 1", short: "USMLE Step 1", emoji: "🩻", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["USM"], compulsory: ["USM"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 45, passPct: 60, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["usmle_pass"], tagline: "USMLE Step 1 practice: biochemistry, genetics, microbiology, pharmacology, physiology, pathology and immunology", timeZone: "UTC", timeLabel: "UTC",
    audience: "an international medical graduate preparing for USMLE Step 1 (basic sciences)",
  },
  GULFPH: {
    code: "GULFPH", name: "Gulf pharmacist licence (DHA, DOH, SCFHS, QCHP — Prometric)", short: "Gulf Pharmacist", emoji: "💊", kind: "professional", region: "GULF", currency: "USD",
    subjectMode: "single", subjects: ["GPH"], compulsory: ["GPH"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 40, minutes: 55, passPct: 60, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["gulfph_pass"], tagline: "Prometric-style pharmacist practice for the Gulf: pharmacology, clinical pharmacy and calculations", timeZone: "Asia/Dubai", timeLabel: "Gulf time",
    audience: "a pharmacist preparing for a Gulf licensing exam (DHA, DOH, SCFHS, QCHP or MOH) delivered by Prometric",
  },
  GULFDR: {
    code: "GULFDR", name: "Gulf doctor licence (DHA, DOH, SCFHS, QCHP — Prometric)", short: "Gulf Doctor", emoji: "🩺", kind: "professional", region: "GULF", currency: "USD",
    subjectMode: "single", subjects: ["PLB", "USM"], compulsory: ["PLB", "USM"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 60, minutes: 75, passPct: 60, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["gulfdr_pass"], tagline: "Prometric-style practice for doctors moving to the Gulf: clinical best-of-five plus basic sciences", timeZone: "Asia/Dubai", timeLabel: "Gulf time",
    audience: "a doctor preparing for a Gulf licensing exam (DHA, DOH, SCFHS, QCHP or MOH) delivered by Prometric",
  },
  UAEDRV: {
    code: "UAEDRV", name: "UAE driving theory test (RTA / ITC)", short: "UAE Driving Theory", emoji: "🚗", kind: "work", region: "GULF", currency: "USD",
    subjectMode: "single", subjects: ["UDR"], compulsory: ["UDR"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 26, passPct: 66, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["uaedrv_pass"], tagline: "UAE driving theory practice: rules of the road, signs, safety, weather and emergencies", timeZone: "Asia/Dubai", timeLabel: "Gulf time",
    audience: "a new driver or expat in the UAE preparing for the RTA (Dubai) or ITC (Abu Dhabi) driving theory test",
  },
  UAETLS: {
    code: "UAETLS", name: "UAE Teacher Licence (TLS) — pedagogy", short: "UAE Teacher Licence", emoji: "🧑‍🏫", kind: "professional", region: "GULF", currency: "USD",
    subjectMode: "single", subjects: ["TLP", "CDP"], compulsory: ["TLP", "CDP"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 40, minutes: 60, passPct: 65, scoreStyle: "percent", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["tls_pass"], tagline: "UAE Teacher Licensing System pedagogy practice: planning, assessment, differentiation, inclusion and child development", timeZone: "Asia/Dubai", timeLabel: "Gulf time",
    audience: "a teacher in the UAE preparing for the Ministry of Education Teacher Licensing System (TLS) pedagogy test",
  },
  GULFLAB: {
    code: "GULFLAB", name: "Gulf medical laboratory licence (DHA, DOH, MOH, QCHP — Prometric)", short: "Gulf Lab Technologist", emoji: "🧪", kind: "professional", region: "GULF", currency: "USD",
    subjectMode: "single", subjects: ["LAB", "USM"], compulsory: ["LAB", "USM"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 40, minutes: 60, passPct: 50, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["gulflab_pass"], tagline: "Prometric-style practice for laboratory technologists and technicians: specimen collection, chemistry, haematology, blood bank, microbiology and QC", timeZone: "Asia/Dubai", timeLabel: "Gulf time",
    audience: "a medical laboratory technologist or technician preparing for a Gulf licensing exam (DHA, DOH, MOH, QCHP or SCFHS) delivered by Prometric",
  },
  GULFPT: {
    code: "GULFPT", name: "Gulf physiotherapy licence (DHA, DOH, MOH, QCHP — Prometric)", short: "Gulf Physiotherapist", emoji: "🦴", kind: "professional", region: "GULF", currency: "USD",
    subjectMode: "single", subjects: ["PHT", "TSC"], compulsory: ["PHT", "TSC"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 40, minutes: 60, passPct: 50, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["gulfpt_pass"], tagline: "Prometric-style practice for physiotherapists: musculoskeletal tests, nerve injuries, neurology, electrotherapy and anatomy", timeZone: "Asia/Dubai", timeLabel: "Gulf time",
    audience: "a physiotherapist preparing for a Gulf licensing exam (DHA, DOH, MOH, QCHP or SCFHS) delivered by Prometric",
  },
  GULFDEN: {
    code: "GULFDEN", name: "Gulf dentist licence (DHA, DOH, MOH, QCHP — Prometric)", short: "Gulf Dentist", emoji: "🦷", kind: "professional", region: "GULF", currency: "USD",
    subjectMode: "single", subjects: ["DEN", "USM"], compulsory: ["DEN", "USM"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 40, minutes: 60, passPct: 60, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["gulfden_pass"], tagline: "Prometric-style practice for general dentists: anatomy, caries, operative, endodontics, periodontics, oral surgery and orthodontics", timeZone: "Asia/Dubai", timeLabel: "Gulf time",
    audience: "a general dentist preparing for a Gulf licensing exam (DHA, DOH, MOH, QCHP, SCFHS/SDLE) delivered by Prometric",
  },
  DUBAIPIC: {
    code: "DUBAIPIC", name: "Dubai Person in Charge (PIC) food safety", short: "Dubai PIC Food Safety", emoji: "🍽️", kind: "work", region: "GULF", currency: "USD",
    subjectMode: "single", subjects: ["PIC"], compulsory: ["PIC"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 30, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["pic_pass"], tagline: "Dubai PIC food safety practice: HACCP, hazards, temperature control, storage, hygiene and the PIC's role", timeZone: "Asia/Dubai", timeLabel: "Gulf time",
    audience: "a food business supervisor in Dubai preparing for the Dubai Municipality Person in Charge (PIC) food safety exam",
  },
  SIRA: {
    code: "SIRA", name: "Dubai SIRA security guard licence", short: "SIRA Security Guard", emoji: "🛡️", kind: "work", region: "GULF", currency: "USD",
    subjectMode: "single", subjects: ["SRA", "FIR"], compulsory: ["SRA", "FIR"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 40, minutes: 45, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["sira_pass"], tagline: "SIRA security guard practice: duties, access control, reporting, emergencies, fire safety and professional conduct", timeZone: "Asia/Dubai", timeLabel: "Gulf time",
    audience: "a security guard in Dubai preparing for the SIRA security guard certification exam",
  },
  DMVCA: {
    code: "DMVCA", name: "California DMV permit test", short: "California permit test", emoji: "🚗", kind: "work", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["USD", "CAD"], compulsory: ["USD", "CAD"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 36, minutes: 36, passPct: 83, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["dmv_pass"], tagline: "California permit test practice: road signs, rules of the road, alcohol laws and California-specific rules", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a new driver or newcomer in California preparing for the state's written driver's knowledge (permit) test",
  },
  DMVTX: {
    code: "DMVTX", name: "Texas DMV permit test", short: "Texas permit test", emoji: "🚗", kind: "work", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["USD", "TXD"], compulsory: ["USD", "TXD"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 30, minutes: 30, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["dmv_pass"], tagline: "Texas permit test practice: road signs, rules of the road, alcohol laws and Texas-specific rules", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a new driver or newcomer in Texas preparing for the state's written driver's knowledge (permit) test",
  },
  DMVFL: {
    code: "DMVFL", name: "Florida DMV permit test", short: "Florida permit test", emoji: "🚗", kind: "work", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["USD", "FLD"], compulsory: ["USD", "FLD"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 50, minutes: 50, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["dmv_pass"], tagline: "Florida permit test practice: road signs, rules of the road, alcohol laws and Florida-specific rules", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a new driver or newcomer in Florida preparing for the state's written driver's knowledge (permit) test",
  },
  DMVNY: {
    code: "DMVNY", name: "New York DMV permit test", short: "New York permit test", emoji: "🚗", kind: "work", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["USD", "NYD"], compulsory: ["USD", "NYD"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 20, minutes: 20, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["dmv_pass"], tagline: "New York permit test practice: road signs, rules of the road, alcohol laws and New York-specific rules", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a new driver or newcomer in New York preparing for the state's written driver's knowledge (permit) test",
  },
  DMVGA: {
    code: "DMVGA", name: "Georgia DMV permit test", short: "Georgia permit test", emoji: "🚗", kind: "work", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["USD", "GAD"], compulsory: ["USD", "GAD"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 40, minutes: 40, passPct: 75, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["dmv_pass"], tagline: "Georgia permit test practice: road signs, rules of the road, alcohol laws and Georgia-specific rules", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a new driver or newcomer in Georgia preparing for the state's written driver's knowledge (permit) test",
  },
  PTCB: {
    code: "PTCB", name: "Pharmacy technician (PTCB PTCE)", short: "Pharmacy Tech (PTCB)", emoji: "💊", kind: "professional", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["PTB", "GPH"], compulsory: ["PTB", "GPH"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 50, minutes: 60, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["ptcb_pass"], tagline: "PTCB practice: drug names and classes, federal law, sig codes, safety and pharmacy calculations", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US pharmacy technician candidate preparing for the PTCB Pharmacy Technician Certification Exam (PTCE)",
  },
  PHLEB: {
    code: "PHLEB", name: "Phlebotomy technician (NHA CPT)", short: "Phlebotomy (NHA CPT)", emoji: "🩸", kind: "professional", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["PHB", "LAB"], compulsory: ["PHB", "LAB"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 45, minutes: 60, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["phleb_pass"], tagline: "Phlebotomy practice: order of draw, tube additives, venipuncture technique, special handling and safety", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US phlebotomy student preparing for the NHA Certified Phlebotomy Technician (CPT) exam",
  },
  CCMA: {
    code: "CCMA", name: "Medical assistant (NHA CCMA)", short: "Medical Assistant (CCMA)", emoji: "🩺", kind: "professional", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["MAQ", "PHB", "CNA"], compulsory: ["MAQ", "PHB", "CNA"], minSubjects: 3, maxSubjects: 3, subjectNote: "",
    mock: { total: 50, minutes: 60, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["ccma_pass"], tagline: "CCMA practice: injections, ECG, vital signs, infection control, phlebotomy, HIPAA and front office", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US medical assistant student preparing for the NHA Certified Clinical Medical Assistant (CCMA) exam",
  },
  CPC: {
    code: "CPC", name: "Medical coding (AAPC CPC)", short: "Medical Coding (CPC)", emoji: "🧾", kind: "professional", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["MCD"], compulsory: ["MCD"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 48, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["cpc_pass"], tagline: "CPC practice: ICD-10-CM, CPT and HCPCS rules, modifiers, E/M and compliance", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US medical coding student preparing for the AAPC Certified Professional Coder (CPC) exam",
  },
  NCLEXPN: {
    code: "NCLEXPN", name: "NCLEX-PN (US practical nurse licence)", short: "NCLEX-PN", emoji: "🏥", kind: "professional", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["NCX", "NMN"], compulsory: ["NCX", "NMN"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 85, minutes: 120, passPct: 60, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["nclexpn_pass"], tagline: "NCLEX-PN practice: safety, prioritisation, pharmacology and dosage calculations", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a practical/vocational nursing graduate preparing for the NCLEX-PN licensing exam",
  },
  HESI: {
    code: "HESI", name: "HESI A2 (nursing school entrance)", short: "HESI A2", emoji: "🩺", kind: "school", region: "US", currency: "USD",
    subjectMode: "multi", subjects: ["MTH", "VRB", "ENG", "TSC", "BIO", "CHM"], compulsory: ["MTH", "VRB", "ENG", "TSC"], minSubjects: 4, maxSubjects: 6, subjectNote: "Math, Reading, Grammar/Vocabulary and A&P; add Biology or Chemistry if your school requires them",
    mock: { perSubject: 15, minutes: 75, scoreStyle: "percent", maxSubjects: 4 },
    mockVariants: [
      { key: "CORE", label: "HESI core practice", short: "Core", subjects: ["MTH", "VRB", "ENG", "TSC"], total: 15, minutes: 75, note: "60 questions · 75 min" },
      { key: "AP", label: "Anatomy & Physiology", short: "A&P", subjects: ["TSC"], total: 30, minutes: 25, note: "30 questions · 25 min" },
      { key: "MATH", label: "Math", short: "Math", subjects: ["MTH"], total: 50, minutes: 50, note: "50 questions · 50 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["hesi_pass"], tagline: "HESI A2 practice: math, reading, grammar, vocabulary, anatomy and physiology, biology and chemistry", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US student applying to nursing school and preparing for the HESI A2 admission assessment",
  },
  REALEST: {
    code: "REALEST", name: "Real estate salesperson licence (national portion)", short: "Real Estate Licence", emoji: "🏠", kind: "professional", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["RES"], compulsory: ["RES"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 45, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["realest_pass"], tagline: "Real estate exam practice: ownership, agency, fair housing, contracts, finance and real estate math", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US real estate salesperson licence candidate preparing for the national portion of the state licensing exam",
  },
  LIFEINS: {
    code: "LIFEINS", name: "Life and health insurance producer licence", short: "Life & Health Insurance", emoji: "🛡️", kind: "professional", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["LHI"], compulsory: ["LHI"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 45, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["lifeins_pass"], tagline: "Life and health insurance licence practice: policy types, provisions, health plans, Medicare, annuities and ethics", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US insurance producer candidate preparing for a state life and health licensing exam",
  },
  SERVSAFE: {
    code: "SERVSAFE", name: "ServSafe Food Protection Manager", short: "ServSafe Manager", emoji: "🍽️", kind: "work", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["SSM"], compulsory: ["SSM"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 27, passPct: 75, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["servsafe_pass"], tagline: "ServSafe Manager practice: cooking and holding temperatures, cooling, the Big Six, allergens, receiving, storage and cleaning", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US restaurant manager or supervisor preparing for the ServSafe Food Protection Manager Certification exam",
  },
  EPA608: {
    code: "EPA608", name: "EPA Section 608 refrigerant certification", short: "EPA 608", emoji: "❄️", kind: "work", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["EPA"], compulsory: ["EPA"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 20, minutes: 25, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["epa608_pass"], tagline: "EPA 608 practice: Core, Type I, Type II and Type III", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "an HVAC/R technician preparing for EPA Section 608 certification",
  },
  ACT: {
    code: "ACT", name: "ACT (Enhanced)", short: "ACT", emoji: "🎓", kind: "school", region: "US", currency: "USD",
    subjectMode: "multi", subjects: ["ENG", "MTH", "VRB", "GSC"], compulsory: ["ENG", "MTH", "VRB"], minSubjects: 3, maxSubjects: 4, subjectNote: "English, Math and Reading; add Science if you are taking it",
    mock: { perSubject: 15, minutes: 60, scoreStyle: "percent", maxSubjects: 4 },
    mockVariants: [
      { key: "CORE", label: "ACT core practice", short: "Core", subjects: ["ENG", "MTH", "VRB"], total: 15, minutes: 60, note: "45 questions · 60 min" },
      { key: "MATH", label: "Math sectional", short: "Math", subjects: ["MTH"], total: 45, minutes: 50, note: "45 questions · 50 min" },
      { key: "SCI", label: "Science (optional section)", short: "Science", subjects: ["GSC"], total: 40, minutes: 40, note: "40 questions · 40 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["act_pass"], tagline: "ACT practice: English, Math, Reading and optional Science", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US high school student preparing for the Enhanced ACT for college admission",
  },
  HISET: {
    code: "HISET", name: "HiSET (high school equivalency)", short: "HiSET", emoji: "🎓", kind: "school", region: "US", currency: "USD",
    subjectMode: "multi", subjects: ["MTH", "ENG", "GSS", "GSC"], compulsory: ["MTH", "ENG", "GSS", "GSC"], minSubjects: 4, maxSubjects: 4, subjectNote: "Math, Language Arts, Social Studies and Science",
    mock: { perSubject: 15, minutes: 80, scoreStyle: "percent", maxSubjects: 4 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["hiset_pass"], tagline: "HiSET practice for all subjects: math, language arts, social studies and science", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "an adult in the United States preparing for the HiSET high school equivalency exam",
  },
  PRAXIS: {
    code: "PRAXIS", name: "Praxis Core (teacher certification)", short: "Praxis Core", emoji: "🧑‍🏫", kind: "professional", region: "US", currency: "USD",
    subjectMode: "multi", subjects: ["VRB", "ENG", "MTH"], compulsory: ["VRB", "ENG", "MTH"], minSubjects: 3, maxSubjects: 3, subjectNote: "Reading, Writing and Mathematics",
    mock: { perSubject: 15, minutes: 60, scoreStyle: "percent", maxSubjects: 3 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["praxis_pass"], tagline: "Praxis Core practice: reading, writing and mathematics for teacher candidates", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a US teacher education candidate preparing for the Praxis Core Academic Skills for Educators tests",
  },
  SIE: {
    code: "SIE", name: "Securities Industry Essentials (SIE)", short: "SIE", emoji: "📈", kind: "professional", region: "US", currency: "USD",
    subjectMode: "single", subjects: ["SIE"], compulsory: ["SIE"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 30, minutes: 42, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["sie_pass"], tagline: "SIE practice: securities regulation, products, trading, customer accounts and compliance", timeZone: "America/New_York", timeLabel: "US Eastern",
    audience: "a candidate preparing for the FINRA Securities Industry Essentials exam for a finance career",
  },
  ISC2CC: {
    code: "ISC2CC", name: "ISC2 Certified in Cybersecurity (CC)", short: "ISC2 CC", emoji: "🔐", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["ICC"], compulsory: ["ICC"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 50, minutes: 60, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["isc2_pass"], tagline: "ISC2 CC practice across all five domains: principles, continuity, access control, network security and operations", timeZone: "UTC", timeLabel: "UTC",
    audience: "a beginner starting a cybersecurity career and preparing for the ISC2 Certified in Cybersecurity exam",
  },
  AWSSAA: {
    code: "AWSSAA", name: "AWS Solutions Architect Associate (SAA-C03)", short: "AWS Solutions Architect", emoji: "🏗️", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["SAA"], compulsory: ["SAA"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 65, minutes: 130, passPct: 72, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["saa_pass"], tagline: "SAA-C03 practice: storage, databases, networking, security, decoupling and Well-Architected design", timeZone: "UTC", timeLabel: "UTC",
    audience: "a cloud learner preparing for the AWS Certified Solutions Architect – Associate (SAA-C03) exam",
  },
  AICERT: {
    code: "AICERT", name: "AI certifications (AI-900 / AWS AI Practitioner)", short: "AI certifications", emoji: "🤖", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["AIF"], compulsory: ["AIF"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 40, minutes: 45, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["aicert_pass"], tagline: "AI fundamentals for Microsoft AI-900 and AWS AI Practitioner: ML, generative AI, responsible AI and cloud AI services", timeZone: "UTC", timeLabel: "UTC",
    audience: "someone preparing for Microsoft Azure AI Fundamentals (AI-900) or AWS Certified AI Practitioner",
  },
  GCPCDL: {
    code: "GCPCDL", name: "Google Cloud Digital Leader", short: "Google Cloud", emoji: "🌥️", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["GCL"], compulsory: ["GCL"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 50, minutes: 90, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["gcp_pass"], tagline: "Google Cloud Digital Leader practice: cloud basics, data, AI, security, operations and cost", timeZone: "UTC", timeLabel: "UTC",
    audience: "someone preparing for the Google Cloud Digital Leader certification",
  },
  AZ104: {
    code: "AZ104", name: "Microsoft Azure Administrator (AZ-104)", short: "Azure Administrator", emoji: "🔷", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["AZA"], compulsory: ["AZA"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 50, minutes: 100, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["az104_pass"], tagline: "AZ-104 practice: identity, governance, storage, compute, networking, monitoring and backup", timeZone: "UTC", timeLabel: "UTC",
    audience: "an IT professional preparing for the Microsoft Azure Administrator (AZ-104) exam",
  },
  CISSP: {
    code: "CISSP", name: "CISSP (ISC2)", short: "CISSP", emoji: "🛡️", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["CSP"], compulsory: ["CSP"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 100, minutes: 180, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["cissp_pass"], tagline: "CISSP practice across all eight domains: risk, assets, architecture, networks, IAM, testing, operations and software", timeZone: "UTC", timeLabel: "UTC",
    audience: "an experienced security professional preparing for the ISC2 CISSP exam",
  },
  DEVOPS: {
    code: "DEVOPS", name: "Kubernetes, Docker & Terraform (KCNA / Terraform Associate)", short: "DevOps & Kubernetes", emoji: "⚙️", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["DVO"], compulsory: ["DVO"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 60, minutes: 90, passPct: 75, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["devops_pass"], tagline: "DevOps practice: containers, Kubernetes objects, cloud native tools, CI/CD and Terraform", timeZone: "UTC", timeLabel: "UTC",
    audience: "an engineer preparing for the Kubernetes KCNA or HashiCorp Terraform Associate exam",
  },
  DIGMKT: {
    code: "DIGMKT", name: "Digital marketing (Google Ads, GA4, HubSpot, Meta)", short: "Digital marketing", emoji: "📣", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["DMK"], compulsory: ["DMK"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 50, minutes: 75, passPct: 80, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["digmkt_pass"], tagline: "Digital marketing practice: Google Ads, Google Analytics 4, SEO, inbound, email and Meta ads", timeZone: "UTC", timeLabel: "UTC",
    audience: "a marketer preparing for Google Ads, Google Analytics, HubSpot or Meta certifications",
  },
  HRCERT: {
    code: "HRCERT", name: "HR certification (SHRM-CP / PHR)", short: "HR certification", emoji: "🧑‍💼", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["HRM"], compulsory: ["HRM"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 60, minutes: 90, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["hrcert_pass"], tagline: "HR practice for SHRM-CP and PHR: recruitment, US employment law, employee relations, rewards, L&D and change", timeZone: "UTC", timeLabel: "UTC",
    audience: "an HR professional preparing for the SHRM-CP or HRCI PHR certification",
  },
  PSPO: {
    code: "PSPO", name: "Product Owner & product management (PSPO I)", short: "Product Owner", emoji: "🧭", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["PDO"], compulsory: ["PDO"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 80, minutes: 60, passPct: 85, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["pspo_pass"], tagline: "Product Owner practice: Scrum accountabilities, backlog management, value, discovery, prioritisation and metrics", timeZone: "UTC", timeLabel: "UTC",
    audience: "someone preparing for Professional Scrum Product Owner (PSPO I) or a product manager role",
  },
  SFADMIN: {
    code: "SFADMIN", name: "Salesforce Administrator", short: "Salesforce Admin", emoji: "☁️", kind: "professional", region: "GLOBAL", currency: "USD",
    subjectMode: "single", subjects: ["SFA"], compulsory: ["SFA"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 60, minutes: 105, passPct: 65, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["sfa_pass"], tagline: "Salesforce Administrator practice: security and sharing, data model, Flow automation, data and reports", timeZone: "UTC", timeLabel: "UTC",
    audience: "a career changer or admin preparing for the Salesforce Certified Administrator exam",
  },
  ETEXIT: {
    code: "ETEXIT", name: "Ethiopia University Exit Exam", short: "Exit Exam Ethiopia", emoji: "🎓", kind: "professional", region: "ET", currency: "USD",
    subjectMode: "multi", subjects: ["AFA", "AMA", "EXA", "EXC", "EXM", "EXE"], compulsory: [], minSubjects: 1, maxSubjects: 3,
    subjectNote: "Pick your programme's subjects: Accounting & Finance, Computer Science, Management or Economics",
    mock: { perSubject: 20, minutes: 60, passPct: 50, scoreStyle: "passfail", maxSubjects: 3 },
    mockVariants: [
      { key: "ACC", label: "Accounting & Finance", short: "Accounting", subjects: ["AFA", "AMA", "EXA"], total: 20, minutes: 90, passPct: 50, note: "60 questions · 90 min · 50% to pass" },
      { key: "CS", label: "Computer Science", short: "Computer Sci", subjects: ["EXC"], total: 50, minutes: 75, passPct: 50, note: "50 questions · 75 min" },
      { key: "MGT", label: "Management", short: "Management", subjects: ["EXM"], total: 50, minutes: 75, passPct: 50, note: "50 questions · 75 min" },
      { key: "ECON", label: "Economics", short: "Economics", subjects: ["EXE"], total: 50, minutes: 75, passPct: 50, note: "50 questions · 75 min" },
    ],
    weeklyMock: false, askState: false, askSchool: true,
    plans: ["exit_pass"], tagline: "Exit exam practice by programme: Accounting & Finance, Computer Science, Management and Economics", timeZone: "Africa/Addis_Ababa", timeLabel: "Ethiopia",
    audience: "a final-year Ethiopian university student preparing for the national exit exam in their degree programme (50% pass mark)",
  },
  CSEE: {
    code: "CSEE", name: "Tanzania CSEE (Form Four)", short: "CSEE Tanzania", emoji: "🇹🇿", kind: "school", region: "TZ", currency: "USD",
    subjectMode: "multi", subjects: ["ENG", "MTH", "BIO", "CHM", "PHY", "GEO", "TZC"], compulsory: ["ENG", "MTH", "TZC"], minSubjects: 3, maxSubjects: 7, subjectNote: "English, Basic Maths and Civics plus your sciences and Geography",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: false, askSchool: true,
    plans: ["csee_season"], tagline: "CSEE (Form Four) practice: English, Basic Mathematics, Civics, sciences and Geography", timeZone: "Africa/Nairobi", timeLabel: "Tanzania (EAT)",
    audience: "a Tanzanian Form Four student preparing for the NECTA Certificate of Secondary Education Examination",
  },
  UCE: {
    code: "UCE", name: "Uganda UCE (Senior Four)", short: "UCE Uganda", emoji: "🇺🇬", kind: "school", region: "UG", currency: "USD",
    subjectMode: "multi", subjects: ["ENG", "MTH", "BIO", "CHM", "PHY", "GEO", "UGC"], compulsory: ["ENG", "MTH"], minSubjects: 3, maxSubjects: 7, subjectNote: "English and Maths plus your sciences, Geography and Uganda studies",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: false, askSchool: true,
    plans: ["uce_season"], tagline: "UCE (Senior Four) practice: English, Maths, sciences, Geography and Uganda general knowledge", timeZone: "Africa/Nairobi", timeLabel: "Uganda (EAT)",
    audience: "a Ugandan Senior Four student preparing for the UNEB Uganda Certificate of Education",
  },
  UACE: {
    code: "UACE", name: "Uganda UACE (Senior Six / A-Level)", short: "UACE Uganda", emoji: "🇺🇬", kind: "school", region: "UG", currency: "USD",
    subjectMode: "multi", subjects: ["ENG", "MTH", "PHY", "CHM", "BIO", "ECO", "GEO", "UGC"], compulsory: [], minSubjects: 3, maxSubjects: 5, subjectNote: "Pick your principal subjects plus subsidiaries",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: false, askSchool: true,
    plans: ["uace_season"], tagline: "UACE (A-Level) practice: Maths, sciences, Economics, Geography, English and Uganda general knowledge", timeZone: "Africa/Nairobi", timeLabel: "Uganda (EAT)",
    audience: "a Ugandan Senior Six student preparing for the UNEB Uganda Advanced Certificate of Education",
  },
  ACSEE: {
    code: "ACSEE", name: "Tanzania ACSEE (Form Six)", short: "ACSEE Tanzania", emoji: "🇹🇿", kind: "school", region: "TZ", currency: "USD",
    subjectMode: "multi", subjects: ["ENG", "MTH", "PHY", "CHM", "BIO", "ECO", "GEO", "TZC"], compulsory: [], minSubjects: 3, maxSubjects: 5, subjectNote: "Pick your combination subjects plus General Studies",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: false, askSchool: true,
    plans: ["acsee_season"], tagline: "ACSEE (Form Six) practice: Maths, sciences, Economics, Geography, English and General Studies", timeZone: "Africa/Nairobi", timeLabel: "Tanzania (EAT)",
    audience: "a Tanzanian Form Six student preparing for the NECTA Advanced Certificate of Secondary Education Examination",
  },
  RWA6: {
    code: "RWA6", name: "Rwanda A-Level National Exam (S6)", short: "S6 Rwanda", emoji: "🇷🇼", kind: "school", region: "RW", currency: "USD",
    subjectMode: "multi", subjects: ["ENG", "MTH", "PHY", "CHM", "BIO", "ECO", "GEO"], compulsory: [], minSubjects: 3, maxSubjects: 5, subjectNote: "Pick the subjects in your combination",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: false, askSchool: true,
    plans: ["rwa_season"], tagline: "Rwanda S6 national exam practice: Maths, Physics, Chemistry, Biology, Economics, Geography and English", timeZone: "Africa/Johannesburg", timeLabel: "Rwanda (CAT)",
    audience: "a Rwandan Senior Six student preparing for the national A-Level examinations, taught in English",
  },
  CPAUG: {
    code: "CPAUG", name: "Uganda CPA (ICPAU)", short: "CPA Uganda", emoji: "📒", kind: "professional", region: "UG", currency: "USD",
    subjectMode: "multi", subjects: ["AFA", "AMA", "ABT", "EXE"], compulsory: [], minSubjects: 1, maxSubjects: 4,
    subjectNote: "Financial and management accounting, business and economics",
    mock: { perSubject: 15, minutes: 60, passPct: 50, scoreStyle: "passfail", maxSubjects: 3 },
    mockVariants: [
      { key: "FA", label: "Financial Accounting", short: "Financial Acc", subjects: ["AFA"], total: 40, minutes: 60, passPct: 50, note: "40 questions · 60 min" },
      { key: "MA", label: "Management Accounting", short: "Management Acc", subjects: ["AMA"], total: 40, minutes: 60, passPct: 50, note: "40 questions · 60 min" },
      { key: "ECON", label: "Economics", short: "Economics", subjects: ["EXE"], total: 30, minutes: 45, passPct: 50, note: "30 questions · 45 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["cpaug_pass"], tagline: "CPA Uganda practice: financial and management accounting, business and economics", timeZone: "Africa/Nairobi", timeLabel: "Uganda (EAT)",
    audience: "a Ugandan accounting student preparing for the ICPAU Certified Public Accountant exams",
  },
  CPATZ: {
    code: "CPATZ", name: "Tanzania CPA (NBAA)", short: "CPA Tanzania", emoji: "📒", kind: "professional", region: "TZ", currency: "USD",
    subjectMode: "multi", subjects: ["AFA", "AMA", "ABT", "EXE"], compulsory: [], minSubjects: 1, maxSubjects: 4,
    subjectNote: "Financial and management accounting, business and economics",
    mock: { perSubject: 15, minutes: 60, passPct: 50, scoreStyle: "passfail", maxSubjects: 3 },
    mockVariants: [
      { key: "FA", label: "Financial Accounting", short: "Financial Acc", subjects: ["AFA"], total: 40, minutes: 60, passPct: 50, note: "40 questions · 60 min" },
      { key: "MA", label: "Management Accounting", short: "Management Acc", subjects: ["AMA"], total: 40, minutes: 60, passPct: 50, note: "40 questions · 60 min" },
      { key: "ECON", label: "Economics", short: "Economics", subjects: ["EXE"], total: 30, minutes: 45, passPct: 50, note: "30 questions · 45 min" },
    ],
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["cpatz_pass"], tagline: "CPA Tanzania practice: financial and management accounting, business and economics", timeZone: "Africa/Nairobi", timeLabel: "Tanzania (EAT)",
    audience: "a Tanzanian accounting student preparing for the NBAA Certified Public Accountant exams",
  },
  KEDRV: {
    code: "KEDRV", name: "Kenya driving theory test (NTSA)", short: "Kenya driving test", emoji: "🚗", kind: "work", region: "KE", currency: "USD",
    subjectMode: "single", subjects: ["RSG", "EAL", "KDR"], compulsory: ["RSG", "EAL", "KDR"], minSubjects: 3, maxSubjects: 3, subjectNote: "",
    mock: { total: 30, minutes: 30, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["kedrv_pass"], tagline: "Kenya driving theory practice: road signs, keep-left rules, the model town and Kenyan traffic rules", timeZone: "Africa/Nairobi", timeLabel: "Kenya",
    audience: "a learner driver in Kenya preparing for the NTSA driving test theory and model town board",
  },
  UGDRV: {
    code: "UGDRV", name: "Uganda driving permit theory test", short: "Uganda driving test", emoji: "🚗", kind: "work", region: "UG", currency: "USD",
    subjectMode: "single", subjects: ["RSG", "EAL"], compulsory: ["RSG", "EAL"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 25, minutes: 25, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["ugdrv_pass"], tagline: "Uganda driving theory practice: road signs, keep-left rules and safe driving", timeZone: "Africa/Nairobi", timeLabel: "Uganda (EAT)",
    audience: "a learner driver in Uganda preparing for the driving permit theory test",
  },
  TZDRV: {
    code: "TZDRV", name: "Tanzania driving licence theory test", short: "Tanzania driving test", emoji: "🚗", kind: "work", region: "TZ", currency: "USD",
    subjectMode: "single", subjects: ["RSG", "EAL"], compulsory: ["RSG", "EAL"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 25, minutes: 25, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["tzdrv_pass"], tagline: "Tanzania driving theory practice: road signs, keep-left rules and safe driving", timeZone: "Africa/Nairobi", timeLabel: "Tanzania (EAT)",
    audience: "a learner driver in Tanzania preparing for the driving licence theory test",
  },
  RWDRV: {
    code: "RWDRV", name: "Rwanda provisional driving licence test", short: "Rwanda driving test", emoji: "🚗", kind: "work", region: "RW", currency: "USD",
    subjectMode: "single", subjects: ["RSG", "RDR"], compulsory: ["RSG", "RDR"], minSubjects: 2, maxSubjects: 2, subjectNote: "",
    mock: { total: 20, minutes: 20, passPct: 70, scoreStyle: "passfail", maxSubjects: 1 },
    weeklyMock: false, askState: false, askSchool: false,
    plans: ["rwdrv_pass"], tagline: "Rwanda provisional licence practice: road signs, keep-right and priority rules, and Rwandan traffic rules", timeZone: "Africa/Johannesburg", timeLabel: "Rwanda (CAT)",
    audience: "a learner driver in Rwanda preparing for the Rwanda National Police provisional licence theory test",
  },
  CMGCE: {
    code: "CMGCE", name: "Cameroon GCE O Level", short: "GCE Cameroon", emoji: "🇨🇲", kind: "school", region: "CM", currency: "USD",
    subjectMode: "multi", subjects: ["ENG", "MTH", "BIO", "CHM", "PHY", "GEO", "ECO", "CMC"], compulsory: ["ENG", "MTH"], minSubjects: 3, maxSubjects: 8, subjectNote: "English and Maths plus your sciences, Geography, Economics and Cameroon studies",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: false, askState: false, askSchool: true,
    plans: ["gce_season"], tagline: "GCE O Level practice for English-speaking Cameroon: English, Maths, sciences and more", timeZone: "Africa/Lagos", timeLabel: "Cameroon (WAT)",
    audience: "an English-speaking Cameroonian student preparing for the Cameroon GCE Ordinary Level",
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
export const TECH_TRACK_CODES = [
  "ITF",
  "CCST",
  "AWS",
  "AZF",
  "PYT",
  "SEC",
  "DAT",
  "AIA",
  "CON",
  "BKP"
] as const;
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
