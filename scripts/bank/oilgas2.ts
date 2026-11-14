// Inspection & integrity starter banks:
//   WIN — welding inspection (CSWIP 3.1 / AWS CWI)
//   INS — in-service inspection (API 510 pressure vessels / API 570 piping)
//   COR — coating & corrosion inspection (AMPP CIP Level 1)
//   ODP — drilling & production fundamentals (added to the Oil & gas track)
// Facts are long-established principles; calculations use the standard formulas so answers are exact.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;

// ---------------------------------------------------------------------------
// WIN — welding inspection
// ---------------------------------------------------------------------------
const WIN: F[] = [
  ["Processes", "MMA (manual metal arc) welding is also known as", "SMAW (shielded metal arc welding)", ["GTAW", "GMAW", "SAW"], "It uses a flux-coated stick electrode."],
  ["Processes", "TIG welding is also known as", "GTAW (gas tungsten arc welding)", ["GMAW", "SMAW", "FCAW"], "It uses a non-consumable tungsten electrode."],
  ["Processes", "Which shielding gas is inert and used for TIG welding?", "Argon", ["Carbon dioxide", "Oxygen", "Nitrogen"], "Helium is the other common inert gas."],
  ["Processes", "MAG welding uses which type of shielding gas?", "Active gas, such as CO₂ or argon–CO₂ mixtures", ["Pure argon only", "No gas", "Hydrogen"], "MIG uses inert gas; MAG uses active gas."],
  ["Processes", "Which process uses a granular flux blanket and is usually automated?", "Submerged arc welding (SAW)", ["TIG", "MMA", "Oxy-acetylene"], "The arc is hidden under the flux."],
  ["Consumables", "In the AWS electrode classification E7018, the '70' means", "minimum tensile strength of 70,000 psi", ["70% iron powder", "maximum 70 amps", "70 mm long"], "E7018 is a low-hydrogen electrode."],
  ["Consumables", "Why are low-hydrogen electrodes stored in heated ovens or quivers?", "To keep moisture out and reduce the risk of hydrogen cracking", ["To make them easier to strike", "To melt the flux", "To increase spatter"], "Moisture in the coating adds hydrogen to the weld."],
  ["Cracking", "Which four factors together cause hydrogen (cold) cracking?", "Hydrogen, a susceptible (hard) microstructure, tensile stress and low temperature", ["Sulphur, phosphorus, heat and speed", "Argon, CO₂, current and voltage", "Slag, spatter, porosity and undercut"], "Removing any one factor prevents it."],
  ["Cracking", "What is the main purpose of preheating steel before welding?", "To slow cooling and help hydrogen escape, reducing cracking risk", ["To clean off paint", "To increase deposition rate only", "To make the weld cheaper"], "Higher carbon equivalent and thicker sections need more preheat."],
  ["Cracking", "Lamellar tearing occurs", "in the parent plate, parallel to the surface, due to through-thickness stress", ["only in the weld cap", "in aluminium only", "during painting"], "Non-metallic inclusions in the plate make it worse."],
  ["Cracking", "Solidification (hot) cracking typically appears", "along the weld centreline", ["in the parent metal far from the weld", "only in the HAZ toe", "only after years in service"], "Deep, narrow welds and sulphur increase the risk."],
  ["Documents", "What is a WPS?", "Welding Procedure Specification — the instructions for making a weld", ["Welder Performance Score", "Weld Position Standard", "Workshop Planning Schedule"], "It lists process, consumables, parameters and preheat."],
  ["Documents", "What does a PQR record?", "The actual parameters and test results of a qualified test weld", ["A welder's attendance", "A list of NDT staff", "The price of consumables"], "Procedure Qualification Record supports the WPS."],
  ["Documents", "Which ASME code section covers welding and brazing qualifications?", "Section IX", ["Section V", "Section VIII", "Section II"], "Section V covers NDT methods."],
  ["Testing", "A bend test mainly checks a weld's", "ductility and soundness", ["hardness only", "corrosion resistance", "colour"], "Defects open up on the stretched face."],
  ["Testing", "A Charpy impact test measures", "toughness (energy absorbed at a given temperature)", ["hardness", "tensile strength", "surface finish"], "Results are in joules."],
  ["Testing", "A macro examination of a weld cross-section shows", "fusion, penetration, profile and visible defects", ["chemical composition", "residual stress", "tensile strength"], "It is etched and viewed at low magnification."],
  ["Inspection", "Which is a duty of the welding inspector BEFORE welding?", "Checking the WPS, welder qualifications, materials and fit-up", ["Signing the final release only", "Painting the weld", "Hydrotesting"], "Inspection happens before, during and after welding."],
  ["Inspection", "For an equal-leg mitre fillet weld, the throat thickness is about", "0.7 × leg length", ["1.4 × leg length", "0.5 × leg length", "equal to the leg length"], "Throat = leg × cos 45° ≈ 0.707 × leg."],
  ["Inspection", "Under AWS A2.4, a weld symbol placed BELOW the reference line means the weld is", "on the arrow side", ["on the other side", "on both sides", "a field weld"], "Above the line means the other side."],
  ["Heat treatment", "The main purpose of post-weld heat treatment (PWHT) is", "to relieve residual stresses and temper hard zones", ["to remove spatter", "to increase weld size", "to clean the weld"], "Codes require it for thicker or high-risk joints."],
  ["Problems", "Arc blow is a problem mainly with", "DC welding on magnetised material", ["AC welding only", "Oxy-fuel cutting", "Brazing"], "Magnetic fields deflect the arc."],
];

