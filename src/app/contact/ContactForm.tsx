"use client";

import { useActionState } from "react";
import type { Locale } from "@/lib/locale";
import { submitContact, type ContactState } from "./actions";

/* ===== 문의 유형 / 라벨 (ko/en) ===== */
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

const T = {
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
  sending: { ko: "전송 중…", en: "Sending…" },
  okMsg: { ko: "문의가 정상적으로 접수되었습니다. 빠르게 연락드리겠습니다.", en: "Your inquiry has been received. We'll get back to you shortly." },
  namePh: { ko: "이름", en: "Name" },
  companyPh: { ko: "회사명", en: "Company" },
  titlePh: { ko: "직책", en: "Title" },
};

const inputCls =
  "w-full border border-line bg-paper px-4 py-3 text-sm text-ink placeholder:text-muted focus:border-accent focus:outline-none";
const labelCls = "font-mono text-[11px] uppercase tracking-[0.15em] text-muted";

const initialState: ContactState = { status: "idle" };

export default function ContactForm({ locale }: { locale: Locale }) {
  const p = (x: { ko: string; en: string }) => x[locale];
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  // 접수 완료 화면
  if (state.status === "ok") {
    return (
      <div className="border-t border-ink/80 pt-10">
        <div className="border border-accent/30 bg-accent/5 p-8">
          <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-accent">
            {locale === "ko" ? "접수 완료" : "Received"}
          </div>
          <p className="mt-3 text-lg font-semibold text-ink">{p(T.okMsg)}</p>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="border-t border-ink/80 pt-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelCls}>{p(T.name)}</label>
          <input id="name" name="name" type="text" required autoComplete="name" className={`mt-2 ${inputCls}`} placeholder={p(T.namePh)} />
        </div>
        <div>
          <label htmlFor="company" className={labelCls}>{p(T.company)}</label>
          <input id="company" name="company" type="text" autoComplete="organization" className={`mt-2 ${inputCls}`} placeholder={p(T.companyPh)} />
        </div>
        <div>
          <label htmlFor="title" className={labelCls}>{p(T.title)}</label>
          <input id="title" name="title" type="text" autoComplete="organization-title" className={`mt-2 ${inputCls}`} placeholder={p(T.titlePh)} />
        </div>
        <div>
          <label htmlFor="phone" className={labelCls}>{p(T.phone)}</label>
          <input id="phone" name="phone" type="tel" required autoComplete="tel" inputMode="tel" className={`mt-2 ${inputCls}`} placeholder="010-0000-0000" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="email" className={labelCls}>{p(T.email)}</label>
          <input id="email" name="email" type="email" required autoComplete="email" inputMode="email" className={`mt-2 ${inputCls}`} placeholder="email@example.com" />
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="type" className={labelCls}>{p(T.type)}</label>
          <select id="type" name="type" required defaultValue="" className={`mt-2 ${inputCls}`}>
            <option value="" disabled>{p(T.typePlaceholder)}</option>
            {INQUIRY_TYPES.map((it) => (
              <option key={it.ko} value={p(it)}>{p(it)}</option>
            ))}
          </select>
        </div>
        <div className="sm:col-span-2">
          <label htmlFor="message" className={labelCls}>{p(T.message)}</label>
          <textarea id="message" name="message" required rows={6} maxLength={2000} className={`mt-2 ${inputCls}`} placeholder={p(T.messagePlaceholder)} />
        </div>
      </div>

      <label htmlFor="consent" className="mt-6 flex items-start gap-3 text-sm text-muted">
        <input id="consent" name="consent" type="checkbox" required className="mt-1" />
        {p(T.consent)}
      </label>

      {state.status === "error" && (
        <p role="alert" className="mt-6 border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <button
        type="submit"
        disabled={pending}
        className="mt-8 bg-navy px-8 py-4 text-sm font-medium text-paper transition-colors hover:bg-ink disabled:opacity-50"
      >
        {pending ? p(T.sending) : `${p(T.send)} →`}
      </button>
    </form>
  );
}
