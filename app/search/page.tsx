import Link from "next/link";
import type { Metadata } from "next";
import { SearchBox } from "@/components/search-box";
import { POPULAR, relatedExams, searchExams, searchGuides, searchSubjects } from "@/lib/search";
import { PATHS } from "@/lib/exam-links";
import { TRACK_LIST, TRACKS, type Track, type TrackCode } from "@/lib/tracks";
import { TRACK_GROUPS } from "@/lib/track-groups";
import { db } from "@/lib/supabase";
import { subjectName } from "@/lib/subjects";
import { examSlug, practiceSubjects } from "@/lib/practice";
import { localiseQuestion } from "@/lib/localise";

export const metadata: Metadata = { title: "Search exams and practice questions | Mock Night", robots: { index: false, follow: true } };

const L = "ABCDE";

interface QHit { id: string; subject_code: string; topic: string | null; body: string; options: string[]; answer_index: number; explanation: string | null }

async function findQuestions(q: string): Promise<QHit[]> {
  try {
    const { data } = await db().rpc("search_questions", { q, lim: 5 });
    return (data as QHit[] | null) ?? [];
  } catch {
    return [];
  }
}

function ExamCard({ t, big = false }: { t: Track; big?: boolean }) {
  return (
    <div className={`card search-exam${big ? " best" : ""}`}>
      <div className="row" style={{ alignItems: "flex-start" }}>
        <div>
          <div className="muted small">{t.emoji} {t.short}</div>
          <h3 style={{ margin: "4px 0" }}><Link href={PATHS[t.code]}>{t.name}</Link></h3>
          <p className="muted small" style={{ margin: 0 }}>{t.tagline}</p>
        </div>
      </div>
      <div className="search-actions">
        <Link className="btn" href={`/app?track=${t.code}`}>Start free</Link>
        <Link className="btn secondary" href={`/practice/${examSlug(t)}`}>Free questions</Link>
        {big ? <Link className="btn secondary" href={PATHS[t.code]}>About this exam</Link> : null}
      </div>
    </div>
  );
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const q = ((await searchParams).q ?? "").trim().slice(0, 80);
  const exams = q ? searchExams(q, 8) : [];
  const codes = exams.map((e) => e.track.code);
  const subjects = q ? searchSubjects(q, codes) : [];
  const guides = q ? searchGuides(q, codes) : [];
  const questions = q ? await findQuestions(q) : [];
  const related = relatedExams(codes.slice(0, 1) as TrackCode[], 6).filter((t) => !codes.includes(t.code));
  const loose = exams.length > 0 && exams[0].corrected;
  const nothing = q && !exams.length && !subjects.length && !questions.length && !guides.length;

  // Where to send people for more of a matching question: an exam they searched for if it covers the subject.
  const moreLink = (subject: string) => {
    const t = exams.map((e) => e.track).find((x) => x.subjects.includes(subject)) ?? TRACK_LIST.find((x) => x.subjects.includes(subject));
    if (!t) return null;
    const ps = practiceSubjects(t).find((p) => p.code === subject)!;
    return { t, href: `/practice/${examSlug(t)}/${ps.slug}` };
  };

  return (
    <main className="wrap" style={{ maxWidth: 860 }}>
      <section className="hero" style={{ paddingBottom: 8 }}>
        <h1>{q ? <>Results for “{q}”</> : "Find your exam"}</h1>
        <SearchBox initial={q} autoFocus={!q} />
      </section>

      {loose ? <p className="muted small">Showing results for “{exams[0].corrected}”.</p> : null}

      {exams.length > 0 && (
        <section>
          <h2>Best match</h2>
          <ExamCard t={exams[0].track} big />
          {exams.length > 1 && (
            <>
              <h2 style={{ marginTop: 24 }}>Other matching exams</h2>
              <div className="grid2">{exams.slice(1).map((e) => <ExamCard key={e.track.code} t={e.track} />)}</div>
            </>
          )}
        </section>
      )}

      {subjects.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <h2>Practise by subject</h2>
          {subjects.map((s) => (
            <div key={s.subject} className="card">
              <b>{s.name}</b>
              <div className="practice-links" style={{ marginTop: 8 }}>
                {s.links.map((l) => <Link key={l.href} className="chip" href={l.href}>{l.track.short} {s.name}</Link>)}
              </div>
            </div>
          ))}
        </section>
      )}

      {questions.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <h2>Questions on “{q}”</h2>
          <ol className="practice-qs">
            {questions.map((raw) => {
              const more = moreLink(raw.subject_code);
              const qq = localiseQuestion({ body: raw.body, options: raw.options, explanation: raw.explanation }, more?.t.code);
              return (
                <li key={raw.id} className="card">
                  <div className="muted small">{subjectName(raw.subject_code)}{raw.topic ? ` · ${raw.topic}` : ""}</div>
                  <p className="q-body">{qq.body}</p>
                  <ul className="q-opts">{qq.options.map((o, j) => <li key={j}><b>{L[j]}.</b> {o}</li>)}</ul>
                  <details>
                    <summary>Show answer</summary>
                    <p><b>Answer: {L[raw.answer_index]}. {qq.options[raw.answer_index]}</b></p>
                    {qq.explanation ? <p className="muted">{qq.explanation}</p> : null}
                  </details>
                  {more ? <p className="small" style={{ marginBottom: 0 }}><Link href={more.href}>More {more.t.short} {subjectName(raw.subject_code)} questions →</Link></p> : null}
                </li>
              );
            })}
          </ol>
        </section>
      )}

      {guides.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <h2>Guides</h2>
          <div className="post-list">
            {guides.map((g) => (
              <Link key={g.slug} href={`/blog/${g.slug}`} className="card post-card"><h3>{g.title}</h3><p className="muted small">{g.description}</p></Link>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section style={{ marginTop: 24 }}>
          <h2>Recommended for you</h2>
          <p className="muted small">People preparing for {exams[0].track.short} also practise these:</p>
          <div className="practice-links">{related.map((t) => <Link key={t.code} className="chip" href={PATHS[t.code]}>{t.emoji} {t.short}</Link>)}</div>
        </section>
      )}

      {(!q || nothing) && (
        <section style={{ marginTop: 16 }}>
          {nothing ? <p>We couldn&apos;t find anything for “{q}”. Try the exam&apos;s short name (like “JAMB” or “NCLEX”), your country, or a subject.</p> : null}
          <h2>Popular exams</h2>
          <div className="practice-links">{POPULAR.filter((c) => TRACKS[c]).map((c) => <Link key={c} className="chip" href={PATHS[c]}>{TRACKS[c].emoji} {TRACKS[c].short}</Link>)}</div>
          <h2 style={{ marginTop: 24 }}>Browse by category</h2>
          <div className="practice-links">{TRACK_GROUPS.map((g) => <Link key={g.key} className="chip" href={`/exams#${g.key}`}>{g.emoji} {g.title}</Link>)}</div>
        </section>
      )}
    </main>
  );
}
