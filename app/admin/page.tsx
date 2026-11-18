"use client";
// Founder stats dashboard. Sign in at /app (or open from Telegram) with a founder account.
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { api } from "@/lib/client-api";

type Money = Record<string, { n: number; amount: number }>;
interface Day { date: string; signups_telegram: number; signups_web: number; active: number; answers: number; correct: number; mocks: number; payments: number }
interface Data {
  stats: {
    users: Record<string, number>;
    activity: Record<string, number | null>;
    money: { today: Money; d7: Money; d30: Money; all: Money; top_plans_30d: { plan: string; n: number }[]; pending_24h: number };
    tracks: { track: string; label: string; users: number; new_7d: number; active_7d: number }[];
    sources_30d: { source: string; n: number }[];
    content: Record<string, number>;
  };
  series: {
    days: Day[];
    revenue_by_currency: Record<string, number>;
    retention: { cohort: number; d1: number; d7: number };
    top_subjects_7d: { subject: string; name: string; answers: number; accuracy: number }[];
  };
  generatedAt: string;
}

const C1 = "#1baf7a"; // Telegram / single series
const C2 = "#eb6834"; // Web
const SYM: Record<string, string> = { NGN: "₦", GBP: "£", USD: "$", INR: "₹", EUR: "€", ETB: "Br ", KES: "KSh " };
const fmt = (v: number | null | undefined) => (v ?? 0).toLocaleString("en-GB");
const cash = (cur: string, minor: number) => (cur === "XTR" ? `⭐${fmt(minor)}` : `${SYM[cur] ?? cur + " "}${(minor / 100).toLocaleString("en-GB", { maximumFractionDigits: 0 })}`);
const moneyLine = (m: Money) => (Object.keys(m).length ? Object.entries(m).map(([c, v]) => cash(c, v.amount)).join(" · ") : "—");
const pct = (a: number, b: number) => (b ? `${Math.round((100 * a) / b)}%` : "—");
const shortDate = (d: string) => new Date(d + "T12:00:00").toLocaleDateString("en-GB", { day: "numeric", month: "short" });

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="card adm-tile">
      <div className="muted small">{label}</div>
      <div className="adm-big">{value}</div>
      {sub ? <div className="muted small">{sub}</div> : null}
    </div>
  );
}

