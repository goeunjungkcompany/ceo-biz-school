import type { Locale } from "./locale";

/** 클라이언트/서버 공용 네비게이션 데이터 (next/headers 미사용) */

export type NavLeaf = { href: string; ko: string; en: string };
export type NavNode =
  | NavLeaf
  | { ko: string; en: string; children: NavLeaf[]; comingSoon?: boolean };

export const NAV: NavNode[] = [
  { href: "/about", ko: "소개", en: "About" },
  { href: "/faculty", ko: "교수진", en: "Faculty" },
  {
    ko: "교육",
    en: "Education",
    children: [
      { href: "/education/online", ko: "온라인 교육", en: "Online" },
      { href: "/education/offline", ko: "오프라인 교육", en: "Offline" },
    ],
  },
  {
    ko: "AI경영도구",
    en: "AI Tools",
    comingSoon: true,
    children: [],
  },
  { href: "/research", ko: "연구", en: "Research" },
  { href: "/society", ko: "학회", en: "Society" },
  { href: "/publications", ko: "출판", en: "Publications" },
  { href: "/advisory", ko: "CEO 자문", en: "Advisory" },
  { href: "/networking", ko: "CEO클럽", en: "CEO Club" },
  { href: "/insights", ko: "인사이트", en: "Insights" },
  { href: "/contact", ko: "문의", en: "Contact" },
];

export const UI = {
  tagline: { ko: "지식 최신화 · 전략 최신화", en: "Knowledge Renewed · Strategy Renewed" },
  login: { ko: "로그인", en: "Log in" },
  comingSoon: { ko: "준비 중", en: "Coming soon" },
  menu: { ko: "메뉴", en: "Menu" },
  close: { ko: "닫기", en: "Close" },
};

export function t(locale: Locale, pair: { ko: string; en: string }) {
  return pair[locale];
}
