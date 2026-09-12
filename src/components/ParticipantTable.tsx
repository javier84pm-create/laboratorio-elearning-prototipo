"use client";

import type { Participant } from "@/types";
import { SegmentBadge } from "@/components/SegmentBadge";

export function ParticipantTable({
  rows,
  onSelect,
}: {
  rows: Participant[];
  onSelect: (participant: Participant) => void;
}) {
  return (
    <div className="surface overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-[var(--surface-muted)] text-[var(--ink-muted)]">
            <tr>
              <th className="px-4 py-3 font-medium">Participante</th>
              <th className="px-4 py-3 font-medium">Área</th>
              <th className="px-4 py-3 font-medium">Curso</th>
              <th className="px-4 py-3 font-medium">Estado</th>
              <th className="px-4 py-3 font-medium">Resultado</th>
              <th className="px-4 py-3 font-medium">Actividad</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.id}
                className="cursor-pointer border-t border-[var(--line)] transition hover:bg-[var(--brand-soft)]/50"
                onClick={() => onSelect(row)}
              >
                <td className="px-4 py-3 font-medium text-[var(--ink)]">{row.name}</td>
                <td className="px-4 py-3 text-[var(--ink-muted)]">{row.area}</td>
                <td className="px-4 py-3 text-[var(--ink-muted)]">{row.course}</td>
                <td className="px-4 py-3">
                  <SegmentBadge status={row.status} />
                </td>
                <td className="px-4 py-3 font-semibold text-[var(--brand)]">
                  {row.result != null ? `${row.result}%` : "—"}
                </td>
                <td className="px-4 py-3 text-[var(--ink-muted)]">{row.lastActivity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
