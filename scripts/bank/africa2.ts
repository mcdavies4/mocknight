// Africa batch 2:
//   K53 — South Africa learner's licence (rules of the road, signs, vehicle controls)
//   KEL — Kenya business law & tax (for KASNEB CPA)
//   + deeper Exit Exam Management (EXM) and Economics (EXE), and more national civics (TZC, UGC, CMC)
// Long-established rules and facts only.
import { fmt, mcq, numOpts, pick, Q, repeat } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;

const K53: F[] = [
  ["Speed limits", "Unless a sign shows otherwise, the general speed limit on a public road in an urban area is", "60 km/h", ["40 km/h", "80 km/h", "100 km/h"], "Outside urban areas it is 100 km/h; on freeways 120 km/h."],
  ["Speed limits", "Unless a sign shows otherwise, the general speed limit on a public road outside an urban area (not a freeway) is", "100 km/h", ["60 km/h", "80 km/h", "120 km/h"], "Freeways are 120 km/h."],
  ["Speed limits", "Unless a sign shows otherwise, the general speed limit on a freeway is", "120 km/h", ["100 km/h", "140 km/h", "80 km/h"], "Always adjust speed to conditions."],
  ["Alcohol", "The legal blood alcohol limit for ordinary drivers is", "less than 0.05 g per 100 ml of blood", ["less than 0.08 g per 100 ml", "zero for everyone", "less than 0.5 g per 100 ml"], "For professional drivers it is less than 0.02 g per 100 ml."],
  ["Alcohol", "The legal blood alcohol limit for professional drivers is", "less than 0.02 g per 100 ml of blood", ["less than 0.05 g per 100 ml", "less than 0.08 g per 100 ml", "there is no limit"], "Professional drivers hold a PrDP."],
  ["Learner's licence", "A learner driver of a light motor vehicle must be accompanied by", "a person with a valid licence for that vehicle class, seated beside them", ["any passenger over 16", "nobody, if driving slowly", "another learner"], "The accompanying driver must be licensed for that class."],
  ["Learner's licence", "How long is a learner's licence valid?", "24 months", ["6 months", "12 months", "5 years"], "You must pass the driving test before it expires or rewrite the learner's test."],
  ["Learner's licence", "The minimum age to apply for a learner's licence for a light motor vehicle (learner's code 2) is", "17", ["16", "18", "21"], "You must be 18 to get a driving licence for a light motor vehicle."],
  ["Rules", "In South Africa, you drive on the", "left side of the road and overtake on the right", ["right side and overtake on the left", "middle of the road", "either side"], "Keep left unless overtaking."],
  ["Rules", "At a four-way stop, who goes first?", "The vehicle that stopped first", ["The largest vehicle", "The vehicle on the right always", "The fastest vehicle"], "Proceed in the order of arrival, once it is safe."],
  ["Rules", "At a traffic circle, you must yield to", "vehicles already in the circle (approaching from the right)", ["vehicles entering after you", "pedestrians only", "nobody"], "Enter only when the way is clear."],
  ["Rules", "A solid white line in the middle of the road (no-overtaking line) means", "you may not cross or straddle it", ["you may overtake carefully", "it is a parking bay", "it marks a bus lane"], "A broken line may be crossed when safe."],
  ["Rules", "Using a hand-held cellphone while driving is", "against the law", ["allowed at low speed", "allowed at traffic lights", "allowed for short calls"], "Use a hands-free kit or pull over safely."],
  ["Rules", "Who must wear a seatbelt in a vehicle where one is fitted?", "The driver and all passengers", ["Only the driver", "Only front-seat passengers", "Nobody on short trips"], "Children must use suitable restraints."],
  ["Rules", "When an emergency vehicle approaches with sirens and lights on, you must", "give way, moving left and stopping if necessary", ["speed up", "stop in the middle of the road", "follow it closely"], "Never block an emergency vehicle."],
  ["Rules", "The 'two-second rule' helps you keep", "a safe following distance", ["a safe parking distance", "your speed below the limit", "your fuel consumption low"], "Increase it in rain, fog or at night."],
  ["Signs", "A red octagonal sign means", "stop", ["yield", "no entry", "danger ahead"], "You must come to a complete stop."],
  ["Signs", "An inverted (upside-down) triangle sign with a red border means", "yield", ["stop", "no overtaking", "road works"], "Give way to traffic on the road you are entering."],
  ["Signs", "Signs with a red circle (often with a red diagonal bar) are", "prohibition signs", ["warning signs", "information signs", "guidance signs"], "They tell you what you may not do."],
  ["Signs", "Signs shaped as a triangle with a red border usually", "warn of a hazard ahead", ["give an instruction you must obey", "show tourist information", "show distances to towns"], "Slow down and look out for the hazard."],
  ["Signs", "A blue circular sign usually", "gives a command you must follow", ["warns of danger", "shows a tourist attraction", "marks the end of a freeway"], "For example, 'keep left' or 'pedestrians only'."],
  ["Signals", "A flashing red traffic light should be treated as", "a stop sign", ["a green light", "a yield sign", "an instruction to speed up"], "Stop, then go when safe."],
  ["Signals", "A steady amber traffic light means", "stop, unless you are so close that stopping would be unsafe", ["go faster to beat the red", "the lights are broken", "pedestrians must stop"], "Amber comes before red."],
  ["Controls", "In a manual car, which pedal is pressed to change gear?", "The clutch (left pedal)", ["The brake (middle pedal)", "The accelerator (right pedal)", "The handbrake"], "The order from left is clutch, brake, accelerator."],
  ["Controls", "Which control is used to warn other road users of your presence in an emergency?", "The hooter", ["The handbrake", "The clutch", "The gear lever"], "Do not use it unnecessarily."],
  ["Controls", "Which control keeps a parked vehicle from moving?", "The parking brake (handbrake)", ["The clutch", "The hooter", "The indicator"], "Apply it whenever you park."],
  ["Controls", "Indicators (flickers) are used to", "show other road users which way you intend to turn or move", ["warn of rain", "switch on headlights", "unlock the doors"], "Signal in good time before turning."],
];

