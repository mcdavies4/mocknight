"use client";
import { useEffect } from "react";
import { configureBrowserDb } from "@/lib/supabase-browser";

/**
 * Makes web sign-in work on every page (not just /app):
 * 1. Gives the browser Supabase client its URL/key before any page code calls the API.
 * 2. If a sign-in link lands anywhere other than /app (e.g. Supabase fell back to the site URL),
 *    forward the tokens in the URL hash to /app so the session is picked up.
 */
export function AuthBridge({ url, anonKey }: { url: string; anonKey: string }) {
  configureBrowserDb(url, anonKey);
  useEffect(() => {
    const { pathname, search, hash } = window.location;
    if (pathname !== "/app" && /(access_token|error_description)=/.test(hash)) window.location.replace(`/app${search}${hash}`);
  }, []);
  return null;
}
