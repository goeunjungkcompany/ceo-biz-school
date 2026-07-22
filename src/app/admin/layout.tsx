import Link from "next/link";
import { requireAdmin } from "@/lib/supabase/guard";
import { WRAP } from "@/components/ui";

export const metadata = { title: "관리자 | CEO Business School" };
// 관리자 데이터는 항상 최신이어야 하므로 정적 캐시 금지
export const dynamic = "force-dynamic";

const TABS = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/contacts", label: "문의" },
  { href: "/admin/advisory", label: "CEO 자문" },
  { href: "/admin/members", label: "회원" },
  { href: "/admin/images", label: "이미지" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = await requireAdmin(); // 비관리자는 여기서 리다이렉트

  return (
    <main>
      <section className="border-b border-line bg-surface">
        <div className={`${WRAP} pt-24 pb-8 lg:pt-28`}>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
            Admin
          </div>
          <h1 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            관리자
          </h1>
          <p className="mt-3 text-sm text-muted">{user.email}</p>

          <nav className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-4">
            {TABS.map((tab) => (
              <Link
                key={tab.href}
                href={tab.href}
                className="text-sm text-ink/70 transition-colors hover:text-accent"
              >
                {tab.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <div className={`${WRAP} py-12`}>{children}</div>
    </main>
  );
}
