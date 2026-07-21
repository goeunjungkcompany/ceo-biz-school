"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";

export type ContactState =
  | { status: "idle" }
  | { status: "ok" }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 문의 폼 제출 → contacts 테이블에 저장 */
export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const name = String(formData.get("name") ?? "").trim();
  const company = String(formData.get("company") ?? "").trim();
  const title = String(formData.get("title") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const type = String(formData.get("type") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();
  const consent = formData.get("consent") === "on";

  // --- 서버 검증 (DB CHECK 제약과 동일 기준) ---
  if (!name || name.length > 100) return err("이름을 확인해 주세요.");
  if (!phone || phone.length > 30) return err("연락처를 확인해 주세요.");
  if (!email || !EMAIL_RE.test(email) || email.length > 160)
    return err("이메일 형식을 확인해 주세요.");
  if (!type) return err("문의 유형을 선택해 주세요.");
  if (!message || message.length > 2000)
    return err("문의 내용을 확인해 주세요. (최대 2000자)");
  if (!consent) return err("개인정보 수집 및 이용에 동의해 주세요.");

  // contacts 테이블엔 company/title/type 컬럼이 없어 message 앞에 함께 기록
  const header = `[유형] ${type}` +
    (company ? ` / 회사: ${company}` : "") +
    (title ? ` / 직책: ${title}` : "");
  const fullMessage = `${header}\n\n${message}`;
  if (fullMessage.length > 2000)
    return err("문의 내용이 너무 깁니다. 조금 줄여 주세요.");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("contacts").insert({
    name,
    email,
    phone,
    message: fullMessage,
  });

  if (error) {
    console.error("[contact] insert failed:", error.message);
    return err("전송 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
  }

  return { status: "ok" };
}

function err(message: string): ContactState {
  return { status: "error", message };
}
