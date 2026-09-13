import type { CourseCompletion, DashboardKpis, DemoUserProgress } from "@/types";

/** Valores de respaldo; el admin calcula KPIs desde la cohorte en vivo. */
export const dashboardKpis: DashboardKpis = {
  participants: 14,
  completed: 7,
  pending: 7,
  completionRate: 50,
  averageScore: 94,
  averageTime: "3:48",
};

export const courseCompletions: CourseCompletion[] = [
  { name: "Prevención de Riesgos", rate: 50 },
  { name: "Inducción", rate: 100 },
  { name: "Protección de Datos", rate: 100 },
  { name: "Atención al Cliente", rate: 0 },
];

export const currentUser = {
  name: "Paola",
  fullName: "Paola Cornejo",
  role: "Aprendiz",
};

/** Estado limpio de demo: sin progreso ni datos de aprendiz. */
export const initialUserProgress: DemoUserProgress = {
  weeklyCompleted: 0,
  weeklyTotal: 5,
  capsulesCompleted: 0,
  badgesEarned: 0,
  averageScore: 0,
  totalMinutes: 0,
  completedCourseIds: [],
};
