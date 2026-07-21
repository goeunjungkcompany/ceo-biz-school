import Link from "next/link";

/** 페이지 공통 좌우 여백 컨테이너 */
export const WRAP = "mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16";

/** 페이지 상단 헤더 (eyebrow + 제목 + 설명 + 은은한 그리드 배경) */
export function PageHeader({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: React.ReactNode;
  desc?: string;
}) {
  return (
    <section className="border-b border-line">
      <div
        className={`${WRAP} pt-24 pb-16 lg:pt-28`}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(20,38,63,0.04) 1px, transparent 1px)",
          backgroundSize: "84px 100%",
        }}
      >
        <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
          {eyebrow}
        </div>
        <h1 className="mt-6 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl">
          {title}
        </h1>
        {desc && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{desc}</p>
        )}
      </div>
    </section>
  );
}

/** 섹션 제목 (번호 — 영문 kicker + 국문 제목 + 설명) */
export function SectionHead({
  index,
  kicker,
  title,
  desc,
}: {
  index: string;
  kicker: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="border-t border-ink/80 pt-6">
      <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
        {index} — {kicker}
      </div>
      <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-[2.5rem]">
        {title}
      </h2>
      {desc && <p className="mt-5 max-w-2xl leading-relaxed text-muted">{desc}</p>}
    </div>
  );
}

/**
 * 이미지 플레이스홀더.
 * 실제 이미지 교체법: /public 에 파일을 넣고 src="/파일명.jpg" 전달 → 자동으로 이미지 표시.
 */
export function Placeholder({
  label = "Image",
  src,
  alt = "",
  className = "aspect-[3/4]",
}: {
  label?: string;
  src?: string;
  alt?: string;
  className?: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={alt} className={`${className} w-full object-cover`} />;
  }
  return (
    <div
      className={`${className} flex w-full items-center justify-center border border-line bg-surface font-mono text-[11px] uppercase tracking-[0.15em] text-muted`}
    >
      {label}
    </div>
  );
}

/** 하단 딥네이비 CTA 배너 */
export function CtaBanner({
  eyebrow,
  title,
  sub,
  button,
}: {
  eyebrow: string;
  title: React.ReactNode;
  sub?: string;
  button: { href: string; label: string };
}) {
  return (
    <section className="bg-navy text-paper">
      <div
        className={`${WRAP} flex flex-col items-start gap-8 py-20 md:flex-row md:items-end md:justify-between`}
      >
        <div>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            {eyebrow}
          </div>
          <h2 className="mt-5 max-w-2xl font-serif text-3xl font-semibold leading-tight tracking-tight sm:text-[2.5rem]">
            {title}
          </h2>
          {sub && <p className="mt-4 max-w-xl text-paper/70">{sub}</p>}
        </div>
        <Link
          href={button.href}
          className="shrink-0 bg-accent px-8 py-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          {button.label}
        </Link>
      </div>
    </section>
  );
}
