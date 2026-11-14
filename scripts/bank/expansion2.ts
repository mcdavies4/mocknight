// Starter banks for wave 2: OET, UCAT, BECE (Ghana). KCSE and MDCAT reuse existing school subjects.
// Facts are long-standing and stable; logic and maths are computed. The question factory grows them after launch.
import { gcd, mcq, numOpts, pick, Q, repeat, ri, shuffle } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

// ---------------------------------------------------------------------------
// OET — healthcare English (OEH)
// ---------------------------------------------------------------------------
const OEH: F[] = [
  ["Test format", "Which four sub-tests make up OET?", "Listening, Reading, Writing and Speaking", ["Grammar, Vocabulary, Writing and Speaking", "Listening, Reading, Clinical and Speaking", "Reading, Writing, Numeracy and Speaking"], "All four are taken; Writing and Speaking are profession-specific."],
  ["Test format", "What is the Writing task in OET for nurses and doctors usually?", "A letter, most often a referral or discharge letter", ["An academic essay", "A graph description", "A personal statement"], "You write to another health professional using case notes."],
  ["Test format", "What is the minimum score for an OET grade B?", "350", ["300", "400", "250"], "Scores run from 0 to 500; grade B starts at 350, which the NMC and GMC ask for."],
  ["Test format", "How is the OET Speaking sub-test structured?", "Two role-plays with an interlocutor playing a patient or relative", ["One presentation to an examiner", "A group discussion", "A recorded monologue"], "Each role-play is a short, realistic consultation."],
  ["Test format", "In Reading Part A, what skill matters most?", "Scanning four short texts quickly to find specific details", ["Reading every word slowly", "Summarising each text in full", "Translating terms"], "Part A is strictly timed at 15 minutes."],
  ["Writing", "Which is the most appropriate opening for a referral letter when you know the doctor's name?", "Dear Dr Patel,", ["Hi Dr Patel,", "To whom it may concern,", "Dear Sir/Madam,"], "Use the name when it is given in the case notes."],
  ["Writing", "If you open with 'Dear Dr Patel', how should you close the letter?", "Yours sincerely,", ["Yours faithfully,", "Cheers,", "Best wishes,"], "'Yours faithfully' goes with 'Dear Sir/Madam'."],
  ["Writing", "What should the first paragraph of a referral letter do?", "State who the patient is and the purpose of the letter", ["Describe the patient's childhood", "List every medication", "Thank the reader at length"], "The reader should know why they are reading in the first lines."],
  ["Writing", "Which sentence is the most appropriate register for an OET letter?", "Mrs Jones was admitted with a two-day history of chest pain.", ["Mrs Jones came in 'cos her chest was hurting.", "Mrs Jones turned up with a sore chest, poor thing.", "Mrs Jones = chest pain x 2 days."], "Use full, formal sentences: no contractions, slang or note form."],
  ["Writing", "Which case-note details should you usually leave out of the letter?", "Details that are not relevant to the reader's task", ["The reason for referral", "Current medications", "Relevant allergies"], "Selecting relevant information is part of the marking."],
  ["Writing", "Which is the best way to show urgency in a referral letter?", "I would be grateful if you could see her as a matter of urgency.", ["SEE HER NOW!!!", "Could you maybe have a look when free?", "Urgent urgent urgent."], "Polite but clear language suits a professional reader."],
  ["Vocabulary", "What is the lay (everyday) term for 'pyrexia'?", "Fever", ["Itching", "Fainting", "Vomiting"], "When speaking to patients, use lay terms."],
  ["Vocabulary", "What does 'dyspnoea' mean?", "Shortness of breath", ["Difficulty swallowing", "Painful urination", "Chest pain"], "Dys- (difficult) + -pnoea (breathing)."],
  ["Vocabulary", "What does 'dysphagia' mean?", "Difficulty swallowing", ["Difficulty speaking", "Shortness of breath", "Indigestion"], "-phagia relates to eating or swallowing."],
  ["Vocabulary", "What does 'haemoptysis' mean?", "Coughing up blood", ["Vomiting blood", "Blood in the urine", "A nosebleed"], "Vomiting blood is haematemesis."],
  ["Vocabulary", "What does 'haematuria' mean?", "Blood in the urine", ["Blood in the stool", "Coughing up blood", "Low blood pressure"], "-uria refers to urine."],
  ["Vocabulary", "What is 'syncope'?", "Fainting", ["Dizziness without fainting", "A seizure", "A headache"], "A brief loss of consciousness."],
  ["Vocabulary", "What is 'pruritus'?", "Itching", ["A rash", "Swelling", "Burning pain"], "Pruritus is the medical term for itch."],
  ["Vocabulary", "What does 'analgesia' mean?", "Pain relief", ["Anaesthesia for surgery", "Anti-inflammatory treatment", "Antibiotic treatment"], "Paracetamol is a common analgesic."],
  ["Vocabulary", "What does 'nocturia' mean?", "Waking at night to pass urine", ["Bedwetting in children", "Night sweats", "Insomnia"], "Common in prostate problems and heart failure."],
  ["Vocabulary", "Which is the lay term a nurse should use for 'hypertension'?", "High blood pressure", ["Fast heart rate", "Low blood sugar", "Stress"], "Hypotension is low blood pressure."],
  ["Vocabulary", "What does 'tachycardia' mean?", "A fast heart rate", ["A slow heart rate", "An irregular heart rate", "A heart attack"], "Bradycardia is a slow heart rate."],
  ["Vocabulary", "What does 'emesis' mean?", "Vomiting", ["Nausea", "Diarrhoea", "Bleeding"], "Antiemetics prevent vomiting."],
  ["Grammar", "Choose the correct preposition: 'She is allergic ___ penicillin.'", "to", ["with", "of", "from"], "Allergic to something."],
  ["Grammar", "Choose the correct preposition: 'He presented ___ a three-day history of cough.'", "with", ["by", "for", "on"], "Present with symptoms."],
  ["Grammar", "Choose the correct preposition: 'The patient complains ___ lower back pain.'", "of", ["about to", "for", "with"], "Complain of a symptom."],
  ["Grammar", "Choose the correct form: 'She ___ metformin since 2019.'", "has been taking", ["is taking", "took", "takes"], "Present perfect continuous for something that started in the past and continues."],
  ["Grammar", "Which sentence uses the passive correctly?", "He was discharged home on Monday.", ["He was discharge home on Monday.", "He discharged home on Monday.", "He has discharge home on Monday."], "Passive = be + past participle."],
  ["Grammar", "Choose the correct option: 'She has been compliant ___ her medication.'", "with", ["to", "on", "by"], "Compliant with treatment."],
  ["Grammar", "Choose the correct option: 'He was referred ___ the cardiology clinic.'", "to", ["at", "for", "into"], "Refer someone to a service."],
  ["Speaking", "Which phrase best shows empathy to a worried patient?", "I can see this is really worrying for you.", ["Don't worry, it's nothing.", "Calm down, please.", "That's not my department."], "Acknowledge the feeling before giving information."],
  ["Speaking", "Which is the best way to check a patient's understanding?", "Could you tell me in your own words what you'll do at home?", ["Do you understand?", "Is that clear? Good.", "Any questions? No? Great."], "Teach-back checks understanding without embarrassing the patient."],
  ["Speaking", "Which question is the best open question to start a consultation?", "What brings you in today?", ["Do you have chest pain?", "Is it worse at night?", "Have you taken paracetamol?"], "Open questions let the patient explain in their own words."],
  ["Speaking", "A patient refuses a treatment. What is the most appropriate response?", "Explore their concerns and explain the options without pressure", ["Insist they must have it", "End the conversation", "Tell them they are being silly"], "Respect autonomy and look for the reason behind the refusal."],
  ["Listening", "In Listening Part A you mostly complete notes from what?", "A consultation between a health professional and a patient", ["A news broadcast", "A university lecture", "A phone call between friends"], "Part A tests picking out specific clinical details."],
];

