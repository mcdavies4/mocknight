import { NextResponse } from "next/server";
import { startMock } from "@/lib/mock";
import { authStudent, errorResponse, unauthorized } from "../_shared";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authStudent(body.initData);
  if (!student) return unauthorized();
  if (student.onboarding_step !== "done") return NextResponse.json({ error: "ONBOARDING" }, { status: 400 });
  try {
    return NextResponse.json(await startMock(student, typeof body.mockId === "string" ? body.mockId : null));
  } catch (e) {
    return errorResponse(e);
  }
}
