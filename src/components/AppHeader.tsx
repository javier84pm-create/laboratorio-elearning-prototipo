"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { RotateCcw, Sparkles, Volume2, VolumeX } from "lucide-react";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { useDemo } from "@/context/DemoContext";
import { currentUser } from "@/data/dashboard";
import { unlockSfx, playSfx } from "@/lib/sfx";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/learning", label: "Aprender" },
  { href: "/progress", label: "Progreso" },
  { href: "/admin", label: "Admin" },
  { href: "/about-solution", label: "Solución" },
];

export function AppHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const { resetDemo, userProgress, xp, courseStarted, sfxEnabled, setSfxEnabled, showToast } =
    useDemo();
  const [confirmOpen, setConfirmOpen] = useState(false);

  const hasData =
    userProgress.completedCourseIds.length > 0 ||
    userProgress.capsulesCompleted > 0 ||
    xp > 0 ||
    courseStarted;

  const handleConfirmReset = () => {
    setConfirmOpen(false);
    resetDemo();
    router.push("/");
  };

  const toggleSfx = () => {
    void unlockSfx();
    const next = !sfxEnabled;
    setSfxEnabled(next);
    if (next) playSfx("tap", true);
    showToast(next ? "🔊 Sonidos activados" : "🔇 Sonidos en silencio");
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-[var(--line)]/70 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-4 px-4 py-3">
          <Link href="/" className="flex items-center gap-2">
            <span className="avatar-ia !h-10 !w-10 !rounded-xl">
              <Sparkles size={18} />
            </span>
            <div>
              <p className="font-display text-lg font-bold leading-none text-[var(--brand)]">
                SmartCaps
              </p>
              <p className="text-[11px] text-[var(--ink-muted)]">Laboratorio E-Learning</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => {
              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-3 py-1.5 text-sm font-medium transition ${
                    active
                      ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                      : "text-[var(--ink-muted)] hover:bg-[var(--brand-soft)]/60 hover:text-[var(--brand)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="btn btn-ghost !px-2.5 !py-2 text-xs"
              onClick={toggleSfx}
              title={sfxEnabled ? "Silenciar efectos" : "Activar efectos"}
              aria-pressed={sfxEnabled}
            >
              {sfxEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
              <span className="hidden sm:inline">{sfxEnabled ? "Sonido" : "Mute"}</span>
            </button>
            <button
              type="button"
              className={`btn btn-ghost !px-2.5 !py-2 text-xs ${
                hasData ? "text-[var(--accent)]" : ""
              }`}
              onClick={() => setConfirmOpen(true)}
              title="Reiniciar demo"
            >
              <RotateCcw size={15} />
              <span className="hidden sm:inline">Reset</span>
            </button>
            <div className="hidden items-center gap-2 rounded-full border border-[var(--line)] bg-white px-2.5 py-1.5 sm:flex">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-[var(--brand)] text-xs font-bold text-white">
                {currentUser.name.slice(0, 1)}
              </span>
              <span className="pr-1 text-sm font-medium">{currentUser.name}</span>
            </div>
          </div>
        </div>
      </header>

      <ConfirmDialog
        open={confirmOpen}
        title="¿Reiniciar la demo?"
        description="Se borrará el progreso de Paola: XP, racha, cápsulas e insignias. La cohorte institucional se mantiene. Volverás al inicio listo para presentar de nuevo."
        cancelLabel="Seguir aquí"
        confirmLabel="Reiniciar demo"
        onCancel={() => setConfirmOpen(false)}
        onConfirm={handleConfirmReset}
      />
    </>
  );
}
