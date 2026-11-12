-- Mock Night — tracks, web accounts, multi-currency payments
-- Run AFTER 0001_init.sql, in the Supabase SQL Editor.

-- Life in the UK subject
insert into subjects (code, name, exams) values ('LUK', 'Life in the UK', '{LUK}')
on conflict (code) do nothing;

-- Students: track + web accounts
alter table students add column if not exists track text;
alter table students add column if not exists email text;
alter table students add column if not exists auth_user_id uuid unique;
alter table students add column if not exists source text not null default 'telegram';
alter table students alter column telegram_id drop not null;
update students set track = exam where track is null and exam is not null;
create index if not exists students_track on students (track) where blocked = false;

-- Mocks know their track
alter table mocks add column if not exists track text;
update mocks set track = 'SCHOOL' where track is null and kind = 'weekly';

-- Payments: any plan, any currency, any provider
alter table payments drop constraint if exists payments_plan_check;
alter table payments add column if not exists currency text not null default 'NGN';
alter table payments add column if not exists provider text not null default 'paystack';
comment on column payments.amount_kobo is 'Amount in minor units of payments.currency (kobo for NGN, pence for GBP)';
