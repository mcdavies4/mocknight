"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/** Pages that run as the Telegram Mini App (full-screen test UI) — no site header/footer there. */
const BARE = [/^\/mock/, /^\/r\//];

function useShowChrome() {
  const path = usePathname() ?? "/";
  const [inTelegram, setInTelegram] = useState(false);
  useEffect(() => {
    const tg = (window as unknown as { Telegram?: { WebApp?: { initData?: string } } }).Telegram?.WebApp;
    setInTelegram(Boolean(tg?.initData));
  }, []);
  return !inTelegram && !BARE.some((re) => re.test(path));
}

export function BrandMark({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 104 104" aria-hidden="true" focusable="false">
      <rect width="104" height="104" rx="24" fill="#0B2F22" />
      <path d="M16 73 35 31c2-4 7-5 10-2l14 16 14-16c3-3 8-2 10 2l19 42H83L74 49 61 65c-3 4-9 4-12 0L37 49l-8 24Z" fill="#B9D9A6" />
      <path d="m30 74 23-22 10 10 26-26" fill="none" stroke="#E1F5C9" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function SiteHeader({ bot }: { bot: string }) {
  if (!useShowChrome()) return null;
  return (
    <header className="site-header">
      <div className="site-inner">
        <Link href="/" className="site-brand" aria-label="Mock Night home">
          <BrandMark />
          <span className="site-brand-text">
            <span className="site-name">Mock Night</span>
            <span className="site-tagline">Prepare Smarter. Perform Better.</span>
          </span>
        </Link>
        <nav className="site-nav">
          <Link href="/exams" className="site-link">Exams</Link>
          <Link href="/app" className="site-link">Web app</Link>
          {bot && <a href={`https://t.me/${bot}`} className="site-cta">Open in Telegram</a>}
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  if (!useShowChrome()) return null;
  return (
    <footer className="site-footer">
      <div className="site-inner">
        <div className="site-footer-brand">
          <BrandMark size={28} />
          <span><b>Mock Night</b> · Prepare Smarter. Perform Better.</span>
        </div>
        <span className="muted small">A product of The 36th Solutions Ltd.</span>
      </div>
    </footer>
  );
}
