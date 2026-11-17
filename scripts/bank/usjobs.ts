// US career and licensing banks:
//   PHB — Phlebotomy (NHA CPT)          MAQ — Medical assistant (NHA CCMA)   PTB — Pharmacy technician (PTCB)
//   MCD — Medical coding (AAPC CPC)     SIE — Securities Industry Essentials  RES — Real estate (national portion)
//   LHI — Life and health insurance     SSM — ServSafe Food Protection Manager EPA — EPA Section 608
// Established facts only; calculations are generated so answers are exact.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;
const usd = (v: number) => `$${v.toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(v) ? 0 : 2, maximumFractionDigits: 2 })}`;

// ============================================================================ PHB
const PHB: F[] = [
  ["Order of draw", "In the CLSI order of draw, which comes first?", "Blood culture bottles", ["Lavender (EDTA)", "Gray (fluoride)", "Green (heparin)"], "Then light blue, red/gold, green, lavender, gray."],
  ["Order of draw", "Which tube is drawn immediately after blood cultures?", "Light blue (sodium citrate)", ["Lavender (EDTA)", "Gray (sodium fluoride)", "Green (heparin)"], "Citrate comes early to avoid contamination with other additives."],
  ["Order of draw", "Which tube is drawn last in the standard order of draw?", "Gray (sodium fluoride/potassium oxalate)", ["Light blue", "Red", "Green"], "EDTA (lavender) comes just before gray."],
  ["Tubes", "A lavender (EDTA) tube is used for", "a complete blood count (CBC)", ["coagulation studies", "glucose only", "blood cultures"], "EDTA preserves cell shape."],
  ["Tubes", "A light blue tube must be", "filled to the correct level to keep the 9:1 blood-to-additive ratio", ["half-filled", "shaken vigorously", "drawn last"], "Underfilling gives wrong coagulation results."],
  ["Tubes", "Tubes with additives should be mixed by", "gentle inversion", ["vigorous shaking", "spinning by hand", "not mixing at all"], "Shaking can cause haemolysis."],
  ["Venipuncture", "The first-choice vein for venipuncture is usually the", "median cubital vein", ["basilic vein", "dorsal hand veins", "femoral vein"], "It is large, well anchored and away from nerves and arteries."],
  ["Venipuncture", "A tourniquet should not be left on for more than", "1 minute", ["5 minutes", "10 minutes", "30 seconds is not enough time"], "Longer causes haemoconcentration."],
  ["Venipuncture", "The usual needle insertion angle for venipuncture is", "15–30 degrees", ["45–60 degrees", "90 degrees", "5 degrees"], "Bevel facing up."],
  ["Venipuncture", "The site is usually cleaned with", "70% isopropyl alcohol and allowed to air dry", ["water", "iodine for every draw", "soap only"], "Drawing through wet alcohol can cause haemolysis and stinging."],
  ["Venipuncture", "Before collecting, the patient must be identified using", "at least two identifiers, such as full name and date of birth", ["the room number only", "the wristband colour", "asking 'Are you John?'"], "Ask the patient to state their details."],
  ["Venipuncture", "Specimen tubes should be labeled", "at the bedside, in front of the patient, after collection", ["before the draw at the nurses' station", "back in the lab", "by the patient"], "This prevents mislabeling."],
  ["Venipuncture", "You should avoid drawing blood from the arm", "on the same side as a mastectomy", ["the patient prefers", "with the best vein", "on the dominant side"], "Lymph flow may be impaired."],
  ["Complications", "A hematoma is", "blood leaking into the tissue around the puncture site", ["a fainting episode", "a type of tube", "an allergic reaction"], "Apply pressure and don't bend the arm."],
  ["Complications", "If a patient feels faint during a draw, you should", "remove the tourniquet and needle, and lower the patient's head", ["finish the draw quickly", "leave the room", "give them coffee"], "Call for help and monitor them."],
  ["Special handling", "Which specimen should be protected from light?", "Bilirubin", ["CBC", "Potassium", "Glucose"], "Light breaks down bilirubin."],
  ["Special handling", "Which specimen is commonly transported on ice?", "Ammonia", ["CBC", "Bilirubin", "Blood type"], "Chilling slows metabolic changes."],
  ["Special handling", "Drug testing specimens require", "a documented chain of custody", ["no paperwork", "the patient to carry them", "freezing at home"], "It proves the specimen wasn't tampered with."],
  ["Capillary", "For an infant heel stick, the puncture should be on", "the medial or lateral plantar surface of the heel", ["the center of the heel", "the toes", "the back of the heel"], "Avoid the bone in the center."],
  ["Safety", "Used needles must be", "activated with the safety device and put straight into a sharps container", ["recapped with two hands", "bent before disposal", "put in regular trash"], "This is required by OSHA's Bloodborne Pathogens Standard."],
];

