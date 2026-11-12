# UK tracks: question-bank preparation

The UK pathways are registered in `lib/tracks.ts` and in Supabase migration
`0007_uk_tracks.sql`. They remain marked `launchStatus: "preparing"` until
their question banks have been authored, reviewed and imported. The Explore
page shows them as in preparation, and `/api/app/me` does not offer them in
learner onboarding yet.

## Subject codes

| Track | Subject code | Scope |
|---|---|---|
| DRIVE | DRV | Original Great Britain car-driving theory multiple-choice practice (not Northern Ireland) |
| FSE | FSE1 | Functional Skills English Level 1 |
| FSE | FSE2 | Functional Skills English Level 2 |
| FSM | FSM1 | Functional Skills Maths Level 1 |
| FSM | FSM2 | Functional Skills Maths Level 2 |
| CARE | CAR | Care Certificate revision |

Functional Skills onboarding requires the learner to choose exactly one level.
This keeps daily drills, review questions and practice mocks at the chosen
level. Level-specific mock variants are also exposed by the existing variant UI.

## JSON format

Use the existing `scripts/import-questions.ts` format:

```json
[
  {
    "subject": "DRV",
    "topic": "Road signs",
    "body": "An original practice question goes here.",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "answer": 1,
    "explanation": "Explain why option B is correct.",
    "difficulty": 2,
    "exams": ["DRIVE"]
  }
]
```

Use the matching subject code and exam code for every row. Do not rely on the
importer's default JAMB/WAEC exam values. Import new content without
`--reviewed`; only mark questions reviewed after a competent human reviewer
has checked factual accuracy, answer keys, explanations, accessibility and
level alignment.

## Content and product boundaries

- DRIVE is currently a 50-question multiple-choice practice set. The official
  car theory test also includes hazard perception; Mock Night must not imply
  this MCQ-only product simulates the complete official test. Write original
  questions and do not reproduce DVSA app or official question-bank content.
- Functional Skills qualifications are England-focused; do not market them as the equivalent qualification across Scotland, Wales or Northern Ireland. Questions are skills practice, not a complete assessment
  simulation. English qualifications can assess reading, writing and
  speaking/listening; Maths assessment formats and contexts vary by awarding
  organisation. Align content to the selected qualification/awarding
  organisation before making exam-format claims.
- CARE is revision support for the Care Certificate standards. It does not
  award the Care Certificate and does not replace employer-led learning,
  observation or workplace assessment. Check content against the current
  standards before review.
- Avoid describing these products as official, endorsed or accredited by
  DVSA, an awarding organisation, Skills for Care or another regulator.

## Import after review

After creating and reviewing a JSON file, use the existing importer, for example:

```bash
npm run import-questions -- data/uk/DRV.json --source=uk-driving-v1
```

Only add `--reviewed` after the review is complete. Confirm the Supabase
subject migration has been applied first.

## Release checklist

1. Apply `0007_uk_tracks.sql` in the correct Supabase project.
2. Import reviewed questions for every subject code.
3. Verify reviewed question counts and run a daily drill and practice mock
   for each level/track in a test account.
4. Confirm payment checkout and webhook fulfilment for each GBP plan.
5. Change each track's `launchStatus` from `preparing` to `active`.
6. Re-run typecheck and production build, then deploy.
