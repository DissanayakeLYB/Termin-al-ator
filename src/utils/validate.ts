import type { QuizQuestion } from "../data/questions";

/**
 * Normalizes a user's answer: trims leading/trailing whitespace and collapses
 * internal runs of whitespace into a single space, so "  :w  " or
 * ":w   backup.txt" are accepted as friendly as possible.
 */
export function normalizeAnswer(input: string): string {
  return input.trim().replace(/\s+/g, " ");
}

/**
 * Normalizes a Ctrl key combo so "Ctrl+R", "ctrl+r", "CTRL-R" and
 * "ctrl + r" all compare equal. Vim's Ctrl combos are not case-sensitive.
 */
function normalizeKeyCombo(input: string): string {
  return input.toLowerCase().replace(/\s+/g, "").replace(/-/g, "+");
}

/**
 * Validates a submitted answer against a question. Matching is exact after
 * normalization (Vim commands are case-sensitive), with two relaxations:
 * - optional explicit `aliases` (e.g. ":x" for ":wq", "esc" for "Esc")
 * - Ctrl key combos match case-insensitively and tolerate "-" vs "+"
 */
export function isCorrect(submitted: string, question: QuizQuestion): boolean {
  const normalized = normalizeAnswer(submitted);
  if (normalized === question.answer) return true;
  if ((question.aliases ?? []).some((alias) => normalized === alias)) return true;
  if (/^ctrl\+/i.test(question.answer)) {
    return normalizeKeyCombo(normalized) === normalizeKeyCombo(question.answer);
  }
  return false;
}
