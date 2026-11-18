import type { Metadata, Viewport } from "next";
import { examCountLabel } from "@/lib/exam-count";
import Script from "next/script";
import "./globals.css";
import { SiteFooter, SiteHeader, StatsBar } from "@/components/site-chrome";
import { getSiteStats, plus } from "@/lib/stats";
import { PwaRegister } from "@/components/pwa";
import { SITE_URL } from "@/lib/site";

const GTM_ID = "GTM-NZNH49C5";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mock Night | Exam practice questions and timed mock tests",
  description: `Practice questions, timed mock tests and clear explanations for ${examCountLabel()} exams: JAMB, WAEC, KCSE, driving theory, Life in the UK, NMC CBT, NCLEX, IELTS and more. On the web and Telegram.`,
  alternates: { canonical: "./" },
  openGraph: { type: "website", siteName: "Mock Night", locale: "en_GB" },
  twitter: { card: "summary_large_image" },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined },
  applicationName: "Mock Night",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/icons/apple-touch-icon.png" },
  appleWebApp: { capable: true, title: "Mock Night", statusBarStyle: "default" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#0B2F22",
};

// Refresh the live question count about once an hour.
export const revalidate = 3600;

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const stats = await getSiteStats();
  const statsParts = stats
    ? [`${plus(stats.questions)} practice questions`, `${stats.exams} exams`, stats.answers ? `${plus(stats.answers)} answers practised` : "new questions added every week"]
    : null;
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager: first thing in <head>, as Google's verification expects */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`,
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript fallback) */}
        <noscript>
          <iframe src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`} height="0" width="0" style={{ display: "none", visibility: "hidden" }} />
        </noscript>
        <StatsBar parts={statsParts} />
        <SiteHeader bot={(process.env.TELEGRAM_BOT_USERNAME ?? "").replace(/^@/, "")} />
        {children}
        <SiteFooter />
        <PwaRegister />
        {/* Telegram Mini App SDK — Next injects beforeInteractive scripts into <head> */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
