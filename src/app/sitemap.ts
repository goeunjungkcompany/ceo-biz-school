import type { MetadataRoute } from "next";
import { NAV } from "@/lib/nav";
import { SITE_URL } from "@/lib/site";

/** NAV 데이터에서 모든 실제 경로를 추출해 sitemap 생성 (준비중 메뉴 제외) */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/"];
  for (const node of NAV) {
    if ("href" in node) paths.push(node.href);
    else for (const c of node.children) paths.push(c.href);
  }
  const unique = Array.from(new Set(paths));
  const now = new Date();

  return unique.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
