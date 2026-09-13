"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDemo } from "@/context/DemoContext";
import { ConfettiBurst } from "@/components/ConfettiBurst";
import { pressable } from "@/lib/motion";

export function LeagueUpgradeOverlay() {
  const { leagueCelebration, clearLeagueCelebration } = useDemo();

  useEffect(() => {
    if (!leagueCelebration) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") clearLeagueCelebration();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const auto = window.setTimeout(clearLeagueCelebration, 5200);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      window.clearTimeout(auto);
    };
  }, [leagueCelebration, clearLeagueCelebration]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {leagueCelebration ? (
        <motion.div
          className="fixed inset-0 z-[130] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ConfettiBurst show withSound={false} durationMs={2800} />
          <button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-[rgba(18,51,46,0.55)] backdrop-blur-[8px]"
            onClick={clearLeagueCelebration}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="league-upgrade-title"
            className="relative w-full max-w-sm overflow-hidden rounded-[1.5rem] text-center text-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
            style={{ background: leagueCelebration.color }}
            initial={{ opacity: 0, scale: 0.7, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <div className="px-6 pb-6 pt-8">
              <motion.p
                className="text-7xl"
                initial={{ scale: 0.2, rotate: -30 }}
                animate={{ scale: [0.2, 1.25, 1], rotate: [-30, 10, 0] }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                aria-hidden
              >
                {leagueCelebration.emoji}
              </motion.p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.18em] text-white/80">
                ¡Nueva liga!
              </p>
              <h2
                id="league-upgrade-title"
                className="font-display mt-2 text-3xl font-bold"
              >
                {leagueCelebration.label}
              </h2>
              <p className="mt-2 text-sm text-white/85">
                Sigues sumando. La semana se pone interesante.
              </p>
              <motion.button
                type="button"
                className="btn mt-6 w-full border-0 bg-white font-semibold"
                style={{ color: leagueCelebration.color }}
                onClick={clearLeagueCelebration}
                {...pressable}
              >
                Seguir aprendiendo
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