// ============================================================================ MAQ
const MAQ: F[] = [
  ["Injections", "Intramuscular (IM) injections are given at an angle of", "90 degrees", ["45 degrees", "10–15 degrees", "30 degrees"], "The deltoid is common for small-volume vaccines."],
  ["Injections", "Subcutaneous injections, such as insulin, are usually given at", "45 degrees (or 90 degrees with a short needle)", ["10–15 degrees", "180 degrees", "5 degrees"], "The abdomen is a common site."],
  ["Injections", "A tuberculin (TB) skin test is given", "intradermally at 10–15 degrees", ["intramuscularly", "subcutaneously at 45 degrees", "orally"], "It forms a small wheal under the skin."],
  ["Injections", "The Z-track method is used to", "stop irritating medication leaking out of an IM site", ["give eye drops", "take a pulse", "measure height"], "Pull the skin aside before injecting, then release."],
  ["ECG", "Lead V1 is placed at the", "4th intercostal space, right of the sternum", ["5th intercostal space, left midclavicular line", "left shoulder", "right ankle"], "V2 is at the 4th intercostal space, left of the sternum."],
  ["ECG", "Lead V4 is placed at the", "5th intercostal space, left midclavicular line", ["4th intercostal space, right sternal border", "the right wrist", "the left ankle"], "V3 goes midway between V2 and V4."],
  ["ECG", "Small, irregular baseline waves on an ECG caused by patient movement are", "somatic tremor artifact", ["atrial fibrillation", "a normal P wave", "a heart block"], "Help the patient relax and stay still."],
  ["Vital signs", "A normal adult resting heart rate is", "60–100 beats per minute", ["40–50", "100–140", "12–20"], "12–20 is the normal respiratory rate."],
  ["Vital signs", "The most common site for taking a pulse in adults is the", "radial artery", ["femoral artery", "popliteal artery", "dorsalis pedis artery"], "The apical pulse is used for infants."],
  ["Vital signs", "A blood pressure of 120/80: the top number is the", "systolic pressure", ["diastolic pressure", "pulse pressure", "mean arterial pressure"], "Systolic is when the heart contracts."],
  ["Infection control", "Autoclaves sterilize instruments using", "steam under pressure", ["dry ice", "ultraviolet light only", "cold water"], "Indicator tape changes colour to show exposure."],
  ["Infection control", "Medical asepsis aims to", "reduce the number and spread of microorganisms", ["remove all microorganisms", "only protect the provider", "replace sterile technique"], "Surgical asepsis aims to remove all microorganisms."],
  ["Law and ethics", "Sharing a patient's health information without authorization violates", "HIPAA", ["OSHA", "CLIA", "the ADA"], "Share only the minimum necessary for treatment, payment or operations."],
  ["Law and ethics", "Which task is usually outside a medical assistant's scope?", "Diagnosing a patient's condition", ["Taking vital signs", "Scheduling appointments", "Recording a patient history"], "Diagnosis is for licensed providers."],
  ["Documentation", "In a SOAP note, the 'S' stands for", "subjective information the patient reports", ["standard procedure", "systolic pressure", "surgical plan"], "Subjective, Objective, Assessment, Plan."],
  ["Documentation", "A chief complaint should be recorded", "in the patient's own words where possible", ["using a diagnosis code", "only by the doctor", "after the visit"], "Keep it brief and accurate."],
  ["Front office", "Wave scheduling means", "booking several patients at the start of each hour and seeing them in order of arrival", ["one patient per hour only", "no appointments at all", "booking only on Mondays"], "It helps absorb late arrivals."],
  ["Vision", "In Snellen notation, 20/40 means the patient", "sees at 20 feet what a normal eye sees at 40 feet", ["sees at 40 feet what a normal eye sees at 20 feet", "has perfect vision", "is legally blind"], "20/20 is normal vision."],
];
function maqCalc(): Q[] {
  const out: Q[] = [];
  out.push(...repeat(8, () => {
    const c = pick([36, 37, 38, 39, 40]), f = r(c * 9 / 5 + 32, 1);
    return mcq("MAQ", "Conversions", `Convert ${c} °C to Fahrenheit.`, `${fmt(f)} °F`, numOpts(f, [c + 32, r(c * 5 / 9 + 32, 1), r(f - 10, 1)], "°F"), `°F = °C × 9/5 + 32 = ${fmt(f)} °F.`, 1);
  }));
  out.push(...repeat(8, () => {
    const boxes = pick([3, 4, 5, 6]), hr = r(300 / boxes, 0);
    return mcq("MAQ", "ECG", `On a regular ECG rhythm there are ${boxes} large boxes between R waves. What is the heart rate? (300 ÷ number of large boxes)`, `${hr} bpm`, numOpts(hr, [boxes * 30, r(1500 / boxes, 0), hr + 20], "bpm"), `300 ÷ ${boxes} = ${hr} bpm.`, 2);
  }));
  return out;
}

