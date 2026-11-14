// More UK jobs:
//   BSR — 18th Edition wiring regulations (BS 7671) for electricians
//   EYT — Teaching assistant & Early Years (Level 3 knowledge, England)
//   WHF — Warehouse & forklift theory
//   HCA — NHS healthcare assistant (role knowledge & interview)
// Long-established rules only; electrical calculations are generated from Ohm's law.
import { fmt, mcq, numOpts, pick, Q, repeat } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;

const BSR: F[] = [
  ["General", "BS 7671:2018 (the 18th Edition) came into effect on", "1 January 2019", ["1 July 2018", "1 January 2018", "1 April 2020"], "Amendments have been issued since."],
  ["General", "Which law places duties on people to prevent danger from electricity at work?", "Electricity at Work Regulations 1989", ["COSHH Regulations 2002", "Gas Safety Regulations 1998", "Working Time Regulations 1998"], "BS 7671 is a standard, not law, but complying with it helps meet these duties."],
  ["General", "The nominal UK single-phase supply voltage is", "230 V", ["240 V", "110 V", "400 V"], "Three-phase line voltage is 400 V."],
  ["Earthing", "Which earthing system is commonly known as PME?", "TN-C-S", ["TN-S", "TT", "IT"], "The supply neutral and earth are combined in the supply cable."],
  ["Earthing", "In a TT system, earth fault protection usually relies on", "the installation's own earth electrode and an RCD", ["the supplier's cable sheath", "the gas pipe", "a combined neutral and earth"], "The earth path through the ground has high impedance."],
  ["Earthing", "The maximum Ze typically declared by DNOs for a TN-C-S supply is", "0.35 Ω", ["0.8 Ω", "21 Ω", "200 Ω"], "For TN-S it is typically 0.8 Ω."],
  ["Earthing", "Main protective bonding to gas and water pipes should be connected", "as near as practicable to the point of entry, within 600 mm of the meter outlet where practicable", ["at the furthest point from the meter", "only to plastic pipes", "inside the consumer unit"], "Use a suitable earth clamp with a warning label."],
  ["Protection", "Socket-outlets rated up to 32 A must generally have additional protection by an RCD of", "30 mA", ["100 mA", "300 mA", "5 mA"], "Exceptions are limited and must be documented."],
  ["Protection", "For TN systems, the maximum disconnection time for a 230 V final circuit up to 32 A is", "0.4 seconds", ["5 seconds", "1 second", "0.2 seconds"], "For TT systems it is 0.2 seconds."],
  ["Protection", "A 30 mA RCD tested at five times its rated current (150 mA) should trip within", "40 ms", ["300 ms", "1 second", "5 seconds"], "At its rated current it should trip within 300 ms."],
  ["Circuits", "A standard domestic ring final circuit uses 2.5 mm² cable protected by a device rated at", "32 A", ["16 A", "6 A", "45 A"], "It should serve a floor area of no more than 100 m²."],
  ["Circuits", "The recommended maximum floor area served by a 32 A ring final circuit is", "100 m²", ["50 m²", "200 m²", "20 m²"], "Use more circuits for larger areas."],
  ["Circuits", "Voltage drop from the origin should not exceed 3% for lighting and", "5% for other uses", ["10% for other uses", "1% for other uses", "3% for other uses"], "For 230 V that is 6.9 V and 11.5 V."],
  ["Cables", "In fixed wiring, the line conductor of a single-phase circuit is", "brown", ["red", "blue", "black"], "Neutral is blue; the protective conductor is green and yellow."],
  ["Cables", "The three line conductors in a three-phase circuit are coloured", "brown, black and grey", ["red, yellow and blue", "brown, blue and green", "black, white and red"], "The old red, yellow, blue colours are no longer used for new work."],
  ["Locations", "In a bathroom, electrical equipment in zones 1 and 2 must be at least", "IPX4", ["IP20", "IPX0", "IP2X"], "Zone 0 equipment must be at least IPX7."],
  ["Locations", "Socket-outlets in a room containing a bath or shower must be at least how far from the boundary of zone 1?", "3 m", ["0.6 m", "1 m", "2 m"], "Shaver supply units are an exception."],
  ["Testing", "Which test is done first on a new installation?", "Continuity of protective conductors", ["Earth fault loop impedance", "RCD testing", "Functional testing"], "Dead tests come before live tests."],
  ["Testing", "Insulation resistance on 230 V circuits is tested at 500 V DC with a minimum acceptable value of", "1 MΩ", ["0.5 MΩ", "2 Ω", "100 MΩ"], "SELV/PELV circuits are tested at 250 V DC."],
  ["Testing", "Safe isolation is proved using", "an approved voltage indicator checked on a proving unit before and after testing", ["a multimeter on the ohms range", "the back of your hand", "the consumer unit labels"], "Test leads should meet HSE guidance GS38."],
  ["Certification", "On an EICR, observation code C1 means", "danger present — immediate action required", ["improvement recommended", "potentially dangerous — urgent action required", "further investigation required"], "C2 is potentially dangerous; C3 is improvement recommended; FI is further investigation."],
  ["Certification", "Which certificate is used for adding a socket to an existing circuit?", "Minor Electrical Installation Works Certificate", ["Electrical Installation Certificate", "EICR", "Gas Safe certificate"], "A new circuit needs an Electrical Installation Certificate."],
  ["Certification", "In England, private landlords must have the electrical installation inspected and tested at least every", "5 years", ["1 year", "10 years", "3 years"], "Under the 2020 Private Rented Sector regulations."],
  ["Regulations", "In England, notifiable domestic electrical work falls under", "Part P of the Building Regulations", ["Part L only", "The Gas Safety Regulations", "The Equality Act"], "Examples include new circuits and consumer unit replacements."],
];
function ohms(): Q[] {
  return repeat(10, () => {
    const which = pick(["I", "P", "R"]);
    if (which === "I") {
      const P = pick([920, 1150, 2300, 3000, 6900, 9200]), ans = r(P / 230, 2);
      return mcq("BSR", "Calculations", `A ${P} W heater runs on 230 V. What current does it draw? (I = P ÷ V)`, fmt(ans, "A"),
        numOpts(ans, [r(P * 230 / 1000, 1), r(230 / P, 3), r(P / 400, 2)], "A"), `${P} ÷ 230 = ${fmt(ans)} A.`, 1);
    }
    if (which === "P") {
      const I = pick([4, 5, 10, 13, 16, 20]), ans = 230 * I;
      return mcq("BSR", "Calculations", `A load draws ${I} A at 230 V. What is its power? (P = V × I)`, fmt(ans, "W"),
        numOpts(ans, [r(230 / I, 1), 400 * I, I * I * 230], "W"), `230 × ${I} = ${ans} W.`, 1);
    }
    const I = pick([2, 4, 5, 10, 23]), ans = r(230 / I, 2);
    return mcq("BSR", "Calculations", `A resistive load draws ${I} A from 230 V. What is its resistance? (R = V ÷ I)`, fmt(ans, "Ω"),
      numOpts(ans, [230 * I, r(I / 230, 3), r(400 / I, 2)], "Ω"), `230 ÷ ${I} = ${fmt(ans)} Ω.`, 1);
  });
}
function voltDrop(): Q[] {
  return repeat(6, () => {
    const lighting = pick([true, false]), pct = lighting ? 3 : 5, ans = r((230 * pct) / 100, 1);
    return mcq("BSR", "Calculations", `On a 230 V supply, what is the maximum voltage drop allowed for a ${lighting ? "lighting" : "power (non-lighting)"} circuit (${pct}%)?`, fmt(ans, "V"),
      numOpts(ans, [r(230 * (lighting ? 5 : 3) / 100, 1), r(400 * pct / 100, 1), pct], "V"), `${pct}% of 230 V = ${fmt(ans)} V.`, 1);
  });
}

