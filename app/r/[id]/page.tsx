import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getShareData } from "@/lib/share";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const d = await getShareData(id);
  if (!d) return { title: "Mock Night" };
  const title = `${d.firstName} scored ${d.headline} — ${d.trackName}`;
  return {
    title,
    description: `${d.sub}. Practise free with Mock Night — daily questions and real timed tests.`,
    openGraph: { title, images: [{ url: `/api/card/${id}`, width: 1080, height: 1080 }] },
    twitter: { card: "summary_large_image", title, images: [`/api/card/${id}`] },
  };
}

export default async function SharePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await getShareData(id);
  if (!d) notFound();
  const join = d.refCode ? `/join/${d.refCode}` : "/app";
  return (
    <main className="wrap" style={{ maxWidth: 560, paddingTop: 24 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`/api/card/${id}`} alt={`${d.firstName} scored ${d.headline}`} style={{ width: "100%", borderRadius: 16 }} />
      <h2 style={{ marginBottom: 4 }}>Think you can beat {d.firstName}?</h2>
      <p className="muted" style={{ marginTop: 0 }}>Daily practice that repeats what you get wrong, real timed tests, and a score that tells you when you&apos;re ready.</p>
      <Link className="btn block" href={join}>Start practising free</Link>
    </main>
  );
}
