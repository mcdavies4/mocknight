// African expansion starter banks:
//   Ethiopia University Exit Exam programmes — EXC (Computer Science), EXM (Management), EXE (Economics),
//   EXA (Auditing, tax & finance; Accounting also uses AFA + AMA)
//   National civics/general knowledge — TZC (Tanzania), UGC (Uganda), CMC (Cameroon)
// Established facts only; calculations are generated from standard formulas.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;

// ============================================================================
// EXC — Computer Science
// ============================================================================
const EXC: F[] = [
  ["Data structures", "Which data structure works on a Last-In, First-Out (LIFO) basis?", "Stack", ["Queue", "Linked list", "Hash table"], "A queue is First-In, First-Out (FIFO)."],
  ["Data structures", "Which data structure works on a First-In, First-Out (FIFO) basis?", "Queue", ["Stack", "Binary tree", "Heap"], "Printers and task schedulers use queues."],
  ["Data structures", "Breadth-first search (BFS) uses which data structure?", "Queue", ["Stack", "Heap", "Hash table"], "Depth-first search uses a stack (or recursion)."],
  ["Algorithms", "What is the time complexity of binary search on a sorted array?", "O(log n)", ["O(n)", "O(n²)", "O(1)"], "It halves the search space each step."],
  ["Algorithms", "What is the worst-case time complexity of bubble sort?", "O(n²)", ["O(n log n)", "O(log n)", "O(n)"], "Merge sort is O(n log n) in all cases."],
  ["Algorithms", "Which sorting algorithm uses divide and conquer and is O(n log n) in the worst case?", "Merge sort", ["Bubble sort", "Insertion sort", "Selection sort"], "Quick sort is O(n²) in its worst case."],
  ["Algorithms", "Binary search requires the data to be", "sorted", ["in a linked list", "unsorted", "stored as text"], "It compares with the middle element each step."],
  ["Databases", "A primary key must be", "unique and not null", ["repeated in every row", "a text field", "optional"], "It identifies each row in a table."],
  ["Databases", "A foreign key is used to", "link a table to the primary key of another table", ["encrypt the database", "sort records", "store images"], "It enforces referential integrity."],
  ["Databases", "First normal form (1NF) requires that", "each field holds a single atomic value", ["there are no primary keys", "every table has one column", "data is stored in files"], "Repeating groups must be removed."],
  ["Databases", "In SQL, which clause filters rows?", "WHERE", ["ORDER BY", "GROUP BY", "SELECT"], "HAVING filters groups after GROUP BY."],
  ["Databases", "The 'A' in ACID transactions stands for", "Atomicity", ["Availability", "Accuracy", "Authentication"], "ACID: Atomicity, Consistency, Isolation, Durability."],
  ["Networks", "How many layers are in the OSI model?", "7", ["4", "5", "9"], "Physical, Data link, Network, Transport, Session, Presentation, Application."],
  ["Networks", "Which OSI layer is responsible for routing between networks?", "Network layer", ["Data link layer", "Transport layer", "Application layer"], "IP works at the network layer."],
  ["Networks", "Which protocol is connection-oriented and guarantees delivery?", "TCP", ["UDP", "IP", "ICMP"], "UDP is connectionless and faster but unreliable."],
  ["Networks", "How many bits are in an IPv4 address?", "32", ["64", "128", "16"], "IPv6 addresses are 128 bits."],
  ["Networks", "Which service translates domain names into IP addresses?", "DNS", ["DHCP", "FTP", "SMTP"], "DHCP assigns IP addresses automatically."],
  ["Networks", "HTTPS normally uses which port?", "443", ["80", "21", "25"], "HTTP uses port 80."],
  ["Operating systems", "Which is NOT one of the four necessary conditions for deadlock?", "Pre-emption", ["Mutual exclusion", "Hold and wait", "Circular wait"], "The fourth condition is no pre-emption."],
  ["Operating systems", "Round-robin scheduling gives each process", "a fixed time slice in turn", ["unlimited CPU time", "priority by size only", "no CPU time"], "It is common in time-sharing systems."],
  ["Operating systems", "Paging divides memory into", "fixed-size blocks", ["variable-size segments only", "files", "processes"], "Pages map to frames in physical memory."],
  ["Operating systems", "A thread is", "the smallest unit of execution within a process", ["a whole program on disk", "a type of memory", "a network cable"], "Threads in a process share its memory."],
  ["Programming", "Which is NOT one of the four main principles of OOP?", "Compilation", ["Encapsulation", "Inheritance", "Polymorphism"], "The fourth is abstraction."],
  ["Programming", "Encapsulation means", "bundling data with the methods that use it and hiding internal details", ["inheriting from many classes", "writing code in one file", "compiling quickly"], "Access modifiers support encapsulation."],
  ["Software engineering", "Which SDLC model completes each phase fully before the next begins?", "Waterfall", ["Agile", "Spiral", "Scrum"], "Agile delivers in short iterations."],
  ["Software engineering", "A UML use case diagram shows", "actors and the functions they use in a system", ["memory layout", "network cables", "database indexes"], "Sequence diagrams show interactions over time."],
  ["Compilers", "The first phase of a compiler, which breaks source code into tokens, is", "lexical analysis", ["code generation", "optimisation", "linking"], "Syntax analysis (parsing) comes next."],
  ["Theory", "Which logic gate is 'universal' (can build any other gate)?", "NAND", ["AND", "OR", "XOR"], "NOR is also universal."],
  ["Theory", "A deterministic finite automaton (DFA) recognises", "regular languages", ["all context-free languages", "every possible language", "only numbers"], "Pushdown automata recognise context-free languages."],
  ["Security", "AES is an example of", "symmetric encryption", ["asymmetric encryption", "hashing", "compression"], "RSA is asymmetric (public/private keys)."],
  ["Security", "A hash function used for passwords should be", "one-way and slow (e.g. bcrypt)", ["reversible", "the same as encryption", "fast and unsalted"], "Salting prevents rainbow-table attacks."],
];
function binary(): Q[] {
  return repeat(10, () => {
    const n = ri(17, 250), toBin = ri(0, 1) === 1;
    if (toBin) {
      const ans = n.toString(2);
      return mcq("EXC", "Number systems", `Convert ${n} (decimal) to binary.`, ans, [(n + 1).toString(2), (n - 2).toString(2), (n ^ 4).toString(2)].filter((x) => x !== ans), `${n} = ${ans} in base 2.`, 2);
    }
    const ans = n.toString(16).toUpperCase();
    return mcq("EXC", "Number systems", `Convert ${n} (decimal) to hexadecimal.`, ans, [(n + 16).toString(16).toUpperCase(), (n - 1).toString(16).toUpperCase(), String(n % 100)].filter((x) => x !== ans), `${n} = ${ans} in base 16.`, 2);
  });
}
function twosComp(): Q[] {
  return repeat(8, () => {
    const n = ri(1, 100), ans = ((256 - n) & 255).toString(2).padStart(8, "0");
    const plain = n.toString(2).padStart(8, "0"), ones = ((255 - n) & 255).toString(2).padStart(8, "0");
    return mcq("EXC", "Number systems", `What is −${n} in 8-bit two's complement?`, ans, [plain, ones, ("1" + plain.slice(1))].filter((x) => x !== ans), `Invert ${plain} → ${ones}, then add 1 → ${ans}.`, 3);
  });
}

