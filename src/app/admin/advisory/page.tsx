import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { updateAdvisoryStatus } from "../actions";
import { StatusBadge, StatusForm, fmtDate } from "../ui";

export const dynamic = "force-dynamic";

const ADVISORY_STATUSES = ["new", "contacted", "done", "archived"] as const;

type Advisory = {
  id: string;
  name: string;
  company: string | null;
  title: string | null;
  phone: string;
  email: string | null;
  message: string | null;
  status: string;
  created_at: string;
};

export default async function AdminAdvisoryPage() {
  const admin = createSupabaseAdminClient();
  const { data } = await admin
    .from("advisory_requests")
    .select("id, name, company, title, phone, email, message, status, created_at")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as Advisory[];

  return (
    <div>
      <div className="mb-6 flex items-baseline justify-between">
        <h2 className="font-serif text-2xl font-semibold text-ink">CEO 자문 신청</h2>
        <span className="font-mono text-xs text-muted">{rows.length}건</span>
      </div>

      {rows.length === 0 ? (
        <p className="border border-line bg-surface px-6 py-10 text-center text-sm text-muted">
          아직 접수된 자문 신청이 없습니다.
        </p>
      ) : (
        <ul className="space-y-4">
          {rows.map((a) => (
            <li key={a.id} className="border border-line p-5">
              <div className="flex flex-wrap items-center gap-3">
                <StatusBadge status={a.status} />
                <span className="font-semibold text-ink">{a.name}</span>
                {(a.company || a.title) && (
                  <span className="text-sm text-muted">
                    {[a.company, a.title].filter(Boolean).join(" · ")}
                  </span>
                )}
                <span className="font-mono text-xs text-muted">
                  {fmtDate(a.created_at)}
                </span>
              </div>

              <div className="mt-3 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
                <span>☎ {a.phone}</span>
                {a.email && (
                  <a href={`mailto:${a.email}`} className="hover:text-accent">
                    ✉ {a.email}
                  </a>
                )}
              </div>

              {a.message && (
                <p className="mt-4 whitespace-pre-wrap border-l-2 border-line pl-4 text-sm leading-relaxed text-ink">
                  {a.message}
                </p>
              )}

              <div className="mt-4">
                <StatusForm
                  id={a.id}
                  current={a.status}
                  options={ADVISORY_STATUSES}
                  action={updateAdvisoryStatus}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
