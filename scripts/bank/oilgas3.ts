// Second batch for the premium oil, gas & inspection exams: more established facts per subject,
// and new calculation types (generated from standard formulas, so answers are exact).
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;
const deg = (rad: number) => (rad * 180) / Math.PI;
const rad = (d: number) => (d * Math.PI) / 180;

// ============================================================================
// OGS — oil & gas HSE
// ============================================================================
const OGS: F[] = [
  ["Gas testing", "Before using a portable gas detector each day, you should", "bump test it", ["recharge it only", "remove the sensors", "turn off the alarms"], "A bump test confirms the sensors and alarms respond to gas."],
  ["Gas testing", "During hot work in a hazardous area, gas monitoring should be", "continuous", ["done once before starting only", "done at the end of the shift", "not needed if a permit exists"], "Conditions can change while work is under way."],
  ["H2S", "Which breathing apparatus is used to work in an H₂S atmosphere?", "Self-contained breathing apparatus (SCBA) or airline set", ["A dust mask", "A surgical mask", "A filter mask with any cartridge"], "Escape sets are for escape only, not for work."],
  ["H2S", "A windsock on a facility helps you", "choose an upwind escape route", ["measure gas concentration", "find the muster point lights", "test H₂S detectors"], "Always know the wind direction."],
  ["H2S", "Working with H₂S risk should use", "the buddy system", ["lone working", "no detectors if you can smell it", "a dust mask"], "Never enter alone; someone must be able to raise the alarm."],
  ["Hazardous areas", "In hazardous area classification, Zone 0 is where an explosive gas atmosphere is", "present continuously or for long periods", ["likely in normal operation", "unlikely and only short-lived", "never present"], "Zone 1: likely in normal operation. Zone 2: unlikely and short-lived."],
  ["Hazardous areas", "Zone 2 is an area where an explosive gas atmosphere is", "not likely in normal operation and, if it occurs, only briefly", ["present continuously", "likely in normal operation", "always present during drilling"], "Zone 2 has the lowest likelihood of the three gas zones."],
  ["Hazardous areas", "Equipment marked 'Ex' is", "designed and certified for use in explosive atmospheres", ["for export only", "experimental", "excluded from the site"], "Only use equipment rated for the zone and gas group."],
  ["Hazardous areas", "Why are tanks and tankers bonded and earthed during fuel transfer?", "To prevent static sparks igniting vapours", ["To speed up the flow", "To measure the volume", "To stop corrosion"], "Static builds up as liquids flow."],
  ["Lifting", "Who directs a crane operator during a lift?", "A trained banksman / signaller", ["Anyone nearby", "The client", "The cook"], "Only one person should give signals."],
  ["Lifting", "Tag lines are used to", "control the swing of a suspended load from a safe distance", ["lift the load", "measure the weight", "earth the crane"], "Never stand under a suspended load."],
  ["Lifting", "SWL or WLL on lifting equipment means", "the maximum load it is certified to lift", ["the weight of the equipment itself", "the minimum load", "the wind limit"], "Never exceed it."],
  ["Working at height", "Before using a full-body harness, you should", "inspect it for damage", ["wash it", "lengthen the lanyard", "remove the labels"], "Damaged harnesses must be taken out of use."],
  ["Working at height", "A fall restraint system", "stops you reaching the edge where you could fall", ["catches you after you fall", "is the same as a hard hat", "is only for scaffolders"], "Fall arrest systems stop a fall once it has started."],
  ["Excavation", "Before digging on site, you should", "check for buried services and get an excavation permit", ["start quickly before the rain", "use a pick near cables", "skip checks for shallow digs"], "Use drawings and a cable avoidance tool."],
  ["Pressure", "Before breaking a flanged joint, the line should be", "isolated, depressurised, drained and verified safe", ["left under pressure to test it", "heated first", "painted"], "Stored pressure can cause serious injury."],
  ["Management", "Management of Change (MOC) is used to", "assess the risks before changing equipment, processes or procedures", ["change staff salaries", "change shifts only", "update the canteen menu"], "Many major accidents followed unassessed changes."],
  ["Management", "SIMOPS means", "simultaneous operations that could affect each other", ["simple operations", "single-person operations", "site inspection operations"], "SIMOPS need extra planning and communication."],
  ["Management", "A short safety meeting before a job is called a", "toolbox talk", ["audit", "appraisal", "board meeting"], "It covers hazards, controls and roles."],
  ["Health", "In the UK, the upper exposure action value for noise is", "85 dB(A)", ["50 dB(A)", "70 dB(A)", "120 dB(A)"], "Above this, hearing protection must be worn."],
  ["Health", "Which hydrocarbon in crude oil and condensate is a known carcinogen?", "Benzene", ["Methane", "Butane", "Propane"], "Exposure must be controlled and monitored."],
  ["Health", "Naturally occurring radioactive material (NORM) can build up as", "scale and sludge in production equipment", ["paint on handrails", "dust in offices", "rust on vehicles"], "Handle and dispose of NORM under radiation rules."],
  ["Emergency", "The recommended rate of chest compressions in adult CPR is", "100–120 per minute", ["30–40 per minute", "60 per minute", "200 per minute"], "Push hard and fast in the centre of the chest."],
  ["Emergency", "POB stands for", "personnel on board", ["permit of business", "point of blowout", "pressure on bottom"], "POB counts confirm everyone is accounted for at muster."],
  ["Emergency", "A TEMPSC is a", "totally enclosed motor-propelled survival craft (lifeboat)", ["type of permit", "temperature sensor", "gas cylinder"], "Used to evacuate offshore installations."],
  ["Environment", "Which Nigerian agency responds to and monitors oil spills?", "NOSDRA", ["NAFDAC", "NCDMB", "FRSC"], "National Oil Spill Detection and Response Agency."],
  ["Fire", "For a gas-fed (Class C) fire, the first priority is usually to", "isolate the gas supply", ["spray water on it immediately", "use a wet chemical extinguisher", "cover it with a blanket"], "Extinguishing without isolating can leave an explosive gas cloud."],
  ["Fire", "Which extinguisher is suitable for fires involving live electrical equipment?", "CO₂", ["Water", "Foam (unless rated)", "Wet chemical"], "CO₂ does not conduct electricity."],
  ["Culture", "Heinrich's / Bird's accident triangle suggests that", "many near misses come before each serious accident", ["serious accidents are random", "near misses are not worth reporting", "only serious accidents matter"], "Reporting near misses helps prevent serious harm."],
  ["Isolation", "After applying locks under LOTO, you should", "verify zero energy (try to start it) before work", ["start work immediately", "remove the tags", "give your key to a colleague"], "Isolation is only proven once tested."],
];

