import Link from "next/link";
import { getLocale, pick } from "@/lib/locale";

/* ---------- 원본 문구 그대로 (ko/en) ---------- */

const HIGHLIGHTS = [
  {
    tag: { ko: "CEO전략최신화과정", en: "Executive Strategy Renewal" },
    lines: { ko: "시대에 뒤쳐지지 않는 CEO의 선택, AI와 최신 디지털 전략을 매월 업데이트받는 CEO전략최신화과정", en: "The choice of CEOs who won't fall behind — monthly updates on AI and the latest digital strategy." },
    buttons: [
      { label: { ko: "자세히 보기", en: "Learn more" }, href: "/education/offline", primary: true },
      { label: { ko: "입학 상담", en: "Get in touch" }, href: "/contact" },
    ],
  },
  {
    tag: { ko: "온라인 교육", en: "Online Education" },
    lines: { ko: "언제 어디서나, 나만의 속도로 CEO를 위한 실전 경영 전략 VOD 강좌 · 케이잡스 · 클래스유 · 인프런", en: "Anytime, at your own pace — practical management VOD for CEOs. K-Jobs · ClassU · Inflearn." },
    buttons: [
      { label: { ko: "온라인 강좌 보기", en: "View courses" }, href: "/education/online", primary: true },
      { label: { ko: "수강 문의", en: "Enroll" }, href: "/contact" },
    ],
  },
  {
    tag: { ko: "AI창업강좌", en: "AI Startup Course" },
    lines: { ko: "AI 시대, 창업의 새로운 기회 실전 AI 창업 전략과 비즈니스 모델 설계 · 일요일반 · 주중반 선택가능", en: "New opportunity in the AI era — real AI startup strategy and business model design. Sunday or weekday class." },
    buttons: [
      { label: { ko: "일요일반 보기", en: "Sunday class" }, href: "/education/offline", primary: true },
      { label: { ko: "주중반 보기", en: "Weekday class" }, href: "/education/offline" },
    ],
  },
];

const PROGRAMS = [
  { no: "01", meta: { ko: "VOD 무제한", en: "Unlimited VOD" }, title: { ko: "온라인 강좌", en: "Online Courses" }, desc: { ko: "케이잡스 · 클래스유 · 인프런", en: "K-Jobs · ClassU · Inflearn" }, sub: { ko: "언제 어디서나 수강", en: "Learn anytime, anywhere" }, href: "/education/online" },
  { no: "02", meta: { ko: "매월 개강", en: "Monthly" }, title: { ko: "오프라인 강좌", en: "Offline Courses" }, desc: { ko: "CEO전략최신화과정 · AI리더십과정", en: "Executive Strategy Renewal · AI Leadership" }, sub: { ko: "서울대 교수회관 · 남산 반얀트리", en: "SNU Faculty Hall · Banyan Tree Namsan" }, href: "/education/offline" },
  { no: "03", meta: { ko: "네트워킹", en: "Network" }, title: { ko: "CEO 클럽", en: "CEO Club" }, desc: { ko: "CEO들의 프리미엄 네트워킹", en: "Premium CEO networking" }, sub: { ko: "기업가 · 투자자 · 산업 전문가", en: "Entrepreneurs · investors · experts" }, href: "/networking" },
  { no: "04", meta: { ko: "글로벌", en: "Global" }, title: { ko: "해외 탐방 프로그램", en: "Global Tour Program" }, desc: { ko: "글로벌 혁신 현장 탐방", en: "On-site tours of global innovation" }, sub: { ko: "알리바바 · 저장대 · AI 선도기업", en: "Alibaba · Zhejiang Univ. · leading AI firms" }, href: "/education/offline" },
];

