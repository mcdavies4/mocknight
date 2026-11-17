import { ImageResponse } from "next/og";

// Preview image shown when a Mock Night link is shared (WhatsApp, X, LinkedIn, Google Discover).
export const alt = "Mock Night — exam practice for 90+ exams";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OG() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#0B2F22", color: "#F7F8F1", padding: 72, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 40, fontWeight: 700 }}>
          <div style={{ width: 64, height: 64, borderRadius: 16, background: "#2F6B4F", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 800 }}>M</div>
          Mock Night
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 76, fontWeight: 800, lineHeight: 1.05 }}>Pass your exam with daily practice.</div>
          <div style={{ fontSize: 34, color: "#BFD8C9" }}>Timed mock tests and clear explanations for 90+ exams: JAMB, WAEC, UK driving theory, Life in the UK, NMC CBT, PLAB, AWS and more.</div>
        </div>
        <div style={{ fontSize: 28, color: "#8FB9A2" }}>On the web and Telegram · Free to start</div>
      </div>
    ),
    size,
  );
}
