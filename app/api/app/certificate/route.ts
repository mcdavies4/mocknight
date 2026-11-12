import { NextResponse } from "next/server";
import { authRequest, errorResponse, unauthorized } from "@/lib/request-auth";
import { issueCertificate } from "@/lib/courses";
import { env } from "@/lib/env";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  const student = await authRequest(req, body);
  if (!student) return unauthorized();
  try {
    const r = await issueCertificate(student, body.fullName);
    if (!r.ok) return NextResponse.json({ error: r.error }, { status: 400 });
    return NextResponse.json({ certNo: r.certificate.cert_no, url: `${env.appUrl}/api/cert/${r.certificate.cert_no}` });
  } catch (e) {
    return errorResponse(e);
  }
}
