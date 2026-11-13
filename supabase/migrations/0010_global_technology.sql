-- Mock Night: first global technology pathways. Safe to re-run.
insert into subjects (code, name, exams) values
  ('ITF', 'IT Support Fundamentals', '{ITF}'),
  ('CCN', 'Cisco CCST Networking', '{CCST}'),
  ('AWC', 'AWS Cloud Practitioner', '{AWS}'),
  ('AZF', 'Azure Fundamentals', '{AZF}'),
  ('PCE', 'Python Programming Foundations', '{PYT}')
on conflict (code) do nothing;
