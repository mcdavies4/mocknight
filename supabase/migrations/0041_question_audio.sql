-- Listening questions: text the device speaks aloud (Web Speech API), plus its BCP-47 language.
alter table questions add column if not exists audio_text text;
alter table questions add column if not exists audio_lang text;
do $$ begin
  alter table questions add constraint questions_audio_pair check ((audio_text is null) = (audio_lang is null));
exception when duplicate_object then null; end $$;
