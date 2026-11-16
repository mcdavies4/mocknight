// Web push (daily reminders for the installed web app).
import webpush from "web-push";
import { db } from "./supabase";

const pub = () => process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || process.env.VAPID_PUBLIC_KEY || "";
export const pushPublicKey = pub;
export const pushEnabled = () => Boolean(pub() && process.env.VAPID_PRIVATE_KEY);

let configured = false;
function setup() {
  if (configured) return;
  webpush.setVapidDetails(process.env.VAPID_SUBJECT || "https://mocknight.vercel.app", pub(), process.env.VAPID_PRIVATE_KEY!);
  configured = true;
}

export async function sendPush(studentIds: string[], payload: { title: string; body: string; url?: string; tag?: string }) {
  if (!pushEnabled() || !studentIds.length) return { sent: 0, removed: 0 };
  setup();
  const { data: subs } = await db().from("push_subscriptions").select("endpoint, p256dh, auth, student_id").in("student_id", studentIds);
  let sent = 0, removed = 0;
  for (const s of subs ?? []) {
    try {
      await webpush.sendNotification({ endpoint: s.endpoint, keys: { p256dh: s.p256dh, auth: s.auth } }, JSON.stringify(payload), { TTL: 6 * 3600 });
      sent++;
    } catch (e: any) {
      // 404/410: the subscription has expired or the user uninstalled — clean it up
      if (e?.statusCode === 404 || e?.statusCode === 410) { await db().from("push_subscriptions").delete().eq("endpoint", s.endpoint); removed++; }
      else console.error("push", e?.statusCode, e?.body);
    }
  }
  return { sent, removed };
}
