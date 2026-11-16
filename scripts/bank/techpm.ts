// Project management and tech certification starter banks:
//   APM — APM Project Fundamentals Qualification (PFQ)      AGP — Agile, Scrum Product Owner (PSPO) & PMI-ACP style
//   BAF — Business analysis (BCS Foundation / IIBA ECBA)    ICC — ISC2 Certified in Cybersecurity (CC)
//   SAA — AWS Solutions Architect Associate (SAA-C03)       AIF — AI fundamentals (Microsoft AI-900 / AWS AI Practitioner)
//   SFA — Salesforce Administrator
// Established concepts only; calculations (EVM, flow, velocity, ML metrics) are generated so answers are exact.
import { fmt, mcq, numOpts, pick, Q, repeat, ri } from "./lib";

type F = [string, string, string, string[], string];
const facts = (code: string, list: F[], d: 1 | 2 | 3 = 2) => list.map(([t, b, c, x, e]) => mcq(code, t, b, c, x, e, d));
const r = (v: number, dp: number) => Math.round(v * 10 ** dp) / 10 ** dp;

// ============================================================================
const APM: F[] = [
  ["Life cycle", "In the APM Body of Knowledge (7th edition), the phases of a linear project life cycle are", "concept, definition, deployment and transition", ["initiate, plan, execute and close", "start, middle, end and review", "design, build, test and deploy"], "Transition hands outputs over to the users."],
  ["Roles", "Who owns the business case and is accountable for the project delivering benefits?", "The project sponsor", ["The project manager", "The team members", "The PMO"], "The project manager manages day-to-day delivery."],
  ["Roles", "A project management office (PMO) mainly provides", "support, standards and governance across projects", ["the budget for every project", "the end users", "the project sponsor"], "PMOs can be supportive, controlling or directive."],
  ["Governance", "The business case justifies the project by setting out", "costs, benefits, risks and options", ["the team's holidays", "only the technical design", "the marketing slogan"], "It is reviewed throughout the life cycle."],
  ["Benefits", "Benefits realisation usually happens", "after the project's outputs are being used", ["before the project starts", "only during design", "never"], "Benefits are measured improvements from outcomes."],
  ["Stakeholders", "Stakeholders with high power and high interest should usually be", "managed closely", ["monitored only", "kept informed only", "ignored"], "From the power/interest grid."],
  ["Risk", "Which is a response to a threat?", "Avoid", ["Exploit", "Enhance", "Celebrate"], "Threat responses include avoid, reduce, transfer and accept."],
  ["Risk", "The difference between a risk and an issue is that", "a risk may happen; an issue has already happened", ["they are the same", "an issue may happen; a risk has happened", "risks only affect cost"], "Issues need resolving now."],
  ["Change", "Formal change control is used to", "assess and approve or reject changes to the agreed baseline", ["stop all changes", "change the team members", "increase scope informally"], "It protects against scope creep."],
  ["Change", "Uncontrolled growth in project scope is called", "scope creep", ["gold plating only", "float", "crashing"], "Change control helps prevent it."],
  ["Configuration", "Configuration management ensures", "the right versions of products are identified and controlled", ["staff are configured", "budgets are approved", "risks are transferred"], "It works with change control."],
  ["Scheduling", "The critical path is", "the longest sequence of dependent activities, setting the shortest project duration", ["the cheapest route", "the riskiest task", "the first task only"], "Activities on it have zero total float."],
  ["Scheduling", "Float (slack) is", "how long an activity can be delayed without delaying the project", ["the project budget", "a type of risk", "the time to write the plan"], "Critical activities have zero float."],
  ["Responsibility", "In a RACI chart, the 'A' stands for", "Accountable", ["Approved", "Assigned", "Available"], "Responsible, Accountable, Consulted, Informed."],
  ["Quality", "Quality assurance is mainly about", "giving confidence that processes will deliver quality", ["inspecting finished products only", "cutting costs", "adding scope"], "Quality control checks outputs."],
  ["Exam", "The APM PFQ exam consists of", "60 multiple-choice questions in 1 hour", ["30 essay questions in 3 hours", "100 questions in 2 hours", "a practical project"], "The pass mark is 60%."],
];
function evm(): Q[] {
  return repeat(14, () => {
    const pv = pick([40000, 50000, 60000, 80000]), ev = pick([36000, 45000, 48000, 52000, 60000]), ac = pick([40000, 44000, 50000, 55000]);
    const kind = pick(["CPI", "SPI", "CV", "SV"]);
    if (kind === "CPI") { const a = r(ev / ac, 2); return mcq("APM", "Earned value", `EV = £${ev.toLocaleString("en-GB")}, AC = £${ac.toLocaleString("en-GB")}. What is the cost performance index (CPI)?`, fmt(a), numOpts(a, [r(ac / ev, 2), r(ev / pv, 2), r(pv / ac, 2)]), `CPI = EV ÷ AC = ${fmt(a)}. ${a < 1 ? "Over budget." : "Under or on budget."}`, 2); }
    if (kind === "SPI") { const a = r(ev / pv, 2); return mcq("APM", "Earned value", `EV = £${ev.toLocaleString("en-GB")}, PV = £${pv.toLocaleString("en-GB")}. What is the schedule performance index (SPI)?`, fmt(a), numOpts(a, [r(pv / ev, 2), r(ev / ac, 2), r(ac / pv, 2)]), `SPI = EV ÷ PV = ${fmt(a)}. ${a < 1 ? "Behind schedule." : "On or ahead of schedule."}`, 2); }
    if (kind === "CV") { const a = ev - ac; return mcq("APM", "Earned value", `EV = £${ev.toLocaleString("en-GB")}, AC = £${ac.toLocaleString("en-GB")}. What is the cost variance (CV)?`, `£${a.toLocaleString("en-GB")}`, [ac - ev, ev - pv, pv - ac].filter((x) => x !== a).map((x) => `£${x.toLocaleString("en-GB")}`), `CV = EV − AC = £${a.toLocaleString("en-GB")}. ${a < 0 ? "Negative means over budget." : "Zero or positive means on or under budget."}`, 2); }
    const a = ev - pv; return mcq("APM", "Earned value", `EV = £${ev.toLocaleString("en-GB")}, PV = £${pv.toLocaleString("en-GB")}. What is the schedule variance (SV)?`, `£${a.toLocaleString("en-GB")}`, [pv - ev, ev - ac, ac - pv].filter((x) => x !== a).map((x) => `£${x.toLocaleString("en-GB")}`), `SV = EV − PV = £${a.toLocaleString("en-GB")}. ${a < 0 ? "Negative means behind schedule." : "Zero or positive means on or ahead of schedule."}`, 2);
  });
}

