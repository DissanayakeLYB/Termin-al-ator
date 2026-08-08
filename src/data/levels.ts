import type { Level, QuestionSet, QuizQuestion } from "./questions";

/**
 * Practice levels.
 *
 * A level answers "what kind of practice do I want right now?", not "how hard
 * should the questions be?" — so the metadata here is about the *kind* of
 * knowledge exercised, never a difficulty rating.
 */
export interface LevelInfo {
  id: Level;
  /** Short name shown in the UI. */
  name: string;
  /** One-line pitch for the level picker. */
  tagline: string;
  /** Longer description shown on the level picker. */
  description: string;
  /** One-liner shown in the session banner while practicing. */
  sessionHint: string;
  /** Tailwind text color used for the level's accents. */
  accent: string;
  /** Tailwind border color used for the level's accents. */
  border: string;
  /** Marked on the picker as the suggested starting level. */
  recommended?: boolean;
}

export const levelInfos: LevelInfo[] = [
  {
    id: "pareto",
    name: "pareto",
    tagline: "the 20% you use every day",
    description:
      "The small set of commands and keybindings a real user reaches for constantly — 20% of the tool, 80% of the value. Highly repetitive on purpose, to build muscle memory fast. The best starting point for beginners.",
    sessionHint: "high-frequency, muscle-memory questions — the 20% that pays 80%",
    accent: "text-term-green",
    border: "border-term-green",
    recommended: true,
  },
  {
    id: "core",
    name: "core",
    tagline: "everything a regular user should know",
    description:
      "The essential foundation for becoming comfortable with the tool. Broader than pareto, still practical — every command a regular user should have at hand, and nothing obscure or niche.",
    sessionHint: "essential foundation questions — the commands every regular user should know",
    accent: "text-term-blue",
    border: "border-term-blue",
  },
  {
    id: "workflow",
    name: "workflow",
    tagline: "real tasks, not recall",
    description:
      "Scenario-driven practice: set up a workspace, recover from a mistake, ship a change. Questions are framed as realistic goals and you decide which commands to use — and in what order.",
    sessionHint: "scenario questions — you decide which command (and flags) fit the situation",
    accent: "text-term-amber",
    border: "border-term-amber",
  },
  {
    id: "chaos",
    name: "chaos",
    tagline: "everything mixed, zero hints",
    description:
      "Every question from every level, shuffled together. No level badges and no hints about which command or concept is coming — pure recall under realistic, unexpected conditions.",
    sessionHint: "every level, shuffled together — no hints about what's coming next",
    accent: "text-term-red",
    border: "border-term-red",
  },
];

/** Metadata for a level; falls back to the first level for unknown ids. */
export function levelInfo(level: Level): LevelInfo {
  return levelInfos.find((l) => l.id === level) ?? levelInfos[0];
}

/**
 * The question pool a level draws from for one category.
 *
 * "chaos" is a session-level, not a per-question property: it mixes the
 * entire category, so the user can't predict which concept comes next.
 */
export function questionsForLevel(set: QuestionSet, level: Level): QuizQuestion[] {
  if (level === "chaos") return set.questions;
  return set.questions.filter((q) => q.level === level);
}

export function countForLevel(set: QuestionSet, level: Level): number {
  return questionsForLevel(set, level).length;
}