const KEL: F[] = [
  ["Tax", "What is the standard VAT rate in Kenya?", "16%", ["15%", "14%", "18%"], "Some supplies are zero-rated or exempt."],
  ["Tax", "What is the corporate income tax rate for a resident company in Kenya?", "30%", ["25%", "20%", "35%"], "Some sectors and newly listed companies have lower rates."],
  ["Tax", "Which body administers tax in Kenya?", "Kenya Revenue Authority (KRA)", ["Central Bank of Kenya", "Capital Markets Authority", "KASNEB"], "Returns are filed online through iTax."],
  ["Tax", "PAYE is", "income tax deducted from employees' pay by the employer", ["a tax on imports", "a tax on company profits only", "a property rates charge"], "Pay As You Earn."],
  ["Tax", "The Affordable Housing Levy is charged at", "1.5% of gross salary, paid by both employee and employer", ["5% paid by the employer only", "10% of profits", "1% of turnover"], "It funds affordable housing projects."],
  ["Tax", "Kenya's NHIF was replaced by the", "Social Health Insurance Fund (SHIF)", ["NSSF", "KRA", "Housing Fund"], "SHIF contributions are deducted from pay."],
  ["Profession", "Which body examines the CPA qualification in Kenya?", "KASNEB", ["ICPAK", "KRA", "CMA"], "ICPAK is the professional body that registers accountants."],
  ["Profession", "Which body regulates and registers professional accountants in Kenya?", "ICPAK", ["KASNEB", "KRA", "NSE"], "Under the Accountants Act, 2008."],
  ["Company law", "Which Act governs companies in Kenya?", "The Companies Act, 2015", ["The Companies Act, 1948", "The Partnerships Act, 2012", "The Insolvency Act, 1990"], "It replaced the old Companies Act (Cap 486)."],
  ["Company law", "Insolvency of companies and individuals in Kenya is mainly governed by", "The Insolvency Act, 2015", ["The Companies Act, 1948", "The Sale of Goods Act", "The Employment Act"], "It covers administration, liquidation and bankruptcy."],
  ["Company law", "A company's constitution regulating its internal affairs is mainly its", "articles of association", ["certificate of incorporation only", "annual return", "share certificate"], "The articles set out directors' powers and members' rights."],
  ["Company law", "A company has 'separate legal personality', which means", "the company is a legal person distinct from its members", ["shareholders are personally liable for all debts", "it cannot own property", "it ends when a director dies"], "Established in Salomon v Salomon & Co (1897)."],
  ["Contract", "Which is NOT an essential element of a valid contract?", "Writing in every case", ["Offer and acceptance", "Consideration", "Intention to create legal relations"], "Many contracts are valid orally; some must be in writing."],
  ["Contract", "An invitation to treat, such as goods displayed in a shop window, is", "not an offer but an invitation to make offers", ["a binding offer", "an acceptance", "a contract"], "The customer makes the offer at the till."],
  ["Contract", "Acceptance of an offer must generally be", "unconditional and communicated to the offeror", ["silent", "made after the offer lapses", "a counter-offer"], "A counter-offer rejects the original offer."],
  ["Contract", "A contract made by a minor for necessaries is generally", "binding to the extent of a reasonable price", ["always void", "always fully enforceable", "illegal"], "Capacity rules protect minors."],
  ["Contract", "A contract induced by a false statement of fact is affected by", "misrepresentation", ["consideration", "frustration", "novation"], "The innocent party may be able to rescind it."],
  ["Constitution", "Kenya's current constitution was promulgated in", "2010", ["1963", "1992", "2002"], "It created devolved county governments."],
  ["Constitution", "How many counties does Kenya have under the 2010 Constitution?", "47", ["8", "42", "50"], "Each county has a governor and an assembly."],
  ["Markets", "Which body regulates the capital markets in Kenya?", "Capital Markets Authority (CMA)", ["Central Bank of Kenya", "KRA", "ICPAK"], "Shares trade on the Nairobi Securities Exchange (NSE)."],
  ["Partnership", "Partnerships in Kenya are mainly governed by", "The Partnerships Act, 2012", ["The Companies Act, 2015", "The Insolvency Act, 2015", "The Employment Act, 2007"], "It also provides for limited liability partnerships."],
];

