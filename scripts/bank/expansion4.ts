// Wave 4 starter banks: Nigeria home market (Common Entrance, Junior WAEC, civil service promotion),
// IOSH Managing Safely, and oil & gas (HSE essentials + Nigerian industry knowledge).
// Stable, well-established facts only. The question factory grows these after launch.
import { mcq, Q } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));

// ---------------------------------------------------------------------------
// NGS — Common Entrance general studies (Primary 6, Nigeria)
// ---------------------------------------------------------------------------
const NGS: F[] = [
  ["Nigeria", "When did Nigeria become independent?", "1 October 1960", ["1 October 1963", "12 June 1993", "29 May 1999"], "Nigeria gained independence from Britain on 1 October 1960."],
  ["Nigeria", "What is the capital of Nigeria?", "Abuja", ["Lagos", "Kaduna", "Ibadan"], "Abuja became the capital in 1991; Lagos was the capital before."],
  ["Nigeria", "How many states does Nigeria have?", "36", ["30", "37", "19"], "There are 36 states plus the Federal Capital Territory."],
  ["Nigeria", "What are the colours of the Nigerian flag?", "Green, white, green", ["Green, yellow, green", "White, green, white", "Green, white, red"], "Green for agriculture, white for peace."],
  ["Nigeria", "Who designed the Nigerian flag?", "Taiwo Akinkunmi", ["Nnamdi Azikiwe", "Obafemi Awolowo", "Herbert Macaulay"], "He designed it as a student in 1959."],
  ["Nigeria", "What does the green on the Nigerian flag stand for?", "Agriculture", ["Peace", "Unity", "Oil"], "The white band stands for peace."],
  ["Nigeria", "What is Nigeria's national motto?", "Unity and Faith, Peace and Progress", ["Freedom and Justice", "One Nation, One Destiny", "Truth and Service"], "It appears on the coat of arms."],
  ["Nigeria", "On the coat of arms, what do the two white horses stand for?", "Dignity", ["Strength", "Fertile soil", "The two rivers"], "The eagle stands for strength."],
  ["Nigeria", "On the coat of arms, the wavy 'Y' shape stands for", "the Rivers Niger and Benue", ["the three regions", "the roads to Abuja", "the coastline"], "The two rivers meet at Lokoja."],
  ["Nigeria", "Who was Nigeria's first President?", "Dr Nnamdi Azikiwe", ["Sir Abubakar Tafawa Balewa", "Chief Obafemi Awolowo", "General Yakubu Gowon"], "He became President when Nigeria became a republic in 1963."],
  ["Nigeria", "Who was Nigeria's first Prime Minister?", "Sir Abubakar Tafawa Balewa", ["Dr Nnamdi Azikiwe", "Sir Ahmadu Bello", "Chief Obafemi Awolowo"], "He led the government at independence."],
  ["Nigeria", "Where do the Rivers Niger and Benue meet?", "Lokoja", ["Onitsha", "Makurdi", "Jebba"], "Lokoja is the capital of Kogi State."],
  ["Nigeria", "What is the longest river in Nigeria?", "River Niger", ["River Benue", "Ogun River", "Cross River"], "The Niger flows through several West African countries."],
  ["Nigeria", "What is Nigeria's currency?", "Naira", ["Cedi", "Shilling", "Pound"], "One naira is 100 kobo."],
  ["Nigeria", "What are the three tiers of government in Nigeria?", "Federal, state and local government", ["President, governor and chairman", "Senate, House and courts", "North, East and West"], "Each tier has its own responsibilities."],
  ["Nigeria", "Zuma Rock is found near", "Abuja", ["Lagos", "Jos", "Enugu"], "It is in Niger State, near Abuja."],
  ["Science", "How many sense organs do humans have?", "5", ["4", "6", "7"], "Eyes, ears, nose, tongue and skin."],
  ["Science", "Which part of a plant makes food?", "Leaf", ["Root", "Stem", "Flower"], "Leaves make food by photosynthesis."],
  ["Science", "Which part of a plant takes in water from the soil?", "Root", ["Leaf", "Flower", "Fruit"], "Roots also hold the plant firmly."],
  ["Science", "Water boils at", "100°C", ["0°C", "50°C", "212°C"], "Water freezes at 0°C."],
  ["Science", "How many planets are in our solar system?", "8", ["9", "7", "10"], "Pluto is now called a dwarf planet."],
  ["Science", "Which planet do we live on?", "Earth", ["Mars", "Venus", "Jupiter"], "Earth is the third planet from the Sun."],
  ["Science", "Which teeth are used for cutting food?", "Incisors", ["Molars", "Canines", "Premolars"], "Molars grind food; canines tear it."],
  ["Science", "How many colours are in a rainbow?", "7", ["5", "6", "8"], "Red, orange, yellow, green, blue, indigo, violet."],
  ["Science", "Which of these is a living thing?", "A goat", ["A stone", "A chair", "Water"], "Living things grow, feed, breathe and reproduce."],
  ["Science", "Malaria is spread by", "mosquitoes", ["houseflies", "cockroaches", "rats"], "Sleeping under a treated net helps prevent malaria."],
  ["Health", "Which food class helps the body grow and repair itself?", "Protein", ["Carbohydrate", "Fat and oil", "Water"], "Beans, fish, eggs and meat are rich in protein."],
  ["Health", "Which food class gives the body energy?", "Carbohydrate", ["Protein", "Vitamins", "Minerals"], "Yam, rice, garri and bread are carbohydrates."],
  ["Civic", "What is the emergency phone number in Nigeria?", "112", ["999", "911", "123"], "112 is the national emergency number."],
  ["Civic", "Which agency fights drug abuse in Nigeria?", "NDLEA", ["FRSC", "INEC", "NAFDAC"], "The National Drug Law Enforcement Agency."],
  ["Civic", "Which agency controls road safety in Nigeria?", "FRSC", ["NDLEA", "NAFDAC", "NYSC"], "The Federal Road Safety Corps."],
  ["Civic", "Which agency checks that food and drugs are safe?", "NAFDAC", ["FRSC", "INEC", "NDLEA"], "The National Agency for Food and Drug Administration and Control."],
  ["Geography", "In which direction does the sun rise?", "East", ["West", "North", "South"], "It sets in the west."],
  ["Geography", "Which is the largest continent?", "Asia", ["Africa", "Europe", "North America"], "Africa is the second largest."],
  ["Geography", "Nigeria is in which continent?", "Africa", ["Asia", "Europe", "South America"], "Nigeria is in West Africa."],
];

