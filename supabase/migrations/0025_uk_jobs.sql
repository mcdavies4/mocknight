-- UK jobs newcomers take: senior carer (Level 3 knowledge), Emergency First Aid at Work, London PHV SERU, HGV/LGV theory & Driver CPC. Safe to re-run.
insert into subjects (code, name, exams) values
  ('CML', 'Senior care: medication & law', '{CARESR}'),
  ('EFA', 'Emergency first aid at work', '{FIRSTAID}'),
  ('SRU', 'SERU (London private hire)', '{SERU}'),
  ('LGV', 'HGV/LGV theory & Driver CPC', '{HGV}')
on conflict (code) do nothing;
