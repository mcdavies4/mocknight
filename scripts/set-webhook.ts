/**
 * Point Telegram at your deployed app and register the command menu.
 *   npm run set-webhook
 */
import "dotenv/config";
import { Bot } from "grammy";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
const url = `${process.env.APP_URL!.replace(/\/$/, "")}/api/telegram`;

await bot.api.setWebhook(url, {
  secret_token: process.env.TELEGRAM_WEBHOOK_SECRET!,
  allowed_updates: ["message", "callback_query", "poll_answer", "my_chat_member"],
  drop_pending_updates: true,
});

await bot.api.setMyCommands([
  { command: "drill", description: "Today's drill" },
  { command: "cbt", description: "Practice CBT" },
  { command: "mocknight", description: "Sunday Mock Night" },
  { command: "leaderboard", description: "Last Mock Night results" },
  { command: "stats", description: "Your progress" },
  { command: "premium", description: "Upgrade" },
  { command: "settings", description: "Exam, subjects, state" },
  { command: "time", description: "Change drill time" },
  { command: "help", description: "All commands (incl. tutors)" },
]);

await bot.api.setMyDescription(
  "Daily JAMB & WAEC drills, a real CBT practice screen, and a nationwide Mock Night every Sunday at 8pm. Tap Start.",
);
await bot.api.setMyShortDescription("JAMB & WAEC prep: daily drills, CBT practice, Sunday Mock Night.");

await bot.api.setChatMenuButton({
  menu_button: { type: "web_app", text: "CBT", web_app: { url: `${process.env.APP_URL!.replace(/\/$/, "")}/mock` } },
});

console.log("Webhook set:", await bot.api.getWebhookInfo());
