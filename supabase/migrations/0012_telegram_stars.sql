-- Telegram Stars payments: keep Telegram's charge id (needed for refunds) and allow a refunded status.
alter table payments add column if not exists telegram_charge_id text;
create index if not exists payments_telegram_charge_idx on payments (telegram_charge_id);
alter table payments drop constraint if exists payments_status_check;
alter table payments add constraint payments_status_check check (status in ('pending', 'success', 'failed', 'refunded'));
