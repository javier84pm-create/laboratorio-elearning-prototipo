"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useDemo } from "@/context/DemoContext";

export function XpFloatHost() {
  const { xpBurst } = useDemo();
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<
    { id: number; amount: number; emoji: string; offset: number }[]
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
        offset: (Math.random() - 0.5) * 28,
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
            className="absolute right-4 top-16 rounded-full bg-[var(--ink)] px-3 py-1.5 text-sm font-bold text-white shadow-lg sm:right-6 sm:top-20"
            style={{ marginRight: item.offset }}
            initial={{ opacity: 0, y: 12, scale: 0.85 }}
            animate={{ opacity: 1, y: -56, scale: 1 }}
            exit={{ opacity: 0, y: -72 }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          >
            {item.emoji} {item.amount > 0 ? `+${item.amount}` : item.amount} XP
          </motion.div>
        ))}
      </AnimatePresence>
    </div>,
    document.body,
  );
}
