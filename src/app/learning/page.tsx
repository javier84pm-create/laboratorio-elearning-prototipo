"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  Clock3,
  Flame,
  PlayCircle,
  Sparkles,
  Star,
  Timer,
  Zap,
} from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { StreakRiskBanner } from "@/components/StreakRiskBanner";
import { courses, MAIN_COURSE_ID } from "@/data/courses";
import { useDemo } from "@/context/DemoContext";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";
import type { Course } from "@/types";

function withLiveProgress(
  course: Course,
  opts: {
    isCompleted: (id: string) => boolean;
    getSession: (id: string) => { started: boolean; capsuleStep: number } | undefined;
  },
): Course {
  if (opts.isCompleted(course.id)) {
    return { ...course, status: "completado", progress: 100 };
  }
  const session = opts.getSession(course.id);
  if (session?.started) {
    const total = course.content.steps.length;
    return {
      ...course,
      status: "en_progreso",
      progress: Math.max(25, Math.round(((session.capsuleStep + 1) / total) * 90)),
    };
  }
  return { ...course, status: "pendiente", progress: 0 };
}

export default function LearningPage() {
  const { isCourseCompleted, getSession, streakDays, level } = useDemo();

  const list = courses.map((course) =>
    withLiveProgress(course, { isCompleted: isCourseCompleted, getSession }),
  );

  const featured = list.find((c) => c.id === MAIN_COURSE_ID)!;
  const featuredDone = isCourseCompleted(featured.id);
  const featuredStarted = !!getSession(featured.id)?.started;

  return (
    <div className="page-wrap space-y-6">
      <motion.header {...fadeUp}>
        <p className="chip mb-2">
          <BookOpen size={14} /> Catálogo de microcápsulas
        </p>
        <h1 className="font-display text-3xl font-bold">Aprender</h1>
        <p className="mt-1 max-w-2xl text-[var(--ink-muted)]">
          Seis cápsulas listas para practicar: contenido, voz, evaluación e insignia.
        </p>
      </motion.header>

      <StreakRiskBanner />

      <Link
        href="/learning/practice"
        className="surface card-lift flex flex-wrap items-center justify-between gap-4 p-5 transition hover:border-[var(--brand)]/40"
      >
        <div className="flex items-start gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[var(--brand-soft)] text-xl">
            ⚡
          </span>
          <div>
            <p className="chip mb-1">
              <Timer size={13} /> 60 segundos
            </p>
            <h2 className="font-display text-xl font-bold">Práctica rápida</h2>
            <p className="mt-1 text-sm text-[var(--ink-muted)]">
              Solo evaluación, XP al instante y salvas tu racha.
            </p>
          </div>
        </div>
        <span className="btn btn-primary">
          <Zap size={16} /> Empezar
        </span>
      </Link>

      <motion.section
        className="surface overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid gap-0 md:grid-cols-[1.2fr_0.8fr]">
          <div
            className="p-6 text-white md:p-7"
            style={{
              background: `linear-gradient(135deg, ${featured.theme.primary}, color-mix(in srgb, ${featured.theme.primary} 55%, #0a4f44))`,
            }}
          >
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              {featured.theme.emoji} Recomendada hoy
            </span>
            <h2 className="font-display mt-3 text-2xl font-bold">{featured.title}</h2>
            <p className="mt-2 text-sm text-white/85">{featured.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="rounded-full bg-black/15 px-2.5 py-1">
                <Clock3 className="mr-1 inline" size={12} /> {featured.durationMinutes} min
              </span>
              <span className="rounded-full bg-black/15 px-2.5 py-1">
                Avance {featured.progress}%
              </span>
              <span className="rounded-full bg-black/15 px-2.5 py-1">
                <Flame className="mr-1 inline" size={12} /> Racha x{streakDays}
              </span>
            </div>
            <Link
              href={`/learning/${featured.slug}`}
              className="btn btn-secondary mt-6 inline-flex"
            >
              <PlayCircle size={16} />
              {featuredDone ? "Revisar" : featuredStarted ? "Continuar" : "Empezar ahora"}
              <ArrowRight size={16} />
            </Link>
          </div>
          <div className="space-y-3 bg-[var(--surface-muted)] p-6">
            <p className="text-sm font-semibold text-[var(--brand)]">Tu ruta de hoy</p>
            {[
              "Escucha o lee la microcápsula (3 pasos)",
              "Responde la evaluación práctica",
              "Gana XP, insignia y sube tu racha",
            ].map((item, i) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-[var(--line)] bg-white p-3 text-sm"
              >
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-[var(--brand-soft)] text-xs font-bold text-[var(--brand)]">
                  {i + 1}
                </span>
                <p className="text-[var(--ink)]">{item}</p>
              </div>
            ))}
            <p className="pt-1 text-xs text-[var(--ink-muted)]">
              Nivel actual {level} · el progreso se guarda en este dispositivo
            </p>
          </div>
        </div>
      </motion.section>

      <section>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="font-display text-xl font-semibold">Todo el catálogo</h2>
          <span className="chip">
            <Star size={13} /> {list.length} cápsulas
          </span>
        </div>
        <motion.div
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {list.map((course) => (
            <motion.div key={course.id} variants={staggerItem}>
              <CourseCard
                course={course}
                cta={
                  isCourseCompleted(course.id)
                    ? "Revisar"
                    : getSession(course.id)?.started
                      ? "Continuar"
                      : "Empezar"
                }
              />
            </motion.div>
          ))}
        </motion.div>
        <p className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--ink-muted)]">
          <Sparkles size={14} className="text-[var(--brand)]" />
          Cada cápsula incluye contenido, evaluación e insignia.
        </p>
      </section>
    </div>
  );
}
