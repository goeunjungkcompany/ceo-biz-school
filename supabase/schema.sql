-- ============================================================
-- CEO Business School — 초기 스키마 (Phase 0/1)
-- Supabase Dashboard > SQL Editor 에 붙여넣고 실행하세요.
-- 이후 Phase(결제/LMS/멤버십)의 테이블은 각 단계에서 추가합니다.
-- ============================================================

-- 공통: updated_at 자동 갱신 트리거 함수
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ------------------------------------------------------------
-- 1) profiles — 회원 프로필 (auth.users 와 1:1)
--    회원가입(Phase 2) 시 트리거로 자동 생성
-- ------------------------------------------------------------
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  name        text,
  company     text,
  title       text,               -- 직함 (대표, CEO 등)
  phone       text,
  role        text not null default 'member',  -- 'member' | 'admin'
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_profiles_updated on public.profiles;
create trigger trg_profiles_updated before update on public.profiles
  for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;

-- 본인 프로필만 조회/수정
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own" on public.profiles
  for select using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (auth.uid() = id)
  with check (auth.uid() = id);

-- ★ 권한 상승 방지 (중요)
-- RLS 정책만으로는 "어떤 컬럼을 바꿀 수 있는가"를 막지 못하므로,
-- 컬럼 단위 권한으로 일반 사용자가 role 을 스스로 바꾸는 것을 차단한다.
-- 일반 사용자(authenticated)는 아래 4개 컬럼만 수정 가능. role/id/created_at 등은 불가.
-- 관리자 기능은 service_role(RLS·컬럼권한 무시)로만 role 을 변경한다.
revoke update on public.profiles from anon, authenticated;
grant  update (name, company, title, phone) on public.profiles to authenticated;

-- auth.users 생성 시 profiles 자동 삽입 (Phase 2에서 활성화)
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, name)
  values (new.id, new.raw_user_meta_data->>'name');
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ------------------------------------------------------------
-- 2) advisory_requests — CEO 자문 신청 (로그인 불필요)
-- ------------------------------------------------------------
create table if not exists public.advisory_requests (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  company     text,
  title       text,               -- 직함
  phone       text not null,
  email       text,
  message     text,
  status      text not null default 'new',  -- 'new' | 'contacted' | 'done' | 'archived'
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_advisory_updated on public.advisory_requests;
create trigger trg_advisory_updated before update on public.advisory_requests
  for each row execute function public.set_updated_at();

alter table public.advisory_requests enable row level security;

-- 누구나 신청(insert) 가능. 조회/수정은 정책 없음 → service_role(관리자)만 접근
-- 스팸/남용 1차 방어: 입력 길이 제한 (DB 레벨). 폼 연동 시 서버검증·rate limit·CAPTCHA 추가 필요.
alter table public.advisory_requests drop constraint if exists advisory_len_guard;
alter table public.advisory_requests add constraint advisory_len_guard check (
  char_length(name)  between 1 and 100
  and char_length(coalesce(company, '')) <= 100
  and char_length(coalesce(title, ''))   <= 60
  and char_length(phone) between 1 and 30
  and char_length(coalesce(email, ''))   <= 160
  and char_length(coalesce(message, '')) <= 2000
);

drop policy if exists "advisory_insert_anyone" on public.advisory_requests;
create policy "advisory_insert_anyone" on public.advisory_requests
  for insert with check (true);

-- ------------------------------------------------------------
-- 3) contacts — 일반 문의 (로그인 불필요)
-- ------------------------------------------------------------
create table if not exists public.contacts (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  email       text,
  phone       text,
  message     text not null,
  status      text not null default 'new',  -- 'new' | 'replied' | 'archived'
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

drop trigger if exists trg_contacts_updated on public.contacts;
create trigger trg_contacts_updated before update on public.contacts
  for each row execute function public.set_updated_at();

alter table public.contacts enable row level security;

-- 스팸/남용 1차 방어: 입력 길이 제한 (DB 레벨). 폼 연동 시 서버검증·rate limit·CAPTCHA 추가 필요.
alter table public.contacts drop constraint if exists contacts_len_guard;
alter table public.contacts add constraint contacts_len_guard check (
  char_length(name) between 1 and 100
  and char_length(coalesce(email, '')) <= 160
  and char_length(coalesce(phone, '')) <= 30
  and char_length(message) between 1 and 2000
);

drop policy if exists "contacts_insert_anyone" on public.contacts;
create policy "contacts_insert_anyone" on public.contacts
  for insert with check (true);

-- ============================================================
-- ⚠️ 운영(공개) 전 반드시 처리할 것 — 문의/자문 스팸 방어
--   현재 contacts / advisory_requests 는 anon 이 직접 insert 가능(with check true).
--   길이 제한(위 constraint)은 1차 방어일 뿐, 봇 대량 등록은 못 막는다.
--   폼을 실제 연동할 때:
--     1) 클라이언트 직접 insert 대신 서버 액션/Edge Function 경유
--     2) 그 안에서 서버 검증(형식·필수값) + rate limit(IP·시간당 N건)
--     3) CAPTCHA(예: Cloudflare Turnstile) 통과 후에만 저장
--   서버 경유로 바꾸면 아래 anon insert 정책은 제거하고 service_role 로만 쓰기.
-- ------------------------------------------------------------
-- (Phase 3) orders / payments        — 결제 어댑터 계층에서 추가
-- (Phase 4) courses / enrollments     — LMS 에서 추가
-- (Phase 5) memberships               — CEO클럽 에서 추가
-- ============================================================
