import { getCertificate } from "@/lib/courses";
import { getTrack } from "@/lib/tracks";

export const dynamic = "force-dynamic";
export const metadata = { title: "Verify a certificate — Mock Night" };

const fmt = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export default async function Verify({ params }: { params: Promise<{ no: string }> }) {
  const { no } = await params;
  const c = await getCertificate(decodeURIComponent(no));
  if (!c) {
    return (
      <div className="center">
        <div>
          <h1>❌ Not found</h1>
          <p className="muted">No certificate exists with number {no}. Check it was typed exactly as shown.</p>
        </div>
      </div>
    );
  }
  const t = getTrack(c.track);
  const valid = new Date(c.expires_at) > new Date();
  return (
    <main className="wrap" style={{ maxWidth: 560, paddingTop: 48 }}>
      <h1 style={{ marginBottom: 4 }}>{valid ? "✅ Valid certificate" : "⚠️ Expired certificate"}</h1>
      <div className="card">
        <div className="row"><span className="muted">Name</span><b>{c.full_name}</b></div>
        <div className="row"><span className="muted">Course</span><b>{t.course?.certificateTitle ?? t.name}</b></div>
        <div className="row"><span className="muted">Score</span><b>{Math.round(Number(c.score_pct))}%</b></div>
        <div className="row"><span className="muted">Issued</span><b>{fmt(c.issued_at)}</b></div>
        <div className="row"><span className="muted">{valid ? "Valid until" : "Expired on"}</span><b>{fmt(c.expires_at)}</b></div>
        <div className="row"><span className="muted">Number</span><b>{c.cert_no}</b></div>
      </div>
      <p className="muted small">Issued by Mock Night (The 36th Solutions Ltd) for completion of online awareness training.</p>
    </main>
  );
}
