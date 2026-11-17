// Wave 3 banks:
//   GCM — GCSE Maths (generated, exact)        GEL — GCSE English Language (techniques, terms, SPaG)
//   CSJ — UK Civil Service Judgement Test       AEN — Academic English (TOEFL / Duolingo English Test)
//   CDL — US CDL general knowledge              OG1 — Ontario G1 driver's knowledge test
//   APL — CompTIA A+ (Core 1 & 2)               SYP — CompTIA Security+ (SY0-701)
//   CCX — Cisco CCNA (subnetting generated)     NGN — Nigeria nursing licensure (NMCN)
//   USM — USMLE Step 1 basic sciences           GPH — Gulf pharmacist Prometric (calculations generated)
// Established facts only; every calculation is generated so the answer is exact.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;
const gbp = (v: number) => `£${v.toLocaleString("en-GB", { minimumFractionDigits: Number.isInteger(v) ? 0 : 2, maximumFractionDigits: 2 })}`;

// ============================================================================ GCM
function gcm(): Q[] {
  const out: Q[] = [];
  out.push(...repeat(10, () => {
    const p = pick([80, 120, 150, 240, 360, 450]), pc = pick([10, 15, 20, 25, 35]), up = pick([true, false]);
    const a = r(p * (1 + (up ? pc : -pc) / 100), 2);
    return mcq("GCM", "Percentages", `${up ? "Increase" : "Decrease"} ${gbp(p)} by ${pc}%.`, gbp(a), [gbp(r(p * pc / 100, 2)), gbp(r(p * (1 + (up ? -pc : pc) / 100), 2)), gbp(p + (up ? pc : -pc))], `Multiplier = ${up ? 1 + pc / 100 : 1 - pc / 100}; ${gbp(p)} × ${up ? 1 + pc / 100 : 1 - pc / 100} = ${gbp(a)}.`, 1);
  }));
  out.push(...repeat(10, () => {
    const a = ri(1, 5), b = ri(2, 7), k = pick([8, 10, 12, 15, 20]), total = (a + b) * k;
    if (a === b) return null;
    return mcq("GCM", "Ratio", `Share ${gbp(total)} in the ratio ${a} : ${b}. How much is the larger share?`, gbp(Math.max(a, b) * k), [gbp(Math.min(a, b) * k), gbp(total / 2), gbp(Math.max(a, b) * k + k)], `${a} + ${b} = ${a + b} parts; one part = ${gbp(k)}; larger share = ${Math.max(a, b)} × ${gbp(k)}.`, 2);
  }));
  out.push(...repeat(8, () => {
    const p = pick([1000, 2000, 5000]), rate = pick([2, 3, 4, 5]), y = pick([2, 3]);
    const a = r(p * (1 + rate / 100) ** y, 2), simple = r(p * (1 + (rate * y) / 100), 2);
    return mcq("GCM", "Compound interest", `${gbp(p)} is invested at ${rate}% compound interest per year. What is it worth after ${y} years?`, gbp(a), [gbp(simple), gbp(r(p * rate * y / 100, 2)), gbp(r(a + 10, 2))], `${gbp(p)} × ${1 + rate / 100}^${y} = ${gbp(a)}.`, 2);
  }));
  out.push(...repeat(8, () => {
    const red = ri(2, 7), blue = ri(2, 8), green = ri(1, 5), t = red + blue + green;
    const g = (n: number, d: number) => { let x = n, y = d; while (y) [x, y] = [y, x % y]; return x; };
    const f = (n: number) => `${n / g(n, t)}/${t / g(n, t)}`;
    return mcq("GCM", "Probability", `A bag has ${red} red, ${blue} blue and ${green} green counters. One is picked at random. What is the probability it is blue?`, f(blue), [f(red), `${blue}/${t + 1}`, `1/${t}`, `${blue}/${red + green}`], `P(blue) = ${blue} ÷ ${t} = ${f(blue)}.`, 1);
  }));
  out.push(...repeat(8, () => {
    const [a, b, c] = pick([[3, 4, 5], [5, 12, 13], [6, 8, 10], [8, 15, 17], [9, 12, 15], [7, 24, 25]] as const);
    return mcq("GCM", "Pythagoras", `A right-angled triangle has shorter sides ${a} cm and ${b} cm. How long is the hypotenuse?`, `${c} cm`, numOpts(c, [a + b, r(Math.sqrt(b * b - a * a), 2), c + 1], "cm"), `c² = ${a}² + ${b}² = ${a * a + b * b}, so c = ${c} cm.`, 2);
  }));
  out.push(...repeat(8, () => {
    const m = pick([1.2, 3.5, 4.07, 6.4, 8.9]), e = pick([3, 4, 5, 6, -3, -4]);
    const v = m * 10 ** e, plain = fmt(v);
    return mcq("GCM", "Standard form", `Write ${plain} in standard form.`, `${m} × 10^${e}`, [`${m} × 10^${e + 1}`, `${m} × 10^${e - 1}`, `${m * 10} × 10^${e - 1}`, `${m} × 10^${-e}`], `Move the decimal point so 1 ≤ a < 10: ${m} × 10^${e}.`, 2);
  }));
  out.push(...repeat(8, () => {
    const a = ri(2, 7), x = ri(2, 9), b = ri(1, 12), c = a * x + b;
    return mcq("GCM", "Algebra", `Solve ${a}x + ${b} = ${c}.`, `x = ${x}`, [`x = ${x + 1}`, `x = ${r((c + b) / a, 2)}`, `x = ${c - b}`], `Subtract ${b}: ${a}x = ${c - b}; divide by ${a}: x = ${x}.`, 1);
  }));
  out.push(...repeat(6, () => {
    const l = ri(4, 12), w = ri(3, 9), h = ri(2, 6), v = l * w * h;
    return mcq("GCM", "Volume", `A cuboid is ${l} cm by ${w} cm by ${h} cm. What is its volume?`, `${v} cm³`, numOpts(v, [l + w + h, 2 * (l * w + w * h + l * h), l * w], "cm³"), `Volume = ${l} × ${w} × ${h} = ${v} cm³.`, 1);
  }));
  return out;
}

