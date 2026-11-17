// Middle East / Gulf banks:
//   UDR — UAE driving theory (RTA / ITC)        TLP — UAE Teacher Licence (TLS) pedagogy
//   LAB — Gulf medical laboratory (Prometric)   PHT — Gulf physiotherapy (Prometric)
//   DEN — Gulf general dentist (Prometric)      PIC — Dubai Person in Charge food safety
//   SRA — Dubai SIRA security guard
// Established facts only; calculations are generated so answers are exact.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;

// ============================================================================ UDR
const UDR: F[] = [
  ["Rules of the road", "In the UAE, vehicles drive on the", "right-hand side of the road", ["left-hand side", "middle of the road", "either side"], "Overtake on the left."],
  ["Rules of the road", "On a multi-lane highway, you should normally", "keep to the right and use the left lane for overtaking", ["drive in the far-left lane", "change lanes often", "drive on the shoulder when busy"], "The left lane is the fast lane."],
  ["Rules of the road", "At a roundabout, you must give way to", "vehicles already in the roundabout", ["vehicles waiting to enter", "only buses", "nobody"], "Use your indicator when leaving."],
  ["Rules of the road", "Overtaking is NOT allowed", "on bends, at the top of hills, at pedestrian crossings or over a solid line", ["on straight roads with a broken line", "when the road ahead is clear", "on a two-lane highway"], "You must be able to see the road ahead is clear."],
  ["Rules of the road", "When an ambulance, police car or fire engine approaches with lights and siren, you should", "move aside safely and let it pass", ["speed up to stay ahead", "stop in your lane immediately", "follow closely behind it"], "Never block emergency vehicles."],
  ["Rules of the road", "When a school bus stops and extends its stop sign, drivers must", "stop and wait until the sign is withdrawn", ["pass carefully on the left", "sound the horn and continue", "slow down only"], "Children may be crossing."],
  ["Rules of the road", "At a pedestrian crossing with people waiting, you must", "stop and let them cross", ["sound your horn", "speed up to pass first", "flash your lights and continue"], "Pedestrians have priority at crossings."],
  ["Safety", "In the UAE, seatbelts must be worn by", "the driver and all passengers, front and rear", ["only the driver", "only front-seat occupants", "only on highways"], "This has been required since 2017."],
  ["Safety", "Young children (aged 4 and under) must travel in", "a suitable child safety seat", ["the front seat on an adult's lap", "the front seat with a belt", "any seat without restraint"], "Children under 10 or shorter than 145 cm should not sit in the front seat."],
  ["Safety", "The legal blood alcohol limit for driving in the UAE is", "zero", ["0.05%", "0.08%", "0.02%"], "The UAE has zero tolerance for drink-driving."],
  ["Safety", "Using a handheld mobile phone while driving is", "an offence that brings fines and black points", ["allowed at traffic lights", "allowed below 40 km/h", "allowed for calls only"], "Use hands-free only when safe."],
  ["Safety", "Tailgating (following too closely) is dangerous because", "you won't have time to stop if the vehicle ahead brakes", ["it saves fuel", "it helps traffic flow", "it is required on highways"], "Keep at least a two-second gap, more in poor conditions."],
  ["Weather", "In fog, you should", "slow down, use low-beam headlights and increase your following distance", ["use high beams", "speed up to get out of it", "drive close to the car in front"], "High beams reflect off fog and reduce visibility."],
  ["Weather", "During a sandstorm, the safest action is to", "slow down, turn on your lights and keep a long distance", ["drive faster", "switch off your lights", "overtake slow vehicles"], "If visibility is very poor, pull over safely away from traffic."],
  ["Weather", "Roads are most slippery", "just after rain starts, when oil and dust mix with water", ["after hours of heavy rain", "on dry sunny days", "at night only"], "Reduce speed when it starts to rain."],
  ["Licensing", "The UAE uses a black points system. Collecting 24 black points leads to", "suspension of your driving licence", ["a free driving course", "a warning only", "a reward"], "Points are recorded for serious violations."],
  ["Licensing", "Dubai's road toll system is called", "Salik", ["Darb", "Nol", "Tasjeel"], "Abu Dhabi's toll system is Darb; Nol is Dubai's transport card."],
  ["Signs", "A red octagonal sign means", "stop completely", ["give way", "no entry", "end of road"], "Stop at the line, then go when safe."],
  ["Signs", "An inverted (upside-down) red and white triangle means", "give way", ["stop", "danger ahead", "no parking"], "Let traffic on the main road go first."],
  ["Signs", "A blue circular sign usually gives", "a mandatory instruction", ["a warning", "a prohibition", "tourist information"], "For example, 'keep right'."],
  ["Signs", "A red circle sign usually shows", "something that is prohibited", ["a mandatory instruction", "a hospital", "a warning"], "For example, 'no U-turn'."],
  ["Signs", "A triangular sign with a red border is", "a warning sign", ["a mandatory sign", "a direction sign", "a parking sign"], "It warns of a hazard ahead."],
  ["Emergencies", "If your car breaks down on a highway, you should", "move to the hard shoulder if possible, switch on hazard lights and place a warning triangle", ["stop in the fast lane", "walk across the highway", "leave the car in a live lane"], "Stay safe away from traffic."],
  ["Emergencies", "In the UAE, the emergency number for the police is", "999", ["998", "997", "911"], "998 is ambulance and 997 is civil defence (fire)."],
  ["Emergencies", "In the UAE, the emergency number for an ambulance is", "998", ["999", "997", "112"], "999 is police."],
];
function udrCalc(): Q[] {
  return repeat(10, () => {
    const kmh = pick([60, 72, 90, 108, 120]), secs = pick([2, 3]), m = r((kmh / 3.6) * secs, 1);
    return mcq("UDR", "Following distance", `At ${kmh} km/h, how far does a car travel in a ${secs}-second gap?`, `${fmt(m)} m`, numOpts(m, [kmh * secs, r(kmh / 3.6, 1), r(m * 2, 1)], "m"), `${kmh} km/h ÷ 3.6 = ${fmt(r(kmh / 3.6, 2))} m/s; × ${secs} s = ${fmt(m)} m.`, 2);
  });
}

