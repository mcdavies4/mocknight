-- Question factory (lib/grow.ts): run log, live counts per subject, learner reports.
create table if not exists grow_runs (
  id bigserial primary key,
  step text,
  subject_code text not null,
  generated int not null default 0,
  verified int not null default 0,
  duplicates int not null default 0,
  inserted int not null default 0,
  rejected jsonb,
  error text,
  created_at timestamptz not null default now()
);
create index if not exists grow_runs_created_idx on grow_runs (created_at desc);

create table if not exists grow_batches (
  id bigserial primary key,
  subject_code text not null,
  candidates jsonb not null,
  status text not null default 'pending' check (status in ('pending', 'verifying', 'done')),
  created_at timestamptz not null default now()
);
create index if not exists grow_batches_pending_idx on grow_batches (status, created_at);

create or replace view bank_counts as
  select subject_code, count(*) filter (where reviewed or practice_published) as live, count(*) as total
  from questions group by subject_code;
alter view bank_counts set (security_invoker = true);

create table if not exists question_reports (
  question_id uuid not null references questions(id) on delete cascade,
  student_id uuid not null references students(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (question_id, student_id)
);

alter table grow_runs enable row level security;
alter table grow_batches enable row level security;
alter table question_reports enable row level security;
