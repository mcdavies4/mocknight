-- Daily series for the web stats dashboard (/admin). Server-only: callable with the service role.
create or replace function admin_timeseries(p_days int default 30)
returns jsonb
language sql stable security definer
set search_path to 'public'
as $$
  with days as (
    select generate_series(
      (date_trunc('day', now() at time zone 'Europe/London') - make_interval(days => greatest(least(p_days, 180), 7) - 1))::date,
      (now() at time zone 'Europe/London')::date, interval '1 day')::date as d),
  st as (select (created_at at time zone 'Europe/London')::date d, telegram_id is not null tg from students
         where created_at >= now() - make_interval(days => p_days + 1)),
  at as (select (created_at at time zone 'Europe/London')::date d, student_id, correct from attempts
         where created_at >= now() - make_interval(days => p_days + 1)),
  mk as (select (submitted_at at time zone 'Europe/London')::date d from mock_attempts
         where submitted_at >= now() - make_interval(days => p_days + 1)),
  py as (select (paid_at at time zone 'Europe/London')::date d, currency, amount_kobo from payments
         where status = 'success' and paid_at >= now() - make_interval(days => p_days + 1))
  select jsonb_build_object(
    'days', (select jsonb_agg(jsonb_build_object(
        'date', days.d,
        'signups_telegram', (select count(*) from st where st.d = days.d and st.tg),
        'signups_web', (select count(*) from st where st.d = days.d and not st.tg),
        'active', (select count(distinct student_id) from at where at.d = days.d),
        'answers', (select count(*) from at where at.d = days.d),
        'correct', (select count(*) from at where at.d = days.d and at.correct),
        'mocks', (select count(*) from mk where mk.d = days.d),
        'payments', (select count(*) from py where py.d = days.d)
      ) order by days.d) from days),
    'revenue_by_currency', (select coalesce(jsonb_object_agg(currency, amt), '{}'::jsonb)
        from (select currency, sum(amount_kobo) amt from py group by currency) x),
    'retention', (select jsonb_build_object(
        'cohort', count(*),
        'd1', count(*) filter (where exists (select 1 from attempts a where a.student_id = s.id and a.created_at >= s.created_at + interval '1 day' and a.created_at < s.created_at + interval '2 days')),
        'd7', count(*) filter (where exists (select 1 from attempts a where a.student_id = s.id and a.created_at >= s.created_at + interval '7 days' and a.created_at < s.created_at + interval '8 days')))
        from students s where s.created_at between now() - interval '38 days' and now() - interval '8 days'),
    'top_subjects_7d', (select coalesce(jsonb_agg(jsonb_build_object('subject', subject_code, 'answers', n, 'accuracy', acc) order by n desc), '[]'::jsonb)
        from (select q.subject_code, count(*) n, round(100.0 * avg(case when a.correct then 1 else 0 end)) acc
              from attempts a join questions q on q.id = a.question_id
              where a.created_at >= now() - interval '7 days' group by 1 order by 2 desc limit 10) x)
  );
$$;

revoke execute on function admin_timeseries(int) from public, anon, authenticated;
revoke execute on function search_questions(text, int) from public, anon, authenticated;
