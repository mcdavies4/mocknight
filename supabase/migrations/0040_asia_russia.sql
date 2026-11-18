-- China, Asia and Russia tracks. Safe to re-run.
insert into subjects (code, name, exams) values
  ('HSC', 'Chinese (HSK)', '{HSK}'),
  ('CSM', 'Mathematics (CSCA)', '{CSCA}'),
  ('CPH', 'Physics (CSCA)', '{CSCA}'),
  ('CCH', 'Chemistry (CSCA)', '{CSCA}'),
  ('JPN', 'Japanese (JLPT / JFT-Basic)', '{JLPT}'),
  ('KOR', 'Korean (EPS-TOPIK)', '{EPSTOPIK}'),
  ('PNL', 'Nursing practice (PNLE)', '{PNLE}'),
  ('LTE', 'Teaching (LET)', '{LET}'),
  ('SGD', 'Singapore road rules', '{SGBTT}'),
  ('RUS', 'Russian (TORFL)', '{TORFL}'),
  ('RMG', 'Russian language, history and law', '{RUMIG}')
on conflict (code) do nothing;
