// A "track" is anything a learner prepares for: an exam, a test, a work course.
// Add a track here + its questions (subject code) and it works across bot, web, drills and mocks.
import { STATES } from "./subjects";

export type TrackCode = "JAMB" | "WAEC" | "PUTME" | "WASSCE_GH" | "LUK" | "FIRE" | "NMC" | "PM";
export type ScoreStyle = "jamb400" | "percent" | "passfail";

export interface MockVariant {
  key: string;
  label: string;
  short: string;
  subjects: string[];
  total: number;
  minutes: number;
  passPct?: number;
  note?: string;
}

export interface Track {
  code: TrackCode;
  name: string;
  short: string;
  emoji: string;
  kind: "school" | "citizenship" | "work" | "professional";
  region: "NG" | "GH" | "WA" | "UK" | "GLOBAL";
  currency: "NGN" | "GBP";
  subjectMode: "multi" | "single";
  subjects: string[];
  compulsory: string[];
  minSubjects: number;
  maxSubjects: number;
  subjectNote: string;
  mock: { perSubject?: number; total?: number; minutes: number; passPct?: number; scoreStyle: ScoreStyle; maxSubjects: number };
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
  timeZone: "Africa/Lagos" | "Europe/London";
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
};

export const TRACK_LIST = Object.values(TRACKS);
export const SCHOOL_TRACKS = TRACK_LIST.filter((t) => t.weeklyMock).map((t) => t.code);
export const UK_TIME_TRACKS = TRACK_LIST.filter((t) => t.timeZone === "Europe/London").map((t) => t.code);

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
  if (v) return { variant: v.key, label: v.label, subjects: v.subjects, perSubject: v.total, minutes: v.minutes, passPct: v.passPct, scoreStyle: t.mock.scoreStyle };
  if (t.mockVariants?.length) {
    const d = t.mockVariants.find((x) => x.key === "B") ?? t.mockVariants[0];
    return { variant: d.key, label: d.label, subjects: d.subjects, perSubject: d.total, minutes: d.minutes, passPct: d.passPct, scoreStyle: t.mock.scoreStyle };
  }
  return { variant: null, label: null, subjects: null as string[] | null, perSubject: mockPerSubject(t), minutes: t.mock.minutes, passPct: t.mock.passPct, scoreStyle: t.mock.scoreStyle };
}

/** Practice-test variants relevant to this learner (multi-subject tracks only show variants for chosen subjects). */
export function variantsFor(t: Track, subjects: string[]): MockVariant[] {
  const all = t.mockVariants ?? [];
  if (t.subjectMode !== "multi") return all;
  const mine = all.filter((v) => v.subjects.some((s) => subjects.includes(s)));
  return mine.length ? mine : all;
}
