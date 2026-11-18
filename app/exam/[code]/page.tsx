import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getTrack, TRACKS, type TrackCode } from "@/lib/tracks";
import { money, PLANS } from "@/lib/pricing";
import { STARS_ENABLED, starsFor } from "@/lib/stars";
import { subjectName } from "@/lib/subjects";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";
import { BODY } from "@/lib/exam-pages";
import { ExamTry } from "@/components/exam-try";
import { EmailStart } from "@/components/email-start";

export const revalidate = 86400;
// Telegram is the habit in these regions; everywhere else the web app comes first.
const TELEGRAM_FIRST = new Set(["NG", "GH", "WA", "ET"]);




export function generateStaticParams() {
  return Object.keys(BODY).map((code) => ({ code }));
}

export async function generateMetadata({ params }: { params: Promise<{ code: string }> }): Promise<Metadata> {
  const { code } = await params;
  const t = TRACKS[code.toUpperCase() as TrackCode];
  const body = BODY[code.toUpperCase() as TrackCode];
  if (!t || !body) return {};
  const title = `${t.name} practice questions and mock tests | Mock Night`;
  const description = body.lead.length > 158 ? body.lead.slice(0, 155).replace(/\s+\S*$/, "") + "…" : body.lead;
  return { title, description, alternates: { canonical: `/exam/${t.code}` }, openGraph: { title, description, url: `/exam/${t.code}`, images: ["/opengraph-image"] }, twitter: { card: "summary_large_image", title, description, images: ["/opengraph-image"] } };
}

export default async function ExamPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const key = code.toUpperCase() as TrackCode;
  const body = BODY[key];
  if (!TRACKS[key] || !body) notFound();
  const t = getTrack(key);
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  const plans = t.plans.map((p) => PLANS[p]).filter(Boolean);
  const tgFirst = !!bot && TELEGRAM_FIRST.has(t.region);
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "Course", name: `${t.name} practice`, description: body.lead, url: `${SITE_URL}/exam/${t.code}`, inLanguage: "en",
          provider: { "@type": "Organization", name: "Mock Night", sameAs: SITE_URL },
          offers: { "@type": "Offer", category: "Free trial", price: 0, priceCurrency: "USD" },
          hasCourseInstance: { "@type": "CourseInstance", courseMode: "online", courseWorkload: "PT10M" } },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Exams", item: `${SITE_URL}/exams` },
          { "@type": "ListItem", position: 2, name: t.name, item: `${SITE_URL}/exam/${t.code}` } ] },
      ]} />
      <section className="hero">
        <div className="muted small">{t.emoji} {t.short}</div>
        <h1>{t.name}</h1>
        <p className="muted">{body.lead}</p>
        {tgFirst ? (
          <a className="btn" href={`https://t.me/${bot}?start=${t.code.toLowerCase()}`}>Start free on Telegram</a>
        ) : (
          <Link className="btn" href={`/app?track=${t.code}`}>Start free — no card needed</Link>
        )}
      </section>

      <ExamTry code={t.code} />

      <div className="grid2">
        {body.bullets.map(([h, p]) => (
          <div className="card" key={h}><b>{h}</b><p className="muted small">{p}</p></div>
        ))}
      </div>

      {t.mockVariants?.length ? (
        <section style={{ marginTop: 24 }}>
          <h2>Practice tests</h2>
          <ul>{t.mockVariants.map((v) => <li key={v.key}><b>{v.label}</b>{v.note ? <span className="muted"> — {v.note}</span> : null}</li>)}</ul>
        </section>
      ) : null}

      <section style={{ marginTop: 24 }}>
        <h2>Price</h2>
        <p className="muted">Free for 14 days with everything unlocked. Then:</p>
        <ul>{plans.map((p) => <li key={p.code}>{p.label}: <b>{money(p.amount, p.currency)}</b>{STARS_ENABLED ? <span className="muted"> or {starsFor(p)} ⭐ Telegram Stars</span> : null}</li>)}</ul>
        <p className="muted small">Covers: {t.subjects.map(subjectName).join(" · ")}</p>
      </section>

      <div style={{ marginTop: 24 }}>
        <EmailStart track={t.code} title={`Start your free ${t.short} practice`} text="Get daily questions, full timed tests and your readiness score. Enter your email and we'll send your access link." button="Start free" />
      </div>

      <p style={{ marginTop: 20 }}>
        <Link className="btn" href={`/app?track=${t.code}`}>Use the web app</Link>
        <Link className="btn secondary" href={`/practice/${t.code.toLowerCase()}`} style={{ marginLeft: 8 }}>Free practice questions</Link>
        {bot && <> <a className="btn secondary" href={`https://t.me/${bot}`} style={{ marginLeft: 8 }}>Open Telegram</a></>}
      </p>
      <p className="muted small" style={{ marginTop: 32 }}>
        Independent practice resource with original questions. {body.disclaimer} A product of The 36th Solutions Ltd.
      </p>
    </main>
  );
}
