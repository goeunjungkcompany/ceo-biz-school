import { WRAP, PageHeader, SectionHead, Placeholder, CtaBanner } from "@/components/ui";
import { Balanced } from "@/components/Balanced";
import { getLocale, pick } from "@/lib/locale";
import { getSiteImageMap } from "@/lib/site-images";

export const metadata = { title: "출판 | CEO Business School" };

/* ===== 원본 교차검증 반영 (ko/en) ===== */
const FEATURED = {
  title: { ko: "富의 감각", en: "富의 감각" },
  en: "The Sense of Wealth",
  meta: { ko: "김문수 · 김영사 · 2026년 1월 · 약 250페이지", en: "Munsoo Kim · Gimm-Young · Jan 2026 · ~250 pp." },
  desc: { ko: "CEO와 자영업자를 위한 필수 가이드. 富가 쌓이는 원리와 전략을 제시합니다.", en: "An essential guide for CEOs and business owners — the principles and strategy of building wealth." },
  cover: undefined as string | undefined,
  toc: [
    { ko: "富의 기회를 포착하는 법", en: "Spotting wealth opportunities" },
    { ko: "富를 확장하는 법", en: "Scaling wealth" },
    { ko: "富가 계속 창출되게 하는 법", en: "Sustaining wealth" },
    { ko: "투자 유치 전략과 사례", en: "Fundraising strategy & cases" },
    { ko: "고수익 사업 패턴 분석", en: "High-margin business patterns" },
  ],
  retailers: ["교보문고", "YES24", "알라딘", { ko: "도서 홈페이지", en: "Book site" }],
};

const UPCOMING = [
  {
    title: { ko: "AI가 당신의 회사를 해고한다", en: "AI가 당신의 회사를 해고한다" }, en: "AI Fires Your Company", year: "2026",
    desc: { ko: "AI 시대, 기업이 살아남기 위한 전략적 대응. 인공지능이 비즈니스 모델을 파괴·재편하는 시대에 CEO가 알아야 할 생존 전략.", en: "Strategic survival for the AI era — what CEOs must know as AI disrupts and reshapes business models." },
    toc: [{ ko: "AI가 바꾸는 비즈니스 환경", en: "How AI changes business" }, { ko: "기업의 생존 전략", en: "Corporate survival strategy" }, { ko: "AI 시대의 조직 혁신", en: "Org innovation in the AI era" }, { ko: "경쟁력 확보 방법", en: "Securing competitiveness" }, { ko: "미래 대비 실행 계획", en: "A plan for the future" }],
  },
  {
    title: { ko: "청소년을 위한 富의 감각", en: "청소년을 위한 富의 감각" }, en: "The Sense of Wealth for Youth", year: "2026",
    desc: { ko: "청소년이 알아야 할 부와 경제의 원리. 어린 나이부터 경제적 사고력과 富를 만드는 감각을 키우는 경영학 입문서.", en: "Wealth and economics for young people — building financial thinking and the sense of wealth from an early age." },
    toc: [{ ko: "청소년을 위한 경제 원리", en: "Economics for youth" }, { ko: "부자가 되는 사고방식", en: "The wealthy mindset" }, { ko: "돈과 가치에 대한 이해", en: "Understanding money & value" }, { ko: "미래를 위한 준비", en: "Preparing for the future" }, { ko: "실생활 적용 사례", en: "Real-life applications" }],
  },
];

const ARTICLES = [
  { title: { ko: "AI 바이브코딩으로 새롭게 태어난 환경재단 홈페이지", en: "The Green Foundation site, reborn with AI vibe coding" }, date: "2025.11", cat: { ko: "사례 연구", en: "Case Study" } },
  { title: { ko: "성공한 기업은 모두 비밀 위에 세워진다 (피터 틸의 대담 리뷰)", en: "Great companies are built on a secret (a Peter Thiel review)" }, date: "2025.11", cat: { ko: "경영 인사이트", en: "Insight" } },
  { title: { ko: "헤이딜러의 감동적인 성공 스토리", en: "The moving success story of Heydealer" }, date: "2024.05", cat: { ko: "창업 사례", en: "Startup Case" } },
];

