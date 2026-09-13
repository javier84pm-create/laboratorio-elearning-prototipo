"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle, XCircle } from "lucide-react";

export function QuizOption({
  id,
  label,
  selected,
  revealed,
  correct,
  feedback,
  onSelect,
  index = 0,
}: {
  id: string;
  label: string;
  selected: boolean;
  revealed: boolean;
  correct: boolean;
  feedback?: string;
  onSelect: () => void;
  index?: number;
}) {
  const showState = revealed && selected;
  const isRight = showState && correct;
  const isWrong = showState && !correct;

  return (
    <motion.button
      type="button"
      onClick={onSelect}
      initial={{ opacity: 0, y: 10 }}
      animate={
        isWrong
          ? { opacity: 1, y: 0, x: [0, -8, 8, -6, 6, 0] }
          : isRight
            ? { opacity: 1, y: 0, scale: [1, 1.02, 1] }
            : { opacity: 1, y: 0 }
      }
      transition={{ delay: index * 0.07, duration: isWrong ? 0.4 : 0.3 }}
      whileTap={{ scale: 0.98 }}
      className={`surface w-full p-4 text-left transition ${
        selected ? "ring-2 ring-[var(--brand)]/35" : "hover:border-[var(--brand)]/30 hover:-translate-y-0.5"
      } ${isRight ? "!border-emerald-300 !bg-emerald-50" : ""} ${
        isWrong ? "!border-rose-300 !bg-rose-50" : ""
      }`}
    >
      <div className="flex items-start gap-3">
        <span
          className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
            isRight
              ? "bg-emerald-600 text-white"
              : isWrong
                ? "bg-rose-600 text-white"
                : selected
                  ? "bg-[var(--brand)] text-white"
                  : "bg-[var(--brand-soft)] text-[var(--brand)]"
          }`}
        >
          {id}
        </span>
        <div className="flex-1">
          <div className="flex items-start justify-between gap-3">
            <p className="font-medium text-[var(--ink)]">{label}</p>
            {selected ? (
              isRight ? (
                <CheckCircle2 className="text-emerald-600" size={18} />
              ) : isWrong ? (
                <XCircle className="text-rose-600" size={18} />
              ) : (
                <Circle className="text-[var(--brand)]" size={18} />
              )
            ) : null}
          </div>
          {showState && feedback ? (
            <p className={`mt-2 text-sm ${correct ? "text-emerald-700" : "text-rose-700"}`}>
              {feedback}
            </p>
          ) : null}
        </div>
      </div>
    </motion.button>
  );
}
