import Link from "next/link";
import { Clock3, PlayCircle } from "lucide-react";
import type { Course } from "@/types";
import { ProgressBar } from "@/components/ProgressBar";
import { SegmentBadge } from "@/components/SegmentBadge";

export function CourseCard({
  course,
  href,
  cta = "Abrir",
}: {
  course: Course;
  href: string;
  cta?: string;
}) {
  return (
    <article className="surface flex h-full flex-col p-5">
      <div className="mb-3 flex items-start justify-between gap-3">
        <SegmentBadge status={course.status} />
        <span className="chip">{course.level}</span>
      </div>
      <h3 className="font-display text-lg font-semibold text-[var(--ink)]">{course.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">
        {course.description}
      </p>
      <div className="mt-4 space-y-3">
        <ProgressBar value={course.progress} label="Avance" compact />
        <div className="flex items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1 text-xs text-[var(--ink-muted)]">
            <Clock3 size={14} />
            {course.durationMinutes} min
          </span>
          <Link href={href} className="btn btn-primary !px-3 !py-2 text-sm">
            <PlayCircle size={16} />
            {cta}
          </Link>
        </div>
      </div>
    </article>
  );
}