const T = {
  desc: { ko: "혁신의 현장에서 연구한 최신 경영 전략의 결정판.", en: "The definitive edition of strategy researched in the field of innovation." },
  featured: { ko: "CEO의 필독서", en: "Essential Reading" },
  toc: { ko: "주요 내용", en: "Contents" },
  upcoming: { ko: "출간 예정", en: "Coming Soon" },
  online: { ko: "온라인 콘텐츠", en: "Online Content" },
  onlineDesc: { ko: "‘모두를 위한 경영학’ (네이버 프리미엄 콘텐츠) 주요 아티클.", en: "Selected articles from ‘Management for Everyone’ (Naver Premium Content)." },
  read: { ko: "읽기", en: "Read" },
  ctaTitle: { ko: "출간 · 강연 · 제휴를 문의하세요", en: "Inquire about publishing, talks and partnerships" },
  ctaBtn: { ko: "출판 문의", en: "Publishing inquiry" },
};

function label(x: string | { ko: string; en: string }, locale: "ko" | "en") {
  return typeof x === "string" ? x : x[locale];
}
/* ==================================== */

export default async function Page() {
  const locale = await getLocale();
  const imgs = await getSiteImageMap();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      <PageHeader eyebrow="Publications" title={locale === "ko" ? "출판" : "Publications"} desc={p(T.desc)} />

      {/* 대표 도서 */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="01" kicker="Featured Book" title={p(T.featured)} />
        <div className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-[0.7fr_1.6fr]">
          <Placeholder label="Book Cover" src={imgs.publications_featured ?? FEATURED.cover} alt={p(FEATURED.title)} className="aspect-[3/4]" />
          <div>
            <div className="font-serif text-3xl font-semibold text-ink">{p(FEATURED.title)}</div>
            <div className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">{FEATURED.en}</div>
            <p className="mt-3 text-sm text-muted">{p(FEATURED.meta)}</p>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink">{p(FEATURED.desc)}</p>
            <div className="mt-8">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{p(T.toc)}</div>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {FEATURED.toc.map((t, i) => (
                  <li key={i} className="flex gap-2 text-sm text-muted"><span className="mt-2 h-1 w-1 shrink-0 bg-accent" />{p(t)}</li>
                ))}
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.12em]">
              {FEATURED.retailers.map((r, i) => (
                <span key={i} className="border-b border-ink/30 pb-1 text-ink hover:border-accent hover:text-accent">{label(r, locale)} →</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 출간 예정 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <SectionHead index="02" kicker="Upcoming" title={p(T.upcoming)} />
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-2">
            {UPCOMING.map((b) => (
              <div key={b.en} className="bg-surface p-8">
                <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{b.year} · {p(T.upcoming)}</div>
                <div className="mt-4 font-serif text-2xl font-semibold text-ink">{p(b.title)}</div>
                <div className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-muted">{b.en}</div>
                <p className="mt-4 text-balance text-sm leading-relaxed text-muted"><Balanced text={p(b.desc)} /></p>
                <ul className="mt-5 space-y-2">
                  {b.toc.map((t, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-muted"><span className="mt-2 h-1 w-1 shrink-0 bg-line" />{p(t)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 온라인 콘텐츠 */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="03" kicker="Online Content" title={p(T.online)} desc={p(T.onlineDesc)} />
        <ul className="mt-10 border-t border-line">
          {ARTICLES.map((a) => (
            <li key={a.title.ko} className="border-b border-line">
              <a href="#" className="group flex flex-col gap-2 py-6 sm:flex-row sm:items-center sm:gap-6">
                <span className="w-24 shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{a.date} · {p(a.cat)}</span>
                <span className="flex-1 font-serif text-lg text-ink transition-colors group-hover:text-accent">{p(a.title)}</span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em] text-ink group-hover:text-accent">{p(T.read)} →</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <CtaBanner eyebrow="Inquiry" title={p(T.ctaTitle)} button={{ href: "/contact", label: `${p(T.ctaBtn)} →` }} />
    </main>
  );
}
