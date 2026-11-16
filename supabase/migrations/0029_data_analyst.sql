-- Data Analyst path: SQL, Excel, Power BI PL-300, Tableau and statistics alongside the existing data analytics bank. Safe to re-run.
insert into subjects (code, name, exams) values
  ('SQQ', 'SQL', '{DAT}'),
  ('XLQ', 'Excel', '{DAT}'),
  ('PBI', 'Power BI (PL-300)', '{DAT}'),
  ('TBL', 'Tableau', '{DAT}'),
  ('STQ', 'Statistics', '{DAT}')
on conflict (code) do nothing;