// ============================================================================
// ONG — industry knowledge
// ============================================================================
const ONG: F[] = [
  ["Nigeria", "Which crude oil grade is associated with ExxonMobil's terminal in Akwa Ibom?", "Qua Iboe", ["Bonny Light", "Forcados", "Brass River"], "Bonny Light and Forcados are associated with Shell."],
  ["Nigeria", "Nigeria's oil and gas are found mainly in which sedimentary basin?", "Niger Delta Basin", ["Chad Basin", "Sokoto Basin", "Benue Trough only"], "Frontier basins like Chad and Benue are less explored."],
  ["Nigeria", "Which is a deepwater field operated by Shell off Nigeria?", "Bonga", ["Agbami", "Egina", "Erha"], "Agbami is Chevron, Egina is TotalEnergies, Erha is ExxonMobil."],
  ["Nigeria", "Egina is a deepwater field operated by", "TotalEnergies", ["Shell", "Chevron", "Seplat"], "It produces through one of the largest FPSOs in the world."],
  ["Nigeria", "Agbami field is operated by", "Chevron", ["Shell", "TotalEnergies", "ExxonMobil"], "It lies in deep water offshore Nigeria."],
  ["Nigeria", "Which contract type is common for Nigerian deepwater blocks?", "Production sharing contract (PSC)", ["Joint venture only", "Marginal field licence", "Service-only contract"], "Onshore and shallow-water assets are often NNPC joint ventures."],
  ["Nigeria", "Under the PIA, which licence allows a company to produce petroleum?", "Petroleum Mining Lease (PML)", ["Petroleum Exploration Licence (PEL)", "Petroleum Prospecting Licence (PPL)", "Marketing licence"], "The PML replaced the old Oil Mining Lease (OML)."],
  ["Nigeria", "Under the PIA, the old Oil Prospecting Licence (OPL) is replaced by the", "Petroleum Prospecting Licence (PPL)", ["Petroleum Mining Lease", "Petroleum Exploration Licence", "Gas Flare Permit"], "PPLs allow exploration drilling."],
  ["Nigeria", "Nigeria has the largest proven reserves of which resource in Africa?", "Natural gas", ["Coal", "Uranium", "Copper"], "Gas is central to the 'Decade of Gas' programme."],
  ["Nigeria", "The AKK pipeline links", "Ajaokuta, Kaduna and Kano", ["Abuja, Kano and Katsina", "Akure, Kogi and Kwara", "Aba, Kaduna and Kebbi"], "It carries gas to the north."],
  ["Nigeria", "The West African Gas Pipeline supplies gas from Nigeria to", "Benin, Togo and Ghana", ["Chad and Niger", "Cameroon and Gabon", "Senegal and Mali"], "It runs offshore along the coast."],
  ["Nigeria", "Which cities host NNPC's four government-owned refineries?", "Port Harcourt (two), Warri and Kaduna", ["Lagos, Abuja, Kano and Enugu", "Bonny, Brass, Escravos and Forcados", "Calabar, Uyo, Aba and Owerri"], "Port Harcourt has two refineries."],
  ["Nigeria", "In May 2023, the Federal Government announced the removal of", "the petrol (PMS) subsidy", ["all oil exports", "the PIA", "NNPC"], "It was announced in the inaugural speech on 29 May 2023."],
  ["Products", "In Nigeria, PMS refers to", "petrol (premium motor spirit)", ["diesel", "kerosene", "jet fuel"], "AGO is diesel; DPK is kerosene; ATK is aviation fuel."],
  ["Products", "AGO is", "diesel (automotive gas oil)", ["petrol", "kerosene", "cooking gas"], "Used in trucks, generators and industry."],
  ["Products", "LPG used for cooking is mainly", "propane and butane", ["methane only", "ethane", "hydrogen"], "CNG is mostly methane."],
  ["Projects", "FID in oil and gas projects stands for", "final investment decision", ["field inspection date", "first injection day", "fluid identification"], "After FID, the project moves to execution."],
  ["Projects", "EPC stands for", "engineering, procurement and construction", ["exploration, production and completion", "equipment, pipes and cables", "environment, people and community"], "EPC contractors deliver facilities."],
  ["Projects", "FEED stands for", "front-end engineering design", ["final engineering delivery", "field equipment and electrical design", "fuel export and distribution"], "FEED defines the project before FID."],
  ["Environment", "The Nigerian Gas Flare Commercialisation Programme aims to", "capture flared gas and sell it instead of burning it", ["increase gas flaring", "stop all oil production", "export crude only"], "Flare sites are offered to investors."],
  ["Industry basics", "Crude oil production is usually quoted in", "barrels per day (bpd)", ["litres per year", "tonnes per minute", "gallons per hour"], "Gas is often quoted in standard cubic feet per day."],
  ["Industry basics", "OPEC's headquarters is in", "Vienna", ["Riyadh", "Abuja", "Geneva"], "Nigeria has been a member since 1971."],
];

function apiGravity(): Q[] {
  return repeat(10, () => {
    const sg = pick([0.8, 0.82, 0.85, 0.87, 0.9, 0.93, 0.96]);
    const ans = r(141.5 / sg - 131.5, 1);
    return mcq("ONG", "Calculations", `A crude oil has a specific gravity of ${sg} at 60 °F. What is its API gravity? (API = 141.5 ÷ SG − 131.5)`, fmt(ans, "°API"),
      numOpts(ans, [r(131.5 / sg - 141.5, 1), r(141.5 * sg - 131.5, 1), r(141.5 / sg, 1)], "°API", true),
      `141.5 ÷ ${sg} − 131.5 = ${fmt(ans)} °API. ${ans > 31.1 ? "That is a light crude." : ans >= 22.3 ? "That is a medium crude." : "That is a heavy crude."}`, 2);
  });
}
function barrels(): Q[] {
  return repeat(8, () => {
    const b = pick([100, 250, 500, 1000, 2000]);
    const ans = b * 159;
    return mcq("ONG", "Calculations", `About how many litres are in ${b.toLocaleString("en-US")} barrels of crude? (1 barrel ≈ 159 litres)`, fmt(ans, "litres"),
      numOpts(ans, [b * 42, b * 100, b * 200], "litres"), `${b} × 159 = ${ans.toLocaleString("en-US")} litres.`, 1);
  });
}

// ============================================================================
// ODP — drilling & production
// ============================================================================
const ODP: F[] = [
  ["Rigs", "Which rig type stands on legs resting on the seabed in shallow water?", "Jack-up", ["Drillship", "Semi-submersible", "Land rig"], "Jack-ups are limited by water depth."],
  ["Rigs", "Which rig type is best suited to ultra-deep water?", "Drillship", ["Jack-up", "Swamp barge", "Land rig"], "Drillships and semi-submersibles use dynamic positioning or moorings."],
  ["Rigs", "Which rig type is commonly used in the Niger Delta swamps?", "Swamp barge", ["Jack-up", "Drillship", "Tension-leg platform"], "The barge is sunk onto the swamp bottom."],
  ["Drilling", "A PDC bit cuts rock using", "polycrystalline diamond compact cutters that shear the rock", ["rolling cones with teeth", "explosives", "water jets only"], "Roller-cone (tricone) bits crush and chip rock."],
  ["Drilling", "Mud weight is measured with a", "mud balance", ["Marsh funnel", "Pressure gauge", "Hydrometer only"], "A Marsh funnel gives a quick viscosity reading."],
  ["Drilling", "Lost circulation means", "drilling mud is flowing into the formation instead of returning", ["the drill string is stuck", "the mud pumps have failed", "gas is flowing into the well"], "It can reduce hydrostatic pressure and lead to a kick."],
  ["Drilling", "Differential sticking happens when", "the drill string is pressed against a permeable formation by overbalance", ["the bit wears out", "the rig loses power", "the mud is too thin to carry cuttings"], "Keep the string moving and control overbalance."],
  ["Drilling", "MWD and LWD tools send measurements", "from downhole while drilling", ["only after the well is finished", "from the shale shaker", "from the refinery"], "Measurement-while-drilling and logging-while-drilling."],
  ["Drilling", "Which mud type is generally best for drilling reactive shales?", "Oil-based (or synthetic-based) mud", ["Fresh water only", "Air", "Seawater only"], "Water-based muds can make shales swell."],
  ["Logging", "A gamma-ray log is mainly used to identify", "shale (high radioactivity) versus clean sand", ["oil price", "mud weight", "temperature"], "Shales usually read high on gamma ray."],
  ["Logging", "High resistivity in a porous zone often indicates", "hydrocarbons rather than salty water", ["more shale", "a stuck pipe", "lost circulation"], "Salt water conducts electricity well."],
  ["Completion", "A packer is used to", "seal the space between the tubing and casing", ["drill faster", "measure mud weight", "separate oil from water at surface"], "It isolates zones and protects the casing."],
  ["Completion", "An SSSV (subsurface safety valve) is installed to", "shut in the well automatically in an emergency", ["increase production", "inject chemicals", "measure gas flow"], "It is a key barrier below the surface."],
  ["Interventions", "Which intervention uses a continuous reel of steel pipe?", "Coiled tubing", ["Slickline", "Wireline logging only", "Casing running"], "Used for cleanouts, stimulation and logging."],
  ["Interventions", "A workover is", "major maintenance or remedial work on an existing well", ["drilling a new exploration well", "a pipeline survey", "a safety drill"], "It may involve pulling the tubing."],
  ["Production", "Gas hydrates in pipelines are commonly prevented by injecting", "methanol or MEG", ["seawater", "crude oil", "nitrogen only"], "Hydrates are ice-like solids that block flow."],
  ["Production", "Wax deposition in pipelines is mainly caused by", "the oil cooling below its wax appearance temperature", ["too much gas", "high pressure only", "H₂S"], "Insulation, heating and pigging control wax."],
  ["Production", "Which unit removes salt from crude oil before refining or export?", "Desalter", ["Separator", "Glycol contactor", "Flare"], "Salt causes corrosion and fouling downstream."],
  ["Production", "Custody transfer metering is used to", "measure oil or gas accurately when ownership changes", ["measure mud weight", "count personnel", "test alarms"], "Accuracy matters because it determines payment."],
  ["Production", "Hydrocyclones on a production platform are used to", "remove oil from produced water", ["compress gas", "drill wells", "store crude"], "Produced water must meet discharge limits."],
  ["Pressure", "The pressure gradient of fresh water is about", "0.433 psi/ft", ["0.052 psi/ft", "1 psi/ft", "0.1 psi/ft"], "Seawater is about 0.445 psi/ft."],
];

