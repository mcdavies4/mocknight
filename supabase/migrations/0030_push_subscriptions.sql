-- Web push subscriptions for daily reminders in the installed web app.
create table if not exists push_subscriptions (
  endpoint text primary key,
  p256dh text not null,
  auth text not null,
  student_id uuid not null references students(id) on delete cascade,
  user_agent text,
  created_at timestamptz not null default now()
);
create index if not exists push_subscriptions_student_idx on push_subscriptions (student_id);
alter table push_subscriptions enable row level security;
