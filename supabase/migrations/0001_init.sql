-- Mock Night — initial schema
-- Run in Supabase SQL editor (or `supabase db push`).
-- All access goes through the server with the service-role key; RLS is on with no policies,
-- so the anon key can read nothing.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Subjects
-- ---------------------------------------------------------------------------
create table if not exists subjects (
  code text primary key,
  name text not null,
  exams text[] not null default '{JAMB,WAEC}'
);

insert into subjects (code, name) values
  ('ENG', 'English'),
  ('MTH', 'Mathematics'),
  ('PHY', 'Physics'),
  ('CHM', 'Chemistry'),
  ('BIO', 'Biology'),
  ('ECO', 'Economics'),
  ('GOV', 'Government'),
  ('LIT', 'Literature in English'),
  ('CRS', 'CRS'),
  ('IRS', 'IRS'),
  ('GEO', 'Geography'),
  ('COM', 'Commerce'),
  ('ACC', 'Accounting'),
  ('AGR', 'Agricultural Science')
on conflict (code) do nothing;

-- ---------------------------------------------------------------------------
-- Students (every Telegram user, including tutors)
-- ---------------------------------------------------------------------------
create table if not exists students (
  id uuid primary key default gen_random_uuid(),
  telegram_id bigint unique not null,
  first_name text,
  username text,
  exam text check (exam in ('JAMB', 'WAEC')),
  subjects text[] not null default '{}',
  state text,
  school text,
  drill_hour smallint not null default 19 check (drill_hour between 0 and 23), -- WAT hour
  onboarding_step text not null default 'exam',  -- exam | subjects | state | school | time | done
  premium_until timestamptz,
  last_drill_prompt date,
  blocked boolean not null default false,          -- user blocked the bot
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Question bank
-- ---------------------------------------------------------------------------
create table if not exists questions (
  id uuid primary key default gen_random_uuid(),
  subject_code text not null references subjects(code),
  exams text[] not null default '{JAMB,WAEC}',
  topic text,
  body text not null,
  options text[] not null check (array_length(options, 1) between 2 and 5),
  answer_index smallint not null,
  explanation text,
  difficulty smallint not null default 2 check (difficulty between 1 and 3),
  reviewed boolean not null default false,   -- only reviewed questions are served
  source text,                               -- 'seed' | 'ai' | 'teacher:<name>' ...
  created_at timestamptz not null default now(),
  check (answer_index >= 0 and answer_index < array_length(options, 1))
);
create index if not exists questions_subject_reviewed on questions (subject_code) where reviewed;
create unique index if not exists questions_body_uniq on questions (subject_code, md5(body));

-- ---------------------------------------------------------------------------
-- Answers, spaced repetition, drills
-- ---------------------------------------------------------------------------
create table if not exists attempts (
  id bigserial primary key,
  student_id uuid not null references students(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  chosen smallint,
  correct boolean not null,
  context text not null check (context in ('drill', 'mock')),
  created_at timestamptz not null default now()
);
create index if not exists attempts_student_time on attempts (student_id, created_at desc);
create index if not exists attempts_student_question on attempts (student_id, question_id);

-- Leitner-style review box: wrong answers come back 1, 2, 4, 8, 16 days later until mastered.
create table if not exists review_items (
  student_id uuid not null references students(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  due_on date not null,
  interval_days smallint not null default 1,
  primary key (student_id, question_id)
);
create index if not exists review_due on review_items (student_id, due_on);

create table if not exists drill_sessions (
  id uuid primary key default gen_random_uuid(),
  student_id uuid not null references students(id) on delete cascade,
  drill_date date not null,                   -- WAT date
  question_ids uuid[] not null,
  review_count int not null default 0,        -- how many of question_ids came from the review box
  position int not null default 0,
  correct int not null default 0,
  finished_at timestamptz,
  created_at timestamptz not null default now(),
  unique (student_id, drill_date)
);

-- One row per question message sent in a drill (quiz poll or button message)
create table if not exists drill_messages (
  id bigserial primary key,
  session_id uuid not null references drill_sessions(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  poll_id text unique,
  answered boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- Mocks (practice CBT + weekly Mock Night)
-- ---------------------------------------------------------------------------
create table if not exists mocks (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('practice', 'weekly')),
  title text not null,
  owner_student_id uuid references students(id) on delete cascade, -- practice only
  starts_at timestamptz not null default now(),
  ends_at timestamptz,                -- weekly: last moment you can START
  duration_minutes int not null,
  per_subject int not null,
  results_posted boolean not null default false,
  reminder_sent boolean not null default false,
  opened_sent boolean not null default false,
  created_at timestamptz not null default now()
);
create unique index if not exists mocks_weekly_unique on mocks (starts_at) where kind = 'weekly';

create table if not exists mock_questions (
  mock_id uuid not null references mocks(id) on delete cascade,
  question_id uuid not null references questions(id) on delete cascade,
  subject_code text not null,
  position int not null,
  primary key (mock_id, question_id)
);

create table if not exists mock_attempts (
  id uuid primary key default gen_random_uuid(),
  mock_id uuid not null references mocks(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  subjects text[] not null,
  started_at timestamptz not null default now(),
  deadline timestamptz not null,
  submitted_at timestamptz,
  answers jsonb not null default '{}'::jsonb,   -- { question_id: chosen_index }
  raw_score int,
  total int,
  per_subject jsonb,                            -- { ENG: {correct, total, pct} }
  scaled_score numeric,                         -- average % across subjects (0-100)
  duration_seconds int,
  unique (mock_id, student_id)
);

-- ---------------------------------------------------------------------------
-- Tutorial groups (tutor / tutorial-centre owners)
-- ---------------------------------------------------------------------------
create table if not exists tutor_groups (
  id uuid primary key default gen_random_uuid(),
  owner_student_id uuid not null references students(id) on delete cascade,
  name text not null,
  join_code text unique not null,
  paid_seats int not null default 0,
  paid_until timestamptz,
  telegram_chat_id bigint,          -- linked Telegram group for weekly result posts
  created_at timestamptz not null default now()
);

create table if not exists group_members (
  group_id uuid not null references tutor_groups(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  has_seat boolean not null default false,
  joined_at timestamptz not null default now(),
  primary key (group_id, student_id)
);

-- ---------------------------------------------------------------------------
-- Payments (Paystack)
-- ---------------------------------------------------------------------------
create table if not exists payments (
  reference text primary key,
  student_id uuid not null references students(id) on delete cascade,
  group_id uuid references tutor_groups(id) on delete set null,
  plan text not null check (plan in ('student_month', 'student_season', 'seats')),
  seats int,
  amount_kobo int not null,
  status text not null default 'pending' check (status in ('pending', 'success', 'failed')),
  paid_at timestamptz,
  created_at timestamptz not null default now()
);

-- ---------------------------------------------------------------------------
-- RLS on, no policies (service role only)
-- ---------------------------------------------------------------------------
alter table subjects enable row level security;
alter table students enable row level security;
alter table questions enable row level security;
alter table attempts enable row level security;
alter table review_items enable row level security;
alter table drill_sessions enable row level security;
alter table drill_messages enable row level security;
alter table mocks enable row level security;
alter table mock_questions enable row level security;
alter table mock_attempts enable row level security;
alter table tutor_groups enable row level security;
alter table group_members enable row level security;
alter table payments enable row level security;

-- ---------------------------------------------------------------------------
-- Functions
-- ---------------------------------------------------------------------------

-- Reviewed questions in a subject the student has never answered
create or replace function pick_new_questions(p_student uuid, p_subject text, p_limit int)
returns setof questions
language sql stable as $$
  select q.* from questions q
  where q.reviewed and q.subject_code = p_subject
    and not exists (
      select 1 from attempts a where a.student_id = p_student and a.question_id = q.id
    )
  order by random()
  limit p_limit;
$$;

-- Any reviewed questions in a subject (fallback when the student has seen everything)
create or replace function pick_random_questions(p_subject text, p_limit int, p_exclude uuid[] default '{}')
returns setof questions
language sql stable as $$
  select q.* from questions q
  where q.reviewed and q.subject_code = p_subject and not (q.id = any(p_exclude))
  order by random()
  limit p_limit;
$$;

create or replace function mock_leaderboard(p_mock uuid, p_limit int default 10, p_group uuid default null)
returns table (
  rank bigint, student_id uuid, first_name text, state text, school text,
  scaled_score numeric, duration_seconds int
)
language sql stable as $$
  select rank() over (order by a.scaled_score desc, a.duration_seconds asc) as rank,
         s.id, s.first_name, s.state, s.school, a.scaled_score, a.duration_seconds
  from mock_attempts a
  join students s on s.id = a.student_id
  where a.mock_id = p_mock and a.submitted_at is not null
    and (p_group is null or exists (
      select 1 from group_members gm where gm.group_id = p_group and gm.student_id = s.id))
  order by rank
  limit p_limit;
$$;

create or replace function mock_ranks(p_mock uuid)
returns table (student_id uuid, telegram_id bigint, rank bigint, total bigint, scaled_score numeric, state_rank bigint, state text)
language sql stable as $$
  select s.id, s.telegram_id,
         rank() over (order by a.scaled_score desc, a.duration_seconds asc),
         count(*) over (),
         a.scaled_score,
         rank() over (partition by s.state order by a.scaled_score desc, a.duration_seconds asc),
         s.state
  from mock_attempts a
  join students s on s.id = a.student_id
  where a.mock_id = p_mock and a.submitted_at is not null;
$$;

create or replace function group_member_stats(p_group uuid)
returns table (
  student_id uuid, first_name text, username text, school text, state text, has_seat boolean,
  answered_7d bigint, correct_7d bigint, drills_7d bigint,
  last_mock_score numeric, last_mock_at timestamptz
)
language sql stable as $$
  select s.id, s.first_name, s.username, s.school, s.state, gm.has_seat,
    (select count(*) from attempts a where a.student_id = s.id and a.created_at > now() - interval '7 days'),
    (select count(*) from attempts a where a.student_id = s.id and a.correct and a.created_at > now() - interval '7 days'),
    (select count(*) from drill_sessions d where d.student_id = s.id and d.finished_at > now() - interval '7 days'),
    lm.scaled_score, lm.submitted_at
  from group_members gm
  join students s on s.id = gm.student_id
  left join lateral (
    select ma.scaled_score, ma.submitted_at
    from mock_attempts ma join mocks m on m.id = ma.mock_id
    where ma.student_id = s.id and m.kind = 'weekly' and ma.submitted_at is not null
    order by ma.submitted_at desc limit 1
  ) lm on true
  where gm.group_id = p_group
  order by s.first_name;
$$;