// ============================================================================ PTB
const PTB: F[] = [
  ["Law", "DEA Form 222 is used to", "order Schedule II controlled substances", ["report theft of drugs", "destroy controlled substances", "register a pharmacy"], "Form 106 reports theft or loss; Form 41 records destruction."],
  ["Law", "Which schedule has the highest potential for abuse but an accepted medical use?", "Schedule II", ["Schedule I", "Schedule IV", "Schedule V"], "Schedule I drugs have no accepted medical use."],
  ["Law", "Oxycodone is a Schedule", "II controlled substance", ["I controlled substance", "IV controlled substance", "V controlled substance"], "Schedule II prescriptions cannot be refilled."],
  ["Law", "The Combat Methamphetamine Epidemic Act limits sales of", "pseudoephedrine", ["ibuprofen", "insulin", "amoxicillin"], "Products are kept behind the counter and sales are logged."],
  ["Law", "USP <797> covers", "sterile compounding", ["nonsterile compounding", "hazardous drug handling only", "drug pricing"], "USP <795> is nonsterile; USP <800> covers hazardous drugs."],
  ["Labels", "An NDC number identifies the", "labeler, product and package size", ["patient", "prescriber's license", "pharmacy address"], "It has 10 digits in three segments."],
  ["Labels", "Tall Man lettering, such as hydrOXYzine and hydrALAZINE, is used to", "reduce mix-ups between look-alike drug names", ["show brand names", "mark controlled drugs", "show generic status"], "It highlights the differences."],
  ["Sig codes", "'PO' on a prescription means", "by mouth", ["as needed", "after meals", "every hour"], "From the Latin 'per os'."],
  ["Sig codes", "'BID' means", "twice a day", ["three times a day", "four times a day", "at bedtime"], "TID is three times a day and QID four times a day."],
  ["Sig codes", "'PRN' means", "as needed", ["before meals", "every night", "by mouth"], "The patient takes it only when required."],
  ["Sig codes", "'QHS' means", "at bedtime", ["every hour", "every morning", "after meals"], "'AC' means before meals and 'PC' after meals."],
  ["Drugs", "Atorvastatin is the generic name for", "Lipitor", ["Zocor", "Crestor", "Norvasc"], "Zocor is simvastatin; Crestor is rosuvastatin."],
  ["Drugs", "Metformin is used to treat", "type 2 diabetes", ["high cholesterol", "hypertension only", "infections"], "Brand name Glucophage."],
  ["Drugs", "Levothyroxine (Synthroid) treats", "hypothyroidism", ["hyperthyroidism", "diabetes", "asthma"], "Taken on an empty stomach in the morning."],
  ["Drugs", "Omeprazole (Prilosec) belongs to which class?", "proton pump inhibitors", ["H2 blockers", "antacids", "beta blockers"], "It reduces stomach acid."],
  ["Drugs", "Sertraline (Zoloft) is an", "SSRI antidepressant", ["anticoagulant", "antibiotic", "antihistamine"], "Selective serotonin reuptake inhibitor."],
  ["Drugs", "Warfarin (Coumadin) is an", "anticoagulant", ["antibiotic", "antihypertensive", "analgesic"], "Monitored with the INR."],
  ["References", "The FDA Orange Book lists", "approved drugs and therapeutic equivalence ratings", ["drug prices", "poison control numbers", "pharmacy locations"], "It helps decide generic substitution."],
];
function ptbCalc(): Q[] {
  const out: Q[] = [];
  out.push(...repeat(10, () => {
    const qty = pick([30, 60, 90, 120]), perDay = pick([1, 2, 3]), d = qty / perDay;
    if (!Number.isInteger(d)) return null;
    return mcq("PTB", "Calculations", `A prescription is for #${qty} tablets, 1 tablet ${perDay === 1 ? "once daily" : perDay === 2 ? "twice daily" : "three times daily"}. What is the days' supply?`, `${d} days`, numOpts(d, [qty * perDay, qty, d + 10], "days"), `${qty} ÷ ${perDay} per day = ${d} days.`, 1);
  }));
  out.push(...repeat(8, () => {
    const tsp = pick([1, 2, 3]), times = pick([2, 3, 4]), days = pick([5, 7, 10]), ml = tsp * 5 * times * days;
    return mcq("PTB", "Calculations", `Sig: ${tsp} tsp ${times} times a day for ${days} days. How many mL should be dispensed? (1 tsp = 5 mL)`, `${ml} mL`, numOpts(ml, [tsp * times * days, ml / 2, ml + 50], "mL"), `${tsp} × 5 mL × ${times} × ${days} = ${ml} mL.`, 2);
  }));
  return out;
}