// ============================================================================
// EXM — Management
// ============================================================================
const EXM: F[] = [
  ["Principles", "Which are the four basic functions of management?", "Planning, organising, leading and controlling", ["Hiring, firing, paying and promoting", "Buying, selling, storing and moving", "Saving, spending, lending and investing"], "Fayol originally listed five, including commanding and coordinating."],
  ["Principles", "Who is known as the father of scientific management?", "Frederick Taylor", ["Henri Fayol", "Max Weber", "Peter Drucker"], "Taylor used time and motion studies."],
  ["Principles", "Max Weber is associated with", "bureaucratic management", ["scientific management", "the Hawthorne studies", "Theory Y"], "Bureaucracy stresses rules, hierarchy and impersonality."],
  ["Principles", "Management by Objectives (MBO) was popularised by", "Peter Drucker", ["Frederick Taylor", "Abraham Maslow", "Michael Porter"], "Managers and employees agree objectives together."],
  ["Principles", "The Hawthorne studies highlighted the importance of", "social and human factors at work", ["machine speed", "accounting rules", "office location"], "They led to the human relations movement."],
  ["Organising", "Span of control refers to", "the number of subordinates a manager directly supervises", ["the length of the working day", "the company's market share", "the budget limit"], "Wide spans give flatter organisations."],
  ["Organising", "Line authority is", "direct authority over subordinates in the chain of command", ["advisory authority only", "authority over customers", "a type of loan"], "Staff authority advises line managers."],
  ["Motivation", "In Maslow's hierarchy, which need is at the top?", "Self-actualisation", ["Safety", "Physiological", "Esteem"], "Lower needs are usually met first."],
  ["Motivation", "In Herzberg's two-factor theory, salary is a", "hygiene factor", ["motivator", "self-actualisation need", "leadership style"], "Motivators include achievement, recognition and the work itself."],
  ["Motivation", "McGregor's Theory Y assumes that employees", "can be self-motivated and seek responsibility", ["dislike work and must be controlled", "only work for money", "cannot be trusted"], "Theory X assumes the opposite."],
  ["Strategy", "SWOT analysis examines", "strengths, weaknesses, opportunities and threats", ["sales, wages, output and taxes", "suppliers, workers, owners and traders", "speed, weight, operations and time"], "Strengths and weaknesses are internal."],
  ["Strategy", "Which is one of Porter's five forces?", "Threat of new entrants", ["Inflation rate", "Number of employees", "Company age"], "Others: buyer power, supplier power, substitutes and rivalry."],
  ["Strategy", "In the BCG matrix, a product with high market share in a low-growth market is a", "cash cow", ["star", "question mark", "dog"], "Stars have high share in high-growth markets."],
  ["Strategy", "PESTEL analysis looks at", "the external macro-environment", ["internal staff morale only", "the company's bank balance", "product packaging"], "Political, economic, social, technological, environmental and legal factors."],
  ["Marketing", "The 4Ps of the marketing mix are", "product, price, place and promotion", ["people, profit, planet and purpose", "plan, prepare, perform and profit", "price, packaging, payment and post"], "Services add people, process and physical evidence."],
  ["Leadership", "A leader who makes decisions alone without consulting staff uses which style?", "Autocratic", ["Democratic", "Laissez-faire", "Transformational"], "Democratic leaders involve the team."],
  ["Operations", "The critical path in a project network is", "the longest path, which sets the shortest possible project duration", ["the cheapest path", "the shortest path", "any path with no tasks"], "Activities on it have zero float."],
  ["Operations", "A Gantt chart shows", "tasks plotted against time", ["profit against sales", "an organisation's hierarchy", "a cash flow statement"], "Developed by Henry Gantt."],
  ["HRM", "Job analysis produces", "a job description and a person specification", ["the company budget", "an income statement", "a marketing plan"], "It is the basis for recruitment."],
  ["HRM", "Training given while doing the job is called", "on-the-job training", ["off-the-job training", "induction only", "appraisal"], "Examples include coaching and job rotation."],
];
function eoq(): Q[] {
  return repeat(8, () => {
    const D = pick([1200, 2400, 3600, 4800, 6000]), S = pick([50, 80, 100, 150]), H = pick([2, 3, 4, 6]);
    const ans = Math.round(Math.sqrt((2 * D * S) / H));
    return mcq("EXM", "Calculations", `Annual demand is ${D.toLocaleString("en-US")} units, ordering cost is ${S} per order and holding cost is ${H} per unit per year. What is the EOQ? (√(2DS ÷ H))`, fmt(ans, "units"),
      numOpts(ans, [Math.round(Math.sqrt((D * S) / H)), Math.round((2 * D * S) / H / 100), Math.round(Math.sqrt(2 * D * S * H))], "units"), `√(2 × ${D} × ${S} ÷ ${H}) ≈ ${ans} units.`, 3);
  });
}
function breakEven(): Q[] {
  return repeat(8, () => {
    const fc = pick([20000, 30000, 50000, 60000]), p = pick([50, 60, 80, 100]), vc = pick([20, 30, 40]);
    if (p <= vc) return null;
    const ans = Math.ceil(fc / (p - vc));
    return mcq("EXM", "Calculations", `Fixed costs are ${fc.toLocaleString("en-US")} birr, selling price is ${p} birr and variable cost is ${vc} birr per unit. What is the break-even quantity?`, fmt(ans, "units"),
      numOpts(ans, [Math.ceil(fc / p), Math.ceil(fc / vc), Math.ceil(fc / (p + vc))], "units"), `${fc} ÷ (${p} − ${vc}) = ${ans} units.`, 2);
  });
}

