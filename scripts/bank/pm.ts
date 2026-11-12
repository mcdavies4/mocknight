// Project Management — original practice questions.
// PRINCE2® 7 Foundation (PRN), Scrum Guide 2020 / PSM I (SCR), PM fundamentals for CAPM (PMF).
// PRINCE2® is a registered trademark of PeopleCert; Scrum.org and PMI are not affiliated. Questions are independently written.
import { fmt, mcq, numOpts, others, pick, Q, repeat, ri } from "./lib";

const cap = (s: string) => s[0].toUpperCase() + s.slice(1);

// ---------------------------------------------------------------------------
// PRINCE2 7
// ---------------------------------------------------------------------------
const P = "PRN";
const PRINCIPLES: [string, string][] = [
  ["ensure continued business justification", "there is a justifiable reason to start the project and it remains valid throughout"],
  ["learn from experience", "lessons are sought, recorded and acted on throughout the project"],
  ["define roles, responsibilities and relationships", "everyone knows who is accountable for what and how they interact"],
  ["manage by stages", "the project is planned, monitored and controlled one management stage at a time"],
  ["manage by exception", "tolerances are set so each level of management only escalates when they are forecast to be exceeded"],
  ["focus on products", "the project concentrates on the definition and delivery of products and their quality requirements"],
  ["tailor to suit the project", "the method is adapted to the project's size, complexity, risk and environment"],
];
const PRACTICES: [string, string][] = [
  ["business case", "whether the project is (and remains) desirable, viable and achievable"],
  ["organizing", "the project's roles, responsibilities and relationships between people"],
  ["plans", "what is to be delivered, how, by whom, when and at what cost"],
  ["quality", "defining and implementing the means to create and verify fit-for-purpose products"],
  ["risk", "identifying, assessing and controlling uncertainty"],
  ["issues", "handling unplanned events such as requests for change, off-specifications and problems"],
  ["progress", "monitoring and comparing actual achievement against plans, and controlling deviations"],
];
const PROCESSES: [string, string][] = [
  ["starting up a project", "ensuring prerequisites are in place and deciding whether the project is worthwhile, producing the project brief"],
  ["directing a project", "enabling the project board to be accountable through key decisions and overall control"],
  ["initiating a project", "establishing solid foundations and producing the project initiation documentation (PID)"],
  ["controlling a stage", "assigning work, monitoring it, dealing with issues and reporting during a stage"],
  ["managing product delivery", "controlling the link between the project manager and the team manager(s)"],
  ["managing a stage boundary", "reviewing the current stage, planning the next and updating the business case"],
  ["closing a project", "confirming acceptance of the project product and providing a fixed point for project closure"],
];
const ROLES: [string, string][] = [
  ["executive", "is ultimately accountable for the project and owns the business case"],
  ["senior user", "specifies user needs and is accountable for the benefits being realized"],
  ["senior supplier", "represents those designing, developing and delivering the products and provides resources"],
  ["project manager", "manages the project day to day within the constraints set by the project board"],
  ["team manager", "ensures production of the products allocated in work packages"],
  ["project assurance", "monitors the project on behalf of the project board, independently of the project manager"],
  ["project support", "provides administrative services such as configuration management"],
  ["change authority", "is delegated by the project board to approve requests for change and off-specifications"],
];
const PRODUCTS: [string, string][] = [
  ["highlight report", "the project manager to the project board at regular intervals on stage progress"],
  ["checkpoint report", "the team manager to the project manager on work package progress"],
  ["exception report", "the project manager to the project board when stage tolerances are forecast to be exceeded"],
  ["end stage report", "the project manager to the project board at the end of each management stage"],
  ["end project report", "the project manager to the project board when closing the project"],
];

