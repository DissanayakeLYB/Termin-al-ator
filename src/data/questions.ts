import {
  vimWorkflowQuestions,
  tmuxWorkflowQuestions,
  gitWorkflowQuestions,
  shellWorkflowQuestions,
  dockerWorkflowQuestions,
  regexWorkflowQuestions,
  sshWorkflowQuestions,
  kubernetesWorkflowQuestions,
} from "./workflowQuestions";

/**
 * Question dataset for the termin(al)ator trainer.
 *
 * To add a new tool category (Shell, Git, Docker, …):
 *   1. Add its name to the `Category` union.
 *   2. Export a `xxxQuestions: QuizQuestion[]` array for it.
 *   3. Add an entry to the `questionSets` registry (label + description).
 *   4. The category picker (CategoryPage) picks it up automatically.
 *
 * Every question also carries a `level` — the *kind* of practice it belongs
 * to (pareto / core / workflow), see `src/data/levels.ts` for the meaning of
 * each level. New scenario-style questions for the workflow level live in
 * `src/data/workflowQuestions.ts` and are merged in via `questionSets`.
 *
 * Sessions are infinite: the deck reshuffles when exhausted, so questions
 * repeat. The user ends the session (`:quit`) or switches practice
 * (`:menu`) whenever they want.
 */

export type Category =
  | "vim"
  | "shell"
  | "git"
  | "tmux"
  | "docker"
  | "regex"
  | "ssh"
  | "kubernetes";

/**
 * Practice levels. Each level is a different *kind* of practice, not a
 * difficulty rating:
 * - "pareto"   — the ~20% of commands used most in real life (muscle memory)
 * - "core"     — the essential foundation every regular user should know
 * - "workflow" — realistic scenarios where you pick the commands to use
 * - "chaos"    — every level mixed, no hints (a session-level, not per-question)
 */
export type Level = "pareto" | "core" | "workflow" | "chaos";

/** The levels a single question can belong to (chaos is a mix of these). */
export type QuestionLevel = Exclude<Level, "chaos">;

export interface QuizQuestion {
  id: string;
  category: Category;
  /** Which practice level this question belongs to (see `levels.ts`). */
  level: QuestionLevel;
  /** The task the user must figure out how to perform. */
  prompt: string;
  /** The exact accepted command. */
  answer: string;
  /** Short explanation shown after answering (especially when wrong). */
  explanation: string;
  /** Optional extra accepted spellings, matched exactly. */
  aliases?: string[];
}


export const vimQuestions: QuizQuestion[] = [
  // ── Starting & modes ──────────────────────────────────────────────────────
  {
    id: "vim-open-file",
    level: "pareto",
    category: "vim",
    prompt: "From the shell, open Vim and load the file `notes.md`.",
    answer: "vim notes.md",
    explanation:
      "`vim notes.md` starts Vim with that file loaded. Vim lives at the command line too.",
  },
  {
    id: "vim-insert-before",
    level: "pareto",
    category: "vim",
    prompt: "Switch to insert mode, inserting text before the cursor.",
    answer: "i",
    explanation:
      "`i` enters insert mode so you can type. Press `Esc` to return to normal mode.",
  },
  {
    id: "vim-insert-start",
    level: "core",
    category: "vim",
    prompt: "Switch to insert mode, inserting text at the very start of the current line.",
    answer: "I",
    explanation: "`I` is `^i` in one key — it inserts at the first non-blank character.",
  },
  {
    id: "vim-insert-after",
    level: "pareto",
    category: "vim",
    prompt: "Switch to insert mode, inserting text after the cursor.",
    answer: "a",
    explanation: "`a` is like `i` but inserts after the cursor — think 'append'.",
  },
  {
    id: "vim-insert-end",
    level: "pareto",
    category: "vim",
    prompt: "Switch to insert mode at the end of the current line.",
    answer: "A",
    explanation: "`A` appends at the end of the line — it's shorthand for `$a`.",
  },
  {
    id: "vim-insert-newline-below",
    level: "pareto",
    category: "vim",
    prompt: "Open a new line below the cursor and switch to insert mode.",
    answer: "o",
    explanation:
      "`o` opens a new line below and enters insert mode. Uppercase `O` does the same above.",
  },
  {
    id: "vim-insert-newline-above",
    level: "core",
    category: "vim",
    prompt: "Open a new line above the cursor and switch to insert mode.",
    answer: "O",
    explanation:
      "`O` opens a new line above the cursor and enters insert mode — the mirror of `o`.",
  },
  {
    id: "vim-normal",
    level: "pareto",
    category: "vim",
    prompt: "Return to normal mode from insert mode.",
    answer: "Esc",
    aliases: ["esc", "ESC", "<Esc>"],
    explanation:
      "`Esc` always drops you back to normal mode. It's the escape hatch from any mode.",
  },

  // ── File operations ───────────────────────────────────────────────────────
  {
    id: "vim-save",
    level: "pareto",
    category: "vim",
    prompt: "Save the current file (write your changes to disk).",
    answer: ":w",
    explanation:
      "`:w` writes the current buffer to disk. Append a filename to save as a copy.",
  },
  {
    id: "vim-quit",
    level: "pareto",
    category: "vim",
    prompt: "Quit Vim.",
    answer: ":q",
    explanation:
      "`:q` quits Vim — but only when there are no unsaved changes. If Vim refuses, you have unsaved work.",
  },
  {
    id: "vim-save-quit",
    level: "pareto",
    category: "vim",
    prompt: "Save the current file and quit Vim in one step.",
    answer: ":wq",
    aliases: [":x"],
    explanation: "`:wq` writes the buffer, then quits. `:x` does exactly the same thing.",
  },
  {
    id: "vim-quit-force",
    level: "pareto",
    category: "vim",
    prompt: "Quit Vim without saving your changes.",
    answer: ":q!",
    explanation:
      "The `!` forces the quit, discarding unsaved changes. Use it only when you really mean it.",
  },
  {
    id: "vim-save-as",
    level: "core",
    category: "vim",
    prompt: "Save the current buffer to a new file named `backup.txt`.",
    answer: ":w backup.txt",
    explanation:
      "Appending a filename to `:w` writes the buffer to that file instead of the current one.",
  },
  {
    id: "vim-save-quit-zz",
    level: "core",
    category: "vim",
    prompt: "Save and quit using a two-key normal-mode shortcut.",
    answer: "ZZ",
    explanation:
      "`ZZ` is the normal-mode equivalent of `:wq` — save and quit in two keystrokes.",
  },
  {
    id: "vim-quit-force-zz",
    level: "core",
    category: "vim",
    prompt: "Quit without saving using a two-key normal-mode shortcut.",
    answer: "ZQ",
    explanation: "`ZQ` is the normal-mode equivalent of `:q!` — quit and discard changes.",
  },
  {
    id: "vim-reload",
    level: "workflow",
    category: "vim",
    prompt: "Discard all unsaved changes and reload the file from disk.",
    answer: ":e!",
    explanation:
      "The `!` on `:e` (edit) says 'forget my changes and reload the file from disk'.",
  },
  {
    id: "vim-open-other",
    level: "core",
    category: "vim",
    prompt: "Open the file `todo.txt` in a new buffer without leaving Vim.",
    answer: ":e todo.txt",
    explanation:
      "`:e <file>` (edit) loads another file into the current window — no need to restart Vim.",
  },

  // ── Moving around ─────────────────────────────────────────────────────────
  {
    id: "vim-left",
    level: "pareto",
    category: "vim",
    prompt: "Move the cursor one character to the left.",
    answer: "h",
    explanation: "`h` moves left — it's the left-hand side of the home-row movement keys.",
  },
  {
    id: "vim-down",
    level: "pareto",
    category: "vim",
    prompt: "Move the cursor down one line.",
    answer: "j",
    explanation: "`j` moves down — the 'j' key has a little hook pointing down.",
  },
  {
    id: "vim-up",
    level: "pareto",
    category: "vim",
    prompt: "Move the cursor up one line.",
    answer: "k",
    explanation: "`k` moves up — the highest point of the home-row keys.",
  },
  {
    id: "vim-right",
    level: "pareto",
    category: "vim",
    prompt: "Move the cursor one character to the right.",
    answer: "l",
    explanation: "`l` moves right — the right-hand side of the home-row movement keys.",
  },
  {
    id: "vim-word-next",
    level: "pareto",
    category: "vim",
    prompt: "Jump to the start of the next word.",
    answer: "w",
    explanation: "`w` jumps forward one word ('word'). Add a count: `3w` jumps three words.",
  },
  {
    id: "vim-word-back",
    level: "pareto",
    category: "vim",
    prompt: "Jump back to the start of the previous word.",
    answer: "b",
    explanation: "`b` moves back one word ('back'). Pairs with `w` for fast word motion.",
  },
  {
    id: "vim-word-end",
    level: "core",
    category: "vim",
    prompt: "Jump to the end of the current word.",
    answer: "e",
    explanation: "`e` jumps to the end of the word ('end'). `ge` goes to the end of the previous word.",
  },
  {
    id: "vim-line-start",
    level: "pareto",
    category: "vim",
    prompt: "Move to the very start of the current line.",
    answer: "0",
    explanation: "`0` moves to column zero — the absolute start of the line.",
  },
  {
    id: "vim-line-first-nonblank",
    level: "core",
    category: "vim",
    prompt: "Move to the first non-blank character of the current line.",
    answer: "^",
    explanation:
      "`^` skips leading whitespace to the first character. `0` goes to the absolute start instead.",
  },
  {
    id: "vim-line-end",
    level: "pareto",
    category: "vim",
    prompt: "Move to the end of the current line.",
    answer: "$",
    explanation: "`$` jumps to the last character of the line — same anchor idea as regex.",
  },
  {
    id: "vim-file-start",
    level: "pareto",
    category: "vim",
    prompt: "Jump to the very first line of the file.",
    answer: "gg",
    explanation: "`gg` moves to line 1. Add a count, like `50gg`, to jump to line 50.",
  },
  {
    id: "vim-file-end",
    level: "pareto",
    category: "vim",
    prompt: "Jump to the very last line of the file.",
    answer: "G",
    explanation:
      "`G` moves to the last line. Don't type `GG` — that's a different (mostly unused) command.",
  },
  {
    id: "vim-go-line",
    level: "core",
    category: "vim",
    prompt: "Jump directly to line 42.",
    answer: ":42",
    aliases: ["42G"],
    explanation:
      "`:` starts an ex command, so `:42` jumps to line 42. In many setups `42G` works too.",
  },
  {
    id: "vim-half-down",
    level: "core",
    category: "vim",
    prompt: "Scroll half a screen down.",
    answer: "Ctrl+d",
    explanation: "`Ctrl+d` scrolls the view down half a page, keeping the cursor in view.",
  },
  {
    id: "vim-half-up",
    level: "core",
    category: "vim",
    prompt: "Scroll half a screen up.",
    answer: "Ctrl+u",
    explanation: "`Ctrl+u` scrolls the view up half a page — the mirror of `Ctrl+d`.",
  },
  {
    id: "vim-page-down",
    level: "core",
    category: "vim",
    prompt: "Scroll one full screen down.",
    answer: "Ctrl+f",
    explanation: "`Ctrl+f` pages down one full screen ('forward').",
  },
  {
    id: "vim-page-up",
    level: "core",
    category: "vim",
    prompt: "Scroll one full screen up.",
    answer: "Ctrl+b",
    explanation: "`Ctrl+b` pages up one full screen ('back').",
  },
  {
    id: "vim-match",
    level: "core",
    category: "vim",
    prompt: "Jump to the bracket matching the one under the cursor.",
    answer: "%",
    explanation:
      "`%` jumps between matching `()`, `[]`, and `{}` pairs — great for checking nesting.",
  },
  {
    id: "vim-down-5",
    level: "core",
    category: "vim",
    prompt: "Move the cursor down exactly 5 lines.",
    answer: "5j",
    explanation:
      "Almost every movement accepts a count: `5j` moves down five lines, `10w` ten words.",
  },
  {
    id: "vim-screen-top",
    level: "core",
    category: "vim",
    prompt: "Jump to the top of the screen.",
    answer: "H",
    explanation: "`H` jumps to the top ('high') of the visible screen.",
  },
  {
    id: "vim-screen-mid",
    level: "core",
    category: "vim",
    prompt: "Jump to the middle of the screen.",
    answer: "M",
    explanation: "`M` jumps to the middle ('middle') of the visible screen.",
  },
  {
    id: "vim-screen-bottom",
    level: "core",
    category: "vim",
    prompt: "Jump to the bottom of the screen.",
    answer: "L",
    explanation: "`L` jumps to the bottom ('low') of the visible screen.",
  },
  {
    id: "vim-para-next",
    level: "core",
    category: "vim",
    prompt: "Jump forward to the start of the next paragraph.",
    answer: "}",
    explanation:
      "`}` moves to the next blank-line boundary — handy for hopping between code blocks.",
  },

  // ── Editing ───────────────────────────────────────────────────────────────
  {
    id: "vim-delete-line",
    level: "pareto",
    category: "vim",
    prompt: "Delete the entire line the cursor is on.",
    answer: "dd",
    explanation:
      "`dd` deletes the whole line and places it in a register — like cut, so you can paste it elsewhere.",
  },
  {
    id: "vim-delete-char",
    level: "pareto",
    category: "vim",
    prompt: "Delete the single character under the cursor.",
    answer: "x",
    explanation: "`x` deletes the character under the cursor — the Vim Delete key.",
  },
  {
    id: "vim-delete-char-before",
    level: "core",
    category: "vim",
    prompt: "Delete the single character before the cursor.",
    answer: "X",
    explanation: "`X` deletes the character before the cursor — the Vim Backspace.",
  },
  {
    id: "vim-delete-word",
    level: "pareto",
    category: "vim",
    prompt: "Delete the word under the cursor.",
    answer: "dw",
    explanation:
      "`d` starts a delete and `w` is the motion: delete from the cursor to the start of the next word.",
  },
  {
    id: "vim-delete-to-eol",
    level: "core",
    category: "vim",
    prompt: "Delete everything from the cursor to the end of the line.",
    answer: "d$",
    explanation:
      "`d` (delete) + `$` (end of line) removes the rest of the line. `D` is a shortcut for it.",
  },
  {
    id: "vim-undo",
    level: "pareto",
    category: "vim",
    prompt: "Undo the last change.",
    answer: "u",
    explanation:
      "`u` undoes the most recent change. Press it repeatedly to keep stepping back.",
  },
  {
    id: "vim-redo",
    level: "pareto",
    category: "vim",
    prompt: "Redo the last change you just undid.",
    answer: "Ctrl+r",
    explanation: "`Ctrl+r` re-applies the change you undid — the mirror image of `u`.",
  },
  {
    id: "vim-repeat",
    level: "pareto",
    category: "vim",
    prompt: "Repeat the last change you made.",
    answer: ".",
    explanation:
      "`.` repeats the last change — the single most time-saving key in Vim for repetitive edits.",
  },
  {
    id: "vim-yank-line",
    level: "pareto",
    category: "vim",
    prompt: "Copy (yank) the entire line the cursor is on.",
    answer: "yy",
    explanation: "`yy` yanks the whole line into a register — Vim's word for copy.",
  },
  {
    id: "vim-yank-word",
    level: "core",
    category: "vim",
    prompt: "Copy (yank) the word under the cursor.",
    answer: "yw",
    explanation: "`yw` yanks from the cursor to the end of the word ('yank word').",
  },
  {
    id: "vim-paste-below",
    level: "pareto",
    category: "vim",
    prompt: "Paste the last yanked or deleted text below the cursor.",
    answer: "p",
    explanation: "`p` pastes after (below) the cursor. Uppercase `P` pastes before it.",
  },
  {
    id: "vim-paste-above",
    level: "core",
    category: "vim",
    prompt: "Paste the last yanked or deleted text above the cursor.",
    answer: "P",
    explanation:
      "`P` pastes before (above) the cursor. Lowercase `p` pastes after it — case matters in Vim!",
  },
  {
    id: "vim-join",
    level: "core",
    category: "vim",
    prompt: "Join the current line with the line below it.",
    answer: "J",
    explanation:
      "`J` joins the next line onto the current one. `gJ` joins without inserting a space.",
  },
  {
    id: "vim-change-line",
    level: "pareto",
    category: "vim",
    prompt: "Replace the entire line — delete it and enter insert mode.",
    answer: "cc",
    explanation:
      "`cc` is 'change line': it deletes the line and puts you in insert mode. `S` does the same.",
  },
  {
    id: "vim-change-word",
    level: "pareto",
    category: "vim",
    prompt: "Replace the word under the cursor — delete it and enter insert mode.",
    answer: "cw",
    explanation:
      "`cw` is 'change word': delete to the end of the word and switch to insert mode.",
  },
  {
    id: "vim-substitute-char",
    level: "core",
    category: "vim",
    prompt: "Delete the character under the cursor and enter insert mode.",
    answer: "s",
    explanation: "`s` (substitute) replaces the character under the cursor with new text.",
  },
  {
    id: "vim-substitute-line",
    level: "core",
    category: "vim",
    prompt: "Delete the entire line and enter insert mode.",
    answer: "S",
    explanation: "`S` substitutes the whole line — same effect as `cc`.",
  },
  {
    id: "vim-toggle-case",
    level: "core",
    category: "vim",
    prompt: "Toggle the case of the character under the cursor.",
    answer: "~",
    explanation:
      "`~` flips the case: 'a' becomes 'A' and vice versa. Move across the word with counts.",
  },
  {
    id: "vim-indent",
    level: "core",
    category: "vim",
    prompt: "Indent the current line one level to the right.",
    answer: ">>",
    explanation:
      "`>>` indents the current line. Select lines in visual mode and press `>` to indent them all.",
  },
  {
    id: "vim-unindent",
    level: "core",
    category: "vim",
    prompt: "Unindent the current line one level to the left.",
    answer: "<<",
    explanation: "`<<` removes one level of indentation from the current line.",
  },
  {
    id: "vim-sort",
    level: "core",
    category: "vim",
    prompt: "Sort the lines of the file alphabetically.",
    answer: ":sort",
    explanation: "`:sort` sorts the current range (the whole file here) alphabetically.",
  },

  // ── Searching & replacing ─────────────────────────────────────────────────
  {
    id: "vim-search",
    level: "pareto",
    category: "vim",
    prompt: "Search forward for the word `error`.",
    answer: "/error",
    explanation:
      "`/` starts a forward search. Type the pattern, press Enter, then use `n` for the next match.",
  },
  {
    id: "vim-search-back",
    level: "core",
    category: "vim",
    prompt: "Search backward for the word `error`.",
    answer: "?error",
    explanation:
      "`?` searches backward through the file. Press `N` to keep going to earlier matches.",
  },
  {
    id: "vim-search-next",
    level: "pareto",
    category: "vim",
    prompt: "Jump to the next search match.",
    answer: "n",
    explanation:
      "`n` repeats the last search in the same direction. `N` repeats it in the opposite direction.",
  },
  {
    id: "vim-search-prev",
    level: "core",
    category: "vim",
    prompt: "Jump to the previous search match.",
    answer: "N",
    explanation: "`N` repeats the last search backwards — the mirror of `n`.",
  },
  {
    id: "vim-search-under",
    level: "core",
    category: "vim",
    prompt: "Search forward for the word currently under the cursor.",
    answer: "*",
    explanation:
      "`*` searches for the exact word under the cursor — a fast 'jump to next occurrence'.",
  },
  {
    id: "vim-search-under-back",
    level: "core",
    category: "vim",
    prompt: "Search backward for the word currently under the cursor.",
    answer: "#",
    explanation: "`#` is `*` in reverse — it searches backward for the word under the cursor.",
  },
  {
    id: "vim-replace-all",
    level: "pareto",
    category: "vim",
    prompt: "Replace every occurrence of `foo` with `bar` across the whole file.",
    answer: ":%s/foo/bar/g",
    explanation:
      "`%s/old/new/g` substitutes across the file: `%` = all lines, `g` = every match on each line.",
  },
  {
    id: "vim-replace-confirm",
    level: "workflow",
    category: "vim",
    prompt: "Replace every `foo` with `bar`, asking for confirmation before each change.",
    answer: ":%s/foo/bar/gc",
    explanation:
      "Adding `c` makes the substitution ask for confirmation at every match — safer for big changes.",
  },
  {
    id: "vim-clear-highlight",
    level: "core",
    category: "vim",
    prompt: "Remove the highlighting left over from a search.",
    answer: ":nohlsearch",
    aliases: [":noh"],
    explanation:
      "`:nohlsearch` (or `:noh`) clears the search highlight without changing the search itself.",
  },

  // ── Visual mode ───────────────────────────────────────────────────────────
  {
    id: "vim-visual-char",
    level: "pareto",
    category: "vim",
    prompt: "Start character-wise visual selection.",
    answer: "v",
    explanation:
      "`v` enters visual mode; move to expand the selection, then `y` to yank or `d` to delete.",
  },
  {
    id: "vim-visual-line",
    level: "core",
    category: "vim",
    prompt: "Start line-wise visual selection.",
    answer: "V",
    explanation:
      "`V` selects whole lines at a time — great for bulk indent, yank, or delete.",
  },
  {
    id: "vim-visual-block",
    level: "core",
    category: "vim",
    prompt: "Start block-wise (rectangular) visual selection.",
    answer: "Ctrl+v",
    explanation:
      "`Ctrl+v` selects a rectangular block — the classic way to edit a column of text.",
  },
  {
    id: "vim-visual-yank",
    level: "core",
    category: "vim",
    prompt: "With text selected in visual mode, copy the selection.",
    answer: "y",
    explanation:
      "`y` yanks the visual selection. After that Vim returns to normal mode automatically.",
  },
  {
    id: "vim-visual-delete",
    level: "core",
    category: "vim",
    prompt: "With text selected in visual mode, delete the selection.",
    answer: "d",
    explanation: "`d` deletes the visual selection and returns to normal mode.",
  },

  // ── Windows & tabs ────────────────────────────────────────────────────────
  {
    id: "vim-split-h",
    level: "core",
    category: "vim",
    prompt: "Split the window horizontally.",
    answer: ":sp",
    aliases: [":split"],
    explanation:
      "`:sp` splits the window horizontally (one above the other), sharing the buffer.",
  },
  {
    id: "vim-split-v",
    level: "core",
    category: "vim",
    prompt: "Split the window vertically.",
    answer: ":vsp",
    aliases: [":vsplit"],
    explanation: "`:vsp` splits the window vertically (side by side).",
  },
  {
    id: "vim-window-switch",
    level: "core",
    category: "vim",
    prompt: "Switch to the next window in a split.",
    answer: "Ctrl+w w",
    explanation:
      "`Ctrl+w` starts a window command; the second `w` cycles to the next window. `Ctrl+w h/j/k/l` moves by direction.",
  },
  {
    id: "vim-window-close",
    level: "core",
    category: "vim",
    prompt: "Close the current window in a split.",
    answer: ":q",
    explanation:
      "`:q` closes just the current window. Use `:qall` to quit every window at once.",
  },
  {
    id: "vim-tab-new",
    level: "core",
    category: "vim",
    prompt: "Open a new tab.",
    answer: ":tabnew",
    explanation: "`:tabnew` opens a fresh empty tab. You can pass a filename to load a file.",
  },
  {
    id: "vim-tab-next",
    level: "core",
    category: "vim",
    prompt: "Switch to the next tab.",
    answer: "gt",
    explanation: "`gt` cycles to the next tab ('goto tab'). `gT` goes to the previous one.",
  },
  {
    id: "vim-tab-prev",
    level: "core",
    category: "vim",
    prompt: "Switch to the previous tab.",
    answer: "gT",
    explanation: "`gT` cycles to the previous tab — the reverse of `gt`.",
  },

  // ── Settings & utilities ──────────────────────────────────────────────────
  {
    id: "vim-numbers",
    level: "core",
    category: "vim",
    prompt: "Show line numbers in Vim.",
    answer: ":set number",
    aliases: [":set nu"],
    explanation:
      "`:set number` (or `:set nu`) displays line numbers. `:set relativenumber` shows distances instead.",
  },
  {
    id: "vim-syntax",
    level: "core",
    category: "vim",
    prompt: "Turn on syntax highlighting.",
    answer: ":syntax on",
    explanation:
      "`:syntax on` colors code by language. Add `syntax enable` in your vimrc to keep it on.",
  },
  {
    id: "vim-help",
    level: "core",
    category: "vim",
    prompt: "Open Vim's built-in help.",
    answer: ":help",
    explanation:
      "`:help` opens the help window. `:help <command>` jumps straight to docs for that command.",
  },
  {
    id: "vim-registers",
    level: "core",
    category: "vim",
    prompt: "List the contents of all registers.",
    answer: ":reg",
    aliases: [":registers"],
    explanation:
      "`:registers` (or `:reg`) shows every register's contents — handy when you 'lost' a yank.",
  },
  {
    id: "vim-buffers",
    level: "core",
    category: "vim",
    prompt: "List all open buffers.",
    answer: ":ls",
    aliases: [":buffers"],
    explanation:
      "`:ls` (or `:buffers`) lists open buffers. `:b <number>` jumps to one of them.",
  },
  {
    id: "vim-shell",
    level: "core",
    category: "vim",
    prompt: "Run the shell command `ls` without leaving Vim.",
    answer: ":!ls",
    explanation:
      "`:!` runs a shell command and shows its output — `:!ls` lists the directory, then press Enter to return.",
  },

  // ── Text objects & operator motions ───────────────────────────────────────
  {
    id: "vim-ciw",
    level: "core",
    category: "vim",
    prompt: "Replace the whole word under the cursor with new text — no deleting first.",
    answer: "ciw",
    explanation:
      "`ciw` = change inner word: delete the word under the cursor and enter insert mode. `caw` also swallows the surrounding whitespace.",
  },
  {
    id: "vim-caw",
    level: "core",
    category: "vim",
    prompt: "Replace the word under the cursor plus the whitespace around it.",
    answer: "caw",
    explanation:
      "`caw` = change around word — it grabs the trailing space too, so you never leave double gaps when editing.",
  },
  {
    id: "vim-ci-quote",
    level: "core",
    category: "vim",
    prompt: "Replace the text inside the nearest double quotes, leaving the quotes themselves.",
    answer: "ci\"",
    explanation:
      "`ci\"` = change inner quotes — perfect for retyping a string without ever touching the quotes.",
  },
  {
    id: "vim-di-quote",
    level: "core",
    category: "vim",
    prompt: "Delete the text inside the nearest double quotes, leaving the quotes.",
    answer: "di\"",
    explanation: "`di\"` deletes only what's between the quotes — the quotes stay put.",
  },
  {
    id: "vim-ci-paren",
    level: "core",
    category: "vim",
    prompt: "Replace everything inside the nearest parentheses, keeping the parens.",
    answer: "ci(",
    explanation:
      "`ci(` changes the content of the parens without the parens. `ci{` and `ci[` target those brackets the same way.",
  },
  {
    id: "vim-di-paren",
    level: "core",
    category: "vim",
    prompt: "Delete everything inside the nearest parentheses, keeping the parens.",
    answer: "di(",
    explanation: "`di(` deletes the content; `da(` takes the parens along too — one key changes the whole meaning.",
  },
  {
    id: "vim-da-paren",
    level: "core",
    category: "vim",
    prompt: "Delete the nearest parentheses and everything inside them.",
    answer: "da(",
    explanation: "`da(` = delete around parens — the entire `( ... )` group goes, including the brackets.",
  },
  {
    id: "vim-yiw",
    level: "core",
    category: "vim",
    prompt: "Yank just the word under the cursor, nothing else.",
    answer: "yiw",
    explanation: "`yiw` copies only the word — the standard way to grab an identifier.",
  },
  {
    id: "vim-yi-quote",
    level: "core",
    category: "vim",
    prompt: "Yank the text inside the nearest double quotes.",
    answer: "yi\"",
    explanation: "`yi\"` copies what's between the quotes, quotes excluded.",
  },
  {
    id: "vim-vip",
    level: "core",
    category: "vim",
    prompt: "Select the entire paragraph the cursor is in.",
    answer: "vip",
    explanation:
      "`vip` = visual inner paragraph. Follow it with `d`, `y`, or `gq` to act on the whole block.",
  },
  {
    id: "vim-vib",
    level: "core",
    category: "vim",
    prompt: "Select everything inside the nearest parentheses.",
    answer: "vib",
    explanation:
      "`vib` selects between `( )` — swap the `b` for `{` or `[` to target other brackets. `vab` includes the brackets.",
  },
  {
    id: "vim-vit",
    level: "core",
    category: "vim",
    prompt: "Select the text inside the HTML tag under the cursor.",
    answer: "vit",
    explanation:
      "`vit` = visual inner tag — selects `<div>CONTENT</div>`'s content only. `vat` includes the tags.",
  },

  // ── Finding characters (f / t motions) ────────────────────────────────────
  {
    id: "vim-find-char",
    level: "core",
    category: "vim",
    prompt: "Jump forward to the next `,` on the current line.",
    answer: "f,",
    explanation: "`f,` = find comma. `F,` finds it backwards, and `;` repeats the last find.",
  },
  {
    id: "vim-till-char",
    level: "core",
    category: "vim",
    prompt: "Move to the character just before the next `)` on the current line.",
    answer: "t)",
    explanation:
      "`t` = till: it stops before the target, `f` lands on it. Pair with `d`/`c`: `dt)` deletes up to the paren.",
  },
  {
    id: "vim-find-repeat",
    level: "core",
    category: "vim",
    prompt: "Repeat the last character find (`f`/`t`) in the same direction.",
    answer: ";",
    explanation: "`;` repeats the last f/t motion forward; `,` repeats it in reverse.",
  },
  {
    id: "vim-find-repeat-back",
    level: "core",
    category: "vim",
    prompt: "Repeat the last character find (`f`/`t`) in the opposite direction.",
    answer: ",",
    explanation: "`,` repeats the last f/t motion backwards — the mirror of `;`.",
  },

  // ── Registers & macros ────────────────────────────────────────────────────
  {
    id: "vim-macro-record",
    level: "workflow",
    category: "vim",
    prompt: "Start recording a macro into register `a`.",
    answer: "qa",
    explanation:
      "`qa` begins recording. Do your edit, press `q` again to stop, then `@a` to replay it anywhere.",
  },
  {
    id: "vim-macro-stop",
    level: "workflow",
    category: "vim",
    prompt: "Stop recording the macro you're currently recording.",
    answer: "q",
    explanation: "A second `q` ends the recording and stores it in the register you named.",
  },
  {
    id: "vim-macro-play",
    level: "workflow",
    category: "vim",
    prompt: "Play back the macro stored in register `a`.",
    answer: "@a",
    explanation:
      "`@a` runs the macro once. `10@a` runs it ten times — that's how you edit a thousand lines in seconds.",
  },
  {
    id: "vim-macro-replay",
    level: "workflow",
    category: "vim",
    prompt: "Replay the most recently executed macro.",
    answer: "@@",
    explanation: "`@@` reruns the last macro without retyping its name.",
  },

  // ── Marks & jump lists ────────────────────────────────────────────────────
  {
    id: "vim-mark-set",
    level: "core",
    category: "vim",
    prompt: "Set a mark named `a` at the current position.",
    answer: "ma",
    explanation:
      "`ma` plants a hidden bookmark. Any lowercase letter works, and marks survive until you leave the file.",
  },
  {
    id: "vim-mark-jump-line",
    level: "core",
    category: "vim",
    prompt: "Jump to the line where mark `a` sits.",
    answer: "'a",
    explanation: "`'a` jumps to the start of the marked line — instant bookmarks across a long file.",
  },
  {
    id: "vim-mark-jump-exact",
    level: "core",
    category: "vim",
    prompt: "Jump to the exact line and column of mark `a`.",
    answer: "`a",
    explanation:
      "The backtick version — `` `a `` — restores the marked column too, while `'a` only restores the line.",
  },
  {
    id: "vim-insert-pos",
    level: "core",
    category: "vim",
    prompt: "Return to the spot where you last inserted or edited text.",
    answer: "gi",
    explanation:
      "`gi` jumps to your last edit position and enters insert mode — a favorite for resuming work.",
  },
  {
    id: "vim-jump-back",
    level: "core",
    category: "vim",
    prompt: "Jump back to your previous cursor position.",
    answer: "Ctrl+o",
    explanation:
      "`Ctrl+o` walks the jump list backwards — a browser-style back button for cursor positions.",
  },
  {
    id: "vim-jump-fwd",
    level: "core",
    category: "vim",
    prompt: "Jump forward through the jump list again.",
    answer: "Ctrl+i",
    explanation: "`Ctrl+i` walks forward through the jump list — the mirror of `Ctrl+o`.",
  },

  // ── Numbers ───────────────────────────────────────────────────────────────
  {
    id: "vim-num-inc",
    level: "core",
    category: "vim",
    prompt: "Increase the number under the cursor by one.",
    answer: "Ctrl+a",
    explanation: "`Ctrl+a` increments the number under the cursor: `42` becomes `43`. `5 Ctrl+a` adds five.",
  },
  {
    id: "vim-num-dec",
    level: "core",
    category: "vim",
    prompt: "Decrease the number under the cursor by one.",
    answer: "Ctrl+x",
    explanation: "`Ctrl+x` decrements the number under the cursor — handy for version bumps.",
  },

  // ── Filters & command-line tricks ─────────────────────────────────────────
  {
    id: "vim-filter-sort",
    level: "workflow",
    category: "vim",
    prompt: "Sort the entire file by piping it through the `sort` shell command.",
    answer: ":%!sort",
    explanation:
      "`:%!sort` sends the whole file through the `sort` command and replaces it with the output.",
  },
  {
    id: "vim-format-json",
    level: "workflow",
    category: "vim",
    prompt: "Pretty-print the JSON in the current buffer.",
    answer: ":%!python -m json.tool",
    explanation:
      "`:%!python -m json.tool` pipes the file through Python's JSON formatter — instant, zero-plugin formatting.",
  },
  {
    id: "vim-r-shell",
    level: "core",
    category: "vim",
    prompt: "Insert the output of the shell command `date` below the cursor.",
    answer: ":r !date",
    explanation: "`:r !cmd` runs a shell command and reads its output into the buffer.",
  },
  {
    id: "vim-r-file",
    level: "core",
    category: "vim",
    prompt: "Insert the contents of `notes.txt` below the cursor.",
    answer: ":r notes.txt",
    explanation: "`:r notes.txt` (read) dumps that file in below the cursor line.",
  },
  {
    id: "vim-delete-blank",
    level: "workflow",
    category: "vim",
    prompt: "Delete every blank line in the file.",
    answer: ":g/^$/d",
    explanation: "`:g` runs a command on every matching line — here, delete all the empty ones.",
  },
  {
    id: "vim-delete-matching",
    level: "workflow",
    category: "vim",
    prompt: "Delete every line containing the word `debug`.",
    answer: ":g/debug/d",
    explanation: "`:g/debug/d` deletes all matching lines — the global command is a whole mini-language.",
  },
  {
    id: "vim-keep-matching",
    level: "workflow",
    category: "vim",
    prompt: "Delete every line that does NOT contain `debug`.",
    answer: ":v/debug/d",
    explanation:
      "`:v` is the inverse of `:g` — it acts on lines that don't match. Great for filtering logs.",
  },
  {
    id: "vim-reverse-lines",
    level: "core",
    category: "vim",
    prompt: "Reverse the order of all lines in the file.",
    answer: ":g/^/m0",
    explanation:
      "`:g/^/m0` moves every line to the top, flipping the file upside down — a party-trick one-liner.",
  },
  {
    id: "vim-strip-trailing",
    level: "workflow",
    category: "vim",
    prompt: "Remove trailing whitespace from every line.",
    answer: ":%s/\\s\\+$//",
    explanation:
      "`:%s/\\s\\+$//` matches spaces at line ends and deletes them — a common pre-commit cleanup.",
  },
  {
    id: "vim-add-comma",
    level: "workflow",
    category: "vim",
    prompt: "Append a comma to the end of every line.",
    answer: ":%s/$/,/",
    explanation:
      "Substituting against `$` (end of line) appends — every line now ends with a comma.",
  },
  {
    id: "vim-put-range",
    level: "core",
    category: "vim",
    prompt: "Insert the numbers 1 through 10 as ten separate lines.",
    answer: ":put =range(1,10)",
    explanation:
      "`:put =expr` evaluates an expression and inserts the result — `range(1,10)` generates 1..10.",
  },
  {
    id: "vim-sudo-save",
    level: "workflow",
    category: "vim",
    prompt: "Save the current file with sudo privileges even when it's read-only.",
    answer: ":w !sudo tee %",
    explanation:
      "`:w !sudo tee %` is the classic trick for writing a read-only file — the buffer is piped through sudo.",
  },
  {
    id: "vim-sort-numeric",
    level: "core",
    category: "vim",
    prompt: "Sort the file numerically instead of alphabetically.",
    answer: ":sort n",
    explanation: "`:sort n` sorts by number, so `10` correctly follows `2`. Add `!` for reverse order.",
  },
  {
    id: "vim-sort-unique",
    level: "core",
    category: "vim",
    prompt: "Sort the file and remove duplicate lines.",
    answer: ":sort u",
    explanation: "`:sort u` sorts and keeps only unique lines — dedup in a single command.",
  },
  {
    id: "vim-repeat-subst",
    level: "workflow",
    category: "vim",
    prompt: "Repeat the last substitution on the current line.",
    answer: "&",
    explanation: "`&` re-applies the last `:s/foo/bar` to the current line. `g&` redoes it across the whole file.",
  },
  {
    id: "vim-repeat-subst-all",
    level: "workflow",
    category: "vim",
    prompt: "Repeat the last substitution across the whole file.",
    answer: "g&",
    explanation: "`g&` replays the last substitution everywhere; plain `&` only does the current line.",
  },

  // ── Buffers & multiple files ──────────────────────────────────────────────
  {
    id: "vim-alternate-file",
    level: "core",
    category: "vim",
    prompt: "Switch to the file you were editing before.",
    answer: "Ctrl+^",
    explanation:
      "`Ctrl+^` toggles between the current buffer and the alternate file — usually the one you just left.",
  },
  {
    id: "vim-e-alternate",
    level: "core",
    category: "vim",
    prompt: "Open the previous file without leaving Vim.",
    answer: ":e #",
    explanation: "`:e #` edits the alternate buffer — `#` stands for the last file you had open.",
  },
  {
    id: "vim-buffer-next",
    level: "core",
    category: "vim",
    prompt: "Move to the next open buffer.",
    answer: ":bn",
    explanation:
      "`:bn` (buffer next) cycles forward through open buffers. `:bp` goes back, `:b 3` jumps to number 3.",
  },
  {
    id: "vim-buffer-delete",
    level: "core",
    category: "vim",
    prompt: "Remove the current buffer from the buffer list.",
    answer: ":bd",
    explanation: "`:bd` unloads the current buffer — unlike `:q`, it doesn't close the window.",
  },
  {
    id: "vim-quit-all",
    level: "core",
    category: "vim",
    prompt: "Quit all windows at once.",
    answer: ":qall",
    explanation: "`:qall` (or `:qa`) closes every window and quits. Add `!` to force it.",
  },
  {
    id: "vim-quit-all-force",
    level: "core",
    category: "vim",
    prompt: "Quit all windows without saving any changes.",
    answer: ":qall!",
    explanation: "`:qall!` force-quits every window, discarding all unsaved changes.",
  },
  {
    id: "vim-write-all",
    level: "core",
    category: "vim",
    prompt: "Save all modified buffers.",
    answer: ":wall",
    explanation: "`:wall` writes every dirty buffer — handy after editing files across several windows.",
  },

  // ── Smart editing tricks ──────────────────────────────────────────────────
  {
    id: "vim-swap-chars",
    level: "workflow",
    category: "vim",
    prompt: "Swap the character under the cursor with the one after it.",
    answer: "xp",
    explanation: "`xp` = delete (`x`) then paste (`p`) — the classic transpose-characters trick.",
  },
  {
    id: "vim-swap-lines",
    level: "workflow",
    category: "vim",
    prompt: "Swap the current line with the line below it.",
    answer: "ddp",
    explanation:
      "`ddp` cuts the line and pastes it below — instant line swap. `ddkP` swaps the other way.",
  },
  {
    id: "vim-delete-eol-short",
    level: "core",
    category: "vim",
    prompt: "Delete from the cursor to the end of the line using the one-key shortcut.",
    answer: "D",
    explanation: "`D` is shorthand for `d$` — delete to end of line in a single keypress.",
  },
  {
    id: "vim-delete-until-char",
    level: "workflow",
    category: "vim",
    prompt: "Delete from the cursor up to, but not including, the next `;`.",
    answer: "dt;",
    explanation:
      "`dt;` = delete till `;` — it stops just before the semicolon, keeping the statement intact.",
  },
  {
    id: "vim-delete-thru-char",
    level: "workflow",
    category: "vim",
    prompt: "Delete from the cursor through the next `)` including it.",
    answer: "df)",
    explanation: "`df)` deletes everything up to and including the `)` — the `f` lands right on it.",
  },
  {
    id: "vim-replace-char",
    level: "workflow",
    category: "vim",
    prompt: "Replace the character under the cursor with `x` without entering insert mode.",
    answer: "rx",
    explanation: "`r` replaces a single character — `rx` swaps it for `x` and stays in normal mode.",
  },
  {
    id: "vim-reselect",
    level: "workflow",
    category: "vim",
    prompt: "Re-select the last visual selection.",
    answer: "gv",
    explanation:
      "`gv` brings back the previous visual selection — handy to re-apply an indent or re-yank.",
  },
  {
    id: "vim-go-def",
    level: "workflow",
    category: "vim",
    prompt: "Jump to the definition of the identifier under the cursor.",
    answer: "gd",
    explanation: "`gd` jumps to the local definition in this file; `gD` looks through the whole project.",
  },
  {
    id: "vim-open-under",
    level: "workflow",
    category: "vim",
    prompt: "Open the file whose name is under the cursor.",
    answer: "gf",
    explanation: "`gf` (goto file) opens the file named under the cursor — great for following imports.",
  },
  {
    id: "vim-man-under",
    level: "workflow",
    category: "vim",
    prompt: "Show the man page for the word under the cursor.",
    answer: "K",
    explanation: "`K` looks up the word under the cursor in the man pages — instant documentation.",
  },

  // ── Formatting & case ─────────────────────────────────────────────────────
  {
    id: "vim-upper-line",
    level: "core",
    category: "vim",
    prompt: "Uppercase the entire current line.",
    answer: "gUU",
    explanation: "`gUU` uppercases the whole line; `guu` lowercases it back.",
  },
  {
    id: "vim-lower-line",
    level: "core",
    category: "vim",
    prompt: "Lowercase the entire current line.",
    answer: "guu",
    explanation: "`guu` lowercases the line — the mirror of `gUU`.",
  },
  {
    id: "vim-upper-word",
    level: "core",
    category: "vim",
    prompt: "Uppercase the word under the cursor.",
    answer: "gUw",
    explanation: "`gUw` uppercases from the cursor to the end of the word; `guw` lowercases.",
  },
  {
    id: "vim-format-line",
    level: "core",
    category: "vim",
    prompt: "Re-wrap the current line to fit the text width.",
    answer: "gqq",
    explanation: "`gqq` reformats the current line — re-wrapping it to the text width.",
  },
  {
    id: "vim-format-para",
    level: "core",
    category: "vim",
    prompt: "Re-wrap the whole paragraph under the cursor.",
    answer: "gqap",
    explanation: "`gqap` = format around paragraph — it re-wraps every line of the paragraph.",
  },
  {
    id: "vim-indent-file",
    level: "core",
    category: "vim",
    prompt: "Re-indent the entire file to match your indentation settings.",
    answer: "gg=G",
    explanation: "`gg=G` = go to top, auto-indent, go to bottom — reformats the whole file.",
  },
  {
    id: "vim-indent-line-eq",
    level: "core",
    category: "vim",
    prompt: "Auto-indent just the current line.",
    answer: "==",
    explanation: "`==` auto-indents the current line based on the code around it.",
  },

  // ── Settings & info ───────────────────────────────────────────────────────
  {
    id: "vim-highlight-on",
    level: "core",
    category: "vim",
    prompt: "Highlight every match of your last search.",
    answer: ":set hls",
    explanation: "`:set hls` (hlsearch) highlights all matches — clear it later with `:nohlsearch`.",
  },
  {
    id: "vim-spell",
    level: "core",
    category: "vim",
    prompt: "Turn on spell checking.",
    answer: ":set spell",
    explanation: "`:set spell` underlines misspelled words; `]s` jumps to the next error, `zg` adds a word.",
  },
  {
    id: "vim-file-status",
    level: "core",
    category: "vim",
    prompt: "Show the file name, line count, and cursor position as a percentage.",
    answer: "Ctrl+g",
    explanation: "`Ctrl+g` prints a status line with the file, line, and position — `:f` does the same.",
  },
  {
    id: "vim-char-code",
    level: "core",
    category: "vim",
    prompt: "Show the numeric (ASCII/Unicode) value of the character under the cursor.",
    answer: "ga",
    explanation:
      "`ga` shows the value of the character under the cursor — great for identifying that weird char.",
  },
  {
    id: "vim-command-history",
    level: "core",
    category: "vim",
    prompt: "Open a window listing your command history for reuse.",
    answer: "q:",
    explanation: "`q:` opens the command-line history window — pick a line and hit Enter to re-run it.",
  },
  {
    id: "vim-search-history",
    level: "core",
    category: "vim",
    prompt: "Open a window listing your search history.",
    answer: "q/",
    explanation: "`q/` opens the search history window — reuse or tweak a past pattern.",
  },
  {
    id: "vim-source-vimrc",
    level: "workflow",
    category: "vim",
    prompt: "Reload your vimrc settings without restarting Vim.",
    answer: ":so $MYVIMRC",
    explanation:
      "`:so $MYVIMRC` (source) applies your vimrc changes immediately — no restart needed.",
  },
];

