// A "track" is anything a learner prepares for: an exam, a test, a work course.
// Add a track here + its questions (subject code) and it works across bot, web, drills and mocks.

export type TrackCode = "JAMB" | "WAEC" | "LUK";
export type ScoreStyle = "jamb400" | "percent" | "passfail";

export interface Track {
  code: TrackCode;
  name: string;
  short: string;
  emoji: string;
  kind: "school" | "citizenship" | "work" | "professional";
  region: "NG" | "WA" | "UK" | "GLOBAL";
  currency: "NGN" | "GBP";
  subjectMode: "multi" | "single";
  /** multi: subjects to choose from; single: the one subject */
  subjects: string[];
  compulsory: string[];
  minSubjects: number;
  maxSubjects: number;
  subjectNote: string;
  mock: { perSubject?: number; total?: number; minutes: number; passPct?: number; scoreStyle: ScoreStyle; maxSubjects: number };
  weeklyMock: boolean;
  askState: boolean;
  askSchool: boolean;
  plans: string[];
  tagline: string;
}

const SCHOOL_SUBJECTS = ["ENG", "MTH", "PHY", "CHM", "BIO", "ECO", "GOV"];

export const TRACKS: Record<TrackCode, Track> = {
  JAMB: {
    code: "JAMB", name: "JAMB (UTME)", short: "JAMB", emoji: "🎓", kind: "school", region: "NG", currency: "NGN",
    subjectMode: "multi", subjects: SCHOOL_SUBJECTS, compulsory: ["ENG"], minSubjects: 4, maxSubjects: 4, subjectNote: "Use of English + 3 subjects (4 total)",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "jamb400", maxSubjects: 4 }, weeklyMock: true, askState: true, askSchool: true,
    plans: ["student_month", "student_season"], tagline: "Daily drills, CBT practice and Sunday Mock Night",
  },
  WAEC: {
    code: "WAEC", name: "WAEC (WASSCE)", short: "WAEC", emoji: "📘", kind: "school", region: "WA", currency: "NGN",
    subjectMode: "multi", subjects: SCHOOL_SUBJECTS, compulsory: ["ENG", "MTH"], minSubjects: 4, maxSubjects: 6, subjectNote: "English + Maths + 2 to 4 more",
    mock: { perSubject: 15, minutes: 30, scoreStyle: "percent", maxSubjects: 4 }, weeklyMock: true, askState: true, askSchool: true,
    plans: ["student_month", "student_season"], tagline: "Daily drills, CBT practice and Sunday Mock Night",
  },
  LUK: {
    code: "LUK", name: "Life in the UK Test", short: "Life in the UK", emoji: "🇬🇧", kind: "citizenship", region: "UK", currency: "GBP",
    subjectMode: "single", subjects: ["LUK"], compulsory: ["LUK"], minSubjects: 1, maxSubjects: 1, subjectNote: "",
    mock: { total: 24, minutes: 45, passPct: 75, scoreStyle: "passfail", maxSubjects: 1 }, weeklyMock: false, askState: false, askSchool: false,
    plans: ["luk_pass"], tagline: "Pass first time: 24-question mock tests, daily practice, readiness score",
  },
};

export const TRACK_LIST = Object.values(TRACKS);
export const SCHOOL_TRACKS = TRACK_LIST.filter((t) => t.weeklyMock).map((t) => t.code);

export function getTrack(code: string | null | undefined): Track {
  return TRACKS[(code as TrackCode) ?? "JAMB"] ?? TRACKS.JAMB;
}

/** Questions per subject in a practice mock. */
export function mockPerSubject(t: Track) {
  return t.subjectMode === "single" ? t.mock.total! : t.mock.perSubject!;
}
