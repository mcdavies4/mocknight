-- Group quiz battles: the bot runs a live timed quiz in a Telegram group with a leaderboard.
create table if not exists battles (
  id uuid primary key default gen_random_uuid(),
  chat_id bigint not null,
  chat_title text,
  started_by uuid references students(id) on delete set null,
  track text,
  question_ids uuid[] not null,
  position int not null default 0,
  seconds int not null default 20,
  status text not null default 'running' check (status in ('running', 'finished', 'cancelled')),
  created_at timestamptz not null default now(),
  finished_at timestamptz
);
create unique index if not exists battles_one_running_per_chat on battles (chat_id) where status = 'running';

create table if not exists battle_polls (
  poll_id text primary key,
  battle_id uuid not null references battles(id) on delete cascade,
  position int not null,
  question_id uuid not null references questions(id),
  message_id bigint,
  answer_index smallint not null,
  sent_at timestamptz not null default now(),
  closed boolean not null default false
);
create index if not exists battle_polls_battle_idx on battle_polls (battle_id);

create table if not exists battle_answers (
  poll_id text not null references battle_polls(poll_id) on delete cascade,
  battle_id uuid not null references battles(id) on delete cascade,
  telegram_user_id bigint not null,
  student_id uuid references students(id) on delete set null,
  name text,
  correct boolean not null,
  points int not null,
  answered_at timestamptz not null default now(),
  primary key (poll_id, telegram_user_id)
);
create index if not exists battle_answers_battle_idx on battle_answers (battle_id);

alter table battles enable row level security;
alter table battle_polls enable row level security;
alter table battle_answers enable row level security;