function gradient(): Q[] {
  return repeat(8, () => {
    const mw = pick([8.6, 9, 9.6, 10, 10.8, 11.5, 12.5]);
    const ans = r(0.052 * mw, 3);
    return mcq("ODP", "Calculations", `What is the pressure gradient of ${mw} ppg mud? (gradient = 0.052 × MW)`, fmt(ans, "psi/ft"),
      numOpts(ans, [r(mw / 0.052, 1), r(0.433 * mw, 3), r(0.052 + mw / 100, 3)], "psi/ft"), `0.052 × ${mw} = ${fmt(ans)} psi/ft.`, 1);
  });
}
function equivalentMw(): Q[] {
  return repeat(8, () => {
    const tvd = pick([6000, 8000, 10000]), p = pick([3900, 4680, 5200, 5720, 6240]);
    const ans = r(p / (0.052 * tvd), 1);
    return mcq("ODP", "Calculations", `Formation pressure is ${p.toLocaleString("en-US")} psi at ${tvd.toLocaleString("en-US")} ft TVD. What mud weight would exactly balance it? (MW = P ÷ (0.052 × TVD))`, fmt(ans, "ppg"),
      numOpts(ans, [r(p / tvd, 2), r((p * 0.052) / tvd, 3), r(ans + 1, 1)], "ppg"), `${p} ÷ (0.052 × ${tvd}) = ${fmt(ans)} ppg.`, 2);
  });
}
function formationPressure(): Q[] {
  return repeat(8, () => {
    const mw = pick([9.5, 10, 10.5]), tvd = pick([8000, 9000, 10000]), sidpp = pick([200, 350, 400, 500]);
    const hyd = Math.round(0.052 * mw * tvd), ans = hyd + sidpp;
    return mcq("ODP", "Calculations", `After a kick, SIDPP is ${sidpp} psi. Mud weight is ${mw} ppg and TVD is ${tvd.toLocaleString("en-US")} ft. What is the formation pressure? (FP = SIDPP + 0.052 × MW × TVD)`, fmt(ans, "psi"),
      numOpts(ans, [hyd, hyd - sidpp, Math.round(mw * tvd) + sidpp], "psi"), `Hydrostatic = 0.052 × ${mw} × ${tvd} = ${hyd} psi; FP = ${hyd} + ${sidpp} = ${ans} psi.`, 3);
  });
}
function capacity(): Q[] {
  return repeat(8, () => {
    const id = pick([3, 4, 4.276, 5, 6.184, 8.535]);
    const ans = r((id * id) / 1029.4, 4);
    return mcq("ODP", "Calculations", `What is the capacity of a pipe with an inside diameter of ${id} in? (bbl/ft = ID² ÷ 1029.4)`, fmt(ans, "bbl/ft"),
      numOpts(ans, [r(id / 1029.4, 4), r((id * id) / 314, 4), r((2 * id) / 1029.4, 4)], "bbl/ft"), `${id}² ÷ 1029.4 = ${fmt(ans)} bbl/ft.`, 3);
  });
}
function strokes(): Q[] {
  return repeat(6, () => {
    const vol = pick([60, 80, 100, 120, 150]), out = pick([0.1, 0.12, 0.15, 0.2]);
    const ans = Math.round(vol / out);
    return mcq("ODP", "Calculations", `The drill string holds ${vol} bbl and the pump output is ${out} bbl/stroke. How many strokes to pump from surface to bit?`, fmt(ans, "strokes"),
      numOpts(ans, [Math.round(vol * out), Math.round(vol / (out * 2)), ans + 100], "strokes"), `${vol} ÷ ${out} = ${ans} strokes.`, 2);
  });
}

// ============================================================================
// NDG — NDT general
// ============================================================================
const NDG: F[] = [
  ["Methods", "Which NDT method uses a pressure difference or tracer gas to find through-wall leaks?", "Leak testing (LT)", ["Visual testing", "Magnetic particle testing", "Penetrant testing"], "Bubble and helium leak tests are examples."],
  ["Methods", "Acoustic emission testing (AE) detects", "sound released by growing cracks under load", ["X-rays passing through a part", "surface cracks using dye", "magnetic flux leakage"], "AE monitors whole structures during pressure tests."],
  ["Methods", "Infrared thermography detects defects using", "differences in surface temperature", ["sound waves", "radiation film", "iron particles"], "Used for electrical hot spots and insulation problems."],
  ["Methods", "A borescope is used in visual testing to", "see inside areas that cannot be viewed directly", ["measure thickness", "magnetise parts", "detect radiation"], "Remote visual inspection extends VT."],
  ["Methods", "A lamination in steel plate is best found with", "straight-beam (0°) ultrasonic testing", ["radiography", "penetrant testing on the face", "visual testing only"], "Laminations lie parallel to the surface, so RT barely sees them."],
  ["Methods", "Which methods suit surface cracks in austenitic stainless steel?", "Penetrant or eddy current testing", ["Magnetic particle testing", "Magnetic flux leakage", "Gamma radiography only"], "Austenitic stainless steel is non-magnetic."],
  ["Defects", "Shrinkage and cold shuts are typical defects in", "castings", ["rolled plate", "forgings", "welds only"], "Laminations are typical of rolled plate."],
  ["Defects", "Laps and bursts are typical defects in", "forgings", ["castings", "welds", "paint"], "They form during working of the metal."],
  ["Defects", "Fatigue cracks usually start at", "stress concentrations such as weld toes and notches", ["the centre of thick plates", "painted surfaces only", "random locations"], "Cyclic loading drives fatigue."],
  ["Defects", "Lack of sidewall fusion is", "failure of weld metal to fuse with the joint preparation face", ["gas trapped in the weld", "excess weld metal on the cap", "a scratch on the plate"], "It is a planar defect."],
  ["Defects", "Excess penetration is", "too much weld metal protruding through the root", ["an unfilled groove at the toe", "a gas pore", "a crater crack"], "Burn-through is a hole caused by excessive penetration."],
  ["Defects", "Misalignment of the two parts at a butt joint is called", "hi-lo (linear misalignment)", ["undercut", "porosity", "spatter"], "Measured with a hi-lo gauge."],
  ["Defects", "A star-shaped crack at the end of a weld run is a", "crater crack", ["lamination", "lap", "cold shut"], "Fill the crater to prevent it."],
  ["Standards", "ISO 5817 quality level B is", "the most stringent level", ["the least stringent level", "for visual testing only", "for castings"], "Levels are B, C and D."],
  ["Standards", "ISO 17636 covers", "radiographic testing of welds", ["ultrasonic testing of welds", "penetrant testing", "welder qualification"], "ISO 17640 covers ultrasonic testing of welds."],
  ["Standards", "ISO 3452 covers", "penetrant testing", ["magnetic particle testing", "radiography", "eddy current testing"], "Part 1 sets out the general principles."],
  ["Certification", "Under ISO 9712, who may write NDT instructions based on a procedure?", "Level 2", ["Level 1", "Trainees", "Nobody — only Level 3"], "Level 3 writes and approves procedures."],
  ["Terms", "A non-relevant indication is", "a true indication caused by part geometry, not a discontinuity of concern", ["a false indication from poor cleaning", "a crack that must be rejected", "an indication found by RT only"], "For example, a change in section or a keyway."],
  ["Terms", "Probability of detection (POD) describes", "how reliably a method finds defects of a given size", ["the cost of inspection", "the speed of testing", "the radiation dose"], "Smaller defects have lower POD."],
];

