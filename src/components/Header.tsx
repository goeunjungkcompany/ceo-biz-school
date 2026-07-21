"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { Locale } from "@/lib/locale";
import { NAV, UI, t } from "@/lib/nav";

export default function Header({ locale }: { locale: Locale }) {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  function switchLocale(next: Locale) {
    if (next === locale) return;
    document.cookie = `locale=${next}; path=/; max-age=31536000`;
    router.refresh();
  }

  const leafActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname === href;
  const groupActive = (children: { href: string }[]) =>
    children.some((c) => pathname === c.href);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-paper/90 backdrop-blur-md">
      <div className="h-0.5 w-full bg-navy" />
      <div className="mx-auto flex w-full max-w-[1240px] items-center gap-6 px-6 py-4 sm:px-10 lg:px-16">
        {/* 로고 */}
        <Link href="/" className="flex flex-col leading-none" onClick={() => setMobileOpen(false)}>
          <span className="font-serif text-lg font-semibold tracking-tight text-navy">
            CEO Business School
          </span>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">
            {t(locale, UI.tagline)}
          </span>
        </Link>

        {/* 데스크톱 내비 */}
        <nav className="ml-auto hidden items-center gap-x-4 lg:flex">
          {NAV.map((node) => {
            const label = t(locale, node);
            if ("href" in node) {
              const active = leafActive(node.href);
              return (
                <Link
                  key={node.href}
                  href={node.href}
                  aria-current={active ? "page" : undefined}
                  className={`border-b-2 pb-0.5 text-[13px] transition-colors ${
                    active
                      ? "border-accent font-semibold text-accent"
                      : "border-transparent text-ink/80 hover:text-accent"
                  }`}
                >
                  {label}
                </Link>
              );
            }
            const isOpen = openMenu === label;
            const active = groupActive(node.children);
            return (
              <div
                key={label}
                className="relative"
                onMouseEnter={() => setOpenMenu(label)}
                onMouseLeave={() => setOpenMenu(null)}
              >
                <button
                  className={`flex items-center gap-1 border-b-2 pb-0.5 text-[13px] transition-colors ${
                    active
                      ? "border-accent font-semibold text-accent"
                      : "border-transparent text-ink/80 hover:text-accent"
                  }`}
                  onClick={() => setOpenMenu(isOpen ? null : label)}
                >
                  {label}
                  <span className="text-[9px]">▾</span>
                </button>
                {isOpen && (
                  <div className="absolute left-0 top-full min-w-[180px] border border-line bg-paper py-2 shadow-sm">
                    {node.comingSoon || node.children.length === 0 ? (
                      <div className="px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                        {t(locale, UI.comingSoon)}
                      </div>
                    ) : (
                      node.children.map((c) => {
                        const cActive = pathname === c.href;
                        return (
                          <Link
                            key={c.href}
                            href={c.href}
                            aria-current={cActive ? "page" : undefined}
                            className={`block px-4 py-2 text-[13px] transition-colors hover:bg-surface hover:text-accent ${
                              cActive ? "font-semibold text-accent" : "text-ink/80"
                            }`}
                            onClick={() => setOpenMenu(null)}
                          >
                            {t(locale, c)}
                          </Link>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* 우측: 언어 · 로그인 */}
        <div className="ml-auto flex items-center gap-3 lg:ml-6">
          <div className="hidden items-center font-mono text-[11px] sm:flex">
            <button onClick={() => switchLocale("ko")} className={locale === "ko" ? "text-accent" : "text-muted hover:text-ink"}>KO</button>
            <span className="mx-1 text-line">/</span>
            <button onClick={() => switchLocale("en")} className={locale === "en" ? "text-accent" : "text-muted hover:text-ink"}>EN</button>
          </div>
          <button className="hidden bg-navy px-4 py-2 text-xs font-medium text-paper transition-colors hover:bg-ink sm:block">
            {t(locale, UI.login)}
          </button>

          {/* 햄버거 */}
          <button
            className="flex h-9 w-9 items-center justify-center border border-line lg:hidden"
            aria-label={t(locale, mobileOpen ? UI.close : UI.menu)}
            onClick={() => setMobileOpen((v) => !v)}
          >
            <div className="space-y-1.5">
              <span className={`block h-px w-5 bg-ink transition ${mobileOpen ? "translate-y-[7px] rotate-45" : ""}`} />
              <span className={`block h-px w-5 bg-ink transition ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-px w-5 bg-ink transition ${mobileOpen ? "-translate-y-[7px] -rotate-45" : ""}`} />
            </div>
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {mobileOpen && (
        <div className="border-t border-line bg-paper lg:hidden">
          <nav className="mx-auto w-full max-w-[1240px] px-6 py-4 sm:px-10">
            {NAV.map((node) => {
              const label = t(locale, node);
              if ("href" in node) {
                const active = leafActive(node.href);
                return (
                  <Link
                    key={node.href}
                    href={node.href}
                    aria-current={active ? "page" : undefined}
                    className={`flex items-center justify-between border-b border-line py-3 text-sm ${
                      active
                        ? "border-l-2 border-l-accent bg-accent/5 pl-3 font-semibold text-accent"
                        : "text-ink"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {label}
                    {active && <span className="text-[11px] font-normal text-accent">현재 페이지</span>}
                  </Link>
                );
              }
              const active = groupActive(node.children);
              return (
                <div key={label} className={`border-b border-line py-3 ${active ? "border-l-2 border-l-accent bg-accent/5 pl-3" : ""}`}>
                  <div className={`text-sm font-medium ${active ? "text-accent" : "text-ink"}`}>{label}</div>
                  <div className="mt-2 space-y-2 pl-3">
                    {node.comingSoon || node.children.length === 0 ? (
                      <div className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                        {t(locale, UI.comingSoon)}
                      </div>
                    ) : (
                      node.children.map((c) => {
                        const cActive = pathname === c.href;
                        return (
                          <Link
                            key={c.href}
                            href={c.href}
                            aria-current={cActive ? "page" : undefined}
                            className={`flex items-center justify-between text-sm ${cActive ? "font-semibold text-accent" : "text-muted hover:text-accent"}`}
                            onClick={() => setMobileOpen(false)}
                          >
                            {t(locale, c)}
                            {cActive && <span className="text-[11px] font-normal text-accent">현재</span>}
                          </Link>
                        );
                      })
                    )}
                  </div>
                </div>
              );
            })}
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center font-mono text-xs">
                <button onClick={() => switchLocale("ko")} className={locale === "ko" ? "text-accent" : "text-muted"}>KO</button>
                <span className="mx-1 text-line">/</span>
                <button onClick={() => switchLocale("en")} className={locale === "en" ? "text-accent" : "text-muted"}>EN</button>
              </div>
              <button className="bg-navy px-4 py-2 text-xs font-medium text-paper">{t(locale, UI.login)}</button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
