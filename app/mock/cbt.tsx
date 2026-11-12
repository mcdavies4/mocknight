"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { MockPayload, MockResult } from "@/lib/mock";

import { api, goHome, inTelegram, openExternal, shareLink, tg } from "@/lib/client-api";
import { ExplainButton } from "@/components/explain";

const LETTERS = ["A", "B", "C", "D", "E"];

type Phase =
  | { name: "loading" }
  | { name: "error"; code: string; startsAt?: string }
  | { name: "exam" }
  | { name: "submitting" }
  | { name: "result"; result: MockResult };

export default function Cbt() {
  const params = useSearchParams();
  const mockId = params.get("mock");
  const variant = params.get("variant");

  const [phase, setPhase] = useState<Phase>({ name: "loading" });
  const [data, setData] = useState<MockPayload | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [subject, setSubject] = useState<string>("");
  const [index, setIndex] = useState(0); // index within current subject
  const [remaining, setRemaining] = useState(0);
  const [showCalc, setShowCalc] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const offset = useRef(0);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const answersRef = useRef(answers);
  answersRef.current = answers;
  const submittedRef = useRef(false);

  // ---- Load --------------------------------------------------------------
  useEffect(() => {
    const w = tg();
    w?.ready();
    w?.expand();
    api<MockPayload>("/api/mini/start", { mockId, variant })
      .then((p) => {
        setData(p);
        setAnswers(p.answers ?? {});
        setSubject(p.subjects[0]?.code ?? "");
        offset.current = new Date(p.serverNow).getTime() - Date.now();
        if (p.result) {
          submittedRef.current = true;
          setPhase({ name: "result", result: p.result });
        } else {
          setPhase({ name: "exam" });
          w?.enableClosingConfirmation?.();
        }
      })
      .catch((e) => setPhase({ name: "error", code: e.message, startsAt: e.data?.startsAt }));
  }, [mockId, variant]);

  // ---- Questions for current subject ---------------------------------------
  const bySubject = useMemo(() => {
    const m = new Map<string, MockPayload["questions"]>();
    data?.questions.forEach((q) => m.set(q.subject, [...(m.get(q.subject) ?? []), q]));
    return m;
  }, [data]);
  const list = bySubject.get(subject) ?? [];
  const q = list[index];

  // ---- Saving ---------------------------------------------------------------
  const flushSave = useCallback(() => {
    if (!data || submittedRef.current) return;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = null;
    api("/api/mini/save", { attemptId: data.attemptId, answers: answersRef.current }).catch(() => {});
  }, [data]);

  const choose = (qid: string, i: number) => {
    if (phase.name !== "exam") return;
    tg()?.HapticFeedback?.impactOccurred("light");
    setAnswers((a) => ({ ...a, [qid]: i }));
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(flushSave, 1500);
  };

  useEffect(() => {
    const onHide = () => document.visibilityState === "hidden" && flushSave();
    document.addEventListener("visibilitychange", onHide);
    return () => document.removeEventListener("visibilitychange", onHide);
  }, [flushSave]);

  // ---- Submit -----------------------------------------------------------------
  const submit = useCallback(async () => {
    if (!data || submittedRef.current) return;
    submittedRef.current = true;
    if (saveTimer.current) clearTimeout(saveTimer.current);
    setConfirm(false);
    setShowCalc(false);
    setPhase({ name: "submitting" });
    try {
      const result = await api<MockResult>("/api/mini/submit", { attemptId: data.attemptId, answers: answersRef.current });
      tg()?.disableClosingConfirmation?.();
      tg()?.HapticFeedback?.notificationOccurred("success");
      setPhase({ name: "result", result });
      window.scrollTo(0, 0);
    } catch (e: any) {
      submittedRef.current = false;
      setPhase({ name: "error", code: e.message });
    }
  }, [data]);

  // ---- Timer ----------------------------------------------------------------
  useEffect(() => {
    if (phase.name !== "exam" || !data) return;
    const tick = () => {
      const left = Math.max(0, Math.floor((new Date(data.deadline).getTime() - (Date.now() + offset.current)) / 1000));
      setRemaining(left);
      if (left === 0) submit();
    };
    tick();
    const t = setInterval(tick, 1000);
    return () => clearInterval(t);
  }, [phase.name, data, submit]);

  // ---- Keyboard shortcuts (like the real CBT: A-D, N next, P previous) --------
  useEffect(() => {
    if (phase.name !== "exam") return;
    const onKey = (e: KeyboardEvent) => {
      if (showCalc || confirm || !q) return;
      const k = e.key.toUpperCase();
      const i = LETTERS.indexOf(k);
      if (i >= 0 && i < q.options.length) choose(q.id, i);
      else if (k === "N") setIndex((x) => Math.min(list.length - 1, x + 1));
      else if (k === "P") setIndex((x) => Math.max(0, x - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  // ---- Render ---------------------------------------------------------------
  if (phase.name === "loading") return <div className="center"><p className="muted">Loading your exam…</p></div>;
  if (phase.name === "error") return <ErrorView code={phase.code} startsAt={phase.startsAt} />;
  if (phase.name === "submitting") return <div className="center"><p className="muted">Submitting and marking…</p></div>;
  if (phase.name === "result" && data) return <ResultView data={data} result={phase.result} />;
  if (!data || !q) return <div className="center"><p className="muted">No questions found.</p></div>;

  const answeredTotal = Object.keys(answers).length;
  const unanswered = data.questions.length - answeredTotal;
  const mm = String(Math.floor(remaining / 60)).padStart(2, "0");
  const ss = String(remaining % 60).padStart(2, "0");
  const subjIdx = data.subjects.findIndex((s) => s.code === subject);
  const isLastOverall = subjIdx === data.subjects.length - 1 && index === list.length - 1;

  const goNext = () => {
    if (index < list.length - 1) setIndex(index + 1);
    else if (subjIdx < data.subjects.length - 1) {
      setSubject(data.subjects[subjIdx + 1].code);
      setIndex(0);
    }
    window.scrollTo(0, 0);
  };
  const goPrev = () => {
    if (index > 0) setIndex(index - 1);
    else if (subjIdx > 0) {
      const prev = data.subjects[subjIdx - 1].code;
      setSubject(prev);
      setIndex((bySubject.get(prev)?.length ?? 1) - 1);
    }
    window.scrollTo(0, 0);
  };

  return (
    <>
      <div className="topbar">
        <div className="title">{data.title}</div>
        <div className={`timer ${remaining < 300 ? "low" : ""}`}>⏱ {mm}:{ss}</div>
      </div>

      <div className="wrap">
        <div className="tabs">
          {data.subjects.map((s) => {
            const qs = bySubject.get(s.code) ?? [];
            const done = qs.filter((x) => answers[x.id] !== undefined).length;
            return (
              <button
                key={s.code}
                className={`tab ${s.code === subject ? "active" : ""}`}
                onClick={() => {
                  setSubject(s.code);
                  setIndex(0);
                }}
              >
                {s.name}
                <small>
                  {done}/{qs.length}
                </small>
              </button>
            );
          })}
        </div>

        <div className="qmeta">
          <span>
            Question {index + 1} of {list.length}
          </span>
          <span>{answeredTotal}/{data.questions.length} answered</span>
        </div>
        <p className="qbody">{q.body}</p>

        <div className="options">
          {q.options.map((o, i) => (
            <button key={i} className={`opt ${answers[q.id] === i ? "selected" : ""}`} onClick={() => choose(q.id, i)}>
              <span className="letter">{LETTERS[i]}</span>
              <span>{o}</span>
            </button>
          ))}
        </div>

        <div className="nav">
          <button className="btn secondary" onClick={goPrev} disabled={subjIdx === 0 && index === 0}>
            ← Previous
          </button>
          {isLastOverall ? (
            <button className="btn" onClick={() => setConfirm(true)}>
              Finish
            </button>
          ) : (
            <button className="btn" onClick={goNext}>
              Next →
            </button>
          )}
        </div>

        <div className="palette">
          {list.map((x, i) => (
            <button
              key={x.id}
              className={`pal ${answers[x.id] !== undefined ? "answered" : ""} ${i === index ? "current" : ""}`}
              onClick={() => setIndex(i)}
            >
              {i + 1}
            </button>
          ))}
        </div>
        <p className="muted small" style={{ marginTop: 14 }}>
          Tip: on a keyboard, press A–D to answer, N for next, P for previous — same as the exam hall.
        </p>
      </div>

      <div className="bottombar">
        <button className="btn secondary" onClick={() => setShowCalc(true)}>
          🧮 Calculator
        </button>
        <button className="btn" onClick={() => setConfirm(true)}>
          Submit
        </button>
      </div>

      {showCalc && (
        <div className="backdrop" onClick={() => setShowCalc(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <Calculator />
            <button className="btn secondary block" style={{ marginTop: 10 }} onClick={() => setShowCalc(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {confirm && (
        <div className="backdrop" onClick={() => setConfirm(false)}>
          <div className="sheet" onClick={(e) => e.stopPropagation()}>
            <h3>Submit your exam?</h3>
            <p className="muted">
              {unanswered > 0
                ? `You have ${unanswered} unanswered question${unanswered === 1 ? "" : "s"}. You can't change answers after submitting.`
                : "All questions answered. You can't change answers after submitting."}
            </p>
            <div className="nav">
              <button className="btn secondary" onClick={() => setConfirm(false)}>
                Keep going
              </button>
              <button className="btn" onClick={submit}>
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
function ResultView({ data, result }: { data: MockPayload; result: MockResult }) {
  const [wrongOnly, setWrongOnly] = useState(true);
  const items = result.review.filter((r) => !wrongOnly || r.chosen !== r.answer);
  const names = Object.fromEntries(data.subjects.map((s) => [s.code, s.name]));

  return (
    <div className="wrap">
      <div className="score">
        {result.pass ? (
          <>
            <div className="big" style={{ color: result.pass.passed ? "var(--ok)" : "var(--bad)" }}>{result.pass.passed ? "PASS" : "NOT YET"}</div>
            <div className="sub">
              <b>
                {result.rawScore}/{result.total}
              </b>{" "}
              correct · {result.pass.needed} needed to pass ({Math.round(result.scaled)}%)
            </div>
            <p className="muted small">
              {result.pass.passed ? "Great — aim for 3 passes in a row before you book the real test." : "Review the questions below, then try another test."}
            </p>
          </>
        ) : (
          <>
            <div className="big">{Math.round(result.scaled)}%</div>
            <div className="sub">
              {result.scoreStyle === "jamb400" && (
                <>
                  ≈ <b>{result.jambScore}/400</b> JAMB-style ·{" "}
                </>
              )}
              {result.rawScore}/{result.total} correct
            </div>
          </>
        )}
        {data.kind === "weekly" && <p className="muted small">National & state rankings arrive in Telegram on Monday at 8am.</p>}
      </div>

      <div className="card" style={{ display: result.perSubject.length > 1 ? undefined : "none" }}>
        {result.perSubject.length > 1 && result.perSubject.map((p) => (
          <div key={p.code} style={{ marginBottom: 10 }}>
            <div className="row">
              <b>{p.name}</b>
              <span className="muted small">
                {p.correct}/{p.total} · {p.pct}%
              </span>
            </div>
            <div className="bar">
              <span style={{ width: `${p.pct}%`, background: p.pct >= 70 ? "var(--ok)" : p.pct >= 50 ? "var(--warn)" : "var(--bad)" }} />
            </div>
          </div>
        ))}
      </div>

      <div className="nav" style={{ marginTop: 4 }}>
        <button
          className="btn"
          onClick={() =>
            shareLink(
              `${window.location.origin}/r/${data.attemptId}`,
              result.pass?.passed
                ? `I just passed a ${data.title} mock (${result.rawScore}/${result.total}) ✅ Can you?`
                : result.scoreStyle === "jamb400"
                  ? `I scored ${result.jambScore}/400 on Mock Night 🔥 Can you beat me?`
                  : `I scored ${Math.round(result.scaled)}% on Mock Night 🔥 Can you beat me?`,
            )
          }
        >
          📤 Share my result
        </button>
        <button className="btn secondary" onClick={() => openExternal(`${window.location.origin}/api/card/${data.attemptId}?format=story`)}>
          🖼 Status image
        </button>
      </div>

      <p className="muted small">Wrong answers have been added to your review box — they'll come back in your daily drills.</p>

      <div className="row" style={{ margin: "18px 0 6px" }}>
        <h3 style={{ margin: 0 }}>Review</h3>
        <button className="btn secondary" style={{ minHeight: 36, padding: "6px 12px" }} onClick={() => setWrongOnly(!wrongOnly)}>
          {wrongOnly ? "Show all" : "Wrong only"}
        </button>
      </div>

      {items.length === 0 && <p className="muted">Nothing to review — perfect score! 🎉</p>}
      {items.map((r, n) => (
        <div className="card" key={r.id}>
          <span className="chip">{names[r.subject] ?? r.subject}</span>
          <p className="qbody" style={{ fontSize: 15 }}>
            {r.body}
          </p>
          <div className="options">
            {r.options.map((o, i) => (
              <div
                key={i}
                className={`opt ${i === r.answer ? "correct" : ""} ${i === r.chosen && i !== r.answer ? "wrong" : ""}`}
              >
                <span className="letter">{LETTERS[i]}</span>
                <span>{o}</span>
              </div>
            ))}
          </div>
          {r.chosen === null && <p className="muted small">Not answered</p>}
          {r.explanation && <div className="explain">💡 {r.explanation}</div>}
          {r.chosen !== null && r.chosen !== r.answer && <ExplainButton questionId={r.id} />}
        </div>
      ))}

      <div className="bottombar">
        <button className="btn block" onClick={goHome}>
          {inTelegram() ? "Back to Telegram" : "Back to dashboard"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
function ErrorView({ code, startsAt }: { code: string; startsAt?: string }) {
  const messages: Record<string, { title: string; body: string }> = {
    UNAUTHORIZED: inTelegram()
      ? { title: "Session expired", body: "Close this window and open the test again from the bot." }
      : { title: "Please sign in", body: "Sign in with your email to take a practice test." },
    ONBOARDING: { title: "Finish setting up first", body: "Pick what you're preparing for, then come back." },
    LIMIT: { title: "Free plan: 1 practice test a week", body: "Upgrade to Premium for unlimited full practice tests." },
    NOT_OPEN: {
      title: "Mock Night hasn't started",
      body: startsAt ? `It opens ${new Date(startsAt).toLocaleString("en-NG", { timeZone: "Africa/Lagos", weekday: "long", hour: "numeric", minute: "2-digit" })}.` : "Check back on Sunday evening.",
    },
    CLOSED: { title: "Mock Night has closed", body: "Results land in Telegram on Monday morning. See you next Sunday!" },
    NO_SUBJECTS: { title: "No subjects selected", body: "Open settings and pick your subjects." },
    NO_QUESTIONS: { title: "No questions yet", body: "We're still adding questions for your subjects. Try again soon." },
    NOT_FOUND: { title: "Exam not found", body: "This link may be old. Open the CBT again from the bot." },
  };
  const m = messages[code] ?? { title: "Something went wrong", body: "Check your connection and try again." };
  return (
    <div className="center">
      <div>
        <h2>{m.title}</h2>
        <p className="muted">{m.body}</p>
        <button className="btn" onClick={goHome}>
          {inTelegram() ? "Back to Telegram" : code === "UNAUTHORIZED" ? "Sign in" : "Go to dashboard"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
function Calculator() {
  const [display, setDisplay] = useState("0");
  const [acc, setAcc] = useState<number | null>(null);
  const [op, setOp] = useState<string | null>(null);
  const [fresh, setFresh] = useState(true);

  const calc = (a: number, b: number, o: string) =>
    o === "+" ? a + b : o === "−" ? a - b : o === "×" ? a * b : o === "÷" ? (b === 0 ? NaN : a / b) : b;
  const fmt = (n: number) => (Number.isFinite(n) ? String(parseFloat(n.toPrecision(12))) : "Error");

  const digit = (d: string) => {
    if (fresh) {
      setDisplay(d === "." ? "0." : d);
      setFresh(false);
    } else if (!(d === "." && display.includes("."))) setDisplay(display === "0" && d !== "." ? d : display + d);
  };
  const operator = (o: string) => {
    const cur = parseFloat(display);
    if (acc !== null && op && !fresh) {
      const r = calc(acc, cur, op);
      setAcc(r);
      setDisplay(fmt(r));
    } else setAcc(cur);
    setOp(o);
    setFresh(true);
  };
  const equals = () => {
    if (acc === null || !op) return;
    setDisplay(fmt(calc(acc, parseFloat(display), op)));
    setAcc(null);
    setOp(null);
    setFresh(true);
  };
  const clear = () => {
    setDisplay("0");
    setAcc(null);
    setOp(null);
    setFresh(true);
  };
  const unary = (f: (n: number) => number) => {
    setDisplay(fmt(f(parseFloat(display))));
    setFresh(true);
  };

  return (
    <>
      <div className="calc-display">{display}</div>
      <div className="calc-grid">
        <button onClick={clear}>C</button>
        <button onClick={() => unary((n) => -n)}>±</button>
        <button onClick={() => unary(Math.sqrt)}>√</button>
        <button className="op" onClick={() => operator("÷")}>÷</button>
        {["7", "8", "9"].map((d) => <button key={d} onClick={() => digit(d)}>{d}</button>)}
        <button className="op" onClick={() => operator("×")}>×</button>
        {["4", "5", "6"].map((d) => <button key={d} onClick={() => digit(d)}>{d}</button>)}
        <button className="op" onClick={() => operator("−")}>−</button>
        {["1", "2", "3"].map((d) => <button key={d} onClick={() => digit(d)}>{d}</button>)}
        <button className="op" onClick={() => operator("+")}>+</button>
        <button className="wide" onClick={() => digit("0")}>0</button>
        <button onClick={() => digit(".")}>.</button>
        <button className="op" onClick={equals}>=</button>
      </div>
    </>
  );
}

