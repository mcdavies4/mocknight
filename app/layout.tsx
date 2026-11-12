import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mock Night — exam practice that sticks",
  description: "Daily practice, real timed tests and certificates: JAMB, WAEC, Post-UTME, WASSCE Ghana, the Life in the UK test, Digital SAT practice and Fire Marshal training.",
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
        {children}
        {/* Telegram Mini App SDK — Next injects beforeInteractive scripts into <head> */}
        <Script src="https://telegram.org/js/telegram-web-app.js" strategy="beforeInteractive" />
      </body>
    </html>
  );
}
