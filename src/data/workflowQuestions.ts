import type { Category, QuizQuestion } from "./questions";

/**
 * Scenario-driven questions for the "workflow" level.
 *
 * These test *accomplishing something* — picking the right command and flags
 * for a realistic situation — rather than recalling a single keybinding in
 * isolation. Some accept a chained one-liner (e.g. `&&` or a pipeline) as the
 * answer, so a single response can cover a multi-step task.
 *
 * They are merged into each category's dataset by `questionSets`; the level
 * picker filters them out of pareto/core sessions automatically.
 */

export const vimWorkflowQuestions: QuizQuestion[] = [
  {
    id: "vim-ws-project-search",
    category: "vim",
    level: "workflow",
    prompt:
      "Search the entire project for every occurrence of the word `BUG` and list the results with file names and line numbers.",
    answer: ":vimgrep BUG **",
    aliases: [":vim BUG **"],
    explanation:
      "`:vimgrep BUG **` searches every file under the current directory and fills the quickfix list. Open it with `:copen` and jump between matches with `:cn`.",
  },
  {
    id: "vim-ws-fix-typos-confirm",
    category: "vim",
    level: "workflow",
    prompt:
      "You keep typing `teh` instead of `the`. Fix every occurrence in the file, but review each change before applying it.",
    answer: ":%s/teh/the/gc",
    explanation:
      "The `c` flag makes the substitution ask for confirmation at every match — the safe way to do a sweeping replace when you're not 100% sure.",
  },
  {
    id: "vim-ws-retab",
    category: "vim",
    level: "workflow",
    prompt:
      "The file uses tabs, but your team standard is spaces. Convert every leading tab to spaces across the whole file.",
    answer: ":retab!",
    explanation:
      "`:retab!` re-expands tabs into spaces according to your `tabstop`/`shiftwidth` settings — set them first (`:set ts=4 sw=4`) for predictable results. Plain `:retab` does the opposite.",
  },
  {
    id: "vim-ws-quickfix-open",
    category: "vim",
    level: "workflow",
    prompt:
      "You just ran a project-wide search. Open the results list so you can jump through every match.",
    answer: ":copen",
    aliases: [":cw"],
    explanation:
      "`:copen` opens the quickfix window listing every match from `:vimgrep` — press Enter on a line to jump straight there.",
  },
];

export const tmuxWorkflowQuestions: QuizQuestion[] = [
  {
    id: "tmux-ws-codespace",
    category: "tmux",
    level: "workflow",
    prompt:
      "Set up a coding workspace in one shot: a detached session named `dev` that starts with two side-by-side panes.",
    answer: "tmux new -d -s dev 'tmux split-window -h'",
    aliases: [
      "tmux new-session -d -s dev 'tmux split-window -h'",
      "tmux new -d -s dev \"tmux split-window -h\"",
    ],
    explanation:
      "A command after the session name runs inside the first pane — here it splits the window horizontally. A whole workspace in one line.",
  },
  {
    id: "tmux-ws-survive-build",
    category: "tmux",
    level: "workflow",
    prompt:
      "You're about to run a long build over SSH. Start a session named `build` and detach immediately so it survives a dropped connection.",
    answer: "tmux new -d -s build",
    aliases: ["tmux new-session -d -s build"],
    explanation:
      "`-d` creates the session detached, so the build keeps running even if you disconnect. Rejoin it anytime with `tmux attach -t build`.",
  },
  {
    id: "tmux-ws-monitor-window",
    category: "tmux",
    level: "workflow",
    prompt:
      "In your `dev` session, create a window named `monitor` that runs `tail -f app.log` as soon as it opens.",
    answer: "tmux new-window -n monitor 'tail -f app.log'",
    aliases: ["tmux new-window -n monitor \"tail -f app.log\""],
    explanation:
      "`-n` names the new window and the trailing command runs inside it — a one-command log watchtower you can flip to whenever you need it.",
  },
  {
    id: "tmux-ws-find-error",
    category: "tmux",
    level: "workflow",
    prompt:
      "An error scrolled off the top of your pane. Dump the pane's current contents as text so you can grep them.",
    answer: "tmux capture-pane -p",
    aliases: ["tmux capture-pane"],
    explanation:
      "`tmux capture-pane -p` prints the pane's visible buffer to stdout — pipe it into grep or a file to inspect whatever scrolled by.",
  },
  {
    id: "tmux-ws-session-for-project",
    category: "tmux",
    level: "workflow",
    prompt:
      "Start a session named `dev` already sitting in the project directory `/home/alice/app`, so its first window is ready to work.",
    answer: "tmux new -s dev -c /home/alice/app",
    aliases: ["tmux new-session -s dev -c /home/alice/app"],
    explanation:
      "`-c` sets the working directory for the new session's first window — no `cd` needed once you attach.",
  },
];

