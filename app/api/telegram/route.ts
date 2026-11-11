import { webhookCallback } from "grammy";
import { getBot } from "@/bot/bot";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

let handler: ((req: Request) => Promise<Response>) | null = null;

export async function POST(req: Request) {
  handler ??= webhookCallback(getBot(), "std/http", {
    secretToken: env.webhookSecret,
    onTimeout: "return",
    timeoutMilliseconds: 25_000,
  });
  return handler(req);
}
