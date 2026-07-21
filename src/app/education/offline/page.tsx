import { WRAP, PageHeader, CtaBanner } from "@/components/ui";
import { getLocale, pick } from "@/lib/locale";

export const metadata = { title: "오프라인 교육 | CEO Business School" };

/* ===== 원본 교차검증 반영 (ko/en) ===== */
const INFO = [
  { k: { ko: "교육 기간", en: "Duration" }, v: { ko: "매월 1회 · 연간 과정", en: "Monthly · annual program" } },
  { k: { ko: "대상", en: "For" }, v: { ko: "CEO 및 임원급", en: "CEOs and executives" } },
  { k: { ko: "장소", en: "Venue" }, v: { ko: "서울대 교수회관", en: "SNU Faculty Hall" } },
  { k: { ko: "일정", en: "Schedule" }, v: { ko: "매월 첫째 주 수요일 18:00–21:00", en: "1st Wed each month, 18:00–21:00" } },
];

const CURRICULUM = [
  { term: { ko: "2026 진행 중", en: "2026 (ongoing)" }, items: [
    { m: { ko: "1월", en: "Jan" }, t: { ko: "AI 조직 전략", en: "AI Org Strategy" } },
    { m: { ko: "2월", en: "Feb" }, t: { ko: "AI 마케팅 전략", en: "AI Marketing Strategy" } },
    { m: { ko: "3월", en: "Mar" }, t: { ko: "AI IR 전략", en: "AI IR Strategy" } },
    { m: { ko: "4월", en: "Apr" }, t: { ko: "WEB3 비즈니스 2026", en: "Web3 Business 2026" } },
    { m: { ko: "5월", en: "May" }, t: { ko: "Physical AI", en: "Physical AI" } },
    { m: { ko: "6월", en: "Jun" }, t: { ko: "네트워크 과학과 마케팅 전략", en: "Network Science & Marketing" } },
  ] },
  { term: { ko: "2025 하반기", en: "2025 H2" }, items: [
    { m: { ko: "7월", en: "Jul" }, t: { ko: "AI 에이전트", en: "AI Agents" } },
    { m: { ko: "8월", en: "Aug" }, t: { ko: "스테이블 코인의 기회", en: "The Stablecoin Opportunity" } },
    { m: { ko: "9월", en: "Sep" }, t: { ko: "바이브 코딩", en: "Vibe Coding" } },
    { m: { ko: "10월", en: "Oct" }, t: { ko: "바이브 코딩", en: "Vibe Coding" } },
    { m: { ko: "11월", en: "Nov" }, t: { ko: "피터 티엘 전략 분석", en: "Peter Thiel's Strategy" } },
    { m: { ko: "12월", en: "Dec" }, t: { ko: "a16z 전략 분석", en: "a16z Strategy" } },
  ] },
  { term: { ko: "2025 상반기", en: "2025 H1" }, items: [
    { m: { ko: "1월", en: "Jan" }, t: { ko: "기업토큰 및 토큰 이코노미 설계", en: "Corporate Tokens & Token Economy" } },
    { m: { ko: "2월", en: "Feb" }, t: { ko: "일론 머스크의 전략", en: "Elon Musk's Strategy" } },
    { m: { ko: "3월", en: "Mar" }, t: { ko: "China AI (+DeepSeek)", en: "China AI (+DeepSeek)" } },
    { m: { ko: "4월", en: "Apr" }, t: { ko: "행동경제학 경영전략", en: "Behavioral Economics Strategy" } },
    { m: { ko: "5월", en: "May" }, t: { ko: "게임이론과 경쟁전략", en: "Game Theory & Competition" } },
    { m: { ko: "6월", en: "Jun" }, t: { ko: "포지셔닝 전략", en: "Positioning Strategy" } },
  ] },
  { term: { ko: "2024 하반기", en: "2024 H2" }, items: [
    { m: { ko: "7월", en: "Jul" }, t: { ko: "AI 프롬프트", en: "AI Prompting" } },
    { m: { ko: "8월", en: "Aug" }, t: { ko: "AI 데이터 분석", en: "AI Data Analysis" } },
    { m: { ko: "9월", en: "Sep" }, t: { ko: "AI 기반 업무자동화", en: "AI Workflow Automation" } },
    { m: { ko: "10월", en: "Oct" }, t: { ko: "AI 실전 비즈니스 사례 풀이", en: "AI Business Case Studies" } },
    { m: { ko: "11월", en: "Nov" }, t: { ko: "AI 멀티미디어", en: "AI Multimedia" } },
    { m: { ko: "12월", en: "Dec" }, t: { ko: "비트코인의 원리와 전망", en: "Bitcoin: Principles & Outlook" } },
  ] },
];

const OTHER_PROGRAMS = [
  { no: "02", title: { ko: "AI리더십과정", en: "AI Leadership Program" }, desc: { ko: "AI 바이브코딩, 업무자동화 등 AI 시대 리더가 반드시 알아야 할 실전 교육", en: "Hands-on training for AI-era leaders — vibe coding, automation and more" } },
  { no: "03", title: { ko: "케이잡스AI교육원", en: "K-Jobs AI Academy" }, desc: { ko: "AI 전환(AX) 실무 역량을 키우는 현장 중심 교육 과정", en: "Field-focused training that builds practical AX capability" } },
  { no: "04", title: { ko: "해외 탐방 프로그램", en: "Global Tour Program" }, desc: { ko: "알리바바 · 저장대 · AI 선도기업 등 글로벌 혁신 현장 직접 탐방", en: "On-site tours of Alibaba, Zhejiang University and leading AI firms" } },
];

