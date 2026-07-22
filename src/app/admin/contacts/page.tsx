import Link from "next/link";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { INQUIRY_TYPES } from "@/app/contact/types";
import { updateContactStatus } from "../actions";
import { StatusBadge, StatusForm, fmtDate } from "../ui";

export const dynamic = "force-dynamic";

const CONTACT_STATUSES = ["new", "replied", "archived"] as const;

type Contact = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
};

export default async function AdminContactsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const activeType = type ?? "";

  const admin = createSupabaseAdminClient();
  let query = admin
    .from("contacts")
    .select("id, name, email, phone, message, status, created_at")
    .order("created_at", { ascending: false });

  // 문의 유형은 message 앞에 "[유형] ○○○" 형태로 저장되어 있어 그걸로 필터
  if (activeType) query = query.ilike("message", `%[유형] ${activeType}%`);

  const { data } = await query;
  const rows = (data ?? []) as Contact[];

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl font-semibold text-ink">문의</h2>
        <span className="font-mono text-xs text-muted">{rows.length}건</span>
      </div>

      {/* 유형 필터 */}
      <div className="mb-8 flex flex-wrap gap-2">
        <FilterChip label="전체" href="/admin/contacts" active={!activeType} />
        {INQUIRY_TYPES.map((it) => (
          <FilterChip
            key={it.ko}
            label={it.ko}
            href={`/admin/contacts?type=${encodeURIComponent(it.ko)}`}
            active={activeType === it.ko}
          />
        ))}
      </div>

      {rows.length === 0 ? (
        <p className="border border-line bg-surface px-6 py-10 text-center text-sm text-muted">
          {activeType ? `'${activeType}' 문의가 없습니다.` : "아직 접수된 문의가 없습니다."}
        </p>
      ) : (
        <ul className="space-y-4">
          {rows.map((c) => (
            <li key={c.id} className="border border-line p-5">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={c.status} />
                <span className="font-semibold text-ink">{c.name}</span>
                <span className="font-mono text-xs text-muted">
                  {fmtDate(c.created_at)}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
                {c.email && (
                  <a href={`mailto:${c.email}`} className="hover:text-accent">
                    ✉ {c.email}
                  </a>
                )}
                {c.phone && <span>☎ {c.phone}</span>}
              </div>

              <p className="mt-4 whitespace-pre-wrap border-l-2 border-line pl-4 text-sm leading-relaxed text-ink">
                {c.message}
              </p>

              <div className="mt-4">
                <StatusForm
                  id={c.id}
                  current={c.status}
                  options={CONTACT_STATUSES}
                  action={updateContactStatus}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function FilterChip({
  label,
  href,
  active,
}: {
  label: string;
  href: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`border px-3 py-1 text-xs transition-colors ${
        active
          ? "border-accent bg-accent/5 font-medium text-accent"
          : "border-line text-muted hover:border-accent hover:text-accent"
      }`}
    >
      {label}
    </Link>
  );
}