const PRN_FACTS: [string, string, string[], string][] = [
  ["How many principles does PRINCE2 7 have?", "Seven", ["Five", "Six", "Eight"], "There are seven principles, seven practices and seven processes."],
  ["In PRINCE2 7, the seven 'themes' of earlier editions are now called", "practices", ["principles", "processes", "disciplines"], "PRINCE2 7 renamed themes to practices."],
  ["Which practice is NOT one of the seven PRINCE2 7 practices?", "Benefits", ["Risk", "Quality", "Progress"], "The practices are business case, organizing, plans, quality, risk, issues and progress."],
  ["Which are the five integrated elements of PRINCE2 7?", "Principles, people, practices, processes and the project context", ["Time, cost, scope, quality and risk", "Plans, risks, issues, stages and reports", "Initiation, planning, delivery, control and closure"], "PRINCE2 7 added 'people' and 'project context' as integrated elements."],
  ["Who owns the business case?", "The executive", ["The project manager", "The senior user", "Project support"], "The executive is accountable for the project and owns the business case."],
  ["Which role is accountable for specifying the benefits and ensuring they are realized?", "Senior user", ["Senior supplier", "Executive", "Team manager"], "The senior user represents those who will use the products."],
  ["Which three roles make up the project board?", "Executive, senior user and senior supplier", ["Project manager, team manager and project support", "Executive, project manager and team manager", "Sponsor, customer and supplier"], "The project board directs the project."],
  ["Which process is used by the project board throughout the project?", "Directing a project", ["Controlling a stage", "Managing product delivery", "Initiating a project"], "It runs from the end of starting up to project closure."],
  ["Which process produces the project brief?", "Starting up a project", ["Initiating a project", "Directing a project", "Managing a stage boundary"], "Starting up a project happens before the project formally begins."],
  ["Which process produces the project initiation documentation (PID)?", "Initiating a project", ["Starting up a project", "Controlling a stage", "Closing a project"], "The PID forms the 'contract' between the project manager and project board."],
  ["Which process is mainly carried out by the team manager?", "Managing product delivery", ["Controlling a stage", "Directing a project", "Managing a stage boundary"], "The team manager accepts, executes and delivers work packages."],
  ["What is a work package?", "A set of information about one or more products, agreed between the project manager and team manager", ["The project board's approval to start the project", "A list of project risks", "The final report on the project"], "Work packages are authorized in controlling a stage."],
  ["What is the minimum number of management stages in a PRINCE2 project?", "Two: an initiation stage and at least one further stage", ["One", "Three", "Five"], "The initiation stage is always the first management stage."],
  ["Who sets project-level tolerances?", "The business layer (corporate, programme or customer management)", ["The project manager", "The team manager", "Project assurance"], "The project board sets stage tolerances; the project manager sets work package tolerances."],
  ["Who sets stage tolerances?", "The project board", ["The business layer", "The team manager", "Project support"], "The project board delegates authority to the project manager within stage tolerances."],
  ["Who sets work package tolerances?", "The project manager", ["The project board", "The executive alone", "The business layer"], "Team managers must escalate if work package tolerances are forecast to be exceeded."],
  ["What should the project manager produce if stage tolerances are forecast to be exceeded?", "An exception report", ["A checkpoint report", "A highlight report", "A lessons report"], "The board may then request an exception plan."],
  ["Which of these is a tolerance area in PRINCE2 7?", "Sustainability", ["Morale", "Weather", "Location"], "Tolerance areas include time, cost, scope, quality, benefits, risk and sustainability."],
  ["Which risk response is appropriate only for threats?", "Avoid", ["Exploit", "Enhance", "Share"], "Exploit and enhance are opportunity responses; share applies to both."],
  ["Which risk response is appropriate only for opportunities?", "Exploit", ["Avoid", "Reduce", "Transfer"], "Avoid, reduce, fallback and transfer are threat responses."],
  ["Which response applies to both threats and opportunities?", "Share", ["Avoid", "Exploit", "Reduce"], "Share and accept/prepare contingent plans can apply to both."],
  ["Which of these is a type of issue in PRINCE2?", "Request for change", ["Risk response", "Stage plan", "Lessons report"], "Issue types: request for change, off-specification, problem/concern."],
  ["An off-specification is", "something that should be provided by the project but currently is (or is forecast to be) not provided", ["a change requested by a user", "a positive risk", "a planned product"], "Off-specifications are a type of issue."],
  ["Which plan is optional in PRINCE2?", "Team plan", ["Project plan", "Stage plan", "None — all are mandatory"], "Team plans are produced at the team manager's discretion."],
  ["Which plan replaces a stage or project plan after an exception?", "An exception plan", ["A team plan", "A benefits plan", "A daily plan"], "It shows how to recover from the effect of the deviation."],
  ["What does product-based planning start with?", "Writing the project product description", ["Estimating costs", "Allocating resources", "Writing the end project report"], "Then create the product breakdown structure, product descriptions and product flow diagram."],
  ["What does a product flow diagram show?", "The sequence in which products are developed and their dependencies", ["The project's cost breakdown", "Who reports to whom", "The project's risks"], "It follows the product breakdown structure."],
  ["In a quality review, who is responsible for the product being reviewed?", "The presenter", ["The chair", "The reviewer", "The administrator"], "Quality review roles: chair, presenter, reviewer, administrator."],
  ["Where are the results of quality activities recorded?", "The quality register", ["The risk register", "The daily log", "The lessons log"], "It provides a record of planned and completed quality activities."],
  ["Which log is the project manager's diary for informal issues and actions?", "The daily log", ["The lessons log", "The issue register", "The quality register"], "Informal issues can be handled in the daily log."],
  ["Which document describes the purpose, composition and quality criteria of a product?", "A product description", ["A work package", "A highlight report", "A business case"], "Product descriptions are created during planning."],
  ["The business case is first outlined in which process?", "Starting up a project", ["Initiating a project", "Closing a project", "Controlling a stage"], "It is detailed during initiating a project and updated at stage boundaries."],
  ["What are the three tests of business justification in PRINCE2?", "Desirable, viable and achievable", ["Fast, cheap and good", "Specific, measurable and achievable", "Planned, monitored and closed"], "The project must remain desirable, viable and achievable."],
  ["Benefits are usually realized", "after the project has closed", ["only during initiation", "before the project starts", "at each checkpoint"], "The benefits management approach covers post-project reviews."],
  ["Which principle is supported by setting tolerances?", "Manage by exception", ["Learn from experience", "Focus on products", "Tailor to suit the project"], "Tolerances allow delegation without constant escalation."],
  ["Which principle means a project should stop if it can no longer be justified?", "Ensure continued business justification", ["Manage by stages", "Focus on products", "Learn from experience"], "If justification lapses, the project should be closed prematurely."],
  ["Which role cannot be shared or delegated?", "Executive", ["Project support", "Project assurance", "Senior supplier"], "There is only one executive, ensuring single-point accountability."],
  ["Can the project manager and executive be the same person?", "No", ["Yes, always", "Yes, on small projects", "Only if the board agrees"], "These roles must remain separate."],
  ["What does 'tailoring' PRINCE2 mean?", "Adapting the method to suit the project's context", ["Removing the principles you don't need", "Changing the processes' names", "Skipping the business case"], "The principles must always be applied; tailoring adapts everything else."],
  ["What is configuration management concerned with?", "Identifying, tracking and protecting the project's products and their versions", ["Managing staff performance", "Setting the project budget", "Calculating benefits"], "Configuration item records and product status accounts support it."],
  ["What happens in 'managing a stage boundary'?", "The current stage is reviewed, the next stage is planned and the business case is updated", ["Work packages are executed", "The project brief is written", "The project is formally closed"], "It provides the project board with information to authorize the next stage."],
  ["What is the purpose of 'closing a project'?", "To provide a fixed point to confirm acceptance of the project product and that objectives have been achieved", ["To start the next project", "To write the project brief", "To recruit the project board"], "Lessons and follow-on actions are handed over."],
  ["PRINCE2 7 places new emphasis on", "people and sustainability", ["waterfall-only delivery", "removing the business case", "eliminating stages"], "PRINCE2 7 added a 'people' element and sustainability as a performance target."],
  ["How many marks are needed to pass the PRINCE2 7 Foundation exam?", "36 out of 60 (60%)", ["33 out of 60 (55%)", "42 out of 60 (70%)", "45 out of 60 (75%)"], "60 questions in 60 minutes, closed book."],
];

