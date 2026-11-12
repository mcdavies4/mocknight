import { InlineKeyboard } from "grammy";
import { STATES, subjectName } from "@/lib/subjects";
import { formatHour } from "@/lib/time";
import { getTrack, TRACK_LIST } from "@/lib/tracks";
import type { Student } from "@/lib/types";
import { env } from "@/lib/env";

export const DRILL_HOURS = [6, 7, 16, 17, 18, 19, 20, 21];

export function trackKb() {
  const kb = new InlineKeyboard();
  TRACK_LIST.forEach((t) => kb.text(`${t.emoji} ${t.name}`, `ob:track:${t.code}`).row());
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

export function statesKb() {
  const kb = new InlineKeyboard();
  STATES.forEach((s, i) => {
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
  const kb = new InlineKeyboard()
    .text("📝 Today's drill", "drill:start")
    .webApp(track.subjectMode === "single" ? "🧪 Practice test" : "🖥 Practice CBT", `${env.appUrl}/mock`)
    .row();
  if (track.weeklyMock) kb.text("🏆 Mock Night", "mn:info");
  kb.text("📊 My stats", "stats").row().text("⭐ Premium", "pay:menu").text("⚙️ Settings", "settings");
  return kb;
}
