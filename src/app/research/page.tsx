import { WRAP, PageHeader, SectionHead, CtaBanner } from "@/components/ui";
import { getLocale, pick } from "@/lib/locale";

export const metadata = { title: "연구 | CEO Business School" };

/* ===== 원본 교차검증 반영 (ko/en) ===== */
const LAB_POINTS = [
  { ko: "AI 에이전트 기반 자율상담 시스템 설계", en: "Designing AI agent-based autonomous advisory systems" },
  { ko: "커리어 · 브랜드 상담 AI 모델 개발", en: "Building career & brand advisory AI models" },
  { ko: "산업 데이터 기반 상담 정확도 향상 연구", en: "Improving advisory accuracy with industry data" },
  { ko: "멀티 에이전트 협업 프레임워크 구축", en: "Building multi-agent collaboration frameworks" },
];

const OUTCOMES = [
  { no: "01", name: { ko: "커리어아틀라스AI", en: "CareerAtlas AI" }, desc: { ko: "AI 기반 커리어 자율상담 시스템. 개인의 역량·경험·관심사를 분석해 최적의 커리어 경로를 자율적으로 상담·제안합니다.", en: "An AI-based autonomous career advisor that analyzes skills, experience and interests to recommend optimal career paths." } },
  { no: "02", name: { ko: "브랜드아틀라스AI", en: "BrandAtlas AI" }, desc: { ko: "AI 기반 브랜드 전략 자율상담 시스템. 브랜드 포지셔닝·경쟁 환경·시장 데이터를 분석해 전략적 인사이트를 제공합니다.", en: "An AI-based autonomous brand-strategy advisor that analyzes positioning, competition and market data for strategic insight." } },
];

const FIELDS = [
  { no: "01", title: { ko: "AI 자율상담", en: "Autonomous AI Advisory" }, topics: [{ ko: "AI 자율상담 에이전트 설계", en: "AI advisory agent design" }, { ko: "커리어 상담 AI 모델 개발", en: "Career advisory AI models" }, { ko: "브랜드 전략 AI 분석 시스템", en: "Brand-strategy AI analytics" }, { ko: "멀티 에이전트 협업 프레임워크", en: "Multi-agent collaboration" }] },
  { no: "02", title: { ko: "경영 전략", en: "Management Strategy" }, topics: [{ ko: "경쟁 전략 및 포지셔닝", en: "Competitive strategy & positioning" }, { ko: "사업 포트폴리오 관리", en: "Business portfolio management" }, { ko: "전략적 제휴 및 M&A", en: "Alliances & M&A" }, { ko: "글로벌 전략", en: "Global strategy" }] },
  { no: "03", title: { ko: "디지털 전환", en: "Digital Transformation" }, topics: [{ ko: "AI 바이브코딩과 개발 혁신", en: "AI vibe coding & dev innovation" }, { ko: "디지털 비즈니스 모델", en: "Digital business models" }, { ko: "데이터 기반 의사결정", en: "Data-driven decisions" }, { ko: "플랫폼 전략", en: "Platform strategy" }] },
  { no: "04", title: { ko: "富의 창출", en: "Wealth Creation" }, topics: [{ ko: "현금 창출 구조", en: "Cash-generation structures" }, { ko: "사업 생애주기 전략", en: "Business life-cycle strategy" }, { ko: "가격 전략", en: "Pricing strategy" }, { ko: "고수익 사업 패턴", en: "High-margin business patterns" }] },
];

const PAPERS = [
  { year: "2025", title: "Autonomous AI Agents for Multi-Platform Social Media Marketing: A Simultaneous Deployment Study", journal: "Electronics, 14(21):4161", authors: "Ahn J, Kim M." },
  { year: "2024", title: "Blockchain Consensus Mechanisms: A Bibliometric Analysis", journal: "—", authors: "Ahn J, Yi E, Kim M." },
  { year: "2019", title: "Sustainable Growth and Token Economy Design: The Case of Steemit", journal: "Sustainability, 11, 167", authors: "Kim M.S., Chung J.Y." },
];

const PROJECTS = [
  { year: "2024~", title: { ko: "케이잡스 AI자율상담연구소", en: "K-Jobs AI Autonomous Advisory Lab" }, partner: { ko: "케이잡스", en: "K-Jobs" } },
  { year: "2025", title: { ko: "환경재단 홈페이지 AI바이브코딩 리뉴얼", en: "Korea Green Foundation site — AI vibe-coding renewal" }, partner: { ko: "환경재단", en: "Korea Green Foundation" } },
  { year: "2025", title: { ko: "무역협회 AI업무자동화 구축", en: "KITA — AI workflow automation" }, partner: { ko: "한국무역협회", en: "KITA" } },
  { year: "2025", title: { ko: "富의 감각 연구 · 저술", en: "Sense of Wealth — research & writing" }, partner: { ko: "다수 스타트업", en: "Multiple startups" } },
];

