/** Update types the bot must receive. pre_checkout_query is required for Telegram Stars payments. */
export const ALLOWED_UPDATES = ["message", "callback_query", "poll_answer", "my_chat_member", "pre_checkout_query"] as const;