// ============================================================================ GEL
const GEL: F[] = [
  ["Language techniques", "'The wind howled through the trees' uses", "personification", ["a simile", "alliteration", "hyperbole"], "Giving human qualities to something non-human."],
  ["Language techniques", "'Her smile was as bright as the sun' is a", "simile", ["metaphor", "personification", "oxymoron"], "A simile compares using 'like' or 'as'."],
  ["Language techniques", "'Time is a thief' is a", "metaphor", ["simile", "onomatopoeia", "rhetorical question"], "A metaphor says one thing is another."],
  ["Language techniques", "'Buzz', 'crash' and 'sizzle' are examples of", "onomatopoeia", ["alliteration", "assonance", "sibilance"], "Words that sound like what they describe."],
  ["Language techniques", "'Peter Piper picked a peck' uses", "alliteration", ["assonance", "a metaphor", "pathetic fallacy"], "Repeated consonant sounds at the start of nearby words."],
  ["Language techniques", "'I've told you a million times' is an example of", "hyperbole", ["understatement", "a simile", "irony"], "Deliberate exaggeration for effect."],
  ["Language techniques", "Weather that reflects a character's mood is called", "pathetic fallacy", ["personification", "foreshadowing", "juxtaposition"], "For example, a storm during an argument."],
  ["Language techniques", "Placing two contrasting ideas side by side is", "juxtaposition", ["repetition", "alliteration", "a cliffhanger"], "It highlights the differences."],
  ["Language techniques", "'Deafening silence' is an example of", "an oxymoron", ["a simile", "onomatopoeia", "hyperbole"], "Two contradictory words together."],
  ["Language techniques", "A question asked for effect, not for an answer, is a", "rhetorical question", ["direct question", "tag question", "closed question"], "Common in persuasive writing."],
  ["Structure", "Hinting at events that will happen later is", "foreshadowing", ["a flashback", "a cliffhanger", "a resolution"], "It builds suspense."],
  ["Structure", "A scene that goes back to earlier events is a", "flashback", ["foreshadowing", "climax", "monologue"], "It gives background information."],
  ["Structure", "A story told using 'I' is written in the", "first person", ["second person", "third person", "omniscient voice"], "Third person uses he, she or they."],
  ["Structure", "A very short sentence used for impact is often used to", "create tension or emphasis", ["slow the pace with detail", "list information", "introduce a quote"], "Short sentences speed up the pace."],
  ["Persuasive writing", "Which belongs in a formal letter?", "A clear opening and a formal sign-off such as 'Yours sincerely'", ["Text speak", "Slang", "Emojis"], "Use 'Yours faithfully' if you began 'Dear Sir or Madam'."],
  ["Persuasive writing", "If a letter begins 'Dear Sir or Madam', it should end", "Yours faithfully", ["Yours sincerely", "Cheers", "Best wishes"], "Use 'Yours sincerely' when you use the person's name."],
  ["Persuasive writing", "Using facts and statistics in an argument mainly", "makes the argument more convincing", ["confuses the reader", "makes the text informal", "removes the need for a conclusion"], "Pair evidence with explanation."],
  ["Punctuation", "Which sentence uses an apostrophe correctly?", "The dog wagged its tail.", ["The dog wagged it's tail.", "The dogs' wagged their tails.", "The dog's wagged it's tail."], "'It's' only means 'it is' or 'it has'."],
  ["Punctuation", "Which sentence shows possession for more than one girl?", "The girls' coats were wet.", ["The girl's coats were wet.", "The girls coats' were wet.", "The girls's coats were wet."], "Plural ending in s: put the apostrophe after the s."],
  ["Punctuation", "A semicolon can be used to", "join two closely linked main clauses", ["start a list", "end a question", "show possession"], "For example: 'It was late; we went home.'"],
  ["Punctuation", "A colon is often used to", "introduce a list or an explanation", ["join two subjects", "show a missing letter", "end a sentence"], "For example: 'You need three things: a pen, a ruler and paper.'"],
  ["Spelling", "Which is spelt correctly?", "necessary", ["neccessary", "necesary", "neccesary"], "One collar (c), two sleeves (ss)."],
  ["Spelling", "Which is correct: 'They left ___ bags over ___.'?", "their, there", ["there, their", "they're, there", "their, they're"], "Their = belonging to them; there = place."],
  ["Grammar", "Which is correct?", "I should have gone.", ["I should of gone.", "I should've went.", "I should have went."], "'Should of' is a mishearing of 'should've'."],
  ["Grammar", "A word that describes a noun is", "an adjective", ["an adverb", "a verb", "a pronoun"], "Adverbs describe verbs, adjectives or other adverbs."],
  ["Grammar", "In 'She ran quickly', the word 'quickly' is", "an adverb", ["an adjective", "a noun", "a conjunction"], "It describes how she ran."],
  ["Exam skills", "When analysing language, the best approach is to", "quote, name the technique and explain its effect", ["only list techniques", "retell the story", "give your opinion of the writer"], "Zoom in on individual words for top marks."],
  ["Exam skills", "To pass GCSE English Language, the commonly required standard pass is", "grade 4", ["grade 1", "grade 9 only", "grade C+ only"], "Grade 5 is a 'strong pass'."],
];

// ============================================================================ CSJ
const CSJ: F[] = [
  ["Working together", "A colleague is struggling to meet a deadline that affects your team. What is the most effective response?", "Offer to help and agree priorities with them", ["Tell your manager they are underperforming", "Ignore it because it is not your work", "Redo their work without telling them"], "Working Together: support colleagues and share the load."],
  ["Working together", "Two team members disagree about how to do a task. As the team lead, the best first step is to", "listen to both views and find common ground", ["choose your friend's approach", "tell them to sort it out themselves", "report both to HR"], "Resolve conflict early and fairly."],
  ["Working together", "A new starter keeps asking you questions while you are busy. The most effective response is to", "arrange a set time to go through their questions", ["tell them to stop asking", "ignore their messages", "complain to the manager"], "It supports them while protecting your time."],
  ["Delivering at pace", "You realise you will miss an important deadline. What should you do?", "Tell your manager early and suggest a revised plan", ["Say nothing and hope it is fine", "Submit unfinished work without comment", "Blame IT problems"], "Raise risks early and offer solutions."],
  ["Delivering at pace", "You have three urgent tasks and can only finish two today. You should", "prioritise by impact and agree the plan with your manager", ["do the easiest two", "do all three badly", "pick at random"], "Prioritise and communicate."],
  ["Making effective decisions", "You must recommend an option but some data is missing. The most effective action is to", "use the best available evidence and be clear about the gaps", ["guess and present it as certain", "refuse to make any recommendation", "wait indefinitely for perfect data"], "Make evidence-based decisions and flag uncertainty."],
  ["Making effective decisions", "You spot an error in a report that has already gone to senior leaders. You should", "tell your manager and arrange for a correction to be issued", ["keep quiet", "quietly change the original file", "wait to see if anyone notices"], "Honesty and integrity are Civil Service values."],
  ["Seeing the big picture", "A policy you work on will affect a group you hadn't considered. The best response is to", "assess the impact and involve the right stakeholders", ["carry on as planned", "drop the policy", "tell no one"], "Understand how your work fits wider priorities."],
  ["Communicating and influencing", "You need to explain a complex change to members of the public. You should", "use plain English and check they have understood", ["use technical jargon", "send a long legal document", "avoid explaining"], "Tailor your message to your audience."],
  ["Communicating and influencing", "A stakeholder strongly disagrees with your proposal. The most effective response is to", "listen to their concerns and address them with evidence", ["dismiss their view", "escalate straight away", "change everything to please them"], "Influence by understanding and evidence."],
  ["Changing and improving", "You notice a process that wastes time. You should", "suggest an improvement to your manager with the benefits", ["keep doing it the old way", "change it without telling anyone", "complain to colleagues"], "Look for ways to improve services."],
  ["Changing and improving", "A new IT system is introduced and colleagues are resisting it. As a team member, you should", "learn it and help others adapt", ["refuse to use it", "keep using the old system in secret", "complain on social media"], "Embrace and support change."],
  ["Leadership", "A team member's performance has dropped suddenly. The best first step is to", "have a private, supportive conversation to understand why", ["start a formal disciplinary", "criticise them in a team meeting", "ignore it"], "There may be personal reasons; support first."],
  ["Values", "A friend asks you to look up their neighbour's details on a government system. You should", "refuse, because it is a misuse of official information", ["do it if it is quick", "do it but not tell anyone", "ask a colleague to do it"], "Integrity: use information only for official purposes."],
  ["Values", "The four Civil Service core values are", "integrity, honesty, objectivity and impartiality", ["speed, cost, quality and scope", "loyalty, obedience, secrecy and power", "efficiency, profit, growth and innovation"], "Set out in the Civil Service Code."],
  ["Values", "During an election period, a minister's adviser asks you to help with party campaign material. You should", "decline, because civil servants must stay politically impartial", ["help if it is after hours", "help if your manager agrees", "help anonymously"], "Civil servants serve the government of the day impartially."],
  ["Values", "A supplier offers you an expensive gift while a contract is being decided. You should", "decline it and record or report the offer", ["accept it quietly", "accept and share it with the team", "ask for cash instead"], "Avoid any conflict of interest."],
  ["Managing a quality service", "A member of the public complains about poor service from your team. The most effective response is to", "listen, apologise where appropriate and agree what will happen next", ["argue that they are wrong", "pass them to another department without explanation", "ignore the complaint"], "Put customers at the heart of service."],
  ["Managing a quality service", "You are asked to cut a corner that would breach data protection rules. You should", "explain the risk and find a compliant way to meet the need", ["do it to save time", "do it but delete the evidence", "refuse to discuss it"], "Quality includes meeting legal standards."],
  ["Developing self and others", "You receive critical feedback on your work. The most effective response is to", "reflect on it and agree specific improvements", ["argue with the reviewer", "ignore it", "complain to colleagues"], "Use feedback to develop."],
];

