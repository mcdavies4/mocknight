import type { MetadataRoute } from "next";
import { SITE_URL, STATIC_PAGES } from "@/lib/site";
import { EXAM_PAGE_CODES } from "@/lib/exam-pages";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC_PAGES.map((p) => ({ url: `${SITE_URL}${p === "/" ? "" : p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.9 })),
    ...EXAM_PAGE_CODES.map((c) => ({ url: `${SITE_URL}/exam/${c}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
