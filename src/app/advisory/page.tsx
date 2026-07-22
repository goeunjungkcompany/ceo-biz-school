import { WRAP, PageHeader, SectionHead, CtaBanner } from "@/components/ui";
import { getLocale, pick } from "@/lib/locale";

export const metadata = { title: "CEO 자문 | CEO Business School" };

/* 👉 나중에 외부 사이트/신청 페이지 주소로 바꾸면 됩니다. (예: "https://apply.example.com") */
const ADVISORY_LINK = "#";

/* ===== 원본 교차검증 반영 (ko/en) ===== */
const VALUES = [
  { no: "01", title: { ko: "1:1 깊은 경영 대화", en: "1:1 Deep Dialogue" }, desc: { ko: "겉으로 드러난 문제가 아니라 진짜 문제의 구조를 파헤칩니다. 감정, 판단, 전략, 구조를 동시에 다룹니다.", en: "We dig into the structure of the real problem — handling emotion, judgment, strategy and structure at once." } },
  { no: "02", title: { ko: "문제 해결 + 인사이트", en: "Solutions + Insight" }, desc: { ko: "단순 조언이 아니라 즉시 실행 가능한 전략을 설계합니다. 사업·조직·투자·방향성 전반을 커버합니다.", en: "Not mere advice but immediately executable strategy — covering business, org, investment and direction." } },
  { no: "03", title: { ko: "최고경영자 전용 대화", en: "For CEOs Only" }, desc: { ko: "직원·임원과 나눌 수 없는 고민, 외부에 공개할 수 없는 전략, 회사의 운명을 바꾸는 질문을 다룹니다.", en: "The questions you can't share with staff, the strategy you can't disclose — the ones that change a company's fate." } },
  { no: "04", title: { ko: "프라이빗 & 보안", en: "Private & Secure" }, desc: { ko: "NDA 기반 철저한 비밀 유지. 기록 최소화, 외부 공유 금지. CEO의 고민을 함께 품고 해결합니다.", en: "Strict confidentiality under NDA — minimal records, no external sharing." } },
];

const AREAS = [
  { title: { ko: "전략", en: "Strategy" }, items: [{ ko: "사업 구조 재설계", en: "Redesigning business structure" }, { ko: "성장 정체 돌파 전략", en: "Breaking growth plateaus" }, { ko: "시장 선택 · 포지셔닝", en: "Market selection & positioning" }] },
  { title: { ko: "AI · AX (AI 전환)", en: "AI · AX" }, items: [{ ko: "AI 기반 사업 재구성", en: "AI-based business reinvention" }, { ko: "조직 자동화 및 생산성 혁신", en: "Automation & productivity" }, { ko: "AI 에이전트 도입 전략", en: "AI agent adoption strategy" }] },
  { title: { ko: "매출 · 수익 구조", en: "Revenue & Margin" }, items: [{ ko: "매출 구조 전환 (저수익 → 고수익)", en: "Shifting to high-margin revenue" }, { ko: "고객 구조 재설계", en: "Redesigning customer mix" }, { ko: "LTV 기반 전략", en: "LTV-based strategy" }] },
  { title: { ko: "조직 · 리더십", en: "Org & Leadership" }, items: [{ ko: "임원 구조 개편", en: "Executive restructuring" }, { ko: "조직 병목 제거", en: "Removing org bottlenecks" }, { ko: "의사결정 구조 개선", en: "Improving decision structures" }] },
  { title: { ko: "투자 · 기업가치", en: "Investment & Value" }, items: [{ ko: "기업가치 상승 전략", en: "Enterprise-value strategy" }, { ko: "투자 유치 구조 설계", en: "Fundraising structure design" }, { ko: "Exit 전략", en: "Exit strategy" }] },
];