// ============================================================================ AEN
const AEN: F[] = [
  ["Vocabulary in context", "'The results were ambiguous, so the team ran the test again.' 'Ambiguous' means", "unclear or open to more than one interpretation", ["very clear", "wrong", "exciting"], "Ambiguous results can be read in different ways."],
  ["Vocabulary in context", "'The drug mitigated the symptoms.' 'Mitigated' means", "made less severe", ["made worse", "caused", "hid"], "To mitigate is to reduce the harm."],
  ["Vocabulary in context", "'The evidence corroborates the theory.' 'Corroborates' means", "supports or confirms", ["contradicts", "replaces", "ignores"], "Corroborating evidence strengthens a claim."],
  ["Vocabulary in context", "'Resources were scarce after the drought.' 'Scarce' means", "in short supply", ["plentiful", "expensive", "wasted"], "Scarcity means not enough to meet demand."],
  ["Vocabulary in context", "'The population grew exponentially.' This means it grew", "faster and faster over time", ["by the same amount each year", "slowly", "then fell"], "Exponential growth multiplies at a rate."],
  ["Vocabulary in context", "'The author's tone is skeptical.' A skeptical tone is", "doubtful", ["enthusiastic", "angry", "neutral"], "Skeptics question claims."],
  ["Vocabulary in context", "'Inevitable' most nearly means", "certain to happen", ["unlikely", "unexpected", "optional"], "Something inevitable cannot be avoided."],
  ["Vocabulary in context", "'Subsequent' most nearly means", "coming after", ["coming before", "at the same time", "unrelated"], "Subsequent events follow earlier ones."],
  ["Academic phrases", "Which phrase introduces a contrasting point?", "On the other hand", ["Furthermore", "As a result", "For example"], "Also: however, nevertheless, in contrast."],
  ["Academic phrases", "Which phrase shows a result?", "Consequently", ["Similarly", "Although", "For instance"], "Also: therefore, as a result, thus."],
  ["Academic phrases", "Which phrase adds a supporting point?", "Moreover", ["Nevertheless", "Instead", "Otherwise"], "Also: in addition, furthermore."],
  ["Collocations", "Which is the natural academic collocation?", "conduct research", ["make research", "do a research", "perform a researches"], "Research is uncountable: 'conduct research', 'carry out research'."],
  ["Collocations", "Which is correct?", "a significant increase", ["a big raise of", "a strong growing", "a heavy increasing"], "Significant / sharp / steady increase."],
  ["Collocations", "Which is correct?", "draw a conclusion", ["make a conclusion of", "take a conclusion", "do a conclusion"], "We draw or reach conclusions."],
  ["Grammar", "Which sentence is correct?", "The data suggest that sleep improves memory.", ["The data suggests that sleep improve memory.", "The data suggesting sleep improves memory.", "The data suggest that sleep improving memory."], "In formal academic English, 'data' is often plural."],
  ["Grammar", "Choose the correct form: 'If the temperature ___, the ice melts.'", "rises", ["rose", "would rise", "will have risen"], "A zero conditional uses the present simple in both clauses."],
  ["Grammar", "Which sentence is in the passive voice?", "The samples were analysed in the lab.", ["The scientists analysed the samples.", "They are analysing samples.", "Scientists analyse samples daily."], "Passive: be + past participle."],
  ["Reading skills", "A question asking what the author 'implies' wants you to", "work out a meaning that is suggested but not stated", ["find an exact quote", "count the paragraphs", "summarise the title"], "This is an inference question."],
  ["Reading skills", "The main idea of a paragraph is most often found in the", "topic sentence, usually near the start", ["last word", "footnote", "title only"], "Supporting details follow it."],
  ["Test facts", "The TOEFL iBT tests which four skills?", "Reading, Listening, Speaking and Writing", ["Grammar, Vocabulary, Spelling and Reading", "Reading, Writing, Maths and Logic", "Listening, Speaking, Translation and Culture"], "Each skill is scored separately."],
  ["Test facts", "The Duolingo English Test is taken", "online at home on a computer", ["only at test centres", "on paper by post", "by phone"], "It is adaptive and gives an overall score."],
];

// ============================================================================ CDL
const CDL: F[] = [
  ["Alcohol and drugs", "The blood alcohol concentration (BAC) limit for drivers of commercial motor vehicles is", "0.04%", ["0.08%", "0.02%", "0.10%"], "It is lower than the 0.08% limit for most car drivers."],
  ["Hours of service", "Property-carrying drivers may drive a maximum of", "11 hours after 10 consecutive hours off duty", ["8 hours after 6 hours off", "14 hours of driving", "16 hours of driving"], "The 11 hours must fall within a 14-hour window."],
  ["Hours of service", "After 8 cumulative hours of driving, a property-carrying driver must take", "a 30-minute break", ["a 10-hour break", "no break", "a 2-hour break"], "This is an FMCSA hours-of-service rule."],
  ["Inspection", "The minimum tread depth for steer (front) tires is", "4/32 inch", ["2/32 inch", "1/32 inch", "6/32 inch"], "Other tires need at least 2/32 inch."],
  ["Inspection", "During a pre-trip inspection, you should check that the steering wheel play is not more than about", "10 degrees (about 2 inches on a 20-inch wheel)", ["45 degrees", "90 degrees", "zero degrees"], "Excessive play makes steering hard to control."],
  ["Inspection", "Which item must be checked during the pre-trip inspection?", "Brakes, lights, tires and coupling devices", ["Only the radio", "Only the fuel level", "Only the mirrors"], "A full walkaround follows a set pattern."],
  ["Space management", "The basic rule for following distance in a large vehicle under 40 mph is", "1 second for every 10 feet of vehicle length", ["2 seconds total", "1 car length", "100 feet always"], "Add 1 second when going over 40 mph."],
  ["Space management", "Why is it dangerous to drive alongside other vehicles?", "They may change lanes into you and you have less room to escape", ["It saves fuel", "It is required on highways", "It reduces blind spots"], "Keep space on all sides."],
  ["Emergencies", "When stopped on a two-lane road with traffic both ways, warning triangles go", "10 feet, 100 feet behind and 100 feet ahead", ["only 10 feet behind", "500 feet ahead only", "inside the cab"], "Place them within 10 minutes of stopping."],
  ["Emergencies", "If your brakes fail on a downgrade, you should look for", "an escape ramp", ["the nearest exit at full speed", "a sharp bend", "a parking lot"], "Escape ramps use soft gravel or sand to stop runaway trucks."],
  ["Emergencies", "The correct response to a front-wheel skid is to", "take your foot off the accelerator and let the vehicle slow", ["brake hard", "speed up", "turn the wheel sharply"], "Front-wheel skids are often caused by driving too fast."],
  ["Driving", "Total stopping distance is made up of", "perception distance, reaction distance and braking distance", ["only braking distance", "reaction distance only", "speed times weight"], "Heavier vehicles take longer to stop."],
  ["Driving", "When going down a long, steep downgrade, you should", "use a low gear and the engine's braking effect", ["shift to neutral", "ride the brakes the whole way", "speed up to get it over quickly"], "Select the gear before starting down the hill."],
  ["Driving", "Before backing a large vehicle, the safest action is to", "get out and check the area, and use a helper if possible", ["back quickly", "rely only on mirrors", "honk and go"], "Back toward the driver's side when you can."],
  ["Hazardous materials", "Placards are used to", "warn others of the hazardous materials being carried", ["show the driver's licence class", "advertise the company", "show the weight of the load"], "Placards go on all four sides of the vehicle."],
  ["Cargo", "Who is responsible for checking cargo is secure?", "The driver", ["Only the shipper", "Only the loader", "The police"], "Recheck cargo early in the trip and after breaks."],
  ["Railroad crossings", "Which vehicles must stop at all railroad crossings?", "Buses carrying passengers and vehicles carrying placarded hazardous materials", ["All cars", "Only empty trucks", "Motorcycles"], "Stop 15 to 50 feet from the nearest rail."],
];
function cdlCalc(): Q[] {
  return repeat(10, () => {
    const len = pick([40, 50, 60, 70]), fast = pick([true, false]), s = len / 10 + (fast ? 1 : 0);
    return mcq("CDL", "Space management", `You are driving a ${len}-foot vehicle at ${fast ? "55" : "35"} mph. What is the minimum following distance by the seconds rule?`, `${s} seconds`, numOpts(s, [s + 1, s - 1, 2], "seconds"), `1 second per 10 feet = ${len / 10} s${fast ? ", plus 1 second because you are over 40 mph" : ""}: ${s} seconds.`, 2);
  });
}

