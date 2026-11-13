# Mock Night UK pathways — combined release notes

This release contains 11 UK pathways / subject banks, with 100 original AI-authored practice questions in each bank (1,100 total).

## Existing and first-wave UK pathways
- Life in the UK Test (existing bank)
- Fire Marshal / Fire Warden (existing bank)
- NMC CBT (existing banks)
- Project Management (PRINCE2, Scrum, CAPM-style practice; existing banks)
- UK Driving Theory (DRV, 100)
- Functional Skills English Level 1 and Level 2 (FSE1/FSE2, 100 each)
- Functional Skills Maths Level 1 and Level 2 (FSM1/FSM2, 100 each)
- Care Certificate Revision (CAR, 100)

## Five additional UK pathways in this release
- CITB HS&E Operatives practice (CTH, 100)
- SIA Door Supervisor revision (SIAQ, 100)
- Food Safety & Hygiene Level 2 practice (FOD, 100)
- Care Workforce Essentials (CWR, 100)
- Workplace Health & Safety Essentials (WHS, 100)

The CITB pathway is scoped to Operatives practice. CITB's official Operatives test is 50 questions, 45 minutes and requires 45/50 (90%) to pass. The in-app pass target mirrors that published threshold, but questions are original practice items, not CITB questions. The SIA route is general Door Supervisor revision; the format and assessment requirements depend on the current licence-linked qualification and awarding organisation. It is not SIA-approved training or a qualification. Food Safety, Care Workforce and Workplace H&S are revision/learning pathways, not accredited certificates. The five new routes have suggested starter prices in `lib/pricing.ts` (£5.99 CITB, £7.99 SIA, £4.99 Food Safety, £4.99 Care Workforce and £4.99 Workplace H&S); review and approve these before production deployment.

## Website and Telegram navigation
- Every pathway card on `/exams` links to the web app with its pathway code. The web onboarding screen honours that requested pathway even for an existing signed-in learner, so clicking a different card switches the active pathway instead of silently retaining the previous one.
- `/app?track=CODE` opens the correct pathway selection; after saving, the shared web dashboard exposes daily practice and timed tests.

## Telegram behaviour
- `/exams` shows the tracks from the shared `TRACKS` catalogue.
- Each new route uses the existing single-subject Telegram daily quiz flow.
- The existing mock engine handles timed practice tests, scoring, explanations and progress.
- Functional Skills English and Maths remain level-selectable: learners select one level/subject before daily drills and mocks.

## Question publication model
Migration `0008_uk_practice_publication.sql` adds `practice_published`, separate from `reviewed`. AI-authored banks are inserted with `reviewed=false`, `practice_published=true`, and `source=ai-authored-practice-v1`. They are not human-reviewed, official exam questions, endorsed by CITB/SIA/DVSA/Skills for Care/FSA/HSE, or accredited assessments.

Care Certificate and Care Workforce practice cannot replace workplace observation, evidence or assessment by a suitably competent assessor. Driving Theory practice does not simulate hazard perception. SIA practice does not replace the required licence-linked qualification, first-aid prerequisites or an application to the SIA. Food handlers must receive training appropriate to their work; a practice quiz is not a food hygiene certificate.

## Install / deploy
1. Merge this ZIP into the existing Mock Night project; preserve `.git` and `.env.local`.
2. In Supabase SQL Editor, run migrations in order if not already applied: `0007_uk_tracks.sql`, `0008_uk_practice_publication.sql`, then `0009_uk_workplace_pathways.sql`.
3. In Terminal, from the project folder, pull production variables securely: `npx vercel env pull .env.local --environment=production`. Never share or commit `.env.local`.
4. Run the combined importer: `npx tsx scripts/uk/import-all-uk-banks.ts`. It validates 100 rows for each of the 11 banks, checks subject mappings, skips existing identical subject/body rows, publishes using `practice_published=true`, and verifies at least 100 published rows per bank.
5. Run `npm run typecheck && npm run build`.
6. If checks pass, commit and push to the connected production branch; Vercel should deploy automatically.
7. In Telegram, send `/exams`, select each new pathway, and test a daily drill and timed mock. Test CITB's 50-question/45-minute format and confirm the SIA route is labelled as practice only.

The importer is safe to rerun: identical subject/body rows are skipped. It does not modify existing questions, payment records or learner history. Do not run the import until all three SQL migrations have succeeded.
