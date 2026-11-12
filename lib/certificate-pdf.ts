import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import { getTrack } from "./tracks";
import { env } from "./env";
import type { Certificate } from "./courses";

/** Standard PDF fonts only cover Latin-1: strip accents and drop anything else. */
const safe = (s: string) =>
  s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\x20-\x7E\xA0-\xFF–—·]/g, "");

const fmtDate = (iso: string) => new Date(iso).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

export async function certificatePdf(c: Certificate): Promise<Uint8Array> {
  const t = getTrack(c.track);
  const doc = await PDFDocument.create();
  doc.setTitle(`${t.course?.certificateTitle ?? t.name} — ${safe(c.full_name)}`);
  doc.setAuthor("Mock Night · The 36th Solutions Ltd");
  const page = doc.addPage([842, 595]); // A4 landscape
  const { width, height } = page.getSize();
  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const green = rgb(0.043, 0.431, 0.31);
  const grey = rgb(0.4, 0.44, 0.52);
  const dark = rgb(0.06, 0.09, 0.16);

  const center = (text: string, y: number, size: number, font = regular, color = dark) => {
    const w = font.widthOfTextAtSize(text, size);
    page.drawText(text, { x: (width - w) / 2, y, size, font, color });
  };

  // Border
  page.drawRectangle({ x: 24, y: 24, width: width - 48, height: height - 48, borderColor: green, borderWidth: 3 });
  page.drawRectangle({ x: 34, y: 34, width: width - 68, height: height - 68, borderColor: rgb(0.8, 0.9, 0.85), borderWidth: 1 });

  center("MOCK NIGHT", height - 90, 14, bold, green);
  center("CERTIFICATE OF COMPLETION", height - 130, 26, bold);
  center("This is to certify that", height - 180, 13, regular, grey);
  center(safe(c.full_name), height - 225, 32, bold);
  center("has successfully completed the course", height - 265, 13, regular, grey);
  center(safe(t.course?.certificateTitle ?? t.name), height - 300, 20, bold, green);
  center(`and passed the final assessment with a score of ${Math.round(Number(c.score_pct))}%`, height - 330, 13, regular, grey);

  const topics = "Fire safety law · How fire spreads · Prevention · Alarms & emergency lighting · Fire doors & signs · Extinguishers · Evacuation · Drills & records";
  if (c.track === "FIRE") center(topics, height - 365, 9, regular, grey);

  const colY = 120;
  const col = (label: string, value: string, x: number) => {
    page.drawText(label, { x, y: colY + 18, size: 9, font: regular, color: grey });
    page.drawText(value, { x, y: colY, size: 12, font: bold, color: dark });
  };
  col("Date issued", fmtDate(c.issued_at), 90);
  col("Valid until", fmtDate(c.expires_at), 300);
  col("Certificate number", c.cert_no, 510);

  const verify = `Verify at ${env.appUrl.replace(/^https?:\/\//, "")}/verify/${c.cert_no}`;
  center(verify, 72, 9, regular, grey);
  center("Issued by Mock Night, a product of The 36th Solutions Ltd. This certificate confirms completion of online awareness training.", 56, 8, regular, grey);

  return doc.save();
}