// ============================================================================ OG1
const OG1: F[] = [
  ["G1 rules", "A G1 driver must be accompanied by a fully licensed driver with at least", "4 years of driving experience", ["1 year", "2 years", "10 years"], "The accompanying driver sits in the front passenger seat."],
  ["G1 rules", "G1 drivers may NOT drive", "between midnight and 5 a.m.", ["on weekends", "in the rain", "on city streets"], "They also cannot drive on 400-series highways or high-speed expressways."],
  ["G1 rules", "The blood alcohol level for a G1 driver must be", "zero", ["under 0.05", "under 0.08", "under 0.02"], "Novice drivers must have zero alcohol."],
  ["G1 rules", "The accompanying driver's blood alcohol level must be under", "0.05", ["0.08", "0.10", "0.02"], "The accompanying driver must also be fit to drive."],
  ["G1 rules", "The minimum time at the G1 level before taking the G2 road test is", "12 months, or 8 months with an approved driver education course", ["3 months", "24 months", "6 weeks"], "Driver education can shorten the wait."],
  ["Speed", "Unless otherwise posted, the maximum speed in cities, towns and villages in Ontario is", "50 km/h", ["40 km/h", "60 km/h", "80 km/h"], "Outside built-up areas the default is 80 km/h."],
  ["Speed", "Unless otherwise posted, the maximum speed outside cities, towns and villages is", "80 km/h", ["50 km/h", "90 km/h", "100 km/h"], "Many highways post 90 or 100 km/h."],
  ["School buses", "When a school bus has its red lights flashing and you approach from behind, you must stop at least", "20 metres away", ["5 metres away", "50 metres away", "1 metre away"], "On roads without a median, traffic in both directions must stop."],
  ["Lights", "You must use headlights from", "half an hour before sunset to half an hour after sunrise", ["only after midnight", "only in rain", "only in winter"], "And whenever visibility is poor."],
  ["Lights", "You must dim your high beams when an oncoming vehicle is within", "150 metres", ["50 metres", "500 metres", "1 kilometre"], "Dim them when following within 60 metres."],
  ["Following distance", "In good conditions, keep a following distance of at least", "2 seconds", ["1 second", "5 seconds", "1 car length"], "Increase it in bad weather."],
  ["Pedestrians", "At a pedestrian crossover, drivers must", "stop and wait until the pedestrian has completely crossed the road", ["slow down and drive around them", "honk to warn them", "only stop if the light is red"], "Fines are doubled in community safety zones."],
  ["Emergency vehicles", "When an emergency vehicle with flashing lights or a siren approaches from any direction, you must", "pull to the right and stop", ["speed up", "stop in the middle of the road", "continue driving normally"], "Stay stopped until it has passed."],
  ["Emergency vehicles", "When passing a stopped emergency vehicle or tow truck with lights flashing, you must", "slow down and move over a lane if it is safe", ["speed up to clear the area", "stop completely in your lane", "honk"], "This is Ontario's 'move over' law."],
  ["Children", "A child must use a booster seat until they reach any one of: age 8, weight 36 kg, or height", "145 cm", ["120 cm", "160 cm", "100 cm"], "The driver is responsible for passengers under 16 being buckled up."],
  ["Seatbelts", "Who is responsible for making sure passengers under 16 wear a seatbelt?", "The driver", ["The passenger's parent only", "The passenger", "The police"], "Passengers 16 and over are responsible for themselves."],
  ["Signs", "A red octagon sign means", "stop", ["yield", "do not enter", "school zone"], "Come to a complete stop."],
  ["Signs", "A downward-pointing triangle, red and white, means", "yield the right-of-way", ["stop", "no parking", "railway crossing"], "Slow down and let traffic with the right-of-way go first."],
  ["Signs", "An orange sign usually indicates", "a construction zone", ["a school zone", "a hospital", "a tourist area"], "Fines are increased in construction zones when workers are present."],
  ["Intersections", "At a four-way stop, if two vehicles arrive at the same time, the right-of-way goes to", "the vehicle on the right", ["the vehicle on the left", "the larger vehicle", "the faster vehicle"], "Otherwise the first to stop goes first."],
  ["Intersections", "A flashing red light means", "come to a complete stop, then go when safe", ["slow down only", "the light is broken, so ignore it", "speed up"], "Treat it like a stop sign."],
  ["Intersections", "A flashing yellow light means", "proceed with caution", ["stop", "turn right only", "no entry"], "Slow down and watch for hazards."],
];

