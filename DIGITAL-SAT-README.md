# Digital SAT — Mock Night

This branch adds a Telegram-first Digital SAT pathway to Mock Night.

## What is included

- Digital SAT track in exam discovery and Telegram onboarding.
- Daily Telegram drills drawing from both SAT subjects.
- Timed Reading and Writing Module 1 practice: 27 original questions, 32 minutes.
- Timed Math Module 1 practice: 22 original questions, 35 minutes.
- Original practice items with explanations in `data/sat/`.

## Important scope note

These are original SAT-style practice questions, not College Board questions. The two timed tests each model the length and timing of one Digital SAT module. This release does **not** implement adaptive Module 2 routing or claim to reproduce the complete official SAT experience. Those are later enhancements. The included bank is one module-sized set per section (27 Reading and Writing items and 22 Math items), so expand and review the bank before a broad public launch; learners may otherwise see questions repeat.

## Import the question bank

1. Review the original questions in `data/sat/SRW.json` and `data/sat/SMT.json`.
2. Ensure your local `.env` has `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.
3. Import each subject into the existing `questions` table:

```bash
npm run import-questions -- data/sat/SRW.json --reviewed --source=mocknight-digital-sat-v1
npm run import-questions -- data/sat/SMT.json --reviewed --source=mocknight-digital-sat-v1
```

The `--reviewed` flag means the questions have been checked and may be served to learners. Review them before running these commands.

## Build and deploy

```bash
npm run typecheck
npm run build
```

Push this branch and open a pull request. Existing environment variables and Supabase schema are reused; no new secret is required.
