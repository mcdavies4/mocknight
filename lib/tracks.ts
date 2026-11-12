// A "track" is anything a learner prepares for: an exam, a test, a work course.
// Add a track here + its questions (subject code) and it works across bot, web, drills and mocks.
import { STATES } from "./subjects";

export type TrackCode = "JAMB" | "WAEC" | "PUTME" | "WASSCE_GH" | "LUK" | "FIRE";
export type ScoreStyle = "jamb400" | "percent" | "passfail";

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
