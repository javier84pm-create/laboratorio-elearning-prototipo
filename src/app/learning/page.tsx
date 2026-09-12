"use client";

import { CourseCard } from "@/components/CourseCard";
import { courses, MAIN_COURSE_ID } from "@/data/courses";
import { useDemo } from "@/context/DemoContext";

export default function LearningPage() {
  const { courseCompleted, courseStarted } = useDemo();

  const list = courses.map((course) => {
    if (course.id !== MAIN_COURSE_ID) return course;
    if (courseCompleted) {
      return { ...course, status: "completado" as const, progress: 100 };
    }
    if (courseStarted) {
      return { ...course, status: "en_progreso" as const, progress: 40 };
    }
    return course;
  });

  return (
    <div className="page-wrap space-y-5">
      <header>
        <h1 className="font-display text-3xl font-bold">Aprender</h1>
        <p className="mt-1 text-[var(--ink-muted)]">
          Microcápsulas interactivas listas para completar en pocos minutos.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            href={
              course.id === MAIN_COURSE_ID
                ? `/learning/${course.slug}`
                : "/learning"
            }
            cta={course.id === MAIN_COURSE_ID ? "Abrir" : "Demo"}
          />
        ))}
      </div>
    </div>
  );
}
