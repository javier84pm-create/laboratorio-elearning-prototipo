"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { CheckCircle2, Circle, Clapperboard, RotateCcw } from "lucide-react";
import { pressable } from "@/lib/motion";

const STORAGE_KEY = "smartcaps-demo-checklist-v1";

const STEPS = [
  {
    id: "home",
    label: "Inicio + racha / meta del día",
    detail: "~5 s · “Meta del día y racha motivan a volver.”",
    href: "/",
  },
  {
    id: "capsule",
    label: "Cápsula con voz (3 pasos)",
    detail: "~25 s · Reproducir → avanzar → XP flotante",
    href: "/learning/prevencion-riesgos",
  },
  {
    id: "quiz",
    label: "Quiz: fallar 1 + acertar (B)",
    detail: "~25 s · Vidas, mascota y celebración",
    href: "/learning/prevencion-riesgos/quiz",
  },
  {
    id: "share",
    label: "Resultado + compartir / PNG",
    detail: "~15 s · Insignia, liga y card descargable",
    href: "/learning/prevencion-riesgos/result",
  },
  {
    id: "admin",
    label: "Admin: Paola en vivo",
    detail: "~15 s · KPIs y feed actualizados",
    href: "/admin",
  },
] as const;

export function DemoChecklist() {
  const [done, setDone] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (raw) setDone(JSON.parse(raw) as Record<string, boolean>);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(done));
    } catch {
      // ignore
    }
  }, [done]);

  const completed = STEPS.filter((s) => done[s.id]).length;
  const progress = Math.round((completed / STEPS.length) * 100);

  const toggle = (id: string) => {
    setDone((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const reset = () => setDone({});

  return (
    <section className="surface overflow-hidden">
      <div className="bg-gradient-to-br from-[var(--brand)] to-[#4a55b0] px-5 py-5 text-white">
        <p className="inline-flex items-center gap-2 text-sm text-white/85">
          <Clapperboard size={15} /> Guion de grabación
        </p>
        <h2 className="font-display mt-1 text-2xl font-bold">Demo en ~90 segundos</h2>
        <p className="mt-1 text-sm text-white/85">
          Checklist para el video pitch. Marca cada paso mientras grabas.
        </p>
        <div className="mt-4">
          <div className="mb-1 flex justify-between text-xs text-white/80">
            <span>
              {completed}/{STEPS.length} listos
            </span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <motion.div
              className="h-full rounded-full bg-white"
              animate={{ width: `${progress}%` }}
              transition={{ type: "spring", stiffness: 200, damping: 24 }}
            />
          </div>
        </div>
      </div>

      <ul className="divide-y divide-[var(--line)]">
        {STEPS.map((step, index) => {
          const checked = !!done[step.id];
          return (
            <li key={step.id} className="flex flex-wrap items-center gap-3 px-4 py-3.5">
              <button
                type="button"
                className="flex flex-1 items-start gap-3 text-left"
                onClick={() => toggle(step.id)}
                aria-pressed={checked}
              >
                {checked ? (
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--brand)]" size={20} />
                ) : (
                  <Circle className="mt-0.5 shrink-0 text-[var(--ink-muted)]" size={20} />
                )}
                <div>
                  <p
                    className={`text-sm font-semibold ${checked ? "text-[var(--ink-muted)] line-through" : "text-[var(--ink)]"}`}
                  >
                    {index + 1}. {step.label}
                  </p>
                  <p className="text-xs text-[var(--ink-muted)]">{step.detail}</p>
                </div>
              </button>
              <Link href={step.href} className="btn btn-secondary !px-3 !py-1.5 text-xs">
                Ir
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="flex flex-wrap gap-2 border-t border-[var(--line)] p-4">
        <Link href="/learning/prevencion-riesgos" className="btn btn-primary flex-1">
          Empezar guion
        </Link>
        <motion.button
          type="button"
          className="btn btn-ghost"
          onClick={reset}
          {...pressable}
        >
          <RotateCcw size={15} />
          Limpiar checks
        </motion.button>
      </div>
    </section>
  );
}
