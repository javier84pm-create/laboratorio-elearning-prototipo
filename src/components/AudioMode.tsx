"use client";

import { Headphones } from "lucide-react";

export function AudioMode({
  enabled,
  onToggle,
}: {
  enabled: boolean;
  onToggle: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      className={`surface flex w-full items-center justify-between gap-3 px-4 py-3 text-left transition ${
        enabled ? "ring-2 ring-[var(--brand)]/30" : ""
      }`}
      onClick={() => onToggle(!enabled)}
      aria-pressed={enabled}
    >
      <span className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
          <Headphones size={18} />
        </span>
        <span>
          <span className="block text-sm font-semibold">Modo solo audio</span>
          <span className="block text-xs text-[var(--ink-muted)]">
            Ideal para aprender en movimiento
          </span>
        </span>
      </span>
      <span
        className={`relative h-6 w-11 rounded-full transition ${
          enabled ? "bg-[var(--brand)]" : "bg-slate-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition ${
            enabled ? "left-5" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}
