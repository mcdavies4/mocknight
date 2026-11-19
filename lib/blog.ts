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
    slug: "hsk-1-guide",
    title: "HSK 1 exam guide: format, vocabulary, pass mark and the HSK 3.0 change",
    description: "What the HSK 1 Chinese test looks like, how many words you need, the pass mark, the switch to HSK 3.0 from December 2026, and a simple plan to pass.",
    date: "2026-11-19",
    exam: "HSK",
    examHref: "/exam/HSK",
    tag: "🇨🇳 Chinese",
    readMins: 6,
    body: `**HSK 1** is the first level of the Hanyu Shuiping Kaoshi (汉语水平考试), China's official Chinese proficiency test. It shows you can understand and use very simple Chinese: greetings, numbers, dates, family, food and everyday questions. It's the usual first certificate for learners and a stepping stone towards study or scholarships in China.

## Big change: HSK 2.0 vs HSK 3.0

The HSK is moving to a new system, **HSK 3.0**, with nine levels in three stages (HSK 1–3 elementary, 4–6 intermediate, 7–9 advanced).

- **Exams up to 7 November 2026** used the old **HSK 2.0** format
- **From 13 December 2026**, regular HSK 1–6 sittings use the new **HSK 3.0** format

So if you're booking now, you're almost certainly taking the **new HSK 1**. Check the version with your test centre before you register.

## How many words do you need for HSK 1?

- **Old HSK 1 (2.0):** 150 words
- **New HSK 1 (3.0):** about **300 words** and around 250 characters to recognise

The new level is roughly twice as big, but it's still beginner Chinese: pronouns, numbers, time words, family, food and drink, common verbs (是, 有, 去, 来, 吃, 喝, 看, 买) and question words (什么, 谁, 哪儿, 几, 多少).

## HSK 1 exam format

HSK 1 tests **listening** and **reading** only, with no writing or speaking at levels 1 and 2. Questions are multiple choice, mostly matching sentences to pictures and choosing answers to short dialogues.

For reference, the **old HSK 1** had **40 questions (20 listening, 20 reading)** in about 40 minutes. It was scored out of **200**, with **120 to pass** and pinyin printed above every character.

The new HSK 1 keeps the listening-and-reading structure. Some old question types, like true/false picture questions, have been dropped. Chinese Testing International hadn't confirmed the final question count or pass mark for the new level at the time of writing, so **aim for at least 70% in practice** to be safe.

## Paper or computer, and dates

The HSK runs many times a year, on paper or as an internet-based test (IBT) at a centre, and in some countries as a home test. Register through the official Chinese Testing International site or your local Confucius Institute or test centre. Scores usually arrive within about a month, and score reports are valid for **two years** for university applications.

## A 6-week plan for the new HSK 1

- **Week 1:** Pinyin and tones. Get the four tones and the neutral tone right before memorising words
- **Weeks 2–3:** Learn 25–30 words a day with audio, starting with numbers, time and family
- **Week 4:** Core grammar: 是 sentences, 吗 and 呢 questions, 不 vs 没, measure words (个, 本, 口) and 了
- **Week 5:** Daily listening: numbers, prices, times and short dialogues
- **Week 6:** Timed mocks, then review every mistake

## Exam-day tips

- Read the answer options before each listening item plays
- Numbers and times are the most common traps: 四 (4) vs 十 (10), and 两 vs 二
- Don't leave blanks. There's no penalty for guessing

## Practise HSK with real audio

On Mock Night you can drill HSK characters, pinyin and grammar with explanations, and practise listening with **recorded Mandarin audio** you can slow down. Start free on [the HSK page](/exam/HSK) or in the Telegram bot.`,
    faq: [
      ["How many words are in HSK 1?", "The old HSK 1 (HSK 2.0) had 150 words. The new HSK 1 under HSK 3.0, used from December 2026, needs about 300 words."],
      ["What is the HSK 1 pass mark?", "On the old HSK 1 it was 120 out of 200. The new HSK 3.0 pass mark hadn't been confirmed at the time of writing, so aim for 70% or more in practice."],
      ["When does HSK 3.0 start?", "Regular HSK 1–6 exams switch to the HSK 3.0 format from 13 December 2026. Earlier 2026 sittings used HSK 2.0."],
      ["Does HSK 1 have speaking or writing?", "No. HSK 1 tests listening and reading only."],
      ["How long does it take to prepare for HSK 1?", "Most beginners need about 6–8 weeks of steady daily study for the new 300-word HSK 1."],
    ],
  },
  {
    slug: "leben-in-deutschland-test-guide",
    title: "Leben in Deutschland test: questions, pass mark, cost and how to pass (2026)",
    description: "An English guide to Germany's 'Leben in Deutschland' and citizenship test (Einbürgerungstest): 33 questions, 60 minutes, 15 or 17 to pass, €25 fee, the 310-question catalogue and how to prepare.",
    date: "2026-11-19",
    exam: "LID",
    examHref: "/exam/LID",
    tag: "🇩🇪 Moving to Germany",
    readMins: 6,
    body: `If you're settling in Germany or applying for German citizenship, you'll probably need the **"Leben in Deutschland" (Life in Germany) test**. It's the same test used as the **Einbürgerungstest** (citizenship test). Here's how it works, in English.

## One test, two pass marks

The Leben in Deutschland test and the Einbürgerungstest use the **same question catalogue and the same format**. The only difference is the score you need:

- **Leben in Deutschland (integration course / settlement):** at least **15 of 33**
- **Citizenship (Einbürgerung):** at least **17 of 33**

If you might apply for citizenship later, aim for 17 or more so one test covers both.

## Test format

- **33 multiple-choice questions**, each with four answers and one correct
- **60 minutes**
- **30 questions** on Germany in general, plus **3** about your federal state (Bundesland)
- On **paper**, supervised, at an approved test centre (often a Volkshochschule)
- The test is **in German**

## The 310-question catalogue

Every question that can appear is **published in advance** by the Federal Office for Migration and Refugees (BAMF). That's 300 general questions plus 10 for each federal state. The catalogue covers three areas:

- **Living in a democracy**: the Basic Law (Grundgesetz), basic rights, elections, the Bundestag and Bundesrat, the Chancellor and Federal President, courts and political parties
- **History and responsibility**: the Nazi era, the Holocaust, the division of Germany, the Berlin Wall, 1989–90 reunification, the EU and the euro
- **People and society**: equality, religious freedom, school and education, family, work and everyday life

Because every question is public, preparation is very effective. Learn the catalogue and you'll pass.

## Cost and booking

- The test costs **€25 per attempt** (as an external candidate)
- If you're on an **integration course**, you normally take it at the end of the orientation course
- Otherwise, book with an approved test centre. Your citizenship office (Einbürgerungsbehörde) can tell you where
- You can **retake it as often as you like**, paying the fee each time
- Bring valid **photo ID**
- Results arrive by post and can take **several weeks**

## How to prepare

- **Week 1:** Go through the general questions by topic, starting with the Basic Law and elections
- **Week 2:** History: dates around 1933–1945, 1949, 1961, 1989 and 1990
- **Week 3:** Society questions plus your 10 state questions
- **Final days:** Full 33-question mocks under a 60-minute timer until you score 30+ consistently

If your German is still developing, practise with **English translations alongside the German** so you understand each question, but always finish by reading it in German, because the real test is German-only.

## Practise in German with English help

On Mock Night, every Leben in Deutschland question is in German as in the real test, with an English translation and explanation. You can sit timed 33-question mocks marked against the 17-point citizenship pass mark. State questions aren't included yet, so study your 10 from the BAMF catalogue. Start free on [the Leben in Deutschland page](/exam/LID) or in the Telegram bot.`,
    faq: [
      ["How many questions do you need to pass the Leben in Deutschland test?", "15 out of 33 to pass the Leben in Deutschland test, or 17 out of 33 to use it for German citizenship."],
      ["How much does the Einbürgerungstest cost?", "€25 per attempt for external candidates. You can retake it as often as you need."],
      ["How long is the Leben in Deutschland test?", "60 minutes for 33 multiple-choice questions: 30 general and 3 about your federal state."],
      ["Is the Leben in Deutschland test in English?", "No. The test is in German only, but all 310 possible questions are published in advance so you can prepare."],
      ["Is the Leben in Deutschland test the same as the citizenship test?", "Yes. They use the same catalogue and format; only the pass mark differs (15 vs 17)."],
    ],
  },
  {
    slug: "jlpt-n5-guide",
    title: "JLPT N5 exam: format, pass mark, 2026–27 dates and how to pass",
    description: "A plain-English guide to the JLPT N5: the three test sections and timings, the 80/180 pass mark and sectional minimums, test dates, what to study and a 12-week plan.",
    date: "2026-11-19",
    exam: "JLPT",
    examHref: "/exam/JLPT",
    tag: "🇯🇵 Japanese",
    readMins: 7,
    body: `The **JLPT N5** is the first level of the Japanese-Language Proficiency Test, run by the Japan Foundation and JEES. It shows you can understand basic Japanese: hiragana, katakana, simple kanji and everyday phrases. It's a common first goal for learners, and a useful step if you're thinking about study or work in Japan.

## JLPT N5 exam dates

The JLPT runs twice a year on the **first Sunday of July and the first Sunday of December**. In 2026 that's **5 July** and **6 December**. Expect **early July and early December 2027** next.

Some cities only hold one sitting a year (several, including the US, run December only), so check your local host institution. Registration usually opens:

- **July test:** around March–April
- **December test:** around August–September

Seats often fill fast, so register as soon as your city opens.

## JLPT N5 exam format

The N5 has three test sections, about **90 minutes** in total:

- **Language Knowledge (Vocabulary):** 20 minutes. Kanji readings, writing words in kana or kanji, choosing the right word
- **Language Knowledge (Grammar) and Reading:** 40 minutes. Particles, sentence order and short reading passages
- **Listening:** 30 minutes. Short conversations and announcements, played once

All questions are multiple choice and answered on a mark sheet.

## JLPT N5 pass mark

You're scored out of **180**, in two scoring sections:

- Language Knowledge and Reading: **0–120**
- Listening: **0–60**

To pass you need **80 points overall** *and* at least **38 in Language Knowledge and Reading** *and* **19 in Listening**. Fall below either section minimum and you fail, even with a total above 80. That's why you can't skip listening practice.

## What to study for N5

The JLPT doesn't publish official word lists, but most learners aim for:

- **Hiragana and katakana**, fully. You can't pass without reading both fluently
- **About 100 kanji**: numbers, days, time words, people, places and basic verbs and adjectives (日, 月, 人, 山, 行, 来, 大, 小...)
- **About 700–800 words**: family, food, shopping, transport, school and daily routine
- **Core grammar**: は, が, を, に, で, へ, と, も, の; です/ます; ます-form past and negative; て-form requests (〜てください); adjectives; あります/います; counters (つ, 人, 枚, 本)
- **Listening**: numbers, prices, times and dates said at natural speed

## A 12-week study plan

- **Weeks 1–2:** Learn hiragana and katakana until you can read them without thinking
- **Weeks 3–6:** Core grammar and 20–30 new words a day; start the first 50 kanji
- **Weeks 7–9:** The remaining kanji, verb forms, counters and time expressions; daily listening
- **Weeks 10–11:** Timed section practice: 20 minutes of vocabulary, 40 of grammar and reading, 30 of listening
- **Week 12:** Two full mocks, then review every mistake

## Exam-day tips

- Arrive early. Late arrivals may miss the first section
- Bring your test voucher, photo ID and HB pencils with an eraser
- In listening, read the answer choices before the audio starts
- There's no penalty for wrong answers, so never leave a question blank

## Practise with real Japanese audio

On Mock Night you can drill N5 vocabulary, kanji, particles and verb forms with explanations, and practise listening with **recorded Japanese audio** you can slow down. Start free on [the JLPT page](/exam/JLPT) or in the Telegram bot.`,
    faq: [
      ["What is the JLPT N5 pass mark?", "80 out of 180 overall, plus at least 38/120 in Language Knowledge and Reading and 19/60 in Listening."],
      ["How long is the JLPT N5 exam?", "About 90 minutes: 20 minutes of vocabulary, 40 of grammar and reading, and 30 of listening."],
      ["When is the JLPT N5 held?", "On the first Sunday of July and December. In 2026 the dates are 5 July and 6 December. Some cities only hold one sitting a year."],
      ["How many kanji do I need for JLPT N5?", "There's no official list, but most learners aim for about 100 kanji and 700–800 words."],
      ["How long does it take to prepare for JLPT N5?", "Many beginners are ready in about 3 months of steady daily study, or sooner if they already read hiragana and katakana."],
    ],
  },
  {
    slug: "trcn-exam-guide",
    title: "TRCN exam 2026: date, number of questions, syllabus and how to pass",
    description: "Everything about the TRCN Professional Qualifying Examination (PQE): 2026 dates, how many questions, the five-part syllabus, the 50% pass mark, registration and a two-week study plan.",
    date: "2026-11-19",
    exam: "TRCN",
    examHref: "/exam/TRCN",
    tag: "🍎 Teaching in Nigeria",
    readMins: 6,
    body: `To work as a registered teacher in Nigeria, you need to pass the **Teachers Registration Council of Nigeria (TRCN) Professional Qualifying Examination (PQE)**. Pass it and you can be registered and licensed. Here's what's in the exam and how to get ready for it.

## TRCN exam date for 2026

TRCN holds the PQE twice a year, in a **May diet** and a **November diet**. Each diet runs in batches across the country. For **2026 Batch B (November)**, TRCN has told registered candidates to contact or visit their nearest TRCN office **from 9 November** to confirm their exact date, time and accreditation details.

You should get your exam date and venue by **SMS and email at least two weeks before** your sitting. If nothing arrives, go to your state TRCN office rather than relying on social media posts.

## How many questions are in the TRCN exam?

- **60 multiple-choice questions**
- **60 minutes**, so roughly one minute per question
- **Computer-based (CBT)** at an accredited centre
- **Pass mark: 50%**, so you need 30 correct

## TRCN exam syllabus

The PQE has five areas, each worth **20%** (about 12 questions each):

- **Pedagogy**: lesson planning, learning theories (Piaget, Vygotsky, Bloom), classroom management, assessment, and inclusive and learner-centred teaching
- **Literacy**: reading comprehension (the biggest slice), grammar, vocabulary, writing and professional communication
- **Numeracy**: percentages, ratios, averages, simple interest, reading tables and charts
- **ICT**: computer basics, files, internet and email, online safety, data protection (the NDPA 2023) and using technology in lessons
- **Safeguarding**: child protection, the Child's Rights Act, spotting signs of abuse, reporting concerns and professional conduct

Because every area carries the same weight, don't skip one you find boring. A weak ICT or safeguarding score drags down good pedagogy marks.

## Who takes which exam

- **PQE**: the main exam for graduates with a teaching qualification (NCE, B.Ed., PGDE and similar)
- **PQEI**: for final-year education students, so you can qualify before or soon after graduating
- **IPQE**: for people already teaching who need to regularise their status

Check your category with TRCN when you register. Your qualification decides which one you take and what you pay.

## How to register

Registration is online at TRCN's CBT portal. You'll need:

- an email address and phone number you can access
- your **11-digit NIN**
- your highest qualification certificate (or matric number if you're still waiting for it)

TRCN reviews your qualification and sets your category. Payment then opens, and your exam number is issued once payment is confirmed. Registering is done online, but you **sit the exam in person** at a CBT centre.

## A two-week study plan

- **Days 1–2:** Take a full timed mock to find your weak areas
- **Days 3–5:** Pedagogy: learning theories, Bloom's taxonomy, lesson plans, formative vs summative assessment
- **Days 6–7:** Numeracy: practise percentages, ratios and data questions until they're quick
- **Days 8–9:** ICT and data protection
- **Days 10–11:** Safeguarding and the Child's Rights Act
- **Day 12:** Literacy: comprehension passages, grammar and vocabulary
- **Days 13–14:** Two more full mocks under exam timing, then review every question you got wrong

## Exam-day tips

- Arrive early with your exam slip and ID
- With 60 questions in 60 minutes, don't spend more than a minute on any question. Flag it and move on
- There's no negative marking on a standard multiple-choice CBT, so answer every question
- Read each question fully. Words like "NOT", "BEST" and "FIRST" change the answer

## Practise in the real format

On Mock Night you can practise all five TRCN areas with explanations for every answer, and sit full 60-question, 60-minute mocks in the same CBT style. Start free on [the TRCN PQE page](/exam/TRCN) or in the Telegram bot.`,
    faq: [
      ["How many questions are in the TRCN exam?", "The TRCN PQE has 60 multiple-choice questions in 60 minutes, split equally across pedagogy, literacy, numeracy, ICT and safeguarding."],
      ["What is the TRCN exam pass mark?", "50%. You need at least 30 of the 60 questions right."],
      ["When is the TRCN exam in 2026?", "TRCN holds the PQE in May and November diets. For the 2026 November (Batch B) diet, candidates were told to confirm their date and time with their nearest TRCN office from 9 November."],
      ["Can the TRCN exam be done online?", "You register online, but you sit the exam in person on a computer at an accredited CBT centre."],
      ["What is on the TRCN exam syllabus?", "Five areas at 20% each: pedagogy, literacy, numeracy, ICT and safeguarding."],
    ],
  },
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
  {
    slug: "csca-exam-guide",
    title: "CSCA exam guide: the new test for studying in China",
    description: "What the China Scholastic Competency Assessment (CSCA) covers, how long each paper is, fees, test dates and a simple plan to prepare for maths, physics and chemistry.",
    date: "2026-11-18",
    exam: "CSCA",
    examHref: "/exam/CSCA",
    tag: "🇨🇳 Study in China",
    readMins: 6,
    body: `If you want a bachelor's degree in China, especially on a Chinese Government Scholarship, there's now a new step: the **China Scholastic Competency Assessment (CSCA)**. It's run by the China Scholarship Council and is designed to check that international students are ready for undergraduate study. Here's what you need to know.

## Who has to take it

From the 2026/27 academic year, most applicants to undergraduate programmes at universities in the Chinese Government Scholarship scheme must include CSCA scores. Any student planning to study in China can take it, and a good score can strengthen an application anywhere.

## The subjects

- **Mathematics**: required for almost everyone
- **Physics** and **Chemistry**: optional, depending on your university and programme. Science, engineering, agriculture and medicine applicants usually need at least one
- **Professional Chinese**: for Chinese-taught programmes, in a humanities or STEM version

Maths, physics and chemistry can be taken **in English or Chinese**. Always check your university's subject list for your exact programme.

## Format and timing

- **Maths, physics and chemistry:** 48 multiple-choice questions in 60 minutes each
- **Professional Chinese:** 80 questions in 90 minutes
- Every subject is scored out of 100
- Sittings run **five times a year**: January, March, April, June and December

You can sit it on a computer at a test centre, on paper at a test centre, or online from home with a live proctor, depending on what's offered in your country.

## Fees

The fee is **450 yuan for one subject** and **700 yuan for two or more**. Results usually arrive within about a week for computer and online tests, and within two weeks for paper tests.

## How to prepare

The science papers test solid secondary-school knowledge, similar to WAEC, A-Level or IB, but at speed: 48 questions in an hour is about 75 seconds each.

- **Weeks 1–2:** revise the core topics. In maths: algebra, functions, trigonometry, sequences, basic calculus and probability. In physics: mechanics, electricity and waves. In chemistry: moles, acids, bonding and organic basics
- **Weeks 3–4:** daily timed practice. Redo every question you get wrong until you can do it fast
- **Final week:** full 48-question papers under the 60-minute limit

Mock Night's [CSCA practice](/exam/CSCA) has maths, physics and chemistry in the real 48-question, 60-minute format. Questions you miss come back until you've got them. For Chinese, use our [HSK track](/exam/HSK).

## Before you book

- Check your university's CSCA subject list for your programme
- Sit early enough for scores to reach your application deadline
- Make sure your name matches your passport exactly`,
    faq: [
      ["Is the CSCA compulsory?", "It's required for most undergraduate applicants to universities in the Chinese Government Scholarship scheme from the 2026/27 academic year. Other universities may also ask for it, so check with yours."],
      ["Can I take the CSCA in English?", "Yes. Mathematics, physics and chemistry are offered in English and Chinese."],
      ["How much does the CSCA cost?", "450 yuan for a single subject and 700 yuan for two or more subjects."],
      ["How many questions are on each CSCA paper?", "48 multiple-choice questions in 60 minutes for maths, physics and chemistry. Professional Chinese has 80 questions in 90 minutes."],
    ],
  },
  {
    slug: "eps-topik-guide",
    title: "EPS-TOPIK guide: the Korean test for working in Korea",
    description: "What EPS-TOPIK is, how the reading and listening sections work, the workplace Korean you need, and a 6-week plan to prepare for an E-9 job in Korea.",
    date: "2026-11-18",
    exam: "EPSTOPIK",
    examHref: "/exam/EPSTOPIK",
    tag: "🇰🇷 Work in Korea",
    readMins: 5,
    body: `South Korea's **Employment Permit System (EPS)** lets workers from partner countries take jobs in manufacturing, construction, farming, fishing and services on an **E-9 visa**. The first step is the **EPS-TOPIK** Korean test, run by HRD Korea.

## What the test looks like

EPS-TOPIK has two sections, **reading** and **listening**, and every question is **multiple choice with four options**. There's no writing and no speaking.

The exact number of questions, timing and pass score depend on your country and the test round, so always check the official notice from HRD Korea or your country's sending agency. Some countries also run a separate skills test.

## What you need to know

The Korean in EPS-TOPIK is practical. Expect:

- **Hangul**: reading the alphabet quickly and accurately
- **Workplace safety**: signs like 위험 (danger), 비상구 (emergency exit) and 금연 (no smoking), and equipment such as 안전모 (safety helmet) and 장갑 (gloves)
- **Work life**: 출근 and 퇴근 (going to and leaving work), 월급 (monthly salary), 야근 (overtime)
- **Daily life**: shopping, prices, directions, health, transport
- **Numbers**: both native Korean (하나, 둘, 셋) and Sino-Korean (일, 이, 삼) numbers, for time, money and dates

## Listening is where people lose marks

Many candidates read well but freeze on audio: short announcements, workplace instructions and conversations at normal speed. Practise listening **every day**, not just in the last week.

## A 6-week plan

- **Weeks 1–2:** master Hangul and numbers. Learn 10–15 workplace words a day
- **Weeks 3–4:** grammar basics (을/를, 이/가, 에서, past tense, ~지 마세요) and short reading passages
- **Weeks 5–6:** daily timed practice of both sections, plus listening drills at normal speed and slower

Mock Night's [EPS-TOPIK practice](/exam/EPSTOPIK) includes **listening questions**: your phone reads the Korean aloud, with a slower option. There are also workplace and safety vocabulary and grammar drills, and questions you miss come back until you know them.`,
    faq: [
      ["Is EPS-TOPIK the same as TOPIK?", "No. TOPIK is a general Korean proficiency test for study and other visas. EPS-TOPIK is a separate test for workers applying under the Employment Permit System (E-9)."],
      ["Does EPS-TOPIK have writing or speaking?", "No. It has reading and listening sections only, all multiple choice with four options."],
      ["How do I register for EPS-TOPIK?", "Through the EPS agency in your country, which announces test dates, fees and quotas. Check their official notice before you pay anyone."],
    ],
  },
  {
    slug: "pnle-nursing-board-exam-guide",
    title: "PNLE 2027: how to pass the Philippine nursing board exam",
    description: "The PNLE format (five Nursing Practice tests, 500 items), the 75% / 60% passing rule, the new February and August schedule, and a review plan that works.",
    date: "2026-11-18",
    exam: "PNLE",
    examHref: "/exam/PNLE",
    tag: "🩺 Philippines nursing",
    readMins: 6,
    body: `The **Philippine Nurse Licensure Examination (PNLE)**, also called the NLE or nursing board exam, is the PRC exam every BSN graduate must pass to become a registered nurse in the Philippines. It's also the first step for many nurses planning to work abroad.

## The format

- **Five Nursing Practice (NP) tests**, 100 items each: **500 items** in total
- **Two days**, paper-based, two hours per test
- Multiple choice with four options
- NP I to NP III on day 1, NP IV and NP V on day 2

The tests cover community health nursing, care of mothers and children, medical-surgical nursing, psychiatric nursing, and high-acuity and emergency care, under the Board of Nursing's enhanced table of specifications.

## The passing rule

Under **RA 9173 (Philippine Nursing Act of 2002)** you need a **general average of 75%**, with **no subject below 60%**. One very weak subject can sink you even if your average is fine, so don't neglect any area.

## The new schedule

From 2026 the PRC moved the PNLE to a **February and August** cycle. Passing rates can swing a lot between sittings: the November 2025 exam had a record **90.04%**, while February 2026 dropped to **44.24%**. Candidates with less review time were hit hardest. Plan your review around the sitting you're aiming for, not the one after.

## What examiners love to test

- **Priorities:** ABCs, Maslow, which patient to see first
- **Safety:** medication rights, injection angles, when to hold digoxin, antidotes (protamine for heparin, vitamin K for warfarin, naloxone for opioids)
- **Labs:** normal sodium, potassium, glucose, ABGs
- **Infection control:** airborne vs droplet vs contact precautions
- **Maternal and child:** APGAR, fetal heart rate, growth and development
- **Nursing law and ethics:** RA 9173 and patient rights

## A 10-week review plan

- **Weeks 1–6:** one Nursing Practice area at a time, with 30–50 board-style questions a day
- **Weeks 7–8:** mixed practice across all five areas, and redo every wrong answer
- **Weeks 9–10:** full 100-item tests under the 2-hour limit. Aim for 80% or more so you have a buffer

Mock Night's [PNLE practice](/exam/PNLE) has board-style questions with clear rationales, and questions you miss come back until you've got them. It works on the web or in Telegram, a few minutes at a time.`,
    faq: [
      ["What is the passing score for the PNLE?", "A general average of 75%, with no subject rating below 60%, as set by RA 9173."],
      ["How many items are on the PNLE?", "500: five Nursing Practice tests of 100 items each, over two days."],
      ["When is the PNLE held?", "From 2026, the PRC schedules the PNLE in February and August. Check the PRC's official schedule for exact dates and filing deadlines."],
    ],
  },
  {
    slug: "cissp-exam-guide",
    title: "CISSP exam guide: format, domains and how to think like a manager",
    description: "The CISSP CAT format (100–150 questions, 3 hours, 700/1000), the eight domains and their weights, the experience requirement and a 12-week study plan.",
    date: "2026-11-18",
    exam: "CISSP",
    examHref: "/exam/CISSP",
    tag: "🛡️ Cybersecurity",
    readMins: 6,
    body: `**CISSP** from ISC2 is one of the most respected certifications in cybersecurity. It's aimed at experienced practitioners moving into senior, architect and leadership roles, and it often appears in job adverts for security managers.

## The exam at a glance

- **Computerized Adaptive Testing (CAT):** the exam adjusts to your answers
- **100 to 150 questions** in up to **3 hours**
- **Passing score: 700 out of 1,000**
- Multiple choice plus advanced item types such as drag-and-drop
- You can't go back to earlier questions, and the exam can end as soon as it's confident of a pass or fail
- The fee is about **US$749**

The current exam outline has been in force since 15 April 2024.

## The eight domains

- Security and Risk Management: **16%**
- Asset Security: **10%**
- Security Architecture and Engineering: **13%**
- Communication and Network Security: **13%**
- Identity and Access Management: **13%**
- Security Assessment and Testing: **12%**
- Security Operations: **13%**
- Software Development Security: **10%**

## Experience

To be certified you need **five years of paid work** in at least two of the eight domains. A relevant degree or approved credential can remove one year. If you pass without the experience, you can become an **Associate of ISC2** while you build it.

## Think like a manager

The classic CISSP trap is choosing the most technical answer. The exam usually wants what a risk-aware manager would do: protect people first, follow policy, involve the right stakeholders, and pick the control that best fits the business risk. When two answers look right, ask which one **addresses the root cause** or **comes first in the process**.

## A 12-week plan

- **Weeks 1–8:** one domain per week, giving more time to Risk Management and Security Operations. Do 30–50 practice questions after each one
- **Weeks 9–10:** mixed-domain practice. Review why the tempting wrong answers are wrong
- **Weeks 11–12:** full timed sessions of 100–150 questions to build stamina

Mock Night's [CISSP practice](/exam/CISSP) covers all eight domains, including risk calculations (SLE, ALE), security models (Bell–LaPadula, Biba, Brewer–Nash), cryptography, IAM and incident response. Questions you miss come back until you've got them.`,
    faq: [
      ["How many questions are on the CISSP exam?", "Between 100 and 150 on the adaptive (CAT) exam, with up to 3 hours to finish. You need 700 out of 1,000 to pass."],
      ["Can I take CISSP without five years of experience?", "Yes. You can sit the exam and become an Associate of ISC2, then earn full CISSP once you have the required experience."],
      ["Which CISSP domain has the highest weight?", "Security and Risk Management, at 16% under the outline effective 15 April 2024."],
    ],
  },
  {
    slug: "az-104-exam-guide",
    title: "AZ-104 guide: how to pass Microsoft Azure Administrator",
    description: "AZ-104 format, the five skill areas and their weights, the 700 pass mark and a 6-week plan with hands-on labs to become an Azure Administrator Associate.",
    date: "2026-11-18",
    exam: "AZ104",
    examHref: "/exam/AZ104",
    tag: "☁️ Cloud",
    readMins: 5,
    body: `**AZ-104** earns you **Microsoft Certified: Azure Administrator Associate**. It's the most popular hands-on Azure certification and a common requirement for cloud support, cloud engineer and infrastructure roles.

## The exam at a glance

- About **40–60 questions** in **100 minutes**: multiple choice, case studies and scenario questions
- **Passing score: 700** on Microsoft's 1–1,000 scale
- **US$165** in the US (prices vary by country)
- Taken at a Pearson VUE centre or online
- The skills outline was last updated on **17 April 2026**

## The five skill areas

- Manage Azure identities and governance: **20–25%**
- Implement and manage storage: **15–20%**
- Deploy and manage Azure compute resources: **20–25%**
- Implement and manage virtual networking: **15–20%**
- Monitor and maintain Azure resources: **10–15%**

## What catches people out

AZ-104 isn't AZ-900 with more facts. It tests **what you would actually do** as an administrator. The usual weak spots:

- **RBAC vs Azure Policy:** RBAC controls *who* can do something; Policy controls *what* is allowed
- **Storage redundancy:** LRS vs ZRS vs GRS vs GZRS, and when to use each access tier
- **Networking:** NSG rule priority, peering not being transitive, and when to use a private endpoint
- **Availability:** availability sets vs zones vs scale sets
- **Backup vs Site Recovery:** restoring data versus failing over a whole workload

## A 6-week plan

- **Weeks 1–4:** one or two skill areas a week. Build each thing in a free Azure account, then do 30 practice questions on it
- **Week 5:** mixed practice. Redo every question you got wrong
- **Week 6:** timed sessions. Book the exam when you're scoring 80% or more consistently

Mock Night's [AZ-104 practice](/exam/AZ104) covers identity, governance, storage, compute, networking, monitoring and backup, with a short explanation for every answer.`,
    faq: [
      ["How long is the AZ-104 exam?", "100 minutes, with about 40–60 questions. You need 700 out of 1,000 to pass."],
      ["Do I need AZ-900 before AZ-104?", "No. There's no prerequisite, but AZ-900 knowledge helps, and Microsoft suggests some hands-on experience with Azure."],
      ["Does AZ-104 expire?", "Associate certifications are valid for a year and can be renewed for free with an online assessment on Microsoft Learn."],
    ],
  },
];

export const postBySlug = (slug: string) => POSTS.find((p) => p.slug === slug);
export const sortedPosts = () => [...POSTS].sort((a, b) => (b.updated ?? b.date).localeCompare(a.updated ?? a.date));
