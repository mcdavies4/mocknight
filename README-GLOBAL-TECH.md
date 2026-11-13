# Mock Night Global Technology Expansion

This is an additive implementation package for the existing `mcdavies4/mocknight` project.

## Included
- Five pathways: IT Support Fundamentals, Cisco CCST Networking, AWS Cloud Practitioner, Azure Fundamentals AZ-900 and Python/PCEP-30-03 aligned.
- USD one-off 90-day pathway passes using the existing Stripe one-time checkout.
- `/technology` catalogue page.
- Telegram `/tech` pathway picker using the existing onboarding callback and shared learning engine.
- Supabase subject migration `0010_global_technology.sql`.
- Question-bank importer that uses `practice_published=true` and `reviewed=false`.
- Official syllabus blueprint map.
- 50 original starter questions (10 per pathway) in `data/technology/questions.json`.

## Important commercial boundary
The existing Stripe integration uses Checkout `mode=payment`. This package adds individual one-off pathway passes, **not automatic recurring subscriptions**. Do not advertise auto-renewing all-access subscription until Stripe subscription checkout, renewal invoice handling, cancellation, failed-payment handling and subscription idempotency have been implemented and tested. The current database and webhook need a dedicated subscription ledger for that work.

## Apply
1. Extract the ZIP into the root of `~/Downloads/mocknight-git`.
2. Run the included `install_global_technology.py` from the project root.
3. Run `supabase/migrations/0010_global_technology.sql` in Supabase SQL Editor.
4. Run `npm install`, `npm run typecheck`, and `npm run build`.
5. Inspect `git diff` before staging. Do not replace `.env.local` or `.git`.

## Questions
After applying the package and running migration 0010, review `data/technology/questions.json`, then import it with `npm run import-technology-questions -- data/technology/questions.json`. The importer expects JSON rows containing `track`, `subject`, `objective`, `topic`, `body`, four `options`, zero-based `answer`, `explanation`, optional `difficulty`, and `source`.
The included 50-question bank is a small original AI-authored pilot, not a complete certification question bank and not independently human-verified. Review it before importing and expand it substantially before marketing full exam readiness. All imported AI-authored practice stays `reviewed=false`; the separate `practice_published` flag makes it available for practice.

## Independence notice
Questions must be original Mock Night material, not copied or leaked exam items. Mock Night is not endorsed by Cisco, AWS, Microsoft or Python Institute.
