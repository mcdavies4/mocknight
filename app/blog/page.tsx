import Link from "next/link";
import type { Metadata } from "next";
import { sortedPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Exam guides and study tips | Mock Night blog",
  description: "Plain-English guides to the Life in the UK Test, UK driving theory, JAMB, NMC CBT, care jobs, data analytics and more: formats, pass marks and study plans that work.",
  alternates: { canonical: "/blog" },
};

const fmt = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default function Blog() {
  const posts = sortedPosts();
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <section className="hero">
        <div className="muted small">📚 Mock Night blog</div>
        <h1>Exam guides and study tips</h1>
        <p className="muted">What each exam looks like, how it&apos;s marked, and study plans that actually work.</p>
      </section>
      <div className="post-list">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="card post-card">
            <div className="muted small">{p.tag} · {p.readMins} min read</div>
            <h2>{p.title}</h2>
            <p className="muted small">{p.description}</p>
            <span className="muted small">{fmt(p.updated ?? p.date)}</span>
          </Link>
        ))}
      </div>
    </main>
  );
}