// ---------------------------------------------------------------------------
// CVE — Civic Education (Junior Secondary, Nigeria)
// ---------------------------------------------------------------------------
const CVE: F[] = [
  ["Citizenship", "Which is NOT a way of becoming a Nigerian citizen under the 1999 Constitution?", "By paying taxes", ["By birth", "By registration", "By naturalisation"], "The Constitution lists birth, registration and naturalisation."],
  ["Citizenship", "At what age can a Nigerian citizen vote?", "18", ["16", "21", "25"], "Citizens aged 18 and above can register to vote."],
  ["Citizenship", "Which body conducts federal elections in Nigeria?", "INEC", ["NDLEA", "EFCC", "NYSC"], "The Independent National Electoral Commission."],
  ["Citizenship", "Which is a duty of a citizen?", "Obeying the laws of the country", ["Avoiding all taxes", "Destroying public property", "Refusing to vote"], "Duties also include paying taxes and respecting national symbols."],
  ["Rights", "Which is a fundamental human right in the Nigerian Constitution?", "Right to life", ["Right to a free car", "Right to avoid school rules", "Right to break the law"], "Chapter IV of the 1999 Constitution lists fundamental rights."],
  ["Rights", "Which chapter of the 1999 Constitution contains fundamental human rights?", "Chapter IV", ["Chapter I", "Chapter II", "Chapter VIII"], "Chapter II covers fundamental objectives of state policy."],
  ["Rights", "The Child Rights Act was passed in Nigeria in", "2003", ["1999", "1960", "2015"], "It protects the rights of children under 18."],
  ["Government", "Which arm of government makes laws?", "The legislature", ["The executive", "The judiciary", "The police"], "The National Assembly makes federal laws."],
  ["Government", "Which arm of government interprets laws?", "The judiciary", ["The legislature", "The executive", "INEC"], "Courts interpret laws and settle disputes."],
  ["Government", "Which arm of government carries out laws?", "The executive", ["The judiciary", "The legislature", "The press"], "The President and ministers lead the executive."],
  ["Government", "Nigeria's National Assembly is made up of", "the Senate and the House of Representatives", ["the Senate and the Supreme Court", "governors and ministers", "the President and the Vice President"], "It is a bicameral legislature."],
  ["Government", "How many senators are in the Nigerian Senate?", "109", ["36", "360", "100"], "Three from each state and one from the FCT."],
  ["Government", "How many members are in the House of Representatives?", "360", ["109", "469", "36"], "Seats are shared by population."],
  ["Government", "'Rule of law' means", "everyone, including leaders, is subject to the law", ["only the poor obey the law", "the President makes all laws", "laws are optional"], "No one is above the law."],
  ["Government", "Democracy is best described as", "government of the people, by the people, for the people", ["rule by the army", "rule by one family", "rule by foreign powers"], "Citizens choose leaders through elections."],
  ["Values", "Which value means being truthful and fair?", "Honesty", ["Greed", "Laziness", "Pride"], "Honesty builds trust."],
  ["Values", "Integrity means", "doing the right thing even when no one is watching", ["being rich", "being popular", "winning at all costs"], "Integrity is a core civic value."],
  ["Values", "Which agency fights human trafficking in Nigeria?", "NAPTIP", ["NAFDAC", "FRSC", "INEC"], "The National Agency for the Prohibition of Trafficking in Persons."],
  ["Values", "Which agency fights economic and financial crimes?", "EFCC", ["NAPTIP", "NDLEA", "NYSC"], "The Economic and Financial Crimes Commission."],
  ["Values", "Which agency fights corruption in the public service?", "ICPC", ["FRSC", "NAFDAC", "INEC"], "The Independent Corrupt Practices and Other Related Offences Commission."],
  ["Values", "Cultism in schools is harmful mainly because it", "leads to violence and disrupts learning", ["improves grades", "helps students sleep", "reduces school fees"], "Students should report cult activities to school authorities."],
  ["Drugs", "Drug abuse means", "using drugs in a harmful way or without medical advice", ["taking prescribed medicine correctly", "drinking water", "eating vegetables"], "Drug abuse damages health and future."],
  ["National symbols", "Nigeria's national anthem since 2024 is", "Nigeria, We Hail Thee", ["Arise, O Compatriots", "God Bless Nigeria", "One Nigeria"], "It was first used at independence in 1960 and restored in 2024."],
  ["National symbols", "Which is a national symbol of Nigeria?", "The coat of arms", ["A football club", "A political party logo", "A bank logo"], "Others include the flag, anthem and pledge."],
  ["Road safety", "When crossing the road, you should first", "look left and right", ["run quickly", "close your eyes", "use your phone"], "Use a zebra crossing where there is one."],
  ["Road safety", "The green traffic light means", "go", ["stop", "get ready to stop", "turn back"], "Red means stop."],
];

