import type { CourseCompletion, DashboardKpis, DemoUserProgress } from "@/types";

export const dashboardKpis: DashboardKpis = {
  participants: 126,
  completed: 103,
  pending: 23,
  completionRate: 81.7,
  averageScore: 89,
  averageTime: "3:24",
};

export const courseCompletions: CourseCompletion[] = [
  { name: "Prevención de Riesgos", rate: 92 },
  { name: "Inducción", rate: 84 },
  { name: "Protección de Datos", rate: 79 },
  { name: "Atención al Cliente", rate: 76 },
];

export const currentUser = {
  name: "Camila",
  fullName: "Camila Rojas",
  role: "Aprendiz",
};

export const initialUserProgress: DemoUserProgress = {
  weeklyCompleted: 4,
  weeklyTotal: 5,
  capsulesCompleted: 11,
  badgesEarned: 3,
  averageScore: 92,
  totalMinutes: 38,
  completedCourseIds: ["proteccion-datos", "induccion", "etica"],
};
