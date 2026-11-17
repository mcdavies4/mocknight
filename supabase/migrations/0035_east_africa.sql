-- East Africa: UACE, ACSEE, Rwanda S6, CPA Uganda and Tanzania, Kenya/Uganda/Tanzania/Rwanda driving theory. Safe to re-run.
insert into subjects (code, name, exams) values
  ('RSG', 'Road signs and safe driving', '{KEDRV,UGDRV,TZDRV,RWDRV}'),
  ('EAL', 'Keep-left road rules', '{KEDRV,UGDRV,TZDRV}'),
  ('KDR', 'Kenya traffic rules', '{KEDRV}'),
  ('RDR', 'Rwanda traffic rules', '{RWDRV}')
on conflict (code) do nothing;