function prince2(): Q[] {
  const qs: Q[] = [];
  qs.push(
    ...PRINCIPLES.map((x) => mcq(P, "Principles", `Which PRINCE2 principle means ${x[1]}?`, cap(x[0]), others(PRINCIPLES, x, (y) => cap(y[0])), `${cap(x[0])}: ${x[1]}.`, 2)),
    ...PRINCIPLES.map((x) => mcq(P, "Principles", `The principle '${x[0]}' means`, x[1], others(PRINCIPLES, x, (y) => y[1]), `${cap(x[0])}: ${x[1]}.`, 2)),
    ...PRACTICES.map((x) => mcq(P, "Practices", `Which PRINCE2 7 practice addresses ${x[1]}?`, cap(x[0]), others(PRACTICES, x, (y) => cap(y[0])), `The ${x[0]} practice: ${x[1]}.`, 1)),
    ...PRACTICES.map((x) => mcq(P, "Practices", `The purpose of the ${x[0]} practice is to address`, x[1], others(PRACTICES, x, (y) => y[1]), `The ${x[0]} practice: ${x[1]}.`, 1)),
    ...PROCESSES.map((x) => mcq(P, "Processes", `Which process is concerned with ${x[1]}?`, cap(x[0]), others(PROCESSES, x, (y) => cap(y[0])), `${cap(x[0])}: ${x[1]}.`, 2)),
    ...PROCESSES.map((x) => mcq(P, "Processes", `What is the purpose of '${x[0]}'?`, cap(x[1]), others(PROCESSES, x, (y) => cap(y[1])), `${cap(x[0])}: ${x[1]}.`, 2)),
    ...ROLES.map((x) => mcq(P, "People & organizing", `Which role ${x[1]}?`, cap(x[0]), others(ROLES, x, (y) => cap(y[0])), `The ${x[0]} ${x[1]}.`, 2)),
    ...ROLES.map((x) => mcq(P, "People & organizing", `The ${x[0]}`, x[1], others(ROLES, x, (y) => y[1]), `The ${x[0]} ${x[1]}.`, 2)),
    ...PRODUCTS.map((x) => mcq(P, "Management products", `Which report is sent by ${x[1]}?`, cap(x[0]), others(PRODUCTS, x, (y) => cap(y[0])), `${cap(x[0])}: from ${x[1]}.`, 2)),
    ...PRODUCTS.map((x) => mcq(P, "Management products", `A ${x[0]} is sent from`, x[1], others(PRODUCTS, x, (y) => y[1]), `${cap(x[0])}: from ${x[1]}.`, 2)),
    ...PRN_FACTS.map(([b, c, d, e]) => mcq(P, "General", b, c, d, e, 2)),
  );
  return qs;
}

