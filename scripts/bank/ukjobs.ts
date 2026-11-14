// UK jobs that newcomers commonly take:
//   CML — senior carer: medication, Mental Capacity Act, Care Act, CQC, clinical observation
//   EFA — Emergency First Aid at Work
//   SRU — London private hire (PHV) SERU assessment knowledge
//   LGV — HGV/LGV theory and Driver CPC knowledge (drivers' hours, categories, safety)
// Long-established rules only.
import { mcq, Q } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

const CML: F[] = [
  ["Mental Capacity Act", "Under the Mental Capacity Act 2005, what is the first principle?", "A person must be assumed to have capacity unless it is shown they lack it", ["Anyone with dementia lacks capacity", "Family members decide for older people", "Capacity is assessed once for all decisions"], "The five principles start with the presumption of capacity."],
  ["Mental Capacity Act", "Under the MCA, making an unwise decision means a person", "does not necessarily lack capacity", ["definitely lacks capacity", "must be sectioned", "must have a best-interests meeting"], "People have the right to make decisions others disagree with."],
  ["Mental Capacity Act", "Capacity under the MCA is assessed", "for a specific decision at a specific time", ["once a year for everything", "only by a judge", "only on admission"], "Capacity can fluctuate and is decision-specific."],
  ["Mental Capacity Act", "If a person lacks capacity, any decision made for them must be in their", "best interests and the least restrictive option", ["family's interests", "care home's interests", "doctor's convenience"], "These are the fourth and fifth principles."],
  ["Care Act", "Which Act sets out the six principles of adult safeguarding in England?", "Care Act 2014", ["Mental Health Act 1983", "Children Act 1989", "Health and Social Care Act 2008 only"], "Empowerment, prevention, proportionality, protection, partnership and accountability."],
  ["Care Act", "Which is one of the six safeguarding principles of the Care Act 2014?", "Proportionality", ["Profitability", "Punishment", "Secrecy"], "Act in the least intrusive way appropriate to the risk."],
  ["Regulation", "Which body regulates adult social care services in England?", "Care Quality Commission (CQC)", ["Ofsted", "NMC", "HSE only"], "Ofsted regulates children's services and education."],
  ["Regulation", "CQC inspections ask five key questions: is the service safe, effective, caring, responsive and", "well-led", ["well-funded", "well-staffed", "well-known"], "Services are rated Outstanding, Good, Requires improvement or Inadequate."],
  ["Medication", "The 'rights' of medication administration include right person, right medicine, right dose, right time, right route and right", "documentation (record)", ["price", "colour", "pharmacy"], "Record every dose given or refused on the MAR chart."],
  ["Medication", "What is a MAR chart?", "A Medication Administration Record for each person", ["A staff rota", "A fire risk assessment", "A menu plan"], "It records each dose given, refused or omitted."],
  ["Medication", "PRN medication is given", "only when needed, following the person's PRN protocol", ["every morning without fail", "at the carer's choice without guidance", "only at night"], "PRN means 'pro re nata', as required."],
  ["Medication", "Controlled drugs in a care home must be", "stored in a locked controlled-drugs cabinet and recorded in a CD register, usually with two signatures", ["kept in the person's handbag", "stored with food", "left on the medicine trolley"], "Strict storage and recording rules apply."],
  ["Medication", "If a person refuses their medication, the carer should", "respect the refusal, record it and report it according to policy", ["hide it in their food", "force them to take it", "give double the next time"], "Covert medication needs a formal MCA best-interests process with the GP and pharmacist."],
  ["Medication", "Giving medication hidden in food or drink without the person knowing is called", "covert administration", ["PRN dosing", "self-administration", "a crushed tablet protocol"], "It is only lawful after a capacity assessment and best-interests decision."],
  ["Clinical", "NEWS2 is a tool used to", "spot early signs of a person's health getting worse", ["plan meals", "write rotas", "score fire safety"], "It scores observations such as pulse, breathing and temperature."],
  ["Clinical", "SSKIN is a care bundle used to prevent", "pressure ulcers", ["falls", "infections", "dehydration only"], "Surface, Skin inspection, Keep moving, Incontinence/moisture, Nutrition."],
  ["Clinical", "IDDSI levels describe", "food and drink textures for people with swallowing difficulties", ["staff grades", "medication strengths", "pressure ulcer stages"], "Levels run from 0 (thin drinks) to 7 (regular food)."],
  ["Clinical", "Signs such as confusion, fast breathing and very high or low temperature in an unwell person may indicate", "sepsis — escalate urgently", ["normal ageing", "tiredness only", "a cold"], "Sepsis is a medical emergency."],
  ["Rights", "How many protected characteristics are there under the Equality Act 2010?", "9", ["5", "7", "12"], "They include age, disability, race, religion or belief, sex and sexual orientation."],
  ["Rights", "Workers who report wrongdoing in the public interest are protected by", "the Public Interest Disclosure Act 1998 (whistleblowing)", ["the Data Protection Act only", "the Mental Health Act", "the Children Act"], "Raise concerns through your organisation or the CQC."],
  ["Rights", "The duty of candour requires providers to", "be open and honest with people when something goes wrong", ["hide mistakes", "only tell family members", "apologise only if sued"], "It is a CQC regulation."],
];

