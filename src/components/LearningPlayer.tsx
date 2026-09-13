"use client";

import { motion } from "framer-motion";
import { Clock3, Pause, Play, Volume2 } from "lucide-react";
import { CapsuleBuddy, type BuddyMood } from "@/components/CapsuleBuddy";
import { ProgressBar } from "@/components/ProgressBar";
import { pressable } from "@/lib/motion";

function formatClock(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60);
  const s = String(totalSeconds % 60).padStart(2, "0");
  return `${m}:${s}`;
}

export function LearningPlayer({
  stepIndex,
  totalSteps,
  title,
  body,
  tip,
  remainingSeconds,
  playing,
  speaking,
  audioMode,
  voiceSupported = true,
  accentColor,
  courseEmoji = "📚",
  buddyMood = "idle",
  onTogglePlay,
  onToggleAudio,
  onNext,
  onGoQuiz,
}: {
  stepIndex: number;
  totalSteps: number;
  title: string;
  body: string;
  tip: string;
  remainingSeconds: number;
  playing: boolean;
  speaking: boolean;
  audioMode: boolean;
  voiceSupported?: boolean;
  accentColor?: string;
  courseEmoji?: string;
  buddyMood?: BuddyMood;
  onTogglePlay: () => void;
  onToggleAudio: () => void;
  onNext: () => void;
  onGoQuiz: () => void;
}) {
  const progress = ((stepIndex + 1) / totalSteps) * 100;
  const isLast = stepIndex >= totalSteps - 1;
  const accent = accentColor ?? "var(--brand)";

  return (
    <motion.section
      className="surface relative overflow-hidden"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      key={stepIndex}
    >
      <div
        className="border-b border-[var(--line)] px-5 py-6 text-white"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, color-mix(in srgb, ${accent} 70%, #0a4f44) 100%)`,
        }}
      >
        <div className="mb-4 flex items-center justify-between gap-3">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
            {courseEmoji} Paso {stepIndex + 1} de {totalSteps}
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-black/15 px-3 py-1 text-sm font-semibold tabular-nums">
            <Clock3 size={15} />
            {formatClock(remainingSeconds)}
          </span>
        </div>

        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="min-w-0 flex-1">
            <p className="text-sm text-white/80">
              Asistente SmartCaps{" "}
              {speaking
                ? "· narrando…"
                : voiceSupported
                  ? "· listo para hablar"
                  : "· solo texto"}
            </p>
            <h1 className="font-display mt-1 text-2xl font-bold leading-tight">{title}</h1>
            {audioMode ? (
              <div className={`wave mt-4 ${speaking ? "wave-active" : "opacity-50"}`} aria-hidden>
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
                <span />
              </div>
            ) : null}
          </div>
          <CapsuleBuddy mood={buddyMood} size="lg" />
        </div>
      </div>

      <div className="space-y-5 p-5">
        <ProgressBar value={progress} label="Avance de la cápsula" />

        {!audioMode ? (
          <p className="text-base leading-relaxed text-[var(--ink)]">{body}</p>
        ) : (
          <p className="rounded-2xl bg-[var(--brand-soft)] p-4 text-sm leading-relaxed text-[var(--ink-muted)]">
            {body}
          </p>
        )}

        <div className="rounded-2xl border border-dashed border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--ink-muted)]">
          <strong className="text-[var(--brand)]">Tip:</strong> {tip}
        </div>

        <div className="flex flex-wrap gap-2">
          <motion.button
            type="button"
            className="btn btn-secondary"
            onClick={onTogglePlay}
            aria-pressed={playing}
            {...pressable}
          >
            {playing ? <Pause size={16} /> : <Play size={16} />}
            {playing ? "Pausar" : "Reproducir"}
          </motion.button>
          <motion.button
            type="button"
            className={`btn ${audioMode ? "btn-primary" : "btn-secondary"}`}
            onClick={onToggleAudio}
            aria-pressed={audioMode}
            {...pressable}
          >
            <Volume2 size={16} />
            Solo audio
          </motion.button>
        </div>

        {!voiceSupported ? (
          <p className="text-xs text-[var(--ink-muted)]">
            Este navegador no expone síntesis de voz. Puedes seguir leyendo el contenido.
          </p>
        ) : (
          <p className="text-xs text-[var(--ink-muted)]">
            La voz usa la síntesis del navegador (español). Sube el volumen y pulsa Reproducir.
          </p>
        )}

        <motion.button
          type="button"
          className="btn btn-primary w-full"
          onClick={isLast ? onGoQuiz : onNext}
          {...pressable}
        >
          {isLast ? "Ir a evaluación" : "Siguiente paso"}
        </motion.button>
      </div>
    </motion.section>
  );
}
