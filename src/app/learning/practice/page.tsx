"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Timer, Zap } from "lucide-react";
import { CapsuleBuddy, type BuddyMood } from "@/components/CapsuleBuddy";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { QuizOption } from "@/components/QuizOption";
import { courses } from "@/data/courses";
import { useDemo } from "@/context/DemoContext";
import { useSfx } from "@/hooks/useSfx";
import { pressable } from "@/lib/motion";
import type { Course } from "@/types";

const PRACTICE_SECONDS = 60;

function pickCourse(excludeId?: string): Course {
  const pool = excludeId ? courses.filter((c) => c.id !== excludeId) : courses;
  return pool[Math.floor(Math.random() * pool.length)] ?? courses[0];
}

export default function QuickPracticePage() {
  const router = useRouter();
  const { earnXp, claimDailyProgress, showToast, xp, level } = useDemo();
  const { play, unlock } = useSfx();

  const [course, setCourse] = useState<Course>(() => pickCourse());
  const [secondsLeft, setSecondsLeft] = useState(PRACTICE_SECONDS);
  const [running, setRunning] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [celebrate, setCelebrate] = useState(false);
  const [finished, setFinished] = useState(false);
  const [mood, setMood] = useState<BuddyMood>("think");

  const quiz = course.content.quiz;
  const selected = quiz.options.find((o) => o.id === selectedId);
  const urgent = secondsLeft <= 10;

  useEffect(() => {
    if (!running || finished) return;
    if (secondsLeft <= 0) {
      setRunning(false);
      setFinished(true);
      setMood(score > 0 ? "cheer" : "encourage");
      play("streak");
      claimDailyProgress();
      showToast(score > 0 ? "⏱️ Tiempo · ¡práctica terminada!" : "⏱️ Se acabó el tiempo");
      return;
    }
    const id = window.setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => window.clearTimeout(id);
  }, [secondsLeft, running, finished, score, play, claimDailyProgress, showToast]);

  const accuracy = useMemo(
    () => (answered ? Math.round((score / answered) * 100) : 0),
    [score, answered],
  );

  const nextQuestion = () => {
    setCourse(pickCourse(course.id));
    setSelectedId(null);
    setRevealed(false);
    setMood("think");
    setCelebrate(false);
  };

  const handleCheck = () => {
    if (!selected || revealed || finished) return;
    unlock();
    setRevealed(true);
    setAnswered((n) => n + 1);
    if (!selected.correct) {
      play("wrong");
      setMood("sad");
      showToast("💪 Sigue · la próxima sale");
      return;
    }
    play("correct");
    setMood("cheer");
    setCelebrate(true);
    setScore((n) => n + 1);
    earnXp(15, "⚡ +15 XP práctica");
    claimDailyProgress();
    window.setTimeout(() => {
      if (secondsLeft > 3 && !finished) nextQuestion();
    }, 900);
  };

  const handleFinishEarly = () => {
    setRunning(false);
    setFinished(true);
    claimDailyProgress();
    play("tap");
  };

  if (finished) {
    return (
      <div className="page-wrap space-y-5">
        <ConfettiBurst show={score > 0} withSound={score > 0} />
        <div className="surface overflow-hidden">
          <div className="bg-gradient-to-br from-[var(--brand)] to-[var(--accent)] px-6 py-8 text-white">
            <p className="text-sm text-white/80">Práctica rápida</p>
            <h1 className="font-display mt-1 text-3xl font-bold">
              {score > 0 ? "¡Buen ritmo! ⚡" : "Fin del round"}
            </h1>
            <p className="mt-2 text-white/85">
              Acertaste {score} de {answered} · precisión {accuracy}%
            </p>
          </div>
          <div className="grid gap-3 p-5 sm:grid-cols-3">
            <div className="rounded-2xl bg-[var(--brand-soft)] p-4">
              <p className="text-xs text-[var(--ink-muted)]">Aciertos</p>
              <p className="font-display text-3xl font-bold text-[var(--brand)]">{score}</p>
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
              <p className="text-xs text-[var(--ink-muted)]">Respondidas</p>
              <p className="font-display text-3xl font-bold">{answered}</p>
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] p-4">
              <p className="text-xs text-[var(--ink-muted)]">Nivel</p>
              <p className="font-display text-3xl font-bold">{level}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 border-t border-[var(--line)] p-5 sm:flex-row">
            <motion.button
              type="button"
              className="btn btn-primary flex-1"
              onClick={() => {
                setCourse(pickCourse());
                setSecondsLeft(PRACTICE_SECONDS);
                setRunning(true);
                setFinished(false);
                setScore(0);
                setAnswered(0);
                setSelectedId(null);
                setRevealed(false);
                setMood("think");
              }}
              {...pressable}
            >
              Otra ronda
            </motion.button>
            <Link href="/learning" className="btn btn-secondary flex-1">
              Volver al catálogo
            </Link>
            <Link href="/progress" className="btn btn-ghost flex-1">
              Ver progreso
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrap space-y-5">
      <ConfettiBurst show={celebrate} />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          className="inline-flex items-center gap-1 text-sm text-[var(--ink-muted)] hover:text-[var(--brand)]"
          onClick={() => router.push("/learning")}
        >
          <ArrowLeft size={14} /> Catálogo
        </button>
        <div className="flex flex-wrap gap-2">
          <span className="chip">
            <Zap size={13} /> {xp} XP
          </span>
          <span className="chip">⚡ Aciertos {score}</span>
          <span
            className={`chip tabular-nums ${urgent ? "!bg-rose-100 !text-rose-800 !border-rose-300 animate-pulse-soft" : ""}`}
          >
            <Timer size={13} /> {secondsLeft}s
          </span>
        </div>
      </div>

      <header
        className="flex flex-wrap items-end justify-between gap-4 rounded-3xl px-5 py-5 text-white"
        style={{
          background: `linear-gradient(135deg, ${course.theme.primary}, color-mix(in srgb, ${course.theme.primary} 55%, #0a4f44))`,
        }}
      >
        <div>
          <p className="text-sm text-white/80">
            {course.theme.emoji} Práctica rápida · {course.title}
          </p>
          <h1 className="font-display mt-1 text-2xl font-bold md:text-3xl">60 segundos</h1>
          <p className="mt-1 text-sm text-white/85">Responde lo más que puedas. Suma XP y salva tu racha.</p>
        </div>
        <CapsuleBuddy mood={mood} size="lg" />
      </header>

      <p className="text-lg font-medium text-[var(--ink)]">{quiz.question}</p>

      <div className="space-y-3">
        {quiz.options.map((option, index) => (
          <QuizOption
            key={`${course.id}-${option.id}`}
            index={index}
            id={option.id}
            label={option.label}
            selected={selectedId === option.id}
            revealed={revealed}
            correct={option.correct}
            feedback={
              revealed && selectedId === option.id
                ? option.correct
                  ? `🎉 ${option.feedback}`
                  : `😅 ${option.feedback}`
                : option.feedback
            }
            onSelect={() => {
              if (revealed) return;
              play("tap");
              setSelectedId(option.id);
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        <motion.button
          type="button"
          className="btn btn-primary flex-1"
          style={{
            background: `linear-gradient(135deg, ${course.theme.primary}, ${course.theme.primary}bb)`,
          }}
          disabled={!selectedId || revealed}
          onClick={handleCheck}
          {...pressable}
        >
          Comprobar
        </motion.button>
        {revealed && !selected?.correct ? (
          <motion.button
            type="button"
            className="btn btn-secondary flex-1"
            onClick={nextQuestion}
            {...pressable}
          >
            Siguiente pregunta
          </motion.button>
        ) : null}
        <motion.button
          type="button"
          className="btn btn-ghost flex-1"
          onClick={handleFinishEarly}
          {...pressable}
        >
          Terminar
        </motion.button>
      </div>
    </div>
  );
}