export const tmuxQuestions: QuizQuestion[] = [
  // ── Sessions ──────────────────────────────────────────────────────────────
  {
    id: "tmux-new-session",
    level: "pareto",
    category: "tmux",
    prompt: "Start a new tmux session named `work`.",
    answer: "tmux new -s work",
    aliases: ["tmux new-session -s work"],
    explanation:
      "`-s` names the session, so you can find and attach to it later with `tmux attach -t work`.",
  },
  {
    id: "tmux-new-detached",
    level: "workflow",
    category: "tmux",
    prompt: "Start a new session named `work` without attaching to it.",
    answer: "tmux new -d -s work",
    aliases: ["tmux new-session -d -s work"],
    explanation:
      "`-d` detaches immediately — perfect for starting background work and attaching later.",
  },
  {
    id: "tmux-list",
    level: "pareto",
    category: "tmux",
    prompt: "List all running tmux sessions.",
    answer: "tmux ls",
    aliases: ["tmux list-sessions"],
    explanation: "`tmux ls` is the short form of `tmux list-sessions`.",
  },
  {
    id: "tmux-attach-last",
    level: "pareto",
    category: "tmux",
    prompt: "Attach to the most recently used session.",
    answer: "tmux attach",
    aliases: ["tmux a", "tmux attach-session"],
    explanation:
      "`tmux attach` (or `tmux a`) rejoins the most recently used session.",
  },
  {
    id: "tmux-attach-named",
    level: "pareto",
    category: "tmux",
    prompt: "Attach to the session named `work`.",
    answer: "tmux attach -t work",
    aliases: ["tmux a -t work"],
    explanation: "`-t` targets the session by name — `tmux attach -t work`.",
  },
  {
    id: "tmux-detach",
    level: "pareto",
    category: "tmux",
    prompt: "Leave the current session, keeping it running in the background.",
    answer: "Ctrl+b d",
    explanation:
      "`Ctrl+b d` detaches — the session keeps running. Rejoin anytime with `tmux attach`.",
  },
  {
    id: "tmux-kill-session",
    level: "core",
    category: "tmux",
    prompt: "Kill the session named `work` entirely.",
    answer: "tmux kill-session -t work",
    explanation:
      "`tmux kill-session -t work` ends that session and everything running inside it.",
  },
  {
    id: "tmux-kill-server",
    level: "core",
    category: "tmux",
    prompt: "Kill every tmux session at once.",
    answer: "tmux kill-server",
    explanation:
      "`tmux kill-server` stops the server and all sessions with it — a nuke, not a scalpel.",
  },
  {
    id: "tmux-rename-session",
    level: "core",
    category: "tmux",
    prompt: "Rename the current session to `dev`.",
    answer: "Ctrl+b $",
    explanation:
      "`Ctrl+b $` prompts for a new session name — `$` rhymes with 'session'.",
  },
  {
    id: "tmux-rename-session-cli",
    level: "core",
    category: "tmux",
    prompt: "Rename the session `work` to `dev` from the shell.",
    answer: "tmux rename-session -t work dev",
    explanation: "`-t` says which session, the last argument is the new name.",
  },
  {
    id: "tmux-attach-or-create",
    level: "workflow",
    category: "tmux",
    prompt: "Attach to `work` if it exists, or create it if it doesn't.",
    answer: "tmux new -A -s work",
    aliases: ["tmux new-session -A -s work"],
    explanation:
      "`-A` attaches if the session already exists and creates it otherwise — idempotent tmux.",
  },
  {
    id: "tmux-session-chooser",
    level: "core",
    category: "tmux",
    prompt: "Open the interactive chooser to browse and switch sessions.",
    answer: "Ctrl+b s",
    explanation: "`Ctrl+b s` lists all sessions in a picker — arrows to navigate, Enter to jump.",
  },

  // ── Panes ─────────────────────────────────────────────────────────────────
  {
    id: "tmux-split-side",
    level: "pareto",
    category: "tmux",
    prompt: "Split the current pane into two, side by side.",
    answer: "Ctrl+b %",
    explanation:
      "`%` splits with a vertical divider (left | right). Think of the `%` sign's two circles.",
  },
  {
    id: "tmux-split-stack",
    level: "pareto",
    category: "tmux",
    prompt: "Split the current pane into two, one above the other.",
    answer: "Ctrl+b \"",
    explanation:
      "The double-quote splits with a horizontal divider (top / bottom).",
  },
  {
    id: "tmux-pane-next",
    level: "pareto",
    category: "tmux",
    prompt: "Move to the next pane.",
    answer: "Ctrl+b o",
    explanation: "`Ctrl+b o` cycles focus to the next pane. Keep pressing to keep moving.",
  },
  {
    id: "tmux-pane-last",
    level: "core",
    category: "tmux",
    prompt: "Jump back to the previously active pane.",
    answer: "Ctrl+b ;",
    explanation:
      "`Ctrl+b ;` toggles between the last two panes — handy when switching back and forth.",
  },
  {
    id: "tmux-pane-numbers",
    level: "core",
    category: "tmux",
    prompt: "Show pane numbers so you can jump straight to one.",
    answer: "Ctrl+b q",
    explanation:
      "`Ctrl+b q` flashes a number on each pane; press the number to jump there.",
  },
  {
    id: "tmux-pane-zoom",
    level: "pareto",
    category: "tmux",
    prompt: "Zoom the current pane to fill the whole window (toggle).",
    answer: "Ctrl+b z",
    explanation:
      "`Ctrl+b z` maximizes the pane; press it again to restore the split.",
  },
  {
    id: "tmux-pane-close",
    level: "pareto",
    category: "tmux",
    prompt: "Close the current pane.",
    answer: "Ctrl+b x",
    aliases: ["Ctrl+d"],
    explanation:
      "`Ctrl+b x` asks for confirmation, then closes the pane. `Ctrl+d` in the pane's shell also works.",
  },
  {
    id: "tmux-pane-break",
    level: "workflow",
    category: "tmux",
    prompt: "Break the current pane out into its own window.",
    answer: "Ctrl+b !",
    explanation: "`!` pulls the current pane into a brand-new window — great for refocusing.",
  },
  {
    id: "tmux-pane-swap-prev",
    level: "core",
    category: "tmux",
    prompt: "Swap the current pane with the previous one.",
    answer: "Ctrl+b {",
    explanation: "`Ctrl+b {` moves the current pane one slot left (or up) — reorganizing splits.",
  },
  {
    id: "tmux-pane-swap-next",
    level: "core",
    category: "tmux",
    prompt: "Swap the current pane with the next one.",
    answer: "Ctrl+b }",
    explanation: "`Ctrl+b }` moves the current pane one slot right (or down) — the mirror of `{`.",
  },
  {
    id: "tmux-pane-resize",
    level: "workflow",
    category: "tmux",
    prompt: "Resize the current pane 10 cells taller.",
    answer: "resize-pane -U 10",
    aliases: ["tmux resize-pane -U 10"],
    explanation:
      "`resize-pane -U 10` grows the pane up by 10 lines — type it at the `Ctrl+b :` command prompt.",
  },
  {
    id: "tmux-layout-cycle",
    level: "workflow",
    category: "tmux",
    prompt: "Cycle through the preset pane layouts.",
    answer: "Ctrl+b Space",
    explanation:
      "`Space` cycles layouts like even-horizontal, even-vertical, and tiled.",
  },

  // ── Windows ───────────────────────────────────────────────────────────────
  {
    id: "tmux-window-new",
    level: "pareto",
    category: "tmux",
    prompt: "Create a new window.",
    answer: "Ctrl+b c",
    explanation: "`c` for create — a fresh window appears, numbered after the last one.",
  },
  {
    id: "tmux-window-next",
    level: "pareto",
    category: "tmux",
    prompt: "Switch to the next window.",
    answer: "Ctrl+b n",
    explanation: "`n` for next — moves forward one window in the list.",
  },
  {
    id: "tmux-window-prev",
    level: "core",
    category: "tmux",
    prompt: "Switch to the previous window.",
    answer: "Ctrl+b p",
    explanation: "`p` for previous — moves backward one window.",
  },
  {
    id: "tmux-window-number",
    level: "pareto",
    category: "tmux",
    prompt: "Jump straight to window 3.",
    answer: "Ctrl+b 3",
    explanation:
      "Windows are numbered 0–9 — `Ctrl+b 3` jumps to window 3 directly.",
  },
  {
    id: "tmux-window-last",
    level: "core",
    category: "tmux",
    prompt: "Switch to the window you visited most recently.",
    answer: "Ctrl+b l",
    explanation: "`l` for last — toggles between your current and previous window.",
  },
  {
    id: "tmux-window-list",
    level: "core",
    category: "tmux",
    prompt: "Open the interactive chooser to pick a window.",
    answer: "Ctrl+b w",
    explanation: "`Ctrl+b w` lists all windows; navigate and hit Enter to jump.",
  },
  {
    id: "tmux-window-rename",
    level: "core",
    category: "tmux",
    prompt: "Rename the current window to `logs`.",
    answer: "Ctrl+b ,",
    explanation: "`Ctrl+b ,` prompts for a new window name — commas are under your fingers.",
  },
  {
    id: "tmux-window-kill",
    level: "pareto",
    category: "tmux",
    prompt: "Kill the current window (and everything running in it).",
    answer: "Ctrl+b &",
    explanation: "`&` closes the whole window after a confirm prompt — every pane inside dies.",
  },
  {
    id: "tmux-window-find",
    level: "workflow",
    category: "tmux",
    prompt: "Find a window by searching for text in its title.",
    answer: "Ctrl+b f",
    explanation: "`f` prompts for a pattern and jumps to the first window whose title matches.",
  },
  {
    id: "tmux-window-new-cli",
    level: "workflow",
    category: "tmux",
    prompt: "Create a new window named `monitor` in session `work` from the shell.",
    answer: "tmux new-window -n monitor -t work",
    explanation:
      "`-n` names the new window; `-t work` targets which session it belongs to.",
  },

  // ── Copy mode & buffers ───────────────────────────────────────────────────
  {
    id: "tmux-copy-mode",
    level: "pareto",
    category: "tmux",
    prompt: "Enter copy mode so you can scroll through the pane history.",
    answer: "Ctrl+b [",
    explanation:
      "`Ctrl+b [` freezes the pane for scrolling and selecting — the bracket points backward.",
  },
  {
    id: "tmux-copy-scroll",
    level: "core",
    category: "tmux",
    prompt: "Enter copy mode and jump up one page in the history.",
    answer: "Ctrl+b PgUp",
    aliases: ["Ctrl+b PageUp"],
    explanation:
      "`Ctrl+b PgUp` enters copy mode already scrolled up one page — the fastest way to look back.",
  },
  {
    id: "tmux-copy-exit",
    level: "core",
    category: "tmux",
    prompt: "Leave copy mode without copying anything.",
    answer: "q",
    explanation:
      "`q` quits copy mode. Pressing Enter also exits (after copying the selection).",
  },
  {
    id: "tmux-copy-select",
    level: "core",
    category: "tmux",
    prompt: "In copy mode with default bindings, start the selection at the cursor.",
    answer: "Space",
    aliases: ["space", "SPACE"],
    explanation:
      "`Space` begins the selection in tmux's default (emacs-style) copy mode; vi-mode users press `v`.",
  },
  {
    id: "tmux-copy-yank",
    level: "core",
    category: "tmux",
    prompt: "In copy mode, copy the selected text.",
    answer: "Enter",
    aliases: ["enter", "ENTER"],
    explanation:
      "`Enter` yanks the selection into the tmux buffer. Vi-mode users press `y` instead.",
  },
  {
    id: "tmux-paste-buffer",
    level: "core",
    category: "tmux",
    prompt: "Paste the most recently copied text.",
    answer: "Ctrl+b ]",
    explanation:
      "`Ctrl+b ]` pastes the latest buffer — the bracket points forward, into the pane.",
  },
  {
    id: "tmux-choose-buffer",
    level: "workflow",
    category: "tmux",
    prompt: "Open the buffer chooser to paste from any saved buffer.",
    answer: "Ctrl+b =",
    explanation: "`Ctrl+b =` shows all buffers; pick one and it's pasted into the current pane.",
  },
  {
    id: "tmux-list-buffers",
    level: "core",
    category: "tmux",
    prompt: "List all copy buffers from the shell.",
    answer: "tmux list-buffers",
    explanation: "`tmux list-buffers` shows every saved yank with its contents.",
  },
  {
    id: "tmux-capture-pane",
    level: "workflow",
    category: "tmux",
    prompt: "Dump the entire visible pane content to standard output.",
    answer: "tmux capture-pane -p",
    explanation:
      "`-p` prints to stdout — pipe it into a file or grep to search what's on screen.",
  },

  // ── Customization & config ────────────────────────────────────────────────
  {
    id: "tmux-command-prompt",
    level: "core",
    category: "tmux",
    prompt: "Open the tmux command prompt to type a tmux command.",
    answer: "Ctrl+b :",
    explanation:
      "`Ctrl+b :` gives you a `:` prompt — the gateway to every tmux command.",
  },
  {
    id: "tmux-help",
    level: "core",
    category: "tmux",
    prompt: "Show all key bindings — tmux's built-in help.",
    answer: "Ctrl+b ?",
    explanation:
      "`Ctrl+b ?` opens the key-bindings list. Press `q` to close it.",
  },
  {
    id: "tmux-clock",
    level: "core",
    category: "tmux",
    prompt: "Show a big clock in the current pane.",
    answer: "Ctrl+b t",
    explanation: "`Ctrl+b t` displays a full-pane clock. Press any key to dismiss it.",
  },
  {
    id: "tmux-mouse",
    level: "workflow",
    category: "tmux",
    prompt: "Enable mouse support for all sessions.",
    answer: "tmux set -g mouse on",
    explanation:
      "`-g` sets it globally — you can resize panes and select text with the mouse.",
  },
  {
    id: "tmux-prefix-change",
    level: "workflow",
    category: "tmux",
    prompt: "Change the prefix key from Ctrl+b to Ctrl+a.",
    answer: "tmux set -g prefix C-a",
    explanation:
      "`set -g prefix C-a` rebinds the prefix. Many users also unbind the old `C-b`.",
  },
  {
    id: "tmux-reload-config",
    level: "workflow",
    category: "tmux",
    prompt: "Reload your tmux configuration from `~/.tmux.conf`.",
    answer: "source-file ~/.tmux.conf",
    aliases: ["tmux source-file ~/.tmux.conf"],
    explanation:
      "Type `source-file ~/.tmux.conf` at the `Ctrl+b :` prompt to apply config changes live.",
  },
  {
    id: "tmux-list-keys",
    level: "core",
    category: "tmux",
    prompt: "List all key bindings from the shell.",
    answer: "tmux list-keys",
    explanation:
      "`tmux list-keys` prints every binding — great for checking what you've remapped.",
  },
];

