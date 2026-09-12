"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Award, Clock3, Sparkles } from "lucide-react";

export function CompletionCard({
  title,
  percent,
  durationLabel,
  badgeName,
}: {
  title: string;
  percent: number;
  durationLabel: string;
  badgeName: string;
}) {
  return (
    <motion.section
      className="surface overflow-hidden"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <div className="bg-gradient-to-br from-[var(--brand)] via-[var(--accent)] to-[#0a4f44] px-6 py-8 text-white">
        <span className="chip !border-white/20 !bg-white/15 !text-white">Cápsula completada</span>
        <h1 className="font-display mt-4 text-3xl font-bold">{title}</h1>
        <p className="mt-2 max-w-xl text-white/85">
          Excelente. Registramos tu resultado y desbloqueaste una nueva insignia.
        </p>
      </div>

      <div className="grid gap-4 p-6 sm:grid-cols-3">
        <div className="rounded-2xl bg-[var(--brand-soft)] p-4">
          <p className="text-sm text-[var(--ink-muted)]">Resultado</p>
          <p className="font-display mt-1 text-3xl font-bold text-[var(--brand)]">{percent}%</p>
        </div>
        <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
          <p className="inline-flex items-center gap-1 text-sm text-[var(--ink-muted)]">
            <Clock3 size={14} /> Tiempo
          </p>
          <p className="font-display mt-1 text-2xl font-bold">{durationLabel}</p>
        </div>
        <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
          <p className="inline-flex items-center gap-1 text-sm text-[var(--ink-muted)]">
            <Award size={14} /> Insignia
          </p>
          <p className="font-display mt-1 text-lg font-bold">{badgeName}</p>
        </div>
      </div>

      <div className="flex flex-col gap-3 border-t border-[var(--line)] p-6 sm:flex-row">
        <Link href="/progress" className="btn btn-primary flex-1">
          <Sparkles size={16} />
          Ver mi progreso
        </Link>
        <Link href="/learning" className="btn btn-secondary flex-1">
          Volver a cápsulas
        </Link>
      </div>
    </motion.section>
  );
}
