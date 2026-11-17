-- Middle East & Gulf: UAE driving theory, UAE teacher licence, Gulf lab/physio/dentist, Dubai PIC food safety, SIRA. Safe to re-run.
insert into subjects (code, name, exams) values
  ('UDR', 'UAE driving theory', '{UAEDRV}'),
  ('TLP', 'Teaching pedagogy (UAE TLS)', '{UAETLS}'),
  ('LAB', 'Medical laboratory science', '{GULFLAB}'),
  ('PHT', 'Physiotherapy', '{GULFPT}'),
  ('DEN', 'General dentistry', '{GULFDEN}'),
  ('PIC', 'Food safety (Dubai PIC)', '{DUBAIPIC}'),
  ('SRA', 'Security guarding (SIRA)', '{SIRA}')
on conflict (code) do nothing;