// ============================================================================ APL
const APL: F[] = [
  ["Ports", "Which port does HTTPS use by default?", "443", ["80", "21", "25"], "HTTP uses port 80."],
  ["Ports", "Which port does SSH use?", "22", ["23", "3389", "110"], "Telnet uses 23 and is not encrypted."],
  ["Ports", "Remote Desktop Protocol (RDP) uses port", "3389", ["22", "445", "8080"], "RDP lets you control a Windows PC remotely."],
  ["Ports", "DNS uses port", "53", ["67", "443", "161"], "DHCP uses 67 and 68."],
  ["Ports", "SMTP, used to send email, uses port", "25", ["110", "143", "53"], "POP3 is 110 and IMAP is 143."],
  ["Ports", "SMB file sharing uses port", "445", ["139 only", "21", "389"], "LDAP uses 389."],
  ["Hardware", "RAID 1 provides", "mirroring for redundancy", ["striping with no redundancy", "parity across three disks", "faster boot only"], "RAID 0 is striping with no fault tolerance."],
  ["Hardware", "RAID 5 needs a minimum of", "3 drives", ["2 drives", "4 drives", "1 drive"], "It uses striping with distributed parity."],
  ["Hardware", "Which memory is volatile?", "RAM", ["SSD", "ROM", "hard disk"], "RAM loses its contents when power is off."],
  ["Hardware", "Which connector is used for most modern internal SSDs on a motherboard slot?", "M.2", ["Molex", "VGA", "PS/2"], "M.2 drives can use SATA or NVMe."],
  ["Hardware", "A laser printer's fuser", "melts toner onto the paper", ["charges the drum", "cleans the paper", "stores print jobs"], "Steps include charge, expose, develop, transfer, fuse and clean."],
  ["Networking", "Which address range is APIPA?", "169.254.x.x", ["192.168.x.x", "10.x.x.x", "127.0.0.1"], "A PC gets an APIPA address when it can't reach a DHCP server."],
  ["Networking", "Which Wi-Fi standard is also called Wi-Fi 6?", "802.11ax", ["802.11n", "802.11ac", "802.11g"], "Wi-Fi 5 is 802.11ac."],
  ["Networking", "Which cable is most resistant to electromagnetic interference?", "Fibre optic", ["Unshielded twisted pair", "Coaxial", "Telephone cable"], "Fibre carries light, not electricity."],
  ["Operating systems", "Which Windows command shows the IP configuration?", "ipconfig", ["ifconfig", "netstat -r only", "chkdsk"], "Linux traditionally uses ifconfig or ip addr."],
  ["Operating systems", "Which Windows tool checks a disk for file system errors?", "chkdsk", ["sfc", "gpupdate", "diskpart"], "sfc checks protected system files."],
  ["Operating systems", "Which Windows command repairs corrupted system files?", "sfc /scannow", ["ipconfig /release", "format", "ping"], "System File Checker."],
  ["Operating systems", "On Linux, which command changes file permissions?", "chmod", ["chown", "ls", "grep"], "chown changes the owner."],
  ["Security", "Requiring a password and a code from a phone app is", "multifactor authentication", ["single sign-on", "a firewall", "encryption at rest"], "Something you know plus something you have."],
  ["Security", "A fake email that tries to trick users into giving passwords is", "phishing", ["a DDoS attack", "tailgating", "a rootkit"], "Train users to check links and senders."],
  ["Troubleshooting", "The first step of the CompTIA troubleshooting method is to", "identify the problem", ["establish a theory", "implement the solution", "document findings"], "Documenting findings is the last step."],
  ["Troubleshooting", "A PC beeps and does not display anything at power-on. A likely cause is", "a RAM or video card problem detected by POST", ["a full hard drive", "a wrong desktop wallpaper", "a printer jam"], "POST beep codes point to hardware faults."],
  ["Safety", "Before working inside a PC, you should protect components from static by", "using an anti-static wrist strap", ["wearing wool gloves", "touching the screen", "working on carpet"], "ESD can damage components."],
  ["Cloud", "Software delivered over the internet, such as webmail, is", "SaaS", ["IaaS", "PaaS", "on-premises"], "IaaS provides virtual machines; PaaS provides a platform."],
];

// ============================================================================ SYP
const SYP: F[] = [
  ["Concepts", "The CIA triad stands for", "confidentiality, integrity and availability", ["control, identity and access", "confidentiality, inspection and audit", "compliance, integrity and authorisation"], "These are the core goals of security."],
  ["Concepts", "Non-repudiation means", "a sender cannot deny sending a message", ["data is encrypted", "users cannot log in twice", "systems never fail"], "Digital signatures provide non-repudiation."],
  ["Cryptography", "Which algorithm is symmetric?", "AES", ["RSA", "ECC", "Diffie-Hellman"], "Symmetric encryption uses one shared key."],
  ["Cryptography", "Hashing is used to verify", "integrity", ["confidentiality", "availability", "authorisation"], "A changed file produces a different hash."],
  ["Cryptography", "In public key cryptography, to send a confidential message to Alice you encrypt it with", "Alice's public key", ["your private key", "Alice's private key", "a shared password"], "Only Alice's private key can decrypt it."],
  ["Cryptography", "A digital signature is created with the sender's", "private key", ["public key", "session key", "password"], "Anyone can verify it with the sender's public key."],
  ["Cryptography", "Adding random data to a password before hashing is called", "salting", ["peppering only", "padding", "key stretching"], "Salts defeat rainbow tables."],
  ["PKI", "A list of certificates revoked before expiry is a", "CRL", ["CSR", "CA", "HSM"], "OCSP checks revocation status in real time."],
  ["Attacks", "An attacker inserts code into a web form to read the database. This is", "SQL injection", ["cross-site scripting", "a replay attack", "ARP poisoning"], "Use parameterised queries and input validation."],
  ["Attacks", "Malware that encrypts files and demands payment is", "ransomware", ["a worm", "spyware", "adware"], "Offline backups are a key defence."],
  ["Attacks", "Following an authorised person through a secure door is", "tailgating", ["phishing", "vishing", "shoulder surfing"], "Mantraps and security awareness help prevent it."],
  ["Attacks", "Phishing by voice call is", "vishing", ["smishing", "whaling", "pharming"], "Smishing is by SMS; whaling targets executives."],
  ["Attacks", "Malware that spreads by itself across a network is a", "worm", ["Trojan", "logic bomb", "keylogger"], "A Trojan pretends to be legitimate software."],
  ["Attacks", "An attack that floods a service from many compromised machines is", "a DDoS attack", ["a brute-force attack", "privilege escalation", "a zero-day"], "Botnets are often used."],
  ["Controls", "A firewall rule is an example of a", "technical control", ["managerial control", "physical control", "operational control only"], "Policies are managerial; locks are physical."],
  ["Controls", "Giving users only the access they need to do their job is", "least privilege", ["separation of duties", "defence in depth", "job rotation"], "It limits the damage from compromised accounts."],
  ["Controls", "Requiring two people to complete a sensitive task is", "separation of duties", ["least privilege", "mandatory vacation", "implicit deny"], "It reduces the risk of fraud."],
  ["Architecture", "Zero trust means", "never trust by default; always verify", ["trust everything inside the network", "no passwords are needed", "only physical security matters"], "Every request is authenticated and authorised."],
  ["Architecture", "A network segment that hosts public-facing servers is a", "screened subnet (DMZ)", ["VLAN trunk", "honeypot", "air gap"], "It separates public services from the internal network."],
  ["Operations", "The incident response phase that comes after detection and analysis is", "containment", ["preparation", "lessons learned", "recovery only"], "Then eradication and recovery, then lessons learned."],
  ["Operations", "A SIEM is used to", "collect and correlate security logs and alerts", ["encrypt hard drives", "issue certificates", "scan for open ports only"], "It helps detect incidents."],
  ["Risk", "Buying cyber insurance is an example of risk", "transference", ["avoidance", "acceptance", "mitigation"], "The financial impact moves to another party."],
  ["Risk", "Annualised loss expectancy (ALE) equals", "single loss expectancy × annualised rate of occurrence", ["asset value ÷ exposure factor", "ARO ÷ SLE", "risk × threat"], "SLE = asset value × exposure factor."],
];
function sypCalc(): Q[] {
  return repeat(8, () => {
    const av = pick([10000, 20000, 50000, 100000]), ef = pick([0.1, 0.2, 0.25, 0.5]), aro = pick([0.5, 1, 2, 4]);
    const sle = av * ef, ale = sle * aro;
    return mcq("SYP", "Risk", `An asset is worth $${fmt(av)}. A threat would destroy ${ef * 100}% of it and is expected ${aro} time(s) a year. What is the ALE?`, `$${fmt(ale)}`, [`$${fmt(sle)}`, `$${fmt(av * aro)}`, `$${fmt(ale * 2)}`], `SLE = ${fmt(av)} × ${ef} = $${fmt(sle)}; ALE = SLE × ARO = $${fmt(ale)}.`, 2);
  });
}

