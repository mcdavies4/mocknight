-- PM: APM PFQ and Agile/Product Owner; tech: Business Analyst, ISC2 CC, AWS SAA, AI certs, Salesforce Admin. Safe to re-run.
insert into subjects (code, name, exams) values
  ('APM', 'APM PFQ', '{PM}'),
  ('AGP', 'Agile & Product Owner', '{PM}'),
  ('BAF', 'Business analysis', '{BA}'),
  ('ICC', 'ISC2 Certified in Cybersecurity', '{ISC2CC}'),
  ('SAA', 'AWS Solutions Architect Associate', '{AWSSAA}'),
  ('AIF', 'AI fundamentals', '{AICERT}'),
  ('SFA', 'Salesforce Administrator', '{SFADMIN}')
on conflict (code) do nothing;