const EYT: F[] = [
  ["EYFS", "The Early Years Foundation Stage (EYFS) covers children from", "birth to 5 years", ["3 to 7 years", "5 to 11 years", "birth to 3 years"], "It sets standards for learning, development and care."],
  ["EYFS", "Which is one of the three prime areas of learning in the EYFS?", "Communication and language", ["Mathematics", "Literacy", "Understanding the world"], "The others are physical development and personal, social and emotional development."],
  ["EYFS", "Which is one of the four specific areas of learning in the EYFS?", "Expressive arts and design", ["Physical development", "Communication and language", "Personal, social and emotional development"], "The others are literacy, mathematics and understanding the world."],
  ["EYFS", "In group settings in England, the staff-to-child ratio for children under 2 is", "1:3", ["1:5", "1:8", "1:13"], "For 2-year-olds it is 1:5."],
  ["EYFS", "The EYFS requires at least one person on the premises with a", "paediatric first aid certificate", ["teaching degree", "driving licence", "food hygiene certificate only"], "And on outings."],
  ["Safeguarding", "What is the statutory safeguarding guidance for schools and colleges in England?", "Keeping Children Safe in Education (KCSIE)", ["The Care Certificate", "The Highway Code", "Ofsted handbook only"], "All staff must read at least Part One."],
  ["Safeguarding", "If a child tells you they are being abused, you should", "listen, not promise to keep it secret, and report to the Designated Safeguarding Lead straight away", ["investigate yourself", "promise to keep it secret", "ask leading questions"], "Record what was said in the child's own words."],
  ["Safeguarding", "Allegations that a member of staff may have harmed a child are referred to the", "LADO (Local Authority Designated Officer)", ["CQC", "school governors only", "child's classmates"], "Follow the school's allegations procedure."],
  ["Safeguarding", "The Prevent duty is about", "protecting people from being drawn into terrorism", ["preventing bullying only", "preventing absence", "preventing illness"], "Concerns go to the DSL."],
  ["SEND", "Who coordinates special educational needs provision in a school?", "The SENCO", ["The caretaker", "The bursar", "The PE teacher"], "Special Educational Needs Coordinator."],
  ["SEND", "The SEND Code of Practice's graduated approach follows the cycle", "assess, plan, do, review", ["plan, teach, test, mark", "observe, report, punish, reward", "identify, label, exclude, refer"], "It keeps support under regular review."],
  ["SEND", "A legal document setting out a child's special educational needs and the support they must get is an", "Education, Health and Care (EHC) plan", ["IEP only", "attendance report", "school report"], "EHC plans cover ages 0–25."],
  ["Curriculum", "In England, Key Stage 1 covers", "Years 1 and 2 (ages 5–7)", ["Years 3 to 6", "Reception only", "Years 7 to 9"], "Key Stage 2 is Years 3 to 6."],
  ["Curriculum", "The phonics screening check is taken in", "Year 1", ["Reception", "Year 4", "Year 6"], "Children who do not meet the standard retake it in Year 2."],
  ["Curriculum", "In phonics, a grapheme is", "a letter or group of letters representing a sound", ["a single sound", "a whole word", "a type of sentence"], "A phoneme is the sound itself."],
  ["Development", "In Piaget's theory, the pre-operational stage covers roughly ages", "2 to 7", ["0 to 2", "7 to 11", "11 and over"], "It is followed by the concrete operational stage."],
  ["Development", "Vygotsky's 'zone of proximal development' is", "what a child can do with help but not yet alone", ["what a child can never learn", "a classroom layout", "a behaviour sanction"], "Adults support learning through scaffolding."],
  ["Development", "Bowlby is best known for his theory of", "attachment", ["multiple intelligences", "operant conditioning", "phonics"], "Secure attachment supports emotional development."],
  ["Inspection", "Which body inspects schools and early years settings in England?", "Ofsted", ["CQC", "HSE", "the DBS"], "The CQC inspects health and adult social care."],
  ["Role", "A teaching assistant who works closely with children needs which check?", "An enhanced DBS check (with barred list check for regulated activity)", ["A driving licence check", "A credit check", "No check"], "Schools also check right to work and references."],
];

