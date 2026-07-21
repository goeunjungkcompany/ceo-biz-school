import Link from "next/link";
import { WRAP, SectionHead, Placeholder, CtaBanner } from "@/components/ui";
import { getLocale, pick } from "@/lib/locale";

export const metadata = { title: "소개 | CEO Business School" };

/* 설립자 사진: /public 에 파일 넣고 "/kim.jpg" 처럼 지정하면 자동 표시 */
const FOUNDER_PHOTO: string | undefined = undefined;

/* ===== 원본 문구 그대로 (ko/en) ===== */
const MANIFESTO = [
  { ko: "OpenAI의 ChatGPT가 등장한 이후 불과 몇 년 만에, AI는 변호사 시험을 통과하고 의학 진단 영역에서는 전문의를 능가하는 수준까지 발전하고 있습니다.", en: "Within a few years of OpenAI's ChatGPT, AI now passes the bar exam and surpasses specialists in medical diagnosis." },
  { ko: "비즈니스 현장에서도 변화는 이미 현실이 되었습니다. AI는 전략을 분석하고, 코드를 작성하며, 콘텐츠를 생산하고, 마케팅을 자동화하고, 데이터를 기반으로 의사결정을 지원합니다.", en: "In business, the change is already real. AI analyzes strategy, writes code, produces content, automates marketing and supports data-driven decisions." },
  { ko: "기술 발전의 속도는 인류 역사상 가장 빠른 수준으로 가속되고 있습니다. 작년에 배운 전략은 이미 낡아지고, 지난달의 기술은 이미 구식이 되는 시대입니다.", en: "Technology is accelerating faster than at any point in history. Last year's strategy is already old; last month's technology already outdated." },
  { ko: "이제 CEO의 지식과 전략은 매년이 아니라 매월, 매주 최신화되어야 합니다.", en: "A CEO's knowledge and strategy must now be renewed not yearly, but monthly and weekly." },
  { ko: "이 속도를 따라가지 못하는 기업은 경쟁력을 잃게 되고, 변화를 읽지 못하는 리더는 시장에서 뒤처질 가능성이 커지고 있습니다. CEO비즈니스스쿨은 바로 이러한 시대적 변화 속에서 탄생했습니다.", en: "Companies that can't keep pace lose their edge, and leaders who can't read change fall behind. CEO Business School was born of exactly this change." },
];

const PILLARS = [
  { no: "01", title: { ko: "지식 최신화", en: "Knowledge Renewal" }, desc: { ko: "세상에서 가장 빠르게 변하는 지식을 실시간으로 연구하고 교육에 즉시 반영합니다", en: "We research the world's fastest-changing knowledge in real time and reflect it immediately in teaching" } },
  { no: "02", title: { ko: "전략 최신화", en: "Strategy Renewal" }, desc: { ko: "낡은 전략은 기업을 위험에 빠뜨립니다. 매월 최신 전략으로 CEO의 의사결정을 업그레이드합니다", en: "Outdated strategy endangers a company. We upgrade CEO decisions with the latest strategy every month" } },
  { no: "03", title: { ko: "혁신의 최전선", en: "Frontier of Innovation" }, desc: { ko: "글로벌 혁신의 맨 앞에서 트렌드를 포착하고, 연구하고, 가장 먼저 전파합니다", en: "At the front of global innovation, we spot trends, research them and share them first" } },
  { no: "04", title: { ko: "AI 시대 선도", en: "Leading the AI Era" }, desc: { ko: "AI 자율상담 연구부터 바이브코딩까지, AI 시대의 경영 전략을 직접 연구하고 교육합니다", en: "From autonomous AI advisory to vibe coding, we research and teach AI-era strategy ourselves" } },
];

const MATTERS = [
  { ko: "얼마나 빠르게 변화와 연결되는가", en: "How quickly you connect to change" },
  { ko: "얼마나 실전과 연결되는가", en: "How closely you connect to practice" },
  { ko: "얼마나 살아있는 전략을 전달할 수 있는가", en: "How well you deliver living strategy" },
];

