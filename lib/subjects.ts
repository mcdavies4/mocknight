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
  NCX: "NCLEX-RN",
  PRN: "PRINCE2 7 Foundation",
  SCR: "Scrum (PSM I)",
  PMF: "PM fundamentals (CAPM)",
  APT: "Aptitude & reasoning",
  QNT: "Quantitative aptitude",
  GAI: "General awareness",
  HIS: "History",
  SRW: "SAT Reading and Writing",
  SMT: "SAT Math",
  DRV: "UK Driving Theory",
  FSE1: "Functional Skills English Level 1",
  FSE2: "Functional Skills English Level 2",
  FSM1: "Functional Skills Maths Level 1",
  FSM2: "Functional Skills Maths Level 2",
  CAR: "Care Certificate",
  CTH: "CITB HS&E Operatives Practice",
  SIAQ: "SIA Door Supervisor Revision",
  FOD: "Food Safety and Hygiene Level 2",
  CWR: "Care Workforce Essentials",
  WHS: "Workplace Health and Safety Essentials",
  ITF: "IT Support Fundamentals",
  CCN: "Cisco CCST Networking",
  AWC: "AWS Cloud Practitioner",
  AZF: "Azure Fundamentals",
  PCE: "Python Programming Foundations",
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