const WHF: F[] = [
  ["Law", "Which regulations cover lifting equipment such as forklifts, including thorough examinations?", "LOLER 1998", ["COSHH 2002", "RIDDOR 2013", "Working Time Regulations 1998"], "PUWER 1998 also applies to all work equipment."],
  ["Law", "Under LOLER, a forklift truck that does not lift people must have a thorough examination at least every", "12 months", ["5 years", "1 month", "never"], "Equipment for lifting people, and lifting accessories, need examining every 6 months."],
  ["Law", "Which HSE Approved Code of Practice covers training for rider-operated lift trucks?", "L117", ["L8", "HSG65", "GS38"], "It sets out basic, specific and familiarisation training."],
  ["Manual handling", "Under the Manual Handling Operations Regulations 1992, the first step is to", "avoid hazardous manual handling where reasonably practicable", ["lift faster", "wear gloves", "work alone"], "Then assess unavoidable tasks and reduce the risk."],
  ["Manual handling", "The TILE(O) approach to manual handling assessment stands for", "Task, Individual, Load, Environment (Other factors)", ["Time, Item, Lift, Effort", "Truck, Inventory, Labour, Equipment", "Training, Inspection, Lifting, Emergencies"], "Each factor is assessed for risk."],
  ["Forklift", "Where can you find a forklift's maximum rated capacity?", "On the truck's data (capacity) plate", ["On the fuel tank", "In the canteen", "On the tyres"], "Capacity falls as the load centre or lift height increases."],
  ["Forklift", "When travelling with a load, the forks should be", "lowered close to the ground and tilted back", ["raised high for visibility", "tilted forward", "fully extended sideways"], "This keeps the centre of gravity low."],
  ["Forklift", "When driving a loaded counterbalance truck on a slope, the load should face", "uphill", ["downhill", "sideways", "it doesn't matter"], "Never turn on a slope."],
  ["Forklift", "If a counterbalance truck starts to tip over sideways, the operator should", "stay in the seat with the seatbelt on, hold the wheel, brace and lean away from the fall", ["jump out", "lean towards the fall", "raise the forks"], "Jumping out often leads to being crushed."],
  ["Forklift", "Carrying passengers on a forklift is", "not allowed unless the truck is designed for it", ["allowed on the forks", "allowed for short distances", "allowed for supervisors"], "Never use the forks as a work platform."],
  ["Forklift", "Before using a forklift each shift, the operator should", "carry out and record pre-use checks", ["only check the fuel", "skip checks if the truck was used yesterday", "ask a pedestrian to test it"], "Report defects and do not use an unsafe truck."],
  ["Forklift", "Forklift battery charging areas must be well ventilated because charging can release", "hydrogen gas", ["carbon monoxide", "oxygen", "chlorine"], "Hydrogen is highly flammable."],
  ["Storage", "Pallet racking should be inspected by a technically competent person at least", "every 12 months", ["every 10 years", "only after a collision", "never"], "Staff should also report damage daily."],
  ["Storage", "In racking damage assessment, 'red' damage means", "off-load immediately and isolate until repaired", ["no action needed", "repair within 4 weeks", "monitor only"], "Amber means hazardous but can be off-loaded and repaired soon."],
  ["Operations", "FIFO stock rotation means", "first in, first out", ["fast in, fast out", "full items first out", "final inventory, final order"], "Older stock is used before newer stock."],
  ["Operations", "The usual order of warehouse operations is", "goods-in, put-away, picking, packing, despatch", ["packing, picking, goods-in, despatch", "despatch, goods-in, picking", "put-away, despatch, goods-in"], "A WMS tracks stock through each stage."],
  ["Safety", "In a warehouse, pedestrians and vehicles should be", "separated with marked walkways and barriers wherever possible", ["mixed freely", "allowed to cross anywhere", "kept in the same lanes"], "Segregation is a key control in HSE guidance."],
];

