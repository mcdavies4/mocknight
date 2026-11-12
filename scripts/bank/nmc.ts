// NMC CBT practice — original questions.
// Part A numeracy: every answer is computed from the numbers in the question.
// Part B clinical: written to UK practice (NMC Code, NEWS2, Resuscitation Council UK, Mental Capacity Act, NICE).
// Clinical content must be reviewed by a registered nurse before launch.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

const N = "NMN";
const C = "NMC";

const round = (x: number, dp = 1) => Math.round(x * 10 ** dp) / 10 ** dp;

export function nmcNumeracy(): Q[] {
  const qs: Q[] = [];
  const unitOpts = (v: number, wrong: number[], unit: string) => numOpts(v, wrong, unit);

  // Tablets
  qs.push(
    ...repeat(22, () => {
      const stock = pick([5, 10, 12.5, 20, 25, 40, 50, 100, 125, 250, 500]);
      const n = pick([0.5, 1, 1.5, 2, 2.5, 3, 4]);
      const dose = stock * n;
      const drug = pick(["furosemide", "paracetamol", "prednisolone", "amlodipine", "metformin", "atenolol", "amoxicillin", "warfarin"]);
      return mcq(N, "Tablets", `A patient is prescribed ${fmt(dose)} mg of ${drug}. Tablets are available as ${fmt(stock)} mg. How many tablets should be given?`, `${fmt(n)} tablet${n === 1 ? "" : "s"}`,
        unitOpts(n, [stock / dose, n * 2, n / 2, n + 1], "tablets").map((x) => x.replace(/^1 tablets$/, "1 tablet")),
        `What you want ÷ what you've got = ${fmt(dose)} ÷ ${fmt(stock)} = ${fmt(n)}.`, 1);
    }),
  );

  // Oral liquids & injections
  qs.push(
    ...repeat(22, () => {
      const [stock, vol] = pick([[250, 5], [125, 5], [120, 5], [100, 5], [50, 5], [200, 5], [10, 1], [25, 1], [40, 1], [500, 10]] as [number, number][]);
      const factor = pick([0.5, 0.75, 1.2, 1.5, 2, 2.5, 0.4, 0.8]);
      const dose = round(stock * factor, 2);
      const ml = round((dose / stock) * vol, 2);
      if (!Number.isFinite(ml) || ml <= 0) return null;
      const form = vol === 1 ? "injection" : "oral suspension";
      return mcq(N, "Liquid medicines", `Prescribed: ${fmt(dose)} mg. Stock ${form}: ${fmt(stock)} mg in ${vol} mL. What volume should be given?`, `${fmt(ml)} mL`,
        unitOpts(ml, [(stock / dose) * vol, dose / stock, ml * 10, ml / 10, ml + vol], "mL"),
        `(What you want ÷ what you've got) × volume = (${fmt(dose)} ÷ ${fmt(stock)}) × ${vol} = ${fmt(ml)} mL.`, 2);
    }),
  );

  // Unit conversions
  const conv: [string, string, number][] = [["mg", "micrograms", 1000], ["g", "mg", 1000], ["L", "mL", 1000], ["micrograms", "mg", 0.001], ["mg", "g", 0.001], ["mL", "L", 0.001]];
  qs.push(
    ...repeat(16, () => {
      const [from, to, f] = pick(conv);
      const v = f > 1 ? pick([0.05, 0.125, 0.25, 0.5, 1.5, 2.5, 0.075, 0.6]) : pick([62.5, 125, 250, 500, 750, 1500, 2500, 50]);
      const ans = round(v * f, 4);
      return mcq(N, "Unit conversion", `Convert ${fmt(v)} ${from} to ${to}.`, `${fmt(ans)} ${to}`,
        unitOpts(ans, [v * f * 10, v * f / 10, v / f, ans * 100], to), `1 ${f > 1 ? from : to} = 1,000 ${f > 1 ? to : from}. ${fmt(v)} ${from} = ${fmt(ans)} ${to}.`, 1);
    }),
  );

  // Infusion pump rate
  qs.push(
    ...repeat(16, () => {
      const vol = pick([100, 250, 500, 1000]);
      const hrs = pick([1, 2, 4, 5, 6, 8, 10, 12, 0.5]);
      const rate = round(vol / hrs, 1);
      if (!Number.isInteger(rate * 10)) return null;
      return mcq(N, "IV infusions", `${vol} mL of sodium chloride 0.9% is to be given over ${hrs === 0.5 ? "30 minutes" : `${hrs} hour${hrs === 1 ? "" : "s"}`} by volumetric pump. At what rate (mL/hour) should the pump be set?`, `${fmt(rate)} mL/hour`,
        unitOpts(rate, [vol * hrs, hrs / vol * 1000, rate / 2, rate * 2], "mL/hour"), `Rate = volume ÷ time = ${vol} ÷ ${hrs} = ${fmt(rate)} mL/hour.`, 1);
    }),
  );

  // Gravity drip rate
  qs.push(
    ...repeat(16, () => {
      const vol = pick([500, 1000, 250]);
      const hrs = pick([4, 6, 8, 10, 12, 2]);
      const df = pick([20, 15, 60]);
      const dpm = Math.round((vol * df) / (hrs * 60));
      const exact = (vol * df) / (hrs * 60);
      return mcq(N, "IV infusions", `${vol} mL of fluid is to be given over ${hrs} hours using a giving set with a drop factor of ${df} drops/mL. How many drops per minute? (Round to the nearest whole number)`, `${dpm} drops/min`,
        unitOpts(dpm, [Math.round((vol * df) / hrs), Math.round(vol / (hrs * 60)), Math.round(exact * 2), Math.round((vol * 60) / (hrs * df))], "drops/min"),
        `Drops/min = (volume × drop factor) ÷ (hours × 60) = (${vol} × ${df}) ÷ (${hrs} × 60) = ${round(exact, 2)} → ${dpm}.`, 2);
    }),
  );

  // Weight-based dosing
  qs.push(
    ...repeat(16, () => {
      const perKg = pick([0.5, 1, 1.5, 2, 5, 7.5, 10, 15, 20]);
      const kg = ri(8, 95);
      const total = round(perKg * kg, 2);
      const doses = pick([1, 2, 3, 4]);
      if (doses === 1) {
        return mcq(N, "Weight-based doses", `A drug is prescribed at ${perKg} mg/kg. The patient weighs ${kg} kg. What dose should be given?`, `${fmt(total)} mg`,
          unitOpts(total, [kg / perKg, total * 10, total / 2, perKg + kg], "mg"), `${perKg} mg × ${kg} kg = ${fmt(total)} mg.`, 1);
      }
      const each = round(total / doses, 2);
      return mcq(N, "Weight-based doses", `A drug is prescribed at ${perKg} mg/kg/day in ${doses} equal divided doses. The patient weighs ${kg} kg. How much is each dose?`, `${fmt(each)} mg`,
        unitOpts(each, [total, total * doses, each * 2, kg / perKg], "mg"), `Daily dose = ${perKg} × ${kg} = ${fmt(total)} mg. Each dose = ${fmt(total)} ÷ ${doses} = ${fmt(each)} mg.`, 2);
    }),
  );

  // Fluid balance
  qs.push(
    ...repeat(16, () => {
      const ins = [ri(2, 8) * 50, ri(1, 6) * 50, ri(2, 10) * 100];
      const outs = [ri(4, 16) * 50, ri(1, 4) * 50];
      const inT = ins.reduce((a, b) => a + b), outT = outs.reduce((a, b) => a + b);
      const bal = inT - outT;
      if (bal === 0) return null;
      const s = (n: number) => (n > 0 ? `+${n} mL` : `${n} mL`);
      return mcq(N, "Fluid balance", `Over 24 hours a patient takes ${ins[0]} mL of tea, ${ins[1]} mL of water and receives ${ins[2]} mL IV fluid. Output is ${outs[0]} mL urine and ${outs[1]} mL vomit. What is the fluid balance?`, s(bal),
        [s(-bal), s(inT + outT), s(inT - outs[0]), s(bal - 100), s(bal + 150)], `Input ${inT} mL − output ${outT} mL = ${s(bal)}.`, 1);
    }),
  );

  // Infusion duration
  qs.push(
    ...repeat(12, () => {
      const vol = pick([250, 500, 1000, 100]);
      const rate = pick([25, 50, 62.5, 75, 100, 125, 166.7, 200]);
      const hrs = vol / rate;
      if (!Number.isInteger(hrs * 4) || hrs > 24 || hrs < 1) return null;
      const h = Math.floor(hrs), m = Math.round((hrs - h) * 60);
      const label = (H: number, M: number) => `${H} hour${H === 1 ? "" : "s"}${M ? ` ${M} minutes` : ""}`;
      return mcq(N, "IV infusions", `An infusion of ${vol} mL is running at ${fmt(rate)} mL/hour. How long will it take?`, label(h, m),
        [label(h + 1, m), label(Math.max(0, h - 1), m || 30), label(h, m === 30 ? 0 : 30), label(h * 2, 0)], `Time = volume ÷ rate = ${vol} ÷ ${fmt(rate)} = ${hrs} hours${m ? ` = ${label(h, m)}` : ""}.`, 2);
    }),
  );

  // % solutions
  qs.push(
    ...repeat(10, () => {
      const pct = pick([0.9, 5, 10, 20, 50]);
      const vol = pick([100, 250, 500, 1000]);
      const g = round((pct * vol) / 100, 2);
      const name = pct === 0.9 ? "sodium chloride" : "glucose";
      return mcq(N, "Percentage solutions", `How many grams of ${name} are in ${vol} mL of ${name} ${pct}% w/v?`, `${fmt(g)} g`,
        unitOpts(g, [pct * vol, g * 10, g / 10, pct], "g"), `${pct}% w/v = ${pct} g per 100 mL. ${vol} mL contains ${pct} × ${vol / 100} = ${fmt(g)} g.`, 2);
    }),
  );

  // BMI
  qs.push(
    ...repeat(10, () => {
      const kg = ri(48, 120), m = pick([1.5, 1.55, 1.6, 1.65, 1.7, 1.75, 1.8, 1.85]);
      const bmi = round(kg / (m * m), 1);
      return mcq(N, "BMI", `Calculate the BMI of a patient weighing ${kg} kg who is ${m} m tall. (Round to 1 decimal place)`, fmt(bmi),
        numOpts(bmi, [round(kg / m, 1), round((kg / m) * 2, 1), round(bmi + 2, 1), round(bmi - 2.5, 1)]), `BMI = kg ÷ m² = ${kg} ÷ (${m} × ${m}) = ${fmt(bmi)}.`, 1);
    }),
  );

  return qs;
}

