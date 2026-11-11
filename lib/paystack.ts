import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { env } from "./env";
import { db, must } from "./supabase";
import { PLANS, SEAT_DAYS, SEAT_PRICE_KOBO } from "./pricing";
import type { Student, TutorGroup } from "./types";

type Plan = keyof typeof PLANS | "seats";

/**
 * Paystack requires an email. Telegram users don't give us one, so we use a stable
 * placeholder per user. Swap for a real (parent) email if you start collecting it.
 */
const placeholderEmail = (telegramId: number) => `tg${telegramId}@users.mocknight.app`;

export async function createCheckout(
  student: Student,
  plan: Plan,
  opts: { group?: TutorGroup; seats?: number } = {},
): Promise<string> {
  let amountKobo: number;
  if (plan === "seats") {
    if (!opts.group || !opts.seats || opts.seats < 1) throw new Error("seats checkout needs group + seats");
    amountKobo = opts.seats * SEAT_PRICE_KOBO;
  } else {
    amountKobo = PLANS[plan].amountKobo;
  }

  const reference = `mn_${Date.now()}_${randomBytes(4).toString("hex")}`;
  must(
    await db().from("payments").insert({
      reference,
      student_id: student.id,
      group_id: opts.group?.id ?? null,
      plan,
      seats: opts.seats ?? null,
      amount_kobo: amountKobo,
    }),
    "insert payment",
  );

  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.paystackSecret}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: placeholderEmail(student.telegram_id),
      amount: amountKobo,
      currency: "NGN",
      reference,
      callback_url: `${env.appUrl}/paid`,
      metadata: { student_id: student.id, plan, group_id: opts.group?.id ?? null, seats: opts.seats ?? null },
    }),
  });
  const json = (await res.json()) as { status: boolean; message: string; data?: { authorization_url: string } };
  if (!json.status || !json.data) throw new Error(`Paystack: ${json.message}`);
  return json.data.authorization_url;
}

export function verifyPaystackSignature(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const expected = createHmac("sha512", env.paystackSecret).update(rawBody).digest("hex");
  const a = Buffer.from(expected);
  const b = Buffer.from(signature);
  return a.length === b.length && timingSafeEqual(a, b);
}

const addDays = (from: string | null, days: number) => {
  const base = from && new Date(from) > new Date() ? new Date(from) : new Date();
  return new Date(base.getTime() + days * 86400_000).toISOString();
};

/**
 * Apply a successful charge. Idempotent: a reference is only applied once.
 * Returns what changed so the caller can notify the user.
 */
export async function applySuccessfulPayment(reference: string, amountKobo: number) {
  const { data: claimed } = await db()
    .from("payments")
    .update({ status: "success", paid_at: new Date().toISOString() })
    .eq("reference", reference)
    .eq("status", "pending")
    .select("*")
    .maybeSingle();
  if (!claimed) return null; // unknown or already applied
  if (amountKobo < claimed.amount_kobo) {
    await db().from("payments").update({ status: "failed" }).eq("reference", reference);
    return null;
  }

  const student = must(await db().from("students").select("*").eq("id", claimed.student_id).single(), "payer") as Student;

  if (claimed.plan === "seats") {
    const group = must(await db().from("tutor_groups").select("*").eq("id", claimed.group_id).single(), "group") as TutorGroup;
    const paidUntil = addDays(group.paid_until, SEAT_DAYS);
    await db().from("tutor_groups").update({ paid_seats: claimed.seats, paid_until: paidUntil }).eq("id", group.id);
    await reassignSeats(group.id, claimed.seats);
    return { student, kind: "seats" as const, group, seats: claimed.seats as number, until: paidUntil };
  }

  const plan = PLANS[claimed.plan as keyof typeof PLANS];
  const until = addDays(student.premium_until, plan.days);
  await db().from("students").update({ premium_until: until }).eq("id", student.id);
  return { student, kind: "premium" as const, until };
}

/** Give seats to the earliest members, up to the number paid for. */
export async function reassignSeats(groupId: string, seats: number) {
  const members = must(
    await db().from("group_members").select("student_id").eq("group_id", groupId).order("joined_at", { ascending: true }),
    "members",
  ) as { student_id: string }[];
  const seated = members.slice(0, seats).map((m) => m.student_id);
  await db().from("group_members").update({ has_seat: false }).eq("group_id", groupId);
  if (seated.length) await db().from("group_members").update({ has_seat: true }).eq("group_id", groupId).in("student_id", seated);
}