export const gitQuestions: QuizQuestion[] = [
  // ── Setup & basics ────────────────────────────────────────────────────────
  {
    id: "git-init",
    level: "pareto",
    category: "git",
    prompt: "Create a new repository in the current directory.",
    answer: "git init",
    explanation:
      "`git init` creates the hidden `.git` folder that makes this directory a repository.",
  },
  {
    id: "git-clone",
    level: "pareto",
    category: "git",
    prompt: "Copy the remote repository `https://github.com/user/repo.git` into the current folder.",
    answer: "git clone https://github.com/user/repo.git",
    explanation:
      "`git clone` downloads the repo and its whole history into a new folder named `repo`.",
  },
  {
    id: "git-status",
    level: "pareto",
    category: "git",
    prompt: "Show the current state of the working tree and the staging area.",
    answer: "git status",
    explanation:
      "`git status` tells you what changed, what's staged, and what's untracked — check it constantly.",
  },
  {
    id: "git-add-all",
    level: "pareto",
    category: "git",
    prompt: "Stage every change — new, modified, and deleted files — in one go.",
    answer: "git add .",
    aliases: ["git add -A", "git add --all"],
    explanation:
      "`git add .` stages everything in the current directory. `-A` also catches deletions above it.",
  },
  {
    id: "git-add-file",
    level: "pareto",
    category: "git",
    prompt: "Stage only the file `main.py`.",
    answer: "git add main.py",
    explanation:
      "Naming the file stages just that one — git lets you stage changes piece by piece.",
  },
  {
    id: "git-add-patch",
    level: "workflow",
    category: "git",
    prompt: "Review each change and stage it interactively, hunk by hunk.",
    answer: "git add -p",
    explanation:
      "`git add -p` walks through every hunk and asks whether to stage it — surgical staging.",
  },
  {
    id: "git-commit-message",
    level: "pareto",
    category: "git",
    prompt: "Commit the staged changes with the message `fix typo`.",
    answer: "git commit -m \"fix typo\"",
    explanation:
      "`-m` supplies the message inline so git skips the editor. Quote the message.",
  },
  {
    id: "git-commit-amend",
    level: "pareto",
    category: "git",
    prompt: "Rewrite the most recent commit's message in your editor.",
    answer: "git commit --amend",
    explanation:
      "`git commit --amend` replaces the last commit — great for fixing a typo'd message before pushing.",
  },

  // ── Diff & history ────────────────────────────────────────────────────────
  {
    id: "git-diff",
    level: "pareto",
    category: "git",
    prompt: "Show the unstaged changes in your working tree.",
    answer: "git diff",
    explanation: "`git diff` compares the working tree against the staging area — what you haven't staged.",
  },
  {
    id: "git-diff-staged",
    level: "pareto",
    category: "git",
    prompt: "Show the changes you've staged, ready to be committed.",
    answer: "git diff --staged",
    aliases: ["git diff --cached"],
    explanation:
      "`git diff --staged` (or `--cached`) shows exactly what would go into the next commit.",
  },
  {
    id: "git-show-commit",
    level: "core",
    category: "git",
    prompt: "Show the full details and diff of commit `abc1234`.",
    answer: "git show abc1234",
    explanation:
      "`git show <sha>` prints the commit message, metadata, and the changes it introduced.",
  },
  {
    id: "git-log",
    level: "pareto",
    category: "git",
    prompt: "List the commit history, newest first.",
    answer: "git log",
    explanation:
      "`git log` shows each commit with its hash, author, date, and message.",
  },
  {
    id: "git-log-oneline",
    level: "pareto",
    category: "git",
    prompt: "List the commit history as one compact line per commit.",
    answer: "git log --oneline",
    explanation:
      "`--oneline` collapses each commit to its short hash and message — the daily driver view.",
  },
  {
    id: "git-log-graph",
    level: "core",
    category: "git",
    prompt: "Show the commit history as an ASCII graph of branches and merges.",
    answer: "git log --graph",
    aliases: ["git log --graph --all"],
    explanation:
      "`--graph` draws the branch topology. `git log --graph --all` includes every branch, not just the current one.",
  },
  {
    id: "git-log-p",
    level: "core",
    category: "git",
    prompt: "Show the commit history with the full diff of every commit.",
    answer: "git log -p",
    explanation:
      "`-p` (patch) shows each commit's changes right under its message — great for digging into history.",
  },
  {
    id: "git-log-author",
    level: "core",
    category: "git",
    prompt: "Find every commit written by the author `alice`.",
    answer: "git log --author=alice",
    explanation:
      "`--author=` filters the log by author — useful for reviewing someone's contribution.",
  },
  {
    id: "git-blame",
    level: "core",
    category: "git",
    prompt: "Show which commit last touched each line of `main.py`.",
    answer: "git blame main.py",
    explanation:
      "`git blame` annotates every line with the commit that last changed it — who wrote this line, and why.",
  },
  {
    id: "git-grep",
    level: "core",
    category: "git",
    prompt: "Search the tracked files for the word `TODO`.",
    answer: "git grep TODO",
    explanation:
      "`git grep` searches only tracked files — it skips build artifacts and ignored files.",
  },
  {
    id: "git-shortlog",
    level: "core",
    category: "git",
    prompt: "Summarize how many commits each author contributed.",
    answer: "git shortlog -sn",
    explanation:
      "`-s` prints just the count, `-n` sorts by number of commits — instant contribution stats.",
  },

  // ── Branches & merging ────────────────────────────────────────────────────
  {
    id: "git-branch-list",
    level: "pareto",
    category: "git",
    prompt: "List all local branches.",
    answer: "git branch",
    explanation: "`git branch` lists branches and marks the current one with an asterisk.",
  },
  {
    id: "git-branch-new",
    level: "pareto",
    category: "git",
    prompt: "Create a new branch named `feature` without switching to it.",
    answer: "git branch feature",
    explanation:
      "`git branch <name>` just creates the pointer — you switch to it separately.",
  },
  {
    id: "git-checkout-new",
    level: "pareto",
    category: "git",
    prompt: "Create a branch named `feature` and switch to it in one command.",
    answer: "git checkout -b feature",
    aliases: ["git switch -c feature"],
    explanation:
      "`-b` means branch — it creates and checks out. The newer `git switch -c` does the same.",
  },
  {
    id: "git-switch-branch",
    level: "pareto",
    category: "git",
    prompt: "Switch to the existing branch `main`.",
    answer: "git checkout main",
    aliases: ["git switch main"],
    explanation:
      "`git checkout main` (or the newer `git switch main`) moves you onto that branch.",
  },
  {
    id: "git-branch-delete",
    level: "pareto",
    category: "git",
    prompt: "Delete the fully merged branch `feature`.",
    answer: "git branch -d feature",
    explanation:
      "`-d` deletes only merged branches — git protects you from losing unmerged work.",
  },
  {
    id: "git-branch-delete-force",
    level: "core",
    category: "git",
    prompt: "Force-delete the branch `feature` even though it isn't merged.",
    answer: "git branch -D feature",
    explanation:
      "Uppercase `-D` overrides the safety check. Only use it when you truly want that work gone.",
  },
  {
    id: "git-branch-rename",
    level: "core",
    category: "git",
    prompt: "Rename the current branch to `topic`.",
    answer: "git branch -m topic",
    explanation:
      "`-m` (move) renames the branch you're on — `git branch -m old new` works from anywhere.",
  },
  {
    id: "git-merge",
    level: "pareto",
    category: "git",
    prompt: "Merge the branch `feature` into the current branch.",
    answer: "git merge feature",
    explanation:
      "`git merge feature` folds that branch's commits into your current branch.",
  },
  {
    id: "git-merge-abort",
    level: "workflow",
    category: "git",
    prompt: "Abort a merge that ran into conflicts.",
    answer: "git merge --abort",
    explanation:
      "`git merge --abort` backs out of a conflicted merge and restores your pre-merge state.",
  },
  {
    id: "git-rebase",
    level: "workflow",
    category: "git",
    prompt: "Replay the current branch's commits on top of `main`.",
    answer: "git rebase main",
    explanation:
      "Rebasing rewrites your commits so they sit on top of `main` — a linear, clean history.",
  },
  {
    id: "git-rebase-interactive",
    level: "workflow",
    category: "git",
    prompt: "Squash, reword, or reorder the last 3 commits interactively.",
    answer: "git rebase -i HEAD~3",
    explanation:
      "`-i` opens an editor listing the last three commits — change `pick` to `squash` to fold them.",
  },
  {
    id: "git-cherry-pick",
    level: "workflow",
    category: "git",
    prompt: "Apply the changes of commit `abc1234` onto the current branch.",
    answer: "git cherry-pick abc1234",
    explanation:
      "`git cherry-pick` copies a single commit's changes onto your branch — no merge needed.",
  },
  {
    id: "git-revert",
    level: "workflow",
    category: "git",
    prompt: "Undo commit `abc1234` by creating a new commit that reverses it.",
    answer: "git revert abc1234",
    explanation:
      "`git revert` adds an inverse commit — history stays intact, which matters once you've pushed.",
  },

  // ── Undoing & recovery ────────────────────────────────────────────────────
  {
    id: "git-reset-soft",
    level: "workflow",
    category: "git",
    prompt: "Move the branch pointer back one commit, keeping the changes staged.",
    answer: "git reset --soft HEAD~1",
    explanation:
      "`--soft` only moves the pointer — your changes stay in the staging area, ready to recommit.",
  },
  {
    id: "git-reset-hard",
    level: "workflow",
    category: "git",
    prompt: "Throw away all uncommitted changes and reset to the last commit.",
    answer: "git reset --hard HEAD",
    explanation:
      "`--hard` discards staged and unstaged changes alike. There's no undo for this one — use with care.",
  },
  {
    id: "git-restore-file",
    level: "workflow",
    category: "git",
    prompt: "Discard the unstaged changes to `main.py`, restoring it to the last commit.",
    answer: "git checkout -- main.py",
    aliases: ["git restore main.py"],
    explanation:
      "`git checkout -- <file>` (or `git restore <file>`) reverts that file's unstaged edits.",
  },
  {
    id: "git-restore-staged",
    level: "workflow",
    category: "git",
    prompt: "Unstage `main.py` but keep its changes in the working tree.",
    answer: "git restore --staged main.py",
    aliases: ["git reset HEAD main.py"],
    explanation:
      "`--staged` only removes the file from the index — the edits themselves are untouched.",
  },
  {
    id: "git-reflog",
    level: "workflow",
    category: "git",
    prompt: "See the history of where HEAD has been — the way to recover a lost commit.",
    answer: "git reflog",
    explanation:
      "`git reflog` logs every move of HEAD, even after resets — your safety net for lost work.",
  },
  {
    id: "git-clean-dry",
    level: "workflow",
    category: "git",
    prompt: "Preview which untracked files would be deleted.",
    answer: "git clean -n",
    aliases: ["git clean --dry-run"],
    explanation:
      "`-n` (dry run) lists what `git clean` would remove without removing anything.",
  },
  {
    id: "git-clean",
    level: "workflow",
    category: "git",
    prompt: "Delete untracked files and directories.",
    answer: "git clean -fd",
    explanation:
      "`-f` forces the delete, `-d` includes directories. Check with `git clean -n` first.",
  },
  {
    id: "git-stash",
    level: "pareto",
    category: "git",
    prompt: "Set aside all uncommitted changes without committing them.",
    answer: "git stash",
    explanation:
      "`git stash` shelves your work-in-progress so you can switch branches cleanly.",
  },
  {
    id: "git-stash-list",
    level: "core",
    category: "git",
    prompt: "List all saved stashes.",
    answer: "git stash list",
    explanation: "`git stash list` shows every shelved change set, oldest first.",
  },
  {
    id: "git-stash-pop",
    level: "workflow",
    category: "git",
    prompt: "Restore the most recent stash and remove it from the stash list.",
    answer: "git stash pop",
    explanation: "`pop` applies the stash and drops it — one command, both halves of the round trip.",
  },
  {
    id: "git-stash-apply",
    level: "workflow",
    category: "git",
    prompt: "Restore the most recent stash but keep it in the stash list.",
    answer: "git stash apply",
    explanation:
      "`apply` restores the changes without removing the stash — useful when you need them twice.",
  },
  {
    id: "git-stash-drop",
    level: "core",
    category: "git",
    prompt: "Delete the most recent stash.",
    answer: "git stash drop",
    explanation:
      "`git stash drop` discards the newest stash. Name one explicitly (like `stash@{2}`) to drop another.",
  },

  // ── Remotes & publishing ──────────────────────────────────────────────────
  {
    id: "git-remote-list",
    level: "core",
    category: "git",
    prompt: "List all configured remotes and their URLs.",
    answer: "git remote -v",
    explanation:
      "`-v` (verbose) also prints each remote's fetch and push URLs — the default remote is `origin`.",
  },
  {
    id: "git-remote-add",
    level: "core",
    category: "git",
    prompt: "Add a remote named `origin` pointing at `https://github.com/user/repo.git`.",
    answer: "git remote add origin https://github.com/user/repo.git",
    explanation:
      "`git remote add <name> <url>` registers a remote; `origin` is the conventional first one.",
  },
  {
    id: "git-remote-remove",
    level: "core",
    category: "git",
    prompt: "Remove the remote named `origin`.",
    answer: "git remote remove origin",
    explanation:
      "`git remote remove origin` forgets the remote — it doesn't touch the repo on the server.",
  },
  {
    id: "git-fetch",
    level: "pareto",
    category: "git",
    prompt: "Download new commits from the remote without merging them.",
    answer: "git fetch",
    explanation:
      "`git fetch` updates your remote-tracking branches; your working tree stays untouched.",
  },
  {
    id: "git-pull",
    level: "pareto",
    category: "git",
    prompt: "Fetch and merge the remote changes into your current branch.",
    answer: "git pull",
    explanation: "`git pull` is `git fetch` plus a merge — it brings your branch up to date.",
  },
  {
    id: "git-pull-rebase",
    level: "workflow",
    category: "git",
    prompt: "Fetch remote changes and rebase your local commits on top of them.",
    answer: "git pull --rebase",
    explanation:
      "`--rebase` replays your unpushed commits on top of the incoming ones — a linear history.",
  },
  {
    id: "git-push-upstream",
    level: "pareto",
    category: "git",
    prompt: "Push the `main` branch to `origin` and remember it as the upstream.",
    answer: "git push -u origin main",
    explanation:
      "`-u` sets the upstream, so later you can just type `git push` (or `git pull`) with no arguments.",
  },
  {
    id: "git-push-tags",
    level: "core",
    category: "git",
    prompt: "Push all tags to the remote.",
    answer: "git push --tags",
    explanation:
      "`git push` doesn't send tags automatically — `--tags` pushes them all at once.",
  },
  {
    id: "git-tag",
    level: "core",
    category: "git",
    prompt: "Tag the current commit as `v1.0.0`.",
    answer: "git tag v1.0.0",
    explanation: "`git tag <name>` marks the current commit — a lightweight pointer, like a branch that never moves.",
  },
  {
    id: "git-tag-annotated",
    level: "core",
    category: "git",
    prompt: "Create an annotated tag `v1.0.0` with the message `release`.",
    answer: "git tag -a v1.0.0 -m \"release\"",
    explanation:
      "`-a` adds a message and the tagger's name and date — the full-fidelity version of a tag.",
  },

  // ── Advanced workflows ────────────────────────────────────────────────────
  {
    id: "git-bisect-start",
    level: "workflow",
    category: "git",
    prompt: "Start a binary search to find the commit that introduced a bug.",
    answer: "git bisect start",
    explanation:
      "`git bisect start` begins the hunt — you'll mark commits good and bad until git narrows it down.",
  },
  {
    id: "git-bisect-bad",
    level: "workflow",
    category: "git",
    prompt: "Tell git the current commit is the one with the bug.",
    answer: "git bisect bad",
    explanation: "`git bisect bad` marks the broken end of the range.",
  },
  {
    id: "git-bisect-good",
    level: "workflow",
    category: "git",
    prompt: "Tell git the current commit is known to be fine.",
    answer: "git bisect good",
    explanation:
      "`git bisect good` halves the search range; keep answering until git names the culprit commit.",
  },
  {
    id: "git-config-name",
    level: "core",
    category: "git",
    prompt: "Set your commit author name to `Alice` for every repository.",
    answer: "git config --global user.name Alice",
    explanation:
      "`--global` writes to your user config, so the name applies everywhere. `--local` overrides per repo.",
  },
  {
    id: "git-config-email",
    level: "core",
    category: "git",
    prompt: "Set your commit email globally to `alice@example.com`.",
    answer: "git config --global user.email alice@example.com",
    explanation:
      "Your email is recorded in every commit — commit before setting it and git may refuse.",
  },
  {
    id: "git-config-list",
    level: "core",
    category: "git",
    prompt: "Show all current git configuration.",
    answer: "git config --list",
    explanation:
      "`git config --list` dumps the effective config across global and repo levels.",
  },
  {
    id: "git-diff-branches",
    level: "core",
    category: "git",
    prompt: "Show the difference between branch `main` and branch `feature`.",
    answer: "git diff main feature",
    explanation:
      "`git diff <a> <b>` compares two branches — see what merging `feature` would change.",
  },
  {
    id: "git-worktree",
    level: "workflow",
    category: "git",
    prompt: "Create a linked worktree for branch `fix` in the folder `../fix`.",
    answer: "git worktree add ../fix fix",
    explanation:
      "Worktrees let you check out a second branch in a separate folder of the same repo — no stashing.",
  },
  {
    id: "git-commit-am",
    level: "pareto",
    category: "git",
    prompt: "Stage all tracked changes and commit them in one step with the message `typo`.",
    answer: "git commit -am \"typo\"",
    aliases: ["git commit -a -m \"typo\""],
    explanation:
      "`-a` stages tracked (modified/deleted) files automatically, `-m` takes the message — two steps in one.",
  },
  {
    id: "git-commit-amend-noedit",
    level: "core",
    category: "git",
    prompt: "Amend the last commit without changing its message.",
    answer: "git commit --amend --no-edit",
    explanation:
      "`--amend` rewrites the last commit; `--no-edit` keeps the existing message when you only want to add changes.",
  },
  {
    id: "git-fixup",
    level: "workflow",
    category: "git",
    prompt: "Mark this change as a fixup for commit abc1234, to be squashed in later.",
    answer: "git commit --fixup abc1234",
    explanation:
      "`--fixup` creates a commit tagged to fold into another one later — used with `rebase --autosquash`.",
  },
  {
    id: "git-autosquash",
    level: "workflow",
    category: "git",
    prompt: "Rebase onto main and automatically fold any fixup commits into their targets.",
    answer: "git rebase -i --autosquash main",
    explanation:
      "`--autosquash` arranges the todo list so `--fixup` and `--squash` commits land right under their targets.",
  },
  {
    id: "git-rebase-continue",
    level: "workflow",
    category: "git",
    prompt: "Resume the rebase after resolving a conflict.",
    answer: "git rebase --continue",
    explanation:
      "After fixing conflicts and staging them, `--continue` picks up where the rebase stopped.",
  },
  {
    id: "git-rebase-abort",
    level: "workflow",
    category: "git",
    prompt: "Abandon the current rebase entirely and return to the pre-rebase state.",
    answer: "git rebase --abort",
    explanation:
      "`--abort` discards the rebase and restores your branch — the escape hatch when a rebase spirals.",
  },
  {
    id: "git-add-updated",
    level: "core",
    category: "git",
    prompt: "Stage the modifications and deletions of already-tracked files only.",
    answer: "git add -u",
    explanation:
      "`-u` (update) stages changes to tracked files but not brand-new untracked ones — safer than `git add .`.",
  },
  {
    id: "git-add-intent",
    level: "core",
    category: "git",
    prompt: "Start tracking file.txt without staging its content yet.",
    answer: "git add -N file.txt",
    aliases: ["git add --intent-to-add file.txt"],
    explanation:
      "`-N` (intent-to-add) tells git about the file so `git diff` shows it, without adding its contents to the index.",
  },
  {
    id: "git-diff-stat",
    level: "core",
    category: "git",
    prompt: "Show a summary of changed files with line counts, not the full diff.",
    answer: "git diff --stat",
    explanation: "`--stat` prints a compact table of files changed with added/deleted counts — the quick overview.",
  },
  {
    id: "git-restore-commit",
    level: "core",
    category: "git",
    prompt: "Restore main.py to how it looked at HEAD~1, discarding current working changes.",
    answer: "git checkout HEAD~1 -- main.py",
    aliases: ["git restore --source=HEAD~1 main.py"],
    explanation:
      "`checkout <commit> -- <file>` overwrites the file with an earlier version — `restore --source` is the newer spelling.",
  },
  {
    id: "git-rm-cached",
    level: "workflow",
    category: "git",
    prompt: "Stop tracking secret.env but keep the file on disk.",
    answer: "git rm --cached secret.env",
    explanation:
      "`--cached` removes the file from the index only — the working copy stays. The next commit drops it from the repo.",
  },
  {
    id: "git-branch-remote",
    level: "core",
    category: "git",
    prompt: "List only the remote-tracking branches (origin/*).",
    answer: "git branch -r",
    explanation: "`-r` shows remote-tracking branches — your local snapshot of what's on the remotes.",
  },
  {
    id: "git-branch-all",
    level: "core",
    category: "git",
    prompt: "List both local and remote-tracking branches.",
    answer: "git branch -a",
    explanation: "`-a` combines local and remote branches — the complete picture of every branch you know about.",
  },
  {
    id: "git-branch-vv",
    level: "core",
    category: "git",
    prompt: "List branches with the upstream branch each one tracks.",
    answer: "git branch -vv",
    explanation:
      "`-vv` also shows each branch's upstream and ahead/behind counts — the double `v` for verbose tracking info.",
  },
  {
    id: "git-branch-merged",
    level: "core",
    category: "git",
    prompt: "List branches that are already merged into the current branch.",
    answer: "git branch --merged",
    explanation:
      "`--merged` is the safe-to-delete list — run it before cleaning up finished feature branches.",
  },
  {
    id: "git-checkout-previous",
    level: "core",
    category: "git",
    prompt: "Switch back to the branch you were on before this one.",
    answer: "git checkout -",
    aliases: ["git switch -"],
    explanation: "The `-` shorthand returns to the previous branch — same muscle memory as `cd -`.",
  },
  {
    id: "git-push-delete",
    level: "workflow",
    category: "git",
    prompt: "Delete the branch `fix` on the origin remote.",
    answer: "git push origin --delete fix",
    aliases: ["git push origin :fix"],
    explanation:
      "`push --delete` (or the older `:branch` syntax) removes a branch from the remote — the counterpart to a local `-d`.",
  },
  {
    id: "git-log-follow",
    level: "core",
    category: "git",
    prompt: "Show the history of file.txt, following the file across renames.",
    answer: "git log --follow -- file.txt",
    explanation:
      "`--follow` tracks a single file's history through renames, so past commits under old names still show.",
  },
  {
    id: "git-log-grep",
    level: "core",
    category: "git",
    prompt: "Show only commits whose message contains the word `typo`.",
    answer: "git log --grep=typo",
    aliases: ["git log --grep=\"typo\""],
    explanation: "`--grep` filters the log by commit message — handy when you remember the words, not the hashes.",
  },
  {
    id: "git-log-pickaxe",
    level: "core",
    category: "git",
    prompt: "Find commits that added or removed the string `deleteUser` anywhere.",
    answer: "git log -S\"deleteUser\"",
    aliases: ["git log -SdeleteUser"],
    explanation:
      "The `-S` pickaxe finds commits where the count of a string changed — the forensic way to hunt down where code appeared or vanished.",
  },
  {
    id: "git-show-file",
    level: "core",
    category: "git",
    prompt: "Print file.txt as it existed at HEAD~1, without checking it out.",
    answer: "git show HEAD~1:file.txt",
    explanation:
      "`git show <commit>:<path>` prints a file's content at any commit — read-only archaeology, nothing changes.",
  },
  {
    id: "git-log-stat",
    level: "core",
    category: "git",
    prompt: "Show the log together with which files each commit changed.",
    answer: "git log --stat",
    explanation:
      "`--stat` appends a compact diffstat to every commit in the log — a sense of each commit's footprint.",
  },
  {
    id: "git-alias",
    level: "core",
    category: "git",
    prompt: "Create a global alias `co` for the `checkout` command.",
    answer: "git config --global alias.co checkout",
    explanation:
      "`alias.<name>` registers a shortcut — `co` now behaves like `checkout` in every repo on this machine.",
  },
  {
    id: "git-default-branch",
    level: "core",
    category: "git",
    prompt: "Make new repositories initialize on `main` instead of `master`.",
    answer: "git config --global init.defaultBranch main",
    explanation:
      "`init.defaultBranch` sets the branch name for every future `git init` — a one-line fix for the master/main migration.",
  },
  {
    id: "git-core-editor",
    level: "core",
    category: "git",
    prompt: "Tell git to open VS Code when it needs you to type a commit message.",
    answer: "git config --global core.editor \"code --wait\"",
    aliases: ["git config --global core.editor code --wait"],
    explanation:
      "`core.editor` names the editor program; the `--wait` flag makes code block until the file is saved and closed.",
  },
  {
    id: "git-config-get",
    level: "core",
    category: "git",
    prompt: "Print the configured value of user.name.",
    answer: "git config user.name",
    explanation:
      "`git config <key>` reads one value — leave off `--global` to see the local repo's setting, which takes precedence.",
  },
  {
    id: "git-fetch-prune",
    level: "core",
    category: "git",
    prompt: "Fetch from origin and delete remote-tracking branches that no longer exist upstream.",
    answer: "git fetch --prune origin",
    aliases: ["git fetch -p origin"],
    explanation:
      "`--prune` cleans stale origin/* refs — without it, deleted remote branches linger as ghosts in `git branch -r`.",
  },
  {
    id: "git-pull-ffonly",
    level: "workflow",
    category: "git",
    prompt: "Pull, but refuse to create a merge commit — fast-forward only.",
    answer: "git pull --ff-only",
    explanation:
      "`--ff-only` errors out instead of merging when history has diverged — keeps linear history and flags the problem early.",
  },
  {
    id: "git-push-force-lease",
    level: "workflow",
    category: "git",
    prompt: "Force-push, but abort if the remote branch has moved since you last fetched.",
    answer: "git push --force-with-lease",
    explanation:
      "`--force-with-lease` is the safe force: it checks the remote hasn't changed, so you can't silently clobber someone's commits.",
  },
  {
    id: "git-remote-show",
    level: "core",
    category: "git",
    prompt: "Show detailed information about the origin remote.",
    answer: "git remote show origin",
    explanation:
      "`remote show` lists fetch/push URLs, tracked branches, and which local branches would be pushed or deleted.",
  },
  {
    id: "git-remote-get-url",
    level: "core",
    category: "git",
    prompt: "Print the URL that origin points at.",
    answer: "git remote get-url origin",
    explanation: "`get-url` is the script-friendly way to read a remote's address — no parsing of `git remote -v` needed.",
  },
  {
    id: "git-stash-untracked",
    level: "workflow",
    category: "git",
    prompt: "Stash your changes together with untracked files.",
    answer: "git stash -u",
    aliases: ["git stash --include-untracked"],
    explanation: "By default `stash` skips untracked files — `-u` sweeps them in too, so the working tree is fully clean.",
  },
  {
    id: "git-stash-show",
    level: "core",
    category: "git",
    prompt: "Show the full diff of the most recent stash.",
    answer: "git stash show -p",
    explanation:
      "`stash show` defaults to a bare stat; `-p` prints the actual diff — review before you pop.",
  },
  {
    id: "git-reset-mixed",
    level: "workflow",
    category: "git",
    prompt: "Undo the last commit but keep its changes in the working directory, unstaged.",
    answer: "git reset --mixed HEAD~1",
    explanation:
      "`--mixed` (the default) resets the index to the target commit but leaves your working files alone — undo a commit, keep the edits.",
  },
  {
    id: "git-ls-files",
    level: "core",
    category: "git",
    prompt: "List every file git is currently tracking.",
    answer: "git ls-files",
    explanation:
      "`ls-files` dumps the whole index — a quick answer to \"what does git actually track here?\".",
  },
  {
    id: "git-rev-parse-branch",
    level: "core",
    category: "git",
    prompt: "Print the name of the current branch (the short, symbolic form).",
    answer: "git rev-parse --abbrev-ref HEAD",
    explanation:
      "`rev-parse --abbrev-ref HEAD` prints just the branch name — the go-to for scripts and prompts.",
  },
  {
    id: "git-cat-file",
    level: "core",
    category: "git",
    prompt: "Show the raw contents of the git object abc1234.",
    answer: "git cat-file -p abc1234",
    explanation:
      "`cat-file -p` pretty-prints any object — a commit, tree, or blob — by hash. The plumbing behind `git show`.",
  },
  {
    id: "git-archive",
    level: "core",
    category: "git",
    prompt: "Package the repository at HEAD into a zip file called repo.zip.",
    answer: "git archive -o repo.zip HEAD",
    explanation:
      "`git archive` exports a snapshot of the tree — a clean release tarball/zip without any .git metadata.",
  },
  {
    id: "git-gc",
    level: "core",
    category: "git",
    prompt: "Run garbage collection to compact the repository's objects.",
    answer: "git gc",
    explanation:
      "`gc` packs loose objects and prunes unreachable ones — automatic in practice, but handy after heavy rewrite history.",
  },
  {
    id: "git-describe",
    level: "core",
    category: "git",
    prompt: "Print the most recent tag reachable from HEAD.",
    answer: "git describe --tags",
    explanation:
      "`describe` names the nearest tag plus a count of commits since it (e.g. v1.0.0-3-gabc1234) — common for build versions.",
  },
  {
    id: "git-submodule-add",
    level: "core",
    category: "git",
    prompt: "Add https://github.com/user/lib.git as a submodule in the folder lib/.",
    answer: "git submodule add https://github.com/user/lib.git lib",
    explanation:
      "Submodules pin another repository at a specific commit inside yours — `add` clones it and records the reference.",
  },
  {
    id: "git-submodule-update",
    level: "core",
    category: "git",
    prompt: "Initialize all submodules and pull their pinned commits recursively.",
    answer: "git submodule update --init --recursive",
    explanation:
      "After a fresh clone, submodules are empty folders — this command fetches and checks out the recorded commits, nested and all.",
  },
];