// ============================================================================ MCD
const MCD: F[] = [
  ["Code sets", "ICD-10-CM codes are used to report", "diagnoses", ["procedures in physician offices", "ambulance supplies", "drug prices"], "CPT reports procedures and services."],
  ["Code sets", "HCPCS Level II codes cover items such as", "supplies, durable medical equipment, drugs and ambulance services", ["surgical procedures only", "diagnoses", "hospital room numbers"], "They are alphanumeric, e.g. starting with A, E, J."],
  ["Code sets", "CPT Category II codes are used for", "performance measurement", ["emerging technology", "surgery", "diagnoses"], "Category III is emerging technology; Category I covers procedures and services."],
  ["Modifiers", "Modifier 25 indicates", "a significant, separately identifiable E/M service on the same day as a procedure", ["a bilateral procedure", "a distinct procedural service", "the professional component"], "Documentation must support the separate E/M service."],
  ["Modifiers", "Modifier 59 indicates", "a distinct procedural service", ["a bilateral procedure", "an assistant surgeon", "a repeat procedure by the same physician"], "Use only when no more specific modifier applies (such as XE, XS, XP or XU)."],
  ["Modifiers", "Modifier 26 indicates", "the professional component of a service", ["the technical component", "a bilateral procedure", "multiple procedures"], "Modifier TC is the technical component."],
  ["Modifiers", "Modifier 50 indicates", "a bilateral procedure", ["multiple procedures", "a reduced service", "a discontinued procedure"], "Modifier 51 is for multiple procedures."],
  ["ICD-10-CM", "ICD-10-CM codes are", "3 to 7 characters long", ["exactly 5 digits", "always numeric", "2 characters"], "The first character is always a letter."],
  ["ICD-10-CM", "For injury codes, the 7th character 'A' means", "initial encounter", ["subsequent encounter", "sequela", "anatomical side"], "'D' is subsequent encounter and 'S' is sequela."],
  ["ICD-10-CM", "When a code needs a 7th character but has fewer than 6 characters, coders use", "the placeholder 'X'", ["a zero", "a dash", "the letter Z"], "This keeps the 7th character in the right position."],
  ["ICD-10-CM", "An Excludes1 note means", "the two conditions cannot be coded together", ["the conditions can be coded together", "code the other condition first", "use an additional code"], "Excludes2 means not included here, but both may be reported."],
  ["ICD-10-CM", "In outpatient coding, a diagnosis documented as 'rule out' or 'probable' should be", "not coded; code the signs and symptoms instead", ["coded as if confirmed", "coded with a question mark", "left uncoded entirely with nothing reported"], "Inpatient rules are different."],
  ["ICD-10-CM", "Z codes describe", "factors influencing health status and contact with health services", ["external causes of injury", "neoplasms", "drug names"], "For example, a routine check-up."],
  ["Surgery", "A surgical package with a 90-day global period is usually a", "major surgery", ["minor procedure", "laboratory test", "E/M visit"], "Minor procedures have 0- or 10-day global periods."],
  ["Compliance", "Billing separately for services that should be reported with one comprehensive code is", "unbundling", ["upcoding", "downcoding", "modifier use"], "NCCI edits help identify it."],
  ["Compliance", "Reporting a higher-level service than was documented is", "upcoding", ["unbundling", "bundling", "querying"], "It is a form of fraud."],
  ["E/M", "Since 2021, office E/M visit levels are chosen based on", "medical decision making or total time", ["the history and exam only", "the patient's age", "the number of diagnoses only"], "History and exam are performed as medically appropriate."],
];

