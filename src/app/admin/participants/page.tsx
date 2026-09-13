"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Search, Users } from "lucide-react";
import { ParticipantDrawer } from "@/components/ParticipantDrawer";
import { ParticipantTable } from "@/components/ParticipantTable";
import { getCourseById } from "@/data/courses";
import { participants as baseParticipants } from "@/data/participants";
import { useDemo } from "@/context/DemoContext";
import { applyLearnerProgress } from "@/lib/dashboardMetrics";
import type { Participant } from "@/types";
import { fadeUp } from "@/lib/motion";

export default function ParticipantsPage() {
  const router = useRouter();
  const {
    isCourseCompleted,
    userProgress,
    lastResultPercent,
    lastDurationLabel,
    lastBadgeName,
  } = useDemo();
  const learnerDone = isCourseCompleted("prevencion-riesgos");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Participant | null>(null);

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

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return liveRows;
    return liveRows.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.course.toLowerCase().includes(q),
    );
  }, [query, liveRows]);

  return (
    <div className="admin-wrap space-y-5">
      <motion.header
        className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between"
        {...fadeUp}
      >
        <div>
          <button
            type="button"
            className="mb-2 inline-flex items-center gap-1 text-sm text-[var(--ink-muted)] hover:text-[var(--brand)]"
            onClick={() => router.push("/admin")}
          >
            <ArrowLeft size={14} /> Volver al panel
          </button>
          <h1 className="font-display text-3xl font-bold">Participantes</h1>
          <p className="mt-1 text-[var(--ink-muted)]">
            {liveRows.length} personas en la cohorte · datos alineados con el dashboard
          </p>
        </div>
        <Link href="/admin" className="btn btn-secondary">
          <Users size={16} />
          Ver KPIs
        </Link>
      </motion.header>

      <div className="relative">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[var(--ink-muted)]"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre, área o curso…"
          className="w-full rounded-2xl border border-[var(--line)] bg-white py-3 pl-10 pr-4 text-sm outline-none ring-[var(--brand)] focus:ring-2"
        />
      </div>

      <ParticipantTable rows={rows} onSelect={setSelected} />
      <ParticipantDrawer participant={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