const EFA: F[] = [
  ["Assessment", "When you find a casualty, what should you check first?", "Danger — make sure the area is safe", ["Their wallet for ID", "Their pulse", "Whether they have eaten"], "Use DR ABC: Danger, Response, Airway, Breathing, Circulation."],
  ["CPR", "For adult CPR, the ratio of chest compressions to rescue breaths is", "30:2", ["15:2", "5:1", "10:2"], "Hands-only CPR is fine if you are unwilling or unable to give breaths."],
  ["CPR", "Adult chest compressions should be at a rate of", "100–120 per minute", ["60 per minute", "30–40 per minute", "150–200 per minute"], "Push hard and fast in the centre of the chest."],
  ["CPR", "Adult chest compressions should be about how deep?", "5–6 cm", ["1–2 cm", "10 cm", "Just touching the chest"], "Allow full recoil between compressions."],
  ["CPR", "An AED is used to", "deliver a shock to restart a normal heart rhythm in cardiac arrest", ["measure blood pressure", "clear the airway", "stop bleeding"], "Follow its spoken instructions; anyone can use one."],
  ["Unresponsive", "An unresponsive casualty who is breathing normally should be placed", "in the recovery position", ["sitting upright", "flat on their back unattended", "face down"], "Keep checking their breathing."],
  ["Choking", "For an adult who is choking and cannot cough effectively, first give", "up to 5 back blows", ["water to drink", "CPR straight away", "5 rescue breaths"], "Then up to 5 abdominal thrusts, and repeat."],
  ["Bleeding", "The first treatment for severe external bleeding is", "direct pressure on the wound", ["raising the legs only", "giving a drink", "removing embedded objects"], "Call 999 for severe bleeding."],
  ["Shock", "A casualty in shock should be", "laid down with legs raised (if injuries allow) and kept warm", ["given food", "made to walk around", "sat in a cold room"], "Shock can be life-threatening — call 999."],
  ["Burns", "A burn should be cooled under cool running water for at least", "20 minutes", ["30 seconds", "2 minutes", "2 hours"], "Remove jewellery near the burn and cover with cling film."],
  ["Medical", "The FAST test is used to recognise a", "stroke", ["heart attack", "diabetic emergency", "seizure"], "Face, Arms, Speech, Time to call 999."],
  ["Medical", "During a seizure, you should", "protect the person from injury and not restrain them", ["put something in their mouth", "hold them down", "give them water"], "Time the seizure; call 999 if it lasts more than 5 minutes."],
  ["Medical", "A person with diabetes who is shaky, sweaty and confused (hypoglycaemia) should be given", "a sugary drink or sweets if they can swallow", ["insulin", "nothing at all", "a salty snack"], "Then a longer-acting carbohydrate when they improve."],
  ["Medical", "In anaphylaxis, an adrenaline auto-injector is given into the", "outer thigh", ["arm vein", "stomach", "chest"], "Call 999 immediately."],
  ["Medical", "During an asthma attack, help the person to", "use their reliever inhaler (usually blue) and sit upright", ["lie flat", "breathe into a paper bag", "drink milk"], "Call 999 if it does not improve."],
  ["Law", "Which regulations require employers to provide adequate first aid at work?", "Health and Safety (First-Aid) Regulations 1981", ["COSHH Regulations 2002", "Working Time Regulations 1998", "RIDDOR 2013"], "RIDDOR covers reporting certain injuries to the HSE."],
];

