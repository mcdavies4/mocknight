-- Mock Night: additive UK learning tracks.
-- Run after migrations 0001-0006. Safe to re-run.

insert into subjects (code, name, exams) values
  ('DRV', 'UK Driving Theory', '{DRIVE}'),
  ('FSE1', 'Functional Skills English Level 1', '{FSE}'),
  ('FSE2', 'Functional Skills English Level 2', '{FSE}'),
  ('FSM1', 'Functional Skills Maths Level 1', '{FSM}'),
  ('FSM2', 'Functional Skills Maths Level 2', '{FSM}'),
  ('CAR', 'Care Certificate', '{CARE}')
on conflict (code) do nothing;