// ============================================================================
const AGP: F[] = [
  ["Agile values", "The Agile Manifesto values 'working software' over", "comprehensive documentation", ["customer collaboration", "responding to change", "individuals and interactions"], "The items on the right still have value, but the left is valued more."],
  ["Agile values", "The Agile Manifesto values 'responding to change' over", "following a plan", ["working software", "customer collaboration", "individuals"], "It was published in 2001."],
  ["Agile values", "How many principles sit behind the Agile Manifesto?", "12", ["4", "7", "10"], "There are 4 values and 12 principles."],
  ["Scrum", "Under the 2020 Scrum Guide, what are the three accountabilities in a Scrum Team?", "Developers, Product Owner and Scrum Master", ["Project manager, tester and analyst", "Sponsor, user and supplier", "Team lead, architect and coder"], "There are no other titles in Scrum."],
  ["Product owner", "Who is accountable for ordering the Product Backlog?", "The Product Owner", ["The Scrum Master", "The Developers", "The stakeholders"], "The PO may delegate work but remains accountable."],
  ["Product owner", "The commitment for the Product Backlog in the 2020 Scrum Guide is the", "Product Goal", ["Sprint Goal", "Definition of Done", "Velocity"], "The Sprint Backlog's is the Sprint Goal; the Increment's is the Definition of Done."],
  ["Product owner", "The Product Owner's main focus is", "maximising the value of the product", ["managing the team's hours", "writing all the code", "running the Daily Scrum"], "They decide what to build and in what order."],
  ["Scrum", "The maximum length of a Sprint is", "one month", ["two weeks", "three months", "there is no limit"], "Shorter Sprints are common."],
  ["Scrum", "The Daily Scrum is time-boxed to", "15 minutes", ["30 minutes", "1 hour", "5 minutes"], "It is for the Developers to plan the next day's work."],
  ["Scrum", "A Scrum Team is typically", "10 or fewer people", ["exactly 12 people", "at least 20 people", "one person"], "Smaller teams communicate better."],
  ["User stories", "The INVEST criteria for good user stories include Independent, Negotiable, Valuable, Estimable, Small and", "Testable", ["Technical", "Timeboxed", "Tracked"], "Coined by Bill Wake."],
  ["User stories", "The '3 Cs' of user stories are", "Card, Conversation and Confirmation", ["Code, Compile and Commit", "Cost, Cash and Credit", "Create, Check and Close"], "Ron Jeffries' model."],
  ["Prioritisation", "In MoSCoW prioritisation, 'W' stands for", "Won't have this time", ["Wish list", "Will have", "Weekly"], "Must, Should, Could, Won't."],
  ["Product", "An MVP (minimum viable product) is built to", "learn from real users with the least effort", ["deliver every feature at once", "avoid feedback", "replace testing"], "It tests key assumptions early."],
  ["Kanban", "WIP limits in Kanban are used to", "limit work in progress and improve flow", ["increase multitasking", "set salaries", "remove the board"], "Finishing beats starting."],
  ["Practices", "Test-driven development (TDD) means", "writing a failing test before the code that makes it pass", ["testing only at the end", "skipping tests", "manual testing only"], "Red, green, refactor."],
  ["Practices", "An 'information radiator' is", "a highly visible display of project information, such as a task board", ["a server", "a private report", "a heater"], "It supports transparency."],
  ["Practices", "A spike in agile is", "a short time-boxed investigation to reduce uncertainty", ["a sudden bug", "a cost overrun", "a holiday"], "Used before estimating unclear work."],
  ["Leadership", "Servant leadership in agile means the leader", "removes obstacles and supports the team", ["commands every task", "works alone", "avoids the team"], "The Scrum Master is a servant leader."],
];
function velocity(): Q[] {
  return repeat(8, () => {
    const v = [ri(18, 30), ri(18, 30), ri(18, 30)], avg = Math.round((v[0] + v[1] + v[2]) / 3), backlog = pick([120, 150, 180, 200, 240]);
    const ans = Math.ceil(backlog / avg);
    return mcq("AGP", "Forecasting", `A team's last three velocities were ${v.join(", ")} points. About how many Sprints will a ${backlog}-point backlog take (rounded up, using the average)?`, fmt(ans, "Sprints"),
      numOpts(ans, [Math.ceil(backlog / Math.max(...v)), Math.ceil(backlog / Math.min(...v)) === ans ? ans + 2 : Math.ceil(backlog / Math.min(...v)), Math.round(backlog / 10)], "Sprints"),
      `Average velocity ≈ ${avg}; ${backlog} ÷ ${avg} ≈ ${r(backlog / avg, 1)} → ${ans} Sprints.`, 2);
  });
}
function littlesLaw(): Q[] {
  return repeat(6, () => {
    const wip = pick([6, 8, 10, 12, 15]), tp = pick([2, 3, 4, 5]);
    const ans = r(wip / tp, 1);
    return mcq("AGP", "Flow", `A Kanban team has ${wip} items in progress and finishes ${tp} items a day. Using Little's Law, what is the average cycle time?`, fmt(ans, "days"),
      numOpts(ans, [wip * tp, r(tp / wip, 2), wip + tp], "days"), `Cycle time = WIP ÷ throughput = ${wip} ÷ ${tp} = ${fmt(ans)} days.`, 2);
  });
}

