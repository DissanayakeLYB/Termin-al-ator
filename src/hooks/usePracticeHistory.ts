import { useCallback, useEffect, useRef, useState } from "react";
import type { QuizQuestion } from "../data/questions";

/**
 * Practice history for the timed "daily practice" sprint mode.
 *
 * Two pieces of persistent state (localStorage):
 * - `misses`  — how many times each question was answered wrong (capped at 9).
 *   Correct answers knock the count down. The sprint deck is weighted so
 *   questions with more misses surface first: "prioritize what needs practice".
 * - `streak`  — consecutive days with at least one completed sprint, for the
 *   daily-routine feel.
 */

const STORAGE_KEY = "terminator.practice.v1";
const MISS_CAP = 9;

interface PracticeData {
  misses: Record<string, number>;
  streak: number;
  /** Last day a sprint was completed, as "YYYY-MM-DD" (local time). */
  lastDate: string | null;
}

export interface PracticeHistory {
  /** Live miss counts keyed by question id. */
  misses: Record<string, number>;
  missCount: (id: string) => number;
  /** +1 on a wrong answer, −1 on a correct one (never below 0). */
  record: (id: string, correct: boolean) => void;
  /** Record that a sprint was completed today; bumps the streak. */
  markDone: () => void;
  streak: number;
  lastDate: string | null;
}

function dateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function addDays(date: string, delta: number): string {
  const [y, m, d] = date.split("-").map(Number);
  return dateStr(new Date(y, m - 1, d + delta));
}

function load(): PracticeData {
  const fallback: PracticeData = { misses: {}, streak: 0, lastDate: null };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<PracticeData>;
    const misses =
      parsed.misses && typeof parsed.misses === "object"
        ? (parsed.misses as Record<string, number>)
        : {};
    return {
      misses,
      streak: Number.isFinite(Number(parsed.streak)) ? Number(parsed.streak) : 0,
      lastDate: typeof parsed.lastDate === "string" ? parsed.lastDate : null,
    };
  } catch {
    return fallback;
  }
}

/** Fisher–Yates shuffle (mutates a copy). */
function shuffle<T>(items: T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Build the sprint deck: everything previously missed comes first (hardest-hit
 * first, randomized within equal counts), then the rest shuffled. The user
 * sees the material they need most while the session is fresh.
 */
export function buildPracticeDeck(
  questions: QuizQuestion[],
  misses: Record<string, number>
): QuizQuestion[] {
  const groups = new Map<number, QuizQuestion[]>();
  const fresh: QuizQuestion[] = [];
  for (const q of questions) {
    const m = Math.min(MISS_CAP, misses[q.id] ?? 0);
    if (m > 0) {
      const bucket = groups.get(m);
      if (bucket) bucket.push(q);
      else groups.set(m, [q]);
    } else {
      fresh.push(q);
    }
  }
  const missed: QuizQuestion[] = [];
  for (const count of [...groups.keys()].sort((a, b) => b - a)) {
    missed.push(...shuffle(groups.get(count)!));
  }
  return [...missed, ...shuffle(fresh)];
}

export function usePracticeHistory(): PracticeHistory {
  const [data, setData] = useState<PracticeData>(load);
  const dataRef = useRef(data);
  dataRef.current = data;

  // Persist after every change.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Storage unavailable — session-only is fine.
    }
  }, [data]);

  const record = useCallback((id: string, correct: boolean) => {
    setData((prev) => {
      const cur = Math.min(MISS_CAP, prev.misses[id] ?? 0);
      const next = Math.max(0, cur + (correct ? -1 : 1));
      if (next === cur) return prev;
      return { ...prev, misses: { ...prev.misses, [id]: next } };
    });
  }, []);

  // Idempotent: only writes when today isn't already recorded, so StrictMode's
  // double effects can't double-count a day.
  const markDone = useCallback(() => {
    setData((prev) => {
      const today = dateStr(new Date());
      if (prev.lastDate === today) return prev;
      const streak =
        prev.lastDate === addDays(today, -1) ? (prev.streak ?? 0) + 1 : 1;
      return { ...prev, lastDate: today, streak };
    });
  }, []);

  const missCount = useCallback(
    (id: string) => dataRef.current.misses[id] ?? 0,
    []
  );

  return {
    misses: data.misses,
    missCount,
    record,
    markDone,
    streak: data.streak,
    lastDate: data.lastDate,
  };
}