const SRU: F[] = [
  ["Licensing", "Who licenses private hire vehicles, drivers and operators in London?", "Transport for London (TfL)", ["The Metropolitan Police", "DVLA", "Local councils in each borough"], "Outside London, local councils license private hire."],
  ["Licensing", "A London private hire journey must be", "pre-booked through a licensed operator", ["hailed on the street", "arranged by the driver directly with passers-by", "taken from a taxi rank"], "Only taxis (black cabs) can be hailed or use ranks."],
  ["Licensing", "Approaching people to offer an unbooked ride (touting) is", "a criminal offence", ["allowed late at night", "allowed near stations", "allowed if the fare is low"], "Touting puts passengers at risk."],
  ["Licensing", "While working, a private hire driver must", "wear or display their TfL driver badge", ["hide their badge", "only show it if asked by police", "leave it at home"], "Passengers should be able to check the driver is licensed."],
  ["Equality", "Under the Equality Act 2010, a private hire driver must carry an assistance dog", "at no extra charge, unless they hold a medical exemption certificate", ["only if there is space", "for an extra fee", "only in the boot"], "Refusing is a criminal offence."],
  ["Equality", "A passenger who uses a wheelchair should be", "helped and not charged extra because of their disability", ["refused politely", "charged a higher fare", "told to book a bus"], "Discrimination is unlawful under the Equality Act 2010."],
  ["Safeguarding", "If you believe a passenger is in immediate danger, you should", "call 999", ["drive away", "post it on social media", "wait until the end of your shift"], "For non-urgent concerns, report through the proper channels."],
  ["Safeguarding", "Which may be a sign of child sexual exploitation or county lines?", "A child travelling alone late at night with older adults or large amounts of cash", ["A family going on holiday", "A student going to school", "A parent collecting a child"], "Drivers are often the eyes and ears of the community."],
  ["Safety", "Using a hand-held mobile phone while driving is", "illegal", ["allowed in traffic", "allowed for satnav only if held", "allowed at red lights"], "Use a hands-free holder set up before driving."],
  ["Safety", "Passengers should be dropped off", "somewhere safe and legal, where they can get out without risk", ["in the middle of a junction", "on a red route stopping restriction", "in a bus lane during its hours"], "Follow the Highway Code and parking rules."],
  ["Conduct", "If a passenger makes a complaint, the driver should", "remain polite and let the operator handle it through its procedure", ["argue with the passenger", "refuse future bookings from the area", "ignore it"], "Operators must keep records of complaints."],
  ["Requirements", "To get a London PHV driver licence, applicants must pass", "an enhanced DBS check, a medical, and TfL's assessments", ["only a driving test", "no checks", "a university degree"], "TfL also checks right to work and English language skills."],
];

const LGV: F[] = [
  ["Drivers' hours", "Under GB/EU drivers' hours rules, the maximum daily driving time is normally", "9 hours (extendable to 10 hours twice a week)", ["8 hours", "11 hours", "13 hours"], "Breaks and rest periods must also be taken."],
  ["Drivers' hours", "After 4.5 hours of driving, a driver must take a break of at least", "45 minutes (which may be split into 15 then 30 minutes)", ["15 minutes", "30 minutes", "1 hour"], "The split must be 15 minutes first, then 30 minutes."],
  ["Drivers' hours", "The maximum driving in a single week under GB/EU rules is", "56 hours", ["48 hours", "60 hours", "90 hours"], "And no more than 90 hours in any two consecutive weeks."],
  ["Drivers' hours", "The maximum driving in any two consecutive weeks is", "90 hours", ["56 hours", "100 hours", "112 hours"], "This stops drivers doing 56 hours every week."],
  ["Drivers' hours", "A regular daily rest period is at least", "11 hours", ["8 hours", "9 hours", "13 hours"], "It can be reduced to 9 hours up to three times between weekly rests."],
  ["Driver CPC", "How many hours of periodic training must a professional driver complete every 5 years for Driver CPC?", "35 hours", ["7 hours", "20 hours", "50 hours"], "Usually done as five 7-hour courses."],
  ["Licences", "Which licence category covers vehicles between 3.5 and 7.5 tonnes?", "C1", ["C", "D1", "B"], "Category C covers vehicles over 3.5 tonnes; C+E adds a heavy trailer."],
  ["Licences", "Category D covers", "buses with more than 8 passenger seats", ["lorries over 3.5 tonnes", "motorcycles", "tractors"], "D1 covers minibuses with up to 16 passenger seats."],
  ["Speed", "Goods vehicles over 3.5 tonnes must be fitted with a speed limiter set at", "56 mph (90 km/h)", ["70 mph", "50 mph", "60 mph"], "Limiters must be working and calibrated."],
  ["Speed", "In England and Wales, the speed limit for a goods vehicle over 7.5 tonnes on a single carriageway is", "50 mph", ["40 mph", "60 mph", "70 mph"], "It is 60 mph on dual carriageways and motorways."],
  ["Brakes", "On a lorry's air brake couplings, the red line is the", "emergency (supply) line", ["service line", "electrical line", "fuel line"], "The yellow line is the service line."],
  ["Checks", "A driver's daily walkaround check should be done", "before the vehicle is used at the start of each shift", ["once a month", "only after an accident", "by the mechanic only"], "Report and record any defects."],
  ["Safety", "Class V and Class VI mirrors on lorries help the driver see", "blind spots close to the cab, especially on the passenger side", ["the rear doors only", "the fuel tank", "traffic lights ahead"], "Cyclists and pedestrians are at risk in these areas."],
  ["Safety", "Before driving under a low bridge, a lorry driver must know", "the vehicle's full travelling height", ["the fuel level", "the tyre brand", "the radio frequency"], "Display the height in the cab, in feet and metres."],
  ["Tachographs", "A digital tachograph records", "driving time, other work, breaks and rest", ["fuel prices", "road tax payments", "insurance details"], "Drivers use a personal driver card."],
];

export function ukjobs(): Record<string, Q[]> {
  return { CML: facts("CML", CML), EFA: facts("EFA", EFA, 1), SRU: facts("SRU", SRU, 1), LGV: facts("LGV", LGV) };
}
