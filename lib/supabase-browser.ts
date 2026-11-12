"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;
let cfg: { url: string; key: string } | null = null;

/** Called once by the /app page with values read on the server at request time (no rebuild needed). */
export function configureBrowserDb(url: string, key: string) {
  if (!cfg) cfg = { url, key };
}

export function browserDbReady() {
  return Boolean((cfg?.url || process.env.NEXT_PUBLIC_SUPABASE_URL) && (cfg?.key || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY));
}

/** Browser Supabase client (anon key) — used only for email sign-in on the web app. */
export function browserDb(): SupabaseClient {
  if (!client) {
    const url = cfg?.url || process.env.NEXT_PUBLIC_SUPABASE_URL || "";
    const key = cfg?.key || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
    client = createClient(url, key, {
      auth: { flowType: "implicit", persistSession: true, detectSessionInUrl: true, autoRefreshToken: true },
    });
  }
  return client;
}

export async function getAccessToken(): Promise<string | null> {
  if (!browserDbReady()) return null;
  const { data } = await browserDb().auth.getSession();
  return data.session?.access_token ?? null;
}
