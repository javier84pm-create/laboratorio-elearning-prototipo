"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Clock3, Flame, Sparkles, Zap } from "lucide-react";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { CountUp } from "@/components/CountUp";

export function CompletionCard({
  title,
  percent,
  durationLabel,
  badgeName,
  xpEarned,
  streakDays,
  level,
}: {
  title: string;
  percent: number;
  durationLabel: string;
  badgeName: string;
  xpEarned: number;
  streakDays: number;
  level: number;
}) {
  return (
    <motion.section
      className="surface relative"
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <ConfettiBurst show withSound />

      <div className="relative z-10 overflow-hidden rounded-[inherit]">
      <div className="bg-gradient-to-br from-[var(--brand)] via-[var(--accent)] to-[#0a4f44] px-6 py-8 text-white">
        <span className="chip !border-white/20 !bg-white/15 !text-white">
          🎉 Cápsula completada
        </span>
        <h1 className="font-display mt-4 text-3xl font-bold">{title}</h1>
        <p className="mt-2 max-w-xl text-white/85">
          Aplicaste el conocimiento de inmediato. Tu progreso y tu institución quedan alineados.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
            <Zap className="mr-1 inline" size={14} /> +{xpEarned} XP
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
            <Flame className="mr-1 inline" size={14} /> Racha x{streakDays}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-sm font-semibold">
            Nivel {level}
          </span>
        </div>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-3">
        <div className="rounded-2xl bg-[var(--brand-soft)] p-4">
          <p className="text-sm text-[var(--ink-muted)]">Resultado</p>
          <p className="font-display mt-1 text-3xl font-bold text-[var(--brand)]">
            <CountUp value={percent} suffix="%" />
          </p>
        </div>
        <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
          <p className="inline-flex items-center gap-1 text-sm text-[var(--ink-muted)]">
            <Clock3 size={14} /> Tiempo
          </p>
          <p className="font-display mt-1 text-2xl font-bold">{durationLabel}</p>
        </div>
        <motion.div
          className="rounded-2xl bg-[var(--surface-muted)] p-4"
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 16 }}
        >
          <p className="inline-flex items-center gap-1 text-sm text-[var(--ink-muted)]">
            <Award size={14} /> Insignia
          </p>
          <p className="font-display mt-1 text-lg font-bold text-[var(--brand)]">{badgeName}</p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-3 border-t border-[var(--line)] p-6 sm:flex-row">
        <Link href="/progress" className="btn btn-primary flex-1">
          <Sparkles size={16} />
          Ver mi progreso
        </Link>
        <Link href="/admin" className="btn btn-secondary flex-1">
          Panel institucional
        </Link>
      </div>
      </div>
    </motion.section>
  );
}
