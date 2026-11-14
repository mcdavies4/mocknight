-- PLAB 1 practice track. Safe to re-run.
insert into subjects (code, name, exams) values ('PLB', 'PLAB 1', '{PLAB}') on conflict (code) do nothing;
