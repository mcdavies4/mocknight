// Third batch: API 510/570 (INS) depth, plus penetrant (NPT) and magnetic particle (NMT).
// Established code principles and standard formulas only.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;

const INS: F[] = [
  ["Design", "For a Type 1 butt joint with full radiography under ASME VIII Div. 1, the joint efficiency E is", "1.0", ["0.85", "0.70", "0.60"], "Spot radiography gives 0.85; no radiography gives 0.70."],
  ["Design", "For a Type 1 butt joint with spot radiography, E is", "0.85", ["1.0", "0.70", "0.50"], "Full RT gives 1.0; no RT gives 0.70."],
  ["Design", "For a Type 1 butt joint with no radiography, E is", "0.70", ["1.0", "0.85", "0.90"], "Less examination means a lower allowed stress."],
  ["Design", "The ASME VIII Div. 1 formula t = PR ÷ (2SE + 0.4P) is for", "longitudinal stress (circumferential joints) in a cylindrical shell", ["circumferential stress (longitudinal joints)", "a hemispherical head", "nozzle reinforcement"], "Circumferential stress, t = PR ÷ (SE − 0.6P), usually governs."],
  ["Design", "For a 2:1 ellipsoidal head, ASME VIII Div. 1 required thickness is", "t = PD ÷ (2SE − 0.2P)", ["t = PR ÷ (SE − 0.6P)", "t = PL ÷ (2SE − 0.2P)", "t = PD ÷ 2(SE + PY)"], "PL ÷ (2SE − 0.2P) is for a hemispherical head."],
  ["Testing", "Under ASME VIII Div. 1, a pneumatic test pressure is", "1.1 × MAWP × stress ratio", ["1.3 × MAWP × stress ratio", "1.5 × MAWP", "2 × MAWP"], "Pneumatic tests store much more energy than hydrotests."],
  ["Corrosion rates", "The short-term corrosion rate is calculated from", "the two most recent thickness readings", ["the original and latest readings", "the nominal thickness only", "the hydrotest pressure"], "The long-term rate uses the initial (or earliest) and latest readings."],
  ["Corrosion rates", "The long-term corrosion rate is calculated from", "the initial (or earliest) and most recent thickness readings", ["the two most recent readings", "the design pressure", "the hydrotest results"], "The inspector selects the rate that best reflects current conditions."],
  ["Intervals", "Under API 510, on-stream inspection may replace an internal inspection when, among other conditions, the general corrosion rate is below", "0.125 mm/yr (0.005 in/yr) and remaining life exceeds 10 years", ["1 mm/yr and remaining life exceeds 1 year", "any rate if the vessel is painted", "5 mm/yr"], "Other conditions include no stress cracking and no lining."],
  ["Intervals", "Under API 510, pressure relief devices in typical process service should be tested at intervals not exceeding", "5 years", ["1 year", "15 years", "20 years"], "Up to 10 years for clean, non-fouling, non-corrosive service."],
  ["Intervals", "Under API 510, PRDs in clean, non-fouling, non-corrosive service may go up to", "10 years", ["5 years", "20 years", "2 years"], "Typical process service is limited to 5 years."],
  ["Piping", "Most on-site process piping in a refinery is typically", "Class 2", ["Class 1", "Class 3", "Class 4"], "Class 1 covers the highest-consequence services."],
  ["Piping", "On a pipe elbow, wall loss from erosion is usually greatest on the", "outer radius (extrados)", ["inner radius (intrados)", "flange face", "pipe support"], "Flow impinges on the outside of the bend."],
  ["Piping", "An injection point circuit covers piping where", "chemicals or water are injected into the process stream", ["the pipe is buried", "steam tracing is installed", "the line is out of service"], "Injection points can cause severe localised corrosion."],
  ["CUI", "Which location is especially prone to CUI?", "Insulation penetrations and damaged jacketing where water can enter", ["Uninsulated pipe in dry indoor areas", "Pipe operating above 400 °C", "Stainless steel in vacuum service only"], "Low points and supports are also hot spots."],
  ["Damage", "Polythionic acid stress corrosion cracking typically affects", "sensitised austenitic stainless steels during shutdowns", ["carbon steel in hot service", "titanium in seawater", "copper in fresh water"], "Soda ash washes or nitrogen purges help prevent it."],
  ["Damage", "Sulfidation of carbon steel becomes significant above about", "260 °C (500 °F)", ["0 °C", "60 °C", "1,000 °C only"], "It is common in hot crude and vacuum units."],
  ["Damage", "Naphthenic acid corrosion is mainly found in", "high-temperature crude and vacuum units processing acidic crudes", ["cooling water systems", "fire water lines", "storage tank roofs"], "Measured by the crude's total acid number (TAN)."],
  ["Damage", "Caustic stress corrosion cracking is a risk where carbon steel is exposed to", "hot caustic (NaOH) solutions", ["dry air", "fresh water at ambient temperature", "pure nitrogen"], "PWHT reduces the risk."],
  ["Damage", "Hydrogen blistering in carbon steel results from", "atomic hydrogen collecting at laminations and inclusions in wet H₂S service", ["high-temperature oxidation", "UV exposure", "mechanical impact"], "Blisters can be found by visual and UT examination."],
  ["Repairs", "Weld repairs on pressure vessels should use procedures and welders qualified to", "ASME Section IX", ["ASME Section V", "API 1104", "AWS D1.1"], "The construction code may add extra requirements."],
  ["Records", "Which records must the owner-user keep under API 510/570?", "Inspection history, thickness data, repairs, alterations and calculations", ["Only the purchase invoice", "Only the paint colour", "No records are required"], "Records support corrosion rates and intervals."],
];