// ============================================================================ TLP
const TLP: F[] = [
  ["Bloom's taxonomy", "In the revised Bloom's taxonomy, the highest level is", "create", ["evaluate", "analyse", "remember"], "Remember, understand, apply, analyse, evaluate, create."],
  ["Bloom's taxonomy", "Asking students to compare two historical sources mainly targets", "analysis", ["remembering", "understanding only", "creating"], "Comparing requires breaking information into parts."],
  ["Bloom's taxonomy", "Which learning objective is at the 'remember' level?", "List the planets in order from the Sun.", ["Design a model of the solar system.", "Evaluate the evidence for a theory.", "Compare two planets' climates."], "Remembering is recalling facts."],
  ["Planning", "A well-written learning objective should be", "specific and measurable (SMART)", ["vague so it fits any lesson", "only about the teacher's actions", "the same for every lesson"], "It describes what students will be able to do."],
  ["Planning", "Backward design (Wiggins and McTighe) starts by", "identifying the desired results", ["choosing activities", "writing the test last", "picking the textbook"], "Then plan assessment evidence, then learning activities."],
  ["Differentiation", "Differentiation means adapting", "content, process or product to meet different learners' needs", ["only the seating plan", "grades so everyone passes", "nothing; one lesson fits all"], "It is planned in response to assessment."],
  ["Differentiation", "Universal Design for Learning (UDL) recommends", "multiple means of engagement, representation and expression", ["one method for all learners", "teaching only to the middle", "removing assessment"], "It plans for variability from the start."],
  ["Inclusion", "In the UAE, the term used for people with disabilities is", "People of Determination", ["special people", "slow learners", "the disabled group"], "It reflects the UAE's inclusive education policy."],
  ["Inclusion", "An Individual Education Plan (IEP) sets out", "specific goals and support for a learner with additional needs", ["the school timetable", "staff salaries", "exam dates only"], "It is reviewed regularly with parents."],
  ["Inclusion", "Supporting students learning in a second language works best with", "visuals, modelling and key vocabulary taught explicitly", ["speaking faster", "avoiding group work", "only written instructions"], "Scaffold language as well as content."],
  ["Assessment", "Formative assessment is mainly used to", "adjust teaching during learning", ["rank students at the end of the year", "award certificates", "report to the ministry only"], "Examples: exit tickets, questioning, mini whiteboards."],
  ["Assessment", "A rubric helps by", "making success criteria clear and marking consistent", ["replacing feedback", "hiding expectations", "removing the need for objectives"], "Share it with students before the task."],
  ["Assessment", "Effective feedback is", "specific, timely and tells the learner how to improve", ["a grade only", "given weeks later", "general praise only"], "Feedback should move learning forward."],
  ["Questioning", "Waiting a few seconds after asking a question ('wait time')", "leads to more thoughtful answers from more students", ["wastes lesson time", "confuses students", "only helps the fastest students"], "Aim for at least three seconds."],
  ["Questioning", "Which is an open question?", "Why do you think the character made that choice?", ["What is 6 × 7?", "Is this sentence correct?", "What year did it happen?"], "Open questions invite reasoning and longer answers."],
  ["Classroom management", "The most effective way to prevent behaviour problems is to", "set clear routines and expectations from the start", ["shout when students misbehave", "ignore all behaviour", "give extra homework as punishment"], "Proactive management beats reactive."],
  ["Classroom management", "Praising a specific positive behaviour is an example of", "positive reinforcement", ["negative punishment", "extinction", "modelling only"], "It makes the behaviour more likely to happen again."],
  ["Strategies", "In a jigsaw activity, students", "each learn one part and teach it to their group", ["work alone in silence", "copy the teacher's notes", "take a test first"], "It builds interdependence and accountability."],
  ["Strategies", "In a flipped classroom, students", "study new content at home and practise in class", ["do homework only in class", "never use technology", "only listen to lectures in class"], "Class time is used for active learning."],
  ["Strategies", "Inquiry-based learning begins with", "a question or problem for students to investigate", ["a lecture", "a test", "memorising definitions"], "Students build understanding through investigation."],
  ["Strategies", "Metacognition means", "thinking about your own thinking and learning", ["memorising facts", "group work", "learning by repetition only"], "Teach students to plan, monitor and evaluate their learning."],
  ["Theory", "The idea that ability can grow with effort is called a", "growth mindset", ["fixed mindset", "multiple intelligence", "learning style"], "Carol Dweck's research."],
  ["Theory", "Kolb's experiential learning cycle includes concrete experience, reflection, conceptualisation and", "active experimentation", ["memorisation", "punishment", "standardised testing"], "Learning comes from transforming experience."],
  ["Professional practice", "Safeguarding concerns about a student should be", "reported to the designated safeguarding lead without delay", ["kept secret", "discussed with other students", "investigated alone by the teacher"], "Follow the school's child protection policy."],
];

