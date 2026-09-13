"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { Award, Lock } from "lucide-react";
import type { Badge } from "@/types";

export function BadgeCard({
  badge,
  highlight = false,
  onHighlightSeen,
}: {
  badge: Badge;
  highlight?: boolean;
  onHighlightSeen?: () => void;
}) {
  useEffect(() => {
    if (!highlight || !onHighlightSeen) return;
    const t = window.setTimeout(onHighlightSeen, 3500);
    return () => window.clearTimeout(t);
  }, [highlight, onHighlightSeen]);

  return (
    <motion.article
      className={`surface flex items-start gap-3 p-4 ${badge.earned ? "" : "opacity-70"} ${
        highlight ? "badge-glow ring-2 ring-[var(--accent-warm)]/50" : ""
      }`}
      initial={highlight ? { scale: 0.92, opacity: 0 } : false}
      animate={highlight ? { scale: [1, 1.04, 1], opacity: 1 } : { scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 280, damping: 16 }}
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
          {highlight ? "¡Recién desbloqueada!" : badge.earned ? "Obtenida" : "Por desbloquear"}
        </span>
      </div>
    </motion.article>
  );
}
