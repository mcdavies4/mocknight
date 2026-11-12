import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { updateStudent } from "@/lib/students";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  const patch: Record<string, string | null> = {};
  if ("parentEmail" in body) {
    const e = typeof body.parentEmail === "string" ? body.parentEmail.trim().toLowerCase() : "";
    if (e && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return NextResponse.json({ error: "BAD_EMAIL" }, { status: 400 });
    patch.parent_email = e || null;
  }
  if ("fullName" in body && typeof body.fullName === "string") patch.full_name = body.fullName.trim().slice(0, 80) || null;
  try {
    await updateStudent(student.id, patch);
    return NextResponse.json({ ok: true });
  } catch (e) {
    return errorResponse(e);
  }
}
