import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

// 관리자 데이터는 항상 최신
export const dynamic = "force-dynamic";

async function count(
  admin: ReturnType<typeof createSupabaseAdminClient>,
  table: string,
  onlyNew = false,
) {
  let q = admin.from(table).select("*", { count: "exact", head: true });
  if (onlyNew) q = q.eq("status", "new");
  const { count } = await q;
  return count ?? 0;
}

export default async function AdminDashboard() {
  const admin = createSupabaseAdminClient();

  const [contactsNew, contactsTotal, advisoryNew, advisoryTotal, members] =
    await Promise.all([
      count(admin, "contacts", true),
      count(admin, "contacts"),
      count(admin, "advisory_requests", true),
      count(admin, "advisory_requests"),
      count(admin, "profiles"),
    ]);

  const cards = [
    { href: "/admin/contacts", label: "새 문의", value: contactsNew, sub: `전체 ${contactsTotal}건` },
    { href: "/admin/advisory", label: "새 자문 신청", value: advisoryNew, sub: `전체 ${advisoryTotal}건` },
    { href: "/admin/members", label: "회원", value: members, sub: "가입 회원 수" },
  ];

  return (
    <div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group border border-line p-6 transition-colors hover:border-accent"
          >
            <div className="font-mono text-[11px] uppercase tracking-[0.15em] text-muted">
              {c.label}
            </div>
            <div className="mt-4 font-serif text-4xl font-semibold text-ink group-hover:text-accent">
              {c.value}
            </div>
            <div className="mt-2 text-xs text-muted">{c.sub}</div>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-xs leading-relaxed text-muted">
        문의·자문 신청 내용과 회원 목록을 여기서 확인하고 상태를 관리할 수 있습니다.
        상세 원본 데이터는 Supabase 대시보드에서도 볼 수 있어요.
      </p>
    </div>
  );
}