// ============================================================================
const BAF: F[] = [
  ["Frameworks", "In IIBA's BABOK Guide, the Business Analysis Core Concept Model (BACCM) has six concepts: Change, Need, Solution, Stakeholder, Value and", "Context", ["Cost", "Code", "Control"], "BABOK v3 is the IIBA's standard."],
  ["Frameworks", "In the BCS POPIT model, the 'I' stands for", "Information", ["Investment", "Innovation", "Inspection"], "People, Organisation, Process, Information, Technology."],
  ["Frameworks", "CATWOE is used to", "analyse different stakeholder perspectives on a business system", ["estimate costs", "test software", "write code"], "Customers, Actors, Transformation, Weltanschauung, Owner, Environment."],
  ["Frameworks", "In CATWOE, 'W' (Weltanschauung) means", "the world view that makes the transformation meaningful", ["the workload", "the weekly plan", "the warranty"], "It explains why the change matters to a stakeholder."],
  ["Strategy", "PESTLE analysis examines", "external political, economic, social, technological, legal and environmental factors", ["internal staff skills only", "a single process", "software defects"], "SWOT combines internal and external factors."],
  ["Requirements", "A non-functional requirement describes", "how well the system performs, such as speed, security or usability", ["what the system does", "the project budget", "the team's names"], "Functional requirements describe behaviour."],
  ["Requirements", "In BABOK, requirements that describe what is needed to move from the current to the future state (such as data migration or training) are", "transition requirements", ["business requirements", "stakeholder requirements", "non-functional requirements"], "They are temporary."],
  ["Requirements", "A requirements traceability matrix links", "requirements to their sources, designs and tests", ["staff to salaries", "risks to insurers", "servers to rooms"], "It shows coverage and impact of change."],
  ["Requirements", "Acceptance criteria define", "the conditions a requirement or story must meet to be accepted", ["the budget", "the test team's hours", "the sprint length"], "They make requirements testable."],
  ["Elicitation", "Which elicitation technique involves watching people do their work?", "Observation (shadowing)", ["Questionnaires", "Document analysis", "Brainstorming"], "It reveals tacit knowledge."],
  ["Elicitation", "Which technique is best for gathering views from many people spread out geographically?", "Questionnaires (surveys)", ["Shadowing", "One-to-one interviews only", "Workshops in one room"], "They scale well but give less depth."],
  ["Elicitation", "Building an early model of a screen for users to react to is", "prototyping", ["auditing", "benchmarking", "regression testing"], "It helps uncover requirements."],
  ["Analysis", "Gap analysis compares", "the current state with the desired future state", ["two competitors' prices", "two test results", "budget and actuals only"], "The gap shows what must change."],
  ["Analysis", "A fishbone (Ishikawa) diagram is used to", "explore the root causes of a problem", ["schedule tasks", "model data", "track budgets"], "The '5 whys' is another root-cause technique."],
  ["Modelling", "BPMN is a standard notation for", "business process models", ["database design", "network diagrams", "financial statements"], "Business Process Model and Notation."],
  ["Modelling", "A use case describes", "how an actor interacts with a system to achieve a goal", ["the system's hardware", "the project budget", "a test script only"], "Use case diagrams show actors and use cases."],
  ["Stakeholders", "On a power/interest grid, stakeholders with high power but low interest should be", "kept satisfied", ["managed closely", "kept informed", "monitored only"], "Low power, high interest: keep informed."],
  ["Certification", "The IIBA's entry-level business analysis certification is the", "ECBA", ["CBAP", "PMP", "CISSP"], "CCBA and CBAP are for experienced analysts."],
];

