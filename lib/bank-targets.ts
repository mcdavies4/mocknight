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
  // Expansion tracks
  USC: 400, CAN: 400, AUS: 400, GNX: 1000, IEV: 800, VRB: 600, PMP: 800, ABT: 600, AMA: 600, AFA: 600, ITL: 400, SSG: 500, VRS: 800, ELM: 800, OEH: 800, UDM: 600, USJ: 500, ISC: 600, SST: 600, PHC: 500, NGS: 600, CVE: 500, PSR: 600, IMS: 500, OGS: 600, ONG: 500, NDG: 600, NPT: 400, NMT: 400, NUT: 500, NRT: 500, WIN: 600, INS: 600, COR: 500, ODP: 500, EXC: 800, EXM: 600, EXE: 600, EXA: 600, TZC: 400, UGC: 400, CMC: 400, K53: 500, KEL: 500, CML: 500, EFA: 400, SRU: 400, LGV: 500, BSR: 600, EYT: 500, WHF: 400, HCA: 500, APM: 600, AGP: 600, BAF: 600, ICC: 600, SAA: 800, AIF: 600, SFA: 600, GSS: 500, GSC: 600, TSC: 600, CNA: 500, AMC: 400, AEI: 400, IPL: 800, IEC: 600, ENV: 600, CDP: 600, GCM: 600, GEL: 500, CSJ: 400, AEN: 600, CDL: 500, OG1: 400, APL: 800, SYP: 800, CCX: 800, NGN: 800, USM: 1000, GPH: 800, UDR: 500, TLP: 500, LAB: 800, PHT: 800, DEN: 800, PIC: 400, SRA: 400, USD: 600, CAD: 200, TXD: 200, FLD: 200, NYD: 200, GAD: 200, PHB: 500, MAQ: 600, PTB: 600, MCD: 600, SIE: 600, RES: 600, LHI: 500, SSM: 500, EPA: 400, RSG: 300, EAL: 150, KDR: 150, RDR: 150, SQQ: 600, XLQ: 600, PBI: 600, TBL: 500, STQ: 500,
  // Trending professional certifications
  HSC: 600, CSM: 600, CPH: 600, CCH: 600, JPN: 600, KOR: 600, PNL: 1000, LTE: 1000, SGD: 500, RUS: 600, RMG: 500,
  GCL: 600, AZA: 800, CSP: 1000, DVO: 800, DMK: 600, HRM: 800, PDO: 600,
};

/** Calculation-heavy banks stay code-generated (exact answers), not AI-written. */
export const CODE_ONLY = new Set(["NMN"]);

/** Exams where every AI question is double-checked by the stronger model. */
export const HIGH_STAKES = new Set(["PLB", "NCX", "NMC", "NMN", "USM", "GPH", "NGN", "LAB", "PHT", "DEN"]);

export const targetFor = (subject: string) => BANK_TARGETS[subject] ?? DEFAULT_TARGET;