// ---------------------------------------------------------------------------
// Scrum (Scrum Guide 2020)
// ---------------------------------------------------------------------------
const S = "SCR";
const EVENTS: [string, string, string][] = [
  ["the Sprint", "a fixed-length event of one month or less that contains all the other events", "one month or less"],
  ["Sprint Planning", "the event that lays out the work to be performed for the Sprint", "8 hours for a one-month Sprint"],
  ["the Daily Scrum", "a 15-minute event for the Developers to inspect progress toward the Sprint Goal", "15 minutes"],
  ["the Sprint Review", "the event where the outcome of the Sprint is inspected and future adaptations determined with stakeholders", "4 hours for a one-month Sprint"],
  ["the Sprint Retrospective", "the event to plan ways to increase quality and effectiveness", "3 hours for a one-month Sprint"],
];
const ARTIFACTS: [string, string][] = [
  ["Product Backlog", "Product Goal"],
  ["Sprint Backlog", "Sprint Goal"],
  ["Increment", "Definition of Done"],
];
const SCR_FACTS: [string, string, string[], string][] = [
  ["What are the three accountabilities in a Scrum Team?", "Product Owner, Scrum Master and Developers", ["Project Manager, Product Owner and Testers", "Scrum Master, Team Lead and Developers", "Sponsor, Product Owner and Developers"], "Scrum Guide 2020 defines three accountabilities."],
  ["What are the three pillars of empiricism in Scrum?", "Transparency, inspection and adaptation", ["Planning, doing and checking", "Commitment, focus and openness", "Speed, quality and cost"], "Scrum is founded on empiricism and lean thinking."],
  ["Which of these is a Scrum value?", "Courage", ["Speed", "Hierarchy", "Predictability"], "The five values are commitment, focus, openness, respect and courage."],
  ["Who is accountable for maximizing the value of the product?", "The Product Owner", ["The Scrum Master", "The Developers", "The stakeholders"], "The Product Owner is one person, not a committee."],
  ["Who is accountable for the Scrum Team's effectiveness?", "The Scrum Master", ["The Product Owner", "The most senior Developer", "Line management"], "The Scrum Master serves the Scrum Team and the organization."],
  ["Who is accountable for creating a plan for the Sprint (the Sprint Backlog)?", "The Developers", ["The Product Owner", "The Scrum Master", "The stakeholders"], "Developers instil quality and adhere to the Definition of Done."],
  ["Who can cancel a Sprint?", "Only the Product Owner", ["The Scrum Master", "The Developers", "Any stakeholder"], "A Sprint may be cancelled if the Sprint Goal becomes obsolete."],
  ["How large is a Scrum Team typically?", "10 or fewer people", ["Exactly 7 people", "At least 12 people", "No more than 3 people"], "Smaller teams communicate better and are more productive."],
  ["Does a Scrum Team have sub-teams or hierarchies?", "No — it is a cohesive unit of professionals focused on one objective", ["Yes, testers form a sub-team", "Yes, led by a team lead", "Only for large products"], "The Scrum Team is cross-functional and self-managing."],
  ["Who must attend the Daily Scrum?", "The Developers", ["The whole organization", "The Product Owner only", "The stakeholders"], "If the Product Owner or Scrum Master are working on Sprint Backlog items, they participate as Developers."],
  ["When multiple Scrum Teams work on the same product, they should have", "one Product Backlog and one Product Owner", ["one Product Backlog per team", "one Product Owner per team", "separate Product Goals per team"], "The product has a single Product Goal and Product Backlog."],
  ["What happens to a Product Backlog item that does not meet the Definition of Done at the end of the Sprint?", "It cannot be released or presented at the Sprint Review; it returns to the Product Backlog", ["It is released anyway", "It is counted as half done", "The Sprint is extended"], "Work must meet the Definition of Done to be part of an Increment."],
  ["If the organization has a Definition of Done standard, the Scrum Team must", "follow it as a minimum", ["ignore it", "replace it with their own", "ask stakeholders each Sprint"], "If not, the Scrum Team creates one appropriate for the product."],
  ["Can an Increment be delivered to stakeholders before the end of the Sprint?", "Yes", ["No, only at the Sprint Review", "Only with management approval", "Only in the final Sprint"], "The Sprint Review should never be a gate to releasing value."],
  ["What is Product Backlog refinement?", "The ongoing activity of breaking down and adding detail, such as descriptions, order and size, to Product Backlog items", ["A formal event time-boxed to 2 hours", "Approval of the Sprint Goal", "The Product Owner's monthly report"], "Refinement is ongoing, not a Scrum event."],
  ["Which three topics are addressed at Sprint Planning?", "Why is this Sprint valuable, what can be done, and how will the work get done", ["Who, where and when", "Cost, scope and schedule", "Risks, issues and dependencies"], "The Sprint Goal is crafted during Sprint Planning."],
  ["Can the Sprint Goal change during the Sprint?", "No — but the Sprint Backlog can be clarified and renegotiated with the Product Owner as more is learned", ["Yes, at any time", "Yes, if a stakeholder asks", "Only at the Daily Scrum"], "No changes are made that would endanger the Sprint Goal."],
  ["Which event is the last in the Sprint?", "The Sprint Retrospective", ["The Sprint Review", "The Daily Scrum", "Sprint Planning"], "It concludes the Sprint."],
  ["The Scrum Guide 2020 describes Scrum Teams as", "self-managing", ["self-organizing only", "manager-led", "temporary"], "They decide internally who does what, when and how."],
  ["Scrum is founded on empiricism and", "lean thinking", ["six sigma", "waterfall planning", "critical path analysis"], "Lean thinking reduces waste and focuses on essentials."],
  ["What is the Product Goal?", "The long-term objective for the Scrum Team, described in the Product Backlog", ["A daily task list", "The Sprint's single objective", "A release date"], "The Scrum Team must fulfil (or abandon) one objective before taking on the next."],
  ["Who decides how many Product Backlog items to select for a Sprint?", "The Developers", ["The Product Owner", "The Scrum Master", "Stakeholders"], "The more they know about past performance and capacity, the more confident their forecast."],
  ["Is the Sprint Review a formal presentation or approval gate?", "No — it is a working session where the Scrum Team and stakeholders collaborate", ["Yes, the Product Owner signs off", "Yes, stakeholders approve each item", "Yes, it is a status meeting"], "Attendees collaborate on what to do next."],
  ["Who participates in the Sprint Retrospective?", "The Scrum Team", ["Only the Scrum Master", "Stakeholders only", "The whole organization"], "The Scrum Team discusses what went well, problems and solutions."],
  ["A new Sprint starts", "immediately after the conclusion of the previous Sprint", ["after a one-week gap", "only when the Product Owner approves", "at the start of each month"], "Sprints are continuous."],
  ["The Daily Scrum's structure is decided by", "the Developers", ["the Scrum Master", "the Product Owner", "the Scrum Guide's fixed three questions"], "The Developers can select any structure and techniques that focus on progress toward the Sprint Goal."],
  ["What is the pass mark for Scrum.org's PSM I assessment?", "85%", ["70%", "75%", "60%"], "80 questions in 60 minutes."],
];