function stcrLtcr(): Q[] {
  return repeat(10, () => {
    const t0 = pick([12.7, 15.9, 19.1]), y0 = pick([2004, 2008, 2010]), y1 = y0 + pick([6, 8, 10]), y2 = y1 + pick([3, 4, 5]);
    const t1 = r(t0 - pick([0.6, 0.8, 1.0]), 2), t2 = r(t1 - pick([0.6, 0.9, 1.2, 1.5]), 2);
    const askShort = ri(0, 1) === 1;
    const st = r((t1 - t2) / (y2 - y1), 3), lt = r((t0 - t2) / (y2 - y0), 3);
    const ans = askShort ? st : lt;
    return mcq("INS", "Calculations", `Thickness readings at one CML: ${y0}: ${t0} mm (initial), ${y1}: ${t1} mm, ${y2}: ${t2} mm. What is the ${askShort ? "short-term" : "long-term"} corrosion rate?`, fmt(ans, "mm/yr"),
      numOpts(ans, [askShort ? lt : st, r((t0 - t1) / (y1 - y0), 3), r((t0 - t2) / (y2 - y1), 3)], "mm/yr"),
      askShort ? `Short-term = (${t1} − ${t2}) ÷ (${y2} − ${y1}) = ${fmt(st)} mm/yr.` : `Long-term = (${t0} − ${t2}) ÷ (${y2} − ${y0}) = ${fmt(lt)} mm/yr.`, 3);
  });
}
function futureThickness(): Q[] {
  return repeat(8, () => {
    const t = pick([9.5, 10.2, 11.4, 12]), rate = pick([0.1, 0.15, 0.2, 0.25]), yrs = pick([3, 4, 5, 6]);
    const ans = r(t - rate * yrs, 2);
    return mcq("INS", "Calculations", `A shell is ${t} mm thick today and corroding at ${rate} mm/yr. What thickness is expected at the next inspection in ${yrs} years?`, fmt(ans, "mm"),
      numOpts(ans, [r(t - rate, 2), r(t + rate * yrs, 2), r(t - rate * yrs * 2, 2)], "mm"), `${t} − ${rate} × ${yrs} = ${fmt(ans)} mm.`, 2);
  });
}
function ellipsoidalHead(): Q[] {
  return repeat(8, () => {
    const P = pick([150, 200, 250]), D = pick([48, 60, 72]), S = pick([17500, 20000]), E = pick([0.85, 1]);
    const ans = r((P * D) / (2 * S * E - 0.2 * P), 3);
    return mcq("INS", "Calculations", `2:1 ellipsoidal head: P = ${P} psi, inside diameter D = ${D} in, S = ${S.toLocaleString("en-US")} psi, E = ${E}. Find t using t = PD ÷ (2SE − 0.2P).`, fmt(ans, "in"),
      numOpts(ans, [r((P * D) / (S * E - 0.6 * P), 3), r((P * (D / 2)) / (2 * S * E - 0.2 * P), 3), r((P * D) / (2 * S * E), 4) === ans ? r(ans * 1.2, 3) : r((P * D) / (2 * S * E), 4)], "in"),
      `t = ${P} × ${D} ÷ (2 × ${S} × ${E} − 0.2 × ${P}) = ${fmt(ans)} in.`, 3);
  });
}
function pneumatic(): Q[] {
  return repeat(6, () => {
    const mawp = pick([100, 150, 200, 250]), ratio = pick([1, 1.05, 1.1]);
    const ans = r(1.1 * mawp * ratio, 1);
    return mcq("INS", "Calculations", `ASME VIII Div. 1 pneumatic test: MAWP ${mawp} psi, stress ratio ${ratio}. Minimum test pressure? (1.1 × MAWP × stress ratio)`, fmt(ans, "psi"),
      numOpts(ans, [r(1.3 * mawp * ratio, 1), r(1.5 * mawp, 1), r(1.1 * mawp, 1) === ans ? r(mawp, 1) : r(1.1 * mawp, 1)], "psi"), `1.1 × ${mawp} × ${ratio} = ${fmt(ans)} psi.`, 2);
  });
}
function retireYear(): Q[] {
  return repeat(8, () => {
    const year = pick([2024, 2025, 2026]), tact = pick([8.4, 9, 9.6, 10.2]), treq = pick([6, 6.6, 7.2]), rate = pick([0.12, 0.15, 0.2, 0.3]);
    if (tact <= treq) return null;
    const life = (tact - treq) / rate, ans = Math.floor(year + life);
    return mcq("INS", "Calculations", `In ${year}, a CML measures ${tact} mm. Required thickness is ${treq} mm and the corrosion rate is ${rate} mm/yr. In which year will it reach the required thickness (rounded down)?`, String(ans),
      numOpts(ans, [Math.floor(year + life / 2), Math.floor(year + tact / rate), ans + 5]).map(String), `Remaining life = (${tact} − ${treq}) ÷ ${rate} = ${r(life, 1)} years → ${year} + ${r(life, 1)} ≈ ${ans}.`, 3);
  });
}

