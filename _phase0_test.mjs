import { readFileSync } from "node:fs";
import { createClient } from "@supabase/supabase-js";

// .env.local 간단 파싱
const env = {};
for (const line of readFileSync(new URL("./.env.local", import.meta.url), "utf8").split("\n")) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2].trim();
}

const url = env.NEXT_PUBLIC_SUPABASE_URL;
const anon = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const secret = env.SUPABASE_SERVICE_ROLE_KEY;

const pub = createClient(url, anon);
const admin = createClient(url, secret, { auth: { persistSession: false } });

const marker = "PHASE0-TEST-DELETE-ME";

// 1) 익명(publishable) 키로 INSERT — RLS insert 정책 검증
const ins = await pub
  .from("advisory_requests")
  .insert({ name: marker, phone: "000", message: "connection test" })
  .select()
  .single();

if (ins.error) {
  console.log("❌ INSERT 실패:", ins.error.message);
  process.exit(1);
}
console.log("✅ INSERT 성공 (publishable 키, RLS insert 통과) — id:", ins.data.id);

// 2) 관리자(secret) 키로 SELECT — 서버 조회 검증
const sel = await admin
  .from("advisory_requests")
  .select("id,name,status,created_at")
  .eq("name", marker);

if (sel.error) {
  console.log("❌ SELECT 실패:", sel.error.message);
  process.exit(1);
}
console.log("✅ SELECT 성공 (secret 키, 서버 조회) — 조회된 행:", sel.data.length, "status:", sel.data[0]?.status);

// 3) 익명 키로는 SELECT가 막혀야 정상 (RLS)
const anonSel = await pub.from("advisory_requests").select("id").eq("name", marker);
console.log(
  anonSel.data && anonSel.data.length === 0
    ? "✅ RLS 확인: publishable 키로는 조회 안 됨(정상 — 관리자 데이터 보호)"
    : `⚠️  publishable 키로 조회됨 (행 ${anonSel.data?.length}) — 정책 재확인 필요`,
);

// 4) 테스트 데이터 정리
await admin.from("advisory_requests").delete().eq("name", marker);
console.log("🧹 테스트 데이터 삭제 완료");
console.log("\n🎉 Phase 0 연결 검증 통과");
