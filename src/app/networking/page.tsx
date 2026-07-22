import { WRAP, PageHeader, SectionHead, CtaBanner } from "@/components/ui";
import { getLocale, pick } from "@/lib/locale";

export const metadata = { title: "CEO클럽 | CEO Business School" };

/* ===== 원본 교차검증 반영 (ko/en) ===== */
const BENEFITS = [
  { no: "01", title: { ko: "프리미엄 네트워킹", en: "Premium Networking" }, desc: { ko: "대한민국 최고 경영진들과의 교류 및 인맥 형성", en: "Connect with Korea's top executives" } },
  { no: "02", title: { ko: "비즈니스 기회", en: "Business Opportunities" }, desc: { ko: "회원사 간 전략적 제휴 및 사업 협력 기회 발굴", en: "Strategic alliances and partnerships among members" } },
  { no: "03", title: { ko: "독점 콘텐츠", en: "Exclusive Content" }, desc: { ko: "CEO 클럽 회원 전용 교육 프로그램 및 세미나", en: "Members-only programs and seminars" } },
  { no: "04", title: { ko: "경영 인사이트", en: "Business Insight" }, desc: { ko: "최신 경영 트렌드와 성공 사례 공유", en: "The latest trends and success stories, shared" } },
];

const ACTIVITIES = [
  { no: "01", name: { ko: "CEO골프클럽", en: "CEO Golf Club" }, freq: { ko: "매월 4회", en: "4×/month" }, desc: { ko: "건강한 라운딩과 함께하는 경영진 네트워킹 및 친목 활동", en: "Executive networking over healthy rounds of golf" }, place: { ko: "수도권 프리미엄 골프장", en: "Premium courses, greater Seoul" } },
  { no: "02", name: { ko: "CEO독서클럽", en: "CEO Book Club" }, freq: { ko: "매월 1회", en: "Monthly" }, desc: { ko: "경영 서적 독서 토론 및 저자 초청 북 토크", en: "Book discussions and author talks on management" }, place: { ko: "서울대 교수회관", en: "SNU Faculty Hall" } },
  { no: "03", name: { ko: "CEO투자클럽", en: "CEO Investment Club" }, freq: { ko: "매월 1회", en: "Monthly" }, desc: { ko: "투자 정보 공유 및 전문가 강연, 투자 기회 발굴", en: "Investment insights, expert talks and deal flow" }, place: { ko: "방문기업 본사", en: "Host company HQ" } },
  { no: "04", name: { ko: "CEO회원의밤", en: "CEO Members' Night" }, freq: { ko: "매월 1회", en: "Monthly" }, desc: { ko: "저녁 식사와 함께하는 경영 전략 세미나 및 회원 교류", en: "A strategy seminar and member mixer over dinner" }, place: { ko: "서울 시내", en: "Central Seoul" } },
];

const T = {
  desc: { ko: "대한민국 최고 경영진의 프리미엄 네트워킹 플랫폼. CEO Business School 수료생들이 모여 지속적인 성장과 비즈니스 기회를 창출하는 독점적 커뮤니티입니다.", en: "A premium network for Korea's top executives — an exclusive community of CEO Business School alumni creating continuous growth and business opportunity." },
  benefits: { ko: "CEO 클럽 혜택", en: "Member Benefits" },
  benefitsDesc: { ko: "회원만이 누릴 수 있는 특별한 가치.", en: "Value reserved for members only." },
  activities: { ko: "주요 활동", en: "Activities" },
  activitiesDesc: { ko: "지속적인 학습과 교류의 기회.", en: "Continuous learning and connection." },
  place: { ko: "장소", en: "Venue" },
  ctaTitle: { ko: "대한민국 최고 경영진들과 함께 성장하세요", en: "Grow alongside Korea's top executives" },
  ctaBtn: { ko: "가입 문의", en: "Membership inquiry" },
};
/* ==================================== */

export default async function Page() {
  const locale = await getLocale();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      <PageHeader eyebrow="CEO Club" title={locale === "ko" ? "CEO클럽" : "CEO Club"} desc={p(T.desc)} />

      {/* 혜택 */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="01" kicker="Benefits" title={p(T.benefits)} desc={p(T.benefitsDesc)} />
        <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((b) => (
            <div key={b.no} className="bg-paper p-7">
              <span className="font-mono text-xs text-accent">{b.no}</span>
              <div className="mt-6 font-serif text-lg font-semibold text-ink">{p(b.title)}</div>
              <p className="mt-3 text-balance text-sm leading-relaxed text-muted">{p(b.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 주요 활동 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <SectionHead index="02" kicker="Activities" title={p(T.activities)} desc={p(T.activitiesDesc)} />
          <div className="mt-10 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {ACTIVITIES.map((a) => (
              <div key={a.no} className="flex flex-col bg-surface p-7">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-xs text-accent">{a.no}</span>
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{p(a.freq)}</span>
                </div>
                <div className="mt-6 font-serif text-lg font-semibold text-ink">{p(a.name)}</div>
                <p className="mt-3 flex-1 text-balance text-sm leading-relaxed text-muted">{p(a.desc)}</p>
                <div className="mt-5 border-t border-line pt-3 font-mono text-[11px] text-muted">{p(T.place)} · {p(a.place)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CtaBanner eyebrow="Join" title={p(T.ctaTitle)} button={{ href: "/contact", label: `${p(T.ctaBtn)} →` }} />
    </main>
  );
}
