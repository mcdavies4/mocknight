import { db, must } from "./supabase";
import { isPremium } from "./students";
import { OFFERED_SUBJECTS, subjectName } from "./subjects";
import { getTrack, mockPerSubject, type ScoreStyle, type Track } from "./tracks";
import { FREE_PRACTICE_MOCKS_PER_WEEK } from "./pricing";
import { watToUtc } from "./time";
import type { Mock, MockAttempt, Question, Student } from "./types";

export const WEEKLY = { perSubject: 20, minutes: 60, startHour: 20, lastStartHour: 21 };
const GRACE_MS = 60_000; // accept submissions up to 60s after the deadline (slow networks)

export class MockError extends Error {
  constructor(public code: "NOT_FOUND" | "NOT_OPEN" | "CLOSED" | "LIMIT" | "NO_SUBJECTS" | "NO_QUESTIONS" | "SUBMITTED", public extra?: Record<string, unknown>) {
    super(code);
  }
}

export interface PublicQuestion {
  id: string;
  subject: string;
  body: string;
  options: string[];
}

export interface ReviewQuestion extends PublicQuestion {
  answer: number;
  chosen: number | null;
  explanation: string | null;
}

export interface MockResult {
  scoreStyle: ScoreStyle;
  /** Set for pass/fail tracks (e.g. Life in the UK: 18 of 24) */
  pass?: { needed: number; passed: boolean };
  rawScore: number;
  total: number;
  scaled: number; // average % across subjects
  jambScore: number; // out of 400 (4 subjects × 100)
  perSubject: { code: string; name: string; correct: number; total: number; pct: number }[];
  review: ReviewQuestion[];
}

export interface MockPayload {
  trackCode: string;
  scoreStyle: ScoreStyle;
  backTo: "telegram" | "web";
  attemptId: string;
  mockId: string;
  kind: Mock["kind"];
  title: string;
  deadline: string;
  serverNow: string;
  subjects: { code: string; name: string }[];
  questions: PublicQuestion[];
  answers: Record<string, number>;
  result?: MockResult;
}

/** Subjects used in mocks: English first, max 4 (JAMB format). */
export function mockSubjects(student: Student) {
  const track = getTrack(student.track);
  if (track.subjectMode === "single") return track.subjects;
  const subs = student.subjects.filter((s) => track.subjects.includes(s));
  const ordered = [...subs.filter((s) => s === "ENG"), ...subs.filter((s) => s !== "ENG")];
  return ordered.slice(0, track.mock.maxSubjects);
}

async function getMock(id: string): Promise<Mock | null> {
  const { data, error } = await db().from("mocks").select("*").eq("id", id).maybeSingle();
  if (error) throw new Error(error.message);
  return data as Mock | null;
}

// ---------------------------------------------------------------------------
// Weekly Mock Night
// ---------------------------------------------------------------------------

/** Create the Mock Night for a given Sunday (WAT date) if it doesn't exist. Same questions for everyone. */
export async function ensureWeeklyMock(sundayDate: string): Promise<Mock> {
  const startsAt = watToUtc(sundayDate, WEEKLY.startHour).toISOString();
  const { data: existing } = await db()
    .from("mocks")
    .select("*")
    .eq("kind", "weekly")
    .eq("starts_at", startsAt)
    .maybeSingle();
  if (existing) return existing as Mock;

  const mock = must(
    await db()
      .from("mocks")
      .insert({
        kind: "weekly",
        track: "SCHOOL",
        title: `Mock Night · ${new Date(startsAt).toLocaleDateString("en-NG", { day: "numeric", month: "short", timeZone: "Africa/Lagos" })}`,
        starts_at: startsAt,
        ends_at: watToUtc(sundayDate, WEEKLY.lastStartHour).toISOString(),
        duration_minutes: WEEKLY.minutes,
        per_subject: WEEKLY.perSubject,
      })
      .select()
      .single(),
    "create weekly mock",
  ) as Mock;

  for (const subject of OFFERED_SUBJECTS) {
    const qs = must(
      await db().rpc("pick_random_questions", { p_subject: subject, p_limit: WEEKLY.perSubject, p_exclude: [] }),
      "pick weekly",
    ) as Question[];
    if (qs.length) {
      await db()
        .from("mock_questions")
        .insert(qs.map((q, i) => ({ mock_id: mock.id, question_id: q.id, subject_code: subject, position: i })));
    }
  }
  return mock;
}