// ============================================================================
const ICC: F[] = [
  ["Principles", "The CIA triad stands for", "confidentiality, integrity and availability", ["control, identity and access", "cyber, internet and audit", "certification, inspection and approval"], "These are the core security objectives."],
  ["Principles", "Non-repudiation means", "someone cannot deny having performed an action", ["data is always available", "data is encrypted", "users can reset passwords"], "Digital signatures support it."],
  ["Principles", "Using a password and a code from a phone app is an example of", "multi-factor authentication", ["single sign-on", "least privilege", "separation of duties"], "Factors: something you know, have or are."],
  ["Principles", "A fingerprint scan is which authentication factor?", "Something you are", ["Something you know", "Something you have", "Somewhere you are"], "Biometrics are 'something you are'."],
  ["Principles", "Least privilege means", "giving users only the access they need to do their job", ["giving everyone admin rights", "removing all access", "sharing passwords"], "It limits damage if an account is compromised."],
  ["Risk", "Buying cyber insurance is an example of which risk treatment?", "Transfer", ["Avoid", "Accept", "Mitigate"], "Mitigation reduces likelihood or impact."],
  ["Risk", "Choosing not to do a risky activity at all is", "risk avoidance", ["risk acceptance", "risk transfer", "risk mitigation"], "It removes the risk entirely."],
  ["Governance", "How many canons are in the ISC2 Code of Ethics?", "4", ["3", "5", "10"], "The first is to protect society, the common good and the infrastructure."],
  ["BC/DR", "RTO (recovery time objective) is", "the maximum acceptable time to restore a service after disruption", ["the maximum data loss measured in time", "the cost of recovery", "the backup schedule"], "RPO is the maximum acceptable data loss."],
  ["BC/DR", "RPO (recovery point objective) is", "the maximum acceptable amount of data loss, measured in time", ["the time to restore service", "the number of servers", "the response team size"], "It drives backup frequency."],
  ["BC/DR", "A business continuity plan focuses on", "keeping critical business functions running during a disruption", ["only restoring IT systems", "marketing", "hiring"], "A disaster recovery plan focuses on restoring IT."],
  ["Incident response", "In the NIST incident response life cycle, the phase after detection and analysis is", "containment, eradication and recovery", ["preparation", "post-incident activity", "procurement"], "Then post-incident activity (lessons learned)."],
  ["Access control", "Access based on a user's job role is", "role-based access control (RBAC)", ["mandatory access control", "discretionary access control", "rule-free access"], "MAC uses labels; DAC lets owners decide."],
  ["Access control", "Mandatory access control (MAC) grants access based on", "security labels and clearances set by the system", ["the data owner's choice", "the user's job title only", "time of day only"], "Common in military systems."],
  ["Network", "Which port does SSH use by default?", "22", ["23", "80", "3389"], "Telnet uses 23 and sends data in clear text."],
  ["Network", "Which port is used by RDP (Remote Desktop)?", "3389", ["22", "443", "53"], "Exposed RDP is a common attack target."],
  ["Network", "DNS uses which port?", "53", ["25", "110", "443"], "SMTP uses 25; HTTPS uses 443."],
  ["Network", "The difference between an IDS and an IPS is that an IPS", "can actively block malicious traffic", ["only logs traffic", "is a type of firewall rule", "encrypts traffic"], "An IDS detects and alerts."],
  ["Network", "A DMZ is", "a network segment between the internet and the internal network for public-facing services", ["an encryption method", "a type of malware", "a password policy"], "Web servers are often placed there."],
  ["Network", "Zero trust means", "never trust by default; always verify every request", ["trust everything inside the network", "no passwords are needed", "turn off firewalls"], "It assumes the network may already be compromised."],
  ["Operations", "Hashing is mainly used to verify", "integrity", ["confidentiality", "availability", "authorisation"], "Any change to data changes the hash."],
  ["Operations", "Asymmetric encryption uses", "a public key and a private key", ["one shared secret key", "no keys", "only passwords"], "RSA is an example."],
  ["Operations", "A SIEM system", "collects and correlates logs to detect security events", ["encrypts hard drives", "replaces firewalls", "backs up data"], "Security Information and Event Management."],
  ["Operations", "Degaussing destroys data on", "magnetic media", ["paper", "optical discs only", "cloud storage"], "Physical destruction is also used."],
  ["Exam", "The ISC2 CC exam has", "100 questions in 2 hours, with a passing score of 700 out of 1000", ["50 questions in 1 hour", "200 questions in 6 hours", "a practical lab only"], "It covers five domains."],
];

