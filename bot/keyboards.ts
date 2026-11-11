import { InlineKeyboard } from "grammy";
import { EXAM_RULES, OFFERED_SUBJECTS, STATES, subjectName } from "@/lib/subjects";
import { formatHour } from "@/lib/time";
import type { Student } from "@/lib/types";
import { env } from "@/lib/env";

export const DRILL_HOURS = [6, 7, 16, 17, 18, 19, 20, 21];

export function examKb() {
  return new InlineKeyboard().text("JAMB (UTME)", "ob:exam:JAMB").text("WAEC (WASSCE)", "ob:exam:WAEC");
}

export function subjectsKb(student: Student) {
  const rules = EXAM_RULES[student.exam ?? "JAMB"];
  const kb = new InlineKeyboard();
  OFFERED_SUBJECTS.forEach((code, i) => {
    const locked = rules.compulsory.includes(code);
    const on = student.subjects.includes(code);
    const label = `${locked ? "🔒" : on ? "✅" : "▫️"} ${subjectName(code)}`;
    kb.text(label, `ob:sub:${code}`);
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

export function menuKb() {
  return new InlineKeyboard()
    .text("📝 Today's drill", "drill:start")
    .webApp("🖥 Practice CBT", `${env.appUrl}/mock`)
    .row()
    .text("🏆 Mock Night", "mn:info")
    .text("📊 My stats", "stats")
    .row()
    .text("⭐ Premium", "pay:menu")
    .text("⚙️ Settings", "settings");
}
