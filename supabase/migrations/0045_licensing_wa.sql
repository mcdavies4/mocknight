-- Ghana GTLE, PCN PEP and MLSCN. Safe to re-run.
insert into subjects (code, name, exams) values
  ('GTE', 'Essential professional skills (GTLE)', '{GTLE}'),
  ('PHM', 'Pharmacy practice (PCN)', '{PCNPEP}'),
  ('MLS', 'Medical laboratory science (MLSCN)', '{MLSCN}')
on conflict (code) do nothing;
update subjects set exams = array(select distinct unnest(exams || '{GTLE}'::text[])) where code in ('PQL','PQN');
