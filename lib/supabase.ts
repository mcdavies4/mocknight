import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { env } from "./env";

let client: SupabaseClient | null = null;

/** Server-only Supabase client using the service-role key. */
export function db(): SupabaseClient {
  if (!client) {
    client = createClient(env.supabaseUrl, env.supabaseServiceKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }
  return client;
}

/** Throw on Supabase errors so callers can stay linear. */
export function must<T>(res: { data: T; error: { message: string } | null }, what = "db"): T {
  if (res.error) throw new Error(`${what}: ${res.error.message}`);
  return res.data;
}