// ============================================================================
// NPT — penetrant
// ============================================================================
const NPT: F[] = [
  ["Process", "Under ASME Section V, the minimum development time is", "10 minutes", ["30 seconds", "2 minutes", "2 hours"], "Interpret between 10 and 60 minutes after applying developer."],
  ["Process", "For visible (colour contrast) penetrant, white light at the inspection surface should be at least", "1000 lux (100 foot-candles)", ["50 lux", "200 lux", "5 lux"], "Good lighting is essential to see red indications."],
  ["Process", "Why must penetrant residue be removed after inspection?", "Residues can cause corrosion or interfere with later processes", ["To make the part shine", "It is optional", "To remove the developer colour only"], "Post-cleaning is the final step."],
  ["Process", "Machining or shot peening may close surface cracks. What may be needed before PT?", "Etching to reopen them", ["Painting", "Magnetising", "Heating to red hot"], "Smeared metal blocks penetrant entry."],
  ["Process", "If a part must be re-inspected, it should be", "fully cleaned and processed again from the start", ["just given more developer", "wiped and inspected again", "magnetised"], "Old penetrant in defects can give unreliable results."],
  ["Materials", "For stainless steels and nickel alloys, penetrant materials are often controlled for", "halogen and sulphur content", ["colour only", "price", "smell"], "These contaminants can cause cracking or corrosion."],
  ["Materials", "A lipophilic emulsifier is", "oil-based and applied after the penetrant dwell", ["water-based remover", "a developer", "a cleaner used before penetrant"], "Hydrophilic removers are water-based."],
  ["Materials", "With post-emulsifiable penetrants, which time is most critical to control?", "Emulsification time", ["Drying time of the cleaner", "Shelf life of the developer", "Time to read the procedure"], "Too long and penetrant is removed from defects."],
  ["Materials", "Fluorescent penetrant sensitivity levels run from ½ (lowest) to", "4 (ultra-high)", ["10", "2", "100"], "Higher levels find finer cracks."],
  ["Materials", "Which developer form is commonly used with visible penetrant in field aerosol kits?", "Non-aqueous wet developer", ["Dry powder only", "Water-soluble only", "No developer"], "It dries to a thin white coating."],
  ["Interpretation", "Penetrant indications are classified as", "relevant, non-relevant or false", ["hot, warm or cold", "open, closed or hidden", "major, minor or none"], "Only relevant indications are assessed against acceptance criteria."],
  ["Interpretation", "A continuous line of penetrant bleed-out usually suggests", "a crack", ["porosity", "a scratch-free surface", "too much developer"], "Rounded spots suggest porosity."],
  ["Safety", "Aerosol penetrant kits are", "flammable and should be used with ventilation and away from ignition sources", ["completely harmless", "radioactive", "explosive only when cold"], "Read the safety data sheet."],
  ["Principles", "Which property of a good penetrant matters most for entering fine cracks?", "Low surface tension and good wetting", ["High viscosity", "Dark smell", "Magnetic properties"], "It must spread and seep into openings."],
];

// ============================================================================
// NMT — magnetic particle
// ============================================================================
const NMT: F[] = [
  ["Properties", "Permeability describes", "how easily a material can be magnetised", ["how long it stays magnetised", "its electrical resistance", "its hardness"], "Retentivity describes how much magnetism it keeps."],
  ["Properties", "Retentivity is", "a material's ability to keep magnetism after the field is removed", ["how easily it is magnetised", "the force needed to demagnetise it", "its melting point"], "High-retentivity parts may need demagnetising."],
  ["Properties", "Coercive force is", "the reverse field needed to remove residual magnetism", ["the field needed to start magnetising", "the weight a yoke can lift", "the speed of particles"], "Shown on the hysteresis loop."],
  ["Properties", "Reluctance is", "opposition to magnetic flux", ["resistance to electric current", "attraction of particles", "light intensity"], "It is the magnetic equivalent of electrical resistance."],
  ["Technique", "Under ASME Section V, prod spacing should be", "75 mm to 200 mm (3 in to 8 in)", ["10 mm to 20 mm", "500 mm to 1 m", "any distance"], "Too close or too far gives a poor field."],
  ["Technique", "When using black magnetic ink, a thin white contrast paint is applied to", "improve visibility of indications", ["magnetise the part", "remove particles", "protect from radiation"], "Contrast helps the eye pick out fine lines."],
  ["Technique", "Dry powder is often preferred for", "rough surfaces, hot parts and subsurface defects with DC", ["very fine surface cracks on smooth parts", "underwater work", "non-ferrous metals"], "Wet fluorescent is most sensitive for fine surface cracks."],
  ["Technique", "The particle concentration in a wet bath is checked with", "a settling test in a centrifuge tube", ["a densitometer", "a pie gauge", "a thermometer"], "The settled volume is read after standing."],
  ["Technique", "For a fluorescent wet bath, the typical settled volume is", "0.1–0.4 mL per 100 mL", ["1.2–2.4 mL per 100 mL", "10–20 mL per 100 mL", "0 mL"], "Visible (colour) baths settle at 1.2–2.4 mL per 100 mL."],
  ["Technique", "Quantitative quality indicators (QQIs) are used to", "verify field strength and direction on the part", ["measure thickness", "check UV intensity", "count defects"], "They are small shims with artificial flaws."],
  ["Interpretation", "Which is a non-relevant MT indication?", "Magnetic writing from contact with another magnetised part", ["A fatigue crack", "A grinding crack", "A lack-of-fusion breaking the surface"], "Changes in section and HAZ boundaries can also give non-relevant indications."],
  ["Interpretation", "A crack running parallel to the magnetic field will", "likely be missed", ["give the strongest indication", "always be detected", "glow red"], "That is why two directions are tested."],
  ["Demagnetising", "A common way to demagnetise a part is", "an AC field gradually reduced to zero", ["heating it slightly", "painting it", "washing it in water"], "Or heating above the Curie point, where practical."],
  ["Safety", "UV-A lamps used for fluorescent MT should", "have intact filters to block harmful UV", ["be used without filters for brightness", "be pointed at the eyes", "only be used outdoors"], "Damaged filters let through harmful short-wave UV."],
];