// ============================================================================
// EXE — Economics
// ============================================================================
const EXE: F[] = [
  ["Micro", "Opportunity cost is", "the value of the next best alternative given up", ["the price paid in cash", "the total cost of production", "a government tax"], "Every choice has an opportunity cost."],
  ["Micro", "The law of demand states that, other things equal,", "as price rises, quantity demanded falls", ["as price rises, quantity demanded rises", "demand never changes", "supply equals demand always"], "Giffen goods are rare exceptions."],
  ["Micro", "If demand is price-elastic (PED > 1), a price cut will", "increase total revenue", ["decrease total revenue", "leave revenue unchanged", "reduce quantity sold"], "Quantity rises proportionally more than price falls."],
  ["Micro", "A firm maximises profit where", "marginal revenue equals marginal cost", ["average cost is highest", "total revenue is lowest", "price equals zero"], "MR = MC."],
  ["Micro", "In perfect competition, firms are", "price takers", ["price makers", "monopolists", "always loss-making"], "Many firms sell identical products."],
  ["Micro", "A market with a few large interdependent firms is", "an oligopoly", ["perfect competition", "a monopoly", "monopolistic competition"], "Firms react to each other's decisions."],
  ["Micro", "The law of diminishing marginal utility says that", "extra satisfaction falls as more units are consumed", ["satisfaction always rises", "prices always fall", "utility cannot be measured"], "The tenth glass of water is worth less than the first."],
  ["Micro", "A production possibility frontier (PPF) shows", "the maximum combinations of two goods an economy can produce", ["the demand for one good", "inflation over time", "the exchange rate"], "Points inside show unused resources."],
  ["Macro", "GDP can be measured by the output, income and", "expenditure methods", ["inflation method", "population method", "interest method"], "All three should give the same result in theory."],
  ["Macro", "Inflation is commonly measured using the", "Consumer Price Index (CPI)", ["Gini coefficient", "GDP deflator only", "unemployment rate"], "CPI tracks the price of a basket of goods."],
  ["Macro", "Fiscal policy uses", "government spending and taxation", ["interest rates", "the money supply only", "exchange controls only"], "Monetary policy uses interest rates and money supply."],
  ["Macro", "Ethiopia's central bank is the", "National Bank of Ethiopia", ["Commercial Bank of Ethiopia", "Development Bank of Ethiopia", "Ministry of Finance"], "It conducts monetary policy."],
  ["Macro", "Unemployment caused by a mismatch between workers' skills and available jobs is", "structural unemployment", ["frictional unemployment", "seasonal unemployment", "cyclical unemployment"], "Frictional unemployment is short-term job searching."],
  ["Development", "The Gini coefficient measures", "income inequality", ["inflation", "population growth", "trade balance"], "0 is perfect equality; 1 is perfect inequality."],
  ["Trade", "The theory of comparative advantage is associated with", "David Ricardo", ["Adam Smith", "John Maynard Keynes", "Karl Marx"], "Countries gain by specialising where their opportunity cost is lowest."],
  ["Thought", "Who argued that governments should increase spending to fight recessions?", "John Maynard Keynes", ["Adam Smith", "Milton Friedman", "David Ricardo"], "Keynesian economics stresses aggregate demand."],
];
function ped(): Q[] {
  return repeat(8, () => {
    const dq = pick([10, 20, 30, 40]), dp = pick([5, 10, 20]);
    const ans = r(dq / dp, 2);
    return mcq("EXE", "Calculations", `A ${dp}% rise in price causes a ${dq}% fall in quantity demanded. What is the price elasticity of demand (absolute value)?`, fmt(ans),
      numOpts(ans, [r(dp / dq, 2), dq - dp, r(dq * dp / 100, 2)]), `PED = %ΔQ ÷ %ΔP = ${dq} ÷ ${dp} = ${fmt(ans)}. ${ans > 1 ? "Elastic." : ans < 1 ? "Inelastic." : "Unit elastic."}`, 2);
  });
}
function multiplier(): Q[] {
  return repeat(8, () => {
    const mpc = pick([0.5, 0.6, 0.75, 0.8, 0.9]);
    const ans = r(1 / (1 - mpc), 2);
    return mcq("EXE", "Calculations", `If the marginal propensity to consume (MPC) is ${mpc}, what is the simple spending multiplier? (1 ÷ (1 − MPC))`, fmt(ans),
      numOpts(ans, [r(1 / mpc, 2), r(1 - mpc, 2), r(mpc * 10, 1)]), `1 ÷ (1 − ${mpc}) = ${fmt(ans)}.`, 2);
  });
}