const WHO: [string, string][] = [
  ["Ordering Product Backlog items", "Product Owner"],
  ["Clearly expressing Product Backlog items", "Product Owner"],
  ["Developing and explicitly communicating the Product Goal", "Product Owner"],
  ["Ensuring the Product Backlog is transparent, visible and understood", "Product Owner"],
  ["Adapting the Sprint Backlog each day toward the Sprint Goal", "Developers"],
  ["Instilling quality by adhering to the Definition of Done", "Developers"],
  ["Holding each other accountable as professionals", "Developers"],
  ["Sizing Product Backlog items", "Developers"],
  ["Causing the removal of impediments to the Scrum Team's progress", "Scrum Master"],
  ["Coaching team members in self-management and cross-functionality", "Scrum Master"],
  ["Ensuring all Scrum events take place and are positive, productive and kept within the time-box", "Scrum Master"],
  ["Leading, training and coaching the organization in its Scrum adoption", "Scrum Master"],
  ["Helping find techniques for effective Product Goal definition and Product Backlog management", "Scrum Master"],
  ["Facilitating stakeholder collaboration as requested or needed", "Scrum Master"],
  ["Creating a usable Increment every Sprint", "Developers"],
  ["Deciding whether to cancel a Sprint", "Product Owner"],
];
const SCENARIOS: [string, string, string[], string][] = [
  ["During the Sprint, the Developers realise they cannot finish all the selected work. What should happen?", "They collaborate with the Product Owner to renegotiate the Sprint Backlog scope without endangering the Sprint Goal", ["The Sprint is automatically extended", "The Scrum Master removes items without discussion", "They lower the Definition of Done"], "Scope may be clarified and renegotiated with the Product Owner as more is learned."],
  ["A stakeholder asks a Developer directly to add a new feature mid-Sprint. What should the Developer do?", "Refer the request to the Product Owner, who manages the Product Backlog", ["Add it to the Sprint Backlog immediately", "Ask the Scrum Master to approve it", "Ignore the stakeholder"], "Those wanting to change the Product Backlog do so by convincing the Product Owner."],
  ["The Sprint Goal has become obsolete because the company changed direction. What may happen?", "The Product Owner may cancel the Sprint", ["The Scrum Master cancels the Sprint", "The Developers keep working until the end", "The Sprint length is changed"], "Only the Product Owner has authority to cancel a Sprint."],
  ["At the Daily Scrum, a long technical discussion starts. What is best?", "The relevant Developers continue the discussion after the Daily Scrum", ["Extend the Daily Scrum to an hour", "The Scrum Master decides the solution", "Cancel the Daily Scrum"], "Developers often meet immediately afterwards for detailed discussions."],
  ["Management wants a report on how the team is progressing. Which is the most transparent source?", "The Increment and the Sprint Review", ["A Gantt chart prepared by the Scrum Master", "Individual timesheets", "The Daily Scrum minutes"], "Scrum relies on transparent artifacts and inspection at the Sprint Review."],
  ["The Product Owner is unavailable for most of the Sprint. What is the main risk?", "Questions about Product Backlog items go unanswered, reducing the value delivered", ["The Scrum Master must become Product Owner", "The Sprint must be cancelled", "The Daily Scrum can't happen"], "The Product Owner's availability supports maximizing value."],
  ["A team keeps failing to finish Sprint Backlog items. Where should they discuss how to improve?", "At the Sprint Retrospective", ["At the Sprint Review only", "In a meeting with line management", "At Sprint Planning only"], "The Retrospective identifies the most helpful changes to improve effectiveness."],
  ["Two Scrum Teams work on one product. How many Definitions of Done should apply to the Increment?", "One shared Definition of Done that all teams meet", ["One per team, chosen freely", "None until the final release", "One per Developer"], "Multiple Scrum Teams on a product must mutually define and comply with the same Definition of Done."],
  ["Who must be present at Sprint Planning?", "The entire Scrum Team", ["Only the Product Owner", "Only the Developers", "All stakeholders"], "Others may be invited to provide advice."],
  ["When is the Sprint Backlog updated?", "Throughout the Sprint as more is learned", ["Only at Sprint Planning", "Only by the Scrum Master", "Only at the Sprint Review"], "It is a highly visible, real-time picture of the Developers' work."],
  ["What is the main purpose of the Sprint Review?", "To inspect the outcome of the Sprint and determine future adaptations", ["To approve work for release", "To assess individual performance", "To plan the next Daily Scrum"], "Progress toward the Product Goal is discussed."],
  ["A Developer says they're only a tester and won't write code. According to Scrum, Developers are", "any members committed to creating any aspect of a usable Increment each Sprint", ["only programmers", "specialists who can't share work", "managed by the Scrum Master"], "Scrum recognises no titles beyond Developer."],
  ["What is the Increment?", "A concrete stepping stone toward the Product Goal that is usable and meets the Definition of Done", ["Everything the team started in the Sprint", "The Sprint Backlog", "The burndown chart"], "Each Increment is additive to all prior Increments."],
  ["How many Increments can be created in a Sprint?", "One or more", ["Exactly one", "None until the release", "Exactly two"], "Multiple Increments may be created within a Sprint."],
  ["Is velocity or a burndown chart required by Scrum?", "No — various practices can forecast progress but they don't replace empiricism", ["Yes, velocity is mandatory", "Yes, burndown is an artifact", "Only for Sprints longer than two weeks"], "Scrum doesn't prescribe these techniques."],
  ["Which statement about the Scrum Master's role is correct?", "They are a true leader who serves the Scrum Team and the larger organization", ["They assign tasks to Developers", "They own the Product Backlog", "They report individual performance to HR"], "Scrum Guide 2020 wording."],
  ["What is the purpose of the Sprint Goal?", "It gives the Developers a single objective for the Sprint, creating coherence and focus", ["It lists every task in the Sprint", "It replaces the Product Goal", "It sets individual targets"], "The Sprint Goal is created during Sprint Planning and added to the Sprint Backlog."],
  ["Who creates the Definition of Done if the organization has none?", "The Scrum Team", ["The Product Owner alone", "The stakeholders", "The Scrum Master alone"], "It must be appropriate for the product."],
  ["Which best describes the Product Backlog?", "An emergent, ordered list of what is needed to improve the product", ["A fixed requirements specification", "The Developers' daily task list", "A list of defects only"], "It is the single source of work undertaken by the Scrum Team."],
  ["The Sprint Retrospective inspects", "individuals, interactions, processes, tools and the Definition of Done", ["only the product", "stakeholder satisfaction surveys", "individual salaries"], "The most impactful improvements may be added to the next Sprint Backlog."],
  ["What should the Developers do when work during the Sprint turns out different than expected?", "Collaborate with the Product Owner on the Sprint Backlog while protecting the Sprint Goal", ["Stop and wait for the Sprint Review", "Lengthen the Sprint", "Escalate to senior management"], "Scrum is built on adaptation as soon as possible."],
  ["Which Scrum value means the team works on difficult problems and does the right thing?", "Courage", ["Focus", "Openness", "Respect"], "Commitment, focus, openness, respect and courage."],
  ["Which Scrum value means team members and stakeholders agree to be open about the work and challenges?", "Openness", ["Courage", "Commitment", "Focus"], "Openness supports transparency."],
  ["Why are Sprints limited to one month or less?", "Longer Sprints can let the Sprint Goal become invalid, increase complexity and increase risk", ["To keep budgets small", "Because stakeholders demand it", "To allow monthly payroll"], "Shorter Sprints generate more learning cycles."],
  ["What does 'transparency' mean in Scrum?", "The emergent process and work must be visible to those performing and receiving the work", ["All salaries are published", "The Scrum Master records everything", "Stakeholders attend every event"], "Low transparency leads to decisions that diminish value and increase risk."],
];

