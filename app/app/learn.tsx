"use client";

import { useCallback, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { browserDb } from "@/lib/supabase-browser";
import { api, shareLink } from "@/lib/client-api";
import { ExplainButton } from "@/components/explain";

const LETTERS = ["A", "B", "C", "D", "E"];

interface TrackOpt {
  code: string; name: string; emoji: string; tagline: string; subjectMode: "multi" | "single";
  subjects: { code: string; name: string }[]; compulsory: string[]; minSubjects: number; maxSubjects: number;
  subjectNote: string; askState: boolean; askSchool: boolean; regions: string[]; regionLabel: string; schoolLabel: string;
}
interface Me {
  student: {
    firstName: string | null; email: string | null; track: string | null; subjects: string[]; state: string | null; school: string | null;
    onboarded: boolean; premiumUntil: string | null; parentEmail: string | null; fullName: string | null; telegramLinked: boolean;
  };
  referral: { code: string; telegram: string; web: string; joined: number; rewarded: number; days: number };
  course: null | {
    lessons: { id: string; title: string; minutes: number; done: boolean }[];
    done: number; total: number; bestPass: { score: number; at: string } | null; eligible: boolean;
    certificate: null | { cert_no: string; full_name: string; expires_at: string; valid: boolean; url: string };
  };
  premium: boolean;
  dailyQuestions: number;
  progress: null | {
    streak: number; answeredAllTime: number; reviewBox: number;
    last7: { subject: string; correct: number; total: number }[];
    practice: { taken: number; lastScores: number[]; passesInARow: number | null; readiness: number | null };
  };
  today: null | { position: number; total: number; correct: number; finished: boolean };
  track: null | { code: string; name: string; short: string; emoji: string; subjectMode: string; kind: string; hasCourse: boolean; mock: { total?: number; perSubject?: number; minutes: number; passPct?: number } };
  plans: { code: string; label: string; price: string }[];
  tracks: TrackOpt[];
}
interface DrillQ { done: false; messageId: number; position: number; total: number; isReview: boolean; subject: string; topic: string | null; body: string; options: string[] }
interface Summary { correct: number; total: number; pct: number; streak: number; reviewBox: number; premium: boolean }

export default function Learn() {
  const params = useSearchParams();
  const [session, setSession] = useState<"loading" | "out" | "in">("loading");
  const [me, setMe] = useState<Me | null>(null);
  const [view, setView] = useState<"home" | "onboard" | "drill" | "lesson">("home");
  const [lessonId, setLessonId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      const m = await api<Me>("/api/app/me");
      setMe(m);
      if (!m.student.onboarded) setView("onboard");
    } catch (e: any) {
      if (e.message === "UNAUTHORIZED") setSession("out");
      else setError("Couldn't load your account. Check your connection and refresh.");
    }
  }, []);

  useEffect(() => {
    const ref = params.get("ref");
    if (ref) {
      try {
        localStorage.setItem("mn_ref", ref);
      } catch {}
    }
  }, [params]);

  useEffect(() => {
    const sb = browserDb();
    sb.auth.getSession().then(({ data }) => setSession(data.session ? "in" : "out"));
    const { data: sub } = sb.auth.onAuthStateChange((_e, s) => setSession(s ? "in" : "out"));
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session === "in") load();
  }, [session, load]);

  if (session === "loading") return <Center>Loading…</Center>;
  if (session === "out") return <Login preTrack={params.get("track")} />;
  if (error) return <Center>{error}</Center>;
  if (!me) return <Center>Loading your dashboard…</Center>;
  if (view === "onboard") return <Onboard me={me} preTrack={params.get("track")} onDone={() => { setView("home"); load(); }} onCancel={me.student.onboarded ? () => setView("home") : undefined} />;
  if (view === "drill") return <Drill onExit={() => { setView("home"); load(); }} />;
  if (view === "lesson" && lessonId) return <LessonView id={lessonId} course={me.course} onExit={() => { setView("home"); load(); }} onOpen={(id) => setLessonId(id)} />;
  return <Home me={me} reload={load} onDrill={() => setView("drill")} onSettings={() => setView("onboard")} onLesson={(id) => { setLessonId(id); setView("lesson"); }} />;
}

function Center({ children }: { children: React.ReactNode }) {
  return <div className="center"><div className="muted">{children}</div></div>;
}

