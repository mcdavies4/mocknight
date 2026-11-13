# Mock Night — Supabase/API key configuration repair

This update does not add or remove exam tracks, subjects, plans, question banks, or database migrations. It only makes local maintenance scripts load credentials consistently, validates missing/placeholder Supabase values before connecting, adds a value-safe environment check, and protects local env files from Git commits.

## 1. Local question-import credentials

In the project root, create a file named `.env.import.local` containing:

```dotenv
SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
SUPABASE_SERVICE_ROLE_KEY=YOUR-SUPABASE-SERVICE-ROLE-KEY
```

Replace both placeholders using Supabase → Project Settings → API. Use the Project URL and the server-side `service_role` key (or the equivalent secret key supplied by your Supabase project). Do not use the anon/public key for imports. Do not paste the service-role key into chat, screenshots, GitHub, or a `NEXT_PUBLIC_` variable.

Local script lookup order is `.env.import.local`, `.env.local`, then `.env`; shell environment variables take priority. The importer now stops with a clear message if either value is missing or still a placeholder.

## 2. Check local configuration without exposing secrets

```bash
npm run check-env
```

The command prints only `AVAILABLE` or `MISSING / PLACEHOLDER` for each variable. It never prints the values.

## 3. Vercel production configuration

In Vercel → Mock Night project → Settings → Environment Variables, ensure the relevant values are configured for Production (and Preview/Development if those deployments are used):

| Variable | Value to use |
|---|---|
| `SUPABASE_URL` | Supabase Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side service-role/secret key; never public |
| `NEXT_PUBLIC_SUPABASE_URL` | Same Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key; safe for browser use |

Do not put `SUPABASE_SERVICE_ROLE_KEY` into a `NEXT_PUBLIC_` variable. Save changes and redeploy the production deployment so the running app receives the new environment.

## 4. Verify

After adding the local credentials:

```bash
npm run check-env
```

Then, when the question JSON file is ready:

```bash
npm run import-questions -- data/bank/all.json --reviewed --source=bank-v1
```

Only use `--reviewed` after the question content has actually been checked. The importer does not change course catalogue configuration.

For the deployed app, open `/api/health?secret=YOUR_CRON_SECRET` using the existing cron secret. The health endpoint reports whether the environment variables are present and checks database connectivity without printing the secret values. Keep the secret out of screenshots and chat.