const NOTICES = [
  { status: { ko: "모집중", en: "Open" }, active: true, deadline: "2026-07-03", title: { ko: "중국 AI(베이징) 첨단기술 기업 심층 탐방 신청 접수", en: "Applications open: China (Beijing) AI deep-tech company tour" }, desc: { ko: "2026년 6월 29일(월) — 7월 3일(금) · 선착순 20명 · 베이징 AI 최전선 현장 탐방", en: "Jun 29 – Jul 3, 2026 · first 20 applicants · Beijing AI frontier field tour" }, date: "2026.05.10" },
  { status: { ko: "완료", en: "Done" }, active: false, title: { ko: "항저우 AI 첨단기술 심층 탐방 인사이트 프로그램 성료", en: "Hangzhou AI deep-tech insight tour successfully concluded" }, desc: { ko: "중국 항저우 알리바바·유니트리 로보틱스 등 AI 첨단기업 현장 탐방 성공적 완료", en: "Field tour of Alibaba, Unitree Robotics and others in Hangzhou completed" }, date: "2026.04.29" },
  { status: { ko: "완료", en: "Done" }, active: false, title: { ko: "AI시대 학습관리시스템(LMS)연계 구축을 위한 정책 간담회 참석", en: "Attended policy forum on building an AI-era LMS" }, desc: { ko: "2026.4.29(수) 국가교육위원회, 국가인공지능전략위원회 주관", en: "Apr 29, 2026 · hosted by the National Education & AI Strategy Committees" }, date: "2026.04.29" },
  { status: { ko: "예정", en: "Upcoming" }, active: true, title: { ko: "CEO전략최신화과정 3월 강의 안내 — AI로 기업가치를 높이는 법", en: "March lecture — How to raise enterprise value with AI" }, desc: { ko: "3월 4일(수) 18:00 서울대 교수회관", en: "Mar 4, 18:00 · SNU Faculty Hall" }, date: "2026.02.22" },
  { status: { ko: "진행중", en: "Ongoing" }, active: true, title: { ko: "김문수 교수, 환경재단 AI리더십과정 주임교수 취임", en: "Prof. Kim appointed lead professor, AI Leadership program" }, desc: { ko: "매일경제·환경재단 주최 ‘AI 리더십 과정’ 1기 총괄 | 2월 26일 개강", en: "Leading cohort 1 of the AI Leadership program | opens Feb 26" }, date: "2026.02.20" },
];

const AREAS = [
  { no: "01", kind: { ko: "연구소", en: "Lab" }, title: { ko: "AI자율상담연구소", en: "AI Autonomous Advisory Lab" }, desc: { ko: "AI 에이전트 기반 자율상담 시스템 연구·개발", en: "R&D on AI agent-based autonomous advisory systems" }, href: "/research" },
  { no: "02", kind: { ko: "상시 수강", en: "Always On" }, title: { ko: "온라인 교육", en: "Online Education" }, desc: { ko: "케이잡스 · 클래스유 · 인프런 핵심 강의", en: "Core courses on K-Jobs, ClassU and Inflearn" }, href: "/education/online" },
  { no: "03", kind: { ko: "매월 진행", en: "Monthly" }, title: { ko: "오프라인 교육", en: "Offline Education" }, desc: { ko: "CEO전략최신화과정 · AI리더십과정", en: "Executive Strategy Renewal & AI Leadership" }, href: "/education/offline" },
  { no: "04", kind: { ko: "학회", en: "Society" }, title: { ko: "AI고용학회", en: "AI Employment Society" }, desc: { ko: "AI 시대 고용 정책 연구와 월례 시민세미나", en: "Employment policy research and monthly public seminars" }, href: "/society" },
  { no: "05", kind: { ko: "연구", en: "Research" }, title: { ko: "연구 및 출판", en: "Research & Publishing" }, desc: { ko: "SSCI/SCI급 논문, 경영 전략 서적 집필", en: "SSCI/SCI papers and management strategy books" }, href: "/publications" },
  { no: "06", kind: { ko: "자문", en: "Advisory" }, title: { ko: "기업 자문", en: "Corporate Advisory" }, desc: { ko: "기업 맞춤형 전략 혁신 자문", en: "Tailored strategy innovation advisory" }, href: "/advisory" },
  { no: "07", kind: { ko: "네트워킹", en: "Network" }, title: { ko: "CEO클럽", en: "CEO Club" }, desc: { ko: "500명 이상 현직 CEO 프리미엄 네트워크", en: "A premium network of 500+ active CEOs" }, href: "/networking" },
  { no: "08", kind: { ko: "콘텐츠", en: "Content" }, title: { ko: "인사이트", en: "Insights" }, desc: { ko: "경영 전략·리더십·혁신 최신 분석", en: "Latest analysis on strategy, leadership and innovation" }, href: "/insights" },
];