// ============================================================================
// NUT — ultrasonic
// ============================================================================
const NUT: F[] = [
  ["Equipment", "Ultrasonic transducers generate sound using", "piezoelectric crystals", ["magnets", "radioactive sources", "light bulbs"], "The crystal converts electrical pulses into vibration and back."],
  ["Equipment", "Heavy damping (backing) in a probe gives", "short pulses and better resolution", ["longer pulses and more penetration", "no sound", "higher frequency"], "Short pulses separate close reflectors."],
  ["Equipment", "Dual-element probes are mainly used for", "thickness gauging and near-surface defects", ["deep coarse-grained welds only", "radiography", "magnetising"], "Separate transmit and receive crystals reduce the dead zone."],
  ["Principles", "Acoustic impedance is", "density × sound velocity", ["frequency × wavelength", "voltage × current", "thickness ÷ time"], "Large impedance differences cause strong reflections."],
  ["Principles", "Why does nearly all sound reflect at a steel–air boundary?", "Their acoustic impedances are very different", ["Air absorbs no sound", "Steel is magnetic", "Sound cannot travel in steel"], "That is why couplant is needed."],
  ["Principles", "Beam spread increases when", "frequency is lower or the probe is smaller", ["frequency is higher", "the probe is larger", "more couplant is used"], "Higher frequency and larger probes give a tighter beam."],
  ["Principles", "Attenuation in ultrasonic testing is caused mainly by", "scattering and absorption", ["reflection from the probe face only", "magnetism", "radiation"], "Coarse grains, such as in austenitic welds, scatter sound."],
  ["Principles", "Increasing gain by 6 dB", "doubles the signal amplitude", ["halves the amplitude", "multiplies it by 6", "has no effect"], "+20 dB is ten times the amplitude."],
  ["Principles", "The first critical angle is the incident angle at which", "the refracted longitudinal wave reaches 90°", ["the shear wave reaches 90°", "no sound enters the part", "the beam is perpendicular"], "Beyond it, only shear waves enter the steel."],
  ["Technique", "In angle-beam weld testing, the 'skip distance' is", "the surface distance for the beam to bounce off the back wall and return to the surface", ["the probe width", "the near field length", "the weld cap width"], "Scanning zones are planned in half and full skips."],
  ["Technique", "Before angle-beam weld scanning, the parent metal is often checked with a 0° probe to", "find laminations that could block the angle beam", ["calibrate the time base", "measure hardness", "check the coating"], "Laminations reflect the beam and can hide weld defects."],
  ["Technique", "TOFD is especially good at", "accurately sizing the height of defects", ["finding surface-only defects", "measuring coating thickness", "detecting radiation"], "It uses signals diffracted from defect tips."],
  ["Technique", "Time-corrected gain (TCG) and DAC both", "compensate for loss of amplitude with distance", ["remove the near field", "magnetise the part", "replace calibration"], "TCG adjusts gain electronically instead of drawing a curve."],
  ["Technique", "'Grass' on a UT screen is", "background noise, often from grain scatter", ["a back-wall echo", "a large crack", "the initial pulse"], "Lower frequency can reduce grass in coarse materials."],
];

function wavelength(): Q[] {
  return repeat(8, () => {
    const [mode, v] = pick([["longitudinal", 5920], ["shear", 3240]] as [string, number][]), f = pick([1, 2, 2.25, 4, 5, 10]);
    const ans = r(v / (f * 1000), 2);
    return mcq("NUT", "Calculations", `What is the wavelength of a ${f} MHz ${mode} wave in steel (velocity ${v.toLocaleString("en-US")} m/s)? (λ = v ÷ f)`, fmt(ans, "mm"),
      numOpts(ans, [r((v * f) / 1000, 2), r(v / (f * 100), 2), r(ans * 2, 2)], "mm"), `λ = ${v} m/s ÷ ${f} MHz = ${fmt(ans)} mm.`, 2);
  });
}
function nearField(): Q[] {
  return repeat(8, () => {
    const D = pick([6, 10, 12.7, 20, 25]), f = pick([2, 4, 5]), v = 5920;
    const ans = r((D * D * f * 1000) / (4 * v), 1);
    return mcq("NUT", "Calculations", `Estimate the near field length of a ${D} mm diameter, ${f} MHz probe in steel (longitudinal, 5,920 m/s). (N = D²f ÷ 4v)`, fmt(ans, "mm"),
      numOpts(ans, [r((D * f * 1000) / (4 * v), 1), r((D * D * f * 1000) / v, 1), r(ans / 2, 1)], "mm"), `N = ${D}² × ${f} MHz ÷ (4 × 5.92 mm/µs) = ${fmt(ans)} mm.`, 3);
  });
}
function snell(): Q[] {
  return repeat(8, () => {
    const inc = pick([30, 35, 37, 40, 45, 50]);
    const s = (3240 / 2730) * Math.sin(rad(inc));
    if (s >= 1) return null;
    const ans = Math.round(deg(Math.asin(s)));
    return mcq("NUT", "Calculations", `A Perspex wedge (2,730 m/s) has an incident angle of ${inc}°. What is the refracted shear-wave angle in steel (3,240 m/s)? (sin θ₂ = sin θ₁ × V₂ ÷ V₁)`, `${ans}°`,
      numOpts(ans, [Math.round(deg(Math.asin(Math.min(0.99, (2730 / 3240) * Math.sin(rad(inc)))))), inc, Math.min(89, ans + 10)], "°").map((x) => x.replace(" °", "°")),
      `sin θ₂ = sin ${inc}° × 3240 ÷ 2730 = ${r(s, 3)}, so θ₂ ≈ ${ans}°.`, 3);
  });
}
function decibels(): Q[] {
  return repeat(6, () => {
    const ratio = pick([2, 4, 8, 10, 0.5, 0.25]);
    const ans = Math.round(20 * Math.log10(ratio));
    return mcq("NUT", "Calculations", `One echo is ${ratio} times the amplitude of another. What is the difference in dB? (dB = 20 log₁₀ ratio)`, fmt(ans, "dB"),
      numOpts(ans, [Math.round(10 * Math.log10(ratio)), ratio * 6 === ans ? ans + 6 : ratio * 6, -ans], "dB", true), `20 × log₁₀(${ratio}) = ${fmt(ans)} dB.`, 2);
  });
}

// ============================================================================
// NRT — radiography
// ============================================================================
const NRT: F[] = [
  ["Image", "Lead intensifying screens in a film cassette", "shorten exposure time and reduce scatter", ["make the film waterproof", "measure dose", "replace the IQI"], "Front and back screens are both used."],
  ["Image", "Film density is measured with a", "densitometer", ["dosimeter", "survey meter", "micrometer"], "Density = log₁₀(incident light ÷ transmitted light)."],
  ["Image", "A lead letter 'B' on the back of the cassette is used to", "detect backscatter", ["mark the film batch", "identify the welder", "show the beam direction"], "If a light 'B' appears, backscatter is too high."],
  ["Image", "Increasing X-ray tube voltage (kV) generally", "increases penetration but reduces contrast", ["reduces penetration", "increases contrast", "has no effect"], "Use the lowest kV that gives adequate density."],
  ["Image", "Wire-type IQIs are usually placed on the", "source side of the object", ["film side always", "operator's badge", "control panel"], "Film-side placement is allowed when the source side is not accessible."],
  ["Image", "Computed radiography (CR) uses", "reusable phosphor imaging plates", ["film developed in chemicals", "magnetic particles", "sound waves"], "Digital radiography (DR) uses flat-panel detectors."],
  ["Equipment", "In gamma radiography, the source is moved from its container to the exposure point through a", "guide tube", ["shale shaker", "pipe rack", "cable tray"], "A crank or control cable winds it out and back."],
  ["Equipment", "Collimators are used to", "limit the beam to the area of interest, reducing scatter and dose", ["develop film", "measure density", "magnetise the part"], "They also shrink the controlled area."],
  ["Equipment", "A key difference between gamma and X-ray sources is that a gamma source", "cannot be switched off", ["needs mains power", "only works on aluminium", "never needs shielding"], "Gamma sources are always emitting radiation."],
  ["Safety", "If a gamma source fails to retract into its container, the radiographer should", "keep people out of the area and follow the emergency procedure", ["pick it up by hand", "leave the site without reporting", "carry on working"], "Never handle the source directly."],
  ["Safety", "Workers who may receive higher radiation doses are usually designated", "classified workers with dose records and medical surveillance", ["visitors", "trainees with no monitoring", "contractors exempt from rules"], "Dose records must be kept."],
  ["Safety", "The international radiation warning sign is the", "trefoil", ["skull and crossbones", "exclamation mark", "flame"], "Used on barriers, containers and labels."],
  ["Film", "Pressure marks and static marks on film are examples of", "artefacts", ["weld defects", "IQI wires", "location markers"], "Careful handling prevents them."],
  ["Film", "Location markers on a radiograph are used to", "relate indications on the film to positions on the weld", ["measure dose", "increase contrast", "reduce exposure time"], "Without them, defects cannot be found for repair."],
];

