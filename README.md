# termin(al)ator

A gamified terminal trainer: practice command-line tools one keystroke at a time.
The whole page is a terminal — tasks stream in, you type the command, feedback
prints below.

Built with **React + TypeScript + Tailwind CSS** (Vite). No backend, no database —
all questions live in local TypeScript files.

## Quick start

```bash
npm install
npm run dev        # start the dev server (http://localhost:5173)
npm run build      # typecheck + production build
```

## How to play

1. **Pick a tool** — vim, tmux, git, shell, docker, regex, ssh, or kubernetes.
2. **Pick a level** — what kind of practice you want:
   - **pareto** — the ~20% of commands used most in real life. Start here.
   - **core** — the essential foundation every regular user should know.
   - **workflow** — realistic scenarios where you decide which commands to use.
   - **chaos** — everything mixed, no hints about what's coming.
3. **Type the command** — each task asks for one thing (e.g. *Save the current file*).
   Type the exact command (`:w`) and press Enter. Stuck? Click `hint?` or type
   `:hint` for progressively stronger clues.
4. **Finish or switch anytime** — `:quit` ends the session and shows results;
   `:menu` jumps back to the picker.

Prefer a timed routine? From the menu, **10 minute practice** runs a sprint
across every tool and level. On a tool's level page, **sprint** times one
session for that tool, and **blitz** gives every question its own countdown
(`:pause` freezes whichever clock is running). All timed modes are weighted
toward the commands you've missed, end when the question pool runs out (no
repeats), and finish with a short summary and a daily streak.

Questions are shuffled into an infinite session, so the deck reshuffles when it
runs out. The dataset covers **1,846 questions across 8 tools** (200+ per
tool), all in local TypeScript files you can extend.

## Contributing

Pull requests are welcome! See [CONTRIBUTING.md](CONTRIBUTING.md) for how to add
questions, add a new category, and keep the codebase consistent.

## Project structure

```
src/
  data/                    # question types, datasets, level metadata
  hooks/useQuiz.ts         # infinite-session quiz state machine
  utils/                   # validation, session commands, hint engine
  components/              # presentational UI
  pages/                   # category → level → session → results
  App.tsx                  # full-page terminal shell + routing
  index.css                # Tailwind v4 theme + CRT/terminal styling
```
