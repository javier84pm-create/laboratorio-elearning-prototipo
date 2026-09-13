"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Flame } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { getStreakStatus } from "@/lib/streak";

export function StreakRiskBanner() {
  const { streakDays, lastPlayedDate, dailyGoalDone } = useDemo();
  const status = getStreakStatus(streakDays, lastPlayedDate);

  if (status.kind !== "risk" && status.kind !== "broken") return null;
  if (dailyGoalDone && status.kind === "risk") return null;

  const isRisk = status.kind === "risk";

  return (
    <motion.aside
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className={`surface overflow-hidden border ${
        isRisk
          ? "border-amber-300 bg-gradient-to-r from-amber-50 to-orange-50"
          : "border-rose-200 bg-gradient-to-r from-rose-50 to-orange-50"
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3 p-4">
        <div className="flex items-start gap-3">
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-white text-xl shadow-sm">
            {isRisk ? "⚠️" : "💤"}
          </span>
          <div>
            <p className="inline-flex items-center gap-1.5 text-sm font-bold text-[var(--ink)]">
              <Flame size={14} className={isRisk ? "text-amber-600" : "text-rose-500"} />
              {isRisk ? `Racha x${status.streakDays} en riesgo` : "Racha en pausa"}
            </p>
            <p className="mt-0.5 text-sm text-[var(--ink-muted)]">{status.message}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/learning/practice" className="btn btn-primary !py-2 !text-sm">
            Práctica rápida
          </Link>
          <Link href="/learning" className="btn btn-secondary !py-2 !text-sm">
            Ver catálogo
          </Link>
        </div>
      </div>
    </motion.aside>
  );
}

export function StreakChip() {
  const { streakDays, lastPlayedDate, dailyGoalDone } = useDemo();
  const status = getStreakStatus(streakDays, lastPlayedDate);
  const atRisk = status.kind === "risk" && !dailyGoalDone;

  return (
    <span
      className={`chip ${atRisk ? "!bg-amber-100 !text-amber-900 !border-amber-300 animate-pulse-soft" : ""}`}
    >
      <Flame size={14} /> {atRisk ? "⚠️ " : ""}Racha x{streakDays}
    </span>
  );
}
