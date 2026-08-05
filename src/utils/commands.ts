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
