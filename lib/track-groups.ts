// One list of exam categories, shared by the website (/exams) and the Telegram picker.
import { TRACK_LIST, TRACKS, type Track, type TrackCode } from "./tracks";

export interface TrackGroup { key: string; emoji: string; title: string; description: string; codes: TrackCode[] }

export const TRACK_GROUPS: TrackGroup[] = [
  { key: "us", emoji: "🇺🇸", title: "United States", description: "GED, nursing school (TEAS), CNA, military (ASVAB), SAT, NCLEX and the citizenship test.",
    codes: ["GED", "TEAS", "CNA", "ASVAB", "SAT", "NCLEX", "USCIT"] },
  { key: "india", emoji: "🇮🇳", title: "India", description: "UPSC, SSC, banking, railways, teaching (CTET), MBA (CAT), NEET and JEE.",
    codes: ["UPSC", "SSC", "IBPS", "RRB", "CTET", "CAT", "NEET", "JEE"] },
  { key: "school", emoji: "🌍", title: "African school exams", description: "School-leaving and national exams across Nigeria, Ghana, Kenya, Tanzania, Uganda, Cameroon, South Africa and Ethiopia.",
    codes: ["NCEE", "JSCE", "JAMB", "WAEC", "NECO", "PUTME", "WASSCE_GH", "BECE", "KCSE", "CSEE", "UCE", "CMGCE", "MATRIC", "ETH"] },
  { key: "admissions", emoji: "🎓", title: "Admissions & entrance tests", description: "University, medical, engineering and grammar-school entrance tests.",
    codes: ["MDCAT", "NEET", "JEE", "SAT", "UCAT", "GRE", "ELEVEN"] },
  { key: "abroad", emoji: "✈️", title: "Moving abroad", description: "Citizenship tests, English and professional licensing for doctors and nurses relocating.",
    codes: ["LUK", "USCIT", "CANCIT", "AUSCIT", "IELTS", "PTE", "CELPIP", "OET", "PLAB", "NMC", "NCLEX", "GULFN"] },
  { key: "career", emoji: "💼", title: "Professional & career", description: "Practise for professional qualifications, graduate assessments and career progression tests.",
    codes: ["PM", "ACCA", "ICAN", "GRAD", "IBPS", "SSC", "ITIL", "SIXSIG", "BA", "ETEXIT", "KCPA", "AAT", "CSEPH", "NGREC", "NGCS", "BKP", "CON"] },
  { key: "energy", emoji: "🛢️", title: "Oil, gas & inspection", description: "HSE, industry knowledge and inspection certifications for oil, gas and fabrication careers.",
    codes: ["OILGAS", "NDT", "WELDINSP", "APIINSP", "COATING", "IOSH"] },
  { key: "tech", emoji: "💻", title: "Technology & digital skills", description: "Build practical IT, networking, cloud, data, security and programming knowledge.",
    codes: ["AWS", "AWSSAA", "AZF", "AICERT", "ISC2CC", "SEC", "ITF", "CCST", "PYT", "DAT", "SFADMIN", "AIA"] },
  { key: "ukcare", emoji: "🩺", title: "UK care, health & education jobs", description: "Care work, NHS healthcare assistant, first aid, teaching assistant and food hygiene.",
    codes: ["CARE", "CAREW", "CARESR", "NHSHCA", "FIRSTAID", "EYTA", "FOOD", "FSE", "FSM"] },
  { key: "uk", emoji: "🪪", title: "Licences, trades & transport", description: "Driving and transport licences, site cards, security, trades and workplace safety.",
    codes: ["DRIVE", "SALEARN", "HGV", "SERU", "ELEC18", "CITB", "SIA", "WAREHOUSE", "FIRE", "HSE"] },
];

export const groupFor = (code: string) => TRACK_GROUPS.find((g) => g.codes.includes(code as TrackCode));