const EXM: F[] = [
  ["Principles", "Henri Fayol's principle of 'unity of command' means", "each employee should receive orders from only one superior", ["everyone shares one goal", "all decisions are made by one person", "there is one department only"], "Fayol set out 14 principles of management."],
  ["Principles", "Centralisation means", "decision-making authority is concentrated at the top", ["decisions are pushed down to lower levels", "work is outsourced", "there are no managers"], "Decentralisation spreads authority downwards."],
  ["Principles", "Delegation means", "assigning authority and responsibility for a task to a subordinate", ["doing all tasks yourself", "removing a manager", "hiring consultants"], "The manager remains accountable."],
  ["Planning", "A plan used only once for a specific purpose, such as a project, is a", "single-use plan", ["standing plan", "policy", "procedure"], "Policies and procedures are standing plans."],
  ["Planning", "SMART objectives are specific, measurable, achievable, relevant and", "time-bound", ["timeless", "technical", "tested"], "SMART objectives are easier to monitor."],
  ["Decision making", "Bounded rationality, the idea that decision-makers have limited information and time, is associated with", "Herbert Simon", ["Frederick Taylor", "Henri Fayol", "Abraham Maslow"], "Managers often 'satisfice' rather than optimise."],
  ["Control", "Feedforward control acts", "before an activity, to prevent problems", ["only after results are known", "never", "during annual audits only"], "Concurrent control acts during the activity; feedback control after."],
  ["Motivation", "Vroom's expectancy theory says motivation depends on expectancy, instrumentality and", "valence", ["salary only", "hygiene", "authority"], "Valence is how much the person values the reward."],
  ["Motivation", "Adams' equity theory suggests employees are motivated by", "fairness compared with others' inputs and rewards", ["only their own needs", "job security only", "fear of punishment"], "Perceived unfairness reduces effort."],
  ["Leadership", "Transformational leaders", "inspire followers to go beyond self-interest for a shared vision", ["rely only on rewards and punishments", "avoid making decisions", "never communicate"], "Transactional leaders focus on exchanges of rewards for performance."],
  ["Leadership", "Fiedler's contingency model says effective leadership depends on", "matching leadership style to the situation", ["one best style for all situations", "the leader's height", "the number of employees only"], "Situational favourableness matters."],
  ["Organisation", "A matrix structure means employees report to", "both a functional manager and a project manager", ["only the CEO", "nobody", "customers"], "It improves coordination but can confuse authority."],
  ["Change", "Lewin's change model has three stages:", "unfreeze, change and refreeze", ["plan, do and check", "hire, train and fire", "buy, sell and hold"], "Refreezing embeds the new way of working."],
  ["Quality", "Total Quality Management (TQM) emphasises", "continuous improvement and customer focus across the organisation", ["inspection only at the end", "cutting staff", "ignoring customers"], "Deming and Juran were key figures."],
];

