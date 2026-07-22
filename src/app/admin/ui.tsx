/** 관리자 화면 공통 UI 조각 (서버 컴포넌트에서 사용) */

/** 날짜 표기: 2026. 07. 22. 14:30 */
export function fmtDate(iso: string | null | undefined): string {
  if (!iso) return "-";
  const d = new Date(iso);
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}. ${p(d.getMonth() + 1)}. ${p(d.getDate())}. ${p(d.getHours())}:${p(d.getMinutes())}`;
}

const STATUS_STYLE: Record<string, string> = {
  new: "border-accent/40 bg-accent/5 text-accent",
  replied: "border-line bg-surface text-muted",
  contacted: "border-line bg-surface text-muted",
  done: "border-line bg-surface text-muted",
  archived: "border-line bg-transparent text-muted/70",
};

const STATUS_LABEL: Record<string, string> = {
  new: "신규",
  replied: "답변완료",
  contacted: "연락함",
  done: "완료",
  archived: "보관",
};

export function StatusBadge({ status }: { status: string }) {
  return (
    <span
      className={`inline-block border px-2 py-0.5 font-mono text-[11px] ${
        STATUS_STYLE[status] ?? "border-line text-muted"
      }`}
    >
      {STATUS_LABEL[status] ?? status}
    </span>
  );
}

/**
 * 상태 변경 폼. 셀렉트 + 저장 버튼.
 * action(서버액션)에 id(hidden) + status(select) 를 전달한다.
 */
export function StatusForm({
  id,
  current,
  options,
  action,
}: {
  id: string;
  current: string;
  options: readonly string[];
  action: (formData: FormData) => void;
}) {
  return (
    <form action={action} className="flex items-center gap-2">
      <input type="hidden" name="id" value={id} />
      <select
        name="status"
        defaultValue={current}
        className="border border-line bg-paper px-2 py-1 text-xs text-ink"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {STATUS_LABEL[o] ?? o}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="border border-line px-3 py-1 text-xs text-ink transition-colors hover:border-accent hover:text-accent"
      >
        변경
      </button>
    </form>
  );
}
