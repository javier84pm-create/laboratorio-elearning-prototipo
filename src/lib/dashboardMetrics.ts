import type { CourseCompletion, DashboardKpis, Participant } from "@/types";
import { currentUser } from "@/data/dashboard";

export const LEARNER_FULL_NAME = currentUser.fullName;

function parseTimeToSeconds(time: string | null): number | null {
  if (!time) return null;
  const [m, s] = time.split(":").map(Number);
  if (Number.isNaN(m) || Number.isNaN(s)) return null;
  return m * 60 + s;
}

function formatAverageTime(secondsList: number[]): string {
  if (!secondsList.length) return "—";
  const avg = Math.round(secondsList.reduce((a, b) => a + b, 0) / secondsList.length);
  const m = Math.floor(avg / 60);
  const s = avg % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

export function computeDashboardKpis(rows: Participant[]): DashboardKpis {
  const total = rows.length;
  const completed = rows.filter((p) => p.status === "completado").length;
  const pending = rows.filter((p) => p.status !== "completado").length;
  const scores = rows.filter((p) => p.result != null).map((p) => p.result as number);
  const times = rows
    .map((p) => parseTimeToSeconds(p.time))
    .filter((t): t is number => t != null);

  return {
    participants: total,
    completed,
    pending,
    completionRate: total ? Math.round((completed / total) * 1000) / 10 : 0,
    averageScore: scores.length
      ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
      : 0,
    averageTime: formatAverageTime(times),
  };
}

export function computeCourseCompletions(rows: Participant[]): CourseCompletion[] {
  const byCourse = new Map<string, { total: number; done: number }>();
  for (const p of rows) {
    const key = p.course;
    const entry = byCourse.get(key) ?? { total: 0, done: 0 };
    entry.total += 1;
    if (p.status === "completado") entry.done += 1;
    byCourse.set(key, entry);
  }

  return Array.from(byCourse.entries())
    .map(([name, { total, done }]) => ({
      name: name.replace(" — Nivel 1", "").replace(" Básica", ""),
      rate: total ? Math.round((done / total) * 100) : 0,
    }))
    .sort((a, b) => b.rate - a.rate);
}

export function applyLearnerProgress(
  rows: Participant[],
  opts: {
    completed: boolean;
    result?: number;
    time?: string;
    badges?: string[];
    completedCourses?: number;
  },
): Participant[] {
  return rows.map((p) => {
    if (p.name !== LEARNER_FULL_NAME) return p;
    if (!opts.completed) {
      return {
        ...p,
        status: "pendiente",
        result: null,
        time: null,
        lastActivity: "Hoy · sin avance",
        completedCourses: 0,
        average: 0,
        trainingMinutes: 0,
        badges: [],
      };
    }
    return {
      ...p,
      status: "completado",
      result: opts.result ?? 100,
      time: opts.time ?? "3:14",
      lastActivity: "Hace un momento",
      completedCourses: opts.completedCourses ?? 1,
      average: opts.result ?? 100,
      trainingMinutes: Math.max(3, Math.round(((opts.result ?? 100) / 100) * 4)),
      badges: opts.badges ?? ["Seguridad Nivel 1"],
    };
  });
}

export function buildActivityFeed(
  rows: Participant[],
  live?: { text: string; time: string } | null,
): Array<{ time: string; text: string }> {
  const fromCohort = [...rows]
    .filter((p) => p.name !== LEARNER_FULL_NAME || p.status === "completado")
    .sort((a, b) => {
      const rank = (s: Participant["status"]) =>
        s === "completado" ? 0 : s === "en_progreso" ? 1 : 2;
      return rank(a.status) - rank(b.status);
    })
    .slice(0, 5)
    .map((p) => {
      if (p.status === "completado") {
        return {
          time: p.lastActivity,
          text: `${p.name} finalizó ${p.course}${p.result != null ? ` (${p.result}%)` : ""}`,
        };
      }
      if (p.status === "en_progreso") {
        return {
          time: p.lastActivity,
          text: `${p.name} retomó ${p.course}`,
        };
      }
      return {
        time: p.lastActivity,
        text: `${p.name} tiene pendiente ${p.course}`,
      };
    });

  if (live) return [live, ...fromCohort.filter((e) => e.text !== live.text)].slice(0, 6);
  return fromCohort;
}

export function participantsToCsv(rows: Participant[]): string {
  const header = [
    "nombre",
    "area",
    "curso",
    "estado",
    "resultado",
    "tiempo",
    "ultima_actividad",
    "cursos_completados",
    "promedio",
    "minutos",
    "insignias",
  ];
  const lines = rows.map((p) =>
    [
      p.name,
      p.area,
      p.course,
      p.status,
      p.result ?? "",
      p.time ?? "",
      p.lastActivity,
      p.completedCourses,
      p.average,
      p.trainingMinutes,
      p.badges.join("; "),
    ]
      .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
      .join(","),
  );
  return [header.join(","), ...lines].join("\n");
}
