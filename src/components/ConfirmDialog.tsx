"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw, X } from "lucide-react";
import { pressable } from "@/lib/motion";

export function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
}: {
  open: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onCancel]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[120] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.button
            type="button"
            aria-label="Cerrar"
            className="absolute inset-0 bg-[rgba(18,51,46,0.45)] backdrop-blur-[6px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-desc"
            className="relative w-full max-w-md overflow-hidden rounded-[1.35rem] border border-[var(--line)] bg-white shadow-[0_24px_60px_rgba(47,58,143,0.22)]"
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
          >
            <div className="relative bg-gradient-to-br from-[var(--brand)] via-[#454fb0] to-[#ff6b4a] px-5 pb-5 pt-4 text-white">
              <button
                type="button"
                className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/15 text-white transition hover:bg-white/25"
                onClick={onCancel}
                aria-label="Cerrar"
              >
                <X size={16} />
              </button>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                <RotateCcw size={13} />
                SmartCaps
              </span>
              <h2
                id="confirm-dialog-title"
                className="font-display mt-3 text-2xl font-bold leading-tight"
              >
                {title}
              </h2>
            </div>

            <div className="space-y-5 p-5">
              <p id="confirm-dialog-desc" className="text-sm leading-relaxed text-[var(--ink-muted)]">
                {description}
              </p>
              <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <motion.button
                  type="button"
                  className="btn btn-secondary flex-1 sm:flex-none"
                  onClick={onCancel}
                  {...pressable}
                >
                  {cancelLabel}
                </motion.button>
                <motion.button
                  type="button"
                  className="btn btn-primary flex-1 sm:flex-none"
                  onClick={onConfirm}
                  {...pressable}
                >
                  <RotateCcw size={15} />
                  {confirmLabel}
                </motion.button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}
