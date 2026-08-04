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

- **Infinite randomized session** — questions are shuffled, and when the deck
  runs out it reshuffles and keeps going. There are no fixed rounds.
- Each task appears as plain terminal text (e.g. *Save the current file*);
  type the exact command (`:w`) at the `❯` prompt and press Enter.
- **Exit anytime** — type `:quit`, `exit`, or `bye` at the prompt to end the
  session and see your results.
- Answers are validated exactly (whitespace-tolerant). Ctrl combos are
  case-insensitive (`ctrl+r` = `Ctrl+r`), and some questions accept aliases
  (`:x` for `:wq`, `esc` for `Esc`, `42G` for `:42`).
- Correct answers print an explanation; wrong answers show the expected
  command and why it works.
- A status bar tracks score, questions answered, accuracy, and how many of the
  dataset's questions you've covered.
- The results screen shows session stats, a verdict, and a review list of every
  question you missed — type `restart` (or click the button) to play again.

The dataset currently contains **88 beginner–intermediate Vim questions**
across modes, file ops, movement, editing, search & replace, visual mode,
windows & tabs, and settings.

## Project structure

```
src/
  data/questions.ts      # question types, category registry, Vim dataset
  hooks/useQuiz.ts       # infinite-session quiz state machine
  utils/validate.ts      # answer normalization + exact-match validation
  utils/commands.ts      # reserved session commands (:quit, restart)
  components/            # presentational UI (Button, AnswerInput, StatusBar, …)
  pages/                 # QuizPage (terminal session) + ResultPage (summary)
  App.tsx                # full-page terminal shell + page wiring
  index.css              # Tailwind v4 theme tokens + CRT/terminal styling
```

## Adding a new category (Shell, Git, Tmux, Docker, …)

1. Add the tool name to the `Category` union in `src/data/questions.ts`.
2. Add a label to `categoryLabels`.
3. Export a `shellQuestions: QuizQuestion[]` (or similar) array in the same file.
4. Pass it to `useQuiz({ questions: shellQuestions })` in `src/App.tsx`.

Each `QuizQuestion` is `{ id, category, prompt, answer, explanation, aliases? }`.
Keep prompts phrased as a task ("Save the current file") — they render directly
as terminal output, with no added prefix.
