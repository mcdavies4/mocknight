import Link from "next/link";
import { EmailStart } from "@/components/email-start";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { POSTS, postBySlug, sortedPosts } from "@/lib/blog";
import { Prose } from "@/components/prose";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = postBySlug((await params).slug);
  if (!p) return {};
  const url = `/blog/${p.slug}`;
  return {
    title: `${p.title} | Mock Night`,
    description: p.description,
    alternates: { canonical: url },
    openGraph: { type: "article", title: p.title, description: p.description, url, publishedTime: p.date, modifiedTime: p.updated ?? p.date, images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title: p.title, description: p.description, images: ["/opengraph-image"] },
  };
}

const fmt = (d: string) => new Date(d + "T12:00:00Z").toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = postBySlug((await params).slug);
  if (!p) notFound();
  const more = sortedPosts().filter((x) => x.slug !== p.slug).slice(0, 3);
  const url = `${SITE_URL}/blog/${p.slug}`;
  return (
    <main className="wrap" style={{ maxWidth: 760 }}>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "BlogPosting", headline: p.title, description: p.description, datePublished: p.date, dateModified: p.updated ?? p.date,
          mainEntityOfPage: url, url, image: `${SITE_URL}/opengraph-image`, inLanguage: "en-GB",
          author: { "@type": "Organization", name: "Mock Night", url: SITE_URL },
          publisher: { "@type": "Organization", name: "Mock Night", logo: { "@type": "ImageObject", url: `${SITE_URL}/icons/icon-512.png` } } },
        { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: p.faq.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 2, name: p.title, item: url } ] },
      ]} />
      <article>
        <p className="muted small" style={{ marginTop: 24 }}><Link href="/blog">← All guides</Link></p>
        <div className="muted small">{p.tag} · {p.readMins} min read · {fmt(p.updated ?? p.date)}</div>
        <h1 style={{ marginTop: 6 }}>{p.title}</h1>
        <Prose body={p.body} />

        <section className="card" style={{ margin: "28px 0" }}>
          <b>Get a free practice test</b>
          <p className="muted small" style={{ margin: "6px 0 12px" }}>Daily questions with explanations and full timed mock tests. Enter your email and we&apos;ll send your free access link.</p>
          <EmailStart compact track={p.exam} button="Send my free test" />
          <p className="muted small" style={{ margin: "10px 0 0" }}><Link href={p.examHref}>See what&apos;s included →</Link></p>
        </section>

        <h2>Frequently asked questions</h2>
        <div className="faq">
          {p.faq.map(([q, a]) => (
            <details key={q} className="card" style={{ marginBottom: 8 }}>
              <summary><b>{q}</b></summary>
              <p className="muted" style={{ marginBottom: 0 }}>{a}</p>
            </details>
          ))}
        </div>
        <p className="muted small" style={{ marginTop: 20 }}>Exam rules and fees can change. Always check the official exam body before you book. Mock Night is an independent practice resource, a product of The 36th Solutions Ltd.</p>
      </article>

      <section style={{ marginTop: 32 }}>
        <h2>More guides</h2>
        <div className="post-list">
          {more.map((m) => (
            <Link key={m.slug} href={`/blog/${m.slug}`} className="card post-card">
              <div className="muted small">{m.tag}</div>
              <h3>{m.title}</h3>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
