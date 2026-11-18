-- Full-text search over published practice questions, for the site search page.
create index if not exists questions_fts on questions
  using gin (to_tsvector('english', coalesce(topic, '') || ' ' || body))
  where reviewed or practice_published;

create or replace function search_questions(q text, lim int default 6)
returns table (id uuid, subject_code text, topic text, body text, options text[], answer_index smallint, explanation text, rank real)
language sql stable
as $$
  select id, subject_code, topic, body, options, answer_index, explanation,
         ts_rank(to_tsvector('english', coalesce(topic, '') || ' ' || body), websearch_to_tsquery('english', q)) as rank
  from questions
  where (reviewed or practice_published)
    and to_tsvector('english', coalesce(topic, '') || ' ' || body) @@ websearch_to_tsquery('english', q)
  order by rank desc, id
  limit least(greatest(lim, 1), 20);
$$;

revoke execute on function search_questions(text, int) from anon, authenticated;