// ---------------------------------------------------------------------------
// Part B clinical
// ---------------------------------------------------------------------------
const CODE = "The Code & professionalism";
const SAFE = "Patient safety";
const IPC = "Infection prevention";
const DET = "Recognising deterioration";
const MED = "Medicines management";
const LAW = "Law, consent & safeguarding";
const CARE = "Fundamentals of care";
const EOL = "End of life & communication";

const CLIN: [string, string, string[], string, string][] = [
  // Code & professionalism
  ["What are the four themes of the NMC Code?", "Prioritise people, practise effectively, preserve safety, promote professionalism and trust", ["Care, compassion, competence, communication", "Assess, plan, implement, evaluate", "Respect, dignity, safety, honesty"], "The NMC Code (2015, updated 2018) is organised around these four themes.", CODE],
  ["How often must NMC registrants revalidate?", "Every three years", ["Every year", "Every five years", "Only when changing jobs"], "Revalidation is required every three years to stay on the register.", CODE],
  ["How many hours of continuing professional development (CPD) are required for NMC revalidation?", "35 hours, including 20 hours of participatory learning", ["20 hours, all self-directed", "50 hours", "10 hours a year"], "Revalidation also requires 450 practice hours, 5 pieces of feedback and 5 reflective accounts.", CODE],
  ["How many practice hours are required for nurse revalidation over three years?", "450 hours", ["150 hours", "750 hours", "1,000 hours"], "Dual registrants need 900 hours.", CODE],
  ["How many written reflective accounts are required for NMC revalidation?", "Five", ["Two", "Ten", "One"], "You also need a reflective discussion with another NMC registrant.", CODE],
  ["The professional duty of candour means a nurse must", "be open and honest with patients when something goes wrong with their care", ["report colleagues only to the police", "never discuss errors with patients", "only tell the family if asked"], "Apologise, explain and support the person when things go wrong.", CODE],
  ["A nurse is asked to carry out a task they are not competent to do. What should they do?", "Recognise the limits of their competence and seek help or training", ["Do it anyway to avoid delay", "Ask the patient to do it", "Watch a video and proceed"], "The Code requires you to practise within your competence.", CODE],
  ["When delegating a task to a healthcare assistant, the nurse remains", "accountable for the decision to delegate", ["free of any responsibility", "accountable only if the patient complains", "responsible only for paperwork"], "Delegate only to people competent to do the task, and supervise appropriately.", CODE],
  ["Which reflective model has the stages description, feelings, evaluation, analysis, conclusion and action plan?", "Gibbs' reflective cycle", ["Maslow's hierarchy", "Roper-Logan-Tierney model", "SBAR"], "Gibbs (1988) is widely used for NMC reflective accounts.", CODE],
  ["Which structured communication tool is commonly used to escalate concerns about a patient?", "SBAR — Situation, Background, Assessment, Recommendation", ["ABCDE", "PQRST", "SOAP only"], "SBAR helps hand over clear, concise information.", CODE],
  ["Posting a photo of a patient on social media without consent is", "a breach of confidentiality and the NMC Code", ["acceptable if the face is hidden", "acceptable on a private account", "acceptable if the patient has been discharged"], "Respect privacy and confidentiality at all times, including online.", CODE],
  ["Patient information should be shared", "only on a need-to-know basis, in line with confidentiality and data protection law", ["with anyone who asks politely", "with the patient's employer", "never, even with the care team"], "Caldicott principles guide the use of patient-identifiable information.", CODE],
  // Safety
  ["What is the first step in an ABCDE assessment?", "Airway", ["Breathing", "Circulation", "Disability"], "Assess Airway, Breathing, Circulation, Disability, Exposure in order.", SAFE],
  ["In the ABCDE approach, 'D' stands for", "Disability (neurological status, e.g. AVPU or GCS, and blood glucose)", ["Drugs", "Diet", "Dressing"], "Check consciousness level, pupils and blood glucose.", SAFE],
  ["What does AVPU stand for?", "Alert, Voice, Pain, Unresponsive", ["Airway, Ventilation, Pulse, Urine", "Assess, Verify, Plan, Update", "Awake, Vague, Pale, Unwell"], "A quick assessment of consciousness. NEWS2 uses ACVPU, adding new Confusion.", SAFE],
  ["What is the range of the Glasgow Coma Scale?", "3 to 15", ["0 to 10", "1 to 20", "0 to 15"], "The lowest possible score is 3; fully alert is 15.", SAFE],
  ["What are the components of the Glasgow Coma Scale?", "Eye opening, verbal response and motor response", ["Pulse, blood pressure and temperature", "Pupil size, colour and reaction", "Pain, mood and appetite"], "Eyes (1–4), Verbal (1–5), Motor (1–6).", SAFE],
  ["Which tool is used to assess a patient's risk of developing pressure ulcers?", "The Waterlow score (or Braden scale)", ["The MUST tool", "The Glasgow Coma Scale", "The Bristol Stool Chart"], "Risk assessment should be done on admission and reviewed regularly.", SAFE],
  ["A category 1 pressure ulcer is described as", "intact skin with non-blanchable redness", ["full-thickness tissue loss with exposed bone", "an open wound with slough", "a blister filled with blood only"], "Category 1 is the earliest stage; skin is unbroken.", SAFE],
  ["A pressure ulcer with full-thickness tissue loss and exposed bone, tendon or muscle is", "category 4", ["category 1", "category 2", "category 3"], "Category 4 is the most severe.", SAFE],
  ["What does the MUST tool screen for?", "Malnutrition", ["Falls risk", "Pressure ulcers", "Depression"], "Malnutrition Universal Screening Tool.", SAFE],
  ["Which chart is used to classify stool consistency?", "The Bristol Stool Chart", ["The Waterlow chart", "The NEWS2 chart", "The MUST chart"], "Types 1–7, from hard lumps to entirely liquid.", SAFE],
  ["When an adult patient falls on the ward, what should the nurse do first?", "Check the patient for injury before moving them", ["Help them straight back into bed", "Complete the incident form first", "Leave them until a doctor arrives"], "Assess for injury (including head injury and fractures) before moving.", SAFE],
  ["Which of these is a 'never event'?", "Administering a medicine by the wrong route, such as an oral medicine intravenously", ["A patient missing a meal", "A delayed discharge", "A minor documentation error"], "Never events are serious, wholly preventable incidents.", SAFE],
  ["Before a blood transfusion, patient identity is checked by", "asking the patient to state their full name and date of birth and matching it to the wristband and blood component", ["reading the bed number only", "asking 'Are you Mrs Smith?'", "checking the notes only"], "Positive patient identification at the bedside is essential.", SAFE],
  ["During a blood transfusion, the patient is most at risk of a severe reaction", "in the first 15 minutes", ["after 4 hours", "only at the end", "the next day"], "Monitor closely, with observations before, at 15 minutes and after.", SAFE],
  ["Which patient group needs a VTE risk assessment on admission?", "All adult inpatients", ["Only surgical patients", "Only patients over 80", "Only patients with cancer"], "NICE recommends VTE assessment for all adults admitted to hospital.", SAFE],
  // IPC
  ["What is the single most important measure to prevent healthcare-associated infection?", "Hand hygiene", ["Wearing gloves at all times", "Antibiotics", "Air fresheners"], "Clean hands at the right moments, with the right technique.", IPC],
  ["How many 'moments for hand hygiene' are described by the WHO?", "Five", ["Three", "Four", "Seven"], "Before patient contact, before aseptic task, after body fluid exposure, after patient contact, after touching surroundings.", IPC],
  ["Which hand hygiene method should be used when caring for a patient with Clostridioides difficile?", "Soap and water", ["Alcohol hand gel", "Wet wipes", "No hand hygiene if gloves were worn"], "Alcohol gel does not kill C. difficile spores.", IPC],
  ["In what order should PPE usually be removed?", "Gloves, apron, eye protection, mask", ["Mask, apron, gloves, eye protection", "Apron, mask, gloves, eye protection", "Eye protection, mask, gloves, apron"], "Remove the most contaminated items first, then clean hands.", IPC],
  ["What colour bag is commonly used for infectious clinical waste in the UK?", "Orange", ["Black", "Clear", "Blue"], "Follow local policy; black is for domestic waste.", IPC],
  ["Used needles should be", "disposed of immediately into a sharps bin at the point of use, without re-sheathing", ["re-sheathed and placed in a clinical waste bag", "left on the tray for later", "bent before disposal"], "Never re-sheath needles.", IPC],
  ["What should you do immediately after a needlestick injury?", "Encourage bleeding, wash with soap and running water, cover, and report", ["Suck the wound", "Scrub the area with a brush", "Ignore it if it looks minor"], "Report urgently for risk assessment and possible post-exposure prophylaxis.", IPC],
  ["A patient with suspected infectious diarrhoea should be", "isolated in a single room with en-suite or dedicated toilet", ["placed in a bay with others", "sent home immediately", "kept in the day room"], "Isolate promptly to prevent spread.", IPC],
  ["MRSA stands for", "Meticillin-resistant Staphylococcus aureus", ["Multi-resistant streptococcus A", "Meningitis-related staph aureus", "Mild respiratory syndrome A"], "MRSA screening is carried out on admission for many patient groups.", IPC],
  // Deterioration
  ["What does NEWS2 stand for?", "National Early Warning Score 2", ["Nursing Emergency Warning System 2", "New Escalation Workflow Score", "National Emergency Ward Standard"], "NEWS2 is the Royal College of Physicians' standard tool for adults.", DET],
  ["Which parameters make up NEWS2?", "Respiration rate, oxygen saturation, systolic blood pressure, pulse, level of consciousness or new confusion, and temperature", ["Pulse, pain and urine output only", "Blood glucose and weight", "GCS and pupil size only"], "A score is also added if the patient needs supplemental oxygen.", DET],
  ["A NEWS2 aggregate score of 7 or more should trigger", "an emergency response, with immediate assessment by a clinical team with critical care competencies", ["routine 12-hourly observations", "observations once a day", "discharge planning"], "7+ is a high clinical risk.", DET],
  ["A NEWS2 aggregate score of 5 or more should trigger", "an urgent response and review by a clinician competent in assessing acutely ill patients", ["no change in care", "observations once a day", "immediate discharge"], "5–6 is medium clinical risk.", DET],
  ["A score of 3 in any single NEWS2 parameter should prompt", "an urgent ward-based review", ["no action", "discharge", "observations once a week"], "A single red score signals possible serious deterioration.", DET],
  ["What is a normal adult respiratory rate?", "12–20 breaths per minute", ["4–8 breaths per minute", "25–35 breaths per minute", "40–60 breaths per minute"], "In NEWS2, 12–20 scores 0.", DET],
  ["For most adults (NEWS2 scale 1), which oxygen saturation scores 0?", "96% or above", ["88–92%", "90% or above", "100% only"], "Scale 2 (88–92% target) is used for some patients with hypercapnic respiratory failure.", DET],
  ["The 'Sepsis Six' includes", "giving oxygen, taking blood cultures, giving IV antibiotics, giving IV fluids, measuring lactate and monitoring urine output", ["giving paracetamol only", "waiting 24 hours for results", "isolating the patient only"], "Deliver within one hour for suspected sepsis with red flags.", DET],
  ["What is the first-line treatment for anaphylaxis in an adult?", "Intramuscular adrenaline 500 micrograms (0.5 mL of 1 in 1,000)", ["Oral antihistamine only", "IV paracetamol", "Nebulised salbutamol only"], "Give IM adrenaline into the anterolateral thigh; repeat after 5 minutes if needed.", DET],
  ["For adult CPR, what is the ratio of chest compressions to rescue breaths?", "30:2", ["15:2", "5:1", "30:1"], "Resuscitation Council UK guidance.", DET],
  ["What is the recommended depth of chest compressions in adult CPR?", "5–6 cm", ["1–2 cm", "8–10 cm", "3 cm"], "At a rate of 100–120 compressions per minute.", DET],
  ["What is the recommended rate of chest compressions in adult CPR?", "100–120 per minute", ["60–80 per minute", "140–160 per minute", "30 per minute"], "Allow full chest recoil between compressions.", DET],
  ["Hypoglycaemia in adults is generally defined as a blood glucose below", "4 mmol/L", ["7 mmol/L", "10 mmol/L", "2 mmol/L only"], "'Four is the floor.'", DET],
  ["What is the first treatment for a conscious adult with hypoglycaemia who can swallow?", "15–20 g of quick-acting carbohydrate, then recheck glucose after 10–15 minutes", ["Insulin", "A large meal immediately", "Nothing until the doctor arrives"], "Follow with a longer-acting carbohydrate once glucose is above 4 mmol/L.", DET],
  ["A patient with chest pain becomes unresponsive and is not breathing normally. What should the nurse do first?", "Call for help and the resuscitation team, then start CPR", ["Take a full set of observations", "Give oral aspirin", "Wait for the doctor"], "Early CPR and defibrillation save lives.", DET],
  ["Urine output below what level may indicate acute kidney injury in an adult?", "Less than 0.5 mL/kg/hour", ["Less than 5 mL/kg/hour", "More than 1 L a day", "Less than 2 mL/kg/hour"], "Persistently low urine output needs escalation.", DET],
  // Medicines
  ["Controlled drugs administered on a hospital ward should be", "checked and signed for by two registered professionals (per local policy) and recorded in the controlled drug register", ["given by any staff member without records", "recorded only in the patient's notes", "signed by the patient"], "Controlled drugs have strict storage and record-keeping requirements.", MED],
  ["Where should controlled drugs be stored on a ward?", "In a locked controlled drug cupboard that meets legal requirements", ["In the patient's bedside locker", "In the ward fridge with food", "In an unlocked trolley"], "Keys are held by the nurse in charge.", MED],
  ["Before giving a medicine, the nurse should check", "the right patient, drug, dose, route and time, plus allergies and the prescription's validity", ["only the drug name", "only that the patient is awake", "only the ward round notes"], "Follow the 'rights' of medicines administration.", MED],
  ["A patient refuses their prescribed medicine. What should the nurse do?", "Respect the decision, explore the reasons, document it and inform the prescriber", ["Hide it in their food", "Force them to take it", "Give it later without telling them"], "Covert administration is only permitted in specific circumstances under the Mental Capacity Act with proper process.", MED],
  ["A nurse discovers they have given a medicine to the wrong patient. What should they do first?", "Check the patient's condition and inform the doctor immediately, then report the incident", ["Say nothing if the patient seems fine", "Wait until the end of the shift", "Ask the patient to keep it quiet"], "Patient safety first, then be open and honest (duty of candour).", MED],
  ["Which route gives the fastest onset of action?", "Intravenous", ["Oral", "Subcutaneous", "Topical"], "IV medicines go directly into the bloodstream.", MED],
  ["A patient on warfarin needs regular monitoring of their", "INR", ["blood glucose", "potassium only", "cholesterol"], "The International Normalised Ratio measures clotting.", MED],
  ["What is the antidote for opioid overdose?", "Naloxone", ["Flumazenil", "Atropine", "Vitamin K"], "Naloxone reverses opioid-induced respiratory depression.", MED],
  ["Which vitamin is used to reverse the effect of warfarin?", "Vitamin K", ["Vitamin C", "Vitamin B12", "Vitamin D"], "Vitamin K (phytomenadione) is given as directed.", MED],
  ["Which of these is a common side effect of opioids?", "Constipation", ["Diarrhoea", "Hyperactivity", "High blood pressure"], "Laxatives are often prescribed alongside regular opioids.", MED],
  ["Before giving digoxin, the nurse should check the patient's", "apical pulse rate", ["temperature", "weight only", "blood glucose"], "Withhold and inform the prescriber if the pulse is below the set threshold.", MED],
  // Law, consent, safeguarding
  ["What is the first principle of the Mental Capacity Act 2005?", "A person must be assumed to have capacity unless it is established that they lack it", ["Anyone over 65 lacks capacity", "Family members always decide", "Doctors decide for everyone"], "Capacity is decision-specific and time-specific.", LAW],
  ["Under the Mental Capacity Act, an unwise decision", "does not on its own mean a person lacks capacity", ["proves the person lacks capacity", "must be overruled by the nurse", "must be reported to the police"], "People have the right to make decisions others disagree with.", LAW],
  ["Decisions made for a person who lacks capacity must be", "in their best interests and the least restrictive option", ["whatever is quickest for staff", "whatever the family prefers", "made by the most senior nurse alone"], "These are core MCA principles.", LAW],
  ["For consent to be valid, it must be", "voluntary, informed, and given by a person with capacity", ["written in every case", "given by the next of kin", "given after the procedure"], "Consent can be verbal, written or implied depending on the situation.", LAW],
  ["Can a patient with capacity withdraw consent during a procedure?", "Yes, at any time", ["No, once given it is final", "Only with a doctor's permission", "Only if it is in writing"], "Stop if safe and discuss with the patient.", LAW],
  ["Which section of the Mental Health Act 1983 allows detention for assessment for up to 28 days?", "Section 2", ["Section 3", "Section 5(2)", "Section 136"], "Section 3 is for treatment and lasts up to 6 months initially.", LAW],
  ["Section 5(4) of the Mental Health Act allows a registered mental health or learning disability nurse to hold an informal inpatient for up to", "6 hours", ["72 hours", "28 days", "1 hour"], "Doctors' holding power under Section 5(2) is up to 72 hours.", LAW],
  ["Which of these is a category of abuse in adult safeguarding?", "Financial or material abuse", ["Loud talking", "Refusing a meal once", "Being visited by family"], "Others include physical, sexual, psychological, neglect, discriminatory, organisational, domestic abuse, modern slavery and self-neglect.", LAW],
  ["If a patient discloses abuse to a nurse, the nurse should", "listen, reassure, not promise to keep it secret, and report it through safeguarding procedures", ["promise to keep it confidential", "confront the alleged abuser", "investigate it themselves"], "Safeguarding is everyone's responsibility.", LAW],
  ["Which law protects patients' personal data in the UK?", "The UK GDPR and Data Protection Act 2018", ["The Equality Act 2010", "The Health and Safety at Work Act 1974", "The Mental Health Act 1983"], "Handle personal data lawfully, securely and only as needed.", LAW],
  ["A Lasting Power of Attorney for health and welfare allows", "a named person to make health decisions for someone if they lose capacity", ["any relative to make all decisions", "nurses to override the patient", "the GP to manage the patient's money"], "It must be registered with the Office of the Public Guardian.", LAW],
  ["What is the purpose of a DNACPR decision?", "To record that CPR should not be attempted if the patient's heart or breathing stops", ["To stop all treatment", "To stop the patient eating", "To prevent any medicines being given"], "DNACPR applies only to CPR; other care continues.", LAW],
  // Fundamentals of care
  ["Which model of nursing is based on 12 activities of living?", "Roper-Logan-Tierney", ["Orem's self-care model", "Gibbs' cycle", "Maslow's hierarchy"], "Activities include breathing, eating and drinking, mobilising and sleeping.", CARE],
  ["The nursing process is often summarised as", "Assess, Plan, Implement, Evaluate (APIE)", ["Ask, Prescribe, Inform, Exit", "Airway, Pulse, Intake, Exposure", "Admit, Prepare, Inspect, Escort"], "APIE is used throughout the NMC Test of Competence.", CARE],
  ["According to Maslow's hierarchy, which needs must be met first?", "Physiological needs such as food, water and breathing", ["Self-actualisation", "Esteem", "Belonging"], "Basic needs come before higher-level needs.", CARE],
  ["How often should a patient at high risk of pressure ulcers usually be repositioned?", "Regularly according to their risk assessment and care plan, often every 2–4 hours", ["Once a day", "Only when they ask", "Never at night"], "Frequency depends on risk, skin inspection and support surface.", CARE],
  ["Before inserting a urinary catheter, the nurse must", "gain consent and use an aseptic technique", ["use a clean technique without gloves", "insert it without explanation", "ask the patient to self-catheterise"], "Catheters are a major source of healthcare-associated infection.", CARE],
  ["Which pain assessment tool uses a scale from 0 (no pain) to 10 (worst pain)?", "Numerical rating scale", ["Glasgow Coma Scale", "Waterlow score", "Bristol Stool Chart"], "The Abbey pain scale may be used for people who cannot verbalise pain.", CARE],
  ["Which tool helps assess pain in people with dementia who cannot verbalise it?", "The Abbey pain scale", ["The numerical rating scale", "The MUST tool", "The AVPU scale"], "It looks at expressions, behaviour and physical signs.", CARE],
  ["Before a patient with dysphagia eats, the nurse should", "follow the speech and language therapy plan for food and fluid textures and position them upright", ["give thin fluids quickly", "lie them flat", "skip the meal"], "This reduces the risk of aspiration.", CARE],
  ["Which of these is a sign of dehydration?", "Dark, concentrated urine", ["Pale, plentiful urine", "Moist mucous membranes", "Weight gain"], "Other signs include thirst, dizziness and dry mouth.", CARE],
  ["What does 'person-centred care' mean?", "Care that is planned around the individual's needs, preferences and values", ["Care organised around the staff rota", "Care identical for all patients", "Care led only by the doctor"], "Involve people in decisions about their care.", CARE],
  ["Which of these helps reduce delirium in older patients?", "Good hydration, orientation cues, sleep and mobility", ["Frequent bed moves", "Keeping lights on all night", "Removing glasses and hearing aids"], "Delirium is common, serious and often preventable.", CARE],
  ["What is the main purpose of a care plan?", "To set out individual goals and the care needed to meet them", ["To record staff breaks", "To replace consent", "To list ward rules"], "Care plans should be evaluated and updated regularly.", CARE],
  // End of life & communication
  ["Which of these is a recognised principle of good end-of-life care?", "Managing symptoms and respecting the person's wishes and preferred place of care", ["Stopping all communication with family", "Withholding pain relief", "Moving the person frequently between wards"], "Advance care planning helps record preferences.", EOL],
  ["A common symptom in the last days of life caused by secretions in the airway is sometimes called", "a 'death rattle' (noisy respiratory secretions)", ["Cheyne-Stokes breathing", "stridor", "wheeze"], "Repositioning and medicines may help; explain to the family.", EOL],
  ["When breaking bad news, the nurse should", "use a private space, check understanding, give information in small amounts and allow time for questions", ["give all the facts quickly in a corridor", "avoid answering questions", "use medical jargon"], "Frameworks such as SPIKES can help.", EOL],
  ["A patient who speaks little English needs to give consent for a procedure. What should the nurse arrange?", "A professional interpreter", ["A family member, including a child, to interpret", "Hand gestures only", "Proceed without consent"], "Professional interpreters ensure accuracy and confidentiality.", EOL],
  ["Which is an example of open questioning?", "'How have you been feeling since your operation?'", ["'Are you in pain?'", "'Did you sleep well?'", "'Is your name John?'"], "Open questions invite fuller answers.", EOL],
  ["A patient becomes angry and shouts at the nurse. What is the best first response?", "Stay calm, listen, acknowledge their feelings and keep yourself safe", ["Shout back", "Walk away without explanation", "Call security immediately in every case"], "De-escalation techniques reduce conflict.", EOL],
];

