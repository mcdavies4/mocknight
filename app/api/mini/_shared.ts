import { NextResponse } from "next/server";
import { verifyInitData } from "@/lib/auth";
import { upsertStudent } from "@/lib/students";
import { MockError } from "@/lib/mock";
import type { Student } from "@/lib/types";

export async function authStudent(initData: unknown): Promise<Student | null> {
  if (typeof initData !== "string") return null;
  const user = verifyInitData(initData);
  if (!user) return null;
  return upsertStudent({ id: user.id, first_name: user.first_name, username: user.username });
}

export function errorResponse(e: unknown) {
  if (e instanceof MockError) return NextResponse.json({ error: e.code, ...e.extra }, { status: 400 });
  console.error(e);
  return NextResponse.json({ error: "SERVER" }, { status: 500 });
}

export const unauthorized = () => NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
