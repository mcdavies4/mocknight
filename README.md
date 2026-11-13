# Mock Night

Exam practice for **JAMB, WAEC, Digital SAT and the Life in the UK Test**, on Telegram and on the web. Each "track" (`lib/tracks.ts`) defines its subjects, mock format, pass mark and pricing.

| Track | Where | Mock format | Payments |
|---|---|---|---|
| JAMB | Telegram + web | 15 per subject, 30 min, score /400; Sunday Mock Night | Paystack (₦) |
| WAEC | Telegram + web | 15 per subject, 30 min; Sunday Mock Night | Paystack (₦) |
| Life in the UK | Web + Telegram | 24 questions, 45 min, 18 to pass; readiness score | Stripe (£) |
| Post-UTME | Telegram + web | 12 per subject, 40 min | Paystack (₦) |
| WASSCE Ghana | Telegram + web | 15 per subject, 30 min; Mock Night (by region) | Free |
| Fire Marshal | Web + Telegram | 8 lesson modules + 20-question final (80%), PDF certificate 12 months | Stripe (£), company seats |
| Digital SAT | Telegram first | Reading and Writing Module 1: 27 questions / 32 min; Math Module 1: 22 questions / 35 min | No SAT-specific plan configured yet |

**Growth & learning features**
- Shareable result cards (`/api/card/[attemptId]`, share page `/r/[attemptId]`) with the sharer's invite link
- Referrals: `/join/CODE` or `t.me/BOT?start=r_CODE`; both sides get 3 Premium days when the friend finishes their first practice
- "Explain it to me" AI explanations (Claude Haiku), cached per question/answer, 3/day free, 40/day Premium
- Weekly parent reports by email (Sunday 6pm WAT) via Resend — `/parent email` in the bot or the web dashboard
- Connect Telegram to a web account (one shared account and progress)
- Courses: lessons in `data/courses/<TRACK>.json`, certificates (`/api/cert/[no]`, verify at `/verify/[no]`), 30-day expiry reminders, company dashboard with training records CSV

To add a track: add it to `lib/tracks.ts`, its plan to `lib/pricing.ts`, write a generator in `scripts/bank/`, then run `npm run build-bank` and import. Digital SAT is an initial Telegram-first pathway with original one-module practice banks in `data/sat/`; see `DIGITAL-SAT-README.md` for import steps and scope limits.

JAMB, WAEC and Digital SAT prep on Telegram:

- **Daily drill**: questions in the student's subjects at the time they choose. Questions are sent as native Telegram quiz polls, or as A–D buttons when a question is too long for a poll. Wrong answers go into a review box and come back after 1, 2, 4, 8 and 16 days until mastered.
- **Practice CBT**: a Telegram Mini App that works like the exam hall, with a timer, subject tabs, a question map, a calculator and A–D/N/P keyboard shortcuts. Answers autosave and resume after a dropped connection. It ends with a score per subject, a JAMB-style score out of 400 and a review of every question.
- **Mock Night** runs every Sunday at 8pm WAT. Every student gets the same questions, with 60 minutes to answer. Students get their national and state rank on Monday at 8am, and tutors' linked Telegram groups get their own leaderboard.
- **Tutors and tutorial centres**: create a group, share one join link, buy Premium seats for students, use a web dashboard to see who's practising, and get weekly results posted in their Telegram group.
- **Paystack**: student Premium (30 days or until the exam) and per-seat billing for tutors.

Stack: Next.js 15 (App Router) · grammY · Supabase (Postgres) · Paystack · Vercel.

---

## Setup (about 20 minutes)

### 1. Telegram bot
1. In @BotFather, use `/newbot` to get the token and choose a username.
2. Use `/mybots → Bot Settings → Allow Groups`: turn it **on**, so tutors can add the bot to their groups.
3. Use `/setprivacy`: set it to **Enabled** (the default). The bot only needs commands in groups.

### 2. Supabase
1. Create a project.
2. In the SQL Editor, paste and run `supabase/migrations/0001_init.sql`.
3. Copy the Project URL and the **service_role** key from Settings → API.


### Local environment files for scripts
Maintenance scripts load credentials in this order: `.env.import.local`, `.env.local`, then `.env` (shell variables take priority). For question imports, create `.env.import.local` in the project root with `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` from Supabase → Project Settings → API. Never paste the service-role key into chat or commit it to Git. Run `npm run check-env` to check whether required values are present; it never prints secret values.

For web sign-in, Vercel also needs `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` (the anon/public key, not the service-role key). Add them to the relevant Vercel environments and redeploy.

### 3. Paystack
1. Copy your secret key (start with `sk_test_…`).
2. Set the webhook URL in Paystack Settings → API Keys & Webhooks to `https://YOUR_APP/api/paystack/webhook`.

