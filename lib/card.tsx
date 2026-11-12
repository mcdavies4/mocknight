import { ImageResponse } from "next/og";
import type { ShareData } from "./share";

/** Render a shareable result card as PNG (1080×1080, or 1080×1920 for stories). */
export function renderCard(d: ShareData, story: boolean) {
  const W = 1080, H = story ? 1920 : 1080;
  const host = (process.env.APP_URL ?? "").replace(/^https?:\/\//, "").replace(/\/$/, "");
  const accent = d.passed === false ? "#f79009" : "#12b76a";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between",
          background: "linear-gradient(160deg, #0b3d2e 0%, #0b6e4f 55%, #12b76a 100%)", color: "white", padding: 80, fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 40, fontWeight: 700, opacity: 0.9 }}>MOCK NIGHT</div>
          <div style={{ fontSize: 34, opacity: 0.8, marginTop: 8 }}>{`${d.trackName} · ${d.kindLabel}`}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 46, opacity: 0.9 }}>{d.passed === null ? `${d.firstName} scored` : `${d.firstName}'s result`}</div>
          <div style={{ fontSize: d.headline.length > 7 ? 170 : 220, fontWeight: 800, lineHeight: 1, marginTop: 10, color: "white" }}>{d.headline}</div>
          <div style={{ fontSize: 40, marginTop: 20, opacity: 0.9 }}>{d.sub}</div>
          {d.rank && (
            <div style={{ display: "flex", marginTop: 30, fontSize: 40, fontWeight: 700, background: "rgba(255,255,255,0.15)", padding: "16px 28px", borderRadius: 18, alignSelf: "flex-start" }}>
              {d.rank}
            </div>
          )}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ width: 120, height: 10, background: accent, borderRadius: 5, marginBottom: 28 }} />
          <div style={{ fontSize: 40, fontWeight: 700 }}>Can you beat this?</div>
          <div style={{ fontSize: 34, opacity: 0.85, marginTop: 8 }}>{`Practise free at ${host}${d.refCode ? `/join/${d.refCode}` : ""}`}</div>
        </div>
      </div>
    ),
    { width: W, height: H, headers: { "Cache-Control": "public, max-age=300" } },
  );
}
