import { WRAP, PageHeader, SectionHead, CtaBanner } from "@/components/ui";
import { getLocale, pick } from "@/lib/locale";

export const metadata = { title: "AI고용학회 | CEO Business School" };

/* ===== 원본 교차검증 반영 (ko/en) ===== */
const IDENTITY = [
  { no: "01", title: { ko: "시민과 함께하는 학회", en: "A society with citizens" }, desc: { ko: "학자들만의 학회를 넘어 정부관계자, 현장교육가, 기업, 기관, 시민이 함께 공부하고 연구하는 열린 학회입니다.", en: "An open society where scholars, government, educators, companies, institutions and citizens study together." } },
  { no: "02", title: { ko: "AI 혁신 모멘텀 보고서", en: "AI Momentum Reports" }, desc: { ko: "AI 혁신의 중대 변곡점마다 대통령·입법·지자체장을 위한 보고서를 발행하여 정책 방향을 제시합니다.", en: "At key inflection points, we publish reports for the president, legislature and local governments to guide policy." } },
  { no: "03", title: { ko: "월 1회 이상 시민 세미나", en: "Monthly public seminars" }, desc: { ko: "매월 1회 이상 시민을 위한 온라인 세미나를 열어 AI 시대의 고용 변화를 함께 준비합니다.", en: "At least once a month, we host online seminars to prepare citizens for AI-era employment change." } },
  { no: "04", title: { ko: "국가 AI 고용 허브", en: "National AI employment hub" }, desc: { ko: "AI 기술·노동경제·산업 데이터·HR 전략·공공정책 전문가가 함께 한국형 AI 고용 생태계를 구축합니다.", en: "Experts in AI, labor economics, industry data, HR and public policy build a Korean AI employment ecosystem." } },
];

const REPORTS = [
  { no: "01", title: { ko: "대통령 보고서", en: "Presidential Report" }, desc: { ko: "AI 전환기 국가 고용 전략과 정책 방향을 제시하는 대통령실 대상 보고서", en: "National employment strategy and policy direction for the presidential office" } },
  { no: "02", title: { ko: "입법 보고서", en: "Legislative Report" }, desc: { ko: "AI 시대 노동법·고용 정책·공정성 기준 등 입법 과제를 분석하는 국회 대상 보고서", en: "Analysis of labor law, employment policy and fairness for the National Assembly" } },
  { no: "03", title: { ko: "지방자치단체장 보고서", en: "Local Government Report" }, desc: { ko: "지역별 AI 고용 전환 전략과 지역 맞춤형 정책을 제안하는 지자체 대상 보고서", en: "Regional AI employment transition strategy and localized policy for local governments" } },
];

const T = {
  chair: { ko: "학회장: 김문수 교수", en: "President: Prof. Munsoo Kim" },
  desc: { ko: "AI 전환 시대, 고용의 새로운 질서를 설계합니다. 학자들만의 학회를 넘어 정부·현장교육가·기업·기관·시민이 함께 공부하고 연구하는 열린 학회입니다.", en: "Designing a new order of employment for the AI transition — an open society of scholars, government, educators, companies, institutions and citizens." },
  identity: { ko: "학자와 시민이 함께하는 학회", en: "Scholars and citizens, together" },
  identityDesc: { ko: "AI 전환이 고용·산업·교육·사회 전반을 빠르게 재편하는 가운데, 모든 이해관계자가 함께 연구하고 대응합니다.", en: "As AI reshapes employment, industry, education and society, every stakeholder researches and responds together." },
  reports: { ko: "AI 혁신 모멘텀 보고서", en: "AI Momentum Reports" },
  reportsDesc: { ko: "AI 혁신의 중대 변곡점마다 국가 정책 방향을 제시하는 보고서를 발행합니다.", en: "At key inflection points of AI innovation, we publish reports guiding national policy." },
  seminarKicker: { ko: "Monthly Seminars", en: "Monthly Seminars" },
  seminarTitle: { ko: "매월 시민 온라인 세미나", en: "Monthly public online seminars" },
  seminarDesc: { ko: "AI고용학회는 매월 1회 이상 시민을 위한 온라인 세미나를 개최합니다. AI가 일자리와 산업을 어떻게 바꾸는지, 우리는 어떻게 준비해야 하는지를 함께 공부합니다.", en: "The society hosts public online seminars at least monthly — studying together how AI changes jobs and industries, and how we should prepare." },
  ctaTitle: { ko: "월례 시민세미나에 참여하세요", en: "Join the monthly public seminar" },
  ctaBtn: { ko: "학회 참여 문의", en: "Membership inquiry" },
};
/* ==================================== */

export default async function Page() {
  const locale = await getLocale();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      <PageHeader eyebrow={p(T.chair)} title={locale === "ko" ? "AI고용학회" : "AI Employment Society"} desc={p(T.desc)} />

      {/* CORE IDENTITY */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="01" kicker="Core Identity" title={p(T.identity)} desc={p(T.identityDesc)} />
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {IDENTITY.map((it) => (
            <div key={it.no} className="bg-paper p-7">
              <span className="font-mono text-xs text-accent">{it.no}</span>
              <div className="mt-6 font-serif text-lg font-semibold text-ink">{p(it.title)}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p(it.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* POLICY REPORTS */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <SectionHead index="02" kicker="Policy Reports" title={p(T.reports)} desc={p(T.reportsDesc)} />
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {REPORTS.map((r) => (
              <div key={r.no} className="bg-surface p-7">
                <span className="font-mono text-xs text-accent">{r.no}</span>
                <div className="mt-6 font-serif text-xl font-semibold text-ink">{p(r.title)}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p(r.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MONTHLY SEMINARS */}
      <section className={`${WRAP} py-20`}>
        <div className="grid gap-10 border-t border-ink/80 pt-10 md:grid-cols-[0.9fr_1.5fr]">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{p(T.seminarKicker)}</div>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ink">{p(T.seminarTitle)}</h2>
          </div>
          <p className="leading-relaxed text-muted">{p(T.seminarDesc)}</p>
        </div>
      </section>

      <CtaBanner eyebrow="Join" title={p(T.ctaTitle)} button={{ href: "/contact", label: `${p(T.ctaBtn)} →` }} />
    </main>
  );
}
