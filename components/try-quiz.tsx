"use client";
import { useState } from "react";
import { EmailStart } from "./email-start";

export interface TryQ { id: string; body: string; options: string[]; answer: number; explanation: string | null }

/** Five free questions right on the exam page, then an email sign-up with the score. */
export function TryQuiz({ questions, track, short }: { questions: TryQ[]; track: string; short: string }) {
  const [i, setI] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  if (!questions.length) return null;
  const q = questions[i];
  const pick = (n: number) => {
    if (picked !== null) return;
    setPicked(n);
    if (n === q.answer) setScore((s) => s + 1);
  };
  const next = () => {
    if (i + 1 >= questions.length) { setDone(true); return; }
    setI(i + 1);
    setPicked(null);
  };
  const L = "ABCDE";
  return (
    <section className="card try-quiz" style={{ marginTop: 20 }}>
      {done ? (
        <>
          <div className="muted small">Your score</div>
          <div style={{ fontSize: 34, fontWeight: 800 }}>{score} / {questions.length}</div>
          <p className="muted" style={{ marginTop: 4 }}>
            {score === questions.length ? "Perfect — now see how you do on a full timed test." : score >= questions.length / 2 ? "Good start. A full practice test will show what to work on." : "Plenty to work on — daily practice brings back the ones you miss until they stick."}
          </p>
          <EmailStart compact track={track} title={`Get your free ${short} practice test`} text="Full timed tests in the real format, daily questions and a readiness score. Enter your email to start." button="Start free" />
        </>
      ) : (
        <>
          <div className="row" style={{ justifyContent: "space-between" }}>
            <b>🧪 Try {questions.length} free {short} questions</b>
            <span className="muted small">{i + 1} / {questions.length}</span>
          </div>
          <p style={{ whiteSpace: "pre-line", margin: "10px 0 12px" }}>{q.body}</p>
          <div className="options">
            {q.options.map((o, n) => {
              const cls = picked === null ? "" : n === q.answer ? "correct" : n === picked ? "wrong" : "";
              return (
                <button key={n} type="button" className={`opt ${cls}`} onClick={() => pick(n)} disabled={picked !== null}>
                  <span className="letter">{L[n]}</span><span>{o}</span>
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <>
              <p className="small" style={{ margin: "12px 0 0" }}>
                <b>{picked === q.answer ? "✅ Correct." : `❌ The answer is ${L[q.answer]}.`}</b>{q.explanation ? ` ${q.explanation}` : ""}
              </p>
              <button className="btn block" style={{ marginTop: 12 }} onClick={next}>{i + 1 >= questions.length ? "See my score" : "Next question"}</button>
            </>
          )}
        </>
      )}
    </section>
  );
}
