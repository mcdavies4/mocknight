import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TRACK_LIST } from "@/lib/tracks";
import { examSlug, practiceSubjects, trackFromSlug } from "@/lib/practice";
import { PATHS } from "@/lib/exam-links";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export const revalidate = 86400;

export function generateStaticParams() {
  return TRACK_LIST.map((t) => ({ exam: examSlug(t) }));
}

export async function generateMetadata({ params }: { params: Promise<{ exam: string }> }): Promise<Metadata> {
  const t = trackFromSlug((await params).exam);
  if (!t) return {};
  const title = `Free ${t.short} practice questions with answers | Mock Night`;
  const description = `Free ${t.name} sample questions by subject, with answers and explanations: ${practiceSubjects(t).map((s) => s.name).join(", ")}.`.slice(0, 160);
  return { title, description, alternates: { canonical: `/practice/${examSlug(t)}` }, openGraph: { title, description, url: `/practice/${examSlug(t)}` } };
}

export default async function PracticeExam({ params }: { params: Promise<{ exam: string }> }) {
  const t = trackFromSlug((await params).exam);
  if (!t) notFound();
  const subs = practiceSubjects(t);
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
        { "@type": "ListItem", position: 1, name: "Practice questions", item: `${SITE_URL}/practice` },
        { "@type": "ListItem", position: 2, name: t.short, item: `${SITE_URL}/practice/${examSlug(t)}` } ] }} />
      <section className="hero">
        <div className="muted small"><Link href="/practice">Practice questions</Link> › {t.short}</div>
        <h1>{t.short} practice questions</h1>
        <p className="muted">Free sample questions for the {t.name}, with answers and explanations. Choose a subject:</p>
      </section>
      <div className="post-list">
        {subs.map((s) => (
          <Link key={s.slug} href={`/practice/${examSlug(t)}/${s.slug}`} className="card post-card">
            <h2>{s.name}</h2>
            <p className="muted small">10 free {t.short} {s.name} questions with answers →</p>
          </Link>
        ))}
      </div>
      <p style={{ marginTop: 24 }}><Link className="btn" href={PATHS[t.code]}>About the {t.short} on Mock Night</Link></p>
    </main>
  );
}