// ============================================================================
// EXA — Auditing, tax & finance (Accounting & Finance programme)
// ============================================================================
const EXA: F[] = [
  ["Auditing", "An unmodified (clean) audit opinion means the financial statements", "are presented fairly in all material respects", ["contain no errors at all", "were prepared by the auditor", "are guaranteed to be free of fraud"], "Audits give reasonable, not absolute, assurance."],
  ["Auditing", "An auditor issues an adverse opinion when misstatements are", "material and pervasive", ["immaterial", "material but not pervasive", "impossible to assess"], "Material but not pervasive misstatements give a qualified opinion."],
  ["Auditing", "A disclaimer of opinion is issued when the auditor", "cannot obtain sufficient appropriate evidence and the possible effects are pervasive", ["finds no errors", "agrees with management", "is not independent but continues"], "The auditor does not express an opinion."],
  ["Auditing", "Materiality refers to", "misstatements that could influence users' decisions", ["the total assets", "the auditor's fee", "the size of the company"], "Judgement considers size and nature."],
  ["Auditing", "Which threatens auditor independence?", "Having a financial interest in the client", ["Attending professional training", "Using audit software", "Reviewing working papers"], "Self-interest, self-review and familiarity are key threats."],
  ["Auditing", "Segregation of duties is an example of", "an internal control", ["a substantive test", "a tax rule", "an audit opinion"], "No one person should control a whole transaction."],
  ["Auditing", "External confirmation from a bank is an example of", "audit evidence obtained from a third party", ["management representation only", "an internal control", "a financial ratio"], "Third-party evidence is generally more reliable."],
  ["Standards", "Which body regulates accounting and auditing standards in Ethiopia?", "Accounting and Auditing Board of Ethiopia (AABE)", ["National Bank of Ethiopia", "Ethiopian Revenues and Customs Authority", "Ministry of Education"], "Ethiopia has adopted IFRS for reporting entities."],
  ["Tax", "What is the standard VAT rate in Ethiopia?", "15%", ["5%", "10%", "20%"], "VAT applies to most taxable supplies of goods and services."],
  ["Tax", "What is the standard corporate income tax rate in Ethiopia?", "30%", ["15%", "25%", "35%"], "Some sectors have special rules."],
  ["Finance", "A project should be accepted under the NPV rule if its NPV is", "positive", ["negative", "zero or negative", "equal to the initial investment"], "A positive NPV adds value."],
  ["Finance", "IRR is the discount rate at which", "NPV equals zero", ["NPV is highest", "payback is shortest", "profits are doubled"], "Accept if IRR exceeds the cost of capital."],
  ["Finance", "WACC stands for", "weighted average cost of capital", ["working assets current costs", "wages and capital costs", "weighted annual cash cover"], "It blends the costs of debt and equity."],
  ["Finance", "The current ratio measures", "short-term liquidity", ["long-term solvency", "profitability", "market value"], "Current assets ÷ current liabilities."],
];
function futureValue(): Q[] {
  return repeat(8, () => {
    const pv = pick([10000, 20000, 50000]), rate = pick([5, 8, 10, 12]), n = pick([2, 3, 5]);
    const ans = Math.round(pv * (1 + rate / 100) ** n);
    return mcq("EXA", "Calculations", `${pv.toLocaleString("en-US")} birr is invested at ${rate}% compound interest a year for ${n} years. What is its future value?`, fmt(ans, "birr"),
      numOpts(ans, [Math.round(pv * (1 + (rate / 100) * n)), Math.round(pv * (1 + rate / 100)), Math.round(pv / (1 + rate / 100) ** n)], "birr"), `FV = ${pv} × (1 + ${rate / 100})^${n} = ${ans.toLocaleString("en-US")} birr.`, 2);
  });
}
function currentRatio(): Q[] {
  return repeat(8, () => {
    const ca = pick([120000, 150000, 240000, 300000]), cl = pick([60000, 80000, 100000, 120000]);
    const ans = r(ca / cl, 2);
    return mcq("EXA", "Calculations", `Current assets are ${ca.toLocaleString("en-US")} birr and current liabilities are ${cl.toLocaleString("en-US")} birr. What is the current ratio?`, `${fmt(ans)} : 1`,
      [r(cl / ca, 2), r((ca - cl) / cl, 2), r(ca / cl + 1, 2)].filter((x) => x !== ans).map((x) => `${fmt(x)} : 1`), `${ca} ÷ ${cl} = ${fmt(ans)} : 1.`, 1);
  });
}

