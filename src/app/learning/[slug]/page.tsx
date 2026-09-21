"use client";

import { useEffect, useState } from "react";
import { notFound, useParams, useRouter } from "next/navigation";
import { Flame, Zap } from "lucide-react";
import { LearningPlayer } from "@/components/LearningPlayer";
import { getCourseBySlug } from "@/data/courses";
import { useDemo } from "@/context/DemoContext";
import { useSpeech } from "@/hooks/useSpeech";
import { useSfx } from "@/hooks/useSfx";

function buildNarration(title: string, body: string, tip: string) {
  return `${title}. ${body} Consejo: ${tip}`;
}

export default function CapsulePlayerPage() {
  const params = useParams<{ slug: string }>();
  const course = getCourseBySlug(params.slug);
  const router = useRouter();
  const {
    audioMode,
    setAudioMode,
    startCourse,
    capsuleStep,
    setCapsuleStep,
    advanceStep,
    remainingSeconds,
    tickLearning,
    registerPlayDay,
    earnXp,
    streakDays,
    xp,
    level,
    courseStarted,
    showToast,
  } = useDemo();
  const { play, unlock } = useSfx();

  const { supported, speaking, voicesReady, speak, stop, pause, resume } = useSpeech();
  const [playing, setPlaying] = useState(false);
  const [autoStarted, setAutoStarted] = useState(false);

  const steps = course?.content.steps ?? [];
  const step = steps[capsuleStep] ?? steps[0];
  const lastStepIndex = Math.max(0, steps.length - 1);

  useEffect(() => {
    if (!course) return;
    startCourse(course.id);
    registerPlayDay();
    return () => stop();
  }, [course, startCourse, registerPlayDay, stop]);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => tickLearning(), 1000);
    return () => window.clearInterval(id);
  }, [playing, tickLearning]);

  useEffect(() => {
    if (!supported || !step) return;
    if (!playing) {
      pause();
      return;
    }
    speak(buildNarration(step.title, step.body, step.tip));
  }, [capsuleStep, playing, supported, voicesReady, speak, pause, step]);

  useEffect(() => {
    if (autoStarted || !supported || !course) return;
    setAutoStarted(true);
    showToast("🎧 Pulsa Reproducir para oír la narración del caso");
  }, [autoStarted, supported, showToast, course]);

  if (!course || !step) {
    notFound();
  }

  const buddyMood = speaking
    ? ("speak" as const)
    : playing
      ? ("happy" as const)
      : audioMode
        ? ("speak" as const)
        : ("idle" as const);

  const handleTogglePlay = () => {
    unlock();
    play("tap");
    if (playing) {
      pause();
      setPlaying(false);
      return;
    }

    if (typeof window !== "undefined" && window.speechSynthesis?.paused) {
      resume();
      setPlaying(true);
      return;
    }

    setPlaying(true);
    if (!supported) {
      showToast("😅 Tu navegador no soporta voz. Sigue en texto.");
    }
  };

  const handleNext = () => {
    unlock();
    stop();
    if (!courseStarted) startCourse(course.id);
    advanceStep(lastStepIndex);
    earnXp(8, "✨ +8 XP por avanzar");
    setPlaying(true);
  };

  const handleGoQuiz = () => {
    unlock();
    stop();
    setPlaying(false);
    earnXp(12, "📝 +12 XP · listo para evaluar");
    router.push(`/learning/${course.slug}/quiz`);
  };

  const handleStepJump = (index: number) => {
    play("tap");
    stop();
    setCapsuleStep(index);
    if (playing) setPlaying(true);
  };

  return (
    <div className="page-wrap space-y-4">
      <header className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <p
            className="chip mb-2"
            style={{ background: course.theme.soft, color: course.theme.primary }}
          >
            {course.theme.emoji} {course.title}
          </p>
          <h1 className="font-display text-2xl font-bold md:text-3xl">Microcápsula viva</h1>
          <p className="mt-1 text-sm text-[var(--ink-muted)]">
            {steps.length} pasos · timer real ·{" "}
            {supported ? "narración de audio disponible" : "texto (voz no disponible)"}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="chip">
            <Flame size={14} /> 🔥 Racha x{streakDays}
          </span>
          <span className="chip">
            <Zap size={14} /> Nv.{level} · {xp} XP
          </span>
        </div>
      </header>

      <LearningPlayer
        stepIndex={capsuleStep}
        totalSteps={steps.length}
        title={step.title}
        body={step.body}
        tip={step.tip}
        remainingSeconds={remainingSeconds}
        playing={playing}
        speaking={speaking || playing}
        audioMode={audioMode}
        voiceSupported={supported}
        accentColor={course.theme.primary}
        courseEmoji={course.theme.emoji}
        buddyMood={buddyMood}
        onTogglePlay={handleTogglePlay}
        onToggleAudio={() => {
          play("tap");
          const next = !audioMode;
          setAudioMode(next);
          if (next) {
            showToast("🎧 Solo audio: el texto pasa a segundo plano");
            // Activa narración al entrar al modo
            if (!playing) {
              if (typeof window !== "undefined" && window.speechSynthesis?.paused) {
                resume();
              }
              setPlaying(true);
              if (!supported) {
                showToast("😅 Sin voz en este navegador · puedes abrir “Ver texto del paso”");
              }
            }
          } else {
            showToast("📖 Modo lectura activado");
          }
        }}
        onNext={handleNext}
        onGoQuiz={handleGoQuiz}
      />

      <div className="flex gap-2">
        {steps.map((s, i) => (
          <button
            key={s.id}
            type="button"
            className="h-2 flex-1 rounded-full transition"
            style={{
              background: i <= capsuleStep ? course.theme.primary : "var(--line)",
            }}
            aria-label={`Ir al paso ${i + 1}`}
            onClick={() => handleStepJump(i)}
          />
        ))}
      </div>
    </div>
  );
}
