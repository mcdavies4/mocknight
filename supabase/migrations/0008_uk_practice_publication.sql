-- Separate owner-authorised AI practice publication from human review.
-- Existing reviewed questions remain served as before.
alter table questions add column if not exists practice_published boolean not null default false;
create index if not exists questions_subject_practice_published on questions(subject_code) where practice_published;

create or replace function pick_new_questions(p_student uuid, p_subject text, p_limit int)
returns setof questions language sql stable as $$
  select q.* from questions q
  where (q.reviewed or q.practice_published) and q.subject_code = p_subject
    and not exists (select 1 from attempts a where a.student_id = p_student and a.question_id = q.id)
  order by random() limit p_limit;
$$;

create or replace function pick_random_questions(p_subject text, p_limit int, p_exclude uuid[] default '{}')
returns setof questions language sql stable as $$
  select q.* from questions q
  where (q.reviewed or q.practice_published) and q.subject_code = p_subject
    and not (q.id = any(p_exclude))
  order by random() limit p_limit;
$$;
