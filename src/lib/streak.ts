export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export type StreakStatus =
  | { kind: "none" }
  | { kind: "safe"; streakDays: number }
  | { kind: "risk"; streakDays: number; message: string }
  | { kind: "broken"; streakDays: number; message: string };

export function getStreakStatus(
  streakDays: number,
  lastPlayedDate: string | null,
): StreakStatus {
  if (streakDays <= 0) return { kind: "none" };
  const today = todayKey();
  const yesterday = yesterdayKey();
  if (lastPlayedDate === today) {
    return { kind: "safe", streakDays };
  }
  if (lastPlayedDate === yesterday) {
    return {
      kind: "risk",
      streakDays,
      message: `Tu racha x${streakDays} está en riesgo. Completa una cápsula o práctica hoy para no perderla.`,
    };
  }
  return {
    kind: "broken",
    streakDays,
    message: `Se enfrió tu racha. Juega hoy y vuelve a encenderla 🔥`,
  };
}
