import "./load-env";

const checks = [
  ["SUPABASE_URL", "Local question import + server database"],
  ["SUPABASE_SERVICE_ROLE_KEY", "Local question import + server database"],
  ["NEXT_PUBLIC_SUPABASE_URL", "Web sign-in (Vercel)"],
  ["NEXT_PUBLIC_SUPABASE_ANON_KEY", "Web sign-in (Vercel)"],
  ["TELEGRAM_BOT_TOKEN", "Telegram bot"],
  ["TELEGRAM_BOT_USERNAME", "Telegram bot links"],
  ["TELEGRAM_WEBHOOK_SECRET", "Telegram webhook"],
  ["APP_URL", "Production callback/webhook URL"],
  ["CRON_SECRET", "Scheduled jobs + health check"],
  ["DASHBOARD_SIGNING_SECRET", "Tutor dashboard links"],
  ["PAYSTACK_SECRET_KEY", "Paystack payments"],
  ["STRIPE_SECRET_KEY", "Stripe payments"],
  ["STRIPE_WEBHOOK_SECRET", "Stripe webhook"],
  ["CHAPA_SECRET_KEY", "Chapa payments"],
  ["ANTHROPIC_API_KEY", "AI question generation/explanations"],
  ["RESEND_API_KEY", "Email delivery"],
  ["EMAIL_FROM", "Email sender"],
] as const;

const bad = (v: string | undefined) => !v?.trim() || /YOUR[-_ ]|PLACEHOLDER|CHANGE[-_ ]ME|\[SENSITIVE\]|^xxxx/i.test(v.trim());
console.log("Mock Night environment check (values are never displayed)\n");
for (const [key, purpose] of checks) {
  const value = process.env[key];
  console.log(`${bad(value) ? "MISSING / PLACEHOLDER" : "AVAILABLE"}  ${key}  — ${purpose}`);
}
console.log("\nLocal script lookup order: .env.import.local → .env.local → .env (shell variables take priority).");
console.log("For Vercel, configure the relevant variables separately in Project Settings → Environment Variables, then redeploy.");
