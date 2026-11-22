-- Five more DMV permit tests: VA, NC, OH, IL, PA. Safe to re-run.
insert into subjects (code, name, exams) values
  ('VAD', 'Virginia driving rules', '{DMVVA}'),
  ('NCD', 'North Carolina driving rules', '{DMVNC}'),
  ('OHD', 'Ohio driving rules', '{DMVOH}'),
  ('ILD', 'Illinois driving rules', '{DMVIL}'),
  ('PAD', 'Pennsylvania driving rules', '{DMVPA}')
on conflict (code) do nothing;
update subjects set exams = '{DMVCA,DMVTX,DMVFL,DMVNY,DMVGA,DMVVA,DMVNC,DMVOH,DMVIL,DMVPA}' where code = 'USD';
