/**
 * Point Telegram at your deployed app and register the command menu.
 *   npm run set-webhook
 */
import "./load-env";
import { Bot } from "grammy";
import { ALLOWED_UPDATES } from "../lib/telegram-updates";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
const url = `${process.env.APP_URL!.replace(/\/$/, "")}/api/telegram`;

await bot.api.setWebhook(url, {
  secret_token: process.env.TELEGRAM_WEBHOOK_SECRET!,
  allowed_updates: [...ALLOWED_UPDATES],
  drop_pending_updates: true,
});

await bot.api.setMyCommands([
  { command: "drill", description: "Today's drill" },
  { command: "cbt", description: "Practice CBT" },
  { command: "mocknight", description: "Sunday Mock Night" },
  { command: "leaderboard", description: "Last Mock Night results" },
  { command: "stats", description: "Your progress" },
  { command: "premium", description: "Upgrade" },
  { command: "lesson", description: "Next course module (Fire Marshal)" },
  { command: "certificate", description: "Get your course certificate" },
  { command: "explain", description: "Explain my last wrong answer" },
  { command: "battle", description: "Quiz battle in a group chat" },
  { command: "invite", description: "Invite friends, earn Premium" },
  { command: "parent", description: "Weekly report for a parent" },
  { command: "settings", description: "Course, subjects, region" },
  { command: "time", description: "Change drill time" },
  { command: "help", description: "All commands (incl. tutors)" },
]);

await bot.api.setMyDescription(
  "Exam practice and short courses: JAMB, WAEC, Digital SAT, Post-UTME, WASSCE Ghana, the Life in the UK test and Fire Marshal training. Daily practice, real timed tests, certificates. Tap Start.",
);
await bot.api.setMyShortDescription("JAMB, WAEC, Digital SAT, Life in the UK & Fire Marshal: daily practice, timed tests, certificates.");

await bot.api.setChatMenuButton({
  menu_button: { type: "web_app", text: "CBT", web_app: { url: `${process.env.APP_URL!.replace(/\/$/, "")}/mock` } },
});

console.log("Webhook set:", await bot.api.getWebhookInfo());
