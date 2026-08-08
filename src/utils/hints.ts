import type { QuizQuestion } from "../data/questions";

/**
 * Progressive hints for a question.
 *
 * Every question gets three hints that grow more revealing:
 *   1. conceptual clue  — what kind of thing the answer is
 *   2. stronger clue    — the answer's shape (starts with X, N words, …)
 *   3. almost the answer — most characters revealed, a few masked
 *
 * Questions can author their own hints via `QuizQuestion.hints`; otherwise the
 * hints are derived from the question's category and answer, so the whole
 * dataset is covered without hand-writing thousands of strings.
 */

export function getHints(question: QuizQuestion): string[] {
  if (question.hints && question.hints.length > 0) return question.hints;
  return deriveHints(question);
}

function deriveHints(question: QuizQuestion): string[] {
  const { category, answer } = question;
  const a = answer.trim();

  // ── Regex ─────────────────────────────────────────────────────────────────
  if (category === "regex") {
    if (/^[gims]$/.test(a)) {
      return [
        "It's a regex flag — a single letter appended to a pattern to change how it matches.",
        "One of `g`, `i`, `m`, or `s`.",
        `The flag is \`${a}\`.`,
      ];
    }
    return [
      "It's a regex pattern — no tool required, just the pattern itself.",
      `A pattern ${a.length} characters long.`,
      `${a.length} chars: \`${mask(a)}\``,
    ];
  }

  // ── Kubernetes manifest lines ("key: value") ──────────────────────────────
  if (category === "kubernetes" && /^[A-Za-z]+: /.test(a)) {
    return [
      "It's a line from a Kubernetes manifest — a `key: value` pair.",
      `The key is \`${a.split(":")[0]}\` — it declares the resource's type.`,
      `The full line is \`${a}\`.`,
    ];
  }

  // ── SSH config / sshd_config lines ("Key value") ──────────────────────────
  if (category === "ssh" && /^[A-Z][A-Za-z]+ /.test(a)) {
    const key = a.split(/\s+/)[0];
    return [
      "It's a line from an SSH config file — a `key value` setting.",
      `The key is \`${key}\`.`,
      `The full line is \`${a}\`.`,
    ];
  }

  // ── File paths ("~/.ssh/…") ───────────────────────────────────────────────
  if (/^~(\/|$)/.test(a) || /^\/\S*$/.test(a)) {
    return [
      "It's a file path — a location on disk, not a command to run.",
      a.startsWith("~/")
        ? "It lives under your home directory."
        : "It's an absolute path.",
      `${a.length} chars: \`${mask(a)}\``,
    ];
  }

  // ── Ex commands (start with ':') ──────────────────────────────────────────
  if (a.startsWith(":")) {
    const n = a.length;
    return [
      category === "vim"
        ? "It's a Vim ex command — typed at the `:` prompt."
        : "It's a command typed at a `:` prompt.",
      `Starts with \`:\` — ${n} characters long.`,
      `${n} chars: \`${mask(a)}\``,
    ];
  }

  // ── Key bindings (Ctrl combos) ────────────────────────────────────────────
  if (/^ctrl/i.test(a) || a.includes("+")) {
    const tmux = category === "tmux" && /^ctrl\+b/i.test(a);
    return [
      tmux
        ? "It's a tmux key binding — press the `Ctrl+b` prefix first, then the key(s)."
        : "It's a key binding — it uses the Ctrl key.",
      tmux
        ? "The prefix stays `Ctrl+b` — the part after it is what you're answering."
        : `A Ctrl+… chord, ${a.length} characters of key names.`,
      `Masked: \`${mask(a)}\``,
    ];
  }

  // ── Short normal-mode keys (vim / tmux, no spaces) ────────────────────────
  if ((category === "vim" || category === "tmux") && !/\s/.test(a) && a.length <= 4) {
    return [
      category === "vim"
        ? "It's a Vim normal-mode command — a plain key or two, no `:` prompt needed."
        : "It's a tmux key binding — the prefix plus this key.",
      `A single command of ${a.length} keystroke${a.length === 1 ? "" : "s"}.`,
      `${a.length} chars: \`${mask(a)}\``,
    ];
  }

  // ── Script one-liners ─────────────────────────────────────────────────────
  if (a.startsWith("#!")) {
    return [
      "It's the first line of a script — it picks the interpreter.",
      "It starts with `#!` and names an interpreter.",
      `The line is \`${a}\`.`,
    ];
  }
  if (a === "$1") {
    return [
      "It's a shell variable reference inside a script.",
      "It references the first argument passed to the script.",
      "It's `$1` — positional parameters run `$1`, `$2`, `$3`…",
    ];
  }

  // ── CLI commands (everything else starts with a command word) ─────────────
  const tool = a.split(/\s+/)[0];
  const words = a.split(/\s+/).length;
  return [
    category === "ssh"
      ? "It's an SSH command — part of the ssh/scp/sftp toolset."
      : category === "tmux" && tool === "tmux"
        ? "It's a tmux command — run it from the shell."
        : `It's a \`${tool}\` command.`,
    `A ${words}-word command starting with \`${tool}\`.`,
    mask(a),
  ];
}

/**
 * Masks every other lowercase letter/digit (odd positions) so the answer's
 * shape stays visible without being handed over. Spaces and punctuation stay.
 * If nothing ended up masked (punctuation-only answers), the first character
 * is masked too, so a hint never hands over the complete answer.
 */
function mask(value: string): string {
  if (value.length === 1) return "_";
  const masked = value
    .split("")
    .map((ch, i) => (/[a-z0-9]/.test(ch) && i % 2 === 1 ? "_" : ch))
    .join("");
  return masked === value ? `_${value.slice(1)}` : masked;
}
