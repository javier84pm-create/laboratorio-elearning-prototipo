"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDemo } from "@/context/DemoContext";

export function XpFloatHost() {
  const { xpBurst } = useDemo();
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<
    { id: number; amount: number; emoji: string; x: number }[]
  >([]);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!xpBurst) return;
    const id = xpBurst.id;
    setItems((prev) => [
      ...prev,
      {
        id,
        amount: xpBurst.amount,
        emoji: xpBurst.emoji,
        x: 38 + Math.random() * 24,
      },
    ]);
    const t = window.setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== id));
    }, 1400);
    return () => window.clearTimeout(t);
  }, [xpBurst]);

  if (!mounted) return null;

  return createPortal(
    <div className="pointer-events-none fixed inset-0 z-[110] overflow-hidden" aria-hidden>
      <AnimatePresence>
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="absolute bottom-[28%] rounded-full bg-[var(--ink)] px-3 py-1.5 text-sm font-bold text-white shadow-lg"
            style={{ left: `${item.x}%` }}
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: -90, scale: 1.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.15, ease: "easeOut" }}
          >
            {item.emoji} {item.amount > 0 ? `+${item.amount}` : item.amount} XP
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