const EXE: F[] = [
  ["Micro", "When a good's income elasticity of demand is negative, it is", "an inferior good", ["a normal good", "a luxury good", "a public good"], "Demand falls as income rises."],
  ["Micro", "Goods that are rivalrous and excludable are", "private goods", ["public goods", "common resources", "club goods"], "Public goods are non-rival and non-excludable."],
  ["Micro", "The free-rider problem is mainly associated with", "public goods", ["private goods", "luxury goods", "inferior goods"], "People can benefit without paying."],
  ["Micro", "A negative externality, such as pollution, leads a free market to produce", "too much of the good", ["too little of the good", "exactly the right amount", "nothing"], "Taxes can correct negative externalities."],
  ["Micro", "A price ceiling set below the equilibrium price causes", "a shortage", ["a surplus", "no change", "higher prices"], "Quantity demanded exceeds quantity supplied."],
  ["Micro", "A price floor set above equilibrium, such as a minimum wage, can cause", "a surplus", ["a shortage", "no change", "lower prices"], "In the labour market, the surplus is unemployment."],
  ["Micro", "Economies of scale occur when", "average cost falls as output increases", ["total cost falls to zero", "prices rise with output", "a firm shrinks"], "Diseconomies of scale are the opposite."],
  ["Micro", "In the long run in perfect competition, firms earn", "normal profit", ["supernormal profit", "losses forever", "monopoly profit"], "Entry and exit remove supernormal profit."],
  ["Macro", "Stagflation is", "high inflation together with high unemployment and slow growth", ["low inflation with full employment", "falling prices with rapid growth", "a type of tax"], "It challenged simple Phillips curve thinking."],
  ["Macro", "The Phillips curve originally showed a trade-off between", "inflation and unemployment", ["exports and imports", "taxes and spending", "savings and investment"], "The long-run curve is thought to be vertical."],
  ["Macro", "Open market operations involve the central bank", "buying and selling government securities", ["setting tax rates", "building roads", "printing textbooks"], "They change the money supply."],
  ["Macro", "A depreciation of the birr would usually make Ethiopian exports", "cheaper for foreign buyers", ["more expensive for foreign buyers", "unchanged in price", "illegal"], "Imports become more expensive."],
  ["Trade", "A tariff is", "a tax on imports", ["a subsidy to exporters", "a limit on the number of imports", "a type of exchange rate"], "A quota limits the quantity of imports."],
  ["Development", "The Human Development Index (HDI) combines", "health, education and income", ["exports, imports and tariffs", "inflation, unemployment and interest", "population, land and capital"], "It is published by the UNDP."],
];

function crossElasticity(): Q[] {
  return repeat(8, () => {
    const dq = pick([10, 15, 20, 30]), dp = pick([5, 10, 20]), sign = pick([1, -1]);
    const ans = r((sign * dq) / dp, 2);
    const kind = ans > 0 ? "substitutes" : "complements";
    return mcq("EXE", "Calculations", `When the price of good B rises by ${dp}%, demand for good A ${sign > 0 ? "rises" : "falls"} by ${dq}%. What is the cross elasticity of demand?`, fmt(ans),
      numOpts(ans, [r((-sign * dq) / dp, 2), r(dp / dq, 2), r((sign * dp) / dq, 2)], "", true), `XED = ${sign > 0 ? "+" : "−"}${dq}% ÷ ${dp}% = ${fmt(ans)}, so the goods are ${kind}.`, 2);
  });
}

