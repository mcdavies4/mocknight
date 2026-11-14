import { NextResponse } from "next/server";
import { db } from "@/lib/supabase";

export const dynamic = "force-dynamic";

/**
 * Setup check. Open /api/health?secret=YOUR_CRON_SECRET in a browser.
 * Shows which env vars are set (not their values), database/migration status,
 * question counts and the Telegram webhook status.
 */
export async function GET(req: Request) {
  const secret = new URL(req.url).searchParams.get("secret");
  if (!process.env.CRON_SECRET || secret !== process.env.CRON_SECRET) return NextResponse.json({ error: "add ?secret=YOUR_CRON_SECRET" }, { status: 401 });

  const envNames = [
    "TELEGRAM_BOT_TOKEN", "TELEGRAM_BOT_USERNAME", "TELEGRAM_WEBHOOK_SECRET", "APP_URL", "CRON_SECRET", "DASHBOARD_SIGNING_SECRET",
    "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY",
    "PAYSTACK_SECRET_KEY", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "CHAPA_SECRET_KEY", "ANTHROPIC_API_KEY", "RESEND_API_KEY", "EMAIL_FROM",
  ];
  const env = Object.fromEntries(envNames.map((n) => [n, !!process.env[n]]));
  const out: Record<string, unknown> = { env, appUrl: process.env.APP_URL ?? null };

  // Database + migrations
  try {
    const checks: Record<string, string> = {};
    const probe = async (label: string, fn: () => PromiseLike<{ error: { message: string } | null }>) => {
      const { error } = await fn();
      checks[label] = error ? `❌ ${error.message}` : "✅";
    };
    await probe("0001 base tables", () => db().from("questions").select("id").limit(1));
    await probe("0002 tracks/web columns", () => db().from("students").select("track, email, auth_user_id").limit(1));
    await probe("0003 growth/courses", () => db().from("certificates").select("id").limit(1));
    await probe("0003 referral columns", () => db().from("students").select("ref_code, parent_email, link_code").limit(1));
    await probe("0004 NMC test variants", () => db().from("mocks").select("variant").limit(1));
    await probe("0005 project management subjects", () => db().from("subjects").select("code").eq("code", "PRN").single());
    await probe("0006 Ethiopia & India subjects", () => db().from("subjects").select("code").eq("code", "QNT").single());
    await probe("0007 UK pathway subjects", () => db().from("subjects").select("code").eq("code", "DRV").single());
    await probe("0008 UK practice publication", () => db().from("questions").select("practice_published").limit(1));
    out.migrations = checks;

    const subjects = ["ENG", "MTH", "PHY", "CHM", "BIO", "ECO", "GOV", "LUK", "FIR", "NMN", "NMC", "NCX", "PRN", "SCR", "PMF", "APT", "QNT", "GAI", "HIS", "GEO", "DRV", "FSE1", "FSE2", "FSM1", "FSM2", "CAR"];
    const counts: Record<string, string> = {};
    for (const s of subjects) {
      const [{ count: reviewed }, { count: all }] = await Promise.all([
        db().from("questions").select("*", { count: "exact", head: true }).eq("subject_code", s).or("reviewed.eq.true,practice_published.eq.true"),
        db().from("questions").select("*", { count: "exact", head: true }).eq("subject_code", s),
      ]);
      counts[s] = `${reviewed ?? 0} live / ${all ?? 0} total`;
    }
    out.questions = counts;
    const { count: students } = await db().from("students").select("*", { count: "exact", head: true });
    out.students = students;
    const { error: rpcErr } = await db().rpc("pick_random_questions", { p_subject: "ENG", p_limit: 1, p_exclude: [] });
    out.questionPicker = rpcErr ? `❌ ${rpcErr.message}` : "✅";
  } catch (e) {
    out.database = `❌ ${(e as Error).message}`;
  }

  // Telegram
  if (process.env.TELEGRAM_BOT_TOKEN) {
    try {
      const r = await fetch(`https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/getWebhookInfo`);
      const j = (await r.json()) as { result?: { url?: string; pending_update_count?: number; last_error_message?: string; last_error_date?: number; allowed_updates?: string[] } };
      const w = j.result ?? {};
      out.telegramWebhook = {
        url: w.url,
        urlMatchesAppUrl: !!w.url && !!process.env.APP_URL && w.url.startsWith(process.env.APP_URL.replace(/\/$/, "")),
        pending: w.pending_update_count,
        lastError: w.last_error_message ?? null,
        lastErrorAt: w.last_error_date ? new Date(w.last_error_date * 1000).toISOString() : null,
        allowedUpdates: w.allowed_updates,
      };
    } catch (e) {
      out.telegramWebhook = `❌ ${(e as Error).message}`;
    }
  }
  return NextResponse.json(out, { headers: { "Cache-Control": "no-store" } });
}
