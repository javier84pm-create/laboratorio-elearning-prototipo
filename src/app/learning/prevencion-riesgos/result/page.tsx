"use client";

import { CompletionCard } from "@/components/CompletionCard";
import { useDemo } from "@/context/DemoContext";

export default function ResultPage() {
  const { lastResultPercent, lastDurationLabel, courseCompleted } = useDemo();

  return (
    <div className="page-wrap">
      <CompletionCard
        title={
          courseCompleted
            ? "¡Cápsula completada!"
            : "Resultado de la evaluación"
        }
        percent={lastResultPercent || 100}
        durationLabel={lastDurationLabel}
        badgeName="Seguridad Nivel 1"
      />
    </div>
  );
}
