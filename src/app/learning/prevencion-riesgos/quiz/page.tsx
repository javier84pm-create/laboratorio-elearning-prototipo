"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { QuizOption } from "@/components/QuizOption";
import { quizContent } from "@/data/courses";
import { useDemo } from "@/context/DemoContext";

export default function QuizPage() {
  const router = useRouter();
  const { answerQuiz, completeCourse } = useDemo();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);

  const selected = quizContent.options.find((o) => o.id === selectedId);

  const handleCheck = () => {
    if (!selected) return;
    setRevealed(true);
    answerQuiz(selected.correct);
    if (selected.correct) {
      completeCourse();
      window.setTimeout(() => {
        router.push("/learning/prevencion-riesgos/result");
      }, 900);
    }
  };

  const handleRetry = () => {
    setSelectedId(null);
    setRevealed(false);
  };

  return (
    <div className="page-wrap space-y-5">
      <header>
        <p className="chip mb-2">Evaluación · 1 pregunta</p>
        <h1 className="font-display text-2xl font-bold md:text-3xl">Comprueba lo aprendido</h1>
        <p className="mt-2 max-w-2xl text-[var(--ink)]">{quizContent.question}</p>
      </header>

      <div className="space-y-3">
        {quizContent.options.map((option) => (
          <QuizOption
            key={option.id}
            id={option.id}
            label={option.label}
            selected={selectedId === option.id}
            revealed={revealed}
            correct={option.correct}
            feedback={option.feedback}
            onSelect={() => {
              if (revealed && selected?.correct) return;
              setSelectedId(option.id);
              setRevealed(false);
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          type="button"
          className="btn btn-primary flex-1"
          disabled={!selectedId || (revealed && !!selected?.correct)}
          onClick={handleCheck}
        >
          {revealed && selected && !selected.correct ? "Revisar de nuevo" : "Comprobar respuesta"}
        </button>
        {revealed && selected && !selected.correct ? (
          <button type="button" className="btn btn-secondary flex-1" onClick={handleRetry}>
            Intentar otra vez
          </button>
        ) : null}
      </div>

      <p className="text-xs text-[var(--ink-muted)]">
        Puedes reintentar sin límite hasta acertar. La opción correcta es B.
      </p>
    </div>
  );
}
