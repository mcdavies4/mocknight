/**
 * Point Telegram at your deployed app and register the command menu.
 *   npm run set-webhook
 */
import "./load-env";
import { Bot } from "grammy";
import { ALLOWED_UPDATES, BOT_COMMANDS } from "../lib/telegram-updates";
import { BOT_DESCRIPTION, BOT_SHORT_DESCRIPTION } from "../lib/intro";

const bot = new Bot(process.env.TELEGRAM_BOT_TOKEN!);
const url = `${process.env.APP_URL!.replace(/\/$/, "")}/api/telegram`;

await bot.api.setWebhook(url, {
  secret_token: process.env.TELEGRAM_WEBHOOK_SECRET!,
  allowed_updates: [...ALLOWED_UPDATES],
  drop_pending_updates: true,
});

await bot.api.setMyCommands([...BOT_COMMANDS]);

await bot.api.setMyDescription(BOT_DESCRIPTION);
await bot.api.setMyShortDescription(BOT_SHORT_DESCRIPTION);

await bot.api.setChatMenuButton({
  menu_button: { type: "web_app", text: "CBT", web_app: { url: `${process.env.APP_URL!.replace(/\/$/, "")}/mock` } },
});

console.log("Webhook set:", await bot.api.getWebhookInfo());
