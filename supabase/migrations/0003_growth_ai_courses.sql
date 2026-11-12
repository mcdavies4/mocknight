-- Mock Night — growth, AI explanations, courses & certificates
-- Run AFTER 0001 and 0002, in the Supabase SQL Editor. Safe to re-run.

-- New subjects
insert into subjects (code, name, exams) values ('FIR', 'Fire Safety', '{FIRE}')
on conflict (code) do nothing;

-- ---------------------------------------------------------------------------
-- Students: referrals, parents, certificate name
-- ---------------------------------------------------------------------------
alter table students add column if not exists ref_code text unique;
alter table students add column if not exists referred_by uuid references students(id) on delete set null;
alter table students add column if not exists referral_rewarded_at timestamptz;
alter table students add column if not exists parent_email text;
alter table students add column if not exists full_name text;
alter table students add column if not exists parent_report_sent date;
alter table students add column if not exists link_code text unique;
alter table students add column if not exists link_code_expires timestamptz;

alter table students alter column ref_code set default upper(substr(md5(gen_random_uuid()::text), 1, 8));

-- Backfill referral codes for existing students
update students set ref_code = upper(substr(md5(id::text || random()::text), 1, 7)) where ref_code is null;

-- ---------------------------------------------------------------------------
-- AI explanations: shared cache + per-student usage log (for daily limits)
-- ---------------------------------------------------------------------------
create table if not exists ai_explanations (
  question_id uuid not null references questions(id) on delete cascade,
  chosen smallint not null,
  text text not null,
  created_at timestamptz not null default now(),
  primary key (question_id, chosen)
);
create table if not exists ai_requests (
  id bigserial primary key,
  student_id uuid not null references students(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  created_at timestamptz not null default now()
);
create index if not exists ai_requests_student_day on ai_requests (student_id, created_at desc);

-- ---------------------------------------------------------------------------
-- Courses: lesson progress and certificates
-- ---------------------------------------------------------------------------
create table if not exists lesson_progress (
  student_id uuid not null references students(id) on delete cascade,
  track text not null,
  lesson_id text not null,
  completed_at timestamptz not null default now(),
  primary key (student_id, track, lesson_id)
);

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  cert_no text unique not null,
  student_id uuid not null references students(id) on delete cascade,
  track text not null,
  full_name text not null,
  score_pct numeric not null,
  issued_at timestamptz not null default now(),
  expires_at timestamptz not null,
  reminder_sent boolean not null default false
);
create index if not exists certificates_student on certificates (student_id, track, issued_at desc);

-- ---------------------------------------------------------------------------
-- Company / tutor groups can be billed in GBP
-- ---------------------------------------------------------------------------
alter table tutor_groups add column if not exists currency text not null default 'NGN';

-- ---------------------------------------------------------------------------
-- RLS on (service role only)
-- ---------------------------------------------------------------------------
alter table ai_explanations enable row level security;
alter table ai_requests enable row level security;
alter table lesson_progress enable row level security;
alter table certificates enable row level security;

-- ---------------------------------------------------------------------------
-- Merge a Telegram-only account into a web account (used when linking)
-- ---------------------------------------------------------------------------
create or replace function merge_students(p_keep uuid, p_drop uuid)
returns void
language plpgsql as $$
declare
  d students%rowtype;
begin
  if p_keep = p_drop then return; end if;
  select * into d from students where id = p_drop;
  if not found then return; end if;

  update attempts set student_id = p_keep where student_id = p_drop;

  insert into review_items (student_id, question_id, due_on, interval_days)
    select p_keep, question_id, due_on, interval_days from review_items where student_id = p_drop
    on conflict do nothing;

  update drill_sessions set student_id = p_keep
    where student_id = p_drop and drill_date not in (select drill_date from drill_sessions where student_id = p_keep);

  update mock_attempts set student_id = p_keep
    where student_id = p_drop and mock_id not in (select mock_id from mock_attempts where student_id = p_keep);

  update mocks set owner_student_id = p_keep where owner_student_id = p_drop;

  insert into group_members (group_id, student_id, has_seat, joined_at)
    select group_id, p_keep, has_seat, joined_at from group_members where student_id = p_drop
    on conflict do nothing;

  update tutor_groups set owner_student_id = p_keep where owner_student_id = p_drop;
  update payments set student_id = p_keep where student_id = p_drop;
  update certificates set student_id = p_keep where student_id = p_drop;
  update ai_requests set student_id = p_keep where student_id = p_drop;
  insert into lesson_progress (student_id, track, lesson_id, completed_at)
    select p_keep, track, lesson_id, completed_at from lesson_progress where student_id = p_drop
    on conflict do nothing;
  update students set referred_by = p_keep where referred_by = p_drop;

  -- Free the unique telegram_id, then move it across
  update students set telegram_id = null where id = p_drop;
  update students k set
    telegram_id = d.telegram_id,
    username = coalesce(k.username, d.username),
    premium_until = greatest(k.premium_until, d.premium_until),
    drill_hour = case when k.onboarding_step = 'done' then k.drill_hour else d.drill_hour end,
    track = case when k.onboarding_step = 'done' then k.track else d.track end,
    exam = case when k.onboarding_step = 'done' then k.exam else d.exam end,
    subjects = case when k.onboarding_step = 'done' then k.subjects else d.subjects end,
    state = coalesce(k.state, d.state),
    school = coalesce(k.school, d.school),
    referred_by = coalesce(k.referred_by, d.referred_by),
    onboarding_step = case when k.onboarding_step = 'done' or d.onboarding_step = 'done' then 'done' else k.onboarding_step end,
    blocked = false
  where k.id = p_keep;

  delete from students where id = p_drop;
end $$;
