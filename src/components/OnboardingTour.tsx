"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Headphones, Sparkles, Trophy, X } from "lucide-react";
import Link from "next/link";
import { pressable } from "@/lib/motion";
import { playSfx, unlockSfx } from "@/lib/sfx";
import { useDemo } from "@/context/DemoContext";

const STORAGE_KEY = "smartcaps-onboarding-done-v1";

const TIPS = [
  {
    icon: Headphones,
    emoji: "🎧",
    title: "Microcápsulas vivas",
    body: "Cada cápsula dura 3–5 minutos: lee o escucha al asistente, avanza por pasos y suma XP.",
  },
  {
    icon: Trophy,
    emoji: "⚡",
    title: "Aprende jugando",
    body: "Quiz con vidas, pistas, racha, liga semanal y celebraciones. Fallar no te bloquea: te enseña.",
  },
  {
    icon: Sparkles,
    emoji: "📊",
    title: "Impacto institucional",
    body: "Al terminar, el panel Admin refleja el avance de Paola. Ideal para el pitch de 90 segundos.",
  },
] as const;

export function OnboardingTour({ forceOpen = false, onClose }: { forceOpen?: boolean; onClose?: () => void }) {
  const { sfxEnabled } = useDemo();
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (forceOpen) {
      setOpen(true);
      setStep(0);
      return;
    }
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
  }, [forceOpen]);

  const close = (markDone: boolean) => {
    if (markDone) {
      try {
        localStorage.setItem(STORAGE_KEY, "1");
      } catch {
        // ignore
      }
    }
    setOpen(false);
    onClose?.();
  };

  const tip = TIPS[step];
  const isLast = step >= TIPS.length - 1;
  const Icon = tip.icon;

  if (!mounted || typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[125] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-[rgba(18,51,46,0.5)] backdrop-blur-[6px]"
            aria-label="Cerrar"
            onClick={() => close(true)}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-title"
            className="relative w-full max-w-md overflow-hidden rounded-[1.4rem] border border-[var(--line)] bg-white shadow-[0_24px_60px_rgba(13,107,92,0.22)]"
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 360, damping: 28 }}
          >
            <div className="relative bg-gradient-to-br from-[var(--brand)] via-[#0f7a69] to-[var(--accent)] px-5 pb-6 pt-4 text-white">
              <button
                type="button"
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15"
                onClick={() => close(true)}
                aria-label="Cerrar"
              >
                <X size={16} />
              </button>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/75">
                Tip {step + 1} de {TIPS.length}
              </p>
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                className="mt-4"
              >
                <span className="mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-white/15 text-3xl">
                  {tip.emoji}
                </span>
                <h2 id="onboarding-title" className="font-display text-2xl font-bold">
                  {tip.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-white/90">{tip.body}</p>
              </motion.div>
              <div className="mt-5 flex gap-1.5">
                {TIPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 flex-1 rounded-full ${i <= step ? "bg-white" : "bg-white/25"}`}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 p-5 sm:flex-row sm:justify-between">
              <button
                type="button"
                className="btn btn-ghost !justify-start sm:!justify-center"
                onClick={() => close(true)}
              >
                Saltar
              </button>
              <div className="flex gap-2">
                {step > 0 ? (
                  <motion.button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => setStep((s) => s - 1)}
                    {...pressable}
                  >
                    Atrás
                  </motion.button>
                ) : null}
                {isLast ? (
                  <Link
                    href="/learning/prevencion-riesgos"
                    className="btn btn-primary"
                    onClick={() => {
                      void unlockSfx();
                      playSfx("xp", sfxEnabled);
                      close(true);
                    }}
                  >
                    <Icon size={16} />
                    Empezar demo
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <motion.button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      void unlockSfx();
                      playSfx("tap", sfxEnabled);
                      setStep((s) => s + 1);
                    }}
                    {...pressable}
                  >
                    Siguiente
                    <ArrowRight size={16} />
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

export function resetOnboardingFlag() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
