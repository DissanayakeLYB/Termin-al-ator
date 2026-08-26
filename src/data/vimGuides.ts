/**
 * Vim guides — structured walkthroughs that teach Vim concepts with
 * explanations, examples, and inline exercises.
 */

import type { GuideSection } from "./sshGuides";

export const vimGuides: GuideSection[] = [
  {
    id: "vim-modes",
    title: "Vim Fundamentals",
    tagline: "modes, entering, exiting, and basic movement",
    description:
      "Vim's modal editing is its superpower — different keys do different things depending on the mode. Master the mode switch and basic navigation first.",
    subsections: [
      {
        title: "The four modes",
        text: [
          "Vim has several modes, but you'll spend most of your time in three:",
          "`Normal` mode is where you start. Keys move the cursor, delete text, copy, paste — no typing happens here.",
          "`Insert` mode is where you actually type text. Enter it from Normal mode, type your content, then press `Esc` to return.",
          "`Visual` mode lets you select text character-by-character, line-by-line, or in blocks, then apply an operation to the selection.",
          "`Command-line` mode (the `:` prompt at the bottom) runs Ex commands like `:w`, `:q`, `:s`.",
        ],
        codeBlocks: [
          {
            label: "Mode switching",
            code: "i, a, o    → enter Insert mode\nEsc         → return to Normal mode\nv, V, Ctrl-v → enter Visual mode\n:           → enter Command-line mode",
          },
        ],
        exercises: [
          {
            prompt: "Enter Insert mode by appending after the cursor.",
            answer: "a",
            explanation:
              "`a` enters Insert mode one position after the cursor ('append'). `A` goes to end of line.",
          },
          {
            prompt: "Enter Insert mode by opening a new line below and inserting.",
            answer: "o",
            explanation:
              "`o` opens a new line below the current one and enters Insert mode. `O` opens above.",
          },
        ],
      },
      {
        title: "Saving and quitting",
        text: [
          "All save/quit commands start with `:` in Normal mode.",
          "`:w` writes (saves) the file. `:q` quits. `:wq` saves and quits in one step.",
          "`ZZ` is the Normal-mode shortcut for `:wq` — no colon needed.",
          "If you modified a file and want to quit without saving, use `:q!` to discard changes.",
        ],
        codeBlocks: [
          { code: ":w              save" },
          { code: ":q              quit (errors if unsaved changes)" },
          { code: ":wq             save and quit" },
          { code: ":q!             quit without saving" },
          { code: "ZZ              save and quit (Normal mode)" },
          { code: "ZQ              quit without saving (Normal mode)" },
        ],
        exercises: [
          {
            prompt: "Save the current file without quitting.",
            answer: ":w",
            explanation:
              "`:w` writes the buffer to disk. Add a filename to save-as: `:w newfile.txt`.",
          },
          {
            prompt: "Quit Vim, discarding any unsaved changes.",
            answer: ":q!",
            aliases: ["q!"],
            explanation:
              "`:q!` forces quit and discards all modifications since the last save.",
          },
        ],
      },
      {
        title: "Basic cursor movement",
        text: [
          "In Normal mode, the arrow keys work, but `h`, `j`, `k`, `l` are faster — your fingers never leave the home row:",
          "`h` left, `j` down, `k` up, `l` right. These are the foundation of all Vim navigation.",
          "`w` jumps forward to the start of the next word. `b` jumps backward. `e` jumps to the end of the current/next word.",
          "`0` goes to the start of the line. `$` goes to the end.",
          "`gg` goes to the first line. `G` goes to the last line. A number before `G` goes to that line: `42G` jumps to line 42.",
        ],
        codeBlocks: [
          { code: "h j k l      left, down, up, right" },
          { code: "w b e        next word start, prev word end, next word end" },
          { code: "0 $          start of line, end of line" },
          { code: "gg G         first line, last line" },
          { code: "Ctrl-f Ctrl-b  scroll down one page, scroll up one page" },
        ],
        exercises: [
          {
            prompt: "In Normal mode, move the cursor to the end of the current line.",
            answer: "$",
            explanation:
              "`$` moves to the last character of the line. `0` moves to the first.",
          },
          {
            prompt: "Jump to the very first line of the file.",
            answer: "gg",
            explanation:
              "`gg` goes to line 1. `G` goes to the last line. `42G` goes to line 42.",
          },
          {
            prompt: "Move the cursor forward to the beginning of the next word.",
            answer: "w",
            aliases: ["W"],
            explanation:
              "`w` moves to the next word start. `W` treats non-blank characters as words (WORD motion).",
          },
        ],
      },
    ],
  },
  {
    id: "vim-motions",
    title: "Motions & Operators",
    tagline: "the grammar of Vim: operator + motion = action",
    description:
      "Vim's editing language works like a sentence: an operator (verb) combined with a motion (noun) describes what to do and where. This is what makes Vim edits composable.",
    subsections: [
      {
        title: "Operator + motion combos",
        text: [
          "The three core operators are `d` (delete), `c` (change), and `y` (yank/copy). Each takes a motion to define the range:",
          "The pattern is always: operator + motion. For example, `dw` deletes the next word, `c$` changes from cursor to end of line, `y2y` yanks (copies) two lines.",
          "`dd` deletes an entire line (operator + same operator = whole line). Same for `cc` (change line) and `yy` (yank line).",
          "`D` is shorthand for `d$` — delete to end of line. `C` is shorthand for `c$` — change to end of line.",
        ],
        codeBlocks: [
          { code: "dw       delete next word" },
          { code: "d$       delete to end of line" },
          { code: "dd       delete entire line" },
          { code: "cw       change next word (delete + enter Insert)" },
          { code: "c$       change to end of line" },
          { code: "cc       change entire line" },
          { code: "yw       yank (copy) next word" },
          { code: "yy       yank (copy) entire line" },
        ],
        exercises: [
          {
            prompt: "Delete the next word in Normal mode.",
            answer: "dw",
            explanation:
              "`d` (delete) + `w` (next word) = delete the word under the cursor.",
          },
          {
            prompt: "Change from the cursor to the end of the line (delete and enter Insert mode).",
            answer: "c$",
            aliases: ["C"],
            explanation:
              "`c$` changes to end of line. `C` is the shorthand for the same thing.",
          },
          {
            prompt: "Yank (copy) the current line.",
            answer: "yy",
            aliases: ["Y"],
            explanation:
              "`yy` yanks the whole line into the default register. `Y` also does this in most Vim configs.",
          },
        ],
      },
      {
        title: "Text objects",
        text: [
          "Text objects let you select logical chunks of code — words, sentences, paragraphs, or anything inside delimiters.",
          "Text objects use the pattern `i` (inside) or `a` (around/including) plus a character: `iw` = inner word, `aw` = a word (with surrounding space), `i\"` = inside quotes, `a(` = around parentheses.",
          "Text objects only work with operators — they define a range for `d`, `c`, `y`, `v`, etc.",
        ],
        codeBlocks: [
          { code: "diw    delete inner word (no surrounding space)" },
          { code: "daw    delete a word (with surrounding space)" },
          { code: "ci\"    change text inside double quotes" },
          { code: "da(    delete everything inside and including parentheses" },
          { code: "yi{    yank text inside curly braces" },
          { code: "dit    delete inside HTML/XML tags" },
          { code: "dap    delete a paragraph (including blank lines)" },
        ],
        exercises: [
          {
            prompt: "Delete the text inside the nearest pair of double quotes (keep the quotes).",
            answer: 'di"',
            explanation:
              '`di"` deletes the inner content of the nearest `"..."`. Use `da"` to delete including the quotes.',
          },
          {
            prompt: "Change the content inside the nearest parentheses (delete it and enter Insert mode).",
            answer: "ci(",
            aliases: ["ci)", "ciB"],
            explanation:
              "`ci(` changes the inside of `(...)`. You can also use `ci)` — Vim treats matched delimiters equivalently.",
          },
          {
            prompt: "Delete the word under the cursor including the trailing space.",
            answer: "daw",
            explanation:
              "`daw` deletes `a word` — the word plus surrounding whitespace. `diw` would leave extra space.",
          },
        ],
      },
      {
        title: "Find and till motions",
        text: [
          "`f{char}` jumps forward to the next occurrence of `{char}` on the current line. `F` jumps backward.",
          "`t{char}` is like `f` but stops one character before the target. `T` goes backward.",
          "These are incredibly useful for precise edits within a line. After `f` or `t`, use `;` to repeat and `,` to reverse.",
        ],
        codeBlocks: [
          { code: "f(     jump forward to next '(' on the line" },
          { code: "F(     jump backward to previous '('" },
          { code: "t;     jump forward to just before the next ';'" },
          { code: "T:     jump backward to just after the previous ':'" },
          { code: ";      repeat last f/F/t/T in same direction" },
          { code: ",      repeat last f/F/t/T in opposite direction" },
        ],
        exercises: [
          {
            prompt: "Jump forward to the next colon on the current line.",
            answer: "f:",
            explanation:
              "`f{char}` jumps to the next occurrence of that character on the line.",
          },
          {
            prompt: "Jump forward to just before the next comma on the current line.",
            answer: "t,",
            explanation:
              "`t{char}` is 'till' — it stops one position before the target character.",
          },
          {
            prompt: "Repeat the last find motion in the same direction.",
            answer: ";",
            explanation:
              "`;` repeats the most recent `f`, `F`, `t`, or `T` in the same direction.",
          },
        ],
      },
      {
        title: "Numbered motions",
        text: [
          "Prepending a count to any motion repeats it that many times. This turns simple motions into powerful jumps:",
          "`3w` moves forward 3 words. `5j` moves down 5 lines. `10l` moves right 10 characters.",
          "Counts work with operators too: `d3w` deletes 3 words, `y5j` yanks 5 lines downward.",
        ],
        codeBlocks: [
          { code: "3w       move forward 3 words" },
          { code: "5j       move down 5 lines" },
          { code: "d3w      delete 3 words forward" },
          { code: "y5j      yank 5 lines downward" },
          { code: "2dd      delete 2 lines" },
          { code: "10G      go to line 10" },
        ],
        exercises: [
          {
            prompt: "Delete the next 3 words.",
            answer: "d3w",
            aliases: ["3dw"],
            explanation:
              "`d3w` or `3dw` — the count applies to the motion: delete 3 words forward.",
          },
          {
            prompt: "Move down 5 lines in Normal mode.",
            answer: "5j",
            aliases: ["+5"],
            explanation:
              "`5j` repeats the `j` (down) motion 5 times. Equivalent to pressing `j` five times.",
          },
        ],
      },
      {
        title: "The repeat command",
        text: [
          "The `.` command repeats the last change made in Normal mode. This is one of Vim's most powerful features — make a change once, then dot-repeat it everywhere.",
          "Combined with precise motions, `.` lets you make surgical edits across a file with minimal keystrokes.",
        ],
        codeBlocks: [
          {
            code: "ciwfoo<Esc>   change the current word to 'foo'\nn              jump to next match\n.              repeat the change on the next word",
          },
        ],
        exercises: [
          {
            prompt: "In Normal mode, repeat the last change you made.",
            answer: ".",
            explanation:
              "`.` replays the last insert, delete, change, or other edit — the single most useful Vim command.",
          },
        ],
      },
    ],
  },
  {
    id: "vim-visual",
    title: "Visual Mode",
    tagline: "selecting text precisely before acting",
    description:
      "Visual mode lets you see exactly what you're about to operate on. Three flavors cover every selection need — character, line, and block.",
    subsections: [
      {
        title: "Character visual mode",
        text: [
          "Press `v` to enter character-wise Visual mode. Move the cursor to extend the selection character by character.",
          "Once selected, apply any operator: `d` to delete, `c` to change, `y` to yank, `>` to indent, `<` to unindent.",
          "Press `v` again to toggle back to Normal mode without performing an action.",
        ],
        codeBlocks: [
          { code: "v            start character selection" },
          { code: "vjjd         select down 2 lines and delete" },
          { code: "vw\"ay        select word and yank into register a" },
        ],
        exercises: [
          {
            prompt: "Enter character-wise Visual mode to select text.",
            answer: "v",
            explanation:
              "`v` starts character-wise selection. Move to extend, then apply an operator like `d`, `y`, or `c`.",
          },
        ],
      },
      {
        title: "Line visual mode",
        text: [
          "`V` enters line-wise Visual mode — the entire lines are selected, from first character to last.",
          "This is ideal for moving, copying, or deleting whole lines without worrying about cursor position.",
          "In Visual mode, `o` moves the cursor to the other end of the selection (useful to shrink or extend from the opposite side).",
        ],
        codeBlocks: [
          { code: "V            start line selection" },
          { code: "Vjd          select line and delete" },
          { code: "V2jy         select 3 lines and yank" },
          { code: "V>p          select, delete, and paste after" },
        ],
        exercises: [
          {
            prompt: "Enter line-wise Visual mode to select entire lines.",
            answer: "V",
            explanation:
              "`V` selects full lines. Move with `j`/`k` to include more lines, then apply an operator.",
          },
          {
            prompt: "In Visual mode, swap the cursor to the other end of the selection.",
            answer: "o",
            explanation:
              "`o` in Visual mode moves the cursor to the opposite end of the selection — useful for adjusting which end you want to change.",
          },
        ],
      },
      {
        title: "Block visual mode",
        text: [
          "`Ctrl-v` enters block (rectangular) Visual mode — you select a rectangle of text across multiple lines.",
          "This is uniquely powerful in Vim: edit columns in CSV files, add aligned comments, or insert text at the same position on multiple lines.",
          "After selecting a block, `I` inserts text at the start of the block on each line. `A` appends at the end. `r` replaces every character in the block.",
        ],
        codeBlocks: [
          { code: "Ctrl-v       start block selection" },
          { code: "Ctrl-vjlI#<Esc>   add '#' comment at start of 2 lines" },
          { code: "Ctrl-v2jrx   replace block with 'x'" },
          { code: "Ctrl-vA;<Esc>  append ';' at end of selected lines" },
        ],
        exercises: [
          {
            prompt: "Enter block (rectangular) Visual mode to select a column of text.",
            answer: "Ctrl-v",
            aliases: ["\u0016"],
            explanation:
              "`Ctrl-v` starts block selection — select a rectangle across lines, then insert, append, or replace.",
          },
        ],
      },
    ],
  },
  {
    id: "vim-search",
    title: "Search & Replace",
    tagline: "finding, substituting, and global changes",
    description:
      "Vim's search and substitute commands let you find patterns instantly and replace them across lines or the entire file.",
    subsections: [
      {
        title: "Search forward and backward",
        text: [
          "`/pattern` searches forward through the file. `?pattern` searches backward.",
          "After a search, `n` jumps to the next match and `N` jumps to the previous match. `*` searches for the word under the cursor.",
          "Press `Esc` to clear the search highlight, or set `:noh` to turn it off until the next search.",
        ],
        codeBlocks: [
          { code: "/pattern      search forward for 'pattern'" },
          { code: "?pattern      search backward for 'pattern'" },
          { code: "n             next match (same direction)" },
          { code: "N             previous match (opposite direction)" },
          { code: "*             search for word under cursor" },
          { code: ":noh          clear search highlight" },
        ],
        exercises: [
          {
            prompt: "Search forward through the file for the word `function`.",
            answer: "/function",
            explanation:
              "`/` starts a forward search. Type the pattern and press Enter. Use `n`/`N` to jump between matches.",
          },
          {
            prompt: "Search for the word currently under the cursor.",
            answer: "*",
            explanation:
              "`*` searches for the exact word under the cursor — faster than typing `/\\bword\\b`.",
          },
        ],
      },
      {
        title: "Substitute command",
        text: [
          "`:s/old/new/` replaces the first occurrence of `old` on the current line.",
          "Add `g` for all occurrences on the line: `:s/old/new/g`.",
          "Use `%` to apply across the entire file: `:%s/old/new/g`.",
          "Add `c` to confirm each replacement: `:%s/old/new/gc` — Vim asks `y/n` for each match.",
        ],
        codeBlocks: [
          { code: ":s/old/new/       replace first match on current line" },
          { code: ":s/old/new/g      replace all matches on current line" },
          { code: ":%s/old/new/g     replace all matches in file" },
          { code: ":%s/old/new/gc    replace all with confirmation" },
          { code: ":%s/old/new/gi    replace all, case-insensitive" },
          { code: ":%s/\\vold/new/g   use very magic (extended) regex" },
        ],
        exercises: [
          {
            prompt: "Replace all occurrences of `foo` with `bar` in the entire file.",
            answer: ":%s/foo/bar/g",
            explanation:
              "`%` means whole file, `s` is substitute, `g` means every match per line (not just the first).",
          },
          {
            prompt: "Replace all occurrences on the current line only.",
            answer: ":s/old/new/g",
            explanation:
              "Without `%`, `:s` operates on the current line. Add `g` to replace all matches, not just the first.",
          },
        ],
      },
      {
        title: "Regular expressions in Vim",
        text: [
          "Vim's default regex is 'magic' mode (`\\m`). Use `\\v` ('very magic') for more standard regex syntax:",
          "Common patterns: `\\<` and `\\>` match word boundaries. `^` and `$` match line start/end. `.` matches any character.",
          "Use `\\1`, `\\2` etc. for backreferences in replacements, and `\\=` for expression evaluation.",
        ],
        codeBlocks: [
          { code: ":s/\\<foo\\>/bar/g    replace whole word 'foo' only" },
          { code: ":%s/^\\s*//g         remove leading whitespace from all lines" },
          { code: ":%s/\\s\\+$//g       remove trailing whitespace from all lines" },
          { code: ":%s/\\v(\\w+)/\"\\1\"/g  wrap every word in double quotes" },
        ],
        exercises: [
          {
            prompt: "Remove leading whitespace from every line in the file.",
            answer: ":%s/^\\s*//g",
            explanation:
              "`^\\s*` matches leading whitespace at the start of each line; replacing with nothing strips it.",
          },
        ],
      },
    ],
  },
  {
    id: "vim-buffers",
    title: "Buffers, Windows & Tabs",
    tagline: "managing multiple files and splits",
    description:
      "Vim lets you work with many files at once through buffers (file contents), windows (visible splits), and tabs (workspaces).",
    subsections: [
      {
        title: "Buffers",
        text: [
          "A buffer is an in-memory copy of a file. When you `:e filename`, it opens in a new buffer. You can have many buffers open at once.",
          "`:ls` lists all open buffers with their numbers. `:bn` and `:bp` move to the next and previous buffer. `:bN` (where N is the number) jumps to that buffer.",
          "`:bd` closes (deletes) the current buffer. Use `:bufdo bd` to close all buffers.",
        ],
        codeBlocks: [
          { code: ":e filename    open a file in a new buffer" },
          { code: ":ls            list all buffers" },
          { code: ":bn / :bp      next / previous buffer" },
          { code: ":b3            switch to buffer #3" },
          { code: ":bd            close current buffer" },
        ],
        exercises: [
          {
            prompt: "List all open buffers with their numbers.",
            answer: ":ls",
            aliases: [":buffers", ":files"],
            explanation:
              "`:ls` shows all buffers with numbers, flags, and filenames — use the numbers with `:bN` to switch.",
          },
          {
            prompt: "Switch to the next buffer.",
            answer: ":bn",
            explanation:
              "`:bn` (buffer next) moves forward through the buffer list. `:bp` goes backward.",
          },
        ],
      },
      {
        title: "Windows (splits)",
        text: [
          "`:sp` splits the window horizontally. `:vsp` splits vertically. Both open the current file by default — add a filename to open a different file.",
          "`Ctrl-w h/j/k/l` moves between splits. `Ctrl-w =` equalizes all splits. `Ctrl-w _` maximizes the current split height. `Ctrl-w |` maximizes width.",
          "`:close` or `Ctrl-w c` closes the current split. `:only` closes all other splits.",
        ],
        codeBlocks: [
          { code: ":sp filename     horizontal split" },
          { code: ":vsp filename    vertical split" },
          { code: "Ctrl-w h/j/k/l   move between splits" },
          { code: "Ctrl-w =         equalize split sizes" },
          { code: "Ctrl-w _         maximize split height" },
          { code: "Ctrl-w |         maximize split width" },
          { code: ":only            close all other splits" },
        ],
        exercises: [
          {
            prompt: "Split the current window horizontally.",
            answer: ":sp",
            aliases: [":split"],
            explanation:
              "`:sp` splits horizontally. Add a filename to open a different file: `:sp other.txt`.",
          },
          {
            prompt: "Move to the split on the left.",
            answer: "Ctrl-w h",
            aliases: ["Ctrl-w\u001bh", "Ctrl-wh"],
            explanation:
              "`Ctrl-w` followed by a direction key (`h` left, `j` down, `k` up, `l` right) moves between splits.",
          },
        ],
      },
      {
        title: "Tabs",
        text: [
          "Tabs are Vim's workspaces — each tab can contain multiple windows (splits).",
          "`:tabnew` opens a new tab. `:tabn` and `:tabp` navigate between tabs. `gt` and `gT` are the Normal-mode equivalents.",
          "`:tabclose` closes the current tab. `:tabonly` closes all other tabs.",
        ],
        codeBlocks: [
          { code: ":tabnew filename    open file in new tab" },
          { code: ":tabn / :tabp       next / previous tab" },
          { code: "gt / gT             next / previous tab (Normal mode)" },
          { code: "2gt                 go to tab #2" },
          { code: ":tabclose           close current tab" },
          { code: ":tabonly            close all other tabs" },
        ],
        exercises: [
          {
            prompt: "Open a new tab.",
            answer: ":tabnew",
            aliases: [":tabe", ":tabedit"],
            explanation:
              "`:tabnew` opens a new empty tab. Add a filename to open a file directly in the new tab.",
          },
          {
            prompt: "Switch to the next tab in Normal mode.",
            answer: "gt",
            explanation:
              "`gt` goes to the next tab. `gT` goes to the previous. A count like `3gt` goes to tab 3.",
          },
        ],
      },
    ],
  },
  {
    id: "vim-macros",
    title: "Macros & Registers",
    tagline: "recording, replaying, and named clipboards",
    description:
      "Macros let you record a sequence of keystrokes and replay them. Registers are named clipboards that store yanks, deletions, and macros.",
    subsections: [
      {
        title: "Recording macros",
        text: [
          "Press `q` followed by a register name (a letter) to start recording. Perform your edits, then press `q` again to stop.",
          "Press `@` followed by the register name to replay the macro. `@@` repeats the last macro.",
          "A count before `@` repeats the macro that many times: `10@a` runs macro `a` ten times.",
        ],
        codeBlocks: [
          { code: "qa     start recording into register 'a'" },
          { code: "q      stop recording" },
          { code: "@a     replay macro 'a'" },
          { code: "@@     replay last macro" },
          { code: "10@a   replay macro 'a' 10 times" },
        ],
        exercises: [
          {
            prompt: "Start recording a macro into register `q`.",
            answer: "qq",
            explanation:
              "`q` + register name starts recording. All keystrokes are stored until you press `q` again.",
          },
          {
            prompt: "Replay the last macro you recorded.",
            answer: "@@",
            explanation:
              "`@@` repeats the most recent macro. `@q` replays macro `q` specifically.",
          },
          {
            prompt: "Run macro `a` five times in a row.",
            answer: "5@a",
            explanation:
              "A count before `@` repeats the macro that many times — great for applying a change to multiple lines.",
          },
        ],
      },
      {
        title: "Registers",
        text: [
          "Vim's default register (`\"`) stores the last yank or delete. Named registers (`\"a` through `\"z`) let you store multiple things.",
          "Use `\"` + register name before an operation to target that register: `\"ayy` yanks the line into register `a`. `\"ap` pastes from register `a`.",
          "Uppercase register names (`\"A`-`\"Z`) append to the existing contents rather than overwriting.",
        ],
        codeBlocks: [
          { code: "\"ayy     yank current line into register 'a'" },
          { code: "\"ap      paste from register 'a'" },
          { code: "\"byiw    yank inner word into register 'b'" },
          { code: "\"bp      paste from register 'b'" },
          { code: ":reg     show all registers and their contents" },
          { code: "\"+y      yank to system clipboard" },
          { code: "\"+p      paste from system clipboard" },
        ],
        exercises: [
          {
            prompt: "Yank the current line into register `a`.",
            answer: '"ayy',
            aliases: ['"ayy'],
            explanation:
              "Prefix with `\"a` to target register `a`. `yy` yanks the whole line into that register.",
          },
          {
            prompt: "Show all register contents.",
            answer: ":reg",
            aliases: [":registers"],
            explanation:
              "`:reg` lists every register and what it holds — useful for finding what you yanked.",
          },
        ],
      },
      {
        title: "Special registers",
        text: [
          "Vim has several special registers beyond the named ones:",
          "The unnamed register (`\"`) holds the last yank/delete. The black hole register (`\"_`) discards text. The clipboard register (`\"+`) connects to the system clipboard.",
          "Numbered registers `\"0`-`\"9` form a delete history. `\"0` holds the last yank, `\"1` the last delete, and older deletes cascade down.",
        ],
        codeBlocks: [
          { code: "\"_dd    delete line to black hole (doesn't overwrite default)" },
          { code: "\"+y     yank to system clipboard" },
          { code: "\"+p     paste from system clipboard" },
          { code: "\"0p     paste the last yanked text (not deleted)" },
          { code: ":reg \"  show registers containing '\"'" },
        ],
        exercises: [
          {
            prompt: "Delete the current line without overwriting the default register.",
            answer: '"_dd',
            aliases: ['"_dd'],
            explanation:
              'The black hole register `"_` discards text — useful when you want to delete without clobbering what you last yanked.',
          },
          {
            prompt: "Paste from the system clipboard in Normal mode.",
            answer: '"+p',
            aliases: ['"+p', "Ctrl-v"],
            explanation:
              '`"+p` pastes from the system clipboard register. On macOS, you can also use `Cmd-v` in GUI Vim.',
          },
        ],
      },
    ],
  },
  {
    id: "vim-folding",
    title: "Folds & Marks",
    tagline: "collapsing code regions and bookmarking positions",
    description:
      "Folds let you collapse sections of code for a bird's-eye view. Marks let you bookmark positions and jump between them instantly.",
    subsections: [
      {
        title: "Creating and navigating folds",
        text: [
          "`zf` creates a fold from the cursor position. You can also create folds based on indentation, syntax, or manual ranges.",
          "`zo` opens a fold. `zc` closes it. `za` toggles. `zR` opens all folds. `zM` closes all.",
          "`zm` and `zr` increase/decrease the fold level — handy for expanding just one layer at a time.",
        ],
        codeBlocks: [
          { code: "zf{motion}   create fold (e.g., zfip = fold paragraph)" },
          { code: "zf5j         fold 5 lines down" },
          { code: "zo           open fold under cursor" },
          { code: "zc           close fold under cursor" },
          { code: "za           toggle fold" },
          { code: "zR           open all folds" },
          { code: "zM           close all folds" },
          { code: ":set foldmethod=indent   fold by indentation level" },
        ],
        exercises: [
          {
            prompt: "Create a manual fold over the current paragraph.",
            answer: "zfip",
            explanation:
              "`zf` + `ip` (inner paragraph) creates a fold around the paragraph under the cursor.",
          },
          {
            prompt: "Open the fold under the cursor.",
            answer: "zo",
            explanation:
              "`zo` opens one fold level. `zR` opens all folds at once.",
          },
          {
            prompt: "Close all folds in the file.",
            answer: "zM",
            explanation:
              "`zM` closes all folds. `zR` opens all folds. These are your overview/detail toggles.",
          },
        ],
      },
      {
        title: "Marks",
        text: [
          "Lowercase marks (`ma`-`zz`) are local to the file. Uppercase marks (`A`-`Z`) are global across files and survive Vim restarts (if `:mksession` is used).",
          "`m{letter}` sets a mark. `` `{letter}` jumps to the mark. `'` jumps to the line of the mark.",
          "Special marks: `` `. `` jumps to the last change, `` `^ `` jumps to where you last Insert mode ended, `` `0 `` jumps to where you last exited Vim.",
        ],
        codeBlocks: [
          { code: "ma       set mark 'a' at current position" },
          { code: "'a       jump to line of mark 'a'" },
          { code: "`a       jump to exact position of mark 'a'" },
          { code: "`.       jump to last change position" },
          { code: "`^       jump to last Insert exit position" },
          { code: ":marks   list all marks" },
        ],
        exercises: [
          {
            prompt: "Set a local mark named `m` at the current cursor position.",
            answer: "mm",
            explanation:
              "`m` + letter sets a mark. Use `` `m `` to jump back to the exact position later.",
          },
          {
            prompt: "Jump to the position of the last change you made.",
            answer: "`. ",
            aliases: ["`.  "],
            explanation:
              "The special mark `` `. `` always points to where the last edit happened — great for jumping back after browsing.",
          },
        ],
      },
    ],
  },
  {
    id: "vim-config",
    title: "Vim Configuration",
    tagline: "essential .vimrc settings and key mappings",
    description:
      "A well-crafted .vimrc transforms Vim from a text editor into a development environment. Here are the settings every Vim user needs.",
    subsections: [
      {
        title: "Essential .vimrc settings",
        text: [
          "These settings improve Vim's defaults significantly. Add them to `~/.vimrc`:",
          "`set number` shows line numbers. `set relativenumber` shows relative numbers for easier `3j`-style navigation.",
          "`set tabstop=4` and `set shiftwidth=4` control indentation width. `set expandtab` converts tabs to spaces.",
          "`set ignorecase` and `set smartcase` make search case-insensitive unless you type an uppercase letter.",
          "`set hlsearch` highlights search matches. `set incsearch` shows matches as you type the pattern.",
        ],
        codeBlocks: [
          {
            label: "~/.vimrc essentials",
            code: `set number
set relativenumber
set tabstop=4
set shiftwidth=4
set expandtab
set autoindent
set smartindent
set ignorecase
set smartcase
set hlsearch
set incsearch
set wildmenu
set mouse=a
set clipboard=unnamedplus`,
          },
        ],
        exercises: [
          {
            prompt: "In .vimrc, enable relative line numbers.",
            answer: "set relativenumber",
            aliases: ["set rnu"],
            explanation:
              "Relative numbers show how many lines away each line is — perfect for motions like `5j`.",
          },
          {
            prompt: "In .vimrc, make search case-insensitive unless the pattern has uppercase.",
            answer: "set smartcase",
            explanation:
              "`smartcase` works with `ignorecase`: all-lowercase patterns match case-insensitively, but any uppercase letter makes it case-sensitive.",
          },
        ],
      },
      {
        title: "Custom key mappings",
        text: [
          "Map keys in your .vimrc to create shortcuts. Use `nnoremap` for Normal-mode-only mappings (recommended to avoid recursive loops).",
          "The `<leader>` key (typically `\\` or space) is a namespace for custom shortcuts — avoids conflicts with Vim's built-in keys.",
          "Set your leader key first: `let mapleader = \" \"` maps leader to space.",
        ],
        codeBlocks: [
          {
            label: "~/.vimrc key mappings",
            code: `let mapleader = " "

" Quick save and quit
nnoremap <leader>w :w<CR>
nnoremap <leader>q :q<CR>

" Clear search highlight
nnoremap <leader>h :noh<CR>

" Move lines up/down in Visual mode
vnoremap J :m '>+1<CR>gv=gv
vnoremap K :m '<-2<CR>gv=gv

" Keep visual selection after indent
vnoremap < <gv
vnoremap > >gv`,
          },
        ],
        exercises: [
          {
            prompt: "In .vimrc, map the leader key to the spacebar.",
            answer: 'let mapleader = " "',
            aliases: ['let mapleader=" "'],
            explanation:
              "Set leader before any `<leader>` mappings. Space is popular because it's easy to reach.",
          },
          {
            prompt: "In .vimrc, create a Normal-mode mapping to clear search highlights with `<leader>h`.",
            answer: "nnoremap <leader>h :noh<CR>",
            aliases: [
              "nnoremap <leader>h :noh<CR>",
              "nmap <leader>h :noh<CR>",
            ],
            explanation:
              "`nnoremap` creates a non-recursive Normal-mode mapping. `<leader>h` runs `:noh` to clear highlights.",
          },
        ],
      },
      {
        title: "Plugin managers",
        text: [
          "Modern Vim uses plugin managers to install and manage extensions. The most popular are vim-plug, lazy.nvim, and mini.deps.",
          "vim-plug is minimal and fast: declare plugins between `call plug#begin()` and `call plug#end()`, then run `:PlugInstall`.",
          "For Neovim users, lazy.nvim is the modern standard with lazy loading, lockfiles, and a beautiful UI.",
        ],
        codeBlocks: [
          {
            label: "vim-plug example (~/.vimrc)",
            code: `call plug#begin('~/.vim/plugged')

Plug 'tpope/vim-surround'
Plug 'junegunn/fzf.vim'
Plug 'airblade/vim-gitgutter'
Plug 'morhetz/gruvbox'

call plug#end()
colorscheme gruvbox`,
          },
          {
            label: "lazy.nvim example (init.lua for Neovim)",
            code: `require("lazy").setup({
  "tpope/vim-surround",
  "junegunn/fzf.vim",
  "lewis6991/gitsigns.nvim",
  { "ellisonleao/gruvbox.nvim", lazy = false, priority = 1000 },
})`,
          },
        ],
        exercises: [
          {
            prompt: "After adding plugins to vim-plug config, what command installs them?",
            answer: ":PlugInstall",
            explanation:
              "`:PlugInstall` downloads and installs all plugins declared between `plug#begin()` and `plug#end()`.",
          },
          {
            prompt: "In vim-plug, what do you wrap your plugin declarations between?",
            answer: "call plug#begin()",
            aliases: [
              "call plug#begin('~/.vim/plugged')",
              "call plug#begin(\"~/.vim/plugged\")",
            ],
            explanation:
              "`plug#begin()` starts the plugin section and `plug#end()` closes it — vim-plug manages everything in between.",
          },
        ],
      },
      {
        title: "Essential plugins",
        text: [
          "A curated set of plugins can dramatically improve your Vim experience without bloating it:",
          "`vim-surround` (tpope) adds Surround operations — change, add, or delete quotes, brackets, and tags with `cs`, `ys`, `ds`.",
          "`fzf.vim` (junegunn) brings fuzzy file finding with `:Files`, buffer search with `:Buffers`, and live grep with `:Rg`.",
          "`vim-gitgutter` (airblade) shows git diff markers in the sign column — added, modified, deleted lines.",
          "`vim-fugitive` (tpope) is the Git wrapper: `:Git status`, `:Git blame`, `:Git diff`, and the powerful `:GBrowse`.",
        ],
        codeBlocks: [
          {
            label: "vim-surround shortcuts",
            code: 'ys{motion}{char}   add surround (e.g., ysiw" wraps word in quotes)\nds{char}           delete surround (e.g., ds" removes quotes)\ncs{old}{new}       change surround (e.g., cs"\' changes " to \')',
          },
          {
            label: "fzf.vim shortcuts",
            code: ":Files     find files by name\n:Buffers   switch between open buffers\n:Rg        live grep across project\n:History    recently opened files",
          },
        ],
        exercises: [
          {
            prompt: "Using vim-surround, wrap the current word in double quotes.",
            answer: 'ysiw"',
            aliases: ['ysiw"', "ysiw\""],
            explanation:
              "`ys` (yank surround) + `iw` (inner word motion) + `\"` (the character to surround with).",
          },
          {
            prompt: "Using fzf.vim, open the file finder to search by name.",
            answer: ":Files",
            aliases: [":Files"],
            explanation:
              "`:Files` opens a fuzzy finder for all files in the project. Type to filter, Enter to open.",
          },
        ],
      },
    ],
  },
];
