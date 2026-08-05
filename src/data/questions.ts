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

  // ── Text objects & operator motions ───────────────────────────────────────
  {
    id: "vim-ciw",
    category: "vim",
    prompt: "Replace the whole word under the cursor with new text — no deleting first.",
    answer: "ciw",
    explanation:
      "`ciw` = change inner word: delete the word under the cursor and enter insert mode. `caw` also swallows the surrounding whitespace.",
  },
  {
    id: "vim-caw",
    category: "vim",
    prompt: "Replace the word under the cursor plus the whitespace around it.",
    answer: "caw",
    explanation:
      "`caw` = change around word — it grabs the trailing space too, so you never leave double gaps when editing.",
  },
  {
    id: "vim-ci-quote",
    category: "vim",
    prompt: "Replace the text inside the nearest double quotes, leaving the quotes themselves.",
    answer: "ci\"",
    explanation:
      "`ci\"` = change inner quotes — perfect for retyping a string without ever touching the quotes.",
  },
  {
    id: "vim-di-quote",
    category: "vim",
    prompt: "Delete the text inside the nearest double quotes, leaving the quotes.",
    answer: "di\"",
    explanation: "`di\"` deletes only what's between the quotes — the quotes stay put.",
  },
  {
    id: "vim-ci-paren",
    category: "vim",
    prompt: "Replace everything inside the nearest parentheses, keeping the parens.",
    answer: "ci(",
    explanation:
      "`ci(` changes the content of the parens without the parens. `ci{` and `ci[` target those brackets the same way.",
  },
  {
    id: "vim-di-paren",
    category: "vim",
    prompt: "Delete everything inside the nearest parentheses, keeping the parens.",
    answer: "di(",
    explanation: "`di(` deletes the content; `da(` takes the parens along too — one key changes the whole meaning.",
  },
  {
    id: "vim-da-paren",
    category: "vim",
    prompt: "Delete the nearest parentheses and everything inside them.",
    answer: "da(",
    explanation: "`da(` = delete around parens — the entire `( ... )` group goes, including the brackets.",
  },
  {
    id: "vim-yiw",
    category: "vim",
    prompt: "Yank just the word under the cursor, nothing else.",
    answer: "yiw",
    explanation: "`yiw` copies only the word — the standard way to grab an identifier.",
  },
  {
    id: "vim-yi-quote",
    category: "vim",
    prompt: "Yank the text inside the nearest double quotes.",
    answer: "yi\"",
    explanation: "`yi\"` copies what's between the quotes, quotes excluded.",
  },
  {
    id: "vim-vip",
    category: "vim",
    prompt: "Select the entire paragraph the cursor is in.",
    answer: "vip",
    explanation:
      "`vip` = visual inner paragraph. Follow it with `d`, `y`, or `gq` to act on the whole block.",
  },
  {
    id: "vim-vib",
    category: "vim",
    prompt: "Select everything inside the nearest parentheses.",
    answer: "vib",
    explanation:
      "`vib` selects between `( )` — swap the `b` for `{` or `[` to target other brackets. `vab` includes the brackets.",
  },
  {
    id: "vim-vit",
    category: "vim",
    prompt: "Select the text inside the HTML tag under the cursor.",
    answer: "vit",
    explanation:
      "`vit` = visual inner tag — selects `<div>CONTENT</div>`'s content only. `vat` includes the tags.",
  },

  // ── Finding characters (f / t motions) ────────────────────────────────────
  {
    id: "vim-find-char",
    category: "vim",
    prompt: "Jump forward to the next `,` on the current line.",
    answer: "f,",
    explanation: "`f,` = find comma. `F,` finds it backwards, and `;` repeats the last find.",
  },
  {
    id: "vim-till-char",
    category: "vim",
    prompt: "Move to the character just before the next `)` on the current line.",
    answer: "t)",
    explanation:
      "`t` = till: it stops before the target, `f` lands on it. Pair with `d`/`c`: `dt)` deletes up to the paren.",
  },
  {
    id: "vim-find-repeat",
    category: "vim",
    prompt: "Repeat the last character find (`f`/`t`) in the same direction.",
    answer: ";",
    explanation: "`;` repeats the last f/t motion forward; `,` repeats it in reverse.",
  },
  {
    id: "vim-find-repeat-back",
    category: "vim",
    prompt: "Repeat the last character find (`f`/`t`) in the opposite direction.",
    answer: ",",
    explanation: "`,` repeats the last f/t motion backwards — the mirror of `;`.",
  },

  // ── Registers & macros ────────────────────────────────────────────────────
  {
    id: "vim-macro-record",
    category: "vim",
    prompt: "Start recording a macro into register `a`.",
    answer: "qa",
    explanation:
      "`qa` begins recording. Do your edit, press `q` again to stop, then `@a` to replay it anywhere.",
  },
  {
    id: "vim-macro-stop",
    category: "vim",
    prompt: "Stop recording the macro you're currently recording.",
    answer: "q",
    explanation: "A second `q` ends the recording and stores it in the register you named.",
  },
  {
    id: "vim-macro-play",
    category: "vim",
    prompt: "Play back the macro stored in register `a`.",
    answer: "@a",
    explanation:
      "`@a` runs the macro once. `10@a` runs it ten times — that's how you edit a thousand lines in seconds.",
  },
  {
    id: "vim-macro-replay",
    category: "vim",
    prompt: "Replay the most recently executed macro.",
    answer: "@@",
    explanation: "`@@` reruns the last macro without retyping its name.",
  },

  // ── Marks & jump lists ────────────────────────────────────────────────────
  {
    id: "vim-mark-set",
    category: "vim",
    prompt: "Set a mark named `a` at the current position.",
    answer: "ma",
    explanation:
      "`ma` plants a hidden bookmark. Any lowercase letter works, and marks survive until you leave the file.",
  },
  {
    id: "vim-mark-jump-line",
    category: "vim",
    prompt: "Jump to the line where mark `a` sits.",
    answer: "'a",
    explanation: "`'a` jumps to the start of the marked line — instant bookmarks across a long file.",
  },
  {
    id: "vim-mark-jump-exact",
    category: "vim",
    prompt: "Jump to the exact line and column of mark `a`.",
    answer: "`a",
    explanation:
      "The backtick version — `` `a `` — restores the marked column too, while `'a` only restores the line.",
  },
  {
    id: "vim-insert-pos",
    category: "vim",
    prompt: "Return to the spot where you last inserted or edited text.",
    answer: "gi",
    explanation:
      "`gi` jumps to your last edit position and enters insert mode — a favorite for resuming work.",
  },
  {
    id: "vim-jump-back",
    category: "vim",
    prompt: "Jump back to your previous cursor position.",
    answer: "Ctrl+o",
    explanation:
      "`Ctrl+o` walks the jump list backwards — a browser-style back button for cursor positions.",
  },
  {
    id: "vim-jump-fwd",
    category: "vim",
    prompt: "Jump forward through the jump list again.",
    answer: "Ctrl+i",
    explanation: "`Ctrl+i` walks forward through the jump list — the mirror of `Ctrl+o`.",
  },

  // ── Numbers ───────────────────────────────────────────────────────────────
  {
    id: "vim-num-inc",
    category: "vim",
    prompt: "Increase the number under the cursor by one.",
    answer: "Ctrl+a",
    explanation: "`Ctrl+a` increments the number under the cursor: `42` becomes `43`. `5 Ctrl+a` adds five.",
  },
  {
    id: "vim-num-dec",
    category: "vim",
    prompt: "Decrease the number under the cursor by one.",
    answer: "Ctrl+x",
    explanation: "`Ctrl+x` decrements the number under the cursor — handy for version bumps.",
  },

  // ── Filters & command-line tricks ─────────────────────────────────────────
  {
    id: "vim-filter-sort",
    category: "vim",
    prompt: "Sort the entire file by piping it through the `sort` shell command.",
    answer: ":%!sort",
    explanation:
      "`:%!sort` sends the whole file through the `sort` command and replaces it with the output.",
  },
  {
    id: "vim-format-json",
    category: "vim",
    prompt: "Pretty-print the JSON in the current buffer.",
    answer: ":%!python -m json.tool",
    explanation:
      "`:%!python -m json.tool` pipes the file through Python's JSON formatter — instant, zero-plugin formatting.",
  },
  {
    id: "vim-r-shell",
    category: "vim",
    prompt: "Insert the output of the shell command `date` below the cursor.",
    answer: ":r !date",
    explanation: "`:r !cmd` runs a shell command and reads its output into the buffer.",
  },
  {
    id: "vim-r-file",
    category: "vim",
    prompt: "Insert the contents of `notes.txt` below the cursor.",
    answer: ":r notes.txt",
    explanation: "`:r notes.txt` (read) dumps that file in below the cursor line.",
  },
  {
    id: "vim-delete-blank",
    category: "vim",
    prompt: "Delete every blank line in the file.",
    answer: ":g/^$/d",
    explanation: "`:g` runs a command on every matching line — here, delete all the empty ones.",
  },
  {
    id: "vim-delete-matching",
    category: "vim",
    prompt: "Delete every line containing the word `debug`.",
    answer: ":g/debug/d",
    explanation: "`:g/debug/d` deletes all matching lines — the global command is a whole mini-language.",
  },
  {
    id: "vim-keep-matching",
    category: "vim",
    prompt: "Delete every line that does NOT contain `debug`.",
    answer: ":v/debug/d",
    explanation:
      "`:v` is the inverse of `:g` — it acts on lines that don't match. Great for filtering logs.",
  },
  {
    id: "vim-reverse-lines",
    category: "vim",
    prompt: "Reverse the order of all lines in the file.",
    answer: ":g/^/m0",
    explanation:
      "`:g/^/m0` moves every line to the top, flipping the file upside down — a party-trick one-liner.",
  },
  {
    id: "vim-strip-trailing",
    category: "vim",
    prompt: "Remove trailing whitespace from every line.",
    answer: ":%s/\\s\\+$//",
    explanation:
      "`:%s/\\s\\+$//` matches spaces at line ends and deletes them — a common pre-commit cleanup.",
  },
  {
    id: "vim-add-comma",
    category: "vim",
    prompt: "Append a comma to the end of every line.",
    answer: ":%s/$/,/",
    explanation:
      "Substituting against `$` (end of line) appends — every line now ends with a comma.",
  },
  {
    id: "vim-put-range",
    category: "vim",
    prompt: "Insert the numbers 1 through 10 as ten separate lines.",
    answer: ":put =range(1,10)",
    explanation:
      "`:put =expr` evaluates an expression and inserts the result — `range(1,10)` generates 1..10.",
  },
  {
    id: "vim-sudo-save",
    category: "vim",
    prompt: "Save the current file with sudo privileges even when it's read-only.",
    answer: ":w !sudo tee %",
    explanation:
      "`:w !sudo tee %` is the classic trick for writing a read-only file — the buffer is piped through sudo.",
  },
  {
    id: "vim-sort-numeric",
    category: "vim",
    prompt: "Sort the file numerically instead of alphabetically.",
    answer: ":sort n",
    explanation: "`:sort n` sorts by number, so `10` correctly follows `2`. Add `!` for reverse order.",
  },
  {
    id: "vim-sort-unique",
    category: "vim",
    prompt: "Sort the file and remove duplicate lines.",
    answer: ":sort u",
    explanation: "`:sort u` sorts and keeps only unique lines — dedup in a single command.",
  },
  {
    id: "vim-repeat-subst",
    category: "vim",
    prompt: "Repeat the last substitution on the current line.",
    answer: "&",
    explanation: "`&` re-applies the last `:s/foo/bar` to the current line. `g&` redoes it across the whole file.",
  },
  {
    id: "vim-repeat-subst-all",
    category: "vim",
    prompt: "Repeat the last substitution across the whole file.",
    answer: "g&",
    explanation: "`g&` replays the last substitution everywhere; plain `&` only does the current line.",
  },

  // ── Buffers & multiple files ──────────────────────────────────────────────
  {
    id: "vim-alternate-file",
    category: "vim",
    prompt: "Switch to the file you were editing before.",
    answer: "Ctrl+^",
    explanation:
      "`Ctrl+^` toggles between the current buffer and the alternate file — usually the one you just left.",
  },
  {
    id: "vim-e-alternate",
    category: "vim",
    prompt: "Open the previous file without leaving Vim.",
    answer: ":e #",
    explanation: "`:e #` edits the alternate buffer — `#` stands for the last file you had open.",
  },
  {
    id: "vim-buffer-next",
    category: "vim",
    prompt: "Move to the next open buffer.",
    answer: ":bn",
    explanation:
      "`:bn` (buffer next) cycles forward through open buffers. `:bp` goes back, `:b 3` jumps to number 3.",
  },
  {
    id: "vim-buffer-delete",
    category: "vim",
    prompt: "Remove the current buffer from the buffer list.",
    answer: ":bd",
    explanation: "`:bd` unloads the current buffer — unlike `:q`, it doesn't close the window.",
  },
  {
    id: "vim-quit-all",
    category: "vim",
    prompt: "Quit all windows at once.",
    answer: ":qall",
    explanation: "`:qall` (or `:qa`) closes every window and quits. Add `!` to force it.",
  },
  {
    id: "vim-quit-all-force",
    category: "vim",
    prompt: "Quit all windows without saving any changes.",
    answer: ":qall!",
    explanation: "`:qall!` force-quits every window, discarding all unsaved changes.",
  },
  {
    id: "vim-write-all",
    category: "vim",
    prompt: "Save all modified buffers.",
    answer: ":wall",
    explanation: "`:wall` writes every dirty buffer — handy after editing files across several windows.",
  },

  // ── Smart editing tricks ──────────────────────────────────────────────────
  {
    id: "vim-swap-chars",
    category: "vim",
    prompt: "Swap the character under the cursor with the one after it.",
    answer: "xp",
    explanation: "`xp` = delete (`x`) then paste (`p`) — the classic transpose-characters trick.",
  },
  {
    id: "vim-swap-lines",
    category: "vim",
    prompt: "Swap the current line with the line below it.",
    answer: "ddp",
    explanation:
      "`ddp` cuts the line and pastes it below — instant line swap. `ddkP` swaps the other way.",
  },
  {
    id: "vim-delete-eol-short",
    category: "vim",
    prompt: "Delete from the cursor to the end of the line using the one-key shortcut.",
    answer: "D",
    explanation: "`D` is shorthand for `d$` — delete to end of line in a single keypress.",
  },
  {
    id: "vim-delete-until-char",
    category: "vim",
    prompt: "Delete from the cursor up to, but not including, the next `;`.",
    answer: "dt;",
    explanation:
      "`dt;` = delete till `;` — it stops just before the semicolon, keeping the statement intact.",
  },
  {
    id: "vim-delete-thru-char",
    category: "vim",
    prompt: "Delete from the cursor through the next `)` including it.",
    answer: "df)",
    explanation: "`df)` deletes everything up to and including the `)` — the `f` lands right on it.",
  },
  {
    id: "vim-replace-char",
    category: "vim",
    prompt: "Replace the character under the cursor with `x` without entering insert mode.",
    answer: "rx",
    explanation: "`r` replaces a single character — `rx` swaps it for `x` and stays in normal mode.",
  },
  {
    id: "vim-reselect",
    category: "vim",
    prompt: "Re-select the last visual selection.",
    answer: "gv",
    explanation:
      "`gv` brings back the previous visual selection — handy to re-apply an indent or re-yank.",
  },
  {
    id: "vim-go-def",
    category: "vim",
    prompt: "Jump to the definition of the identifier under the cursor.",
    answer: "gd",
    explanation: "`gd` jumps to the local definition in this file; `gD` looks through the whole project.",
  },
  {
    id: "vim-open-under",
    category: "vim",
    prompt: "Open the file whose name is under the cursor.",
    answer: "gf",
    explanation: "`gf` (goto file) opens the file named under the cursor — great for following imports.",
  },
  {
    id: "vim-man-under",
    category: "vim",
    prompt: "Show the man page for the word under the cursor.",
    answer: "K",
    explanation: "`K` looks up the word under the cursor in the man pages — instant documentation.",
  },

  // ── Formatting & case ─────────────────────────────────────────────────────
  {
    id: "vim-upper-line",
    category: "vim",
    prompt: "Uppercase the entire current line.",
    answer: "gUU",
    explanation: "`gUU` uppercases the whole line; `guu` lowercases it back.",
  },
  {
    id: "vim-lower-line",
    category: "vim",
    prompt: "Lowercase the entire current line.",
    answer: "guu",
    explanation: "`guu` lowercases the line — the mirror of `gUU`.",
  },
  {
    id: "vim-upper-word",
    category: "vim",
    prompt: "Uppercase the word under the cursor.",
    answer: "gUw",
    explanation: "`gUw` uppercases from the cursor to the end of the word; `guw` lowercases.",
  },
  {
    id: "vim-format-line",
    category: "vim",
    prompt: "Re-wrap the current line to fit the text width.",
    answer: "gqq",
    explanation: "`gqq` reformats the current line — re-wrapping it to the text width.",
  },
  {
    id: "vim-format-para",
    category: "vim",
    prompt: "Re-wrap the whole paragraph under the cursor.",
    answer: "gqap",
    explanation: "`gqap` = format around paragraph — it re-wraps every line of the paragraph.",
  },
  {
    id: "vim-indent-file",
    category: "vim",
    prompt: "Re-indent the entire file to match your indentation settings.",
    answer: "gg=G",
    explanation: "`gg=G` = go to top, auto-indent, go to bottom — reformats the whole file.",
  },
  {
    id: "vim-indent-line-eq",
    category: "vim",
    prompt: "Auto-indent just the current line.",
    answer: "==",
    explanation: "`==` auto-indents the current line based on the code around it.",
  },

  // ── Settings & info ───────────────────────────────────────────────────────
  {
    id: "vim-highlight-on",
    category: "vim",
    prompt: "Highlight every match of your last search.",
    answer: ":set hls",
    explanation: "`:set hls` (hlsearch) highlights all matches — clear it later with `:nohlsearch`.",
  },
  {
    id: "vim-spell",
    category: "vim",
    prompt: "Turn on spell checking.",
    answer: ":set spell",
    explanation: "`:set spell` underlines misspelled words; `]s` jumps to the next error, `zg` adds a word.",
  },
  {
    id: "vim-file-status",
    category: "vim",
    prompt: "Show the file name, line count, and cursor position as a percentage.",
    answer: "Ctrl+g",
    explanation: "`Ctrl+g` prints a status line with the file, line, and position — `:f` does the same.",
  },
  {
    id: "vim-char-code",
    category: "vim",
    prompt: "Show the numeric (ASCII/Unicode) value of the character under the cursor.",
    answer: "ga",
    explanation:
      "`ga` shows the value of the character under the cursor — great for identifying that weird char.",
  },
  {
    id: "vim-command-history",
    category: "vim",
    prompt: "Open a window listing your command history for reuse.",
    answer: "q:",
    explanation: "`q:` opens the command-line history window — pick a line and hit Enter to re-run it.",
  },
  {
    id: "vim-search-history",
    category: "vim",
    prompt: "Open a window listing your search history.",
    answer: "q/",
    explanation: "`q/` opens the search history window — reuse or tweak a past pattern.",
  },
  {
    id: "vim-source-vimrc",
    category: "vim",
    prompt: "Reload your vimrc settings without restarting Vim.",
    answer: ":so $MYVIMRC",
    explanation:
      "`:so $MYVIMRC` (source) applies your vimrc changes immediately — no restart needed.",
  },
];
