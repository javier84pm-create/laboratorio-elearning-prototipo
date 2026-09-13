"use client";

import { useMemo, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { CapsuleBuddy, type BuddyMood } from "@/components/CapsuleBuddy";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { LivesBar, MAX_LIVES } from "@/components/LivesBar";
import { QuizOption } from "@/components/QuizOption";
import { getCourseBySlug } from "@/data/courses";
import { HINT_COST, useDemo } from "@/context/DemoContext";
import { useSfx } from "@/hooks/useSfx";
import { pressable } from "@/lib/motion";

export default function QuizPage() {
  const params = useParams<{ slug: string }>();
  const course = getCourseBySlug(params.slug);
  const router = useRouter();
  const {
    answerQuiz,
    completeCourse,
    attempts,
    incrementAttempt,
    earnXp,
    spendXp,
    startCourse,
    showToast,
    xp,
  } = useDemo();
  const { play, unlock } = useSfx();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const [lives, setLives] = useState(MAX_LIVES);
  const [mood, setMood] = useState<BuddyMood>("think");
  const [hintUsed, setHintUsed] = useState(false);
  const [eliminatedId, setEliminatedId] = useState<string | null>(null);

  if (!course) {
    notFound();
  }

  const quizContent = course.content.quiz;
  const selected = quizContent.options.find((o) => o.id === selectedId);
  const attemptLabel = Math.max(1, attempts + (revealed ? 0 : 1));
  const visibleOptions = quizContent.options.filter((o) => o.id !== eliminatedId);

  const statusLine = useMemo(() => {
    if (celebrate) return "¡Cápsula superada!";
    if (revealed && selected && !selected.correct) {
      return lives <= 0
        ? "Sin vidas… pero en modo práctica puedes seguir"
        : `Te quedan ${lives} ${lives === 1 ? "vida" : "vidas"}`;
    }
    if (hintUsed) return "Pista activa · una opción incorrecta fue descartada";
    return "Elige la mejor acción y comprueba";
  }, [celebrate, revealed, selected, lives, hintUsed]);

  const handleHint = () => {
    if (hintUsed || celebrate || (revealed && selected?.correct)) return;
    unlock();
    const ok = spendXp(HINT_COST, `💡 Pista usada · −${HINT_COST} XP`);
    if (!ok) return;
    const wrong = quizContent.options.find((o) => !o.correct && o.id !== selectedId);
    if (wrong) setEliminatedId(wrong.id);
    setHintUsed(true);
    setMood("encourage");
    showToast("💡 Pista revelada");
  };

  const handleCheck = () => {
    if (!selected) return;
    unlock();
    startCourse(course.id);
    setRevealed(true);
    answerQuiz(selected.correct);
    if (!selected.correct) {
      play("wrong");
      incrementAttempt();
      setLives((prev) => {
        const next = Math.max(0, prev - 1);
        if (next === 0) {
          setMood("encourage");
          showToast("💚 Modo práctica: puedes seguir sin perder el aprendizaje");
        } else {
          setMood("sad");
          showToast("💪 Casi… prueba otra opción");
        }
        return next;
      });
      return;
    }
    play("correct");
    setMood("cheer");
    setCelebrate(true);
    earnXp(25, "🎉 +25 XP · ¡Correcto!");
    completeCourse(course.id);
    window.setTimeout(() => {
      router.push(`/learning/${course.slug}/result`);
    }, 1300);
  };

  const handleRetry = () => {
    play("tap");
    setSelectedId(null);
    setRevealed(false);
    setMood(lives > 0 ? "think" : "encourage");
    if (lives <= 0) {
      setLives(1);
      showToast("❤️ +1 vida de práctica");
      play("xp");
    }
  };

  return (
    <div className="page-wrap relative space-y-5">
      <ConfettiBurst show={celebrate} withSound={false} />

      <header className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="chip"
              style={{ background: course.theme.soft, color: course.theme.primary }}
            >
              {course.theme.emoji} {course.title}
            </span>
            <span className="chip">Intento {attemptLabel}</span>
            <span className="chip">{xp} XP</span>
          </div>
          <LivesBar lives={lives} />
        </div>

        <div
          className="flex flex-wrap items-end justify-between gap-4 rounded-3xl px-4 py-4 text-white"
          style={{
            background: `linear-gradient(135deg, ${course.theme.primary}, color-mix(in srgb, ${course.theme.primary} 60%, #0a4f44))`,
          }}
        >
          <div>
            <p className="text-sm text-white/80">{statusLine}</p>
            <h1 className="font-display mt-1 text-2xl font-bold md:text-3xl">
              Comprueba lo aprendido
            </h1>
          </div>
          <CapsuleBuddy mood={mood} size="lg" />
        </div>

        <p className="max-w-2xl text-[var(--ink)]">{quizContent.question}</p>

        {hintUsed ? (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          >
            <strong className="inline-flex items-center gap-1">
              <Lightbulb size={15} /> Pista:
            </strong>{" "}
            {quizContent.hint}
          </motion.div>
        ) : null}
      </header>

      <div className="space-y-3">
        {visibleOptions.map((option, index) => (
          <QuizOption
            key={option.id}
            index={index}
            id={option.id}
            label={option.label}
            selected={selectedId === option.id}
            revealed={revealed}
            correct={option.correct}
            feedback={
              option.correct && revealed && selected?.correct
                ? `🎉 ${option.feedback}`
                : revealed && selectedId === option.id && !option.correct
                  ? `😅 ${option.feedback}`
                  : option.feedback
            }
            onSelect={() => {
              if (revealed && selected?.correct) return;
              play("tap");
              setSelectedId(option.id);
              setRevealed(false);
              setMood("think");
            }}
          />
        ))}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <motion.button
          type="button"
          className="btn btn-primary flex-1"
          style={{
            background: `linear-gradient(135deg, ${course.theme.primary}, ${course.theme.primary}bb)`,
          }}
          disabled={!selectedId || (revealed && !!selected?.correct)}
          onClick={handleCheck}
          {...pressable}
        >
          {revealed && selected && !selected.correct
            ? "Comprobar otra vez 💪"
            : "Comprobar respuesta ✓"}
        </motion.button>
        {!hintUsed && !(revealed && selected?.correct) ? (
          <motion.button
            type="button"
            className="btn btn-secondary flex-1"
            onClick={handleHint}
            disabled={xp < HINT_COST}
            {...pressable}
          >
            <Lightbulb size={16} />
            Pista (−{HINT_COST} XP)
          </motion.button>
        ) : null}
        {revealed && selected && !selected.correct ? (
          <motion.button
            type="button"
            className="btn btn-secondary flex-1"
            onClick={handleRetry}
            {...pressable}
          >
            Elegir otra opción
          </motion.button>
        ) : null}
      </div>

      <p className="text-xs text-[var(--ink-muted)]">
        Pierdes una vida al fallar. La pista cuesta {HINT_COST} XP y descarta una opción incorrecta.
      </p>
    </div>
  );
}
