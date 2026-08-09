import type { QuizQuestion } from "./questions";

/**
 * Additional vim questions — top up the dataset past 200 total.
 * Level: pareto = everyday muscle memory, core = standard knowledge,
 * workflow = multi-step scenarios.
 */
export const vimExtraQuestions: QuizQuestion[] = [
  {
    id: "vim-move-word-back",
    category: "vim",
    level: "pareto",
    prompt: "Move the cursor back to the start of the previous word.",
    answer: "b",
    explanation:
      "`b` moves back to the beginning of the previous word; `B` does it for whitespace-separated words.",
  },
  {
    id: "vim-move-end-word",
    category: "vim",
    level: "pareto",
    prompt: "Move the cursor to the end of the current word.",
    answer: "e",
    explanation:
      "`e` jumps to the last character of the current (or next) word; `E` works on whitespace-separated words.",
  },
  {
    id: "vim-open-register-paste",
    category: "vim",
    level: "pareto",
    prompt: "Paste the contents of register a after the cursor.",
    answer: "\"ap",
    explanation:
      "`\"ap` pastes register `a`. Any register can be pasted this way — `\"0p` pastes the last yank.",
  },
  {
    id: "vim-join-lines",
    category: "vim",
    level: "pareto",
    prompt: "Join the current line with the line below it.",
    answer: "J",
    explanation:
      "`J` joins the current and next line, inserting a single space at the boundary.",
  },
  {
    id: "vim-repeat-command",
    category: "vim",
    level: "pareto",
    prompt: "Repeat the last change you made.",
    answer: ".",
    explanation:
      "`.` repeats the most recent change — the single most powerful vim key for repetitive edits.",
  },
  {
    id: "vim-undo-line",
    category: "vim",
    level: "pareto",
    prompt: "Undo all changes on the current line since the last save.",
    answer: "u",
    explanation:
      "`u` undoes the most recent change. (Note: `u` undoes one change at a time; line-scoped undo requires 'undolevels' history.)",
  },
  {
    id: "vim-find-backwards",
    category: "vim",
    level: "core",
    prompt: "Search backwards for the previous occurrence of the word under the cursor.",
    answer: "#",
    explanation:
      "`#` searches backwards for the word under the cursor; `*` searches forwards.",
  },
  {
    id: "vim-substitute-global-all",
    category: "vim",
    level: "core",
    prompt: "Replace every occurrence of 'foo' with 'bar' in the whole file.",
    answer: ":%s/foo/bar/g",
    explanation:
      "`:%s/foo/bar/g` substitutes globally on every line. Add `c` for a confirmation prompt.",
  },
  {
    id: "vim-indent-visual",
    category: "vim",
    level: "core",
    prompt: "Indent the selected (visual) block one level to the right.",
    answer: ">",
    explanation:
      "In visual mode `>` indents the selection; `.` repeats on new selections.",
  },
  {
    id: "vim-copy-to-end",
    category: "vim",
    level: "core",
    prompt: "Yank from the cursor to the end of the line.",
    answer: "y$",
    explanation:
      "`y$` yanks to the end of line. `yy` yanks the whole line; `yiw` yanks the inner word.",
  },
  {
    id: "vim-delete-word-1",
    category: "vim",
    level: "core",
    prompt: "Delete the word under the cursor (not including trailing space).",
    answer: "diw",
    explanation:
      "`diw` deletes the inner word. `daw` (a word) also removes the surrounding whitespace.",
  },
  {
    id: "vim-visual-line-toggle",
    category: "vim",
    level: "core",
    prompt: "Switch visual selection to whole-line mode.",
    answer: "V",
    explanation:
      "`V` selects entire lines; `v` selects characters, `Ctrl+v` selects blocks.",
  },
  {
    id: "vim-toggle-case-word",
    category: "vim",
    level: "core",
    prompt: "Swap the case of the word under the cursor.",
    answer: "g~w",
    explanation:
      "`g~w` toggles case of the word. `guw` lowercases, `gUw` uppercases.",
  },
  {
    id: "vim-open-new-tab",
    category: "vim",
    level: "core",
    prompt: "Open the current file in a new tab.",
    answer: ":tabnew",
    explanation:
      "`:tabnew` (or `:tabnew file`) opens a fresh tab. `gt` cycles tabs forward, `gT` backward.",
  },
  {
    id: "vim-close-tab",
    category: "vim",
    level: "core",
    prompt: "Close the current tab.",
    answer: ":tabclose",
    explanation:
      "`:tabclose` closes the current tab; `:tabonly` keeps only the current one.",
  },
  {
    id: "vim-search-under-cursor",
    category: "vim",
    level: "core",
    prompt: "Search forward for the next occurrence of the word under the cursor.",
    answer: "*",
    explanation:
      "`*` searches forward for the word under the cursor, jumping to the next match.",
  },
  {
    id: "vim-clear-search-highlight",
    category: "vim",
    level: "core",
    prompt: "Remove the highlight from your last search.",
    answer: ":nohlsearch",
    explanation:
      "`:nohlsearch` clears search highlighting (abbreviate `:noh`).",
  },
  {
    id: "vim-register-yank-list",
    category: "vim",
    level: "core",
    prompt: "Display the contents of all registers.",
    answer: ":registers",
    explanation:
      "`:registers` (or `:reg`) prints every register, including the numbered, named, and delete history registers.",
  },
  {
    id: "vim-record-macro",
    category: "vim",
    level: "core",
    prompt: "Start recording a macro into register q.",
    answer: "qq",
    explanation:
      "`qq` begins recording into register `q`; press `q` again to stop. Replay with `@q`.",
  },
  {
    id: "vim-replay-macro",
    category: "vim",
    level: "core",
    prompt: "Replay the macro stored in register q.",
    answer: "@q",
    explanation:
      "`@q` runs the macro in register `q` once. `@@` repeats the last macro.",
  },
  {
    id: "vim-fold-create",
    category: "vim",
    level: "core",
    prompt: "Create a manual fold for the current visual selection.",
    answer: "zf",
    explanation:
      "`zf` folds the visual selection (or a motion, e.g. `zfap` folds a paragraph). `zo` opens, `zc` closes.",
  },
  {
    id: "vim-spellcheck-toggle",
    category: "vim",
    level: "core",
    prompt: "Turn on spell checking for the buffer.",
    answer: ":set spell",
    explanation:
      "`:set spell` enables spell check; `]s`/`[s` jump between misspellings, `z=` suggests fixes.",
  },
  {
    id: "vim-quickfix-next",
    category: "vim",
    level: "core",
    prompt: "Jump to the next item in the quickfix list.",
    answer: ":cnext",
    explanation:
      "`:cnext` moves to the next quickfix entry (e.g. after a `:grep` or build). `:cprev` goes back.",
  },
  {
    id: "vim-diff-mode-start",
    category: "vim",
    level: "core",
    prompt: "Open two files in diff mode.",
    answer: "vimdiff file1.txt file2.txt",
    explanation:
      "`vimdiff a b` (or `vim -d a b`) opens both files side by side with differences highlighted.",
  },
  {
    id: "vim-insert-date",
    category: "vim",
    level: "core",
    prompt: "Insert the current date at the cursor.",
    answer: ":r!date",
    explanation:
      "`:r!date` reads the output of the shell command `date` into the buffer at the cursor.",
  },
  {
    id: "vim-go-match-paren",
    category: "vim",
    level: "core",
    prompt: "Jump to the matching parenthesis, bracket, or brace.",
    answer: "%",
    explanation:
      "`%` jumps between matching `()`, `[]`, and `{}` pairs; great for checking balanced code.",
  },
  {
    id: "vim-delete-inside-quotes",
    category: "vim",
    level: "core",
    prompt: "Delete the text inside the nearest double quotes.",
    answer: "di\"",
    explanation:
      "`di\"` deletes everything inside the surrounding `\"` pair without the quotes. `ci\"` changes it.",
  },
  {
    id: "vim-select-paragraph",
    category: "vim",
    level: "core",
    prompt: "Select the whole paragraph in visual mode.",
    answer: "vip",
    explanation:
      "`vip` visually selects the inner paragraph; `vap` includes the surrounding blank line.",
  },
  {
    id: "vim-write-as-root",
    category: "vim",
    level: "core",
    prompt: "Save the current file even though you opened it without write permission.",
    answer: ":w !sudo tee %",
    explanation:
      "`:w !sudo tee %` pipes the buffer through sudo to overwrite the file — the classic way to save a file you can't write.",
  },
  {
    id: "vim-show-file-position",
    category: "vim",
    level: "core",
    prompt: "Show the current file's name, line number, and position in the status line.",
    answer: "Ctrl+g",
    explanation:
      "`Ctrl+g` prints the file name, line, and column. `:f` does the same.",
  },
  {
    id: "vim-split-scroll-sync",
    category: "vim",
    level: "core",
    prompt: "Make both windows scroll together in a vertical split.",
    answer: ":set scrollbind",
    explanation:
      "`:set scrollbind` (or `:set scb`) links window scrolling; unlink with `:set noscrollbind`.",
  },
  {
    id: "vim-buffer-list-switch",
    category: "vim",
    level: "workflow",
    prompt: "List all open buffers and switch to buffer number 3.",
    answer: ":ls",
    explanation:
      "`:ls` lists buffers. From there `:b3` (or `:buffer 3`) jumps to buffer 3 — a fast way to move between files.",
  },
  {
    id: "vim-macro-loop",
    category: "vim",
    level: "workflow",
    prompt:
      "You recorded a macro in register a that fixes one line. Run it on the next 10 lines.",
    answer: "10@a",
    explanation:
      "`10@a` replays the `a` macro ten times — apply a count before `@` to loop over many lines at once.",
  },
  {
    id: "vim-search-replace-confirm",
    category: "vim",
    level: "workflow",
    prompt:
      "Replace every 'colour' with 'color' in the file, but review each one before applying.",
    answer: ":%s/colour/color/gc",
    explanation:
      "The trailing `c` makes vim ask for confirmation on every match before substituting.",
  },
  {
    id: "vim-session-save",
    category: "vim",
    level: "workflow",
    prompt: "Save the current layout of windows and tabs so you can restore it later.",
    answer: ":mksession",
    explanation:
      "`:mksession` writes a session file (default Session.vim); reopen it with `vim -S Session.vim`.",
  },
];
