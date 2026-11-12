import { NextResponse } from "next/server";
import { verifyInitData } from "./auth";
import { db } from "./supabase";
import { upsertStudent } from "./students";
import { MockError } from "./mock";
import type { Student } from "./types";

/**
 * Identify the learner behind an API request:
 *  - Telegram Mini App: body.initData (HMAC-verified)
 *  - Web app: Authorization: Bearer <Supabase access token>
 */
export async function authRequest(req: Request, body: { initData?: unknown }): Promise<Student | null> {
  if (typeof body.initData === "string" && body.initData) {
    const user = verifyInitData(body.initData);
    if (!user) return null;
    return upsertStudent({ id: user.id, first_name: user.first_name, username: user.username });
  }
  const auth = req.headers.get("authorization");
  if (auth?.startsWith("Bearer ")) return webStudent(auth.slice(7));
  return null;
}

async function webStudent(token: string): Promise<Student | null> {
  const { data, error } = await db().auth.getUser(token);
  if (error || !data.user) return null;
  const user = data.user;

  const { data: existing } = await db().from("students").select("*").eq("auth_user_id", user.id).maybeSingle();
  if (existing) return existing as Student;

  const { data: created, error: e } = await db()
    .from("students")
    .insert({
      auth_user_id: user.id,
      email: user.email ?? null,
      first_name: (user.email ?? "").split("@")[0] || null,
      source: "web",
    })
    .select()
    .single();
  if (e) {
    // Parallel request created it
    const { data: again } = await db().from("students").select("*").eq("auth_user_id", user.id).maybeSingle();
    return (again as Student) ?? null;
  }
  return created as Student;
}

export function errorResponse(e: unknown) {
  if (e instanceof MockError) return NextResponse.json({ error: e.code, ...e.extra }, { status: 400 });
  console.error(e);
  return NextResponse.json({ error: "SERVER" }, { status: 500 });
}

export const unauthorized = () => NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
