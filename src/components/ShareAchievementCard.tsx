"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Copy, Download, Share2 } from "lucide-react";
import { toPng } from "html-to-image";
import { useDemo } from "@/context/DemoContext";
import { useSfx } from "@/hooks/useSfx";
import { getLeague } from "@/lib/league";
import { pressable } from "@/lib/motion";

export function ShareAchievementCard({
  courseTitle,
  courseEmoji,
  badgeName,
  percent,
  accent,
}: {
  courseTitle: string;
  courseEmoji: string;
  badgeName: string;
  percent: number;
  accent: string;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { xp, level, streakDays, lastXpEarned, userProgress, showToast } = useDemo();
  const { play } = useSfx();
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const league = getLeague(xp, userProgress.weeklyCompleted);

  const shareText = `${courseEmoji} Completé “${courseTitle}” en SmartCaps con ${percent}% · Insignia: ${badgeName} · Nivel ${level} · ${league.emoji} ${league.label}. ¡Microaprendizaje que sí se termina!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      play("xp");
      showToast("📋 Texto copiado · pégalo en WhatsApp o LinkedIn");
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      showToast("No se pudo copiar. Selecciona el texto manualmente.");
    }
  };

  const handleShare = async () => {
    play("tap");
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Mi logro SmartCaps",
          text: shareText,
        });
        showToast("🚀 ¡Compartido!");
        return;
      } catch {
        // cancelled
      }
    }
    await handleCopy();
  };

  const handleDownloadPng = async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);
    play("tap");
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
        backgroundColor: accent,
      });
      const link = document.createElement("a");
      const slug = courseTitle
        .toLowerCase()
        .replace(/[^a-z0-9áéíóúñ]+/gi, "-")
        .replace(/-+/g, "-")
        .slice(0, 40);
      link.download = `smartcaps-logro-${slug || "capsula"}.png`;
      link.href = dataUrl;
      link.click();
      play("xp");
      showToast("🖼️ PNG descargado · listo para el pitch");
    } catch {
      showToast("No se pudo generar la imagen. Prueba otro navegador.");
    } finally {
      setExporting(false);
    }
  };

  return (
    <section className="surface overflow-hidden">
      <div className="border-b border-[var(--line)] px-5 py-4">
        <h2 className="font-display text-lg font-semibold">Comparte tu logro</h2>
        <p className="text-sm text-[var(--ink-muted)]">
          Ideal para el pitch o para mostrar en WhatsApp
        </p>
      </div>

      <div className="p-5">
        <div
          ref={cardRef}
          className="overflow-hidden rounded-3xl text-white shadow-lg"
          style={{
            background: `linear-gradient(145deg, ${accent} 0%, color-mix(in srgb, ${accent} 55%, #0a4f44) 100%)`,
          }}
        >
          <div className="space-y-4 p-5">
            <div className="flex items-center justify-between gap-2">
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">
                SmartCaps · Laboratorio E-Learning
              </span>
              <span className="text-2xl" aria-hidden>
                {courseEmoji}
              </span>
            </div>
            <div>
              <p className="text-sm text-white/80">Cápsula completada</p>
              <h3 className="font-display text-2xl font-bold leading-tight">{courseTitle}</h3>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-semibold">
              <span className="rounded-full bg-black/20 px-3 py-1">{percent}%</span>
              <span className="rounded-full bg-black/20 px-3 py-1">🏆 {badgeName}</span>
              <span className="rounded-full bg-black/20 px-3 py-1">
                +{Math.max(0, lastXpEarned) || 50} XP
              </span>
              <span className="rounded-full bg-black/20 px-3 py-1">🔥 x{streakDays}</span>
              <span className="rounded-full bg-black/20 px-3 py-1">
                {league.emoji} {league.label}
              </span>
            </div>
            <p className="text-xs text-white/75">
              Nivel {level} · {xp} XP totales
            </p>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <motion.button
            type="button"
            className="btn btn-primary"
            onClick={handleShare}
            {...pressable}
          >
            <Share2 size={16} />
            Compartir
          </motion.button>
          <motion.button
            type="button"
            className="btn btn-secondary"
            onClick={handleDownloadPng}
            disabled={exporting}
            {...pressable}
          >
            <Download size={16} />
            {exporting ? "Generando…" : "Descargar PNG"}
          </motion.button>
          <motion.button
            type="button"
            className="btn btn-secondary"
            onClick={handleCopy}
            {...pressable}
          >
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? "Copiado" : "Copiar texto"}
          </motion.button>
        </div>
      </div>
    </section>
  );
}