// ---------------------------------------------------------------------------
// PSR — Nigerian civil service promotion exam: rules, finance and institutions
// Only long-established points; candidates must still read the current PSR and FR.
// ---------------------------------------------------------------------------
const PSR: F[] = [
  ["Public Service Rules", "Under the Public Service Rules, compulsory retirement is at", "60 years of age or 35 years of service, whichever comes first", ["65 years of age or 40 years of service", "55 years of age or 30 years of service", "60 years of age only"], "This is set out in the Public Service Rules; some groups such as teachers have different statutory ages."],
  ["Public Service Rules", "How long is the probation period for a newly appointed officer on a permanent appointment?", "2 years", ["6 months", "1 year", "3 years"], "The officer is confirmed if service is satisfactory."],
  ["Public Service Rules", "Under the 2021 Public Service Rules, maternity leave is", "16 weeks with full pay", ["12 weeks with half pay", "8 weeks with full pay", "6 months with full pay"], "This was extended to 16 weeks in the 2021 edition."],
  ["Public Service Rules", "Paternity leave for a male officer whose wife delivers a baby is", "14 working days", ["7 working days", "30 days", "3 months"], "Introduced in the 2021 Public Service Rules."],
  ["Public Service Rules", "Annual leave for officers on Grade Level 07 and above is", "30 working days", ["21 working days", "14 working days", "45 working days"], "Officers on GL 06 and below get 21 working days."],
  ["Public Service Rules", "Annual leave for officers on Grade Level 06 and below is", "21 working days", ["30 working days", "14 working days", "10 working days"], "Officers on GL 07 and above get 30 working days."],
  ["Institutions", "Which body has power to appoint, promote and discipline federal civil servants?", "Federal Civil Service Commission", ["Office of the Auditor-General", "Code of Conduct Bureau", "National Assembly"], "Its powers come from the 1999 Constitution."],
  ["Institutions", "Who is the head of the Federal Civil Service?", "Head of the Civil Service of the Federation", ["Secretary to the Government of the Federation", "Chairman, Federal Civil Service Commission", "Minister of Finance"], "The HoCSF oversees career management of civil servants."],
  ["Institutions", "Which body receives asset declarations from public officers?", "Code of Conduct Bureau", ["EFCC", "INEC", "Federal Civil Service Commission"], "Public officers declare assets on assumption and on leaving office."],
  ["Institutions", "Which tribunal tries breaches of the Code of Conduct for Public Officers?", "Code of Conduct Tribunal", ["Federal High Court", "Industrial Court", "Supreme Court"], "Established under the Fifth Schedule of the Constitution."],
  ["Institutions", "Which body regulates public procurement in Nigeria?", "Bureau of Public Procurement (BPP)", ["Federal Inland Revenue Service", "Central Bank of Nigeria", "Office of the Accountant-General"], "Set up under the Public Procurement Act 2007."],
  ["Institutions", "Who audits the accounts of the Federation?", "The Auditor-General for the Federation", ["The Accountant-General of the Federation", "The Minister of Finance", "The Central Bank"], "The Auditor-General reports to the National Assembly."],
  ["Institutions", "Who is responsible for preparing the consolidated accounts of the Federation?", "The Accountant-General of the Federation", ["The Auditor-General for the Federation", "The Budget Office", "The Senate"], "The Office of the Accountant-General manages Treasury operations."],
  ["Financial Regulations", "In a federal ministry, who is the Accounting Officer?", "The Permanent Secretary", ["The Minister", "The Director of Finance and Accounts", "The Auditor-General"], "The Accounting Officer is responsible for the ministry's funds."],
  ["Financial Regulations", "Into which fund are all federal revenues paid, except where the Constitution says otherwise?", "Consolidated Revenue Fund", ["Federation Account only", "Contingencies Fund", "Excess Crude Account"], "Section 80 of the 1999 Constitution."],
  ["Financial Regulations", "What is the Treasury Single Account (TSA)?", "A unified set of government bank accounts that consolidates government cash", ["A savings account for civil servants", "An account at a commercial bank for each ministry", "A pension account"], "It is held at the Central Bank of Nigeria."],
  ["Financial Regulations", "IPPIS is used by the Federal Government to", "manage personnel records and pay salaries", ["collect taxes", "conduct elections", "issue passports"], "Integrated Personnel and Payroll Information System."],
  ["Laws", "The Public Procurement Act was enacted in", "2007", ["1999", "2011", "2020"], "It set up the Bureau of Public Procurement."],
  ["Laws", "The Freedom of Information Act was passed in", "2011", ["2007", "1999", "2015"], "It gives the public a right to access public records."],
  ["Laws", "The Fiscal Responsibility Act, which promotes prudent management of public finances, was enacted in", "2007", ["2011", "1999", "2021"], "It also set up the Fiscal Responsibility Commission."],
  ["Constitution", "Under the 1999 Constitution, how many states make up the Federation?", "36", ["37", "30", "19"], "Plus the Federal Capital Territory, Abuja."],
  ["Constitution", "Which part of the 1999 Constitution contains the Code of Conduct for Public Officers?", "The Fifth Schedule", ["Chapter II", "The First Schedule", "Chapter IV"], "It covers conflict of interest and asset declaration."],
  ["Constitution", "Under the 1999 Constitution, a public officer must NOT", "put themselves in a position where personal interest conflicts with duty", ["serve on a committee", "attend training", "take annual leave"], "Conflict of interest is prohibited by the Code of Conduct."],
  ["Office practice", "A memo is mainly used for", "communication within an organisation", ["communication with foreign governments", "advertising products", "court judgements"], "Letters are used for external communication."],
  ["Office practice", "'Minutes' of a meeting are", "a written record of decisions and discussions", ["the length of the meeting", "the agenda sent before the meeting", "a list of attendees only"], "Minutes are confirmed at the next meeting."],
  ["Office practice", "An agenda is", "a list of items to be discussed at a meeting", ["the record of decisions taken", "a letter of appointment", "a query"], "It is circulated before the meeting."],
  ["Discipline", "A query issued to an officer is meant to", "give the officer a chance to explain alleged misconduct", ["promote the officer", "approve leave", "announce a transfer"], "Fair hearing is a principle of discipline."],
  ["Discipline", "Which principle requires that an officer be heard before being punished?", "Fair hearing", ["Seniority", "Federal character", "Delegation"], "No one should be condemned unheard."],
  ["Principles", "The federal character principle aims to", "reflect the country's diversity in public appointments", ["promote only the most senior officers", "limit jobs to one region", "reduce salaries"], "Section 14(3) of the 1999 Constitution."],
];

