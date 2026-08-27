/**
 * Git guides — structured walkthroughs that teach concepts with
 * explanations, examples, and inline exercises.
 */

export { type GuideExercise, type GuideSubsection, type GuideSection } from "./sshGuides";

import type { GuideSection } from "./sshGuides";

export const gitGuides: GuideSection[] = [
  {
    id: "git-fundamentals",
    title: "Git Fundamentals",
    tagline: "init, add, commit, status, and log",
    description:
      "The absolute essentials — initializing a repo, staging files, committing snapshots, and reading history. These are the commands you'll use every single day.",
    subsections: [
      {
        title: "Initializing a repository",
        text: [
          "`git init` creates a new Git repository in the current directory. It creates a `.git/` folder that holds all of Git's metadata:",
          "You can also clone an existing repository with `git clone`, which copies the full history and sets up remote tracking automatically.",
        ],
        codeBlocks: [
          { label: "Create a new repo", code: "git init" },
          { label: "Clone an existing repo", code: "git clone https://github.com/user/repo.git" },
          { label: "Clone into a specific directory", code: "git clone https://github.com/user/repo.git my-project" },
        ],
        exercises: [
          {
            prompt: "Initialize a new Git repository in the current directory.",
            answer: "git init",
            explanation:
              "`git init` creates a `.git/` directory that tracks all history and configuration.",
          },
          {
            prompt: "Clone the repo at `https://github.com/acme/backend.git`.",
            answer: "git clone https://github.com/acme/backend.git",
            explanation:
              "`git clone` copies the full history and sets up `origin` as the default remote.",
          },
        ],
      },
      {
        title: "Staging and committing",
        text: [
          "Git has three areas: working directory, staging area (index), and repository. You stage changes before committing them:",
          "`git add` moves changes to the staging area. `git commit` creates a permanent snapshot of staged changes.",
          "Write clear commit messages: a short summary line (50 chars max), a blank line, then details if needed.",
        ],
        codeBlocks: [
          { label: "Stage a specific file", code: "git add README.md" },
          { label: "Stage all changes", code: "git add ." },
          { label: "Commit with a message", code: 'git commit -m "Add README with project description"' },
          { label: "Stage and commit in one step", code: 'git commit -am "Fix login redirect bug"' },
        ],
        exercises: [
          {
            prompt: "Stage all changes in the current directory.",
            answer: "git add .",
            aliases: ["git add -A", "git add --all"],
            explanation:
              "`git add .` stages all modified and new files in the current directory and below.",
          },
          {
            prompt: "Commit the staged changes with the message \"Initial commit\".",
            answer: 'git commit -m "Initial commit"',
            explanation:
              "`-m` passes the message directly on the command line.",
          },
        ],
      },
      {
        title: "Checking status and history",
        text: [
          "`git status` shows which files are staged, modified, or untracked. It's the command you'll run most often:",
          "`git log` shows commit history. Use flags to control format and scope.",
        ],
        codeBlocks: [
          { label: "Current status", code: "git status" },
          { label: "Short status (compact)", code: "git status -s" },
          { label: "Full log", code: "git log" },
          { label: "One-line log", code: "git log --oneline" },
          { label: "Graph with branches", code: "git log --oneline --graph --all" },
          { label: "Last 5 commits", code: "git log -5" },
        ],
        exercises: [
          {
            prompt: "Show the current status of the working tree.",
            answer: "git status",
            explanation:
              "`git status` lists staged, modified, and untracked files.",
          },
          {
            prompt: "Show a compact one-line log of the last 10 commits.",
            answer: "git log --oneline -10",
            explanation:
              "`--oneline` shows commit hash and message on one line; `-10` limits to 10 entries.",
          },
        ],
      },
      {
        title: "Inspecting changes",
        text: [
          "`git diff` shows what changed in your working directory. Without arguments it compares working tree to staging; with `--staged` it compares staging to the last commit.",
        ],
        codeBlocks: [
          { label: "Unstaged changes", code: "git diff" },
          { label: "Staged changes", code: "git diff --staged" },
          { label: "Changes for a specific file", code: "git diff src/app.ts" },
          { label: "Changes since a specific commit", code: "git diff abc1234" },
        ],
        exercises: [
          {
            prompt: "Show the diff of staged changes only.",
            answer: "git diff --staged",
            aliases: ["git diff --cached"],
            explanation:
              "`--staged` (or `--cached`) shows the diff between the index and the last commit.",
          },
        ],
      },
    ],
  },
  {
    id: "git-branching",
    title: "Branching & Merging",
    tagline: "creating, switching, merging, and rebasing branches",
    description:
      "Branches let you work on features in isolation and merge them back. Git's branching model is fast and lightweight — use it fearlessly.",
    subsections: [
      {
        title: "Creating and switching branches",
        text: [
          "`git branch` lists branches. The currently checked-out branch is marked with `*`.",
          "`git checkout` switches branches. Use `-b` to create and switch in one step. Modern Git also has `switch` and `restore` as clearer alternatives.",
        ],
        codeBlocks: [
          { label: "List all branches", code: "git branch -a" },
          { label: "Create a new branch", code: "git branch feature/login" },
          { label: "Switch to a branch", code: "git checkout feature/login" },
          { label: "Create and switch in one step", code: "git checkout -b feature/login" },
          { label: "Modern alternative (Git 2.23+)", code: "git switch -c feature/login" },
        ],
        exercises: [
          {
            prompt: "Create a new branch called `feature/auth` and switch to it.",
            answer: "git checkout -b feature/auth",
            aliases: [
              "git checkout -B feature/auth",
              "git switch -c feature/auth",
              "git branch feature/auth && git checkout feature/auth",
              "git branch feature/auth && git switch feature/auth",
            ],
            explanation:
              "`checkout -b` creates the branch and switches to it in one step.",
          },
        ],
      },
      {
        title: "Merging branches",
        text: [
          "`git merge` combines the history of two branches. If both branches changed the same lines, Git marks conflicts for you to resolve:",
          "After merging, you can delete the feature branch if it's no longer needed.",
        ],
        codeBlocks: [
          { label: "Switch to target branch", code: "git checkout main" },
          { label: "Merge a feature branch into main", code: "git merge feature/auth" },
          { label: "Delete the merged branch", code: "git branch -d feature/auth" },
        ],
        exercises: [
          {
            prompt: "Merge branch `feature/auth` into `main`.",
            answer: "git merge feature/auth",
            explanation:
              "`git merge` creates a merge commit (or fast-forwards) to bring changes together.",
          },
        ],
      },
      {
        title: "Rebasing instead of merging",
        text: [
          "`git rebase` replays your commits on top of another branch, creating a linear history. Unlike merging, it doesn't create merge commits:",
          "Golden rule: never rebase commits that have been pushed to a shared branch — it rewrites history and will confuse collaborators.",
          "`git pull --rebase` is a common default that rebases local commits on top of fetched changes instead of merging them.",
        ],
        codeBlocks: [
          { label: "Rebase current branch onto main", code: "git rebase main" },
          { label: "Interactive rebase (squash, reorder, edit)", code: "git rebase -i HEAD~5" },
          { label: "Abort a messy rebase", code: "git rebase --abort" },
        ],
        exercises: [
          {
            prompt: "Rebase your current feature branch onto `main`.",
            answer: "git rebase main",
            explanation:
              "`git rebase main` replays your branch's commits on top of main for a clean linear history.",
          },
          {
            prompt: "Start an interactive rebase for the last 3 commits.",
            answer: "git rebase -i HEAD~3",
            explanation:
              "Interactive rebase opens an editor to squash, reorder, or edit individual commits.",
          },
        ],
      },
      {
        title: "Resolving merge conflicts",
        text: [
          "When both branches modified the same lines, Git marks conflicts with `<<<<<<<`, `=======`, and `>>>>>>>`. You edit the file, pick the right version, and stage it:",
          "After resolving all conflicts, `git rebase --continue` (or `git merge --continue`) completes the operation.",
        ],
        codeBlocks: [
          { label: "See which files have conflicts", code: "git status" },
          { label: "After fixing conflicts, stage them", code: "git add <fixed-file>" },
          { label: "Continue the merge", code: "git merge --continue" },
          { label: "Continue a rebase", code: "git rebase --continue" },
          { label: "Abandon the merge entirely", code: "git merge --abort" },
        ],
        exercises: [
          {
            prompt: "Continue a merge after resolving all conflicts.",
            answer: "git merge --continue",
            aliases: ["git merge --continue", "git commit"],
            explanation:
              "After staging fixed files, `git merge --continue` finishes the merge commit.",
          },
        ],
      },
    ],
  },
  {
    id: "git-undoing",
    title: "Stashing & Undoing",
    tagline: "stash, reset, revert, and reflog",
    description:
      "Everyone makes mistakes. Git gives you powerful tools to undo changes — stashing temporary work, resetting history, and recovering lost commits with reflog.",
    subsections: [
      {
        title: "Stashing changes",
        text: [
          "`git stash` temporarily shelves your uncommitted changes so you can switch branches or pull changes cleanly:",
          "Stashes are stored on a stack — you can apply or pop them later.",
        ],
        codeBlocks: [
          { label: "Stash all changes", code: "git stash" },
          { label: "Stash with a message", code: 'git stash push -m "WIP: login form"' },
          { label: "List all stashes", code: "git stash list" },
          { label: "Pop most recent stash", code: "git stash pop" },
          { label: "Apply without removing from stash", code: "git stash apply" },
          { label: "Drop a specific stash", code: "git stash drop stash@{0}" },
        ],
        exercises: [
          {
            prompt: "Stash all current changes with a description.",
            answer: 'git stash push -m "WIP: half-done feature"',
            aliases: [
              'git stash -m "WIP: half-done feature"',
              "git stash",
              "git stash push",
            ],
            explanation:
              "`git stash` saves your changes; `-m` adds a description so you remember what it was.",
          },
          {
            prompt: "Pop the most recent stash off the stack.",
            answer: "git stash pop",
            aliases: ["git stash pop stash@{0}"],
            explanation:
              "`pop` applies the stash and removes it from the stack.",
          },
        ],
      },
      {
        title: "Undoing with reset",
        text: [
          "`git reset` moves the current branch pointer (and optionally the index and working tree) to a different commit. There are three modes:",
          "`--soft` keeps staging and working tree intact (just uncommits). `--mixed` (default) unstages but keeps working tree. `--hard` throws everything away — use with caution!",
        ],
        codeBlocks: [
          { label: "Undo last commit, keep changes staged", code: "git reset --soft HEAD~1" },
          { label: "Undo last commit, keep changes unstaged", code: "git reset HEAD~1" },
          { label: "Undo last commit, discard all changes", code: "git reset --hard HEAD~1" },
          { label: "Reset a specific file to the last commit", code: "git reset HEAD -- src/app.ts" },
        ],
        exercises: [
          {
            prompt: "Undo the last commit but keep the changes in the staging area.",
            answer: "git reset --soft HEAD~1",
            aliases: ["git reset --soft HEAD^"],
            explanation:
              "`--soft` moves the branch back one commit while keeping everything staged.",
          },
          {
            prompt: "Completely discard all uncommitted changes in the working tree.",
            answer: "git checkout -- .",
            aliases: ["git checkout -- .", "git restore ."],
            explanation:
              "`git checkout -- .` (or `git restore .`) throws away all working tree changes.",
          },
        ],
      },
      {
        title: "Undoing with revert",
        text: [
          "`git revert` creates a new commit that undoes a previous commit. Unlike `reset`, it doesn't rewrite history — safe for shared branches:",
        ],
        codeBlocks: [
          { label: "Revert a specific commit", code: "git revert abc1234" },
          { label: "Revert the last commit", code: "git revert HEAD" },
          { label: "Revert without auto-committing", code: "git revert --no-commit abc1234" },
        ],
        exercises: [
          {
            prompt: "Revert commit `abc1234` without changing history.",
            answer: "git revert abc1234",
            explanation:
              "`git revert` creates a new commit that mirrors the changes of `abc1234` in reverse.",
          },
        ],
      },
      {
        title: "Recovering with reflog",
        text: [
          "Git keeps a log of every ref change (commits, branch moves, resets) in `reflog`. Even `reset --hard` is recoverable — nothing is truly lost until Git's garbage collector runs:",
        ],
        codeBlocks: [
          { label: "Show reflog", code: "git reflog" },
          { label: "Recover a lost branch or commit", code: "git checkout HEAD@{2}" },
          { label: "Recover a deleted branch", code: "git branch lost-branch HEAD@{5}" },
        ],
        exercises: [
          {
            prompt: "Show the reflog to find a lost commit.",
            answer: "git reflog",
            explanation:
              "`reflog` records where HEAD and branches have been — even after destructive operations.",
          },
        ],
      },
    ],
  },
  {
    id: "git-remotes",
    title: "Remotes & Collaboration",
    tagline: "clone, fetch, pull, push, and pull requests",
    description:
      "Working with others means pushing code to and pulling from shared repositories. Understanding remotes, fetch, pull, and push is essential for any team workflow.",
    subsections: [
      {
        title: "Adding remotes",
        text: [
          "`origin` is the default remote name created by `git clone`. You can add more remotes for forks or upstream repos:",
        ],
        codeBlocks: [
          { label: "List remotes", code: "git remote -v" },
          { label: "Add a remote", code: "git remote add upstream https://github.com/original/repo.git" },
          { label: "Remove a remote", code: "git remote remove upstream" },
          { label: "Rename a remote", code: "git remote rename origin github" },
        ],
        exercises: [
          {
            prompt: "Add the upstream remote at `https://github.com/original/project.git`.",
            answer: "git remote add upstream https://github.com/original/project.git",
            explanation:
              "`git remote add` registers a new remote name and its URL.",
          },
        ],
      },
      {
        title: "Fetching and pulling",
        text: [
          "`git fetch` downloads commits, refs, and objects from a remote without merging. `git pull` is fetch + merge in one step:",
          "Always `fetch` first if you want to inspect changes before merging them into your local branch.",
        ],
        codeBlocks: [
          { label: "Fetch from all remotes", code: "git fetch --all" },
          { label: "Fetch a specific remote", code: "git fetch origin" },
          { label: "Pull (fetch + merge)", code: "git pull origin main" },
          { label: "Pull with rebase", code: "git pull --rebase origin main" },
        ],
        exercises: [
          {
            prompt: "Fetch all changes from `origin` without merging.",
            answer: "git fetch origin",
            aliases: ["git fetch", "git fetch --all"],
            explanation:
              "`git fetch` downloads updates; use `git log origin/main` to inspect before merging.",
          },
          {
            prompt: "Pull changes from `origin/main` and rebase your local commits on top.",
            answer: "git pull --rebase origin main",
            aliases: [
              "git pull -r origin main",
              "git fetch origin main && git rebase origin/main",
            ],
            explanation:
              "`--rebase` replays your local commits on top of the fetched changes for a linear history.",
          },
        ],
      },
      {
        title: "Pushing changes",
        text: [
          "`git push` uploads your local commits to a remote. Use `--force-with-lease` instead of `--force` when rewriting history — it checks that nobody else pushed new commits you haven't seen:",
        ],
        codeBlocks: [
          { label: "Push current branch", code: "git push origin main" },
          { label: "Push and set upstream tracking", code: "git push -u origin feature/auth" },
          { label: "Force push safely", code: "git push --force-with-lease" },
          { label: "Delete a remote branch", code: "git push origin --delete old-branch" },
        ],
        exercises: [
          {
            prompt: "Push `feature/auth` to `origin` and set it as the upstream tracking branch.",
            answer: "git push -u origin feature/auth",
            aliases: [
              "git push --set-upstream origin feature/auth",
              "git push -u origin feature/auth",
            ],
            explanation:
              "`-u` sets the upstream so future `git push` and `git pull` work without arguments.",
          },
        ],
      },
      {
        title: "Tracking branches",
        text: [
          "A tracking branch is linked to a remote branch. When you pull or push, Git knows which remote branch to use:",
        ],
        codeBlocks: [
          { label: "Show tracking info", code: "git branch -vv" },
          { label: "Set upstream manually", code: "git branch --set-upstream-to=origin/main main" },
          { label: "See all remote branches", code: "git branch -r" },
        ],
        exercises: [
          {
            prompt: "Show which local branches are tracking which remote branches.",
            answer: "git branch -vv",
            explanation:
              "`-vv` shows the upstream branch for each local branch along with ahead/behind counts.",
          },
        ],
      },
    ],
  },
  {
    id: "git-ignore",
    title: ".gitignore & Cleanup",
    tagline: "ignoring files and cleaning up your repo",
    description:
      "Keep your repository clean by ignoring build artifacts, secrets, and dependencies. Git has powerful pattern matching and a few gotchas around already-tracked files.",
    subsections: [
      {
        title: "Writing .gitignore",
        text: [
          "A `.gitignore` file tells Git which files to ignore. Patterns use glob syntax — `*` matches anything, `/` anchors to the directory, `!` negates:",
          "Put `.gitignore` in your repo root. Global ignores can be set in `~/.gitignore` or with `git config --global core.excludesfile`.",
        ],
        codeBlocks: [
          {
            label: ".gitignore",
            code: `# Dependencies
node_modules/
vendor/

# Build output
dist/
build/
*.o

# Secrets
.env
.env.local
*.pem

# OS junk
.DS_Store
Thumbs.db

# Logs
*.log
logs/`,
          },
        ],
        exercises: [
          {
            prompt: "Add a global Gitignore file at `~/.gitignore_global`.",
            answer: "git config --global core.excludesfile ~/.gitignore_global",
            aliases: [
              "git config --global core.excludesfile ~/.gitignore_global",
            ],
            explanation:
              "Global ignores apply to all repos — useful for OS files like `.DS_Store`.",
          },
        ],
      },
      {
        title: "Untracking files that were already added",
        text: [
          "If you added a file before adding it to `.gitignore`, Git still tracks it. You need to explicitly untrack it:",
          "The `--cached` flag removes the file from the index (staging area) without deleting it from disk.",
        ],
        codeBlocks: [
          { label: "Stop tracking a file (keeps it on disk)", code: "git rm --cached .env" },
          { label: "Stop tracking a directory", code: "git rm -r --cached node_modules/" },
        ],
        exercises: [
          {
            prompt: "Stop tracking the `build/` directory but keep it on disk.",
            answer: "git rm -r --cached build/",
            explanation:
              "`--cached` removes from the index only; the files stay in your working tree.",
          },
        ],
      },
      {
        title: "Cleaning untracked files",
        text: [
          "`git clean` deletes untracked files that aren't ignored. Always use `-n` (dry run) first to preview what will be deleted:",
          "Once you're sure, remove `-n` to actually delete.",
        ],
        codeBlocks: [
          { label: "Dry run — see what would be deleted", code: "git clean -n" },
          { label: "Delete untracked files", code: "git clean -f" },
          { label: "Delete untracked files and directories", code: "git clean -fd" },
          { label: "Remove ignored files too (nuclear)", code: "git clean -fXd" },
        ],
        exercises: [
          {
            prompt: "Preview what untracked files would be deleted without actually deleting.",
            answer: "git clean -n",
            aliases: ["git clean --dry-run", "git clean -nd"],
            explanation:
              "`-n` is a dry run — it shows what would be deleted without touching anything.",
          },
        ],
      },
    ],
  },
  {
    id: "git-advanced",
    title: "Advanced Git",
    tagline: "cherry-pick, bisect, aliases, and worktrees",
    description:
      "Beyond the basics — selectively applying commits, binary-searching for bugs, working on multiple branches simultaneously, and setting up power-user shortcuts.",
    subsections: [
      {
        title: "Cherry-pick",
        text: [
          "`git cherry-pick` applies a specific commit from one branch to another — useful when you need a bugfix on a release branch without merging the entire feature:",
        ],
        codeBlocks: [
          { label: "Apply a single commit", code: "git cherry-pick abc1234" },
          { label: "Apply multiple commits", code: "git cherry-pick abc1234 def5678" },
          { label: "Apply without committing", code: "git cherry-pick --no-commit abc1234" },
        ],
        exercises: [
          {
            prompt: "Apply commit `abc1234` to the current branch.",
            answer: "git cherry-pick abc1234",
            explanation:
              "`git cherry-pick` applies the exact changes from a specific commit as a new commit.",
          },
        ],
      },
      {
        title: "Bisect",
        text: [
          "`git bisect` binary-searches through commit history to find which commit introduced a bug. You mark commits as good or bad and Git narrows the range:",
          "Bisect automatically checks out the midpoint — you test and mark each one until Git finds the culprit.",
        ],
        codeBlocks: [
          { label: "Start bisect with a known good and bad commit", code: "git bisect start" },
          { label: "Mark current commit as bad", code: "git bisect bad" },
          { label: "Mark a commit as good", code: "git bisect good v1.0" },
          { label: "End bisect and return to original branch", code: "git bisect reset" },
        ],
        exercises: [
          {
            prompt: "Start a bisect session to find a bug, marking the current commit as bad and `v1.2` as good.",
            answer: "git bisect start && git bisect bad && git bisect good v1.2",
            aliases: [
              "git bisect start",
              "git bisect bad",
              "git bisect good v1.2",
            ],
            explanation:
              "Bisect needs a good and bad boundary — it then binary-searches between them.",
          },
        ],
      },
      {
        title: "Git aliases",
        text: [
          "Aliases save keystrokes and create powerful shortcuts. Define them with `git config` or directly in `~/.gitconfig`:",
        ],
        codeBlocks: [
          {
            label: "Useful aliases",
            code: `git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.last 'log -1 HEAD'
git config --global alias.lg 'log --oneline --graph --all'`,
          },
        ],
        exercises: [
          {
            prompt: "Create a global alias `lg` that shows a compact graph log.",
            answer: "git config --global alias.lg 'log --oneline --graph --all'",
            explanation:
              "Aliases are defined like commands — `git lg` will now run the full log command.",
          },
        ],
      },
      {
        title: "Git worktrees",
        text: [
          "`git worktree` lets you check out multiple branches simultaneously in separate directories — no stashing or context-switching needed:",
          "This is perfect for working on a hotfix while your main feature branch is in progress.",
        ],
        codeBlocks: [
          { label: "Add a worktree for a new branch", code: "git worktree add ../hotfix hotfix/bug" },
          { label: "Add a worktree for an existing branch", code: "git worktree add ../release release/v2" },
          { label: "List worktrees", code: "git worktree list" },
          { label: "Remove a worktree", code: "git worktree remove ../hotfix" },
        ],
        exercises: [
          {
            prompt: "Create a worktree at `../hotfix` for the branch `hotfix/bug`.",
            answer: "git worktree add ../hotfix hotfix/bug",
            explanation:
              "`worktree add` checks out a branch in a new directory — you can work in both at once.",
          },
        ],
      },
    ],
  },
];
