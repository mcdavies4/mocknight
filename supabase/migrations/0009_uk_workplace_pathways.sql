-- Add five UK workplace and professional revision pathways.
-- Safe to re-run; no existing subjects or questions are changed.
insert into subjects (code, name, exams) values
  ('CTH', 'CITB HS&E Operatives Practice', '{CITB}'),
  ('SIAQ', 'SIA Door Supervisor Revision', '{SIA}'),
  ('FOD', 'Food Safety and Hygiene Level 2', '{FOOD}'),
  ('CWR', 'Care Workforce Essentials', '{CAREW}'),
  ('WHS', 'Workplace Health and Safety Essentials', '{HSE}')
on conflict (code) do nothing;
