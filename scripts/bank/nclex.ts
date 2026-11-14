// NCLEX-RN style practice (NCX) — original single-best-answer items organised by NCLEX client-needs categories,
// plus computed dosage calculations. US units. Have a US-licensed RN review before marketing heavily.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

const S = "NCX";
const MOC = "Management of Care", SIC = "Safety and Infection Control", HPM = "Health Promotion and Maintenance", PSY = "Psychosocial Integrity";
const BCC = "Basic Care and Comfort", PHA = "Pharmacological and Parenteral Therapies", RRP = "Reduction of Risk Potential", PAD = "Physiological Adaptation";
type F = [string, string, string, string[], string];

const ITEMS: F[] = [
  // Management of care — prioritisation & delegation
  [MOC, "The nurse receives report on four clients. Which client should the nurse see FIRST?", "A client with asthma who has new audible wheezing and an oxygen saturation of 88%", ["A client 2 days post-appendectomy asking for pain medication", "A client with diabetes whose breakfast tray has arrived", "A client awaiting discharge teaching"], "Airway and breathing problems come first (ABCs)."],
  [MOC, "Which task can the RN safely delegate to unlicensed assistive personnel (UAP)?", "Measuring vital signs on a stable client", ["Assessing a new admission", "Teaching a client to self-inject insulin", "Evaluating a client's response to pain medication"], "Assessment, teaching and evaluation stay with the RN; routine tasks on stable clients can be delegated."],
  [MOC, "Which client is most appropriate to assign to an LPN/LVN?", "A client with stable type 2 diabetes who needs scheduled oral medications", ["A client newly admitted with chest pain", "A client receiving a first blood transfusion", "A client 1 hour after cardiac catheterisation with unstable vital signs"], "LPNs care for stable clients with predictable outcomes."],
  [MOC, "A client refuses a prescribed medication. What should the nurse do FIRST?", "Explore the client's reasons for refusing", ["Give the medication anyway", "Document refusal and leave", "Hide the medication in food"], "Respect autonomy and find out why; then inform the provider and document."],
  [MOC, "Who is responsible for obtaining informed consent for surgery?", "The surgeon (provider performing the procedure)", ["The nurse", "The anaesthetist only", "The client's family"], "The nurse may witness the signature and confirm understanding."],
  [MOC, "Before surgery, a client says, 'I don't really understand what they're going to do.' What is the nurse's best action?", "Notify the surgeon before the consent form is signed", ["Explain the surgery in detail and have the client sign", "Proceed because the form is already signed", "Ask the family to sign instead"], "Consent must be informed; the provider must explain the procedure."],
  [MOC, "During a disaster triage, which client is tagged red (immediate)?", "A client with a tension pneumothorax", ["A client with a sprained ankle", "A client who is not breathing after the airway is opened", "A client with a minor laceration"], "Red = life-threatening but survivable with immediate care; black = expectant/deceased."],
  [MOC, "A nurse sees a colleague take a client's opioid for personal use. What should the nurse do?", "Report it to the nurse manager according to policy", ["Ignore it to avoid conflict", "Confront the colleague in front of clients", "Post about it on social media"], "Impaired practice must be reported to protect clients."],
  [MOC, "Which action protects client confidentiality?", "Logging out of the electronic record when leaving the workstation", ["Discussing the client in the lift", "Sharing passwords with trusted colleagues", "Giving results to a caller claiming to be family"], "HIPAA requires protecting health information."],
  [MOC, "The nurse makes a medication error. What should the nurse do FIRST?", "Assess the client", ["Complete an incident report", "Call the pharmacy", "Inform the client's family"], "Client safety comes first; then notify the provider and document per policy."],
  [MOC, "An incident (occurrence) report should be", "completed but not mentioned in the client's medical record", ["placed in the client's chart", "completed only if the client is harmed", "given to the client"], "It is a quality-improvement document."],
  [MOC, "A client with an advance directive stating 'no resuscitation' goes into cardiac arrest. What should the nurse do?", "Follow the valid DNR order and not start CPR", ["Start CPR until the family arrives", "Call a rapid response anyway", "Give epinephrine only"], "A valid DNR/advance directive must be honoured."],
  // Safety & infection control
  [SIC, "Which precautions are required for a client with pulmonary tuberculosis?", "Airborne precautions with an N95 respirator and a negative-pressure room", ["Droplet precautions with a surgical mask", "Contact precautions only", "Standard precautions only"], "TB, measles and varicella need airborne precautions."],
  [SIC, "Which precautions are required for a client with influenza?", "Droplet precautions", ["Airborne precautions", "Contact precautions only", "Protective (neutropenic) precautions"], "Droplet: influenza, pertussis, meningococcal infection; wear a surgical mask within about 3–6 feet."],
  [SIC, "Which precautions are required for a client with Clostridioides difficile?", "Contact precautions and handwashing with soap and water", ["Alcohol hand rub only", "Airborne precautions", "Droplet precautions"], "Alcohol does not kill C. diff spores."],
  [SIC, "What is the correct order for removing PPE?", "Gloves, goggles/face shield, gown, mask/respirator", ["Mask, gown, gloves, goggles", "Gown, gloves, mask, goggles", "Goggles, mask, gloves, gown"], "Remove the most contaminated items first; remove the mask last, outside the room."],
  [SIC, "A client is at risk of falling. Which intervention is most appropriate?", "Keep the bed in the lowest position with the call light within reach", ["Apply wrist restraints", "Raise all four side rails", "Keep the room dark at night"], "Four side rails count as a restraint and can increase injury."],
  [SIC, "How often must a client in restraints be assessed (circulation, skin, needs)?", "At least every 2 hours (per policy, often more frequently)", ["Every 8 hours", "Once a shift", "Only when the client asks"], "Restraints need a provider order and frequent monitoring."],
  [SIC, "A fire starts in a client's room. What should the nurse do FIRST?", "Rescue the client", ["Pull the alarm", "Use the extinguisher", "Close all doors"], "RACE: Rescue, Alarm, Contain, Extinguish."],
  [SIC, "How should a fire extinguisher be used?", "PASS: pull the pin, aim at the base, squeeze, sweep", ["Aim at the top of the flames", "Spray in short bursts at the smoke", "Shake it, then spray upwards"], "Aim at the base of the fire."],
  [SIC, "A client with neutropenia should be placed on", "protective (neutropenic) precautions", ["airborne precautions", "contact precautions", "seizure precautions"], "Avoid fresh flowers, raw foods and sick visitors."],
  [SIC, "Which is the most effective way to prevent the spread of infection?", "Hand hygiene", ["Wearing gloves at all times", "Antibiotics for every client", "Single rooms for everyone"], "Clean hands before and after every client contact."],
  [SIC, "How should a nurse dispose of a used needle?", "Place it uncapped into a sharps container immediately", ["Recap it with two hands", "Bend it before disposal", "Put it in the general waste"], "Never recap used needles with two hands."],
  // Health promotion
  [HPM, "At what age should an infant double their birth weight?", "About 5–6 months", ["2 months", "12 months", "18 months"], "Birth weight roughly triples by 12 months."],
  [HPM, "A 9-month-old should be able to", "sit without support", ["walk alone", "speak in sentences", "ride a tricycle"], "Walking usually begins around 12 months."],
  [HPM, "When does the posterior fontanelle usually close?", "By 2–3 months", ["By 12–18 months", "At birth", "At 3 years"], "The anterior fontanelle closes by 12–18 months."],
  [HPM, "What is the normal fetal heart rate?", "110–160 beats per minute", ["60–100 beats per minute", "160–200 beats per minute", "80–120 beats per minute"], "Sustained rates outside this range need evaluation."],
  [HPM, "Late decelerations on a fetal monitor indicate", "uteroplacental insufficiency", ["head compression", "cord compression only", "a normal pattern"], "VEAL CHOP: variable–cord, early–head, accelerations–OK, late–placental insufficiency."],
  [HPM, "For late decelerations, what should the nurse do FIRST?", "Turn the client onto her left side", ["Increase the oxytocin infusion", "Encourage pushing", "Document and continue to monitor"], "Then stop oxytocin, give oxygen, increase IV fluids and notify the provider."],
  [HPM, "Which finding in a postpartum client requires immediate action?", "A boggy uterus with heavy bleeding", ["Lochia rubra on day 1", "A firm fundus at the umbilicus on day 1", "Mild afterpains while breastfeeding"], "Massage the fundus — uterine atony is the leading cause of postpartum haemorrhage."],
  [HPM, "Folic acid before and during early pregnancy reduces the risk of", "neural tube defects", ["gestational diabetes", "pre-eclampsia", "Down syndrome"], "Usually 400 micrograms a day."],
  [HPM, "Which vaccine should NOT be given during pregnancy?", "MMR (live vaccine)", ["Tdap", "Inactivated influenza", "COVID-19 (mRNA)"], "Live vaccines are avoided in pregnancy."],
  [HPM, "A client is taught breast self-awareness. Which change should be reported?", "A new lump, dimpling or nipple discharge", ["Tenderness before a period", "Symmetrical breasts", "No change since last month"], "New changes need evaluation."],
  // Psychosocial
  [PSY, "A client says, 'I feel like a failure.' Which response is most therapeutic?", "'Tell me more about feeling like a failure.'", ["'You shouldn't feel that way.'", "'Everyone feels like that sometimes.'", "'Why do you feel like that?'"], "Open-ended exploring; avoid 'why' questions and false reassurance."],
  [PSY, "A client with depression suddenly seems calm and gives away belongings. What should the nurse suspect?", "Increased suicide risk", ["Recovery from depression", "Medication side effects", "Mania"], "Ask directly about suicidal thoughts and maintain safety."],
  [PSY, "Which is the most appropriate first question when assessing suicide risk?", "'Are you thinking about killing yourself?'", ["'You're not thinking of doing anything silly, are you?'", "'Why are you so sad?'", "'Shall I call your family?'"], "Ask directly and clearly; it does not increase risk."],
  [PSY, "A client is having a panic attack. What is the nurse's priority?", "Stay with the client and speak calmly in short sentences", ["Teach relaxation techniques in detail", "Leave the client alone to calm down", "Explore the cause of the anxiety"], "Severe anxiety limits learning; ensure safety first."],
  [PSY, "A client in alcohol withdrawal is at greatest risk of which complication about 48–72 hours after the last drink?", "Delirium tremens and seizures", ["Wernicke's encephalopathy only", "Hypertension only", "Hypoglycaemia only"], "Monitor closely; benzodiazepines are commonly used."],
  [PSY, "Which response best addresses a client with schizophrenia who reports hearing voices?", "'I don't hear the voices, but I understand they're real to you. What are they saying?'", ["'The voices aren't real.'", "'What do the voices look like?'", "Ignore the comment"], "Acknowledge feelings, present reality and assess for command hallucinations."],
  [PSY, "A client with anorexia nervosa — which finding is the greatest immediate concern?", "A potassium level of 2.8 mEq/L", ["Lanugo hair growth", "Amenorrhoea", "Preoccupation with food"], "Hypokalaemia can cause fatal arrhythmias."],
  [PSY, "Which of the following is a sign of elder abuse that the nurse must report?", "Unexplained bruises in different stages of healing", ["Wrinkled skin", "Mild forgetfulness", "Preference for routine"], "Nurses are mandatory reporters."],
  [PSY, "The stages of grief described by Kübler-Ross begin with", "denial", ["acceptance", "bargaining", "depression"], "Denial, anger, bargaining, depression, acceptance — not always in order."],
  // Basic care & comfort
  [BCC, "Which position is best for a client with dyspnoea?", "High Fowler's", ["Supine", "Trendelenburg", "Prone"], "Sitting upright helps lung expansion."],
  [BCC, "How should a client with a right-sided weakness use a cane?", "Hold it in the left hand and move it with the right leg", ["Hold it in the right hand", "Move it with the left leg", "Use it only on stairs"], "Hold the cane on the strong side."],
  [BCC, "When climbing stairs with crutches, the client should lead with", "the unaffected (good) leg", ["the affected leg", "the crutches", "either leg"], "'Up with the good, down with the bad.'"],
  [BCC, "Which action best prevents pressure injuries in an immobile client?", "Repositioning at least every 2 hours", ["Massaging reddened bony areas", "Keeping the head of the bed at 60°", "Using a donut cushion"], "Don't massage reddened areas or use donut rings."],
  [BCC, "A client receiving enteral tube feeding should be positioned", "with the head of the bed raised at least 30–45°", ["flat", "in Trendelenburg", "on the left side flat"], "Reduces aspiration risk."],
  [BCC, "Which is a non-pharmacological pain relief measure?", "Applying cold or heat as appropriate and distraction", ["Increasing opioid dose", "Withholding fluids", "Bed rest only"], "Combine with medication as prescribed."],
  [BCC, "What is the priority before giving a client a meal after a stroke?", "Check the swallow assessment / screen for dysphagia", ["Encourage drinking with a straw", "Lay the client flat", "Give thin liquids first"], "Aspiration risk is high after stroke."],
  // Pharmacology
  [PHA, "What is the antidote for heparin?", "Protamine sulfate", ["Vitamin K", "Naloxone", "Flumazenil"], "Vitamin K reverses warfarin."],
  [PHA, "What is the antidote for warfarin?", "Vitamin K (phytonadione)", ["Protamine sulfate", "Atropine", "Acetylcysteine"], "Monitor INR."],
  [PHA, "What is the antidote for opioid overdose?", "Naloxone", ["Flumazenil", "Protamine", "Digoxin immune fab"], "Watch for return of respiratory depression."],
  [PHA, "What is the antidote for benzodiazepine overdose?", "Flumazenil", ["Naloxone", "Atropine", "Glucagon"], "Use cautiously — it can cause seizures."],
  [PHA, "What is the antidote for acetaminophen overdose?", "Acetylcysteine", ["Naloxone", "Vitamin K", "Activated charcoal only"], "It protects the liver."],
  [PHA, "Before giving digoxin, the nurse should check the apical pulse. Hold the dose if it is below", "60 beats per minute (adult)", ["100 beats per minute", "40 beats per minute", "80 beats per minute"], "Also watch for toxicity: nausea, visual changes (yellow/green halos)."],
  [PHA, "Which lab value is most important to check before giving furosemide?", "Potassium", ["Calcium", "Glucose", "Haemoglobin"], "Loop diuretics cause hypokalaemia."],
  [PHA, "Which food should a client taking warfarin keep consistent rather than suddenly increase?", "Green leafy vegetables (vitamin K)", ["Bananas", "Bread", "Chicken"], "Sudden changes alter INR."],
  [PHA, "A client taking an ACE inhibitor (e.g. lisinopril) reports a persistent dry cough. This is", "a common side effect to report to the provider", ["a sign of overdose", "an allergic emergency", "expected and harmless — no action needed"], "Swelling of the face or tongue (angioedema) is an emergency."],
  [PHA, "Which insulin is rapid-acting?", "Insulin lispro", ["NPH insulin", "Insulin glargine", "Regular insulin"], "Rapid-acting insulin is given with meals."],
  [PHA, "Insulin glargine is", "a long-acting basal insulin with no pronounced peak", ["rapid-acting", "given only IV", "mixed with other insulins in the same syringe"], "Do not mix glargine with other insulins."],
  [PHA, "When mixing regular and NPH insulin in one syringe, the nurse draws up", "regular (clear) insulin first", ["NPH (cloudy) first", "either first", "them in separate syringes only"], "'Clear before cloudy.'"],
  [PHA, "A client on lithium should have levels monitored because", "the therapeutic range is narrow and toxicity is dangerous", ["it causes hyperglycaemia", "it is addictive", "it is only given IV"], "Maintain normal sodium and fluid intake."],
  [PHA, "Which symptom suggests a transfusion reaction?", "Fever, chills and back pain shortly after starting the transfusion", ["Mild hunger", "Sleepiness after 4 hours", "Warm hands"], "Stop the transfusion, keep the IV open with saline and notify the provider."],
  [PHA, "Which IV solution is isotonic?", "0.9% sodium chloride", ["0.45% sodium chloride", "3% sodium chloride", "D10W"], "Lactated Ringer's is also isotonic."],
  [PHA, "Potassium chloride must NEVER be given", "as an IV push", ["diluted in IV fluid", "orally", "with food"], "IV push potassium can cause fatal cardiac arrest."],
  [PHA, "A client receiving vancomycin has a 'red man' (vancomycin flushing) reaction. What should the nurse do?", "Stop or slow the infusion and notify the provider", ["Speed up the infusion", "Give the dose as IV push", "Ignore it — it's expected"], "It is related to rapid infusion."],
  [PHA, "Which instruction is correct for a client taking alendronate?", "Take it with a full glass of water and stay upright for 30 minutes", ["Take it with breakfast", "Lie down after taking it", "Take it with milk"], "Reduces the risk of oesophageal irritation."],
  [PHA, "Which finding is a sign of hypoglycaemia?", "Shakiness, sweating and confusion", ["Hot, dry skin", "Fruity breath", "Polyuria"], "Give 15 g of fast-acting carbohydrate if the client is conscious."],
  // Reduction of risk potential (lab values & complications)
  [RRP, "What is the normal adult serum potassium range?", "3.5–5.0 mEq/L", ["135–145 mEq/L", "8.5–10.5 mg/dL", "1.5–2.5 mEq/L"], "Sodium is 135–145 mEq/L."],
  [RRP, "What is the normal adult serum sodium range?", "135–145 mEq/L", ["3.5–5.0 mEq/L", "95–105 mEq/L", "150–160 mEq/L"], "Hyponatraemia can cause confusion and seizures."],
  [RRP, "What is a typical therapeutic INR target for a client on warfarin for atrial fibrillation?", "2.0–3.0", ["0.8–1.1", "4.0–5.0", "1.0–1.5"], "Normal without anticoagulation is about 0.8–1.1."],
  [RRP, "Which finding after a thyroidectomy needs immediate action?", "Stridor and difficulty breathing", ["Mild sore throat", "Hoarse voice for a day", "Neck incision pain"], "May indicate airway compromise or haematoma."],
  [RRP, "After a cardiac catheterisation via the femoral artery, the nurse should", "check the insertion site and distal pulses and keep the leg straight", ["get the client walking immediately", "apply heat to the site", "elevate the head of the bed to 90°"], "Watch for bleeding and loss of circulation."],
  [RRP, "Which finding suggests a client has developed a deep vein thrombosis?", "Unilateral calf swelling, warmth and redness", ["Bilateral ankle oedema at the end of the day", "Cold, pale feet", "Itchy skin"], "Report — risk of pulmonary embolism."],
  [RRP, "A client suddenly develops dyspnoea, chest pain and tachycardia after surgery. The nurse suspects", "pulmonary embolism", ["atelectasis only", "anxiety", "pneumonia"], "Raise the head of the bed, give oxygen and call the rapid response team."],
  [RRP, "Which is the priority after a client returns from a bronchoscopy?", "Check the gag reflex before giving food or fluids", ["Encourage fluids immediately", "Lay flat for 24 hours", "Give a heavy meal"], "The throat is anaesthetised."],
  [RRP, "What does a hemoglobin A1c measure?", "Average blood glucose over about 2–3 months", ["Today's fasting glucose", "Kidney function", "Cholesterol"], "A target for many adults with diabetes is below 7%."],
  [RRP, "Peaked T waves on an ECG suggest", "hyperkalaemia", ["hypokalaemia", "hypercalcaemia", "hyponatraemia"], "Hypokalaemia may show U waves and flattened T waves."],
  // Physiological adaptation
  [PAD, "Which ECG rhythm needs immediate defibrillation?", "Ventricular fibrillation", ["Sinus bradycardia", "Atrial fibrillation with a controlled rate", "Normal sinus rhythm"], "Also pulseless ventricular tachycardia."],
  [PAD, "What are the signs of increased intracranial pressure?", "Decreasing level of consciousness, headache and vomiting", ["Increased alertness", "Low blood pressure and fast pulse", "Constricted pupils only"], "Cushing's triad (late): hypertension with widening pulse pressure, bradycardia, irregular breathing."],
  [PAD, "A client with burns to the entire right arm and the front of the trunk. Using the rule of nines, what percentage is burned?", "27%", ["18%", "36%", "9%"], "Arm 9% + anterior trunk 18% = 27%."],
  [PAD, "Which acid–base imbalance results from vomiting?", "Metabolic alkalosis", ["Metabolic acidosis", "Respiratory acidosis", "Respiratory alkalosis"], "Loss of stomach acid; diarrhoea causes metabolic acidosis."],
  [PAD, "A client with diabetic ketoacidosis has deep, rapid breathing. This is", "Kussmaul respirations compensating for metabolic acidosis", ["Cheyne–Stokes breathing", "a sign of alkalosis", "normal"], "Blowing off CO₂ raises pH."],
  [PAD, "Which finding indicates hypovolaemic shock?", "Low blood pressure, fast weak pulse and cool clammy skin", ["High blood pressure and slow pulse", "Warm flushed skin and bounding pulse", "Increased urine output"], "Urine output falls in shock."],
  [PAD, "What is the first sign of hypoxia in many clients?", "Restlessness or anxiety", ["Cyanosis", "Bradycardia", "Clubbing"], "Cyanosis is a late sign."],
  [PAD, "A client with heart failure gains 1.5 kg (3 lb) in 2 days. This suggests", "fluid retention — report to the provider", ["muscle gain", "improved nutrition", "dehydration"], "Daily weights are the best indicator of fluid status."],
  [PAD, "Which finding is typical of left-sided heart failure?", "Crackles in the lungs and dyspnoea", ["Jugular venous distension only", "Ascites", "Peripheral oedema only"], "Right-sided failure causes systemic congestion (JVD, oedema)."],
  [PAD, "A client has an anaphylactic reaction. Which drug is given FIRST?", "Intramuscular epinephrine", ["Oral antihistamine", "IV antibiotics", "Insulin"], "Then airway support, oxygen and fluids."],
  [PAD, "Which sign suggests a stroke?", "Sudden one-sided facial droop and arm weakness", ["Gradual knee pain", "A rash on both arms", "Itchy eyes"], "Use BE-FAST and note the time symptoms started."],
  [PAD, "A client with a chest tube — what does continuous bubbling in the water-seal chamber indicate?", "An air leak in the system", ["Normal function", "The lung has fully re-expanded", "Too much suction"], "Intermittent bubbling with breathing/coughing can be expected with a pneumothorax."],
];