// ============================================================================ SIE
const SIE: F[] = [
  ["Regulation", "The Securities Act of 1933 mainly regulates", "new issues of securities (the primary market)", ["secondary market trading", "investment advisers", "mutual fund structure"], "It requires registration and a prospectus."],
  ["Regulation", "The Securities Exchange Act of 1934", "regulates the secondary market and created the SEC", ["regulates insurance companies", "created FINRA's predecessor only", "covers municipal bonds only"], "It also regulates broker-dealers and exchanges."],
  ["Regulation", "Municipal securities rules are written by the", "MSRB", ["SEC only", "FDIC", "Federal Reserve"], "FINRA and bank regulators enforce MSRB rules."],
  ["Regulation", "FINRA is a", "self-regulatory organization for broker-dealers", ["government agency", "stock exchange", "bank"], "It is overseen by the SEC."],
  ["Regulation", "SIPC protects customer accounts at a failed broker-dealer up to", "$500,000, including up to $250,000 in cash", ["$250,000 total", "$1 million in cash", "unlimited amounts"], "It does not protect against market losses."],
  ["Regulation", "Most US stock trades settle", "one business day after the trade (T+1)", ["the same day always", "three business days after", "one week after"], "T+1 began in May 2024."],
  ["Products", "Bond prices and interest rates move", "in opposite directions", ["in the same direction", "independently", "only when rates fall"], "When rates rise, existing bond prices fall."],
  ["Products", "Interest on most municipal bonds is", "exempt from federal income tax", ["taxed at a higher rate", "exempt from all taxes everywhere", "paid only at maturity"], "State tax treatment varies."],
  ["Products", "Treasury bills are", "short-term government securities issued at a discount", ["long-term corporate bonds", "stocks", "municipal bonds"], "They mature in one year or less."],
  ["Products", "Preferred stockholders usually", "receive dividends before common stockholders", ["have more voting rights than common stockholders", "own the company's debt", "receive no dividends"], "They usually don't vote."],
  ["Products", "The maximum loss for the buyer of a call or put option is", "the premium paid", ["unlimited", "the strike price", "zero"], "Buyers can lose only what they paid."],
  ["Products", "Open-end mutual fund shares are bought and redeemed at", "net asset value (plus any sales charge when buying)", ["a price set by trading on an exchange during the day", "face value", "a random price"], "ETFs trade on exchanges throughout the day."],
  ["Products", "An American Depositary Receipt (ADR) represents", "shares of a foreign company traded in the US", ["a US government bond", "a mutual fund", "a futures contract"], "ADRs trade in US dollars."],
  ["Trading", "Under Regulation T, the initial margin requirement for buying stock is", "50%", ["25%", "10%", "100%"], "Customers can borrow up to half the purchase price."],
  ["Compliance", "Cash transactions over $10,000 must be reported on a", "Currency Transaction Report (CTR)", ["Suspicious Activity Report only", "Form 1099", "Form U4"], "SARs report suspicious activity regardless of amount."],
  ["Compliance", "Trading on material, non-public information is", "insider trading", ["front running only", "churning", "arbitrage"], "It is illegal for insiders and those they tip."],
  ["Compliance", "Excessive trading in a customer account to generate commissions is", "churning", ["front running", "insider trading", "rebalancing"], "It is a sales practice violation."],
  ["Compliance", "Regulation Best Interest requires broker-dealers to", "act in the retail customer's best interest when recommending", ["guarantee profits", "only sell bonds", "charge no commissions"], "It applies to recommendations to retail customers."],
];
function sieCalc(): Q[] {
  return repeat(10, () => {
    const coupon = pick([4, 5, 6, 8]), price = pick([800, 900, 1000, 1100, 1250]), annual = coupon * 10, cy = r((annual / price) * 100, 2);
    return mcq("SIE", "Products", `A $1,000 bond with a ${coupon}% coupon trades at $${price}. What is its current yield?`, `${fmt(cy)}%`, numOpts(cy, [coupon, r((price / annual), 2), r(cy + 1, 2)], "%"), `Annual interest $${annual} ÷ price $${price} = ${fmt(cy)}%.`, 2);
  });
}

