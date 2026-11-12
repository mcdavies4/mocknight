import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { env } from "./env";
import { db, must } from "./supabase";
import { PLANS, SEATS } from "./pricing";
import type { Student, TutorGroup } from "./types";

/**
 * Create a checkout link. NGN plans → Paystack, GBP plans → Stripe.
 * Tutor seats are always NGN/Paystack.
 */
export async function createCheckout(
  student: Student,
  planCode: string,
  opts: { group?: TutorGroup; seats?: number; returnTo?: "telegram" | "web" } = {},
): Promise<string> {
  const reference = `mn_${Date.now()}_${randomBytes(4).toString("hex")}`;

  if (planCode === "seats") {
    if (!opts.group || !opts.seats || opts.seats < 1) throw new Error("seats checkout needs group + seats");
    const cur = opts.group.currency ?? "NGN";
    const seat = SEATS[cur];
    const amount = opts.seats * seat.amount;
    await recordPending(reference, student, "seats", amount, cur, seat.provider, opts.group.id, opts.seats);
    return seat.provider === "stripe"
      ? stripeInit(student, reference, amount, cur, `${opts.seats} learner seats — ${opts.group.name} (12 months)`, opts.returnTo ?? (student.telegram_id ? "telegram" : "web"))
      : paystackInit(student, reference, amount, { plan: "seats", group_id: opts.group.id, seats: opts.seats });
  }

  const plan = PLANS[planCode];
  if (!plan) throw new Error(`Unknown plan ${planCode}`);
  await recordPending(reference, student, plan.code, plan.amount, plan.currency, plan.provider);
  return plan.provider === "stripe"
    ? stripeInit(student, reference, plan.amount, plan.currency, plan.label, opts.returnTo ?? (student.telegram_id ? "telegram" : "web"))
    : paystackInit(student, reference, plan.amount, { plan: plan.code });
}

async function recordPending(
  reference: string, student: Student, plan: string, amount: number, currency: string, provider: string, groupId?: string, seats?: number,
) {
  must(
    await db().from("payments").insert({
      reference, student_id: student.id, group_id: groupId ?? null, plan, seats: seats ?? null,
      amount_kobo: amount, currency, provider,
    }),
    "insert payment",
  );
}

// ---------------------------------------------------------------------------
// Paystack (NGN)
// ---------------------------------------------------------------------------
/** Paystack needs an email; Telegram users have none, so use a stable placeholder. */
const payerEmail = (s: Student) => s.email ?? `tg${s.telegram_id ?? s.id}@users.mocknight.app`;

async function paystackInit(student: Student, reference: string, amount: number, metadata: Record<string, unknown>) {
  const res = await fetch("https://api.paystack.co/transaction/initialize", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.paystackSecret}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      email: payerEmail(student), amount, currency: "NGN", reference,
      callback_url: `${env.appUrl}/paid?to=${student.telegram_id ? "telegram" : "web"}`, metadata: { student_id: student.id, ...metadata },
    }),
  });
  const json = (await res.json()) as { status: boolean; message: string; data?: { authorization_url: string } };
  if (!json.status || !json.data) throw new Error(`Paystack: ${json.message}`);
  return json.data.authorization_url;
}

export function verifyPaystackSignature(rawBody: string, signature: string | null) {
  if (!signature) return false;
  const expected = createHmac("sha512", env.paystackSecret).update(rawBody).digest("hex");
  return safeEqual(expected, signature);
}

