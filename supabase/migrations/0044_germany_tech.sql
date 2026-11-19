-- Germany (LiD, German A1) and ISTQB, PSM I, Network+. Safe to re-run.
insert into subjects (code, name, exams) values
  ('LDT', 'Leben in Deutschland', '{LID}'),
  ('GER', 'German A1', '{GERA1}'),
  ('TST', 'Software testing (ISTQB)', '{ISTQB}'),
  ('SCM', 'Scrum (PSM I)', '{PSM}'),
  ('NTP', 'Networking (Network+)', '{NETPLUS}')
on conflict (code) do nothing;