const T = {
  desc: { ko: "혁신의 맨 앞에서 최신 지식과 전략을 연구하고 전파합니다.", en: "We research and share the latest knowledge and strategy at the very front of innovation." },
  mainKicker: { ko: "Autonomous AI Counseling Research", en: "Autonomous AI Counseling Research" },
  mainTitle: { ko: "AI 자율상담 연구", en: "Autonomous AI Advisory Research" },
  mainDesc: { ko: "AI 에이전트가 인간 상담사를 대체하여 자율적으로 상담을 수행하는 차세대 시스템을 연구합니다. 커리어·브랜드 전략 등 다양한 영역에서 세계 최전선의 AI 자율상담 모델을 개발하고, 산학협력으로 글로벌 서비스로 구현합니다.", en: "We research next-generation systems in which AI agents autonomously perform advisory work in place of human advisors — developing world-leading models across career and brand strategy, and delivering them as global services through industry-academia collaboration." },
  labName: { ko: "케이잡스 AI자율상담연구소", en: "K-Jobs AI Autonomous Advisory Lab" },
  labDesc: { ko: "김문수 교수가 소장을 겸직하며, 학계의 이론적 토대와 산업 현장의 실무 데이터를 결합해 글로벌 시장을 선도하는 AI 상담 서비스를 구축합니다.", en: "Directed by Prof. Munsoo Kim, the lab combines academic theory with real industry data to build market-leading AI advisory services." },
  outcomes: { ko: "연구 성과", en: "Research Outcomes" },
  fields: { ko: "연구 분야", en: "Research Fields" },
  fieldsDesc: { ko: "글로벌 경영 환경을 선도하는 전략 이론과 프레임워크.", en: "Strategy theory and frameworks leading the global business environment." },
  papers: { ko: "학술 논문 및 저서", en: "Publications" },
  projects: { ko: "연구 프로젝트", en: "Research Projects" },
  projectsDesc: { ko: "글로벌 수준의 산학협력 연구 및 전략 자문 프로젝트.", en: "World-class industry-academia research and advisory projects." },
  partner: { ko: "협력기업", en: "Partner" },
  ctaTitle: { ko: "세계를 선도하는 연구에 함께하세요", en: "Join world-leading research" },
  ctaBtn: { ko: "연구 협력 문의", en: "Research inquiry" },
};
/* ==================================== */

export default async function Page() {
  const locale = await getLocale();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      <PageHeader eyebrow="Research" title={locale === "ko" ? "연구" : "Research"} desc={p(T.desc)} />

      {/* AI 자율상담 연구 */}
      <section className={`${WRAP} py-20`}>
        <div className="grid gap-10 border-t border-ink/80 pt-10 md:grid-cols-[0.9fr_1.5fr]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{p(T.mainKicker)}</div>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ink">{p(T.mainTitle)}</h2>
          </div>
          <div>
            <p className="leading-relaxed text-muted">{p(T.mainDesc)}</p>
            <div className="mt-8 border-t border-line pt-6">
              <div className="font-serif text-lg font-semibold text-ink">{p(T.labName)}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p(T.labDesc)}</p>
              <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                {LAB_POINTS.map((l, i) => (
                  <li key={i} className="flex gap-2 text-[13px] text-ink"><span className="mt-2 h-1 w-1 shrink-0 bg-accent" />{p(l)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        {/* 연구 성과 */}
        <div className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
          {OUTCOMES.map((o) => (
            <div key={o.no} className="bg-paper p-7">
              <span className="font-mono text-xs text-accent">{o.no}</span>
              <div className="mt-4 font-serif text-xl font-semibold text-ink">{p(o.name)}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p(o.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 연구 분야 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <SectionHead index="01" kicker="Research Fields" title={p(T.fields)} desc={p(T.fieldsDesc)} />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {FIELDS.map((f) => (
              <div key={f.no} className="bg-surface p-7">
                <span className="font-mono text-xs text-accent">{f.no}</span>
                <div className="mt-4 font-serif text-lg font-semibold text-ink">{p(f.title)}</div>
                <ul className="mt-4 space-y-2">
                  {f.topics.map((tp, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-muted"><span className="mt-2 h-1 w-1 shrink-0 bg-line" />{p(tp)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 학술 논문 */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="02" kicker="Publications" title={p(T.papers)} />
        <ul className="mt-10 border-t border-line">
          {PAPERS.map((pp) => (
            <li key={pp.title} className="grid gap-2 border-b border-line py-6 md:grid-cols-[80px_1fr]">
              <span className="font-mono text-sm text-accent">{pp.year}</span>
              <div>
                <div className="font-serif text-lg leading-snug text-ink">{pp.title}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{pp.authors} · {pp.journal}</div>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* 연구 프로젝트 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <SectionHead index="03" kicker="Projects" title={p(T.projects)} desc={p(T.projectsDesc)} />
          <ul className="mt-10 border-t border-line">
            {PROJECTS.map((pr) => (
              <li key={pr.title.ko} className="flex flex-col gap-1 border-b border-line py-5 sm:flex-row sm:items-center sm:gap-6">
                <span className="w-16 shrink-0 font-mono text-sm text-accent">{pr.year}</span>
                <span className="flex-1 font-serif text-lg text-ink">{p(pr.title)}</span>
                <span className="shrink-0 font-mono text-[11px] uppercase tracking-[0.1em] text-muted">{p(T.partner)}: {p(pr.partner)}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner eyebrow="Collaborate" title={p(T.ctaTitle)} button={{ href: "/contact", label: `${p(T.ctaBtn)} →` }} />
    </main>
  );
}