// ---------------------------------------------------------------------------
// Stripe (GBP) — plain REST, no SDK
// ---------------------------------------------------------------------------
async function stripeInit(student: Student, reference: string, amount: number, currency: string, label: string, returnTo: "telegram" | "web") {
  const form = new URLSearchParams({
    mode: "payment",
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": currency.toLowerCase(),
    "line_items[0][price_data][unit_amount]": String(amount),
    "line_items[0][price_data][product_data][name]": label,
    success_url: `${env.appUrl}/paid?ref=${reference}&to=${returnTo}`,
    cancel_url: returnTo === "web" ? `${env.appUrl}/app` : `${env.appUrl}/paid?cancelled=1&to=telegram`,
    client_reference_id: reference,
    "metadata[reference]": reference,
    "payment_intent_data[metadata][reference]": reference,
  });
  if (student.email) form.set("customer_email", student.email);

  const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: { Authorization: `Bearer ${env.stripeSecret}`, "Content-Type": "application/x-www-form-urlencoded" },
    body: form,
  });
  const json = (await res.json()) as { url?: string; error?: { message: string } };
  if (!json.url) throw new Error(`Stripe: ${json.error?.message ?? "no checkout url"}`);
  return json.url;
}

/** Verify the Stripe-Signature header (t=…,v1=…), tolerance 5 minutes. */
export function verifyStripeSignature(rawBody: string, header: string | null) {
  if (!header) return false;
  const parts = Object.fromEntries(header.split(",").map((kv) => kv.split("=") as [string, string]));
  const t = parts.t;
  const sigs = header.split(",").filter((kv) => kv.startsWith("v1=")).map((kv) => kv.slice(3));
  if (!t || !sigs.length) return false;
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const expected = createHmac("sha256", env.stripeWebhookSecret).update(`${t}.${rawBody}`).digest("hex");
  return sigs.some((s) => safeEqual(expected, s));
}

// ---------------------------------------------------------------------------
// Applying payments (both providers)
// ---------------------------------------------------------------------------
function safeEqual(a: string, b: string) {
  const ab = Buffer.from(a), bb = Buffer.from(b);
  return ab.length === bb.length && timingSafeEqual(ab, bb);
}

const addDays = (from: string | null, days: number) => {
  const base = from && new Date(from) > new Date() ? new Date(from) : new Date();
  return new Date(base.getTime() + days * 86400_000).toISOString();
};

/** Idempotent: a reference is applied once. Returns what changed so callers can notify. */
export async function applySuccessfulPayment(reference: string, amountPaid: number, currency: string) {
  const { data: claimed } = await db()
    .from("payments")
    .update({ status: "success", paid_at: new Date().toISOString() })
    .eq("reference", reference)
    .eq("status", "pending")
    .select("*")
    .maybeSingle();
  if (!claimed) return null;
  if (amountPaid < claimed.amount_kobo || currency.toUpperCase() !== claimed.currency) {
    await db().from("payments").update({ status: "failed" }).eq("reference", reference);
    return null;
  }

  const student = must(await db().from("students").select("*").eq("id", claimed.student_id).single(), "payer") as Student;

  if (claimed.plan === "seats") {
    const group = must(await db().from("tutor_groups").select("*").eq("id", claimed.group_id).single(), "group") as TutorGroup;
    const paidUntil = addDays(group.paid_until, SEATS[group.currency ?? "NGN"].days);
    await db().from("tutor_groups").update({ paid_seats: claimed.seats, paid_until: paidUntil }).eq("id", group.id);
    await reassignSeats(group.id, claimed.seats);
    return { student, kind: "seats" as const, group, seats: claimed.seats as number, until: paidUntil };
  }

  const plan = PLANS[claimed.plan];
  const until = addDays(student.premium_until, plan?.days ?? 30);
  await db().from("students").update({ premium_until: until }).eq("id", student.id);
  return { student, kind: "premium" as const, until };
}

export async function reassignSeats(groupId: string, seats: number) {
  const members = must(
    await db().from("group_members").select("student_id").eq("group_id", groupId).order("joined_at", { ascending: true }),
    "members",
  ) as { student_id: string }[];
  const seated = members.slice(0, seats).map((m) => m.student_id);
  await db().from("group_members").update({ has_seat: false }).eq("group_id", groupId);
  if (seated.length) await db().from("group_members").update({ has_seat: true }).eq("group_id", groupId).in("student_id", seated);
}
