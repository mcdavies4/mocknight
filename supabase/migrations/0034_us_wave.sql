-- US: DMV permit tests (CA, TX, FL, NY, GA), PTCB, phlebotomy, CCMA, CPC, NCLEX-PN, HESI, real estate, insurance, ServSafe, EPA 608, ACT, HiSET, Praxis Core, SIE. Safe to re-run.
insert into subjects (code, name, exams) values
  ('USD', 'US rules of the road', '{DMVCA,DMVTX,DMVFL,DMVNY,DMVGA}'),
  ('CAD', 'California driving rules', '{DMVCA}'), ('TXD', 'Texas driving rules', '{DMVTX}'), ('FLD', 'Florida driving rules', '{DMVFL}'),
  ('NYD', 'New York driving rules', '{DMVNY}'), ('GAD', 'Georgia driving rules', '{DMVGA}'),
  ('PHB', 'Phlebotomy', '{PHLEB,CCMA}'), ('MAQ', 'Medical assisting', '{CCMA}'), ('PTB', 'Pharmacy technician', '{PTCB}'),
  ('MCD', 'Medical coding', '{CPC}'), ('SIE', 'Securities (SIE)', '{SIE}'), ('RES', 'Real estate', '{REALEST}'),
  ('LHI', 'Life and health insurance', '{LIFEINS}'), ('SSM', 'ServSafe food safety', '{SERVSAFE}'), ('EPA', 'EPA 608 refrigerants', '{EPA608}')
on conflict (code) do nothing;
