-- Wave 2: OET, UCAT, KCSE, BECE, MDCAT. New subjects, and existing shared subjects tagged for the new exams. Safe to re-run.
insert into subjects (code, name, exams) values
  ('OEH', 'OET healthcare English', '{OET}'),
  ('UDM', 'Decision making', '{UCAT}'),
  ('USJ', 'Situational judgement', '{UCAT}'),
  ('ISC', 'Integrated Science', '{BECE}'),
  ('SST', 'Social Studies', '{BECE}')
on conflict (code) do nothing;
