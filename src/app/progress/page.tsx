"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Circle,
  Flame,
  Target,
  Zap,
} from "lucide-react";
import { BadgeCard } from "@/components/BadgeCard";
import { CountUp } from "@/components/CountUp";
import { MetricCard } from "@/components/MetricCard";
import { ProgressCard } from "@/components/ProgressCard";
import { ProgressBar } from "@/components/ProgressBar";
import { WeeklyLeagueCard } from "@/components/WeeklyLeagueCard";
import { DailyGoalCard } from "@/components/DailyGoalCard";
import { StreakRiskBanner } from "@/components/StreakRiskBanner";
import { badges } from "@/data/badges";
import { courses, MAIN_COURSE_ID } from "@/data/courses";
import { useDemo } from "@/context/DemoContext";
import { fadeUp, staggerContainer, staggerItem } from "@/lib/motion";

export default function ProgressPage() {
  const {
    userProgress,
    isCourseCompleted,
    getSession,
    justUnlockedBadge,
    lastCompletedCourseId,
    clearJustUnlockedBadge,
    xp,
    level,
    xpProgressPercent,
    xpToNextLevel,
    streakDays,
  } = useDemo();

  const badgeList = badges.map((badge) =>
    badge.courseId ? { ...badge, earned: isCourseCompleted(badge.courseId) } : badge,
  );

  const mainSession = getSession(MAIN_COURSE_ID);
  const mainDone = isCourseCompleted(MAIN_COURSE_ID);
  const anyStarted = courses.some(
    (c) => getSession(c.id)?.started || isCourseCompleted(c.id),
  );

  const activity = [
    {
      done: mainDone,
      label: "Completar Prevención de Riesgos",
      detail: mainDone ? "¡Listo! Insignia desbloqueada" : "Pendiente de evaluación",
    },
    {
      done: anyStarted,
      label: "Iniciar una microcápsula",
      detail: mainSession?.started
        ? `Paso ${mainSession.capsuleStep + 1} de 3 en Prevención`
        : anyStarted
          ? "Ya tienes avance en el catálogo"
          : "Aún no has empezado hoy",
    },
    {
      done: streakDays >= 2,
      label: "Mantener racha de aprendizaje",
      detail: `Racha actual: x${streakDays}`,
    },
    {
      done: userProgress.weeklyCompleted >= userProgress.weeklyTotal,
      label: "Cerrar meta semanal",
      detail: `${userProgress.weeklyCompleted}/${userProgress.weeklyTotal} cápsulas`,
    },
  ];

  const nextCourse =
    courses.find((c) => !isCourseCompleted(c.id)) ?? courses[0];

  return (
    <div className="page-wrap space-y-6">
      <motion.header className="flex flex-wrap items-end justify-between gap-4" {...fadeUp}>
        <div>
          <h1 className="font-display text-3xl font-bold">Mi progreso</h1>
          <p className="mt-1 text-[var(--ink-muted)]">
            Tu avance personal, motivadores y logros desbloqueados.
          </p>
        </div>
        <Link href={`/learning/${nextCourse.slug}`} className="btn btn-primary">
          Seguir aprendiendo
          <ArrowRight size={16} />
        </Link>
      </motion.header>

      <StreakRiskBanner />
      <DailyGoalCard />

      <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <article className="surface overflow-hidden">
          <div className="bg-gradient-to-br from-[var(--brand)] to-[var(--accent)] p-5 text-white">
            <p className="text-sm text-white/80">Nivel de aprendiz</p>
            <p className="font-display text-4xl font-bold">Nivel {level}</p>
            <p className="mt-1 text-sm text-white/85">{xp} XP acumulados</p>
          </div>
          <div className="space-y-4 p-5">
            <ProgressBar
              value={xpProgressPercent}
              label={`Faltan ${xpToNextLevel} XP para el nivel ${level + 1}`}
            />
            <div className="flex flex-wrap gap-2">
              <span className="chip">
                <Zap size={14} /> {xp} XP
              </span>
              <span className="chip">
                <Flame size={14} /> Racha x{streakDays}
              </span>
              <span className="chip">
                <Target size={14} /> Meta {userProgress.weeklyCompleted}/
                {userProgress.weeklyTotal}
              </span>
            </div>
          </div>
        </article>

        <article className="surface p-5">
          <h2 className="font-display mb-3 text-lg font-semibold">Checklist de motivación</h2>
          <ul className="space-y-3">
            {activity.map((item) => (
              <li
                key={item.label}
                className="flex items-start gap-3 rounded-2xl bg-[var(--surface-muted)] p-3"
              >
                {item.done ? (
                  <CheckCircle2 className="mt-0.5 shrink-0 text-[var(--brand)]" size={18} />
                ) : (
                  <Circle className="mt-0.5 shrink-0 text-[var(--ink-muted)]" size={18} />
                )}
                <div>
                  <p className="text-sm font-semibold text-[var(--ink)]">{item.label}</p>
                  <p className="text-xs text-[var(--ink-muted)]">{item.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Cápsulas" value={<CountUp value={userProgress.capsulesCompleted} />} />
        <MetricCard label="Insignias" value={<CountUp value={userProgress.badgesEarned} />} />
        <MetricCard label="Promedio" value={`${userProgress.averageScore}%`} />
        <MetricCard label="Minutos" value={<CountUp value={userProgress.totalMinutes} />} />
      </section>

      <ProgressCard
        title="Meta semanal"
        completed={userProgress.weeklyCompleted}
        total={userProgress.weeklyTotal}
        caption="Completa una cápsula más para cerrar la semana"
        pulse={userProgress.weeklyCompleted === userProgress.weeklyTotal - 1}
      />

      <WeeklyLeagueCard xp={xp} weeklyCompleted={userProgress.weeklyCompleted} />

      <section className="surface p-5">
        <h2 className="font-display mb-3 text-lg font-semibold">Historial de ruta</h2>
        <div className="space-y-2">
          {courses.map((course) => {
            const done = isCourseCompleted(course.id);
            const started = !!getSession(course.id)?.started;
            return (
              <Link
                key={course.id}
                href={`/learning/${course.slug}`}
                className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[var(--surface-muted)] px-3 py-2.5 text-sm transition hover:bg-[var(--brand-soft)]"
              >
                <span className="font-medium">{course.title}</span>
                <span className={`chip ${done ? "!bg-[var(--brand)] !text-white" : ""}`}>
                  {done ? "Completado" : started ? "En progreso" : "Pendiente"}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-display mb-3 text-xl font-semibold">Insignias</h2>
        <motion.div
          className="grid gap-3 sm:grid-cols-2"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          {badgeList.map((badge) => {
            const highlight =
              justUnlockedBadge &&
              badge.courseId === lastCompletedCourseId &&
              badge.earned;
            return (
              <motion.div key={badge.id} variants={staggerItem}>
                <BadgeCard
                  badge={badge}
                  highlight={highlight}
                  onHighlightSeen={highlight ? clearJustUnlockedBadge : undefined}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </section>
    </div>
  );
}
