-- GCSE, Civil Service JT, TOEFL, Duolingo, CDL, Ontario G1, CompTIA A+, Security+, CCNA, JUPEB, NABTEB, NMCN, USMLE, Gulf pharmacist and doctor. Safe to re-run.
insert into subjects (code, name, exams) values
  ('GCM', 'GCSE Maths', '{GCSE}'),
  ('GEL', 'GCSE English Language', '{GCSE}'),
  ('CSJ', 'Civil Service judgement', '{CSJT}'),
  ('AEN', 'Academic English', '{TOEFL,DUOLINGO}'),
  ('CDL', 'CDL general knowledge', '{CDL}'),
  ('OG1', 'Ontario driving rules and signs', '{G1ON}'),
  ('APL', 'CompTIA A+', '{APLUS}'),
  ('SYP', 'CompTIA Security+', '{SEC}'),
  ('CCX', 'Cisco CCNA', '{CCNA}'),
  ('NGN', 'Nursing practice (Nigeria)', '{NMCN}'),
  ('USM', 'USMLE basic sciences', '{USMLE,GULFDR}'),
  ('GPH', 'Pharmacy practice (Gulf)', '{GULFPH}')
on conflict (code) do nothing;