// ============================================================================
const SAA: F[] = [
  ["Storage", "Which S3 storage class is cheapest for long-term archives that can wait hours to retrieve?", "S3 Glacier Deep Archive", ["S3 Standard", "S3 Standard-IA", "S3 Express One Zone"], "Retrieval can take up to 12 hours."],
  ["Storage", "Which S3 class automatically moves objects between access tiers based on usage?", "S3 Intelligent-Tiering", ["S3 One Zone-IA", "S3 Glacier Flexible Retrieval", "S3 Standard"], "Good for unknown or changing access patterns."],
  ["Storage", "Which storage can be mounted by many EC2 instances at once as a shared Linux file system?", "Amazon EFS", ["Amazon EBS (standard volume)", "Instance store", "S3 Glacier"], "EBS volumes normally attach to one instance."],
  ["Storage", "Data on an EC2 instance store volume is", "lost when the instance stops or terminates", ["kept forever", "replicated across regions", "backed up automatically to S3"], "It is temporary, high-performance storage."],
  ["Databases", "RDS Multi-AZ deployments are mainly for", "high availability with automatic failover", ["scaling read traffic", "cheaper storage", "cross-region analytics"], "Read replicas scale reads."],
  ["Databases", "RDS read replicas are mainly used to", "scale read-heavy workloads", ["provide synchronous failover", "encrypt data", "reduce storage"], "Replication to read replicas is asynchronous."],
  ["Databases", "Which service is a fully managed NoSQL key-value database with single-digit millisecond latency?", "Amazon DynamoDB", ["Amazon RDS", "Amazon Redshift", "Amazon Aurora"], "DAX adds an in-memory cache."],
  ["Databases", "Which service is a petabyte-scale data warehouse?", "Amazon Redshift", ["Amazon DynamoDB", "Amazon ElastiCache", "Amazon SQS"], "Used for analytics."],
  ["Networking", "Which load balancer works at layer 7 and supports path-based routing?", "Application Load Balancer", ["Network Load Balancer", "Gateway Load Balancer", "Classic Load Balancer only"], "NLB works at layer 4 with very low latency and static IPs."],
  ["Networking", "Instances in a private subnet need outbound internet access for updates. Use a", "NAT gateway in a public subnet", ["internet gateway attached to the private subnet", "VPC peering", "Direct Connect only"], "NAT allows outbound but not inbound connections."],
  ["Networking", "Security groups are", "stateful and apply at the instance level", ["stateless and apply at the subnet level", "only for S3", "the same as NACLs"], "Network ACLs are stateless and apply at the subnet."],
  ["Networking", "VPC peering connections are", "not transitive", ["always transitive", "only between regions", "the same as a VPN"], "Use Transit Gateway to connect many VPCs."],
  ["Networking", "Which Route 53 routing policy sends users to the region with the lowest latency?", "Latency-based routing", ["Simple routing", "Weighted routing", "Failover routing"], "Geolocation routes by user location."],
  ["Networking", "Which service is AWS's content delivery network?", "Amazon CloudFront", ["Amazon Route 53", "AWS Direct Connect", "Amazon API Gateway"], "It caches content at edge locations."],
  ["Security", "The secure way for an EC2 application to access S3 is", "an IAM role attached to the instance", ["access keys stored in code", "the root account", "a public bucket"], "Roles provide temporary credentials."],
  ["Security", "Which service rotates database credentials automatically?", "AWS Secrets Manager", ["AWS KMS", "Amazon Inspector", "AWS Shield"], "KMS manages encryption keys."],
  ["Integration", "To decouple application components with a message queue, use", "Amazon SQS", ["Amazon SNS only", "Amazon Kinesis Video Streams", "AWS Config"], "SNS is publish/subscribe; SQS is a queue."],
  ["Integration", "An SQS FIFO queue guarantees", "ordering and exactly-once processing", ["unlimited throughput with no order", "email delivery", "streaming video"], "Standard queues offer at-least-once, best-effort ordering."],
  ["Compute", "What is the maximum run time of an AWS Lambda function?", "15 minutes", ["5 minutes", "1 hour", "24 hours"], "Use other services for longer jobs."],
  ["Compute", "Which EC2 purchase option gives the biggest discount but can be interrupted?", "Spot Instances", ["On-Demand", "Dedicated Hosts", "Reserved Instances"], "Up to about 90% off On-Demand prices."],
  ["Design", "The AWS Well-Architected Framework has how many pillars?", "6", ["4", "5", "8"], "Including sustainability, added in 2021."],
  ["Design", "Which is a pillar of the Well-Architected Framework?", "Cost optimisation", ["Marketing", "Branding", "Hiring"], "Others: operational excellence, security, reliability, performance efficiency, sustainability."],
  ["Migration", "To move tens of terabytes into AWS where network transfer is too slow, use", "AWS Snowball", ["Amazon SQS", "AWS Lambda", "Amazon Route 53"], "Physical devices shipped to and from AWS."],
  ["Exam", "The SAA-C03 exam has", "65 questions in 130 minutes, with a passing score of 720", ["40 questions in 60 minutes", "100 questions in 3 hours", "a hands-on lab only"], "Scored from 100 to 1000."],
];

