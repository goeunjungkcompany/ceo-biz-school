import { WRAP, PageHeader } from "@/components/ui";
import { getLocale, pick } from "@/lib/locale";
import ContactForm from "./ContactForm";

export const metadata = { title: "문의 | CEO Business School" };

/* ===== 연락처 (ko/en) ===== */
const CONTACT_INFO = [
  { k: { ko: "이메일", en: "Email" }, v: { ko: "ceoclub@ceobizschool.kr", en: "ceoclub@ceobizschool.kr" } },
  { k: { ko: "관악캠퍼스", en: "Gwanak Campus" }, v: { ko: "서울대학교 교수회관 (65동)", en: "SNU Faculty Hall (Bldg 65)" } },
  { k: { ko: "용산캠퍼스", en: "Yongsan Campus" }, v: { ko: "케이잡스 · 한강대로80길 11-49", en: "K-Jobs · 11-49 Hangang-daero 80-gil" } },
  { k: { ko: "강남캠퍼스", en: "Gangnam Campus" }, v: { ko: "DB증권 알파플러스클럽 · 테헤란로 432", en: "DB Securities Alpha Plus Club · 432 Teheran-ro" } },
];

const T = {
  desc: { ko: "지식과 전략의 최신화, 지금 시작하세요. 교육·자문·제휴 문의를 받습니다.", en: "Renew your knowledge and strategy today. We welcome education, advisory and partnership inquiries." },
  reach: { ko: "Reach Us", en: "Reach Us" },
};

export default async function Page() {
  const locale = await getLocale();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      <PageHeader eyebrow="Contact" title={locale === "ko" ? "문의" : "Contact"} desc={p(T.desc)} />

      <section className={`${WRAP} grid gap-14 py-20 lg:grid-cols-[1.5fr_1fr]`}>
        {/* 폼 (실제 전송 → contacts 테이블) */}
        <ContactForm locale={locale} />

        {/* 연락처 */}
        <aside className="border-t border-ink/80 pt-10">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">{T.reach.en}</div>
          <div className="mt-8 space-y-7">
            {CONTACT_INFO.map((c) => (
              <div key={c.k.ko}>
                <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{p(c.k)}</div>
                <div className="mt-2 text-ink">{p(c.v)}</div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </main>
  );
}
