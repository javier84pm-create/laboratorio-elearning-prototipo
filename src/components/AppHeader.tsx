"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { RotateCcw, Sparkles } from "lucide-react";
import { useDemo } from "@/context/DemoContext";
import { currentUser } from "@/data/dashboard";

const links = [
  { href: "/", label: "Inicio" },
  { href: "/learning", label: "Aprender" },
  { href: "/progress", label: "Progreso" },
  { href: "/admin", label: "Admin" },
  { href: "/about-solution", label: "Solución" },
];

export function AppHeader() {
  const pathname = usePathname();
  const { resetDemo } = useDemo();

  return (
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
            onClick={resetDemo}
            title="Restablecer demo"
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
  );
}