function doses(): Q[] {
  const qs: Q[] = [];
  qs.push(...repeat(14, () => {
    const ordered = pick([250, 500, 750, 1000, 125, 375]), have = pick([125, 250, 500]), per = pick([1, 5]);
    const ans = (ordered / have) * per;
    if (!Number.isInteger(ans * 10) || ans > 10) return null;
    const unit = per === 1 ? "tablet(s)" : "mL";
    return mcq(S, PHA, `The provider orders ${ordered} mg. Available: ${have} mg per ${per === 1 ? "tablet" : `${per} mL`}. How much should the nurse give?`, `${fmt(ans)} ${unit}`, numOpts(ans, [ans * 2, ans / 2, have / ordered], unit), `Desired ÷ have × quantity = ${ordered} ÷ ${have} × ${per} = ${fmt(ans)} ${unit}.`, 1);
  }));
  qs.push(...repeat(14, () => {
    const vol = pick([500, 1000, 250, 100]), hrs = pick([2, 4, 6, 8, 10, 12]);
    const rate = Math.round((vol / hrs) * 10) / 10;
    return mcq(S, PHA, `Infuse ${vol} mL of 0.9% sodium chloride over ${hrs} hours using an infusion pump. What rate should the pump be set to?`, `${fmt(Math.round(rate))} mL/hr`, numOpts(Math.round(rate), [vol * hrs, rate * 2, rate + 25].map(Math.round), "mL/hr"), `${vol} ÷ ${hrs} = ${fmt(rate)} → ${fmt(Math.round(rate))} mL/hr.`, 1);
  }));
  qs.push(...repeat(14, () => {
    const vol = pick([500, 1000, 250]), hrs = pick([4, 6, 8, 12]), df = pick([10, 15, 20, 60]);
    const gtt = Math.round((vol * df) / (hrs * 60));
    return mcq(S, PHA, `Infuse ${vol} mL over ${hrs} hours by gravity. The drop factor is ${df} gtt/mL. How many drops per minute? (Round to the nearest whole number.)`, `${gtt} gtt/min`, numOpts(gtt, [Math.round(vol / (hrs * 60)), Math.round((vol * df) / hrs), gtt + 5], "gtt/min"), `(${vol} × ${df}) ÷ (${hrs} × 60) = ${fmt(Math.round(((vol * df) / (hrs * 60)) * 10) / 10)} → ${gtt} gtt/min.`, 2);
  }));
  qs.push(...repeat(12, () => {
    const lb = ri(10, 40) * 2, mgkg = pick([2, 5, 10, 15, 20]);
    const kg = Math.round((lb / 2.2) * 10) / 10;
    const dose = Math.round(kg * mgkg * 10) / 10;
    return mcq(S, PHA, `A child weighs ${lb} lb. The order is ${mgkg} mg/kg. What dose should be given? (1 kg = 2.2 lb; round to one decimal place.)`, `${fmt(dose)} mg`, numOpts(dose, [lb * mgkg, kg, dose * 2], "mg"), `${lb} ÷ 2.2 = ${fmt(kg)} kg; × ${mgkg} = ${fmt(dose)} mg.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const units = pick([1000, 1200, 1500, 800, 1100]), conc = pick([25000, 20000]), vol = pick([250, 500]);
    const rate = Math.round((units / (conc / vol)) * 10) / 10;
    return mcq(S, PHA, `Heparin ${units.toLocaleString("en-US")} units/hr is ordered. The bag contains ${conc.toLocaleString("en-US")} units in ${vol} mL. At what rate should the pump run?`, `${fmt(rate)} mL/hr`, numOpts(rate, [units / vol, rate * 2, conc / units], "mL/hr"), `Concentration = ${conc} ÷ ${vol} = ${conc / vol} units/mL; ${units} ÷ ${conc / vol} = ${fmt(rate)} mL/hr.`, 3);
  }));
  qs.push(...repeat(8, () => {
    const intake = [ri(2, 4) * 120, ri(1, 3) * 240, ri(2, 8) * 100], out = [ri(3, 9) * 100, ri(1, 3) * 50];
    const i = intake.reduce((a, b) => a + b, 0), o = out.reduce((a, b) => a + b, 0);
    return mcq(S, BCC, `Over 8 hours a client drinks ${intake[0]} mL of water and ${intake[1]} mL of juice and receives ${intake[2]} mL IV. Output is ${out[0]} mL urine and ${out[1]} mL emesis. What is the total intake?`, `${i} mL`, numOpts(i, [i - o, o, intake[0] + intake[1]], "mL"), `${intake.join(" + ")} = ${i} mL (output, ${o} mL, is recorded separately).`, 1);
  }));
  return qs;
}

export function nclex(): Q[] {
  return [...ITEMS.map(([t, b, c, d, e]) => mcq(S, t, b, c, d, e, 2)), ...doses()];
}
