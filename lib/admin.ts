// Founder dashboard: /admin in the bot, plus a morning summary sent to founders at 8am UK time.
import type { Api } from "grammy";
import { db } from "./supabase";
import { TRIAL_DAYS } from "./pricing";
import { getTrack } from "./tracks";

type Money = Record<string, { n: number; amount: number }>;
interface Stats {
  users: Record<string, number>;
  activity: Record<string, number | null>;
  money: { today: Money; d7: Money; d30: Money; all: Money; top_plans_30d: { plan: string; n: number }[]; pending_24h: number };
  tracks: { track: string; users: number; new_7d: number; active_7d: number }[];
  sources_30d: { source: string; n: number }[];
  content: Record<string, number>;
}

export async function adminStats(): Promise<Stats> {
  const { data, error } = await db().rpc("admin_stats", { p_trial_days: TRIAL_DAYS });
  if (error) throw error;
  return data as Stats;
}

const SYM: Record<string, string> = { NGN: "₦", GBP: "£", USD: "$", INR: "₹", EUR: "€", ETB: "Br " };
const n = (v: number | null | undefined) => (v ?? 0).toLocaleString("en-GB");
function money(m: Money) {
  const parts = Object.entries(m).map(([cur, v]) =>
    cur === "XTR" ? `⭐${n(v.amount)} (${v.n})` : `${SYM[cur] ?? cur + " "}${(v.amount / 100).toLocaleString("en-GB", { maximumFractionDigits: 2 })} (${v.n})`,
  );
  return parts.length ? parts.join(" · ") : "—";
}
const trackName = (code: string) => { try { const t = getTrack(code); return `${t.emoji} ${t.short}`; } catch { return code; } };

/** Plain-text dashboard (no Markdown, so names with symbols can't break it). */
export function formatStats(s: Stats, title = "📊 Mock Night — admin") {
  const u = s.users, a = s.activity, m = s.money, c = s.content;
  const lines = [
    title,
    "",
    "👥 USERS",
    `Total ${n(u.total)} (Telegram ${n(u.telegram)} · web only ${n(u.web_only)})`,
    `New: today ${n(u.new_today)} · 7d ${n(u.new_7d)} · 30d ${n(u.new_30d)}`,
    `Finished setup ${n(u.onboarded)} · blocked bot ${n(u.blocked)}`,
    `On free trial ${n(u.in_trial)} · paying now ${n(u.paid_active)}`,
    "",
    "🔥 ACTIVITY",
    `Active: today ${n(a.active_today)} · 7d ${n(a.active_7d)} · 30d ${n(a.active_30d)}`,
    `Answers: today ${n(a.answers_today)} · 7d ${n(a.answers_7d)}${a.accuracy_7d != null ? ` (${a.accuracy_7d}% correct)` : ""}`,
    `7d: drills ${n(a.drills_done_7d)} · mocks ${n(a.mocks_7d)} · AI explains ${n(a.ai_explains_7d)} · essays ${n(a.essays_7d)} · battles ${n(a.battles_7d)}`,
    `Question reports (7d): ${n(a.reports_7d)}`,
    "",
    "💰 REVENUE (count in brackets)",
    `Today: ${money(m.today)}`,
    `7 days: ${money(m.d7)}`,
    `30 days: ${money(m.d30)}`,
    `All time: ${money(m.all)}`,
    ...(m.top_plans_30d.length ? [`Top plans (30d): ${m.top_plans_30d.map((p) => `${p.plan} ×${p.n}`).join(", ")}`] : []),
    ...(m.pending_24h ? [`Unfinished checkouts (24h): ${n(m.pending_24h)}`] : []),
    "",
    "🎯 TOP EXAMS (users · new 7d · active 7d)",
    ...(s.tracks.length ? s.tracks.slice(0, 10).map((t) => `${trackName(t.track)}: ${n(t.users)} · +${n(t.new_7d)} · ${n(t.active_7d)}`) : ["—"]),
    "",
    "📣 WHERE NEW USERS CAME FROM (30d)",
    s.sources_30d.length ? s.sources_30d.map((x) => `${x.source} ${n(x.n)}`).join(" · ") : "—",
    "",
    "🏭 QUESTIONS",
    `Live ${n(c.live_questions)} · factory added 24h ${n(c.factory_24h)} (total ${n(c.factory_total)}, batches waiting ${n(c.factory_pending)})`,
  ];
  return lines.join("\n");
}

const founderIds = () => (process.env.FOUNDER_TELEGRAM_IDS ?? "").split(/[,\s]+/).filter(Boolean);

/** Called from the hourly job: at 8am UK time, send founders yesterday-and-today's numbers, once per day. */
export async function maybeSendAdminDigest(api: Api) {
  const now = new Date();
  const hour = Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/London", hour: "numeric", hourCycle: "h23" }).format(now));
  if (hour !== 8 || !founderIds().length) return "skip";
  const date = new Intl.DateTimeFormat("en-CA", { timeZone: "Europe/London" }).format(now);
  const { error } = await db().from("admin_digests").insert({ digest_date: date });
  if (error) return "already sent"; // primary key clash = another run already sent today's digest
  const text = formatStats(await adminStats(), `☀️ Mock Night — morning summary (${date})`);
  for (const id of founderIds()) await api.sendMessage(id, text).catch((e) => console.error("admin digest", id, e));
  return "sent";
}