export const gitWorkflowQuestions: QuizQuestion[] = [
  {
    id: "git-ws-hotfix",
    category: "git",
    level: "workflow",
    prompt:
      "Production is broken. Create a hotfix branch based on `main` and switch to it in one command.",
    answer: "git checkout -b hotfix main",
    aliases: ["git switch -c hotfix main"],
    explanation:
      "`checkout -b <name> <base>` creates the branch and switches to it in one step — the base defaults to the current branch when omitted.",
  },
  {
    id: "git-ws-park-untracked",
    category: "git",
    level: "workflow",
    prompt:
      "You're mid-experiment with untracked files and need to switch branches. Park everything, untracked files included.",
    answer: "git stash -u",
    aliases: ["git stash --include-untracked"],
    explanation:
      "Plain `git stash` leaves untracked files behind; `-u` (or `--include-untracked`) sweeps them up too.",
  },
  {
    id: "git-ws-first-commit",
    category: "git",
    level: "workflow",
    prompt:
      "You just ran `git init` in a fresh folder. Stage everything and make your first commit in one go.",
    answer: "git add . && git commit -m \"initial commit\"",
    aliases: [
      "git add -A && git commit -m \"initial commit\"",
      "git add . && git commit -m 'initial commit'",
      "git add -A && git commit -m 'initial commit'",
    ],
    explanation:
      "Two steps chained: `git add .` stages everything, `git commit -m` records it. A new repository has no commits until you make the first.",
  },
  {
    id: "git-ws-before-merge",
    category: "git",
    level: "workflow",
    prompt:
      "Before merging `feature` into `main`, list the commits that are in `feature` but not yet in `main`.",
    answer: "git log main..feature",
    aliases: ["git log main..feature --oneline"],
    explanation:
      "The `a..b` range shows commits reachable from `b` but not from `a` — exactly what a merge would bring in.",
  },
  {
    id: "git-ws-restore-last",
    category: "git",
    level: "workflow",
    prompt:
      "You've made a mess of `main.py` and just want it back exactly as it was at the last commit.",
    answer: "git restore main.py",
    aliases: ["git checkout -- main.py"],
    explanation:
      "`git restore <file>` discards the working-tree changes to that file, restoring it from the index — `git checkout -- <file>` is the older spelling.",
  },
  {
    id: "git-ws-tag-push",
    category: "git",
    level: "workflow",
    prompt:
      "Cut a release: annotate the current commit as `v1.0.0` with a message, then push that tag to origin.",
    answer: "git tag -a v1.0.0 -m \"release v1.0.0\" && git push origin v1.0.0",
    aliases: ["git tag -a v1.0.0 -m 'release v1.0.0' && git push origin v1.0.0"],
    explanation:
      "Annotated tags (`-a`) carry a message and a date. Plain `git push` doesn't send tags — you name the tag explicitly.",
  },
];

