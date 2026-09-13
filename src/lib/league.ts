export type LeagueTier = "bronce" | "plata" | "oro";

export interface LeagueInfo {
  tier: LeagueTier;
  emoji: string;
  label: string;
  color: string;
  soft: string;
  nextLabel: string;
  progressToNext: number; // 0-100
  xpInLeague: number;
}

const TIERS: Record<
  LeagueTier,
  { emoji: string; label: string; color: string; soft: string; minXp: number }
> = {
  bronce: {
    emoji: "🥉",
    label: "Liga Bronce",
    color: "#b45309",
    soft: "#ffedd5",
    minXp: 0,
  },
  plata: {
    emoji: "🥈",
    label: "Liga Plata",
    color: "#64748b",
    soft: "#f1f5f9",
    minXp: 40,
  },
  oro: {
    emoji: "🥇",
    label: "Liga Oro",
    color: "#ca8a04",
    soft: "#fef9c3",
    minXp: 120,
  },
};

export function getLeague(xp: number, weeklyCompleted: number): LeagueInfo {
  const score = xp + weeklyCompleted * 20;
  let tier: LeagueTier = "bronce";
  if (score >= TIERS.oro.minXp) tier = "oro";
  else if (score >= TIERS.plata.minXp) tier = "plata";

  const current = TIERS[tier];
  const nextTier: LeagueTier | null =
    tier === "bronce" ? "plata" : tier === "plata" ? "oro" : null;

  let progressToNext = 100;
  let nextLabel = "¡Top de la semana!";
  if (nextTier) {
    const next = TIERS[nextTier];
    const span = next.minXp - current.minXp;
    progressToNext = Math.min(100, Math.round(((score - current.minXp) / span) * 100));
    nextLabel = `Faltan ${Math.max(0, next.minXp - score)} pts para ${next.label}`;
  }

  return {
    tier,
    emoji: current.emoji,
    label: current.label,
    color: current.color,
    soft: current.soft,
    nextLabel,
    progressToNext,
    xpInLeague: score,
  };
}

export function buildLeagueBoard(learnerXp: number, learnerName = "Paola Cornejo") {
  const peers: Array<{ name: string; xp: number; you?: boolean }> = [
    { name: "Andrés Vega", xp: 210 },
    { name: "Daniela Contreras", xp: 180 },
    { name: "Marco Díaz", xp: 155 },
    { name: learnerName, xp: learnerXp, you: true },
    { name: "Fernanda Lagos", xp: 95 },
    { name: "Diego Soto", xp: 70 },
  ];
  return peers
    .sort((a, b) => b.xp - a.xp)
    .map((p, i) => ({ ...p, rank: i + 1, league: getLeague(p.xp, 0) }));
}
