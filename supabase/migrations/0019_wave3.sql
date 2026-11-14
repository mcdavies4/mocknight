-- Wave 3: NEET, JEE Main, GRE/GMAT, Philippine CSE, AAT, Nigeria recruitment tests. Only PHC is a new subject. Safe to re-run.
insert into subjects (code, name, exams) values ('PHC', 'General information (Philippines)', '{CSEPH}') on conflict (code) do nothing;
