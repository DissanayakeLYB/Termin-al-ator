import { normalizeAnswer } from "./validate";

/**
 * Reserved commands the user can type at the prompt to control the session.
 * They are handled before answer validation, so answers never collide with
 * them ("Quit Vim" is `:q`, which stays a valid answer).
 */

const EXIT_COMMANDS = new Set([":quit", "quit", "exit", ":exit", "bye", ":bye"]);

const RESTART_COMMANDS = new Set(["restart", "r", ":restart", "again"]);

/** Commands that jump back to the practice picker, ending the current session. */
const MENU_COMMANDS = new Set(["menu", ":menu", "switch", ":switch", "practice", "choose"]);

/** Commands that reveal the next progressive hint instead of submitting. */
const HINT_COMMANDS = new Set(["hint", ":hint", "clue", ":clue"]);

/** Commands that open the review of past answers within a session. */
// Verified collision-free against the current dataset ("back" is not an
// answer anywhere); keep it that way if new questions are added.
const REVIEW_COMMANDS = new Set(["back", ":back"]);

/** Commands that open the terminal settings overlay (font size + theme). */
// Verified collision-free against the dataset (no bare "settings"/
// "config"/"prefs" answers); answers like "git config --global ..."
// are full commands and never match a whole input.
const SETTINGS_COMMANDS = new Set([
  "settings",
  ":settings",
  "config",
  ":config",
  "prefs",
  ":prefs",
]);

/** Commands that step back from the level picker to the tool picker. */
const BACK_COMMANDS = new Set([
  "menu",
  ":menu",
  "back",
  ":back",
  "tools",
  ":tools",
  "categories",
  ":categories",
]);

function normalizeCommand(input: string): string {
  return normalizeAnswer(input).toLowerCase();
}

export function isExitCommand(input: string): boolean {
  return EXIT_COMMANDS.has(normalizeCommand(input));
}

export function isRestartCommand(input: string): boolean {
  return RESTART_COMMANDS.has(normalizeCommand(input));
}

export function isMenuCommand(input: string): boolean {
  return MENU_COMMANDS.has(normalizeCommand(input));
}

export function isHintCommand(input: string): boolean {
  return HINT_COMMANDS.has(normalizeCommand(input));
}

export function isReviewCommand(input: string): boolean {
  return REVIEW_COMMANDS.has(normalizeCommand(input));
}

export function isSettingsCommand(input: string): boolean {
  return SETTINGS_COMMANDS.has(normalizeCommand(input));
}

export function isBackCommand(input: string): boolean {
  return BACK_COMMANDS.has(normalizeCommand(input));
}
