"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Headphones, ShieldCheck, Sparkles } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { MetricCard } from "@/components/MetricCard";
import { ProgressCard } from "@/components/ProgressCard";
import { courses, MAIN_COURSE_ID } from "@/data/courses";
import { currentUser } from "@/data/dashboard";
import { useDemo } from "@/context/DemoContext";

export default function HomePage() {
  const { userProgress, courseCompleted, audioMode } = useDemo();
  const featured = courses.find((c) => c.id === MAIN_COURSE_ID)!;
  const featuredCourse = {
    ...featured,
    status: courseCompleted ? ("completado" as const) : featured.status,
    progress: courseCompleted ? 100 : featured.progress,
  };

  return (
    <div className="page-wrap space-y-6">
      <motion.section
        className="surface overflow-hidden"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="grid gap-6 bg-gradient-to-br from-[var(--brand)] via-[#0f7a69] to-[var(--accent)] p-6 text-white md:grid-cols-[1.4fr_1fr] md:p-8">
          <div>
            <span className="chip !border-white/20 !bg-white/15 !text-white">
              Hola, {currentUser.name}
            </span>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight md:text-4xl">
              SmartCaps
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/90">
              Aprende lo necesario, en el momento necesario. Microcápsulas de 3 a 5 minutos con
              evaluación inmediata.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/learning/${featured.slug}`} className="btn bg-white text-[var(--brand)]">
                Continuar cápsula
                <ArrowRight size={16} />
              </Link>
              <Link href="/learning" className="btn btn-ghost !border-white/25 !text-white">
                Ver catálogo
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
            <p className="mb-3 text-sm text-white/80">Esta semana</p>
            <p className="font-display text-4xl font-bold">
              {userProgress.weeklyCompleted}/{userProgress.weeklyTotal}
            </p>
            <p className="mt-1 text-sm text-white/80">cápsulas completadas</p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Sparkles size={16} /> {userProgress.badgesEarned} insignias
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck size={16} /> Promedio {userProgress.averageScore}%
              </li>
              <li className="flex items-center gap-2">
                <Headphones size={16} /> Modo audio {audioMode ? "activo" : "disponible"}
              </li>
            </ul>
          </div>
        </div>
      </motion.section>

      <section className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          label="Cápsulas"
          value={userProgress.capsulesCompleted}
          hint="Completadas en total"
        />
        <MetricCard
          label="Minutos"
          value={userProgress.totalMinutes}
          hint="Tiempo de formación"
        />
        <MetricCard
          label="Insignias"
          value={userProgress.badgesEarned}
          hint="Logros desbloqueados"
        />
      </section>

      <ProgressCard
        title="Meta semanal"
        completed={userProgress.weeklyCompleted}
        total={userProgress.weeklyTotal}
        caption="Mantén el ritmo con una cápsula más"
      />

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold">Destacada</h2>
            <p className="text-sm text-[var(--ink-muted)]">Tu próxima microcápsula recomendada</p>
          </div>
          <Link href="/learning" className="text-sm font-semibold text-[var(--brand)]">
            Ver todas
          </Link>
        </div>
        <div className="max-w-md">
          <CourseCard
            course={featuredCourse}
            href={`/learning/${featured.slug}`}
            cta={courseCompleted ? "Revisar" : "Empezar"}
          />
        </div>
      </section>
    </div>
  );
}