// ---------------------------------------------------------------------------
function Login({ preTrack }: { preTrack: string | null }) {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const redirect = `${window.location.origin}/app${preTrack ? `?track=${preTrack}` : ""}`;
    const { error } = await browserDb().auth.signInWithOtp({ email: email.trim(), options: { emailRedirectTo: redirect } });
    setBusy(false);
    if (error) setErr(error.message);
    else setSent(true);
  };

  return (
    <main className="wrap" style={{ paddingTop: 48, maxWidth: 440 }}>
      <h1 style={{ marginBottom: 4 }}>Mock Night</h1>
      <p className="muted" style={{ marginTop: 0 }}>Exam practice that sticks — daily questions, real timed tests, and a clear score of how ready you are.</p>
      {sent ? (
        <div className="card">
          <b>Check your email 📬</b>
          <p className="muted" style={{ marginBottom: 0 }}>We sent a sign-in link to {email}. Open it on this device. Check spam if it's not there in a minute.</p>
        </div>
      ) : (
        <form onSubmit={send} className="card">
          <label className="small muted" htmlFor="email">Your email</label>
          <input id="email" className="input" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" />
          <button className="btn block" disabled={busy} style={{ marginTop: 10 }}>{busy ? "Sending…" : "Email me a sign-in link"}</button>
          {err && <p style={{ color: "var(--bad)" }} className="small">{err}</p>}
          <p className="muted small" style={{ marginBottom: 0 }}>No password needed. New here? This creates your account.</p>
        </form>
      )}
    </main>
  );
}

// ---------------------------------------------------------------------------
function Onboard({ me, preTrack, onDone, onCancel }: { me: Me; preTrack: string | null; onDone: () => void; onCancel?: () => void }) {
  const initial = me.student.track ?? (preTrack && me.tracks.some((t) => t.code === preTrack) ? preTrack : null);
  const [code, setCode] = useState<string | null>(initial);
  const t = me.tracks.find((x) => x.code === code) ?? null;
  const [subjects, setSubjects] = useState<string[]>(me.student.track === code ? me.student.subjects : []);
  const [state, setState] = useState(me.student.state ?? "");
  const [school, setSchool] = useState(me.student.school ?? "");
  const [name, setName] = useState(me.student.firstName ?? "");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (t) setSubjects((cur) => [...new Set([...t.compulsory, ...cur.filter((c) => t.subjects.some((s) => s.code === c))])]);
  }, [code]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggle = (c: string) => {
    if (!t || t.compulsory.includes(c)) return;
    setSubjects((cur) => (cur.includes(c) ? cur.filter((x) => x !== c) : cur.length >= t.maxSubjects ? cur : [...cur, c]));
  };

  const save = async () => {
    if (!t) return;
    setBusy(true);
    setErr("");
    try {
      let ref: string | null = null;
      try {
        ref = localStorage.getItem("mn_ref");
      } catch {}
      await api("/api/app/onboard", { track: t.code, subjects, state, school, firstName: name, ref });
      onDone();
    } catch (e: any) {
      setErr(e.data?.note ?? "Couldn't save. Try again.");
      setBusy(false);
    }
  };

  const valid = t && (t.subjectMode === "single" || (subjects.length >= t.minSubjects && subjects.length <= t.maxSubjects)) && (!t.askState || (state && t.regions.includes(state)));

  return (
    <main className="wrap" style={{ paddingTop: 24 }}>
      <h2 style={{ marginBottom: 4 }}>What are you preparing for?</h2>
      <div style={{ display: "grid", gap: 10, margin: "12px 0 20px" }}>
        {me.tracks.map((x) => (
          <button key={x.code} className={`opt ${code === x.code ? "selected" : ""}`} onClick={() => setCode(x.code)}>
            <span style={{ fontSize: 24 }}>{x.emoji}</span>
            <span>
              <b>{x.name}</b>
              <br />
              <span className="muted small">{x.tagline}</span>
            </span>
          </button>
        ))}
      </div>

      {t && (
        <>
          <label className="small muted">Your first name</label>
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} />

          {t.subjectMode === "multi" && (
            <>
              <h3 style={{ marginBottom: 2 }}>Subjects</h3>
              <p className="muted small" style={{ marginTop: 0 }}>{t.subjectNote}</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {t.subjects.map((s) => (
                  <button key={s.code} className={`tab ${subjects.includes(s.code) ? "active" : ""}`} onClick={() => toggle(s.code)}>
                    {t.compulsory.includes(s.code) ? "🔒 " : ""}
                    {s.name}
                  </button>
                ))}
              </div>
            </>
          )}

          {t.askState && (
            <>
              <h3 style={{ marginBottom: 6 }}>{t.regionLabel}</h3>
              <select className="input" value={state} onChange={(e) => setState(e.target.value)}>
                <option value="">Choose…</option>
                {t.regions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </>
          )}
          {t.askSchool && (
            <>
              <h3 style={{ marginBottom: 6 }}>{t.schoolLabel}</h3>
              <input className="input" value={school} onChange={(e) => setSchool(e.target.value)} maxLength={80} />
            </>
          )}

          {err && <p style={{ color: "var(--bad)" }}>{err}</p>}
          <div className="nav" style={{ marginTop: 20 }}>
            {onCancel && <button className="btn secondary" onClick={onCancel}>Cancel</button>}
            <button className="btn" disabled={!valid || busy} onClick={save}>{busy ? "Saving…" : "Save and continue"}</button>
          </div>
        </>
      )}
    </main>
  );
}