// ============================================================================ LAB
const LAB: F[] = [
  ["Specimen collection", "A full blood count (CBC) is collected in which tube?", "EDTA (lavender top)", ["sodium citrate (light blue)", "fluoride oxalate (grey)", "lithium heparin (green)"], "EDTA chelates calcium and preserves cell morphology."],
  ["Specimen collection", "Coagulation tests such as PT/INR use which tube?", "sodium citrate (light blue top)", ["EDTA (lavender)", "serum (red/gold)", "fluoride (grey)"], "The tube must be filled correctly for the 9:1 ratio."],
  ["Specimen collection", "Glucose is best preserved in which tube?", "fluoride oxalate (grey top)", ["EDTA (lavender)", "citrate (light blue)", "plain serum tube"], "Fluoride inhibits glycolysis."],
  ["Specimen collection", "In the recommended order of draw, which is collected first?", "Blood culture bottles", ["EDTA tube", "Fluoride tube", "Serum tube"], "Then citrate, serum, heparin, EDTA, fluoride."],
  ["Specimen collection", "Haemolysis of a sample falsely increases", "potassium", ["sodium", "glucose", "albumin"], "Red cells contain high potassium."],
  ["Clinical chemistry", "HbA1c reflects average blood glucose over about", "2–3 months", ["2–3 days", "2 weeks", "1 year"], "It reflects red cell lifespan."],
  ["Clinical chemistry", "A raised troponin indicates", "heart muscle damage", ["liver disease", "kidney failure", "pancreatitis"], "It is the preferred marker for myocardial infarction."],
  ["Clinical chemistry", "Raised amylase and lipase suggest", "acute pancreatitis", ["myocardial infarction", "hepatitis", "gout"], "Lipase is more specific."],
  ["Clinical chemistry", "Creatinine is mainly used to assess", "kidney function", ["liver function", "thyroid function", "clotting"], "eGFR is calculated from it."],
  ["Haematology", "The normal lifespan of a red blood cell is about", "120 days", ["7 days", "30 days", "1 year"], "Old cells are removed by the spleen."],
  ["Haematology", "Microcytic, hypochromic anaemia is most often caused by", "iron deficiency", ["vitamin B12 deficiency", "folate deficiency", "haemolysis only"], "Low MCV and MCH."],
  ["Haematology", "Macrocytic (high MCV) anaemia is typical of", "vitamin B12 or folate deficiency", ["iron deficiency", "thalassaemia trait", "acute blood loss"], "Hypersegmented neutrophils may be seen."],
  ["Blood bank", "The universal donor for red blood cells is", "O Rh negative", ["AB Rh positive", "A Rh negative", "B Rh positive"], "It has no A, B or D antigens."],
  ["Blood bank", "The universal donor for plasma is", "AB", ["O", "A", "B"], "AB plasma has no anti-A or anti-B."],
  ["Blood bank", "A person with blood group A has which antibodies in their plasma?", "anti-B", ["anti-A", "anti-A and anti-B", "none"], "Group O has both anti-A and anti-B."],
  ["Microbiology", "The correct order of Gram stain reagents is", "crystal violet, iodine, decolouriser, safranin", ["safranin, iodine, crystal violet, alcohol", "iodine, crystal violet, safranin, alcohol", "crystal violet, safranin, iodine, alcohol"], "Gram-positive organisms stay purple."],
  ["Microbiology", "Lactose-fermenting colonies on MacConkey agar appear", "pink", ["colourless", "black", "green"], "Non-fermenters are pale or colourless."],
  ["Microbiology", "Complete (clear) haemolysis on blood agar is called", "beta haemolysis", ["alpha haemolysis", "gamma haemolysis", "delta haemolysis"], "Alpha is partial (greenish); gamma is none."],
  ["Microbiology", "Acid-fast bacilli such as Mycobacterium tuberculosis are stained with", "Ziehl–Neelsen stain", ["Gram stain", "Giemsa stain", "India ink"], "They resist decolourisation with acid-alcohol."],
  ["Microbiology", "Chocolate agar is used to grow fastidious organisms such as", "Haemophilus and Neisseria", ["E. coli only", "Staphylococcus only", "fungi only"], "It is heated blood agar that releases growth factors."],
  ["Quality control", "Under Westgard rules, a single control value beyond ±3 SD (1-3s) means", "reject the run", ["accept the run", "a warning only", "repeat the patient test without action"], "1-2s is a warning rule."],
  ["Quality control", "Accuracy describes how close a result is to the", "true value", ["previous result", "mean of the controls only", "upper limit"], "Precision describes repeatability."],
  ["Safety", "Before spinning tubes in a centrifuge, you must", "balance the load", ["fill every slot", "leave the lid open", "spin it empty first"], "An unbalanced centrifuge can be dangerous."],
];
function labCalc(): Q[] {
  const out: Q[] = [];
  out.push(...repeat(8, () => {
    const mg = pick([90, 126, 180, 216, 270]), mmol = r(mg / 18, 1);
    return mcq("LAB", "Calculations", `A glucose result is ${mg} mg/dL. What is it in mmol/L? (divide by 18)`, `${fmt(mmol)} mmol/L`, numOpts(mmol, [mg * 18, r(mg / 10, 1), r(mmol * 2, 1)], "mmol/L"), `${mg} ÷ 18 = ${fmt(mmol)} mmol/L.`, 1);
  }));
  out.push(...repeat(8, () => {
    const c1 = pick([100, 200, 500, 1000]), v2 = pick([50, 100, 250]), c2 = c1 / pick([4, 5, 10]), v1 = r((c2 * v2) / c1, 2);
    return mcq("LAB", "Calculations", `How much of a ${c1} mg/L stock is needed to make ${v2} mL of a ${fmt(c2)} mg/L solution?`, `${fmt(v1)} mL`, numOpts(v1, [r((c1 * v2) / c2, 2), r(v2 - v1, 2), r(v1 * 10, 2)], "mL"), `C1V1 = C2V2: V1 = ${fmt(c2)} × ${v2} ÷ ${c1} = ${fmt(v1)} mL.`, 2);
  }));
  return out;
}