// ---------------------------------------------------------------------------
// UCAT decision making (UDM) — computed
// ---------------------------------------------------------------------------
const TRIPLES: [string, string, string][] = [
  ["doctors", "runners", "early risers"], ["students", "musicians", "chess players"], ["nurses", "cyclists", "vegetarians"],
  ["painters", "teachers", "poets"], ["pilots", "swimmers", "linguists"], ["farmers", "singers", "dancers"],
  ["engineers", "gardeners", "cooks"], ["dentists", "readers", "climbers"],
];
const SYLL: { p: (a: string, b: string, c: string) => string; c: (a: string, b: string, c: string) => string; ok: boolean; why: string }[] = [
  { p: (a, b, c) => `All ${a} are ${b}. All ${b} are ${c}.`, c: (a, _b, c) => `All ${a} are ${c}.`, ok: true, why: "If every A is a B and every B is a C, every A must be a C." },
  { p: (a, b, c) => `All ${a} are ${b}. Some ${b} are ${c}.`, c: (a, _b, c) => `Some ${a} are ${c}.`, ok: false, why: "The B that are C could all be outside A." },
  { p: (a, b, c) => `No ${a} are ${b}. All ${c} are ${a}.`, c: (_a, b, c) => `No ${c} are ${b}.`, ok: true, why: "Every C is an A, and no A is a B, so no C is a B." },
  { p: (a, b, c) => `Some ${a} are ${b}. All ${b} are ${c}.`, c: (a, _b, c) => `Some ${a} are ${c}.`, ok: true, why: "The A that are B are also C." },
  { p: (a, b, c) => `All ${a} are ${b}. No ${c} are ${b}.`, c: (a, _b, c) => `No ${a} are ${c}.`, ok: true, why: "Every A is a B and no C is a B, so no A can be a C." },
  { p: (a, b) => `All ${a} are ${b}.`, c: (a, b) => `All ${b} are ${a}.`, ok: false, why: "'All A are B' cannot be reversed — there may be B that are not A." },
  { p: (a, b, c) => `Some ${a} are ${b}. Some ${b} are ${c}.`, c: (a, _b, c) => `Some ${a} are ${c}.`, ok: false, why: "The two 'some' groups need not overlap." },
  { p: (a, b, c) => `No ${a} are ${b}. Some ${c} are ${b}.`, c: (a, _b, c) => `Some ${c} are not ${a}.`, ok: true, why: "The C that are B cannot be A." },
  { p: (a, b, c) => `All ${a} are ${b}. Some ${c} are not ${b}.`, c: (a, _b, c) => `Some ${c} are not ${a}.`, ok: true, why: "A C that is not a B cannot be an A, because every A is a B." },
  { p: (a, b, c) => `Some ${a} are not ${b}. All ${c} are ${b}.`, c: (a, _b, c) => `All ${a} are ${c}.`, ok: false, why: "Some A are not B, so those A cannot be C." },
];
function syllogisms(): Q[] {
  const out: Q[] = [];
  for (const s of SYLL)
    for (const [a, b, c] of TRIPLES.slice(0, 3))
      out.push(mcq("UDM", "Syllogisms", `Assume the statements are true.\n\n${s.p(a, b, c)}\n\nDoes this conclusion follow?\n"${s.c(a, b, c)}"`, s.ok ? "Yes" : "No", [s.ok ? "No" : "Yes"], s.why, 2, 2));
  return out;
}
function venn(): Q[] {
  return repeat(10, () => {
    const n = ri(40, 120), a = ri(12, Math.floor(n * 0.6)), b = ri(10, Math.floor(n * 0.5)), both = ri(3, Math.min(a, b) - 2);
    const neither = n - (a + b - both);
    if (neither < 1) return null;
    const [x, y] = pick([["French", "Spanish"], ["football", "tennis"], ["tea", "coffee"], ["biology", "chemistry"]] as const);
    return mcq("UDM", "Venn diagrams", `In a group of ${n} people, ${a} like ${x}, ${b} like ${y} and ${both} like both. How many like neither?`, String(neither),
      numOpts(neither, [n - a - b, n - (a + b) + 2 * both, n - both]), `Either = ${a} + ${b} − ${both} = ${a + b - both}; neither = ${n} − ${a + b - both} = ${neither}.`, 2);
  });
}
const fr = (p: number, q: number) => { const g = gcd(p, q); return `${p / g}/${q / g}`; };
function probability(): Q[] {
  return repeat(10, () => {
    const r = ri(2, 7), bl = ri(2, 8), t = r + bl;
    const ans = fr(r * (r - 1), t * (t - 1));
    const wrong = [fr(r * r, t * t), fr(r, t), fr(r - 1, t - 1), fr(2 * r, t + t - 1), fr(r * (r - 1), t * t)].filter((w) => w !== ans);
    return mcq("UDM", "Probability", `A bag holds ${r} red and ${bl} blue counters. Two are taken at random without replacement. What is the probability both are red?`, ans,
      wrong, `(${r}/${t}) × (${r - 1}/${t - 1}) = ${ans}.`, 3);
  });
}
const NAMES = ["Amara", "Ben", "Chen", "Dami", "Eli", "Fola", "Grace", "Hassan"];
function ordering(): Q[] {
  return repeat(10, () => {
    const p = shuffle(NAMES).slice(0, 4); // p[0] tallest … p[3] shortest
    const clues = shuffle([`${p[0]} is taller than ${p[1]}.`, `${p[2]} is shorter than ${p[1]}.`, `${p[3]} is shorter than ${p[2]}.`]);
    const askShort = ri(0, 1) === 1;
    const ans = askShort ? p[3] : p[0];
    return mcq("UDM", "Logic puzzles", `${clues.join(" ")}\n\nWho is the ${askShort ? "shortest" : "tallest"}?`, ans, p.filter((x) => x !== ans),
      `The order from tallest is ${p.join(" > ")}.`, 2);
  });
}