// ============================================================================ CCX
const CCX: F[] = [
  ["Switching", "VLANs are used to", "split one switch into separate broadcast domains", ["increase cable length", "route between the internet and LAN", "encrypt traffic"], "Routing is needed between VLANs."],
  ["Switching", "A link that carries traffic for multiple VLANs is a", "trunk", ["access port", "loopback", "console port"], "802.1Q adds a VLAN tag."],
  ["Switching", "Spanning Tree Protocol prevents", "Layer 2 loops", ["IP address conflicts", "routing loops at Layer 3", "duplex mismatches"], "It blocks redundant paths."],
  ["Switching", "The STP root bridge is the switch with the lowest", "bridge ID (priority, then MAC address)", ["IP address", "port count", "uptime"], "Default priority is 32768."],
  ["Routing", "OSPF is a", "link-state routing protocol", ["distance-vector protocol", "path-vector protocol", "static route"], "It uses Dijkstra's algorithm."],
  ["Routing", "The default administrative distance of OSPF is", "110", ["90", "120", "1"], "EIGRP internal is 90, RIP is 120 and static is 1."],
  ["Routing", "A directly connected route has an administrative distance of", "0", ["1", "110", "255"], "Lower administrative distance is preferred."],
  ["Routing", "The route 0.0.0.0/0 is the", "default route", ["loopback route", "broadcast route", "multicast route"], "It matches any destination."],
  ["Services", "NAT is mainly used to", "translate private IP addresses to public addresses", ["assign IP addresses automatically", "resolve names to addresses", "prevent loops"], "PAT lets many hosts share one public IP."],
  ["Services", "DHCP uses which process to assign addresses?", "Discover, Offer, Request, Acknowledge", ["Request, Reply, Confirm, Close", "Syn, Syn-Ack, Ack", "Hello, Update, Ack"], "Known as DORA."],
  ["Security", "A standard ACL filters traffic based only on", "the source IP address", ["source and destination ports", "the destination IP only", "MAC addresses"], "Place standard ACLs close to the destination."],
  ["Security", "Every ACL ends with an implicit", "deny any", ["permit any", "log all", "redirect"], "Traffic not matched is dropped."],
  ["IPv6", "An IPv6 address is", "128 bits long", ["32 bits long", "64 bits long", "48 bits long"], "Written as eight groups of four hex digits."],
  ["IPv6", "IPv6 link-local addresses start with", "FE80::/10", ["2001::/16", "FF00::/8", "::1/128"], "FF00::/8 is multicast and ::1 is loopback."],
  ["Models", "Which OSI layer do routers mainly work at?", "Layer 3 (Network)", ["Layer 2 (Data Link)", "Layer 4 (Transport)", "Layer 1 (Physical)"], "Switches work mainly at Layer 2."],
  ["Models", "TCP is described as", "connection-oriented and reliable", ["connectionless", "only used for video", "a Layer 3 protocol"], "UDP is connectionless."],
  ["Wireless", "A WLC (wireless LAN controller) is used to", "centrally manage lightweight access points", ["route between ISPs", "assign VLANs to switches only", "replace DHCP"], "Lightweight APs use CAPWAP to talk to the controller."],
  ["Automation", "REST APIs commonly exchange data using", "JSON", ["Telnet", "SNMPv1 only", "FTP"], "Used in network automation and controllers."],
];
function ccxCalc(): Q[] {
  const out: Q[] = [];
  const mask = (p: number) => [0, 1, 2, 3].map((i) => (p >= (i + 1) * 8 ? 255 : p <= i * 8 ? 0 : 256 - 2 ** (8 - (p - i * 8)))).join(".");
  out.push(...repeat(12, () => {
    const p = ri(20, 30), hosts = 2 ** (32 - p) - 2;
    return mcq("CCX", "Subnetting", `How many usable host addresses are in a /${p} subnet?`, `${hosts}`, numOpts(hosts, [hosts + 2, 2 ** (32 - p - 1), hosts * 2], ""), `2^(32 − ${p}) − 2 = ${hosts}.`, 2);
  }));
  out.push(...repeat(10, () => {
    const p = ri(17, 30), m = mask(p);
    return mcq("CCX", "Subnetting", `What is the subnet mask for /${p}?`, m, [mask(p - 1), mask(p + 1), mask(p - 2), mask(p + 2)].filter((x) => x !== m), `/${p} means ${p} network bits: ${m}.`, 2);
  }));
  out.push(...repeat(10, () => {
    const p = pick([26, 27, 28, 29]), block = 2 ** (32 - p), host = ri(1, 254), net = Math.floor(host / block) * block;
    const ip = `192.168.${ri(0, 20)}.${host}`, base = ip.split(".").slice(0, 3).join(".");
    return mcq("CCX", "Subnetting", `What is the network address of ${ip}/${p}?`, `${base}.${net}`, [`${base}.${net + block}`, `${base}.${Math.max(0, net - block)}`, `${base}.${host}`, `${base}.0`].filter((x) => x !== `${base}.${net}`), `/${p} has a block size of ${block}; ${host} falls in the block starting at ${net}.`, 3);
  }));
  return out;
}