export const shellQuestions: QuizQuestion[] = [
  // ── Files & navigation ────────────────────────────────────────────────────
  {
    id: "shell-pwd",
    level: "pareto",
    category: "shell",
    prompt: "Print the full path of the current working directory.",
    answer: "pwd",
    explanation: "`pwd` (print working directory) tells you exactly where you are in the filesystem.",
  },
  {
    id: "shell-ls",
    level: "pareto",
    category: "shell",
    prompt: "List the files in the current directory.",
    answer: "ls",
    explanation: "`ls` lists the directory contents — the first command most people learn.",
  },
  {
    id: "shell-ls-all",
    level: "core",
    category: "shell",
    prompt: "List all files, including hidden ones that start with a dot.",
    answer: "ls -a",
    explanation: "`-a` (all) reveals hidden files like `.git` and `.bashrc`.",
  },
  {
    id: "shell-ls-la",
    level: "pareto",
    category: "shell",
    prompt: "List every file with full details — permissions, sizes, dates.",
    answer: "ls -la",
    explanation:
      "`ls -la` combines `-a` and `-l` — the standard 'everything about this directory' view.",
  },
  {
    id: "shell-cd-home",
    level: "pareto",
    category: "shell",
    prompt: "Go to your home directory.",
    answer: "cd ~",
    aliases: ["cd"],
    explanation: "`cd ~` (or bare `cd`) jumps home — the `~` is shorthand for your home path.",
  },
  {
    id: "shell-cd-up",
    level: "pareto",
    category: "shell",
    prompt: "Go up one directory level.",
    answer: "cd ..",
    explanation: "`..` is the parent directory, so `cd ..` moves one level up.",
  },
  {
    id: "shell-cd-back",
    level: "pareto",
    category: "shell",
    prompt: "Jump back to the directory you were just in.",
    answer: "cd -",
    explanation:
      "`cd -` toggles between your current and previous directory — faster than typing paths.",
  },
  {
    id: "shell-mkdir-p",
    level: "pareto",
    category: "shell",
    prompt: "Create the nested path `a/b/c`, making any missing parents.",
    answer: "mkdir -p a/b/c",
    explanation: "`-p` (parents) creates every missing directory in the path in one go.",
  },
  {
    id: "shell-touch",
    level: "pareto",
    category: "shell",
    prompt: "Create a new empty file named `notes.txt`.",
    answer: "touch notes.txt",
    explanation:
      "`touch` creates an empty file if it doesn't exist (and updates the timestamp if it does).",
  },
  {
    id: "shell-cp",
    level: "pareto",
    category: "shell",
    prompt: "Copy `notes.txt` to a new file named `backup.txt`.",
    answer: "cp notes.txt backup.txt",
    explanation: "`cp <source> <dest>` duplicates a file — `cp -r` does the same for directories.",
  },
  {
    id: "shell-mv",
    level: "pareto",
    category: "shell",
    prompt: "Rename `old.txt` to `new.txt`.",
    answer: "mv old.txt new.txt",
    explanation: "`mv` moves or renames — there's no separate rename command in the shell.",
  },
  {
    id: "shell-rm",
    level: "pareto",
    category: "shell",
    prompt: "Delete the file `temp.txt`.",
    answer: "rm temp.txt",
    explanation: "`rm` deletes files permanently — there's no trash bin, so use it deliberately.",
  },
  {
    id: "shell-rm-rf",
    level: "core",
    category: "shell",
    prompt: "Force-delete the directory `build` and everything inside it.",
    answer: "rm -rf build",
    explanation:
      "`-r` recurses, `-f` skips confirmations. `rm -rf` is powerful — double-check before running.",
  },
  {
    id: "shell-ln",
    level: "core",
    category: "shell",
    prompt: "Create a symlink named `current` that points at the directory `data`.",
    answer: "ln -s data current",
    explanation:
      "`ln -s <target> <link>` makes a shortcut — the link behaves like the real path.",
  },

  // ── Viewing & searching ───────────────────────────────────────────────────
  {
    id: "shell-cat",
    level: "pareto",
    category: "shell",
    prompt: "Print the entire contents of `file.txt` to the terminal.",
    answer: "cat file.txt",
    explanation: "`cat` dumps a file to stdout — short files only, or the output scrolls away.",
  },
  {
    id: "shell-less",
    level: "core",
    category: "shell",
    prompt: "View `file.txt` one screen at a time, with scrolling.",
    answer: "less file.txt",
    explanation:
      "`less` pages through long files — space to page, `/` to search, `q` to quit.",
  },
  {
    id: "shell-head",
    level: "core",
    category: "shell",
    prompt: "Show only the first 5 lines of `file.txt`.",
    answer: "head -n 5 file.txt",
    aliases: ["head -5 file.txt"],
    explanation: "`head -n N` shows the top N lines — `head -5` is a shorthand that also works.",
  },
  {
    id: "shell-tail",
    level: "pareto",
    category: "shell",
    prompt: "Show only the last 10 lines of `file.txt`.",
    answer: "tail -n 10 file.txt",
    explanation: "`tail -n N` shows the bottom N lines — the default is the last 10.",
  },
  {
    id: "shell-tail-f",
    level: "workflow",
    category: "shell",
    prompt: "Follow `app.log` and print new lines as they're appended.",
    answer: "tail -f app.log",
    explanation:
      "`tail -f` (follow) watches a growing file — the standard way to watch server logs live.",
  },
  {
    id: "shell-grep",
    level: "pareto",
    category: "shell",
    prompt: "Print the lines of `file.txt` that contain `error`.",
    answer: "grep error file.txt",
    explanation: "`grep <pattern> <file>` filters lines by a pattern — the workhorse of the shell.",
  },
  {
    id: "shell-grep-i",
    level: "core",
    category: "shell",
    prompt: "Search `file.txt` for `error`, ignoring case.",
    answer: "grep -i error file.txt",
    explanation: "`-i` makes the match case-insensitive, so `Error` and `ERROR` count too.",
  },
  {
    id: "shell-grep-v",
    level: "core",
    category: "shell",
    prompt: "Show the lines of `file.txt` that do NOT contain `debug`.",
    answer: "grep -v debug file.txt",
    explanation: "`-v` inverts the match — everything except lines with `debug`.",
  },
  {
    id: "shell-grep-rn",
    level: "workflow",
    category: "shell",
    prompt: "Search every file under `src` for `TODO`, printing file names and line numbers.",
    answer: "grep -rn TODO src",
    aliases: ["grep -r TODO src"],
    explanation: "`-r` recurses into directories; `-n` adds line numbers for each hit.",
  },
  {
    id: "shell-find-name",
    level: "workflow",
    category: "shell",
    prompt: "Find every file matching `*.log` under the current directory.",
    answer: "find . -name \"*.log\"",
    explanation:
      "`find` walks the tree — `-name` matches filenames. The quotes stop the shell from expanding the glob itself.",
  },
  {
    id: "shell-find-type",
    level: "core",
    category: "shell",
    prompt: "Find every directory under the current directory.",
    answer: "find . -type d",
    explanation: "`-type d` matches directories (`-type f` matches files) — useful for mapping a tree.",
  },
  {
    id: "shell-wc-l",
    level: "core",
    category: "shell",
    prompt: "Count how many lines `file.txt` has.",
    answer: "wc -l file.txt",
    explanation: "`wc -l` counts lines — `wc -w` counts words and `wc -c` counts bytes.",
  },
  {
    id: "shell-sort-nr",
    level: "core",
    category: "shell",
    prompt: "Sort `file.txt` numerically, largest first.",
    answer: "sort -nr file.txt",
    explanation: "`-n` sorts by number (so 10 beats 9), `-r` reverses to descending order.",
  },

  // ── Pipes, redirection & processes ────────────────────────────────────────
  {
    id: "shell-pipe-count",
    level: "workflow",
    category: "shell",
    prompt: "Count how many files are in the current directory.",
    answer: "ls | wc -l",
    explanation:
      "The pipe `|` feeds one command's output into the next — here, `ls` into `wc -l`.",
  },
  {
    id: "shell-ps-grep",
    level: "workflow",
    category: "shell",
    prompt: "Find the process that's running `nginx`.",
    answer: "ps aux | grep nginx",
    explanation:
      "`ps aux` lists all processes; piping to `grep nginx` filters for the one you want.",
  },
  {
    id: "shell-redirect-overwrite",
    level: "pareto",
    category: "shell",
    prompt: "Write the output of `ls` into `listing.txt`, replacing whatever was there.",
    answer: "ls > listing.txt",
    explanation:
      "`>` sends stdout into a file, overwriting it — `ls` prints nothing on screen anymore.",
  },
  {
    id: "shell-redirect-append",
    level: "pareto",
    category: "shell",
    prompt: "Add the output of `ls` to the end of `listing.txt` without overwriting it.",
    answer: "ls >> listing.txt",
    explanation: "`>>` appends instead of overwriting — the safe twin of `>`.",
  },
  {
    id: "shell-redirect-both",
    level: "workflow",
    category: "shell",
    prompt: "Capture both stdout and stderr of `ls` into `out.log`.",
    answer: "ls > out.log 2>&1",
    explanation:
      "`2>&1` redirects the error stream (2) to wherever stdout (1) is going — both land in the file.",
  },
  {
    id: "shell-redirect-null",
    level: "workflow",
    category: "shell",
    prompt: "Run `ls missing.txt` silently, discarding its error message.",
    answer: "ls missing.txt 2>/dev/null",
    explanation:
      "`2>/dev/null` throws stderr away — `/dev/null` is the shell's bottomless pit.",
  },
  {
    id: "shell-tee",
    level: "workflow",
    category: "shell",
    prompt: "Show `ls` output on screen AND save it to `listing.txt` at the same time.",
    answer: "ls | tee listing.txt",
    explanation:
      "`tee` splits a stream — one copy to stdout, one to the file. Like a plumbing T-junction.",
  },
  {
    id: "shell-xargs",
    level: "workflow",
    category: "shell",
    prompt: "Print the names of every Python file under `.` that contains `TODO`.",
    answer: "find . -name \"*.py\" | xargs grep -l TODO",
    explanation:
      "`xargs` converts stdin into arguments — each found file becomes an argument to `grep -l`.",
  },
  {
    id: "shell-ps",
    level: "core",
    category: "shell",
    prompt: "List every running process with its PID and CPU/memory usage.",
    answer: "ps aux",
    explanation: "`ps aux` is the classic all-processes snapshot — for a live updating view, run `top` instead.",
  },
  {
    id: "shell-kill",
    level: "workflow",
    category: "shell",
    prompt: "Send a termination request to the process with PID 1234.",
    answer: "kill 1234",
    explanation: "`kill` sends SIGTERM — a polite 'please stop' that lets the process clean up.",
  },
  {
    id: "shell-kill-9",
    level: "workflow",
    category: "shell",
    prompt: "Force-kill the process with PID 1234 immediately.",
    answer: "kill -9 1234",
    explanation: "`-9` sends SIGKILL, which the process cannot ignore — last resort for stuck programs.",
  },
  {
    id: "shell-pkill",
    level: "workflow",
    category: "shell",
    prompt: "Kill every process whose name matches `chrome`.",
    answer: "pkill chrome",
    explanation: "`pkill` kills by name instead of PID — no hunting for process numbers first.",
  },
  {
    id: "shell-background",
    level: "workflow",
    category: "shell",
    prompt: "Run `sleep 30` in the background so the prompt returns immediately.",
    answer: "sleep 30 &",
    explanation: "The trailing `&` starts a job in the background and gives you your prompt back.",
  },
  {
    id: "shell-history",
    level: "pareto",
    category: "shell",
    prompt: "Show your command history.",
    answer: "history",
    explanation: "`history` prints what you've typed — pipe it to `grep` to hunt for that one command.",
  },
  {
    id: "shell-rerun-last",
    level: "core",
    category: "shell",
    prompt: "Re-run the last command you typed.",
    answer: "!!",
    explanation: "`!!` expands to the previous command — the classic recovery after a failed `sudo`.",
  },
  {
    id: "shell-exit-status",
    level: "core",
    category: "shell",
    prompt: "Print the exit status of the last command (0 means success).",
    answer: "echo $?",
    explanation: "`$?` holds the last command's exit code — 0 for success, anything else for failure.",
  },

  // ── Interactive shortcuts ─────────────────────────────────────────────────
  {
    id: "shell-ctrl-c",
    level: "pareto",
    category: "shell",
    prompt: "Interrupt the command currently running and get your prompt back.",
    answer: "Ctrl+c",
    explanation: "`Ctrl+c` sends SIGINT — the universal 'stop this' in the terminal.",
  },
  {
    id: "shell-ctrl-d",
    level: "core",
    category: "shell",
    prompt: "Send end-of-input to close the shell.",
    answer: "Ctrl+d",
    explanation:
      "`Ctrl+d` sends EOF — at a bare prompt it exits the shell. It's also how you end stdin to a program.",
  },
  {
    id: "shell-ctrl-z",
    level: "core",
    category: "shell",
    prompt: "Suspend the running foreground job so you can resume it later.",
    answer: "Ctrl+z",
    explanation: "`Ctrl+z` pauses the job (SIGTSTP) — `fg` brings it back, `bg` resumes it in the background.",
  },
  {
    id: "shell-ctrl-l",
    level: "pareto",
    category: "shell",
    prompt: "Clear the terminal screen.",
    answer: "Ctrl+l",
    aliases: ["clear"],
    explanation:
      "`Ctrl+l` clears the screen without losing your scrollback — faster than typing `clear`.",
  },
  {
    id: "shell-ctrl-r",
    level: "pareto",
    category: "shell",
    prompt: "Search your command history interactively as you type.",
    answer: "Ctrl+r",
    explanation:
      "`Ctrl+r` starts reverse search — type a fragment and press `Ctrl+r` again to cycle matches.",
  },
  {
    id: "shell-ctrl-a",
    level: "core",
    category: "shell",
    prompt: "Jump the cursor to the start of the line while editing a command.",
    answer: "Ctrl+a",
    explanation: "`Ctrl+a` moves to the line start; `Ctrl+e` moves to the end — the readline quick pair.",
  },
  {
    id: "shell-ctrl-e",
    level: "core",
    category: "shell",
    prompt: "Jump the cursor to the end of the line while editing a command.",
    answer: "Ctrl+e",
    explanation: "`Ctrl+e` moves to the line end — the partner of `Ctrl+a`.",
  },
  {
    id: "shell-ctrl-u",
    level: "core",
    category: "shell",
    prompt: "Delete everything before the cursor on the current line.",
    answer: "Ctrl+u",
    explanation: "`Ctrl+u` clears back to the prompt — handy when a long command goes wrong.",
  },

  // ── Permissions & ownership ───────────────────────────────────────────────
  {
    id: "shell-chmod-x",
    level: "core",
    category: "shell",
    prompt: "Make `deploy.sh` executable.",
    answer: "chmod +x deploy.sh",
    explanation:
      "`+x` adds execute permission — the step between 'writes a script' and 'can run it'.",
  },
  {
    id: "shell-chmod-755",
    level: "core",
    category: "shell",
    prompt: "Set `deploy.sh` to rwx for the owner and rx for everyone else.",
    answer: "chmod 755 deploy.sh",
    explanation:
      "In `755`, each digit is owner/group/others: 7 = rwx, 5 = rx. The classic script permission.",
  },
  {
    id: "shell-chown",
    level: "core",
    category: "shell",
    prompt: "Give ownership of `file.txt` to the user `alice` and the group `dev`.",
    answer: "chown alice:dev file.txt",
    explanation: "`chown user:group <file>` sets both owner and group in one command.",
  },
  {
    id: "shell-whoami",
    level: "core",
    category: "shell",
    prompt: "Show the name of the current user.",
    answer: "whoami",
    explanation: "`whoami` prints your username — check it before blaming a permissions problem.",
  },

  // ── Environment & configuration ───────────────────────────────────────────
  {
    id: "shell-echo-path",
    level: "core",
    category: "shell",
    prompt: "Print the value of the `PATH` variable.",
    answer: "echo $PATH",
    explanation:
      "`$PATH` lists the directories the shell searches for commands — the `$` dereferences the variable.",
  },
  {
    id: "shell-export",
    level: "core",
    category: "shell",
    prompt: "Set the environment variable `EDITOR` to `vim` for this session.",
    answer: "export EDITOR=vim",
    explanation:
      "`export` makes the variable visible to child processes; without it, only the shell sees it.",
  },
  {
    id: "shell-source",
    level: "workflow",
    category: "shell",
    prompt: "Apply the changes in `~/.bashrc` to the current shell without restarting.",
    answer: "source ~/.bashrc",
    aliases: [". ~/.bashrc"],
    explanation:
      "`source` (or the shorthand `.`) runs the file in the current shell — new aliases appear instantly.",
  },
  {
    id: "shell-alias",
    level: "core",
    category: "shell",
    prompt: "Create an alias `ll` that runs `ls -l`.",
    answer: "alias ll='ls -l'",
    explanation:
      "`alias <name>='<command>'` gives you a shortcut — add it to `~/.bashrc` to keep it forever.",
  },
  {
    id: "shell-type",
    level: "core",
    category: "shell",
    prompt: "Show what kind of thing the shell considers `cd` to be.",
    answer: "type cd",
    explanation: "`type` reveals whether a name is a builtin, alias, function, or external binary.",
  },
  {
    id: "shell-which",
    level: "core",
    category: "shell",
    prompt: "Show the full path of the `git` executable that would run.",
    answer: "which git",
    aliases: ["command -v git"],
    explanation: "`which` prints the resolved path of a command; `command -v` is the portable variant.",
  },
  {
    id: "shell-man",
    level: "core",
    category: "shell",
    prompt: "Open the manual page for `ls`.",
    answer: "man ls",
    explanation: "`man <cmd>` is the built-in documentation — `q` quits, `/` searches within the page.",
  },

  // ── Text processing ───────────────────────────────────────────────────────
  {
    id: "shell-cut",
    level: "core",
    category: "shell",
    prompt: "Extract the second comma-separated field of every line in `data.csv`.",
    answer: "cut -d, -f2 data.csv",
    explanation: "`-d,` sets the delimiter to a comma and `-f2` picks the second field.",
  },
  {
    id: "shell-awk",
    level: "core",
    category: "shell",
    prompt: "Print the first word of every line of `file.txt`.",
    answer: "awk '{print $1}' file.txt",
    explanation:
      "`awk` splits each line on whitespace; `$1` is the first field. Quoted so the shell passes it whole.",
  },
  {
    id: "shell-sed",
    level: "workflow",
    category: "shell",
    prompt: "Replace every `foo` with `bar` in `file.txt`, editing the file in place.",
    answer: "sed -i 's/foo/bar/g' file.txt",
    explanation:
      "`-i` edits the file itself; `s/foo/bar/g` substitutes globally on each line.",
  },
  {
    id: "shell-tr",
    level: "core",
    category: "shell",
    prompt: "Convert every lowercase letter in `file.txt` to uppercase.",
    answer: "tr 'a-z' 'A-Z' < file.txt",
    explanation:
      "`tr` translates character sets; `<` feeds the file in as stdin. Pipe the result onward as needed.",
  },
  {
    id: "shell-diff-u",
    level: "core",
    category: "shell",
    prompt: "Show the differences between `a.txt` and `b.txt` as a unified diff.",
    answer: "diff -u a.txt b.txt",
    explanation:
      "`diff -u` is the unified format git and patch tools use — `+` lines are new, `-` lines removed.",
  },

  // ── Archives & system info ────────────────────────────────────────────────
  {
    id: "shell-tar-c",
    level: "workflow",
    category: "shell",
    prompt: "Create `backup.tar.gz` from the `src` directory, gzip-compressed.",
    answer: "tar -czf backup.tar.gz src",
    explanation:
      "`c` creates, `z` compresses with gzip, `f` names the file — the standard backup trio.",
  },
  {
    id: "shell-tar-x",
    level: "workflow",
    category: "shell",
    prompt: "Extract `backup.tar.gz` in the current directory.",
    answer: "tar -xzf backup.tar.gz",
    explanation: "`x` extracts — with `-z` it handles the gzip layer automatically.",
  },
  {
    id: "shell-df",
    level: "core",
    category: "shell",
    prompt: "Show disk space usage for every filesystem in human-readable form.",
    answer: "df -h",
    explanation: "`df -h` shows free space per disk; `-h` turns bytes into GB/MB.",
  },
  {
    id: "shell-du",
    level: "core",
    category: "shell",
    prompt: "Show the total size of the current directory, human-readable.",
    answer: "du -sh .",
    explanation: "`du` measures disk usage; `-s` summarizes and `-h` makes it readable.",
  },
  {
    id: "shell-watch",
    level: "workflow",
    category: "shell",
    prompt: "Re-run `ls` every 2 seconds to watch a directory change live.",
    answer: "watch -n 2 ls",
    explanation: "`watch` reruns a command on a timer — `-n 2` is the interval in seconds.",
  },
  {
    id: "shell-curl",
    level: "core",
    category: "shell",
    prompt: "Download `https://example.com/file.zip` to the current folder, keeping its filename.",
    answer: "curl -O https://example.com/file.zip",
    explanation:
      "`-O` saves with the remote filename; without it curl prints the response to the screen.",
  },
  {
    id: "shell-ping",
    level: "core",
    category: "shell",
    prompt: "Check whether `google.com` is reachable.",
    answer: "ping google.com",
    explanation: "`ping` sends ICMP probes and reports latency — the quick reachability check.",
  },
  {
    id: "shell-shebang",
    level: "core",
    category: "shell",
    prompt: "Start a bash script with the shebang line that selects the interpreter.",
    answer: "#!/bin/bash",
    explanation:
      "The shebang tells the kernel which interpreter to run — every bash script starts with this line.",
  },
  {
    id: "shell-arg-first",
    level: "core",
    category: "shell",
    prompt: "Reference the first argument passed to a script.",
    answer: "$1",
    explanation: "`$1` is the first argument, `$2` the second, `$@` all of them — the script's parameters.",
  },
];

