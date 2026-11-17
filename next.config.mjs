/** @type {import('next').NextConfig} */
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, "");
const primaryHost = SITE ? new URL(SITE).host : "";

const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Once a custom domain is set, send visitors and Google from the old vercel.app address to it.
    // API routes (Telegram, Paystack and Stripe webhooks, cron) and the Telegram mini app pages stay on vercel.app.
    if (!primaryHost || primaryHost.endsWith(".vercel.app")) return [];
    return [
      {
        source: "/:path((?!api/|app|mock|_next/).*)",
        has: [{ type: "host", value: "mocknight.vercel.app" }],
        destination: `${SITE}/:path`,
        permanent: true,
      },
    ];
  },
};
export default nextConfig;
