"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Activity,
  Download,
  Filter,
  TrendingUp,
  Users,
} from "lucide-react";
import { DashboardChart } from "@/components/DashboardChart";
import { CountUp } from "@/components/CountUp";
import { MetricCard } from "@/components/MetricCard";
import { getCourseById } from "@/data/courses";
import { participants as baseParticipants } from "@/data/participants";
import { useDemo } from "@/context/DemoContext";
import {
  applyLearnerProgress,
  buildActivityFeed,
  computeCourseCompletions,
  computeDashboardKpis,
  participantsToCsv,
} from "@/lib/dashboardMetrics";
import { currentUser } from "@/data/dashboard";
import type { CourseStatus } from "@/types";
import { fadeUp } from "@/lib/motion";

const statusFilters: Array<{ id: "todos" | CourseStatus; label: string }> = [
  { id: "todos", label: "Todos" },
  { id: "completado", label: "Completados" },
  { id: "en_progreso", label: "En progreso" },
  { id: "pendiente", label: "Pendientes" },
];

export default function AdminPage() {
  const {
    showToast,
    isCourseCompleted,
    userProgress,
    lastResultPercent,
    lastDurationLabel,
    lastBadgeName,
    lastCompletedCourseId,
  } = useDemo();
  const learnerDone = isCourseCompleted("prevencion-riesgos");
  const [status, setStatus] = useState<"todos" | CourseStatus>("todos");
  const [area, setArea] = useState("todas");
  const [exportPulse, setExportPulse] = useState(false);

  const liveRows = useMemo(() => {
    const badgeNames = userProgress.completedCourseIds
      .map((id) => getCourseById(id)?.content.badgeName)
      .filter((n): n is string => !!n);
    const timeMatch = lastDurationLabel.match(/(\d+)\s*min\s*(\d+)/);
    const time =
      timeMatch != null
        ? `${timeMatch[1]}:${timeMatch[2]}`
        : learnerDone
          ? "3:14"
          : undefined;

    return applyLearnerProgress(baseParticipants, {
      completed: learnerDone,
      result: learnerDone ? lastResultPercent || 100 : undefined,
      time,
      badges: badgeNames.length ? badgeNames : lastBadgeName ? [lastBadgeName] : [],
      completedCourses: userProgress.completedCourseIds.length,
    });
  }, [
    learnerDone,
    userProgress.completedCourseIds,
    lastResultPercent,
    lastDurationLabel,
    lastBadgeName,
  ]);

  const kpis = useMemo(() => computeDashboardKpis(liveRows), [liveRows]);
  const chartData = useMemo(() => computeCourseCompletions(liveRows), [liveRows]);

  const liveEvent = useMemo(() => {
    if (!learnerDone || !lastCompletedCourseId) return null;
    const course = getCourseById(lastCompletedCourseId);
    return {
      time: "Hace un momento",
      text: `${currentUser.fullName} finalizó ${course?.title ?? "una cápsula"} (${lastResultPercent || 100}%)`,
    };
  }, [learnerDone, lastCompletedCourseId, lastResultPercent]);

  const feed = useMemo(
    () => buildActivityFeed(liveRows, liveEvent),
    [liveRows, liveEvent],
  );

  const areas = useMemo(
    () => ["todas", ...Array.from(new Set(liveRows.map((p) => p.area)))],
    [liveRows],
  );

  const filtered = liveRows.filter((p) => {
    const statusOk = status === "todos" || p.status === status;
    const areaOk = area === "todas" || p.area === area;
    return statusOk && areaOk;
  });

  const handleExport = () => {
    setExportPulse(true);
    const csv = participantsToCsv(filtered);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `SmartCaps_cohorte_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`CSV exportado · ${filtered.length} participantes`);
    window.setTimeout(() => setExportPulse(false), 1200);
  };

  return (
    <div className="admin-wrap space-y-6">
      <motion.header
        className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        {...fadeUp}
      >
        <div>
          <p className="chip mb-2">
            <Activity size={14} /> Cohorte en vivo
          </p>
          <h1 className="font-display text-3xl font-bold">Panel institucional</h1>
          <p className="mt-1 text-[var(--ink-muted)]">
            KPIs calculados desde los {kpis.participants} participantes de esta demo.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/participants" className="btn btn-secondary">
            <Users size={16} />
            Participantes
          </Link>
          <button
            type="button"
            className={`btn btn-primary ${exportPulse ? "animate-pulse-soft" : ""}`}
            onClick={handleExport}
          >
            <Download size={16} />
            Exportar CSV
          </button>
        </div>
      </motion.header>

      <p className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--ink-muted)]">
        Los indicadores reflejan esta cohorte. Cuando Paola completa una cápsula, su fila y los
        KPIs se actualizan al instante.
      </p>

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          label="Participantes"
          value={<CountUp value={kpis.participants} />}
          icon={<Users size={16} />}
        />
        <MetricCard
          label="Completados"
          value={<CountUp value={kpis.completed} />}
          icon={<TrendingUp size={16} />}
        />
        <MetricCard label="Pendientes / en curso" value={kpis.pending} />
        <MetricCard label="Finalización" value={`${kpis.completionRate}%`} />
        <MetricCard label="Promedio" value={`${kpis.averageScore}%`} />
        <MetricCard label="Tiempo medio" value={kpis.averageTime} />
      </section>

      <div className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
        <DashboardChart data={chartData} />
        <section className="surface p-5">
          <h2 className="font-display text-lg font-semibold">Actividad reciente</h2>
          <p className="mb-4 text-sm text-[var(--ink-muted)]">
            Generada desde la cohorte{learnerDone ? " + tu avance" : ""}
          </p>
          <ul className="space-y-3">
            {feed.map((event) => (
              <li
                key={`${event.time}-${event.text}`}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-2.5"
              >
                <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--brand)]">
                  {event.time}
                </p>
                <p className="mt-1 text-sm text-[var(--ink)]">{event.text}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <section className="surface p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--ink-muted)]">
            <Filter size={15} /> Filtros
          </span>
          {statusFilters.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`chip cursor-pointer transition ${
                status === item.id ? "!bg-[var(--brand)] !text-white" : "hover:bg-[var(--brand-soft)]"
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
          {filtered.map((p, index) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-[var(--surface-muted)] px-3 py-2.5 text-sm transition hover:bg-[var(--brand-soft)]/50"
            >
              <span className="font-medium">{p.name}</span>
              <span className="text-[var(--ink-muted)]">{p.area}</span>
              <span className="text-[var(--ink-muted)]">{p.course}</span>
              <span className="chip !text-xs">
                {p.status === "completado"
                  ? "Completado"
                  : p.status === "en_progreso"
                    ? "En progreso"
                    : "Pendiente"}
              </span>
              <span className="font-semibold text-[var(--brand)]">
                {p.result != null ? `${p.result}%` : "—"}
              </span>
            </motion.div>
          ))}
          {!filtered.length ? (
            <p className="text-sm text-[var(--ink-muted)]">Sin resultados para estos filtros.</p>
          ) : null}
        </div>
      </section>
    </div>
  );
}