const CONNECTED = [
  { no: "01", title: { ko: "CEO 전략 교육", en: "CEO Strategy Education" }, desc: { ko: "매월 최신화되는 CEO 전략 강의", en: "CEO strategy lectures, renewed monthly" } },
  { no: "02", title: { ko: "AI 및 AX(AI Transformation) 교육", en: "AI & AX (AI Transformation)" }, desc: { ko: "경영자를 위한 AI 전환 실전 교육", en: "Hands-on AI-transformation training for executives" } },
  { no: "03", title: { ko: "글로벌 산업 탐방", en: "Global Industry Tours" }, desc: { ko: "글로벌 혁신 현장을 직접 탐방", en: "On-site tours of global innovation" } },
  { no: "04", title: { ko: "창업 및 투자 네트워크", en: "Founder & Investor Network" }, desc: { ko: "창업자, 투자자, 전략 파트너를 연결", en: "Connecting founders, investors and strategy partners" } },
  { no: "05", title: { ko: "실전 중심 세미나", en: "Practice-first Seminars" }, desc: { ko: "현장 전문가와 실무자의 살아있는 전략 공유", en: "Living strategy shared by field experts and practitioners" } },
  { no: "06", title: { ko: "산업 연결형 프로젝트", en: "Cross-industry Projects" }, desc: { ko: "산업 간 협력으로 현실의 문제를 함께 해결", en: "Solving real problems through cross-industry collaboration" } },
];

const UNIS = [
  { ko: "서울대학교", en: "Seoul National University" },
  { ko: "연세대학교", en: "Yonsei University" },
  { ko: "저장대학교 (중국)", en: "Zhejiang University (China)" },
];

const SERVICES = [
  { no: "01", title: { ko: "CEO전략최신화과정", en: "Executive Strategy Renewal" }, desc: { ko: "매월 새로운 주제로 최신 경영 전략과 AI 기술을 교육하는 오프라인 과정", en: "An offline program teaching the latest strategy and AI, a new topic each month" } },
  { no: "02", title: { ko: "AI리더십과정", en: "AI Leadership Program" }, desc: { ko: "AI 바이브코딩, 업무자동화 등 AI 시대 리더가 반드시 알아야 할 실전 교육", en: "Hands-on training for AI-era leaders — vibe coding, automation and more" } },
  { no: "03", title: { ko: "온라인 VOD 교육", en: "Online VOD" }, desc: { ko: "케이잡스, 클래스유, 인프런에서 시간과 장소에 구애받지 않는 경영 전략 학습", en: "Learn strategy anytime on K-Jobs, ClassU and Inflearn" } },
  { no: "04", title: { ko: "기업 자문", en: "Corporate Advisory" }, desc: { ko: "최신 전략과 기술로 기업의 경쟁력을 근본부터 혁신하는 맞춤형 자문", en: "Tailored advisory that renews competitiveness from the ground up" } },
];

