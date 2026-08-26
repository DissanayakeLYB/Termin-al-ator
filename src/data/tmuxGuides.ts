/**
 * Tmux guides — structured walkthroughs that teach tmux concepts with
 * explanations, examples, and inline exercises.
 */

import type { GuideSection } from "./sshGuides";

export const tmuxGuides: GuideSection[] = [
  {
    id: "tmux-sessions",
    title: "Sessions & Windows",
    tagline: "creating, attaching, and managing persistent sessions",
    description:
      "Tmux sessions survive disconnection — detach and reattach later without losing your work. Sessions contain windows, and windows contain panes.",
    subsections: [
      {
        title: "Starting and naming sessions",
        text: [
          "Run `tmux` to start a new session. It gets an auto-incremented name like `[0]`.",
          "Use `-s` to give it a meaningful name. Named sessions are much easier to manage with multiple projects:",
          "List all running sessions with `tmux ls`. The output shows session names and how many windows each has.",
        ],
        codeBlocks: [
          { code: "tmux                  start a new session (auto-named)" },
          { code: "tmux new -s dev       start a session named 'dev'" },
          { code: "tmux ls               list all running sessions" },
        ],
        exercises: [
          {
            prompt: "Start a new tmux session named `work`.",
            answer: "tmux new -s work",
            aliases: [
              "tmux new-session -s work",
              "tmux n -s work",
              "tmux new -s=work",
            ],
            explanation:
              "`tmux new -s name` creates a named session. Use `tmux a -s name` to attach to it later.",
          },
          {
            prompt: "List all running tmux sessions.",
            answer: "tmux ls",
            aliases: ["tmux list-sessions", "tmux lsw"],
            explanation:
              "`tmux ls` shows all sessions with their names, window counts, and activity timestamps.",
          },
        ],
      },
      {
        title: "Attaching and detaching",
        text: [
          "`Ctrl-b d` detaches from the current session — the session keeps running in the background. Your programs are not interrupted.",
          "`tmux a` reattaches to the last session. Use `-t` to attach to a specific session name.",
          "You can be attached to only one session at a time. Attaching elsewhere detaches the other client.",
        ],
        codeBlocks: [
          { code: "Ctrl-b d          detach from current session" },
          { code: "tmux a              attach to last session" },
          { code: "tmux a -t work      attach to session 'work'" },
        ],
        exercises: [
          {
            prompt: "Detach from the current tmux session.",
            answer: "Ctrl-b d",
            aliases: ["C-b d", "\u0002d"],
            explanation:
              "`Ctrl-b` is the prefix key, `d` detaches. The session stays alive — all processes keep running.",
          },
          {
            prompt: "Reattach to the session named `work`.",
            answer: "tmux a -t work",
            aliases: [
              "tmux attach -t work",
              "tmux attach-session -t work",
              "tmux a -t=work",
            ],
            explanation:
              "`tmux a -t name` attaches to a named session. Without `-t`, it attaches to the most recent session.",
          },
        ],
      },
      {
        title: "Killing sessions and windows",
        text: [
          "`tmux kill-session -t name` destroys a session and all its windows. All processes in those windows are terminated.",
          "Inside tmux, `Ctrl-b &` asks to kill the current window. `Ctrl-b x` kills the current pane.",
          "To kill the entire server (all sessions), use `tmux kill-server` — this is nuclear, use with caution.",
        ],
        codeBlocks: [
          { code: "tmux kill-session -t work   kill session 'work'" },
          { code: "Ctrl-b &          kill current window (prompts for confirmation)" },
          { code: "Ctrl-b x          kill current pane (prompts for confirmation)" },
        ],
        exercises: [
          {
            prompt: "Kill the tmux session named `old-project`.",
            answer: "tmux kill-session -t old-project",
            explanation:
              "`kill-session -t name` terminates the session and all windows/panes inside it.",
          },
        ],
      },
      {
        title: "Renaming sessions",
        text: [
          "`Ctrl-b $` lets you rename the current session from inside tmux.",
          "You can also rename from outside: `tmux rename-session -t old new`.",
          "Good names make it obvious what project or workflow lives in each session.",
        ],
        codeBlocks: [
          { code: "Ctrl-b $           rename current session (inside tmux)" },
          { code: "tmux rename-session -t dev prod  # rename from shell" },
        ],
        exercises: [
          {
            prompt: "Rename the current tmux session to `project-x` from inside tmux.",
            answer: "Ctrl-b $",
            aliases: ["C-b $", "\u0002$"],
            explanation:
              "`Ctrl-b $` opens a prompt at the bottom where you type the new session name.",
          },
        ],
      },
    ],
  },
  {
    id: "tmux-windows",
    title: "Windows",
    tagline: "tabs within a session for organizing work",
    description:
      "Windows are like browser tabs — each one is a full terminal. Switch between them to hop from your editor to a log viewer to a REPL.",
    subsections: [
      {
        title: "Creating and switching windows",
        text: [
          "`Ctrl-b c` creates a new window in the current session. It gets a number (0, 1, 2...) and starts a new shell.",
          "`Ctrl-b n` goes to the next window, `Ctrl-b p` goes to the previous. `Ctrl-b 0` through `Ctrl-b 9` jumps directly by number.",
          "`Ctrl-b ,` renames the current window. Give windows descriptive names like `editor`, `server`, `logs`.",
        ],
        codeBlocks: [
          { code: "Ctrl-b c       create new window" },
          { code: "Ctrl-b n       next window" },
          { code: "Ctrl-b p       previous window" },
          { code: "Ctrl-b 0-9     jump to window by number" },
          { code: "Ctrl-b ,       rename current window" },
        ],
        exercises: [
          {
            prompt: "Create a new window in the current tmux session.",
            answer: "Ctrl-b c",
            aliases: ["C-b c", "\u0002c"],
            explanation:
              "`Ctrl-b c` spawns a new window with a fresh shell. The window is numbered sequentially.",
          },
          {
            prompt: "Switch to the next tmux window.",
            answer: "Ctrl-b n",
            aliases: ["C-b n", "\u0002n"],
            explanation:
              "`Ctrl-b n` cycles forward through windows. `Ctrl-b p` goes backward.",
          },
          {
            prompt: "Jump directly to window number 2.",
            answer: "Ctrl-b 2",
            aliases: ["C-b 2", "\u00022"],
            explanation:
              "`Ctrl-b` followed by a number jumps directly to that window index.",
          },
        ],
      },
      {
        title: "Splitting into panes",
        text: [
          "`Ctrl-b %` splits the current pane vertically (side by side). `Ctrl-b \"` splits horizontally (top and bottom).",
          "Each pane is a separate terminal. Run different things in each — editor on the left, terminal on the right.",
          "`Ctrl-b o` cycles through panes. `Ctrl-b ;` switches to the last active pane. Arrow keys with the prefix also work.",
        ],
        codeBlocks: [
          { code: 'Ctrl-b %       split vertically (left/right)' },
          { code: 'Ctrl-b "       split horizontally (top/bottom)' },
          { code: "Ctrl-b o       cycle to next pane" },
          { code: "Ctrl-b ;       switch to last active pane" },
          { code: "Ctrl-b arrows  move between panes" },
        ],
        exercises: [
          {
            prompt: "Split the current pane vertically (side by side).",
            answer: "Ctrl-b %",
            aliases: ["C-b %", "\u0002%"],
            explanation:
              "`Ctrl-b %` creates a vertical split — left and right panes. Use `Ctrl-b \"` for horizontal (top/bottom).",
          },
          {
            prompt: "Split the current pane horizontally (top and bottom).",
            answer: 'Ctrl-b "',
            aliases: ['C-b "', '\u0002"'],
            explanation:
              '`Ctrl-b "` creates a horizontal split — top and bottom panes. Use `%` for vertical splits.',
          },
        ],
      },
      {
        title: "Resizing and managing panes",
        text: [
          "`Ctrl-b Alt-arrow` resizes the current pane in that direction. Hold `Ctrl` for larger increments.",
          "`Ctrl-b z` toggles zoom — maximizes the current pane to fill the entire window. Press again to restore.",
          "`Ctrl-b x` kills the current pane with a confirmation prompt.",
        ],
        codeBlocks: [
          { code: "Ctrl-b Alt-arrows    resize pane (small increments)" },
          { code: "Ctrl-b Ctrl-arrows   resize pane (large increments)" },
          { code: "Ctrl-b z             zoom/unzoom current pane" },
          { code: "Ctrl-b x             kill current pane" },
          { code: "Ctrl-b q             show pane numbers (press 0-9 to select)" },
        ],
        exercises: [
          {
            prompt: "Toggle zoom on the current tmux pane (maximize it).",
            answer: "Ctrl-b z",
            aliases: ["C-b z", "\u0002z"],
            explanation:
              "`Ctrl-b z` toggles zoom — the pane fills the entire window. Press again to restore your layout.",
          },
          {
            prompt: "Show pane numbers so you can jump to a specific one.",
            answer: "Ctrl-b q",
            aliases: ["C-b q", "\u0002q"],
            explanation:
              "`Ctrl-b q` briefly shows pane numbers overlay. Press a number to jump to that pane.",
          },
        ],
      },
    ],
  },
  {
    id: "tmux-copy",
    title: "Copy Mode",
    tagline: "scrolling back and copying text",
    description:
      "Copy mode lets you scroll back through history, select text, and copy it to tmux's paste buffer. Essential for reading long logs or output.",
    subsections: [
      {
        title: "Entering and navigating copy mode",
        text: [
          "`Ctrl-b [` enters copy mode. The status bar changes to show you're scrolling. Use arrow keys or vim-style keys to navigate.",
          "Scroll up with `Ctrl-u` or `Page Up`. Scroll down with `Ctrl-d` or `Page Down`. Press `q` or `Esc` to exit without copying.",
          "When vi mode is enabled (the default), `Space` starts a selection and `Enter` copies it to the paste buffer.",
        ],
        codeBlocks: [
          { code: "Ctrl-b [          enter copy mode" },
          { code: "Ctrl-u / PgUp     scroll up half page" },
          { code: "Ctrl-d / PgDn     scroll down half page" },
          { code: "q / Esc           exit copy mode" },
          { code: "Space             start selection (vi mode)" },
          { code: "Enter             copy selection to paste buffer" },
        ],
        exercises: [
          {
            prompt: "Enter tmux copy mode to scroll back through terminal history.",
            answer: "Ctrl-b [",
            aliases: ["C-b [", "\u0002["],
            explanation:
              "`Ctrl-b [` enters copy mode — use arrow keys or vi keys to scroll through history.",
          },
          {
            prompt: "In copy mode, scroll up one half-page.",
            answer: "Ctrl-u",
            aliases: ["C-u", "\u0015", "PageUp"],
            explanation:
              "`Ctrl-u` scrolls up half a page in copy mode. `Ctrl-d` scrolls down.",
          },
          {
            prompt: "Exit copy mode without copying any text.",
            answer: "q",
            aliases: ["Esc", "Escape"],
            explanation:
              "Press `q` or `Esc` to leave copy mode without copying anything to the paste buffer.",
          },
        ],
      },
      {
        title: "Pasting",
        text: [
          "`Ctrl-b ]` pastes the most recently copied text at the cursor position.",
          "You can copy text between panes and windows using the paste buffer — it's shared across the entire session.",
          "`Ctrl-b =` opens a list of all paste buffers if you've copied multiple things.",
        ],
        codeBlocks: [
          { code: "Ctrl-b ]       paste from tmux buffer" },
          { code: "Ctrl-b =       list and choose from paste buffers" },
        ],
        exercises: [
          {
            prompt: "Paste the contents of the tmux paste buffer.",
            answer: "Ctrl-b ]",
            aliases: ["C-b ]", "\u0002]"],
            explanation:
              "`Ctrl-b ]` pastes the last copied text from tmux's buffer into the current pane.",
          },
        ],
      },
    ],
  },
  {
    id: "tmux-keys",
    title: "Keybindings & Prefix",
    tagline: "customizing the prefix key and shortcuts",
    description:
      "Tmux uses a prefix key (`Ctrl-b` by default) before every command. You can remap it and create custom shortcuts for your workflow.",
    subsections: [
      {
        title: "The prefix key",
        text: [
          "Every tmux command starts with the prefix key `Ctrl-b`, then a command key. You must press `Ctrl-b` before each shortcut.",
          "Many people remap the prefix to `Ctrl-a` (like GNU screen) because it's easier to reach. Some use `Ctrl-s` or even `Ctrl-space`.",
          "The prefix is configured in `~/.tmux.conf` with `set -g prefix`. You should also unbind the old prefix.",
        ],
        codeBlocks: [
          {
            label: "Remap prefix to Ctrl-a (~/.tmux.conf)",
            code: `unbind C-b
set -g prefix C-a
bind C-a send-prefix`,
          },
        ],
        exercises: [
          {
            prompt:
              "In tmux config, change the prefix key from Ctrl-b to Ctrl-a.",
            answer: "set -g prefix C-a",
            aliases: [
              "set-option -g prefix C-a",
              "set -g prefix 'C-a'",
            ],
            explanation:
              "`set -g prefix C-a` remaps the prefix. Also `unbind C-b` to release the old one, and `bind C-a send-prefix` to pass through.",
          },
        ],
      },
      {
        title: "Custom keybindings",
        text: [
          "`bind` creates a new shortcut. `bind r` makes `Ctrl-b r` do whatever command follows. `unbind` removes a binding.",
          "Add `-n` to skip the prefix: `bind -n C-h select-pane -L` makes `Ctrl-h` work without the prefix.",
          "Common useful bindings: reload config, split with easier keys, or launch a specific program.",
        ],
        codeBlocks: [
          {
            label: "Useful custom bindings (~/.tmux.conf)",
            code: `# Reload config with Ctrl-b r
bind r source-file ~/.tmux.conf \\; display "Config reloaded!"

# Split panes with | and - (easier to remember)
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"

# New window in current path
bind c new-window -c "#{pane_current_path}"

# Vim-style pane navigation
bind h select-pane -L
bind j select-pane -D
bind k select-pane -U
bind l select-pane -R`,
          },
        ],
        exercises: [
          {
            prompt:
              "In tmux config, create a keybinding so Ctrl-b r reloads the config file.",
            answer: "bind r source-file ~/.tmux.conf",
            aliases: [
              "bind r source-file ~/.tmux.conf ; display-message Config reloaded!",
              "bind r source ~/.tmux.conf",
            ],
            explanation:
              "`bind r source-file ~/.tmux.conf` makes `Ctrl-b r` reload config without restarting tmux.",
          },
          {
            prompt:
              "In tmux config, bind the `|` key (with prefix) to split the current pane vertically.",
            answer: 'bind | split-window -h',
            aliases: [
              'bind | split-window -h -c "#{pane_current_path}"',
              "bind \\ split-window -h",
            ],
            explanation:
              '`bind | split-window -h` makes `Ctrl-b |` split vertically — easier to remember than `%`.',
          },
        ],
      },
      {
        title: "Show keybindings",
        text: [
          "`Ctrl-b ?` shows a list of all current keybindings. This is the fastest way to look up what a shortcut does.",
          "`tmux list-keys` from the shell does the same thing but prints to stdout for piping or searching.",
        ],
        codeBlocks: [
          { code: "Ctrl-b ?          show keybindings (inside tmux)" },
          { code: "tmux list-keys    list all bindings (from shell)" },
        ],
        exercises: [
          {
            prompt: "Display all current tmux keybindings from inside a session.",
            answer: "Ctrl-b ?",
            aliases: ["C-b ?", "\u0002?"],
            explanation:
              "`Ctrl-b ?` opens a scrollable list of every keybinding. Press `q` to close it.",
          },
        ],
      },
    ],
  },
  {
    id: "tmux-config",
    title: "Configuration",
    tagline: "essential ~/.tmux.conf settings",
    description:
      "A well-crafted `~/.tmux.conf` turns tmux from a multiplexer into a personalized workspace with mouse support, smart splits, and status bar tweaks.",
    subsections: [
      {
        title: "Essential settings",
        text: [
          "These settings improve tmux defaults significantly. Add them to `~/.tmux.conf`:",
          "`set -g mouse on` enables mouse support — click to select panes, scroll to navigate history, drag to resize.",
          "`set -g base-index 1` starts window numbering at 1 instead of 0. `setw -g pane-base-index 1` does the same for panes.",
          "`set -g default-terminal \"screen-256color\"` enables 256-color support. Add `set -as terminal-overrides ',*256col*:Tc'` if your terminal supports true color.",
          "`set -g history-limit 50000` increases scrollback from the default 2000 lines to 50000.",
        ],
        codeBlocks: [
          {
            label: "Essential ~/.tmux.conf",
            code: `# Enable mouse support
set -g mouse on

# Start numbering at 1
set -g base-index 1
setw -g pane-base-index 1

# 256-color support
set -g default-terminal "screen-256color"

# Increase scrollback buffer
set -g history-limit 50000

# Faster command sequences (escape time)
set -sg escape-time 0

# Enable focus events
set -g focus-events on`,
          },
        ],
        exercises: [
          {
            prompt: "In tmux config, enable mouse support.",
            answer: "set -g mouse on",
            aliases: [
              "set-option -g mouse on",
              "set -g mouse on",
            ],
            explanation:
              "`set -g mouse on` lets you click panes, scroll history, and resize with the mouse.",
          },
          {
            prompt:
              "In tmux config, increase the scrollback history to 50000 lines.",
            answer: "set -g history-limit 50000",
            aliases: [
              "set-option -g history-limit 50000",
              "set -g history-limit 50000",
            ],
            explanation:
              "The default is only 2000 lines. 50000 is enough for most log scrolling needs.",
          },
          {
            prompt:
              "In tmux config, set the escape timeout to 0 milliseconds for faster vim/neovim response.",
            answer: "set -sg escape-time 0",
            aliases: [
              "set-option -sg escape-time 0",
              "set -g escape-time 0",
            ],
            explanation:
              "Setting escape-time to 0 eliminates the delay when pressing Esc in vim/neovim inside tmux.",
          },
        ],
      },
      {
        title: "Status bar customization",
        text: [
          "The status bar at the bottom shows session name, window list, and system info. You can customize its colors, content, and position.",
          "`set -g status-bg` and `set -g status-fg` set the status bar colors. Use `status-left` and `status-right` for custom text.",
          "`set -g status-left-length` controls how much space the left side gets. Useful for long session names or battery indicators.",
        ],
        codeBlocks: [
          {
            label: "Status bar customization (~/.tmux.conf)",
            code: `# Status bar colors
set -g status-bg black
set -g status-fg white

# Left status: session name
set -g status-left-length 30
set -g status-left "#[fg=green]#S "

# Right status: hostname and time
set -g status-right "#[fg=yellow]%H:%M #[fg=cyan]%Y-%m-%d"

# Window format: number and name
setw -g window-status-format " #I:#W "
setw -g window-status-current-format " #I:#W* "`,
          },
        ],
        exercises: [
          {
            prompt:
              "In tmux config, set the left side of the status bar to show the session name in green.",
            answer: 'set -g status-left "#[fg=green]#S"',
            aliases: [
              "set -g status-left '#[fg=green]#S'",
              'set-option -g status-left "#[fg=green]#S"',
            ],
            explanation:
              "`#S` is the session name. `#[fg=green]` sets the text color. You can chain colors and text freely.",
          },
        ],
      },
      {
        title: "Smart splits and layouts",
        text: [
          "Smart splits preserve the current working directory when you create a new pane or window. This is one of the most common tmux config additions.",
          "`-c \"#{pane_current_path}\"` tells the split command to use the current pane's directory. Without it, new panes start at `$HOME`.",
          "You can also save and restore layouts with `tmux-resurrect` and `tmux-continuum` plugins for persistence across reboots.",
        ],
        codeBlocks: [
          {
            label: "Smart splits (~/.tmux.conf)",
            code: `# Split in current directory with | and -
bind | split-window -h -c "#{pane_current_path}"
bind - split-window -v -c "#{pane_current_path}"

# New window in current directory
bind c new-window -c "#{pane_current_path}"`,
          },
        ],
        exercises: [
          {
            prompt:
              "In tmux config, make `Ctrl-b c` open a new window in the current pane's directory.",
            answer: 'bind c new-window -c "#{pane_current_path}"',
            explanation:
              "Without `-c \"#{pane_current_path}\"`, new windows always start at `$HOME`.",
          },
        ],
      },
      {
        title: "Loading config",
        text: [
          "After editing `~/.tmux.conf`, reload it without restarting tmux.",
          "The most common way is `tmux source-file ~/.tmux.conf` from the shell, or `Ctrl-b` then `:` and type `source ~/.tmux.conf`.",
          "If you've set up a reload binding (like `Ctrl-b r`), use that for speed.",
        ],
        codeBlocks: [
          { code: "tmux source-file ~/.tmux.conf    reload from shell" },
          { code: "Ctrl-b : source ~/.tmux.conf     reload inside tmux" },
          { code: "Ctrl-b r                          (if you added a reload binding)" },
        ],
        exercises: [
          {
            prompt: "Reload the tmux configuration from inside a session.",
            answer: "Ctrl-b : source ~/.tmux.conf",
            aliases: ["tmux source-file ~/.tmux.conf"],
            explanation:
              "Use `Ctrl-b :` to open command mode, then type `source ~/.tmux.conf` to reload.",
          },
        ],
      },
    ],
  },
  {
    id: "tmux-workflows",
    title: "Workflows & Scripts",
    tagline: "automating tmux setups for common projects",
    description:
      "Tmux can automate your development environment: start multiple panes, run servers, and attach editors — all in one command.",
    subsections: [
      {
        title: "Running commands in new panes",
        text: [
          "`tmux send-keys` sends keystrokes to a session/pane without attaching. Perfect for scripts that start servers or run tests.",
          "Use `tmux split-window -h -t session:window.pane -c dir` to target a specific pane for the split.",
          "Combine `send-keys` with `Enter` to execute commands automatically.",
        ],
        codeBlocks: [
          {
            label: "Send a command to a session",
            code: `tmux send-keys -t work 'cd ~/project && npm start' Enter`,
          },
          {
            label: "Script: start dev environment",
            code: `#!/bin/bash
SESSION="dev"

tmux new-session -d -s $SESSION -n editor

# Pane 0: editor
tmux send-keys -t $SESSION:0.0 'vim .' Enter

# Pane 1: terminal (split right)
tmux split-window -h -t $SESSION:0.0
tmux send-keys -t $SESSION:0.1 'cd ~/project && npm start' Enter

# Pane 2: logs (split below)
tmux split-window -v -t $SESSION:0.1
tmux send-keys -t $SESSION:0.2 'tail -f logs/app.log' Enter

tmux attach -t $SESSION`,
          },
        ],
        exercises: [
          {
            prompt:
              "Send the command `cd ~/project && npm start` to the `dev` session.",
            answer: "tmux send-keys -t dev 'cd ~/project && npm start' Enter",
            aliases: [
              "tmux send-keys -t dev \"cd ~/project && npm start\" Enter",
              "tmux send-keys -t dev 'cd ~/project && npm start' \\; Enter",
            ],
            explanation:
              "`send-keys -t session 'command' Enter` sends keystrokes to a session without attaching to it.",
          },
        ],
      },
      {
        title: "Detaching and reattaching workflows",
        text: [
          "The killer feature: start a session, detach, go home, reattach — everything is exactly where you left it.",
          "Useful pattern: `ssh server` → `tmux a` → all your work is there. SSH disconnections don't kill tmux sessions.",
          "On macOS, `reattach-to-user-namespace` may be needed for clipboard access inside tmux. Install via `brew install reattach-to-user-namespace`.",
        ],
        codeBlocks: [
          {
            label: "SSH + tmux pattern",
            code: `# On the server:
tmux new -s project    # start a session

# ... work for hours ...

# Disconnect SSH (tmux keeps running)
exit

# Later, reconnect:
ssh server
tmux a -t project      # everything is still there!`,
          },
        ],
        exercises: [
          {
            prompt:
              "After SSH disconnects, reattach to the tmux session named `project`.",
            answer: "tmux a -t project",
            aliases: ["tmux attach -t project"],
            explanation:
              "This is tmux's superpower — sessions survive SSH disconnections. Just reattach.",
          },
        ],
      },
      {
        title: "Saving and restoring sessions",
        text: [
          "The `tmux-resurrect` plugin saves session layouts to a file and restores them after reboots. It's the most popular tmux plugin.",
          "`Ctrl-b Ctrl-s` saves (with resurrect). `Ctrl-b Ctrl-r` restores. The saved state includes pane layout, running programs, and working directories.",
          "For automatic saves, `tmux-continuum` periodically saves so you never lose your layout, even on unexpected restarts.",
        ],
        codeBlocks: [
          {
            label: "Installing tmux-resurrect (~/.tmux.conf)",
            code: `# Plugin manager (tmux sensible)
set -g @plugin 'tmux-plugins/tpm'

# Save/restore sessions
set -g @plugin 'tmux-plugins/tmux-resurrect'

# Auto-save every 15 minutes
set -g @continuum-restore 'on'
set -g @plugin 'tmux-plugins/tmux-continuum'

# Initialize plugin manager (keep at bottom)
run '~/.tmux/plugins/tpm/tpm'`,
          },
        ],
        exercises: [
          {
            prompt:
              "In tmux config, add the tmux-resurrect plugin using TPM plugin manager.",
            answer: "set -g @plugin 'tmux-plugins/tmux-resurrect'",
            aliases: [
              "set -g @plugin \"tmux-plugins/tmux-resurrect\"",
            ],
            explanation:
              "TPM (Tmux Plugin Manager) manages plugin installation. Add plugins before the `run` line.",
          },
        ],
      },
    ],
  },
];
