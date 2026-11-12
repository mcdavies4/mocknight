import { getCertificate } from "@/lib/courses";
import { certificatePdf } from "@/lib/certificate-pdf";

export const dynamic = "force-dynamic";

export async function GET(_req: Request, { params }: { params: Promise<{ no: string }> }) {
  const { no } = await params;
  const cert = await getCertificate(no);
  if (!cert) return new Response("Certificate not found", { status: 404 });
  const pdf = await certificatePdf(cert);
  return new Response(Buffer.from(pdf), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="${cert.cert_no}.pdf"`,
      "Cache-Control": "private, max-age=300",
    },
  });
}
