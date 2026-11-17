// Digital Asset Links for the Android app (Trusted Web Activity). Served at /.well-known/assetlinks.json
// via a rewrite. Lists the upload key plus any extra SHA-256 fingerprints in ANDROID_CERT_SHA256
// (comma-separated) — add the Play App Signing key from Play Console → App integrity there.
const UPLOAD_KEY = "DD:4D:F6:C8:6C:42:38:DB:93:04:19:B1:1A:43:AD:32:44:0E:53:A6:6E:C4:82:64:2F:71:15:DB:00:97:F0:FC";

export const dynamic = "force-static";

export function GET() {
  const extra = (process.env.ANDROID_CERT_SHA256 || "").split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
  const fingerprints = [...new Set([UPLOAD_KEY, ...extra])];
  return Response.json(
    [{ relation: ["delegate_permission/common.handle_all_urls"], target: { namespace: "android_app", package_name: "online.mocknight.app", sha256_cert_fingerprints: fingerprints } }],
    { headers: { "Cache-Control": "public, max-age=3600" } },
  );
}
