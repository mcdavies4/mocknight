// Career pathways: Cybersecurity (SECQ), Data Analytics (DAQ), AI & Automation (AIQ),
// Construction site management UK (CONQ), Bookkeeping & Payroll UK (BKQ). Original practice; calculations computed.
import { fmt, mcq, numOpts, others, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const gbp = (v: number) => `£${v.toLocaleString("en-GB", { minimumFractionDigits: v % 1 ? 2 : 0, maximumFractionDigits: 2 })}`;
const gbpOpts = (c: number, p: number[]) => numOpts(c, p).map((v) => gbp(Number(v.replace(/,/g, ""))));

// ---------------------------------------------------------------------------
const ATTACKS: [string, string][] = [
  ["Phishing", "fraudulent emails that trick people into revealing credentials or clicking malicious links"],
  ["Spear phishing", "a targeted phishing attack aimed at a specific person or organisation"],
  ["Vishing", "social engineering carried out over voice calls"],
  ["Smishing", "phishing delivered by SMS text message"],
  ["Ransomware", "malware that encrypts data and demands payment"],
  ["A trojan", "malware disguised as legitimate software"],
  ["A worm", "malware that spreads by itself across networks without user action"],
  ["A DDoS attack", "flooding a service with traffic from many machines to make it unavailable"],
  ["SQL injection", "inserting malicious database commands into an application's input fields"],
  ["Cross-site scripting (XSS)", "injecting malicious scripts into web pages viewed by other users"],
  ["An on-path (man-in-the-middle) attack", "secretly intercepting and possibly altering communications between two parties"],
  ["Credential stuffing", "using username/password pairs leaked from one site to log in to others"],
  ["A brute-force attack", "trying every possible password until one works"],
  ["Pretexting", "inventing a believable scenario to persuade someone to give up information"],
];
const SEC_FACTS: F[] = [
  ["Principles", "What does the CIA triad stand for?", "Confidentiality, integrity, availability", ["Control, identity, access", "Cybersecurity, investigation, audit", "Confidentiality, identity, authentication"], "The three core goals of information security."],
  ["Principles", "A hospital system goes offline during a cyber attack. Which CIA principle is affected?", "Availability", ["Confidentiality", "Integrity", "Non-repudiation"], "Authorised users can't access the system."],
  ["Principles", "An attacker secretly changes bank account numbers in invoices. Which principle is violated?", "Integrity", ["Availability", "Confidentiality", "Authentication"], "Data has been altered without authorisation."],
  ["Principles", "Customer records are leaked online. Which principle is violated?", "Confidentiality", ["Integrity", "Availability", "Accountability"], "Data was disclosed to unauthorised people."],
  ["Principles", "Defence in depth means", "using several layers of security controls", ["relying on one strong firewall", "hiding systems from attackers", "encrypting only backups"], "If one control fails, others still protect."],
  ["Principles", "Which principle ensures someone cannot deny having sent a message?", "Non-repudiation", ["Availability", "Obfuscation", "Least privilege"], "Digital signatures provide non-repudiation."],
  ["Cryptography", "Which type of encryption uses the same key to encrypt and decrypt?", "Symmetric", ["Asymmetric", "Hashing", "Steganography"], "AES is a common symmetric algorithm."],
  ["Cryptography", "In asymmetric encryption, which key do you use to encrypt a message for someone else?", "Their public key", ["Their private key", "Your private key", "A shared password"], "Only their private key can decrypt it."],
  ["Cryptography", "What is hashing mainly used for?", "Verifying integrity — a one-way fingerprint of data", ["Encrypting data so it can be decrypted later", "Compressing files", "Hiding IP addresses"], "Hashes can't be reversed; SHA-256 is common."],
  ["Cryptography", "Adding random data to a password before hashing it is called", "salting", ["peppering only", "encoding", "tokenising"], "Salts defeat precomputed rainbow-table attacks."],
  ["Cryptography", "Which protocol secures web traffic in HTTPS?", "TLS", ["SSH", "FTP", "SNMP"], "TLS replaced the older SSL."],
  ["Identity", "Which is an example of 'something you have'?", "A security key or authenticator app", ["A password", "A fingerprint", "Your date of birth"], "Possession factor."],
  ["Identity", "Which is an example of 'something you are'?", "A fingerprint", ["A PIN", "A smart card", "A one-time code"], "Biometrics are inherence factors."],
  ["Identity", "Role-based access control (RBAC) grants permissions based on", "a user's job role", ["the time of day only", "the file owner's choice", "security labels like Top Secret"], "Mandatory access control uses labels; discretionary access lets owners decide."],
  ["Identity", "Regularly checking that users still need their access is called", "an access review (recertification)", ["a penetration test", "a vulnerability scan", "hardening"], "It removes privilege creep."],
  ["Network defence", "Which device or software filters traffic based on rules?", "A firewall", ["A hub", "A load balancer only", "A proxy cache only"], "Rules allow or deny traffic by address, port and protocol."],
  ["Network defence", "Placing public web servers in a separate network zone from internal systems is called", "a DMZ (screened subnet)", ["a VPN", "a honeypot", "a VLAN trunk"], "It limits damage if the web server is compromised."],
  ["Network defence", "What does an IDS do?", "Detects and alerts on suspicious activity", ["Blocks all traffic automatically", "Encrypts disks", "Assigns IP addresses"], "An IPS can also block traffic."],
  ["Network defence", "A decoy system designed to attract and study attackers is a", "honeypot", ["sandbox", "jump box", "proxy"], "It distracts attackers and gathers intelligence."],
  ["Network defence", "Network segmentation helps security by", "limiting how far an attacker can move inside the network", ["making Wi-Fi faster", "removing the need for passwords", "replacing backups"], "It contains breaches."],
  ["Risk", "Accepting a risk means", "acknowledging it and choosing not to act because the cost outweighs the benefit", ["buying insurance", "removing the risky activity", "adding a firewall"], "Transfer = insurance; avoid = stop the activity; mitigate = add controls."],
  ["Risk", "Buying cyber insurance is an example of risk", "transference", ["avoidance", "acceptance", "mitigation"], "Some financial impact is shifted to the insurer."],
  ["Risk", "A security policy, staff training and background checks are examples of which control type?", "Administrative (managerial) controls", ["Technical controls", "Physical controls", "Compensating controls only"], "Technical = firewalls, encryption; physical = locks, guards."],
  ["Risk", "A CCTV camera that records an intruder is mainly which kind of control?", "Detective", ["Preventive", "Corrective", "Deterrent only"], "It detects and records events."],
  ["Risk", "Which UK law governs how personal data must be protected?", "UK GDPR and the Data Protection Act 2018", ["The Computer Misuse Act only", "The Companies Act", "The Equality Act"], "The Computer Misuse Act covers unauthorised access."],
  ["Incident response", "What is the first phase of the incident response lifecycle?", "Preparation", ["Containment", "Eradication", "Lessons learned"], "Plans, tools and training come before any incident."],
  ["Incident response", "Isolating an infected laptop from the network is part of", "containment", ["preparation", "lessons learned", "identification only"], "It stops the incident spreading."],
  ["Incident response", "Removing malware and closing the vulnerability it used is", "eradication", ["containment", "preparation", "recovery"], "Then systems are restored in recovery."],
  ["Incident response", "Why must evidence follow a chain of custody?", "To prove it hasn't been tampered with", ["To speed up recovery", "To reduce storage costs", "To encrypt it"], "It records who handled evidence and when."],
  ["Incident response", "A SIEM system mainly", "collects and correlates logs to detect security events", ["blocks phishing emails only", "replaces antivirus", "stores passwords"], "Security information and event management."],
  ["Vulnerabilities", "A zero-day vulnerability is", "a flaw unknown to the vendor with no patch available", ["a bug fixed on day zero", "a weak password", "a misconfigured printer"], "Attackers can exploit it before a fix exists."],
  ["Vulnerabilities", "What is the main purpose of patch management?", "Fixing known vulnerabilities promptly", ["Making backups", "Monitoring staff", "Encrypting email"], "Many breaches exploit unpatched systems."],
  ["Vulnerabilities", "An authorised simulated attack to find weaknesses is a", "penetration test", ["vulnerability scan only", "risk register", "business continuity plan"], "Scans list weaknesses; pen tests try to exploit them."],
];

function security(): Q[] {
  const qs = [
    ...facts("SECQ", SEC_FACTS),
    ...ATTACKS.map((x) => mcq("SECQ", "Threats", `Which attack involves ${x[1]}?`, x[0], others(ATTACKS, x, (y) => y[0]), `${x[0]}: ${x[1]}.`, 2)),
  ];
  qs.push(...repeat(10, () => {
    const av = ri(2, 50) * 1000, ef = pick([10, 20, 25, 40, 50, 100]), aro = pick([0.1, 0.2, 0.25, 0.5, 1, 2]);
    const sle = (av * ef) / 100, ale = sle * aro;
    return mcq("SECQ", "Risk", `A server worth £${av.toLocaleString("en-GB")} would lose ${ef}% of its value in an incident expected ${aro} time(s) per year. What is the annualised loss expectancy (ALE)?`, gbp(ale), gbpOpts(ale, [sle, av * aro, ale * 2]),
      `SLE = asset value × exposure factor = ${gbp(sle)}. ALE = SLE × ARO = ${gbp(sle)} × ${aro} = ${gbp(ale)}.`, 3);
  }));
  qs.push(...repeat(6, () => {
    const len = pick([4, 6, 8]), chars = pick([10, 26, 36]);
    const combos = chars ** len;
    return mcq("SECQ", "Identity", `How many possible combinations are there for a ${len}-character code using ${chars} possible characters?`, `${chars}^${len} (${combos.toLocaleString("en-GB")})`, [`${len}^${chars}`, `${chars} × ${len} (${chars * len})`, `${chars + len}^2`], `Each position has ${chars} options: ${chars}^${len}. Longer passwords grow the search space exponentially.`, 2);
  }));
  return qs;
}

// ---------------------------------------------------------------------------
const XL: [string, string][] = [
  ["XLOOKUP", "finding a value in one range and returning the matching value from another"], ["SUMIFS", "adding values that meet several conditions"],
  ["COUNTIF", "counting cells that meet one condition"], ["IF", "returning one value if a test is true and another if it is false"],
  ["CONCAT (or &)", "joining text from several cells"], ["TRIM", "removing extra spaces from text"], ["AVERAGEIF", "averaging values that meet a condition"],
  ["IFERROR", "showing a chosen value instead of an error"], ["UNIQUE", "returning the distinct values in a range"], ["ROUND", "rounding a number to a set number of digits"],
];
const DAT_FACTS: F[] = [
  ["SQL", "Which SQL clause filters rows BEFORE grouping?", "WHERE", ["HAVING", "ORDER BY", "GROUP BY"], "HAVING filters groups after aggregation."],
  ["SQL", "Which SQL clause filters groups AFTER aggregation?", "HAVING", ["WHERE", "SELECT", "FROM"], "e.g. HAVING COUNT(*) > 5."],
  ["SQL", "Which join returns only rows with matching keys in both tables?", "INNER JOIN", ["LEFT JOIN", "FULL OUTER JOIN", "CROSS JOIN"], "LEFT JOIN keeps all rows from the left table."],
  ["SQL", "Which join keeps every row from the first table, even without a match?", "LEFT JOIN", ["INNER JOIN", "RIGHT JOIN only", "SELF JOIN"], "Unmatched columns from the right table are NULL."],
  ["SQL", "Which keyword removes duplicate rows from a result?", "DISTINCT", ["UNIQUE ROWS", "GROUP", "LIMIT"], "SELECT DISTINCT city FROM customers."],
  ["SQL", "In what order are these clauses written in a SELECT statement?", "SELECT, FROM, WHERE, GROUP BY, HAVING, ORDER BY", ["FROM, SELECT, WHERE, ORDER BY, GROUP BY", "SELECT, WHERE, FROM, HAVING, GROUP BY", "SELECT, GROUP BY, FROM, WHERE, ORDER BY"], "This is the written order (not the logical processing order)."],
  ["SQL", "Which function counts the rows in each group?", "COUNT(*)", ["SUM(*)", "TOTAL()", "LEN()"], "COUNT(column) ignores NULLs; COUNT(*) counts every row."],
  ["SQL", "How do you test for missing values in SQL?", "WHERE column IS NULL", ["WHERE column = NULL", "WHERE column == ''", "WHERE NULL(column)"], "Comparing with = NULL never returns true."],
  ["Data quality", "Two records for the same customer with slightly different spellings are a problem of", "duplication / consistency", ["timeliness", "validity only", "availability"], "Deduplication and standardisation fix it."],
  ["Data quality", "A date of birth in the future is a problem of", "validity", ["completeness", "timeliness", "uniqueness"], "The value breaks a business rule."],
  ["Data quality", "Which data type is best for a postcode such as SW1A 1AA?", "Text", ["Whole number", "Decimal", "Date"], "Codes with letters or leading zeros should be text."],
  ["Power BI", "In a star schema, the central table holding measurable events such as sales is the", "fact table", ["dimension table", "bridge table", "lookup only"], "Dimension tables describe the facts: date, product, customer."],
  ["Power BI", "Which Power BI tool is used to clean and shape data before loading?", "Power Query", ["DAX", "Power BI Service only", "Q&A visual"], "It records each transformation as a step."],
  ["Power BI", "Which DAX function changes the filter context of a calculation?", "CALCULATE", ["SUM", "RELATED", "FORMAT"], "e.g. CALCULATE([Sales], Region = \"North\")."],
  ["Power BI", "What is the main difference between a measure and a calculated column?", "Measures calculate at query time; calculated columns are stored row by row", ["There is no difference", "Columns are faster to change", "Measures can't use DAX"], "Use measures for aggregations like totals."],
  ["Power BI", "Which relationship cardinality is typical between a dimension and a fact table?", "One-to-many", ["Many-to-many", "One-to-one", "None"], "One product appears in many sales rows."],
  ["Power BI", "Row-level security (RLS) in Power BI is used to", "restrict which data rows each user can see", ["speed up refresh", "change visuals' colours", "delete old data"], "e.g. regional managers see only their region."],
  ["Visualisation", "Which chart is best for showing a trend over time?", "Line chart", ["Pie chart", "Scatter plot only", "Table"], "Time on the x-axis shows change clearly."],
  ["Visualisation", "Which chart best shows the relationship between two numeric variables?", "Scatter plot", ["Pie chart", "Bar chart", "Card"], "Each point is one observation."],
  ["Visualisation", "When should a pie chart generally be avoided?", "When comparing many categories or close values", ["When showing two categories", "When values add to 100%", "Never"], "Bar charts are easier to compare."],
  ["Statistics", "Which measure of average is least affected by extreme outliers?", "Median", ["Mean", "Range", "Sum"], "The median is the middle value."],
  ["Governance", "Removing names so individuals can't be identified is called", "anonymisation", ["normalisation", "aggregation", "indexing"], "Pseudonymisation replaces identifiers but can be reversed with a key."],
];

function data(): Q[] {
  const qs = [
    ...facts("DAQ", DAT_FACTS),
    ...XL.map((x) => mcq("DAQ", "Excel", `Which Excel function is used for ${x[1]}?`, x[0], others(XL, x, (y) => y[0]), `${x[0]}: ${x[1]}.`, 1)),
  ];
  const REGIONS = ["North", "South", "East", "West"];
  qs.push(...repeat(12, () => {
    const rows = [...Array(6)].map(() => [pick(REGIONS), ri(1, 9) * 10] as [string, number]);
    const reg = pick(rows)[0];
    const sum = rows.filter((r) => r[0] === reg).reduce((s, r) => s + r[1], 0);
    const cnt = rows.filter((r) => r[0] === reg).length;
    const ask = pick(["SUM", "COUNT"] as const);
    const ans = ask === "SUM" ? sum : cnt;
    return mcq("DAQ", "SQL", `A table sales(region, amount) contains: ${rows.map((r) => `(${r[0]}, ${r[1]})`).join(", ")}.\n\nWhat does this query return for ${reg}?\nSELECT region, ${ask}(${ask === "SUM" ? "amount" : "*"}) FROM sales GROUP BY region;`, String(ans),
      numOpts(ans, [ask === "SUM" ? cnt : sum, rows.reduce((s, r) => s + r[1], 0), ans + 10, 6]), `Rows for ${reg}: ${rows.filter((r) => r[0] === reg).map((r) => r[1]).join(", ")} → ${ask} = ${ans}.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const a = ri(20, 200) * 10, pct = pick([-25, -20, -10, 5, 10, 12, 15, 20, 25, 40, 50]);
    const b = Math.round(a * (1 + pct / 100));
    return mcq("DAQ", "Statistics", `Monthly sales went from ${a.toLocaleString("en-GB")} to ${b.toLocaleString("en-GB")}. What is the percentage change?`, `${pct > 0 ? "+" : ""}${pct}%`, [`${pct > 0 ? "−" : "+"}${Math.abs(pct)}%`, `${pct > 0 ? "+" : ""}${Math.round(((b - a) / b) * 100)}%`, `${pct > 0 ? "+" : ""}${pct * 2}%`], `(${b} − ${a}) ÷ ${a} × 100 = ${pct}%.`, 1);
  }));
  qs.push(...repeat(10, () => {
    const xs = [...Array(ri(5, 8))].map(() => ri(5, 60));
    const s = [...xs].sort((a, b) => a - b);
    const med = s.length % 2 ? s[(s.length - 1) / 2] : (s[s.length / 2 - 1] + s[s.length / 2]) / 2;
    const mean = Math.round((xs.reduce((a, b) => a + b, 0) / xs.length) * 10) / 10;
    return mcq("DAQ", "Statistics", `Delivery times (minutes) were ${xs.join(", ")}. What is the median?`, fmt(med), numOpts(med, [mean, s[s.length - 1] - s[0], med + 2]), `Sorted: ${s.join(", ")}. Median = ${fmt(med)} (the mean is ${fmt(mean)}).`, 1);
  }));
  qs.push(...repeat(8, () => {
    const total = ri(100, 900), part = ri(10, total - 10);
    const pct = Math.round((part / total) * 1000) / 10;
    return mcq("DAQ", "Excel", `Cell B2 holds ${part} and B10 holds the total ${total}. What does =B2/B10 show when formatted as a percentage with one decimal place?`, `${fmt(pct)}%`, numOpts(pct, [Math.round((total / part) * 10) / 10, pct * 10, pct + 1]).map((v) => `${v}%`), `${part} ÷ ${total} = ${fmt(pct / 100)} → ${fmt(pct)}%.`, 1);
  }));
  return qs;
}

// ---------------------------------------------------------------------------
const AI_TERMS: [string, string][] = [
  ["Machine learning", "systems that learn patterns from data instead of being explicitly programmed"],
  ["Supervised learning", "training a model on labelled examples with known answers"],
  ["Unsupervised learning", "finding patterns or groups in unlabelled data"],
  ["A large language model (LLM)", "a model trained on huge amounts of text to predict and generate language"],
  ["A token", "a chunk of text (a word or part of a word) that a language model processes"],
  ["A hallucination", "a confident but false or made-up output from an AI model"],
  ["Retrieval-augmented generation (RAG)", "giving a model relevant documents at answer time so it can ground its response"],
  ["Few-shot prompting", "including a few worked examples in the prompt to show the desired output"],
  ["A context window", "the maximum amount of text a model can consider at once"],
  ["Fine-tuning", "further training a pre-trained model on a specific dataset"],
  ["Human-in-the-loop", "a person reviewing or approving AI outputs before they take effect"],
  ["Model drift", "a model's performance degrading as real-world data changes over time"],
];
const AI_FACTS: F[] = [
  ["Prompting", "Which prompt is most likely to get a useful, specific answer?", "'Summarise this 3-page report in five bullet points for a busy manager, highlighting risks.'", ["'Summarise.'", "'Tell me about reports.'", "'Make this better.'"], "Clear task, format, audience and focus."],
  ["Prompting", "Asking an AI to 'act as an experienced HR adviser' is an example of", "giving the model a role", ["fine-tuning", "RAG", "tokenisation"], "Roles help set tone and perspective."],
  ["Prompting", "If an AI answer is too long, the best next step is to", "ask again with a word or format limit", ["give up on AI", "copy it unchanged", "change the topic"], "Iterate on the prompt with clear constraints."],
  ["Prompting", "Breaking a complex task into smaller steps for the AI usually", "improves accuracy and control", ["confuses the model", "is never allowed", "removes the need to check output"], "Step-by-step tasks are easier to verify."],
  ["Verification", "An AI tool cites a statistic for a report. What should you do?", "Check it against the original, reliable source", ["Use it — AI is always right", "Round it up", "Remove the citation"], "AI can hallucinate facts and sources."],
  ["Verification", "Which output is MOST important to have a human check before use?", "Legal or medical advice sent to a customer", ["A list of brainstorm ideas", "A draft subject line", "A joke for a team chat"], "High-stakes outputs need expert review."],
  ["Responsible use", "Pasting a customer's personal data into a public AI chatbot without approval may breach", "data protection rules and company policy", ["copyright law only", "nothing — it's always fine", "health and safety law"], "Use approved tools and minimise personal data."],
  ["Responsible use", "AI bias most often comes from", "biased or unrepresentative training data", ["the colour of the interface", "slow internet", "using short prompts"], "Models learn patterns, including unfair ones, from data."],
  ["Responsible use", "Being open that content was created with AI help is an example of", "transparency", ["obfuscation", "automation", "tokenisation"], "Many organisations require disclosure."],
  ["Responsible use", "The NIST AI Risk Management Framework's core functions are", "Govern, Map, Measure, Manage", ["Plan, Do, Check, Act", "Identify, Protect, Detect, Respond", "Collect, Clean, Model, Deploy"], "Govern is the cross-cutting function."],
  ["Automation", "In a workflow tool, 'when a new form is submitted' is the", "trigger", ["action", "filter", "output"], "Triggers start automations; actions are the steps that follow."],
  ["Automation", "Which task is usually the BEST first candidate for automation?", "A frequent, rule-based, repetitive task", ["A rare, sensitive judgement call", "A task nobody understands", "A one-off creative project"], "High volume + clear rules = good ROI."],
  ["Automation", "Why add a human approval step before an automated email goes to customers?", "To catch errors before they reach customers", ["To slow the process down deliberately", "Because automation can't send emails", "To avoid storing data"], "Human review limits the impact of mistakes."],
  ["Fundamentals", "Generative AI differs from traditional predictive AI because it", "creates new content such as text or images", ["only sorts data into categories", "never uses data", "cannot run on computers"], "Predictive models output labels or numbers."],
  ["Fundamentals", "A higher 'temperature' setting in a language model generally makes output", "more varied and creative", ["more factual", "shorter", "identical every time"], "Lower temperature gives more predictable output."],
];

function ai(): Q[] {
  const qs = [
    ...facts("AIQ", AI_FACTS),
    ...AI_TERMS.map((x) => mcq("AIQ", "Fundamentals", `What term describes ${x[1]}?`, x[0], others(AI_TERMS, x, (y) => y[0]), `${x[0]}: ${x[1]}.`, 2)),
    ...AI_TERMS.map((x) => mcq("AIQ", "Fundamentals", `${x[0]} is best described as`, x[1], others(AI_TERMS, x, (y) => y[1]), `${x[0]}: ${x[1]}.`, 1)),
  ];
  qs.push(...repeat(10, () => {
    const mins = pick([5, 10, 12, 15, 20, 30]), per = pick([10, 20, 25, 40, 50]), days = pick([20, 22]);
    const hrs = (mins * per * days) / 60;
    if (!Number.isInteger(hrs * 10)) return null;
    return mcq("AIQ", "Productivity", `An automation saves ${mins} minutes on a task done ${per} times a day. Over ${days} working days, how many hours are saved?`, `${fmt(hrs)} hours`, numOpts(hrs, [mins * per * days, (mins * per) / 60, hrs * 2], "hours"), `${mins} × ${per} × ${days} = ${mins * per * days} minutes ÷ 60 = ${fmt(hrs)} hours.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const cost = ri(2, 20) * 100, saving = ri(2, 10) * 50;
    const months = Math.ceil(cost / saving);
    return mcq("AIQ", "Productivity", `An AI tool costs £${cost} to set up and saves £${saving} a month. After how many whole months has it paid for itself?`, `${months} months`, numOpts(months, [months + 1, Math.floor(cost / saving) || months + 2, months * 2], "months"), `£${cost} ÷ £${saving} = ${fmt(cost / saving)}, so it pays back in month ${months}.`, 2);
  }));
  return qs;
}

// ---------------------------------------------------------------------------
const CDM: [string, string][] = [
  ["Client", "arranges the project, appoints the duty holders and makes sure enough time and resources are allowed"],
  ["Principal designer", "plans, manages and coordinates health and safety in the pre-construction phase"],
  ["Principal contractor", "plans, manages and coordinates health and safety during the construction phase"],
  ["Designer", "eliminates, reduces or controls foreseeable risks through their design"],
  ["Contractor", "plans, manages and monitors their own work and workers"],
];
const CON_FACTS: F[] = [
  ["CDM 2015", "Under CDM 2015, a construction project must be notified to HSE (F10) when it will last more than 30 working days with more than 20 workers at any one time, or", "exceed 500 person-days", ["exceed 100 person-days", "cost over £1 million", "use a crane"], "These thresholds are set out in CDM 2015."],
  ["CDM 2015", "When is a principal contractor required under CDM 2015?", "When more than one contractor will work on the project", ["Only on projects over £5 million", "Never on domestic jobs", "Only when notified to HSE"], "The same rule applies to the principal designer."],
  ["CDM 2015", "Which document sets out how health and safety will be managed during construction?", "The construction phase plan", ["The health and safety file", "The F10 form", "The snagging list"], "The principal contractor (or contractor) prepares it."],
  ["CDM 2015", "Which document is handed to the client at the end with information for future work on the building?", "The health and safety file", ["The construction phase plan", "The risk register only", "The tender pack"], "It helps people who maintain, alter or demolish the building later."],
  ["Safety", "What is the most effective level in the hierarchy of control?", "Elimination", ["PPE", "Administrative controls", "Engineering controls"], "PPE is the last resort."],
  ["Safety", "What is a permit to work used for?", "Controlling high-risk work such as hot work or confined spaces", ["Recording staff holidays", "Ordering materials", "Logging deliveries"], "It sets out precautions and who has authorised the work."],
  ["Safety", "A short safety briefing given to workers on site about a specific topic is a", "toolbox talk", ["site induction only", "method statement", "permit"], "Usually 10–15 minutes."],
  ["Safety", "What do RAMS stand for?", "Risk assessments and method statements", ["Rules and maintenance schedules", "Records of accidents and medical support", "Roles and management standards"], "They explain hazards and how the work will be done safely."],
  ["Safety", "Under RIDDOR, an injury that keeps a worker off normal duties for more than seven days must be reported within", "15 days of the accident", ["24 hours", "6 months", "1 year"], "Specified injuries and dangerous occurrences have stricter timescales."],
  ["Safety", "Under the Work at Height Regulations, what should be considered FIRST?", "Avoiding work at height where possible", ["Providing harnesses", "Using ladders", "Putting up warning signs"], "Then prevent falls, then minimise consequences."],
  ["Safety", "How often must a scaffold be inspected while in use?", "At least every 7 days, and after anything that could affect its stability", ["Once a month", "Only when first erected", "Every 90 days"], "Inspections must be recorded."],
  ["Safety", "What is the correct angle for a leaning ladder?", "About 75° — 1 unit out for every 4 units up", ["45°", "90° (vertical)", "60°"], "The 1-in-4 rule."],
  ["Safety", "Which regulations cover the safe use of lifting equipment such as cranes and hoists?", "LOLER", ["COSHH", "RIDDOR", "PUWER only"], "Lifting Operations and Lifting Equipment Regulations 1998."],
  ["Safety", "Under LOLER, equipment used to lift people must have a thorough examination at least every", "6 months", ["12 months", "5 years", "week"], "Other lifting equipment: at least every 12 months, unless a written scheme says otherwise."],
  ["Safety", "Which regulations cover hazardous substances such as cement dust and solvents?", "COSHH", ["LOLER", "RIDDOR", "CDM only"], "Control of Substances Hazardous to Health."],
  ["Safety", "Before refurbishing a building built before 2000, what must be checked?", "Whether asbestos is present (asbestos survey)", ["The paint colour", "Parking availability", "The broadband speed"], "Asbestos was widely used until it was banned in 1999."],
  ["Site management", "A list of minor defects to fix before handover is a", "snagging list", ["method statement", "variation order", "bill of quantities"], "Snags are checked at practical completion."],
  ["Site management", "A formal instruction to change the agreed scope of work is a", "variation (change order)", ["snag", "permit to work", "toolbox talk"], "It can affect cost and programme."],
  ["Site management", "On a programme, the sequence of tasks that determines the earliest completion date is the", "critical path", ["float", "baseline", "milestone"], "Delays on it delay the whole project."],
  ["Site management", "Which card scheme shows that construction workers have the right training and qualifications?", "CSCS", ["DBS", "NVQ only", "CITB levy"], "Construction Skills Certification Scheme."],
  ["Quality", "An inspection and test plan (ITP) is used to", "define when and how work will be checked for quality", ["track holidays", "pay subcontractors", "order PPE"], "It sets hold points and witness points."],
];

function construction(): Q[] {
  const qs = [
    ...facts("CONQ", CON_FACTS),
    ...CDM.map((x) => mcq("CONQ", "CDM 2015", `Under CDM 2015, which duty holder ${x[1]}?`, x[0], others(CDM, x, (y) => y[0]), `${x[0]}: ${x[1]}.`, 2)),
  ];
  qs.push(...repeat(10, () => {
    const h = pick([4, 6, 8, 10, 12]);
    return mcq("CONQ", "Safety", `A ladder must reach ${h} m up a wall. Using the 1-in-4 rule, how far should its base be from the wall?`, `${fmt(h / 4)} m`, numOpts(h / 4, [h / 2, h / 3, h], "m"), `1 out for every 4 up: ${h} ÷ 4 = ${fmt(h / 4)} m.`, 1);
  }));
  qs.push(...repeat(12, () => {
    const l = ri(3, 15), w = ri(2, 8), d = pick([0.1, 0.15, 0.2, 0.25, 0.3]);
    const v = Math.round(l * w * d * 1000) / 1000;
    return mcq("CONQ", "Quantities", `How much concrete is needed for a slab ${l} m long, ${w} m wide and ${d * 1000} mm thick?`, `${fmt(v)} m³`, numOpts(v, [l * w * d * 10, l * w, v * 2], "m³"), `Volume = ${l} × ${w} × ${d} = ${fmt(v)} m³ (convert mm to m first).`, 2);
  }));
  qs.push(...repeat(10, () => {
    const a = ri(2, 6), b = ri(3, 8), c = ri(2, 9), d = ri(1, 4);
    const p1 = a + b + d, p2 = a + c + d;
    if (p1 === p2) return null;
    return mcq("CONQ", "Site management", `Groundworks (${a} days) must finish before both brickwork (${b} days) and drainage (${c} days), which run in parallel. Roofing (${d} days) starts when both are done. What is the shortest overall duration?`, `${Math.max(p1, p2)} days`, numOpts(Math.max(p1, p2), [a + b + c + d, Math.min(p1, p2), a + d], "days"), `Critical path = ${a} + max(${b}, ${c}) + ${d} = ${Math.max(p1, p2)} days.`, 3);
  }));
  qs.push(...repeat(8, () => {
    const area = ri(8, 60), per = pick([60, 50]), waste = pick([5, 10]);
    const n = Math.ceil(area * per * (1 + waste / 100));
    return mcq("CONQ", "Quantities", `A wall is ${area} m². Allowing ${per} bricks per m² plus ${waste}% waste, how many bricks should be ordered?`, fmt(n), numOpts(n, [area * per, Math.ceil(area * per * 0.9), n + per]), `${area} × ${per} = ${area * per}; + ${waste}% = ${n}.`, 2);
  }));
  return qs;
}

// ---------------------------------------------------------------------------
const DEADCLIC: [string, string][] = [
  ["An increase in an expense", "Debit"], ["An increase in an asset", "Debit"], ["An increase in drawings", "Debit"],
  ["An increase in a liability", "Credit"], ["An increase in income (sales)", "Credit"], ["An increase in capital", "Credit"],
  ["A decrease in an asset", "Credit"], ["A decrease in a liability", "Debit"],
];
const BK_FACTS: F[] = [
  ["Double entry", "What is the accounting equation?", "Assets = liabilities + capital", ["Assets = income − expenses", "Capital = assets + liabilities", "Profit = assets − capital"], "It always balances."],
  ["Double entry", "A business buys stock on credit. Which accounts are affected?", "Debit purchases, credit trade payables", ["Debit bank, credit sales", "Debit trade payables, credit purchases", "Debit sales, credit bank"], "Stock bought on credit increases expenses (purchases) and a liability."],
  ["Double entry", "A customer pays an outstanding invoice. Which entry is correct?", "Debit bank, credit trade receivables", ["Debit trade receivables, credit bank", "Debit sales, credit bank", "Debit bank, credit sales"], "Cash in increases; the amount owed decreases."],
  ["Double entry", "The owner takes £200 cash for personal use. Which account is debited?", "Drawings", ["Capital", "Wages", "Sales"], "Drawings reduce the owner's capital."],
  ["Double entry", "What does a trial balance check?", "That total debits equal total credits", ["That the business made a profit", "That all invoices were paid", "That VAT is correct"], "It won't find errors that don't affect the balance, e.g. omissions."],
  ["Double entry", "Which error would NOT be revealed by a trial balance?", "A transaction left out completely", ["A debit entered without a credit", "Different amounts on each side", "An addition error in one ledger"], "Omissions keep debits and credits equal."],
  ["Documents", "Which document asks a customer to pay for goods supplied?", "Sales invoice", ["Credit note", "Purchase order", "Remittance advice"], "A credit note reduces an amount owed."],
  ["Documents", "Which document reduces the amount a customer owes, e.g. after a return?", "Credit note", ["Invoice", "Statement", "Delivery note"], "It reverses all or part of an invoice."],
  ["Documents", "A customer sends a document with their payment showing which invoices it covers. This is a", "remittance advice", ["purchase order", "credit note", "quotation"], "It helps match payments to invoices."],
  ["Reconciliation", "Why do a bank reconciliation?", "To explain differences between the cash book and the bank statement", ["To calculate VAT", "To pay suppliers", "To set budgets"], "Timing differences and errors are identified."],
  ["Reconciliation", "A cheque sent to a supplier but not yet cleared by the bank is an", "unpresented cheque", ["outstanding lodgement", "dishonoured cheque", "direct debit"], "It's in the cash book but not yet on the statement."],
  ["Reconciliation", "Bank charges on the statement but not in the cash book should be", "entered in the cash book", ["ignored", "added to sales", "sent to the customer"], "Update the cash book for items only the bank knows about."],
  ["Adjustments", "Rent paid in advance for next year is a", "prepayment (an asset)", ["accrual (a liability)", "drawing", "sale"], "It relates to a future period."],
  ["Adjustments", "An electricity bill for this year that hasn't been received yet is an", "accrual (a liability)", ["prepayment", "asset", "drawing"], "The expense belongs to this period."],
  ["Payroll", "In the UK, how does an employer report pay and deductions to HMRC each time employees are paid?", "Real Time Information (RTI) via a Full Payment Submission", ["An annual letter", "A VAT return", "A P11D only"], "PAYE reporting happens on or before each payday."],
  ["Payroll", "Which form summarises an employee's pay and tax for the whole tax year?", "P60", ["P45", "P11D", "P32"], "A P45 is given when an employee leaves."],
  ["Payroll", "Which form does an employee receive when they leave a job?", "P45", ["P60", "P11D", "SA100"], "It shows pay and tax to date."],
  ["Payroll", "What is the UK statutory minimum paid holiday for a full-time worker?", "5.6 weeks a year", ["4 weeks a year", "20 days including bank holidays only", "6 weeks a year"], "That's 28 days for someone working five days a week (bank holidays can count towards it)."],
  ["Payroll", "Under automatic enrolment, who must contribute to a workplace pension?", "Both the employer and the eligible employee (unless they opt out)", ["Only the employee", "Only the employer", "Only HMRC"], "Minimum contributions are set by law."],
  ["VAT", "What is the standard rate of VAT in the UK?", "20%", ["5%", "15%", "17.5%"], "Reduced rate is 5%; some items are zero-rated."],
  ["Controls", "Making sure the person who approves invoices is not the person who pays them is called", "segregation of duties", ["reconciliation", "depreciation", "accrual"], "It reduces the risk of fraud and error."],
];

function bookkeeping(): Q[] {
  const qs = [
    ...facts("BKQ", BK_FACTS),
    ...DEADCLIC.map(([what, side]) => mcq("BKQ", "Double entry", `${what} is recorded as a`, side, [side === "Debit" ? "Credit" : "Debit", "Neither — it isn't recorded", "Both debit and credit in the same account"], `DEAD CLIC: Debits increase Expenses, Assets, Drawings; Credits increase Liabilities, Income, Capital. ${what} → ${side}.`, 1)),
  ];
  qs.push(...repeat(12, () => {
    const net = ri(5, 400) * 5;
    return Math.random() < 0.5
      ? mcq("BKQ", "VAT", `An item costs ${gbp(net)} before VAT. What is the price including VAT at 20%?`, gbp(net * 1.2), gbpOpts(net * 1.2, [net * 0.2, net * 1.02, net / 0.8]), `${gbp(net)} × 1.2 = ${gbp(net * 1.2)}.`, 1)
      : mcq("BKQ", "VAT", `An invoice totals ${gbp(net * 1.2)} including VAT at 20%. How much of that is VAT?`, gbp(net * 0.2), gbpOpts(net * 0.2, [net * 1.2 * 0.2, net, net * 0.25]), `VAT = gross ÷ 6 (or gross × 20/120) = ${gbp(net * 0.2)}.`, 2);
  }));
  qs.push(...repeat(10, () => {
    const assets = ri(20, 200) * 1000, liab = ri(5, 100) * 1000;
    if (liab >= assets) return null;
    return mcq("BKQ", "Double entry", `A business has assets of ${gbp(assets)} and liabilities of ${gbp(liab)}. What is its capital?`, gbp(assets - liab), gbpOpts(assets - liab, [assets + liab, liab, assets]), `Capital = assets − liabilities = ${gbp(assets - liab)}.`, 1);
  }));
  qs.push(...repeat(10, () => {
    const cost = ri(5, 60) * 1000, resid = ri(0, 5) * 500, yrs = pick([3, 4, 5, 8, 10]);
    const dep = (cost - resid) / yrs;
    if (!Number.isInteger(dep)) return null;
    return mcq("BKQ", "Adjustments", `A van costs ${gbp(cost)}, will be used for ${yrs} years and has a residual value of ${gbp(resid)}. What is the annual straight-line depreciation?`, gbp(dep), gbpOpts(dep, [cost / yrs, (cost + resid) / yrs, dep * 2]), `(${gbp(cost)} − ${gbp(resid)}) ÷ ${yrs} = ${gbp(dep)} a year.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const cost = ri(4, 40) * 1000, rate = pick([20, 25, 30]);
    const y2 = cost * (1 - rate / 100) * (rate / 100);
    return mcq("BKQ", "Adjustments", `Equipment costing ${gbp(cost)} is depreciated at ${rate}% a year using the reducing balance method. What is the depreciation charge in year 2?`, gbp(y2), gbpOpts(y2, [cost * rate / 100, cost * (1 - rate / 100), y2 * 2]), `Year 1: ${gbp(cost * rate / 100)}, leaving ${gbp(cost * (1 - rate / 100))}. Year 2: ${rate}% of that = ${gbp(y2)}.`, 3);
  }));
  qs.push(...repeat(12, () => {
    const rate = pick([12, 12.5, 13, 14, 15, 16, 18]), hrs = ri(30, 40), ot = ri(2, 8), mult = pick([1.5, 2]);
    const gross = hrs * rate + ot * rate * mult;
    return mcq("BKQ", "Payroll", `An employee works ${hrs} basic hours at ${gbp(rate)} an hour plus ${ot} overtime hours at ${mult === 1.5 ? "time and a half" : "double time"}. What is their gross pay for the week?`, gbp(gross), gbpOpts(gross, [(hrs + ot) * rate, hrs * rate, gross + rate]),
      `Basic ${hrs} × ${gbp(rate)} = ${gbp(hrs * rate)}; overtime ${ot} × ${gbp(rate)} × ${mult} = ${gbp(ot * rate * mult)}; total ${gbp(gross)}.`, 2);
  }));
  qs.push(...repeat(8, () => {
    const gross = ri(15, 50) * 100, pct = pick([3, 4, 5, 8]);
    const c = (gross * pct) / 100;
    return mcq("BKQ", "Payroll", `An employee's pensionable pay this month is ${gbp(gross)}. They contribute ${pct}%. How much is deducted?`, gbp(c), gbpOpts(c, [gross * (pct / 1000), c * 2, gross - c]), `${pct}% × ${gbp(gross)} = ${gbp(c)}.`, 1);
  }));
  qs.push(...repeat(8, () => {
    const book = ri(10, 90) * 100, unp = ri(1, 20) * 25, lodg = ri(1, 20) * 25, chg = ri(1, 8) * 5;
    const bookAdj = book - chg;
    const stmt = bookAdj + unp - lodg;
    return mcq("BKQ", "Reconciliation", `The cash book shows ${gbp(book)} before adjustments. The bank statement shows ${gbp(stmt)}. Bank charges of ${gbp(chg)} are not yet in the cash book. What is the corrected cash book balance?`, gbp(bookAdj), gbpOpts(bookAdj, [book + chg, stmt, book]), `Corrected cash book = ${gbp(book)} − charges ${gbp(chg)} = ${gbp(bookAdj)}. The rest of the difference is timing (unpresented cheques and outstanding lodgements).`, 2);
  }));
  return qs;
}

export function careers(): Record<string, Q[]> {
  return { SECQ: security(), DAQ: data(), AIQ: ai(), CONQ: construction(), BKQ: bookkeeping() };
}