function scrum(): Q[] {
  const qs: Q[] = [];
  qs.push(
    ...EVENTS.map((x) => mcq(S, "Events", `Which Scrum event is ${x[1]}?`, cap(x[0].replace(/^the /, "")), others(EVENTS, x, (y) => cap(y[0].replace(/^the /, ""))), `${cap(x[0])}: ${x[1]}.`, 1)),
    ...EVENTS.map((x) => mcq(S, "Events", `What is the maximum time-box for ${x[0]}?`, cap(x[2]), [...others(EVENTS, x, (y) => cap(y[2])), "There is no time-box"], `${cap(x[0])} is time-boxed to ${x[2]}. Shorter Sprints usually have shorter events.`, 2)),
    ...ARTIFACTS.map((x) => mcq(S, "Artifacts & commitments", `Which commitment belongs to the ${x[0]}?`, x[1], [...others(ARTIFACTS, x, (y) => y[1]), "Velocity"], `Each artifact has a commitment: ${ARTIFACTS.map((a) => `${a[0]} → ${a[1]}`).join("; ")}.`, 1)),
    ...ARTIFACTS.map((x) => mcq(S, "Artifacts & commitments", `The ${x[1]} is the commitment for which artifact?`, x[0], [...others(ARTIFACTS, x, (y) => y[0]), "Burndown chart"], `${ARTIFACTS.map((a) => `${a[0]} → ${a[1]}`).join("; ")}.`, 1)),
    ...SCR_FACTS.map(([b, c, d, e]) => mcq(S, "Scrum framework", b, c, d, e, 2)),
    ...WHO.map(([a, w]) => mcq(S, "Accountabilities", `In Scrum, who is accountable for: ${a.toLowerCase()}?`, w, ["Product Owner", "Scrum Master", "Developers", "Stakeholders", "Line manager"], `${a}: the ${w}.`, 2)),
    ...SCENARIOS.map(([b, c, d, e]) => mcq(S, "Scenarios", b, c, d, e, 2)),
  );
  const TF: [string, boolean, string][] = [
    ["The Product Owner can be a committee.", false, "The Product Owner is one person."],
    ["The Daily Scrum is time-boxed to 15 minutes.", true, "Regardless of Sprint length."],
    ["The Scrum Master is the manager of the Developers.", false, "The Scrum Master is a true leader who serves; Scrum Teams are self-managing."],
    ["Sprints can be longer than one month.", false, "Sprints are one month or less."],
    ["Every Sprint should have a Sprint Goal.", true, "It is the commitment for the Sprint Backlog."],
    ["Product Backlog refinement is a time-boxed Scrum event.", false, "It is an ongoing activity, not an event."],
    ["Stakeholders are invited to the Sprint Review.", true, "The Scrum Team presents results to key stakeholders."],
    ["Only the Scrum Master can add items to the Sprint Backlog.", false, "The Sprint Backlog is a plan by and for the Developers."],
    ["Scrum's pillars are transparency, inspection and adaptation.", true, "These are the three pillars of empiricism."],
    ["The Definition of Done is the commitment for the Increment.", true, "It creates transparency about what 'done' means."],
    ["The Sprint Review is the last event in the Sprint.", false, "The Sprint Retrospective concludes the Sprint."],
    ["Scrum Teams are cross-functional.", true, "Members have all the skills needed to create value each Sprint."],
    ["The Scrum Master can change the Sprint Goal.", false, "No changes are made that endanger the Sprint Goal."],
    ["The Product Backlog is never complete.", true, "It is an emergent, ordered list of what is needed to improve the product."],
    ["The Daily Scrum is only for the Scrum Master to get a status update.", false, "It is an event for the Developers."],
    ["Quality goals should not decrease during the Sprint.", true, "A Sprint rule from the Scrum Guide."],
    ["A Sprint can have no Sprint Goal if work is unrelated.", false, "Every Sprint has a Sprint Goal."],
    ["Scrum is a lightweight framework.", true, "It helps people, teams and organizations generate value through adaptive solutions."],
    ["Product Backlog items must be estimated in story points.", false, "Scrum doesn't prescribe estimation techniques."],
    ["The Scrum Team is responsible for all product-related activities.", true, "Including stakeholder collaboration, verification, maintenance, operation, experimentation, R&D."],
  ];
  qs.push(...TF.map(([st, t, e]) => mcq(S, "True or false", `TRUE or FALSE? "${st}"`, t ? "True" : "False", [t ? "False" : "True"], e, 1, 2)));
  return qs;
}