export const dockerQuestions: QuizQuestion[] = [
  // ── Images & containers ───────────────────────────────────────────────────
  {
    id: "docker-pull",
    level: "pareto",
    category: "docker",
    prompt: "Download the ubuntu image from Docker Hub.",
    answer: "docker pull ubuntu",
    explanation:
      "`docker pull` fetches an image from a registry — the default is Docker Hub. Tags default to `latest`.",
  },
  {
    id: "docker-images",
    level: "pareto",
    category: "docker",
    prompt: "List all images stored on your machine.",
    answer: "docker images",
    explanation: "`docker images` (alias `docker image ls`) shows every locally stored image with its tag and size.",
    aliases: ["docker image ls"],
  },
  {
    id: "docker-ps",
    level: "pareto",
    category: "docker",
    prompt: "List all currently running containers.",
    answer: "docker ps",
    explanation: "`docker ps` lists running containers with their ID, image, and ports. Add `-a` to include stopped ones.",
  },
  {
    id: "docker-ps-all",
    level: "pareto",
    category: "docker",
    prompt: "List every container, including stopped ones.",
    answer: "docker ps -a",
    explanation: "`-a` shows the full history of containers on the machine, not just the ones currently running.",
  },
  {
    id: "docker-run",
    level: "pareto",
    category: "docker",
    prompt: "Start a container from the hello-world image.",
    answer: "docker run hello-world",
    explanation:
      "`docker run` creates and starts a container from an image. hello-world prints a welcome message and exits.",
  },
  {
    id: "docker-run-it",
    level: "pareto",
    category: "docker",
    prompt: "Start an interactive bash session inside a ubuntu container.",
    answer: "docker run -it ubuntu bash",
    explanation:
      "`-i` keeps stdin open, `-t` allocates a pseudo-terminal — together they give you an interactive shell. The trailing `bash` is the command to run.",
  },
  {
    id: "docker-run-detached",
    level: "pareto",
    category: "docker",
    prompt: "Run an nginx container in the background (detached).",
    answer: "docker run -d nginx",
    explanation:
      "`-d` detaches: the container runs in the background and you get your prompt back immediately.",
  },
  {
    id: "docker-run-rm",
    level: "workflow",
    category: "docker",
    prompt: "Run a one-off container that removes itself automatically when it exits.",
    answer: "docker run --rm alpine",
    explanation:
      "`--rm` deletes the container's filesystem when it exits — perfect for short-lived utility containers.",
  },
  {
    id: "docker-run-port",
    level: "pareto",
    category: "docker",
    prompt: "Publish container port 80 as host port 8080.",
    answer: "docker run -p 8080:80 nginx",
    explanation:
      "`-p HOST:CONTAINER` maps the ports: traffic to localhost:8080 reaches the container's port 80.",
  },
  {
    id: "docker-run-volume",
    level: "workflow",
    category: "docker",
    prompt: "Mount the host directory ./data into the container at /app.",
    answer: "docker run -v ./data:/app ubuntu",
    explanation:
      "`-v HOST:CONTAINER` bind-mounts a directory — files written in /app appear in ./data and survive container removal. The `./` matters: a bare name like `data:/app` would silently create a named volume instead.",
  },
  {
    id: "docker-run-name",
    level: "core",
    category: "docker",
    prompt: "Give the container a custom name, myapp, when starting it.",
    answer: "docker run --name myapp nginx",
    explanation:
      "Without `--name`, Docker assigns a random name. A custom name makes every later command (`docker stop myapp`) readable.",
  },
  {
    id: "docker-run-env",
    level: "workflow",
    category: "docker",
    prompt: "Set the environment variable ENV=prod when starting a container.",
    answer: "docker run -e ENV=prod nginx",
    explanation:
      "`-e` injects an environment variable. Most apps read their configuration from environment variables.",
  },
  {
    id: "docker-stop",
    level: "pareto",
    category: "docker",
    prompt: "Gracefully stop the running container myapp.",
    answer: "docker stop myapp",
    explanation:
      "`docker stop` sends SIGTERM so the app can shut down cleanly, then SIGKILL after a timeout.",
  },
  {
    id: "docker-start",
    level: "pareto",
    category: "docker",
    prompt: "Start the previously stopped container myapp again.",
    answer: "docker start myapp",
    explanation:
      "`docker start` restarts an existing container (as opposed to `docker run`, which creates a new one).",
  },
  {
    id: "docker-restart",
    level: "workflow",
    category: "docker",
    prompt: "Restart the container myapp.",
    answer: "docker restart myapp",
    explanation: "`docker restart` stops and starts the container — handy after a config change.",
  },
  {
    id: "docker-rm",
    level: "pareto",
    category: "docker",
    prompt: "Delete the stopped container myapp.",
    answer: "docker rm myapp",
    explanation:
      "`docker rm` removes a stopped container. For a running one you need `-f` (force).",
  },
  {
    id: "docker-rmi",
    level: "pareto",
    category: "docker",
    prompt: "Delete the nginx image from your machine.",
    answer: "docker rmi nginx",
    explanation:
      "`docker rmi` (remove image) frees disk space — it fails if a container still uses the image.",
  },
  {
    id: "docker-rm-force",
    level: "workflow",
    category: "docker",
    prompt: "Force-delete the running container myapp.",
    answer: "docker rm -f myapp",
    explanation: "`-f` kills and removes a running container in one step, bypassing the stopped-only rule.",
  },

  // ── Container lifecycle ───────────────────────────────────────────────────
  {
    id: "docker-exec",
    level: "pareto",
    category: "docker",
    prompt: "Run the command ls inside the running container myapp.",
    answer: "docker exec myapp ls",
    explanation:
      "`docker exec` runs a process inside an already-running container. It never works on stopped containers.",
  },
  {
    id: "docker-exec-it",
    level: "pareto",
    category: "docker",
    prompt: "Open an interactive shell inside the running container myapp.",
    answer: "docker exec -it myapp bash",
    explanation:
      "The classic debugging move: `-it` plus a shell command drops you into a prompt inside the container.",
  },
  {
    id: "docker-logs",
    level: "pareto",
    category: "docker",
    prompt: "See the logs printed by container myapp so far.",
    answer: "docker logs myapp",
    explanation: "`docker logs` shows everything the container wrote to stdout/stderr — the first debugging step.",
  },
  {
    id: "docker-logs-follow",
    level: "workflow",
    category: "docker",
    prompt: "Watch the logs of myapp live as they stream in.",
    answer: "docker logs -f myapp",
    explanation: "`-f` (follow) tails the log output, like `tail -f` — exit with Ctrl+c without stopping the container.",
  },
  {
    id: "docker-cp",
    level: "workflow",
    category: "docker",
    prompt: "Copy notes.txt from container myapp into the current directory.",
    answer: "docker cp myapp:/notes.txt .",
    explanation:
      "`docker cp CONTAINER:PATH DEST` copies files out of a container (and with the arguments flipped, back in).",
  },
  {
    id: "docker-stats",
    level: "workflow",
    category: "docker",
    prompt: "Watch live CPU and memory usage of all running containers.",
    answer: "docker stats",
    explanation:
      "`docker stats` shows a live dashboard of resource usage — the container equivalent of `top`.",
  },
  {
    id: "docker-top",
    level: "core",
    category: "docker",
    prompt: "Show the processes running inside container myapp.",
    answer: "docker top myapp",
    explanation: "`docker top` lists the container's processes as seen from the host — great for finding PID leaks.",
  },
  {
    id: "docker-port",
    level: "core",
    category: "docker",
    prompt: "Show the host port mappings of container myapp.",
    answer: "docker port myapp",
    explanation: "`docker port` prints which host ports map to which container ports for the container.",
  },
  {
    id: "docker-inspect",
    level: "core",
    category: "docker",
    prompt: "Show detailed low-level configuration of container myapp.",
    answer: "docker inspect myapp",
    explanation:
      "`docker inspect` dumps the full JSON metadata — IP address, mounts, env vars, and more.",
  },
  {
    id: "docker-attach",
    level: "core",
    category: "docker",
    prompt: "Re-attach your terminal to the main process of container myapp.",
    answer: "docker attach myapp",
    explanation:
      "`docker attach` connects your terminal to the container's main process — unlike `exec`, which starts a new one.",
  },
  {
    id: "docker-rename",
    level: "core",
    category: "docker",
    prompt: "Rename the container myapp to web.",
    answer: "docker rename myapp web",
    explanation: "`docker rename` changes a container's name without touching anything else.",
  },
  {
    id: "docker-commit",
    level: "workflow",
    category: "docker",
    prompt: "Save the current state of container myapp as an image named myapp:v1.",
    answer: "docker commit myapp myapp:v1",
    explanation:
      "`docker commit` snapshots a container's filesystem into an image. Prefer Dockerfiles in practice — but it's great for quick captures.",
  },

  // ── Building & registries ─────────────────────────────────────────────────
  {
    id: "docker-build",
    level: "pareto",
    category: "docker",
    prompt: "Build an image from the Dockerfile in the current directory.",
    answer: "docker build .",
    explanation:
      "`docker build` reads the Dockerfile in the build context (the `.`) and executes its instructions into layers.",
  },
  {
    id: "docker-build-tag",
    level: "pareto",
    category: "docker",
    prompt: "Build the current directory as an image tagged myapp:1.0.",
    answer: "docker build -t myapp:1.0 .",
    explanation: "`-t` tags the resulting image so you can reference and push it by name.",
  },
  {
    id: "docker-tag",
    level: "workflow",
    category: "docker",
    prompt: "Tag the image myapp:1.0 as registry.example.com/myapp:latest.",
    answer: "docker tag myapp:1.0 registry.example.com/myapp:latest",
    explanation:
      "`docker tag` creates an alias for an existing image — required before pushing to a specific registry.",
  },
  {
    id: "docker-push",
    level: "pareto",
    category: "docker",
    prompt: "Upload the image myapp:1.0 to its registry.",
    answer: "docker push myapp:1.0",
    explanation: "`docker push` sends the image layers to the registry — you must be logged in first.",
  },
  {
    id: "docker-history",
    level: "core",
    category: "docker",
    prompt: "Show the layer history of the nginx image.",
    answer: "docker history nginx",
    explanation:
      "`docker history` shows each build step and its size — useful for understanding and shrinking images.",
  },
  {
    id: "docker-save",
    level: "workflow",
    category: "docker",
    prompt: "Export the nginx image to a tar archive called nginx.tar.",
    answer: "docker save -o nginx.tar nginx",
    explanation:
      "`docker save` exports an image (with its metadata) to a file — the way to back up or transfer images offline.",
  },
  {
    id: "docker-load",
    level: "workflow",
    category: "docker",
    prompt: "Import the image stored in nginx.tar.",
    answer: "docker load -i nginx.tar",
    explanation: "`docker load` is the counterpart to `docker save` — it reads an image back from a tar file.",
  },
  {
    id: "docker-export",
    level: "core",
    category: "docker",
    prompt: "Export the filesystem of container myapp as myapp.tar.",
    answer: "docker export -o myapp.tar myapp",
    explanation:
      "`docker export` dumps a container's raw filesystem (no image metadata) — lighter than `save`, but not importable as a proper image without `import`.",
  },
  {
    id: "docker-import",
    level: "core",
    category: "docker",
    prompt: "Create an image from the filesystem tarball myapp.tar.",
    answer: "docker import myapp.tar myapp:imported",
    explanation: "`docker import` turns an exported filesystem back into an image with the tag you choose.",
  },
  {
    id: "docker-search",
    level: "core",
    category: "docker",
    prompt: "Search Docker Hub for images matching 'redis'.",
    answer: "docker search redis",
    explanation:
      "`docker search` queries the registry — official images are marked OFFICIAL, and you can narrow with `--filter stars=N`.",
  },

  // ── Dockerfile instructions ───────────────────────────────────────────────
  {
    id: "dockerfile-from",
    level: "core",
    category: "docker",
    prompt: "Start a Dockerfile by selecting the node:20 base image.",
    answer: "FROM node:20",
    explanation:
      "`FROM` declares the base image every other instruction builds on — it must be the first instruction in the file.",
  },
  {
    id: "dockerfile-run",
    level: "core",
    category: "docker",
    prompt: "Install dependencies while the image is being built.",
    answer: "RUN npm install",
    explanation:
      "`RUN` executes a command during the build and bakes the result into a new layer. It runs once, at build time.",
  },
  {
    id: "dockerfile-cmd",
    level: "core",
    category: "docker",
    prompt: "Set the default command a container runs on start.",
    answer: "CMD [\"npm\", \"start\"]",
    explanation:
      "`CMD` is the default command — users can override it by passing a command to `docker run`. The exec form (array) is preferred.",
  },
  {
    id: "dockerfile-entrypoint",
    level: "core",
    category: "docker",
    prompt: "Set the fixed executable the container always runs.",
    answer: "ENTRYPOINT [\"node\"]",
    explanation:
      "`ENTRYPOINT` defines the command that can't be overridden — anything passed on `docker run` becomes its arguments.",
  },
  {
    id: "dockerfile-copy",
    level: "core",
    category: "docker",
    prompt: "Copy the build context's contents into the image at /app.",
    answer: "COPY . /app",
    explanation: "`COPY` copies files from the build context into the image — preferred over `ADD` for plain file copies.",
  },
  {
    id: "dockerfile-workdir",
    level: "core",
    category: "docker",
    prompt: "Set the working directory for all following Dockerfile instructions.",
    answer: "WORKDIR /app",
    explanation: "`WORKDIR` changes the directory for RUN, CMD, and ENTRYPOINT — better than `RUN cd /app`.",
  },
  {
    id: "dockerfile-expose",
    level: "core",
    category: "docker",
    prompt: "Declare that the container listens on port 3000.",
    answer: "EXPOSE 3000",
    explanation:
      "`EXPOSE` is documentation (and metadata for tools) — the port still needs `-p` at `docker run` time to be reachable from the host.",
  },
  {
    id: "dockerfile-env",
    level: "core",
    category: "docker",
    prompt: "Set NODE_ENV=production as an environment variable in the image.",
    answer: "ENV NODE_ENV=production",
    explanation:
      "`ENV` sets environment variables at build time that persist into every container started from the image.",
  },
  {
    id: "dockerfile-user",
    level: "core",
    category: "docker",
    prompt: "Run the container as the non-root user node.",
    answer: "USER node",
    explanation:
      "`USER` switches the user for RUN/CMD/ENTRYPOINT. Running as non-root is a key container security practice.",
  },
  {
    id: "dockerfile-volume",
    level: "core",
    category: "docker",
    prompt: "Declare a volume mount point at /data.",
    answer: "VOLUME /data",
    explanation:
      "`VOLUME` creates an anonymous volume at that path, persisting writes even after the container is removed.",
  },
  {
    id: "dockerfile-arg",
    level: "core",
    category: "docker",
    prompt: "Declare a build-time variable named VERSION.",
    answer: "ARG VERSION",
    explanation:
      "`ARG` defines a variable available only during the build — set it with `--build-arg` on `docker build`.",
  },
  {
    id: "dockerfile-multistage",
    level: "core",
    category: "docker",
    prompt: "Copy the built app from an earlier build stage named builder.",
    answer: "COPY --from=builder /app/dist /app",
    explanation:
      "`COPY --from=STAGE` pulls artifacts from a previous stage — the pattern that lets you ship a small final image.",
  },

  // ── Compose ───────────────────────────────────────────────────────────────
  {
    id: "compose-up",
    level: "workflow",
    category: "docker",
    prompt: "Start all services defined in docker-compose.yml (in the foreground).",
    answer: "docker compose up",
    explanation:
      "`docker compose up` creates and starts every service and network defined in the compose file.",
    aliases: ["docker-compose up"],
  },
  {
    id: "compose-up-detached",
    level: "pareto",
    category: "docker",
    prompt: "Start all compose services in the background.",
    answer: "docker compose up -d",
    explanation: "Adding `-d` detaches — services keep running after the command returns.",
    aliases: ["docker-compose up -d"],
  },
  {
    id: "compose-down",
    level: "pareto",
    category: "docker",
    prompt: "Stop and remove all services and networks of the compose project.",
    answer: "docker compose down",
    explanation:
      "`docker compose down` tears the stack down; add `-v` to also delete the project's named volumes.",
    aliases: ["docker-compose down"],
  },
  {
    id: "compose-ps",
    level: "workflow",
    category: "docker",
    prompt: "List the services of the compose project and their status.",
    answer: "docker compose ps",
    explanation: "`docker compose ps` shows which services are running and their health — scoped to the project.",
    aliases: ["docker-compose ps"],
  },
  {
    id: "compose-logs",
    level: "workflow",
    category: "docker",
    prompt: "Follow the logs of all compose services as they stream.",
    answer: "docker compose logs -f",
    explanation: "`-f` tails every service's output into one interleaved stream — Ctrl+c stops following without stopping the stack.",
    aliases: ["docker-compose logs -f"],
  },
  {
    id: "compose-build",
    level: "workflow",
    category: "docker",
    prompt: "Build all images used by the compose file.",
    answer: "docker compose build",
    explanation: "`docker compose build` builds (or rebuilds) every service image defined in the file.",
    aliases: ["docker-compose build"],
  },
  {
    id: "compose-pull",
    level: "core",
    category: "docker",
    prompt: "Pull all images referenced by the compose file.",
    answer: "docker compose pull",
    explanation: "`docker compose pull` pre-fetches every image the stack needs — great before deploying on a slow connection.",
    aliases: ["docker-compose pull"],
  },
  {
    id: "compose-config",
    level: "core",
    category: "docker",
    prompt: "Validate the compose file and print the fully resolved config.",
    answer: "docker compose config",
    explanation:
      "`docker compose config` validates the YAML and prints the merged result — the first thing to check when services don't start.",
    aliases: ["docker-compose config"],
  },
  {
    id: "compose-exec",
    level: "workflow",
    category: "docker",
    prompt: "Open a shell in the web service of the compose project.",
    answer: "docker compose exec web bash",
    explanation:
      "`docker compose exec SERVICE COMMAND` runs in a service by name — no need to look up container IDs.",
    aliases: ["docker-compose exec web bash"],
  },
  {
    id: "compose-restart",
    level: "workflow",
    category: "docker",
    prompt: "Restart all services of the compose project.",
    answer: "docker compose restart",
    explanation: "`docker compose restart` cycles the services, keeping their containers and volumes intact.",
    aliases: ["docker-compose restart"],
  },

  // ── Networks & volumes ────────────────────────────────────────────────────
  {
    id: "docker-network-ls",
    level: "core",
    category: "docker",
    prompt: "List all Docker networks on the machine.",
    answer: "docker network ls",
    explanation:
      "`docker network ls` lists networks — `bridge` (default), `host`, `none`, plus any user-defined ones.",
  },
  {
    id: "docker-network-create",
    level: "workflow",
    category: "docker",
    prompt: "Create a network named mynet.",
    answer: "docker network create mynet",
    explanation:
      "User-defined networks give containers DNS-based name resolution — they can reach each other by name.",
  },
  {
    id: "docker-network-connect",
    level: "core",
    category: "docker",
    prompt: "Connect the running container myapp to the network mynet.",
    answer: "docker network connect mynet myapp",
    explanation: "`docker network connect` attaches a running container to an additional network on the fly.",
  },
  {
    id: "docker-network-disconnect",
    level: "core",
    category: "docker",
    prompt: "Disconnect container myapp from the network mynet.",
    answer: "docker network disconnect mynet myapp",
    explanation: "`docker network disconnect` removes the container from the network without stopping it.",
  },
  {
    id: "docker-network-inspect",
    level: "core",
    category: "docker",
    prompt: "Show detailed configuration of the network mynet.",
    answer: "docker network inspect mynet",
    explanation: "`docker network inspect` shows subnets, gateways, and which containers are attached.",
  },
  {
    id: "docker-network-prune",
    level: "core",
    category: "docker",
    prompt: "Delete all unused Docker networks.",
    answer: "docker network prune",
    explanation: "`docker network prune` removes networks no container is attached to — safe cleanup.",
  },
  {
    id: "docker-volume-ls",
    level: "core",
    category: "docker",
    prompt: "List all Docker volumes.",
    answer: "docker volume ls",
    explanation: "Volumes outlive containers — `docker volume ls` shows every named volume on the host.",
  },
  {
    id: "docker-volume-create",
    level: "core",
    category: "docker",
    prompt: "Create a named volume called data.",
    answer: "docker volume create data",
    explanation:
      "Named volumes are the recommended way to persist data — create one, then mount it with `-v data:/path`.",
  },
  {
    id: "docker-volume-inspect",
    level: "core",
    category: "docker",
    prompt: "Show where the volume data lives on the host.",
    answer: "docker volume inspect data",
    explanation: "`docker volume inspect` reveals the mount point — the actual files are stored on the host.",
  },
  {
    id: "docker-volume-rm",
    level: "core",
    category: "docker",
    prompt: "Delete the volume data.",
    answer: "docker volume rm data",
    explanation: "`docker volume rm` deletes the volume and its data — it fails if a container still uses it.",
  },
  {
    id: "docker-volume-prune",
    level: "core",
    category: "docker",
    prompt: "Delete all volumes not used by any container.",
    answer: "docker volume prune",
    explanation:
      "`docker volume prune` frees space from orphaned volumes — Docker prompts for confirmation by default.",
  },

  // ── System & cleanup ──────────────────────────────────────────────────────
  {
    id: "docker-system-df",
    level: "core",
    category: "docker",
    prompt: "Show how much disk space images, containers, and volumes use.",
    answer: "docker system df",
    explanation: "`docker system df` is the disk-usage dashboard for everything Docker stores.",
  },
  {
    id: "docker-system-prune",
    level: "workflow",
    category: "docker",
    prompt: "Remove all unused containers, networks, images, and build cache.",
    answer: "docker system prune -a",
    explanation:
      "`docker system prune -a` removes every unused resource — the nuclear cleanup. Without `-a` it only removes dangling (untagged) images; with `-a` it removes all unused images, tagged or not.",
  },
  {
    id: "docker-container-prune",
    level: "core",
    category: "docker",
    prompt: "Remove all stopped containers.",
    answer: "docker container prune",
    explanation: "`docker container prune` deletes every container in the exited state.",
  },
  {
    id: "docker-image-prune",
    level: "core",
    category: "docker",
    prompt: "Remove all dangling (untagged) images.",
    answer: "docker image prune",
    explanation:
      "`docker image prune` clears `<none>` images left behind by rebuilds — safe, they can be rebuilt.",
  },
  {
    id: "docker-builder-prune",
    level: "core",
    category: "docker",
    prompt: "Clear the Docker build cache.",
    answer: "docker builder prune",
    explanation: "`docker builder prune` empties the BuildKit cache when builds start eating disk.",
  },
  {
    id: "docker-version",
    level: "core",
    category: "docker",
    prompt: "Show both the Docker client and server versions.",
    answer: "docker version",
    explanation:
      "`docker version` prints client and daemon info — seeing both confirms the daemon is reachable.",
  },
  {
    id: "docker-info",
    level: "core",
    category: "docker",
    prompt: "Show system-wide Docker information.",
    answer: "docker info",
    explanation:
      "`docker info` reports the engine's configuration, storage driver, and resource limits.",
  },
  {
    id: "docker-login",
    level: "core",
    category: "docker",
    prompt: "Log in to a container registry.",
    answer: "docker login",
    explanation: "`docker login` authenticates against a registry (Docker Hub by default) so you can push private images.",
  },
];