const T = {
  eyebrow: { ko: "THE NETWORKED UNIVERSITY FOR CEOS", en: "THE NETWORKED UNIVERSITY FOR CEOS" },
  desc: { ko: "CEO, 기업, 산업, AI, 글로벌 네트워크를 연결하는 새로운 지식 생태계를 구축합니다.", en: "We are building a new knowledge ecosystem connecting CEOs, companies, industries, AI and global networks." },
  ctaProgram: { ko: "프로그램 안내", en: "Programs" },
  ctaConsult: { ko: "입학 상담", en: "Get in touch" },
  manifestoTitle: { ko: "AI가 교수보다 지능이 높은 시대가 시작되었습니다", en: "An era has begun in which AI is more intelligent than professors" },
  modelTitle: { ko: "AI 시대의 새로운 대학 모델", en: "A new university model for the AI era" },
  modelQuote: { ko: "“The Networked University for CEOs”", en: "“The Networked University for CEOs”" },
  modelIntro: { ko: "과거의 대학은 캠퍼스를 중심으로 지식을 보관하고 전달하는 기관이었습니다. 산업혁명 시대에는 매우 효율적인 모델이었습니다.", en: "Universities once stored and delivered knowledge from a campus — a highly efficient model in the industrial age." },
  limitTitle: { ko: "기존 대학 모델의 한계", en: "The limits of the traditional model" },
  limit1: { ko: "시간이 흐르며 대학은 점점 더 거대한 행정 시스템과 고정 비용 구조를 가지게 되었습니다. 막대한 건물 유지비와 행정 비용, 복잡한 조직 구조가 확대되었고, 정작 가장 중요한 지식의 최신화 속도는 산업 현장을 따라가지 못하는 경우가 많아졌습니다.", en: "Over time, universities took on ever-larger administration and fixed costs. Huge facility and admin expenses and complex structures grew, while the most crucial thing — the pace of knowledge renewal — often fell behind industry." },
  limit2: { ko: "AI 시대에는 이러한 구조적 한계가 더욱 분명하게 드러나고 있습니다.", en: "In the AI era, these structural limits become even clearer." },
  mattersTitle: { ko: "이제 중요한 것", en: "What matters now" },
  mattersNot: { ko: "얼마나 큰 캠퍼스를 보유하고 있는가가 아닙니다.", en: "It is not how large a campus you own." },
  notSchool: { ko: "단순한 교육기관이 아닙니다.", en: "We are not merely a school." },
  notSchool1: { ko: "우리는 CEO, 기업, 산업, AI, 글로벌 네트워크를 연결하는 새로운 형태의 지식 생태계를 구축하고 있습니다.", en: "We are building a new kind of knowledge ecosystem connecting CEOs, companies, industries, AI and global networks." },
  notSchool2: { ko: "기업가, 투자자, 산업 전문가, AI 실무자들이 함께 참여하여 현실의 문제를 기반으로 살아있는 전략과 실행 경험을 공유합니다.", en: "Entrepreneurs, investors, industry experts and AI practitioners take part, sharing living strategy and execution grounded in real problems." },
  question: { ko: "“AI 시대에 CEO는 무엇을 배워야 하는가.”", en: "“What must a CEO learn in the AI era?”" },
  questionAns: { ko: "CEO비즈니스스쿨은 그 질문에 가장 빠르고 깊이 있게 답하는 교육기관입니다.", en: "CEO Business School answers that question faster and more deeply than anyone." },
  connectedTitle: { ko: "CEO비즈니스스쿨에서 유기적으로 연결되는 것들", en: "What connects organically at CEO Business School" },
  academic: { ko: "학술 협력", en: "Academic Partnership" },
  academicSub: { ko: "현재 진행 중인 강의", en: "Courses in progress" },
  academicDesc: { ko: "현재 CEO비즈니스스쿨의 강의는 서울대학교 및 연세대학교에서도 진행되고 있으며, 중국의 저장대학교(Zhejiang University)와의 협력도 시작되었습니다.", en: "Courses are currently held at Seoul National University and Yonsei University, and collaboration with China's Zhejiang University has begun." },
  academicClose: { ko: "CEO비즈니스스쿨은 더 많은 기업, 기관, 학교, 글로벌 파트너와 연결되며, AI 시대에 필요한 새로운 경영 지식과 실행 생태계를 확장해가고 있습니다.", en: "We keep connecting with more companies, institutions, schools and global partners, expanding the new management knowledge and execution ecosystem the AI era demands." },
  founder: { ko: "설립자", en: "Founder" },
  founderTag: { ko: "혁신의 최전선에서 25년간 연구하고 교육해 온 경영 전략 전문가", en: "A management strategist with 25 years at the frontier of innovation" },
  founderName: { ko: "김문수 교수", en: "Prof. Munsoo Kim" },
  founderRole: { ko: "CEO비즈니스스쿨 설립자 · CEO클럽 회장", en: "Founder, CEO Business School · Chair, CEO Club" },
  founder1: { ko: "25년간 경영 전략과 디지털 혁신을 연구하고 교육해 온 김문수 교수는, AI 시대 CEO에게 가장 필요한 것은 ‘전략의 끊임없는 최신화’라는 철학 아래 CEO비즈니스스쿨을 설립했습니다.", en: "Prof. Munsoo Kim, who has researched and taught strategy and digital innovation for 25 years, founded CEO Business School on the belief that what CEOs need most in the AI era is the constant renewal of strategy." },
  founder2: { ko: "현재 K-JOBS AI자율상담연구소 소장을 겸직하며, AI 에이전트 기반 자율상담 시스템을 직접 연구·개발하고 있습니다. 학술 연구와 실전 교육을 동시에 수행하는 현장형 연구자입니다.", en: "He also serves as Director of the K-JOBS AI Autonomous Advisory Lab, personally researching and developing AI agent-based advisory systems — a hands-on researcher who does scholarship and practical teaching at once." },
  facultyLink: { ko: "교수진 보기", en: "Faculty" },
  researchLink: { ko: "연구 성과 보기", en: "Research" },
  services: { ko: "주요 교육 및 서비스", en: "Programs & Services" },
  servicesSub: { ko: "매월 최신 트렌드를 반영한 전략 교육으로 CEO의 지식을 최신화합니다", en: "We renew CEOs' knowledge with strategy education reflecting the latest trends each month" },
  ctaTitle: { ko: "함께 미래의 지식과 전략을 만들어 갑니다", en: "Let's build the knowledge and strategy of the future, together" },
  ctaBody: { ko: "우리는 AI 시대의 새로운 교육 생태계를 함께 만들어갈 대학, 기관, 기업들과의 협력을 적극적으로 환영합니다. 산업과 교육, 기술과 경영, 국가와 글로벌 네트워크가 연결되는 새로운 시대 속에서, CEO비즈니스스쿨은 더 많은 파트너들과 함께 미래의 지식과 전략을 만들어 갈 것입니다.", en: "We warmly welcome universities, institutions and companies to build the new educational ecosystem of the AI era with us. As industry and education, technology and management, nation and global networks connect, CEO Business School will build the future of knowledge and strategy with more partners." },
  ctaBtn: { ko: "협력 문의하기", en: "Partnership inquiry" },
};
/* ==================================== */