// ---------------------------------------------------------------------------
// PM fundamentals (CAPM-style)
// ---------------------------------------------------------------------------
const F = "PMF";
const DEFS: [string, string][] = [
  ["A project", "a temporary endeavour undertaken to create a unique product, service or result"],
  ["The project charter", "the document that formally authorizes a project and gives the project manager authority"],
  ["A work breakdown structure (WBS)", "a hierarchical decomposition of the total scope of work"],
  ["A work package", "the lowest level of the WBS, for which cost and duration can be estimated and managed"],
  ["The critical path", "the longest path through a schedule network, determining the shortest possible project duration"],
  ["Float (slack)", "the amount of time an activity can be delayed without delaying the project end date"],
  ["Scope creep", "uncontrolled expansion of scope without adjustments to time, cost and resources"],
  ["A stakeholder", "anyone who can affect or be affected by the project"],
  ["A RACI chart", "a responsibility assignment matrix showing who is responsible, accountable, consulted and informed"],
  ["A risk register", "a document recording identified risks, their analysis and planned responses"],
  ["The change control board", "a group responsible for reviewing and approving or rejecting changes"],
  ["Lessons learned", "knowledge gained during a project to improve future performance"],
  ["A Kanban board", "a visual tool for managing flow, often with work-in-progress limits"],
  ["Velocity", "the amount of work a team completes in an iteration, used for forecasting"],
  ["A burndown chart", "a chart showing the work remaining over time"],
  ["MoSCoW", "a prioritization technique: must have, should have, could have, won't have this time"],
  ["Servant leadership", "a leadership style focused on supporting and enabling the team"],
  ["A PMO", "an organizational structure that standardizes project governance and shares resources and methods"],
  ["Gold plating", "adding extra features that were not requested by the customer"],
  ["Fast tracking", "doing activities in parallel that would normally be done in sequence to shorten the schedule"],
  ["Crashing", "adding resources to shorten the schedule, usually at extra cost"],
  ["A Pareto chart", "a chart that ranks causes by frequency to focus on the vital few (80/20)"],
  ["A fishbone (Ishikawa) diagram", "a cause-and-effect diagram used to find root causes"],
  ["A predictive (waterfall) approach", "a plan-driven approach where scope, time and cost are defined early"],
  ["An adaptive (agile) approach", "an iterative approach where requirements evolve through frequent delivery and feedback"],
];
const PMF_FACTS: [string, string, string[], string][] = [
  ["In which organizational structure does the project manager have the MOST authority?", "Projectized", ["Functional", "Weak matrix", "Balanced matrix"], "In a functional organization the functional manager holds most authority."],
  ["In which organizational structure does the project manager have the LEAST authority?", "Functional", ["Projectized", "Strong matrix", "Balanced matrix"], "Functional managers control resources and budget."],
  ["What are Tuckman's stages of team development, in order?", "Forming, storming, norming, performing, adjourning", ["Storming, forming, norming, performing, adjourning", "Forming, norming, storming, performing, adjourning", "Planning, doing, checking, acting, closing"], "Teams typically move through these stages."],
  ["Which conflict resolution technique usually leads to a lasting, win-win solution?", "Collaborating / problem solving", ["Withdrawing / avoiding", "Smoothing / accommodating", "Forcing / directing"], "Collaboration incorporates multiple viewpoints and commitment."],
  ["Which contract type places the most cost risk on the seller?", "Firm fixed price", ["Cost plus fixed fee", "Time and materials", "Cost plus percentage of cost"], "The seller must deliver for the agreed price."],
  ["Which contract type places the most cost risk on the buyer?", "Cost plus percentage of cost", ["Firm fixed price", "Fixed price incentive fee", "Fixed price with economic price adjustment"], "The seller's fee rises as costs rise."],
  ["Which is a cost of conformance in cost of quality?", "Training and inspections", ["Rework", "Warranty claims", "Scrap"], "Prevention and appraisal costs are costs of conformance."],
  ["Which is a cost of non-conformance?", "Rework", ["Training", "Testing equipment", "Quality planning"], "Internal and external failure costs are costs of non-conformance."],
  ["Which risk response for a threat shifts the impact to a third party, such as through insurance?", "Transfer", ["Avoid", "Mitigate", "Accept"], "Transferring doesn't remove the risk; it shifts ownership."],
  ["Which risk response reduces the probability or impact of a threat?", "Mitigate", ["Transfer", "Exploit", "Accept"], "For example, extra testing to reduce defects."],
  ["Which risk response for an opportunity ensures it definitely happens?", "Exploit", ["Enhance", "Share", "Accept"], "Enhance increases probability or impact; exploit makes it certain."],
  ["Who typically issues the project charter?", "The project sponsor or initiator", ["The project team", "The customer's lawyer", "The project manager alone"], "The charter authorizes the project and the project manager."],
  ["What is the '100% rule' for a WBS?", "The WBS includes all the work of the project and nothing more", ["Every task must be 100% complete before the next", "100% of the budget must be spent", "The WBS must have 100 items"], "Each level's children must add up to the parent."],
  ["What should a project manager do FIRST when a stakeholder requests a change?", "Assess the impact of the change and follow the change control process", ["Implement it immediately", "Refuse it", "Ask the team to work overtime"], "Changes are evaluated before approval."],
  ["Which estimating technique uses historical data from a similar project?", "Analogous estimating", ["Bottom-up estimating", "Three-point estimating", "Parametric estimating"], "It's quick but less accurate."],
  ["Which estimating technique adds up estimates of individual work packages?", "Bottom-up estimating", ["Analogous estimating", "Top-down estimating", "Expert guessing"], "It's the most accurate but time-consuming."],
  ["In agile, the daily stand-up is mainly for", "the team to coordinate and identify impediments", ["reporting status to senior managers", "approving changes", "estimating the whole project"], "Keep it short and focused on progress."],
  ["A project is complete when", "its objectives are met, or it is terminated because they can't be met or the need no longer exists", ["the budget is spent", "the sponsor leaves", "the first deliverable is ready"], "Projects are temporary with a defined end."],
];

