import Link from "next/link";

const WRAP = "mx-auto w-full max-w-[1240px] px-6 sm:px-10 lg:px-16";

export default function PageScaffold({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <main>
      {/* 페이지 헤더 */}
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
          <h1 className="mt-6 font-serif text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
            {title}
          </h1>
          {desc && (
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">{desc}</p>
          )}
        </div>
      </section>

      {/* 준비 중 본문 */}
      <section className={`${WRAP} py-24`}>
        <div className="border-t border-line pt-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            In Preparation
          </div>
          <p className="mt-4 max-w-xl text-muted">
            이 페이지는 준비 중입니다. 콘텐츠를 차차 채워갑니다.
          </p>
          <Link
            href="/"
            className="group mt-8 inline-flex items-center gap-2 border-b border-ink/30 pb-1 text-sm text-ink hover:border-accent hover:text-accent"
          >
            홈으로 돌아가기
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </section>
    </main>
  );
}
