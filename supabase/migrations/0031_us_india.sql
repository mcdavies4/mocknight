-- US exams (GED, ATI TEAS, CNA, ASVAB) and India exams (UPSC Prelims, RRB, CTET, CAT). Safe to re-run.
insert into subjects (code, name, exams) values
  ('GSS', 'Social Studies (US)', '{GED}'),
  ('GSC', 'General Science', '{GED,ASVAB}'),
  ('TSC', 'TEAS Science (anatomy & physiology)', '{TEAS}'),
  ('CNA', 'Nurse aide skills', '{CNA}'),
  ('AMC', 'Mechanical Comprehension', '{ASVAB}'),
  ('AEI', 'Electronics Information', '{ASVAB}'),
  ('IPL', 'Indian Polity', '{UPSC}'),
  ('IEC', 'Indian Economy', '{UPSC}'),
  ('ENV', 'Environment & Ecology', '{UPSC}'),
  ('CDP', 'Child Development & Pedagogy', '{CTET}')
on conflict (code) do nothing;
