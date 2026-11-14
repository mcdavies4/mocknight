/** Update types the bot must receive. pre_checkout_query is required for Telegram Stars payments; poll (closed polls) drives quiz battles. */
export const ALLOWED_UPDATES = ["message", "callback_query", "poll_answer", "my_chat_member", "pre_checkout_query", "poll"] as const;

/** The bot's command menu. Kept in sync automatically by the hourly job (lib/jobs.ts). */
export const BOT_COMMANDS = [
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
] as const;