// ============================================================================ RES
const RES: F[] = [
  ["Ownership", "The most complete form of ownership is", "fee simple absolute", ["life estate", "leasehold", "easement"], "It lasts indefinitely and can be sold or inherited."],
  ["Ownership", "Joint tenancy includes the right of", "survivorship", ["partition only", "first refusal", "redemption"], "A deceased owner's share passes to the surviving owners."],
  ["Ownership", "In a tenancy in common, a deceased owner's share", "passes to their heirs", ["goes to the other owners", "is lost", "goes to the state"], "There is no right of survivorship."],
  ["Ownership", "A right to use another person's land for a specific purpose, such as a driveway, is an", "easement", ["encroachment", "lien", "escheat"], "An encroachment is something built over the boundary."],
  ["Ownership", "The government's power to take private property for public use with just compensation is", "eminent domain", ["escheat", "police power", "taxation"], "The process is called condemnation."],
  ["Deeds", "The deed that gives the buyer the greatest protection is a", "general warranty deed", ["quitclaim deed", "special warranty deed", "bargain and sale deed without covenants"], "A quitclaim gives no warranties."],
  ["Agency", "An agent's fiduciary duties include", "obedience, loyalty, disclosure, confidentiality, accounting and reasonable care", ["only marketing the property", "guaranteeing the sale price", "representing both sides secretly"], "Often remembered as OLDCAR."],
  ["Fair housing", "The federal Fair Housing Act protects against discrimination based on", "race, color, religion, national origin, sex, familial status and disability", ["income only", "credit score", "occupation"], "These are the seven federally protected classes."],
  ["Fair housing", "Directing buyers toward or away from neighborhoods based on a protected class is", "steering", ["blockbusting", "redlining", "puffing"], "It is illegal."],
  ["Fair housing", "Encouraging owners to sell by suggesting a protected group is moving in is", "blockbusting", ["steering", "redlining", "panic buying"], "It is illegal."],
  ["Contracts", "The Statute of Frauds requires real estate sale contracts to be", "in writing to be enforceable", ["notarised", "recorded within a day", "signed by three witnesses"], "Oral contracts for land generally can't be enforced."],
  ["Contracts", "An offer becomes a binding contract when", "acceptance is communicated to the offeror", ["the buyer views the house", "the agent lists the property", "the appraisal is done"], "A counteroffer rejects the original offer."],
  ["Finance", "One discount point equals", "1% of the loan amount", ["1% of the sale price", "$1,000", "0.1% of the loan"], "Points can lower the interest rate."],
  ["Finance", "Private mortgage insurance (PMI) is usually required on conventional loans when the loan-to-value ratio is above", "80%", ["50%", "95% only", "100%"], "It protects the lender."],
  ["Valuation", "The appraisal approach most used for single-family homes is the", "sales comparison approach", ["income approach", "cost approach", "gross rent multiplier only"], "The income approach suits rental and commercial property."],
  ["Law", "RESPA mainly regulates", "settlement (closing) procedures and bans kickbacks", ["zoning", "property taxes", "building codes"], "Real Estate Settlement Procedures Act."],
  ["Law", "Zoning is an example of the government's", "police power", ["eminent domain", "escheat", "taxation power"], "It regulates land use for public welfare."],
];
function resCalc(): Q[] {
  const out: Q[] = [];
  out.push(...repeat(8, () => {
    const price = pick([250000, 320000, 400000, 475000]), pct = pick([5, 6]), split = 50, total = price * pct / 100, agent = total * split / 100;
    return mcq("RES", "Math", `A home sells for ${usd(price)} with a ${pct}% commission split 50/50 between the listing and selling brokers. How much does the selling broker receive?`, usd(agent), [usd(total), usd(price * 0.03 * 0.5), usd(agent * 2), usd(agent + 1000)].filter((x) => x !== usd(agent)), `${usd(price)} × ${pct}% = ${usd(total)}; half is ${usd(agent)}.`, 2);
  }));
  out.push(...repeat(8, () => {
    const price = pick([200000, 300000, 400000]), down = pick([10, 20, 25]), loan = price * (100 - down) / 100, pts = pick([1, 2]), cost = loan * pts / 100;
    return mcq("RES", "Math", `A buyer pays ${usd(price)} with ${down}% down and pays ${pts} discount point(s) on the loan. How much do the points cost?`, usd(cost), [usd(price * pts / 100), usd(loan), usd(cost * 2)].filter((x) => x !== usd(cost)), `Loan = ${usd(loan)}; ${pts}% of the loan = ${usd(cost)}.`, 2);
  }));
  out.push(...repeat(6, () => {
    const noi = pick([24000, 36000, 48000, 60000]), rate = pick([6, 8, 10]), value = noi / (rate / 100);
    return mcq("RES", "Math", `A property's net operating income is ${usd(noi)} a year. At a ${rate}% capitalization rate, what is its value?`, usd(value), [usd(noi * rate), usd(noi * 10), usd(value / 2)].filter((x) => x !== usd(value)), `Value = NOI ÷ cap rate = ${usd(noi)} ÷ ${rate / 100} = ${usd(value)}.`, 3);
  }));
  return out;
}

// ============================================================================ LHI
const LHI: F[] = [
  ["Life insurance", "Term life insurance", "covers a set period and has no cash value", ["builds cash value", "lasts for life", "is an annuity"], "It is usually the cheapest form of life cover."],
  ["Life insurance", "Whole life insurance", "provides lifetime cover with guaranteed cash value growth", ["expires after 10 years", "has no cash value", "covers only accidents"], "Premiums are usually level."],
  ["Life insurance", "Universal life insurance offers", "flexible premiums and an adjustable death benefit", ["fixed premiums only", "no death benefit", "health cover"], "Cash value earns a credited interest rate."],
  ["Life insurance", "To buy life insurance on someone, you must have", "an insurable interest in their life", ["their medical records", "a court order", "a joint bank account"], "Insurable interest must exist when the policy is issued."],
  ["Life insurance", "The incontestability clause usually prevents the insurer from contesting the policy after", "2 years", ["30 days", "10 years", "6 months"], "Except for non-payment of premium."],
  ["Life insurance", "The grace period on a life insurance policy is typically", "30 or 31 days", ["7 days", "1 year", "none"], "Coverage continues if premium is paid within it."],
  ["Health insurance", "A deductible is", "the amount the insured pays before the insurer starts paying", ["the monthly premium", "the insurer's share of costs", "a fixed fee per visit"], "A copay is a fixed fee per visit."],
  ["Health insurance", "Coinsurance is", "the percentage of costs shared after the deductible", ["the premium", "a flat fee", "the maximum benefit"], "For example, 80/20 coinsurance."],
  ["Health insurance", "In an HMO, members usually need", "a primary care physician who refers them to specialists", ["no doctor at all", "to see any doctor without referral", "to pay all costs themselves"], "PPOs allow out-of-network care at a higher cost."],
  ["Health insurance", "COBRA lets employees keep group health cover after leaving a job, usually for up to", "18 months", ["6 months", "5 years", "life"], "The employee pays the full premium plus up to 2%."],
  ["Medicare", "Medicare Part A covers", "hospital inpatient care", ["prescription drugs", "doctor visits only", "dental care"], "Part B covers doctor and outpatient care; Part D covers drugs."],
  ["Medicare", "Medicare Part D covers", "prescription drugs", ["hospital stays", "long-term custodial care", "vision only"], "Part C is Medicare Advantage."],
  ["Disability", "The elimination period in disability income insurance is", "the waiting time before benefits start", ["the time benefits are paid", "the free-look period", "the grace period"], "A longer elimination period lowers premiums."],
  ["Long-term care", "Long-term care benefits are usually triggered by", "inability to perform a set number of activities of daily living (ADLs) or cognitive impairment", ["any hospital visit", "reaching age 50", "a job change"], "ADLs include bathing, dressing and eating."],
  ["Annuities", "During the accumulation phase of an annuity, the owner", "pays in and the value grows tax-deferred", ["receives lifetime income", "pays tax every year on growth", "cannot add money"], "The payout phase is annuitization."],
  ["Ethics", "Persuading a client to replace a policy with misleading information is", "twisting", ["rebating", "churning only", "underwriting"], "It is an unfair trade practice."],
  ["Ethics", "Giving part of your commission to a client as an inducement to buy is", "rebating", ["twisting", "sliding", "coinsurance"], "It is illegal in most states."],
];
function lhiCalc(): Q[] {
  return repeat(10, () => {
    const bill = pick([2000, 5000, 8000, 10000]), ded = pick([500, 1000]), co = pick([20, 30]), pay = ded + (bill - ded) * co / 100;
    return mcq("LHI", "Health insurance", `A patient has a ${usd(bill)} covered bill, a ${usd(ded)} deductible and ${100 - co}/${co} coinsurance. How much does the patient pay?`, usd(pay), [usd(bill * co / 100), usd(ded), usd(pay + ded)].filter((x) => x !== usd(pay)), `Deductible ${usd(ded)} + ${co}% of ${usd(bill - ded)} = ${usd(pay)}.`, 2);
  });
}

