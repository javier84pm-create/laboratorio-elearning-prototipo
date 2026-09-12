"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, Home, LayoutDashboard, Trophy } from "lucide-react";

const items = [
  { href: "/", label: "Inicio", icon: Home },
  { href: "/learning", label: "Aprender", icon: BookOpen },
  { href: "/progress", label: "Progreso", icon: Trophy },
  { href: "/admin", label: "Admin", icon: LayoutDashboard },
];

export function MobileBottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--line)] bg-white/95 backdrop-blur md:hidden">
      <ul className="mx-auto grid max-w-lg grid-cols-4 gap-1 px-2 py-2">
        {items.map(({ href, label, icon: Icon }) => {
          const active =
            href === "/"
              ? pathname === "/"
              : pathname === href || pathname.startsWith(`${href}/`);
          return (
            <li key={href}>
              <Link
                href={href}
                className={`flex flex-col items-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium ${
                  active ? "bg-[var(--brand-soft)] text-[var(--brand)]" : "text-[var(--ink-muted)]"
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
