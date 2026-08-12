import type { QuizQuestion } from "../data/questions";
import { normalizeAnswer } from "./validate";

/**
 * Mission questions: a realistic situation + a goal where the user figures
 * out which commands are required. A submission is correct when it includes
 * every essential command from `question.required` (in any order) — the
 * *concepts* are graded, not the exact argument spellings.
 *
 * Matching rules:
 * - The submission is split into individual commands on `;`, `&&`, `||`,
 *   `|`, and newlines — so pipeline stages count as separate commands
 *   (`tail -f app.log | grep ERROR` supplies both stages).
 * - `$(...)` command substitutions are extracted too, so a one-liner like
 *   `kill $(pgrep node)` satisfies both `kill` and `pgrep node`.
 * - Comparison is case-insensitive and whitespace-normalized (missions grade
 *   concepts, not capitalization).
 * - Trailing arguments are free: a required `tmux new -s` is satisfied by
 *   `tmux new -s dev` (the token must equal the required command or start
 *   with it followed by a space).
 * - Each token satisfies at most one required command (repeating one
 *   essential command twice can't cover two distinct requirements).
 */

/** Splits a mission submission into individual matchable commands. */
export function missionTokens(input: string): string[] {
  // Command substitutions become matchable commands of their own.
  const substitutions = [...input.matchAll(/\$\(\s*([^)]+?)\s*\)/g)].map(
    (m) => m[1]
  );
  const parts = [input, ...substitutions].join("\n");
  return parts
    .split(/[;&|\n]+/)
    .map((t) => t.trim())
    .filter(Boolean);
}

/** Whether one token satisfies a required command (prefix-tolerant). */
function tokenSatisfies(token: string, required: string): boolean {
  const t = normalizeAnswer(token).toLowerCase();
  const r = normalizeAnswer(required).toLowerCase();
  return t === r || t.startsWith(`${r} `);
}

/**
 * Grades a mission submission against its required commands. Returns which
 * required commands were found and which are still missing.
 */
export function missionMatch(
  question: QuizQuestion,
  submitted: string
): { found: string[]; missing: string[] } {
  const required = question.required ?? [];
  const tokens = missionTokens(submitted);
  const used = new Set<number>();
  const found: string[] = [];
  const missing: string[] = [];
  for (const r of required) {
    const idx = tokens.findIndex(
      (t, i) => !used.has(i) && tokenSatisfies(t, r)
    );
    if (idx === -1) {
      missing.push(r);
    } else {
      used.add(idx);
      found.push(r);
    }
  }
  return { found, missing };
}

/** True when the submission includes every required command of the mission. */
export function isMissionSatisfied(
  question: QuizQuestion,
  submitted: string
): boolean {
  return missionMatch(question, submitted).missing.length === 0;
}
