"use client";

import { motion } from "framer-motion";
import { Bot, Clock3 } from "lucide-react";
import { AudioMode } from "@/components/AudioMode";

export function LearningPlayer({
  stepLabel,
  title,
  body,
  remainingSeconds,
  audioMode,
  onAudioModeChange,
  onContinue,
}: {
  stepLabel: string;
  title: string;
  body: string;
  remainingSeconds: number;
  audioMode: boolean;
  onAudioModeChange: (value: boolean) => void;
  onContinue: () => void;
}) {
  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = String(remainingSeconds % 60).padStart(2, "0");

  return (
    <div className="space-y-4">
      <AudioMode enabled={audioMode} onToggle={onAudioModeChange} />

      <motion.section
        className="surface overflow-hidden"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="border-b border-[var(--line)] bg-gradient-to-br from-[var(--brand)] to-[var(--accent)] px-5 py-6 text-white">
          <div className="mb-4 flex items-center justify-between gap-3">
            <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
              Paso {stepLabel}
            </span>
            <span className="inline-flex items-center gap-1 text-sm">
              <Clock3 size={15} />
              {minutes}:{seconds}
            </span>
          </div>
          <div className="flex items-start gap-3">
            <span className="avatar-ia !bg-white/15">
              <Bot size={20} />
            </span>
            <div>
              <p className="text-sm text-white/80">Asistente SmartCaps</p>
              <h1 className="font-display mt-1 text-2xl font-bold leading-tight">{title}</h1>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-5">
          {audioMode ? (
            <div className="rounded-2xl bg-[var(--brand-soft)] p-4">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-semibold text-[var(--brand)]">Reproducción de audio</p>
                <div className="wave" aria-hidden>
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
              <p className="text-sm leading-relaxed text-[var(--ink-muted)]">
                Narración activa: {body.slice(0, 120)}…
              </p>
            </div>
          ) : (
            <p className="text-base leading-relaxed text-[var(--ink)]">{body}</p>
          )}

          <button type="button" className="btn btn-primary w-full" onClick={onContinue}>
            Continuar a evaluación
          </button>
        </div>
      </motion.section>
    </div>
  );
}