// ============================================================================ PHT
const PHT: F[] = [
  ["Musculoskeletal", "The four rotator cuff muscles are", "supraspinatus, infraspinatus, teres minor and subscapularis", ["deltoid, biceps, triceps and trapezius", "pectoralis major, latissimus dorsi, teres major and deltoid", "rhomboids, levator scapulae, serratus anterior and trapezius"], "Remembered as 'SITS'."],
  ["Musculoskeletal", "The Lachman test assesses the", "anterior cruciate ligament (ACL)", ["posterior cruciate ligament", "medial meniscus", "patellar tendon"], "It is the most sensitive clinical ACL test."],
  ["Musculoskeletal", "McMurray's test is used to assess", "meniscal tears", ["ACL tears", "carpal tunnel syndrome", "rotator cuff tears"], "A painful click suggests a tear."],
  ["Musculoskeletal", "The most commonly injured ligament in an ankle inversion sprain is the", "anterior talofibular ligament (ATFL)", ["deltoid ligament", "calcaneofibular ligament only", "posterior talofibular ligament"], "Inversion with plantarflexion stresses the ATFL."],
  ["Musculoskeletal", "Tennis elbow (lateral epicondylalgia) mainly involves the", "extensor carpi radialis brevis", ["flexor carpi ulnaris", "biceps brachii", "pronator teres only"], "Golfer's elbow affects the medial flexor origin."],
  ["Musculoskeletal", "The capsular pattern of the shoulder (frozen shoulder) loses most", "external rotation, then abduction, then internal rotation", ["internal rotation first", "flexion only", "extension first"], "Adhesive capsulitis follows this pattern."],
  ["Musculoskeletal", "A positive Trendelenburg sign indicates weakness of the", "gluteus medius", ["gluteus maximus", "quadriceps", "hamstrings"], "The pelvis drops on the opposite side when standing on one leg."],
  ["Musculoskeletal", "Osgood–Schlatter disease affects the", "tibial tuberosity", ["patella", "femoral head", "calcaneus"], "Common in active adolescents."],
  ["Musculoskeletal", "Normal shoulder flexion range of motion is about", "0–180 degrees", ["0–90 degrees", "0–45 degrees", "0–270 degrees"], "Measured with a goniometer."],
  ["Peripheral nerves", "Wrist drop is caused by injury to the", "radial nerve", ["ulnar nerve", "median nerve", "axillary nerve"], "Often after a mid-shaft humerus fracture."],
  ["Peripheral nerves", "Foot drop is commonly caused by injury to the", "common peroneal (fibular) nerve", ["tibial nerve", "femoral nerve", "obturator nerve"], "It wraps around the fibular neck."],
  ["Peripheral nerves", "Carpal tunnel syndrome compresses the", "median nerve", ["ulnar nerve", "radial nerve", "musculocutaneous nerve"], "Phalen's and Tinel's tests are used."],
  ["Peripheral nerves", "Erb's palsy affects nerve roots", "C5–C6", ["C8–T1", "L4–L5", "T1–T2"], "The 'waiter's tip' posture."],
  ["Assessment", "In manual muscle testing, grade 3/5 means", "full range of motion against gravity, but no added resistance", ["no contraction", "a flicker of contraction", "full strength"], "Grade 5 is normal strength."],
  ["Assessment", "The Glasgow Coma Scale ranges from", "3 to 15", ["0 to 10", "1 to 20", "5 to 25"], "Eye, verbal and motor responses."],
  ["Assessment", "The modified Ashworth scale measures", "spasticity", ["balance", "pain", "endurance"], "It grades resistance to passive movement."],
  ["Assessment", "The Borg scale (6–20) measures", "rating of perceived exertion", ["pain", "muscle strength", "joint range"], "Used in cardiac rehabilitation."],
  ["Neurology", "The Epley manoeuvre is used to treat", "benign paroxysmal positional vertigo (BPPV)", ["Bell's palsy", "stroke", "Parkinson's disease"], "The Dix–Hallpike test diagnoses posterior canal BPPV."],
  ["Neurology", "A shuffling gait, rigidity and resting tremor suggest", "Parkinson's disease", ["multiple sclerosis", "stroke", "myasthenia gravis"], "Caused by loss of dopamine in the substantia nigra."],
  ["Electrotherapy", "Therapeutic ultrasound should not be applied over", "a pregnant uterus or a known malignancy", ["healthy muscle", "a ligament sprain", "scar tissue"], "Always screen for contraindications."],
  ["Electrotherapy", "TENS is mainly used for", "pain relief", ["muscle strengthening only", "wound healing only", "measuring nerve conduction"], "It works partly through the pain gate mechanism."],
  ["Cardiorespiratory", "Incentive spirometry after surgery helps to", "prevent atelectasis by encouraging deep breaths", ["lower blood pressure", "strengthen leg muscles", "reduce pain medicine"], "Deep breathing re-expands collapsed alveoli."],
];

