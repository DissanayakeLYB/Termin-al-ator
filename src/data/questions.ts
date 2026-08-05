/**
 * Question dataset for the termin(al)ator trainer.
 *
 * To add a new tool category (Shell, Git, Docker, …):
 *   1. Add its name to the `Category` union.
 *   2. Export a `xxxQuestions: QuizQuestion[]` array for it.
 *   3. Add an entry to the `questionSets` registry (label + description).
 *   4. The category picker (CategoryPage) picks it up automatically.
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

export const tmuxQuestions: QuizQuestion[] = [
  // ── Sessions ──────────────────────────────────────────────────────────────
  {
    id: "tmux-new-session",
    category: "tmux",
    prompt: "Start a new tmux session named `work`.",
    answer: "tmux new -s work",
    aliases: ["tmux new-session -s work"],
    explanation:
      "`-s` names the session, so you can find and attach to it later with `tmux attach -t work`.",
  },
  {
    id: "tmux-new-detached",
    category: "tmux",
    prompt: "Start a new session named `work` without attaching to it.",
    answer: "tmux new -d -s work",
    aliases: ["tmux new-session -d -s work"],
    explanation:
      "`-d` detaches immediately — perfect for starting background work and attaching later.",
  },
  {
    id: "tmux-list",
    category: "tmux",
    prompt: "List all running tmux sessions.",
    answer: "tmux ls",
    aliases: ["tmux list-sessions"],
    explanation: "`tmux ls` is the short form of `tmux list-sessions`.",
  },
  {
    id: "tmux-attach-last",
    category: "tmux",
    prompt: "Attach to the most recently used session.",
    answer: "tmux attach",
    aliases: ["tmux a", "tmux attach-session"],
    explanation:
      "`tmux attach` (or `tmux a`) rejoins the most recently used session.",
  },
  {
    id: "tmux-attach-named",
    category: "tmux",
    prompt: "Attach to the session named `work`.",
    answer: "tmux attach -t work",
    aliases: ["tmux a -t work"],
    explanation: "`-t` targets the session by name — `tmux attach -t work`.",
  },
  {
    id: "tmux-detach",
    category: "tmux",
    prompt: "Leave the current session, keeping it running in the background.",
    answer: "Ctrl+b d",
    explanation:
      "`Ctrl+b d` detaches — the session keeps running. Rejoin anytime with `tmux attach`.",
  },
  {
    id: "tmux-kill-session",
    category: "tmux",
    prompt: "Kill the session named `work` entirely.",
    answer: "tmux kill-session -t work",
    explanation:
      "`tmux kill-session -t work` ends that session and everything running inside it.",
  },
  {
    id: "tmux-kill-server",
    category: "tmux",
    prompt: "Kill every tmux session at once.",
    answer: "tmux kill-server",
    explanation:
      "`tmux kill-server` stops the server and all sessions with it — a nuke, not a scalpel.",
  },
  {
    id: "tmux-rename-session",
    category: "tmux",
    prompt: "Rename the current session to `dev`.",
    answer: "Ctrl+b $",
    explanation:
      "`Ctrl+b $` prompts for a new session name — `$` rhymes with 'session'.",
  },
  {
    id: "tmux-rename-session-cli",
    category: "tmux",
    prompt: "Rename the session `work` to `dev` from the shell.",
    answer: "tmux rename-session -t work dev",
    explanation: "`-t` says which session, the last argument is the new name.",
  },
  {
    id: "tmux-attach-or-create",
    category: "tmux",
    prompt: "Attach to `work` if it exists, or create it if it doesn't.",
    answer: "tmux new -A -s work",
    aliases: ["tmux new-session -A -s work"],
    explanation:
      "`-A` attaches if the session already exists and creates it otherwise — idempotent tmux.",
  },
  {
    id: "tmux-session-chooser",
    category: "tmux",
    prompt: "Open the interactive chooser to browse and switch sessions.",
    answer: "Ctrl+b s",
    explanation: "`Ctrl+b s` lists all sessions in a picker — arrows to navigate, Enter to jump.",
  },

  // ── Panes ─────────────────────────────────────────────────────────────────
  {
    id: "tmux-split-side",
    category: "tmux",
    prompt: "Split the current pane into two, side by side.",
    answer: "Ctrl+b %",
    explanation:
      "`%` splits with a vertical divider (left | right). Think of the `%` sign's two circles.",
  },
  {
    id: "tmux-split-stack",
    category: "tmux",
    prompt: "Split the current pane into two, one above the other.",
    answer: "Ctrl+b \"",
    explanation:
      "The double-quote splits with a horizontal divider (top / bottom).",
  },
  {
    id: "tmux-pane-next",
    category: "tmux",
    prompt: "Move to the next pane.",
    answer: "Ctrl+b o",
    explanation: "`Ctrl+b o` cycles focus to the next pane. Keep pressing to keep moving.",
  },
  {
    id: "tmux-pane-last",
    category: "tmux",
    prompt: "Jump back to the previously active pane.",
    answer: "Ctrl+b ;",
    explanation:
      "`Ctrl+b ;` toggles between the last two panes — handy when switching back and forth.",
  },
  {
    id: "tmux-pane-numbers",
    category: "tmux",
    prompt: "Show pane numbers so you can jump straight to one.",
    answer: "Ctrl+b q",
    explanation:
      "`Ctrl+b q` flashes a number on each pane; press the number to jump there.",
  },
  {
    id: "tmux-pane-zoom",
    category: "tmux",
    prompt: "Zoom the current pane to fill the whole window (toggle).",
    answer: "Ctrl+b z",
    explanation:
      "`Ctrl+b z` maximizes the pane; press it again to restore the split.",
  },
  {
    id: "tmux-pane-close",
    category: "tmux",
    prompt: "Close the current pane.",
    answer: "Ctrl+b x",
    aliases: ["Ctrl+d"],
    explanation:
      "`Ctrl+b x` asks for confirmation, then closes the pane. `Ctrl+d` in the pane's shell also works.",
  },
  {
    id: "tmux-pane-break",
    category: "tmux",
    prompt: "Break the current pane out into its own window.",
    answer: "Ctrl+b !",
    explanation: "`!` pulls the current pane into a brand-new window — great for refocusing.",
  },
  {
    id: "tmux-pane-swap-prev",
    category: "tmux",
    prompt: "Swap the current pane with the previous one.",
    answer: "Ctrl+b {",
    explanation: "`Ctrl+b {` moves the current pane one slot left (or up) — reorganizing splits.",
  },
  {
    id: "tmux-pane-swap-next",
    category: "tmux",
    prompt: "Swap the current pane with the next one.",
    answer: "Ctrl+b }",
    explanation: "`Ctrl+b }` moves the current pane one slot right (or down) — the mirror of `{`.",
  },
  {
    id: "tmux-pane-resize",
    category: "tmux",
    prompt: "Resize the current pane 10 cells taller.",
    answer: "resize-pane -U 10",
    aliases: ["tmux resize-pane -U 10"],
    explanation:
      "`resize-pane -U 10` grows the pane up by 10 lines — type it at the `Ctrl+b :` command prompt.",
  },
  {
    id: "tmux-layout-cycle",
    category: "tmux",
    prompt: "Cycle through the preset pane layouts.",
    answer: "Ctrl+b Space",
    explanation:
      "`Space` cycles layouts like even-horizontal, even-vertical, and tiled.",
  },

  // ── Windows ───────────────────────────────────────────────────────────────
  {
    id: "tmux-window-new",
    category: "tmux",
    prompt: "Create a new window.",
    answer: "Ctrl+b c",
    explanation: "`c` for create — a fresh window appears, numbered after the last one.",
  },
  {
    id: "tmux-window-next",
    category: "tmux",
    prompt: "Switch to the next window.",
    answer: "Ctrl+b n",
    explanation: "`n` for next — moves forward one window in the list.",
  },
  {
    id: "tmux-window-prev",
    category: "tmux",
    prompt: "Switch to the previous window.",
    answer: "Ctrl+b p",
    explanation: "`p` for previous — moves backward one window.",
  },
  {
    id: "tmux-window-number",
    category: "tmux",
    prompt: "Jump straight to window 3.",
    answer: "Ctrl+b 3",
    explanation:
      "Windows are numbered 0–9 — `Ctrl+b 3` jumps to window 3 directly.",
  },
  {
    id: "tmux-window-last",
    category: "tmux",
    prompt: "Switch to the window you visited most recently.",
    answer: "Ctrl+b l",
    explanation: "`l` for last — toggles between your current and previous window.",
  },
  {
    id: "tmux-window-list",
    category: "tmux",
    prompt: "Open the interactive chooser to pick a window.",
    answer: "Ctrl+b w",
    explanation: "`Ctrl+b w` lists all windows; navigate and hit Enter to jump.",
  },
  {
    id: "tmux-window-rename",
    category: "tmux",
    prompt: "Rename the current window to `logs`.",
    answer: "Ctrl+b ,",
    explanation: "`Ctrl+b ,` prompts for a new window name — commas are under your fingers.",
  },
  {
    id: "tmux-window-kill",
    category: "tmux",
    prompt: "Kill the current window (and everything running in it).",
    answer: "Ctrl+b &",
    explanation: "`&` closes the whole window after a confirm prompt — every pane inside dies.",
  },
  {
    id: "tmux-window-find",
    category: "tmux",
    prompt: "Find a window by searching for text in its title.",
    answer: "Ctrl+b f",
    explanation: "`f` prompts for a pattern and jumps to the first window whose title matches.",
  },
  {
    id: "tmux-window-new-cli",
    category: "tmux",
    prompt: "Create a new window named `monitor` in session `work` from the shell.",
    answer: "tmux new-window -n monitor -t work",
    explanation:
      "`-n` names the new window; `-t work` targets which session it belongs to.",
  },

  // ── Copy mode & buffers ───────────────────────────────────────────────────
  {
    id: "tmux-copy-mode",
    category: "tmux",
    prompt: "Enter copy mode so you can scroll through the pane history.",
    answer: "Ctrl+b [",
    explanation:
      "`Ctrl+b [` freezes the pane for scrolling and selecting — the bracket points backward.",
  },
  {
    id: "tmux-copy-scroll",
    category: "tmux",
    prompt: "Enter copy mode and jump up one page in the history.",
    answer: "Ctrl+b PgUp",
    aliases: ["Ctrl+b PageUp"],
    explanation:
      "`Ctrl+b PgUp` enters copy mode already scrolled up one page — the fastest way to look back.",
  },
  {
    id: "tmux-copy-exit",
    category: "tmux",
    prompt: "Leave copy mode without copying anything.",
    answer: "q",
    explanation:
      "`q` quits copy mode. Pressing Enter also exits (after copying the selection).",
  },
  {
    id: "tmux-copy-select",
    category: "tmux",
    prompt: "In copy mode with default bindings, start the selection at the cursor.",
    answer: "Space",
    aliases: ["space", "SPACE"],
    explanation:
      "`Space` begins the selection in tmux's default (emacs-style) copy mode; vi-mode users press `v`.",
  },
  {
    id: "tmux-copy-yank",
    category: "tmux",
    prompt: "In copy mode, copy the selected text.",
    answer: "Enter",
    aliases: ["enter", "ENTER"],
    explanation:
      "`Enter` yanks the selection into the tmux buffer. Vi-mode users press `y` instead.",
  },
  {
    id: "tmux-paste-buffer",
    category: "tmux",
    prompt: "Paste the most recently copied text.",
    answer: "Ctrl+b ]",
    explanation:
      "`Ctrl+b ]` pastes the latest buffer — the bracket points forward, into the pane.",
  },
  {
    id: "tmux-choose-buffer",
    category: "tmux",
    prompt: "Open the buffer chooser to paste from any saved buffer.",
    answer: "Ctrl+b =",
    explanation: "`Ctrl+b =` shows all buffers; pick one and it's pasted into the current pane.",
  },
  {
    id: "tmux-list-buffers",
    category: "tmux",
    prompt: "List all copy buffers from the shell.",
    answer: "tmux list-buffers",
    explanation: "`tmux list-buffers` shows every saved yank with its contents.",
  },
  {
    id: "tmux-capture-pane",
    category: "tmux",
    prompt: "Dump the entire visible pane content to standard output.",
    answer: "tmux capture-pane -p",
    explanation:
      "`-p` prints to stdout — pipe it into a file or grep to search what's on screen.",
  },

  // ── Customization & config ────────────────────────────────────────────────
  {
    id: "tmux-command-prompt",
    category: "tmux",
    prompt: "Open the tmux command prompt to type a tmux command.",
    answer: "Ctrl+b :",
    explanation:
      "`Ctrl+b :` gives you a `:` prompt — the gateway to every tmux command.",
  },
  {
    id: "tmux-help",
    category: "tmux",
    prompt: "Show all key bindings — tmux's built-in help.",
    answer: "Ctrl+b ?",
    explanation:
      "`Ctrl+b ?` opens the key-bindings list. Press `q` to close it.",
  },
  {
    id: "tmux-clock",
    category: "tmux",
    prompt: "Show a big clock in the current pane.",
    answer: "Ctrl+b t",
    explanation: "`Ctrl+b t` displays a full-pane clock. Press any key to dismiss it.",
  },
  {
    id: "tmux-mouse",
    category: "tmux",
    prompt: "Enable mouse support for all sessions.",
    answer: "tmux set -g mouse on",
    explanation:
      "`-g` sets it globally — you can resize panes and select text with the mouse.",
  },
  {
    id: "tmux-prefix-change",
    category: "tmux",
    prompt: "Change the prefix key from Ctrl+b to Ctrl+a.",
    answer: "tmux set -g prefix C-a",
    explanation:
      "`set -g prefix C-a` rebinds the prefix. Many users also unbind the old `C-b`.",
  },
  {
    id: "tmux-reload-config",
    category: "tmux",
    prompt: "Reload your tmux configuration from `~/.tmux.conf`.",
    answer: "source-file ~/.tmux.conf",
    aliases: ["tmux source-file ~/.tmux.conf"],
    explanation:
      "Type `source-file ~/.tmux.conf` at the `Ctrl+b :` prompt to apply config changes live.",
  },
  {
    id: "tmux-list-keys",
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
    category: "git",
    prompt: "Create a new repository in the current directory.",
    answer: "git init",
    explanation:
      "`git init` creates the hidden `.git` folder that makes this directory a repository.",
  },
  {
    id: "git-clone",
    category: "git",
    prompt: "Copy the remote repository `https://github.com/user/repo.git` into the current folder.",
    answer: "git clone https://github.com/user/repo.git",
    explanation:
      "`git clone` downloads the repo and its whole history into a new folder named `repo`.",
  },
  {
    id: "git-status",
    category: "git",
    prompt: "Show the current state of the working tree and the staging area.",
    answer: "git status",
    explanation:
      "`git status` tells you what changed, what's staged, and what's untracked — check it constantly.",
  },
  {
    id: "git-add-all",
    category: "git",
    prompt: "Stage every change — new, modified, and deleted files — in one go.",
    answer: "git add .",
    aliases: ["git add -A", "git add --all"],
    explanation:
      "`git add .` stages everything in the current directory. `-A` also catches deletions above it.",
  },
  {
    id: "git-add-file",
    category: "git",
    prompt: "Stage only the file `main.py`.",
    answer: "git add main.py",
    explanation:
      "Naming the file stages just that one — git lets you stage changes piece by piece.",
  },
  {
    id: "git-add-patch",
    category: "git",
    prompt: "Review each change and stage it interactively, hunk by hunk.",
    answer: "git add -p",
    explanation:
      "`git add -p` walks through every hunk and asks whether to stage it — surgical staging.",
  },
  {
    id: "git-commit-message",
    category: "git",
    prompt: "Commit the staged changes with the message `fix typo`.",
    answer: "git commit -m \"fix typo\"",
    explanation:
      "`-m` supplies the message inline so git skips the editor. Quote the message.",
  },
  {
    id: "git-commit-amend",
    category: "git",
    prompt: "Rewrite the most recent commit's message in your editor.",
    answer: "git commit --amend",
    explanation:
      "`git commit --amend` replaces the last commit — great for fixing a typo'd message before pushing.",
  },

  // ── Diff & history ────────────────────────────────────────────────────────
  {
    id: "git-diff",
    category: "git",
    prompt: "Show the unstaged changes in your working tree.",
    answer: "git diff",
    explanation: "`git diff` compares the working tree against the staging area — what you haven't staged.",
  },
  {
    id: "git-diff-staged",
    category: "git",
    prompt: "Show the changes you've staged, ready to be committed.",
    answer: "git diff --staged",
    aliases: ["git diff --cached"],
    explanation:
      "`git diff --staged` (or `--cached`) shows exactly what would go into the next commit.",
  },
  {
    id: "git-show-commit",
    category: "git",
    prompt: "Show the full details and diff of commit `abc1234`.",
    answer: "git show abc1234",
    explanation:
      "`git show <sha>` prints the commit message, metadata, and the changes it introduced.",
  },
  {
    id: "git-log",
    category: "git",
    prompt: "List the commit history, newest first.",
    answer: "git log",
    explanation:
      "`git log` shows each commit with its hash, author, date, and message.",
  },
  {
    id: "git-log-oneline",
    category: "git",
    prompt: "List the commit history as one compact line per commit.",
    answer: "git log --oneline",
    explanation:
      "`--oneline` collapses each commit to its short hash and message — the daily driver view.",
  },
  {
    id: "git-log-graph",
    category: "git",
    prompt: "Show the commit history as an ASCII graph of branches and merges.",
    answer: "git log --graph",
    aliases: ["git log --graph --all"],
    explanation:
      "`--graph` draws the branch topology. `git log --graph --all` includes every branch, not just the current one.",
  },
  {
    id: "git-log-p",
    category: "git",
    prompt: "Show the commit history with the full diff of every commit.",
    answer: "git log -p",
    explanation:
      "`-p` (patch) shows each commit's changes right under its message — great for digging into history.",
  },
  {
    id: "git-log-author",
    category: "git",
    prompt: "Find every commit written by the author `alice`.",
    answer: "git log --author=alice",
    explanation:
      "`--author=` filters the log by author — useful for reviewing someone's contribution.",
  },
  {
    id: "git-blame",
    category: "git",
    prompt: "Show which commit last touched each line of `main.py`.",
    answer: "git blame main.py",
    explanation:
      "`git blame` annotates every line with the commit that last changed it — who wrote this line, and why.",
  },
  {
    id: "git-grep",
    category: "git",
    prompt: "Search the tracked files for the word `TODO`.",
    answer: "git grep TODO",
    explanation:
      "`git grep` searches only tracked files — it skips build artifacts and ignored files.",
  },
  {
    id: "git-shortlog",
    category: "git",
    prompt: "Summarize how many commits each author contributed.",
    answer: "git shortlog -sn",
    explanation:
      "`-s` prints just the count, `-n` sorts by number of commits — instant contribution stats.",
  },

  // ── Branches & merging ────────────────────────────────────────────────────
  {
    id: "git-branch-list",
    category: "git",
    prompt: "List all local branches.",
    answer: "git branch",
    explanation: "`git branch` lists branches and marks the current one with an asterisk.",
  },
  {
    id: "git-branch-new",
    category: "git",
    prompt: "Create a new branch named `feature` without switching to it.",
    answer: "git branch feature",
    explanation:
      "`git branch <name>` just creates the pointer — you switch to it separately.",
  },
  {
    id: "git-checkout-new",
    category: "git",
    prompt: "Create a branch named `feature` and switch to it in one command.",
    answer: "git checkout -b feature",
    aliases: ["git switch -c feature"],
    explanation:
      "`-b` means branch — it creates and checks out. The newer `git switch -c` does the same.",
  },
  {
    id: "git-switch-branch",
    category: "git",
    prompt: "Switch to the existing branch `main`.",
    answer: "git checkout main",
    aliases: ["git switch main"],
    explanation:
      "`git checkout main` (or the newer `git switch main`) moves you onto that branch.",
  },
  {
    id: "git-branch-delete",
    category: "git",
    prompt: "Delete the fully merged branch `feature`.",
    answer: "git branch -d feature",
    explanation:
      "`-d` deletes only merged branches — git protects you from losing unmerged work.",
  },
  {
    id: "git-branch-delete-force",
    category: "git",
    prompt: "Force-delete the branch `feature` even though it isn't merged.",
    answer: "git branch -D feature",
    explanation:
      "Uppercase `-D` overrides the safety check. Only use it when you truly want that work gone.",
  },
  {
    id: "git-branch-rename",
    category: "git",
    prompt: "Rename the current branch to `topic`.",
    answer: "git branch -m topic",
    explanation:
      "`-m` (move) renames the branch you're on — `git branch -m old new` works from anywhere.",
  },
  {
    id: "git-merge",
    category: "git",
    prompt: "Merge the branch `feature` into the current branch.",
    answer: "git merge feature",
    explanation:
      "`git merge feature` folds that branch's commits into your current branch.",
  },
  {
    id: "git-merge-abort",
    category: "git",
    prompt: "Abort a merge that ran into conflicts.",
    answer: "git merge --abort",
    explanation:
      "`git merge --abort` backs out of a conflicted merge and restores your pre-merge state.",
  },
  {
    id: "git-rebase",
    category: "git",
    prompt: "Replay the current branch's commits on top of `main`.",
    answer: "git rebase main",
    explanation:
      "Rebasing rewrites your commits so they sit on top of `main` — a linear, clean history.",
  },
  {
    id: "git-rebase-interactive",
    category: "git",
    prompt: "Squash, reword, or reorder the last 3 commits interactively.",
    answer: "git rebase -i HEAD~3",
    explanation:
      "`-i` opens an editor listing the last three commits — change `pick` to `squash` to fold them.",
  },
  {
    id: "git-cherry-pick",
    category: "git",
    prompt: "Apply the changes of commit `abc1234` onto the current branch.",
    answer: "git cherry-pick abc1234",
    explanation:
      "`git cherry-pick` copies a single commit's changes onto your branch — no merge needed.",
  },
  {
    id: "git-revert",
    category: "git",
    prompt: "Undo commit `abc1234` by creating a new commit that reverses it.",
    answer: "git revert abc1234",
    explanation:
      "`git revert` adds an inverse commit — history stays intact, which matters once you've pushed.",
  },

  // ── Undoing & recovery ────────────────────────────────────────────────────
  {
    id: "git-reset-soft",
    category: "git",
    prompt: "Move the branch pointer back one commit, keeping the changes staged.",
    answer: "git reset --soft HEAD~1",
    explanation:
      "`--soft` only moves the pointer — your changes stay in the staging area, ready to recommit.",
  },
  {
    id: "git-reset-hard",
    category: "git",
    prompt: "Throw away all uncommitted changes and reset to the last commit.",
    answer: "git reset --hard HEAD",
    explanation:
      "`--hard` discards staged and unstaged changes alike. There's no undo for this one — use with care.",
  },
  {
    id: "git-restore-file",
    category: "git",
    prompt: "Discard the unstaged changes to `main.py`, restoring it to the last commit.",
    answer: "git checkout -- main.py",
    aliases: ["git restore main.py"],
    explanation:
      "`git checkout -- <file>` (or `git restore <file>`) reverts that file's unstaged edits.",
  },
  {
    id: "git-restore-staged",
    category: "git",
    prompt: "Unstage `main.py` but keep its changes in the working tree.",
    answer: "git restore --staged main.py",
    aliases: ["git reset HEAD main.py"],
    explanation:
      "`--staged` only removes the file from the index — the edits themselves are untouched.",
  },
  {
    id: "git-reflog",
    category: "git",
    prompt: "See the history of where HEAD has been — the way to recover a lost commit.",
    answer: "git reflog",
    explanation:
      "`git reflog` logs every move of HEAD, even after resets — your safety net for lost work.",
  },
  {
    id: "git-clean-dry",
    category: "git",
    prompt: "Preview which untracked files would be deleted.",
    answer: "git clean -n",
    aliases: ["git clean --dry-run"],
    explanation:
      "`-n` (dry run) lists what `git clean` would remove without removing anything.",
  },
  {
    id: "git-clean",
    category: "git",
    prompt: "Delete untracked files and directories.",
    answer: "git clean -fd",
    explanation:
      "`-f` forces the delete, `-d` includes directories. Check with `git clean -n` first.",
  },
  {
    id: "git-stash",
    category: "git",
    prompt: "Set aside all uncommitted changes without committing them.",
    answer: "git stash",
    explanation:
      "`git stash` shelves your work-in-progress so you can switch branches cleanly.",
  },
  {
    id: "git-stash-list",
    category: "git",
    prompt: "List all saved stashes.",
    answer: "git stash list",
    explanation: "`git stash list` shows every shelved change set, oldest first.",
  },
  {
    id: "git-stash-pop",
    category: "git",
    prompt: "Restore the most recent stash and remove it from the stash list.",
    answer: "git stash pop",
    explanation: "`pop` applies the stash and drops it — one command, both halves of the round trip.",
  },
  {
    id: "git-stash-apply",
    category: "git",
    prompt: "Restore the most recent stash but keep it in the stash list.",
    answer: "git stash apply",
    explanation:
      "`apply` restores the changes without removing the stash — useful when you need them twice.",
  },
  {
    id: "git-stash-drop",
    category: "git",
    prompt: "Delete the most recent stash.",
    answer: "git stash drop",
    explanation:
      "`git stash drop` discards the newest stash. Name one explicitly (like `stash@{2}`) to drop another.",
  },

  // ── Remotes & publishing ──────────────────────────────────────────────────
  {
    id: "git-remote-list",
    category: "git",
    prompt: "List all configured remotes and their URLs.",
    answer: "git remote -v",
    explanation:
      "`-v` (verbose) also prints each remote's fetch and push URLs — the default remote is `origin`.",
  },
  {
    id: "git-remote-add",
    category: "git",
    prompt: "Add a remote named `origin` pointing at `https://github.com/user/repo.git`.",
    answer: "git remote add origin https://github.com/user/repo.git",
    explanation:
      "`git remote add <name> <url>` registers a remote; `origin` is the conventional first one.",
  },
  {
    id: "git-remote-remove",
    category: "git",
    prompt: "Remove the remote named `origin`.",
    answer: "git remote remove origin",
    explanation:
      "`git remote remove origin` forgets the remote — it doesn't touch the repo on the server.",
  },
  {
    id: "git-fetch",
    category: "git",
    prompt: "Download new commits from the remote without merging them.",
    answer: "git fetch",
    explanation:
      "`git fetch` updates your remote-tracking branches; your working tree stays untouched.",
  },
  {
    id: "git-pull",
    category: "git",
    prompt: "Fetch and merge the remote changes into your current branch.",
    answer: "git pull",
    explanation: "`git pull` is `git fetch` plus a merge — it brings your branch up to date.",
  },
  {
    id: "git-pull-rebase",
    category: "git",
    prompt: "Fetch remote changes and rebase your local commits on top of them.",
    answer: "git pull --rebase",
    explanation:
      "`--rebase` replays your unpushed commits on top of the incoming ones — a linear history.",
  },
  {
    id: "git-push-upstream",
    category: "git",
    prompt: "Push the `main` branch to `origin` and remember it as the upstream.",
    answer: "git push -u origin main",
    explanation:
      "`-u` sets the upstream, so later you can just type `git push` (or `git pull`) with no arguments.",
  },
  {
    id: "git-push-tags",
    category: "git",
    prompt: "Push all tags to the remote.",
    answer: "git push --tags",
    explanation:
      "`git push` doesn't send tags automatically — `--tags` pushes them all at once.",
  },
  {
    id: "git-tag",
    category: "git",
    prompt: "Tag the current commit as `v1.0.0`.",
    answer: "git tag v1.0.0",
    explanation: "`git tag <name>` marks the current commit — a lightweight pointer, like a branch that never moves.",
  },
  {
    id: "git-tag-annotated",
    category: "git",
    prompt: "Create an annotated tag `v1.0.0` with the message `release`.",
    answer: "git tag -a v1.0.0 -m \"release\"",
    explanation:
      "`-a` adds a message and the tagger's name and date — the full-fidelity version of a tag.",
  },

  // ── Advanced workflows ────────────────────────────────────────────────────
  {
    id: "git-bisect-start",
    category: "git",
    prompt: "Start a binary search to find the commit that introduced a bug.",
    answer: "git bisect start",
    explanation:
      "`git bisect start` begins the hunt — you'll mark commits good and bad until git narrows it down.",
  },
  {
    id: "git-bisect-bad",
    category: "git",
    prompt: "Tell git the current commit is the one with the bug.",
    answer: "git bisect bad",
    explanation: "`git bisect bad` marks the broken end of the range.",
  },
  {
    id: "git-bisect-good",
    category: "git",
    prompt: "Tell git the current commit is known to be fine.",
    answer: "git bisect good",
    explanation:
      "`git bisect good` halves the search range; keep answering until git names the culprit commit.",
  },
  {
    id: "git-config-name",
    category: "git",
    prompt: "Set your commit author name to `Alice` for every repository.",
    answer: "git config --global user.name Alice",
    explanation:
      "`--global` writes to your user config, so the name applies everywhere. `--local` overrides per repo.",
  },
  {
    id: "git-config-email",
    category: "git",
    prompt: "Set your commit email globally to `alice@example.com`.",
    answer: "git config --global user.email alice@example.com",
    explanation:
      "Your email is recorded in every commit — commit before setting it and git may refuse.",
  },
  {
    id: "git-config-list",
    category: "git",
    prompt: "Show all current git configuration.",
    answer: "git config --list",
    explanation:
      "`git config --list` dumps the effective config across global and repo levels.",
  },
  {
    id: "git-diff-branches",
    category: "git",
    prompt: "Show the difference between branch `main` and branch `feature`.",
    answer: "git diff main feature",
    explanation:
      "`git diff <a> <b>` compares two branches — see what merging `feature` would change.",
  },
  {
    id: "git-worktree",
    category: "git",
    prompt: "Create a linked worktree for branch `fix` in the folder `../fix`.",
    answer: "git worktree add ../fix fix",
    explanation:
      "Worktrees let you check out a second branch in a separate folder of the same repo — no stashing.",
  },
];

export const shellQuestions: QuizQuestion[] = [
  // ── Files & navigation ────────────────────────────────────────────────────
  {
    id: "shell-pwd",
    category: "shell",
    prompt: "Print the full path of the current working directory.",
    answer: "pwd",
    explanation: "`pwd` (print working directory) tells you exactly where you are in the filesystem.",
  },
  {
    id: "shell-ls",
    category: "shell",
    prompt: "List the files in the current directory.",
    answer: "ls",
    explanation: "`ls` lists the directory contents — the first command most people learn.",
  },
  {
    id: "shell-ls-all",
    category: "shell",
    prompt: "List all files, including hidden ones that start with a dot.",
    answer: "ls -a",
    explanation: "`-a` (all) reveals hidden files like `.git` and `.bashrc`.",
  },
  {
    id: "shell-ls-la",
    category: "shell",
    prompt: "List every file with full details — permissions, sizes, dates.",
    answer: "ls -la",
    explanation:
      "`ls -la` combines `-a` and `-l` — the standard 'everything about this directory' view.",
  },
  {
    id: "shell-cd-home",
    category: "shell",
    prompt: "Go to your home directory.",
    answer: "cd ~",
    aliases: ["cd"],
    explanation: "`cd ~` (or bare `cd`) jumps home — the `~` is shorthand for your home path.",
  },
  {
    id: "shell-cd-up",
    category: "shell",
    prompt: "Go up one directory level.",
    answer: "cd ..",
    explanation: "`..` is the parent directory, so `cd ..` moves one level up.",
  },
  {
    id: "shell-cd-back",
    category: "shell",
    prompt: "Jump back to the directory you were just in.",
    answer: "cd -",
    explanation:
      "`cd -` toggles between your current and previous directory — faster than typing paths.",
  },
  {
    id: "shell-mkdir-p",
    category: "shell",
    prompt: "Create the nested path `a/b/c`, making any missing parents.",
    answer: "mkdir -p a/b/c",
    explanation: "`-p` (parents) creates every missing directory in the path in one go.",
  },
  {
    id: "shell-touch",
    category: "shell",
    prompt: "Create a new empty file named `notes.txt`.",
    answer: "touch notes.txt",
    explanation:
      "`touch` creates an empty file if it doesn't exist (and updates the timestamp if it does).",
  },
  {
    id: "shell-cp",
    category: "shell",
    prompt: "Copy `notes.txt` to a new file named `backup.txt`.",
    answer: "cp notes.txt backup.txt",
    explanation: "`cp <source> <dest>` duplicates a file — `cp -r` does the same for directories.",
  },
  {
    id: "shell-mv",
    category: "shell",
    prompt: "Rename `old.txt` to `new.txt`.",
    answer: "mv old.txt new.txt",
    explanation: "`mv` moves or renames — there's no separate rename command in the shell.",
  },
  {
    id: "shell-rm",
    category: "shell",
    prompt: "Delete the file `temp.txt`.",
    answer: "rm temp.txt",
    explanation: "`rm` deletes files permanently — there's no trash bin, so use it deliberately.",
  },
  {
    id: "shell-rm-rf",
    category: "shell",
    prompt: "Force-delete the directory `build` and everything inside it.",
    answer: "rm -rf build",
    explanation:
      "`-r` recurses, `-f` skips confirmations. `rm -rf` is powerful — double-check before running.",
  },
  {
    id: "shell-ln",
    category: "shell",
    prompt: "Create a symlink named `current` that points at the directory `data`.",
    answer: "ln -s data current",
    explanation:
      "`ln -s <target> <link>` makes a shortcut — the link behaves like the real path.",
  },

  // ── Viewing & searching ───────────────────────────────────────────────────
  {
    id: "shell-cat",
    category: "shell",
    prompt: "Print the entire contents of `file.txt` to the terminal.",
    answer: "cat file.txt",
    explanation: "`cat` dumps a file to stdout — short files only, or the output scrolls away.",
  },
  {
    id: "shell-less",
    category: "shell",
    prompt: "View `file.txt` one screen at a time, with scrolling.",
    answer: "less file.txt",
    explanation:
      "`less` pages through long files — space to page, `/` to search, `q` to quit.",
  },
  {
    id: "shell-head",
    category: "shell",
    prompt: "Show only the first 5 lines of `file.txt`.",
    answer: "head -n 5 file.txt",
    aliases: ["head -5 file.txt"],
    explanation: "`head -n N` shows the top N lines — `head -5` is a shorthand that also works.",
  },
  {
    id: "shell-tail",
    category: "shell",
    prompt: "Show only the last 10 lines of `file.txt`.",
    answer: "tail -n 10 file.txt",
    explanation: "`tail -n N` shows the bottom N lines — the default is the last 10.",
  },
  {
    id: "shell-tail-f",
    category: "shell",
    prompt: "Follow `app.log` and print new lines as they're appended.",
    answer: "tail -f app.log",
    explanation:
      "`tail -f` (follow) watches a growing file — the standard way to watch server logs live.",
  },
  {
    id: "shell-grep",
    category: "shell",
    prompt: "Print the lines of `file.txt` that contain `error`.",
    answer: "grep error file.txt",
    explanation: "`grep <pattern> <file>` filters lines by a pattern — the workhorse of the shell.",
  },
  {
    id: "shell-grep-i",
    category: "shell",
    prompt: "Search `file.txt` for `error`, ignoring case.",
    answer: "grep -i error file.txt",
    explanation: "`-i` makes the match case-insensitive, so `Error` and `ERROR` count too.",
  },
  {
    id: "shell-grep-v",
    category: "shell",
    prompt: "Show the lines of `file.txt` that do NOT contain `debug`.",
    answer: "grep -v debug file.txt",
    explanation: "`-v` inverts the match — everything except lines with `debug`.",
  },
  {
    id: "shell-grep-rn",
    category: "shell",
    prompt: "Search every file under `src` for `TODO`, printing file names and line numbers.",
    answer: "grep -rn TODO src",
    aliases: ["grep -r TODO src"],
    explanation: "`-r` recurses into directories; `-n` adds line numbers for each hit.",
  },
  {
    id: "shell-find-name",
    category: "shell",
    prompt: "Find every file matching `*.log` under the current directory.",
    answer: "find . -name \"*.log\"",
    explanation:
      "`find` walks the tree — `-name` matches filenames. The quotes stop the shell from expanding the glob itself.",
  },
  {
    id: "shell-find-type",
    category: "shell",
    prompt: "Find every directory under the current directory.",
    answer: "find . -type d",
    explanation: "`-type d` matches directories (`-type f` matches files) — useful for mapping a tree.",
  },
  {
    id: "shell-wc-l",
    category: "shell",
    prompt: "Count how many lines `file.txt` has.",
    answer: "wc -l file.txt",
    explanation: "`wc -l` counts lines — `wc -w` counts words and `wc -c` counts bytes.",
  },
  {
    id: "shell-sort-nr",
    category: "shell",
    prompt: "Sort `file.txt` numerically, largest first.",
    answer: "sort -nr file.txt",
    explanation: "`-n` sorts by number (so 10 beats 9), `-r` reverses to descending order.",
  },

  // ── Pipes, redirection & processes ────────────────────────────────────────
  {
    id: "shell-pipe-count",
    category: "shell",
    prompt: "Count how many files are in the current directory.",
    answer: "ls | wc -l",
    explanation:
      "The pipe `|` feeds one command's output into the next — here, `ls` into `wc -l`.",
  },
  {
    id: "shell-ps-grep",
    category: "shell",
    prompt: "Find the process that's running `nginx`.",
    answer: "ps aux | grep nginx",
    explanation:
      "`ps aux` lists all processes; piping to `grep nginx` filters for the one you want.",
  },
  {
    id: "shell-redirect-overwrite",
    category: "shell",
    prompt: "Write the output of `ls` into `listing.txt`, replacing whatever was there.",
    answer: "ls > listing.txt",
    explanation:
      "`>` sends stdout into a file, overwriting it — `ls` prints nothing on screen anymore.",
  },
  {
    id: "shell-redirect-append",
    category: "shell",
    prompt: "Add the output of `ls` to the end of `listing.txt` without overwriting it.",
    answer: "ls >> listing.txt",
    explanation: "`>>` appends instead of overwriting — the safe twin of `>`.",
  },
  {
    id: "shell-redirect-both",
    category: "shell",
    prompt: "Capture both stdout and stderr of `ls` into `out.log`.",
    answer: "ls > out.log 2>&1",
    explanation:
      "`2>&1` redirects the error stream (2) to wherever stdout (1) is going — both land in the file.",
  },
  {
    id: "shell-redirect-null",
    category: "shell",
    prompt: "Run `ls missing.txt` silently, discarding its error message.",
    answer: "ls missing.txt 2>/dev/null",
    explanation:
      "`2>/dev/null` throws stderr away — `/dev/null` is the shell's bottomless pit.",
  },
  {
    id: "shell-tee",
    category: "shell",
    prompt: "Show `ls` output on screen AND save it to `listing.txt` at the same time.",
    answer: "ls | tee listing.txt",
    explanation:
      "`tee` splits a stream — one copy to stdout, one to the file. Like a plumbing T-junction.",
  },
  {
    id: "shell-xargs",
    category: "shell",
    prompt: "Print the names of every Python file under `.` that contains `TODO`.",
    answer: "find . -name \"*.py\" | xargs grep -l TODO",
    explanation:
      "`xargs` converts stdin into arguments — each found file becomes an argument to `grep -l`.",
  },
  {
    id: "shell-ps",
    category: "shell",
    prompt: "List every running process with its PID and CPU/memory usage.",
    answer: "ps aux",
    explanation: "`ps aux` is the classic all-processes snapshot — for a live updating view, run `top` instead.",
  },
  {
    id: "shell-kill",
    category: "shell",
    prompt: "Send a termination request to the process with PID 1234.",
    answer: "kill 1234",
    explanation: "`kill` sends SIGTERM — a polite 'please stop' that lets the process clean up.",
  },
  {
    id: "shell-kill-9",
    category: "shell",
    prompt: "Force-kill the process with PID 1234 immediately.",
    answer: "kill -9 1234",
    explanation: "`-9` sends SIGKILL, which the process cannot ignore — last resort for stuck programs.",
  },
  {
    id: "shell-pkill",
    category: "shell",
    prompt: "Kill every process whose name matches `chrome`.",
    answer: "pkill chrome",
    explanation: "`pkill` kills by name instead of PID — no hunting for process numbers first.",
  },
  {
    id: "shell-background",
    category: "shell",
    prompt: "Run `sleep 30` in the background so the prompt returns immediately.",
    answer: "sleep 30 &",
    explanation: "The trailing `&` starts a job in the background and gives you your prompt back.",
  },
  {
    id: "shell-history",
    category: "shell",
    prompt: "Show your command history.",
    answer: "history",
    explanation: "`history` prints what you've typed — pipe it to `grep` to hunt for that one command.",
  },
  {
    id: "shell-rerun-last",
    category: "shell",
    prompt: "Re-run the last command you typed.",
    answer: "!!",
    explanation: "`!!` expands to the previous command — the classic recovery after a failed `sudo`.",
  },
  {
    id: "shell-exit-status",
    category: "shell",
    prompt: "Print the exit status of the last command (0 means success).",
    answer: "echo $?",
    explanation: "`$?` holds the last command's exit code — 0 for success, anything else for failure.",
  },

  // ── Interactive shortcuts ─────────────────────────────────────────────────
  {
    id: "shell-ctrl-c",
    category: "shell",
    prompt: "Interrupt the command currently running and get your prompt back.",
    answer: "Ctrl+c",
    explanation: "`Ctrl+c` sends SIGINT — the universal 'stop this' in the terminal.",
  },
  {
    id: "shell-ctrl-d",
    category: "shell",
    prompt: "Send end-of-input to close the shell.",
    answer: "Ctrl+d",
    explanation:
      "`Ctrl+d` sends EOF — at a bare prompt it exits the shell. It's also how you end stdin to a program.",
  },
  {
    id: "shell-ctrl-z",
    category: "shell",
    prompt: "Suspend the running foreground job so you can resume it later.",
    answer: "Ctrl+z",
    explanation: "`Ctrl+z` pauses the job (SIGTSTP) — `fg` brings it back, `bg` resumes it in the background.",
  },
  {
    id: "shell-ctrl-l",
    category: "shell",
    prompt: "Clear the terminal screen.",
    answer: "Ctrl+l",
    aliases: ["clear"],
    explanation:
      "`Ctrl+l` clears the screen without losing your scrollback — faster than typing `clear`.",
  },
  {
    id: "shell-ctrl-r",
    category: "shell",
    prompt: "Search your command history interactively as you type.",
    answer: "Ctrl+r",
    explanation:
      "`Ctrl+r` starts reverse search — type a fragment and press `Ctrl+r` again to cycle matches.",
  },
  {
    id: "shell-ctrl-a",
    category: "shell",
    prompt: "Jump the cursor to the start of the line while editing a command.",
    answer: "Ctrl+a",
    explanation: "`Ctrl+a` moves to the line start; `Ctrl+e` moves to the end — the readline quick pair.",
  },
  {
    id: "shell-ctrl-e",
    category: "shell",
    prompt: "Jump the cursor to the end of the line while editing a command.",
    answer: "Ctrl+e",
    explanation: "`Ctrl+e` moves to the line end — the partner of `Ctrl+a`.",
  },
  {
    id: "shell-ctrl-u",
    category: "shell",
    prompt: "Delete everything before the cursor on the current line.",
    answer: "Ctrl+u",
    explanation: "`Ctrl+u` clears back to the prompt — handy when a long command goes wrong.",
  },

  // ── Permissions & ownership ───────────────────────────────────────────────
  {
    id: "shell-chmod-x",
    category: "shell",
    prompt: "Make `deploy.sh` executable.",
    answer: "chmod +x deploy.sh",
    explanation:
      "`+x` adds execute permission — the step between 'writes a script' and 'can run it'.",
  },
  {
    id: "shell-chmod-755",
    category: "shell",
    prompt: "Set `deploy.sh` to rwx for the owner and rx for everyone else.",
    answer: "chmod 755 deploy.sh",
    explanation:
      "In `755`, each digit is owner/group/others: 7 = rwx, 5 = rx. The classic script permission.",
  },
  {
    id: "shell-chown",
    category: "shell",
    prompt: "Give ownership of `file.txt` to the user `alice` and the group `dev`.",
    answer: "chown alice:dev file.txt",
    explanation: "`chown user:group <file>` sets both owner and group in one command.",
  },
  {
    id: "shell-whoami",
    category: "shell",
    prompt: "Show the name of the current user.",
    answer: "whoami",
    explanation: "`whoami` prints your username — check it before blaming a permissions problem.",
  },

  // ── Environment & configuration ───────────────────────────────────────────
  {
    id: "shell-echo-path",
    category: "shell",
    prompt: "Print the value of the `PATH` variable.",
    answer: "echo $PATH",
    explanation:
      "`$PATH` lists the directories the shell searches for commands — the `$` dereferences the variable.",
  },
  {
    id: "shell-export",
    category: "shell",
    prompt: "Set the environment variable `EDITOR` to `vim` for this session.",
    answer: "export EDITOR=vim",
    explanation:
      "`export` makes the variable visible to child processes; without it, only the shell sees it.",
  },
  {
    id: "shell-source",
    category: "shell",
    prompt: "Apply the changes in `~/.bashrc` to the current shell without restarting.",
    answer: "source ~/.bashrc",
    aliases: [". ~/.bashrc"],
    explanation:
      "`source` (or the shorthand `.`) runs the file in the current shell — new aliases appear instantly.",
  },
  {
    id: "shell-alias",
    category: "shell",
    prompt: "Create an alias `ll` that runs `ls -l`.",
    answer: "alias ll='ls -l'",
    explanation:
      "`alias <name>='<command>'` gives you a shortcut — add it to `~/.bashrc` to keep it forever.",
  },
  {
    id: "shell-type",
    category: "shell",
    prompt: "Show what kind of thing the shell considers `cd` to be.",
    answer: "type cd",
    explanation: "`type` reveals whether a name is a builtin, alias, function, or external binary.",
  },
  {
    id: "shell-which",
    category: "shell",
    prompt: "Show the full path of the `git` executable that would run.",
    answer: "which git",
    aliases: ["command -v git"],
    explanation: "`which` prints the resolved path of a command; `command -v` is the portable variant.",
  },
  {
    id: "shell-man",
    category: "shell",
    prompt: "Open the manual page for `ls`.",
    answer: "man ls",
    explanation: "`man <cmd>` is the built-in documentation — `q` quits, `/` searches within the page.",
  },

  // ── Text processing ───────────────────────────────────────────────────────
  {
    id: "shell-cut",
    category: "shell",
    prompt: "Extract the second comma-separated field of every line in `data.csv`.",
    answer: "cut -d, -f2 data.csv",
    explanation: "`-d,` sets the delimiter to a comma and `-f2` picks the second field.",
  },
  {
    id: "shell-awk",
    category: "shell",
    prompt: "Print the first word of every line of `file.txt`.",
    answer: "awk '{print $1}' file.txt",
    explanation:
      "`awk` splits each line on whitespace; `$1` is the first field. Quoted so the shell passes it whole.",
  },
  {
    id: "shell-sed",
    category: "shell",
    prompt: "Replace every `foo` with `bar` in `file.txt`, editing the file in place.",
    answer: "sed -i 's/foo/bar/g' file.txt",
    explanation:
      "`-i` edits the file itself; `s/foo/bar/g` substitutes globally on each line.",
  },
  {
    id: "shell-tr",
    category: "shell",
    prompt: "Convert every lowercase letter in `file.txt` to uppercase.",
    answer: "tr 'a-z' 'A-Z' < file.txt",
    explanation:
      "`tr` translates character sets; `<` feeds the file in as stdin. Pipe the result onward as needed.",
  },
  {
    id: "shell-diff-u",
    category: "shell",
    prompt: "Show the differences between `a.txt` and `b.txt` as a unified diff.",
    answer: "diff -u a.txt b.txt",
    explanation:
      "`diff -u` is the unified format git and patch tools use — `+` lines are new, `-` lines removed.",
  },

  // ── Archives & system info ────────────────────────────────────────────────
  {
    id: "shell-tar-c",
    category: "shell",
    prompt: "Create `backup.tar.gz` from the `src` directory, gzip-compressed.",
    answer: "tar -czf backup.tar.gz src",
    explanation:
      "`c` creates, `z` compresses with gzip, `f` names the file — the standard backup trio.",
  },
  {
    id: "shell-tar-x",
    category: "shell",
    prompt: "Extract `backup.tar.gz` in the current directory.",
    answer: "tar -xzf backup.tar.gz",
    explanation: "`x` extracts — with `-z` it handles the gzip layer automatically.",
  },
  {
    id: "shell-df",
    category: "shell",
    prompt: "Show disk space usage for every filesystem in human-readable form.",
    answer: "df -h",
    explanation: "`df -h` shows free space per disk; `-h` turns bytes into GB/MB.",
  },
  {
    id: "shell-du",
    category: "shell",
    prompt: "Show the total size of the current directory, human-readable.",
    answer: "du -sh .",
    explanation: "`du` measures disk usage; `-s` summarizes and `-h` makes it readable.",
  },
  {
    id: "shell-watch",
    category: "shell",
    prompt: "Re-run `ls` every 2 seconds to watch a directory change live.",
    answer: "watch -n 2 ls",
    explanation: "`watch` reruns a command on a timer — `-n 2` is the interval in seconds.",
  },
  {
    id: "shell-curl",
    category: "shell",
    prompt: "Download `https://example.com/file.zip` to the current folder, keeping its filename.",
    answer: "curl -O https://example.com/file.zip",
    explanation:
      "`-O` saves with the remote filename; without it curl prints the response to the screen.",
  },
  {
    id: "shell-ping",
    category: "shell",
    prompt: "Check whether `google.com` is reachable.",
    answer: "ping google.com",
    explanation: "`ping` sends ICMP probes and reports latency — the quick reachability check.",
  },
  {
    id: "shell-shebang",
    category: "shell",
    prompt: "Start a bash script with the shebang line that selects the interpreter.",
    answer: "#!/bin/bash",
    explanation:
      "The shebang tells the kernel which interpreter to run — every bash script starts with this line.",
  },
  {
    id: "shell-arg-first",
    category: "shell",
    prompt: "Reference the first argument passed to a script.",
    answer: "$1",
    explanation: "`$1` is the first argument, `$2` the second, `$@` all of them — the script's parameters.",
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
    questions: vimQuestions,
  },
  tmux: {
    category: "tmux",
    label: "tmux",
    description: "terminal multiplexer — sessions, panes, windows, buffers",
    questions: tmuxQuestions,
  },
  shell: {
    category: "shell",
    label: "shell",
    description: "files, pipes, redirection, and processes",
    questions: shellQuestions,
  },
  git: {
    category: "git",
    label: "git",
    description: "staging, history, branches, and remotes",
    questions: gitQuestions,
  },
  docker: {
    category: "docker",
    label: "docker",
    description: "containers, images, and compose",
    questions: [],
  },
  regex: {
    category: "regex",
    label: "regex",
    description: "patterns for search and replace",
    questions: [],
  },
  ssh: {
    category: "ssh",
    label: "ssh",
    description: "remote shells, keys, and tunneling",
    questions: [],
  },
  kubernetes: {
    category: "kubernetes",
    label: "k8s",
    description: "pods, deployments, and cluster basics",
    questions: [],
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
