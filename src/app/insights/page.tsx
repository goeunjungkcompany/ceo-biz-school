import { WRAP, PageHeader, SectionHead, CtaBanner } from "@/components/ui";
import { getLocale, pick } from "@/lib/locale";

export const metadata = { title: "인사이트 | CEO Business School" };

/* ===== 원본 교차검증 반영 (ko/en) ===== */
const CATEGORIES = [
  { no: "01", name: { ko: "富의 감각", en: "Sense of Wealth" }, desc: { ko: "부를 창출하고 확장하는 전략적 사고", en: "Strategic thinking to create and scale wealth" }, count: "100+" },
  { no: "02", name: { ko: "AI & 바이브코딩", en: "AI & Vibe Coding" }, desc: { ko: "AI 시대의 비즈니스 혁신", en: "Business innovation in the AI era" }, count: "30+" },
  { no: "03", name: { ko: "창업 & 스타트업", en: "Startups" }, desc: { ko: "성공 창업의 전략과 사례", en: "Strategy and cases in successful founding" }, count: "50+" },
  { no: "04", name: { ko: "경영 전략", en: "Management Strategy" }, desc: { ko: "실무에 바로 적용하는 전략 이론", en: "Strategy theory you can apply right away" }, count: "50+" },
];

const POSTS = [
  { isNew: true, cat: { ko: "경영 인사이트", en: "Business Insight" }, date: "2026.05", title: { ko: "가운과 모자의 시대는 끝났다 — AI기반 네트워크 대학의 탄생", en: "The era of gowns and caps is over — the AI networked university" }, desc: { ko: "전통 대학의 구조적 위기와 CEO비즈니스스쿨이 지향하는 AI 기반 네트워크 대학 모델의 탄생 배경을 소개합니다.", en: "The structural crisis of traditional universities and the rise of the AI networked university model." } },
  { isNew: true, cat: { ko: "경영 의학", en: "Business Medicine" }, date: "2026.04", title: { ko: "[경영 의학] 결국 스마트스코어의 경영권이 넘어갔습니다", en: "[Business Medicine] How SmartScore lost management control" }, desc: { ko: "1,100억 규모 투자 유치 이면의 경영권 이전 구조를 해부하고, CEO가 지켜야 할 재무 원칙을 제시합니다.", en: "Dissecting the control-transfer behind a ₩110B raise, and the financial principles CEOs must keep." } },
  { isNew: true, cat: { ko: "경영 의학", en: "Business Medicine" }, date: "2026.04", title: { ko: "[경영 의학] 리디는 왜 만년 적자일까?", en: "[Business Medicine] Why is Ridi perpetually in the red?" }, desc: { ko: "누적 결손금 2,096억 원. 리디의 구조적 문제를 재무제표로 진단하고 플랫폼 수익성 함정을 분석합니다.", en: "₩209.6B accumulated deficit — a financial diagnosis of the platform profitability trap." } },
  { isNew: false, cat: { ko: "경영 인사이트", en: "Business Insight" }, date: "2025.02", title: { ko: "봉변 가능성은 무시하고 횡재 가능성은 혼자 꿈꾸다가 망한다", en: "Ignoring risk while dreaming of a windfall is how companies fail" }, desc: { ko: "리스크를 외면하고 낙관만 좇는 의사결정이 기업을 어떻게 무너뜨리는지, 현실적인 전략 사고법을 제시합니다.", en: "How risk-blind, optimism-chasing decisions ruin companies — and a realistic way to think." } },
  { isNew: false, cat: { ko: "AI & 바이브코딩", en: "AI & Vibe Coding" }, date: "2025.11", title: { ko: "AI들끼리 모여 팀을 구성한다 — 여왕벌과 일벌처럼 협업하는 AI조직", en: "When AIs form teams — an AI organization that collaborates like a hive" }, desc: { ko: "AI 에이전트들이 역할을 분담하고 자율적으로 협업하는 AI 조직의 구조와 성과를 분석합니다.", en: "How AI agents split roles and autonomously collaborate — structure and results." } },
];

const T = {
  desc: { ko: "혁신의 맨 앞에서 포착한 최신 경영 인사이트와 실전 전략. 우리는 모두 어떤 형태로든 CEO입니다.", en: "The latest business insight and practical strategy from the frontier — because we are all, in some form, CEOs." },
  categories: { ko: "주요 카테고리", en: "Categories" },
  categoriesDesc: { ko: "경영의 다양한 주제를 깊이 있게 다룹니다.", en: "In-depth coverage across the topics of management." },
  featured: { ko: "추천 콘텐츠", en: "Featured" },
  featuredDesc: { ko: "최신 경영 인사이트와 실전 사례.", en: "The latest insight and real cases." },
  free: { ko: "무료", en: "Free" },
  read: { ko: "읽어보기", en: "Read" },
  count: { ko: "아티클", en: "articles" },
  ctaTitle: { ko: "매월 최신 전략 인사이트를 받아보세요", en: "Get the latest strategy insights each month" },
  ctaBtn: { ko: "구독 문의", en: "Subscribe" },
};
/* ==================================== */

export default async function Page() {
  const locale = await getLocale();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      <PageHeader eyebrow="모두를 위한 경영학 · Management for Everyone" title={locale === "ko" ? "인사이트" : "Insights"} desc={p(T.desc)} />

      {/* 카테고리 */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="01" kicker="Categories" title={p(T.categories)} desc={p(T.categoriesDesc)} />
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <div key={c.no} className="bg-paper p-7">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs text-accent">{c.no}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{c.count} {p(T.count)}</span>
              </div>
              <div className="mt-6 font-serif text-lg font-semibold text-ink">{p(c.name)}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p(c.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 추천 콘텐츠 */}
      <section className="border-t border-line">
        <div className={`${WRAP} py-20`}>
          <SectionHead index="02" kicker="Featured" title={p(T.featured)} desc={p(T.featuredDesc)} />
          <ul className="mt-10 border-t border-line">
            {POSTS.map((post) => (
              <li key={post.title.ko} className="border-b border-line">
                <a href="#" className="group grid gap-4 py-8 md:grid-cols-[180px_1fr] md:gap-10">
                  <div className="flex flex-wrap items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] md:flex-col md:items-start md:gap-2">
                    {post.isNew && <span className="text-accent">New</span>}
                    <span className="text-muted">{post.date}</span>
                    <span className="text-muted">{p(post.cat)}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-2xl font-semibold leading-snug text-ink transition-colors group-hover:text-accent">{p(post.title)}</h3>
                    <p className="mt-3 max-w-2xl leading-relaxed text-muted">{p(post.desc)}</p>
                    <span className="mt-4 inline-block font-mono text-xs text-ink transition-colors group-hover:text-accent">{p(T.read)} →</span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner eyebrow="Newsletter" title={p(T.ctaTitle)} button={{ href: "/contact", label: `${p(T.ctaBtn)} →` }} />
    </main>
  );
}
