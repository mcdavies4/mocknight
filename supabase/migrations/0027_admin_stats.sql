-- Founder dashboard: one call returns users, activity, money, content and factory stats.
-- Only the service role (the app server) can call it.
create table if not exists admin_digests (digest_date date primary key, sent_at timestamptz not null default now());
alter table admin_digests enable row level security;

create or replace function admin_stats(p_trial_days int default 14)
returns jsonb language sql stable security definer set search_path = public as $$
  with
  t as (select date_trunc('day', now() at time zone 'Europe/London') at time zone 'Europe/London' as today),
  s as (select * from students),
  a7 as (select student_id, correct, created_at from attempts where created_at >= now() - interval '7 days'),
  pay as (select * from payments where status = 'success')
  select jsonb_build_object(
    'users', jsonb_build_object(
      'total', (select count(*) from s),
      'telegram', (select count(*) from s where telegram_id is not null),
      'web_only', (select count(*) from s where telegram_id is null),
      'blocked', (select count(*) from s where blocked),
      'new_today', (select count(*) from s, t where created_at >= t.today),
      'new_7d', (select count(*) from s where created_at >= now() - interval '7 days'),
      'new_30d', (select count(*) from s where created_at >= now() - interval '30 days'),
      'onboarded', (select count(*) from s where onboarding_step = 'done'),
      'paid_active', (select count(*) from s where premium_until > now()),
      'in_trial', (select count(*) from s where created_at >= now() - make_interval(days => p_trial_days) and (premium_until is null or premium_until <= now()))
    ),
    'activity', jsonb_build_object(
      'active_today', (select count(distinct student_id) from attempts, t where created_at >= t.today),
      'active_7d', (select count(distinct student_id) from a7),
      'active_30d', (select count(distinct student_id) from attempts where created_at >= now() - interval '30 days'),
      'answers_today', (select count(*) from attempts, t where created_at >= t.today),
      'answers_7d', (select count(*) from a7),
      'accuracy_7d', (select round(100.0 * avg(case when correct then 1 else 0 end)) from a7),
      'drills_done_7d', (select count(*) from drill_sessions where finished_at >= now() - interval '7 days'),
      'mocks_7d', (select count(*) from mock_attempts where submitted_at >= now() - interval '7 days'),
      'ai_explains_7d', (select count(*) from ai_requests where created_at >= now() - interval '7 days'),
      'essays_7d', (select count(*) from essay_reviews where created_at >= now() - interval '7 days'),
      'battles_7d', (select count(*) from battles where created_at >= now() - interval '7 days'),
      'reports_7d', (select count(*) from question_reports where created_at >= now() - interval '7 days')
    ),
    'money', jsonb_build_object(
      'today', (select coalesce(jsonb_object_agg(currency, jsonb_build_object('n', n, 'amount', amt)), '{}'::jsonb) from (select currency, count(*) n, sum(amount_kobo) amt from pay, t where paid_at >= t.today group by currency) x),
      'd7', (select coalesce(jsonb_object_agg(currency, jsonb_build_object('n', n, 'amount', amt)), '{}'::jsonb) from (select currency, count(*) n, sum(amount_kobo) amt from pay where paid_at >= now() - interval '7 days' group by currency) x),
      'd30', (select coalesce(jsonb_object_agg(currency, jsonb_build_object('n', n, 'amount', amt)), '{}'::jsonb) from (select currency, count(*) n, sum(amount_kobo) amt from pay where paid_at >= now() - interval '30 days' group by currency) x),
      'all', (select coalesce(jsonb_object_agg(currency, jsonb_build_object('n', n, 'amount', amt)), '{}'::jsonb) from (select currency, count(*) n, sum(amount_kobo) amt from pay group by currency) x),
      'top_plans_30d', (select coalesce(jsonb_agg(jsonb_build_object('plan', plan, 'n', n) order by n desc), '[]'::jsonb) from (select plan, count(*) n from pay where paid_at >= now() - interval '30 days' group by plan order by n desc limit 5) x),
      'pending_24h', (select count(*) from payments where status = 'pending' and created_at >= now() - interval '24 hours')
    ),
    'tracks', (select coalesce(jsonb_agg(jsonb_build_object('track', track, 'users', users, 'new_7d', new7, 'active_7d', act7) order by users desc), '[]'::jsonb) from (
        select s.track, count(*) users, count(*) filter (where s.created_at >= now() - interval '7 days') new7,
               count(*) filter (where exists (select 1 from a7 where a7.student_id = s.id)) act7
        from s where s.track is not null group by s.track order by users desc limit 15) x),
    'sources_30d', (select coalesce(jsonb_agg(jsonb_build_object('source', src, 'n', n) order by n desc), '[]'::jsonb) from (
        select coalesce(nullif(source, ''), case when referred_by is not null then 'referral' else 'direct' end) src, count(*) n
        from s where created_at >= now() - interval '30 days' group by 1 order by n desc limit 8) x),
    'content', jsonb_build_object(
      'live_questions', (select count(*) from questions where reviewed or practice_published),
      'factory_24h', (select count(*) from questions where source like 'ai-grow%' and created_at >= now() - interval '24 hours'),
      'factory_total', (select count(*) from questions where source like 'ai-grow%'),
      'factory_pending', (select count(*) from grow_batches where status = 'pending')
    )
  );
$$;
revoke all on function admin_stats(int) from public, anon, authenticated;
