"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Building2,
  GraduationCap,
  Landmark,
  Lightbulb,
  Sparkles,
  Workflow,
} from "lucide-react";
import { DemoChecklist } from "@/components/DemoChecklist";
import { OnboardingTour, resetOnboardingFlag } from "@/components/OnboardingTour";
import { SolutionComparison } from "@/components/SolutionComparison";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

const segments = [
  {
    title: "Empresas",
    text: "Cumplimiento operativo sin detener la jornada laboral.",
    icon: Building2,
  },
  {
    title: "Universidades",
    text: "Refuerzo microlearning entre clases y prácticas.",
    icon: GraduationCap,
  },
  {
    title: "OTEC / Público",
    text: "Capacitación masiva con trazabilidad clara.",
    icon: Landmark,
  },
];

const flow = [
  "Contenido extenso",
  "IA + diseño instruccional",
  "Microcápsula 3–5 min",
  "Evaluación práctica",
  "Métricas institucionales",
];

export default function AboutSolutionPage() {
  const [replayTips, setReplayTips] = useState(false);

  return (
    <div className="page-wrap space-y-6">
      <motion.section className="surface overflow-hidden" {...fadeUp}>
        <div className="bg-gradient-to-br from-[var(--brand)] via-[#454fb0] to-[#ff6b4a] px-6 py-8 text-white md:px-8">
          <span className="chip !border-white/20 !bg-white/15 !text-white">
            Propuesta de valor
          </span>
          <h1 className="font-display mt-4 text-3xl font-bold md:text-4xl">SmartCaps</h1>
          <p className="mt-3 max-w-2xl text-white/90">
            Transforma contenidos extensos en microcápsulas interactivas de 3 a 5 minutos, con
            evaluación inmediata, gamificación ligera y panel de trazabilidad.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/learning/prevencion-riesgos" className="btn btn-secondary">
              <Sparkles size={16} />
              Probar la demo
            </Link>
            <Link
              href="/admin"
              className="btn border border-white/30 bg-transparent text-white hover:bg-white/10"
            >
              Ver panel institucional
            </Link>
            <button
              type="button"
              className="btn border border-white/30 bg-transparent text-white hover:bg-white/10"
              onClick={() => {
                resetOnboardingFlag();
                setReplayTips(true);
              }}
            >
              <Lightbulb size={16} />
              Ver tips
            </button>
          </div>
        </div>
      </motion.section>

      <DemoChecklist />

      <motion.section
        className="grid gap-4 md:grid-cols-3"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {segments.map(({ title, text, icon: Icon }) => (
          <motion.article key={title} className="surface card-lift p-5" variants={staggerItem}>
            <span className="mb-3 grid h-10 w-10 place-items-center rounded-xl bg-[var(--brand-soft)] text-[var(--brand)]">
              <Icon size={18} />
            </span>
            <h2 className="font-display text-lg font-semibold">{title}</h2>
            <p className="mt-2 text-sm text-[var(--ink-muted)]">{text}</p>
          </motion.article>
        ))}
      </motion.section>

      <section className="surface p-5">
        <div className="mb-3 flex items-center gap-2">
          <Workflow size={18} className="text-[var(--brand)]" />
          <h2 className="font-display text-lg font-semibold">Flujo de valor</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {flow.map((step, index) => (
            <div key={step} className="flex items-center gap-2">
              <span className="rounded-full bg-[var(--brand-soft)] px-3 py-1.5 text-sm font-medium text-[var(--brand)]">
                {step}
              </span>
              {index < flow.length - 1 ? (
                <span className="text-[var(--ink-muted)]" aria-hidden>
                  →
                </span>
              ) : null}
            </div>
          ))}
        </div>
      </section>

      <SolutionComparison />

      <section className="surface p-5">
        <h2 className="font-display text-lg font-semibold">Integración conceptual</h2>
        <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
          SmartCaps no reemplaza el LMS institucional: lo complementa. La visión incluye empaquetado
          compatible con estándares como SCORM para reportar finalización y resultados hacia la
          plataforma existente (Moodle, LMS corporativo, portal o intranet).
        </p>
        <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {["Moodle", "LMS Corporativo", "Portal Institucional", "Intranet"].map((item) => (
            <div
              key={item}
              className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface-muted)] px-3 py-4 text-center text-sm font-semibold"
            >
              {item}
            </div>
          ))}
        </div>
      </section>

      {replayTips ? (
        <OnboardingTour forceOpen onClose={() => setReplayTips(false)} />
      ) : null}
    </div>
  );
}
