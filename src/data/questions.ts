/**
 * Question dataset for the termin(al)ator trainer.
 *
 * To add a new tool category (Shell, Git, Tmux, …):
 *   1. Add its name to the `Category` union.
 *   2. Add a label to `categoryLabels`.
 *   3. Export a `xxxQuestions: QuizQuestion[]` array for it.
 *   4. Pass it to `useQuiz({ questions: xxxQuestions })` in `src/App.tsx`.
 *
 * Sessions are infinite: the deck reshuffles when exhausted, so questions
 * repeat. The user ends the session whenever they want by typing `:quit`.
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

export interface QuizQuestion {
  id: string;
  category: Category;
  /** The task the user must figure out how to perform. */
  prompt: string;
  /** The exact accepted command. */
  answer: string;
  /** Short explanation shown after answering (especially when wrong). */
  explanation: string;
  /** Optional extra accepted spellings, matched exactly. */
  aliases?: string[];
}

export const categoryLabels: Record<Category, string> = {
  vim: "vim",
  shell: "shell",
  git: "git",
  tmux: "tmux",
  docker: "docker",
  regex: "regex",
  ssh: "ssh",
  kubernetes: "k8s",
};

export const vimQuestions: QuizQuestion[] = [
  // ── Starting & modes ──────────────────────────────────────────────────────
  {
    id: "vim-open-file",
    category: "vim",
    prompt: "From the shell, open Vim and load the file `notes.md`.",
    answer: "vim notes.md",
    explanation:
      "`vim notes.md` starts Vim with that file loaded. Vim lives at the command line too.",
  },
  {
    id: "vim-insert-before",
    category: "vim",
    prompt: "Switch to insert mode, inserting text before the cursor.",
    answer: "i",
    explanation:
      "`i` enters insert mode so you can type. Press `Esc` to return to normal mode.",
  },
  {
    id: "vim-insert-start",
    category: "vim",
    prompt: "Switch to insert mode, inserting text at the very start of the current line.",
    answer: "I",
    explanation: "`I` is `^i` in one key — it inserts at the first non-blank character.",
  },
  {
    id: "vim-insert-after",
    category: "vim",
    prompt: "Switch to insert mode, inserting text after the cursor.",
    answer: "a",
    explanation: "`a` is like `i` but inserts after the cursor — think 'append'.",
  },
  {
    id: "vim-insert-end",
    category: "vim",
    prompt: "Switch to insert mode at the end of the current line.",
    answer: "A",
    explanation: "`A` appends at the end of the line — it's shorthand for `$a`.",
  },
  {
    id: "vim-insert-newline-below",
    category: "vim",
    prompt: "Open a new line below the cursor and switch to insert mode.",
    answer: "o",
    explanation:
      "`o` opens a new line below and enters insert mode. Uppercase `O` does the same above.",
  },
  {
    id: "vim-insert-newline-above",
    category: "vim",
    prompt: "Open a new line above the cursor and switch to insert mode.",
    answer: "O",
    explanation:
      "`O` opens a new line above the cursor and enters insert mode — the mirror of `o`.",
  },
  {
    id: "vim-normal",
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
    category: "vim",
    prompt: "Save the current file (write your changes to disk).",
    answer: ":w",
    explanation:
      "`:w` writes the current buffer to disk. Append a filename to save as a copy.",
  },
  {
    id: "vim-quit",
    category: "vim",
    prompt: "Quit Vim.",
    answer: ":q",
    explanation:
      "`:q` quits Vim — but only when there are no unsaved changes. If Vim refuses, you have unsaved work.",
  },
  {
    id: "vim-save-quit",
    category: "vim",
    prompt: "Save the current file and quit Vim in one step.",
    answer: ":wq",
    aliases: [":x"],
    explanation: "`:wq` writes the buffer, then quits. `:x` does exactly the same thing.",
  },
  {
    id: "vim-quit-force",
    category: "vim",
    prompt: "Quit Vim without saving your changes.",
    answer: ":q!",
    explanation:
      "The `!` forces the quit, discarding unsaved changes. Use it only when you really mean it.",
  },
  {
    id: "vim-save-as",
    category: "vim",
    prompt: "Save the current buffer to a new file named `backup.txt`.",
    answer: ":w backup.txt",
    explanation:
      "Appending a filename to `:w` writes the buffer to that file instead of the current one.",
  },
  {
    id: "vim-save-quit-zz",
    category: "vim",
    prompt: "Save and quit using a two-key normal-mode shortcut.",
    answer: "ZZ",
    explanation:
      "`ZZ` is the normal-mode equivalent of `:wq` — save and quit in two keystrokes.",
  },
  {
    id: "vim-quit-force-zz",
    category: "vim",
    prompt: "Quit without saving using a two-key normal-mode shortcut.",
    answer: "ZQ",
    explanation: "`ZQ` is the normal-mode equivalent of `:q!` — quit and discard changes.",
  },
  {
    id: "vim-reload",
    category: "vim",
    prompt: "Discard all unsaved changes and reload the file from disk.",
    answer: ":e!",
    explanation:
      "The `!` on `:e` (edit) says 'forget my changes and reload the file from disk'.",
  },
  {
    id: "vim-open-other",
    category: "vim",
    prompt: "Open the file `todo.txt` in a new buffer without leaving Vim.",
    answer: ":e todo.txt",
    explanation:
      "`:e <file>` (edit) loads another file into the current window — no need to restart Vim.",
  },

  // ── Moving around ─────────────────────────────────────────────────────────
  {
    id: "vim-left",
    category: "vim",
    prompt: "Move the cursor one character to the left.",
    answer: "h",
    explanation: "`h` moves left — it's the left-hand side of the home-row movement keys.",
  },
  {
    id: "vim-down",
    category: "vim",
    prompt: "Move the cursor down one line.",
    answer: "j",
    explanation: "`j` moves down — the 'j' key has a little hook pointing down.",
  },
  {
    id: "vim-up",
    category: "vim",
    prompt: "Move the cursor up one line.",
    answer: "k",
    explanation: "`k` moves up — the highest point of the home-row keys.",
  },
  {
    id: "vim-right",
    category: "vim",
    prompt: "Move the cursor one character to the right.",
    answer: "l",
    explanation: "`l` moves right — the right-hand side of the home-row movement keys.",
  },
  {
    id: "vim-word-next",
    category: "vim",
    prompt: "Jump to the start of the next word.",
    answer: "w",
    explanation: "`w` jumps forward one word ('word'). Add a count: `3w` jumps three words.",
  },
  {
    id: "vim-word-back",
    category: "vim",
    prompt: "Jump back to the start of the previous word.",
    answer: "b",
    explanation: "`b` moves back one word ('back'). Pairs with `w` for fast word motion.",
  },
  {
    id: "vim-word-end",
    category: "vim",
    prompt: "Jump to the end of the current word.",
    answer: "e",
    explanation: "`e` jumps to the end of the word ('end'). `ge` goes to the end of the previous word.",
  },
  {
    id: "vim-line-start",
    category: "vim",
    prompt: "Move to the very start of the current line.",
    answer: "0",
    explanation: "`0` moves to column zero — the absolute start of the line.",
  },
  {
    id: "vim-line-first-nonblank",
    category: "vim",
    prompt: "Move to the first non-blank character of the current line.",
    answer: "^",
    explanation:
      "`^` skips leading whitespace to the first character. `0` goes to the absolute start instead.",
  },
  {
    id: "vim-line-end",
    category: "vim",
    prompt: "Move to the end of the current line.",
    answer: "$",
    explanation: "`$` jumps to the last character of the line — same anchor idea as regex.",
  },
  {
    id: "vim-file-start",
    category: "vim",
    prompt: "Jump to the very first line of the file.",
    answer: "gg",
    explanation: "`gg` moves to line 1. Add a count, like `50gg`, to jump to line 50.",
  },
  {
    id: "vim-file-end",
    category: "vim",
    prompt: "Jump to the very last line of the file.",
    answer: "G",
    explanation:
      "`G` moves to the last line. Don't type `GG` — that's a different (mostly unused) command.",
  },
  {
    id: "vim-go-line",
    category: "vim",
    prompt: "Jump directly to line 42.",
    answer: ":42",
    aliases: ["42G"],
    explanation:
      "`:` starts an ex command, so `:42` jumps to line 42. In many setups `42G` works too.",
  },
  {
    id: "vim-half-down",
    category: "vim",
    prompt: "Scroll half a screen down.",
    answer: "Ctrl+d",
    explanation: "`Ctrl+d` scrolls the view down half a page, keeping the cursor in view.",
  },
  {
    id: "vim-half-up",
    category: "vim",
    prompt: "Scroll half a screen up.",
    answer: "Ctrl+u",
    explanation: "`Ctrl+u` scrolls the view up half a page — the mirror of `Ctrl+d`.",
  },
  {
    id: "vim-page-down",
    category: "vim",
    prompt: "Scroll one full screen down.",
    answer: "Ctrl+f",
    explanation: "`Ctrl+f` pages down one full screen ('forward').",
  },
  {
    id: "vim-page-up",
    category: "vim",
    prompt: "Scroll one full screen up.",
    answer: "Ctrl+b",
    explanation: "`Ctrl+b` pages up one full screen ('back').",
  },
  {
    id: "vim-match",
    category: "vim",
    prompt: "Jump to the bracket matching the one under the cursor.",
    answer: "%",
    explanation:
      "`%` jumps between matching `()`, `[]`, and `{}` pairs — great for checking nesting.",
  },
  {
    id: "vim-down-5",
    category: "vim",
    prompt: "Move the cursor down exactly 5 lines.",
    answer: "5j",
    explanation:
      "Almost every movement accepts a count: `5j` moves down five lines, `10w` ten words.",
  },
  {
    id: "vim-screen-top",
    category: "vim",
    prompt: "Jump to the top of the screen.",
    answer: "H",
    explanation: "`H` jumps to the top ('high') of the visible screen.",
  },
  {
    id: "vim-screen-mid",
    category: "vim",
    prompt: "Jump to the middle of the screen.",
    answer: "M",
    explanation: "`M` jumps to the middle ('middle') of the visible screen.",
  },
  {
    id: "vim-screen-bottom",
    category: "vim",
    prompt: "Jump to the bottom of the screen.",
    answer: "L",
    explanation: "`L` jumps to the bottom ('low') of the visible screen.",
  },
  {
    id: "vim-para-next",
    category: "vim",
    prompt: "Jump forward to the start of the next paragraph.",
    answer: "}",
    explanation:
      "`}` moves to the next blank-line boundary — handy for hopping between code blocks.",
  },

  // ── Editing ───────────────────────────────────────────────────────────────
  {
    id: "vim-delete-line",
    category: "vim",
    prompt: "Delete the entire line the cursor is on.",
    answer: "dd",
    explanation:
      "`dd` deletes the whole line and places it in a register — like cut, so you can paste it elsewhere.",
  },
  {
    id: "vim-delete-char",
    category: "vim",
    prompt: "Delete the single character under the cursor.",
    answer: "x",
    explanation: "`x` deletes the character under the cursor — the Vim Delete key.",
  },
  {
    id: "vim-delete-char-before",
    category: "vim",
    prompt: "Delete the single character before the cursor.",
    answer: "X",
    explanation: "`X` deletes the character before the cursor — the Vim Backspace.",
  },
  {
    id: "vim-delete-word",
    category: "vim",
    prompt: "Delete the word under the cursor.",
    answer: "dw",
    explanation:
      "`d` starts a delete and `w` is the motion: delete from the cursor to the start of the next word.",
  },
  {
    id: "vim-delete-to-eol",
    category: "vim",
    prompt: "Delete everything from the cursor to the end of the line.",
    answer: "d$",
    explanation:
      "`d` (delete) + `$` (end of line) removes the rest of the line. `D` is a shortcut for it.",
  },
  {
    id: "vim-undo",
    category: "vim",
    prompt: "Undo the last change.",
    answer: "u",
    explanation:
      "`u` undoes the most recent change. Press it repeatedly to keep stepping back.",
  },
  {
    id: "vim-redo",
    category: "vim",
    prompt: "Redo the last change you just undid.",
    answer: "Ctrl+r",
    explanation: "`Ctrl+r` re-applies the change you undid — the mirror image of `u`.",
  },
  {
    id: "vim-repeat",
    category: "vim",
    prompt: "Repeat the last change you made.",
    answer: ".",
    explanation:
      "`.` repeats the last change — the single most time-saving key in Vim for repetitive edits.",
  },
  {
    id: "vim-yank-line",
    category: "vim",
    prompt: "Copy (yank) the entire line the cursor is on.",
    answer: "yy",
    explanation: "`yy` yanks the whole line into a register — Vim's word for copy.",
  },
  {
    id: "vim-yank-word",
    category: "vim",
    prompt: "Copy (yank) the word under the cursor.",
    answer: "yw",
    explanation: "`yw` yanks from the cursor to the end of the word ('yank word').",
  },
  {
    id: "vim-paste-below",
    category: "vim",
    prompt: "Paste the last yanked or deleted text below the cursor.",
    answer: "p",
    explanation: "`p` pastes after (below) the cursor. Uppercase `P` pastes before it.",
  },
  {
    id: "vim-paste-above",
    category: "vim",
    prompt: "Paste the last yanked or deleted text above the cursor.",
    answer: "P",
    explanation:
      "`P` pastes before (above) the cursor. Lowercase `p` pastes after it — case matters in Vim!",
  },
  {
    id: "vim-join",
    category: "vim",
    prompt: "Join the current line with the line below it.",
    answer: "J",
    explanation:
      "`J` joins the next line onto the current one. `gJ` joins without inserting a space.",
  },
  {
    id: "vim-change-line",
    category: "vim",
    prompt: "Replace the entire line — delete it and enter insert mode.",
    answer: "cc",
    explanation:
      "`cc` is 'change line': it deletes the line and puts you in insert mode. `S` does the same.",
  },
  {
    id: "vim-change-word",
    category: "vim",
    prompt: "Replace the word under the cursor — delete it and enter insert mode.",
    answer: "cw",
    explanation:
      "`cw` is 'change word': delete to the end of the word and switch to insert mode.",
  },
  {
    id: "vim-substitute-char",
    category: "vim",
    prompt: "Delete the character under the cursor and enter insert mode.",
    answer: "s",
    explanation: "`s` (substitute) replaces the character under the cursor with new text.",
  },
  {
    id: "vim-substitute-line",
    category: "vim",
    prompt: "Delete the entire line and enter insert mode.",
    answer: "S",
    explanation: "`S` substitutes the whole line — same effect as `cc`.",
  },
  {
    id: "vim-toggle-case",
    category: "vim",
    prompt: "Toggle the case of the character under the cursor.",
    answer: "~",
    explanation:
      "`~` flips the case: 'a' becomes 'A' and vice versa. Move across the word with counts.",
  },
  {
    id: "vim-indent",
    category: "vim",
    prompt: "Indent the current line one level to the right.",
    answer: ">>",
    explanation:
      "`>>` indents the current line. Select lines in visual mode and press `>` to indent them all.",
  },
  {
    id: "vim-unindent",
    category: "vim",
    prompt: "Unindent the current line one level to the left.",
    answer: "<<",
    explanation: "`<<` removes one level of indentation from the current line.",
  },
  {
    id: "vim-sort",
    category: "vim",
    prompt: "Sort the lines of the file alphabetically.",
    answer: ":sort",
    explanation: "`:sort` sorts the current range (the whole file here) alphabetically.",
  },

  // ── Searching & replacing ─────────────────────────────────────────────────
  {
    id: "vim-search",
    category: "vim",
    prompt: "Search forward for the word `error`.",
    answer: "/error",
    explanation:
      "`/` starts a forward search. Type the pattern, press Enter, then use `n` for the next match.",
  },
  {
    id: "vim-search-back",
    category: "vim",
    prompt: "Search backward for the word `error`.",
    answer: "?error",
    explanation:
      "`?` searches backward through the file. Press `N` to keep going to earlier matches.",
  },
  {
    id: "vim-search-next",
    category: "vim",
    prompt: "Jump to the next search match.",
    answer: "n",
    explanation:
      "`n` repeats the last search in the same direction. `N` repeats it in the opposite direction.",
  },
  {
    id: "vim-search-prev",
    category: "vim",
    prompt: "Jump to the previous search match.",
    answer: "N",
    explanation: "`N` repeats the last search backwards — the mirror of `n`.",
  },
  {
    id: "vim-search-under",
    category: "vim",
    prompt: "Search forward for the word currently under the cursor.",
    answer: "*",
    explanation:
      "`*` searches for the exact word under the cursor — a fast 'jump to next occurrence'.",
  },
  {
    id: "vim-search-under-back",
    category: "vim",
    prompt: "Search backward for the word currently under the cursor.",
    answer: "#",
    explanation: "`#` is `*` in reverse — it searches backward for the word under the cursor.",
  },
  {
    id: "vim-replace-all",
    category: "vim",
    prompt: "Replace every occurrence of `foo` with `bar` across the whole file.",
    answer: ":%s/foo/bar/g",
    explanation:
      "`%s/old/new/g` substitutes across the file: `%` = all lines, `g` = every match on each line.",
  },
  {
    id: "vim-replace-confirm",
    category: "vim",
    prompt: "Replace every `foo` with `bar`, asking for confirmation before each change.",
    answer: ":%s/foo/bar/gc",
    explanation:
      "Adding `c` makes the substitution ask for confirmation at every match — safer for big changes.",
  },
  {
    id: "vim-clear-highlight",
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
    category: "vim",
    prompt: "Start character-wise visual selection.",
    answer: "v",
    explanation:
      "`v` enters visual mode; move to expand the selection, then `y` to yank or `d` to delete.",
  },
  {
    id: "vim-visual-line",
    category: "vim",
    prompt: "Start line-wise visual selection.",
    answer: "V",
    explanation:
      "`V` selects whole lines at a time — great for bulk indent, yank, or delete.",
  },
  {
    id: "vim-visual-block",
    category: "vim",
    prompt: "Start block-wise (rectangular) visual selection.",
    answer: "Ctrl+v",
    explanation:
      "`Ctrl+v` selects a rectangular block — the classic way to edit a column of text.",
  },
  {
    id: "vim-visual-yank",
    category: "vim",
    prompt: "With text selected in visual mode, copy the selection.",
    answer: "y",
    explanation:
      "`y` yanks the visual selection. After that Vim returns to normal mode automatically.",
  },
  {
    id: "vim-visual-delete",
    category: "vim",
    prompt: "With text selected in visual mode, delete the selection.",
    answer: "d",
    explanation: "`d` deletes the visual selection and returns to normal mode.",
  },

  // ── Windows & tabs ────────────────────────────────────────────────────────
  {
    id: "vim-split-h",
    category: "vim",
    prompt: "Split the window horizontally.",
    answer: ":sp",
    aliases: [":split"],
    explanation:
      "`:sp` splits the window horizontally (one above the other), sharing the buffer.",
  },
  {
    id: "vim-split-v",
    category: "vim",
    prompt: "Split the window vertically.",
    answer: ":vsp",
    aliases: [":vsplit"],
    explanation: "`:vsp` splits the window vertically (side by side).",
  },
  {
    id: "vim-window-switch",
    category: "vim",
    prompt: "Switch to the next window in a split.",
    answer: "Ctrl+w w",
    explanation:
      "`Ctrl+w` starts a window command; the second `w` cycles to the next window. `Ctrl+w h/j/k/l` moves by direction.",
  },
  {
    id: "vim-window-close",
    category: "vim",
    prompt: "Close the current window in a split.",
    answer: ":q",
    explanation:
      "`:q` closes just the current window. Use `:qall` to quit every window at once.",
  },
  {
    id: "vim-tab-new",
    category: "vim",
    prompt: "Open a new tab.",
    answer: ":tabnew",
    explanation: "`:tabnew` opens a fresh empty tab. You can pass a filename to load a file.",
  },
  {
    id: "vim-tab-next",
    category: "vim",
    prompt: "Switch to the next tab.",
    answer: "gt",
    explanation: "`gt` cycles to the next tab ('goto tab'). `gT` goes to the previous one.",
  },
  {
    id: "vim-tab-prev",
    category: "vim",
    prompt: "Switch to the previous tab.",
    answer: "gT",
    explanation: "`gT` cycles to the previous tab — the reverse of `gt`.",
  },

  // ── Settings & utilities ──────────────────────────────────────────────────
  {
    id: "vim-numbers",
    category: "vim",
    prompt: "Show line numbers in Vim.",
    answer: ":set number",
    aliases: [":set nu"],
    explanation:
      "`:set number` (or `:set nu`) displays line numbers. `:set relativenumber` shows distances instead.",
  },
  {
    id: "vim-syntax",
    category: "vim",
    prompt: "Turn on syntax highlighting.",
    answer: ":syntax on",
    explanation:
      "`:syntax on` colors code by language. Add `syntax enable` in your vimrc to keep it on.",
  },
  {
    id: "vim-help",
    category: "vim",
    prompt: "Open Vim's built-in help.",
    answer: ":help",
    explanation:
      "`:help` opens the help window. `:help <command>` jumps straight to docs for that command.",
  },
  {
    id: "vim-registers",
    category: "vim",
    prompt: "List the contents of all registers.",
    answer: ":reg",
    aliases: [":registers"],
    explanation:
      "`:registers` (or `:reg`) shows every register's contents — handy when you 'lost' a yank.",
  },
  {
    id: "vim-buffers",
    category: "vim",
    prompt: "List all open buffers.",
    answer: ":ls",
    aliases: [":buffers"],
    explanation:
      "`:ls` (or `:buffers`) lists open buffers. `:b <number>` jumps to one of them.",
  },
  {
    id: "vim-shell",
    category: "vim",
    prompt: "Run the shell command `ls` without leaving Vim.",
    answer: ":!ls",
    explanation:
      "`:!` runs a shell command and shows its output — `:!ls` lists the directory, then press Enter to return.",
  },
];