const HCA: F[] = [
  ["Values", "The '6Cs' of nursing and care are care, compassion, competence, communication, courage and", "commitment", ["control", "cost", "cleanliness"], "They underpin NHS care values."],
  ["Values", "Which is one of the NHS Constitution's values?", "Respect and dignity", ["Profit first", "Speed over safety", "Seniority"], "Others include compassion and 'everyone counts'."],
  ["Interview", "The STAR method for interview answers stands for", "Situation, Task, Action, Result", ["Skill, Training, Attitude, Role", "Start, Think, Answer, Review", "Safety, Team, Action, Reflection"], "Use real examples from work, study or volunteering."],
  ["Observations", "A normal resting heart rate for an adult is about", "60–100 beats per minute", ["20–40 beats per minute", "120–160 beats per minute", "200 beats per minute"], "Report readings outside the normal range."],
  ["Observations", "A normal adult respiratory rate is about", "12–20 breaths per minute", ["4–8 breaths per minute", "30–40 breaths per minute", "60 breaths per minute"], "Rapid breathing can be an early warning sign."],
  ["Observations", "For most adults, the target oxygen saturation (SpO₂) is", "94–98%", ["50–60%", "80–85%", "100% always"], "Some people with COPD have a lower target of 88–92%."],
  ["Observations", "NEWS2 scores are used to", "detect deterioration and decide when to escalate", ["plan meals", "book appointments", "measure staff performance"], "A higher score needs a more urgent response."],
  ["Infection control", "How many 'moments for hand hygiene' does the WHO describe?", "5", ["3", "10", "1"], "Before and after touching a patient are two of them."],
  ["Infection control", "'Bare below the elbows' means", "short sleeves, no wrist watches or jewellery except a plain band", ["no gloves ever", "rolled-up trousers", "no uniform"], "It allows effective hand washing."],
  ["Infection control", "After use, needles should be", "disposed of straight into a sharps bin without re-sheathing", ["re-sheathed by hand", "put in a general waste bag", "left on the tray"], "Never overfill a sharps bin."],
  ["Nutrition", "The MUST tool is used to screen for", "malnutrition", ["falls risk", "pain", "dementia"], "Malnutrition Universal Screening Tool."],
  ["Continence", "The Bristol Stool Chart classifies stools into how many types?", "7", ["3", "5", "10"], "Types 1–2 suggest constipation; 6–7 diarrhoea."],
  ["Skin", "Pressure ulcers are graded in categories from", "1 to 4 (plus unstageable and deep tissue injury)", ["A to Z", "1 to 10", "mild or severe only"], "Category 1 is non-blanching redness of intact skin."],
  ["Confidentiality", "The Caldicott principles guide", "the use and sharing of confidential patient information", ["staff uniforms", "car parking", "drug doses"], "Every NHS organisation has a Caldicott Guardian."],
  ["Role", "New healthcare assistants in England are expected to complete", "the Care Certificate", ["a nursing degree first", "a driving test", "no training"], "It sets out 15 standards for health and care support workers."],
  ["Role", "Most NHS healthcare assistant posts are paid on Agenda for Change", "Band 2 or 3", ["Band 7", "Band 8a", "Band 9"], "Senior HCAs are often Band 3."],
];

export function ukjobs2(): Record<string, Q[]> {
  return { BSR: [...facts("BSR", BSR), ...ohms(), ...voltDrop()], EYT: facts("EYT", EYT, 1), WHF: facts("WHF", WHF, 1), HCA: facts("HCA", HCA, 1) };
}