// ============================================================================ NGN
const NGN: F[] = [
  ["Regulation", "The body that regulates nursing and midwifery practice in Nigeria is the", "Nursing and Midwifery Council of Nigeria (NMCN)", ["Medical and Dental Council of Nigeria", "Pharmacy Council of Nigeria", "National Health Insurance Authority"], "It registers and licenses nurses and midwives."],
  ["Professional practice", "A nurse must obtain informed consent before a procedure because", "the patient has the right to decide about their own care", ["it is a hospital formality only", "the family must always decide", "it protects only the doctor"], "Consent must be voluntary, informed and given by a competent person."],
  ["Professional practice", "Sharing a patient's diagnosis with their employer without permission breaches", "confidentiality", ["accountability", "advocacy", "beneficence"], "Information is shared only with consent or legal basis."],
  ["Professional practice", "The nursing process follows the order", "assessment, diagnosis, planning, implementation, evaluation", ["planning, assessment, evaluation, implementation", "diagnosis, treatment, discharge", "implementation, planning, assessment"], "ADPIE."],
  ["Infection control", "The single most effective way to prevent hospital-acquired infections is", "hand hygiene", ["wearing a cap", "using antibiotics for everyone", "opening windows"], "The WHO '5 moments' guide when to clean hands."],
  ["Medical-surgical", "Early signs of hypovolaemic shock include", "rapid pulse and low blood pressure", ["slow pulse and high blood pressure", "fever and rash", "high urine output"], "Restore circulating volume and monitor closely."],
  ["Medical-surgical", "A patient with diabetes is sweaty, shaky and confused. The nurse should first suspect", "hypoglycaemia", ["hyperglycaemia", "stroke", "dehydration"], "Check blood glucose and give fast-acting glucose if conscious."],
  ["Medical-surgical", "The normal adult respiratory rate is", "12–20 breaths per minute", ["4–8 per minute", "30–40 per minute", "60–100 per minute"], "60–100 is the normal pulse rate."],
  ["Maternal and child health", "Malaria prophylaxis in pregnancy in Nigeria commonly uses intermittent preventive treatment with", "sulfadoxine-pyrimethamine (SP)", ["chloroquine only", "paracetamol", "metronidazole"], "IPTp-SP is given from the second trimester."],
  ["Maternal and child health", "Exclusive breastfeeding is recommended for the first", "6 months", ["2 months", "12 months", "2 weeks"], "Continue breastfeeding with complementary foods up to 2 years or beyond."],
  ["Maternal and child health", "Oral rehydration solution is the first-line treatment for", "dehydration from diarrhoea", ["malaria", "pneumonia", "measles rash"], "Give zinc as well for children with diarrhoea."],
  ["Maternal and child health", "The vaccine given at birth to protect against tuberculosis is", "BCG", ["OPV only", "measles vaccine", "pentavalent"], "OPV0 and hepatitis B are also given at birth."],
  ["Mental health", "A patient expressing thoughts of suicide should be", "assessed for risk, kept safe and not left alone if at high risk", ["told to cheer up", "ignored to avoid attention-seeking", "sent home immediately"], "Ask directly about suicidal thoughts."],
  ["Community health", "Primary health care in Nigeria emphasises", "accessible essential care close to where people live", ["only hospital surgery", "private care only", "specialist referral for every illness"], "Based on the Alma-Ata Declaration (1978)."],
  ["Pharmacology", "Before giving any medication, the nurse checks the 'rights', including", "right patient, drug, dose, route and time", ["right ward and right doctor only", "right price", "right pharmacy"], "Also right documentation."],
];
function ngnCalc(): Q[] {
  return repeat(12, () => {
    const want = pick([250, 500, 750, 1000]), have = pick([250, 500]), tabs = want / have;
    if (!Number.isInteger(tabs * 2)) return null;
    if (pick([true, false])) return mcq("NGN", "Drug calculations", `${want} mg is prescribed. Tablets are ${have} mg each. How many tablets do you give?`, `${tabs}`, numOpts(tabs, [tabs + 1, have / want, tabs * 2], ""), `Want ÷ have = ${want} ÷ ${have} = ${tabs}.`, 1);
    const vol = pick([500, 1000]), hrs = pick([4, 6, 8]), rate = r(vol / hrs, 1);
    return mcq("NGN", "Drug calculations", `${vol} mL of IV fluid is to run over ${hrs} hours. What is the rate in mL/hour?`, `${fmt(rate)} mL/hr`, numOpts(rate, [vol * hrs, r(vol / (hrs * 60), 2), rate * 2], "mL/hr"), `${vol} ÷ ${hrs} = ${fmt(rate)} mL/hr.`, 1);
  });
}

// ============================================================================ USM
const USM: F[] = [
  ["Biochemistry", "The rate-limiting enzyme of glycolysis is", "phosphofructokinase-1", ["hexokinase", "pyruvate kinase", "glucose-6-phosphatase"], "It is inhibited by ATP and citrate and activated by AMP and fructose-2,6-bisphosphate."],
  ["Biochemistry", "The rate-limiting enzyme of cholesterol synthesis is", "HMG-CoA reductase", ["acetyl-CoA carboxylase", "carnitine acyltransferase I", "glycogen phosphorylase"], "Statins inhibit it."],
  ["Biochemistry", "Deficiency of vitamin B1 (thiamine) causes", "Wernicke–Korsakoff syndrome and beriberi", ["scurvy", "pellagra", "rickets"], "Pellagra is niacin (B3) deficiency; scurvy is vitamin C."],
  ["Biochemistry", "Vitamin C deficiency impairs synthesis of", "collagen (hydroxylation of proline and lysine)", ["myelin", "haemoglobin", "insulin"], "It causes scurvy: bleeding gums and poor wound healing."],
  ["Genetics", "Cystic fibrosis is inherited in which pattern?", "Autosomal recessive", ["Autosomal dominant", "X-linked recessive", "Mitochondrial"], "Most common mutation: ΔF508 in the CFTR gene."],
  ["Genetics", "Huntington disease is caused by", "a CAG trinucleotide repeat expansion (autosomal dominant)", ["a CGG repeat on the X chromosome", "a deletion on chromosome 15", "a GAA repeat"], "It shows anticipation."],
  ["Genetics", "Trisomy 21 causes", "Down syndrome", ["Edwards syndrome", "Patau syndrome", "Turner syndrome"], "Edwards is trisomy 18; Patau is trisomy 13."],
  ["Microbiology", "The bacterium with no cell wall that causes atypical pneumonia is", "Mycoplasma pneumoniae", ["Streptococcus pneumoniae", "Klebsiella pneumoniae", "Staphylococcus aureus"], "Beta-lactams do not work; use macrolides."],
  ["Microbiology", "Gram-positive bacteria stain purple because they have", "a thick peptidoglycan layer", ["an outer membrane with LPS", "no cell wall", "mycolic acids only"], "Gram-negatives have a thin layer and an outer membrane."],
  ["Microbiology", "Lipopolysaccharide (endotoxin) is found in", "Gram-negative bacteria", ["Gram-positive bacteria", "fungi", "viruses"], "Lipid A causes septic shock."],
  ["Microbiology", "Plasmodium falciparum malaria is diagnosed by", "a thick and thin blood smear", ["a throat swab", "urine culture", "a skin biopsy"], "Rapid diagnostic tests are also used."],
  ["Pharmacology", "Aspirin works by irreversibly inhibiting", "cyclooxygenase (COX-1 and COX-2)", ["phospholipase A2", "thromboxane receptors only", "vitamin K epoxide reductase"], "Its antiplatelet effect lasts for the platelet's lifetime."],
  ["Pharmacology", "Warfarin inhibits", "vitamin K epoxide reductase", ["thrombin directly", "factor Xa directly", "platelet COX"], "Monitor with the INR."],
  ["Pharmacology", "The antidote for heparin is", "protamine sulfate", ["vitamin K", "naloxone", "flumazenil"], "Vitamin K reverses warfarin."],
  ["Pharmacology", "The antidote for opioid overdose is", "naloxone", ["flumazenil", "atropine", "N-acetylcysteine"], "Flumazenil reverses benzodiazepines."],
  ["Pharmacology", "The antidote for paracetamol (acetaminophen) overdose is", "N-acetylcysteine", ["naloxone", "fomepizole", "deferoxamine"], "It replenishes glutathione."],
  ["Pharmacology", "ACE inhibitors can cause a dry cough because they increase", "bradykinin", ["renin", "aldosterone", "histamine release from mast cells"], "Switch to an ARB if the cough is troublesome."],
  ["Physiology", "Most sodium is reabsorbed in which part of the nephron?", "Proximal convoluted tubule", ["Loop of Henle", "Distal convoluted tubule", "Collecting duct"], "About two-thirds of filtered sodium."],
  ["Physiology", "Loop diuretics such as furosemide act on the", "Na⁺/K⁺/2Cl⁻ cotransporter in the thick ascending limb", ["Na⁺/Cl⁻ cotransporter in the DCT", "aldosterone receptor", "carbonic anhydrase in the PCT"], "Thiazides act on the DCT."],
  ["Physiology", "Cardiac output equals", "stroke volume × heart rate", ["blood pressure × resistance", "stroke volume ÷ heart rate", "preload × afterload"], "Mean arterial pressure = cardiac output × total peripheral resistance."],
  ["Physiology", "Surfactant is produced by", "type II pneumocytes", ["type I pneumocytes", "alveolar macrophages", "goblet cells"], "It lowers alveolar surface tension."],
  ["Pathology", "Caseous necrosis is characteristic of", "tuberculosis", ["myocardial infarction", "acute pancreatitis", "gangrene"], "MI typically shows coagulative necrosis."],
  ["Pathology", "Reed–Sternberg cells are seen in", "Hodgkin lymphoma", ["multiple myeloma", "chronic myeloid leukaemia", "Burkitt lymphoma"], "They are large binucleate 'owl's eye' cells."],
  ["Immunology", "Type I hypersensitivity is mediated by", "IgE and mast cells", ["IgG and complement", "immune complexes", "T cells"], "Anaphylaxis is a type I reaction."],
  ["Immunology", "HIV infects cells with the receptor", "CD4", ["CD8", "CD19", "CD20"], "It also uses CCR5 or CXCR4 co-receptors."],
];
function usmCalc(): Q[] {
  return repeat(8, () => {
    const sv = pick([60, 70, 80]), hr = pick([60, 70, 80, 90]), co = r((sv * hr) / 1000, 2);
    return mcq("USM", "Physiology", `Stroke volume is ${sv} mL and heart rate is ${hr} beats/min. What is cardiac output?`, `${fmt(co)} L/min`, numOpts(co, [r(sv / hr, 2), sv + hr, r(co * 2, 2)], "L/min"), `CO = SV × HR = ${sv} × ${hr} = ${sv * hr} mL/min = ${fmt(co)} L/min.`, 2);
  });
}

