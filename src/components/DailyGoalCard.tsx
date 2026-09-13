"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Sun } from "lucide-react";
import { playSfx } from "@/lib/sfx";
import { useDemo } from "@/context/DemoContext";

export function DailyGoalCard({ compact = false }: { compact?: boolean }) {
  const {
    dailyGoalDone,
    justCompletedDailyGoal,
    clearJustCompletedDailyGoal,
    sfxEnabled,
  } = useDemo();
  const celebrated = useRef(false);

  useEffect(() => {
    if (!justCompletedDailyGoal || celebrated.current) return;
    celebrated.current = true;
    playSfx("streak", sfxEnabled);
    const t = window.setTimeout(() => clearJustCompletedDailyGoal(), 3500);
    return () => window.clearTimeout(t);
  }, [justCompletedDailyGoal, clearJustCompletedDailyGoal, sfxEnabled]);

  return (
    <motion.article
      className={`surface overflow-hidden ${justCompletedDailyGoal ? "ring-2 ring-[var(--accent-warm)]/50" : ""}`}
      animate={justCompletedDailyGoal ? { scale: [1, 1.02, 1] } : { scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`flex items-center gap-4 p-5 ${
          dailyGoalDone
            ? "bg-gradient-to-br from-[var(--brand)] to-[var(--accent)] text-white"
            : "bg-[var(--surface-muted)]"
        }`}
      >
        <motion.div
          className={`grid shrink-0 place-items-center rounded-full ${
            compact ? "h-14 w-14 text-2xl" : "h-16 w-16 text-3xl"
          } ${dailyGoalDone ? "bg-white/20" : "bg-white"}`}
          animate={dailyGoalDone ? { rotate: [0, -8, 8, 0], scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.6 }}
          aria-hidden
        >
          {dailyGoalDone ? "✅" : "🎯"}
        </motion.div>
        <div className="min-w-0 flex-1">
          <p
            className={`inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide ${
              dailyGoalDone ? "text-white/80" : "text-[var(--ink-muted)]"
            }`}
          >
            <Sun size={13} /> Meta del día
          </p>
          <h2
            className={`font-display mt-0.5 font-bold ${compact ? "text-lg" : "text-xl"} ${
              dailyGoalDone ? "text-white" : "text-[var(--ink)]"
            }`}
          >
            {dailyGoalDone ? "¡Meta cumplida!" : "Completa 1 cápsula hoy"}
          </h2>
          <p className={`mt-1 text-sm ${dailyGoalDone ? "text-white/85" : "text-[var(--ink-muted)]"}`}>
            {dailyGoalDone
              ? "Gran ritmo. Vuelve mañana para mantener la racha."
              : "Una microcápsula basta para marcar el día."}
          </p>
        </div>
        <div className="shrink-0" aria-hidden>
          {dailyGoalDone ? (
            <CheckCircle2 className={dailyGoalDone ? "text-white" : ""} size={28} />
          ) : (
            <Circle className="text-[var(--ink-muted)]" size={28} />
          )}
        </div>
      </div>
    </motion.article>
  );
}