export const regexQuestions: QuizQuestion[] = [
  // ── Anchors ───────────────────────────────────────────────────────────────
  {
    id: "regex-anchor-start",
    level: "pareto",
    category: "regex",
    prompt: "Match the start of a line.",
    answer: "^",
    explanation: "`^` anchors the match to the start of a line — everything before it is fixed.",
  },
  {
    id: "regex-anchor-end",
    level: "pareto",
    category: "regex",
    prompt: "Match the end of a line.",
    answer: "$",
    explanation: "`$` anchors the match to the end of a line — nothing can follow it.",
  },
  {
    id: "regex-word-boundary",
    level: "pareto",
    category: "regex",
    prompt: "Match a word boundary (where a word meets non-word characters).",
    answer: "\\b",
    explanation: "`\\b` matches between a word character and a non-word one — e.g. the edges of `cat` in `cat and scatter`.",
  },
  {
    id: "regex-not-word-boundary",
    level: "core",
    category: "regex",
    prompt: "Match a position that is NOT a word boundary.",
    answer: "\\B",
    explanation: "`\\B` is the opposite of `\\b` — it matches inside a word, like the gap between `c` and `a` in `cat`.",
  },
  {
    id: "regex-any-char",
    level: "pareto",
    category: "regex",
    prompt: "Match any single character except a newline.",
    answer: ".",
    explanation: "The dot matches any one character — the universal wildcard. Paired with `*` it matches anything.",
  },

  // ── Character classes & ranges ───────────────────────────────────────────
  {
    id: "regex-digit",
    level: "pareto",
    category: "regex",
    prompt: "Match a single digit (0–9).",
    answer: "\\d",
    explanation: "`\\d` is shorthand for the class `[0-9]` — one digit. `\\D` is any non-digit.",
  },
  {
    id: "regex-word-char",
    level: "pareto",
    category: "regex",
    prompt: "Match a single word character (letter, digit, or underscore).",
    answer: "\\w",
    explanation: "`\\w` covers `[A-Za-z0-9_]` — useful for matching identifiers and usernames.",
  },
  {
    id: "regex-whitespace",
    level: "pareto",
    category: "regex",
    prompt: "Match a single whitespace character (space, tab, newline).",
    answer: "\\s",
    explanation: "`\\s` matches space, tab, newline, carriage return, and form feed — `\\S` is any non-whitespace.",
  },
  {
    id: "regex-non-digit",
    level: "core",
    category: "regex",
    prompt: "Match any single character that is NOT a digit.",
    answer: "\\D",
    explanation: "`\\D` is the negated class `[^0-9]` — anything that isn't a digit.",
  },
  {
    id: "regex-class-set",
    level: "pareto",
    category: "regex",
    prompt: "Match exactly one of the characters a, b, or c.",
    answer: "[abc]",
    explanation: "Square brackets define a set — `[abc]` matches one of `a`, `b`, or `c`.",
  },
  {
    id: "regex-class-range",
    level: "pareto",
    category: "regex",
    prompt: "Match any lowercase letter from a to z.",
    answer: "[a-z]",
    explanation: "The dash inside a class creates a range — `[a-z]` matches any lowercase letter.",
  },
  {
    id: "regex-class-negated",
    level: "pareto",
    category: "regex",
    prompt: "Match any character EXCEPT the digits 0–9.",
    answer: "[^0-9]",
    explanation: "A `^` right after the opening bracket negates the class — `[^0-9]` matches anything that isn't a digit.",
  },
  {
    id: "regex-class-word",
    level: "core",
    category: "regex",
    prompt: "Match a letter or digit using an explicit class (not the `\\w` shorthand).",
    answer: "[A-Za-z0-9]",
    explanation: "This spells out `\\w`'s letters-and-digits part: `[A-Za-z0-9]`. Add `_` to match underscore too.",
  },

  // ── Quantifiers ──────────────────────────────────────────────────────────
  {
    id: "regex-quant-zero-or-more",
    level: "pareto",
    category: "regex",
    prompt: "Match the letter `a` zero or more times.",
    answer: "a*",
    explanation: "`*` means \"zero or more\" — `a*` matches ``, `a`, `aa`, `aaa`, and so on.",
  },
  {
    id: "regex-quant-one-or-more",
    level: "pareto",
    category: "regex",
    prompt: "Match the letter `a` one or more times.",
    answer: "a+",
    explanation: "`+` means \"one or more\" — `a+` needs at least one `a`, unlike `a*` which allows zero.",
  },
  {
    id: "regex-quant-optional",
    level: "pareto",
    category: "regex",
    prompt: "Match the letter `a` zero or one time (make it optional).",
    answer: "a?",
    explanation: "`?` means \"zero or one\" — `a?` matches `a` or nothing. Great for plural spellings like `colou?r`.",
  },
  {
    id: "regex-quant-exactly",
    level: "pareto",
    category: "regex",
    prompt: "Match exactly three digits in a row.",
    answer: "\\d{3}",
    explanation: "Braces set a count — `{3}` means exactly three of the previous element.",
  },
  {
    id: "regex-quant-range",
    level: "pareto",
    category: "regex",
    prompt: "Match between 2 and 4 lowercase letters.",
    answer: "[a-z]{2,4}",
    explanation: "`{2,4}` is a range quantifier — at least 2, at most 4. `{2,}` would mean \"2 or more\".",
  },
  {
    id: "regex-quant-lazy",
    level: "core",
    category: "regex",
    prompt: "Match as few characters as possible (a lazy match) with `a` repeated.",
    answer: "a*?",
    explanation: "Adding `?` after a quantifier makes it lazy — it matches as little as possible. `a*` is greedy by default.",
  },

  // ── Groups & alternation ─────────────────────────────────────────────────
  {
    id: "regex-group-capture",
    level: "pareto",
    category: "regex",
    prompt: "Capture `ab` as a numbered group so you can reference it later.",
    answer: "(ab)",
    explanation: "Parentheses group AND capture — `(ab)` becomes group 1, usable as `\\1` in the same pattern.",
  },
  {
    id: "regex-group-noncapture",
    level: "core",
    category: "regex",
    prompt: "Group `ab` WITHOUT capturing it (no backreference).",
    answer: "(?:ab)",
    explanation: "`(?:...)` groups for precedence or repetition but doesn't capture — avoids cluttering your group numbers.",
  },
  {
    id: "regex-alternation",
    level: "pareto",
    category: "regex",
    prompt: "Match either the word `cat` or the word `dog`.",
    answer: "cat|dog",
    explanation: "`|` is alternation (\"or\"). Parenthesize it — `(cat|dog)` — when it sits next to other tokens.",
  },
  {
    id: "regex-lookahead",
    level: "core",
    category: "regex",
    prompt: "Match `foo` only when it is immediately followed by `bar` (lookahead).",
    answer: "foo(?=bar)",
    explanation: "`(?=...)` is a positive lookahead — it checks the next characters without consuming them.",
  },
  {
    id: "regex-lookahead-neg",
    level: "core",
    category: "regex",
    prompt: "Match `foo` only when it is NOT followed by `bar`.",
    answer: "foo(?!bar)",
    explanation: "`(?!...)` is a negative lookahead — matches when the lookahead text is absent.",
  },
  {
    id: "regex-lookbehind",
    level: "core",
    category: "regex",
    prompt: "Match `foo` only when it is preceded by `bar` (lookbehind).",
    answer: "(?<=bar)foo",
    explanation: "`(?<=...)` is a positive lookbehind — the text before the match must be present, but isn't consumed.",
  },
  {
    id: "regex-backreference",
    level: "core",
    category: "regex",
    prompt: "Refer back to whatever group 1 matched, requiring it again.",
    answer: "\\1",
    explanation: "`\\1` repeats group 1's exact text — `(\\w+)\\1` matches doubled words like `hellohello`.",
  },

  // ── Escapes & literals ───────────────────────────────────────────────────
  {
    id: "regex-escape-dot",
    level: "pareto",
    category: "regex",
    prompt: "Match a literal period (not the any-character wildcard).",
    answer: "\\.",
    explanation: "The backslash escapes the dot's special meaning — `\\.` matches an actual period like in `file.txt`.",
  },
  {
    id: "regex-escape-backslash",
    level: "core",
    category: "regex",
    prompt: "Match a literal backslash character.",
    answer: "\\\\",
    explanation: "Escaping the escape — `\\\\` in the pattern is one literal backslash in the text.",
  },
  {
    id: "regex-escape-star",
    level: "core",
    category: "regex",
    prompt: "Match a literal asterisk (not the quantifier).",
    answer: "\\*",
    explanation: "`\\*` matches an actual `*` character — escape any special character to match it literally.",
  },
  {
    id: "regex-escape-plus",
    level: "core",
    category: "regex",
    prompt: "Match a literal plus sign (not the quantifier).",
    answer: "\\+",
    explanation: "`\\+` matches an actual `+` — like matching a phone number's plus prefix.",
  },
  {
    id: "regex-escape-tab",
    level: "core",
    category: "regex",
    prompt: "Match a tab character.",
    answer: "\\t",
    explanation: "`\\t` is the tab escape — handy when matching whitespace-sensitive output like CSV.",
  },
  {
    id: "regex-escape-newline",
    level: "core",
    category: "regex",
    prompt: "Match a newline character.",
    answer: "\\n",
    explanation: "`\\n` is the newline escape. Combine with `\\t` to match structured logs.",
  },

  // ── Common patterns ──────────────────────────────────────────────────────
  {
    id: "regex-pattern-email",
    level: "workflow",
    category: "regex",
    prompt: "Match a simple email address like alice@example.com.",
    answer: "\\w+@\\w+\\.\\w+",
    explanation:
      "`\\w+` before the `@`, a domain, and a TLD after the escaped dot. Real emails need more nuance, but this handles the common shape.",
  },
  {
    id: "regex-pattern-ipv4",
    level: "workflow",
    category: "regex",
    prompt: "Match an IPv4 address like 192.168.1.1.",
    answer: "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}",
    explanation:
      "Four numbers of 1–3 digits separated by escaped dots — the classic IPv4 shape. (It also matches 999.999.999.999; a stricter one caps each octet at 255.)",
  },
  {
    id: "regex-pattern-date",
    level: "workflow",
    category: "regex",
    prompt: "Match a date in YYYY-MM-DD format like 2026-08-07.",
    answer: "\\d{4}-\\d{2}-\\d{2}",
    explanation: "Four digits, dash, two digits, dash, two digits — the ISO date layout that sorts lexically.",
  },
  {
    id: "regex-pattern-time",
    level: "core",
    category: "regex",
    prompt: "Match a 24-hour time in HH:MM format like 23:59.",
    answer: "\\d{2}:\\d{2}",
    explanation: "Two digits, colon, two digits — matches times like 08:07 and 23:59.",
  },
  {
    id: "regex-pattern-hexcolor",
    level: "workflow",
    category: "regex",
    prompt: "Match a hex color like #a3f5c1 (6 hex digits after the hash).",
    answer: "#[0-9a-fA-F]{6}",
    explanation: "The `#` is literal, then exactly six hex digits — both cases covered via `a-fA-F`.",
  },
  {
    id: "regex-pattern-url",
    level: "workflow",
    category: "regex",
    prompt: "Match an http or https URL.",
    answer: "https?://\\S+",
    explanation: "`https?` makes the `s` optional, then the scheme, then any non-whitespace run — a quick way to snag URLs from text.",
  },
  {
    id: "regex-pattern-empty-line",
    level: "workflow",
    category: "regex",
    prompt: "Match a blank line (a line containing only whitespace).",
    answer: "^\\s*$",
    explanation: "Start, zero or more whitespace, end — catches truly empty lines and ones full of spaces/tabs.",
  },
  {
    id: "regex-pattern-username",
    level: "workflow",
    category: "regex",
    prompt: "Match a username of 3–16 lowercase letters, digits, or underscores.",
    answer: "[a-z0-9_]{3,16}",
    explanation: "A character class scoped to allowed symbols, constrained by the `{3,16}` range quantifier.",
  },
  {
    id: "regex-pattern-decimal",
    level: "workflow",
    category: "regex",
    prompt: "Match a decimal number with a fractional part like 3.14.",
    answer: "\\d+\\.\\d+",
    explanation: "Digits, escaped dot, digits — matches 3.14 but not an integer like 42 (which has no dot).",
  },
  {
    id: "regex-escape-hex",
    level: "core",
    category: "regex",
    prompt: "Match the character with hex code 41 (the letter A).",
    answer: "\\x41",
    explanation: "`\\xHH` matches the character with that hex code — `\\x41` is the letter A. Useful for tricky control characters.",
  },
  {
    id: "regex-flag-global",
    level: "pareto",
    category: "regex",
    prompt: "In JavaScript, find every match instead of stopping at the first one.",
    answer: "g",
    explanation: "The `g` (global) flag makes the regex keep searching after the first match instead of stopping.",
  },
  {
    id: "regex-flag-case-insensitive",
    level: "pareto",
    category: "regex",
    prompt: "Make a regex match letters case-insensitively.",
    answer: "i",
    explanation: "The `i` (ignore case) flag lets `abc` match `ABC`, `Abc`, and `aBc`.",
  },
  {
    id: "regex-flag-multiline",
    level: "core",
    category: "regex",
    prompt: "Make `^` and `$` match at every line, not just the string's ends.",
    answer: "m",
    explanation: "The `m` (multiline) flag re-anchors `^` and `$` to each line boundary in the input.",
  },
  {
    id: "regex-flag-dotall",
    level: "core",
    category: "regex",
    prompt: "Make the dot match newlines too, not just other characters.",
    answer: "s",
    explanation: "The `s` (dotall) flag lets `.` match newline characters — handy when scraping multi-line blocks.",
  },
  {
    id: "regex-anchor-optional-group",
    level: "core",
    category: "regex",
    prompt: "Match `co` plus an optional `l`, so both `color` and `colour` match.",
    answer: "colou?r",
    explanation: "The `?` makes the `u` optional — `colou?r` matches `color` and `colour`. Quantifiers apply to whatever precedes them.",
  },
  {
    id: "regex-anchor-greedy-contrast",
    level: "workflow",
    category: "regex",
    prompt: "Match the content between two quotes, stopping at the first closing quote.",
    answer: "\"[^\"]*\"",
    aliases: ["\".*?\""],
    explanation:
      "Two ways to stop early: a lazy quantifier `\".*?\"` grabs as little as possible, while the negated class `[^\"]*` matches non-quotes only — both stop at the first closing quote.",
  },
  {
    id: "regex-replace-groups",
    level: "workflow",
    category: "regex",
    prompt: "In a sed replacement, reference the text captured by the first group.",
    answer: "\\1",
    explanation: "In `s/pattern/replacement/`, `\\1` in the replacement side refers to group 1 from the pattern — e.g. `s/(\\w+)@(\\w+)/\\2.\\1/`.",
  },
  {
    id: "regex-escape-special-set",
    level: "core",
    category: "regex",
    prompt: "Match a literal opening parenthesis.",
    answer: "\\(",
    explanation: "Parentheses are special, so escape them: `\\(` matches a literal `(`. In many flavors you escape the closing one too.",
  },
  {
    id: "regex-anchor-start-end-full",
    level: "core",
    category: "regex",
    prompt: "Match a whole line consisting of only the word `yes`.",
    answer: "^yes$",
    explanation: "Anchoring both ends forces the match to consume the entire line — no extra characters allowed around `yes`.",
  },
];

