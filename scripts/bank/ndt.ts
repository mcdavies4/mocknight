// NDT (non-destructive testing) starter banks: general theory (NDG), penetrant (NPT), magnetic particle (NMT),
// ultrasonic (NUT) and radiography incl. radiation safety (NRT). Long-established principles only;
// calculations are generated from the standard formulas so the answers are exact.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

const NDG: F[] = [
  ["Basics", "What is the main advantage of NDT over destructive testing?", "The part can still be used after testing", ["It is always cheaper", "It needs no trained staff", "It finds every possible defect"], "NDT inspects without damaging the item."],
  ["Basics", "What is the difference between a discontinuity and a defect?", "A defect is a discontinuity that fails the acceptance criteria", ["They mean exactly the same", "A defect is always on the surface", "A discontinuity is always rejectable"], "Every defect is a discontinuity, but not every discontinuity is a defect."],
  ["Basics", "Which NDT method should always be carried out first?", "Visual testing (VT)", ["Radiography (RT)", "Ultrasonic testing (UT)", "Eddy current testing (ET)"], "Visual inspection is quick, cheap and finds obvious problems."],
  ["Methods", "Which two methods are mainly used to find internal (volumetric) defects?", "Ultrasonic and radiographic testing", ["Penetrant and magnetic particle testing", "Visual and penetrant testing", "Eddy current and visual testing"], "PT, MT, VT and ET are mainly surface or near-surface methods."],
  ["Methods", "Which method can only detect discontinuities that are open to the surface?", "Penetrant testing (PT)", ["Ultrasonic testing (UT)", "Radiographic testing (RT)", "Magnetic particle testing (MT)"], "MT can also find some slightly subsurface defects."],
  ["Methods", "Magnetic particle testing can only be used on", "ferromagnetic materials such as carbon steel", ["any metal", "aluminium and copper", "austenitic stainless steel"], "The material must be able to be magnetised."],
  ["Methods", "Which method is best for measuring the remaining wall thickness of a corroded pipe?", "Ultrasonic testing", ["Penetrant testing", "Magnetic particle testing", "Visual testing"], "UT measures thickness from one side."],
  ["Methods", "Which method gives a permanent image record of a weld's internal condition?", "Radiography", ["Penetrant testing", "Visual testing", "Magnetic particle testing"], "Film or digital images can be archived."],
  ["Methods", "Eddy current testing works on", "electrically conductive materials", ["any material including plastics", "ferromagnetic materials only", "ceramics only"], "It is widely used on heat exchanger tubes."],
  ["Certification", "Under ISO 9712, which level sets up equipment, carries out tests and interprets results against standards?", "Level 2", ["Level 1", "Level 3", "Trainee"], "Level 1 works under supervision; Level 3 writes and approves procedures."],
  ["Certification", "Which level is responsible for establishing techniques and approving written procedures?", "Level 3", ["Level 1", "Level 2", "Any trainee"], "Level 3 also oversees qualification of lower levels."],
  ["Certification", "ASNT SNT-TC-1A is", "a recommended practice under which the employer certifies its personnel", ["a central certification exam run by ISO", "a welding code", "a radiation safety law"], "Employers write a 'written practice' based on it."],
  ["Certification", "Under ISO 9712, how long is a certificate valid before renewal?", "5 years", ["1 year", "3 years", "10 years"], "Recertification by exam is required every 10 years."],
  ["Certification", "How often must certified ISO 9712 personnel have their vision checked?", "Every year", ["Every 5 years", "Only once, before the first exam", "Every 10 years"], "Near-vision acuity and colour vision are checked."],
  ["Certification", "Under ISO 9712 Level 2, the pass mark for each written exam is", "70%", ["50%", "60%", "80%"], "Each written paper and the practical must be passed."],
  ["Welds", "Which weld defect is generally considered the most serious?", "Cracks", ["Porosity", "Spatter", "Slight excess reinforcement"], "Cracks are planar and can grow under stress."],
  ["Welds", "Gas pores trapped in a weld are called", "porosity", ["undercut", "lack of fusion", "slag inclusion"], "Often caused by contamination or poor shielding gas."],
  ["Welds", "A groove melted into the base metal at the weld toe and left unfilled is", "undercut", ["overlap", "porosity", "incomplete penetration"], "Undercut reduces the section and concentrates stress."],
  ["Welds", "Non-metallic material trapped in a weld from the flux is called", "slag inclusion", ["porosity", "undercut", "lamination"], "Poor cleaning between passes is a common cause."],
  ["Welds", "The area of base metal whose structure was changed by welding heat is the", "heat-affected zone (HAZ)", ["fusion face", "root", "cap"], "The HAZ was not melted but its properties changed."],
  ["Codes", "Which code is widely used for welding of oil and gas pipelines?", "API 1104", ["AWS D1.1", "ASME Section IX only", "BS 7671"], "API 1104 covers pipeline welding and its inspection."],
  ["Codes", "Which code covers structural steel welding?", "AWS D1.1", ["API 1104", "ASME Section V", "API 510"], "D1.1 is the American Welding Society structural code."],
  ["Codes", "ASME Section V covers", "NDT methods and techniques", ["acceptance criteria for all pressure vessels", "welder qualification", "pipeline design"], "Acceptance criteria usually come from the construction code."],
];

