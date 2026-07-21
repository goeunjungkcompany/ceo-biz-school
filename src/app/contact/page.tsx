import { WRAP, PageHeader } from "@/components/ui";
import { getLocale, pick } from "@/lib/locale";

export const metadata = { title: "문의 | CEO Business School" };

/* ===== 문의 유형 / 연락처 (ko/en) ===== */
const INQUIRY_TYPES = [
  { ko: "교육 프로그램 문의", en: "Education program inquiry" },
  { ko: "자문 문의", en: "Advisory inquiry" },
  { ko: "CEO 클럽 가입 문의", en: "CEO Club membership" },
  { ko: "출판물 관련 문의", en: "Publications inquiry" },
  { ko: "기업 제휴 문의", en: "Partnership inquiry" },
  { ko: "오프라인 캠퍼스 참여 신청", en: "Offline campus registration" },
  { ko: "출간 알림 신청", en: "Book release alerts" },
  { ko: "기타 문의", en: "Other inquiry" },
];

const CONTACT_INFO = [
  { k: { ko: "이메일", en: "Email" }, v: { ko: "ceoclub@ceobizschool.kr", en: "ceoclub@ceobizschool.kr" } },
  { k: { ko: "관악캠퍼스", en: "Gwanak Campus" }, v: { ko: "서울대학교 교수회관 (65동)", en: "SNU Faculty Hall (Bldg 65)" } },
  { k: { ko: "용산캠퍼스", en: "Yongsan Campus" }, v: { ko: "케이잡스 · 한강대로80길 11-49", en: "K-Jobs · 11-49 Hangang-daero 80-gil" } },
  { k: { ko: "강남캠퍼스", en: "Gangnam Campus" }, v: { ko: "DB증권 알파플러스클럽 · 테헤란로 432", en: "DB Securities Alpha Plus Club · 432 Teheran-ro" } },
];

const T = {
  desc: { ko: "지식과 전략의 최신화, 지금 시작하세요. 교육·자문·제휴 문의를 받습니다.", en: "Renew your knowledge and strategy today. We welcome education, advisory and partnership inquiries." },
  name: { ko: "이름 *", en: "Name *" },
  company: { ko: "회사명", en: "Company" },
  title: { ko: "직책", en: "Title" },
  phone: { ko: "연락처 *", en: "Phone *" },
  email: { ko: "이메일 *", en: "Email *" },
  type: { ko: "문의 유형 *", en: "Inquiry type *" },
  typePlaceholder: { ko: "문의 유형을 선택하세요", en: "Select an inquiry type" },
  message: { ko: "문의 내용 *", en: "Message *" },
  messagePlaceholder: { ko: "문의 내용을 입력하세요", en: "Write your message" },
  consent: { ko: "개인정보 수집 및 이용에 동의합니다. (필수)", en: "I agree to the collection and use of my personal information. (required)" },
  send: { ko: "문의 보내기", en: "Send inquiry" },
  note: { ko: "* 전송 기능은 연동 예정입니다.", en: "* Form submission will be connected soon." },
  reach: { ko: "Reach Us", en: "Reach Us" },
};
const namePh = { ko: "이름", en: "Name" };
const companyPh = { ko: "회사명", en: "Company" };
const titlePh = { ko: "직책", en: "Title" };
/* ==================================== */

const inputCls =
  "w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none";
const labelCls = "font-mono text-[11px] uppercase tracking-[0.15em] text-muted";

export default async function Page() {
  const locale = await getLocale();
  const p = (x: { ko: string; en: string }) => pick(locale, x);

  return (
    <main>
      <PageHeader eyebrow="Contact" title={locale === "ko" ? "문의" : "Contact"} desc={p(T.desc)} />

      <section className={`${WRAP} grid gap-14 py-20 lg:grid-cols-[1.5fr_1fr]`}>
        {/* 폼 */}
        <form className="border-t border-ink/80 pt-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label className={labelCls}>{p(T.name)}</label>
              <input className={`mt-2 ${inputCls}`} placeholder={p(namePh)} />
            </div>
            <div>
              <label className={labelCls}>{p(T.company)}</label>
              <input className={`mt-2 ${inputCls}`} placeholder={p(companyPh)} />
            </div>
            <div>
              <label className={labelCls}>{p(T.title)}</label>
              <input className={`mt-2 ${inputCls}`} placeholder={p(titlePh)} />
            </div>
            <div>
              <label className={labelCls}>{p(T.phone)}</label>
              <input className={`mt-2 ${inputCls}`} placeholder="010-0000-0000" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>{p(T.email)}</label>
              <input className={`mt-2 ${inputCls}`} placeholder="email@example.com" />
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>{p(T.type)}</label>
              <select className={`mt-2 ${inputCls}`} defaultValue="">
                <option value="" disabled>{p(T.typePlaceholder)}</option>
                {INQUIRY_TYPES.map((t) => (
                  <option key={t.ko} value={t.ko}>{p(t)}</option>
                ))}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className={labelCls}>{p(T.message)}</label>
              <textarea rows={6} className={`mt-2 ${inputCls}`} placeholder={p(T.messagePlaceholder)} />
            </div>
          </div>

          <label className="mt-6 flex items-start gap-3 text-sm text-muted">
            <input type="checkbox" className="mt-1" />
            {p(T.consent)}
          </label>

          <button type="button" className="mt-8 bg-navy px-8 py-4 text-sm font-medium text-paper transition-colors hover:bg-ink">
            {p(T.send)} →
          </button>
          <p className="mt-3 font-mono text-[11px] text-muted">{p(T.note)}</p>
        </form>

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