// ---------------------------------------------------------------------------
// IMS — IOSH Managing Safely
// ---------------------------------------------------------------------------
const IMS: F[] = [
  ["Introduction", "What are the three main reasons for managing safety?", "Moral, legal and financial", ["Moral, social and political", "Legal, technical and personal", "Financial, cultural and medical"], "Managers must protect people, comply with the law and avoid costs."],
  ["Introduction", "Which is an example of a 'hidden' (uninsured) cost of an accident?", "Lost production and staff time investigating", ["Compensation paid by the insurer", "The insurance premium paid last year", "A routine maintenance bill"], "Uninsured costs are often far higher than insured ones."],
  ["Risk", "What is a hazard?", "Anything with the potential to cause harm", ["The likelihood that harm will occur", "An injury that has happened", "A safety rule"], "A wet floor is a hazard."],
  ["Risk", "What is risk?", "The likelihood of harm combined with how severe it could be", ["Anything that can cause harm", "A near miss", "A safety sign"], "Risk = likelihood × severity."],
  ["Risk", "In a simple risk matrix, likelihood 4 and severity 3 give a risk rating of", "12", ["7", "1", "43"], "Multiply likelihood by severity."],
  ["Risk", "What is the first step of the HSE's five steps to risk assessment?", "Identify the hazards", ["Record your findings", "Review the assessment", "Decide on precautions"], "Then decide who might be harmed and how."],
  ["Risk", "Which step of the five-step risk assessment comes last?", "Review the assessment and update if necessary", ["Identify the hazards", "Evaluate the risks", "Decide who might be harmed"], "Review after changes or incidents."],
  ["Risk", "Which group may need special consideration in a risk assessment?", "New and expectant mothers", ["Experienced supervisors only", "Shareholders", "Customers who never visit the site"], "Young workers and people with disabilities are other examples."],
  ["Controls", "In the hierarchy of control, which measure is most effective?", "Elimination", ["Personal protective equipment", "Training", "Warning signs"], "Remove the hazard altogether where possible."],
  ["Controls", "Where does PPE sit in the hierarchy of control?", "Last resort", ["First choice", "Second, after elimination", "Equal to engineering controls"], "PPE only protects the wearer and can fail."],
  ["Controls", "Replacing a solvent-based paint with a water-based one is an example of", "substitution", ["elimination", "PPE", "an administrative control"], "Swap something hazardous for something less hazardous."],
  ["Controls", "Fitting a guard to a machine is an example of", "an engineering control", ["PPE", "elimination", "an administrative control"], "Engineering controls isolate people from the hazard."],
  ["Controls", "Job rotation to reduce exposure to vibration is an example of", "an administrative control", ["an engineering control", "elimination", "substitution"], "It changes how work is organised."],
  ["Responsibilities", "Which UK law places general duties on employers to protect employees and others?", "Health and Safety at Work etc. Act 1974", ["Equality Act 2010", "Companies Act 2006", "Data Protection Act 2018"], "It applies to all workplaces in Great Britain."],
  ["Responsibilities", "Employees have a legal duty to", "take reasonable care of themselves and others affected by their work", ["write the company safety policy", "carry out all risk assessments", "pay for their own PPE"], "They must also co-operate with their employer on safety."],
  ["Responsibilities", "Civil law in health and safety is mainly concerned with", "compensation for people who have been harmed", ["punishing offenders with prison", "writing regulations", "inspecting workplaces"], "Criminal law deals with prosecution and penalties."],
  ["Hazards", "Noise, vibration and extreme temperatures are examples of which hazard type?", "Physical", ["Chemical", "Biological", "Psychological"], "Biological hazards include bacteria and viruses."],
  ["Hazards", "Stress and bullying are examples of which hazard type?", "Psychosocial", ["Physical", "Chemical", "Biological"], "They harm mental and physical health."],
  ["Hazards", "Poor workstation set-up causing back pain is which type of hazard?", "Ergonomic", ["Biological", "Chemical", "Electrical"], "Ergonomics fits the job to the person."],
  ["Incidents", "What is a near miss?", "An event that could have caused harm but didn't", ["An accident with serious injury", "A hazard on a checklist", "A fire drill"], "Reporting near misses helps prevent accidents."],
  ["Incidents", "What is the main purpose of an accident investigation?", "To find the causes and prevent it happening again", ["To blame the person involved", "To calculate the insurance claim only", "To close the case quickly"], "Look for immediate, underlying and root causes."],
  ["Incidents", "A worker slipped on a spillage. The fact that no cleaning system existed is", "an underlying (root) cause", ["the immediate cause", "a near miss", "a control measure"], "The spillage is the immediate cause; the missing system is a root cause."],
  ["Performance", "Which is an example of active (proactive) monitoring?", "Workplace inspections", ["Accident statistics", "Insurance claims", "Sickness absence records"], "Active monitoring checks controls before harm happens."],
  ["Performance", "Accident and ill-health statistics are examples of", "reactive (lagging) measures", ["active (leading) measures", "risk controls", "hazards"], "They measure failure after it happens."],
  ["Performance", "The Plan, Do, Check, Act approach is used to", "manage health and safety as a continuous cycle", ["investigate accidents only", "design machines", "set salaries"], "It underpins HSE guidance HSG65."],
  ["Environment", "In the waste hierarchy, which option is best?", "Prevent waste in the first place", ["Recycle", "Recover energy", "Dispose to landfill"], "Then reduce, reuse, recycle, recover and finally dispose."],
];

