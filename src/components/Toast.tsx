"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDemo } from "@/context/DemoContext";

export function Toast() {
  const { toast, clearToast } = useDemo();

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(clearToast, 2800);
    return () => window.clearTimeout(id);
  }, [toast, clearToast]);

  return (
    <AnimatePresence>
      {toast ? (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          role="status"
        >
          {toast}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
