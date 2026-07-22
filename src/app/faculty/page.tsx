import { WRAP, PageHeader, SectionHead, Placeholder, CtaBanner } from "@/components/ui";
import { Balanced } from "@/components/Balanced";
import { getLocale, pick } from "@/lib/locale";
import { getSiteImageMap } from "@/lib/site-images";

export const metadata = { title: "교수진 | CEO Business School" };

/* ===== 교수진 데이터 (ko/en) =====
   사진 교체: /public 에 파일 넣고 photo: "/ahn.jpg"
   CV 파일: /public 에 PDF 넣고 cvUrl: "/ahn-cv.pdf"  → "CV 보기" 클릭 시 그 파일이 열립니다.
            cvUrl 이 없으면 "CV 준비 중"으로 표시됩니다.
==================================== */
const FOUNDER = {
  name: { ko: "김문수", en: "Munsoo Kim" },
  role: { ko: "설립총장 · 의장", en: "Founding President & Chair" },
  tag: { ko: "AI/AX 전략 및 개발, 토큰 이코노미 설계", en: "AI/AX strategy & development, token-economy design" },
  photo: undefined as string | undefined,
  intro: { ko: "AI가 교수보다 지능이 높은 시대입니다. CEO비즈니스스쿨은 새로운 시대에 새로운 지식과 방법으로 CEO의 성장과 확장을 돕습니다. AI 시대 CEO에게 가장 필요한 것은 ‘전략의 끊임없는 최신화’라는 철학 아래 학교를 설립했습니다.", en: "In an era where AI is more intelligent than professors, CEO Business School helps CEOs grow and scale with new knowledge and methods. It was founded on the belief that what CEOs need most is the constant renewal of strategy." },
  groups: [
    {
      label: { ko: "교육 및 연구", en: "Education & Research" },
      items: [
        { ko: "CEO비즈니스스쿨 설립총장 · 의장", en: "Founding President & Chair, CEO Business School" },
        { ko: "서울과학종합대학원(aSSIST) 학사부총장", en: "Vice President (Academics), aSSIST University" },
        { ko: "aSSIST 경영학 박사과정 주임교수", en: "Lead Professor, PhD in Management, aSSIST" },
        { ko: "aSSIST AI전략경영 · 크립토 · 디지털전략기획 MBA 주임교수", en: "Lead Professor, AI Strategy / Crypto / Digital Strategy MBAs, aSSIST" },
        { ko: "aSSIST AI CEO과정 · CEO전략최신화과정 주임교수", en: "Lead Professor, AI CEO & Executive Strategy Renewal programs" },
        { ko: "환경재단 4차산업혁명 리더십과정 주임교수 (1~10기 총괄)", en: "Lead Professor, Green Foundation 4IR Leadership (cohorts 1–10)" },
        { ko: "환경재단 AI 리더십과정 주임교수 (2026.2~)", en: "Lead Professor, Green Foundation AI Leadership (from Feb 2026)" },
        { ko: "한국시스템다이내믹스학회 회장", en: "President, Korea System Dynamics Society" },
        { ko: "AI고용학회 회장", en: "President, AI Employment Society" },
      ],
    },
    {
      label: { ko: "경영 및 사회봉사", en: "Leadership & Service" },
      items: [
        { ko: "CEO클럽 회장", en: "Chair, CEO Club" },
        { ko: "CEO경제신문 발행인", en: "Publisher, CEO Economy News" },
        { ko: "이투스 창업자 및 CEO", en: "Founder & CEO, Etoos" },
        { ko: "환경재단 이사", en: "Board Director, Korea Green Foundation" },
        { ko: "한겨레신문 사외이사", en: "Outside Director, The Hankyoreh" },
        { ko: "한국사회투자 투자고문", en: "Investment Advisor, Korea Social Investment" },
        { ko: "WORLD BANK · 코오롱 · 효성 · KT&G 등 다수 기업 전략 자문", en: "Strategy advisor to the World Bank, Kolon, Hyosung, KT&G and others" },
      ],
    },
    {
      label: { ko: "학력", en: "Education" },
      items: [
        { ko: "서울대학교 공과대학 응용화학부", en: "BS, Applied Chemistry, Seoul National University" },
        { ko: "중국 장강경영대학원(CKGSB) EMBA", en: "EMBA, Cheung Kong Graduate School of Business (CKGSB)" },
        { ko: "aSSIST 경영학 박사 (토큰이코노미 설계와 마케팅 전략)", en: "PhD in Management, aSSIST (token-economy design & marketing strategy)" },
      ],
    },
  ],
};

