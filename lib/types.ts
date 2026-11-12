export type Exam = "JAMB" | "WAEC";

export interface Student {
  id: string;
  telegram_id: number | null;
  track: string | null;
  email: string | null;
  auth_user_id: string | null;
  source: "telegram" | "web";
  first_name: string | null;
  username: string | null;
  exam: Exam | null;
  subjects: string[];
  state: string | null;
  school: string | null;
  drill_hour: number;
  onboarding_step: "exam" | "subjects" | "state" | "school" | "time" | "done";
  premium_until: string | null;
  last_drill_prompt: string | null;
  blocked: boolean;
  created_at: string;
  ref_code: string | null;
  referred_by: string | null;
  referral_rewarded_at: string | null;
  parent_email: string | null;
  full_name: string | null;
}

export interface Question {
  id: string;
  subject_code: string;
  topic: string | null;
  body: string;
  options: string[];
  answer_index: number;
  explanation: string | null;
  difficulty: number;
  reviewed: boolean;
}

export interface DrillSession {
  id: string;
  student_id: string;
  drill_date: string;
  question_ids: string[];
  review_count: number;
  position: number;
  correct: number;
  finished_at: string | null;
}

export interface Mock {
  id: string;
  kind: "practice" | "weekly";
  track: string | null;
  title: string;
  owner_student_id: string | null;
  starts_at: string;
  ends_at: string | null;
  duration_minutes: number;
  per_subject: number;
  results_posted: boolean;
  reminder_sent: boolean;
  opened_sent: boolean;
}

export interface MockAttempt {
  id: string;
  mock_id: string;
  student_id: string;
  subjects: string[];
  started_at: string;
  deadline: string;
  submitted_at: string | null;
  answers: Record<string, number>;
  raw_score: number | null;
  total: number | null;
  per_subject: Record<string, { correct: number; total: number; pct: number }> | null;
  scaled_score: number | null;
  duration_seconds: number | null;
}

export interface TutorGroup {
  id: string;
  owner_student_id: string;
  name: string;
  join_code: string;
  paid_seats: number;
  paid_until: string | null;
  telegram_chat_id: number | null;
  currency: "NGN" | "GBP";
}