function heatInput(): Q[] {
  return repeat(10, () => {
    const V = ri(20, 32), A = pick([120, 150, 180, 200, 220, 250]), S = pick([150, 200, 250, 300, 400]);
    const ans = r((V * A * 60) / (S * 1000), 2);
    return mcq("WIN", "Calculations", `Calculate the arc energy: ${V} V, ${A} A, travel speed ${S} mm/min. (Arc energy kJ/mm = V × A × 60 ÷ (speed × 1000))`, fmt(ans, "kJ/mm"),
      numOpts(ans, [r((V * A) / (S * 1000), 3), r((V * A * 60) / S, 0), r((V * A * 60) / (S * 100), 1)], "kJ/mm"),
      `${V} × ${A} × 60 ÷ (${S} × 1000) = ${fmt(ans)} kJ/mm. Heat input = arc energy × process efficiency.`, 2);
  });
}
function throat(): Q[] {
  return repeat(8, () => {
    const z = pick([6, 8, 10, 12, 14, 15, 20]);
    const ans = r(z * 0.7, 1);
    return mcq("WIN", "Calculations", `An equal-leg mitre fillet weld has a leg length of ${z} mm. What is its design throat thickness (approx.)?`, fmt(ans, "mm"),
      numOpts(ans, [r(z * 1.4, 1), r(z / 2, 1), z], "mm"), `Throat ≈ 0.7 × leg = 0.7 × ${z} = ${fmt(ans)} mm.`, 1);
  });
}
function carbonEq(): Q[] {
  return repeat(8, () => {
    const C = pick([0.12, 0.15, 0.18, 0.2, 0.22]), Mn = pick([0.9, 1.2, 1.5]), Cr = pick([0, 0.1, 0.2]), Mo = pick([0, 0.05, 0.1]), Ni = pick([0, 0.15, 0.3]), Cu = pick([0, 0.15, 0.3]);
    const ans = r(C + Mn / 6 + (Cr + Mo) / 5 + (Ni + Cu) / 15, 2);
    return mcq("WIN", "Calculations", `Using CE = C + Mn/6 + (Cr+Mo+V)/5 + (Ni+Cu)/15, find the carbon equivalent: C ${C}%, Mn ${Mn}%, Cr ${Cr}%, Mo ${Mo}%, V 0%, Ni ${Ni}%, Cu ${Cu}%.`, fmt(ans),
      numOpts(ans, [r(C + Mn / 5 + (Cr + Mo) / 6 + (Ni + Cu) / 15, 2), r(C + Mn, 2), r(C + Mn / 6, 2)]),
      `CE = ${C} + ${Mn}/6 + ${r(Cr + Mo, 2)}/5 + ${r(Ni + Cu, 2)}/15 = ${fmt(ans)}. A higher CE means a greater need for preheat.`, 3);
  });
}

