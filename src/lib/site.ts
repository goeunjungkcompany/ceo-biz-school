/** 사이트 전역 상수 — sitemap/robots/메타데이터가 공유 */

// 배포 도메인. 실제 도메인이 정해지면 .env.local 의 NEXT_PUBLIC_SITE_URL 로 덮어쓰기.
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ceobizschool.kr"
).replace(/\/$/, "");

export const SITE_NAME = "CEO Business School";
