export function ProgressBar({
  value,
  label,
  compact = false,
}: {
  value: number;
  label?: string;
  compact?: boolean;
}) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={compact ? "space-y-1" : "space-y-2"}>
      {(label || !compact) && (
        <div className="flex items-center justify-between text-xs text-[var(--ink-muted)]">
          <span>{label}</span>
          <span className="font-semibold text-[var(--brand)]">{clamped}%</span>
        </div>
      )}
      <div className="h-2 overflow-hidden rounded-full bg-[var(--brand-soft)]">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[var(--brand)] to-[var(--accent)] transition-all duration-500"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