const PROCESS = [
  { no: "01", en: "Deep Diagnosis", title: { ko: "심층 진단", en: "Deep Diagnosis" }, desc: { ko: "사업·의사결정 구조 분석, CEO 사고 패턴 분석.", en: "Analyze business, decision structures and the CEO's thinking patterns." } },
  { no: "02", en: "Strategic Conversation", title: { ko: "전략 대화", en: "Strategic Conversation" }, desc: { ko: "핵심 문제 정의, 방향성 재설정, ‘하지 않을 것’ 결정.", en: "Define the core problem, reset direction, decide what NOT to do." } },
  { no: "03", en: "Solution Design", title: { ko: "솔루션 설계", en: "Solution Design" }, desc: { ko: "실행 전략 설계, 우선순위 정렬, KPI 구조화.", en: "Design execution strategy, set priorities, structure KPIs." } },
  { no: "04", en: "Execution Advisory", title: { ko: "실행 자문", en: "Execution Advisory" }, desc: { ko: "실행 점검, 전략 조정, 지속적 최신화 지원.", en: "Review execution, adjust strategy, keep it continuously renewed." } },
];

const T = {
  kicker: { ko: "Private 1:1 Executive Advisory", en: "Private 1:1 Executive Advisory" },
  desc: { ko: "“CEO는 혼자 결정하지만, 혼자 생각하면 안 된다.” 단순 자문이 아니라 경영자의 사고를 재설계하는 깊은 대화 시스템입니다.", en: "“A CEO decides alone, but should never think alone.” Not advice, but a deep dialogue system that redesigns how a leader thinks." },
  values: { ko: "이 자문이 다른 이유", en: "Why This Is Different" },
  areas: { ko: "다루는 영역", en: "Areas We Cover" },
  process: { ko: "대화 → 구조 → 실행", en: "Dialogue → Structure → Execution" },
  processDesc: { ko: "대화에서 구조, 실행으로 이어지는 프리미엄 4단계 시스템.", en: "A premium four-step system, from conversation to structure to execution." },
  ctaTitle: { ko: "프라이빗 1:1 경영자문을 시작하세요", en: "Start a private 1:1 advisory" },
  ctaBtn: { ko: "자문 문의", en: "Advisory inquiry" },
};
/* ==================================== */

export default async function Page() {
  const locale = await getLocale();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      <PageHeader eyebrow={p(T.kicker)} title={locale === "ko" ? "프라이빗 1:1 경영자문" : "Private 1:1 Executive Advisory"} desc={p(T.desc)} />

      {/* 상단 신청 버튼 (링크는 ADVISORY_LINK 상수에서 변경) */}
      <div className={`${WRAP} pt-10`}>
        <a
          href={ADVISORY_LINK}
          className="inline-flex items-center gap-2 bg-accent px-8 py-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {locale === "ko" ? "자문 신청하기" : "Apply for Advisory"} →
        </a>
      </div>

      {/* 핵심 가치 */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="01" kicker="Core Value" title={p(T.values)} />
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.no} className="bg-paper p-7">
              <span className="font-mono text-xs text-accent">{v.no}</span>
              <div className="mt-6 font-serif text-lg font-semibold text-ink">{p(v.title)}</div>
              <p className="mt-3 text-balance text-sm leading-relaxed text-muted">{p(v.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 자문 영역 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <SectionHead index="02" kicker="Advisory Areas" title={p(T.areas)} />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((a) => (
              <div key={a.title.ko} className="bg-surface p-7">
                <div className="font-serif text-lg font-semibold text-ink">{p(a.title)}</div>
                <ul className="mt-4 space-y-2">
                  {a.items.map((it, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-muted"><span className="mt-2 h-1 w-1 shrink-0 bg-accent" />{p(it)}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 프로세스 */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="03" kicker="Process" title={p(T.process)} desc={p(T.processDesc)} />
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((s) => (
            <div key={s.no} className="bg-paper p-7">
              <span className="font-mono text-xs text-accent">{s.no}</span>
              <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.15em] text-muted">{s.en}</div>
              <div className="mt-4 font-serif text-lg font-semibold text-ink">{p(s.title)}</div>
              <p className="mt-2 text-balance text-sm leading-relaxed text-muted">{p(s.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      <CtaBanner eyebrow="Consult" title={p(T.ctaTitle)} button={{ href: "/contact", label: `${p(T.ctaBtn)} →` }} />
    </main>
  );
}