// ============================================================================ SSM
const SSM: F[] = [
  ["Temperatures", "Poultry must be cooked to a minimum internal temperature of", "165 °F for less than 1 second", ["145 °F for 15 seconds", "155 °F for 17 seconds", "135 °F"], "This also applies to stuffing and stuffed meats."],
  ["Temperatures", "Ground beef must be cooked to at least", "155 °F for 17 seconds", ["135 °F", "145 °F for 4 minutes", "165 °F for 1 minute"], "Grinding spreads bacteria through the meat."],
  ["Temperatures", "Seafood, steaks and pork chops must be cooked to at least", "145 °F for 15 seconds", ["135 °F", "155 °F for 17 seconds", "165 °F"], "Roasts have different time options."],
  ["Temperatures", "Hot TCS food must be held at", "135 °F or higher", ["120 °F or higher", "100 °F", "70 °F"], "Cold TCS food must be held at 41 °F or lower."],
  ["Temperatures", "Cold TCS food must be held at", "41 °F or lower", ["50 °F or lower", "32 °F exactly", "60 °F or lower"], "The temperature danger zone is 41–135 °F."],
  ["Temperatures", "Cooked TCS food must be cooled from 135 °F to 70 °F within", "2 hours", ["6 hours", "4 hours", "30 minutes"], "Then from 70 °F to 41 °F within the next 4 hours."],
  ["Temperatures", "TCS food reheated for hot-holding must reach", "165 °F for 15 seconds within 2 hours", ["135 °F within 6 hours", "145 °F within 4 hours", "120 °F"], "Commercially processed food can be reheated to 135 °F."],
  ["Pathogens", "Which is one of the 'Big Six' pathogens?", "Norovirus", ["Listeria only", "Mould", "Yeast"], "Shigella, Salmonella Typhi, nontyphoidal Salmonella, Shiga toxin-producing E. coli, hepatitis A and Norovirus."],
  ["Pathogens", "A food handler with jaundice should be", "excluded from the operation and reported to the regulatory authority", ["allowed to work with gloves", "moved to the dish area", "sent home for an hour"], "Jaundice can indicate hepatitis A."],
  ["Allergens", "How many major food allergens are recognised in the US?", "9", ["8", "14", "5"], "Sesame was added as the ninth in 2023."],
  ["Hygiene", "The whole handwashing process should take at least", "20 seconds", ["5 seconds", "2 minutes", "1 minute of scrubbing alone"], "Scrub for 10–15 seconds."],
  ["Receiving", "Live shellfish must be received with shellstock tags, which must be kept for", "90 days after the container is emptied", ["7 days", "1 year", "they can be discarded immediately"], "This allows trace-back in an outbreak."],
  ["Receiving", "Cold TCS food should be received at", "41 °F or lower, unless otherwise specified", ["50 °F", "60 °F", "any temperature"], "Reject food in the danger zone."],
  ["Storage", "Stock should be rotated using", "FIFO (first in, first out)", ["LIFO", "random order", "newest first"], "Use the oldest stock first."],
  ["Storage", "Raw ground meat should be stored", "below seafood and whole cuts of meat, but above poultry", ["above ready-to-eat food", "on the top shelf", "next to salads"], "Order is based on minimum cooking temperature."],
  ["Thawing", "An acceptable way to thaw food is", "in a refrigerator at 41 °F or lower", ["on the counter", "in hot water", "outside"], "Also under running water at 70 °F or lower, in the microwave if cooked straight away, or as part of cooking."],
  ["Cleaning", "In a three-compartment sink, the correct order is", "wash, rinse, sanitize, then air-dry", ["rinse, wash, sanitize, towel-dry", "sanitize, wash, rinse", "wash, sanitize, rinse"], "Scrape or rinse items before washing."],
  ["HACCP", "The first HACCP principle is to", "conduct a hazard analysis", ["establish record-keeping", "set critical limits", "verify the system"], "Then identify critical control points."],
  ["Pests", "Integrated pest management (IPM) relies first on", "denying pests access, food and shelter", ["spraying pesticides daily", "keeping a cat", "ignoring signs"], "Work with a licensed pest control operator."],
];

