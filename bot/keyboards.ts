import { InlineKeyboard } from "grammy";
import { subjectName } from "@/lib/subjects";
import { formatHour } from "@/lib/time";
import { getTrack, regionsFor, TRACK_LIST, variantsFor } from "@/lib/tracks";
import type { Student } from "@/lib/types";
import { env } from "@/lib/env";

export const DRILL_HOURS = [6, 7, 16, 17, 18, 19, 20, 21];

export function trackKb() {
  const kb = new InlineKeyboard();
  TRACK_LIST.filter((t) => t.launchStatus !== "preparing").forEach((t) => kb.text(`${t.emoji} ${t.name}`, `ob:track:${t.code}`).row());
  return kb;
}

export function subjectsKb(student: Student) {
  const track = getTrack(student.track);
  const kb = new InlineKeyboard();
  track.subjects.forEach((code, i) => {
    const locked = track.compulsory.includes(code);
    const on = student.subjects.includes(code);
    kb.text(`${locked ? "🔒" : on ? "✅" : "▫️"} ${subjectName(code)}`, `ob:sub:${code}`);
    if (i % 2 === 1) kb.row();
  });
  kb.row().text(`Done (${student.subjects.length} selected) ✔`, "ob:subdone");
  return kb;
}

export function statesKb(student: Student) {
  const kb = new InlineKeyboard();
  regionsFor(getTrack(student.track)).forEach((s, i) => {
    kb.text(s, `ob:st:${i}`);
    if (i % 3 === 2) kb.row();
  });
  return kb;
}

export function timeKb() {
  const kb = new InlineKeyboard();
  DRILL_HOURS.forEach((h, i) => {
    kb.text(formatHour(h), `ob:t:${h}`);
    if (i % 4 === 3) kb.row();
  });
  return kb;
}

export function menuKb(student: Student) {
  const track = getTrack(student.track);
  const kb = new InlineKeyboard().text("📝 Today's drill", "drill:start");
  const variants = variantsFor(track, student.subjects);
  if (variants.length) {
    kb.row();
    variants.forEach((v) => kb.webApp(`🧪 ${v.short}`, `${env.appUrl}/mock?variant=${v.key}`));
    kb.row();
  } else {
    kb.webApp(track.subjectMode === "single" ? "🧪 Practice test" : "🖥 Practice CBT", `${env.appUrl}/mock`).row();
  }
  if (track.weeklyMock) kb.text("🏆 Mock Night", "mn:info");
  if (track.course) kb.text("📚 Lessons", "lesson:next");
  kb.text("📊 My stats", "stats").row().text("🎁 Invite friends", "invite").text("⭐ Premium", "pay:menu").row().text("⚙️ Settings", "settings");
  kb.row().text("🌍 Explore exams", "exams");
  return kb;
}
