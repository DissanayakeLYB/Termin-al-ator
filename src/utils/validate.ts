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
 * normalization (commands are case-sensitive by default), with two relaxations:
 * - `caseSensitive: false` accepts any capitalization of answer/aliases
 * - optional explicit `aliases` (e.g. ":x" for ":wq", "esc" for "Esc")
 * - Ctrl key combos always match case-insensitively, separators interchangeable
 */
export function isCorrect(submitted: string, question: QuizQuestion): boolean {
  const normalized = normalizeAnswer(submitted);
  const candidates = [question.answer, ...(question.aliases ?? [])];
  // Answers are case-sensitive unless the question opts out. Ctrl combos are
  // normalized to lowercase regardless, so they stay case-insensitive either way.
  const caseSensitive = question.caseSensitive !== false;
  const input = caseSensitive ? normalized : normalized.toLowerCase();
  for (const candidate of candidates) {
    const expected = caseSensitive ? candidate : candidate.toLowerCase();
    if (input === expected) return true;
    if (/^ctrl\+/i.test(candidate) && normalizeKeyCombo(normalized) === normalizeKeyCombo(candidate)) {
      return true;
    }
  }
  return false;
}

/**
 * Whether the question's answer would actually be rejected if typed in the
 * wrong case — drives the "case matters" indicator in the UI. True only when
 * the answer is case-sensitive (default), the primary answer contains a
 * capital, and that lowercase form is NOT itself accepted via an alias (so
 * "ZZ" warns — "zz" fails — while "Esc" with an "esc" alias does not).
 * Ctrl+ combos never count: they are always matched case-insensitively.
 */
export function answerCaseMatters(question: QuizQuestion): boolean {
  if (question.caseSensitive === false) return false;
  if (/^ctrl\+/i.test(question.answer)) return false;
  const accepted = new Set([question.answer, ...(question.aliases ?? [])]);
  return /[A-Z]/.test(question.answer) && !accepted.has(question.answer.toLowerCase());
}