export const shellWorkflowQuestions: QuizQuestion[] = [
  {
    id: "shell-ws-find-todos",
    category: "shell",
    level: "workflow",
    prompt: "Count how many `TODO` comments exist under the `src` directory.",
    answer: "grep -rn TODO src | wc -l",
    explanation:
      "`grep -rn` lists every match with its file and line; piping into `wc -l` counts the lines — two small tools, one answer.",
  },
  {
    id: "shell-ws-watch-errors",
    category: "shell",
    level: "workflow",
    prompt: "Watch `app.log` live, printing only the lines that contain `ERROR`.",
    answer: "tail -f app.log | grep ERROR",
    explanation:
      "`tail -f` streams new lines as they're appended and `grep` filters them — the classic live log-alert pipeline.",
  },
  {
    id: "shell-ws-biggest-files",
    category: "shell",
    level: "workflow",
    prompt: "Find the 5 largest items in the current directory, biggest first.",
    answer: "ls -S | head -5",
    aliases: ["du -sh * | sort -hr | head -5"],
    explanation:
      "`ls -S` sorts by size descending and `head -5` keeps the top five. For directories, `du -sh * | sort -hr` digs deeper.",
  },
  {
    id: "shell-ws-sync-dirs",
    category: "shell",
    level: "workflow",
    prompt:
      "Mirror the `public/` folder into `backup/` so the copy matches exactly — deleting anything no longer in the source.",
    answer: "rsync -av --delete public/ backup/",
    explanation:
      "`rsync -a` preserves everything, `-v` shows progress, and `--delete` removes files in the target that vanished from the source.",
  },
  {
    id: "shell-ws-disk-alert",
    category: "shell",
    level: "workflow",
    prompt:
      "Disk is almost full. List the subdirectories of the current folder sorted by size, biggest first.",
    answer: "du -sh */ | sort -hr",
    explanation:
      "`du -sh */` sizes each subdirectory once and `sort -hr` orders them by human-readable size descending — find the hog in one line.",
  },
];

export const dockerWorkflowQuestions: QuizQuestion[] = [
  {
    id: "docker-ws-dev-db",
    category: "docker",
    level: "workflow",
    prompt:
      "Spin up a disposable PostgreSQL for local development, mapped to port 5432, that removes itself when it exits.",
    answer: "docker run --rm -p 5432:5432 postgres",
    explanation:
      "`--rm` deletes the container on exit (no cleanup chores) and `-p` publishes the port — the standard throwaway-service combo.",
  },
  {
    id: "docker-ws-run-and-exec",
    category: "docker",
    level: "workflow",
    prompt:
      "Start an interactive Ubuntu container with your current directory mounted at `/app` so you can work on the code inside.",
    answer: "docker run -it -v $(pwd):/app ubuntu bash",
    aliases: ["docker run -it -v $PWD:/app ubuntu bash", "docker run -it -v .:/app ubuntu bash"],
    explanation:
      "`-v` mounts a host directory into the container; `$(pwd)` expands to your current path. Edit on the host, run inside the container.",
  },
  {
    id: "docker-ws-oneoff",
    category: "docker",
    level: "workflow",
    prompt:
      "Check the Node version in a node:20 image with a one-off command, then let the container clean itself up.",
    answer: "docker run --rm node:20 node -v",
    explanation:
      "A command after the image name overrides the image's default, and `--rm` removes the container as soon as it finishes.",
  },
  {
    id: "docker-ws-compose-dev",
    category: "docker",
    level: "workflow",
    prompt:
      "Rebuild the images for your compose stack, then start the whole stack in the background in one command.",
    answer: "docker compose up -d --build",
    explanation:
      "`docker compose up -d --build` builds any stale images and starts every service detached — the standard dev-loop command.",
  },
];

export const regexWorkflowQuestions: QuizQuestion[] = [
  {
    id: "regex-ws-phone",
    category: "regex",
    level: "workflow",
    prompt: "Match a US phone number like `555-123-4567`.",
    answer: "\\d{3}-\\d{3}-\\d{4}",
    explanation:
      "Three digits, a dash, three digits, a dash, four digits — `\\d{3}` is the exact-count shorthand.",
  },
  {
    id: "regex-ws-slug",
    category: "regex",
    level: "workflow",
    prompt:
      "Match a URL slug like `my-awesome-post` (lowercase words joined by single hyphens).",
    answer: "[a-z0-9]+(-[a-z0-9]+)*",
    aliases: ["[a-z]+(-[a-z]+)*"],
    explanation:
      "The `(...)*` group allows zero or more hyphenated words — the standard slug shape.",
  },
  {
    id: "regex-ws-log-timestamp",
    category: "regex",
    level: "workflow",
    prompt: "Match the timestamp at the start of a log line like `2026-08-07 09:41:22`.",
    answer: "^\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}",
    aliases: ["\\d{4}-\\d{2}-\\d{2} \\d{2}:\\d{2}:\\d{2}"],
    explanation:
      "Anchoring with `^` pins the pattern to the line start — great for filtering logs by exact time format.",
  },
  {
    id: "regex-ws-comments",
    category: "regex",
    level: "workflow",
    prompt: "Match a `//` style comment and everything after it on the line.",
    answer: "//.*$",
    aliases: ["\\/\\/.*$"],
    explanation:
      "`//` matches the comment marker literally, `.*` any characters, `$` the line end. Escape the slashes only when your tool's delimiters clash.",
  },
];

