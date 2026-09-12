import { Award, Lock } from "lucide-react";
import type { Badge } from "@/types";

export function BadgeCard({ badge }: { badge: Badge }) {
  return (
    <article
      className={`surface flex items-start gap-3 p-4 ${
        badge.earned ? "" : "opacity-70"
      }`}
    >
      <span
        className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${
          badge.earned
            ? "bg-[var(--brand)] text-white"
            : "bg-[var(--surface-muted)] text-[var(--ink-muted)]"
        }`}
      >
        {badge.earned ? <Award size={20} /> : <Lock size={18} />}
      </span>
      <div>
        <h3 className="font-semibold text-[var(--ink)]">{badge.name}</h3>
        <p className="mt-1 text-sm text-[var(--ink-muted)]">{badge.description}</p>
        <span className="chip mt-2">
          {badge.earned ? "Obtenida" : "Por desbloquear"}
        </span>
      </div>
    </article>
  );
}