// ---------------------------------------------------------------------------
function Home({ me, reload, onDrill, onSettings, onLesson }: { me: Me; reload: () => void; onDrill: () => void; onSettings: () => void; onLesson: (id: string) => void }) {
  const t = me.track!;
  const p = me.progress;
  const [paying, setPaying] = useState("");
  const passFail = !!t.mock.passPct;
  const testSize = t.mock.total ?? `${t.mock.perSubject} per subject`;

  const pay = async (plan: string) => {
    setPaying(plan);
    try {
      const { url } = await api<{ url: string }>("/api/app/checkout", { plan });
      window.location.href = url;
    } catch {
      setPaying("");
      alert("Couldn't start checkout. Please try again.");
    }
  };

  const todayLabel = !me.today
    ? `Start today's ${me.dailyQuestions} questions`
    : me.today.finished
      ? `Done today: ${me.today.correct}/${me.today.total} ✅`
      : `Continue (${me.today.position}/${me.today.total})`;

  return (
    <main className="wrap" style={{ paddingTop: 16 }}>
      <div className="row">
        <div>
          <div className="muted small">{t.emoji} {t.name}</div>
          <h2 style={{ margin: "2px 0 0" }}>Hi {me.student.firstName ?? "there"} 👋</h2>
        </div>
        <button className="btn secondary" style={{ minHeight: 36, padding: "6px 12px" }} onClick={onSettings}>⚙️ Settings</button>
      </div>

      {passFail && p && (
        <div className="card" style={{ marginTop: 16 }}>
          <div className="row"><b>Readiness</b><span className="muted small">pass mark {t.mock.passPct}%</span></div>
          <div style={{ fontSize: 40, fontWeight: 800, lineHeight: 1.1, marginTop: 6 }}>{p.practice.readiness === null ? "—" : `${p.practice.readiness}%`}</div>
          <div className="bar"><span style={{ width: `${p.practice.readiness ?? 0}%`, background: (p.practice.readiness ?? 0) >= 100 ? "var(--ok)" : "var(--accent)" }} /></div>
          <p className="muted small" style={{ marginBottom: 0 }}>
            {p.practice.taken === 0
              ? "Take a practice test to see how ready you are."
              : `Passes in a row: ${p.practice.passesInARow ?? 0}. Last scores: ${p.practice.lastScores.join("%, ")}%. ${(p.practice.passesInARow ?? 0) >= 3 ? "You're ready to book. 🎉" : "Aim for 3 passes in a row before booking."}`}
          </p>
        </div>
      )}

      {me.course && <CourseCard course={me.course} onLesson={onLesson} reload={reload} defaultName={me.student.fullName ?? ""} />}

      <div className="card">
        <b>📝 Daily practice</b>
        <p className="muted small" style={{ margin: "4px 0 10px" }}>Short, every day. Anything you miss comes back until you get it right.</p>
        <button className="btn block" onClick={onDrill} disabled={me.today?.finished}>{todayLabel}</button>
      </div>

      <div className="card">
        <b>{me.track?.hasCourse ? "🧪 Final assessment" : passFail ? "🧪 Full practice test" : "🖥 Practice CBT"}</b>
        <p className="muted small" style={{ margin: "4px 0 10px" }}>
          {testSize} questions · {t.mock.minutes} minutes{passFail ? ` · ${t.mock.passPct}% to pass` : ""} — just like the real thing.
        </p>
        <a className="btn block" href="/mock">Start a test</a>
      </div>

      {p && (
        <div className="stats">
          <div className="stat"><span className="muted small">Streak</span><b>🔥 {p.streak}</b></div>
          <div className="stat"><span className="muted small">Answered</span><b>{p.answeredAllTime}</b></div>
          <div className="stat"><span className="muted small">To review</span><b>{p.reviewBox}</b></div>
          <div className="stat"><span className="muted small">Tests taken</span><b>{p.practice.taken}</b></div>
        </div>
      )}

      {!me.premium && me.plans.length > 0 && (
        <div className="card">
          <b>⭐ Unlock full access</b>
          <p className="muted small" style={{ margin: "4px 0 10px" }}>Unlimited practice tests (free: 1 a week) and 20 daily questions (free: 10).</p>
          {me.plans.map((pl) => (
            <button key={pl.code} className="btn block" style={{ marginBottom: 8 }} disabled={!!paying} onClick={() => pay(pl.code)}>
              {paying === pl.code ? "Opening checkout…" : `${pl.label} — ${pl.price}`}
            </button>
          ))}
        </div>
      )}
      {me.premium && me.student.premiumUntil && (
        <p className="muted small">⭐ Full access until {new Date(me.student.premiumUntil).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}</p>
      )}

      <InviteCard r={me.referral} />
      {!me.student.telegramLinked && <TelegramCard />}
      {me.track?.kind === "school" && <ParentCard current={me.student.parentEmail} />}

      <p className="muted small" style={{ marginTop: 24 }}>
        Signed in as {me.student.email} ·{" "}
        <a href="#" onClick={(e) => { e.preventDefault(); browserDb().auth.signOut(); }}>Sign out</a>
      </p>
    </main>
  );
}