const NPT: F[] = [
  ["Principles", "Penetrant testing relies mainly on", "capillary action", ["magnetism", "sound reflection", "X-ray absorption"], "The penetrant is drawn into surface-breaking openings."],
  ["Principles", "Penetrant testing cannot be used on", "porous materials such as unglazed ceramics", ["steel", "aluminium", "glass"], "Penetrant soaks into porous surfaces and masks indications."],
  ["Process", "What is the correct order of the main PT steps?", "Pre-clean, apply penetrant, dwell, remove excess, apply developer, inspect, post-clean", ["Apply developer, apply penetrant, inspect, clean", "Apply penetrant, inspect, pre-clean, developer", "Remove excess, apply penetrant, dwell, inspect"], "Pre-cleaning is critical: contamination blocks penetrant."],
  ["Process", "The time the penetrant is left on the surface is called the", "dwell time", ["development time", "drying time", "exposure time"], "It lets penetrant enter the discontinuities."],
  ["Process", "What is the main risk of over-removing excess penetrant?", "Penetrant is washed out of defects, so they are missed", ["The part rusts immediately", "False indications everywhere", "The developer will not stick"], "Removal must be controlled, especially with water-washable penetrants."],
  ["Process", "What does the developer do?", "Draws penetrant out of discontinuities and gives a contrasting background", ["Cleans the surface", "Magnetises the part", "Dries the penetrant into the defect permanently"], "It acts like blotting paper."],
  ["Process", "Under ASME Section V, the standard temperature range for PT is", "10 °C to 52 °C", ["0 °C to 100 °C", "20 °C to 30 °C only", "-10 °C to 40 °C"], "Outside this range the procedure must be qualified."],
  ["Types", "Which removal method uses a solvent wipe and is common for field inspection?", "Solvent-removable", ["Water-washable", "Post-emulsifiable hydrophilic", "Post-emulsifiable lipophilic"], "Aerosol kits make it portable."],
  ["Types", "Which type of penetrant is generally more sensitive?", "Fluorescent", ["Visible (red)", "Both are identical", "Neither can find cracks"], "Fluorescent indications glow under UV-A light."],
  ["Types", "Fluorescent penetrant inspection uses UV-A light with a peak wavelength of about", "365 nm", ["550 nm", "254 nm", "700 nm"], "UV-A covers roughly 320 to 400 nm."],
  ["Types", "Under ASME Section V, the minimum UV-A intensity at the inspection surface is", "1000 µW/cm²", ["100 µW/cm²", "10 µW/cm²", "5000 lux"], "Check the intensity with a UV meter."],
  ["Types", "Before fluorescent inspection in a darkened area, the inspector should allow at least", "5 minutes for dark adaptation", ["30 seconds", "1 hour", "no time at all"], "Eyes need time to adjust to see faint indications."],
  ["Interpretation", "Under ASME, a linear indication is one whose length is", "more than three times its width", ["equal to its width", "less than its width", "more than 1 mm only"], "Otherwise it is a rounded indication."],
  ["Interpretation", "A false indication in PT is most often caused by", "poor cleaning or excess penetrant left on the surface", ["a real crack", "too little dwell time", "magnetisation"], "False indications are not caused by discontinuities."],
];

