import Link from "next/link";
import type { Locale } from "@/lib/locale";
import { NAV, UI, t } from "@/lib/nav";

const F = {
  newsletter: { ko: "뉴스레터 구독", en: "Newsletter" },
  newsletterDesc: {
    ko: "혁신의 최전선에서 포착한 최신 전략 인사이트를 매월 받아보세요.",
    en: "Get the latest strategy insights from the frontier of innovation, every month.",
  },
  emailPlaceholder: { ko: "이메일 주소", en: "Email address" },
  subscribe: { ko: "구독", en: "Subscribe" },
  navigate: { ko: "바로가기", en: "Navigate" },
  contact: { ko: "연락처", en: "Contact" },
  campuses: { ko: "관악 · 용산 · 강남 캠퍼스", en: "Gwanak · Yongsan · Gangnam Campus" },
};

export default function Footer({ locale }: { locale: Locale }) {
  const links = NAV.filter((n): n is Extract<typeof n, { href: string }> => "href" in n);

  return (
    <footer className="mt-auto bg-navy text-paper">
      <div className="mx-auto w-full max-w-[1240px] px-6 py-16 sm:px-10 lg:px-16">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <div className="font-serif text-2xl font-semibold tracking-tight">
              CEO Business School
            </div>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-paper/50">
              {t(locale, UI.tagline)}
            </p>
            <p className="mt-8 max-w-md text-sm leading-relaxed text-paper/70">
              {t(locale, F.newsletterDesc)}
            </p>
            <form className="mt-4 flex max-w-md border border-paper/25">
              <input
                type="email"
                placeholder={t(locale, F.emailPlaceholder)}
                className="w-full bg-transparent px-4 py-3 text-sm text-paper placeholder:text-paper/40 focus:outline-none"
              />
              <button
                type="submit"
                className="shrink-0 bg-accent px-5 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                {t(locale, F.subscribe)}
              </button>
            </form>
          </div>

          <div className="grid grid-cols-2 gap-8">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
                {t(locale, F.navigate)}
              </div>
              <ul className="mt-4 space-y-2 text-sm text-paper/75">
                {links.slice(0, 6).map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="transition-colors hover:text-white">
                      {t(locale, item)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/40">
                {t(locale, F.contact)}
              </div>
              <p className="mt-4 text-sm text-paper/75">ceoclub@ceobizschool.kr</p>
              <p className="mt-4 text-sm leading-relaxed text-paper/60">{t(locale, F.campuses)}</p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-paper/15 pt-6 font-mono text-[11px] uppercase tracking-[0.15em] text-paper/40 sm:flex-row sm:justify-between">
          <span>© 2026 CEO Business School</span>
          <span>Seoul · Republic of Korea</span>
        </div>
      </div>
    </footer>
  );
}