// ============================================================================ DEN
const DEN: F[] = [
  ["Dental anatomy", "How many permanent teeth does an adult usually have?", "32", ["20", "28 always", "36"], "Including third molars."],
  ["Dental anatomy", "How many primary (deciduous) teeth are there?", "20", ["32", "24", "16"], "There are no premolars in the primary dentition."],
  ["Dental anatomy", "In FDI notation, tooth 11 is the", "upper right central incisor", ["upper left central incisor", "lower right central incisor", "upper right first molar"], "The first digit is the quadrant; the second is the tooth."],
  ["Dental anatomy", "The first permanent molars usually erupt at about age", "6", ["2", "12", "18"], "Second molars erupt around 12."],
  ["Dental anatomy", "The hardest substance in the human body is", "enamel", ["dentine", "cementum", "bone"], "It is highly mineralised hydroxyapatite."],
  ["Cariology", "The bacterium most associated with dental caries is", "Streptococcus mutans", ["Porphyromonas gingivalis", "Staphylococcus aureus", "Candida albicans"], "It ferments sugars and produces acid."],
  ["Cariology", "Fluoride helps prevent caries mainly by", "promoting remineralisation and forming fluorapatite", ["killing all oral bacteria", "whitening teeth", "increasing saliva"], "Fluorapatite is more acid-resistant."],
  ["Operative", "In G.V. Black's classification, a Class II cavity involves", "the proximal surfaces of premolars and molars", ["pits and fissures only", "proximal surfaces of anterior teeth without the incisal angle", "the cervical third"], "Class I is pits and fissures; Class V is cervical."],
  ["Operative", "A Class IV cavity involves", "proximal surfaces of anterior teeth including the incisal angle", ["occlusal pits", "posterior proximal surfaces", "the cervical third only"], "Class III does not include the incisal angle."],
  ["Operative", "Glass ionomer cement is useful because it", "releases fluoride and bonds chemically to tooth structure", ["is the strongest posterior material", "never needs isolation", "contains mercury"], "Often used in children and for cervical lesions."],
  ["Endodontics", "Pain that lingers after a cold stimulus suggests", "irreversible pulpitis", ["reversible pulpitis", "a healthy pulp", "gingivitis"], "Reversible pulpitis pain stops when the stimulus is removed."],
  ["Endodontics", "The most commonly used root canal irrigant is", "sodium hypochlorite", ["hydrogen peroxide only", "saline only", "alcohol"], "It dissolves organic tissue and is antimicrobial."],
  ["Endodontics", "Root canals are most commonly filled (obturated) with", "gutta-percha and sealer", ["amalgam", "composite only", "glass ionomer only"], "This seals the canal system."],
  ["Periodontics", "The key difference between periodontitis and gingivitis is", "loss of attachment and bone in periodontitis", ["bleeding only in periodontitis", "pain in gingivitis", "no plaque in periodontitis"], "Gingivitis is reversible."],
  ["Periodontics", "A healthy gingival sulcus probing depth is usually", "1–3 mm", ["5–7 mm", "8–10 mm", "0 mm"], "Deeper pockets suggest periodontal disease."],
  ["Oral surgery", "Dry socket (alveolar osteitis) usually appears", "2–4 days after an extraction", ["during the extraction", "after 6 months", "only in children"], "It presents with severe pain and an empty socket."],
  ["Oral surgery", "An inferior alveolar nerve block anaesthetises", "mandibular teeth on that side", ["maxillary teeth", "the whole tongue on both sides", "the upper lip"], "The lingual nerve is often anaesthetised too."],
  ["Orthodontics", "In Angle's classification, Class II malocclusion means the lower first molar is", "distal to the upper first molar", ["mesial to the upper first molar", "in a normal relationship", "missing"], "Class III is the reverse."],
  ["Paediatric dentistry", "An avulsed permanent tooth should be", "replanted as soon as possible, or stored in milk", ["scrubbed clean and kept dry", "thrown away", "stored in tap water for days"], "Handle it by the crown, not the root."],
  ["Infection control", "Dental handpieces should be", "sterilised between patients", ["wiped with water only", "reused without cleaning", "soaked in mouthwash"], "Follow standard infection control precautions."],
];

