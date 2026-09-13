export type CourseStatus = "completado" | "en_progreso" | "pendiente";

export interface CapsuleStep {
  id: string;
  title: string;
  body: string;
  tip: string;
}

export interface QuizOption {
  id: string;
  label: string;
  correct: boolean;
  feedback: string;
}

export interface QuizContent {
  question: string;
  hint: string;
  options: QuizOption[];
}

export interface CourseContent {
  steps: CapsuleStep[];
  quiz: QuizContent;
  badgeName: string;
  remainingSeconds: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  durationMinutes: number;
  level: string;
  status: CourseStatus;
  progress: number;
  slug: string;
  evaluations: number;
  content: CourseContent;
  theme: {
    primary: string;
    soft: string;
    emoji: string;
  };
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earned: boolean;
  courseId?: string;
}

export interface Participant {
  id: string;
  name: string;
  area: string;
  course: string;
  status: CourseStatus;
  result: number | null;
  time: string | null;
  lastActivity: string;
  completedCourses: number;
  average: number;
  trainingMinutes: number;
  badges: string[];
}

export interface DashboardKpis {
  participants: number;
  completed: number;
  pending: number;
  completionRate: number;
  averageScore: number;
  averageTime: string;
}

export interface CourseCompletion {
  name: string;
  rate: number;
}

export interface DemoUserProgress {
  weeklyCompleted: number;
  weeklyTotal: number;
  capsulesCompleted: number;
  badgesEarned: number;
  averageScore: number;
  totalMinutes: number;
  completedCourseIds: string[];
}

export interface CourseSession {
  started: boolean;
  completed: boolean;
  capsuleStep: number;
  remainingSeconds: number;
  attempts: number;
}