function hvl(): Q[] {
  return repeat(8, () => {
    const h = pick([4, 5, 6, 12, 20]), n = pick([1, 2, 3, 4]), i0 = pick([80, 160, 320, 640]);
    const ans = r(i0 / 2 ** n, 2);
    return mcq("NRT", "Calculations", `The half-value layer of a shield is ${h} mm. The dose rate without shielding is ${i0} µSv/h. What is it behind ${h * n} mm of shielding?`, fmt(ans, "µSv/h"),
      numOpts(ans, [r(i0 / (2 * n), 2), r(i0 / n ** 2, 2), r(i0 - h * n, 2)], "µSv/h"), `${h * n} mm is ${n} half-value layer${n > 1 ? "s" : ""}: ${i0} ÷ 2${n > 1 ? `^${n}` : ""} = ${fmt(ans)} µSv/h.`, 2);
  });
}
function exposureTime(): Q[] {
  return repeat(8, () => {
    const t1 = pick([2, 4, 5, 6, 8]), d1 = pick([500, 600, 700]), d2 = pick([700, 800, 1000, 1200]);
    if (d2 <= d1) return null;
    const ans = r(t1 * (d2 / d1) ** 2, 2);
    return mcq("NRT", "Calculations", `An exposure takes ${t1} minutes at ${d1} mm source-to-film distance. What time is needed at ${d2} mm for the same density? (t₂ = t₁ × (d₂ ÷ d₁)²)`, fmt(ans, "min"),
      numOpts(ans, [r((t1 * d2) / d1, 2), r(t1 * (d1 / d2) ** 2, 2), r(t1 * 2, 2)], "min"), `${t1} × (${d2} ÷ ${d1})² = ${fmt(ans)} minutes.`, 2);
  });
}
function safeDistance(): Q[] {
  return repeat(8, () => {
    const i1 = pick([400, 900, 1600, 2500]), d1 = pick([1, 2]), i2 = pick([1, 4, 25]);
    const ans = r(d1 * Math.sqrt(i1 / i2), 1);
    return mcq("NRT", "Calculations", `The dose rate is ${i1} µSv/h at ${d1} m from a source. At what distance does it fall to ${i2} µSv/h? (d₂ = d₁ × √(I₁ ÷ I₂))`, fmt(ans, "m"),
      numOpts(ans, [r((d1 * i1) / i2, 1), r(d1 * Math.sqrt(i2 / i1), 2), r(ans / 2, 1)], "m"), `${d1} × √(${i1} ÷ ${i2}) = ${fmt(ans)} m.`, 3);
  });
}

// ============================================================================
// WIN — welding inspection
// ============================================================================
const WIN: F[] = [
  ["Positions", "Under ISO 6947, position PA is", "flat", ["vertical up", "overhead", "horizontal-vertical"], "PF is vertical up; PE is overhead; PB is horizontal-vertical fillet."],
  ["Positions", "Under ISO 6947, PF is", "vertical up", ["vertical down", "flat", "overhead"], "PG is vertical down."],
  ["Positions", "In AWS terms, a 6G test position is", "pipe fixed at 45° to horizontal", ["plate flat", "pipe rotated horizontally", "plate overhead"], "6G generally qualifies a welder for all positions."],
  ["Positions", "In AWS terms, 4G is", "a groove weld on plate in the overhead position", ["a pipe at 45°", "flat plate", "vertical plate"], "1G flat, 2G horizontal, 3G vertical, 4G overhead."],
  ["Preparation", "For a single-V butt preparation, the included angle equals", "twice the bevel angle", ["the bevel angle", "half the bevel angle", "the root face"], "A 30° bevel each side gives a 60° included angle."],
  ["Preparation", "The root gap in a butt weld preparation is", "the space between the parts at the root", ["the height of the cap", "the bevel angle", "the plate thickness"], "It helps achieve full penetration."],
  ["Consumables", "Which MMA electrode type gives deep penetration and is used for vertical-down pipeline 'stovepipe' welding?", "Cellulosic", ["Rutile", "Basic (low hydrogen)", "Iron powder"], "Cellulosic electrodes produce high hydrogen."],
  ["Consumables", "Which MMA electrode type is easiest to use and gives a smooth finish for general work?", "Rutile", ["Cellulosic", "Basic", "Tungsten"], "Basic electrodes are used where low hydrogen is needed."],
  ["Consumables", "A weld metal hydrogen scale of H5 means", "no more than 5 ml of diffusible hydrogen per 100 g of weld metal", ["5% hydrogen in the shielding gas", "5 passes maximum", "5 mm penetration"], "Lower H numbers mean lower cracking risk."],
  ["Processes", "For TIG welding of carbon and stainless steels, the usual polarity is", "DC electrode negative", ["DC electrode positive", "AC only", "No current"], "AC is used for aluminium to break up the oxide."],
  ["Processes", "Back purging with argon when TIG welding stainless steel pipe prevents", "oxidation of the root (sugaring)", ["porosity in the cap only", "arc blow", "hydrogen cracking"], "The inside of the pipe is filled with inert gas."],
  ["Metallurgy", "Sensitisation of austenitic stainless steel causes", "chromium carbides at grain boundaries and intergranular corrosion", ["hydrogen cracking", "lamellar tearing", "porosity"], "Low-carbon 'L' grades reduce the risk."],
  ["Metallurgy", "For sour service, NACE MR0175 / ISO 15156 commonly limits carbon steel hardness to", "22 HRC (about 248 HV)", ["40 HRC", "10 HRC", "60 HRC"], "Hard zones are prone to sulphide stress cracking."],
  ["Metallurgy", "Underbead cracks in the HAZ are a form of", "hydrogen cracking", ["solidification cracking", "lamellar tearing", "porosity"], "They may be delayed and appear after welding."],
  ["Control", "Controlling the maximum interpass temperature helps", "protect toughness and properties of the weld and HAZ", ["increase spatter", "remove slag automatically", "reduce the need for a WPS"], "Minimum interpass temperature is often the same as preheat."],
  ["Control", "Back-step welding and balanced welding sequences are used to", "reduce distortion", ["increase porosity", "save shielding gas", "test the welder"], "Presetting parts also counteracts distortion."],
  ["Control", "Why should arc strikes outside the weld be avoided?", "They create hard spots and can crack", ["They look untidy only", "They improve strength", "They are required by codes"], "Arc strikes should be ground out and checked."],
  ["Testing", "A nick-break test is used to", "examine the fracture surface of a weld for defects", ["measure hardness", "check coating thickness", "test the electrode oven"], "Common in pipeline welder qualification (API 1104)."],
  ["Testing", "Which hardness test uses a diamond pyramid indenter?", "Vickers", ["Brinell", "Charpy", "Bend"], "Brinell uses a hard ball."],
  ["Properties", "Toughness is a material's ability to", "absorb energy and resist fracture, especially under impact", ["resist scratching", "conduct heat", "be drawn into wire"], "Ductility is the ability to deform without breaking."],
  ["Standards", "BS EN ISO 15614 covers", "welding procedure qualification", ["welder qualification", "radiography", "coating inspection"], "ISO 9606 covers welder qualification."],
  ["Inspection", "A Cambridge (multi-purpose) gauge is used to measure", "weld dimensions such as reinforcement, throat and undercut depth", ["film density", "radiation dose", "coating adhesion"], "A hi-lo gauge measures misalignment."],
];