const NMT: F[] = [
  ["Principles", "Magnetic particle testing detects defects because", "a discontinuity causes magnetic flux leakage that attracts particles", ["particles are drawn in by capillary action", "sound reflects from the defect", "the defect absorbs X-rays"], "Leakage fields hold particles at the defect."],
  ["Principles", "Which material CANNOT be tested with MT?", "Austenitic stainless steel", ["Carbon steel", "Low-alloy steel", "Cast iron"], "Austenitic stainless steel is non-magnetic."],
  ["Principles", "A defect is detected best when it lies at what angle to the magnetic field?", "90° (perpendicular)", ["0° (parallel)", "Any angle equally", "45° only"], "Inspect in two directions about 90° apart."],
  ["Principles", "Above its Curie temperature, steel", "loses its ferromagnetic properties", ["becomes more magnetic", "becomes radioactive", "cannot be welded"], "For iron this is about 770 °C."],
  ["Techniques", "An electromagnetic yoke produces", "a longitudinal field between its poles", ["a circular field around the part", "no field", "a radioactive field"], "Place the yoke twice at about 90° to check both directions."],
  ["Techniques", "Passing current directly through a part (head shot or prods) produces", "a circular magnetic field", ["a longitudinal field", "no field", "an alternating sound wave"], "Field lines circle around the current path."],
  ["Techniques", "A known risk of using prods is", "arc strikes that can damage the part", ["radiation exposure", "loss of couplant", "corrosion from the developer"], "Good contact and correct current reduce the risk."],
  ["Techniques", "Which current is better for detecting surface-breaking defects?", "AC", ["DC", "Both are useless", "No current"], "AC concentrates the field near the surface (skin effect)."],
  ["Techniques", "Which current gives better detection of slightly subsurface defects?", "DC or half-wave DC", ["AC", "No current", "High-frequency AC only"], "DC penetrates deeper into the part."],
  ["Techniques", "Under ASME Section V, an AC yoke must be able to lift at least", "4.5 kg (10 lb) at the maximum pole spacing", ["18 kg (40 lb)", "1 kg", "50 kg"], "A DC yoke must lift at least 18 kg (40 lb)."],
  ["Techniques", "Which particles give the highest sensitivity?", "Wet fluorescent particles", ["Dry red powder", "Dry grey powder", "Iron filings from a workshop"], "They are viewed under UV-A light."],
  ["Techniques", "A pie gauge is used in MT to", "show the direction of the magnetic field", ["measure wall thickness", "measure film density", "check UV intensity"], "A Hall-effect meter measures field strength."],
  ["Techniques", "Inspecting while the magnetising current is still applied is called the", "continuous method", ["residual method", "dwell method", "pulse-echo method"], "The residual method relies on leftover magnetism."],
  ["After testing", "Why might a part need demagnetising after MT?", "Residual magnetism can attract debris or affect later welding and machining", ["To make it radioactive-free", "To remove the paint", "It is never needed"], "Arc blow during welding is a common problem."],
];

const NUT: F[] = [
  ["Principles", "Why is a couplant needed in contact ultrasonic testing?", "Air transmits ultrasound very poorly", ["To cool the probe", "To clean the surface", "To magnetise the part"], "Gel, oil or water removes the air gap."],
  ["Principles", "Sound above about what frequency is called ultrasound?", "20 kHz", ["20 Hz", "2 kHz", "20 MHz"], "Industrial UT typically uses about 1 to 10 MHz."],
  ["Principles", "Increasing probe frequency generally gives", "better resolution but less penetration", ["more penetration and worse resolution", "no change", "more penetration and better resolution"], "Lower frequencies penetrate coarse-grained material better."],
  ["Principles", "The longitudinal wave velocity in steel is about", "5,920 m/s", ["3,240 m/s", "1,480 m/s", "340 m/s"], "Shear waves in steel travel at about 3,240 m/s."],
  ["Principles", "Compared with longitudinal waves in steel, shear waves travel at about", "half the speed", ["twice the speed", "the same speed", "ten times the speed"], "About 3,240 m/s vs 5,920 m/s."],
  ["Principles", "Which law describes refraction of sound at an interface?", "Snell's law", ["Ohm's law", "The inverse square law", "Hooke's law"], "It links angles to the velocities in each material."],
  ["Principles", "The region close to the probe where signals are unreliable because of interference is the", "near field (Fresnel zone)", ["far field", "dead zone of the material", "HAZ"], "Beyond it is the far field (Fraunhofer zone)."],
  ["Techniques", "Angle-beam probes for weld inspection usually use", "shear waves", ["surface waves only", "longitudinal waves only", "X-rays"], "Common angles are 45°, 60° and 70°."],
  ["Techniques", "In the pulse-echo technique,", "one probe sends the pulse and receives the echo", ["two probes face each other through the part", "no echo is used", "the part is magnetised"], "Through-transmission uses separate transmitter and receiver."],
  ["Techniques", "Which block is commonly used to calibrate angle-beam probes?", "IIW V1 block", ["IQI wire set", "Pie gauge", "Step wedge for film"], "The V2 block is a smaller portable alternative."],
  ["Techniques", "A DAC curve is used to", "allow for loss of amplitude with distance when assessing indications", ["measure film density", "measure UV light", "set magnetising current"], "Distance-amplitude correction."],
  ["Displays", "An A-scan shows", "signal amplitude against time (depth)", ["a plan view of the part", "a cross-section image", "a radiograph"], "B-scan is a cross-section; C-scan is a plan view."],
  ["Advanced", "Which advanced UT technique uses many small elements fired with time delays to steer the beam?", "Phased array (PAUT)", ["TOFD", "Eddy current", "Radiography"], "TOFD uses diffracted signals from defect tips."],
];

