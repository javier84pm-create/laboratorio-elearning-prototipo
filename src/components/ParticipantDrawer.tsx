"use client";

import { X } from "lucide-react";
import type { Participant } from "@/types";
import { SegmentBadge } from "@/components/SegmentBadge";

export function ParticipantDrawer({
  participant,
  onClose,
}: {
  participant: Participant | null;
  onClose: () => void;
}) {
  if (!participant) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/30 p-3 backdrop-blur-[2px]">
      <aside className="surface flex h-full w-full max-w-md flex-col overflow-hidden !rounded-2xl">
        <div className="flex items-start justify-between gap-3 border-b border-[var(--line)] px-5 py-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-[var(--ink-muted)]">Detalle</p>
            <h2 className="font-display text-xl font-bold">{participant.name}</h2>
            <p className="text-sm text-[var(--ink-muted)]">{participant.area}</p>
          </div>
          <button type="button" className="btn btn-ghost !p-2" onClick={onClose} aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-4 overflow-y-auto p-5">
          <div className="flex flex-wrap gap-2">
            <SegmentBadge status={participant.status} />
            <span className="chip">{participant.course}</span>
          </div>

          <dl className="grid grid-cols-2 gap-3">
            <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
              <dt className="text-xs text-[var(--ink-muted)]">Resultado</dt>
              <dd className="mt-1 text-lg font-bold text-[var(--brand)]">
                {participant.result != null ? `${participant.result}%` : "Sin resultado"}
              </dd>
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
              <dt className="text-xs text-[var(--ink-muted)]">Tiempo</dt>
              <dd className="mt-1 text-lg font-bold">{participant.time ?? "—"}</dd>
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
              <dt className="text-xs text-[var(--ink-muted)]">Cursos</dt>
              <dd className="mt-1 text-lg font-bold">{participant.completedCourses}</dd>
            </div>
            <div className="rounded-2xl bg-[var(--surface-muted)] p-3">
              <dt className="text-xs text-[var(--ink-muted)]">Promedio</dt>
              <dd className="mt-1 text-lg font-bold">{participant.average}%</dd>
            </div>
          </dl>

          <div>
            <h3 className="mb-2 text-sm font-semibold">Insignias</h3>
            {participant.badges.length ? (
              <ul className="flex flex-wrap gap-2">
                {participant.badges.map((badge) => (
                  <li key={badge} className="chip">
                    {badge}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-[var(--ink-muted)]">Sin insignias aún.</p>
            )}
          </div>

          <p className="text-xs text-[var(--ink-muted)]">
            Última actividad: {participant.lastActivity} · {participant.trainingMinutes} min de
            formación
          </p>
        </div>
      </aside>
    </div>
  );
}
