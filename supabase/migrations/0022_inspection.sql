-- Inspection & integrity: welding inspector, API 510/570, coating inspector, plus drilling & production for Oil & gas. Safe to re-run.
insert into subjects (code, name, exams) values
  ('WIN', 'Welding inspection', '{WELDINSP}'),
  ('INS', 'In-service inspection (API 510/570)', '{APIINSP}'),
  ('COR', 'Coating & corrosion', '{COATING}'),
  ('ODP', 'Drilling & production', '{OILGAS}')
on conflict (code) do nothing;
update subjects set exams = array(select distinct unnest(exams || '{WELDINSP}'::text[])) where code = 'NDG';
