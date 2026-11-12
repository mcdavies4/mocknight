import { randomBytes } from "node:crypto";
import { db } from "./supabase";
import { env } from "./env";
import { notifyTelegram } from "./notify";
import { REFERRAL_DAYS, REFERRAL_MAX_REWARDS } from "./pricing";
import type { Student } from "./types";

export function refLinks(s: Student) {
  const code = s.ref_code ?? "";
  return {
    code,
    telegram: `https://t.me/${env.botUsername}?start=r_${code}`,
    web: `${env.appUrl}/join/${code}`,
  };
}

export async function referralCount(studentId: string) {
  const [{ count: joined }, { count: rewarded }] = await Promise.all([
    db().from("students").select("*", { count: "exact", head: true }).eq("referred_by", studentId),
    db().from("students").select("*", { count: "exact", head: true }).eq("referred_by", studentId).not("referral_rewarded_at", "is", null),
  ]);
  return { joined: joined ?? 0, rewarded: rewarded ?? 0 };
}

/** Link a new learner to whoever invited them. Only for brand-new accounts with no answers yet. */
export async function attachReferrer(student: Student, code: string | null | undefined) {
  if (!code || student.referred_by) return false;
  const clean = code.trim().toUpperCase();
  if (!clean || clean === student.ref_code) return false;
  const { count } = await db().from("attempts").select("*", { count: "exact", head: true }).eq("student_id", student.id);
  if ((count ?? 0) > 0) return false;
  const { data: ref } = await db().from("students").select("id").eq("ref_code", clean).maybeSingle();
  if (!ref || ref.id === student.id) return false;
  await db().from("students").update({ referred_by: ref.id }).eq("id", student.id).is("referred_by", null);
  return true;
}

const extend = (from: string | null, days: number) => {
  const base = from && new Date(from) > new Date() ? new Date(from) : new Date();
  return new Date(base.getTime() + days * 86400_000).toISOString();
};

/**
 * Called when a learner completes their first drill or practice test.
 * Both sides get REFERRAL_DAYS of Premium (referrer capped at REFERRAL_MAX_REWARDS friends).
 */
export async function rewardReferral(studentId: string) {
  const { data: claimed } = await db()
    .from("students")
    .update({ referral_rewarded_at: new Date().toISOString() })
    .eq("id", studentId)
    .not("referred_by", "is", null)
    .is("referral_rewarded_at", null)
    .select("id, telegram_id, premium_until, referred_by, first_name")
    .maybeSingle();
  if (!claimed) return;

  await db().from("students").update({ premium_until: extend(claimed.premium_until, REFERRAL_DAYS) }).eq("id", claimed.id);
  await notifyTelegram(claimed.telegram_id, `🎁 You've unlocked *${REFERRAL_DAYS} days of Premium* for joining with a friend's invite. Enjoy!`);

  const { rewarded } = await referralCount(claimed.referred_by);
  if (rewarded > REFERRAL_MAX_REWARDS) return;
  const { data: referrer } = await db().from("students").select("id, telegram_id, premium_until").eq("id", claimed.referred_by).single();
  if (!referrer) return;
  await db().from("students").update({ premium_until: extend(referrer.premium_until, REFERRAL_DAYS) }).eq("id", referrer.id);
  await notifyTelegram(
    referrer.telegram_id,
    `🎉 ${claimed.first_name ?? "Your friend"} just finished their first practice — you both get *${REFERRAL_DAYS} days of Premium*. Invite more with /invite`,
  );
}

// ---------------------------------------------------------------------------
// Telegram ↔ web account linking
// ---------------------------------------------------------------------------
const ALPHA = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export async function createLinkCode(studentId: string) {
  const code = Array.from(randomBytes(10), (b) => ALPHA[b % ALPHA.length]).join("");
  await db()
    .from("students")
    .update({ link_code: code, link_code_expires: new Date(Date.now() + 15 * 60_000).toISOString() })
    .eq("id", studentId);
  return `https://t.me/${env.botUsername}?start=l_${code}`;
}

export type LinkResult = "linked" | "already" | "expired" | "other_telegram";

/** Merge the Telegram user's account into the web account that generated the code. */
export async function redeemLinkCode(code: string, telegramStudent: Student): Promise<LinkResult> {
  const { data: web } = await db()
    .from("students")
    .select("id, telegram_id, link_code_expires")
    .eq("link_code", code.toUpperCase())
    .maybeSingle();
  if (!web || !web.link_code_expires || new Date(web.link_code_expires) < new Date()) return "expired";
  if (web.id === telegramStudent.id || web.telegram_id === telegramStudent.telegram_id) return "already";
  if (web.telegram_id) return "other_telegram";
  const { error } = await db().rpc("merge_students", { p_keep: web.id, p_drop: telegramStudent.id });
  if (error) throw new Error(error.message);
  await db().from("students").update({ link_code: null, link_code_expires: null }).eq("id", web.id);
  return "linked";
}