// ============================================================================
// National civics / general knowledge
// ============================================================================
const TZC: F[] = [
  ["History", "When did Tanganyika gain independence?", "9 December 1961", ["26 April 1964", "12 January 1964", "1 July 1960"], "Independence Day is 9 December."],
  ["History", "Tanganyika and Zanzibar united to form Tanzania on", "26 April 1964", ["9 December 1961", "7 July 1954", "5 February 1977"], "Union Day is 26 April."],
  ["History", "Who was Tanzania's first President?", "Julius Nyerere", ["Ali Hassan Mwinyi", "Benjamin Mkapa", "Abeid Karume"], "Nyerere is called 'Mwalimu' (teacher)."],
  ["History", "The Arusha Declaration of 1967 set out the policy of", "Ujamaa (African socialism and self-reliance)", ["multi-party democracy", "colonial rule", "free-market reform"], "It was led by Julius Nyerere."],
  ["History", "The Maji Maji rebellion (1905–1907) was against", "German colonial rule", ["British colonial rule", "Arab traders", "the Portuguese"], "Tanganyika was part of German East Africa."],
  ["History", "Who became Tanzania's first female President in 2021?", "Samia Suluhu Hassan", ["Anne Makinda", "Asha-Rose Migiro", "Gertrude Mongella"], "She succeeded John Magufuli."],
  ["Government", "Which party was formed in 1977 by merging TANU and the Afro-Shirazi Party?", "Chama Cha Mapinduzi (CCM)", ["CHADEMA", "CUF", "ACT-Wazalendo"], "CCM has governed since its formation."],
  ["Government", "Tanzania's parliament is called the", "Bunge", ["Senate", "Lukiiko", "Majlis"], "It sits in Dodoma."],
  ["Government", "What is Tanzania's official capital?", "Dodoma", ["Dar es Salaam", "Arusha", "Zanzibar City"], "Dar es Salaam is the largest city and main port."],
  ["Government", "What is Tanzania's national motto?", "Uhuru na Umoja (Freedom and Unity)", ["Unity and Faith", "For God and My Country", "Peace, Work, Fatherland"], "It appears on the coat of arms."],
  ["Government", "Which body runs national examinations in Tanzania?", "NECTA", ["UNEB", "KNEC", "WAEC"], "The National Examinations Council of Tanzania."],
  ["Geography", "What is the highest mountain in Africa?", "Mount Kilimanjaro", ["Mount Kenya", "Mount Meru", "Mount Elgon"], "Its summit, Uhuru Peak, is about 5,895 m."],
  ["Geography", "Which is the deepest lake in Africa?", "Lake Tanganyika", ["Lake Victoria", "Lake Nyasa", "Lake Rukwa"], "It is shared by four countries."],
  ["Geography", "Which national park is famous for the great wildebeest migration?", "Serengeti", ["Ruaha", "Mikumi", "Selous only"], "It continues into Kenya's Maasai Mara."],
  ["Region", "Where is the headquarters of the East African Community (EAC)?", "Arusha", ["Nairobi", "Kampala", "Kigali"], "The EAC promotes regional integration."],
  ["Culture", "What is Tanzania's national language?", "Kiswahili", ["English only", "Arabic", "Sukuma"], "English is also used in government and secondary education."],
];
const UGC: F[] = [
  ["History", "When did Uganda gain independence?", "9 October 1962", ["9 December 1961", "12 December 1963", "1 July 1960"], "Independence Day is 9 October."],
  ["History", "Who was Uganda's first Prime Minister?", "Milton Obote", ["Idi Amin", "Yoweri Museveni", "Kabaka Mutesa II"], "Kabaka Mutesa II became the ceremonial President in 1963."],
  ["History", "Idi Amin seized power in a military coup in", "1971", ["1962", "1979", "1986"], "His rule ended in 1979."],
  ["History", "The NRM under Yoweri Museveni came to power in", "1986", ["1971", "1980", "1996"], "Museveni has been President since then."],
  ["Government", "Uganda's current constitution was adopted in", "1995", ["1962", "1967", "2005"], "It has since been amended."],
  ["Government", "What is Uganda's national motto?", "For God and My Country", ["Unity and Faith", "Freedom and Unity", "Peace, Work, Fatherland"], "It appears on the coat of arms."],
  ["Government", "Which body runs national examinations in Uganda?", "UNEB", ["NECTA", "KNEC", "WAEC"], "The Uganda National Examinations Board."],
  ["Government", "What is the capital of Uganda?", "Kampala", ["Entebbe", "Jinja", "Gulu"], "Entebbe has the main international airport."],
  ["Government", "Uganda's official languages are", "English and Kiswahili", ["English and Luganda", "Luganda only", "French and English"], "Kiswahili was added as an official language in 2005."],
  ["Geography", "The source of the River Nile is near which Ugandan town?", "Jinja", ["Kampala", "Mbarara", "Fort Portal"], "The Nile flows out of Lake Victoria there."],
  ["Geography", "Uganda's highest point, Margherita Peak, is in the", "Rwenzori Mountains", ["Mount Elgon range", "Virunga volcanoes", "Imatong Mountains"], "It is about 5,109 m high."],
  ["Geography", "Which line of latitude passes through Uganda?", "The Equator", ["The Tropic of Cancer", "The Tropic of Capricorn", "The Arctic Circle"], "Monuments mark it near Kayabwe."],
  ["Geography", "Murchison Falls is on which river?", "The Victoria Nile", ["The Congo", "The Zambezi", "The Niger"], "The river squeezes through a narrow gorge."],
  ["Culture", "Uganda's national bird, shown on the flag, is the", "grey crowned crane", ["African fish eagle", "ostrich", "hornbill"], "It stands for gentleness and progress."],
  ["Culture", "The traditional king of Buganda is called the", "Kabaka", ["Omukama", "Asantehene", "Oba"], "Buganda's parliament is the Lukiiko."],
];
const CMC: F[] = [
  ["History", "French Cameroun became independent on", "1 January 1960", ["1 October 1961", "20 May 1972", "6 March 1957"], "British Southern Cameroons joined later."],
  ["History", "Southern Cameroons joined the Federal Republic of Cameroon on", "1 October 1961", ["1 January 1960", "20 May 1972", "11 February 1961"], "This followed the UN plebiscite of February 1961."],
  ["History", "Cameroon's National Day, 20 May, marks", "the 1972 creation of a unitary state", ["independence from France", "the 1961 plebiscite", "the end of German rule"], "The federation was replaced by a unitary republic."],
  ["History", "Who was Cameroon's first President?", "Ahmadou Ahidjo", ["Paul Biya", "John Ngu Foncha", "Ruben Um Nyobé"], "Paul Biya succeeded him in 1982."],
  ["History", "Before the First World War, Kamerun was a protectorate of", "Germany", ["Portugal", "Belgium", "Spain"], "Germany established it in 1884."],
  ["Government", "What is the capital of Cameroon?", "Yaoundé", ["Douala", "Buea", "Bamenda"], "Douala is the largest city and main port."],
  ["Government", "Cameroon's official languages are", "English and French", ["French only", "English and Fulfulde", "German and French"], "Cameroon is officially bilingual."],
  ["Government", "How many regions does Cameroon have?", "10", ["8", "12", "16"], "The North-West and South-West are English-speaking."],
  ["Government", "What is Cameroon's national motto?", "Peace – Work – Fatherland", ["Unity and Faith", "Freedom and Justice", "For God and My Country"], "In French: Paix – Travail – Patrie."],
  ["Government", "Which body organises the GCE examinations in Cameroon?", "The Cameroon GCE Board", ["WAEC", "Office du Baccalauréat only", "UNEB"], "Francophone students sit the BEPC and Baccalauréat."],
  ["Economy", "What currency does Cameroon use?", "The Central African CFA franc", ["The naira", "The West African CFA franc", "The cedi"], "It is shared by CEMAC member states."],
  ["Geography", "What is the highest mountain in West and Central Africa?", "Mount Cameroon", ["Mount Kilimanjaro", "Chappal Waddi", "Mount Oku"], "It is an active volcano near Buea."],
  ["Geography", "The 1986 Lake Nyos disaster was caused by", "a sudden release of carbon dioxide", ["an earthquake", "a dam failure", "an oil spill"], "The gas suffocated people and animals in nearby villages."],
  ["Geography", "Cameroon is often called", "'Africa in miniature'", ["'the Giant of Africa'", "'the Pearl of Africa'", "'the Land of a Thousand Hills'"], "It has nearly every African climate and landscape."],
];

export function africa(): Record<string, Q[]> {
  return {
    EXC: [...facts("EXC", EXC), ...binary(), ...twosComp()],
    EXM: [...facts("EXM", EXM), ...eoq(), ...breakEven()],
    EXE: [...facts("EXE", EXE), ...ped(), ...multiplier()],
    EXA: [...facts("EXA", EXA), ...futureValue(), ...currentRatio()],
    TZC: facts("TZC", TZC, 1),
    UGC: facts("UGC", UGC, 1),
    CMC: facts("CMC", CMC, 1),
  };
}
