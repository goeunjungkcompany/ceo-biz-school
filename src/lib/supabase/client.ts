"use client";

import { createBrowserClient } from "@supabase/ssr";

/**
 * 클라이언트 컴포넌트(브라우저)용 Supabase 클라이언트.
 * NEXT_PUBLIC_ 값만 사용합니다 (브라우저에 노출되어도 안전한 anon key).
 */
export function createSupabaseBrowserClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