// ============================================================================ EPA
const EPA: F[] = [
  ["Core", "Section 608 of which law regulates refrigerant handling?", "the Clean Air Act", ["the Clean Water Act", "OSHA", "the Toxic Substances Control Act"], "It prohibits venting refrigerants."],
  ["Core", "The international treaty that phases out ozone-depleting substances is the", "Montreal Protocol", ["Kyoto Protocol", "Paris Agreement", "Geneva Convention"], "It was signed in 1987."],
  ["Core", "Which refrigerants have the highest ozone depletion potential?", "CFCs (such as R-12)", ["HFCs (such as R-134a)", "HFOs", "natural refrigerants like CO₂"], "HCFCs (such as R-22) have lower ODP; HFCs have none."],
  ["Core", "Ozone depletion is mainly caused by which element released from CFCs?", "chlorine", ["nitrogen", "fluorine", "carbon"], "Chlorine atoms break down ozone in the stratosphere."],
  ["Core", "Knowingly venting refrigerant during service is", "illegal", ["allowed if small", "allowed for HFCs", "required for safety"], "De minimis releases during good-practice recovery are not violations."],
  ["Core", "Recovery cylinders for refrigerant are colored", "gray with a yellow top", ["all red", "green with a white top", "blue"], "Department of Transportation standard."],
  ["Core", "Refrigerant recovery cylinders should not be filled above", "80% of their liquid capacity", ["50%", "95%", "100%"], "Leave room for liquid expansion."],
  ["Core", "Returning refrigerant to new-product purity standards (AHRI 700) is", "reclaiming", ["recovering", "recycling", "venting"], "Recycling is basic cleaning for reuse; recovering is removing it into a cylinder."],
  ["Core", "To pressurize a system for leak testing, use", "dry nitrogen", ["oxygen", "compressed air", "propane"], "Oxygen with oil can explode."],
  ["Core", "The purpose of evacuating (dehydrating) a system is to remove", "air and moisture", ["oil only", "refrigerant only", "copper filings"], "Use a vacuum pump and micron gauge."],
  ["Type I", "Type I certification covers", "small appliances with 5 pounds of refrigerant or less", ["high-pressure systems", "low-pressure chillers", "motor vehicle A/C"], "For example, domestic refrigerators and window units."],
  ["Type II", "Type II certification covers", "high-pressure and very high-pressure appliances", ["small appliances only", "low-pressure chillers", "car air conditioners"], "Common refrigerants include R-22 and R-410A."],
  ["Type III", "Type III certification covers", "low-pressure appliances such as chillers using R-123", ["window air conditioners", "home refrigerators", "car A/C"], "Low-pressure systems can operate below atmospheric pressure."],
  ["Type III", "Because low-pressure chillers operate below atmospheric pressure, leaks tend to", "let air and moisture into the system", ["release refrigerant only", "stop the compressor permanently", "raise the boiling point"], "Purge units remove non-condensables."],
  ["Records", "Technicians and owners should keep refrigerant service records for at least", "3 years", ["30 days", "1 year", "10 years"], "Recordkeeping requirements apply to many appliances."],
  ["Safety", "When handling refrigerant, you should wear", "safety glasses and gloves", ["only a dust mask", "nothing special", "sandals"], "Liquid refrigerant can cause frostbite."],
];

export function usjobs(): Record<string, Q[]> {
  return {
    PHB: facts("PHB", PHB),
    MAQ: [...facts("MAQ", MAQ), ...maqCalc()],
    PTB: [...facts("PTB", PTB), ...ptbCalc()],
    MCD: facts("MCD", MCD),
    SIE: [...facts("SIE", SIE), ...sieCalc()],
    RES: [...facts("RES", RES), ...resCalc()],
    LHI: [...facts("LHI", LHI), ...lhiCalc()],
    SSM: facts("SSM", SSM),
    EPA: facts("EPA", EPA),
  };
}
