"use client";

import type { ReactNode } from "react";
import { DemoProvider } from "@/context/DemoContext";
import { AppHeader } from "@/components/AppHeader";
import { MobileBottomNav } from "@/components/MobileBottomNav";
import { Toast } from "@/components/Toast";

export function DemoProviders({ children }: { children: ReactNode }) {
  return (
    <DemoProvider>
      <div className="app-shell">
        <AppHeader />
        <main className="flex-1">{children}</main>
        <MobileBottomNav />
        <Toast />
      </div>
    </DemoProvider>
  );
}
