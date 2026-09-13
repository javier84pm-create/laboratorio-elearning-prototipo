import type { ReactNode } from "react";

export function MetricCard({
  label,
  value,
  hint,
  icon,
}: {
  label: string;
  value: ReactNode;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <article className="surface card-lift p-4">
      <div className="mb-3 flex items-start justify-between gap-3">
        <p className="text-sm text-[var(--ink-muted)]">{label}</p>
        {icon ? (
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
            {icon}
          </span>
        ) : null}
      </div>
      <p className="font-display text-2xl font-bold text-[var(--ink)]">{value}</p>
      {hint ? <p className="mt-1 text-xs text-[var(--ink-muted)]">{hint}</p> : null}
    </article>
  );
}
