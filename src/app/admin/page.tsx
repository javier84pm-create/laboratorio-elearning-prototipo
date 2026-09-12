"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Download, Filter, Users } from "lucide-react";
import { DashboardChart } from "@/components/DashboardChart";
import { MetricCard } from "@/components/MetricCard";
import { courseCompletions, dashboardKpis } from "@/data/dashboard";
import { participants } from "@/data/participants";
import { useDemo } from "@/context/DemoContext";
import type { CourseStatus } from "@/types";

const statusFilters: Array<{ id: "todos" | CourseStatus; label: string }> = [
  { id: "todos", label: "Todos" },
  { id: "completado", label: "Completados" },
  { id: "en_progreso", label: "En progreso" },
  { id: "pendiente", label: "Pendientes" },
];

export default function AdminPage() {
  const { showToast } = useDemo();
  const [status, setStatus] = useState<"todos" | CourseStatus>("todos");
  const [area, setArea] = useState("todas");

  const areas = useMemo(
    () => ["todas", ...Array.from(new Set(participants.map((p) => p.area)))],
    [],
  );

  const filtered = participants.filter((p) => {
    const statusOk = status === "todos" || p.status === status;
    const areaOk = area === "todas" || p.area === area;
    return statusOk && areaOk;
  });

  return (
    <div className="admin-wrap space-y-6">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Panel administrador</h1>
          <p className="mt-1 text-[var(--ink-muted)]">
            Trazabilidad de finalización, resultados y tiempo promedio.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/participants" className="btn btn-secondary">
            <Users size={16} />
            Participantes
          </Link>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => showToast("Exportación simulada: reporte_demo.csv")}
          >
            <Download size={16} />
            Exportar
          </button>
        </div>
      </header>

      <p className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
        Datos demostrativos del prototipo. No corresponden a información real de participantes.
      </p>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard label="Participantes" value={dashboardKpis.participants} />
        <MetricCard label="Completados" value={dashboardKpis.completed} />
        <MetricCard label="Pendientes" value={dashboardKpis.pending} />
        <MetricCard label="Finalización" value={`${dashboardKpis.completionRate}%`} />
        <MetricCard label="Promedio" value={`${dashboardKpis.averageScore}%`} />
        <MetricCard label="Tiempo medio" value={dashboardKpis.averageTime} />
      </section>

      <DashboardChart data={courseCompletions} />

      <section className="surface p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink-muted)]">
            <Filter size={15} /> Filtros
          </span>
          {statusFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chip cursor-pointer ${
                status === item.id ? "!bg-[var(--brand)] !text-white" : ""
              }`}
              onClick={() => setStatus(item.id)}
            >
              {item.label}
            </button>
          ))}
          <select
            className="rounded-full border border-[var(--line)] bg-white px-3 py-1.5 text-sm"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            {areas.map((item) => (
              <option key={item} value={item}>
                {item === "todas" ? "Todas las áreas" : item}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[var(--surface-muted)] px-3 py-2 text-sm"
            >
              <span className="font-medium">{p.name}</span>
              <span className="text-[var(--ink-muted)]">{p.area}</span>
              <span className="text-[var(--ink-muted)]">{p.course}</span>
              <span className="font-semibold text-[var(--brand)]">
                {p.result != null ? `${p.result}%` : "—"}
              </span>
            </div>
          ))}
          {!filtered.length ? (
            <p className="text-sm text-[var(--ink-muted)]">Sin resultados para estos filtros.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
