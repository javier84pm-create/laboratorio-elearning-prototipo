"use client";

import { ProgressBar } from "@/components/ProgressBar";

export function ProgressCard({
  title,
  completed,
  total,
  caption,
  pulse = false,
}: {
  title: string;
  completed: number;
  total: number;
  caption?: string;
  pulse?: boolean;
}) {
  const percent = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <article className={`surface p-5 ${pulse ? "animate-pulse-soft ring-2 ring-[var(--accent-warm)]/30" : ""}`}>
      <div className="mb-3 flex items-end justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold">{title}</h3>
          {caption ? <p className="mt-1 text-sm text-[var(--ink-muted)]">{caption}</p> : null}
        </div>
        <p className="text-sm font-semibold text-[var(--brand)]">
          {completed}/{total}
        </p>
      </div>
      <ProgressBar value={percent} />
    </article>
  );
}