// ---------------------------------------------------------------------------
// INS — API 510 / 570 in-service inspection
// ---------------------------------------------------------------------------
const INS: F[] = [
  ["Codes", "API 510 covers inspection, repair and alteration of", "in-service pressure vessels", ["process piping", "aboveground storage tanks", "pipelines"], "API 570 covers piping; API 653 covers tanks."],
  ["Codes", "API 570 covers", "in-service process piping", ["pressure vessels", "storage tanks", "boilers"], "It applies to metallic and FRP piping in refineries and chemical plants."],
  ["Codes", "API 653 covers", "aboveground storage tanks", ["pressure vessels", "piping", "offshore platforms"], "It covers tank inspection, repair, alteration and reconstruction."],
  ["Codes", "Which API document describes damage mechanisms in the refining industry?", "API RP 571", ["API 510", "API 1104", "API 650"], "It covers mechanisms like CUI, sulfidation and SCC."],
  ["Codes", "Risk-based inspection (RBI) is covered by", "API RP 580 and 581", ["API 571", "API 577", "ASME IX"], "RBI prioritises inspection by likelihood and consequence of failure."],
  ["Codes", "Which document covers inspection of pressure-relieving devices?", "API RP 576", ["API RP 577", "API RP 574", "API 650"], "Relief valves must be tested and inspected at set intervals."],
  ["Codes", "API certification for 510, 570 and 653 inspectors must be renewed every", "3 years", ["1 year", "5 years", "10 years"], "Recertification includes experience checks and, periodically, an online exam."],
  ["Damage", "Corrosion under insulation (CUI) of carbon steel is most likely at operating temperatures of about", "-12 °C to 175 °C", ["above 400 °C only", "below -50 °C only", "at any temperature equally"], "Water gets trapped under insulation in this range."],
  ["Damage", "Chloride stress corrosion cracking mainly affects", "austenitic stainless steels", ["carbon steel", "titanium", "glass-lined vessels"], "Chlorides, tensile stress and heat are needed."],
  ["Damage", "High-temperature hydrogen attack (HTHA) is assessed using", "Nelson curves (API RP 941)", ["The IIW block", "Charpy curves", "The inverse square law"], "Curves relate temperature and hydrogen partial pressure."],
  ["Damage", "Which type of piping location is especially prone to corrosion because fluid does not flow?", "Deadlegs", ["Main headers", "Pump discharge lines", "Relief valve inlets with flow"], "Stagnant fluid lets water and deposits settle."],
  ["Damage", "Corrosion caused by bacteria is called", "microbiologically influenced corrosion (MIC)", ["sulfidation", "erosion", "creep"], "Common in water systems and tank bottoms."],
  ["Testing", "Why is water preferred to air for pressure testing?", "Water stores far less energy, so failure is much less dangerous", ["Water is cheaper than air in every case", "Air cannot reach test pressure", "Codes forbid air entirely"], "Pneumatic tests need extra precautions."],
  ["Testing", "For ASME VIII Div. 1 vessels, the standard hydrotest pressure is", "1.3 × MAWP × stress ratio", ["1.1 × MAWP", "1.5 × design pressure always", "2 × MAWP"], "Stress ratio = allowable stress at test temperature ÷ at design temperature."],
  ["Terms", "CML stands for", "Condition Monitoring Location", ["Corrosion Measurement Limit", "Code Minimum Level", "Critical Material List"], "Formerly called thickness measurement locations (TMLs)."],
  ["Terms", "Under API 510, a change that alters the design (such as adding a large nozzle) is an", "alteration", ["repair", "routine maintenance", "inspection"], "Alterations need engineering approval."],
  ["Intervals", "Under API 510, the internal or on-stream inspection interval is the lesser of", "half the remaining life or 10 years", ["the full remaining life or 20 years", "one quarter of remaining life or 5 years", "3 years always"], "RBI can be used to set different intervals."],
  ["Intervals", "Under API 570, the maximum thickness-measurement interval for Class 1 piping is", "5 years (or half the remaining life if less)", ["10 years", "1 year", "15 years"], "Class 2 and 3 piping can go up to 10 years."],
];

