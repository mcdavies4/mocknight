import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const token = url.searchParams.get("t");
  const payload = verifyToken(token);
  if (!payload) return new NextResponse("This link has expired. Send /dashboard to the bot for a new one.", { status: 401 });
  const res = NextResponse.redirect(new URL("/dashboard", url.origin));
  res.cookies.set("mn_dash", token!, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/dashboard",
    maxAge: payload.exp - Math.floor(Date.now() / 1000),
  });
  return res;
}