// ---------------------------------------------------------------------------
// UCAT situational judgement (USJ)
// ---------------------------------------------------------------------------
const RATINGS = ["A very appropriate thing to do", "Appropriate, but not ideal", "Inappropriate, but not awful", "A very inappropriate thing to do"];
const SJ: [string, string, number, string][] = [
  ["A medical student notices a junior doctor about to give a drug the patient's wristband says they are allergic to.", "Immediately and politely point out the allergy before the drug is given.", 0, "Patient safety comes first; speak up at once, respectfully."],
  ["A medical student notices a junior doctor about to give a drug the patient's wristband says they are allergic to.", "Say nothing because the doctor is more senior.", 3, "Staying silent risks serious harm to the patient."],
  ["A medical student sees a friend on placement post a photo of a patient's X-ray, with the name visible, on social media.", "Ask the friend to remove the post straight away and explain why.", 0, "This addresses the confidentiality breach quickly."],
  ["A medical student sees a friend on placement post a photo of a patient's X-ray, with the name visible, on social media.", "'Like' the post and ignore it.", 3, "This condones a breach of patient confidentiality."],
  ["A student is running late for a teaching session because the bus broke down.", "Let the tutor know as soon as possible and apologise.", 0, "Honest, early communication is professional."],
  ["A student realises they made an error in a patient's notes during their placement.", "Tell their supervisor and correct the record properly, signed and dated.", 0, "Honesty and accurate records are essential (duty of candour)."],
  ["A student realises they made an error in a patient's notes during their placement.", "Quietly tear out the page and rewrite it.", 3, "Altering records to hide mistakes is dishonest."],
  ["A patient asks a medical student for their personal phone number to 'keep in touch'.", "Politely decline and explain professional boundaries.", 0, "Maintaining boundaries protects patients and staff."],
  ["A patient asks a medical student for their personal phone number to 'keep in touch'.", "Give the number so as not to upset the patient.", 3, "This crosses professional boundaries."],
  ["A student suspects a fellow student has been drinking alcohol before a clinical placement.", "Speak to the student privately and, if concerned for patient safety, inform a supervisor.", 0, "Patient safety and the colleague's wellbeing both matter."],
  ["A student suspects a fellow student has been drinking alcohol before a clinical placement.", "Post about it in the year group chat.", 3, "This is unprofessional and does not address the risk."],
  ["A patient asks a medical student what their test results mean, but the student is unsure.", "Explain that they are not able to say and ask the doctor to speak with the patient.", 0, "Students should work within their competence."],
  ["A patient asks a medical student what their test results mean, but the student is unsure.", "Guess the meaning to reassure the patient.", 3, "Giving inaccurate information could harm the patient."],
  ["During a group project, one member has not contributed for weeks.", "Talk to them privately to understand why and agree a plan.", 0, "Addresses the problem directly and supportively."],
  ["During a group project, one member has not contributed for weeks.", "Remove their name from the project without telling them.", 3, "Unfair and avoids honest communication."],
  ["During a group project, one member has not contributed for weeks.", "Raise the issue with the project tutor straight away without speaking to the student.", 2, "Escalation may be needed later, but speaking to them first is better."],
  ["A consultant makes a joke about a patient's weight in front of students, out of the patient's hearing.", "Later, raise the concern with the consultant or another senior if it continues.", 1, "Reasonable, though handling such issues needs care and judgement."],
  ["A student is asked by a nurse to help move a patient but has not been trained in manual handling.", "Explain that they have not been trained and offer to fetch someone who has.", 0, "Working within competence protects the patient and the student."],
  ["A student finds a set of printed patient notes left on a bus seat.", "Keep them secure and return them to the ward or the information governance lead.", 0, "Protects confidentiality and reports the breach."],
  ["A student is feeling overwhelmed and is struggling to keep up with coursework.", "Speak to their personal tutor or student support.", 0, "Seeking help early is responsible."],
  ["A student is feeling overwhelmed and is struggling to keep up with coursework.", "Copy a friend's assignment to catch up.", 3, "Plagiarism is a serious probity issue."],
  ["A patient on the ward tells a student that a nurse was rude to them.", "Listen, apologise that they had a poor experience and let the nurse in charge know.", 0, "Respond to the concern and pass it to someone who can act."],
  ["A friend asks a medical student to look up a relative's hospital records to see how they are.", "Refuse, explaining they can only access records of patients they are caring for.", 0, "Accessing records without a care need breaches confidentiality."],
  ["A friend asks a medical student to look up a relative's hospital records to see how they are.", "Look quickly and only share the main points.", 3, "Unauthorised access is a breach regardless of intent."],
];
const situational = () => SJ.map(([s, a, r, why]) => mcq("USJ", "Professionalism", `${s}\n\nHow appropriate is the following response?\n${a}`, RATINGS[r], RATINGS.filter((_, i) => i !== r), why, 2));