// Extra words people type that aren't in the exam's name.
const ALIASES: Partial<Record<TrackCode, string>> = {
  NMC: "nursing nurse cbt uk nurse", NCLEX: "nursing nurse usa america rn", GULFN: "nursing nurse dubai uae saudi qatar prometric dha haad moh",
  OET: "nursing nurse doctor english occupational", PLAB: "doctor gmc medical uk", IELTS: "english band ielts ukvi",
  LUK: "citizenship british settlement ilr", USCIT: "usa america naturalization uscis citizenship", CANCIT: "canada citizenship", AUSCIT: "australia citizenship",
  NEET: "india medical mbbs neet ug", JEE: "india engineering iit jee", GRE: "gre gmat mba masters abroad", CSEPH: "philippines civil service cse government",
  AAT: "accounting bookkeeping uk", NGREC: "police army navy air force customs immigration nscdc recruitment aptitude job",
  NCEE: "common entrance unity college primary 6 jss1 ncee", JSCE: "junior waec bece jss3 junior neco", NGCS: "civil service promotion psr public service rules government workers",
  PTE: "pte pearson english visa australia", CELPIP: "canada express entry english pr", IOSH: "iosh managing safely health safety supervisor hse",
  OILGAS: "oil gas petroleum hse h2s rig offshore nnpc shell total chevron upstream ncdmb drilling production",
  NDT: "ndt non destructive testing ultrasonic radiography penetrant magnetic particle inspection pcn asnt cswip iso 9712 welding inspector",
  WELDINSP: "welding inspector cswip 3.1 cwi aws weld qc", APIINSP: "api 510 570 653 pressure vessel piping inspector integrity", COATING: "coating painting corrosion nace ampp cip blasting inspector",
  ETEXIT: "ethiopia exit exam university graduate accounting computer science management economics", CSEE: "tanzania form four necta csee", UCE: "uganda senior four uneb uce o level",
  CMGCE: "cameroon gce o level anglophone",
  SALEARN: "south africa learners licence k53 driving", MATRIC: "south africa matric nsc grade 12", KCPA: "kenya cpa kasneb accounting icpak",
  ELEC18: "electrician 18th edition bs 7671 wiring regulations 2382", EYTA: "teaching assistant nursery early years eyfs childcare school", WAREHOUSE: "warehouse forklift flt picker logistics", NHSHCA: "nhs healthcare assistant hca support worker hospital band 2 band 3",
  CARE: "care certificate care worker carer", CAREW: "care worker carer workforce essentials",
  CARESR: "senior carer care worker level 3 diploma medication mar cqc mental capacity", FIRSTAID: "first aid at work efaw cpr", SERU: "uber bolt private hire phv tfl london driver seru", HGV: "hgv lgv lorry truck driver cpc class 1 class 2 bus",
  GED: "ged high school equivalency diploma usa adult", TEAS: "ati teas nursing school entrance nurse usa", CNA: "cna certified nursing assistant nurse aide usa", ASVAB: "asvab army navy air force marines military afqt",
  UPSC: "upsc ias ips civil services prelims csat gs", RRB: "rrb railway railways ntpc group d", CTET: "ctet tet teacher eligibility b.ed teaching", CAT: "cat iim mba management entrance",
  BA: "business analyst analysis bcs iiba ecba babok", ISC2CC: "isc2 cc certified in cybersecurity cyber security entry", AWSSAA: "aws solutions architect associate saa cloud", AICERT: "ai ai-900 azure ai aws ai practitioner machine learning artificial intelligence", SFADMIN: "salesforce admin administrator crm",
  JAMB: "utme university nigeria", WAEC: "ssce waec nigeria", NECO: "ssce nigeria", PUTME: "post utme university nigeria", WASSCE_GH: "ghana shs wassce",
  BECE: "ghana jhs", KCSE: "kenya form 4", ETH: "ethiopia esslce grade 12", MDCAT: "pakistan medical", UCAT: "medicine dentistry uk university",
  SAT: "usa college", ELEVEN: "11 plus grammar school", SSC: "india cgl chsl government", IBPS: "india bank po sbi",
  PM: "project management prince2 apm pfq agile scrum pspo product owner capm pmp pmi-acp", ACCA: "accounting accountant", ICAN: "accounting accountant nigeria", GRAD: "aptitude shl graduate job test",
  DRIVE: "driving theory car licence dvsa", SIA: "security door supervisor", CITB: "cscs construction site", FIRE: "fire marshal warden",
  AWS: "amazon cloud", AZF: "microsoft azure cloud", PYT: "python programming coding", SEC: "cyber security", DAT: "data analyst analysis analytics sql excel power bi pl-300 tableau statistics", AIA: "ai artificial intelligence automation",
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9+ ]/g, " ").replace(/\s+/g, " ").trim();

/** Find exams matching what someone typed, best match first. */
export function searchTracks(query: string, limit = 8): Track[] {
  const q = norm(query);
  if (!q) return [];
  const STOP = new Set(["the", "in", "of", "and", "for", "a", "an", "to", "test", "exam", "exams", "practice", "my"]);
  const words = q.split(" ").filter((w) => !STOP.has(w));
  if (!words.length) return [];
  const has = (hay: string, w: string) => ` ${hay} `.includes(` ${w}`);
  const scored = TRACK_LIST.map((t) => {
    const code = t.code.toLowerCase().replace("_", " ");
    const hay = norm(`${t.code} ${t.short} ${t.name} ${ALIASES[t.code] ?? ""}`);
    let score = 0;
    if (q === code || q === norm(t.short)) score += 100;
    if (norm(t.short).startsWith(q) || norm(t.name).startsWith(q)) score += 40;
    for (const w of words) if (w.length >= 2 && has(hay, w)) score += 10;
    if (words.length > 1 && words.every((w) => has(hay, w))) score += 15;
    return { t, score };
  }).filter((x) => x.score >= 10).sort((a, b) => b.score - a.score);
  const top = scored[0]?.score ?? 0;
  return scored.filter((x) => x.score >= top * 0.6).slice(0, limit).map((x) => x.t);
}

export const tracksIn = (g: TrackGroup) => g.codes.map((c) => TRACKS[c]).filter(Boolean);
