"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/supabase/guard";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { IMAGE_BUCKET, IMAGE_SLOTS } from "@/lib/site-images";

const CONTACT_STATUSES = ["new", "replied", "archived"] as const;
const ADVISORY_STATUSES = ["new", "contacted", "done", "archived"] as const;

/** 문의(contacts) 상태 변경 */
export async function updateContactStatus(formData: FormData) {
  await requireAdmin(); // ★ 매 호출마다 관리자 확인 (POST 직접 호출 방어)

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !(CONTACT_STATUSES as readonly string[]).includes(status)) return;

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("contacts").update({ status }).eq("id", id);
  if (error) {
    console.error("[admin] contact status update failed:", error.message);
    return;
  }
  revalidatePath("/admin/contacts");
  revalidatePath("/admin");
}

/** CEO 자문(advisory_requests) 상태 변경 */
export async function updateAdvisoryStatus(formData: FormData) {
  await requireAdmin();

  const id = String(formData.get("id") ?? "");
  const status = String(formData.get("status") ?? "");
  if (!id || !(ADVISORY_STATUSES as readonly string[]).includes(status)) return;

  const admin = createSupabaseAdminClient();
  const { error } = await admin.from("advisory_requests").update({ status }).eq("id", id);
  if (error) {
    console.error("[admin] advisory status update failed:", error.message);
    return;
  }
  revalidatePath("/admin/advisory");
  revalidatePath("/admin");
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

/** 사이트 이미지 업로드/교체 (Storage) */
export async function uploadSiteImage(formData: FormData) {
  await requireAdmin();

  const key = String(formData.get("key") ?? "");
  const file = formData.get("file");

  // 허용된 슬롯 key 인지 확인
  if (!(IMAGE_SLOTS as readonly { key: string }[]).some((s) => s.key === key)) return;
  if (!(file instanceof File) || file.size === 0) return;
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) return;
  if (file.size > MAX_IMAGE_BYTES) return;

  const admin = createSupabaseAdminClient();
  // 슬롯당 파일 하나(key 를 파일명으로) — 덮어쓰기
  const { error } = await admin.storage.from(IMAGE_BUCKET).upload(key, file, {
    upsert: true,
    contentType: file.type,
  });
  if (error) {
    console.error("[admin] image upload failed:", error.message);
    return;
  }

  // 이미지가 쓰이는 공개 페이지 + 관리자 화면 갱신
  revalidatePath("/admin/images");
  revalidatePath("/about");
  revalidatePath("/faculty");
  revalidatePath("/publications");
}

/** 사이트 이미지 삭제 (기본 플레이스홀더로 되돌림) */
export async function deleteSiteImage(formData: FormData) {
  await requireAdmin();

  const key = String(formData.get("key") ?? "");
  if (!(IMAGE_SLOTS as readonly { key: string }[]).some((s) => s.key === key)) return;

  const admin = createSupabaseAdminClient();
  const { error } = await admin.storage.from(IMAGE_BUCKET).remove([key]);
  if (error) {
    console.error("[admin] image delete failed:", error.message);
    return;
  }

  revalidatePath("/admin/images");
  revalidatePath("/about");
  revalidatePath("/faculty");
  revalidatePath("/publications");
}
