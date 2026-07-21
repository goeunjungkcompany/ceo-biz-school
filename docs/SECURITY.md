# 보안·품질 점검 노트

2026-07-21 코드리뷰 대응 내역과, 사람이 직접 해줘야 하는 후속 작업 정리.

## ✅ 코드에서 고친 것

| 항목 | 내용 | 파일 |
|---|---|---|
| 회원 권한 상승 차단 | `profiles` 컬럼 단위 권한으로 일반 사용자의 `role` 자가수정 차단. update 정책에 `with check` 추가 | `supabase/schema.sql` |
| 익명 등록 1차 방어 | `contacts`·`advisory_requests` 입력 길이 CHECK 제약 추가 | `supabase/schema.sql` |
| 영문 전환 완성 | 홈 히어로 제목·모바일 메뉴 "현재 페이지" 라벨 다국어화 | `page.tsx`, `nav.ts`, `Header.tsx` |
| 오래된 날짜 자동 처리 | 공지 마감일 지나면 "모집중"→"마감" 자동 전환 | `page.tsx` |
| 폼 접근성 | 라벨-입력칸 `htmlFor`/`id` 연결, `name`/`type`/`required` 추가 | `contact/page.tsx` |
| SEO | `sitemap.ts`·`robots.ts`·자동 OG 이미지·openGraph/twitter 메타데이터 | `app/*`, `layout.tsx` |

## ⚠️ 사람이 직접 해야 하는 후속 작업

1. **Supabase에 스키마 다시 적용** — `supabase/schema.sql` 을 Supabase 대시보드 > SQL Editor 에 붙여넣고 실행해야 위 DB 보안 변경이 실제 서버에 반영됨. (코드만 고친 상태로는 DB에 적용 안 됨)

2. **폼 연동 시 스팸 방어** — 문의/자문 폼을 실제로 연결할 때:
   - 클라이언트에서 DB 직접 insert ❌ → 서버 액션/Edge Function 경유
   - 서버에서 형식·필수값 검증 + rate limit(IP·시간당 N건)
   - CAPTCHA(예: Cloudflare Turnstile) 통과 후에만 저장
   - 서버 경유로 바꾸면 `*_insert_anyone` (anon insert) 정책 제거

3. **배포 도메인 설정** — 도메인 확정되면 `NEXT_PUBLIC_SITE_URL` 환경변수 설정 (sitemap/robots/OG에 사용).

## 📌 알려진 이슈 (당장 조치 불가)

- **npm audit: PostCSS moderate 2건** — Next.js 16 내부 의존성(`next` → `postcss <8.5.10`)의 CSS Stringify XSS 이슈.
  - 자동 수정 없음. `npm audit fix --force` 는 `next@9` 로 다운그레이드하므로 **실행 금지**.
  - 일반 프로덕션 빌드에 실질 영향 낮음(moderate). Next.js 패치 릴리스에서 해결될 때까지 대기.
  - 조치: 주기적으로 `npm outdated next` 확인 후 최신 패치로 업데이트.
