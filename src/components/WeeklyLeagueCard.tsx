"use client";

import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { ProgressBar } from "@/components/ProgressBar";
import { buildLeagueBoard, getLeague } from "@/lib/league";

export function WeeklyLeagueCard({
  xp,
  weeklyCompleted,
}: {
  xp: number;
  weeklyCompleted: number;
}) {
  const league = getLeague(xp, weeklyCompleted);
  const board = buildLeagueBoard(league.xpInLeague);

  return (
    <section className="surface overflow-hidden">
      <div className="px-5 py-4 text-white" style={{ background: league.color }}>
        <p className="inline-flex items-center gap-2 text-sm text-white/85">
          <Trophy size={15} /> Liga semanal
        </p>
        <h2 className="font-display mt-1 text-2xl font-bold">
          {league.emoji} {league.label}
        </h2>
        <p className="mt-1 text-sm text-white/85">{league.nextLabel}</p>
      </div>

      <div className="space-y-4 p-5">
        <ProgressBar value={league.progressToNext} label="Avance en la liga" />

        <ul className="space-y-2">
          {board.slice(0, 5).map((row) => (
            <motion.li
              key={row.name}
              layout
              className={`flex items-center justify-between gap-3 rounded-2xl px-3 py-2.5 text-sm ${
                row.you
                  ? "bg-[var(--brand-soft)] ring-1 ring-[var(--brand)]/25"
                  : "bg-[var(--surface-muted)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full text-xs font-bold ${
                    row.rank === 1
                      ? "bg-amber-200 text-amber-900"
                      : row.rank === 2
                        ? "bg-slate-200 text-slate-700"
                        : row.rank === 3
                          ? "bg-orange-200 text-orange-900"
                          : "bg-white text-[var(--ink-muted)]"
                  }`}
                >
                  {row.rank}
                </span>
                <div>
                  <p className="font-semibold text-[var(--ink)]">
                    {row.name}
                    {row.you ? " · tú" : ""}
                  </p>
                  <p className="text-xs text-[var(--ink-muted)]">
                    {row.league.emoji} {row.league.label}
                  </p>
                </div>
              </div>
              <span className="font-bold tabular-nums text-[var(--brand)]">{row.xp} pts</span>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
