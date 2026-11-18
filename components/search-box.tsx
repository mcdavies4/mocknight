"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Hit { code: string; name: string; short: string; emoji: string; path: string }

/** Search box with instant exam suggestions; Enter opens the full results page. */
export function SearchBox({ initial = "", autoFocus = false, placeholder = "Search exams, subjects or topics — e.g. “nursing UK”, “Kenya driving”, “photosynthesis”" }: { initial?: string; autoFocus?: boolean; placeholder?: string }) {
  const router = useRouter();
  const [q, setQ] = useState(initial);
  const [hits, setHits] = useState<Hit[]>([]);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const box = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) { setHits([]); return; }
    const ctl = new AbortController();
    const t = setTimeout(() => {
      fetch(`/api/search?q=${encodeURIComponent(term)}`, { signal: ctl.signal })
        .then((r) => r.json())
        .then((d: { hits: Hit[] }) => { setHits(d.hits); setActive(-1); })
        .catch(() => {});
    }, 180);
    return () => { clearTimeout(t); ctl.abort(); };
  }, [q]);

  useEffect(() => {
    const close = (e: MouseEvent) => { if (box.current && !box.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, []);

  const go = () => {
    if (active >= 0 && hits[active]) return router.push(hits[active].path);
    if (q.trim()) router.push(`/search?q=${encodeURIComponent(q.trim())}`);
  };

  return (
    <div className="search-box" ref={box}>
      <form role="search" onSubmit={(e) => { e.preventDefault(); setOpen(false); go(); }}>
        <span className="search-icon" aria-hidden="true">🔍</span>
        <input
          type="search" name="q" value={q} autoFocus={autoFocus} placeholder={placeholder} aria-label="Search Mock Night" autoComplete="off"
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") { e.preventDefault(); setActive((a) => Math.min(a + 1, hits.length - 1)); }
            else if (e.key === "ArrowUp") { e.preventDefault(); setActive((a) => Math.max(a - 1, -1)); }
            else if (e.key === "Escape") setOpen(false);
          }}
        />
        <button className="btn" type="submit">Search</button>
      </form>
      {open && hits.length > 0 && (
        <ul className="search-suggest" role="listbox">
          {hits.map((h, i) => (
            <li key={h.code} role="option" aria-selected={i === active}>
              <Link href={h.path} className={i === active ? "active" : ""} onClick={() => setOpen(false)}>
                <span>{h.emoji}</span> <b>{h.short}</b> <span className="muted small">{h.name !== h.short ? h.name : ""}</span>
              </Link>
            </li>
          ))}
          <li><Link href={`/search?q=${encodeURIComponent(q.trim())}`} onClick={() => setOpen(false)} className="muted small">See all results for “{q.trim()}” →</Link></li>
        </ul>
      )}
    </div>
  );
}
