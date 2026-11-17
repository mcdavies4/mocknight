// Public site address used for sitemaps, canonical links and social previews.
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://mocknight.vercel.app").replace(/\/$/, "");

/** Hand-built landing pages (everything else lives at /exam/CODE). */
export const STATIC_PAGES = [
  "/", "/exams", "/technology", "/life-in-the-uk", "/fire-marshal", "/nmc-cbt", "/plab", "/nclex",
  "/project-management", "/ethiopia", "/ssc", "/digital-sat",
];