// ============================================================================ PIC
const PIC: F[] = [
  ["PIC role", "Every food establishment in Dubai must have", "at least one certified Person in Charge (PIC)", ["no food safety staff", "a PIC only during inspections", "a PIC only for large hotels"], "The PIC supervises food safety on site."],
  ["PIC role", "The Person in Charge should be", "on site during operating hours to supervise food safety", ["the owner only", "present once a month", "a delivery driver"], "They make sure food safety practices are followed every shift."],
  ["HACCP", "The first principle of HACCP is to", "conduct a hazard analysis", ["keep records", "set critical limits", "take corrective action"], "Then identify critical control points."],
  ["HACCP", "A critical control point (CCP) is", "a step where control is essential to prevent or remove a food safety hazard", ["any step in the kitchen", "the delivery entrance", "the menu price"], "Cooking is a common CCP."],
  ["HACCP", "A critical limit is", "the maximum or minimum value that must be met at a CCP", ["the number of staff on duty", "the shelf life of a product", "the price of food"], "For example, a minimum core cooking temperature."],
  ["HACCP", "When monitoring shows a critical limit has not been met, staff must", "take the planned corrective action", ["ignore it", "serve the food quickly", "change the record"], "Then record what was done."],
  ["HACCP", "The seven HACCP principles end with", "record-keeping and documentation", ["menu design", "pricing", "staff rota"], "Verification is the sixth principle."],
  ["Hazards", "A hair or piece of glass in food is a", "physical hazard", ["biological hazard", "chemical hazard", "allergenic hazard only"], "Biological hazards include bacteria and viruses."],
  ["Hazards", "Cleaning chemicals getting into food is a", "chemical hazard", ["physical hazard", "biological hazard", "temperature hazard"], "Store chemicals away from food."],
  ["Hazards", "Cross-contamination happens when", "harmful bacteria spread from raw food to ready-to-eat food", ["food is cooked properly", "food is chilled", "hands are washed"], "Separate raw and ready-to-eat foods, equipment and boards."],
  ["Temperature control", "The temperature 'danger zone', where bacteria grow fastest, is commonly defined as", "5 °C to 60 °C", ["−18 °C to 0 °C", "60 °C to 100 °C", "0 °C to 1 °C"], "Keep cold food cold and hot food hot."],
  ["Temperature control", "The safest way to thaw frozen meat is", "in the refrigerator", ["on the kitchen counter overnight", "in warm water", "in direct sunlight"], "Plan ahead and keep it below 5 °C."],
  ["Temperature control", "Cooked food that will be stored should be", "cooled quickly and refrigerated", ["left out to cool slowly", "kept warm all day", "covered and left at room temperature"], "Slow cooling allows bacteria to grow."],
  ["Temperature control", "A probe thermometer should be", "cleaned and sanitised before and after use", ["used without cleaning", "stored in raw meat", "used only once a year"], "Check calibration regularly."],
  ["Storage", "Stock should be rotated using", "first in, first out (FIFO)", ["last in, first out", "random order", "newest first"], "Use older stock first."],
  ["Storage", "In a refrigerator, raw meat should be stored", "on the bottom shelf, below ready-to-eat food", ["on the top shelf", "next to salads", "uncovered"], "This prevents drips contaminating other food."],
  ["Storage", "A 'use by' date means", "the food must not be used after that date", ["the food is best quality before that date", "the date it was made", "the date it was delivered"], "'Best before' relates to quality, not safety."],
  ["Personal hygiene", "Food handlers must wash their hands", "before handling food, after using the toilet and after handling raw food or waste", ["only at the start of the shift", "only when visibly dirty", "only after breaks"], "Use soap and warm water and dry thoroughly."],
  ["Personal hygiene", "A food handler with vomiting or diarrhoea should", "report it and stay away from food handling", ["work but wear gloves", "work if they feel able", "only avoid serving customers"], "They can spread foodborne illness."],
  ["Personal hygiene", "Food handlers should", "wear clean uniforms and hair restraints and avoid jewellery", ["wear rings and watches", "touch their hair often", "wear outdoor clothes"], "This reduces physical and biological hazards."],
  ["Cleaning", "Sanitising differs from cleaning because it", "reduces microorganisms to a safe level", ["only removes visible dirt", "is done with water only", "is not needed in kitchens"], "Clean first, then sanitise."],
  ["Pests", "Signs of a pest problem include", "droppings, gnawed packaging and nesting material", ["clean floors", "sealed containers", "cold storage"], "Report pests immediately and use a licensed pest control company."],
];

