-- Africa expansion: Ethiopia University Exit Exam (by programme), Tanzania CSEE, Uganda UCE, Cameroon GCE O Level. Safe to re-run.
insert into subjects (code, name, exams) values
  ('EXC', 'Computer Science (exit exam)', '{ETEXIT}'),
  ('EXM', 'Management (exit exam)', '{ETEXIT}'),
  ('EXE', 'Economics (exit exam)', '{ETEXIT}'),
  ('EXA', 'Auditing, tax & finance', '{ETEXIT}'),
  ('TZC', 'Civics (Tanzania)', '{CSEE}'),
  ('UGC', 'Uganda general knowledge', '{UCE}'),
  ('CMC', 'Cameroon general knowledge', '{CMGCE}')
on conflict (code) do nothing;
