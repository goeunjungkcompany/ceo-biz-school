import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { fmtDate } from "../ui";

export const dynamic = "force-dynamic";

type Profile = {
  id: string;
  name: string | null;
  company: string | null;
  title: string | null;
  phone: string | null;
  role: string;
};

export default async function AdminMembersPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  const keyword = (q ?? "").trim().toLowerCase();

  const admin = createSupabaseAdminClient();

  // 이메일·가입일은 auth.users 에, 나머지 프로필 정보는 profiles 에 있어 둘을 합친다.
  const [{ data: userList }, { data: profileData }] = await Promise.all([
    admin.auth.admin.listUsers({ page: 1, perPage: 200 }),
    admin.from("profiles").select("id, name, company, title, phone, role"),
  ]);

  const profiles = new Map(
    ((profileData ?? []) as Profile[]).map((p) => [p.id, p]),
  );

  let rows = (userList?.users ?? []).map((u) => {
    const p = profiles.get(u.id);
    return {
      id: u.id,
      email: u.email ?? "-",
      name: p?.name ?? (u.user_metadata?.name as string | undefined) ?? "-",
      company: p?.company ?? "-",
      title: p?.title ?? "-",
      phone: p?.phone ?? "-",
      role: p?.role ?? "member",
      createdAt: u.created_at,
    };
  });

  // 검색: 이메일·이름·회사·직책 대상 (대소문자 무시)
  if (keyword) {
    rows = rows.filter((r) =>
      [r.email, r.name, r.company, r.title]
        .join(" ")
        .toLowerCase()
        .includes(keyword),
    );
  }

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl font-semibold text-ink">회원</h2>
        <span className="font-mono text-xs text-muted">{rows.length}명</span>
      </div>

      {/* 검색 */}
      <form method="get" className="mb-6 flex gap-2">
        <input
          type="search"
          name="q"
          defaultValue={q ?? ""}
          placeholder="이메일 · 이름 · 회사 · 직책 검색"
          className="w-full max-w-sm border border-line bg-paper px-3 py-2 text-sm text-ink placeholder:text-muted"
        />
        <button
          type="submit"
          className="border border-line px-4 py-2 text-sm text-ink transition-colors hover:border-accent hover:text-accent"
        >
          검색
        </button>
        {keyword && (
          <a
            href="/admin/members"
            className="px-3 py-2 text-sm text-muted transition-colors hover:text-accent"
          >
            초기화
          </a>
        )}
      </form>

      {rows.length === 0 ? (
        <p className="border border-line bg-surface px-6 py-10 text-center text-sm text-muted">
          {keyword ? `'${q}' 검색 결과가 없습니다.` : "아직 가입한 회원이 없습니다."}
        </p>
      ) : (
        <div className="overflow-x-auto border border-line">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface font-mono text-[11px] uppercase tracking-[0.1em] text-muted">
                <th className="px-4 py-3 font-normal">이메일</th>
                <th className="px-4 py-3 font-normal">이름</th>
                <th className="px-4 py-3 font-normal">회사 / 직책</th>
                <th className="px-4 py-3 font-normal">연락처</th>
                <th className="px-4 py-3 font-normal">등급</th>
                <th className="px-4 py-3 font-normal">가입일</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-b border-line last:border-0">
                  <td className="px-4 py-3 text-ink">{r.email}</td>
                  <td className="px-4 py-3 text-ink">{r.name}</td>
                  <td className="px-4 py-3 text-muted">
                    {[r.company, r.title].filter((v) => v && v !== "-").join(" · ") || "-"}
                  </td>
                  <td className="px-4 py-3 text-muted">{r.phone}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block border px-2 py-0.5 font-mono text-[11px] ${
                        r.role === "admin"
                          ? "border-navy/40 bg-navy/5 text-navy"
                          : "border-line text-muted"
                      }`}
                    >
                      {r.role === "admin" ? "관리자" : "일반"}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-muted">
                    {fmtDate(r.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 text-xs leading-relaxed text-muted">
        회원을 관리자로 지정하려면 Supabase 대시보드 &gt; Table Editor &gt; profiles 에서
        해당 회원의 role 을 admin 으로 변경하세요. (보안상 사이트에서는 변경할 수 없도록 막아두었습니다)
      </p>
    </div>
  );
}