const TZC: F[] = [
  ["History", "Zanzibar's revolution took place on", "12 January 1964", ["26 April 1964", "9 December 1961", "7 July 1954"], "Abeid Amani Karume became President of Zanzibar."],
  ["History", "TANU, the party that led Tanganyika to independence, was founded in", "1954", ["1961", "1964", "1977"], "Its leader was Julius Nyerere."],
  ["History", "After the First World War, Tanganyika was administered by", "Britain", ["Germany", "France", "Portugal"], "It was a League of Nations mandate, later a UN trust territory."],
  ["Geography", "Which lake forms part of Tanzania's border with Malawi and Mozambique?", "Lake Nyasa", ["Lake Victoria", "Lake Tanganyika", "Lake Eyasi"], "It is also called Lake Malawi."],
  ["Geography", "Which is Tanzania's main port city?", "Dar es Salaam", ["Dodoma", "Mwanza", "Arusha"], "Tanga and Mtwara are other ports."],
  ["Civics", "In Tanzania, the voting age is", "18", ["16", "21", "25"], "Citizens aged 18 and over can vote."],
  ["Civics", "The head of state and government in Tanzania is the", "President", ["Prime Minister", "Speaker", "Chief Justice"], "The Prime Minister leads government business in the Bunge."],
];
const UGC: F[] = [
  ["History", "Uganda was a British protectorate from", "1894", ["1914", "1962", "1884"], "It became independent in 1962."],
  ["Geography", "Which lake is shared by Uganda, Kenya and Tanzania?", "Lake Victoria", ["Lake Albert", "Lake Kyoga", "Lake Edward"], "It is Africa's largest lake by area."],
  ["Geography", "Uganda is often called", "the Pearl of Africa", ["the Giant of Africa", "Africa in miniature", "the Land of a Thousand Hills"], "Winston Churchill popularised the phrase."],
  ["Geography", "Which national park is famous for mountain gorillas?", "Bwindi Impenetrable National Park", ["Murchison Falls National Park", "Queen Elizabeth National Park", "Kidepo Valley National Park"], "Mgahinga also has gorillas."],
  ["Civics", "In Uganda, the voting age is", "18", ["16", "21", "25"], "Citizens aged 18 and over can vote."],
  ["Civics", "Uganda's legislature is", "Parliament (unicameral)", ["the Bunge", "the Senate and House", "the Lukiiko"], "The Lukiiko is Buganda's kingdom parliament."],
  ["Economy", "What currency does Uganda use?", "The Ugandan shilling", ["The Kenyan shilling", "The franc", "The naira"], "Its code is UGX."],
];
const CMC: F[] = [
  ["History", "The UN plebiscite that decided the future of British Cameroons took place in", "February 1961", ["January 1960", "May 1972", "October 1982"], "Southern Cameroons voted to join Cameroun; Northern Cameroons joined Nigeria."],
  ["History", "Paul Biya became President of Cameroon in", "1982", ["1960", "1972", "1990"], "He succeeded Ahmadou Ahidjo."],
  ["Geography", "Which is Cameroon's largest city and main port?", "Douala", ["Yaoundé", "Limbe", "Garoua"], "Yaoundé is the capital."],
  ["Geography", "Buea, at the foot of Mount Cameroon, is the capital of which region?", "South-West", ["North-West", "Littoral", "Centre"], "Bamenda is the capital of the North-West."],
  ["Region", "Cameroon is a member of which regional economic community?", "CEMAC", ["ECOWAS", "EAC", "SADC"], "The Economic and Monetary Community of Central Africa."],
  ["Civics", "In Cameroon, the voting age is", "20", ["16", "18", "25"], "Cameroon's voting age is higher than in many countries."],
  ["Culture", "Cameroon's national football team is nicknamed", "the Indomitable Lions", ["the Super Eagles", "the Black Stars", "the Elephants"], "They reached the World Cup quarter-finals in 1990."],
];

export function africa2(): Record<string, Q[]> {
  return {
    K53: facts("K53", K53, 1),
    KEL: facts("KEL", KEL),
    EXM: facts("EXM", EXM),
    EXE: [...facts("EXE", EXE), ...crossElasticity()],
    TZC: facts("TZC", TZC, 1),
    UGC: facts("UGC", UGC, 1),
    CMC: facts("CMC", CMC, 1),
  };
}
