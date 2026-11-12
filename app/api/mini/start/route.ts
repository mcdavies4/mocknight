import { NextResponse } from "next/server";
import { startMock } from "@/lib/mock";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  if (student.onboarding_step !== "done") return NextResponse.json({ error: "ONBOARDING" }, { status: 400 });
  try {
    return NextResponse.json(
      await startMock(student, typeof body.mockId === "string" ? body.mockId : null, typeof body.variant === "string" ? body.variant : null),
    );
  } catch (e) {
    return errorResponse(e);
  }
}