// ---------------------------------------------------------------------------
// BECE (Ghana) — Integrated Science (ISC) and Social Studies (SST)
// ---------------------------------------------------------------------------
const ISC: F[] = [
  ["Life processes", "Which gas do green plants take in for photosynthesis?", "Carbon dioxide", ["Oxygen", "Nitrogen", "Hydrogen"], "Plants use carbon dioxide and water, with light, to make glucose."],
  ["Life processes", "Which gas is released during photosynthesis?", "Oxygen", ["Carbon dioxide", "Nitrogen", "Methane"], "Oxygen is a by-product of photosynthesis."],
  ["Life processes", "What green pigment traps light energy in plants?", "Chlorophyll", ["Haemoglobin", "Melanin", "Carotene"], "Chlorophyll is found in chloroplasts."],
  ["Cells", "Which part of a cell controls its activities?", "Nucleus", ["Cell membrane", "Cytoplasm", "Vacuole"], "The nucleus contains genetic material."],
  ["Cells", "Which structure is found in plant cells but not animal cells?", "Cell wall", ["Nucleus", "Cell membrane", "Cytoplasm"], "Plant cells also have chloroplasts and a large vacuole."],
  ["Human body", "Which organ pumps blood around the body?", "Heart", ["Lungs", "Liver", "Kidneys"], "The heart is a muscular pump."],
  ["Human body", "Where does most digestion and absorption of food take place?", "Small intestine", ["Stomach", "Large intestine", "Mouth"], "Villi increase the surface area for absorption."],
  ["Human body", "Which organ removes urea from the blood?", "Kidney", ["Lung", "Heart", "Stomach"], "Kidneys produce urine."],
  ["Human body", "Which blood cells fight infection?", "White blood cells", ["Red blood cells", "Platelets", "Plasma"], "Red cells carry oxygen; platelets help clotting."],
  ["Health", "Which insect spreads malaria?", "Female Anopheles mosquito", ["Housefly", "Tsetse fly", "Male Culex mosquito"], "It carries the Plasmodium parasite."],
  ["Health", "Which disease is spread by the tsetse fly?", "Sleeping sickness", ["Malaria", "Cholera", "Typhoid"], "Also called trypanosomiasis."],
  ["Health", "Cholera is mainly spread through", "contaminated water and food", ["mosquito bites", "sharing clothes", "dust"], "Safe water and sanitation prevent cholera."],
  ["Nutrition", "Which food test reagent turns blue-black with starch?", "Iodine solution", ["Benedict's solution", "Biuret reagent", "Ethanol"], "Iodine changes from brown to blue-black."],
  ["Nutrition", "Which nutrient is mainly needed for growth and repair?", "Protein", ["Carbohydrate", "Fat", "Fibre"], "Beans, fish, eggs and meat are good sources."],
  ["Nutrition", "Lack of vitamin C causes", "scurvy", ["rickets", "night blindness", "kwashiorkor"], "Citrus fruits are rich in vitamin C."],
  ["Nutrition", "Kwashiorkor is caused by a lack of", "protein", ["vitamin A", "iron", "water"], "It is a protein-energy malnutrition."],
  ["Matter", "What are the three states of matter?", "Solid, liquid and gas", ["Solid, water and air", "Hot, warm and cold", "Metal, wood and plastic"], "Plasma is a fourth state, but these three are the main ones."],
  ["Matter", "The change from liquid to gas is called", "evaporation", ["condensation", "melting", "freezing"], "Condensation is gas to liquid."],
  ["Matter", "The change from solid directly to gas is called", "sublimation", ["evaporation", "melting", "condensation"], "Camphor and iodine sublime."],
  ["Matter", "Which method separates sand from water?", "Filtration", ["Evaporation", "Magnetism", "Distillation"], "The sand stays on the filter paper."],
  ["Matter", "Which method gets salt from salt water?", "Evaporation", ["Filtration", "Decanting", "Sieving"], "The water evaporates and the salt is left."],
  ["Matter", "Which method separates iron filings from sulphur powder?", "Using a magnet", ["Filtration", "Evaporation", "Distillation"], "Iron is magnetic; sulphur is not."],
  ["Acids and bases", "What is the pH of pure water?", "7", ["0", "14", "1"], "pH 7 is neutral."],
  ["Acids and bases", "A solution with pH 2 is", "strongly acidic", ["neutral", "strongly alkaline", "weakly alkaline"], "Lower pH means more acidic."],
  ["Acids and bases", "What colour does blue litmus turn in an acid?", "Red", ["Blue", "Green", "Yellow"], "Acids turn blue litmus red."],
  ["Energy", "Which is a renewable source of energy?", "Solar energy", ["Coal", "Crude oil", "Natural gas"], "Solar, wind and hydro are renewable."],
  ["Energy", "A torch battery converts chemical energy into", "electrical energy", ["nuclear energy", "sound energy only", "chemical energy"], "The bulb then converts it to light and heat."],
  ["Energy", "Which dam generates most of Ghana's hydroelectric power?", "Akosombo Dam", ["Bui Dam", "Kpong Dam", "Weija Dam"], "Akosombo created Lake Volta."],
  ["Forces", "What force pulls objects towards the Earth?", "Gravity", ["Friction", "Magnetism", "Tension"], "Weight is the force of gravity on a mass."],
  ["Forces", "What is the unit of force?", "Newton", ["Joule", "Watt", "Kilogram"], "Named after Isaac Newton."],
  ["Forces", "A lever with the fulcrum between the load and the effort is a", "first-class lever", ["second-class lever", "third-class lever", "pulley"], "A see-saw is a first-class lever."],
  ["Magnetism", "Like poles of two magnets", "repel each other", ["attract each other", "have no effect", "cancel out"], "Unlike poles attract."],
  ["Chemistry", "What two things does iron need to rust?", "Water and oxygen", ["Heat and light", "Salt and sand", "Carbon dioxide and nitrogen"], "Painting and oiling prevent rusting."],
  ["Earth", "Which gas makes up most of the air?", "Nitrogen", ["Oxygen", "Carbon dioxide", "Argon"], "About 78% of air is nitrogen."],
  ["Earth", "The Earth takes about how long to go once round the Sun?", "365¼ days", ["24 hours", "30 days", "7 days"], "One rotation on its axis takes 24 hours."],
  ["Ecology", "In a food chain, green plants are called", "producers", ["consumers", "decomposers", "predators"], "They make their own food."],
  ["Ecology", "Organisms that break down dead matter are called", "decomposers", ["producers", "herbivores", "parasites"], "Bacteria and fungi are decomposers."],
];
const SST: F[] = [
  ["History", "In which year did Ghana gain independence?", "1957", ["1960", "1966", "1945"], "Independence was declared on 6 March 1957."],
  ["History", "Who was Ghana's first President?", "Dr Kwame Nkrumah", ["J. B. Danquah", "Jerry John Rawlings", "Kofi Busia"], "Nkrumah led Ghana to independence and became President in 1960."],
  ["History", "On what date did Ghana become a republic?", "1 July 1960", ["6 March 1957", "24 February 1966", "7 January 1993"], "Republic Day is 1 July."],
  ["History", "What was Ghana called before independence?", "Gold Coast", ["Ivory Coast", "Slave Coast", "Grain Coast"], "The name came from its gold trade."],
  ["History", "Which political party did Nkrumah form in 1949?", "Convention People's Party (CPP)", ["United Gold Coast Convention (UGCC)", "National Democratic Congress (NDC)", "New Patriotic Party (NPP)"], "He broke away from the UGCC."],
  ["History", "The UGCC was formed in which year?", "1947", ["1957", "1937", "1951"], "Its leaders and Nkrumah were later called the Big Six."],
  ["History", "Who led the Asante in the 1900 war against the British over the Golden Stool?", "Yaa Asantewaa", ["Okomfo Anokye", "Osei Tutu", "Prempeh I"], "It is known as the Yaa Asantewaa War."],
  ["History", "The Bond of 1844 was signed between the British and", "Fante chiefs", ["Asante kings", "Ewe chiefs", "Ga chiefs"], "It was signed on 6 March 1844."],
  ["History", "Who brought cocoa to the Gold Coast in 1879?", "Tetteh Quarshie", ["Kwame Nkrumah", "Okomfo Anokye", "Paa Grant"], "He brought pods from Fernando Po."],
  ["History", "Ghana's Fourth Republic began in 1993 under which constitution?", "The 1992 Constitution", ["The 1957 Constitution", "The 1969 Constitution", "The 1979 Constitution"], "The Fourth Republic began on 7 January 1993."],
  ["Government", "Ghana's legislature is called", "Parliament", ["Congress", "Senate", "National Assembly"], "Ghana has a unicameral (one-chamber) Parliament."],
  ["Government", "Who is the head of state in Ghana?", "The President", ["The Speaker of Parliament", "The Chief Justice", "The Asantehene"], "The President is both head of state and of government."],
  ["Government", "Which body organises elections in Ghana?", "Electoral Commission", ["National Commission for Civic Education", "Ghana Police Service", "Parliament"], "The EC conducts public elections and referendums."],
  ["Government", "What is Ghana's national motto?", "Freedom and Justice", ["Unity and Faith", "Peace and Progress", "One Nation, One People"], "It appears on the coat of arms."],
  ["Government", "At what age can a Ghanaian citizen vote?", "18", ["16", "21", "25"], "Citizens aged 18 and over can register to vote."],
  ["Geography", "What is the capital of Ghana?", "Accra", ["Kumasi", "Tamale", "Cape Coast"], "Accra is in the Greater Accra Region."],
  ["Geography", "How many administrative regions does Ghana have?", "16", ["10", "12", "18"], "Six new regions were created in 2019."],
  ["Geography", "What is the highest mountain in Ghana?", "Mount Afadja (Afadjato)", ["Mount Gemi", "Kwahu Plateau", "Mount Cameroon"], "It is in the Volta Region."],
  ["Geography", "Lake Volta was created by building which dam?", "Akosombo Dam", ["Bui Dam", "Kpong Dam", "Tono Dam"], "It is one of the world's largest man-made lakes by area."],
  ["Geography", "Which is Ghana's main seaport near Accra?", "Tema", ["Takoradi", "Ada", "Elmina"], "Takoradi is the other major port."],
  ["Geography", "Which ocean is to the south of Ghana?", "Atlantic Ocean", ["Indian Ocean", "Pacific Ocean", "Arctic Ocean"], "Ghana's coast lies on the Gulf of Guinea."],
  ["Geography", "Which country borders Ghana to the west?", "Côte d'Ivoire", ["Togo", "Burkina Faso", "Nigeria"], "Togo is to the east and Burkina Faso to the north."],
  ["Economy", "What is Ghana's currency?", "Cedi", ["Naira", "Dalasi", "CFA franc"], "One cedi is 100 pesewas."],
  ["Economy", "Which crop has long been a major export of Ghana?", "Cocoa", ["Wheat", "Tea", "Rubber"], "Gold and oil are other major exports."],
  ["Culture", "Homowo is a festival of which people?", "The Ga", ["The Ewe", "The Dagomba", "The Fante"], "Homowo means 'hooting at hunger'."],
  ["Culture", "Hogbetsotso is celebrated by the", "Anlo Ewe", ["Asante", "Ga", "Gonja"], "It remembers the migration from Notsie."],
  ["Culture", "The Aboakyer festival, with its deer hunt, is celebrated in", "Winneba", ["Kumasi", "Tamale", "Ho"], "It is a festival of the Effutu people."],
  ["Culture", "Kente cloth weaving is famous in which town?", "Bonwire", ["Tamale", "Keta", "Bolgatanga"], "Bonwire is in the Ashanti Region."],
  ["International", "ECOWAS was founded in which year?", "1975", ["1957", "1963", "1993"], "The Treaty of Lagos was signed in May 1975."],
  ["International", "Where is the headquarters of the African Union?", "Addis Ababa", ["Accra", "Abuja", "Nairobi"], "Addis Ababa is in Ethiopia."],
  ["Citizenship", "Which is a responsibility of a good citizen?", "Paying taxes", ["Avoiding voting", "Destroying public property", "Ignoring the law"], "Citizens also obey laws and protect public property."],
  ["Environment", "Which human activity is a major cause of land degradation in Ghana?", "Illegal mining (galamsey)", ["Planting trees", "Crop rotation", "Terracing"], "Galamsey also pollutes rivers."],
  ["Environment", "Planting trees to replace those cut down is called", "afforestation / reforestation", ["deforestation", "desertification", "erosion"], "It helps prevent soil erosion."],
];

export function expansion2(): Record<string, Q[]> {
  return {
    OEH: facts("OEH", OEH),
    UDM: [...syllogisms(), ...venn(), ...probability(), ...ordering()],
    USJ: situational(),
    ISC: facts("ISC", ISC, 1),
    SST: facts("SST", SST, 1),
  };
}
