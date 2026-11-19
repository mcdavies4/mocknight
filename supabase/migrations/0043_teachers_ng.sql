-- Nigerian teacher tracks (TRCN PQE, NTDCF teacher digital skills). Safe to re-run.
insert into subjects (code, name, exams) values
  ('PQP', 'Pedagogy (TRCN PQE)', '{TRCN}'),
  ('PQL', 'Literacy (TRCN PQE)', '{TRCN}'),
  ('PQN', 'Numeracy (TRCN PQE)', '{TRCN}'),
  ('PQI', 'ICT and digital teaching', '{TRCN,TEACHDIG}'),
  ('PQS', 'Safeguarding (TRCN PQE)', '{TRCN}')
on conflict (code) do nothing;