export default async function Page() {
  const locale = await getLocale();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      {/* 히어로 */}
      <section className="border-b border-line">
        <div className={`${WRAP} pt-24 pb-16 lg:pt-28`} style={{ backgroundImage: "linear-gradient(to right, rgba(20,40,160,0.05) 1px, transparent 1px)", backgroundSize: "84px 100%" }}>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{p(T.eyebrow)}</div>
          <h1 className="mt-6 font-serif text-4xl font-extrabold leading-[1.1] tracking-tight text-ink sm:text-5xl">
            {locale === "ko" ? (<>AI 시대의<br />새로운 대학 모델</>) : (<>A new university<br />for the AI era</>)}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{p(T.desc)}</p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/education/offline" className="bg-navy px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:opacity-90">{p(T.ctaProgram)}</Link>
            <Link href="/contact" className="group inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm font-medium text-ink hover:border-accent hover:text-accent">{p(T.ctaConsult)}<span className="transition-transform group-hover:translate-x-1">→</span></Link>
          </div>
        </div>
      </section>

      {/* 선언문 */}
      <section className={`${WRAP} py-20`}>
        <div className="grid gap-10 border-t-2 border-ink pt-10 md:grid-cols-[0.9fr_1.5fr]">
          <h2 className="font-serif text-2xl font-bold leading-snug text-ink">{p(T.manifestoTitle)}</h2>
          <div className="space-y-5 leading-relaxed text-muted">
            {MANIFESTO.map((m, i) => (<p key={i} className={i === 3 ? "font-semibold text-ink" : undefined}>{p(m)}</p>))}
          </div>
        </div>
      </section>

      {/* 4 pillars */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pl) => (
              <div key={pl.no} className="bg-surface p-7">
                <span className="font-mono text-xs text-accent">{pl.no}</span>
                <div className="mt-6 font-serif text-xl font-bold text-ink">{p(pl.title)}</div>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p(pl.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 새로운 대학 모델 */}
      <section className={`${WRAP} py-20`}>
        <div className="border-t-2 border-ink pt-10">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">{p(T.modelTitle)}</h2>
          <div className="mt-2 font-mono text-sm text-accent">{p(T.modelQuote)}</div>
          <p className="mt-6 max-w-3xl leading-relaxed text-muted">{p(T.modelIntro)}</p>
        </div>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <div>
            <div className="font-serif text-lg font-bold text-ink">{p(T.limitTitle)}</div>
            <p className="mt-4 leading-relaxed text-muted">{p(T.limit1)}</p>
            <p className="mt-4 leading-relaxed text-ink">{p(T.limit2)}</p>
          </div>
          <div className="border-l border-line pl-8">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{p(T.mattersTitle)}</div>
            <ul className="mt-4 space-y-2">
              {MATTERS.map((m, i) => (<li key={i} className="flex gap-3 font-serif text-lg text-ink"><span className="font-mono text-sm text-accent">0{i + 1}</span>{p(m)}</li>))}
            </ul>
            <p className="mt-4 text-sm text-muted">{p(T.mattersNot)}</p>
          </div>
        </div>

        <div className="mt-12 border-t border-line pt-10">
          <div className="font-serif text-xl font-bold text-ink">{p(T.notSchool)}</div>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{p(T.notSchool1)}</p>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{p(T.notSchool2)}</p>
          <blockquote className="mt-8 border-l-2 border-accent pl-6">
            <p className="font-serif text-2xl font-bold text-ink">{p(T.question)}</p>
            <p className="mt-3 leading-relaxed text-muted">{p(T.questionAns)}</p>
          </blockquote>
        </div>
      </section>

      {/* 유기적으로 연결되는 것들 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <SectionHead index="01" kicker="Connected" title={p(T.connectedTitle)} />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {CONNECTED.map((c) => (
              <div key={c.no} className="bg-surface p-7">
                <span className="font-mono text-xs text-accent">{c.no}</span>
                <div className="mt-4 font-serif text-lg font-bold text-ink">{p(c.title)}</div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{p(c.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 학술 협력 */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="02" kicker={T.academicSub.en} title={p(T.academic)} desc={p(T.academicDesc)} />
        <div className="mt-10 grid border-t border-line md:grid-cols-3">
          {UNIS.map((u, idx) => (
            <div key={u.en} className={`py-8 md:px-8 md:py-4 ${idx !== 0 ? "border-t border-line md:border-t-0 md:border-l" : "md:pl-0"}`}>
              <div className="font-serif text-xl font-bold text-ink">{p(u)}</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{u.en}</div>
            </div>
          ))}
        </div>
        <p className="mt-10 max-w-3xl leading-relaxed text-muted">{p(T.academicClose)}</p>
      </section>

      {/* 설립자 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <SectionHead index="03" kicker="Founder" title={p(T.founder)} desc={p(T.founderTag)} />
          <div className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-[0.8fr_1.5fr]">
            <Placeholder label="Photo" src={FOUNDER_PHOTO} alt={p(T.founderName)} className="aspect-[3/4]" />
            <div>
              <div className="font-serif text-2xl font-bold text-ink">{p(T.founderName)}</div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{p(T.founderRole)}</div>
              <p className="mt-6 leading-relaxed text-muted">{p(T.founder1)}</p>
              <p className="mt-4 leading-relaxed text-muted">{p(T.founder2)}</p>
              <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-mono text-xs uppercase tracking-[0.12em]">
                <Link href="/faculty" className="border-b border-ink/30 pb-1 text-ink hover:border-accent hover:text-accent">{p(T.facultyLink)} →</Link>
                <Link href="/research" className="border-b border-ink/30 pb-1 text-ink hover:border-accent hover:text-accent">{p(T.researchLink)} →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 주요 교육 및 서비스 */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="04" kicker="Programs & Services" title={p(T.services)} desc={p(T.servicesSub)} />
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s) => (
            <div key={s.no} className="bg-paper p-7">
              <span className="font-mono text-xs text-accent">{s.no}</span>
              <div className="mt-6 font-serif text-lg font-bold text-ink">{p(s.title)}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{p(s.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-paper">
        <div className={`${WRAP} py-20`}>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">Get Started</div>
          <h2 className="mt-5 max-w-3xl font-serif text-3xl font-bold leading-tight tracking-tight sm:text-[2.5rem]">{p(T.ctaTitle)}</h2>
          <p className="mt-6 max-w-3xl leading-relaxed text-paper/70">{p(T.ctaBody)}</p>
          <div className="mt-9 flex flex-wrap gap-4">
            <Link href="/education/offline" className="bg-accent px-7 py-3.5 text-sm font-medium text-white transition-opacity hover:opacity-90">{p(T.ctaProgram)}</Link>
            <Link href="/contact" className="border border-paper/40 px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-paper hover:text-navy">{p(T.ctaBtn)}</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
