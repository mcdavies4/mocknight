import type { Exam } from "./types";

export const SUBJECTS: Record<string, string> = {
  ENG: "English",
  MTH: "Mathematics",
  PHY: "Physics",
  CHM: "Chemistry",
  BIO: "Biology",
  ECO: "Economics",
  GOV: "Government",
  LIT: "Literature",
  CRS: "CRS",
  IRS: "IRS",
  GEO: "Geography",
  COM: "Commerce",
  ACC: "Accounting",
  AGR: "Agric Science",
};

/** Subjects offered in onboarding. Add codes here once you have questions for them. */
export const OFFERED_SUBJECTS = ["ENG", "MTH", "PHY", "CHM", "BIO", "ECO", "GOV"];

export const EXAM_RULES: Record<Exam, { compulsory: string[]; min: number; max: number; note: string }> = {
  JAMB: { compulsory: ["ENG"], min: 4, max: 4, note: "Use of English + 3 subjects (4 total)" },
  WAEC: { compulsory: ["ENG", "MTH"], min: 4, max: 6, note: "English + Maths + 2 to 4 more" },
};

/** Mocks use at most 4 subjects (JAMB format). */
export const MOCK_MAX_SUBJECTS = 4;

export const STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT", "Gombe", "Imo",
  "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos", "Nasarawa",
  "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];

export function subjectName(code: string) {
  return SUBJECTS[code] ?? code;
}
