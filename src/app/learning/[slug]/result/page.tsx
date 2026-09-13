"use client";

import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { CompletionCard } from "@/components/CompletionCard";
import { ShareAchievementCard } from "@/components/ShareAchievementCard";
import { getCourseBySlug } from "@/data/courses";
import { useDemo } from "@/context/DemoContext";

export default function ResultPage() {
  const params = useParams<{ slug: string }>();
  const course = getCourseBySlug(params.slug);
  const {
    lastResultPercent,
    lastDurationLabel,
    isCourseCompleted,
    lastXpEarned,
    lastBadgeName,
    streakDays,
    level,
  } = useDemo();

  if (!course) {
    notFound();
  }

  const completed = isCourseCompleted(course.id);
  const percent = lastResultPercent || 100;

  return (
    <div className="page-wrap space-y-4">
      <CompletionCard
        title={completed ? "¡Lo lograste! 🥳" : "Resultado de la evaluación"}
        percent={percent}
        durationLabel={lastDurationLabel}
        badgeName={lastBadgeName || course.content.badgeName}
        xpEarned={lastXpEarned || 50}
        streakDays={streakDays}
        level={level}
      />

      <ShareAchievementCard
        courseTitle={course.title}
        courseEmoji={course.theme.emoji}
        badgeName={lastBadgeName || course.content.badgeName}
        percent={percent}
        accent={course.theme.primary}
      />

      <div className="flex justify-center">
        <Link href="/learning" className="btn btn-ghost text-sm">
          Volver al catálogo
        </Link>
      </div>
    </div>
  );
}