// ============================================================================
const AIF: F[] = [
  ["ML basics", "Training a model with labelled examples is", "supervised learning", ["unsupervised learning", "reinforcement learning", "rule-based programming"], "Unsupervised learning finds patterns in unlabelled data."],
  ["ML basics", "Grouping customers into segments without labels is an example of", "clustering", ["classification", "regression", "translation"], "Clustering is unsupervised."],
  ["ML basics", "Predicting a house price is an example of", "regression", ["classification", "clustering", "object detection"], "Regression predicts a number."],
  ["ML basics", "Predicting whether an email is spam or not is", "classification", ["regression", "clustering", "dimensionality reduction"], "Classification predicts a category."],
  ["ML basics", "A model that performs very well on training data but poorly on new data is", "overfitting", ["underfitting", "well-generalised", "unsupervised"], "More data or regularisation can help."],
  ["ML basics", "Learning by trial and error with rewards and penalties is", "reinforcement learning", ["supervised learning", "unsupervised learning", "transfer learning"], "Used in game playing and robotics."],
  ["Generative AI", "In a large language model, a 'token' is", "a piece of text such as a word or part of a word", ["a password", "a GPU", "a type of database"], "Models read and write tokens."],
  ["Generative AI", "Raising the 'temperature' setting of an LLM makes its output", "more random and creative", ["more deterministic", "shorter only", "more accurate always"], "Lower temperature gives more predictable answers."],
  ["Generative AI", "Retrieval-augmented generation (RAG) improves answers by", "giving the model relevant documents retrieved at query time", ["retraining the model every query", "removing the prompt", "making the model smaller"], "It reduces hallucinations and uses up-to-date data."],
  ["Generative AI", "When an AI model confidently produces false information, this is called", "hallucination", ["overfitting", "tokenisation", "fine-tuning"], "Grounding and RAG help reduce it."],
  ["Generative AI", "Embeddings represent text as", "numerical vectors that capture meaning", ["images", "passwords", "spreadsheets"], "Similar meanings have similar vectors."],
  ["Responsible AI", "Which is one of Microsoft's six responsible AI principles?", "Fairness", ["Profitability", "Speed", "Secrecy"], "The others: reliability and safety, privacy and security, inclusiveness, transparency, accountability."],
  ["Vision", "Finding and locating multiple objects in an image with bounding boxes is", "object detection", ["image classification", "OCR", "sentiment analysis"], "Classification labels the whole image."],
  ["Vision", "Extracting printed or handwritten text from images is", "optical character recognition (OCR)", ["object detection", "speech synthesis", "clustering"], "Used for receipts and forms."],
  ["Language", "Identifying people, places and organisations in text is", "named entity recognition", ["sentiment analysis", "translation", "speech recognition"], "Sentiment analysis detects positive or negative tone."],
  ["AWS services", "Which AWS service gives access to foundation models through an API?", "Amazon Bedrock", ["Amazon Rekognition", "Amazon Polly", "AWS Glue"], "SageMaker is for building and training your own models."],
  ["AWS services", "Which AWS service converts text into lifelike speech?", "Amazon Polly", ["Amazon Transcribe", "Amazon Comprehend", "Amazon Lex"], "Transcribe does speech-to-text."],
  ["AWS services", "Which AWS service extracts text and data from scanned documents?", "Amazon Textract", ["Amazon Polly", "Amazon Lex", "Amazon Translate"], "It also reads forms and tables."],
  ["Azure services", "Which Azure service provides access to OpenAI models such as GPT?", "Azure OpenAI Service", ["Azure AI Vision", "Azure Blob Storage", "Azure DevOps"], "Azure AI Language handles text analytics."],
  ["Evaluation", "Data used only to estimate performance on unseen data after training is the", "test set", ["training set", "label set", "feature store"], "A validation set helps tune the model during development."],
];
function metrics(): Q[] {
  return repeat(14, () => {
    const tp = ri(30, 90), fp = ri(5, 30), fn = ri(5, 30), tn = ri(50, 150);
    const kind = pick(["precision", "recall", "accuracy"]);
    const val = kind === "precision" ? tp / (tp + fp) : kind === "recall" ? tp / (tp + fn) : (tp + tn) / (tp + fp + fn + tn);
    const ans = r(val * 100, 1);
    const formula = kind === "precision" ? `TP ÷ (TP + FP) = ${tp} ÷ ${tp + fp}` : kind === "recall" ? `TP ÷ (TP + FN) = ${tp} ÷ ${tp + fn}` : `(TP + TN) ÷ total = ${tp + tn} ÷ ${tp + fp + fn + tn}`;
    const others = [r((tp / (tp + fp)) * 100, 1), r((tp / (tp + fn)) * 100, 1), r(((tp + tn) / (tp + fp + fn + tn)) * 100, 1), r((tn / (tn + fp)) * 100, 1)].filter((x) => x !== ans);
    return mcq("AIF", "Evaluation", `A classifier's confusion matrix: TP = ${tp}, FP = ${fp}, FN = ${fn}, TN = ${tn}. What is its ${kind}?`, fmt(ans, "%"), numOpts(ans, others, "%"), `${kind[0].toUpperCase() + kind.slice(1)} = ${formula} = ${fmt(ans)}%.`, 3);
  });
}

