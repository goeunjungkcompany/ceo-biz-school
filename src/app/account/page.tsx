import { redirect } from "next/navigation";
import { WRAP, PageHeader } from "@/components/ui";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { signOut } from "@/app/login/actions";

export const metadata = { title: "내 정보 | CEO Business School" };

export default async function AccountPage() {
  const supabase = await createSupabaseServerClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("name, company, title, phone, role")
    .eq("id", user.id)
    .maybeSingle();

  const rows = [
    { k: "이메일", v: user.email ?? "-" },
    { k: "이름", v: profile?.name ?? "-" },
    { k: "회사", v: profile?.company ?? "-" },
    { k: "직책", v: profile?.title ?? "-" },
    { k: "연락처", v: profile?.phone ?? "-" },
    { k: "회원 등급", v: profile?.role === "admin" ? "관리자" : "일반 회원" },
  ];

  return (
    <main>
      <PageHeader eyebrow="Members" title="내 정보" desc="회원 정보를 확인하실 수 있습니다." />
      <section className={`${WRAP} py-20`}>
        <dl className="max-w-xl border-t border-line">
          {rows.map((r) => (
            <div key={r.k} className="flex gap-6 border-b border-line py-4">
              <dt className="w-28 shrink-0 font-mono text-[11px] uppercase tracking-[0.15em] text-muted">{r.k}</dt>
              <dd className="text-ink">{r.v}</dd>
            </div>
          ))}
        </dl>

        <form action={signOut} className="mt-10">
          <button type="submit" className="border border-line px-6 py-3 text-sm font-medium text-ink transition-colors hover:border-accent hover:text-accent">
            로그아웃
          </button>
        </form>
      </section>
    </main>
  );
}