export function nmcClinical(): Q[] {
  const qs: Q[] = CLIN.map(([b, c, d, e, t]) => mcq(C, t, b, c, d, e, 2));

  // NEWS2 single-parameter checks (Royal College of Physicians NEWS2 chart, scale 1)
  const RR: [number, number][] = [[7, 3], [10, 1], [16, 0], [22, 2], [27, 3]];
  const HR: [number, number][] = [[38, 3], [45, 1], [75, 0], [95, 1], [118, 2], [135, 3]];
  const SBP: [number, number][] = [[88, 3], [95, 2], [105, 1], [130, 0], [225, 3]];
  const TEMP: [number, number][] = [[34.8, 3], [35.5, 1], [37.0, 0], [38.5, 1], [39.5, 2]];
  const ask = (label: string, unit: string, rows: [number, number][], expl: string) =>
    rows.map(([v, sc]) =>
      mcq(C, DET, `Using NEWS2, what score is given for a ${label} of ${v}${unit}?`, String(sc), ["0", "1", "2", "3"].filter((x) => x !== String(sc)), expl, 2),
    );
  qs.push(
    ...ask("respiration rate", " breaths/min", RR, "NEWS2 respiration: ≤8 = 3, 9–11 = 1, 12–20 = 0, 21–24 = 2, ≥25 = 3."),
    ...ask("pulse", " beats/min", HR, "NEWS2 pulse: ≤40 = 3, 41–50 = 1, 51–90 = 0, 91–110 = 1, 111–130 = 2, ≥131 = 3."),
    ...ask("systolic blood pressure", " mmHg", SBP, "NEWS2 systolic BP: ≤90 = 3, 91–100 = 2, 101–110 = 1, 111–219 = 0, ≥220 = 3."),
    ...ask("temperature", " °C", TEMP, "NEWS2 temperature: ≤35.0 = 3, 35.1–36.0 = 1, 36.1–38.0 = 0, 38.1–39.0 = 1, ≥39.1 = 2."),
  );

  // True / false
  const TF: [string, boolean, string, string][] = [
    ["Alcohol hand gel is effective against Clostridioides difficile spores.", false, "Use soap and water.", IPC],
    ["A patient must be assumed to have capacity unless it is shown otherwise.", true, "First principle of the Mental Capacity Act 2005.", LAW],
    ["Needles should be re-sheathed before disposal.", false, "Never re-sheath; dispose at the point of use.", IPC],
    ["NMC revalidation is required every three years.", true, "Including practice hours, CPD, feedback and reflection.", CODE],
    ["A NEWS2 score of 7 or more needs an emergency response.", true, "High clinical risk.", DET],
    ["An unwise decision proves a person lacks capacity.", false, "People can make decisions others think unwise.", LAW],
    ["The adult CPR ratio is 15 compressions to 2 breaths.", false, "It is 30:2 for adults.", DET],
    ["A DNACPR decision means all treatment should stop.", false, "It applies to CPR only.", LAW],
    ["Family members, including children, are ideal interpreters for consent discussions.", false, "Use a professional interpreter.", EOL],
    ["Hypoglycaemia is generally a blood glucose below 4 mmol/L.", true, "'Four is the floor.'", DET],
  ];
  qs.push(...TF.map(([s, t, e, topic]) => mcq(C, topic, `TRUE or FALSE? "${s}"`, t ? "True" : "False", [t ? "False" : "True"], e, 1, 2)));
  return qs;
}