export const sshQuestions: QuizQuestion[] = [
  {
    id: "ssh-connect",
    level: "pareto",
    category: "ssh",
    prompt: "Connect to the host `example.com` as user `alice`.",
    answer: "ssh alice@example.com",
    explanation:
      "`ssh user@host` opens an encrypted shell. The `user@` prefix picks the login name; without it SSH uses your local username.",
  },
  {
    id: "ssh-port",
    level: "pareto",
    category: "ssh",
    prompt: "Connect to `example.com` as `alice` over port `2222`.",
    answer: "ssh -p 2222 alice@example.com",
    explanation:
      "`-p` sets the port to connect to when the server doesn't listen on 22. Watch the case: ssh uses lowercase `-p`, scp uses uppercase `-P`.",
  },
  {
    id: "ssh-l",
    level: "core",
    category: "ssh",
    prompt: "Connect to `example.com`, logging in as user `bob`.",
    answer: "ssh -l bob example.com",
    explanation:
      "`-l` is the flag form of the `user@` syntax — `ssh -l bob example.com` is equivalent to `ssh bob@example.com`.",
    aliases: ["ssh bob@example.com"],
  },
  {
    id: "ssh-command",
    level: "pareto",
    category: "ssh",
    prompt: "Run the command `uptime` on `example.com` and print its output, without opening an interactive shell.",
    answer: "ssh example.com uptime",
    explanation:
      "Anything after the host is run as a single remote command — SSH executes it and exits instead of giving you a shell.",
  },
  {
    id: "ssh-verbose",
    level: "core",
    category: "ssh",
    prompt: "Connect to `example.com` with verbose output to debug a failing connection.",
    answer: "ssh -v alice@example.com",
    explanation:
      "`-v` prints connection debug info; adding more `v`s (`-vv`, `-vvv`) gives progressively more detail.",
    aliases: ["ssh -vv alice@example.com", "ssh -vvv alice@example.com"],
  },
  {
    id: "ssh-identity",
    level: "pareto",
    category: "ssh",
    prompt: "Connect to `example.com` as `alice` using the private key at `~/.ssh/deploy`.",
    answer: "ssh -i ~/.ssh/deploy alice@example.com",
    explanation:
      "`-i` points SSH at a specific private key instead of trying the default names like `id_ed25519`.",
  },
  {
    id: "ssh-config-alias",
    level: "pareto",
    category: "ssh",
    prompt: "Connect to the host defined as `myserver` in your SSH config file.",
    answer: "ssh myserver",
    explanation:
      "SSH resolves bare names against `~/.ssh/config` `Host` blocks, so an alias turns a long command into a short one.",
  },
  {
    id: "ssh-jump",
    level: "workflow",
    category: "ssh",
    prompt: "Connect to `internal.example.com` as `alice`, hopping through the jump host `bastion.example.com`.",
    answer: "ssh -J bastion.example.com alice@internal.example.com",
    explanation:
      "`-J` chains through a jump host when the target is only reachable from inside a network.",
  },
  {
    id: "ssh-tty",
    level: "workflow",
    category: "ssh",
    prompt: "Run `top` on `example.com` with a pseudo-terminal so its interactive UI works.",
    answer: "ssh -t example.com top",
    explanation:
      "`-t` forces a pseudo-terminal — full-screen programs like `top` and `vim` need one even when you pass a command.",
  },
  {
    id: "ssh-options",
    level: "core",
    category: "ssh",
    prompt: "Connect to `example.com` and skip the host-key prompt for this session only, using a one-off option.",
    answer: "ssh -o StrictHostKeyChecking=no alice@example.com",
    explanation:
      "`-o` sets any ssh option on the command line. `StrictHostKeyChecking=no` bypasses the host-key check for this connection.",
  },
  {
    id: "ssh-keygen",
    level: "pareto",
    category: "ssh",
    prompt: "Generate a new SSH key pair with the default settings.",
    answer: "ssh-keygen",
    explanation:
      "`ssh-keygen` walks you through creating a private/public key pair, asking where to save it and whether to add a passphrase.",
  },
  {
    id: "ssh-keygen-ed25519",
    level: "pareto",
    category: "ssh",
    prompt: "Generate an SSH key pair using the modern `ed25519` algorithm.",
    answer: "ssh-keygen -t ed25519",
    explanation:
      "`-t` selects the algorithm. Ed25519 is the modern recommendation: strong, fast, and short keys.",
  },
  {
    id: "ssh-keygen-rsa",
    level: "core",
    category: "ssh",
    prompt: "Generate an RSA SSH key pair with 4096-bit keys.",
    answer: "ssh-keygen -t rsa -b 4096",
    explanation:
      "`-t` picks the algorithm and `-b` the key size — `rsa` with 4096 bits for maximum compatibility.",
  },
  {
    id: "ssh-keygen-passphrase",
    level: "workflow",
    category: "ssh",
    prompt: "Add or change the passphrase protecting your existing private key.",
    answer: "ssh-keygen -p",
    explanation:
      "`-p` re-encrypts a private key with a new passphrase — or removes the passphrase if you leave it blank.",
  },
  {
    id: "ssh-keygen-file",
    level: "workflow",
    category: "ssh",
    prompt: "Generate an ed25519 key pair and save it as `~/.ssh/deploy` instead of the default name.",
    answer: "ssh-keygen -t ed25519 -f ~/.ssh/deploy",
    explanation:
      "`-f` sets the output file. SSH writes the private key to `~/.ssh/deploy` and the public key to `~/.ssh/deploy.pub`.",
  },
  {
    id: "ssh-keygen-comment",
    level: "workflow",
    category: "ssh",
    prompt: "Generate an ed25519 key pair with the comment `deploy key` so you can tell it apart later.",
    answer: "ssh-keygen -t ed25519 -C \"deploy key\"",
    explanation:
      "`-C` sets the comment stored in the public key — handy when you upload many keys to a server or GitHub.",
  },
  {
    id: "ssh-keygen-pub",
    level: "workflow",
    category: "ssh",
    prompt: "Print the public key that corresponds to your private key `~/.ssh/id_ed25519`.",
    answer: "ssh-keygen -y -f ~/.ssh/id_ed25519",
    explanation:
      "`-y` derives and prints the public key from the private key — useful when you lost the `.pub` file.",
  },
  {
    id: "ssh-keygen-fingerprint",
    level: "workflow",
    category: "ssh",
    prompt: "Print the fingerprint of the public key `~/.ssh/id_ed25519.pub`.",
    answer: "ssh-keygen -lf ~/.ssh/id_ed25519.pub",
    explanation:
      "`-l` prints the fingerprint — the short checksum you compare to confirm a key is what you expect.",
  },
  {
    id: "ssh-copy-id",
    level: "pareto",
    category: "ssh",
    prompt: "Install your public key on `example.com` so you can log in without a password.",
    answer: "ssh-copy-id alice@example.com",
    explanation:
      "`ssh-copy-id` appends your public key to the server's `~/.ssh/authorized_keys` for that account.",
  },
  {
    id: "ssh-authorized-keys",
    level: "pareto",
    category: "ssh",
    prompt: "Name the file on the server where you append public keys allowed to log in.",
    answer: "~/.ssh/authorized_keys",
    explanation:
      "Each line of `authorized_keys` in a user's home directory is a public key trusted to authenticate as that user.",
  },
  {
    id: "ssh-known-hosts",
    level: "pareto",
    category: "ssh",
    prompt: "Name the local file where SSH remembers the host keys of servers you've connected to.",
    answer: "~/.ssh/known_hosts",
    explanation:
      "SSH stores each server's host key in `known_hosts` after first connect, so it can warn you if a key changes later.",
  },
  {
    id: "ssh-keyscan",
    level: "core",
    category: "ssh",
    prompt: "Fetch the public host key of `example.com` without opening a session.",
    answer: "ssh-keyscan example.com",
    explanation:
      "`ssh-keyscan` probes a host and prints its host keys — useful for pre-populating `known_hosts` in scripts.",
  },
  {
    id: "ssh-keygen-remove-host",
    level: "workflow",
    category: "ssh",
    prompt: "Remove `example.com` from your known_hosts after its host key changed.",
    answer: "ssh-keygen -R example.com",
    explanation:
      "`-R` deletes a host's entry from known_hosts — the fix for the scary \"REMOTE HOST IDENTIFICATION HAS CHANGED\" warning.",
  },
  {
    id: "ssh-agent-start",
    level: "pareto",
    category: "ssh",
    prompt: "Start the ssh-agent so you can load keys into it.",
    answer: "eval $(ssh-agent)",
    aliases: ["eval \"$(ssh-agent -s)\""],
    explanation:
      "`ssh-agent` prints environment variables that tell `ssh-add` where the agent lives; `eval` applies them to your current shell (macOS users often see `eval \"$(ssh-agent -s)\"`). On macOS this often already runs.",
  },
  {
    id: "ssh-add",
    level: "pareto",
    category: "ssh",
    prompt: "Load your default private key (`~/.ssh/id_ed25519` or `id_rsa`) into the agent.",
    answer: "ssh-add",
    explanation:
      "`ssh-add` with no arguments adds your default identity files to the running agent, prompting for passphrases.",
  },
  {
    id: "ssh-add-key",
    level: "core",
    category: "ssh",
    prompt: "Load the private key `~/.ssh/deploy` into the agent.",
    answer: "ssh-add ~/.ssh/deploy",
    explanation:
      "Pass a path to `ssh-add` to load a specific key instead of the defaults.",
  },
  {
    id: "ssh-add-list",
    level: "core",
    category: "ssh",
    prompt: "List all the keys currently loaded in your ssh-agent.",
    answer: "ssh-add -l",
    aliases: ["ssh-add -L"],
    explanation:
      "`-l` lists the fingerprints of every key the agent holds; `-L` prints the full public keys instead.",
  },
  {
    id: "ssh-add-clear",
    level: "core",
    category: "ssh",
    prompt: "Remove all keys from the ssh-agent.",
    answer: "ssh-add -D",
    explanation:
      "`-D` deletes every key from the agent — the quick way to forget your credentials.",
  },
  {
    id: "ssh-add-timeout",
    level: "core",
    category: "ssh",
    prompt: "Load `~/.ssh/id_ed25519` into the agent, set to expire after 1 hour (3600 seconds).",
    answer: "ssh-add -t 3600 ~/.ssh/id_ed25519",
    explanation:
      "`-t` sets a lifetime in seconds — after it elapses the agent forgets the key, a nice security default.",
  },
  {
    id: "ssh-agent-forward",
    level: "workflow",
    category: "ssh",
    prompt: "Connect to `example.com` and let the remote host use your local agent's keys (agent forwarding).",
    answer: "ssh -A alice@example.com",
    explanation:
      "Uppercase `-A` forwards your agent to the remote host, so nested hops don't need your private key. Forward only to hosts you trust.",
  },
  {
    id: "ssh-agent-disable",
    level: "core",
    category: "ssh",
    prompt: "Connect to `example.com` with agent forwarding explicitly disabled.",
    answer: "ssh -a alice@example.com",
    explanation:
      "Lowercase `-a` turns agent forwarding off — the safe default when you don't need it.",
  },
  {
    id: "ssh-tunnel-local",
    level: "workflow",
    category: "ssh",
    prompt: "Tunnel local port `8080` on your machine to port `80` on `example.com` (local forwarding).",
    answer: "ssh -L 8080:localhost:80 alice@example.com",
    explanation:
      "`-L local:host:remote` forwards your local port through the SSH tunnel to the target. `localhost:80` is resolved on the remote side.",
  },
  {
    id: "ssh-tunnel-remote",
    level: "workflow",
    category: "ssh",
    prompt: "Expose your local port `3000` on `example.com`'s port `8080` so others can reach it (remote forwarding).",
    answer: "ssh -R 8080:localhost:3000 alice@example.com",
    explanation:
      "`-R` reverses the tunnel: the remote machine listens on `8080` and forwards traffic back to your local `3000`.",
  },
  {
    id: "ssh-tunnel-dynamic",
    level: "workflow",
    category: "ssh",
    prompt: "Set up a SOCKS proxy on local port `1080` routed through `example.com` (dynamic forwarding).",
    answer: "ssh -D 1080 alice@example.com",
    explanation:
      "`-D` creates a SOCKS5 proxy — point your browser at `localhost:1080` and all traffic rides the tunnel.",
  },
  {
    id: "ssh-tunnel-noexec",
    level: "workflow",
    category: "ssh",
    prompt: "Open a tunnel to `example.com` without starting a remote shell.",
    answer: "ssh -N -L 8080:localhost:80 alice@example.com",
    explanation:
      "`-N` tells SSH not to execute a remote command — the connection exists purely for port forwarding.",
  },
  {
    id: "ssh-tunnel-background",
    level: "workflow",
    category: "ssh",
    prompt: "Open a tunnel to `example.com` and run it in the background so you keep your terminal.",
    answer: "ssh -f -N -L 8080:localhost:80 alice@example.com",
    explanation:
      "`-f` backgrounds the connection after authentication, so the tunnel survives while your terminal stays free.",
  },
  {
    id: "ssh-x11",
    level: "core",
    category: "ssh",
    prompt: "Connect to `example.com` with X11 forwarding so remote GUI apps can display locally.",
    answer: "ssh -X alice@example.com",
    explanation:
      "`-X` forwards the X11 display, letting graphical programs on the remote host render on your local screen.",
  },
  {
    id: "ssh-escape-exit",
    level: "workflow",
    category: "ssh",
    prompt: "Force-close a stuck SSH session by typing the escape sequence.",
    answer: "~.",
    explanation:
      "Typing `~.` (tilde then dot) as the first characters at a prompt closes the SSH connection — the escape hatch when a session hangs.",
  },
  {
    id: "scp-put",
    level: "pareto",
    category: "ssh",
    prompt: "Copy the local file `notes.txt` to `alice@example.com`'s home directory.",
    answer: "scp notes.txt alice@example.com:~/",
    explanation:
      "scp mirrors cp's syntax: source first, then `user@host:path`. The `~` refers to the remote user's home.",
  },
  {
    id: "scp-get",
    level: "pareto",
    category: "ssh",
    prompt: "Copy the remote file `/etc/nginx.conf` from `alice@example.com` into the current directory.",
    answer: "scp alice@example.com:/etc/nginx.conf .",
    explanation:
      "To fetch, put the remote path first and a local destination last — `.` means the current directory.",
  },
  {
    id: "scp-recursive",
    level: "pareto",
    category: "ssh",
    prompt: "Copy the whole directory `public/` from your machine to `alice@example.com`, including subdirectories.",
    answer: "scp -r public/ alice@example.com:~/",
    explanation:
      "`-r` makes scp recurse into directories — without it you can only copy individual files.",
  },
  {
    id: "scp-port",
    level: "core",
    category: "ssh",
    prompt: "Copy `backup.tar` to `alice@example.com` whose SSH server listens on port `2222`.",
    answer: "scp -P 2222 backup.tar alice@example.com:~/",
    explanation:
      "Watch the case: scp uses uppercase `-P` for the port, while ssh uses lowercase `-p`. A classic gotcha.",
  },
  {
    id: "sftp-session",
    level: "pareto",
    category: "ssh",
    prompt: "Start an interactive sftp session with `alice@example.com`.",
    answer: "sftp alice@example.com",
    explanation:
      "sftp is an interactive file-transfer shell built on SSH — type `help` for its commands (`get`, `put`, `ls`, `cd`).",
  },
  {
    id: "sftp-get",
    level: "core",
    category: "ssh",
    prompt: "Inside an sftp session, download the remote file `notes.txt`.",
    answer: "get notes.txt",
    explanation:
      "In the sftp shell, `get` downloads a remote file to your current local directory; `put` does the reverse.",
  },
  {
    id: "sftp-put",
    level: "core",
    category: "ssh",
    prompt: "Inside an sftp session, upload your local file `report.pdf`.",
    answer: "put report.pdf",
    explanation:
      "`put` uploads a local file to the remote working directory — the mirror image of `get`.",
  },
  {
    id: "ssh-config-file",
    level: "core",
    category: "ssh",
    prompt: "Name the per-user file where SSH host aliases and options are defined.",
    answer: "~/.ssh/config",
    explanation:
      "SSH reads `~/.ssh/config` before every connection. `Host` blocks define aliases; options below them apply to matching hosts.",
  },
  {
    id: "ssh-config-host",
    level: "core",
    category: "ssh",
    prompt: "In `~/.ssh/config`, start a block that aliases `myserver` to `example.com`.",
    answer: "Host myserver",
    explanation:
      "`Host` names the alias — from then on `ssh myserver` works. Options indented below it apply to that host.",
    aliases: ["host myserver"],
  },
  {
    id: "ssh-config-hostname",
    level: "core",
    category: "ssh",
    prompt: "In the `myserver` block, set the real hostname to `example.com`.",
    answer: "HostName example.com",
    explanation:
      "`HostName` is the actual address a `Host` alias points at — hostname or IP.",
    aliases: ["hostname example.com"],
  },
  {
    id: "ssh-config-user",
    level: "core",
    category: "ssh",
    prompt: "In the `myserver` block, default the login user to `alice`.",
    answer: "User alice",
    explanation:
      "`User` sets the login name for the block, so you don't type `alice@` every time.",
    aliases: ["user alice"],
  },
  {
    id: "ssh-config-port",
    level: "core",
    category: "ssh",
    prompt: "In the `myserver` block, connect on port `2222` by default.",
    answer: "Port 2222",
    explanation:
      "`Port` overrides the default 22 for that block — handy for servers on non-standard ports.",
    aliases: ["port 2222"],
  },
  {
    id: "ssh-config-identity",
    level: "core",
    category: "ssh",
    prompt: "In the `myserver` block, always use the key `~/.ssh/deploy`.",
    answer: "IdentityFile ~/.ssh/deploy",
    explanation:
      "`IdentityFile` points SSH at a specific private key for the block — the config equivalent of `-i`.",
    aliases: ["identityfile ~/.ssh/deploy"],
  },
  {
    id: "ssh-config-preview",
    level: "workflow",
    category: "ssh",
    prompt: "Print the effective config SSH would use for `myserver`, without connecting.",
    answer: "ssh -G myserver",
    explanation:
      "`-G` makes ssh dump the resolved configuration for a host and exit — great for debugging config blocks.",
  },
  {
    id: "ssh-hardening-password",
    level: "core",
    category: "ssh",
    prompt: "In `sshd_config`, disable password authentication so only keys work.",
    answer: "PasswordAuthentication no",
    explanation:
      "Server-side setting in `/etc/ssh/sshd_config` — with it off, only key authentication is accepted. Restart sshd after editing.",
    aliases: ["passwordauthentication no"],
  },
  {
    id: "ssh-hardening-root",
    level: "core",
    category: "ssh",
    prompt: "In `sshd_config`, forbid direct root logins over SSH.",
    answer: "PermitRootLogin no",
    explanation:
      "Blocks root from logging in directly — you log in as a normal user and `sudo` instead.",
    aliases: ["permitrootlogin no"],
  },
];

