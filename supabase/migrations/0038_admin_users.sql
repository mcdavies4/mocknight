-- Founder-only user list for /admin (called with the service role from /api/admin/users).
create or replace function public.admin_users(p_limit int default 1000)
returns table (
  id uuid, name text, email text, telegram_username text, has_telegram boolean, source text, track text,
  created_at timestamptz, last_active timestamptz, answers bigint, answers_7d bigint, premium_until timestamptz, paid boolean
) language sql stable security definer set search_path = public as $$
  select s.id,
         coalesce(nullif(s.full_name, ''), s.first_name) as name,
         s.email, s.username, s.telegram_id is not null, s.source, s.track, s.created_at,
         a.last_active, coalesce(a.n, 0), coalesce(a.n7, 0), s.premium_until,
         exists (select 1 from payments p where p.student_id = s.id and p.status = 'success')
  from students s
  left join lateral (
    select max(created_at) last_active, count(*) n, count(*) filter (where created_at > now() - interval '7 days') n7
    from attempts where student_id = s.id
  ) a on true
  order by s.created_at desc
  limit greatest(1, least(p_limit, 5000));
$$;
revoke all on function public.admin_users(int) from public, anon, authenticated;
