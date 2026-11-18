import { Listen } from "@/components/listen";
import Link from "next/link";
import { EmailStart } from "@/components/email-start";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { examSlug, findSubject, getPracticeQuestions, practiceSubjects, trackFromSlug } from "@/lib/practice";
import { PATHS } from "@/lib/exam-links";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL } from "@/lib/site";

export const revalidate = 86400;
export const dynamicParams = true;

// Rendered on first visit, then cached for a day.
export function generateStaticParams() {
  return [];
}

type P = { params: Promise<{ exam: string; subject: string }> };

async function load(params: P["params"]) {
  const { exam, subject } = await params;
  const t = trackFromSlug(exam);
  const s = t ? findSubject(t, subject) : null;
  return t && s ? { t, s } : null;
}

export async function generateMetadata({ params }: P): Promise<Metadata> {
  const r = await load(params);
  if (!r) return {};
  const { t, s } = r;
  const path = `/practice/${examSlug(t)}/${s.slug}`;
  const title = `${t.short} ${s.name} practice questions with answers | Mock Night`;
  const description = `Try 10 free ${t.name} ${s.name} questions with answers and clear explanations. Then practise daily and take timed mock tests on Mock Night.`.slice(0, 160);
  return { title, description, alternates: { canonical: path }, openGraph: { title, description, url: path } };
}

const L = "ABCDE";

export default async function PracticeSubject({ params }: P) {
  const r = await load(params);
  if (!r) notFound();
  const { t, s } = r;
  const qs = await getPracticeQuestions(t.code, s.code);
  const bot = process.env.TELEGRAM_BOT_USERNAME ?? "";
  const path = `${SITE_URL}/practice/${examSlug(t)}/${s.slug}`;
  const others = practiceSubjects(t).filter((x) => x.slug !== s.slug);
  return (
    <main className="wrap" style={{ maxWidth: 820 }}>
      <JsonLd data={[
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Practice questions", item: `${SITE_URL}/practice` },
          { "@type": "ListItem", position: 2, name: t.short, item: `${SITE_URL}/practice/${examSlug(t)}` },
          { "@type": "ListItem", position: 3, name: s.name, item: path } ] },
        ...(qs.length ? [{ "@context": "https://schema.org", "@type": "Quiz", name: `${t.short} ${s.name} practice questions`, url: path, about: { "@type": "Thing", name: s.name },
          educationalAlignment: [{ "@type": "AlignmentObject", alignmentType: "educationalSubject", targetName: s.name }],
          hasPart: qs.map((q) => ({ "@type": "Question", eduQuestionType: "Multiple choice", text: q.body,
            suggestedAnswer: q.options.filter((_, i) => i !== q.answer).map((o) => ({ "@type": "Answer", text: o })),
            acceptedAnswer: { "@type": "Answer", text: q.options[q.answer], ...(q.explanation ? { answerExplanation: { "@type": "Comment", text: q.explanation } } : {}) } })) }] : []),
      ]} />
      <section className="hero">
        <div className="muted small"><Link href="/practice">Practice questions</Link> › <Link href={`/practice/${examSlug(t)}`}>{t.short}</Link> › {s.name}</div>
        <h1>{t.short} {s.name} practice questions</h1>
        <p className="muted">{qs.length || 10} free questions with answers and explanations. Try each one, then tap “Show answer”.</p>
      </section>

      {qs.length === 0 ? (
        <div className="card"><p>Questions for this subject are being added. Start practising in the app in the meantime.</p></div>
      ) : (
        <ol className="practice-qs">
          {qs.map((q, i) => (
            <li key={q.id} className="card">
              {q.topic ? <div className="muted small">{q.topic}</div> : null}
              <p className="q-body"><b>{i + 1}.</b> {q.body}</p>
              {q.audio && <Listen text={q.audio.text} lang={q.audio.lang} />}
              <ul className="q-opts">{q.options.map((o, j) => <li key={j}><b>{L[j]}.</b> {o}</li>)}</ul>
              <details>
                <summary>Show answer</summary>
                <p><b>Answer: {L[q.answer]}. {q.options[q.answer]}</b></p>
                {q.explanation ? <p className="muted">{q.explanation}</p> : null}
              </details>
            </li>
          ))}
        </ol>
      )}

      <div className="card" style={{ marginTop: 24 }}>
        <b>Want more {t.short} {s.name} questions?</b>
        <p className="muted small" style={{ margin: "4px 0 10px" }}>Get fresh questions every day, focused on your weak topics, plus timed mock tests. Free to start.</p>
        <EmailStart compact track={t.code} button="Get free access" />
        <p className="muted small" style={{ margin: "10px 0 0" }}>
          Or <Link href={`/app?track=${t.code}`}>open the web app</Link>{bot ? <> · <a href={`https://t.me/${bot}?start=${t.code.toLowerCase()}`}>practise on Telegram</a></> : null}
        </p>
      </div>

      {others.length ? (
        <section style={{ marginTop: 24 }}>
          <h2>More {t.short} practice</h2>
          <div className="practice-links">{others.map((x) => <Link key={x.slug} className="chip" href={`/practice/${examSlug(t)}/${x.slug}`}>{x.name}</Link>)}</div>
        </section>
      ) : null}
      <p className="muted small" style={{ marginTop: 24 }}>
        <Link href={PATHS[t.code]}>About the {t.short} on Mock Night</Link> · Original practice questions; not affiliated with the exam board.
      </p>
    </main>
  );
}
