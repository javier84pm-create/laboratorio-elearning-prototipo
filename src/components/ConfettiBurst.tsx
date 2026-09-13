"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { playSfx } from "@/lib/sfx";
import { useDemo } from "@/context/DemoContext";

type Piece = {
  id: number;
  left: string;
  delay: number;
  color: string;
  rotate: number;
  size: number;
  emoji: string | null;
};

export function ConfettiBurst({
  show,
  durationMs = 2200,
  withSound = false,
}: {
  show: boolean;
  durationMs?: number;
  withSound?: boolean;
}) {
  const { sfxEnabled } = useDemo();
  const [mounted, setMounted] = useState(false);
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!show) return;
    if (withSound) playSfx("complete", sfxEnabled);
    const colors = [
      "#0d6b5c",
      "#1a9b84",
      "#d4a017",
      "#e36a2e",
      "#7c3aed",
      "#1d4ed8",
      "#ffffff",
      "#f472b6",
    ];
    const emojis = ["🎉", "✨", "🏆", "⭐", "🔥", "💫"];
    setPieces(
      Array.from({ length: 42 }, (_, i) => ({
        id: i,
        left: `${3 + Math.random() * 94}%`,
        delay: Math.random() * 0.35,
        color: colors[i % colors.length],
        rotate: Math.random() * 220,
        size: 6 + Math.random() * 7,
        emoji: i % 5 === 0 ? emojis[i % emojis.length] : null,
      })),
    );
    const t = window.setTimeout(() => setPieces([]), durationMs);
    return () => window.clearTimeout(t);
  }, [show, durationMs, withSound, sfxEnabled]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {pieces.length > 0 ? (
        <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden" aria-hidden>
          {pieces.map((p) =>
            p.emoji ? (
              <motion.span
                key={p.id}
                className="absolute top-[-8px] text-lg"
                style={{ left: p.left }}
                initial={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                animate={{
                  y: typeof window !== "undefined" ? window.innerHeight * 0.85 : 700,
                  opacity: [1, 1, 0],
                  rotate: p.rotate + 200,
                  scale: [1, 1.2, 0.9],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, delay: p.delay, ease: "easeOut" }}
              >
                {p.emoji}
              </motion.span>
            ) : (
              <motion.span
                key={p.id}
                className="absolute top-[-8px] rounded-[2px]"
                style={{
                  left: p.left,
                  background: p.color,
                  width: p.size,
                  height: p.size * 0.7,
                }}
                initial={{ y: 0, opacity: 1, rotate: 0, scale: 1 }}
                animate={{
                  y: typeof window !== "undefined" ? window.innerHeight * 0.85 : 700,
                  opacity: [1, 1, 0],
                  rotate: p.rotate + 260,
                  scale: [1, 1.1, 0.85],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.45, delay: p.delay, ease: "easeOut" }}
              />
            ),
          )}
        </div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