const NPT: F[] = [
  ["Types", "Type I penetrants are", "fluorescent", ["visible (colour contrast)", "dual-mode only", "magnetic"], "Type II penetrants are visible (usually red)."],
  ["Types", "In penetrant classification, Method C is", "solvent-removable", ["water-washable", "post-emulsifiable lipophilic", "post-emulsifiable hydrophilic"], "Method A is water-washable; B is lipophilic; D is hydrophilic."],
  ["Types", "Method A penetrant is", "water-washable", ["solvent-removable", "post-emulsifiable", "dry powder"], "It contains its own emulsifier."],
  ["Cleaning", "Why should abrasive blasting generally be avoided immediately before PT?", "It can smear metal over cracks and close them", ["It makes the surface too clean", "It magnetises the part", "It changes the penetrant colour"], "Chemical cleaning or etching is preferred."],
  ["Cleaning", "Vapour degreasing and solvent cleaning before PT are used to remove", "oils and greases", ["the base metal", "magnetism", "fluorescence"], "Contaminants stop penetrant entering defects."],
  ["Cleaning", "After solvent pre-cleaning, the surface must be", "completely dry before applying penetrant", ["still wet with solvent", "painted", "heated above 100 °C"], "Solvent in defects dilutes or blocks penetrant."],
  ["Process", "Low part temperatures generally require", "a longer penetrant dwell time", ["a shorter dwell time", "no developer", "fluorescent light only"], "Penetrant becomes more viscous when cold."],
  ["Process", "When removing solvent-removable penetrant, the solvent should be", "applied to a cloth, not sprayed directly on the surface", ["sprayed heavily onto the part", "poured into the defect", "skipped entirely"], "Direct spraying washes penetrant out of defects."],
  ["Process", "Once a part has been tested with visible penetrant, it should not be retested with", "fluorescent penetrant", ["the same visible penetrant", "a developer", "a cleaner"], "Visible dye residues can quench fluorescence."],
  ["Process", "Mercury-vapour UV-A lamps generally need", "a warm-up period before use", ["no warm-up at all", "to be used without filters", "to be cooled in water"], "LED UV lamps reach full output much faster."],
  ["Interpretation", "If an indication is unclear, the inspector can", "wipe the area with a solvent-dampened swab and watch whether it bleeds out again", ["ignore it", "paint over it", "magnetise the part"], "Real discontinuities usually bleed out again."],
  ["Applications", "Penetrant testing can be used for leak detection by", "applying penetrant to one side and developer to the other", ["X-raying the part", "magnetising it", "measuring its hardness"], "Penetrant passes through the through-wall leak path."],
];