function corrosionRate(): Q[] {
  return repeat(10, () => {
    const prev = pick([12.5, 12.7, 14, 15.9, 19, 25.4]), years = pick([4, 5, 8, 10]), loss = pick([0.8, 1, 1.2, 1.5, 2, 2.4]);
    const act = r(prev - loss, 2), ans = r(loss / years, 3);
    return mcq("INS", "Calculations", `A CML read ${prev} mm ${years} years ago and ${act} mm today. What is the corrosion rate?`, fmt(ans, "mm/yr"),
      numOpts(ans, [r(act / years, 3), r(loss * years, 2), r(loss / (years * 2), 3)], "mm/yr"),
      `Corrosion rate = (${prev} − ${act}) ÷ ${years} = ${fmt(ans)} mm/yr.`, 2);
  });
}
function remainingLife(): Q[] {
  return repeat(10, () => {
    const treq = pick([6, 7.5, 8, 9.5, 10]), margin = pick([2, 2.4, 3, 3.6, 4, 4.8]), rate = pick([0.1, 0.12, 0.2, 0.24, 0.3, 0.4]);
    const tact = r(treq + margin, 2), life = r(margin / rate, 1), interval = Math.min(r(life / 2, 1), 10);
    const askInterval = ri(0, 1) === 1;
    if (askInterval) {
      return mcq("INS", "Calculations", `A vessel shell is ${tact} mm thick; required thickness is ${treq} mm; corrosion rate is ${rate} mm/yr. Under API 510, what is the maximum internal inspection interval?`, fmt(interval, "years"),
        numOpts(interval, [life, r(life / 4, 1), 10 === interval ? 5 : 10], "years"),
        `Remaining life = (${tact} − ${treq}) ÷ ${rate} = ${fmt(life)} years. Interval = lesser of half (${fmt(r(life / 2, 1))}) or 10 years = ${fmt(interval)} years.`, 3);
    }
    return mcq("INS", "Calculations", `Actual thickness ${tact} mm, required thickness ${treq} mm, corrosion rate ${rate} mm/yr. What is the remaining life?`, fmt(life, "years"),
      numOpts(life, [r(tact / rate, 1), r(life / 2, 1), r(margin * rate, 2)], "years"),
      `Remaining life = (${tact} − ${treq}) ÷ ${rate} = ${fmt(life)} years.`, 2);
  });
}
function shellThickness(): Q[] {
  return repeat(8, () => {
    const P = pick([150, 200, 250, 300]), R = pick([24, 30, 36, 48]), S = pick([17500, 20000]), E = pick([0.85, 1]);
    const ans = r((P * R) / (S * E - 0.6 * P), 3);
    return mcq("INS", "Calculations", `ASME VIII Div. 1 cylindrical shell (circumferential stress): P = ${P} psi, inside radius R = ${R} in, S = ${S.toLocaleString("en-US")} psi, E = ${E}. Using t = PR ÷ (SE − 0.6P), find t (inches).`, fmt(ans, "in"),
      numOpts(ans, [r((P * R) / (S * E), 3), r((P * R) / (2 * S * E + 0.4 * P), 3), r((P * R * 2) / (S * E - 0.6 * P), 3)], "in"),
      `t = ${P} × ${R} ÷ (${S} × ${E} − 0.6 × ${P}) = ${fmt(ans)} in (before corrosion allowance).`, 3);
  });
}