const NRT: F[] = [
  ["Sources", "What is the approximate half-life of Iridium-192?", "74 days", ["5.3 years", "120 days", "30 years"], "Ir-192 is the most common gamma source for pipeline welds."],
  ["Sources", "What is the approximate half-life of Cobalt-60?", "5.3 years", ["74 days", "120 days", "8 days"], "Co-60 emits higher-energy gamma rays for thick sections."],
  ["Sources", "Selenium-75 has a half-life of about", "120 days", ["74 days", "5.3 years", "1 day"], "Its lower energy suits thinner sections."],
  ["Image", "On a radiograph, porosity usually appears", "darker than the surrounding weld", ["lighter than the surrounding weld", "invisible", "as a bright straight line"], "Less material means more radiation reaches the film."],
  ["Image", "A tungsten inclusion on a radiograph appears", "lighter than the surrounding weld", ["darker than the surrounding weld", "the same", "as a crack"], "Tungsten is denser than steel."],
  ["Image", "What is an image quality indicator (IQI) used for?", "To check the sensitivity of the radiograph", ["To measure the source activity", "To shield the operator", "To develop the film"], "Wire-type and hole-type IQIs are common."],
  ["Image", "Why might radiography miss a lack-of-fusion defect?", "Planar defects are hard to see unless aligned with the beam", ["RT cannot see inside welds", "Lack of fusion is always on the surface", "Steel stops all radiation"], "UT is often better for planar defects."],
  ["Image", "When the inside of a pipe cannot be reached, a common technique is", "double wall single image (DWSI)", ["single wall single image only", "pulse-echo", "prod technique"], "Radiation passes through both walls; only the film-side wall is evaluated."],
  ["Safety", "What are the three basic principles of radiation protection?", "Time, distance and shielding", ["Speed, power and light", "Gloves, goggles and boots", "Heat, fuel and oxygen"], "Minimise time, maximise distance, use shielding."],
  ["Safety", "What does ALARA stand for?", "As Low As Reasonably Achievable", ["Always Leave Area Right Away", "Annual Limit And Radiation Allowance", "As Long As Radiation Allows"], "Keep doses as low as reasonably achievable."],
  ["Safety", "Which unit measures the activity of a radioactive source?", "Becquerel (Bq)", ["Sievert (Sv)", "Gray (Gy)", "Lux"], "The older unit is the curie (Ci)."],
  ["Safety", "Which unit measures dose equivalent (biological effect) to a person?", "Sievert (Sv)", ["Becquerel (Bq)", "Gray (Gy)", "Hertz (Hz)"], "The gray measures absorbed dose."],
  ["Safety", "The internationally recommended occupational dose limit is", "20 mSv per year, averaged over 5 years", ["1 mSv per year", "100 mSv per year", "No limit for trained workers"], "Set out by ICRP and adopted by IAEA standards."],
  ["Safety", "Which body regulates radiation sources and radiography in Nigeria?", "Nigerian Nuclear Regulatory Authority (NNRA)", ["NUPRC", "NAFDAC", "SON"], "Radiography companies must be licensed by the NNRA."],
  ["Safety", "A survey meter is used to", "measure radiation dose rate in the work area", ["record each worker's total dose", "develop film", "measure wall thickness"], "Personal dosimeters (TLD or EPD) record individual dose."],
  ["Film", "What is the correct order of manual film processing?", "Develop, stop, fix, wash, dry", ["Fix, develop, wash, dry", "Develop, dry, fix, wash", "Wash, develop, fix, stop"], "The fixer removes unexposed silver halide."],
];

