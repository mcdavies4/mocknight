-- NCLEX-RN practice track. Safe to re-run.
insert into subjects (code, name, exams) values ('NCX', 'NCLEX-RN', '{NCLEX}') on conflict (code) do nothing;
