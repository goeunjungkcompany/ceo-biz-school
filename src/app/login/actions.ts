"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AuthState =
  | { status: "idle" }
  | { status: "ok"; message: string }
  | { status: "error"; message: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** 로그인 */
export async function signIn(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!EMAIL_RE.test(email)) return err("이메일 형식을 확인해 주세요.");
  if (!password) return err("비밀번호를 입력해 주세요.");

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    if (error.message.toLowerCase().includes("email not confirmed"))
      return err("이메일 인증이 필요합니다. 받은 메일의 인증 링크를 확인해 주세요.");
    return err("이메일 또는 비밀번호가 올바르지 않습니다.");
  }

  redirect("/account");
}

/** 회원가입 */
export async function signUp(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || name.length > 100) return err("이름을 확인해 주세요.");
  if (!EMAIL_RE.test(email)) return err("이메일 형식을 확인해 주세요.");
  if (password.length < 8) return err("비밀번호는 8자 이상이어야 합니다.");

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { name } },
  });

  if (error) {
    if (error.message.toLowerCase().includes("already registered"))
      return err("이미 가입된 이메일입니다. 로그인해 주세요.");
    return err("가입 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.");
  }

  // 이메일 인증이 켜져 있으면 세션이 바로 생기지 않음
  if (data.session) redirect("/account");
  return {
    status: "ok",
    message: "가입 완료! 받은 메일의 인증 링크를 눌러 이메일을 확인한 뒤 로그인해 주세요.",
  };
}

/** 로그아웃 */
export async function signOut() {
  const supabase = await createSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

function err(message: string): AuthState {
  return { status: "error", message };
}
