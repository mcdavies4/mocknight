-- Wave 4: Common Entrance, Junior WAEC, civil service promotion, PTE, CELPIP, IOSH Managing Safely, oil & gas. Safe to re-run.
insert into subjects (code, name, exams) values
  ('NGS', 'General studies', '{NCEE}'),
  ('CVE', 'Civic Education', '{JSCE}'),
  ('PSR', 'Public Service Rules & Financial Regulations', '{NGCS}'),
  ('IMS', 'IOSH Managing Safely', '{IOSH}'),
  ('OGS', 'Oil & gas HSE essentials', '{OILGAS}'),
  ('ONG', 'Oil & gas industry knowledge', '{OILGAS}')
on conflict (code) do nothing;
