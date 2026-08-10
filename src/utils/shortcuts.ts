/**
 * Keyboard shortcuts used across the app, defined once so the handlers and
 * the help bars never drift apart.
 *
 * Bare letters are deliberately avoided everywhere: vim/tmux answers are
 * single letters ("h", "j", "k", "w", "b", …), so typing them must always
 * win over a shortcut. Tab and Escape never appear in an answer.
 */

/** Reveal the next progressive hint (quiz screens). */
export const HINT_KEY = "Tab";

/** Leave the review panel back to the current task (quiz screens). */
export const EXIT_REVIEW_KEY = "Escape";

/** True for a plain Tab press (no ctrl/meta/alt modifiers). */
export function isHintKey(e: {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
}): boolean {
  return e.key === HINT_KEY && !e.ctrlKey && !e.metaKey && !e.altKey;
}