const FACULTY = [
  {
    name: { ko: "안중호 교수", en: "Prof. Ahn Jung-ho" },
    role: { ko: "AI · 디지털 마케팅 전문가", en: "AI & Digital Marketing Expert" },
    photo: undefined as string | undefined,
    cvUrl: undefined as string | undefined,
    cv: [
      { ko: "CEO비즈니스스쿨 AI전공 교수", en: "Professor of AI, CEO Business School" },
      { ko: "대홍기획 AI 마케팅 총괄", en: "Head of AI Marketing, Daehong Communications" },
      { ko: "대홍기획 이커머스 데이터 분석", en: "E-commerce Data Analytics, Daehong Communications" },
      { ko: "대홍기획 CRM · 그로스 전략", en: "CRM & Growth Strategy, Daehong Communications" },
      { ko: "포항공대 졸업 · 국민대 빅데이터 석사", en: "BS POSTECH · MS in Big Data, Kookmin University" },
      { ko: "서울과학종합대학원 박사", en: "PhD, aSSIST University" },
    ],
  },
  {
    name: { ko: "한상도 교수", en: "Prof. Han Sang-do" },
    role: { ko: "AI · 자연어처리(NLP) 전문가", en: "AI & NLP Expert" },
    photo: undefined as string | undefined,
    cvUrl: undefined as string | undefined,
    cv: [
      { ko: "CEO비즈니스스쿨 AI전공 교수", en: "Professor of AI, CEO Business School" },
      { ko: "OpenAI GPT Hackathon 세계 대회 우승", en: "Winner, OpenAI GPT Global Hackathon" },
      { ko: "포항공대 컴퓨터공학 박사수료", en: "PhD Candidate in CS, POSTECH" },
      { ko: "Mae-Bara CEO", en: "CEO, Mae-Bara" },
      { ko: "前 TmaxAI Research Director", en: "Former Research Director, TmaxAI" },
      { ko: "前 Naver Corp Internship", en: "Former Intern, Naver Corp" },
    ],
  },
  {
    name: { ko: "이승현 교수", en: "Prof. Lee Seung-hyun" },
    role: { ko: "AI전략 전문가", en: "AI Strategy Expert" },
    photo: undefined as string | undefined,
    cvUrl: undefined as string | undefined,
    cv: [
      { ko: "대통령직속 디지털플랫폼정부위원회 AI플랫폼혁신국장", en: "Director of AI Platform Innovation, Presidential Committee on Digital Platform Government" },
      { ko: "알파카랩(Alpaca Lab) 대표 (AX Consulting)", en: "CEO, Alpaca Lab (AX Consulting)" },
      { ko: "라이너(LINER) AI Evangelist", en: "AI Evangelist, LINER" },
      { ko: "가천대학교 스타트업칼리지 겸임교수", en: "Adjunct Professor, Startup College, Gachon University" },
      { ko: "국민경제자문회의 AI경제정책 자문단", en: "Advisor, National Economic Advisory Council (AI economic policy)" },
      { ko: "저서: 『AI 국부론』(2026)", en: "Author, “The Wealth of AI Nations” (2026)" },
    ],
  },
  {
    name: { ko: "김기용 교수", en: "Prof. Kim Ki-yong" },
    role: { ko: "IPO 전략 전문가", en: "IPO Strategy Expert" },
    photo: undefined as string | undefined,
    cvUrl: undefined as string | undefined,
    cv: [
      { ko: "CEO비즈니스스쿨 자문교수", en: "Advisory Professor, CEO Business School" },
      { ko: "前 한국거래소 코스닥 심사부", en: "Former, KOSDAQ Review Division, Korea Exchange" },
      { ko: "한국거래소 상장심사 · 기술특례기업 상장 전문", en: "Listing review and tech-special listings, Korea Exchange" },
      { ko: "2000년~ 유가증권 · 코스닥 상장제도 수행", en: "KOSPI/KOSDAQ listing systems since 2000" },
      { ko: "IPO · 스팩합병상장 · 공시 전문가", en: "Expert in IPOs, SPAC-merger listings and disclosure" },
    ],
  },
];