// ---------------------------------------------------------------------------
// COR — coating & corrosion inspection
// ---------------------------------------------------------------------------
const COR: F[] = [
  ["Corrosion", "Which four parts are needed for a corrosion cell?", "Anode, cathode, electrolyte and a metallic path", ["Heat, fuel, oxygen and spark", "Primer, mid coat, topcoat and thinner", "Steel, paint, water and sun"], "Remove any one and corrosion stops."],
  ["Corrosion", "In a corrosion cell, which part corrodes?", "The anode", ["The cathode", "The electrolyte", "The metallic path"], "Metal loss happens at the anode."],
  ["Corrosion", "Why does zinc protect steel in galvanising?", "Zinc is more active, so it corrodes sacrificially instead of the steel", ["Zinc is harder than steel", "Zinc stops all moisture forever", "Zinc is a cathode"], "Zinc is anodic to steel in the galvanic series."],
  ["Corrosion", "Which metals are used as sacrificial anodes for cathodic protection?", "Zinc, aluminium and magnesium", ["Copper, gold and silver", "Lead, tin and nickel", "Stainless steel only"], "Impressed-current systems use a power source instead."],
  ["Environment", "Before coating, the steel temperature should be at least how far above the dew point?", "3 °C (5 °F)", ["0.5 °C", "10 °C", "It doesn't matter"], "This prevents condensation on the surface."],
  ["Environment", "Which instrument measures wet- and dry-bulb temperatures to find relative humidity and dew point?", "Sling psychrometer", ["DFT gauge", "Holiday detector", "Replica tape"], "Electronic hygrometers are also used."],
  ["Surface prep", "ISO 8501-1 Sa 2½ is equivalent to", "SSPC-SP 10 / NACE No. 2 near-white blast", ["SSPC-SP 5 white metal blast", "SSPC-SP 2 hand-tool cleaning", "Solvent cleaning"], "Sa 3 corresponds to white metal (SP 5)."],
  ["Surface prep", "Which standard cleaning grade is 'white metal' blast?", "Sa 3 / SSPC-SP 5", ["Sa 1", "St 2", "Sa 2"], "No visible contaminants remain at all."],
  ["Surface prep", "Surface profile (anchor pattern) is commonly measured with", "replica tape and a micrometer", ["a pull-off adhesion tester", "a holiday detector", "a sling psychrometer"], "Profile helps the coating grip."],
  ["Surface prep", "Which test detects soluble salts on a blasted surface?", "Bresle patch test", ["Cross-hatch test", "Spark test", "Charpy test"], "Salts under coatings cause osmotic blistering."],
  ["Surface prep", "Why must oil and grease be removed BEFORE abrasive blasting?", "Blasting spreads contamination across the surface", ["Oil makes blasting faster", "It is only cosmetic", "Grease protects the abrasive"], "Solvent clean first (SSPC-SP 1)."],
  ["Coatings", "Volume solids of a paint tells you", "the percentage of the wet film that remains as dry film", ["the weight of pigment only", "the drying time", "the colour strength"], "DFT = WFT × volume solids ÷ 100."],
  ["Coatings", "Why do epoxy coatings 'chalk' outdoors?", "UV light breaks down the epoxy surface", ["They are too thick", "Rain dissolves them", "They lack primer"], "A UV-resistant polyurethane topcoat is often used."],
  ["Coatings", "For a two-pack coating, 'pot life' is", "the time the mixed paint remains usable", ["the shelf life in the tin", "the time before overcoating", "the full cure time"], "Never use material past its pot life."],
  ["Coatings", "Amine blush is a defect associated with", "epoxies cured in cold, humid conditions", ["zinc silicates in dry heat", "alkyds in sunshine", "galvanising"], "It leaves a greasy film that harms adhesion."],
  ["Defects", "Mud cracking is usually caused by", "applying the coating too thick", ["applying it too thin", "using the wrong colour", "cold steel only"], "Common with zinc-rich primers."],
  ["Defects", "Runs and sags are usually caused by", "applying too much paint in one coat", ["too little thinner always", "very low humidity", "using a brush instead of a roller"], "Control wet film thickness."],
  ["Inspection", "Which instrument checks for pinholes and holidays in a coating?", "Holiday detector (wet sponge or high-voltage spark)", ["Sling psychrometer", "Replica tape", "Surface thermometer"], "Low-voltage wet sponge suits thin films."],
  ["Inspection", "A Type 2 DFT gauge is", "electronic and reads continuously", ["a magnetic pull-off gauge", "a wet film comb", "a replica tape"], "Type 1 gauges use magnetic pull-off."],
  ["Inspection", "Which standard sets the frequency of DFT measurements on steel?", "SSPC-PA 2", ["ISO 8501-1", "ASTM D4541", "ISO 9712"], "It defines spot and area readings."],
  ["Inspection", "A pull-off adhesion test is described in", "ASTM D4541", ["SSPC-PA 2", "API 510", "ISO 2553"], "A dolly is glued on and pulled off."],
];

