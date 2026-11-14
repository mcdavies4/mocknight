-- South Africa learner's licence (K53) and Matric, Kenya CPA (KASNEB). Safe to re-run.
insert into subjects (code, name, exams) values
  ('K53', 'Learner''s licence (K53)', '{SALEARN}'),
  ('KEL', 'Business law & tax (Kenya)', '{KCPA}')
on conflict (code) do nothing;
