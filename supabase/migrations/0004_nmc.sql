-- Mock Night — NMC CBT track (Part A numeracy + Part B clinical)
-- Run AFTER 0001–0003. Safe to re-run.

insert into subjects (code, name, exams) values
  ('NMN', 'NMC Numeracy (Part A)', '{NMC}'),
  ('NMC', 'NMC Clinical (Part B)', '{NMC}')
on conflict (code) do nothing;

-- Practice tests can be a specific variant of a track (e.g. NMC Part A or Part B)
alter table mocks add column if not exists variant text;