export const kubernetesQuestions: QuizQuestion[] = [
  // ── Cluster & context ────────────────────────────────────────────────────
  {
    id: "k8s-cluster-info",
    level: "core",
    category: "kubernetes",
    prompt: "Show basic info about the cluster you're talking to.",
    answer: "kubectl cluster-info",
    explanation:
      "Prints the control-plane and CoreDNS service endpoints — a quick sanity check that your context points somewhere real.",
  },
  {
    id: "k8s-version",
    level: "core",
    category: "kubernetes",
    prompt: "Print the kubectl client version and the server version.",
    answer: "kubectl version",
    explanation: "Shows Client Version and Server Version (server comes from the API).",
  },
  {
    id: "k8s-nodes",
    level: "pareto",
    category: "kubernetes",
    prompt: "List all nodes in the cluster.",
    answer: "kubectl get nodes",
    explanation:
      "Each row is a node with its status (Ready/NotReady) and the kubelet/Kubernetes versions running on it.",
  },
  {
    id: "k8s-nodes-wide",
    level: "core",
    category: "kubernetes",
    prompt: "List nodes with extra details like internal IP and OS image.",
    answer: "kubectl get nodes -o wide",
    explanation:
      "The `-o wide` output adds the node's IPs, OS, kernel, and container runtime to the default table.",
  },
  {
    id: "k8s-current-context",
    level: "core",
    category: "kubernetes",
    prompt: "Show the name of the cluster context you're currently using.",
    answer: "kubectl config current-context",
    explanation:
      "A context bundles a cluster, a user, and a namespace. This prints which one kubectl is pointed at right now.",
  },
  {
    id: "k8s-contexts",
    level: "core",
    category: "kubernetes",
    prompt: "List every context defined in your kubeconfig.",
    answer: "kubectl config get-contexts",
    explanation:
      "Shows all saved contexts with their cluster and user. The current one is marked with an asterisk.",
  },
  {
    id: "k8s-use-context",
    level: "core",
    category: "kubernetes",
    prompt: "Switch to the `dev` context.",
    answer: "kubectl config use-context dev",
    explanation:
      "Permanently switches which cluster/user kubectl talks to until you switch back.",
  },
  {
    id: "k8s-context-namespace",
    level: "core",
    category: "kubernetes",
    prompt: "Make `prod` the default namespace for the `dev` context.",
    answer: "kubectl config set-context dev --namespace=prod",
    explanation:
      "Updates the context in place so every future kubectl call in that context targets the `prod` namespace by default.",
  },
  {
    id: "k8s-pods",
    level: "pareto",
    category: "kubernetes",
    prompt: "List the pods in the current namespace.",
    answer: "kubectl get pods",
    explanation:
      "The workhorse listing command — shows name, ready state, status, restarts, and age of each pod.",
  },
  {
    id: "k8s-pods-all",
    level: "pareto",
    category: "kubernetes",
    prompt: "List pods across all namespaces.",
    answer: "kubectl get pods -A",
    explanation:
      "`-A` (alias for `--all-namespaces`) lists every pod in every namespace — essential for finding things cluster-wide.",
    aliases: ["kubectl get pods --all-namespaces"],
  },
  {
    id: "k8s-pod-yaml",
    level: "core",
    category: "kubernetes",
    prompt: "Show the full YAML definition of the pod `my-pod`.",
    answer: "kubectl get pod my-pod -o yaml",
    explanation:
      "Dumps the live object as YAML, including spec, status, and the final values the API server stored.",
  },
  {
    id: "k8s-pod-describe",
    level: "pareto",
    category: "kubernetes",
    prompt: "Get a detailed human-readable summary of `my-pod`, including events.",
    answer: "kubectl describe pod my-pod",
    explanation:
      "`describe` is the first stop when a pod won't start — it shows container states, conditions, and recent events.",
  },
  {
    id: "k8s-logs",
    level: "pareto",
    category: "kubernetes",
    prompt: "Print the logs of the pod `my-pod`.",
    answer: "kubectl logs my-pod",
    explanation:
      "Fetches stdout/stderr of the pod's (first) container. For multi-container pods add `-c <container>`.",
  },
  {
    id: "k8s-logs-follow",
    level: "pareto",
    category: "kubernetes",
    prompt: "Stream the logs of `my-pod` live, like `tail -f`.",
    answer: "kubectl logs -f my-pod",
    explanation:
      "`-f` (follow) keeps the stream open and prints new log lines as they're written — great for watching a deploy.",
  },
  {
    id: "k8s-logs-container",
    level: "workflow",
    category: "kubernetes",
    prompt: "Print the logs of the `sidecar` container inside `my-pod`.",
    answer: "kubectl logs my-pod -c sidecar",
    explanation:
      "Use `-c` to pick a specific container when a pod runs several of them.",
  },
  {
    id: "k8s-logs-previous",
    level: "workflow",
    category: "kubernetes",
    prompt: "See the logs from `my-pod`'s previous (crashed) container instance.",
    answer: "kubectl logs my-pod --previous",
    explanation:
      "`--previous` shows the logs of the last incarnation of the container — the classic way to see a crash loop's final output.",
  },
  {
    id: "k8s-exec",
    level: "pareto",
    category: "kubernetes",
    prompt: "Open an interactive bash shell inside `my-pod`.",
    answer: "kubectl exec -it my-pod -- bash",
    explanation:
      "`-i` keeps stdin open, `-t` allocates a TTY, and `--` separates kubectl flags from the command run in the container.",
  },
  {
    id: "k8s-exec-command",
    level: "workflow",
    category: "kubernetes",
    prompt: "Run a one-off command, `ls /app`, inside `my-pod` without a shell.",
    answer: "kubectl exec my-pod -- ls /app",
    explanation:
      "Everything after `--` executes inside the pod. No `-it` needed when you just want the output of a single command.",
  },
  {
    id: "k8s-run",
    level: "pareto",
    category: "kubernetes",
    prompt: "Imperatively launch a workload named `web` from the `nginx` image.",
    answer: "kubectl run web --image=nginx",
    explanation:
      "A quick imperative way to launch a workload from an image — in modern kubectl this creates a Deployment, not a bare pod.",
  },
  {
    id: "k8s-delete-pod",
    level: "pareto",
    category: "kubernetes",
    prompt: "Delete the pod `my-pod`.",
    answer: "kubectl delete pod my-pod",
    explanation:
      "Deletes the pod gracefully. If it's owned by a Deployment, the controller immediately recreates it.",
  },
  {
    id: "k8s-delete-force",
    level: "workflow",
    category: "kubernetes",
    prompt: "Force-delete `my-pod` immediately, skipping the graceful grace period.",
    answer: "kubectl delete pod my-pod --force --grace-period=0",
    explanation:
      "Nukes the pod without waiting — useful when it's stuck in Terminating. Use sparingly.",
  },
  {
    id: "k8s-port-forward",
    level: "pareto",
    category: "kubernetes",
    prompt: "Forward local port `8080` to `my-pod`'s port `80`.",
    answer: "kubectl port-forward my-pod 8080:80",
    explanation:
      "Tunnels localhost:8080 to the pod's port 80 — handy for reaching a pod that has no Service yet.",
  },
  {
    id: "k8s-cp",
    level: "workflow",
    category: "kubernetes",
    prompt: "Copy the file `/tmp/notes.txt` out of `my-pod` to your current directory.",
    answer: "kubectl cp my-pod:/tmp/notes.txt ./notes.txt",
    explanation:
      "`kubectl cp` copies files between your machine and a pod using `pod:path` syntax, like `scp`.",
  },
  // ── Workloads & rollouts ─────────────────────────────────────────────────
  {
    id: "k8s-create-deployment",
    level: "pareto",
    category: "kubernetes",
    prompt: "Create a Deployment named `web` running the `nginx` image.",
    answer: "kubectl create deployment web --image=nginx",
    explanation:
      "Scaffolds a Deployment with one replica. The Deployment controller keeps that many pods running.",
  },
  {
    id: "k8s-get-deployments",
    level: "pareto",
    category: "kubernetes",
    prompt: "List the Deployments in the current namespace.",
    answer: "kubectl get deployments",
    explanation:
      "Shows desired vs. current replicas, how many are up-to-date/available, and the age of each Deployment.",
  },
  {
    id: "k8s-get-replicasets",
    level: "core",
    category: "kubernetes",
    prompt: "List the ReplicaSets in the current namespace.",
    answer: "kubectl get rs",
    explanation:
      "ReplicaSets (short `rs`) are the controllers that actually hold the pod replicas; Deployments manage them.",
  },
  {
    id: "k8s-get-statefulsets",
    level: "core",
    category: "kubernetes",
    prompt: "List the StatefulSets in the current namespace.",
    answer: "kubectl get statefulsets",
    explanation:
      "StatefulSets give pods stable identity and stable storage — for databases and clustered apps.",
  },
  {
    id: "k8s-get-daemonsets",
    level: "core",
    category: "kubernetes",
    prompt: "List the DaemonSets in the current namespace.",
    answer: "kubectl get daemonsets",
    explanation:
      "DaemonSets run exactly one pod per node — the standard way to deploy node agents like log collectors.",
  },
  {
    id: "k8s-get-cronjobs",
    level: "core",
    category: "kubernetes",
    prompt: "List the CronJobs in the current namespace.",
    answer: "kubectl get cronjobs",
    explanation:
      "CronJobs run Jobs on a schedule — the Kubernetes equivalent of cron for one-off tasks.",
  },
  {
    id: "k8s-scale",
    level: "pareto",
    category: "kubernetes",
    prompt: "Scale the Deployment `web` to 5 replicas.",
    answer: "kubectl scale deployment web --replicas=5",
    explanation:
      "Imperatively changes the replica count; the Deployment rolls out new pods (or removes extras) to match.",
  },
  {
    id: "k8s-rollout-status",
    level: "workflow",
    category: "kubernetes",
    prompt: "Check the status of `web`'s in-progress rollout.",
    answer: "kubectl rollout status deployment/web",
    explanation:
      "Blocks until the rollout completes (or fails), reporting progress — the deploy equivalent of a progress bar.",
  },
  {
    id: "k8s-rollout-history",
    level: "workflow",
    category: "kubernetes",
    prompt: "Show the rollout history of the Deployment `web`.",
    answer: "kubectl rollout history deployment/web",
    explanation:
      "Lists every revision of the Deployment's pod template — the versions you can roll back to.",
  },
  {
    id: "k8s-rollout-undo",
    level: "workflow",
    category: "kubernetes",
    prompt: "Roll back the Deployment `web` to its previous revision.",
    answer: "kubectl rollout undo deployment/web",
    explanation:
      "Reverts to the last revision (add `--to-revision=N` for a specific one) — the Kubernetes way of undoing a bad deploy.",
  },
  {
    id: "k8s-rollout-restart",
    level: "workflow",
    category: "kubernetes",
    prompt: "Force the Deployment `web` to restart all its pods (e.g. to pick up a new configmap).",
    answer: "kubectl rollout restart deployment/web",
    explanation:
      "Bumps the pod template annotation so every pod is recreated — the trick for reloading ConfigMaps/Secrets without changing images.",
  },
  {
    id: "k8s-set-image",
    level: "workflow",
    category: "kubernetes",
    prompt: "Update the `nginx` container of Deployment `web` to image `nginx:1.25`.",
    answer: "kubectl set image deployment/web nginx=nginx:1.25",
    explanation:
      "`set image` updates a container's image by name, triggering a rolling update. Syntax: <container>=<image>.",
  },
  {
    id: "k8s-edit-deployment",
    level: "workflow",
    category: "kubernetes",
    prompt: "Open the live spec of Deployment `web` in your editor and apply changes on save.",
    answer: "kubectl edit deployment web",
    explanation:
      "Fetches the object, opens it in `$EDITOR`, and applies your edits on save — imperative editing without YAML files.",
  },
  // ── Services & networking ────────────────────────────────────────────────
  {
    id: "k8s-expose",
    level: "workflow",
    category: "kubernetes",
    prompt: "Expose Deployment `web`'s port `80` as a LoadBalancer Service.",
    answer: "kubectl expose deployment web --port=80 --type=LoadBalancer",
    explanation:
      "Creates a Service pointing at the Deployment's pods. LoadBalancer gives it an external IP on cloud clusters.",
  },
  {
    id: "k8s-get-services",
    level: "pareto",
    category: "kubernetes",
    prompt: "List the Services in the current namespace.",
    answer: "kubectl get svc",
    explanation:
      "Shows each Service's type, ClusterIP, and the ports it forwards to — the stable network entry points for pods.",
  },
  {
    id: "k8s-get-endpoints",
    level: "core",
    category: "kubernetes",
    prompt: "List the Endpoints (the pod IPs a Service routes to) in the current namespace.",
    answer: "kubectl get endpoints",
    explanation:
      "Endpoints hold the actual IP:port list a Service sends traffic to — handy for checking why a Service has no targets.",
  },
  {
    id: "k8s-get-ingress",
    level: "core",
    category: "kubernetes",
    prompt: "List the Ingress resources in the current namespace.",
    answer: "kubectl get ingress",
    explanation:
      "Ingresses route HTTP/S traffic by hostname and path to Services — the Kubernetes way of doing virtual hosts.",
  },
  {
    id: "k8s-get-networkpolicies",
    level: "core",
    category: "kubernetes",
    prompt: "List the NetworkPolicies in the current namespace.",
    answer: "kubectl get networkpolicies",
    explanation:
      "NetworkPolicies define which pods can talk to which — the firewall rules of the cluster (requires a CNI that enforces them).",
  },
  // ── Config & secrets ─────────────────────────────────────────────────────
  {
    id: "k8s-create-configmap",
    level: "workflow",
    category: "kubernetes",
    prompt: "Create a ConfigMap named `app-config` from the file `config.json`.",
    answer: "kubectl create configmap app-config --from-file=config.json",
    explanation:
      "Loads the file's contents into a ConfigMap that pods can mount or read as env vars — config without rebuilding images.",
  },
  {
    id: "k8s-get-configmaps",
    level: "core",
    category: "kubernetes",
    prompt: "List the ConfigMaps in the current namespace.",
    answer: "kubectl get configmaps",
    explanation:
      "Shows the ConfigMaps available — plain-text configuration that can be injected into pods.",
  },
  {
    id: "k8s-create-secret",
    level: "workflow",
    category: "kubernetes",
    prompt: "Create a generic Secret named `db-secret` with the literal `password=sup3rs3cret`.",
    answer: "kubectl create secret generic db-secret --from-literal=password=sup3rs3cret",
    explanation:
      "Stores the key/value pair base64-encoded in the cluster. Prefer Secrets over plaintext ConfigMaps for anything sensitive.",
  },
  {
    id: "k8s-get-secrets",
    level: "core",
    category: "kubernetes",
    prompt: "List the Secrets in the current namespace.",
    answer: "kubectl get secrets",
    explanation:
      "Lists Secrets by name and type — the actual values stay hidden unless you decode them with `-o yaml` + base64.",
  },
  // ── Namespaces ───────────────────────────────────────────────────────────
  {
    id: "k8s-get-namespaces",
    level: "pareto",
    category: "kubernetes",
    prompt: "List all namespaces.",
    answer: "kubectl get namespaces",
    explanation:
      "Namespaces partition a cluster — `kube-system`, `default`, and any project-specific ones.",
  },
  {
    id: "k8s-create-namespace",
    level: "core",
    category: "kubernetes",
    prompt: "Create a namespace called `dev`.",
    answer: "kubectl create namespace dev",
    explanation:
      "Makes a fresh namespace for isolating workloads; you can then scope everything with `-n dev`.",
  },
  {
    id: "k8s-delete-namespace",
    level: "core",
    category: "kubernetes",
    prompt: "Delete the namespace `dev` and everything in it.",
    answer: "kubectl delete namespace dev",
    explanation:
      "Removes the namespace and all resources inside it — a heavy hammer, so make sure it's the namespace you meant.",
  },
  {
    id: "k8s-get-pods-namespace",
    level: "pareto",
    category: "kubernetes",
    prompt: "List the pods specifically in the `dev` namespace.",
    answer: "kubectl get pods -n dev",
    explanation:
      "`-n` (or `--namespace`) overrides the current namespace for this one command.",
  },
  // ── Resource management & manifests ──────────────────────────────────────
  {
    id: "k8s-apply",
    level: "pareto",
    category: "kubernetes",
    prompt: "Apply the resources defined in `deploy.yaml` to the cluster.",
    answer: "kubectl apply -f deploy.yaml",
    explanation:
      "The declarative way: creates or updates whatever the manifest describes, reconciling toward the desired state.",
  },
  {
    id: "k8s-delete-f",
    level: "core",
    category: "kubernetes",
    prompt: "Delete all resources defined in `deploy.yaml` from the cluster.",
    answer: "kubectl delete -f deploy.yaml",
    explanation:
      "Deletes every object listed in the manifest — the inverse of `kubectl apply -f`.",
  },
  {
    id: "k8s-get-all",
    level: "pareto",
    category: "kubernetes",
    prompt: "List all common resource types in the current namespace at once.",
    answer: "kubectl get all",
    explanation:
      "Shows pods, services, deployments, replicasets, and more in one table — a quick overview of a namespace.",
  },
  {
    id: "k8s-api-resources",
    level: "core",
    category: "kubernetes",
    prompt: "List every resource type the cluster's API server supports.",
    answer: "kubectl api-resources",
    explanation:
      "Dumps all resource kinds, their short names, API groups, and whether they're namespaced — great for discovery.",
  },
  {
    id: "k8s-explain",
    level: "core",
    category: "kubernetes",
    prompt: "Read the field-by-field documentation for the `pod` resource right from the CLI.",
    answer: "kubectl explain pod",
    explanation:
      "Built-in docs for any resource — `kubectl explain pod.spec.containers` drills into nested fields.",
    aliases: ["kubectl explain pod.spec.containers"],
  },
  {
    id: "k8s-label",
    level: "workflow",
    category: "kubernetes",
    prompt: "Add the label `env=prod` to the pod `my-pod`.",
    answer: "kubectl label pod my-pod env=prod",
    explanation:
      "Attaches a key=value label used by selectors in Services, Deployments, and NetworkPolicies.",
  },
  {
    id: "k8s-annotate",
    level: "core",
    category: "kubernetes",
    prompt: "Add the annotation `description=legacy-app` to the pod `my-pod`.",
    answer: "kubectl annotate pod my-pod description=legacy-app",
    explanation:
      "Annotations attach non-identifying metadata that tools can read but selectors can't filter on.",
  },
  {
    id: "k8s-top-nodes",
    level: "core",
    category: "kubernetes",
    prompt: "Show live CPU and memory usage for all nodes.",
    answer: "kubectl top nodes",
    explanation:
      "Reports real resource usage per node (requires the metrics-server). The first stop when something is resource-starved.",
  },
  {
    id: "k8s-top-pods",
    level: "core",
    category: "kubernetes",
    prompt: "Show live CPU and memory usage for the pods in the current namespace.",
    answer: "kubectl top pods",
    explanation:
      "Per-pod resource usage snapshot — useful for spotting pods that are hogging or exceeding their requests.",
  },
  {
    id: "k8s-events",
    level: "core",
    category: "kubernetes",
    prompt: "Show recent cluster events for the current namespace.",
    answer: "kubectl get events",
    explanation:
      "Events are the cluster's log of warnings, scheduling, and lifecycle changes — `--sort-by=.lastTimestamp` orders them.",
    aliases: ["kubectl get events --sort-by=.lastTimestamp"],
  },
  {
    id: "k8s-drain",
    level: "workflow",
    category: "kubernetes",
    prompt: "Safely drain `node-1` so its pods move to other nodes before maintenance.",
    answer: "kubectl drain node-1",
    explanation:
      "Marks the node unschedulable and evicts its pods gracefully. Add `--ignore-daemonsets` when DaemonSets block it.",
    aliases: ["kubectl drain node-1 --ignore-daemonsets"],
  },
  {
    id: "k8s-cordon",
    level: "workflow",
    category: "kubernetes",
    prompt: "Mark `node-1` as unschedulable so no new pods land on it.",
    answer: "kubectl cordon node-1",
    explanation:
      "Stops new scheduling onto the node while leaving existing pods running — a gentler prelude to a drain.",
  },
  {
    id: "k8s-uncordon",
    level: "workflow",
    category: "kubernetes",
    prompt: "Mark `node-1` as schedulable again.",
    answer: "kubectl uncordon node-1",
    explanation:
      "Reverses a cordon so the node accepts new pods again.",
  },
  {
    id: "k8s-manifest-apiVersion",
    level: "core",
    category: "kubernetes",
    prompt: "In a manifest, what's the first line that declares the API version of a `v1` Pod?",
    answer: "apiVersion: v1",
    explanation:
      "Every manifest starts with `apiVersion` naming the API group and version. Pods live in the core `v1` group.",
  },
  {
    id: "k8s-manifest-kind",
    level: "core",
    category: "kubernetes",
    prompt: "In a manifest, which line declares that the resource is a Pod?",
    answer: "kind: Pod",
    explanation:
      "The `kind` line names the resource type — `Pod`, `Deployment`, `Service`, and so on. It follows `apiVersion`.",
  },
];

/** A practice category with its dataset and blurb. */
export interface QuestionSet {
  category: Category;
  label: string;
  description: string;
  questions: QuizQuestion[];
}

/**
 * Registry of every practice category. Categories without questions yet are
 * listed as "coming soon" in the picker.
 */
export const questionSets: Record<Category, QuestionSet> = {
  vim: {
    category: "vim",
    label: "vim",
    description: "the modal text editor — commands, motions, and text objects",
    questions: [...vimQuestions, ...vimWorkflowQuestions],
  },
  tmux: {
    category: "tmux",
    label: "tmux",
    description: "terminal multiplexer — sessions, panes, windows, buffers",
    questions: [...tmuxQuestions, ...tmuxWorkflowQuestions],
  },
  shell: {
    category: "shell",
    label: "shell",
    description: "files, pipes, redirection, and processes",
    questions: [...shellQuestions, ...shellWorkflowQuestions],
  },
  git: {
    category: "git",
    label: "git",
    description: "staging, history, branches, and remotes",
    questions: [...gitQuestions, ...gitWorkflowQuestions],
  },
  docker: {
    category: "docker",
    label: "docker",
    description: "containers, images, and compose",
    questions: [...dockerQuestions, ...dockerWorkflowQuestions],
  },
  regex: {
    category: "regex",
    label: "regex",
    description: "patterns for search and replace",
    questions: [...regexQuestions, ...regexWorkflowQuestions],
  },
  ssh: {
    category: "ssh",
    label: "ssh",
    description: "remote shells, keys, and tunneling",
    questions: [...sshQuestions, ...sshWorkflowQuestions],
  },
  kubernetes: {
    category: "kubernetes",
    label: "k8s",
    description: "pods, deployments, and cluster basics",
    questions: [...kubernetesQuestions, ...kubernetesWorkflowQuestions],
  },
};

/** Categories with a ready question set — shown as selectable in the picker. */
export const availableQuestionSets: QuestionSet[] = Object.values(questionSets).filter(
  (set) => set.questions.length > 0
);

/** Categories still in progress — shown greyed out in the picker. */
export const comingSoonSets: QuestionSet[] = Object.values(questionSets).filter(
  (set) => set.questions.length === 0
);

export const categoryLabels: Record<Category, string> = Object.fromEntries(
  Object.values(questionSets).map((set) => [set.category, set.label])
) as Record<Category, string>;
