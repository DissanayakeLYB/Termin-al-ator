# Run doc — termin(al)ator preview

Vite + React + TypeScript + Tailwind (v4) SPA. No env files, no backend.

## Reproduce artifacts (fresh checkout)

```bash
npm install        # installs all deps (react, vite, tailwind, typescript)
```

No `.env*` files or other uncommitted artifacts are needed — the app runs
entirely off committed source plus `node_modules`.

## Run the dev server

```bash
npm run dev        # starts Vite, defaults to http://localhost:5173
```

- Default port 5173; if taken, Vite auto-increments (5174, …). No config
  change needed.
- Log output goes to the thread's preview log file (`.freebuff/preview-*.log`).
- Server must be started DETACHED so it outlives the conversation:
  `(npm run dev > .freebuff/preview-<id>.log 2>&1 &)` then wait for HTTP 200.
- Build check: `npm run build` (runs `tsc --noEmit && vite build`).
