-- Expansion: citizenship (US, Canada, Australia), Gulf nursing, IELTS, graduate aptitude, Bank PO, PMP,
-- ACCA / ICAN, ITIL 4, Six Sigma, UK 11+, NECO. Safe to re-run.
insert into subjects (code, name, exams) values
  ('USC', 'US civics', '{USCIT}'),
  ('CAN', 'Discover Canada', '{CANCIT}'),
  ('AUS', 'Australian citizenship', '{AUSCIT}'),
  ('GNX', 'Gulf nursing (Prometric)', '{GULFN}'),
  ('IEV', 'IELTS grammar & vocabulary', '{IELTS}'),
  ('VRB', 'Verbal reasoning', '{GRAD}'),
  ('PMP', 'PMP', '{PM}'),
  ('ABT', 'Business & Technology', '{ACCA,ICAN}'),
  ('AMA', 'Management Accounting', '{ACCA,ICAN}'),
  ('AFA', 'Financial Accounting', '{ACCA,ICAN}'),
  ('ITL', 'ITIL 4 Foundation', '{ITIL}'),
  ('SSG', 'Lean Six Sigma Green Belt', '{SIXSIG}'),
  ('VRS', '11+ verbal reasoning', '{ELEVEN}'),
  ('ELM', '11+ maths', '{ELEVEN}')
on conflict (code) do nothing;

create table if not exists essay_reviews (
  id bigserial primary key,
  student_id uuid not null references students(id) on delete cascade,
  words int,
  band text,
  created_at timestamptz not null default now()
);
create index if not exists essay_reviews_student_idx on essay_reviews (student_id, created_at desc);
alter table essay_reviews enable row level security;