// ============================================================================
// INS — API 510 / 570
// ============================================================================
const INS: F[] = [
  ["Intervals", "Under API 510, the maximum external inspection interval is the lesser of", "5 years or the internal/on-stream interval", ["10 years or half remaining life", "1 year", "15 years"], "External inspections look for leaks, CUI and supports."],
  ["Intervals", "Under API 570, which piping class has the highest potential consequence if a leak occurs?", "Class 1", ["Class 2", "Class 3", "Class 4"], "Class 1 gets the most frequent inspection."],
  ["Damage", "Erosion-corrosion in piping is most likely", "at elbows and just downstream of control valves", ["in straight runs of stagnant pipe", "only on painted surfaces", "in cold water tanks only"], "High velocity and turbulence remove protective films."],
  ["Damage", "Vibration fatigue in piping often affects", "small-bore connections and branches", ["thick vessel shells", "foundations only", "insulation"], "Bracing and design changes reduce the risk."],
  ["Damage", "Hydrogen-induced cracking (HIC) and sulphide stress cracking (SSC) are associated with", "wet H₂S service", ["dry air", "steam only", "liquid nitrogen"], "Material selection and hardness control help prevent them."],
  ["Damage", "Temper embrittlement mainly affects", "Cr–Mo steels after long service at elevated temperature", ["aluminium", "copper piping", "plastics"], "It reduces toughness at lower temperatures."],
  ["Damage", "Creep is", "slow deformation under stress at high temperature", ["rapid cracking at low temperature", "corrosion under insulation", "wear from sand"], "It matters in furnaces and hot piping."],
  ["Damage", "Soil-to-air interfaces on buried piping are prone to", "external corrosion", ["creep", "temper embrittlement", "fatigue only"], "Moisture and oxygen concentrate at the interface."],
  ["Brittle fracture", "MDMT stands for", "minimum design metal temperature", ["maximum design metal thickness", "mean daily maintenance time", "minimum detectable metal thickness"], "Below the MDMT, brittle fracture risk rises."],
  ["Assessment", "Fitness-for-service assessments follow", "API 579-1 / ASME FFS-1", ["API 1104", "AWS D1.1", "ISO 9712"], "They decide whether damaged equipment can stay in service."],
  ["Documents", "The ASME Manufacturer's Data Report for a Section VIII Div. 1 vessel is Form", "U-1", ["P-1", "WPS-1", "API-510"], "It records design and construction details."],
  ["Repairs", "Temporary repairs such as leak clamps should be", "replaced with permanent repairs at the next suitable opportunity", ["left forever", "painted over", "removed immediately while in service"], "The inspector must approve temporary repairs."],
  ["Repairs", "Rerating a pressure vessel requires", "calculations and approval by the inspector (and engineer)", ["only a new nameplate", "a fresh coat of paint", "an NDT Level 1 signature"], "The nameplate is then updated."],
  ["NDE", "Which technique can screen long lengths of insulated pipe for corrosion without removing insulation?", "Guided wave ultrasonic testing", ["Penetrant testing", "Hardness testing", "Visual testing only"], "Profile radiography is another option."],
];

function mawp(): Q[] {
  return repeat(8, () => {
    const t = pick([0.375, 0.5, 0.625, 0.75]), R = pick([24, 30, 36]), S = pick([17500, 20000]), E = pick([0.85, 1]);
    const ans = Math.round((S * E * t) / (R + 0.6 * t));
    return mcq("INS", "Calculations", `Find the MAWP of a cylindrical shell: t = ${t} in (after corrosion allowance), R = ${R} in, S = ${S.toLocaleString("en-US")} psi, E = ${E}. (P = SEt ÷ (R + 0.6t))`, fmt(ans, "psi"),
      numOpts(ans, [Math.round((S * E * t) / R), Math.round((S * E * t) / (R - 0.6 * t)), Math.round((2 * S * E * t) / (R + 0.6 * t))], "psi"),
      `P = ${S} × ${E} × ${t} ÷ (${R} + 0.6 × ${t}) = ${fmt(ans)} psi.`, 3);
  });
}
function pipeThickness(): Q[] {
  return repeat(8, () => {
    const P = pick([300, 500, 740, 1000]), D = pick([4.5, 6.625, 8.625, 10.75]), S = pick([20000, 20000, 16700]), E = 1, Y = 0.4;
    const ans = r((P * D) / (2 * (S * E + P * Y)), 3);
    return mcq("INS", "Calculations", `ASME B31.3 pressure design thickness: P = ${P} psi, OD = ${D} in, S = ${S.toLocaleString("en-US")} psi, E = 1, Y = 0.4. (t = PD ÷ 2(SE + PY))`, fmt(ans, "in"),
      numOpts(ans, [r((P * D) / (S * E), 3), r((P * D) / (2 * S * E), 4) === ans ? r(ans * 2, 3) : r((P * D) / (2 * S * E), 4), r((P * D) / (2 * (S * E - P * Y)), 4)], "in"),
      `t = ${P} × ${D} ÷ (2 × (${S} + ${P} × 0.4)) = ${fmt(ans)} in (before corrosion allowance and mill tolerance).`, 3);
  });
}
function hydrotest(): Q[] {
  return repeat(6, () => {
    const mawp = pick([150, 200, 250, 300, 450]), ratio = pick([1, 1, 1.07, 1.15]);
    const ans = r(1.3 * mawp * ratio, 1);
    return mcq("INS", "Calculations", `ASME VIII Div. 1 hydrotest: MAWP ${mawp} psi, stress ratio ${ratio}. What is the minimum test pressure? (1.3 × MAWP × stress ratio)`, fmt(ans, "psi"),
      numOpts(ans, [r(1.5 * mawp * ratio, 1), r(1.1 * mawp, 1), r(1.3 * mawp, 1) === ans ? r(1.25 * mawp, 1) : r(1.3 * mawp, 1)], "psi"), `1.3 × ${mawp} × ${ratio} = ${fmt(ans)} psi.`, 2);
  });
}

