// Lazy env access so `next build` doesn't fail when secrets aren't present at build time.
function req(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing environment variable: ${name}`);
  return v;
}

export const env = {
  get botToken() { return req("TELEGRAM_BOT_TOKEN"); },
  get botUsername() { return req("TELEGRAM_BOT_USERNAME").replace(/^@/, ""); },
  get webhookSecret() { return req("TELEGRAM_WEBHOOK_SECRET"); },
  get appUrl() { return req("APP_URL").replace(/\/$/, ""); },
  get cronSecret() { return req("CRON_SECRET"); },
  get dashboardSecret() { return req("DASHBOARD_SIGNING_SECRET"); },
  get supabaseUrl() { return req("SUPABASE_URL"); },
  get supabaseServiceKey() { return req("SUPABASE_SERVICE_ROLE_KEY"); },
  get paystackSecret() { return req("PAYSTACK_SECRET_KEY"); },
  get stripeSecret() { return req("STRIPE_SECRET_KEY"); },
  get stripeWebhookSecret() { return req("STRIPE_WEBHOOK_SECRET"); },
};