const INSIGHTS = [
  { cat: { ko: "경영 인사이트", en: "Business Insight" }, date: "2026.05", title: { ko: "가운과 모자의 시대는 끝났다 — AI기반 네트워크 대학의 탄생", en: "The era of gowns and caps is over — the AI networked university" }, desc: { ko: "전통 대학의 구조적 위기와 AI 기반 네트워크 대학 모델의 탄생 배경.", en: "The structural crisis of traditional universities and the rise of the AI networked university." } },
  { cat: { ko: "경영 의학", en: "Business Medicine" }, date: "2026.04", title: { ko: "결국 스마트스코어의 경영권이 넘어갔습니다", en: "How SmartScore ultimately lost management control" }, desc: { ko: "1,100억 규모 투자 유치 이면의 경영권 이전 구조를 해부합니다.", en: "Dissecting the control-transfer structure behind a ₩110B raise." } },
  { cat: { ko: "경영 의학", en: "Business Medicine" }, date: "2026.04", title: { ko: "리디는 왜 만년 적자일까?", en: "Why is Ridi perpetually in the red?" }, desc: { ko: "누적 결손금 2,096억 원. 플랫폼 비즈니스의 수익성 함정을 분석.", en: "₩209.6B accumulated deficit — the profitability trap of platforms." } },
];

const FIELDS = [
  { ko: "AI경영전략", en: "AI Strategy" }, { ko: "블록체인 경영전략", en: "Blockchain Strategy" }, { ko: "성장전략", en: "Growth Strategy" }, { ko: "富의 감각", en: "Sense of Wealth" },
  { ko: "창조적 독점", en: "Creative Monopoly" }, { ko: "투자유치", en: "Fundraising" }, { ko: "기업의 영생", en: "Corporate Longevity" }, { ko: "성과창출시스템", en: "Performance Systems" },
];

const PARTNERS = ["삼성", "현대자동차", "LG", "SK", "포스코", "롯데", "HD현대", "농협", "GS", "CJ", "카카오", "네이버", "두산", "KB", "한화", "기아", "넥슨", "무역협회", "환경재단", "서울대학교", "매일경제", "코오롱"];

const CAMPUSES = [
  { no: "01", name: { ko: "관악캠퍼스", en: "Gwanak Campus" }, place: { ko: "서울대학교 교수회관", en: "SNU Faculty Hall" }, addr: { ko: "서울시 관악구 관악로1 서울대학교 교수회관(65동)", en: "Faculty Hall (Bldg 65), Seoul National University, Gwanak-gu, Seoul" } },
  { no: "02", name: { ko: "용산캠퍼스", en: "Yongsan Campus" }, place: { ko: "케이잡스", en: "K-Jobs" }, addr: { ko: "서울특별시 용산구 한강대로80길 11-49", en: "11-49 Hangang-daero 80-gil, Yongsan-gu, Seoul" } },
  { no: "03", name: { ko: "강남캠퍼스", en: "Gangnam Campus" }, place: { ko: "DB증권 알파플러스클럽", en: "DB Securities Alpha Plus Club" }, addr: { ko: "서울 강남구 테헤란로 432 DB금융센터 27층 VIP센터", en: "27F DB Financial Center, 432 Teheran-ro, Gangnam-gu, Seoul" } },
];

