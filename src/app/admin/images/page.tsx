import { IMAGE_SLOTS, getSiteImageMap } from "@/lib/site-images";
import { uploadSiteImage, deleteSiteImage } from "../actions";

export const dynamic = "force-dynamic";

export default async function AdminImagesPage() {
  const map = await getSiteImageMap();

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl font-semibold text-ink">사이트 이미지</h2>
        <span className="font-mono text-xs text-muted">{IMAGE_SLOTS.length}개 자리</span>
      </div>

      <p className="mb-8 text-sm leading-relaxed text-muted">
        각 자리에 이미지를 올리면 해당 페이지에 바로 반영됩니다. (JPG·PNG·WebP·GIF, 최대 5MB)
        이미지를 지우면 기본 자리표시로 되돌아갑니다.
      </p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {IMAGE_SLOTS.map((slot) => {
          const url = map[slot.key];
          return (
            <div key={slot.key} className="border border-line p-4">
              <div className="mb-3 text-sm font-medium text-ink">{slot.label}</div>

              {/* 미리보기 */}
              <div className={`${slot.ratio} mb-3 w-full overflow-hidden border border-line bg-surface`}>
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={url} alt={slot.label} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full w-full items-center justify-center font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
                    No image
                  </div>
                )}
              </div>

              {/* 업로드 폼 */}
              <form action={uploadSiteImage} className="space-y-2">
                <input type="hidden" name="key" value={slot.key} />
                <input
                  type="file"
                  name="file"
                  accept="image/png,image/jpeg,image/webp,image/gif"
                  required
                  className="block w-full text-xs text-muted file:mr-3 file:border file:border-line file:bg-paper file:px-3 file:py-1.5 file:text-xs file:text-ink hover:file:border-accent"
                />
                <button
                  type="submit"
                  className="w-full bg-navy px-3 py-2 text-xs font-medium text-paper transition-colors hover:bg-ink"
                >
                  {url ? "이미지 교체" : "이미지 업로드"}
                </button>
              </form>

              {url && (
                <form action={deleteSiteImage} className="mt-2">
                  <input type="hidden" name="key" value={slot.key} />
                  <button
                    type="submit"
                    className="w-full border border-line px-3 py-2 text-xs text-muted transition-colors hover:border-accent hover:text-accent"
                  >
                    이미지 삭제
                  </button>
                </form>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