// ---------------------------------------------------------------------------
// OGS — Oil & gas HSE essentials
// ---------------------------------------------------------------------------
const OGS: F[] = [
  ["H2S", "What does hydrogen sulphide (H₂S) smell like at low concentrations?", "Rotten eggs", ["Petrol", "Nothing at all", "Almonds"], "At higher concentrations it deadens the sense of smell, so smell is not a reliable warning."],
  ["H2S", "Why is smell NOT a safe way to detect H₂S?", "High concentrations paralyse the sense of smell", ["H₂S has no smell", "It smells pleasant", "It only smells when wet"], "Always rely on calibrated gas detectors."],
  ["H2S", "Compared with air, H₂S is", "heavier, so it collects in low areas", ["lighter, so it rises quickly", "the same weight", "only found underground"], "Pits, cellars and low spots are danger areas."],
  ["H2S", "If an H₂S alarm sounds, you should move", "upwind or crosswind to the safe briefing area", ["downwind", "into the nearest low area", "towards the source to check it"], "Check the windsock and follow the site plan."],
  ["H2S", "Besides being toxic, H₂S is also", "flammable", ["inert", "an oxidiser only", "harmless in small rooms"], "It can form explosive mixtures with air."],
  ["Gas testing", "What does LEL stand for?", "Lower Explosive Limit", ["Lowest Exposure Level", "Level of Emergency Leakage", "Limited Entry Level"], "Below the LEL, there is too little gas to ignite."],
  ["Gas testing", "Normal oxygen in air is about", "20.9%", ["50%", "78%", "10%"], "Below 19.5% is usually treated as oxygen-deficient."],
  ["Confined space", "Which is a confined space?", "A storage tank or vessel with limited entry and exit", ["An open car park", "A large office", "A football field"], "Confined spaces can trap toxic gases or lack oxygen."],
  ["Confined space", "Before entering a confined space, the atmosphere should be tested for", "oxygen, flammable gases and toxic gases", ["temperature only", "noise only", "humidity only"], "Test in that order and monitor continuously."],
  ["Confined space", "During confined-space entry, the person outside who monitors the entrant is the", "standby attendant (hole watch)", ["site manager", "visitor", "security guard"], "They must never enter to rescue without proper equipment."],
  ["Permits", "What is the purpose of a permit-to-work system?", "To control high-risk work through formal checks and authorisation", ["To pay contractors", "To record attendance", "To book holidays"], "Hot work and confined-space entry need permits."],
  ["Permits", "Which is an example of hot work?", "Welding", ["Painting with a brush", "Filing paperwork", "Visual inspection"], "Cutting, grinding and welding create ignition sources."],
  ["Permits", "During hot work, a fire watch is usually kept", "during the work and for a period after it ends", ["only before the work starts", "only if the permit is lost", "never"], "Smouldering fires can start after work stops."],
  ["Isolation", "What is the purpose of Lockout/Tagout (LOTO)?", "To isolate energy sources so equipment cannot start during work", ["To lock the office at night", "To tag stock in the warehouse", "To log visitors"], "Each worker applies their own lock."],
  ["Fire", "What are the three sides of the fire triangle?", "Heat, fuel and oxygen", ["Heat, water and fuel", "Smoke, fuel and oxygen", "Gas, oil and electricity"], "Remove one side and the fire goes out."],
  ["Fire", "Under the UK/European classification, a fire involving flammable liquids is", "Class B", ["Class A", "Class C", "Class D"], "Class A is solids, C is gases, D is metals, F is cooking oils."],
  ["Fire", "Which extinguisher is generally suitable for flammable-liquid (Class B) fires?", "Foam", ["Water", "Wet chemical only", "None — just walk away"], "Water can spread burning liquids."],
  ["Culture", "Who can use Stop Work Authority?", "Anyone on site who sees unsafe work", ["Only the site manager", "Only HSE officers", "Only the client"], "Stopping unsafe work should never lead to blame."],
  ["Culture", "A Job Safety Analysis (JSA) breaks a task into", "steps, the hazards in each step and the controls", ["costs and profits", "shifts and pay", "suppliers and invoices"], "Review it with the crew before starting."],
  ["Offshore", "BOSIET training includes", "helicopter underwater escape (HUET), sea survival and firefighting", ["drilling engineering", "accounting", "crane operation"], "BOSIET is an OPITO basic offshore safety course."],
  ["Offshore", "When the general alarm sounds on an installation, you should", "go to your muster station", ["return to your cabin", "go to the helideck", "keep working"], "Muster lists are checked to account for everyone."],
  ["PPE", "Which PPE item protects against flash fire on a process site?", "Flame-resistant (FR) coveralls", ["Ordinary cotton T-shirt", "Rain jacket", "Shorts"], "FR clothing does not keep burning once the flame is removed."],
  ["Dropped objects", "Tool lanyards at height are mainly used to prevent", "dropped objects", ["electric shock", "noise", "gas leaks"], "Dropped objects are a leading cause of injuries on rigs."],
];

