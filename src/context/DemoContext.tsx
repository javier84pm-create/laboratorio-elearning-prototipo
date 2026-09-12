"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { initialUserProgress } from "@/data/dashboard";
import type { DemoUserProgress } from "@/types";

const STORAGE_KEY = "smartcaps-demo-state";

interface DemoState {
  audioMode: boolean;
  courseStarted: boolean;
  quizAnswered: boolean;
  quizCorrect: boolean;
  courseCompleted: boolean;
  lastResultPercent: number;
  lastDurationLabel: string;
  userProgress: DemoUserProgress;
}

interface DemoContextValue extends DemoState {
  setAudioMode: (value: boolean) => void;
  startCourse: () => void;
  answerQuiz: (correct: boolean) => void;
  completeCourse: () => void;
  resetDemo: () => void;
  toast: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
}

const defaultState: DemoState = {
  audioMode: false,
  courseStarted: false,
  quizAnswered: false,
  quizCorrect: false,
  courseCompleted: false,
  lastResultPercent: 0,
  lastDurationLabel: "3 min 14 s",
  userProgress: initialUserProgress,
};

const DemoContext = createContext<DemoContextValue | null>(null);

function applyCompletion(progress: DemoUserProgress): DemoUserProgress {
  if (progress.completedCourseIds.includes("prevencion-riesgos")) {
    return progress;
  }
  return {
    weeklyCompleted: Math.min(progress.weeklyTotal, progress.weeklyCompleted + 1),
    weeklyTotal: progress.weeklyTotal,
    capsulesCompleted: progress.capsulesCompleted + 1,
    badgesEarned: progress.badgesEarned + 1,
    averageScore: 92,
    totalMinutes: progress.totalMinutes + 3,
    completedCourseIds: [...progress.completedCourseIds, "prevencion-riesgos"],
  };
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(defaultState);
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setState({ ...defaultState, ...JSON.parse(raw) });
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const setAudioMode = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, audioMode: value }));
  }, []);
  const startCourse = useCallback(() => {
    setState((prev) => ({ ...prev, courseStarted: true }));
  }, []);
  const answerQuiz = useCallback((correct: boolean) => {
    setState((prev) => ({
      ...prev,
      quizAnswered: true,
      quizCorrect: correct,
      lastResultPercent: correct ? 100 : 0,
    }));
  }, []);
  const completeCourse = useCallback(() => {
    setState((prev) => ({
      ...prev,
      courseCompleted: true,
      lastResultPercent: 100,
      lastDurationLabel: "3 min 14 s",
      userProgress: applyCompletion(prev.userProgress),
    }));
  }, []);
  const resetDemo = useCallback(() => {
    setState(defaultState);
    localStorage.removeItem(STORAGE_KEY);
    setToast("Demo restablecida");
  }, []);
  const showToast = useCallback((message: string) => setToast(message), []);
  const clearToast = useCallback(() => setToast(null), []);

  const value = useMemo(
    () => ({
      ...state,
      setAudioMode,
      startCourse,
      answerQuiz,
      completeCourse,
      resetDemo,
      toast,
      showToast,
      clearToast,
    }),
    [state, setAudioMode, startCourse, answerQuiz, completeCourse, resetDemo, toast, showToast, clearToast],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo debe usarse dentro de DemoProvider");
  return ctx;
}
