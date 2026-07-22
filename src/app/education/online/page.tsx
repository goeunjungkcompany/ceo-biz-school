import { WRAP, PageHeader, SectionHead, CtaBanner } from "@/components/ui";
import { getLocale, pick } from "@/lib/locale";

export const metadata = { title: "온라인 교육 | CEO Business School" };

/* ===== 원본 교차검증 반영 (ko/en) ===== */
const FEATURES = [
  { no: "01", title: { ko: "VOD 무제한 수강", en: "Unlimited VOD" }, desc: { ko: "원하는 시간에 반복 학습 가능", en: "Rewatch anytime, as often as you like" } },
  { no: "02", title: { ko: "실전 사례 중심", en: "Case-based" }, desc: { ko: "이론이 아닌 현장 중심 교육", en: "Field-driven, not theory" } },
  { no: "03", title: { ko: "경영 인사이트", en: "Business Insight" }, desc: { ko: "부가 창출되는 경영 전략", en: "Strategy that generates wealth" } },
];

const PLATFORMS = [
  { no: "01", name: { ko: "케이잡스", en: "K-Jobs" }, desc: { ko: "케이잡스 라이브클래스에서 '富의 감각' VOD 강좌를 수강. 언제 어디서나 반복 학습이 가능합니다.", en: "Take the Sense of Wealth VOD on K-Jobs LiveClass — rewatch anytime, anywhere." }, tags: [{ ko: "VOD 무제한 반복 수강", en: "Unlimited replays" }, { ko: "수료증 발급", en: "Certificate" }, { ko: "모바일 학습 지원", en: "Mobile learning" }], href: "#" },
  { no: "02", name: { ko: "클래스유", en: "ClassU" }, desc: { ko: "클래스유에서 '富의 감각' VOD 강좌를 수강. 단계별 커리큘럼으로 효과적인 학습이 가능합니다.", en: "Take the Sense of Wealth VOD on ClassU — a step-by-step curriculum." }, tags: [{ ko: "VOD 무제한 반복 수강", en: "Unlimited replays" }, { ko: "단계별 학습 구조", en: "Step-by-step" }, { ko: "체계적 커리큘럼", en: "Structured curriculum" }], href: "#" },
  { no: "03", name: { ko: "인프런", en: "Inflearn" }, desc: { ko: "인프런에서 '富의 감각' VOD 강좌를 수강. 실전 사례 중심의 경영 전략을 배울 수 있습니다.", en: "Take the Sense of Wealth VOD on Inflearn — case-driven management strategy." }, tags: [{ ko: "VOD 무제한 반복 수강", en: "Unlimited replays" }, { ko: "실전 사례 중심", en: "Case-based" }, { ko: "모바일 학습 지원", en: "Mobile learning" }], href: "#" },
];

const CURRICULUM = [
  { ko: "富의 기회를 포착하는 법 — 현금 창출의 본질", en: "Spotting wealth opportunities — the essence of cash generation" },
  { ko: "富를 확장하는 법 — 사업 생애주기와 경쟁 전략", en: "Scaling wealth — business life cycle and competitive strategy" },
  { ko: "富가 계속 창출되게 하는 법 — 지속 가능한 성장", en: "Sustaining wealth — durable, compounding growth" },
  { ko: "포지셔닝과 가격 전략의 이해", en: "Understanding positioning and pricing strategy" },
];

const AUDIENCE = [
  { ko: "CEO 및 경영진", en: "CEOs and executives" },
  { ko: "예비 창업가 및 투자자", en: "Aspiring founders and investors" },
  { ko: "경영 전략에 관심 있는 직장인", en: "Professionals interested in strategy" },
];