// ============================================================================
// COR — coating & corrosion
// ============================================================================
const COR: F[] = [
  ["Corrosion", "Which form of corrosion produces deep, localised holes?", "Pitting", ["Uniform corrosion", "Chalking", "Mud cracking"], "Pitting can perforate a wall with little overall metal loss."],
  ["Corrosion", "Corrosion inside narrow gaps, such as under gaskets, is", "crevice corrosion", ["galvanic corrosion", "erosion", "chalking"], "Oxygen differences inside the gap drive it."],
  ["Corrosion", "Which combination makes galvanic corrosion worst?", "A small anode connected to a large cathode", ["A large anode and a small cathode", "Two identical metals", "Metals kept completely dry"], "The small anode carries all the corrosion current."],
  ["Coatings", "A zinc-rich primer protects steel mainly by", "sacrificial (galvanic) protection", ["barrier action only", "inhibitive pigments only", "adding heat"], "Barrier coatings block water and oxygen; inhibitive coatings slow corrosion chemically."],
  ["Coatings", "Inorganic zinc silicate primers cure by", "reacting with moisture from the air (hydrolysis)", ["solvent evaporation only", "oxidation like alkyds", "heat only"], "Very low humidity can slow the cure."],
  ["Coatings", "Alkyd paints cure by", "oxidation (reaction with oxygen in air)", ["chemical reaction between two packs", "hydrolysis", "freezing"], "They are not suitable for immersion or alkaline surfaces."],
  ["Coatings", "Why should alkyds not be applied directly to galvanised steel?", "The zinc surface makes them saponify and peel", ["They are too thick", "They cure too fast", "They are too expensive"], "Use a suitable tie-coat or primer."],
  ["Coatings", "Two-pack epoxies and polyurethanes cure by", "chemical reaction between base and curing agent", ["solvent evaporation only", "oxidation only", "sunlight only"], "Mixing ratio and pot life must be respected."],
  ["Surface prep", "Which SSPC standard is commercial blast cleaning?", "SSPC-SP 6", ["SSPC-SP 1", "SSPC-SP 5", "SSPC-SP 2"], "SP 7 is brush-off; SP 10 near-white; SP 5 white metal."],
  ["Surface prep", "SSPC-SP 11 is", "power-tool cleaning to bare metal", ["solvent cleaning", "hand-tool cleaning", "white metal blast"], "SP 3 is ordinary power-tool cleaning."],
  ["Surface prep", "Steel grit, compared with steel shot, produces a profile that is", "angular", ["rounded", "completely smooth", "polished"], "Shot gives a rounded, peened profile."],
  ["Surface prep", "Which test checks compressed air for oil and water before blasting?", "Blotter test (ASTM D4285)", ["Bresle test", "Pull-off test", "Holiday test"], "Contaminated air puts oil on the steel."],
  ["Surface prep", "ISO 8502-3 tape test is used to assess", "dust on a blast-cleaned surface", ["coating adhesion", "film thickness", "salt contamination"], "Dust reduces adhesion."],
  ["Surface prep", "Flash rust after water jetting can be controlled by", "using inhibitors or coating quickly within limits", ["leaving the steel wet overnight", "adding salt", "heating to red hot"], "Some coatings tolerate light flash rust."],
  ["Application", "A stripe coat is applied to", "edges, welds and corners before the full coat", ["the whole surface twice", "only flat areas", "the inside of the tin"], "Coatings pull thin at edges."],
  ["Application", "The overcoating window is", "the time range in which the next coat must be applied", ["the time paint stays in the tin", "the width of the brush", "the drying time of thinner"], "Outside it, adhesion between coats can fail."],
  ["CP", "A common criterion for cathodic protection of buried steel is a potential of", "−850 mV or more negative vs Cu/CuSO₄", ["+850 mV vs Cu/CuSO₄", "0 mV", "−100 mV vs any electrode"], "Measured with a copper/copper sulphate reference electrode."],
  ["CP", "Which reference electrode is usually used in seawater?", "Silver/silver chloride", ["Copper/copper sulphate", "Zinc only", "Graphite"], "Cu/CuSO₄ is used in soil."],
  ["Failures", "Fisheyes and cratering in a wet film are often caused by", "surface contamination such as silicone or oil", ["too much profile", "high film build", "correct mixing"], "Clean the surface and check the air supply."],
  ["Failures", "Osmotic blistering is mainly caused by", "soluble salts left under the coating", ["sunlight", "too thin a primer only", "low humidity"], "Water is drawn through the film towards the salts."],
  ["Failures", "Dry spray (a rough, powdery finish) occurs when", "paint partly dries before reaching the surface", ["the film is too thick", "the steel is wet", "the coating is mixed correctly"], "Spray distance, wind and heat are common causes."],
  ["Failures", "Loss of adhesion between two coats is called", "intercoat delamination", ["chalking", "pinholing", "mud cracking"], "Often due to missing the overcoat window or contamination."],
];

function spreadingRate(): Q[] {
  return repeat(8, () => {
    const vs = pick([50, 60, 65, 70, 80]), dft = pick([50, 75, 100, 125, 150, 200]);
    const ans = r((vs * 10) / dft, 2);
    return mcq("COR", "Calculations", `A coating has ${vs}% volume solids and is specified at ${dft} µm DFT. What is the theoretical spreading rate? (m²/L = VS% × 10 ÷ DFT µm)`, fmt(ans, "m²/L"),
      numOpts(ans, [r((vs * 100) / dft, 2), r(dft / (vs * 10), 3), r((vs * 10) / (dft * 2), 2)], "m²/L"), `${vs} × 10 ÷ ${dft} = ${fmt(ans)} m²/L.`, 2);
  });
}
function paintNeeded(): Q[] {
  return repeat(8, () => {
    const area = pick([200, 350, 500, 800, 1000]), vs = pick([50, 60, 75]), dft = pick([75, 100, 125]), loss = pick([20, 30, 40]);
    const sr = (vs * 10) / dft, ans = Math.ceil((area / sr) / (1 - loss / 100));
    return mcq("COR", "Calculations", `You must coat ${area} m² at ${dft} µm DFT with a ${vs}% volume solids paint. Allowing ${loss}% loss, about how many litres are needed (rounded up)?`, fmt(ans, "L"),
      numOpts(ans, [Math.ceil(area / sr), Math.ceil((area / sr) * (1 + loss / 100)) === ans ? ans + 20 : Math.ceil((area / sr) * (1 + loss / 100)), Math.ceil(area / (vs / 10))], "L"),
      `Theoretical rate = ${vs} × 10 ÷ ${dft} = ${r(sr, 2)} m²/L. Volume = ${area} ÷ ${r(sr, 2)} ÷ (1 − ${loss / 100}) ≈ ${ans} L.`, 3);
  });
}
function wftThinned(): Q[] {
  return repeat(8, () => {
    const vs = pick([50, 60, 70]), dft = pick([75, 100, 125]), thin = pick([5, 10, 15]);
    const ans = Math.round((dft * (100 + thin)) / vs);
    return mcq("COR", "Calculations", `A ${vs}% volume solids paint is thinned by ${thin}%. What WFT gives ${dft} µm DFT? (WFT = DFT × (100 + thinner%) ÷ VS)`, fmt(ans, "µm"),
      numOpts(ans, [Math.round((dft * 100) / vs), Math.round((dft * vs) / (100 + thin)), Math.round((dft * (100 - thin)) / vs)], "µm"),
      `${dft} × (100 + ${thin}) ÷ ${vs} = ${ans} µm.`, 3);
  });
}

export function oilgas3(): Record<string, Q[]> {
  return {
    OGS: facts("OGS", OGS),
    ONG: [...facts("ONG", ONG), ...apiGravity(), ...barrels()],
    ODP: [...facts("ODP", ODP), ...gradient(), ...equivalentMw(), ...formationPressure(), ...capacity(), ...strokes()],
    NDG: facts("NDG", NDG),
    NPT: facts("NPT", NPT),
    NMT: facts("NMT", NMT),
    NUT: [...facts("NUT", NUT), ...wavelength(), ...nearField(), ...snell(), ...decibels()],
    NRT: [...facts("NRT", NRT), ...hvl(), ...exposureTime(), ...safeDistance()],
    WIN: facts("WIN", WIN),
    INS: [...facts("INS", INS), ...mawp(), ...pipeThickness(), ...hydrotest()],
    COR: [...facts("COR", COR), ...spreadingRate(), ...paintNeeded(), ...wftThinned()],
  };
}
