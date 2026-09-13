"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Clock3, PlayCircle } from "lucide-react";
import type { Course } from "@/types";
import { ProgressBar } from "@/components/ProgressBar";
import { SegmentBadge } from "@/components/SegmentBadge";
import { pressable } from "@/lib/motion";

export function CourseCard({
  course,
  href,
  cta = "Abrir",
}: {
  course: Course;
  href?: string;
  cta?: string;
}) {
  const target = href ?? `/learning/${course.slug}`;
  const { primary, soft, emoji } = course.theme;

  return (
    <motion.article
      className="surface card-lift flex h-full flex-col overflow-hidden p-0"
      {...pressable}
    >
      <div
        className="flex items-center justify-between gap-2 px-5 py-3"
        style={{ background: soft, borderBottom: `1px solid ${primary}22` }}
      >
        <span className="text-2xl" aria-hidden>
          {emoji}
        </span>
        <SegmentBadge status={course.status} />
      </div>
      <div className="flex flex-1 flex-col p-5 pt-4">
        <div className="mb-2 flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold text-[var(--ink)]">{course.title}</h3>
          <span className="chip shrink-0">{course.level}</span>
        </div>
        <p className="mt-1 flex-1 text-sm leading-relaxed text-[var(--ink-muted)]">
          {course.description}
        </p>
        <div className="mt-4 space-y-3">
          <ProgressBar value={course.progress} label="Avance" compact />
          <div className="flex items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1 text-xs text-[var(--ink-muted)]">
              <Clock3 size={14} />
              {course.durationMinutes} min
            </span>
            <Link
              href={target}
              className="btn !px-3 !py-2 text-sm !text-white hover:!text-white"
              style={{
                color: "#ffffff",
                background: `linear-gradient(135deg, ${primary}, ${primary}cc)`,
                boxShadow: `0 8px 16px ${primary}33`,
              }}
            >
              <PlayCircle size={16} className="text-white" />
              {cta}
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
