"use client";

import { BadgeCard } from "@/components/BadgeCard";
import { MetricCard } from "@/components/MetricCard";
import { ProgressCard } from "@/components/ProgressCard";
import { badges } from "@/data/badges";
import { useDemo } from "@/context/DemoContext";

export default function ProgressPage() {
  const { userProgress, courseCompleted } = useDemo();

  const badgeList = badges.map((badge) =>
    badge.courseId === "prevencion-riesgos"
      ? { ...badge, earned: courseCompleted || badge.earned }
      : badge,
  );

  return (
    <div className="page-wrap space-y-6">
      <header>
        <h1 className="font-display text-3xl font-bold">Mi progreso</h1>
        <p className="mt-1 text-[var(--ink-muted)]">
          Seguimiento de cápsulas, resultados e insignias.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard label="Cápsulas" value={userProgress.capsulesCompleted} />
        <MetricCard label="Insignias" value={userProgress.badgesEarned} />
        <MetricCard label="Promedio" value={`${userProgress.averageScore}%`} />
        <MetricCard label="Minutos" value={userProgress.totalMinutes} />
      </section>

      <ProgressCard
        title="Meta semanal"
        completed={userProgress.weeklyCompleted}
        total={userProgress.weeklyTotal}
        caption="Completa una cápsula más para cerrar la semana"
      />

      <section>
        <h2 className="font-display mb-3 text-xl font-semibold">Insignias</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {badgeList.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </section>
    </div>
  );
}
