import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { PwaRegister } from "@/components/pwa";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Mock Night | Exam practice questions and timed mock tests",
  description: "Practice questions, timed mock tests and clear explanations for 80+ exams: JAMB, WAEC, UK driving theory, Life in the UK, NMC CBT, PLAB, IELTS, AWS and more. On the web and Telegram.",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
