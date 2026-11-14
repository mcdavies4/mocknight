-- NDT (non-destructive testing): general theory plus PT, MT, UT and RT. Safe to re-run.
insert into subjects (code, name, exams) values
  ('NDG', 'NDT general theory', '{NDT}'),
  ('NPT', 'Penetrant testing (PT)', '{NDT}'),
  ('NMT', 'Magnetic particle testing (MT)', '{NDT}'),
  ('NUT', 'Ultrasonic testing (UT)', '{NDT}'),
  ('NRT', 'Radiography & radiation safety (RT)', '{NDT}')
on conflict (code) do nothing;
