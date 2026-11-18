-- Trending professional certifications. Safe to re-run.
insert into subjects (code, name, exams) values
  ('GCL', 'Google Cloud Digital Leader', '{GCPCDL}'),
  ('AZA', 'Azure Administrator (AZ-104)', '{AZ104}'),
  ('CSP', 'CISSP security domains', '{CISSP}'),
  ('DVO', 'Kubernetes, Docker and Terraform', '{DEVOPS}'),
  ('DMK', 'Digital marketing', '{DIGMKT}'),
  ('HRM', 'Human resources', '{HRCERT}'),
  ('PDO', 'Product ownership', '{PSPO}')
on conflict (code) do nothing;