// ============================================================================ GPH
const GPH: F[] = [
  ["Pharmacology", "Metformin is contraindicated in severe renal impairment because of the risk of", "lactic acidosis", ["hypoglycaemia", "hyperkalaemia", "weight gain"], "Metformin rarely causes hypoglycaemia on its own."],
  ["Pharmacology", "Which drug class ends in '-pril'?", "ACE inhibitors", ["beta blockers", "statins", "proton pump inhibitors"], "Beta blockers end in '-olol'; statins in '-statin'."],
  ["Pharmacology", "Which drug class ends in '-sartan'?", "angiotensin II receptor blockers", ["calcium channel blockers", "ACE inhibitors", "diuretics"], "For example losartan."],
  ["Pharmacology", "A common side effect of statins to warn patients about is", "muscle pain (myopathy)", ["hair growth", "constipation only", "increased appetite"], "Rarely rhabdomyolysis."],
  ["Pharmacology", "Grapefruit juice can raise levels of some drugs because it inhibits", "CYP3A4", ["CYP2D6", "MAO", "P-glycoprotein only in the brain"], "For example simvastatin."],
  ["Pharmacology", "Digoxin toxicity is more likely with", "hypokalaemia", ["hyperkalaemia", "hypernatraemia", "hypercalcaemia only with diuretics stopped"], "Low potassium increases digoxin binding."],
  ["Pharmacology", "Which antibiotic class should generally be avoided in children because of effects on teeth and bones?", "Tetracyclines", ["Penicillins", "Macrolides", "Cephalosporins"], "They cause tooth discolouration."],
  ["Pharmacology", "Isotretinoin requires a pregnancy prevention programme because it is", "teratogenic", ["addictive", "nephrotoxic", "a controlled drug"], "Similar caution applies to valproate."],
  ["Pharmacology", "Warfarin's effect is monitored using the", "INR", ["HbA1c", "aPTT only", "eGFR"], "Many foods and drugs interact with warfarin."],
  ["Pharmacology", "The first-line treatment for anaphylaxis is", "intramuscular adrenaline (epinephrine)", ["oral antihistamine", "IV hydrocortisone alone", "salbutamol inhaler"], "Give it into the anterolateral thigh."],
  ["Clinical pharmacy", "Which is a sign of opioid toxicity?", "Pinpoint pupils and slow breathing", ["Dilated pupils and fever", "Diarrhoea and sweating", "High blood pressure and agitation"], "Treat with naloxone."],
  ["Clinical pharmacy", "Paracetamol overdose mainly damages the", "liver", ["kidneys only", "heart", "lungs"], "Treat with N-acetylcysteine."],
  ["Pharmaceutics", "Enteric-coated tablets should not be crushed because", "the coating protects the drug or stomach from acid", ["they taste bad", "they dissolve too slowly", "it is illegal"], "Modified-release tablets also shouldn't be crushed."],
  ["Pharmaceutics", "A drug with a narrow therapeutic index", "has a small margin between effective and toxic doses", ["is always safe", "works in all patients", "has no side effects"], "Examples: lithium, digoxin, warfarin, phenytoin."],
  ["Pharmacokinetics", "Half-life is the time for", "the plasma concentration to fall by half", ["the drug to start working", "all of the drug to be removed", "the dose to double"], "It takes about 4–5 half-lives to reach steady state."],
  ["Pharmacokinetics", "Drugs with high first-pass metabolism", "have low oral bioavailability", ["have 100% oral bioavailability", "cannot be given IV", "are always excreted unchanged"], "IV bioavailability is 100%."],
];
function gphCalc(): Q[] {
  const out: Q[] = [];
  out.push(...repeat(10, () => {
    const kg = pick([10, 12, 15, 20, 25, 30]), mgkg = pick([5, 10, 15, 20]), dose = kg * mgkg;
    return mcq("GPH", "Calculations", `A child weighs ${kg} kg. The dose is ${mgkg} mg/kg. What dose should be given?`, `${dose} mg`, numOpts(dose, [kg + mgkg, r(kg / mgkg, 2), dose * 2], "mg"), `${kg} × ${mgkg} = ${dose} mg.`, 1);
  }));
  out.push(...repeat(10, () => {
    const conc = pick([125, 250]), per = 5, want = pick([250, 375, 500]), ml = r((want / conc) * per, 2);
    return mcq("GPH", "Calculations", `An oral suspension contains ${conc} mg/${per} mL. How many mL give a ${want} mg dose?`, `${fmt(ml)} mL`, numOpts(ml, [r(want / conc, 2), r((conc / want) * per, 2), ml * 2], "mL"), `(${want} ÷ ${conc}) × ${per} = ${fmt(ml)} mL.`, 2);
  }));
  out.push(...repeat(8, () => {
    const pct = pick([1, 2, 5, 10]), vol = pick([50, 100, 250, 500]), g = r((pct * vol) / 100, 2);
    return mcq("GPH", "Calculations", `How many grams of drug are in ${vol} mL of a ${pct}% w/v solution?`, `${fmt(g)} g`, numOpts(g, [pct * vol, r(g * 10, 2), r(g / 10, 3)], "g"), `${pct}% w/v = ${pct} g per 100 mL, so ${vol} mL contains ${fmt(g)} g.`, 2);
  }));
  return out;
}

// ============================================================================
export function wave3(): Record<string, Q[]> {
  return {
    GCM: gcm(),
    GEL: facts("GEL", GEL),
    CSJ: facts("CSJ", CSJ),
    AEN: facts("AEN", AEN),
    CDL: [...facts("CDL", CDL), ...cdlCalc()],
    OG1: facts("OG1", OG1),
    APL: facts("APL", APL),
    SYP: [...facts("SYP", SYP), ...sypCalc()],
    CCX: [...facts("CCX", CCX), ...ccxCalc()],
    NGN: [...facts("NGN", NGN), ...ngnCalc()],
    USM: [...facts("USM", USM), ...usmCalc()],
    GPH: [...facts("GPH", GPH), ...gphCalc()],
  };
}