const T = {
  desc: { ko: "혁신의 맨 앞에서 CEO의 지식과 전략을 매월 최신화합니다.", en: "Renew CEOs' knowledge and strategy every month, at the very front of innovation." },
  progKicker: { ko: "Executive Strategy Renewal Program", en: "Executive Strategy Renewal Program" },
  progTitle: { ko: "CEO전략최신화과정", en: "Executive Strategy Renewal" },
  progDesc: { ko: "2017년부터 진행되어 온 김문수 교수의 시그니처 강좌입니다. 매월 주임교수가 직접 강의하며, 외부 전문가 초청 없이 최신의 디지털 혁신과 전략을 매달 새로운 과목으로 전달합니다.", en: "Prof. Munsoo Kim's signature course, running since 2017. He teaches every month himself — delivering the latest digital innovation and strategy as a new subject each time, without outside guest lecturers." },
  monthly: { ko: "월별 강의주제", en: "Monthly Topics" },
  monthlyNote: { ko: "*산업 변화 속도에 따라 일부 과목은 변경될 수 있습니다", en: "*Some topics may change with the pace of industry" },
  tuition: { ko: "Tuition", en: "Tuition" },
  tuitionValue: { ko: "1년 연간 수강 · 3,000,000원", en: "Annual enrollment · KRW 3,000,000" },
  tuitionNote: { ko: "식사 및 강의록 포함", en: "Meals and materials included" },
  apply: { ko: "수강 신청 문의", en: "Apply now" },
  moreKicker: { ko: "More Programs", en: "More Programs" },
  moreTitle: { ko: "그 외 오프라인 과정", en: "Other Offline Programs" },
  ctaKicker: { ko: "Group & Custom", en: "Group & Custom" },
  ctaTitle: { ko: "맞춤형 기업 교육 · 단체 수강", en: "Custom corporate & group training" },
  ctaSub: { ko: "별도 상담이 가능합니다.", en: "Separate consultation is available." },
  ctaBtn: { ko: "교육 문의", en: "Training inquiry" },
};
/* ==================================== */

export default async function Page() {
  const locale = await getLocale();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      <PageHeader eyebrow="Offline Education" title={locale === "ko" ? "오프라인 교육" : "Offline Education"} desc={p(T.desc)} />

      {/* CEO전략최신화과정 */}
      <section className={`${WRAP} py-20`}>
        <div className="border-t border-ink/80 pt-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">01 — {p(T.progKicker)}</div>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-[2.5rem]">{p(T.progTitle)}</h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">{p(T.progDesc)}</p>
        </div>

        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {INFO.map((i) => (
            <div key={i.k.ko} className="bg-paper p-6">
              <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{p(i.k)}</div>
              <div className="mt-3 font-serif text-lg text-ink">{p(i.v)}</div>
            </div>
          ))}
        </div>

        {/* 월별 강의주제 */}
        <div className="mt-16 border-t border-line pt-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <h3 className="font-serif text-xl font-semibold text-ink">{p(T.monthly)}</h3>
            <span className="font-mono text-[11px] text-muted">{p(T.monthlyNote)}</span>
          </div>
          <div className="mt-8 space-y-12">
            {CURRICULUM.map((block) => (
              <div key={block.term.ko}>
                <div className="font-mono text-[11px] uppercase tracking-[0.18em] text-accent">{p(block.term)}</div>
                <div className="mt-4 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
                  {block.items.map((it, i) => (
                    <div key={i} className="flex items-baseline gap-4 bg-paper px-6 py-5">
                      <span className="w-10 shrink-0 font-mono text-xs text-muted">{p(it.m)}</span>
                      <span className="font-serif text-base text-ink">{p(it.t)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 수강료 */}
        <div className="mt-16 grid gap-6 border border-navy bg-navy p-8 text-paper sm:grid-cols-[1.5fr_1fr] sm:items-center">
          <div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{p(T.tuition)}</div>
            <div className="mt-3 font-serif text-3xl font-semibold">{p(T.tuitionValue)}</div>
            <p className="mt-2 text-sm text-paper/70">{p(T.tuitionNote)}</p>
          </div>
          <a href="/contact" className="justify-self-start bg-accent px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:justify-self-end">{p(T.apply)} →</a>
        </div>
      </section>

      {/* 그 외 과정 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <div className="border-t border-ink/80 pt-6">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{p(T.moreKicker)}</div>
            <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-[2.5rem]">{p(T.moreTitle)}</h2>
          </div>
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {OTHER_PROGRAMS.map((prog) => (
              <div key={prog.no} className="bg-surface p-7">
                <span className="font-mono text-xs text-accent">{prog.no}</span>
                <div className="mt-6 font-serif text-xl font-semibold text-ink">{p(prog.title)}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p(prog.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner eyebrow={p(T.ctaKicker)} title={p(T.ctaTitle)} sub={p(T.ctaSub)} button={{ href: "/contact", label: `${p(T.ctaBtn)} →` }} />
    </main>
  );
}