const TX = {
  heroTitle: {
    ko: { pre: "혁신의 최전선에서 전략을 ", accent: "최신화", post: "하다" },
    en: { pre: "Renew your strategy at the frontier of ", accent: "innovation", post: "" },
  },
  heroLead: { ko: "세상에서 가장 빠르게 변하는 지식과 전략을 연구하고, 전파하고, 교육합니다. CEO의 지식과 전략이 최신화될 때, 기업의 미래가 바뀝니다.", en: "We research, share and teach the world's fastest-changing knowledge and strategy. When a CEO's knowledge and strategy are renewed, the company's future changes." },
  ctaProgram: { ko: "프로그램 안내", en: "Programs" },
  ctaConsult: { ko: "입학 상담", en: "Get in touch" },
  more: { ko: "전체 보기", en: "View all" },
  goto: { ko: "바로가기", en: "Go" },
  programsTitle: { ko: "프로그램", en: "Programs" },
  programsDesc: { ko: "원하는 교육을 바로 선택하세요", en: "Choose the program that fits you" },
  newsTitle: { ko: "공지사항", en: "News" },
  areasTitle: { ko: "CEO비즈니스스쿨의 핵심 영역", en: "Core Areas of CEO Business School" },
  areasDesc: { ko: "교육, 연구, 자문, 네트워킹을 아우르는 통합 경영 혁신 플랫폼", en: "An integrated platform spanning education, research, advisory and networking" },
  pubTitle: { ko: "연구 및 출판", en: "Research & Publishing" },
  pubKicker: { ko: "CEO의 필독서", en: "Essential reading for CEOs" },
  pubDesc: { ko: "CEO와 자영업자의 생존과 번영을 위한 필수 가이드. 富가 쌓이는 원리와 실행 전략을 상세히 알려드립니다.", en: "An essential guide to survival and prosperity for CEOs and business owners — the principles and playbook for building wealth." },
  pubMeta: { ko: "김문수 저 · 김영사 · 2026년 1월", en: "By Prof. Munsoo Kim · Gimm-Young · Jan 2026" },
  insightsTitle: { ko: "인사이트", en: "Insights" },
  insightsDesc: { ko: "경영 전략과 AI에 대한 최신 분석과 통찰", en: "The latest analysis and insight on strategy and AI" },
  fieldsTitle: { ko: "전문 분야", en: "Expertise" },
  fieldsDesc: { ko: "혁신의 최전선에서 연구하고 교육하는 핵심 영역", en: "The fields we research and teach at the frontier of innovation" },
  partnersTitle: { ko: "협력기업", en: "Partners" },
  partnersDesc: { ko: "다양한 분야의 선도 기업들과 함께합니다", en: "We work with leading companies across industries" },
  campusTitle: { ko: "오프라인 캠퍼스", en: "Campuses" },
  campusDesc: { ko: "서울 주요 거점에서 만나는 CEO비즈니스스쿨", en: "Meet CEO Business School at key locations across Seoul" },
  contact: { ko: "문의하기", en: "Contact us" },
  ctaTitle: { ko: "지식과 전략의 최신화, 지금 시작하세요", en: "Renew your knowledge and strategy today" },
};

const WRAP = "mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16";

