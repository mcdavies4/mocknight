-- Mock Night career pathways expansion. Safe to re-run.
INSERT INTO subjects (code, name, exams)
VALUES
  ('SECQ', 'Cybersecurity Fundamentals', '{SEC}'),
  ('DAQ', 'Data Analytics Foundations', '{DAT}'),
  ('AIQ', 'AI and Workplace Automation', '{AIA}'),
  ('CONQ', 'Construction and Site Management Essentials', '{CON}'),
  ('BKQ', 'Bookkeeping and Payroll Foundations', '{BKP}')
ON CONFLICT (code) DO NOTHING;
