"use client";

import { motion } from "framer-motion";

const MAX_LIVES = 3;

export function LivesBar({
  lives,
  max = MAX_LIVES,
}: {
  lives: number;
  max?: number;
}) {
  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-white px-3 py-1.5"
      aria-label={`${lives} de ${max} vidas`}
    >
      <span className="text-[11px] font-semibold uppercase tracking-wide text-[var(--ink-muted)]">
        Vidas
      </span>
      <div className="flex items-center gap-0.5">
        {Array.from({ length: max }, (_, i) => {
          const filled = i < lives;
          return (
            <motion.span
              key={i}
              className="inline-block text-lg leading-none"
              animate={
                filled
                  ? { scale: [1, 1.15, 1] }
                  : { scale: 1, opacity: 0.35, filter: "grayscale(1)" }
              }
              transition={{ duration: 0.35 }}
              aria-hidden
            >
              {filled ? "❤️" : "🖤"}
            </motion.span>
          );
        })}
      </div>
    </div>
  );
}

export { MAX_LIVES };
