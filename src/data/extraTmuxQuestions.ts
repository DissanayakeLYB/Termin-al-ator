import type { QuizQuestion } from "./questions";

/**
 * Additional tmux questions — top up the dataset past 200 total.
 * Level: pareto = everyday muscle memory, core = standard knowledge,
 * workflow = multi-step scenarios.
 */
export const tmuxExtraQuestions: QuizQuestion[] = [
  {
    id: "tmux-detach-1",
    category: "tmux",
    level: "pareto",
    prompt: "Detach from the current tmux session, leaving it running in the background.",
    answer: "Ctrl+b d",
    explanation:
      "`Ctrl+b d` detaches. The session keeps running; reattach later with `tmux attach`.",
  },
  {
    id: "tmux-detach-command",
    category: "tmux",
    level: "pareto",
    prompt: "Detach from the current session using the tmux command prompt.",
    answer: ":detach",
    explanation:
      "`:detach` (inside tmux, after `Ctrl+b :`) detaches exactly like `Ctrl+b d`.",
  },
  {
    id: "tmux-list-sessions-command",
    category: "tmux",
    level: "pareto",
    prompt: "List all running tmux sessions from the shell.",
    answer: "tmux ls",
    explanation:
      "`tmux ls` (alias for `tmux list-sessions`) shows every session with its name, window count, and size.",
  },
  {
    id: "tmux-attach-last-1",
    category: "tmux",
    level: "pareto",
    prompt: "Reattach to your most recently used tmux session.",
    answer: "tmux attach",
    explanation:
      "`tmux attach` (or `tmux a`) reattaches to the last session when only one exists.",
  },
  {
    id: "tmux-attach-name",
    category: "tmux",
    level: "pareto",
    prompt: "Reattach to the tmux session named 'work'.",
    answer: "tmux attach -t work",
    explanation:
      "`-t work` targets the session named 'work'. Use `tmux ls` to see the names.",
  },
  {
    id: "tmux-new-session-1",
    category: "tmux",
    level: "pareto",
    prompt: "Create a new tmux session named 'dev'.",
    answer: "tmux new -s dev",
    explanation:
      "`tmux new -s dev` (or `new-session`) starts a session called 'dev'.",
  },
  {
    id: "tmux-new-window",
    category: "tmux",
    level: "pareto",
    prompt: "Create a new window inside the current session.",
    answer: "Ctrl+b c",
    explanation:
      "`Ctrl+b c` creates a window and switches to it. Windows are numbered from 0.",
  },
  {
    id: "tmux-next-window",
    category: "tmux",
    level: "pareto",
    prompt: "Switch to the next window.",
    answer: "Ctrl+b n",
    explanation:
      "`Ctrl+b n` moves to the next window; `p` goes to the previous one.",
  },
  {
    id: "tmux-prev-window",
    category: "tmux",
    level: "pareto",
    prompt: "Switch to the previous window.",
    answer: "Ctrl+b p",
    explanation:
      "`Ctrl+b p` moves to the previous window. `Ctrl+b 3` jumps straight to window 3.",
  },
  {
    id: "tmux-window-number-1",
    category: "tmux",
    level: "pareto",
    prompt: "Jump directly to window 2.",
    answer: "Ctrl+b 2",
    explanation:
      "`Ctrl+b 2` switches to window number 2. Windows are indexed from 0.",
  },
  {
    id: "tmux-split-horizontal",
    category: "tmux",
    level: "pareto",
    prompt: "Split the current pane vertically into left and right panes.",
    answer: "Ctrl+b %",
    explanation:
      "`Ctrl+b %` splits horizontally on screen (left/right panes).",
  },
  {
    id: "tmux-split-vertical",
    category: "tmux",
    level: "pareto",
    prompt: "Split the current pane horizontally into top and bottom panes.",
    answer: "Ctrl+b \"",
    explanation:
      "`Ctrl+b \"` splits vertically on screen (top/bottom panes).",
  },
  {
    id: "tmux-switch-pane",
    category: "tmux",
    level: "pareto",
    prompt: "Move focus to the next pane.",
    answer: "Ctrl+b o",
    explanation:
      "`Ctrl+b o` cycles focus to the next pane; `Ctrl+b arrows` moves in a direction.",
  },
  {
    id: "tmux-kill-pane",
    category: "tmux",
    level: "pareto",
    prompt: "Close the current pane.",
    answer: "Ctrl+b x",
    explanation:
      "`Ctrl+b x` kills the current pane after a confirmation prompt. `exit` in the shell also closes it.",
  },
  {
    id: "tmux-kill-window",
    category: "tmux",
    level: "pareto",
    prompt: "Kill the current window (and its panes).",
    answer: "Ctrl+b &",
    explanation:
      "`Ctrl+b &` kills the current window after confirming with 'y'.",
  },
  {
    id: "tmux-rename-window",
    category: "tmux",
    level: "core",
    prompt: "Rename the current window to 'editor'.",
    answer: "Ctrl+b ,",
    explanation:
      "`Ctrl+b ,` prompts for a new window name. `:rename-window editor` does the same.",
  },
  {
    id: "tmux-rename-session-1",
    category: "tmux",
    level: "core",
    prompt: "Rename the current session to 'api-dev'.",
    answer: ":rename-session api-dev",
    explanation:
      "`:rename-session api-dev` renames the current session. Or use `Ctrl+b $` for the prompt.",
  },
  {
    id: "tmux-kill-session-1",
    category: "tmux",
    level: "core",
    prompt: "Kill the tmux session named 'old' entirely.",
    answer: "tmux kill-session -t old",
    explanation:
      "`tmux kill-session -t old` terminates the session and all its windows. `tmux kill-server` stops everything.",
  },
  {
    id: "tmux-resize-pane-right",
    category: "tmux",
    level: "core",
    prompt: "Resize the current pane larger to the right by 5 cells.",
    answer: "Ctrl+b Ctrl+→",
    explanation:
      "Hold `Ctrl+b`, then press `Ctrl+→` repeatedly to grow the pane rightward; `Ctrl+←`, `↑`, `↓` do the other directions.",
  },
  {
    id: "tmux-resize-pane-command",
    category: "tmux",
    level: "core",
    prompt: "Resize the current pane 10 cells taller using the command prompt.",
    answer: ":resize-pane -D 10",
    explanation:
      "`:resize-pane -D 10` grows the pane downward by 10 lines; `-U`, `-L`, `-R` for the other sides.",
  },
  {
    id: "tmux-zoom-pane",
    category: "tmux",
    level: "core",
    prompt: "Zoom the current pane to fill the whole window (toggle).",
    answer: "Ctrl+b z",
    explanation:
      "`Ctrl+b z` toggles a pane between maximized and its normal split size.",
  },
  {
    id: "tmux-break-pane",
    category: "tmux",
    level: "core",
    prompt: "Move the current pane out into its own window.",
    answer: "Ctrl+b !",
    explanation:
      "`Ctrl+b !` breaks the pane off into a new window, keeping the shell running.",
  },
  {
    id: "tmux-join-pane",
    category: "tmux",
    level: "core",
    prompt: "Join the window's last pane into the current window.",
    answer: ":join-pane -s 2",
    explanation:
      "`:join-pane -s 2` moves the last pane of window 2 into the current window as a new pane.",
  },
  {
    id: "tmux-copy-mode-1",
    category: "tmux",
    level: "core",
    prompt: "Enter copy mode to scroll the pane's history.",
    answer: "Ctrl+b [",
    explanation:
      "`Ctrl+b [` enters copy mode. `Ctrl+b PgUp` scrolls up directly.",
  },
  {
    id: "tmux-copy-mode-scroll",
    category: "tmux",
    level: "core",
    prompt: "Scroll up through the pane's scrollback without leaving normal mode.",
    answer: "Ctrl+b PgUp",
    explanation:
      "`Ctrl+b PgUp` enters copy mode scrolled up, ready to inspect history.",
  },
  {
    id: "tmux-copy-selection",
    category: "tmux",
    level: "core",
    prompt: "In copy mode, start selecting text to copy.",
    answer: "Space",
    explanation:
      "In copy mode, press Space to begin a selection, move to the end, then Enter to copy it to the tmux buffer.",
  },
  {
    id: "tmux-paste-buffer-1",
    category: "tmux",
    level: "core",
    prompt: "Paste the most recently copied tmux buffer into the current pane.",
    answer: "Ctrl+b ]",
    explanation:
      "`Ctrl+b ]` pastes the top of the tmux paste buffer stack.",
  },
  {
    id: "tmux-list-buffers-1",
    category: "tmux",
    level: "core",
    prompt: "List all tmux paste buffers.",
    answer: ":list-buffers",
    explanation:
      "`:list-buffers` shows every stored buffer; `:choose-buffer` lets you pick one interactively.",
  },
  {
    id: "tmux-clear-history",
    category: "tmux",
    level: "core",
    prompt: "Clear the current pane's scrollback history.",
    answer: ":clear-history",
    explanation:
      "`:clear-history` empties the pane's history buffer, which can also free memory in long-running sessions.",
  },
  {
    id: "tmux-status-bar-left",
    category: "tmux",
    level: "core",
    prompt: "Show the current time in the status bar's right section.",
    answer: ":set -g status-right '%H:%M'",
    explanation:
      "`:set -g status-right '%H:%M'` displays a 24-hour clock in the status bar.",
  },
  {
    id: "tmux-set-option",
    category: "tmux",
    level: "core",
    prompt: "Enable the mouse so you can click panes and scroll with the wheel.",
    answer: ":set -g mouse on",
    explanation:
      "`:set -g mouse on` turns on mouse support for selecting, scrolling, and resizing.",
  },
  {
    id: "tmux-default-terminal",
    category: "tmux",
    level: "core",
    prompt: "Make tmux advertise the same terminal type to programs as your outer terminal.",
    answer: ":set -g default-terminal screen-256color",
    explanation:
      "Setting `default-terminal` to a 256-color term (e.g. screen-256color) fixes washed-out colors inside tmux.",
  },
  {
    id: "tmux-command-prompt-1",
    category: "tmux",
    level: "core",
    prompt: "Open the tmux command prompt to type a tmux command.",
    answer: "Ctrl+b :",
    explanation:
      "`Ctrl+b :` opens the command line where you type tmux commands like `kill-window`.",
  },
  {
    id: "tmux-send-keys",
    category: "tmux",
    level: "core",
    prompt: "Send the text 'ls -la' and an Enter to the current pane from the shell.",
    answer: "tmux send-keys 'ls -la' Enter",
    explanation:
      "`tmux send-keys` injects keystrokes into a pane — handy for scripting tmux.",
  },
  {
    id: "tmux-new-session-window",
    category: "tmux",
    level: "core",
    prompt: "Start a new session named 'logs' that immediately runs tail on a file.",
    answer: "tmux new -s logs 'tail -f app.log'",
    explanation:
      "The command in quotes becomes the first pane's program, so the session boots straight into it.",
  },
  {
    id: "tmux-reattach-same-name",
    category: "tmux",
    level: "core",
    prompt: "Attach to session 'web' even if it is already attached elsewhere.",
    answer: "tmux attach -t web",
    explanation:
      "If a session is attached by another client, `attach -t` will detach it from there — or use `tmux attach -d` to force it.",
  },
  {
    id: "tmux-select-layout",
    category: "tmux",
    level: "core",
    prompt: "Apply the 'even-horizontal' layout to the current window.",
    answer: ":select-layout even-horizontal",
    explanation:
      "Layouts (`even-horizontal`, `tiled`, `main-horizontal`, …) arrange panes automatically.",
  },
  {
    id: "tmux-next-layout",
    category: "tmux",
    level: "core",
    prompt: "Cycle to the next pane layout.",
    answer: "Ctrl+b Space",
    explanation:
      "`Ctrl+b Space` cycles through the built-in layouts without destroying panes.",
  },
  {
    id: "tmux-swap-pane",
    category: "tmux",
    level: "core",
    prompt: "Swap the current pane with the pane above it.",
    answer: "Ctrl+b }",
    explanation:
      "`Ctrl+b }` swaps the current pane with the next one; `{` swaps with the previous.",
  },
  {
    id: "tmux-rotate-window",
    category: "tmux",
    level: "core",
    prompt: "Rotate the positions of all panes in the window.",
    answer: "Ctrl+b Ctrl+o",
    explanation:
      "`Ctrl+b Ctrl+o` rotates pane positions clockwise (with the current pane first).",
  },
  {
    id: "tmux-display-panes",
    category: "tmux",
    level: "core",
    prompt: "Show pane numbers and choose one to jump to.",
    answer: "Ctrl+b q",
    explanation:
      "`Ctrl+b q` flashes pane numbers; typing one while it's showing jumps to that pane.",
  },
  {
    id: "tmux-last-window",
    category: "tmux",
    level: "core",
    prompt: "Jump back to the previously used window.",
    answer: "Ctrl+b l",
    explanation:
      "`Ctrl+b l` toggles between the current and last window — the fastest way to flip between two windows.",
  },
  {
    id: "tmux-last-pane",
    category: "tmux",
    level: "core",
    prompt: "Jump to the previously active pane.",
    answer: "Ctrl+b ;",
    explanation:
      "`Ctrl+b ;` moves focus to the last pane you were in — useful in busy split layouts.",
  },
  {
    id: "tmux-pane-dead-indicator",
    category: "tmux",
    level: "core",
    prompt: "Show which pane has died (its shell exited) in the window.",
    answer: ":display-panes",
    explanation:
      "Dead panes show a status in the pane display; `:list-panes` also reports their exit status.",
  },
  {
    id: "tmux-capture-pane-1",
    category: "tmux",
    level: "core",
    prompt: "Dump the current pane's visible contents to the clipboard from the shell.",
    answer: "tmux capture-pane -p",
    explanation:
      "`tmux capture-pane -p` prints the pane's screen contents to stdout, which you can pipe or save.",
  },
  {
    id: "tmux-pipe-pane",
    category: "tmux",
    level: "core",
    prompt: "Log everything in the current pane to a file.",
    answer: ":pipe-pane -o 'cat >> pane.log'",
    explanation:
      "`:pipe-pane -o …` appends pane output to the file; run again to stop piping.",
  },
  {
    id: "tmux-status-bar-toggle",
    category: "tmux",
    level: "core",
    prompt: "Hide the status bar for the current session.",
    answer: ":set -g status off",
    explanation:
      "`:set -g status off` hides the status bar; `on` brings it back.",
  },
  {
    id: "tmux-respawn-pane",
    category: "tmux",
    level: "core",
    prompt: "Restart the shell in the current dead pane.",
    answer: ":respawn-pane -k",
    explanation:
      "`:respawn-pane -k` kills any running process in the pane and starts a fresh shell.",
  },
  {
    id: "tmux-kill-server-1",
    category: "tmux",
    level: "core",
    prompt: "Kill the tmux server and every session it hosts.",
    answer: "tmux kill-server",
    explanation:
      "`tmux kill-server` tears down all sessions and panes. Use with care.",
  },
  {
    id: "tmux-list-windows",
    category: "tmux",
    level: "core",
    prompt: "List all windows in the current session.",
    answer: ":list-windows",
    explanation:
      "`:list-windows` prints each window with its index, name, and active pane.",
  },
  {
    id: "tmux-list-panes",
    category: "tmux",
    level: "core",
    prompt: "List every pane in the current window.",
    answer: ":list-panes",
    explanation:
      "`:list-panes` shows each pane's index, size, and current command.",
  },
  {
    id: "tmux-environment-set",
    category: "tmux",
    level: "core",
    prompt: "Set an environment variable MYVAR=1 for new panes in this session.",
    answer: ":setenv MYVAR 1",
    explanation:
      "`:setenv MYVAR 1` sets a session environment variable inherited by new panes.",
  },
  {
    id: "tmux-show-options",
    category: "tmux",
    level: "core",
    prompt: "Show the current value of all server options.",
    answer: ":show-options -g",
    explanation:
      "`:show-options -g` (or `-s`) prints the global configuration values tmux is using.",
  },
  {
    id: "tmux-start-detached",
    category: "tmux",
    level: "core",
    prompt: "Start a new tmux session named 'ci' without attaching to it.",
    answer: "tmux new -d -s ci",
    explanation:
      "`-d` detaches immediately, so the session runs headless — perfect for background work or scripts.",
  },
  {
    id: "tmux-attach-existing-prefer",
    category: "tmux",
    level: "core",
    prompt: "Attach to the first session named 'main', creating it if it doesn't exist.",
    answer: "tmux new -A -s main",
    explanation:
      "`-A` attaches if the session exists, otherwise creates it — a great default for `.bashrc`.",
  },
  {
    id: "tmux-kill-window-command",
    category: "tmux",
    level: "core",
    prompt: "Kill window 4 from the shell.",
    answer: "tmux kill-window -t 4",
    explanation:
      "`tmux kill-window -t 4` closes window 4. Combine with `-a` to kill all but a target.",
  },
  {
    id: "tmux-new-window-command",
    category: "tmux",
    level: "core",
    prompt: "Create a new window that immediately runs htop.",
    answer: "tmux new-window htop",
    explanation:
      "`tmux new-window htop` opens a window running htop; the window persists as long as htop runs.",
  },
  {
    id: "tmux-select-pane-up",
    category: "tmux",
    level: "core",
    prompt: "Move focus to the pane above the current one.",
    answer: "Ctrl+b ↑",
    explanation:
      "`Ctrl+b ↑` (or `Ctrl+b k`) moves focus upward. Works only if a pane exists there.",
  },
  {
    id: "tmux-choose-tree",
    category: "tmux",
    level: "core",
    prompt: "Open an interactive browser of sessions and windows.",
    answer: "Ctrl+b s",
    explanation:
      "`Ctrl+b s` shows the session tree; navigate and press Enter to switch. `Ctrl+b w` lists windows.",
  },
  {
    id: "tmux-display-message",
    category: "tmux",
    level: "core",
    prompt: "Show the session name in a temporary status message.",
    answer: ":display-message '#S'",
    explanation:
      "`:display-message '#S'` prints the session name; `#W` gives the window name, `#P` the pane index.",
  },
  {
    id: "tmux-window-rename-command",
    category: "tmux",
    level: "core",
    prompt: "Rename window 1 to 'logs' from the command line.",
    answer: "tmux rename-window -t 1 logs",
    explanation:
      "`tmux rename-window -t 1 logs` names window 1 'logs' without touching your current window.",
  },
  {
    id: "tmux-bind-key",
    category: "tmux",
    level: "core",
    prompt: "Bind 'r' to reload the tmux configuration file.",
    answer: ":bind r source-file ~/.tmux.conf",
    explanation:
      "`:bind r source-file ~/.tmux.conf` makes `Ctrl+b r` reload the config — handy while tweaking it.",
  },
  {
    id: "tmux-unbind-key",
    category: "tmux",
    level: "core",
    prompt: "Remove the default binding for 'Ctrl+b n' (next window).",
    answer: ":unbind n",
    explanation:
      "`:unbind n` removes that key from the prefix table, freeing it for a custom binding.",
  },
  {
    id: "tmux-config-reload",
    category: "tmux",
    level: "core",
    prompt: "Reload the tmux configuration file without restarting.",
    answer: "tmux source-file ~/.tmux.conf",
    explanation:
      "`source-file` re-reads the config live. Some changes (like prefix) need a new session or a source.",
  },
  {
    id: "tmux-window-list-menu",
    category: "tmux",
    level: "core",
    prompt: "Open a list of all windows to jump between them.",
    answer: "Ctrl+b w",
    explanation:
      "`Ctrl+b w` shows every window across sessions; pick one and press Enter to switch.",
  },
  {
    id: "tmux-move-window-left",
    category: "tmux",
    level: "core",
    prompt: "Move the current window one position to the left.",
    answer: "Ctrl+b :move-window -l",
    explanation:
      "`:move-window -l` shifts the window left by one. `-r` renumbers all windows sequentially.",
  },
  {
    id: "tmux-renumber-windows",
    category: "tmux",
    level: "core",
    prompt: "Renumber all windows so their indices are consecutive.",
    answer: ":move-window -r",
    explanation:
      "`:move-window -r` renumbers windows from 0 with no gaps — nice after closing several windows.",
  },
  {
    id: "tmux-switch-client",
    category: "tmux",
    level: "core",
    prompt: "From the shell, switch your terminal client to attach to session 'web'.",
    answer: "tmux switch-client -t web",
    explanation:
      "`tmux switch-client -t web` re-points the current client to another session without detaching.",
  },
  {
    id: "tmux-has-session",
    category: "tmux",
    level: "core",
    prompt: "Check whether a tmux session named 'build' exists (exit 0 if it does).",
    answer: "tmux has-session -t build",
    explanation:
      "`tmux has-session -t build` returns exit status 0 when the session exists — useful in shell scripts.",
  },
  {
    id: "tmux-detach-others",
    category: "tmux",
    level: "core",
    prompt: "Detach all other clients attached to the current session.",
    answer: "tmux detach-client -a",
    explanation:
      "`tmux detach-client -a` kicks off every other attached client, leaving only you.",
  },
  {
    id: "tmux-wait-for",
    category: "tmux",
    level: "core",
    prompt: "In a script, wait until the current window is closed.",
    answer: "tmux wait-for window",
    explanation:
      "`tmux wait-for window` blocks until `tmux wait-for -S window` signals it — a tmux synchronization primitive for scripts.",
  },
  {
    id: "tmux-copy-mode-q",
    category: "tmux",
    level: "core",
    prompt: "Exit copy mode.",
    answer: "q",
    explanation:
      "Press `q` in copy mode to return to the pane. Esc also works.",
  },
  {
    id: "tmux-copy-mode-page",
    category: "tmux",
    level: "core",
    prompt: "In copy mode, scroll up one page.",
    answer: "PgUp",
    explanation:
      "`PgUp` pages up through history while in copy mode; `PgDn` pages back down.",
  },
  {
    id: "tmux-copy-mode-word",
    category: "tmux",
    level: "core",
    prompt: "In copy mode, jump the cursor to the start of the previous word.",
    answer: "b",
    explanation:
      "Copy mode reuses vim-like keys when `mode-keys vi` is set: `b`/`w` move between words.",
  },
  {
    id: "tmux-copy-mode-vi-toggle",
    category: "tmux",
    level: "core",
    prompt: "Make copy mode use vim keybindings instead of emacs.",
    answer: ":set -g mode-keys vi",
    explanation:
      "`:set -g mode-keys vi` switches copy mode to vi keys (h/j/k/l, w/b, y to copy, etc.).",
  },
  {
    id: "tmux-set-prefix",
    category: "tmux",
    level: "core",
    prompt: "Change the prefix key from Ctrl+b to Ctrl+a.",
    answer: ":set -g prefix C-a",
    explanation:
      "`:set -g prefix C-a` rebinds the prefix; you must also unbind the old one (`unbind C-b`).",
  },
  {
    id: "tmux-escape-time",
    category: "tmux",
    level: "core",
    prompt: "Set the prefix escape delay to 10ms so commands feel snappier.",
    answer: ":set -sg escape-time 10",
    explanation:
      "A short `escape-time` reduces the delay when pressing Esc in nested programs like vim.",
  },
  {
    id: "tmux-history-limit",
    category: "tmux",
    level: "core",
    prompt: "Keep 10000 lines of history per pane.",
    answer: ":set -g history-limit 10000",
    explanation:
      "`history-limit` controls scrollback per pane; the default is 2000. Only applies to new panes.",
  },
  {
    id: "tmux-synchronize-panes",
    category: "tmux",
    level: "core",
    prompt: "Type the same input into every pane in the window at once.",
    answer: ":setw synchronize-panes on",
    explanation:
      "`:setw synchronize-panes on` mirrors keystrokes to all panes — great for running identical commands on many servers.",
  },
  {
    id: "tmux-pane-base-index",
    category: "tmux",
    level: "core",
    prompt: "Start pane numbering at 1 instead of 0.",
    answer: ":set -g base-index 1",
    explanation:
      "`base-index 1` makes panes number from 1; `pane-base-index` does the same for panes.",
  },
  {
    id: "tmux-pane-border-status",
    category: "tmux",
    level: "core",
    prompt: "Show a pane number badge in each pane's border.",
    answer: ":set -g pane-border-status top",
    explanation:
      "`pane-border-status top` puts a label (pane number) along the top of every pane border.",
  },
  {
    id: "tmux-status-style",
    category: "tmux",
    level: "core",
    prompt: "Style the status bar with a blue background and white text.",
    answer: ":set -g status-style bg=blue,fg=white",
    explanation:
      "`status-style` takes color pairs like `bg=blue,fg=white` to theme the status line.",
  },
  {
    id: "tmux-activity-monitor",
    category: "tmux",
    level: "core",
    prompt: "Highlight windows that have activity in the status bar.",
    answer: ":setw monitor-activity on",
    explanation:
      "`monitor-activity on` marks windows whose panes produced output, so you don't miss it.",
  },
  {
    id: "tmux-bell-action",
    category: "tmux",
    level: "core",
    prompt: "Show a message in the status bar when a bell rings in another window.",
    answer: ":set -g bell-action any",
    explanation:
      "`bell-action any` surfaces the bell regardless of the focused window (instead of ignoring it).",
  },
  {
    id: "tmux-remain-on-exit",
    category: "tmux",
    level: "core",
    prompt: "Keep a pane open after its shell exits so you can read the output.",
    answer: ":set -g remain-on-exit on",
    explanation:
      "With `remain-on-exit`, a pane shows 'dead' instead of closing, letting you inspect final output; `:respawn-pane` restarts it.",
  },
  {
    id: "tmux-new-session-cwd",
    category: "tmux",
    level: "core",
    prompt: "Create a session named 'proj' rooted at /var/www.",
    answer: "tmux new -s proj -c /var/www",
    explanation:
      "`-c` sets the starting directory, so every new window in the session begins there.",
  },
  {
    id: "tmux-vertical-only-window",
    category: "tmux",
    level: "core",
    prompt: "Create a new window split with the current command on top.",
    answer: "Ctrl+b %",
    explanation:
      "A window starts with one pane; `%` splits it. Use `tmux new-window` + splits to craft layouts per window.",
  },
  {
    id: "tmux-pane-size-equal",
    category: "tmux",
    level: "core",
    prompt: "Make all panes in the window the same size.",
    answer: ":select-layout tiled",
    explanation:
      "The `tiled` layout equalizes all panes. `even-horizontal`/`even-vertical` balance one axis.",
  },
  {
    id: "tmux-fullscreen-app",
    category: "tmux",
    level: "workflow",
    prompt:
      "You're running vim in one pane and want it to temporarily take the whole window without closing the other pane.",
    answer: "Ctrl+b z",
    explanation:
      "`Ctrl+b z` zooms the pane to fullscreen and back — the standard way to focus one pane.",
  },
  {
    id: "tmux-two-column-setup",
    category: "tmux",
    level: "workflow",
    prompt:
      "Set up a coding workspace: split the window so vim is on the left and a shell on the right.",
    answer: "Ctrl+b %",
    explanation:
      "`%` splits into left/right panes; run vim in one and a shell in the other, then use `Ctrl+b o` to swap focus.",
  },
  {
    id: "tmux-main-vertical-layout",
    category: "tmux",
    level: "workflow",
    prompt:
      "Arrange the current window with one large pane on the left and the rest stacked on the right.",
    answer: ":select-layout main-vertical",
    explanation:
      "`main-vertical` gives the first pane most of the window; the remaining panes stack beside it.",
  },
  {
    id: "tmux-recover-reattach",
    category: "tmux",
    level: "workflow",
    prompt:
      "Your SSH connection dropped and you want your tmux session back — reconnect and get straight to work.",
    answer: "tmux attach",
    explanation:
      "Because tmux runs on the remote host, the session survived the disconnect — `tmux attach` restores it exactly.",
  },
  {
    id: "tmux-multiplex-ssh",
    category: "tmux",
    level: "workflow",
    prompt:
      "Run the same deployment command on three servers in three different panes at once.",
    answer: ":setw synchronize-panes on",
    explanation:
      "Turn on `synchronize-panes`, type the command once, and it runs in every pane; turn it off afterward.",
  },
  {
    id: "tmux-dead-pane-revive",
    category: "tmux",
    level: "workflow",
    prompt:
      "A pane's process crashed and the pane shows dead — start a fresh shell in that pane without a new window.",
    answer: ":respawn-pane -k",
    explanation:
      "`:respawn-pane -k` kills whatever remains and launches a new shell in the same pane position.",
  },
  {
    id: "tmux-log-session",
    category: "tmux",
    level: "workflow",
    prompt:
      "You're debugging a live issue and want every line of the current pane saved to a log file.",
    answer: ":pipe-pane -o 'cat >> debug.log'",
    explanation:
      "`:pipe-pane -o` streams pane output to the log; rerun the same command to stop logging.",
  },
  {
    id: "tmux-detach-cron",
    category: "tmux",
    level: "workflow",
    prompt:
      "Start a long-running backup in a tmux session that keeps running even after you close the terminal.",
    answer: "tmux new -d -s backup './backup.sh'",
    explanation:
      "`-d` starts it detached, so the session keeps running without any attached client.",
  },
  {
    id: "tmux-window-per-task",
    category: "tmux",
    level: "workflow",
    prompt:
      "You have three tasks (edit, run server, tail logs) — give each its own window in the session.",
    answer: "Ctrl+b c",
    explanation:
      "Create windows with `Ctrl+b c` and jump between them with `Ctrl+b n`/`p` or the number keys.",
  },
  {
    id: "tmux-preserve-command-on-detach",
    category: "tmux",
    level: "workflow",
    prompt:
      "Your training job is mid-run in tmux; go home and check on it later without killing it.",
    answer: "Ctrl+b d",
    explanation:
      "Detach with `Ctrl+b d` — the job keeps running inside tmux on the server, reattach with `tmux attach`.",
  },
  {
    id: "tmux-share-session",
    category: "tmux",
    level: "workflow",
    prompt:
      "Allow a colleague on the same machine to watch your current tmux session read-only.",
    answer: "tmux attach -t 0 -r",
    explanation:
      "With the session's permissions open (`set -g destroy-unattached off`), `attach -r` joins read-only.",
  },
  {
    id: "tmux-resize-to-fit",
    category: "tmux",
    level: "workflow",
    prompt:
      "After a resize, your vim window shows 'E437: terminal capability insufficient' — fit the pane again.",
    answer: "Ctrl+b z",
    explanation:
      "Zoom out/in with `Ctrl+b z` re-negotiates the terminal size, usually clearing the stale-dimension error.",
  },
  {
    id: "tmux-window-create-command",
    category: "tmux",
    level: "workflow",
    prompt:
      "Open a second window running 'htop' to monitor the server while you work in window 0.",
    answer: "Ctrl+b c",
    explanation:
      "`Ctrl+b c` creates a window; launch htop there and `Ctrl+b 0` to flip back to your editor.",
  },
  {
    id: "tmux-swap-window-order",
    category: "tmux",
    level: "workflow",
    prompt:
      "Reorganize so the current window becomes window 0.",
    answer: ":move-window -t 0",
    explanation:
      "`:move-window -t 0` moves the current window to index 0, sliding others accordingly.",
  },
  {
    id: "tmux-keepalive-ssh",
    category: "tmux",
    level: "workflow",
    prompt:
      "Your remote tmux session keeps dying because the SSH connection idles out — stop it from timing out.",
    answer: ":set -g remain-on-exit on",
    explanation:
      "That keeps panes alive; the real fix is SSH keepalive (`ServerAliveInterval`) so the pipe never idles closed.",
  },
  {
    id: "tmux-status-time-format",
    category: "tmux",
    level: "core",
    prompt: "Show a 12-hour clock with AM/PM in the status bar.",
    answer: ":set -g status-right '%I:%M %p'",
    explanation:
      "`%I:%M %p` renders a 12-hour clock; `%H:%M` renders 24-hour.",
  },
  {
    id: "tmux-status-left-content",
    category: "tmux",
    level: "core",
    prompt: "Show the session name in the left side of the status bar.",
    answer: ":set -g status-left '#S'",
    explanation:
      "`#S` expands to the session name; `#W` is the window name, `#P` the pane index.",
  },
  {
    id: "tmux-monitor-silence",
    category: "tmux",
    level: "core",
    prompt: "Warn you when a pane has been silent for 2 minutes.",
    answer: ":setw monitor-silence 120",
    explanation:
      "`monitor-silence 120` flags panes with no output for two minutes — useful for long builds that hang.",
  },
  {
    id: "tmux-session-name-format",
    category: "tmux",
    level: "core",
    prompt: "Show the current session and window in the window list title.",
    answer: ":set -g window-status-current-format ' #I:#W '",
    explanation:
      "Window status formats control the title shown for the active window, e.g. `#I:#W` = index:name.",
  },
  {
    id: "tmux-quit-server-confirm",
    category: "tmux",
    level: "core",
    prompt: "Prevent accidental kills by asking before closing a window.",
    answer: ":set -g confirm-before kill-window",
    explanation:
      "`confirm-before kill-window` (or `kill-pane`, `kill-server`) makes tmux prompt before destructive commands.",
  },
  {
    id: "tmux-clipboard-set",
    category: "tmux",
    level: "core",
    prompt: "Copy the current selection directly to the system clipboard on macOS.",
    answer: ":set -g set-clipboard on",
    explanation:
      "With `set-clipboard on` (plus `bind-key -T copy-mode-vi y send -X copy-pipe-and-cancel 'pbcopy'`) copies reach the OS clipboard.",
  },
  {
    id: "tmux-command-alias",
    category: "tmux",
    level: "core",
    prompt: "Make `ls` inside the tmux command prompt run `list-sessions`.",
    answer: ":set -g command-alias[100] ls=list-sessions",
    explanation:
      "`command-alias` defines shortcuts for tmux commands typed at the `:` prompt.",
  },
  {
    id: "tmux-pane-remain-on-exit-all",
    category: "tmux",
    level: "workflow",
    prompt:
      "A batch job exits quickly in a pane and you miss the output — configure tmux to keep panes open after exit.",
    answer: ":set -g remain-on-exit on",
    explanation:
      "Set globally so every pane stays 'dead but visible' after its command exits, then `:respawn-pane` when done.",
  },
  {
    id: "tmux-window-renumber-on-close",
    category: "tmux",
    level: "workflow",
    prompt:
      "You closed window 3 and now windows are 0,1,4,5 — renumber them cleanly.",
    answer: ":move-window -r",
    explanation:
      "`:move-window -r` renumbers all windows to be consecutive, closing the gaps.",
  },
  {
    id: "tmux-ssh-pair",
    category: "tmux",
    level: "workflow",
    prompt:
      "Create a session with two panes, each SSH'd into a different server, and type the same command to both.",
    answer: ":setw synchronize-panes on",
    explanation:
      "Split with `%`, SSH into both, then `synchronize-panes on` broadcasts identical input to the pair.",
  },
  {
    id: "tmux-detach-timeout",
    category: "tmux",
    level: "workflow",
    prompt:
      "Your laptop sleeps and the terminal loses connection — when you come back the session is still fine. Make sure it never dies on its own.",
    answer: "tmux attach",
    explanation:
      "tmux sessions survive client disconnects by design — the server runs independently until killed.",
  },
  {
    id: "tmux-split-pane-command",
    category: "tmux",
    level: "workflow",
    prompt:
      "From the shell, split the pane in window 3 of session 'dev' horizontally.",
    answer: "tmux split-window -h -t dev:3",
    explanation:
      "`tmux split-window -h -t dev:3` splits window 3 of session 'dev' without you being attached.",
  },
  {
    id: "tmux-copy-mode-search",
    category: "tmux",
    level: "core",
    prompt: "In copy mode, search backward for the string 'ERROR'.",
    answer: "?ERROR",
    explanation:
      "In copy mode (vi keys), `?` searches backward and `/` forward; `n`/`N` cycle matches.",
  },
  {
    id: "tmux-copy-mode-yank",
    category: "tmux",
    level: "core",
    prompt: "In copy mode with vi keys, copy the selected text and exit.",
    answer: "y",
    explanation:
      "With `mode-keys vi`, `y` yanks the selection into the tmux buffer and returns to the pane; `Enter` copies without leaving.",
  },
  {
    id: "tmux-copy-mode-begin-line",
    category: "tmux",
    level: "core",
    prompt: "In copy mode, jump to the start of the line.",
    answer: "0",
    explanation:
      "`0` moves to the first column of the line in copy mode; `^` moves to the first non-blank character.",
  },
  {
    id: "tmux-copy-mode-half-page",
    category: "tmux",
    level: "core",
    prompt: "In copy mode, scroll down half a page.",
    answer: "Ctrl+d",
    explanation:
      "`Ctrl+d` scrolls down half a page in copy mode; `Ctrl+u` scrolls up half a page.",
  },
  {
    id: "tmux-copy-mode-end-line",
    category: "tmux",
    level: "core",
    prompt: "In copy mode, jump to the end of the line.",
    answer: "$",
    explanation:
      "`$` moves to the last character of the line in copy mode; `g$` handles wrapped lines.",
  },
  {
    id: "tmux-menu-choose",
    category: "tmux",
    level: "core",
    prompt: "Open the interactive pane menu (if menus are enabled).",
    answer: "Ctrl+b M",
    explanation:
      "`Ctrl+b M` (with `set -g menu on`) pops up a menu of common actions like split and resize.",
  },
  {
    id: "tmux-clear-pane-save-history",
    category: "tmux",
    level: "workflow",
    prompt:
      "Your scrollback is full of noise but you want to keep the last 500 lines of history.",
    answer: ":clear-history",
    explanation:
      "`:clear-history` wipes history; capture what you need first with `tmux capture-pane -pS -500 > keep.txt`.",
  },
  {
    id: "tmux-persist-layout",
    category: "tmux",
    level: "workflow",
    prompt:
      "You spent time crafting a pane layout and want it restored next session — save your tmux config.",
    answer: "tmux source-file ~/.tmux.conf",
    explanation:
      "Put layout/setting commands in ~/.tmux.conf; tmux sources it at server start, or manually with `source-file`.",
  },
  {
    id: "tmux-attach-detach-other",
    category: "tmux",
    level: "workflow",
    prompt:
      "Another client is attached to your session and you want them gone so you can work alone.",
    answer: "tmux detach-client -a",
    explanation:
      "`detach-client -a` disconnects every other client while keeping your own attached.",
  },
  {
    id: "tmux-session-scoped-env",
    category: "tmux",
    level: "workflow",
    prompt:
      "New panes should inherit DEBUG=1 — set it without leaving tmux.",
    answer: ":setenv DEBUG 1",
    explanation:
      "`:setenv DEBUG 1` exports DEBUG=1 to every future pane in the session. Existing panes keep their old env.",
  },
  {
    id: "tmux-run-once-per-session",
    category: "tmux",
    level: "workflow",
    prompt:
      "Write a .tmux.conf that runs 'echo welcome' only when the server first starts, not on reload.",
    answer: ":if-shell -F '#{!=:#{start_time},#{start_time}}' '' 'echo welcome'",
    explanation:
      "`if-shell` + start-time checks let you run one-time setup at server boot; simpler: guard with `if-shell '[ -z \"$TMUX\" ]'`.",
  },
  {
    id: "tmux-session-already-exists",
    category: "tmux",
    level: "workflow",
    prompt:
      "Your script tried to create session 'x' but it already exists and failed — make it attach instead.",
    answer: "tmux new -A -s x",
    explanation:
      "`-A` attaches to the existing session instead of erroring — idempotent session creation.",
  },
  {
    id: "tmux-tmux-in-tmux",
    category: "tmux",
    level: "core",
    prompt: "Nest another tmux inside the current one by using a second prefix.",
    answer: ":set -g prefix2 C-a",
    explanation:
      "`prefix2` gives an alternate prefix for nested tmux; send the inner prefix with the outer one first.",
  },
  {
    id: "tmux-display-panes-duration",
    category: "tmux",
    level: "core",
    prompt: "Show pane numbers for 5 seconds.",
    answer: ":display-panes -t 5",
    explanation:
      "`display-panes -t 5` keeps the pane-number overlay visible for five seconds.",
  },
  {
    id: "tmux-server-info",
    category: "tmux",
    level: "core",
    prompt: "Show tmux server version and runtime details.",
    answer: "tmux info",
    explanation:
      "`tmux info` prints server state including the tmux version — great for debugging configs.",
  },
  {
    id: "tmux-version",
    category: "tmux",
    level: "core",
    prompt: "Print the tmux version.",
    answer: "tmux -V",
    explanation:
      "`tmux -V` shows the version. Some config features are version-dependent.",
  },
  {
    id: "tmux-debug-log",
    category: "tmux",
    level: "core",
    prompt: "Start logging tmux debug info to a file.",
    answer: "tmux -L debug debug-log ~/tmux-debug.log",
    explanation:
      "`tmux debug-log` records server activity; useful when filing tmux bugs.",
  },
  {
    id: "tmux-new-session-nowindow",
    category: "tmux",
    level: "core",
    prompt: "Create a session with no windows at all (attach later with a command).",
    answer: "tmux new -s empty -d -x -y",
    explanation:
      "With no size, tmux creates the session without windows; `tmux new -s empty -d` with no command is a common headless start.",
  },
  {
    id: "tmux-window-flags",
    category: "tmux",
    level: "core",
    prompt: "Show asterisks next to windows with recent activity in the status bar.",
    answer: ":set -g window-status-activity-style bg=red",
    explanation:
      "Style window titles that have activity; `monitor-activity on` must be enabled too.",
  },
  {
    id: "tmux-kill-pane-command",
    category: "tmux",
    level: "workflow",
    prompt: "Kill pane 1 of window 2 in session 'dev' from the shell.",
    answer: "tmux kill-pane -t dev:2.1",
    explanation:
      "Targets are `session:window.pane` — `dev:2.1` is pane 1 of window 2 in session dev.",
  },
  {
    id: "tmux-rename-session-command",
    category: "tmux",
    level: "workflow",
    prompt: "Rename session 'old' to 'new' from the shell.",
    answer: "tmux rename-session -t old new",
    explanation:
      "`tmux rename-session -t old new` renames without attaching.",
  },
  {
    id: "tmux-move-pane-into-window",
    category: "tmux",
    level: "workflow",
    prompt: "Move the current pane into a brand-new window as its only pane.",
    answer: "Ctrl+b !",
    explanation:
      "`!` breaks the pane into a new window. `:join-pane` does the reverse.",
  },
  {
    id: "tmux-select-window-command",
    category: "tmux",
    level: "core",
    prompt: "Switch to window 1 from the shell.",
    answer: "tmux select-window -t 1",
    explanation:
      "`tmux select-window -t 1` makes window 1 active in the current session.",
  },
  {
    id: "tmux-active-pane-command",
    category: "tmux",
    level: "core",
    prompt: "Print the id of the active pane.",
    answer: "tmux display-message -p '#P'",
    explanation:
      "`-p` prints the formatted message without a popup — `#P` is the active pane index.",
  },
  {
    id: "tmux-current-window-command",
    category: "tmux",
    level: "core",
    prompt: "Print the current window's name from the shell.",
    answer: "tmux display-message -p '#W'",
    explanation:
      "`#W` expands to the active window name when printed via `display-message -p`.",
  },
  {
    id: "tmux-pane-pid",
    category: "tmux",
    level: "core",
    prompt: "Show the PID of the process running in the current pane.",
    answer: ":display-message -p '#{pane_pid}'",
    explanation:
      "`#{pane_pid}` is the pid of the pane's foreground process — handy for signals and debugging.",
  },
  {
    id: "tmux-session-id",
    category: "tmux",
    level: "core",
    prompt: "Print the numeric id of the current session.",
    answer: "tmux display-message -p '#S'",
    explanation:
      "`#S` prints the session name; numeric session ids use `#{session_id}` (e.g. $0).",
  },
  {
    id: "tmux-new-session-name-format",
    category: "tmux",
    level: "core",
    prompt: "Auto-name sessions with the working directory name when unnamed.",
    answer: ":set -g default-command ''",
    explanation:
      "Unnamed sessions default to the working directory's basename; `default-command` changes what new sessions run.",
  },
  {
    id: "tmux-status-interval",
    category: "tmux",
    level: "core",
    prompt: "Update the status bar every second.",
    answer: ":set -g status-interval 1",
    explanation:
      "`status-interval 1` refreshes the status line every second — needed for a ticking clock.",
  },
  {
    id: "tmux-status-justify",
    category: "tmux",
    level: "core",
    prompt: "Center the window list in the status bar.",
    answer: ":set -g status-justify centre",
    explanation:
      "`status-justify` sets the window-list alignment: left, centre, or right.",
  },
  {
    id: "tmux-status-bg",
    category: "tmux",
    level: "core",
    prompt: "Give the status bar a transparent background.",
    answer: ":set -g status-style bg=default",
    explanation:
      "`bg=default` makes the status bar transparent so your terminal theme shows through.",
  },
  {
    id: "tmux-detach-all-sessions",
    category: "tmux",
    level: "core",
    prompt: "Detach every client from all sessions at once.",
    answer: "tmux detach-client -s",
    explanation:
      "`tmux detach-client -s` disconnects all clients on the server, leaving sessions running.",
  },
  {
    id: "tmux-window-close-confirm",
    category: "tmux",
    level: "core",
    prompt: "Ask for confirmation before killing the server.",
    answer: ":set -g confirm-before kill-server",
    explanation:
      "`confirm-before kill-server` makes `Ctrl+b x`-style kills prompt 'y/n' first.",
  },
  {
    id: "tmux-new-window-cwd",
    category: "tmux",
    level: "core",
    prompt: "Create a new window in a specific directory without leaving the current one.",
    answer: "tmux new-window -c ~/logs",
    explanation:
      "`tmux new-window -c ~/logs` opens the window rooted at ~/logs.",
  },
  {
    id: "tmux-kill-session-if-empty",
    category: "tmux",
    level: "core",
    prompt: "Kill the current session automatically once its last window closes.",
    answer: ":set -g destroy-unattached on",
    explanation:
      "`destroy-unattached on` ends a session when it has no attached clients — good for one-off work sessions.",
  },
  {
    id: "tmux-respawn-window",
    category: "tmux",
    level: "core",
    prompt: "Restart the program in the current window from scratch.",
    answer: ":respawn-window",
    explanation:
      "`:respawn-window` starts the window's original command again, discarding its current state.",
  },
  {
    id: "tmux-session-search-window",
    category: "tmux",
    level: "workflow",
    prompt:
      "Jump to whichever window contains the pane running 'rails' across the whole session.",
    answer: "Ctrl+b f",
    explanation:
      "`Ctrl+b f` prompts for text and jumps to the window whose title contains it — great with `set -g set-titles on`.",
  },
  {
    id: "tmux-set-titles",
    category: "tmux",
    level: "core",
    prompt: "Let tmux set the terminal window title to the active window.",
    answer: ":set -g set-titles on",
    explanation:
      "`set-titles on` updates the outer terminal's title bar to show the tmux window name.",
  },
  {
    id: "tmux-pane-border-colors",
    category: "tmux",
    level: "core",
    prompt: "Color the active pane's border green.",
    answer: ":set -g pane-active-border-style fg=green",
    explanation:
      "`pane-active-border-style fg=green` highlights the focused pane's border.",
  },
  {
    id: "tmux-command-list",
    category: "tmux",
    level: "core",
    prompt: "List every tmux command available.",
    answer: "tmux list-commands",
    explanation:
      "`tmux list-commands` (or `:list-commands`) prints all commands with short descriptions.",
  },
  {
    id: "tmux-bind-key-list",
    category: "tmux",
    level: "core",
    prompt: "Show all key bindings in the prefix table.",
    answer: "tmux list-keys",
    explanation:
      "`tmux list-keys -T prefix` lists prefix bindings; `-T root` shows global ones.",
  },
  {
    id: "tmux-pane-command-from-shell",
    category: "tmux",
    level: "workflow",
    prompt:
      "Send 'htop' to the pane named 0 in window 1 of session 'mon' from outside tmux.",
    answer: "tmux send-keys -t mon:1.0 'htop' Enter",
    explanation:
      "Target syntax is `session:window.pane`; `send-keys` types into that pane as if you were there.",
  },
  {
    id: "tmux-copy-buffer-name",
    category: "tmux",
    level: "core",
    prompt: "Save the current pane's screen into a named tmux buffer 'screen1'.",
    answer: ":save-buffer -b screen1",
    explanation:
      "`:save-buffer -b screen1` stores the top buffer under a name; `:delete-buffer -b screen1` removes it.",
  },
  {
    id: "tmux-set-remain-on-exit",
    category: "tmux",
    level: "core",
    prompt: "Set remain-on-exit only for the current window.",
    answer: ":setw remain-on-exit on",
    explanation:
      "`:setw` targets windows instead of sessions, so this only affects the current window.",
  },
  {
    id: "tmux-session-chdir",
    category: "tmux",
    level: "core",
    prompt: "Change the current session's working directory to /srv/app.",
    answer: "tmux attach -c /srv/app",
    explanation:
      "`attach -c` sets the session working dir on attach; `:attach -c` works from inside too.",
  },
  {
    id: "tmux-pane-width",
    category: "tmux",
    level: "core",
    prompt: "Set the current pane to exactly 80 columns wide.",
    answer: ":resize-pane -x 80",
    explanation:
      "`:resize-pane -x 80` fixes the pane width; `-y` sets the height.",
  },
  {
    id: "tmux-zoom-cycle",
    category: "tmux",
    level: "workflow",
    prompt:
      "You keep pressing Ctrl+b z by accident and your panes vanish — what just happened?",
    answer: "Ctrl+b z",
    explanation:
      "Nothing is lost — `z` toggled the zoom. Press it again to restore the original split layout.",
  },
  {
    id: "tmux-3-pane-layout",
    category: "tmux",
    level: "workflow",
    prompt:
      "Build a three-pane window: one tall pane on the left, two stacked on the right.",
    answer: "Ctrl+b %",
    explanation:
      "Split once with `%`, focus the right pane (`Ctrl+b o`), split again with `%` — then arrange with `:select-layout main-vertical`.",
  },
  {
    id: "tmux-config-new-binding",
    category: "tmux",
    level: "workflow",
    prompt:
      "You want Ctrl+b then 'd' to also close the current window — add the binding and make it live.",
    answer: ":bind d kill-window",
    explanation:
      "`:bind d kill-window` binds `d`; pair with `source-file ~/.tmux.conf` to persist. Be careful — it shadows nothing default.",
  },
  {
    id: "tmux-reload-and-bind",
    category: "tmux",
    level: "workflow",
    prompt: "Bind 'I' to reload the config and install any plugins, then apply it now.",
    answer: ":bind I source-file ~/.tmux.conf \\; display-message 'reloaded'",
    explanation:
      "Chained commands in tmux use `\\;` inside a single command string.",
  },
  {
    id: "tmux-pane-environment",
    category: "tmux",
    level: "workflow",
    prompt: "Pass a variable only to the next new pane you create.",
    answer: ":setenv -g APP_MODE prod",
    explanation:
      "`setenv -g` sets a global environment var for all future panes across sessions.",
  },
];
