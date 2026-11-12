import { Suspense } from "react";
import Learn from "./learn";

export const metadata = { title: "Your dashboard — Mock Night" };
export const dynamic = "force-dynamic";

export default function AppPage() {
  // Read at request time so new Vercel env vars work without a rebuild.
  const sbUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL || "";
  const sbKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
  return (
    <Suspense fallback={<div className="center"><p className="muted">Loading…</p></div>}>
      <Learn sbUrl={sbUrl.trim()} sbKey={sbKey.trim()} />
    </Suspense>
  );
}
