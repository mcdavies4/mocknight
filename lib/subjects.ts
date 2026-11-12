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
  LUK: "Life in the UK",
  FIR: "Fire Safety",
  NMN: "Numeracy (Part A)",
  NMC: "Clinical (Part B)",
  PRN: "PRINCE2 7 Foundation",
  SCR: "Scrum (PSM I)",
  PMF: "PM fundamentals (CAPM)",
};

/** School subjects with questions. Add codes here once you have questions for them. */
export const OFFERED_SUBJECTS = ["ENG", "MTH", "PHY", "CHM", "BIO", "ECO", "GOV"];

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