const T = {
  desc: { ko: "혁신의 최전선에서 연구한 최신 전략을 언제 어디서나 학습합니다.", en: "Learn the latest strategies from the frontier of innovation, anytime, anywhere." },
  courseKicker: { ko: "VOD 강좌", en: "VOD Course" },
  courseTitle: { ko: "‘富의 감각’ 온라인 VOD 강좌", en: "‘The Sense of Wealth’ Online VOD" },
  courseDesc: { ko: "김문수 교수의 ‘富의 감각’ 온라인 강좌는 동일한 내용의 VOD 강좌로, 아래 3개 플랫폼에서 수강하실 수 있습니다. 라이브 강의 없이 원하는 시간에 자유롭게 반복 학습할 수 있어 바쁜 경영자에게 최적화된 과정입니다.", en: "Prof. Munsoo Kim's ‘Sense of Wealth’ is offered as identical VOD on the three platforms below. With no live sessions, you can rewatch freely at any time — ideal for busy executives." },
  platforms: { ko: "수강 플랫폼 선택", en: "Choose a Platform" },
  platformsDesc: { ko: "동일한 ‘富의 감각’ VOD 강좌를 아래 3개 플랫폼에서 수강하실 수 있습니다.", en: "The same ‘Sense of Wealth’ VOD is available on all three platforms below." },
  learn: { ko: "온라인 학습하기", en: "Start learning" },
  contentTitle: { ko: "강좌 내용 안내", en: "Course Details" },
  contentHead: { ko: "富의 감각 — 경영 전략 강좌", en: "The Sense of Wealth — Strategy Course" },
  contentDesc: { ko: "CEO와 경영자를 위한 핵심 경영 전략 강좌입니다. 현금 창출의 본질부터 사업 생애주기, 경쟁 전략, 지속 가능한 성장까지 — 실전에서 바로 적용할 수 있는 경영 인사이트를 제공합니다.", en: "A core strategy course for CEOs and executives — from the essence of cash generation to the business life cycle, competitive strategy and sustainable growth, with insight you can apply immediately." },
  learnList: { ko: "학습 내용", en: "What you'll learn" },
  audience: { ko: "수강 대상", en: "Who it's for" },
  ctaTitle: { ko: "지금, 나만의 속도로 시작하세요", en: "Start today, at your own pace" },
  ctaSub: { ko: "온라인 교육 과정에 대한 문의를 남겨주세요.", en: "Leave us a note about the online courses." },
  ctaBtn: { ko: "교육 문의", en: "Course inquiry" },
};
/* ==================================== */

export default async function Page() {
  const locale = await getLocale();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      <PageHeader eyebrow="Online Education" title={locale === "ko" ? "온라인 교육" : "Online Education"} desc={p(T.desc)} />

      {/* 강좌 소개 + 특징 */}
      <section className={`${WRAP} py-20`}>
        <div className="border-t border-ink/80 pt-6">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{p(T.courseKicker)}</div>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-[2.5rem]">{p(T.courseTitle)}</h2>
          <p className="mt-5 max-w-3xl leading-relaxed text-muted">{p(T.courseDesc)}</p>
        </div>
        <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
          {FEATURES.map((f) => (
            <div key={f.no} className="bg-paper p-7">
              <span className="font-mono text-xs text-accent">{f.no}</span>
              <div className="mt-6 font-serif text-lg font-semibold text-ink">{p(f.title)}</div>
              <p className="mt-2 text-balance text-sm leading-relaxed text-muted">{p(f.desc)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 플랫폼 */}
      <section className="border-y border-line bg-surface">
        <div className={`${WRAP} py-20`}>
          <SectionHead index="01" kicker="Platforms" title={p(T.platforms)} desc={p(T.platformsDesc)} />
          <div className="mt-10 grid gap-px border border-line bg-line md:grid-cols-3">
            {PLATFORMS.map((pl) => (
              <div key={pl.no} className="flex flex-col bg-surface p-7">
                <span className="font-mono text-xs text-accent">{pl.no}</span>
                <div className="mt-6 font-serif text-xl font-semibold text-ink">{p(pl.name)}</div>
                <p className="mt-3 text-balance text-sm leading-relaxed text-muted">{p(pl.desc)}</p>
                <ul className="mt-5 flex-1 space-y-2">
                  {pl.tags.map((tg, i) => (
                    <li key={i} className="flex gap-2 text-[13px] text-muted"><span className="mt-2 h-1 w-1 shrink-0 bg-accent" />{p(tg)}</li>
                  ))}
                </ul>
                <a href={pl.href} className="mt-6 inline-block self-start border-b border-ink/30 pb-1 font-mono text-[11px] uppercase tracking-[0.12em] text-ink transition-colors hover:border-accent hover:text-accent">{p(T.learn)} →</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 강좌 내용 */}
      <section className={`${WRAP} py-20`}>
        <SectionHead index="02" kicker="Course Details" title={p(T.contentTitle)} />
        <div className="mt-10 border-t border-line pt-10">
          <div className="font-serif text-2xl font-semibold text-ink">{p(T.contentHead)}</div>
          <p className="mt-4 max-w-3xl leading-relaxed text-muted">{p(T.contentDesc)}</p>
          <div className="mt-10 grid gap-10 md:grid-cols-2">
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{p(T.learnList)}</div>
              <ul className="mt-5 space-y-3">
                {CURRICULUM.map((c, i) => (
                  <li key={i} className="flex gap-3 border-b border-line pb-3 text-ink"><span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>{p(c)}</li>
                ))}
              </ul>
            </div>
            <div>
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">{p(T.audience)}</div>
              <ul className="mt-5 space-y-3">
                {AUDIENCE.map((a, i) => (
                  <li key={i} className="flex gap-3 border-b border-line pb-3 text-ink"><span className="mt-2 h-1 w-1 shrink-0 bg-accent" />{p(a)}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CtaBanner eyebrow="Enroll" title={p(T.ctaTitle)} sub={p(T.ctaSub)} button={{ href: "/contact", label: `${p(T.ctaBtn)} →` }} />
    </main>
  );
}
