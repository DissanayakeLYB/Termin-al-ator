import { normalizeAnswer } from "./validate";

/**
 * Reserved commands the user can type at the prompt to control the session.
 * They are handled before answer validation, so answers never collide with
 * them ("Quit Vim" is `:q`, which stays a valid answer).
 */

const EXIT_COMMANDS = new Set([":quit", "quit", "exit", ":exit", "bye", ":bye"]);

const RESTART_COMMANDS = new Set(["restart", "r", ":restart", "again"]);

function normalizeCommand(input: string): string {
  return normalizeAnswer(input).toLowerCase();
}

export function isExitCommand(input: string): boolean {
  return EXIT_COMMANDS.has(normalizeCommand(input));
}

export function isRestartCommand(input: string): boolean {
  return RESTART_COMMANDS.has(normalizeCommand(input));
}
