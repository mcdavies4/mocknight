-- Public bucket for recorded listening-question audio (generated on first play by /api/audio/[id]).
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('audio', 'audio', true, 1048576, array['audio/mpeg','audio/ogg'])
on conflict (id) do nothing;