function fundamentals(): Q[] {
  const qs: Q[] = [];
  qs.push(
    ...DEFS.map((d) => mcq(F, "Concepts", `${d[0]} is best described as`, d[1], others(DEFS, d, (x) => x[1]), `${d[0]}: ${d[1]}.`, 1)),
    ...DEFS.map((d) => mcq(F, "Concepts", `What term describes ${d[1]}?`, cap(d[0].replace(/^(An?|The) /, "")), others(DEFS, d, (x) => cap(x[0].replace(/^(An?|The) /, ""))), `${d[0]}: ${d[1]}.`, 1)),
    ...PMF_FACTS.map(([b, c, d, e]) => mcq(F, "Fundamentals", b, c, d, e, 2)),
  );

  // Earned value
  const k = (v: number) => `${v < 0 ? "−" : ""}£${fmt(Math.abs(v))}k`;
  qs.push(
    ...repeat(14, () => {
      const pv = ri(20, 90) * 10, ev = ri(15, 95) * 10, ac = ri(15, 95) * 10;
      if (ev === ac) return null;
      const cv = ev - ac;
      return mcq(F, "Earned value", `PV = ${k(pv)}, EV = ${k(ev)}, AC = ${k(ac)}. What is the cost variance (CV)?`, k(cv),
        [k(ac - ev), k(ev - pv), k(pv - ac), k(cv + 10)], `CV = EV − AC = ${ev} − ${ac} = ${cv} (${cv < 0 ? "over budget" : "under budget"}).`, 2);
    }),
    ...repeat(14, () => {
      const pv = ri(20, 90) * 10, ev = ri(15, 95) * 10, ac = ri(15, 95) * 10;
      if (ev === pv) return null;
      const sv = ev - pv;
      return mcq(F, "Earned value", `PV = ${k(pv)}, EV = ${k(ev)}, AC = ${k(ac)}. What is the schedule variance (SV)?`, k(sv),
        [k(pv - ev), k(ev - ac), k(ac - pv), k(sv - 10)], `SV = EV − PV = ${ev} − ${pv} = ${sv} (${sv < 0 ? "behind schedule" : "ahead of schedule"}).`, 2);
    }),
    ...repeat(14, () => {
      const ev = pick([80, 90, 100, 120, 150, 160, 200, 240]), ac = pick([80, 100, 120, 125, 160, 200, 250]);
      if (ev === ac) return null;
      const cpi = Math.round((ev / ac) * 100) / 100;
      return mcq(F, "Earned value", `EV = ${k(ev)} and AC = ${k(ac)}. What is the cost performance index (CPI), and what does it mean?`,
        `${fmt(cpi)} — ${cpi < 1 ? "over budget" : "under budget"}`,
        [`${fmt(Math.round((ac / ev) * 100) / 100)} — ${cpi < 1 ? "under budget" : "over budget"}`, `${fmt(cpi)} — ${cpi < 1 ? "under budget" : "over budget"}`, `${fmt(ev - ac)} — on budget`],
        `CPI = EV ÷ AC = ${ev} ÷ ${ac} = ${fmt(cpi)}. Below 1 means over budget; above 1 means under budget.`, 2);
    }),
    ...repeat(12, () => {
      const ev = pick([60, 80, 90, 100, 120, 150]), pv = pick([75, 100, 120, 150, 200]);
      if (ev === pv) return null;
      const spi = Math.round((ev / pv) * 100) / 100;
      return mcq(F, "Earned value", `EV = ${k(ev)} and PV = ${k(pv)}. What is the schedule performance index (SPI)?`, fmt(spi),
        numOpts(spi, [Math.round((pv / ev) * 100) / 100, ev - pv, Math.round((spi + 0.1) * 100) / 100]), `SPI = EV ÷ PV = ${ev} ÷ ${pv} = ${fmt(spi)}. Below 1 = behind schedule.`, 2);
    }),
    ...repeat(12, () => {
      const bac = pick([100, 200, 400, 500, 800, 1000]), cpi = pick([0.8, 0.5, 1.25, 0.625, 1.6]);
      const eac = bac / cpi;
      if (!Number.isInteger(eac)) return null;
      return mcq(F, "Earned value", `BAC = ${k(bac)} and CPI = ${cpi}. If current performance continues, what is the estimate at completion (EAC)?`, k(eac),
        [k(bac * cpi), k(bac), k(eac - bac), k(eac + 50)], `EAC = BAC ÷ CPI = ${bac} ÷ ${cpi} = ${eac}.`, 3);
    }),
  );

  // PERT
  qs.push(
    ...repeat(12, () => {
      const o = ri(2, 10), m = o + ri(1, 6), p = m + ri(2, 12);
      const e = (o + 4 * m + p) / 6;
      if (!Number.isInteger(e * 10)) return null;
      return mcq(F, "Estimating", `Using PERT (beta) estimating, an activity has optimistic ${o} days, most likely ${m} days and pessimistic ${p} days. What is the expected duration?`, `${fmt(e)} days`,
        numOpts(e, [(o + m + p) / 3, m, (o + p) / 2, e + 1], "days"), `E = (O + 4M + P) ÷ 6 = (${o} + ${4 * m} + ${p}) ÷ 6 = ${fmt(e)} days.`, 2);
    }),
  );

  // Communication channels
  qs.push(
    ...repeat(10, () => {
      const n = ri(4, 25);
      const ch = (n * (n - 1)) / 2;
      return mcq(F, "Communication", `A project has ${n} stakeholders (including the project manager). How many communication channels are there?`, fmt(ch),
        numOpts(ch, [n * (n - 1), n * 2, (n * (n + 1)) / 2, n]), `Channels = n(n − 1) ÷ 2 = ${n} × ${n - 1} ÷ 2 = ${ch}.`, 2);
    }),
    ...repeat(6, () => {
      const a = ri(4, 10), b = a + ri(1, 5);
      const add = (b * (b - 1)) / 2 - (a * (a - 1)) / 2;
      return mcq(F, "Communication", `A team grows from ${a} to ${b} people. How many communication channels are added?`, fmt(add),
        numOpts(add, [(b * (b - 1)) / 2, b - a, (b * (b - 1)) / 2 + (a * (a - 1)) / 2, add + b]), `Before: ${(a * (a - 1)) / 2}; after: ${(b * (b - 1)) / 2}; added: ${add}.`, 3);
    }),
  );

  // Critical path (3-path network)
  qs.push(
    ...repeat(12, () => {
      const A = ri(2, 8), B = ri(2, 8), C = ri(2, 8), D = ri(2, 8), E = ri(3, 12);
      const p1 = A + B + D, p2 = A + C + D, p3 = E + D;
      const longest = Math.max(p1, p2, p3);
      if ([p1, p2, p3].filter((x) => x === longest).length > 1) return null;
      return mcq(F, "Scheduling", `Activities: A (${A} days) → B (${B} days) → D (${D} days); A → C (${C} days) → D; and E (${E} days) → D. All paths end with D. What is the project duration?`, `${longest} days`,
        numOpts(longest, [Math.min(p1, p2, p3), A + B + C + D + E, p1 + p2 - longest, longest - D], "days"),
        `Paths: A-B-D = ${p1}, A-C-D = ${p2}, E-D = ${p3}. The critical path is the longest: ${longest} days.`, 3);
    }),
  );
  return qs;
}

export function projectManagement(): Record<string, Q[]> {
  return { PRN: prince2(), SCR: scrum(), PMF: fundamentals() };
}