export default async function Home() {
  const locale = await getLocale();
  const p = (x: { ko: string; en: string }) => pick(locale, x);
  const today = new Date();

  return (
    <main>
      {/* 히어로 */}
      <section className="border-b border-line">
        <div className={`${WRAP} pt-24 pb-16 text-center lg:pt-32 lg:pb-20`} style={{ backgroundImage: "linear-gradient(to right, rgba(20,40,160,0.05) 1px, transparent 1px)", backgroundSize: "84px 100%" }}>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">CEO Business School</div>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-[1.12] tracking-tight text-ink sm:text-5xl">
            {pick(locale, TX.heroTitle).pre}
            <span className="text-accent">{pick(locale, TX.heroTitle).accent}</span>
            {pick(locale, TX.heroTitle).post}
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted">{p(TX.heroLead)}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link href="/education/offline" className="bg-navy px-7 py-3.5 text-sm font-medium text-paper transition-opacity hover:opacity-90">{p(TX.ctaProgram)}</Link>
            <Link href="/contact" className="border border-line px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent">{p(TX.ctaConsult)}</Link>
          </div>
        </div>
      </section>

      {/* 핵심 프로그램 하이라이트 3 */}
      <section className={`${WRAP} py-16`}>
        <div className="grid gap-px border border-line bg-line md:grid-cols-3">
          {HIGHLIGHTS.map((h) => (
            <div key={h.tag.ko} className="flex flex-col bg-paper p-8">
              <div className="text-sm font-bold text-accent">{p(h.tag)}</div>
              <p className="mt-4 flex-1 text-lg font-semibold leading-snug text-ink">{p(h.lines)}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                {h.buttons.map((b) => (
                  <Link key={b.label.ko} href={b.href} className={b.primary ? "bg-navy px-5 py-2.5 text-xs font-medium text-paper hover:opacity-90" : "border border-line px-5 py-2.5 text-xs font-medium text-ink hover:border-accent hover:text-accent"}>{p(b.label)}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 프로그램 4분류 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <div className="border-t-2 border-ink pt-6">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">{p(TX.programsTitle)}</h2>
            <p className="mt-2 text-muted">{p(TX.programsDesc)}</p>
          </div>
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {PROGRAMS.map((prog) => (
              <Link key={prog.no} href={prog.href} className="group flex flex-col bg-surface p-7 transition-colors hover:bg-paper">
                <span className="text-xs font-bold uppercase tracking-[0.12em] text-accent">{p(prog.meta)}</span>
                <div className="mt-4 font-serif text-xl font-bold text-ink">{p(prog.title)}</div>
                <p className="mt-3 text-sm text-ink">{p(prog.desc)}</p>
                <p className="mt-1 flex-1 text-sm text-muted">{p(prog.sub)}</p>
                <span className="mt-6 text-xs font-medium text-ink transition-colors group-hover:text-accent">{p(TX.goto)} →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 공지사항 */}
      <section className={`${WRAP} py-20`}>
        <div className="flex items-end justify-between border-t-2 border-ink pt-6">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">{p(TX.newsTitle)}</h2>
          <Link href="/insights" className="text-xs font-medium uppercase tracking-[0.12em] text-ink hover:text-accent">{p(TX.more)} →</Link>
        </div>
        <ul className="mt-10 border-t border-line">
          {NOTICES.map((n) => {
            // 마감일이 지나면 '모집중' → '마감' 으로 자동 전환 (콘텐츠가 오래돼도 안 썩게)
            const deadline = (n as { deadline?: string }).deadline;
            const expired = deadline ? new Date(deadline) < today : false;
            const status = expired ? { ko: "마감", en: "Closed" } : n.status;
            const isActive = expired ? false : n.active;
            return (
              <li key={n.title.ko} className="border-b border-line py-5">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:gap-6">
                  <span className={`w-20 shrink-0 text-xs font-bold uppercase tracking-[0.1em] ${isActive ? "text-accent" : "text-muted"}`}>{p(status)}</span>
                  <div className="flex-1">
                    <div className="font-semibold text-ink">{p(n.title)}</div>
                    <div className="mt-1 text-sm text-muted">{p(n.desc)}</div>
                  </div>
                  <span className="shrink-0 text-xs text-muted">{n.date}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      {/* 핵심 영역 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <div className="border-t-2 border-ink pt-6">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">{p(TX.areasTitle)}</h2>
            <p className="mt-2 text-muted">{p(TX.areasDesc)}</p>
          </div>
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {AREAS.map((a) => (
              <Link key={a.no} href={a.href} className="group bg-surface p-7 transition-colors hover:bg-paper">
                <div className="flex items-baseline gap-3">
                  <span className="text-xs font-bold text-accent">{a.no}</span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.12em] text-muted">{p(a.kind)}</span>
                </div>
                <div className="mt-4 font-serif text-lg font-bold text-ink">{p(a.title)}</div>
                <p className="mt-2 text-balance text-sm leading-relaxed text-muted">{p(a.desc)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 출판 */}
      <section className={`${WRAP} py-20`}>
        <div className="border-t-2 border-ink pt-6">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">{p(TX.pubTitle)}</h2>
        </div>
        <div className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-accent">{p(TX.pubKicker)}</div>
            <div className="mt-4 font-serif text-3xl font-bold text-ink">富의 감각</div>
            <div className="mt-1 text-xs uppercase tracking-[0.12em] text-muted">The Sense of Wealth</div>
            <p className="mt-4 text-sm text-muted">{p(TX.pubMeta)}</p>
          </div>
          <div>
            <p className="max-w-xl text-lg leading-relaxed text-ink">{p(TX.pubDesc)}</p>
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 text-xs font-medium uppercase tracking-[0.1em]">
              {["교보문고", "YES24", "알라딘", locale === "ko" ? "도서 홈페이지" : "Book site"].map((s) => (
                <span key={s} className="border-b border-ink/30 pb-1 text-ink hover:border-accent hover:text-accent">{s} →</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 인사이트 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <div className="flex items-end justify-between border-t-2 border-ink pt-6">
            <div>
              <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">{p(TX.insightsTitle)}</h2>
              <p className="mt-2 max-w-xl text-muted">{p(TX.insightsDesc)}</p>
            </div>
            <Link href="/insights" className="text-xs font-medium uppercase tracking-[0.12em] text-ink hover:text-accent">{p(TX.more)} →</Link>
          </div>
          <div className="mt-10 grid border-t border-line md:grid-cols-3">
            {INSIGHTS.map((i, idx) => (
              <Link key={i.title.ko} href="/insights" className={`group flex flex-col py-8 md:px-8 md:py-2 ${idx !== 0 ? "border-t border-line md:border-t-0 md:border-l" : "md:pl-0"}`}>
                <div className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.1em]">
                  <span className="text-accent">New</span>
                  <span className="text-muted">{p(i.cat)} · {i.date}</span>
                </div>
                <div className="mt-4 font-serif text-xl font-bold leading-snug text-ink transition-colors group-hover:text-accent">{p(i.title)}</div>
                <p className="mt-3 text-balance text-sm leading-relaxed text-muted">{p(i.desc)}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 전문 분야 */}
      <section className={`${WRAP} py-20`}>
        <div className="border-t-2 border-ink pt-6">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">{p(TX.fieldsTitle)}</h2>
          <p className="mt-2 text-muted">{p(TX.fieldsDesc)}</p>
        </div>
        <div className="mt-10 grid grid-cols-2 border-l border-t border-line sm:grid-cols-4">
          {FIELDS.map((f) => (<div key={f.ko} className="border-b border-r border-line px-5 py-6 font-serif text-base font-semibold text-ink">{p(f)}</div>))}
        </div>
      </section>

      {/* 협력기업 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <div className="border-t-2 border-ink pt-6">
            <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">{p(TX.partnersTitle)}</h2>
            <p className="mt-2 text-muted">{p(TX.partnersDesc)}</p>
          </div>
          <div className="mt-10 grid grid-cols-3 border-l border-t border-line sm:grid-cols-4 lg:grid-cols-6">
            {PARTNERS.map((partner) => (<div key={partner} className="flex items-center justify-center border-b border-r border-line px-3 py-7 text-sm font-semibold text-muted">{partner}</div>))}
          </div>
        </div>
      </section>

      {/* 캠퍼스 */}
      <section className={`${WRAP} py-20`}>
        <div className="border-t-2 border-ink pt-6">
          <h2 className="font-serif text-3xl font-bold tracking-tight text-ink sm:text-[2.5rem]">{p(TX.campusTitle)}</h2>
          <p className="mt-2 text-muted">{p(TX.campusDesc)}</p>
        </div>
        <div className="mt-10 grid border-t border-line md:grid-cols-3">
          {CAMPUSES.map((c, idx) => (
            <div key={c.no} className={`py-8 md:px-8 md:py-2 ${idx !== 0 ? "border-t border-line md:border-t-0 md:border-l" : "md:pl-0"}`}>
              <span className="text-xs font-bold text-accent">{c.no}</span>
              <div className="mt-4 text-[11px] font-medium uppercase tracking-[0.12em] text-muted">{p(c.name)}</div>
              <div className="mt-2 font-serif text-xl font-bold text-ink">{p(c.place)}</div>
              <p className="mt-3 text-balance text-sm leading-relaxed text-muted">{p(c.addr)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy text-paper">
        <div className={`${WRAP} flex flex-col items-start gap-8 py-24 md:flex-row md:items-end md:justify-between`}>
          <h2 className="max-w-2xl font-serif text-3xl font-bold leading-tight tracking-tight sm:text-[2.75rem] sm:leading-[1.1]">{p(TX.ctaTitle)}</h2>
          <Link href="/contact" className="shrink-0 bg-accent px-8 py-4 text-sm font-medium text-white transition-opacity hover:opacity-90">{p(TX.contact)} →</Link>
        </div>
      </section>
    </main>
  );
}