### 4. Deploy to Vercel
```bash
cp .env.example .env      # fill it in
npm install
git init && git add . && git commit -m "Mock Night MVP"
# push to GitHub (mcdavies4/mocknight), import into Vercel, and add the same env vars there
```

### 5. Load questions and connect the bot
```bash
npm run import-questions -- data/questions.seed.json --reviewed --source=seed
npm run set-webhook       # uses APP_URL from .env
```
Open your bot and press **Start**.

### 6. Hourly scheduler
`vercel.json` runs `/api/cron` every hour. **Vercel's Hobby plan only allows daily crons.** On Hobby, use a free external scheduler instead:
- [cron-job.org](https://cron-job.org): every hour at minute 0, call
  `GET https://YOUR_APP/api/cron?secret=YOUR_CRON_SECRET`

The hourly run sends daily drill reminders, creates Mock Night on Sunday at 6pm, sends the 6pm reminder and the 8pm "live" message, and posts results on Monday at 8am.

---

## Questions

The seed file has 56 original questions across English, Maths, Physics, Chemistry, Biology, Economics and Government. Have a teacher check them before launch. You'll need **at least 300 per subject** before going public.

**Drafting more with AI (a teacher must check every batch):**
```bash
npm run generate-questions -- CHM "Electrolysis" 20
# teacher checks data/generated/CHM-Electrolysis-....json, then:
npm run import-questions -- data/generated/CHM-Electrolysis-....json --reviewed --source=ai+teacher
```
Only questions marked `reviewed = true` or explicitly `practice_published = true` are served. `practice_published` is reserved for transparently labelled practice material that has not been independently human-reviewed.

**Adding a subject:** add its code to `OFFERED_SUBJECTS` in `lib/subjects.ts` once it has questions.

**Copyright:** don't scrape explanations from MySchool, Passnownow or other commercial sites. Write original questions or use ones you have rights to.

---

## Pricing (edit `lib/pricing.ts`)
| | Free | Premium |
|---|---|---|
| Daily drill | 10 questions | 20 questions |
| Practice CBT | 1 a week | Unlimited |
| Mock Night | ✅ | ✅ |

- Student: ₦1,500 for 30 days, or ₦4,000 for 120 days ("till exam")
- Tutor seats: ₦800 per student per 30 days. Seats go to the earliest-joined students first.

---

## Bot commands
**Students:** `/start`, `/drill`, `/cbt`, `/mocknight`, `/leaderboard`, `/stats`, `/premium`, `/settings`, `/time`, `/join CODE`

**Tutors:** `/newgroup Name`, `/mygroups`, `/seats N [CODE]`, `/dashboard`, `/linkgroup CODE` (send this inside their Telegram group)

---

## How things fit
```
app/api/telegram        ← Telegram webhook (grammY)
app/api/cron            ← hourly jobs (drill prompts, Mock Night, results)
app/api/mini/*          ← Mini App API (initData-verified): start / save / submit
app/api/paystack/webhook← payment confirmation (HMAC-SHA512 verified, idempotent)
app/mock                ← CBT Mini App
app/dashboard           ← tutor dashboard (magic link from /dashboard in the bot)
bot/                    ← all bot handlers and keyboards
lib/drill.ts            ← drill building, review box, quiz polls
lib/mock.ts             ← practice + weekly mocks, grading
lib/jobs.ts             ← scheduled jobs
supabase/migrations     ← schema + SQL functions
```

## Notes and limits
- **Paystack email:** Telegram gives no email address, so checkout uses `tg<id>@users.mocknight.app` as a placeholder. Collect a parent's email later if you want receipts to arrive.
- **Broadcasts** send about 25 messages per second. One cron run handles roughly 1,000–1,500 students inside Vercel's 60-second limit. Past that, move broadcasts to a queue such as Supabase Edge Functions or QStash.
- **Under-18s:** most WAEC candidates are minors. The app stores only a first name, school, state and scores. Keep it that way, and point payment messages at parents.

## Next: Post-UTME
The engine already supports it:
1. Add a `university` column to `questions`, and `target_university` to `students`.
2. Add a "Post-UTME" exam option in onboarding with a university picker.
3. Filter `pick_new_questions` / `pick_random_questions` by university.
4. Add per-university practice mocks (most use 50 questions in 30–60 minutes).


## UK pathway release
See `UK-PATHWAYS-RELEASE.md` for the four UK pathways and the 600-question import process. Apply migration `0008_uk_practice_publication.sql` after `0007_uk_tracks.sql`.

## UK pathway expansion
See [UK-PATHWAYS-RELEASE.md](./UK-PATHWAYS-RELEASE.md) for the combined 11-bank release, Telegram behaviour, content limitations and deployment sequence. The five added practice banks are imported with `npx tsx scripts/uk/import-all-uk-banks.ts` after migrations 0007–0009 are applied.
