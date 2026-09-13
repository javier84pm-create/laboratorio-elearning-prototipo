"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Headphones, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { CourseCard } from "@/components/CourseCard";
import { CountUp } from "@/components/CountUp";
import { MetricCard } from "@/components/MetricCard";
import { ProgressCard } from "@/components/ProgressCard";
import { DailyGoalCard } from "@/components/DailyGoalCard";
import { StreakRiskBanner } from "@/components/StreakRiskBanner";
import { courses, MAIN_COURSE_ID } from "@/data/courses";
import { currentUser } from "@/data/dashboard";
import { useDemo } from "@/context/DemoContext";
import { fadeUp } from "@/lib/motion";

export default function HomePage() {
  const {
    userProgress,
    isCourseCompleted,
    getSession,
    audioMode,
    streakDays,
    level,
    xp,
    xpProgressPercent,
  } = useDemo();

  const featured = courses.find((c) => c.id === MAIN_COURSE_ID)!;
  const featuredDone = isCourseCompleted(MAIN_COURSE_ID);
  const featuredSession = getSession(MAIN_COURSE_ID);
  const featuredStarted = !!featuredSession?.started;
  const featuredCourse = {
    ...featured,
    status: featuredDone
      ? ("completado" as const)
      : featuredStarted
        ? ("en_progreso" as const)
        : featured.status,
    progress: featuredDone
      ? 100
      : featuredStarted
        ? Math.max(20, (featuredSession.capsuleStep + 1) * 30)
        : 0,
  };

  const nearWeeklyGoal =
    userProgress.weeklyCompleted === userProgress.weeklyTotal - 1 && !featuredDone;

  const ctaLabel = featuredDone
    ? "Revisar cápsula"
    : featuredStarted
      ? "Continuar cápsula"
      : "Comenzar cápsula";

  return (
    <div className="page-wrap space-y-6">
      <motion.section className="surface overflow-hidden" {...fadeUp}>
        <div className="grid gap-6 bg-gradient-to-br from-[var(--brand)] via-[#0f7a69] to-[var(--accent)] p-6 text-white md:grid-cols-[1.4fr_1fr] md:p-8">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="chip !border-white/20 !bg-white/15 !text-white">
                Hola, {currentUser.name}
              </span>
              <span className="chip !border-white/20 !bg-white/15 !text-white">
                <Flame size={13} /> Racha x{streakDays}
              </span>
              <span className="chip !border-white/20 !bg-white/15 !text-white">
                <Zap size={13} /> Nivel {level}
              </span>
            </div>
            <h1 className="font-display mt-4 text-3xl font-bold leading-tight md:text-4xl">
              SmartCaps
            </h1>
            <p className="mt-3 max-w-xl text-base text-white/90">
              Aprende lo necesario, en el momento necesario. Microcápsulas de 3 a 5 minutos con
              evaluación inmediata y recompensas que mantienen la motivación.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={`/learning/${featured.slug}`} className="btn btn-secondary">
                {ctaLabel}
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/learning"
                className="btn border border-white/30 bg-transparent text-white hover:bg-white/10"
              >
                Ver catálogo
              </Link>
            </div>
          </div>
          <div className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
            <p className="mb-3 text-sm text-white/80">Esta semana</p>
            <p
              className={`font-display text-4xl font-bold ${
                nearWeeklyGoal ? "animate-pulse-soft" : ""
              }`}
            >
              {userProgress.weeklyCompleted}/{userProgress.weeklyTotal}
            </p>
            <p className="mt-1 text-sm text-white/80">
              {nearWeeklyGoal
                ? "¡Te falta 1 para cerrar la semana!"
                : "cápsulas completadas"}
            </p>
            <div className="mt-4">
              <div className="mb-1 flex justify-between text-xs text-white/75">
                <span>XP hacia nivel {level + 1}</span>
                <span>{xp} XP</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/20">
                <div
                  className="h-full rounded-full bg-white transition-all duration-500"
                  style={{ width: `${xpProgressPercent}%` }}
                />
              </div>
            </div>
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

      <StreakRiskBanner />
      <DailyGoalCard />

      <section className="grid gap-4 sm:grid-cols-3">
        <MetricCard
          label="Cápsulas"
          value={<CountUp value={userProgress.capsulesCompleted} />}
          hint="Completadas en total"
        />
        <MetricCard
          label="Minutos"
          value={<CountUp value={userProgress.totalMinutes} />}
          hint="Tiempo de formación"
        />
        <MetricCard
          label="Insignias"
          value={<CountUp value={userProgress.badgesEarned} />}
          hint="Logros desbloqueados"
        />
      </section>

      <ProgressCard
        title="Meta semanal"
        completed={userProgress.weeklyCompleted}
        total={userProgress.weeklyTotal}
        caption={
          nearWeeklyGoal
            ? "Una cápsula más y cierras la semana con todo"
            : "Mantén el ritmo con microaprendizaje diario"
        }
        pulse={nearWeeklyGoal}
      />

      <section>
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <h2 className="font-display text-xl font-semibold">Continúa ahora</h2>
            <p className="text-sm text-[var(--ink-muted)]">Tu próxima microcápsula recomendada</p>
          </div>
          <Link href="/learning" className="text-sm font-semibold text-[var(--brand)]">
            Ver catálogo
          </Link>
        </div>
        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
          <CourseCard
            course={featuredCourse}
            href={`/learning/${featured.slug}`}
            cta={featuredDone ? "Revisar" : featuredStarted ? "Continuar" : "Empezar"}
          />
          <div className="surface p-5">
            <h3 className="font-display text-lg font-semibold">Por qué vuelve la gente</h3>
            <ul className="mt-3 space-y-3 text-sm text-[var(--ink-muted)]">
              <li className="rounded-xl bg-[var(--surface-muted)] px-3 py-2">
                Sabes exactamente cuánto dura antes de empezar.
              </li>
              <li className="rounded-xl bg-[var(--surface-muted)] px-3 py-2">
                Ganas XP e insignias al aplicar lo aprendido.
              </li>
              <li className="rounded-xl bg-[var(--surface-muted)] px-3 py-2">
                Puedes escuchar en modo audio sin mirar la pantalla.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