// ============================================================================
const SFA: F[] = [
  ["Security", "Organisation-wide defaults (OWD) set", "the most restrictive baseline record access", ["object permissions", "page layouts", "field labels"], "Roles and sharing rules then open access up."],
  ["Security", "The role hierarchy mainly", "opens up record access to users higher in the hierarchy", ["restricts access below OWD", "controls field permissions", "controls login hours"], "Managers can see their team's records."],
  ["Security", "Profiles and permission sets control", "object and field permissions (what users can do)", ["which records users own", "the role hierarchy", "report folders only"], "Sharing controls which records they can see."],
  ["Security", "How many profiles can a user have?", "One", ["Unlimited", "Two", "None"], "Use permission sets to grant extra permissions."],
  ["Security", "Sharing rules are used to", "extend record access beyond OWD and the role hierarchy", ["restrict access below OWD", "delete records", "create users"], "They can be based on owner or criteria."],
  ["Data model", "A master-detail relationship", "allows roll-up summary fields and cascades deletes to the detail records", ["is always optional", "cannot be reported on", "has no ownership impact"], "Detail records inherit sharing from the master."],
  ["Data model", "Which relationship type is loosely coupled and does not cascade deletes by default?", "Lookup", ["Master-detail", "Roll-up", "Hierarchical only"], "Lookups can be optional."],
  ["Data model", "Record types let you", "offer different page layouts and picklist values for different processes", ["change the role hierarchy", "import data", "write Apex"], "For example, different sales processes."],
  ["Automation", "Salesforce's recommended tool for declarative automation is", "Flow", ["Workflow Rules", "Process Builder", "S-Controls"], "Workflow Rules and Process Builder are being retired."],
  ["Automation", "A validation rule", "prevents saving a record when data does not meet criteria", ["sends emails automatically", "assigns leads", "builds dashboards"], "It returns an error message."],
  ["Data", "The Data Import Wizard can import up to", "50,000 records at a time", ["5 million records", "500 records", "1 billion records"], "Data Loader handles up to 5 million."],
  ["Data", "Field history tracking can track up to how many fields per object?", "20", ["5", "50", "Unlimited"], "Field Audit Trail extends this."],
  ["Sales", "Converting a lead creates", "an account and a contact, and optionally an opportunity", ["only a case", "a campaign", "a quote only"], "The lead record is then marked converted."],
  ["Reports", "Which report format groups rows and columns?", "Matrix", ["Tabular", "Summary", "Joined only"], "Summary groups rows; joined combines report blocks."],
  ["Environments", "Which sandbox type copies all production data and metadata?", "Full sandbox", ["Developer", "Developer Pro", "Partial Copy"], "Partial Copy includes a sample of data."],
  ["Service", "Queues are used to", "hold records such as cases or leads until a user takes ownership", ["store files", "schedule reports", "change OWD"], "Teams can share work from a queue."],
  ["Exam", "The Salesforce Administrator exam has", "60 questions in 105 minutes, with a 65% pass mark", ["40 questions in 60 minutes", "100 questions in 3 hours", "a practical project"], "Up to five unscored questions may be added."],
];

export function techpm(): Record<string, Q[]> {
  return {
    APM: [...facts("APM", APM), ...evm()],
    AGP: [...facts("AGP", AGP), ...velocity(), ...littlesLaw()],
    BAF: facts("BAF", BAF),
    ICC: facts("ICC", ICC),
    SAA: facts("SAA", SAA),
    AIF: [...facts("AIF", AIF), ...metrics()],
    SFA: facts("SFA", SFA),
  };
}
