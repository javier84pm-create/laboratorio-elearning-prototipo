"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search } from "lucide-react";
import { ParticipantDrawer } from "@/components/ParticipantDrawer";
import { ParticipantTable } from "@/components/ParticipantTable";
import { participants } from "@/data/participants";
import type { Participant } from "@/types";

export default function ParticipantsPage() {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Participant | null>(null);

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return participants;
    return participants.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.area.toLowerCase().includes(q) ||
        p.course.toLowerCase().includes(q),
    );
  }, [query]);

  return (
    <div className="admin-wrap space-y-5">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <Link href="/admin" className="mb-2 inline-flex items-center gap-1 text-sm text-[var(--brand)]">
            <ArrowLeft size={14} /> Volver al panel
          </Link>
          <h1 className="font-display text-3xl font-bold">Participantes</h1>
          <p className="mt-1 text-[var(--ink-muted)]">
            Busca y abre el detalle de cada persona. Datos demostrativos.
          </p>
        </div>
        <label className="surface flex min-w-[260px] items-center gap-2 px-3 py-2">
          <Search size={16} className="text-[var(--ink-muted)]" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por nombre, área o curso"
            className="w-full bg-transparent text-sm outline-none"
          />
        </label>
      </header>

      <ParticipantTable rows={rows} onSelect={setSelected} />
      <ParticipantDrawer participant={selected} onClose={() => setSelected(null)} />
    </div>
  );
}
