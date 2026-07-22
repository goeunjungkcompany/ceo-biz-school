import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "./server";

/**
 * 관리자 전용 가드.
 * - 로그인 안 됐으면 /login 으로,
 * - 로그인은 됐지만 role !== 'admin' 이면 홈(/)으로 보낸다.
 * - 통과하면 { user, supabase } 반환.
 *
 * 관리자 계정 만드는 법: 회원가입 후 Supabase 대시보드 Table Editor > profiles 에서
 * 본인 행의 role 을 'admin' 으로 바꾼다. (일반 사용자는 트리거가 막으므로 대시보드에서만 가능)
 */
export async function requireAdmin() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") redirect("/");

  return { user, supabase };
}

/** 리다이렉트 없이 admin 여부만 확인 (헤더 등 UI 분기용). */
export async function isAdminUser(): Promise<boolean> {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return false;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();
  return profile?.role === "admin";
}
