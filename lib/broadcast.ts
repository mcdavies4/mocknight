import { GrammyError, type Api } from "grammy";
import { db } from "./supabase";

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

/**
 * Send to many users while staying under Telegram's ~30 msg/s limit.
 * Users who blocked the bot are marked so we stop messaging them.
 * Note: on Vercel, keep batches small enough to finish inside maxDuration.
 */
export async function broadcast<T extends { telegram_id: number; id: string }>(
  api: Api,
  recipients: T[],
  send: (api: Api, r: T) => Promise<unknown>,
) {
  let sent = 0;
  const BATCH = 25;
  for (let i = 0; i < recipients.length; i += BATCH) {
    const batch = recipients.slice(i, i + BATCH);
    await Promise.all(
      batch.map(async (r) => {
        try {
          await send(api, r);
          sent++;
        } catch (e) {
          if (e instanceof GrammyError && (e.error_code === 403 || e.description.includes("chat not found"))) {
            await db().from("students").update({ blocked: true }).eq("id", r.id);
          } else if (e instanceof GrammyError && e.error_code === 429) {
            await sleep(((e.parameters?.retry_after ?? 1) + 0.5) * 1000);
          } else {
            console.error("broadcast send failed", r.telegram_id, e);
          }
        }
      }),
    );
    if (i + BATCH < recipients.length) await sleep(1100);
  }
  return sent;
}
