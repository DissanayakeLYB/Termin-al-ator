# Contributing to termin(al)ator

Thanks for helping out! The easiest and most valuable contribution is **adding
questions** — the dataset lives entirely in TypeScript files, no backend or
database involved.

## Adding a question

Questions are defined in `src/data/questions.ts` inside per-category arrays
(`vimQuestions`, `gitQuestions`, …). Category-specific extras live in
`src/data/extra<Vim|Tmux|Shell|Git|Docker|Regex|Ssh|Kubernetes>Questions.ts`
(merged automatically via the `questionSets` registry) — adding there keeps
diffs small. **Every question id must be unique across all files.**

A `QuizQuestion` looks like this:

```ts
{
  id: "git-amend-message",       // unique, kebab-case
  category: "git",               // must match the Category union
  level: "core",                 // "pareto" | "core" | "workflow"
  prompt: "You typo'd your last commit message — fix it in place.",
  answer: "git commit --amend -m 'new message'",
  explanation:
    "`git commit --amend -m …` rewrites the most recent commit with a new message.",
  aliases: ["git commit --amend"],      // optional extra accepted answers
  caseSensitive: false,                 // optional: accept any capitalization
  hints: [                              // optional, up to 3
    "It rewrites the latest commit, not a new one.",
    "It's `git commit` with a flag.",
  ],
}
```

Guidelines:

- **Prompt as a task**, not a question: *"Save the current file"*, not *"What does
  `:w` do?"*. Prompts render directly as terminal output.
- `level` is the **kind of practice**, never a difficulty rating:
  - `pareto` — commands a real user reaches for constantly. Repetitive on purpose.
  - `core` — the essential foundation every regular user should know. Nothing obscure.
  - `workflow` — realistic multi-step scenarios; the user decides which commands to use.
- If `hints` is omitted, three progressive hints are derived automatically from
  the question's own data (see `src/utils/hints.ts`). Write custom hints when the
  derived ones would be weak — especially for workflow questions.
- Keep `answer` and `aliases` exact; validation is whitespace-tolerant. Answers
  are **case-sensitive by default** — set `caseSensitive: false` when any
  capitalization should pass (the UI then omits its "case matters" tag).
  `Ctrl` key combos are always matched case-insensitively.

## Adding a new category

1. Add the tool's name to the `Category` union in `src/data/questions.ts`.
2. Export a `xxxQuestions: QuizQuestion[]` array for it in the same file.
3. Add an entry to the `questionSets` registry (label + description).
4. The category picker picks it up automatically — no other wiring needed.

Each category should stay at **200+ questions** — see `src/data/extraQuestions.ts`
for where per-category top-ups live.

## Adding a level

Level metadata lives in `src/data/levels.ts` (`levelInfos`, `countForLevel`,
`questionsForLevel`). A `workflow` level for a category is a pool of scenario
questions merged from `src/data/workflowQuestions.ts`.

## Code conventions

- TypeScript strict; `npm run build` runs `tsc --noEmit` + Vite.
- Tailwind v4 — theme tokens live in `src/index.css`. Class names must appear
  literally in source (no dynamically-concatenated class strings).
- Prefer small, focused components over big files; reuse existing components
  (`Button`, `InputBar`, `Feedback`, …) where possible.

## Before submitting

```bash
npm run build   # typecheck + production build
```

Also make sure a session plays through cleanly in your browser: pick the tool,
answer a question correctly and one incorrectly, use a hint, then `:quit` to the
results screen.