const T = {
  desc: { ko: "혁신의 최전선에서 연구하고 교육하는 전문가 집단.", en: "A group of experts researching and teaching at the frontier of innovation." },
  founder: { ko: "설립자", en: "Founder" },
  faculty: { ko: "교수진", en: "Faculty" },
  facultyDesc: { ko: "산업 현장과 AI 연구를 잇는 전문가들이 함께합니다.", en: "Experts bridging industry practice and AI research." },
  viewCv: { ko: "CV 보기", en: "View CV" },
  cvSoon: { ko: "CV 준비 중", en: "CV coming soon" },
  ctaTitle: { ko: "함께 가르칠 전문가를 찾습니다", en: "We are looking for experts to teach with us" },
  ctaBtn: { ko: "교수진 문의", en: "Faculty inquiry" },
};
/* ==================================== */

export default async function Page() {
  const locale = await getLocale();
  const imgs = await getSiteImageMap();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      <PageHeader eyebrow="Faculty" title={p(T.faculty)} desc={p(T.desc)} />

      {/* 설립자 */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="01" kicker="Founder" title={p(T.founder)} />
        <div className="mt-10 grid gap-10 border-t border-line pt-10 md:grid-cols-[0.8fr_1.6fr]">
          <div>
            <Placeholder label="Photo" src={imgs.faculty_founder ?? FOUNDER.photo} alt={p(FOUNDER.name)} className="aspect-[3/4]" />
            <div className="mt-6 font-serif text-3xl font-semibold text-ink">{p(FOUNDER.name)}</div>
            <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.15em] text-accent">{p(FOUNDER.role)}</div>
            <div className="mt-1 font-mono text-[11px] tracking-[0.05em] text-muted">{p(FOUNDER.tag)}</div>
            <p className="mt-6 text-balance text-sm leading-relaxed text-muted"><Balanced text={p(FOUNDER.intro)} /></p>
          </div>
          <div className="space-y-8">
            {FOUNDER.groups.map((g) => (
              <div key={g.label.ko} className="border-t border-line pt-5">
                <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{p(g.label)}</div>
                <ul className="mt-4 space-y-2">
                  {g.items.map((it, i) => (
                    <li key={i} className="flex gap-3 text-[13px] leading-relaxed text-ink">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-line" />
                      <span>{p(it)}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 교수진 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <SectionHead index="02" kicker="Faculty" title={p(T.faculty)} desc={p(T.facultyDesc)} />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {FACULTY.map((f, i) => (
              <div key={f.name.ko} className="flex flex-col bg-surface p-7">
                <Placeholder label="Photo" src={imgs[`faculty_${i}`] ?? f.photo} alt={p(f.name)} className="aspect-[4/5]" />
                <div className="mt-6 font-serif text-xl font-semibold text-ink">{p(f.name)}</div>
                <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.12em] text-accent">{p(f.role)}</div>
                <ul className="mt-5 flex-1 space-y-2">
                  {f.cv.map((c, i) => (
                    <li key={i} className="flex gap-2 text-[13px] leading-relaxed text-muted">
                      <span className="mt-2 h-1 w-1 shrink-0 bg-line" />
                      <span>{p(c)}</span>
                    </li>
                  ))}
                </ul>
                {f.cvUrl ? (
                  <a
                    href={f.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 inline-block self-start border-b border-ink/30 pb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent hover:text-accent"
                  >
                    {p(T.viewCv)} →
                  </a>
                ) : (
                  <span className="mt-6 inline-block self-start font-mono text-[11px] uppercase tracking-[0.12em] text-muted/60">
                    {p(T.cvSoon)}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner eyebrow="Teach With Us" title={p(T.ctaTitle)} button={{ href: "/contact", label: `${p(T.ctaBtn)} →` }} />
    </main>
  );
}
