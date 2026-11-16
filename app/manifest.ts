import type { MetadataRoute } from "next";

// Makes the web app installable ("Add to home screen") with its own icon and full-screen window.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mock Night — exam practice",
    short_name: "Mock Night",
    description: "Daily questions, timed practice tests and clear explanations for 80+ exams.",
    id: "/app",
    start_url: "/app?source=pwa",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#F7F8F1",
    theme_color: "#0B2F22",
    categories: ["education"],
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icons/maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
    shortcuts: [
      { name: "Today's questions", url: "/app?go=drill", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
      { name: "All exams", url: "/exams", icons: [{ src: "/icons/icon-192.png", sizes: "192x192" }] },
    ],
  };
}
