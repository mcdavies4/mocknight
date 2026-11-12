-- Mock Night — Project Management track (PRINCE2 7 Foundation, Scrum PSM I, PMI CAPM)
-- Run AFTER 0001–0004. Safe to re-run.
insert into subjects (code, name, exams) values
  ('PRN', 'PRINCE2 7 Foundation', '{PM}'),
  ('SCR', 'Scrum (PSM I)', '{PM}'),
  ('PMF', 'PM fundamentals (CAPM)', '{PM}')
on conflict (code) do nothing;
