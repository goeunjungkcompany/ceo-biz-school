import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * 요청마다 Supabase 세션(토큰) 을 갱신하고 쿠키를 최신화한다.
 * Next 16 의 proxy(구 middleware)에서 호출.
 */
export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // getUser() 호출이 만료된 토큰을 자동 갱신한다. (반드시 호출)
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // ── /admin 경로 edge 단계 방어 (레이아웃 가드와 이중 방어) ──
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin")) {
    // 로그인 안 됨 → 로그인 페이지로
    if (!user) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    // 로그인은 됐지만 관리자 아님 → 홈으로
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    if (profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return response;
}
