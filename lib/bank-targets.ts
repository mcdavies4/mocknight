// How big each question bank should grow. The question factory (lib/grow.ts) tops up the subjects
// furthest below target. Subjects marked codeOnly are calculation banks built by scripts/bank/* instead.
export const DEFAULT_TARGET = 500;

export const BANK_TARGETS: Record<string, number> = {
  // High-stakes professional exams
  PLB: 1500, NCX: 1200, NMC: 1000,
  // Nigeria / West Africa school subjects (JAMB, WAEC, Post-UTME, WASSCE Ghana, Ethiopia)
  ENG: 1200, MTH: 1000, PHY: 1000, CHM: 1000, BIO: 1000, ECO: 800, GOV: 800, LIT: 600, CRS: 600, IRS: 600, COM: 600, AGR: 600, ACC: 600, GEO: 600, HIS: 500,
  // Digital SAT
  SRW: 1000, SMT: 1000,
  // UK
  LUK: 800, DRV: 1000, CTH: 600, FSE1: 400, FSE2: 400, FSM1: 400, FSM2: 400,
  // Project management, India
  PRN: 600, SCR: 600, PMF: 600, APT: 800, QNT: 800, GAI: 800,
};

/** Calculation-heavy banks stay code-generated (exact answers), not AI-written. */
export const CODE_ONLY = new Set(["NMN"]);

/** Exams where every AI question is double-checked by the stronger model. */
export const HIGH_STAKES = new Set(["PLB", "NCX", "NMC", "NMN"]);

export const targetFor = (subject: string) => BANK_TARGETS[subject] ?? DEFAULT_TARGET;