// ---------------------------------------------------------------------------
function Drill({ onExit }: { onExit: () => void }) {
  const [q, setQ] = useState<DrillQ | null>(null);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [chosen, setChosen] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ correct: boolean; answer: number; explanation: string | null; questionId?: string } | null>(null);
  const [pendingSummary, setPendingSummary] = useState<Summary | null>(null);
  const [err, setErr] = useState("");

  const next = useCallback(async () => {
    setChosen(null);
    setFeedback(null);
    if (pendingSummary) {
      setSummary(pendingSummary);
      return;
    }
    try {
      const r = await api<DrillQ | { done: true; summary: Summary }>("/api/app/drill/next");
      if (r.done) setSummary(r.summary);
      else setQ(r);
      window.scrollTo(0, 0);
    } catch (e: any) {
      setErr(e.message === "NO_QUESTIONS" ? "No questions available yet for your subjects." : "Couldn't load the next question.");
    }
  }, [pendingSummary]);

  useEffect(() => {
    next();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const answer = async (i: number) => {
    if (!q || chosen !== null) return;
    setChosen(i);
    try {
      const r = await api<{ correct: boolean; questionId: string; answer: number; explanation: string | null; done: boolean; summary: Summary | null }>("/api/app/drill/answer", { messageId: q.messageId, chosen: i });
      setFeedback(r);
      if (r.done && r.summary) setPendingSummary(r.summary);
    } catch (e: any) {
      if (e.message === "STALE") next();
      else setErr("Couldn't save your answer. Check your connection.");
    }
  };

  if (err) return <Center>{err} <br /><br /><button className="btn" onClick={onExit}>Back</button></Center>;
  if (summary)
    return (
      <main className="wrap" style={{ paddingTop: 32 }}>
        <div className="score">
          <div className="big">{summary.correct}/{summary.total}</div>
          <div className="sub">{summary.pct}% · 🔥 {summary.streak}-day streak</div>
        </div>
        <div className="card">🔁 {summary.reviewBox} question{summary.reviewBox === 1 ? "" : "s"} in your review box — they'll come back until you get them right.</div>
        {!summary.premium && <p className="muted small">Free plan: 10 questions a day. Premium gets 20 plus unlimited practice tests.</p>}
        <button className="btn block" onClick={onExit}>Back to dashboard</button>
      </main>
    );
  if (!q) return <Center>Loading…</Center>;

  return (
    <>
      <div className="topbar">
        <button className="btn secondary" style={{ minHeight: 34, padding: "4px 10px" }} onClick={onExit}>✕</button>
        <div className="title">Question {q.position + 1} of {q.total}</div>
        <div className="muted small">{q.isReview ? "🔁 review" : q.subject}</div>
      </div>
      <div className="wrap">
        <div className="bar" style={{ margin: "12px 0" }}><span style={{ width: `${(q.position / q.total) * 100}%` }} /></div>
        {q.topic && <span className="chip">{q.topic}</span>}
        <p className="qbody">{q.body}</p>
        <div className="options">
          {q.options.map((o, i) => {
            const cls = feedback ? (i === feedback.answer ? "correct" : i === chosen ? "wrong" : "") : chosen === i ? "selected" : "";
            return (
              <button key={i} className={`opt ${cls}`} onClick={() => answer(i)} disabled={chosen !== null}>
                <span className="letter">{LETTERS[i]}</span>
                <span>{o}</span>
              </button>
            );
          })}
        </div>
        {feedback && (
          <>
            <div className="explain" style={{ background: "var(--bg2)", marginTop: 14 }}>
              <b>{feedback.correct ? "✅ Correct" : `❌ The answer is ${LETTERS[feedback.answer]}`}</b>
              {feedback.explanation && <div style={{ marginTop: 4 }}>💡 {feedback.explanation}</div>}
            </div>
            {!feedback.correct && feedback.questionId && <ExplainButton key={feedback.questionId} questionId={feedback.questionId} />}
            <button className="btn block" style={{ marginTop: 14 }} onClick={next}>{pendingSummary ? "See results" : "Next question →"}</button>
          </>
        )}
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
function CourseCard({ course, onLesson, reload, defaultName }: { course: NonNullable<Me["course"]>; onLesson: (id: string) => void; reload: () => void; defaultName: string }) {
  const [name, setName] = useState(defaultName);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const next = course.lessons.find((l) => !l.done);
  const cert = course.certificate;

  const getCert = async () => {
    setBusy(true);
    setErr("");
    try {
      const r = await api<{ url: string }>("/api/app/certificate", { fullName: name });
      window.open(r.url, "_blank");
      reload();
    } catch (e: any) {
      setErr(
        e.message === "BAD_NAME"
          ? "Enter your first and last name as they should appear on the certificate."
          : e.message === "NOT_PAID"
            ? "Certificates come with the full course — unlock it below (or ask your employer for a seat)."
            : "Not eligible yet — finish all modules and pass the final assessment.",
      );
    }
    setBusy(false);
  };

  return (
    <>
      <div className="card" style={{ marginTop: 16 }}>
        <div className="row"><b>📚 Course modules</b><span className="muted small">{course.done}/{course.total} done</span></div>
        <div className="bar" style={{ margin: "8px 0 12px" }}><span style={{ width: `${(course.done / course.total) * 100}%` }} /></div>
        {course.lessons.map((l) => (
          <button key={l.id} className="opt" style={{ marginBottom: 6, padding: "10px 12px" }} onClick={() => onLesson(l.id)}>
            <span className="letter" style={l.done ? { background: "var(--ok)", color: "#fff" } : undefined}>{l.done ? "✓" : "•"}</span>
            <span style={{ flex: 1 }}>{l.title}</span>
            <span className="muted small">{l.minutes} min</span>
          </button>
        ))}
        {next && <button className="btn block" style={{ marginTop: 6 }} onClick={() => onLesson(next.id)}>{course.done ? "Continue" : "Start"}: {next.title}</button>}
      </div>

      <div className="card">
        <b>🎓 Certificate</b>
        {cert?.valid ? (
          <>
            <p className="muted small" style={{ margin: "4px 0 10px" }}>
              Issued to {cert.full_name} · valid until {new Date(cert.expires_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })} · {cert.cert_no}
            </p>
            <a className="btn block" href={cert.url} target="_blank" rel="noreferrer">📄 Download certificate</a>
          </>
        ) : course.eligible ? (
          <>
            <p className="muted small" style={{ margin: "4px 0 6px" }}>You've earned it! Enter your full name as it should appear.</p>
            <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="First and last name" maxLength={80} />
            <button className="btn block" style={{ marginTop: 10 }} onClick={getCert} disabled={busy}>{busy ? "Creating…" : "Get my certificate"}</button>
            {err && <p className="small" style={{ color: "var(--bad)" }}>{err}</p>}
          </>
        ) : (
          <p className="muted small" style={{ margin: "4px 0 0" }}>
            {course.done === course.total ? "✅" : "▫️"} Complete all {course.total} modules<br />
            {course.bestPass ? "✅" : "▫️"} Pass the final assessment
            {cert && !cert.valid ? <><br />Your previous certificate has expired — complete a refresher to renew it.</> : null}
          </p>
        )}
      </div>
    </>
  );
}

function LessonView({ id, course, onExit, onOpen }: { id: string; course: Me["course"]; onExit: () => void; onOpen: (id: string) => void }) {
  const [lesson, setLesson] = useState<{ id: string; title: string; minutes: number; body: string[]; keyPoints: string[] } | null>(null);
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setLesson(null);
    api<{ lesson: any }>("/api/app/lesson", { id }).then((r) => setLesson(r.lesson)).catch(() => onExit());
    window.scrollTo(0, 0);
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  const done = async () => {
    setBusy(true);
    const r = await api<{ status: NonNullable<Me["course"]> }>("/api/app/lesson", { id, complete: true }).catch(() => null);
    setBusy(false);
    const nxt = r?.status.lessons.find((l) => !l.done);
    if (nxt) onOpen(nxt.id);
    else onExit();
  };

  if (!lesson) return <Center>Loading lesson…</Center>;
  const idx = course?.lessons.findIndex((l) => l.id === id) ?? 0;
  return (
    <>
      <div className="topbar">
        <button className="btn secondary" style={{ minHeight: 34, padding: "4px 10px" }} onClick={onExit}>✕</button>
        <div className="title">Module {idx + 1} of {course?.total}</div>
        <div className="muted small">{lesson.minutes} min</div>
      </div>
      <main className="wrap">
        <h2>{lesson.title}</h2>
        {lesson.body.map((p, i) => <p key={i} style={{ lineHeight: 1.6 }}>{p}</p>)}
        <div className="card">
          <b>Key points</b>
          <ul style={{ margin: "8px 0 0", paddingLeft: 20 }}>{lesson.keyPoints.map((k) => <li key={k} style={{ marginBottom: 4 }}>{k}</li>)}</ul>
        </div>
        <button className="btn block" onClick={done} disabled={busy}>{busy ? "Saving…" : "✅ Mark complete and continue"}</button>
      </main>
    </>
  );
}

function InviteCard({ r }: { r: Me["referral"] }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(r.web);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <div className="card">
      <b>🎁 Invite friends</b>
      <p className="muted small" style={{ margin: "4px 0 10px" }}>
        When a friend joins with your link and finishes their first practice, you both get {r.days} days of Premium. Joined: {r.joined} · Rewards: {r.rewarded}
      </p>
      <div className="nav">
        <button className="btn" onClick={() => shareLink(r.web, "I'm practising with Mock Night — join me and we both get free Premium days 👇")}>📤 Share link</button>
        <button className="btn secondary" onClick={copy}>{copied ? "Copied ✓" : "Copy link"}</button>
      </div>
    </div>
  );
}

function TelegramCard() {
  const [busy, setBusy] = useState(false);
  const connect = async () => {
    setBusy(true);
    try {
      const { url } = await api<{ url: string }>("/api/app/link-telegram");
      window.location.href = url;
    } catch {
      setBusy(false);
    }
  };
  return (
    <div className="card">
      <b>✈️ Get daily reminders on Telegram</b>
      <p className="muted small" style={{ margin: "4px 0 10px" }}>Connect Telegram to get your daily practice there. Your progress stays in one account.</p>
      <button className="btn secondary block" onClick={connect} disabled={busy}>{busy ? "Opening Telegram…" : "Connect Telegram"}</button>
    </div>
  );
}

function ParentCard({ current }: { current: string | null }) {
  const [email, setEmail] = useState(current ?? "");
  const [saved, setSaved] = useState("");
  const save = async () => {
    try {
      await api("/api/app/settings", { parentEmail: email });
      setSaved(email ? "Saved ✓ — reports go out every Sunday evening." : "Reports turned off.");
    } catch {
      setSaved("That email doesn't look right.");
    }
  };
  return (
    <div className="card">
      <b>👨‍👩‍👧 Weekly report for a parent</b>
      <p className="muted small" style={{ margin: "4px 0 6px" }}>A short summary every Sunday: days practised, scores and weakest subject.</p>
      <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="parent@example.com" />
      <button className="btn secondary block" style={{ marginTop: 10 }} onClick={save}>Save</button>
      {saved && <p className="muted small">{saved}</p>}
    </div>
  );
}
