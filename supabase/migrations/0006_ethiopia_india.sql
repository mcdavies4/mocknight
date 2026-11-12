-- Ethiopia Grade 12 (ETH) and India SSC (SSC) tracks.
-- ENG, MTH, PHY, CHM, BIO, ECO are shared with the existing school banks.
insert into subjects (code, name, exams) values
  ('APT', 'Aptitude & reasoning', '{ETH,SSC}'),
  ('QNT', 'Quantitative aptitude', '{SSC}'),
  ('GAI', 'General awareness', '{SSC}'),
  ('HIS', 'History', '{ETH}'),
  ('GEO', 'Geography', '{ETH}')
on conflict (code) do nothing;