// ---------------------------------------------------------------------------
// ONG — Nigerian oil & gas industry knowledge (interviews, graduate schemes)
// ---------------------------------------------------------------------------
const ONG: F[] = [
  ["Industry basics", "Exploration and production (E&P) belong to which part of the industry?", "Upstream", ["Midstream", "Downstream", "Retail"], "Midstream is transport and storage; downstream is refining and marketing."],
  ["Industry basics", "Pipelines, storage and LNG shipping are part of the", "midstream", ["upstream", "downstream", "exploration"], "Midstream moves and stores hydrocarbons."],
  ["Industry basics", "Refining and selling petrol at filling stations are part of the", "downstream", ["upstream", "midstream", "seismic"], "Downstream turns crude into products and sells them."],
  ["Industry basics", "How many US gallons are in one barrel of oil?", "42", ["55", "36", "100"], "That is about 159 litres."],
  ["Industry basics", "A crude oil with a high API gravity is", "light", ["heavy", "sour", "solid"], "Higher API gravity means lighter oil."],
  ["Industry basics", "'Sweet' crude oil contains", "little sulphur", ["a lot of sulphur", "a lot of sugar", "no hydrocarbons"], "Sour crude has more sulphur."],
  ["Industry basics", "Which is the main international crude oil price benchmark?", "Brent", ["Bonny Light", "Forcados", "Urals"], "WTI is the main US benchmark."],
  ["Equipment", "What is a 'Christmas tree' in oil and gas?", "An assembly of valves on top of a completed well", ["A type of drill bit", "A refinery tower", "A storage tank"], "It controls flow from the well."],
  ["Equipment", "What is the main purpose of a blowout preventer (BOP)?", "To seal the well and control pressure during drilling", ["To pump oil to the refinery", "To measure crude quality", "To separate gas from water"], "It is a critical well-control barrier."],
  ["Equipment", "Which is a function of drilling mud?", "Carrying rock cuttings to the surface and controlling well pressure", ["Cooling the crew", "Refining crude", "Painting the rig"], "It also cools and lubricates the bit."],
  ["Equipment", "What is an FPSO?", "A Floating Production, Storage and Offloading vessel", ["A Fixed Pipeline Safety Office", "A Field Personnel Support Officer", "A Fuel Pump Supply Outlet"], "Bonga and Egina are FPSOs off Nigeria."],
  ["Equipment", "Seismic surveys are used to", "map rock layers underground to find possible oil and gas", ["refine crude oil", "measure petrol prices", "transport gas"], "They are part of exploration."],
  ["Nigeria", "Where was oil first discovered in commercial quantities in Nigeria (1956)?", "Oloibiri", ["Bonny", "Warri", "Port Harcourt"], "Oloibiri is in present-day Bayelsa State."],
  ["Nigeria", "Nigeria first exported crude oil in", "1958", ["1956", "1960", "1971"], "Exports began two years after the Oloibiri discovery."],
  ["Nigeria", "Nigeria joined OPEC in", "1971", ["1960", "1958", "1999"], "OPEC co-ordinates oil policy among member countries."],
  ["Nigeria", "Which law, signed in 2021, overhauled Nigeria's petroleum industry?", "Petroleum Industry Act (PIA)", ["Nigerian Oil and Gas Industry Content Development Act", "Petroleum Act 1969 amendment", "Gas Flare Act"], "It created new regulators and made NNPC a limited liability company."],
  ["Nigeria", "Under the PIA, which body regulates the upstream sector?", "NUPRC", ["NMDPRA", "NCDMB", "DPR"], "Nigerian Upstream Petroleum Regulatory Commission."],
  ["Nigeria", "Under the PIA, which body regulates the midstream and downstream sectors?", "NMDPRA", ["NUPRC", "NCDMB", "PPPRA"], "Nigerian Midstream and Downstream Petroleum Regulatory Authority."],
  ["Nigeria", "Which body promotes Nigerian participation (local content) in the oil and gas industry?", "NCDMB", ["NUPRC", "OPEC", "NMDPRA"], "Nigerian Content Development and Monitoring Board, set up by the 2010 Act."],
  ["Nigeria", "Under the PIA, oil companies fund host community trusts with what share of their annual operating expenditure?", "3%", ["1%", "10%", "13%"], "The Host Communities Development Trusts."],
  ["Nigeria", "Nigeria LNG's liquefaction plant is on", "Bonny Island", ["Lagos Island", "Escravos only", "Lekki"], "It exports liquefied natural gas worldwide."],
  ["Nigeria", "The Dangote refinery is located in", "Lekki, Lagos", ["Port Harcourt", "Warri", "Kaduna"], "It is designed to process 650,000 barrels per day."],
  ["Nigeria", "Bonny Light is a Nigerian crude grade that is", "light and sweet", ["heavy and sour", "a type of LNG", "a refinery"], "Light, low-sulphur crude is valued by refiners."],
  ["Environment", "Burning off unwanted associated gas at a production site is called", "gas flaring", ["gas lifting", "fracking", "venting liquids"], "Nigeria aims to reduce flaring by commercialising gas."],
];

export function expansion4(): Record<string, Q[]> {
  return {
    NGS: facts("NGS", NGS, 1),
    CVE: facts("CVE", CVE, 1),
    PSR: facts("PSR", PSR),
    IMS: facts("IMS", IMS),
    OGS: facts("OGS", OGS),
    ONG: facts("ONG", ONG),
  };
}
