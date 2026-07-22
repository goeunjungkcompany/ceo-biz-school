import { createSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * 사이트 이미지 = Supabase Storage 의 `site-images` 버킷에 저장.
 * 각 자리(slot)마다 고정된 key 로 파일을 하나씩 업로드/교체한다. (DB 테이블 불필요)
 * 관리자 페이지(/admin/images)에서 업로드하면 공개 페이지에 바로 반영된다.
 */

export const IMAGE_BUCKET = "site-images";

/** 사이트에서 교체 가능한 이미지 자리 목록. label 은 관리자 화면에 표시. */
export const IMAGE_SLOTS = [
  { key: "about_hero_bg", label: "소개 — 상단 배경 사진 (우측, 반투명)", ratio: "aspect-[16/9]" },
  { key: "about_founder", label: "소개 — 창업자 사진", ratio: "aspect-[3/4]" },
  { key: "faculty_founder", label: "교수진 — 대표 사진", ratio: "aspect-[3/4]" },
  { key: "faculty_0", label: "교수진 — 안중호 교수", ratio: "aspect-[4/5]" },
  { key: "faculty_1", label: "교수진 — 한상도 교수", ratio: "aspect-[4/5]" },
  { key: "faculty_2", label: "교수진 — 이승현 교수", ratio: "aspect-[4/5]" },
  { key: "faculty_3", label: "교수진 — 김기용 교수", ratio: "aspect-[4/5]" },
  { key: "publications_featured", label: "출판 — 대표 출판물 표지", ratio: "aspect-[3/4]" },
] as const;

export type ImageSlotKey = (typeof IMAGE_SLOTS)[number]["key"];

/** 업로드된 이미지 목록을 { key: 공개URL } 맵으로 반환. 없는 자리는 키 없음. */
export async function getSiteImageMap(): Promise<Record<string, string>> {
  const admin = createSupabaseAdminClient();
  const { data, error } = await admin.storage.from(IMAGE_BUCKET).list("", {
    limit: 100,
  });
  if (error || !data) return {};

  const map: Record<string, string> = {};
  for (const file of data) {
    if (file.name.startsWith(".")) continue; // 플레이스홀더 등 무시
    const { data: pub } = admin.storage.from(IMAGE_BUCKET).getPublicUrl(file.name);
    // 캐시 무력화: 마지막 수정 시각을 쿼리로 붙여 교체 시 즉시 반영
    const v = file.updated_at ? new Date(file.updated_at).getTime() : "";
    map[file.name] = v ? `${pub.publicUrl}?v=${v}` : pub.publicUrl;
  }
  return map;
}
