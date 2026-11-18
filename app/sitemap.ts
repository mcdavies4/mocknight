import type { MetadataRoute } from "next";
import { SITE_URL, STATIC_PAGES } from "@/lib/site";
import { EXAM_PAGE_CODES } from "@/lib/exam-pages";
import { POSTS } from "@/lib/blog";
import { allPracticePaths, examSlug } from "@/lib/practice";
import { TRACK_LIST } from "@/lib/tracks";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    ...STATIC_PAGES.map((p) => ({ url: `${SITE_URL}${p === "/" ? "" : p}`, lastModified: now, changeFrequency: "weekly" as const, priority: p === "/" ? 1 : 0.9 })),
    ...POSTS.map((p) => ({ url: `${SITE_URL}/blog/${p.slug}`, lastModified: new Date(p.updated ?? p.date), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...TRACK_LIST.map((t) => ({ url: `${SITE_URL}/practice/${examSlug(t)}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...allPracticePaths().map((p) => ({ url: `${SITE_URL}${p}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.6 })),
    ...EXAM_PAGE_CODES.map((c) => ({ url: `${SITE_URL}/exam/${c}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.8 })),
  ];
}
