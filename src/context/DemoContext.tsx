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
import { getCourseById } from "@/data/courses";
import { initialUserProgress } from "@/data/dashboard";
import { getLeague, type LeagueInfo } from "@/lib/league";
import { playSfx } from "@/lib/sfx";
import type { CourseSession, DemoUserProgress } from "@/types";

const STORAGE_KEY = "smartcaps-demo-state-v5";
const XP_PER_LEVEL = 100;
const DEFAULT_SECONDS = 180;
const HINT_COST = 5;

interface XpBurst {
  id: number;
  amount: number;
  emoji: string;
}

interface DemoState {
  audioMode: boolean;
  sfxEnabled: boolean;
  activeCourseId: string | null;
  sessions: Record<string, CourseSession>;
  quizAnswered: boolean;
  quizCorrect: boolean;
  lastResultPercent: number;
  lastDurationLabel: string;
  lastXpEarned: number;
  lastBadgeName: string;
  lastCompletedCourseId: string | null;
  userProgress: DemoUserProgress;
  xp: number;
  level: number;
  streakDays: number;
  lastPlayedDate: string | null;
  justUnlockedBadge: boolean;
  dailyGoalDate: string | null;
  justCompletedDailyGoal: boolean;
}

interface DemoContextValue extends DemoState {
  setAudioMode: (value: boolean) => void;
  setSfxEnabled: (value: boolean) => void;
  startCourse: (courseId: string) => void;
  setCapsuleStep: (step: number) => void;
  advanceStep: (maxStep?: number) => void;
  tickLearning: () => void;
  earnXp: (amount: number, message?: string) => void;
  spendXp: (amount: number, message?: string) => boolean;
  registerPlayDay: () => void;
  claimDailyProgress: () => void;
  answerQuiz: (correct: boolean) => void;
  incrementAttempt: () => void;
  completeCourse: (courseId: string) => void;
  resetDemo: () => void;
  toast: string | null;
  showToast: (message: string) => void;
  clearToast: () => void;
  clearJustUnlockedBadge: () => void;
  clearJustCompletedDailyGoal: () => void;
  xpToNextLevel: number;
  xpProgressPercent: number;
  courseStarted: boolean;
  courseCompleted: boolean;
  capsuleStep: number;
  remainingSeconds: number;
  attempts: number;
  isCourseCompleted: (courseId: string) => boolean;
  getSession: (courseId: string) => CourseSession | undefined;
  xpBurst: XpBurst | null;
  dailyGoalDone: boolean;
  leagueCelebration: LeagueInfo | null;
  clearLeagueCelebration: () => void;
}

function emptySession(remainingSeconds = DEFAULT_SECONDS): CourseSession {
  return {
    started: false,
    completed: false,
    capsuleStep: 0,
    remainingSeconds,
    attempts: 0,
  };
}

const defaultState: DemoState = {
  audioMode: false,
  sfxEnabled: true,
  activeCourseId: null,
  sessions: {},
  quizAnswered: false,
  quizCorrect: false,
  lastResultPercent: 0,
  lastDurationLabel: "0 min 00 s",
  lastXpEarned: 0,
  lastBadgeName: "",
  lastCompletedCourseId: null,
  userProgress: initialUserProgress,
  xp: 0,
  level: 1,
  streakDays: 2,
  lastPlayedDate: null as string | null, // se ajusta al hidratar / default fresco
  justUnlockedBadge: false,
  dailyGoalDate: null,
  justCompletedDailyGoal: false,
};

function buildDefaultState(): DemoState {
  return {
    ...defaultState,
    streakDays: 2,
    lastPlayedDate: yesterdayKey(),
  };
}

const DemoContext = createContext<DemoContextValue | null>(null);