/** Bar chart for one or two stacked series, with a hover tooltip per day. */
function Bars({ title, days, series }: { title: string; days: Day[]; series: { key: keyof Day; label: string; color: string }[] }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 640, H = 180, P = { l: 34, r: 8, t: 10, b: 22 };
  const totals = days.map((d) => series.reduce((s, x) => s + (d[x.key] as number), 0));
  const max = Math.max(1, ...totals);
  const nice = max <= 4 ? 4 : max <= 10 ? Math.ceil(max / 2) * 2 : max <= 100 ? Math.ceil(max / 10) * 10 : Math.ceil(max / 100) * 100;
  const bw = (W - P.l - P.r) / days.length;
  const y = (v: number) => H - P.b - (v / nice) * (H - P.t - P.b);
  const total = totals.reduce((a, b) => a + b, 0);
  return (
    <div className="card adm-chart">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
        <b>{title}</b>
        <span className="muted small">{fmt(total)} in period</span>
      </div>
      {series.length > 1 && (
        <div className="adm-legend">{series.map((s) => <span key={String(s.key)}><i style={{ background: s.color }} />{s.label}</span>)}</div>
      )}
      <div style={{ position: "relative" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`${title}, daily`} onMouseLeave={() => setHover(null)}>
          {[0, 0.5, 1].map((f) => (
            <g key={f}>
              <line x1={P.l} x2={W - P.r} y1={y(nice * f)} y2={y(nice * f)} stroke="rgba(0,0,0,.08)" />
              <text x={P.l - 6} y={y(nice * f) + 4} textAnchor="end" fontSize="10" fill="#6b7280">{fmt(Math.round(nice * f))}</text>
            </g>
          ))}
          {days.map((d, i) => {
            let base = 0;
            const x = P.l + i * bw + Math.max(1, bw * 0.12);
            const w = Math.max(1, bw * 0.76);
            return (
              <g key={d.date} onMouseEnter={() => setHover(i)}>
                <rect x={P.l + i * bw} y={P.t} width={bw} height={H - P.t - P.b} fill={hover === i ? "rgba(0,0,0,.04)" : "transparent"} />
                {series.map((s, k) => {
                  const v = d[s.key] as number;
                  if (!v) return null;
                  const y0 = y(base), y1 = y(base + v);
                  base += v;
                  const top = k === series.length - 1 || series.slice(k + 1).every((n) => !(d[n.key] as number));
                  return <rect key={String(s.key)} x={x} y={y1 + (k ? 0 : 0)} width={w} height={Math.max(1, y0 - y1 - (k < series.length - 1 && !top ? 2 : 0))} rx={top ? Math.min(4, w / 2) : 0} fill={s.color} />;
                })}
              </g>
            );
          })}
          {days.map((d, i) => (i % Math.ceil(days.length / 6) === 0 || i === days.length - 1) && (
            <text key={d.date} x={P.l + i * bw + bw / 2} y={H - 6} textAnchor="middle" fontSize="10" fill="#6b7280">{shortDate(d.date)}</text>
          ))}
        </svg>
        {hover != null && (
          <div className="adm-tip" style={{ left: `${((P.l + hover * bw + bw / 2) / W) * 100}%` }}>
            <b>{shortDate(days[hover].date)}</b>
            {series.map((s) => <div key={String(s.key)}>{series.length > 1 ? <i style={{ background: s.color }} /> : null}{s.label}: {fmt(days[hover][s.key] as number)}</div>)}
          </div>
        )}
      </div>
    </div>
  );
}

/** Line chart for one series (daily active users), with a crosshair tooltip. */
function Line({ title, days, k, label }: { title: string; days: Day[]; k: keyof Day; label: string }) {
  const [hover, setHover] = useState<number | null>(null);
  const W = 640, H = 180, P = { l: 34, r: 8, t: 10, b: 22 };
  const vals = days.map((d) => d[k] as number);
  const max = Math.max(1, ...vals);
  const nice = max <= 4 ? 4 : max <= 10 ? Math.ceil(max / 2) * 2 : max <= 100 ? Math.ceil(max / 10) * 10 : Math.ceil(max / 100) * 100;
  const x = (i: number) => P.l + (i / Math.max(1, days.length - 1)) * (W - P.l - P.r);
  const y = (v: number) => H - P.b - (v / nice) * (H - P.t - P.b);
  const path = vals.map((v, i) => `${i ? "L" : "M"}${x(i)},${y(v)}`).join(" ");
  const avg = vals.length ? Math.round(vals.reduce((a, b) => a + b, 0) / vals.length) : 0;
  return (
    <div className="card adm-chart">
      <div className="row" style={{ justifyContent: "space-between", alignItems: "baseline" }}>
        <b>{title}</b>
        <span className="muted small">average {fmt(avg)} a day</span>
      </div>
      <div style={{ position: "relative" }}>
        <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label={`${title}, daily`}
          onMouseMove={(e) => {
            const r = (e.currentTarget as SVGSVGElement).getBoundingClientRect();
            const fx = ((e.clientX - r.left) / r.width) * W;
            setHover(Math.max(0, Math.min(days.length - 1, Math.round(((fx - P.l) / (W - P.l - P.r)) * (days.length - 1)))));
          }}
          onMouseLeave={() => setHover(null)}>
          {[0, 0.5, 1].map((f) => (
            <g key={f}>
              <line x1={P.l} x2={W - P.r} y1={y(nice * f)} y2={y(nice * f)} stroke="rgba(0,0,0,.08)" />
              <text x={P.l - 6} y={y(nice * f) + 4} textAnchor="end" fontSize="10" fill="#6b7280">{fmt(Math.round(nice * f))}</text>
            </g>
          ))}
          <path d={path} fill="none" stroke={C1} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
          {hover != null && (
            <>
              <line x1={x(hover)} x2={x(hover)} y1={P.t} y2={H - P.b} stroke="rgba(0,0,0,.25)" />
              <circle cx={x(hover)} cy={y(vals[hover])} r="4.5" fill={C1} stroke="#fff" strokeWidth="2" />
            </>
          )}
          {days.map((d, i) => (i % Math.ceil(days.length / 6) === 0 || i === days.length - 1) && (
            <text key={d.date} x={x(i)} y={H - 6} textAnchor="middle" fontSize="10" fill="#6b7280">{shortDate(d.date)}</text>
          ))}
        </svg>
        {hover != null && (
          <div className="adm-tip" style={{ left: `${(x(hover) / W) * 100}%` }}>
            <b>{shortDate(days[hover].date)}</b>
            <div>{label}: {fmt(vals[hover])}</div>
          </div>
        )}
      </div>
    </div>
  );
}

function Table({ title, head, rows }: { title: string; head: string[]; rows: (string | number)[][] }) {
  return (
    <div className="card adm-table">
      <b>{title}</b>
      {rows.length ? (
        <table>
          <thead><tr>{head.map((h, i) => <th key={h} style={{ textAlign: i ? "right" : "left" }}>{h}</th>)}</tr></thead>
          <tbody>{rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j} style={{ textAlign: j ? "right" : "left" }}>{typeof c === "number" ? fmt(c) : c}</td>)}</tr>)}</tbody>
        </table>
      ) : <p className="muted small">No data yet.</p>}
    </div>
  );
}


