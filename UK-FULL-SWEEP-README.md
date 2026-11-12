# Mock Night — UK full-sweep update

This ZIP is based on the project archive supplied for the UK expansion. It is
designed to be extracted over the existing `~/Downloads/mocknight-git`
working copy. The ZIP intentionally excludes `.git`, `.env*`, `.vercel`,
`node_modules` and `.next`, so your Git history, local secrets and installed
dependencies are not overwritten.

## Included changes

- Retains the existing 11 tracks and adds DRIVE, FSE, FSM and CARE.
- Registers six new subject codes through Supabase migration
  `supabase/migrations/0007_uk_tracks.sql`.
- Adds four GBP Stripe plans to the existing pricing registry.
- Adds all four pathways to the Explore page.
- Makes Functional Skills onboarding require one selected level (Level 1 or
  Level 2), so daily drills and practice mocks do not mix levels.
- Keeps new tracks out of web onboarding and Telegram track selection until
  their question banks are reviewed.
- Adds UK question-bank authoring and release guidance under `docs/`.

## Important release status

The four new tracks are intentionally marked `launchStatus: "preparing"`.
They are visible on the Explore page as in preparation, but learners cannot
select them yet. No UK question banks have been supplied or imported as part
of this code update. Do not change these statuses to `active` until reviewed
questions have been imported and verified for every subject code.

The new Stripe plan prices are launch-test proposals, not confirmed market
pricing. No payment processing code or Stripe configuration was changed.

## Apply locally

1. Keep a backup of your current project folder.
2. Extract this ZIP into `~/Downloads`, allowing it to merge into the existing
   `mocknight-git` folder.
3. In Terminal:

   ```bash
   cd ~/Downloads/mocknight-git
   npm ci
   npm run typecheck
   npm run build
   ```

4. Review `docs/UK-TRACKS-QUESTION-BANK.md`.
5. Do not apply the migration or deploy until the question-bank and release
   checks in that document are complete.

No environment variables, API keys, service-role keys or local Supabase
credentials are included in this ZIP.
