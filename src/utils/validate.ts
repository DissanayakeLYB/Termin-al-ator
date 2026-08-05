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
 * Normalizes a key combo so "Ctrl+r", "CTRL-R", "ctrl + r", "Ctrl+b d",
 * "Ctrl+b+d" and "ctrl b d" all compare equal. Key combos are not
 * case-sensitive, and separators (+ / - / space) are interchangeable.
 */
function normalizeKeyCombo(input: string): string {
  return input.toLowerCase().split(/[\s\-+]+/).filter(Boolean).join("");
}

/**
 * Validates a submitted answer against a question. Matching is exact after
 * normalization (commands are case-sensitive), with two relaxations:
 * - optional explicit `aliases` (e.g. ":x" for ":wq", "esc" for "Esc")
 * - Ctrl key combos match case-insensitively with interchangeable separators
 */
export function isCorrect(submitted: string, question: QuizQuestion): boolean {
  const normalized = normalizeAnswer(submitted);
  const candidates = [question.answer, ...(question.aliases ?? [])];
  for (const candidate of candidates) {
    if (normalized === candidate) return true;
    if (/^ctrl\+/i.test(candidate) && normalizeKeyCombo(normalized) === normalizeKeyCombo(candidate)) {
      return true;
    }
  }
  return false;
}
