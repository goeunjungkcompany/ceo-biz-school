import { createClient } from "@supabase/supabase-js";

/**
 * 서버 전용 관리자 클라이언트 (service_role 키).
 * RLS를 우회하므로 절대 클라이언트/브라우저로 노출 금지.
 * 관리자 화면·백오피스 조회 등 신뢰된 서버 코드에서만 사용.
 */
export function createSupabaseAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
