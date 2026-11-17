// Blog posts. Body uses a tiny markdown subset: "## " headings, "- " bullets, blank-line paragraphs,
// **bold** and [link text](/path). FAQs are rendered as a section and as FAQPage structured data.
import type { TrackCode } from "./tracks";

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string; // YYYY-MM-DD
  updated?: string;
  exam: TrackCode; // the practice track the post points to
  examHref: string;
  tag: string;
  readMins: number;
  body: string;
  faq: [string, string][];
};

export const POSTS: Post[] = [
  {
    slug: "life-in-the-uk-test-guide",
    title: "Life in the UK Test: format, pass mark and how to pass first time",
    description: "24 questions, 45 minutes, 18 correct to pass and £50 a go. What the Life in the UK Test covers and a simple plan to pass it first time.",
    date: "2026-11-17",
    exam: "LUK",
    examHref: "/life-in-the-uk",
    tag: "🇬🇧 UK settlement",
    readMins: 6,
    body: `If you're applying for settlement (ILR) or British citizenship, you'll almost certainly need to pass the Life in the UK Test. It isn't hard, but it is very specific: every question comes from one official handbook, and the facts it asks about are easy to mix up. This guide covers what to expect and how to prepare without wasting weeks.

## The test at a glance

- **24 multiple-choice questions** on a computer at an approved test centre
- **45 minutes** to answer them all
- **Pass mark: 18 out of 24 (75%)**
- **Fee: £50 per attempt**, paid again each time you book
- You get your result on the day. A pass gives you a **unique reference number (URN)** that you use in your application

The same test covers both settlement and citizenship, so you only need to pass it once.

## What the questions are about

Every question comes from the official handbook, *Life in the United Kingdom: A Guide for New Residents*. It covers:

- **Values and principles of the UK**: the rule of law, democracy, tolerance and individual liberty
- **What is the UK?**: the four nations, the Commonwealth and the Crown dependencies
- **A long and illustrious history**: from the Stone Age to the present day. This is the biggest chapter, packed with dates, monarchs and battles
- **A modern, thriving society**: religion, festivals, sport, the arts, inventions and famous people
- **The UK government, the law and your role**: Parliament, elections, the courts and your rights and responsibilities

## Why people fail

Most people who fail know the general ideas but trip over specifics: which king did what, which year a law passed, which saint's day falls in which month. The questions are often written to make two answers look right. The fix isn't reading the handbook ten times. It's **testing yourself** on the details until they stick.

## A 3-week plan that works

- **Week 1:** read the handbook once, one chapter a day, without trying to memorise everything. Do 10–15 practice questions after each chapter.
- **Week 2:** practise every day. Questions you get wrong should come back again until you get them right. That repetition is what moves facts into memory.
- **Week 3:** take full 24-question mock tests under the real 45-minute limit. Book your test when you're scoring **22 or more out of 24** consistently, not just scraping 18.

On Mock Night, daily practice repeats your mistakes automatically and your readiness score tells you when you're ready to book. [Try the Life in the UK practice tests](/life-in-the-uk).

## On the day

- Book only through the official GOV.UK booking site, at least 3 days ahead
- Bring the **same ID** you used to book. A mismatch can mean you're turned away and lose the fee
- Arrive early. You'll have a short practice question before the real test starts
- Don't rush: 45 minutes for 24 questions is nearly two minutes each. Flag hard questions and come back to them`,
    faq: [
      ["How many questions are in the Life in the UK Test?", "24 multiple-choice questions, answered in 45 minutes. You need 18 correct (75%) to pass."],
      ["How much does the Life in the UK Test cost?", "£50 per attempt. If you fail, you pay £50 again to rebook."],
      ["Where do the questions come from?", "Only from the official handbook, Life in the United Kingdom: A Guide for New Residents. Good practice tests are based on the same content."],
      ["How long should I study?", "Most people need 2–4 weeks of regular practice. Book when you're scoring 22 or more out of 24 on full mock tests."],
    ],
  },
  {
    slug: "uk-driving-theory-test-guide",
    title: "UK driving theory test: what to expect and how to pass",
    description: "50 questions in 57 minutes (43 to pass) plus 14 hazard perception clips (44 out of 75). How the UK theory test works and how to prepare.",
    date: "2026-11-17",
    exam: "DRIVE",
    examHref: "/exam/DRIVE",
    tag: "🚗 Driving",
    readMins: 6,
    body: `The theory test is the first big step to a full UK driving licence, and you need to pass it before you can book your practical test. It has two parts, and you must pass **both in the same sitting**.

## Part 1: multiple choice

- **50 questions in 57 minutes**
- **Pass mark: 43 out of 50**, so you can only get 7 wrong
- A few questions are based on a short video clip
- Topics include alertness, attitude, safety margins, hazard awareness, vulnerable road users, motorway rules, road signs, documents, and what to do at incidents

## Part 2: hazard perception

- **14 video clips** filmed from a driver's point of view
- Click when you see a **developing hazard**: something that would make you change speed or direction
- One clip has two hazards; the rest have one
- **Pass mark: 44 out of 75.** The earlier you click once a hazard starts to develop, the more points you get. Clicking wildly or in a pattern scores zero for that clip

## Cost and validity

The test costs **£23** and is booked on GOV.UK. Your pass certificate lasts **2 years**, and you must pass your practical test within that time or take the theory test again.

## How to prepare for the multiple-choice part

The questions come straight from the Highway Code and the official driving manuals. Reading isn't enough. The test checks exact stopping distances, exact speed limits and exact meanings of signs. Practise with questions that explain **why** the answer is right, so you learn the rule rather than memorising answers.

A plan that works for most learners:

- **20–30 questions a day** for two to three weeks
- Go back over every question you got wrong until you get it right
- In the last week, take full **50-question mock tests in 57 minutes**. Book when you're scoring **46+ out of 50** consistently, which leaves room for nerves on the day

[Practise UK driving theory questions on Mock Night](/exam/DRIVE). Every answer comes with the Highway Code rule behind it.

## How to prepare for hazard perception

Use the official DVSA practice clips, and practise while you're out with your instructor or on the bus: say out loud when you spot something that might develop. Watch for children near parked cars, cyclists checking over their shoulder, brake lights ahead and vehicles waiting to pull out.

## Commonly missed topics

- **Stopping distances** at each speed, and how they double in the wet
- **Speed limits** for different vehicles and roads
- **Motorway rules**: lane use, hard shoulders and signals
- **Vulnerable road users**: horse riders, cyclists and pedestrians, under the updated Highway Code`,
    faq: [
      ["How many questions are on the UK driving theory test?", "50 multiple-choice questions in 57 minutes (43 needed to pass), followed by 14 hazard perception clips (44 out of 75 needed to pass)."],
      ["How much does the theory test cost?", "£23, booked on GOV.UK."],
      ["How long does a theory test pass last?", "2 years. You need to pass your practical test within that time."],
      ["Does Mock Night include hazard perception?", "No. Mock Night covers the multiple-choice part. Use the official DVSA clips for hazard perception practice."],
    ],
  },
  {
    slug: "jamb-utme-study-plan",
    title: "How to prepare for JAMB UTME: a 12-week study plan",
    description: "180 questions, four subjects, two hours. A week-by-week JAMB UTME plan that builds speed and accuracy, with Use of English at the centre.",
    date: "2026-11-17",
    exam: "JAMB",
    examHref: "/exam/JAMB",
    tag: "🇳🇬 JAMB",
    readMins: 7,
    body: `JAMB rewards students who practise **under time pressure**, not just those who read the most. This plan gets you from "I've started" to "I'm ready for the CBT centre" in 12 weeks.

## How the UTME works

- **Four subjects**: Use of English (compulsory) plus three subjects for your course
- **180 questions**: 60 in Use of English and 40 in each of the other three
- **About two hours** on a computer at an accredited CBT centre
- **Scored out of 400** (100 per subject). Universities set their own cut-off marks

That's about 40 seconds per question. Speed matters as much as knowledge.

## Weeks 1–4: build the base

- Get the **official JAMB syllabus** for your four subjects. Everything in the exam comes from it
- Study **one topic per subject per day**, then answer 10–20 questions on it straight away
- Read the recommended **Use of English novel** early. Questions on it are near-guaranteed marks
- Note every question you get wrong. These are your weak topics

## Weeks 5–8: practise every day

- Do **daily mixed practice** across all four subjects, at least 40 questions a day
- Revisit wrong answers until you get them right. Repetition beats rereading
- Do one **timed subject test** each weekend to measure progress
- Use of English is 60 of your 180 questions. Practise comprehension, lexis and structure, and oral English (vowels, consonants, stress) every day

## Weeks 9–12: full mocks

- Take a **full four-subject timed mock every week**, then twice a week in the last fortnight
- Practise on a **computer-style screen**, not just paper. The CBT layout and clock feel different
- Practise **skipping and coming back**: don't spend two minutes on one question
- Aim to finish each mock with **10 minutes to spare** for review

## Exam-day tips

- Get to your centre early with your registration slip and the documents JAMB asks for
- Answer every question. There's no negative marking in the UTME
- Start with your strongest subject to build confidence and bank time

Every Sunday night, Mock Night runs a **live mock** that thousands of students sit at the same time, with a leaderboard. It's the closest thing to the real day. [Start JAMB practice free](/exam/JAMB).`,
    faq: [
      ["How many questions are in JAMB UTME?", "180: 60 in Use of English and 40 in each of your other three subjects, scored out of 400."],
      ["How long is the JAMB exam?", "About two hours for all four subjects, on a computer at an accredited CBT centre."],
      ["Is there negative marking in JAMB?", "No, so answer every question even if you have to guess."],
      ["How many hours a day should I study for JAMB?", "Consistency matters more than hours. Two to three focused hours a day, with daily timed practice, beats occasional long sessions."],
    ],
  },
  {
    slug: "nmc-cbt-guide",
    title: "NMC CBT for international nurses: Part A and Part B explained",
    description: "Part A is 15 numeracy questions in 30 minutes; Part B is 100 clinical questions in 2.5 hours. How the NMC CBT works and how to prepare for each part.",
    date: "2026-11-17",
    exam: "NMC",
    examHref: "/nmc-cbt",
    tag: "🩺 Nursing",
    readMins: 6,
    body: `The NMC computer-based test (CBT) is the first part of the Test of Competence for nurses and midwives trained outside the UK. Once you pass it, you move on to the OSCE practical exam in the UK.

## The format

- **Part A: Numeracy**: **15 questions in 30 minutes**. You type a numerical answer, so there are no options to choose from
- **Part B: Clinical**: **100 multiple-choice questions in 2 hours 30 minutes**, with four options each
- Taken at a Pearson VUE test centre
- The fee for both parts is **£83**
- Each part is marked separately and **both must be passed**. If you pass one and fail the other, you only resit the part you failed

## Part A: numeracy

Part A has a **very high pass standard**, so treat it as needing almost every question right. The calculations aren't advanced, but there's no room for careless slips. Practise:

- **Tablet and liquid dose calculations** (what you want ÷ what you've got × the volume)
- **Unit conversions**: grams, milligrams and micrograms; litres and millilitres
- **IV infusion rates** in mL per hour and drops per minute
- **Fluid balance** totals

Check every answer: does it make clinical sense? A dose of 40 tablets is a sign something went wrong.

## Part B: clinical

Part B tests the **NMC Code** and safe UK nursing practice, not just textbook facts. Expect scenario questions on:

- Prioritising care and recognising a patient who is getting worse (for example, using NEWS2)
- Safeguarding, consent and the Mental Capacity Act
- Infection prevention and control
- Medicines management and safe administration
- Professional accountability, delegation and raising concerns

Many questions have two answers that both look reasonable. Pick the one that's **safest for the patient** and fits the NMC Code. Ask yourself what a UK nurse is accountable for.

## A 4–6 week plan

- **Every day:** 5–10 numeracy questions, timed
- **Weeks 1–3:** study one Part B topic a day, then do 20–30 questions on it
- **Weeks 4–6:** take full timed mocks, 15 numeracy questions in 30 minutes and 100 clinical questions in 2.5 hours, and review every wrong answer

[Practise NMC CBT Part A and Part B on Mock Night](/nmc-cbt).`,
    faq: [
      ["How many questions are in the NMC CBT?", "115 in total: Part A has 15 numeracy questions (30 minutes) and Part B has 100 clinical questions (2 hours 30 minutes)."],
      ["How much does the NMC CBT cost?", "£83 for both parts."],
      ["Do I have to resit both parts if I fail one?", "No. Each part is marked separately, so you only resit the part you failed."],
      ["Can I use a calculator in Part A?", "An on-screen calculator is provided at the test centre. Practise with a basic calculator so you're used to it."],
    ],
  },
  {
    slug: "uk-care-job-training",
    title: "Starting a care job in the UK: the training you'll be asked about",
    description: "The Care Certificate, safeguarding, moving and handling, first aid and medication training: what UK care employers expect, and how to get ahead.",
    date: "2026-11-17",
    exam: "CARE",
    examHref: "/exam/CARE",
    tag: "💙 Care work",
    readMins: 5,
    body: `Care is one of the most common first jobs for people moving to the UK, and one of the easiest to progress in if you know the training that's expected. Here's what employers will ask about, and how to show you're ready.

## The Care Certificate

Most new care workers in England complete the **Care Certificate** in their first weeks. It covers **15 standards**, including:

- Understanding your role and your **duty of care**
- **Person-centred care**, privacy and dignity
- **Equality and diversity**
- **Communication**, including with people living with dementia or sensory loss
- **Safeguarding** adults and children
- **Health and safety**, including fire safety and moving and handling
- **Infection prevention and control**
- **Handling information** and confidentiality

Your employer assesses you, often through workbooks and observation at work. Knowing the standards before you start makes the first weeks much easier and impresses at interview.

## Other training you'll meet

- **Moving and handling**: hoists, slide sheets and never lifting a person manually
- **Basic life support and first aid**
- **Food hygiene**, if you'll prepare meals
- **Medication administration**, often once you've been in the job a while. This is the usual step towards a **senior carer** role

## Interview questions to prepare for

- "What would you do if you suspected someone was being abused?" Explain that you'd report it to your manager or the safeguarding lead, record the facts, and not investigate yourself.
- "How do you maintain someone's dignity during personal care?" Talk about closing doors and curtains, covering the person, asking consent and explaining what you're doing.
- "What does person-centred care mean to you?" Talk about choices, preferences, and treating each person as an individual.

## Getting ahead

You can't sit the Care Certificate before you have a job, but you can learn the standards now. On Mock Night, a few practice questions a day cover all 15 standards with explanations, so you'll walk into your interview and induction confident. [Start Care Certificate revision](/exam/CARE), or step up with [senior carer practice](/exam/CARESR) on medication, the Mental Capacity Act and CQC.`,
    faq: [
      ["What is the Care Certificate?", "A set of 15 standards that new health and social care workers in England are expected to meet, usually completed during induction and assessed by the employer."],
      ["Can I get the Care Certificate before I start a job?", "It's assessed in the workplace, so you complete it with your employer. You can learn the standards beforehand so induction goes faster."],
      ["How do I become a senior carer?", "Usually by gaining experience, completing medication training and working towards a Level 3 qualification in adult care."],
    ],
  },
  {
    slug: "how-to-become-a-data-analyst",
    title: "How to become a data analyst: the skills and certifications that matter",
    description: "SQL, Excel, Power BI or Tableau, and basic statistics: what employers actually test, which certifications help, and a 3-month learning plan.",
    date: "2026-11-17",
    exam: "DAT",
    examHref: "/exam/DAT",
    tag: "📊 Tech careers",
    readMins: 6,
    body: `Data analysis is one of the most popular routes into tech without a computer science degree. Employers care much less about your degree than about whether you can **answer a business question with data**. Here's what that takes.

## The four core skills

- **SQL**: pulling data out of databases. SELECT, WHERE, JOINs, GROUP BY and, later, window functions. Most technical interviews include a SQL test
- **Excel**: still everywhere. XLOOKUP, pivot tables, conditional formulas and cleaning messy data
- **A BI tool**: **Power BI** (more common in UK corporate jobs) or **Tableau**. Building dashboards, data models and measures
- **Statistics basics**: averages and medians, spread, distributions, correlation vs causation, and simple significance

## Certifications that help

Certifications won't replace a portfolio, but they get your CV past filters and give you a structured way to learn:

- **Microsoft Power BI Data Analyst (PL-300)**: the most recognised BI certification in UK job adverts
- **Tableau certifications**, such as Tableau Desktop Specialist, if you're targeting Tableau roles
- Entry-level analytics certificates are a good starting point if you're brand new

## A 3-month plan

- **Month 1:** SQL and Excel. Practise daily with real questions, not just videos
- **Month 2:** Power BI or Tableau. Build two dashboards from public datasets (ONS, NHS or Kaggle data works well)
- **Month 3:** statistics, then a **portfolio project** that answers a real question end to end. Prepare for the certification exam alongside it

## Practise like the interview

Interview tasks are usually a short SQL test plus a take-home dashboard. The best preparation is solving many small, realistic questions: "Which region grew fastest?" "Which customers haven't ordered in 90 days?" Do that until the patterns feel natural.

Mock Night's [Data Analyst track](/exam/DAT) has practice for SQL, Excel, Power BI (PL-300), Tableau and statistics, with worked answers. It's a quick daily habit alongside your projects.`,
    faq: [
      ["Do I need a degree to become a data analyst?", "Not necessarily. Many employers hire on skills: SQL, Excel, a BI tool and the ability to explain findings. A portfolio of projects helps a lot."],
      ["Should I learn Power BI or Tableau?", "In the UK, Power BI appears in more job adverts, especially in corporate and public sector roles. Tableau is common in some industries. Learn one well first."],
      ["Is PL-300 worth it?", "It's the most recognised Power BI certification and helps your CV get noticed, especially alongside a portfolio."],
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
export const sortedPosts = () => [...POSTS].sort((a, b) => (b.updated ?? b.date).localeCompare(a.updated ?? a.date));