function dft(): Q[] {
  return repeat(10, () => {
    const vs = pick([50, 60, 65, 70, 75, 80]), wft = pick([150, 200, 250, 300, 350]);
    const askWft = ri(0, 1) === 1;
    if (askWft) {
      const target = pick([75, 100, 125, 150, 200]);
      const ans = r((target * 100) / vs, 0);
      return mcq("COR", "Calculations", `A coating has ${vs}% volume solids. What wet film thickness gives a dry film of ${target} µm (no thinner)?`, fmt(ans, "µm"),
        numOpts(ans, [r((target * vs) / 100, 0), target + vs, r(target * 2, 0)], "µm"), `WFT = DFT × 100 ÷ VS = ${target} × 100 ÷ ${vs} = ${fmt(ans)} µm.`, 2);
    }
    const ans = r((wft * vs) / 100, 0);
    return mcq("COR", "Calculations", `A coating with ${vs}% volume solids is applied at ${wft} µm wet. What dry film thickness should result (no thinner)?`, fmt(ans, "µm"),
      numOpts(ans, [r((wft * 100) / vs, 0), wft - vs, r(wft / 2, 0)], "µm"), `DFT = WFT × VS ÷ 100 = ${wft} × ${vs} ÷ 100 = ${fmt(ans)} µm.`, 2);
  });
}
function dewPoint(): Q[] {
  return repeat(8, () => {
    const dp = ri(14, 24), diff = pick([1, 2, 2.5, 3, 4, 5, 6]), steel = r(dp + diff, 1);
    const ok = diff >= 3;
    return mcq("COR", "Calculations", `The dew point is ${dp} °C and the steel surface is ${steel} °C. Can coating go ahead (using the 3 °C rule)?`, ok ? "Yes — the steel is at least 3 °C above the dew point" : "No — the steel is less than 3 °C above the dew point",
      [ok ? "No — the steel is less than 3 °C above the dew point" : "Yes — the steel is at least 3 °C above the dew point", "Only if relative humidity is 100%", "Dew point does not matter for coating"],
      `The margin is ${fmt(diff)} °C; at least 3 °C is required.`, 1);
  });
}