export const sshWorkflowQuestions: QuizQuestion[] = [
  {
    id: "ssh-ws-db-tunnel",
    category: "ssh",
    level: "workflow",
    prompt:
      "Your dev database is only reachable from `example.com`. Tunnel your local port `5432` to the DB so local tools work.",
    answer: "ssh -L 5432:localhost:5432 alice@example.com",
    aliases: ["ssh -L 5432:localhost:5432 example.com"],
    explanation:
      "`-L local:host:remote` forwards your local port through the SSH connection to the target. Keep the session open to keep the tunnel up.",
  },
  {
    id: "ssh-ws-backup-remote",
    category: "ssh",
    level: "workflow",
    prompt:
      "Back up the remote directory `/var/www` on `example.com` to a local folder using rsync over SSH.",
    answer: "rsync -avz alice@example.com:/var/www/ ./www-backup/",
    explanation:
      "rsync uses SSH by default: `-a` archives, `-z` compresses, and the trailing slashes matter for correct nesting.",
  },
  {
    id: "ssh-ws-keys-in-order",
    category: "ssh",
    level: "workflow",
    prompt:
      "Set up passwordless login to `example.com` from scratch: generate a key, then install it on the server, in one flow.",
    answer: "ssh-keygen -t ed25519 && ssh-copy-id alice@example.com",
    explanation:
      "Generate a key (accept the defaults), then `ssh-copy-id` appends your public key to the server's `authorized_keys` — the whole setup in two commands.",
  },
];

export const kubernetesWorkflowQuestions: QuizQuestion[] = [
  {
    id: "k8s-ws-scale-night",
    category: "kubernetes",
    level: "workflow",
    prompt: "Scale the `web` deployment down to zero replicas overnight to save cluster resources.",
    answer: "kubectl scale deployment web --replicas=0",
    explanation:
      "Zero replicas keeps the Deployment (and its config) intact while no pods run — scale back up in the morning.",
  },
  {
    id: "k8s-ws-apply-watch",
    category: "kubernetes",
    level: "workflow",
    prompt:
      "Deploy the new version defined in `deploy.yaml`, then wait until the rollout of `web` finishes.",
    answer: "kubectl apply -f deploy.yaml && kubectl rollout status deployment/web",
    explanation:
      "`apply` declares the desired state; `rollout status` blocks until the Deployment's rollout completes — chain them for deploy-and-wait.",
  },
  {
    id: "k8s-ws-access-service",
    category: "kubernetes",
    level: "workflow",
    prompt:
      "Reach the `web` Service locally for debugging by forwarding your port `8080` to its port `80`.",
    answer: "kubectl port-forward svc/web 8080:80",
    explanation:
      "`port-forward` works on Services too — `svc/web` resolves to a backing pod automatically, then open http://localhost:8080.",
  },
  {
    id: "k8s-ws-label-selector",
    category: "kubernetes",
    level: "workflow",
    prompt: "List only the pods carrying the label `env=prod` in the current namespace.",
    answer: "kubectl get pods -l env=prod",
    explanation:
      "`-l` filters resources by label without extra tools — and you can chain selectors: `kubectl get pods -l app=web,tier=frontend`.",
  },
];

/** Every workflow question, keyed the same way `questionSets` is keyed. */
export const workflowQuestionSets: Record<Category, QuizQuestion[]> = {
  vim: vimWorkflowQuestions,
  tmux: tmuxWorkflowQuestions,
  shell: shellWorkflowQuestions,
  git: gitWorkflowQuestions,
  docker: dockerWorkflowQuestions,
  regex: regexWorkflowQuestions,
  ssh: sshWorkflowQuestions,
  kubernetes: kubernetesWorkflowQuestions,
};