// ============================================================================ SRA
const SRA: F[] = [
  ["Regulation", "In Dubai, private security guards are licensed by", "the Security Industry Regulatory Agency (SIRA)", ["Dubai Municipality", "the RTA", "the Ministry of Education"], "Guards need a valid SIRA licence (security cadre card) to work."],
  ["Regulation", "The law that regulates the security industry in Dubai is", "Law No. 12 of 2016, as amended by Law No. 3 of 2018", ["the Federal Traffic Law", "the Dubai Food Code", "the Labour Law only"], "It sets out SIRA's licensing role."],
  ["Emergencies", "In the UAE, the emergency number for civil defence (fire) is", "997", ["999", "998", "911"], "999 is police and 998 is ambulance."],
  ["Emergencies", "On discovering a fire, a guard should first", "raise the alarm and ensure people are evacuated safely", ["try to fight a large fire alone", "lock all exits", "continue the patrol"], "Only use an extinguisher on small fires if trained and safe."],
  ["Emergencies", "If you find a suspicious package, you should", "not touch it, clear the area and report it immediately", ["open it to check", "move it outside", "ignore it"], "Use radios at a safe distance, as per site procedure."],
  ["Emergencies", "When taking a bomb threat call, you should", "keep the caller talking and note every detail", ["hang up immediately", "ignore it", "tell the caller you are recording"], "Note the caller's voice, background noise and exact words."],
  ["Emergencies", "During an evacuation, guards should direct people to", "the assembly point using the safest route", ["the lifts", "the car park exits only", "stay at their desks"], "Never use lifts in a fire."],
  ["Duties", "The main role of a security guard is to", "observe, deter and report", ["arrest suspects whenever possible", "punish offenders", "investigate crimes in depth"], "Guards protect people and property and report to the authorities."],
  ["Duties", "Patrols should be", "varied in timing and route", ["at the same time every night", "skipped when quiet", "only in the lobby"], "Predictable patrols are easy to avoid."],
  ["Duties", "Access control means", "checking that only authorised people enter an area", ["letting everyone in quickly", "locking all doors permanently", "checking parking only"], "Check ID and record visitors."],
  ["Duties", "At shift handover, guards should", "brief the next guard and update the logbook", ["leave without speaking", "take the keys home", "delete the records"], "Continuity keeps the site secure."],
  ["Reporting", "A good incident report answers", "who, what, when, where, why and how", ["only what", "only the guard's opinion", "nothing in writing"], "Keep it factual, clear and complete."],
  ["Reporting", "Notes in a security logbook should be", "accurate, factual and made at the time", ["written days later", "full of personal opinions", "kept in pencil and erased"], "They may be used as evidence."],
  ["Crime scene", "If a crime has taken place, the guard should", "protect the scene and keep people out until police arrive", ["clean up the area", "move evidence to a safe place", "let witnesses leave without details"], "Preserve evidence."],
  ["Conduct", "When dealing with an angry visitor, a guard should", "stay calm, listen and use a respectful tone", ["shout back", "use force immediately", "ignore them"], "De-escalation reduces risk."],
  ["Conduct", "A professional guard should", "wear the correct uniform and licence and stay alert on duty", ["use their phone for long periods", "sleep on night shifts", "share site information on social media"], "Professional conduct builds trust."],
  ["Conduct", "Information about the site and clients must be kept", "confidential", ["public", "posted online", "shared with friends"], "Guards often see sensitive information."],
  ["Customer service", "If a child is reported missing in a mall, the guard should", "follow the lost child procedure and alert colleagues immediately", ["wait an hour", "tell the parent to search alone", "close the shift"], "Act quickly and cover exits."],
  ["CCTV", "A CCTV operator should", "monitor screens, record incidents and alert patrolling guards", ["switch off cameras at night", "share footage with the public", "only watch the entrance"], "Footage may be evidence and must be handled carefully."],
];

// ============================================================================
export function mideast(): Record<string, Q[]> {
  return {
    UDR: [...facts("UDR", UDR), ...udrCalc()],
    TLP: facts("TLP", TLP),
    LAB: [...facts("LAB", LAB), ...labCalc()],
    PHT: facts("PHT", PHT),
    DEN: facts("DEN", DEN),
    PIC: facts("PIC", PIC),
    SRA: facts("SRA", SRA),
  };
}
