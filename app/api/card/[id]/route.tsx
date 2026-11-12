import { getShareData } from "@/lib/share";
import { renderCard } from "@/lib/card";

export const dynamic = "force-dynamic";

/** Shareable result card (PNG). ?format=story for 1080×1920 (WhatsApp/Instagram status), default 1080×1080. */
export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const d = await getShareData(id);
  if (!d) return new Response("Not found", { status: 404 });
  return renderCard(d, new URL(req.url).searchParams.get("format") === "story");
}
