"use client";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let client: SupabaseClient | null = null;

/** Browser Supabase client (anon key) — used only for email sign-in on the web app. */
export function browserDb(): SupabaseClient {
  if (!client) {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
      auth: { flowType: "implicit", persistSession: true, detectSessionInUrl: true, autoRefreshToken: true },
    });
  }
  return client;
}

export async function getAccessToken(): Promise<string | null> {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) return null;
  const { data } = await browserDb().auth.getSession();
  return data.session?.access_token ?? null;
}