const NMT: F[] = [
  ["Technique", "To inspect the inside surface of a tube for longitudinal cracks, use", "a central conductor (threader bar) to create a circular field", ["a coil around the outside", "a yoke on the outside only", "no magnetisation"], "The circular field crosses longitudinal cracks on the bore."],
  ["Technique", "Placing a part inside an energised coil produces", "a longitudinal field", ["a circular field", "no field", "an X-ray"], "Longitudinal fields find transverse cracks."],
  ["Technique", "Half-wave rectified DC is often used with dry powder because it", "improves detection of slightly subsurface defects and helps particle mobility", ["finds only surface cracks", "needs no power", "demagnetises the part"], "The pulsing current agitates the powder."],
  ["Technique", "Wet MT particles are suspended in", "water with conditioners or a light petroleum distillate", ["crude oil", "seawater", "paint thinner with pigment"], "Conditioners help wetting and prevent corrosion."],
  ["Technique", "An MT yoke's lifting power should be checked", "before use, at the frequency set by the procedure", ["only when it is new", "never", "after the inspection is complete only"], "It confirms the yoke can produce an adequate field."],
  ["Technique", "Head shots and prods are examples of", "direct magnetisation (current through the part)", ["indirect magnetisation", "demagnetisation", "radiographic techniques"], "Coils and yokes give indirect magnetisation."],
  ["Particles", "A mix of elongated and spherical dry particles is used because", "elongated particles align with leakage fields and spherical ones flow easily", ["it is cheaper", "it looks better", "it reduces magnetism"], "Both shape and size affect sensitivity."],
  ["Particles", "Before using a wet fluorescent bath, it should also be checked for", "contamination and loss of fluorescence", ["radioactivity", "hardness", "salt content only"], "Compare against a reference standard."],
  ["Related methods", "Magnetic flux leakage (MFL) is widely used to scan", "storage tank floors and pipelines for corrosion", ["concrete walls", "plastic pipes", "wooden structures"], "MFL uses the same leakage principle without particles."],
  ["Interpretation", "Indications at a sharp change of section that do not correspond to a discontinuity are", "non-relevant indications", ["rejectable cracks", "false indications from dirt", "always laminations"], "Geometry concentrates the field."],
  ["Interpretation", "Subsurface defect indications in MT tend to look", "broad and fuzzy", ["sharp and crisp", "invisible under all conditions", "bright red under white light only"], "Surface cracks give sharp, well-defined lines."],
  ["Demagnetising", "Demagnetising with AC through a coil works best when the part is", "withdrawn slowly from the coil while current flows", ["left still inside with current off", "heated to 100 °C", "painted first"], "The field reverses and gradually weakens."],
];

export function oilgas4(): Record<string, Q[]> {
  return {
    INS: [...facts("INS", INS), ...stcrLtcr(), ...futureThickness(), ...ellipsoidalHead(), ...pneumatic(), ...retireYear()],
    NPT: facts("NPT", NPT),
    NMT: facts("NMT", NMT),
  };
}
