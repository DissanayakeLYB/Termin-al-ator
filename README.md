# termin(al)ator

A gamified, full-page **terminal trainer** that helps you practice command-line
tools — one keystroke at a time. The entire page is a terminal: tasks stream in
like command output, you type your answer at the bottom prompt, and feedback
prints right below.

Built with **React + TypeScript + Tailwind CSS** (Vite). No backend, no
database — all questions live in local TypeScript files.

## Run it

```bash
npm install
npm run dev        # start the dev server
npm run build      # typecheck + production build
npm run preview    # preview the production build
```

## How it works

- **Choose your practice** — the boot menu lists every available category
  (vim, tmux, …) with question counts; pick by number, name, or click. Categories
  without questions yet show as *coming soon*.
- **Choose a level** — after picking a tool you pick *what kind of practice*
  you want. Levels are never a difficulty rating; each one exercises a
  different kind of knowledge:
  - **pareto** — the ~20% of commands used most in real life. Repetitive on
    purpose, to build muscle memory fast. The best starting point.
  - **core** — the essential foundation every regular user should know.
    Broader than pareto, still nothing obscure.
  - **workflow** — realistic scenarios where you decide which commands to use
    (set up a workspace, recover from a mistake, ship a change).
  - **chaos** — every question from every level, shuffled with no hints about
    which command or concept is coming next.
- **Infinite randomized session** — questions are shuffled, and when the deck
  runs out it reshuffles and keeps going. There are no fixed rounds.
- Each task appears as plain terminal text (e.g. *Save the current file*);
  type the exact command (`:w`) at the `❯` prompt and press Enter.
- **Exit anytime, switch anytime** — type `:quit` (or `exit`, `bye`) to end the
  session and see results; type `:menu` (or `switch`) to jump back to the
  practice picker mid-session and start another category.
- Answers are validated exactly (whitespace-tolerant). Ctrl combos are
  case-insensitive (`ctrl+r` = `Ctrl+r`), and some questions accept aliases
  (`:x` for `:wq`, `esc` for `Esc`, `42G` for `:42`).
- Correct answers print an explanation; wrong answers show the expected
  command and why it works.
- A status bar tracks score, questions answered, accuracy, and how many of the
  dataset's questions you've covered.
- The results screen shows session stats, a verdict, and a review list of every
  question you missed — type `restart` (or click the button) to play again.

The dataset currently contains **167 Vim questions** (modes, movement, editing,
search & replace, visual mode, windows & tabs, text objects, macros, marks,
filters, buffers, formatting), **55 tmux questions** (sessions, panes, windows,
copy mode & buffers, configuration, workspace scenarios), **110 git questions**
(staging, history, branches & merging, undoing & recovery, history rewriting,
remotes, config & aliases, internals, submodules, and scenario workflows), and
**81 shell questions** (files & navigation, searching, pipes & redirection,
processes, interactive shortcuts, permissions, environment, text processing,
archives, and pipelines), **85 docker questions** (images & containers,
container lifecycle, building & registries, Dockerfile instructions, compose,
networks, volumes, cleanup, and dev workflows), **55 regex questions**
(anchors, character classes, quantifiers, groups & alternation, escapes,
common patterns, flags, and pattern-building tasks), **57 ssh questions**
(connecting, keys & authentication, the agent, tunneling, file transfer,
config & hardening, and tunnel/backup workflows), and **68 kubernetes
questions** (cluster & context, pods, workloads & rollouts, services &
networking, config & secrets, namespaces, resource management, manifests, and
rollout/access workflows).

Every question is tagged with a level (pareto / core / workflow), and new
scenario questions for the workflow level live in `src/data/workflowQuestions.ts`.

## Project structure

```
src/
  data/questions.ts         # question types, datasets, questionSets registry
  data/levels.ts            # level metadata + pool selection (questionsForLevel)
  data/workflowQuestions.ts # scenario questions for the workflow level
  hooks/useQuiz.ts          # infinite-session quiz state machine
  utils/validate.ts         # answer normalization + exact-match validation
  utils/commands.ts         # reserved session commands (:quit, :menu, back, restart)
  components/               # presentational UI (Button, InputBar, BootBanner, …)
  pages/                    # CategoryPage + LevelPage + QuizPage + ResultPage
  App.tsx                   # full-page terminal shell + category/level routing
  index.css                 # Tailwind v4 theme tokens + CRT/terminal styling
```

## Adding a new category (Shell, Git, Docker, Regex, …)

1. Add the tool name to the `Category` union in `src/data/questions.ts`.
2. Export a `shellQuestions: QuizQuestion[]` (or similar) array in the same file.
3. Add an entry to the `questionSets` registry with a label and description.
4. The category picker picks it up automatically — no other wiring needed.

Each `QuizQuestion` is
`{ id, category, level, prompt, answer, explanation, aliases? }` where `level`
is `"pareto" | "core" | "workflow"` (chaos is a session-level mix of all three,
not a per-question tag). Keep prompts phrased as a task ("Save the current
file") — they render directly as terminal output, with no added prefix.