interface UserRow {
  id: string; name: string | null; email: string | null; telegram_username: string | null; has_telegram: boolean;
  source: string | null; track: string | null; track_label: string | null; created_at: string; last_active: string | null;
  answers: number; answers_7d: number; premium_until: string | null; paid: boolean;
}

const ago = (iso: string | null) => {
  if (!iso) return "—";
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 60) return `${Math.max(1, m)}m ago`;
  if (m < 1440) return `${Math.round(m / 60)}h ago`;
  return `${Math.round(m / 1440)}d ago`;
};

function Users() {
  const [rows, setRows] = useState<UserRow[] | null>(null);
  const [q, setQ] = useState("");
  const [err, setErr] = useState<string | null>(null);
  useEffect(() => {
    api<{ users: UserRow[] }>("/api/admin/users").then((d) => setRows(d.users)).catch((e) => setErr((e as Error).message));
  }, []);
  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (!rows) return [];
    return t ? rows.filter((u) => [u.name, u.email, u.telegram_username, u.track_label, u.source].some((v) => (v ?? "").toLowerCase().includes(t))) : rows;
  }, [rows, q]);
  const status = (u: UserRow) => {
    const until = u.premium_until ? new Date(u.premium_until) : null;
    if (u.paid && until && until > new Date()) return "⭐ Paid";
    if (until && until > new Date()) return "Trial";
    return "Free";
  };
  const csv = () => {
    const head = ["Name", "Email", "Telegram", "Exam", "Source", "Joined", "Last active", "Answers", "Answers 7d", "Status"];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""')}"`;
    const lines = [head, ...shown.map((u) => [u.name, u.email, u.telegram_username ? `@${u.telegram_username}` : u.has_telegram ? "yes" : "", u.track_label, u.source, u.created_at, u.last_active ?? "", u.answers, u.answers_7d, status(u)])];
    const blob = new Blob([lines.map((l) => l.map(esc).join(",")).join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `mocknight-users-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };
  return (
    <section className="card" style={{ marginTop: 12 }}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
        <b>👥 Users {rows ? `(${fmt(shown.length)}${q ? ` of ${fmt(rows.length)}` : ""})` : ""}</b>
        <div className="row" style={{ gap: 8 }}>
          <input className="input" style={{ minWidth: 220, margin: 0 }} placeholder="Search name, email, exam…" value={q} onChange={(e) => setQ(e.target.value)} />
          <button className="btn secondary" onClick={csv} disabled={!shown.length}>Download CSV</button>
        </div>
      </div>
      {err ? <p className="muted small">Couldn&apos;t load users ({err}).</p> : !rows ? <p className="muted small">Loading…</p> : (
        <div className="adm-scroll">
          <table className="adm-users">
            <thead><tr><th>Name</th><th>Email</th><th>Telegram</th><th>Exam</th><th>Joined</th><th>Last active</th><th>Answers (7d)</th><th>Status</th></tr></thead>
            <tbody>
              {shown.map((u) => (
                <tr key={u.id}>
                  <td>{u.name ?? "—"}</td>
                  <td>{u.email ? <a href={`mailto:${u.email}`}>{u.email}</a> : "—"}</td>
                  <td>{u.telegram_username ? <a href={`https://t.me/${u.telegram_username}`} target="_blank" rel="noreferrer">@{u.telegram_username}</a> : u.has_telegram ? "yes" : "—"}</td>
                  <td>{u.track_label ?? "—"}</td>
                  <td title={u.created_at}>{new Date(u.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}{u.source ? <span className="muted small"> · {u.source}</span> : null}</td>
                  <td title={u.last_active ?? ""}>{ago(u.last_active)}</td>
                  <td>{fmt(u.answers)} ({fmt(u.answers_7d)})</td>
                  <td>{status(u)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default function AdminPage() {
  const [days, setDays] = useState(30);
  const [data, setData] = useState<Data | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const load = useCallback(async (d: number) => {
    setLoading(true);
    try {
      setData(await api<Data>("/api/admin/stats", { days: d }));
      setError(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { void load(days); }, [days, load]);

  const ser = data?.series.days ?? [];
  const totals = useMemo(() => {
    const sum = (k: keyof Day) => ser.reduce((s, d) => s + (d[k] as number), 0);
    return { signups: sum("signups_telegram") + sum("signups_web"), answers: sum("answers"), correct: sum("correct") };
  }, [ser]);

  if (error === "UNAUTHORIZED") return (
    <main className="wrap" style={{ maxWidth: 560 }}><div className="card" style={{ marginTop: 40 }}>
      <h1>Stats</h1><p>Sign in with your founder account first, then come back to this page.</p>
      <Link className="btn" href="/app?next=/admin">Sign in</Link>
    </div></main>
  );
  if (error === "FORBIDDEN") return (
    <main className="wrap" style={{ maxWidth: 560 }}><div className="card" style={{ marginTop: 40 }}>
      <h1>Stats</h1><p>This account isn&apos;t a founder account. Add its email to FOUNDER_EMAILS (or its Telegram ID to FOUNDER_TELEGRAM_IDS) in Vercel.</p>
    </div></main>
  );

  const s = data?.stats, r = data?.series.retention;
  return (
    <main className="wrap adm" style={{ maxWidth: 1100 }}>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, marginTop: 16 }}>
        <div>
          <h1 style={{ margin: 0 }}>📊 Mock Night stats</h1>
          <div className="muted small">{data ? `Updated ${new Date(data.generatedAt).toLocaleString("en-GB", { timeZone: "Europe/London" })} (UK time)` : "Loading…"}</div>
        </div>
        <div className="adm-range" role="group" aria-label="Date range">
          {[7, 30, 90].map((d) => <button key={d} className={`btn ${days === d ? "" : "secondary"}`} onClick={() => setDays(d)} disabled={loading}>{d} days</button>)}
          <button className="btn secondary" onClick={() => load(days)} disabled={loading}>{loading ? "…" : "Refresh"}</button>
        </div>
      </div>
      {error && error !== "UNAUTHORIZED" && error !== "FORBIDDEN" ? <p className="card">Couldn&apos;t load stats ({error}). Try Refresh.</p> : null}

      {s && r && (
        <>
          <section className="adm-tiles">
            <Tile label="Users" value={fmt(s.users.total)} sub={`Telegram ${fmt(s.users.telegram)} · web ${fmt(s.users.web_only)}`} />
            <Tile label="New users" value={`+${fmt(s.users.new_7d)}`} sub={`7 days · today ${fmt(s.users.new_today)} · 30d ${fmt(s.users.new_30d)}`} />
            <Tile label="Active users" value={fmt(s.activity.active_7d)} sub={`7 days · today ${fmt(s.activity.active_today)} · 30d ${fmt(s.activity.active_30d)}`} />
            <Tile label="Answers" value={fmt(s.activity.answers_7d)} sub={`7 days · ${s.activity.accuracy_7d ?? "—"}% correct`} />
            <Tile label="Paying now" value={fmt(s.users.paid_active)} sub={`on free trial ${fmt(s.users.in_trial)}`} />
            <Tile label="Revenue, 30 days" value={moneyLine(s.money.d30)} sub={`7 days: ${moneyLine(s.money.d7)}`} />
            <Tile label="Day-1 / day-7 return" value={`${pct(r.d1, r.cohort)} / ${pct(r.d7, r.cohort)}`} sub={`of ${fmt(r.cohort)} users who joined 8–38 days ago`} />
            <Tile label="Live questions" value={fmt(s.content.live_questions)} sub={`question reports 7d: ${fmt(s.activity.reports_7d)}`} />
          </section>

          <section className="adm-grid">
            <Bars title="New sign-ups" days={ser} series={[{ key: "signups_telegram", label: "Telegram", color: C1 }, { key: "signups_web", label: "Web", color: C2 }]} />
            <Line title="Daily active users" days={ser} k="active" label="Active users" />
            <Bars title="Questions answered" days={ser} series={[{ key: "answers", label: "Answers", color: C1 }]} />
            <Bars title="Mock tests submitted" days={ser} series={[{ key: "mocks", label: "Mocks", color: C1 }]} />
            <Bars title="Successful payments" days={ser} series={[{ key: "payments", label: "Payments", color: C1 }]} />
            <div className="card adm-chart">
              <b>In this {days}-day period</b>
              <ul className="adm-list">
                <li><span>Sign-ups</span><b>{fmt(totals.signups)}</b></li>
                <li><span>Answers</span><b>{fmt(totals.answers)}</b></li>
                <li><span>Accuracy</span><b>{pct(totals.correct, totals.answers)}</b></li>
                <li><span>Revenue</span><b>{Object.entries(data.series.revenue_by_currency).map(([c, a]) => cash(c, a)).join(" · ") || "—"}</b></li>
                <li><span>Unfinished checkouts (24h)</span><b>{fmt(s.money.pending_24h)}</b></li>
                <li><span>7d: drills · AI explains · essays</span><b>{fmt(s.activity.drills_done_7d)} · {fmt(s.activity.ai_explains_7d)} · {fmt(s.activity.essays_7d)}</b></li>
              </ul>
            </div>
          </section>

          <section className="adm-grid">
            <Table title="Top exams" head={["Exam", "Users", "New 7d", "Active 7d"]} rows={s.tracks.map((t) => [t.label, t.users, t.new_7d, t.active_7d])} />
            <Table title="Where new users came from (30 days)" head={["Source", "Users"]} rows={s.sources_30d.map((x) => [x.source, x.n])} />
            <Table title="Most-practised subjects (7 days)" head={["Subject", "Answers", "Correct"]} rows={data.series.top_subjects_7d.map((x) => [x.name, x.answers, `${x.accuracy}%`])} />
            <Table title="Revenue by currency" head={["Currency", "Today", "30 days", "All time"]} rows={Object.keys({ ...s.money.all }).map((c) => [c, s.money.today[c] ? cash(c, s.money.today[c].amount) : "—", s.money.d30[c] ? cash(c, s.money.d30[c].amount) : "—", cash(c, s.money.all[c].amount)])} />
            <Table title="Top plans (30 days)" head={["Plan", "Sales"]} rows={s.money.top_plans_30d.map((p) => [p.plan, p.n])} />
          </section>
          <Users />
        </>
      )}
    </main>
  );
}