function levelFromXp(xp: number) {
  return Math.max(1, Math.floor(xp / XP_PER_LEVEL) + 1);
}

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayKey() {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

function formatDuration(totalSeconds: number, budget: number) {
  const used = Math.max(0, budget - totalSeconds);
  const m = Math.floor(used / 60);
  const s = used % 60;
  return `${m} min ${String(s).padStart(2, "0")} s`;
}

function applyCompletion(
  progress: DemoUserProgress,
  courseId: string,
  minutes: number,
): DemoUserProgress {
  if (progress.completedCourseIds.includes(courseId)) {
    return progress;
  }
  return {
    weeklyCompleted: Math.min(progress.weeklyTotal, progress.weeklyCompleted + 1),
    weeklyTotal: progress.weeklyTotal,
    capsulesCompleted: progress.capsulesCompleted + 1,
    badgesEarned: progress.badgesEarned + 1,
    averageScore: 92,
    totalMinutes: progress.totalMinutes + minutes,
    completedCourseIds: [...progress.completedCourseIds, courseId],
  };
}

function ensureSession(
  sessions: Record<string, CourseSession>,
  courseId: string,
  completedIds: string[] = [],
): CourseSession {
  if (sessions[courseId]) return sessions[courseId];
  const course = getCourseById(courseId);
  const seconds = course?.content.remainingSeconds ?? DEFAULT_SECONDS;
  const preCompleted = completedIds.includes(courseId);
  return {
    ...emptySession(seconds),
    completed: preCompleted,
    started: preCompleted,
    capsuleStep: 0,
  };
}

export function DemoProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<DemoState>(() => buildDefaultState());
  const [hydrated, setHydrated] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [xpBurst, setXpBurst] = useState<XpBurst | null>(null);
  const [leagueCelebration, setLeagueCelebration] = useState<LeagueInfo | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<DemoState>;
        setState({
          ...buildDefaultState(),
          ...parsed,
          sessions: parsed.sessions ?? {},
          userProgress: { ...defaultState.userProgress, ...parsed.userProgress },
          level: levelFromXp(parsed.xp ?? defaultState.xp),
        });
      }
    } catch {
      // ignore
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state, hydrated]);

  const showToast = useCallback((message: string) => setToast(message), []);
  const clearToast = useCallback(() => setToast(null), []);

  const setAudioMode = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, audioMode: value }));
  }, []);

  const setSfxEnabled = useCallback((value: boolean) => {
    setState((prev) => ({ ...prev, sfxEnabled: value }));
  }, []);

  const startCourse = useCallback((courseId: string) => {
    setState((prev) => {
      const session = ensureSession(
        prev.sessions,
        courseId,
        prev.userProgress.completedCourseIds,
      );
      const alreadyDone = prev.userProgress.completedCourseIds.includes(courseId);
      const nextSession: CourseSession = {
        ...session,
        started: true,
        completed: alreadyDone || session.completed,
        remainingSeconds:
          session.remainingSeconds > 0
            ? session.remainingSeconds
            : (getCourseById(courseId)?.content.remainingSeconds ?? DEFAULT_SECONDS),
        capsuleStep: alreadyDone ? 0 : session.capsuleStep,
      };
      return {
        ...prev,
        activeCourseId: courseId,
        quizAnswered: false,
        quizCorrect: false,
        sessions: { ...prev.sessions, [courseId]: nextSession },
      };
    });
  }, []);

  const setCapsuleStep = useCallback((step: number) => {
    setState((prev) => {
      if (!prev.activeCourseId) return prev;
      const session = ensureSession(
        prev.sessions,
        prev.activeCourseId,
        prev.userProgress.completedCourseIds,
      );
      const max = (getCourseById(prev.activeCourseId)?.content.steps.length ?? 3) - 1;
      return {
        ...prev,
        sessions: {
          ...prev.sessions,
          [prev.activeCourseId]: {
            ...session,
            capsuleStep: Math.max(0, Math.min(max, step)),
          },
        },
      };
    });
  }, []);

  const advanceStep = useCallback((maxStep = 2) => {
    setState((prev) => {
      if (!prev.activeCourseId) return prev;
      const session = ensureSession(
        prev.sessions,
        prev.activeCourseId,
        prev.userProgress.completedCourseIds,
      );
      return {
        ...prev,
        sessions: {
          ...prev.sessions,
          [prev.activeCourseId]: {
            ...session,
            started: true,
            capsuleStep: Math.min(maxStep, session.capsuleStep + 1),
          },
        },
      };
    });
  }, []);

  const tickLearning = useCallback(() => {
    setState((prev) => {
      if (!prev.activeCourseId) return prev;
      const session = ensureSession(
        prev.sessions,
        prev.activeCourseId,
        prev.userProgress.completedCourseIds,
      );
      return {
        ...prev,
        sessions: {
          ...prev.sessions,
          [prev.activeCourseId]: {
            ...session,
            remainingSeconds: Math.max(0, session.remainingSeconds - 1),
          },
        },
      };
    });
  }, []);

  const earnXp = useCallback((amount: number, message?: string) => {
    setState((prev) => {
      const xp = prev.xp + amount;
      const level = levelFromXp(xp);
      const leveledUp = level > prev.level;
      const prevLeague = getLeague(prev.xp, prev.userProgress.weeklyCompleted);
      const nextLeague = getLeague(xp, prev.userProgress.weeklyCompleted);
      const leagueUp = prevLeague.tier !== nextLeague.tier;
      const toastMsg = leveledUp
        ? `🚀 ¡Nivel ${level}!`
        : leagueUp
          ? `${nextLeague.emoji} ¡Subiste a ${nextLeague.label}!`
          : message ?? `✨ +${amount} XP`;
      window.setTimeout(() => {
        setToast(toastMsg);
        setXpBurst({
          id: Date.now(),
          amount,
          emoji: leveledUp ? "🚀" : leagueUp ? nextLeague.emoji : "✨",
        });
        playSfx(leveledUp || leagueUp ? "levelup" : "xp", prev.sfxEnabled);
        if (leagueUp) setLeagueCelebration(nextLeague);
      }, 0);
      return { ...prev, xp, level, lastXpEarned: amount };
    });
  }, []);

  const spendXp = useCallback((amount: number, message?: string) => {
    let ok = false;
    setState((prev) => {
      if (prev.xp < amount) {
        window.setTimeout(() => {
          setToast(`😅 Necesitas ${amount} XP para usar la pista`);
          playSfx("wrong", prev.sfxEnabled);
        }, 0);
        return prev;
      }
      ok = true;
      const xp = prev.xp - amount;
      window.setTimeout(() => {
        setToast(message ?? `💡 −${amount} XP`);
        setXpBurst({ id: Date.now(), amount: -amount, emoji: "💡" });
        playSfx("tap", prev.sfxEnabled);
      }, 0);
      return { ...prev, xp, lastXpEarned: -amount };
    });
    return ok;
  }, []);

  const registerPlayDay = useCallback(() => {
    setState((prev) => {
      const today = todayKey();
      if (prev.lastPlayedDate === today) return prev;
      let streakDays = 1;
      if (prev.lastPlayedDate === yesterdayKey()) {
        streakDays = prev.streakDays + 1;
      }
      if (streakDays > 1) {
        window.setTimeout(() => {
          setToast(`🔥 Racha x${streakDays}`);
          playSfx("streak", prev.sfxEnabled);
        }, 0);
      }
      return { ...prev, lastPlayedDate: today, streakDays };
    });
  }, []);

  const claimDailyProgress = useCallback(() => {
    setState((prev) => {
      const today = todayKey();
      let streakDays = prev.streakDays;
      let lastPlayedDate = prev.lastPlayedDate;
      if (lastPlayedDate !== today) {
        if (lastPlayedDate === yesterdayKey()) {
          streakDays = prev.streakDays + 1;
        } else {
          streakDays = 1;
        }
        lastPlayedDate = today;
      }
      const firstDaily = prev.dailyGoalDate !== today;
      if (firstDaily) {
        window.setTimeout(() => {
          setToast(
            streakDays > prev.streakDays
              ? `🔥 Racha x${streakDays} · meta del día OK`
              : "🎯 ¡Meta del día completada!",
          );
          playSfx("streak", prev.sfxEnabled);
        }, 0);
      } else if (lastPlayedDate === today && streakDays > prev.streakDays) {
        window.setTimeout(() => {
          setToast(`🔥 Racha x${streakDays}`);
          playSfx("streak", prev.sfxEnabled);
        }, 0);
      }
      return {
        ...prev,
        lastPlayedDate,
        streakDays,
        dailyGoalDate: today,
        justCompletedDailyGoal: firstDaily,
      };
    });
  }, []);

  const incrementAttempt = useCallback(() => {
    setState((prev) => {
      if (!prev.activeCourseId) return prev;
      const session = ensureSession(
        prev.sessions,
        prev.activeCourseId,
        prev.userProgress.completedCourseIds,
      );
      return {
        ...prev,
        sessions: {
          ...prev.sessions,
          [prev.activeCourseId]: { ...session, attempts: session.attempts + 1 },
        },
      };
    });
  }, []);

  const answerQuiz = useCallback((correct: boolean) => {
    setState((prev) => ({
      ...prev,
      quizAnswered: true,
      quizCorrect: correct,
      lastResultPercent: correct ? 100 : 0,
    }));
  }, []);

  const completeCourse = useCallback((courseId: string) => {
    setState((prev) => {
      const course = getCourseById(courseId);
      const session = ensureSession(
        prev.sessions,
        courseId,
        prev.userProgress.completedCourseIds,
      );
      const already = prev.userProgress.completedCourseIds.includes(courseId);
      const xpGain = already ? 15 : 50;
      const xp = prev.xp + xpGain;
      const level = levelFromXp(xp);
      const budget = course?.content.remainingSeconds ?? DEFAULT_SECONDS;
      const durationLabel = formatDuration(session.remainingSeconds, budget);
      const badgeName = course?.content.badgeName ?? "Insignia";
      const minutes = course?.durationMinutes ?? 3;
      const today = todayKey();
      const firstDaily = prev.dailyGoalDate !== today;
      const nextProgress = applyCompletion(prev.userProgress, courseId, minutes);
      const prevLeague = getLeague(prev.xp, prev.userProgress.weeklyCompleted);
      const nextLeague = getLeague(xp, nextProgress.weeklyCompleted);
      const leagueUp = prevLeague.tier !== nextLeague.tier;
      window.setTimeout(() => {
        if (!already) {
          setToast(
            firstDaily
              ? `🎯 ¡Meta del día + insignia! +${xpGain} XP`
              : `🏆 ¡Insignia desbloqueada! +${xpGain} XP`,
          );
          setXpBurst({ id: Date.now(), amount: xpGain, emoji: firstDaily ? "🎯" : "🏆" });
          playSfx("complete", prev.sfxEnabled);
        } else {
          setToast(
            firstDaily
              ? `🎯 ¡Meta del día! Repaso +${xpGain} XP`
              : `♻️ Repaso completado · +${xpGain} XP`,
          );
          setXpBurst({ id: Date.now(), amount: xpGain, emoji: firstDaily ? "🎯" : "♻️" });
          playSfx(firstDaily ? "streak" : "xp", prev.sfxEnabled);
        }
        if (leagueUp) {
          window.setTimeout(() => setLeagueCelebration(nextLeague), 900);
        }
      }, 0);
      return {
        ...prev,
        activeCourseId: courseId,
        lastResultPercent: 100,
        lastDurationLabel: durationLabel,
        lastXpEarned: xpGain,
        lastBadgeName: badgeName,
        lastCompletedCourseId: courseId,
        xp,
        level,
        justUnlockedBadge: !already,
        dailyGoalDate: today,
        justCompletedDailyGoal: firstDaily,
        lastPlayedDate: today,
        userProgress: nextProgress,
        sessions: {
          ...prev.sessions,
          [courseId]: { ...session, started: true, completed: true },
        },
      };
    });
  }, []);

  const resetDemo = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem("smartcaps-demo-state-v2");
    localStorage.removeItem("smartcaps-demo-state-v3");
    localStorage.removeItem("smartcaps-demo-state-v4");
    setState(buildDefaultState());
    setToast("🔄 Demo reiniciada · listo para empezar");
  }, []);

  const clearJustUnlockedBadge = useCallback(() => {
    setState((prev) => ({ ...prev, justUnlockedBadge: false }));
  }, []);

  const clearJustCompletedDailyGoal = useCallback(() => {
    setState((prev) => ({ ...prev, justCompletedDailyGoal: false }));
  }, []);

  const clearLeagueCelebration = useCallback(() => {
    setLeagueCelebration(null);
  }, []);

  const isCourseCompleted = useCallback(
    (courseId: string) =>
      state.userProgress.completedCourseIds.includes(courseId) ||
      !!state.sessions[courseId]?.completed,
    [state.userProgress.completedCourseIds, state.sessions],
  );

  const getSession = useCallback(
    (courseId: string) => state.sessions[courseId],
    [state.sessions],
  );

  const activeSession = state.activeCourseId
    ? state.sessions[state.activeCourseId]
    : undefined;

  const xpToNextLevel = XP_PER_LEVEL - (state.xp % XP_PER_LEVEL);
  const xpProgressPercent = ((state.xp % XP_PER_LEVEL) / XP_PER_LEVEL) * 100;

  const dailyGoalDone = state.dailyGoalDate === todayKey();

  const value = useMemo(
    () => ({
      ...state,
      setAudioMode,
      setSfxEnabled,
      startCourse,
      setCapsuleStep,
      advanceStep,
      tickLearning,
      earnXp,
      spendXp,
      registerPlayDay,
      claimDailyProgress,
      answerQuiz,
      incrementAttempt,
      completeCourse,
      resetDemo,
      toast,
      showToast,
      clearToast,
      clearJustUnlockedBadge,
      clearJustCompletedDailyGoal,
      xpToNextLevel,
      xpProgressPercent,
      courseStarted: !!activeSession?.started,
      courseCompleted: state.activeCourseId
        ? state.userProgress.completedCourseIds.includes(state.activeCourseId) ||
          !!activeSession?.completed
        : false,
      capsuleStep: activeSession?.capsuleStep ?? 0,
      remainingSeconds: activeSession?.remainingSeconds ?? DEFAULT_SECONDS,
      attempts: activeSession?.attempts ?? 0,
      isCourseCompleted,
      getSession,
      xpBurst,
      dailyGoalDone,
      leagueCelebration,
      clearLeagueCelebration,
    }),
    [
      state,
      setAudioMode,
      setSfxEnabled,
      startCourse,
      setCapsuleStep,
      advanceStep,
      tickLearning,
      earnXp,
      spendXp,
      registerPlayDay,
      claimDailyProgress,
      answerQuiz,
      incrementAttempt,
      completeCourse,
      resetDemo,
      toast,
      showToast,
      clearToast,
      clearJustUnlockedBadge,
      clearJustCompletedDailyGoal,
      clearLeagueCelebration,
      xpToNextLevel,
      xpProgressPercent,
      activeSession,
      isCourseCompleted,
      getSession,
      xpBurst,
      dailyGoalDone,
      leagueCelebration,
    ],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const ctx = useContext(DemoContext);
  if (!ctx) throw new Error("useDemo debe usarse dentro de DemoProvider");
  return ctx;
}

export { XP_PER_LEVEL, DEFAULT_SECONDS as CAPSULE_TOTAL_SECONDS, HINT_COST };