// --- Calculations ----------------------------------------------------------
function utThickness(): Q[] {
  return repeat(10, () => {
    const t = ri(4, 30) * 0.5; // round-trip time in µs
    const ans = Math.round((5.92 * t) / 2 * 10) / 10;
    return mcq("NUT", "Calculations", `A longitudinal-wave probe on steel (velocity 5,920 m/s) shows a back-wall echo at ${t} µs (round trip). What is the thickness?`, fmt(ans, "mm"),
      numOpts(ans, [Math.round(5.92 * t * 10) / 10, Math.round((3.24 * t) / 2 * 10) / 10, Math.round(ans * 1.5 * 10) / 10], "mm"),
      `Thickness = velocity × time ÷ 2 = 5.92 mm/µs × ${t} µs ÷ 2 = ${fmt(ans)} mm (the sound travels there and back).`, 2);
  });
}
function inverseSquare(): Q[] {
  return repeat(10, () => {
    const d1 = pick([2, 3, 4, 5, 10]), k = pick([2, 3, 4, 5]), d2 = d1 * k, i1 = pick([40, 80, 120, 160, 200, 400]);
    const ans = Math.round((i1 / (k * k)) * 100) / 100;
    if (ans < 1) return null;
    return mcq("NRT", "Calculations", `The dose rate is ${i1} µSv/h at ${d1} m from a gamma source. What is it at ${d2} m?`, fmt(ans, "µSv/h"),
      numOpts(ans, [Math.round((i1 / k) * 100) / 100, i1 * k, Math.round((i1 / (2 * k)) * 100) / 100], "µSv/h"),
      `Inverse square law: I₂ = I₁ × (d₁/d₂)² = ${i1} × (1/${k})² = ${fmt(ans)} µSv/h.`, 2);
  });
}
function decay(): Q[] {
  return repeat(8, () => {
    const a0 = pick([40, 60, 80, 100, 120]), n = pick([1, 2, 3]);
    const ans = a0 / 2 ** n, days = 74 * n;
    return mcq("NRT", "Calculations", `An Ir-192 source (half-life about 74 days) has an activity of ${a0} Ci. Roughly what is its activity after ${days} days?`, fmt(ans, "Ci"),
      numOpts(ans, [Math.round((a0 / (2 * n + 1)) * 10) / 10, a0 - 10 * n, a0 / 2 ** (n + 1), Math.round((a0 / n) * 10) / 10], "Ci"),
      `${days} days is ${n} half-li${n === 1 ? "fe" : "ves"}: ${a0} ÷ 2${n > 1 ? `^${n}` : ""} = ${fmt(ans)} Ci.`, 2);
  });
}
function unsharpness(): Q[] {
  return repeat(8, () => {
    const f = pick([2, 3, 4]), t = pick([10, 15, 20, 25, 30]), D = pick([500, 600, 700, 800, 1000]);
    const ans = Math.round(((f * t) / D) * 1000) / 1000;
    return mcq("NRT", "Calculations", `Find the geometric unsharpness: source size ${f} mm, object-to-film distance ${t} mm, source-to-object distance ${D} mm.`, fmt(ans, "mm"),
      numOpts(ans, [Math.round((f * D) / t) / 100, Math.round(((f * t) / (D + t)) * 1000) / 1000, Math.round(((f + t) / D) * 1000) / 1000, Math.round(ans * 10 * 1000) / 1000], "mm"),
      `Ug = F × t ÷ D = ${f} × ${t} ÷ ${D} = ${fmt(ans)} mm.`, 3);
  });
}

export function ndt(): Record<string, Q[]> {
  return {
    NDG: facts("NDG", NDG),
    NPT: facts("NPT", NPT),
    NMT: facts("NMT", NMT),
    NUT: [...facts("NUT", NUT), ...utThickness()],
    NRT: [...facts("NRT", NRT), ...inverseSquare(), ...decay(), ...unsharpness()],
  };
}
