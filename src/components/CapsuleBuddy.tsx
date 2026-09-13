"use client";

import { motion, AnimatePresence } from "framer-motion";

export type BuddyMood =
  | "idle"
  | "speak"
  | "think"
  | "happy"
  | "sad"
  | "cheer"
  | "encourage";

const MOOD: Record<
  BuddyMood,
  { face: string; bubble: string; bounce: number }
> = {
  idle: { face: "🙂", bubble: "¡Vamos paso a paso!", bounce: 0 },
  speak: { face: "🗣️", bubble: "Escúchame con atención…", bounce: 2 },
  think: { face: "🤔", bubble: "Tómate tu tiempo", bounce: 0 },
  happy: { face: "😄", bubble: "¡Bien hecho!", bounce: 4 },
  sad: { face: "😅", bubble: "No pasa nada, se aprende así", bounce: 0 },
  cheer: { face: "🥳", bubble: "¡Lo lograste!", bounce: 6 },
  encourage: { face: "💪", bubble: "Tú puedes con la siguiente", bounce: 3 },
};

export function CapsuleBuddy({
  mood = "idle",
  size = "md",
  showBubble = true,
  className = "",
}: {
  mood?: BuddyMood;
  size?: "sm" | "md" | "lg";
  showBubble?: boolean;
  className?: string;
}) {
  const cfg = MOOD[mood];
  const dim = size === "lg" ? "h-16 w-16 text-3xl" : size === "sm" ? "h-10 w-10 text-xl" : "h-12 w-12 text-2xl";

  return (
    <div className={`flex items-end gap-2 ${className}`}>
      <motion.div
        key={mood}
        className={`grid ${dim} shrink-0 place-items-center rounded-2xl bg-white/20 shadow-inner backdrop-blur-sm`}
        animate={{ y: [0, -cfg.bounce, 0] }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        aria-hidden
      >
        {cfg.face}
      </motion.div>
      {showBubble ? (
        <AnimatePresence mode="wait">
          <motion.p
            key={cfg.bubble}
            initial={{ opacity: 0, x: -6, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-[14rem] rounded-2xl rounded-bl-md bg-white/95 px-3 py-2 text-xs font-semibold text-[var(--ink)] shadow-sm"
          >
            {cfg.bubble}
          </motion.p>
        </AnimatePresence>
      ) : null}
    </div>
  );
}