export async function getOpenWeeklyMock(): Promise<Mock | null> {
  const now = new Date().toISOString();
  const { data } = await db()
    .from("mocks")
    .select("*")
    .eq("kind", "weekly")
    .lte("starts_at", now)
    .gt("ends_at", now)
    .maybeSingle();
  return data as Mock | null;
}

export async function getLatestFinishedWeeklyMock(): Promise<Mock | null> {
  const { data } = await db()
    .from("mocks")
    .select("*")
    .eq("kind", "weekly")
    .lte("ends_at", new Date().toISOString())
    .order("starts_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  return data as Mock | null;
}

// ---------------------------------------------------------------------------
// Starting / resuming
// ---------------------------------------------------------------------------

export async function startMock(student: Student, mockId?: string | null): Promise<MockPayload> {
  const subjects = mockSubjects(student);
  if (!subjects.length) throw new MockError("NO_SUBJECTS");
  return mockId ? startWeekly(student, mockId, subjects) : startPractice(student, subjects);
}

async function startWeekly(student: Student, mockId: string, subjects: string[]): Promise<MockPayload> {
  const mock = await getMock(mockId);
  if (!mock || mock.kind !== "weekly" || !getTrack(student.track).weeklyMock) throw new MockError("NOT_FOUND");

  const existing = await getAttempt(mock.id, student.id);
  if (existing) {
    if (existing.submitted_at) return buildPayload(mock, existing);
    if (Date.now() > new Date(existing.deadline).getTime() + GRACE_MS) {
      await submitAttempt(existing.id, student.id, existing.answers, true);
      return buildPayload(mock, (await getAttempt(mock.id, student.id))!);
    }
    return buildPayload(mock, existing);
  }

  const now = Date.now();
  if (now < new Date(mock.starts_at).getTime()) throw new MockError("NOT_OPEN", { startsAt: mock.starts_at });
  if (mock.ends_at && now >= new Date(mock.ends_at).getTime()) throw new MockError("CLOSED");

  const attempt = await createAttempt(mock, student, subjects);
  return buildPayload(mock, attempt);
}

async function startPractice(student: Student, subjects: string[]): Promise<MockPayload> {
  // Resume an unfinished practice mock if there is one
  const { data: open } = await db()
    .from("mock_attempts")
    .select("*, mocks!inner(kind)")
    .eq("student_id", student.id)
    .eq("mocks.kind", "practice")
    .is("submitted_at", null)
    .gt("deadline", new Date().toISOString())
    .order("started_at", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (open) {
    const mock = (await getMock(open.mock_id))!;
    return buildPayload(mock, open as MockAttempt);
  }

  if (!(await isPremium(student))) {
    const since = new Date(Date.now() - 7 * 86400_000).toISOString();
    const { count } = await db()
      .from("mocks")
      .select("*", { count: "exact", head: true })
      .eq("kind", "practice")
      .eq("owner_student_id", student.id)
      .gte("created_at", since);
    if ((count ?? 0) >= FREE_PRACTICE_MOCKS_PER_WEEK) throw new MockError("LIMIT");
  }

  const track = getTrack(student.track);
  const perSubject = mockPerSubject(track);
  const mock = must(
    await db()
      .from("mocks")
      .insert({
        kind: "practice",
        track: track.code,
        title: track.subjectMode === "single" ? `${track.short} practice test` : "Practice CBT",
        owner_student_id: student.id,
        duration_minutes: track.mock.minutes,
        per_subject: perSubject,
      })
      .select()
      .single(),
    "create practice",
  ) as Mock;

  let inserted = 0;
  for (const subject of subjects) {
    const fresh = must(
      await db().rpc("pick_new_questions", { p_student: student.id, p_subject: subject, p_limit: perSubject }),
      "pick practice",
    ) as Question[];
    let qs = fresh;
    if (qs.length < perSubject) {
      const extra = must(
        await db().rpc("pick_random_questions", {
          p_subject: subject,
          p_limit: perSubject - qs.length,
          p_exclude: qs.map((q) => q.id),
        }),
        "pick practice extra",
      ) as Question[];
      qs = qs.concat(extra);
    }
    if (qs.length) {
      await db()
        .from("mock_questions")
        .insert(qs.map((q, i) => ({ mock_id: mock.id, question_id: q.id, subject_code: subject, position: i })));
      inserted += qs.length;
    }
  }
  if (!inserted) {
    await db().from("mocks").delete().eq("id", mock.id);
    throw new MockError("NO_QUESTIONS");
  }

  const attempt = await createAttempt(mock, student, subjects);
  return buildPayload(mock, attempt);
}

async function createAttempt(mock: Mock, student: Student, subjects: string[]): Promise<MockAttempt> {
  const deadline = new Date(Date.now() + mock.duration_minutes * 60_000).toISOString();
  const { data, error } = await db()
    .from("mock_attempts")
    .insert({ mock_id: mock.id, student_id: student.id, subjects, deadline })
    .select()
    .single();
  if (error) {
    const again = await getAttempt(mock.id, student.id);
    if (again) return again;
    throw new Error(error.message);
  }
  return data as MockAttempt;
}

async function getAttempt(mockId: string, studentId: string): Promise<MockAttempt | null> {
  const { data } = await db()
    .from("mock_attempts")
    .select("*")
    .eq("mock_id", mockId)
    .eq("student_id", studentId)
    .maybeSingle();
  return data as MockAttempt | null;
}

async function loadQuestions(mockId: string, subjects: string[]): Promise<(Question & { position: number })[]> {
  const rows = must(
    await db()
      .from("mock_questions")
      .select("position, subject_code, questions(*)")
      .eq("mock_id", mockId)
      .in("subject_code", subjects),
    "load mock questions",
  ) as any[];
  const order = new Map(subjects.map((s, i) => [s, i]));
  return rows
    .map((r) => ({ ...(Array.isArray(r.questions) ? r.questions[0] : r.questions), position: r.position }))
    .sort((a, b) => order.get(a.subject_code)! - order.get(b.subject_code)! || a.position - b.position);
}

async function buildPayload(mock: Mock, attempt: MockAttempt): Promise<MockPayload> {
  const qs = await loadQuestions(mock.id, attempt.subjects);
  const { data: st } = await db().from("students").select("track, telegram_id").eq("id", attempt.student_id).single();
  const track = getTrack(mock.kind === "weekly" ? st?.track : mock.track ?? st?.track);
  const payload: MockPayload = {
    trackCode: track.code,
    scoreStyle: track.mock.scoreStyle,
    backTo: st?.telegram_id ? "telegram" : "web",
    attemptId: attempt.id,
    mockId: mock.id,
    kind: mock.kind,
    title: mock.title,
    deadline: attempt.deadline,
    serverNow: new Date().toISOString(),
    subjects: attempt.subjects.map((code) => ({ code, name: subjectName(code) })),
    questions: qs.map((q) => ({ id: q.id, subject: q.subject_code, body: q.body, options: q.options })),
    answers: attempt.answers ?? {},
  };
  if (attempt.submitted_at) payload.result = gradeQuestions(qs, attempt.subjects, attempt.answers ?? {}, track);
  return payload;
}

// ---------------------------------------------------------------------------
// Saving / submitting
// ---------------------------------------------------------------------------

function cleanAnswers(answers: unknown, validIds: Set<string>): Record<string, number> {
  const out: Record<string, number> = {};
  if (answers && typeof answers === "object") {
    for (const [k, v] of Object.entries(answers as Record<string, unknown>)) {
      if (validIds.has(k) && Number.isInteger(v) && (v as number) >= 0 && (v as number) < 5) out[k] = v as number;
    }
  }
  return out;
}

async function loadOwnedAttempt(attemptId: string, studentId: string): Promise<MockAttempt> {
  const { data } = await db().from("mock_attempts").select("*").eq("id", attemptId).maybeSingle();
  if (!data || data.student_id !== studentId) throw new MockError("NOT_FOUND");
  return data as MockAttempt;
}

export async function saveAnswers(attemptId: string, studentId: string, answers: unknown) {
  const attempt = await loadOwnedAttempt(attemptId, studentId);
  if (attempt.submitted_at) throw new MockError("SUBMITTED");
  if (Date.now() > new Date(attempt.deadline).getTime() + GRACE_MS) throw new MockError("CLOSED");
  const qs = await loadQuestions(attempt.mock_id, attempt.subjects);
  const clean = cleanAnswers(answers, new Set(qs.map((q) => q.id)));
  await db().from("mock_attempts").update({ answers: clean }).eq("id", attempt.id).is("submitted_at", null);
}

function gradeQuestions(qs: Question[], subjects: string[], answers: Record<string, number>, track: Track): MockResult {
  const per = new Map(subjects.map((s) => [s, { correct: 0, total: 0 }]));
  let raw = 0;
  const review: ReviewQuestion[] = [];
  for (const q of qs) {
    const chosen = answers[q.id] ?? null;
    const ok = chosen === q.answer_index;
    const p = per.get(q.subject_code);
    if (p) {
      p.total++;
      if (ok) p.correct++;
    }
    if (ok) raw++;
    review.push({
      id: q.id,
      subject: q.subject_code,
      body: q.body,
      options: q.options,
      answer: q.answer_index,
      chosen,
      explanation: q.explanation,
    });
  }
  const perSubject = subjects.map((code) => {
    const p = per.get(code)!;
    return { code, name: subjectName(code), ...p, pct: p.total ? Math.round((p.correct / p.total) * 100) : 0 };
  });
  const scaled = perSubject.length ? perSubject.reduce((s, p) => s + p.pct, 0) / perSubject.length : 0;
  const passPct = track.mock.passPct;
  const needed = passPct ? Math.ceil((qs.length * passPct) / 100) : 0;
  return {
    scoreStyle: track.mock.scoreStyle,
    pass: passPct ? { needed, passed: raw >= needed } : undefined,
    rawScore: raw,
    total: qs.length,
    scaled: Math.round(scaled * 10) / 10,
    jambScore: Math.round((scaled / 100) * 400),
    perSubject,
    review,
  };
}

export async function submitAttempt(attemptId: string, studentId: string, answers: unknown, force = false): Promise<MockResult> {
  const attempt = await loadOwnedAttempt(attemptId, studentId);
  const qs = await loadQuestions(attempt.mock_id, attempt.subjects);
  const validIds = new Set(qs.map((q) => q.id));
  const mock = (await getMock(attempt.mock_id))!;
  const { data: st } = await db().from("students").select("track").eq("id", studentId).single();
  const track = getTrack(mock.kind === "weekly" ? st?.track : mock.track ?? st?.track);

  if (attempt.submitted_at) return gradeQuestions(qs, attempt.subjects, attempt.answers ?? {}, track);

  // Late: ignore what the client sent and grade what was saved before the deadline
  const late = Date.now() > new Date(attempt.deadline).getTime() + GRACE_MS;
  const final = late && !force ? cleanAnswers(attempt.answers, validIds) : cleanAnswers(answers, validIds);
  const result = gradeQuestions(qs, attempt.subjects, final, track);

  const submittedAt = late ? new Date(attempt.deadline) : new Date();
  const duration = Math.max(0, Math.round((submittedAt.getTime() - new Date(attempt.started_at).getTime()) / 1000));

  const { data: updated } = await db()
    .from("mock_attempts")
    .update({
      answers: final,
      submitted_at: submittedAt.toISOString(),
      raw_score: result.rawScore,
      total: result.total,
      per_subject: Object.fromEntries(result.perSubject.map((p) => [p.code, { correct: p.correct, total: p.total, pct: p.pct }])),
      scaled_score: result.scaled,
      duration_seconds: duration,
    })
    .eq("id", attempt.id)
    .is("submitted_at", null)
    .select("id");
  if (!updated?.length) return result; // someone else submitted in parallel

  // Learning loop: log answers and push wrong ones into the review box
  await db().from("attempts").insert(
    result.review
      .filter((r) => r.chosen !== null)
      .map((r) => ({ student_id: studentId, question_id: r.id, chosen: r.chosen, correct: r.chosen === r.answer, context: "mock" })),
  );
  const tomorrow = new Date(Date.now() + 3600_000 + 86400_000).toISOString().slice(0, 10); // WAT tomorrow
  const wrong = result.review.filter((r) => r.chosen !== r.answer);
  if (wrong.length) {
    await db()
      .from("review_items")
      .upsert(
        wrong.map((r) => ({ student_id: studentId, question_id: r.id, due_on: tomorrow, interval_days: 1 })),
        { onConflict: "student_id,question_id" },
      );
  }
  return result;
}

/** Auto-submit any weekly attempts whose time ran out without a submit. */
export async function closeExpiredAttempts(mockId: string) {
  const rows = must(
    await db()
      .from("mock_attempts")
      .select("id, student_id, answers")
      .eq("mock_id", mockId)
      .is("submitted_at", null)
      .lt("deadline", new Date(Date.now() - GRACE_MS).toISOString()),
    "expired attempts",
  ) as { id: string; student_id: string; answers: Record<string, number> }[];
  for (const r of rows) await submitAttempt(r.id, r.student_id, r.answers, true);
}
