-- 18th Edition wiring regs, teaching assistant & Early Years, warehouse & forklift, NHS healthcare assistant. Safe to re-run.
insert into subjects (code, name, exams) values
  ('BSR', '18th Edition (BS 7671)', '{ELEC18}'),
  ('EYT', 'Teaching assistant & Early Years', '{EYTA}'),
  ('WHF', 'Warehouse & forklift', '{WAREHOUSE}'),
  ('HCA', 'NHS healthcare assistant', '{NHSHCA}')
on conflict (code) do nothing;
