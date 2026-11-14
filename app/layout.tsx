import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";

export const metadata: Metadata = {
  title: "Mock Night | Prepare Smarter. Perform Better.",
  description: "Prepare smarter with exam practice, timed mock tests, daily drills and professional learning pathways on web and Telegram.",
  applicationName: "Mock Night",
  icons: { icon: "/icon.svg", shortcut: "/icon.svg", apple: "/brand-mark.svg" },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SiteHeader bot={(process.env.TELEGRAM_BOT_USERNAME ?? "").replace(/^@/, "")} />
        {children}
        <SiteFooter />
        {/* Telegram Mini App SDK — Next injects beforeInteractive scripts into <head> */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