// ---------------------------------------------------------------------------
// ODP — drilling & production fundamentals
// ---------------------------------------------------------------------------
const ODP: F[] = [
  ["Drilling", "On a drilling rig, which machine raises and lowers the drill string?", "Drawworks", ["Mud pump", "Shale shaker", "Christmas tree"], "It winds the drilling line over the crown and travelling blocks."],
  ["Drilling", "What is the main job of drill collars?", "To put weight on the bit", ["To carry mud to the surface", "To seal the well", "To separate oil and gas"], "They are heavy, thick-walled pipes above the bit."],
  ["Drilling", "Which equipment removes rock cuttings from returning mud?", "Shale shaker", ["Drawworks", "Top drive", "BOP"], "Vibrating screens separate cuttings from mud."],
  ["Drilling", "A 'kick' is", "an unplanned influx of formation fluid into the wellbore", ["the first turn of the drill bit", "a type of casing", "a mud pump failure"], "If not controlled, a kick can become a blowout."],
  ["Drilling", "Which is a common warning sign of a kick?", "An increase in mud pit volume", ["A drop in pit volume while pumping normally", "Lower rotary speed", "Colder mud returns only"], "Flow with pumps off is another key sign."],
  ["Drilling", "Which casing string is set first and shallowest?", "Conductor casing", ["Production casing", "Intermediate casing", "Liner"], "Then surface, intermediate and production casing."],
  ["Drilling", "What is the main purpose of cementing casing?", "To bond the casing in place and isolate zones from each other", ["To lubricate the bit", "To refine crude", "To measure depth"], "Good cement prevents fluids migrating between formations."],
  ["Completion", "What is perforating?", "Shooting holes through casing and cement so reservoir fluids can enter the well", ["Drilling the first hole", "Removing cuttings", "Testing mud weight"], "Shaped charges are used."],
  ["Production", "Which artificial lift method uses an electric pump downhole?", "ESP (electric submersible pump)", ["Gas lift", "Sucker rod pump", "Natural flow"], "Gas lift injects gas to lighten the fluid column."],
  ["Production", "A three-phase separator separates", "oil, gas and water", ["oil, sand and steel", "gas, air and steam", "crude, petrol and diesel"], "Two-phase separators separate liquid and gas."],
  ["Production", "Which chemical is commonly used to remove water from natural gas?", "TEG (triethylene glycol)", ["Amine", "Methanol only", "Seawater"], "Amine units remove H₂S and CO₂ (sweetening)."],
  ["Production", "What is cavitation in a centrifugal pump?", "Vapour bubbles forming and collapsing because suction pressure is too low", ["Overheating of the motor only", "Sand blocking the impeller", "Normal operation"], "Ensure enough NPSH available."],
  ["Production", "Pigging a pipeline is done to", "clean it or inspect it internally", ["increase the oil price", "add water", "stop flow permanently"], "Intelligent pigs measure wall loss."],
  ["Reservoir", "Porosity is", "the fraction of rock volume that is pore space", ["how easily fluid flows through rock", "the depth of the reservoir", "the oil price"], "Permeability measures how easily fluid flows."],
  ["Reservoir", "An anticline is a type of", "structural trap", ["drilling bit", "refinery unit", "casing string"], "Oil and gas collect at the crest under a seal."],
  ["Reservoir", "Water injection in a field is mainly used to", "maintain reservoir pressure and push oil towards producing wells", ["clean the pipelines", "cool the rig", "make crude heavier"], "It is a common secondary recovery method."],
];

function hydrostatic(): Q[] {
  return repeat(10, () => {
    const mw = pick([9, 9.5, 10, 10.5, 11, 12, 13]), tvd = pick([5000, 6000, 8000, 10000, 12000]);
    const ans = Math.round(0.052 * mw * tvd);
    return mcq("ODP", "Calculations", `What is the hydrostatic pressure of ${mw} ppg mud at ${tvd.toLocaleString("en-US")} ft TVD? (P = 0.052 × MW × TVD)`, fmt(ans, "psi"),
      numOpts(ans, [Math.round(mw * tvd), Math.round(0.433 * tvd), Math.round(0.052 * tvd)], "psi"),
      `0.052 × ${mw} × ${tvd} = ${fmt(ans)} psi.`, 2);
  });
}
function killMud(): Q[] {
  return repeat(8, () => {
    const omw = pick([9.5, 10, 10.5, 11]), tvd = pick([8000, 10000, 12000]), sidpp = pick([260, 312, 416, 520, 624]);
    const ans = Math.ceil((omw + sidpp / (0.052 * tvd)) * 10 - 1e-9) / 10;
    return mcq("ODP", "Calculations", `Original mud weight ${omw} ppg, TVD ${tvd.toLocaleString("en-US")} ft, SIDPP ${sidpp} psi. What is the kill mud weight? (KMW = OMW + SIDPP ÷ (0.052 × TVD))`, fmt(ans, "ppg"),
      numOpts(ans, [r(omw + sidpp / tvd, 2), r(sidpp / (0.052 * tvd), 1), r(omw * 1.1, 1)], "ppg"),
      `${omw} + ${sidpp} ÷ (0.052 × ${tvd}) = ${fmt(r(omw + sidpp / (0.052 * tvd), 3))}, rounded up to ${fmt(ans)} ppg.`, 3);
  });
}

export function oilgas2(): Record<string, Q[]> {
  return {
    WIN: [...facts("WIN", WIN), ...heatInput(), ...throat(), ...carbonEq()],
    INS: [...facts("INS", INS), ...corrosionRate(), ...remainingLife(), ...shellThickness()],
    COR: [...facts("COR", COR), ...dft(), ...dewPoint()],
    ODP: [...facts("ODP", ODP), ...hydrostatic(), ...killMud()],
  };
}
