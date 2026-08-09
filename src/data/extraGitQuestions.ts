import type { QuizQuestion } from "./questions";

/**
 * Additional git questions — top up the dataset past 200 total.
 * Level: pareto = everyday muscle memory, core = standard knowledge,
 * workflow = multi-step scenarios.
 */
export const gitExtraQuestions: QuizQuestion[] = [
  {
    id: "git-rm-untracked-check",
    category: "git",
    level: "core",
    prompt: "See which files are untracked before deciding what to add.",
    answer: "git status",
    explanation:
      "`git status` shows untracked, modified, and staged files — the first command to run in a dirty repo.",
  },
  {
    id: "git-branch-create-checkout",
    category: "git",
    level: "core",
    prompt: "Create a new branch 'feature' and switch to it in one step.",
    answer: "git checkout -b feature",
    explanation:
      "`git checkout -b feature` (or `git switch -c feature`) creates and checks out at once.",
  },
  {
    id: "git-branch-list-all",
    category: "git",
    level: "core",
    prompt: "List all branches including remote-tracking ones.",
    answer: "git branch -a",
    explanation:
      "`git branch -a` shows local and remote branches. `-v` adds the last commit to each.",
  },
  {
    id: "git-delete-branch",
    category: "git",
    level: "core",
    prompt: "Delete the local branch 'old-feature'.",
    answer: "git branch -d old-feature",
    explanation:
      "`-d` refuses if the branch is unmerged; `-D` forces deletion regardless.",
  },
  {
    id: "git-delete-remote-branch",
    category: "git",
    level: "core",
    prompt: "Delete the 'old-feature' branch on the origin remote.",
    answer: "git push origin --delete old-feature",
    explanation:
      "`git push origin --delete branch` removes the remote branch (also written `:old-feature`).",
  },
  {
    id: "git-log-one-line",
    category: "git",
    level: "core",
    prompt: "Show the last 10 commits as one line each.",
    answer: "git log --oneline -10",
    explanation:
      "`--oneline` compresses each commit to one line; `-10` limits the count.",
  },
  {
    id: "git-log-graph-1",
    category: "git",
    level: "core",
    prompt: "Show the commit history with branch structure drawn as a graph.",
    answer: "git log --graph --oneline --all",
    explanation:
      "`--graph` draws the topology; `--all` includes every branch and remote ref.",
  },
  {
    id: "git-log-author-1",
    category: "git",
    level: "core",
    prompt: "Show commits authored by alice in the last 2 weeks.",
    answer: "git log --author=alice --since='2 weeks ago'",
    explanation:
      "`--author` filters by author; `--since`/`--until` filter by date.",
  },
  {
    id: "git-show-commit-1",
    category: "git",
    level: "core",
    prompt: "Show the full diff and metadata of commit abc123.",
    answer: "git show abc123",
    explanation:
      "`git show` displays a commit's message and patch. Add `--stat` for a summary.",
  },
  {
    id: "git-diff-staged-1",
    category: "git",
    level: "core",
    prompt: "Show what is staged and ready to be committed.",
    answer: "git diff --cached",
    explanation:
      "`git diff --cached` (or `--staged`) compares the index to HEAD.",
  },
  {
    id: "git-diff-working",
    category: "git",
    level: "core",
    prompt: "Show unstaged changes in the working tree.",
    answer: "git diff",
    explanation:
      "`git diff` compares the working tree to the index (staged) state.",
  },
  {
    id: "git-diff-branches-1",
    category: "git",
    level: "core",
    prompt: "Compare main with feature and show what differs.",
    answer: "git diff main feature",
    explanation:
      "`git diff a b` shows changes from a to b. `git diff main...feature` compares merge-base to feature.",
  },
  {
    id: "git-diff-words",
    category: "git",
    level: "core",
    prompt: "Show word-level (not line-level) changes in a file.",
    answer: "git diff --word-diff",
    explanation:
      "`--word-diff` highlights changed words inside lines instead of whole lines.",
  },
  {
    id: "git-restore-file-1",
    category: "git",
    level: "core",
    prompt: "Discard unstaged changes in file.txt, restoring it to the index.",
    answer: "git restore file.txt",
    explanation:
      "`git restore file.txt` resets the working tree from the index. Add `--staged` to unstage.",
  },
  {
    id: "git-unstage",
    category: "git",
    level: "core",
    prompt: "Unstage file.txt so it's modified but not staged.",
    answer: "git restore --staged file.txt",
    explanation:
      "`git restore --staged file.txt` (or `git reset HEAD file.txt`) moves it out of the index.",
  },
  {
    id: "git-reset-soft-1",
    category: "git",
    level: "core",
    prompt: "Undo the last commit but keep the changes staged.",
    answer: "git reset --soft HEAD~1",
    explanation:
      "`--soft` moves HEAD back but keeps the index — changes stay staged for a new commit.",
  },
  {
    id: "git-reset-mixed-1",
    category: "git",
    level: "core",
    prompt: "Undo the last commit, keeping the changes in the working tree (unstaged).",
    answer: "git reset HEAD~1",
    explanation:
      "The default (mixed) reset moves HEAD and un-stages the changes while leaving files intact.",
  },
  {
    id: "git-reset-hard-1",
    category: "git",
    level: "core",
    prompt: "Discard the last commit AND all its changes completely.",
    answer: "git reset --hard HEAD~1",
    explanation:
      "`--hard` drops the commit and the file changes — destructive; use `git reflog` to recover.",
  },
  {
    id: "git-revert-commit",
    category: "git",
    level: "core",
    prompt: "Create a new commit that undoes commit abc123 (keeping history).",
    answer: "git revert abc123",
    explanation:
      "`git revert` applies the inverse of a commit as a new commit — safe for shared history.",
  },
  {
    id: "git-cherry-pick-1",
    category: "git",
    level: "core",
    prompt: "Apply commit abc123 onto the current branch.",
    answer: "git cherry-pick abc123",
    explanation:
      "`cherry-pick` copies a commit from another branch onto HEAD.",
  },
  {
    id: "git-stash-push",
    category: "git",
    level: "core",
    prompt: "Temporarily shelve all uncommitted changes.",
    answer: "git stash",
    explanation:
      "`git stash` saves working-tree changes and cleans the tree; `git stash pop` restores them.",
  },
  {
    id: "git-stash-list-1",
    category: "git",
    level: "core",
    prompt: "List all saved stashes.",
    answer: "git stash list",
    explanation:
      "`git stash list` shows stash entries like `stash@{0}` with their messages.",
  },
  {
    id: "git-stash-pop-1",
    category: "git",
    level: "core",
    prompt: "Restore the most recent stash and remove it from the stash list.",
    answer: "git stash pop",
    explanation:
      "`pop` applies and drops the stash. `git stash apply` keeps it for reuse.",
  },
  {
    id: "git-stash-drop-1",
    category: "git",
    level: "core",
    prompt: "Delete stash@{1} without applying it.",
    answer: "git stash drop stash@{1}",
    explanation:
      "`git stash drop` removes an entry; `git stash clear` empties them all.",
  },
  {
    id: "git-stash-branch",
    category: "git",
    level: "workflow",
    prompt: "Turn your latest stash into a new branch and apply it there.",
    answer: "git stash branch fix-issue stash@{0}",
    explanation:
      "`stash branch` creates the branch at the stash's original commit and applies the stash — avoids conflicts.",
  },
  {
    id: "git-tag-annotated-1",
    category: "git",
    level: "core",
    prompt: "Create an annotated tag v1.0.0 with a message.",
    answer: "git tag -a v1.0.0 -m 'release 1.0.0'",
    explanation:
      "`-a` makes an annotated tag with a message; lightweight tags are just `git tag v1.0.0`.",
  },
  {
    id: "git-tag-list",
    category: "git",
    level: "core",
    prompt: "List all tags in the repository.",
    answer: "git tag",
    explanation:
      "`git tag` lists tags; `git tag -l 'v1.*'` filters by pattern.",
  },
  {
    id: "git-push-tags-1",
    category: "git",
    level: "core",
    prompt: "Push all tags to the origin remote.",
    answer: "git push --tags",
    explanation:
      "`git push --tags` uploads tags. `git push origin v1.0.0` pushes one tag.",
  },
  {
    id: "git-remote-add-1",
    category: "git",
    level: "core",
    prompt: "Add a remote named 'upstream' pointing at a GitHub URL.",
    answer: "git remote add upstream https://github.com/user/repo.git",
    explanation:
      "`git remote add name url` registers a remote. `git remote -v` lists them.",
  },
  {
    id: "git-remote-remove-1",
    category: "git",
    level: "core",
    prompt: "Remove the remote named 'old-remote'.",
    answer: "git remote remove old-remote",
    explanation:
      "`git remote remove` (or `rm`) deletes the remote's configuration.",
  },
  {
    id: "git-fetch-prune-1",
    category: "git",
    level: "core",
    prompt: "Download remote changes and delete stale remote-tracking branches.",
    answer: "git fetch --prune",
    explanation:
      "`--prune` removes remote-tracking refs that no longer exist on the remote.",
  },
  {
    id: "git-pull-rebase-1",
    category: "git",
    level: "core",
    prompt: "Pull the remote branch and rebase your local commits on top.",
    answer: "git pull --rebase",
    explanation:
      "`--rebase` replays local commits onto the fetched head, keeping history linear.",
  },
  {
    id: "git-push-force-with-lease",
    category: "git",
    level: "core",
    prompt: "Force-push but only if the remote hasn't moved since your last fetch.",
    answer: "git push --force-with-lease",
    explanation:
      "`--force-with-lease` refuses if someone else pushed — safer than plain `--force`.",
  },
  {
    id: "git-blame-file",
    category: "git",
    level: "core",
    prompt: "Show which commit and author last touched each line of file.txt.",
    answer: "git blame file.txt",
    explanation:
      "`git blame` annotates lines with commit + author. `git log -L` traces line history instead.",
  },
  {
    id: "git-bisect-start-1",
    category: "git",
    level: "workflow",
    prompt: "Start a bisect session to find the commit that broke things.",
    answer: "git bisect start",
    explanation:
      "`git bisect start` begins the search; then mark `git bisect bad`/`good` to narrow it.",
  },
  {
    id: "git-bisect-bad-1",
    category: "git",
    level: "workflow",
    prompt: "Tell bisect the current commit is broken.",
    answer: "git bisect bad",
    explanation:
      "After marking bad/good, git checks out the midpoint so you can test it.",
  },
  {
    id: "git-bisect-good-1",
    category: "git",
    level: "workflow",
    prompt: "Tell bisect the current commit is known-good.",
    answer: "git bisect good",
    explanation:
      "Marking good/bad halves the search space each round until the culprit is found.",
  },
  {
    id: "git-bisect-reset",
    category: "git",
    level: "workflow",
    prompt: "End the bisect session and return to the original branch.",
    answer: "git bisect reset",
    explanation:
      "`git bisect reset` restores the branch you were on before starting.",
  },
  {
    id: "git-reflog-1",
    category: "git",
    level: "core",
    prompt: "Show the history of where HEAD has been (to recover lost commits).",
    answer: "git reflog",
    explanation:
      "`git reflog` records HEAD movements — the way back from a bad reset.",
  },
  {
    id: "git-clean-dry-1",
    category: "git",
    level: "core",
    prompt: "Preview which untracked files would be deleted by git clean.",
    answer: "git clean -n",
    explanation:
      "`-n` (dry run) lists files without deleting. `git clean -f` actually removes them.",
  },
  {
    id: "git-clean-untracked",
    category: "git",
    level: "core",
    prompt: "Delete all untracked files and directories.",
    answer: "git clean -fd",
    explanation:
      "`-f` forces deletion, `-d` includes directories. Respects .gitignore.",
  },
  {
    id: "git-config-list-1",
    category: "git",
    level: "core",
    prompt: "Show all git configuration values.",
    answer: "git config --list",
    explanation:
      "`git config --list` prints effective config; `--show-origin` shows where each value lives.",
  },
  {
    id: "git-config-global-user",
    category: "git",
    level: "core",
    prompt: "Set your global git email address.",
    answer: "git config --global user.email you@example.com",
    explanation:
      "`--global` writes to ~/.gitconfig; `--local` scopes to the current repo.",
  },
  {
    id: "git-config-alias",
    category: "git",
    level: "workflow",
    prompt: "Create an alias 'co' for 'checkout'.",
    answer: "git config --global alias.co checkout",
    explanation:
      "`alias.co checkout` makes `git co` run checkout. Aliases live in [alias] config.",
  },
  {
    id: "git-alias-unstage",
    category: "git",
    level: "workflow",
    prompt: "Add a 'git unstage' alias that runs 'git restore --staged .'.",
    answer: "git config --global alias.unstage 'restore --staged .'",
    explanation:
      "Aliases can take arguments — the quoted string runs with anything after `git unstage`.",
  },
  {
    id: "git-ignore-file",
    category: "git",
    level: "workflow",
    prompt: "Add 'node_modules/' to .gitignore so git stops suggesting it.",
    answer: "echo 'node_modules/' >> .gitignore",
    explanation:
      "Appending to .gitignore excludes the path. Already-tracked files need `git rm --cached` too.",
  },
  {
    id: "git-check-ignore",
    category: "git",
    level: "workflow",
    prompt: "Check why secret.env is not showing as untracked.",
    answer: "git check-ignore -v secret.env",
    explanation:
      "`git check-ignore -v` reports which ignore rule matched the file.",
  },
  {
    id: "git-rm-cached-1",
    category: "git",
    level: "workflow",
    prompt: "Stop tracking secrets.env but keep the file on disk.",
    answer: "git rm --cached secrets.env",
    explanation:
      "`--cached` removes from the index only; the working file stays. Commit after adding to .gitignore.",
  },
  {
    id: "git-submodule-add-1",
    category: "git",
    level: "core",
    prompt: "Add a GitHub repo as a submodule under vendor/lib.",
    answer: "git submodule add https://github.com/user/lib vendor/lib",
    explanation:
      "`git submodule add url path` pins an external repo inside yours.",
  },
  {
    id: "git-submodule-update-1",
    category: "git",
    level: "core",
    prompt: "Initialize and fetch all submodules after a fresh clone.",
    answer: "git submodule update --init --recursive",
    explanation:
      "`--init` sets up submodule configs; `--recursive` handles nested submodules.",
  },
  {
    id: "git-worktree-add",
    category: "git",
    level: "workflow",
    prompt: "Check out branch 'hotfix' into a separate directory ../hotfix-wt.",
    answer: "git worktree add ../hotfix-wt hotfix",
    explanation:
      "Worktrees let you have multiple checkouts of the same repo simultaneously.",
  },
  {
    id: "git-worktree-list",
    category: "git",
    level: "core",
    prompt: "List all worktrees attached to this repository.",
    answer: "git worktree list",
    explanation:
      "`git worktree list` shows each checkout and its branch.",
  },
  {
    id: "git-archive-zip",
    category: "git",
    level: "workflow",
    prompt: "Create a zip of the current tree for distribution.",
    answer: "git archive -o project.zip HEAD",
    explanation:
      "`git archive` exports a clean snapshot of a commit — no .git, no untracked junk.",
  },
  {
    id: "git-grep-search",
    category: "git",
    level: "core",
    prompt: "Search for 'TODO' in the tracked files of the repository.",
    answer: "git grep TODO",
    explanation:
      "`git grep` searches tracked content (faster and more precise than raw grep in a repo).",
  },
  {
    id: "git-log-grep-message",
    category: "git",
    level: "core",
    prompt: "Find commits whose message mentions 'fix crash'.",
    answer: "git log --grep='fix crash'",
    explanation:
      "`--grep` filters commit messages; `-i` makes it case-insensitive.",
  },
  {
    id: "git-log-file",
    category: "git",
    level: "core",
    prompt: "Show the commit history of just file.txt.",
    answer: "git log -- file.txt",
    explanation:
      "Limiting with `-- path` shows only commits that touched the file.",
  },
  {
    id: "git-log-patch",
    category: "git",
    level: "core",
    prompt: "Show each commit with its full diff in the log.",
    answer: "git log -p",
    explanation:
      "`-p` includes patches. `-2 -p` limits to the last two commits.",
  },
  {
    id: "git-shortlog-1",
    category: "git",
    level: "core",
    prompt: "Show a summary of commits grouped by author.",
    answer: "git shortlog -sn",
    explanation:
      "`-s` summarizes to counts, `-n` sorts by number of commits — a quick contributor report.",
  },
  {
    id: "git-count-commits",
    category: "git",
    level: "core",
    prompt: "Count the total number of commits in the repository.",
    answer: "git rev-list --count HEAD",
    explanation:
      "`rev-list --count` prints the commit count; `--all` counts every branch.",
  },
  {
    id: "git-commit-empty",
    category: "git",
    level: "workflow",
    prompt: "Create a commit with no file changes (e.g. to trigger CI).",
    answer: "git commit --allow-empty -m 'ci trigger'",
    explanation:
      "`--allow-empty` commits with an empty tree — handy for pipeline kicks.",
  },
  {
    id: "git-amend-noedit",
    category: "git",
    level: "core",
    prompt: "Add the staged changes to the last commit without editing its message.",
    answer: "git commit --amend --no-edit",
    explanation:
      "`--amend --no-edit` folds staged changes into HEAD, keeping the message.",
  },
  {
    id: "git-fixup-1",
    category: "git",
    level: "workflow",
    prompt: "Create a fixup commit for abc123 to squash later with rebase.",
    answer: "git commit --fixup=abc123",
    explanation:
      "`--fixup` marks the commit for `git rebase --autosquash -i`, which folds it in automatically.",
  },
  {
    id: "git-autosquash-1",
    category: "git",
    level: "workflow",
    prompt: "Rebase interactively, automatically folding fixup commits.",
    answer: "git rebase -i --autosquash",
    explanation:
      "`--autosquash` reorders fixup! commits next to their targets in the todo list.",
  },
  {
    id: "git-rebase-onto",
    category: "git",
    level: "workflow",
    prompt: "Rebase the current branch onto main.",
    answer: "git rebase main",
    explanation:
      "`git rebase main` replays local commits on top of main, giving a linear history.",
  },
  {
    id: "git-rebase-abort-1",
    category: "git",
    level: "workflow",
    prompt: "Abort a conflicted rebase and return to the pre-rebase state.",
    answer: "git rebase --abort",
    explanation:
      "`--abort` cancels the rebase entirely, restoring the original branch state.",
  },
  {
    id: "git-rebase-continue-1",
    category: "git",
    level: "workflow",
    prompt: "Continue a rebase after resolving the current conflict.",
    answer: "git rebase --continue",
    explanation:
      "After staging conflict resolutions, `--continue` proceeds to the next commit.",
  },
  {
    id: "git-merge-abort-1",
    category: "git",
    level: "workflow",
    prompt: "Cancel a merge that's in progress.",
    answer: "git merge --abort",
    explanation:
      "`--abort` stops the merge and restores the pre-merge state.",
  },
  {
    id: "git-merge-squash",
    category: "git",
    level: "workflow",
    prompt: "Merge feature into main as a single squashed commit.",
    answer: "git merge --squash feature",
    explanation:
      "`--squash` stages the combined diff without a merge commit; you create the final commit.",
  },
  {
    id: "git-merge-no-ff",
    category: "git",
    level: "workflow",
    prompt: "Merge feature keeping an explicit merge commit even if it could fast-forward.",
    answer: "git merge --no-ff feature",
    explanation:
      "`--no-ff` always records a merge commit, preserving the feature's history.",
  },
  {
    id: "git-branch-merged-1",
    category: "git",
    level: "core",
    prompt: "List branches already merged into the current branch.",
    answer: "git branch --merged",
    explanation:
      "`--merged` finds branches whose work is included — candidates for cleanup.",
  },
  {
    id: "git-branch-no-merged",
    category: "git",
    level: "core",
    prompt: "List branches that contain work not yet merged into HEAD.",
    answer: "git branch --no-merged",
    explanation:
      "`--no-merged` shows branches with unmerged commits — review before deleting.",
  },
  {
    id: "git-fetch-all",
    category: "git",
    level: "core",
    prompt: "Fetch from all configured remotes.",
    answer: "git fetch --all",
    explanation:
      "`git fetch --all` updates remote-tracking refs for every remote.",
  },
  {
    id: "git-clone-shallow",
    category: "git",
    level: "workflow",
    prompt: "Clone a huge repo downloading only the latest commit.",
    answer: "git clone --depth 1 https://github.com/user/repo",
    explanation:
      "`--depth 1` is a shallow clone — much faster for big repos; `git fetch --unshallow` deepens it later.",
  },
  {
    id: "git-clone-branch",
    category: "git",
    level: "workflow",
    prompt: "Clone a repo and check out its 'develop' branch.",
    answer: "git clone -b develop https://github.com/user/repo",
    explanation:
      "`-b` selects the branch at clone time.",
  },
  {
    id: "git-init-default-branch",
    category: "git",
    level: "workflow",
    prompt: "Initialize a repository with 'main' as the default branch.",
    answer: "git init -b main",
    explanation:
      "`-b main` sets the initial branch name; the global default can be set with `git config --global init.defaultBranch main`.",
  },
  {
    id: "git-describe-1",
    category: "git",
    level: "core",
    prompt: "Show the nearest tag to HEAD with commit distance (e.g. v1.0.0-3-gabc123).",
    answer: "git describe --tags",
    explanation:
      "`git describe` names a commit by its nearest tag — useful for build version strings.",
  },
  {
    id: "git-status-short",
    category: "git",
    level: "core",
    prompt: "Show repository status in compact one-line-per-file form.",
    answer: "git status --short",
    explanation:
      "`--short` (or `-s`) gives machine-friendly status like ` M file.txt`.",
  },
  {
    id: "git-add-interactive",
    category: "git",
    level: "workflow",
    prompt: "Stage parts of files interactively.",
    answer: "git add -p",
    explanation:
      "`git add -p` (patch) walks hunks and asks to stage each — precise commits.",
  },
  {
    id: "git-diff-stat-1",
    category: "git",
    level: "core",
    prompt: "Show a summary of changed files with added/removed line counts.",
    answer: "git diff --stat",
    explanation:
      "`--stat` summarizes the diff numerically instead of printing full patches.",
  },
  {
    id: "git-commit-verify-off",
    category: "git",
    level: "workflow",
    prompt: "Commit without running the pre-commit hook.",
    answer: "git commit --no-verify",
    explanation:
      "`--no-verify` skips pre-commit and commit-msg hooks when they block you.",
  },
  {
    id: "git-commit-amend-message",
    category: "git",
    level: "core",
    prompt: "Change only the message of the last commit.",
    answer: "git commit --amend -m 'new message'",
    explanation:
      "`--amend -m` rewrites HEAD's message. Note this rewrites history on the branch.",
  },
  {
    id: "git-ignore-cached-all",
    category: "git",
    level: "workflow",
    prompt: "Remove every now-ignored file from tracking in one command.",
    answer: "git rm -r --cached .",
    explanation:
      "After editing .gitignore, `git rm -r --cached .` un-tracks everything, then `git add .` re-adds what's not ignored.",
  },
  {
    id: "git-mv-file",
    category: "git",
    level: "core",
    prompt: "Rename old.txt to new.txt and stage the rename.",
    answer: "git mv old.txt new.txt",
    explanation:
      "`git mv` moves and stages in one step (plain `mv` + `git add -A` also works).",
  },
  {
    id: "git-log-all-branches-file",
    category: "git",
    level: "core",
    prompt: "Search every branch for commits touching file.txt.",
    answer: "git log --all -- file.txt",
    explanation:
      "`--all` searches all refs, not just HEAD's history.",
  },
  {
    id: "git-diff-nocheckout",
    category: "git",
    level: "workflow",
    prompt: "Compare file.txt between main and feature without checking anything out.",
    answer: "git diff main feature -- file.txt",
    explanation:
      "`git diff ref1 ref2 -- path` reads both versions from the object store.",
  },
  {
    id: "git-show-file-version",
    category: "git",
    level: "core",
    prompt: "Show file.txt as it was at commit abc123.",
    answer: "git show abc123:file.txt",
    explanation:
      "The `ref:path` syntax reads a file from any commit without changing your worktree.",
  },
  {
    id: "git-restore-commit-version",
    category: "git",
    level: "workflow",
    prompt: "Restore file.txt to its state at commit abc123 in the working tree.",
    answer: "git restore --source=abc123 file.txt",
    explanation:
      "`git restore -s abc123 file.txt` overwrites the working copy from that commit.",
  },
  {
    id: "git-fsck-dangling",
    category: "git",
    level: "workflow",
    prompt: "Find dangling commits (possible recovery targets after a reset).",
    answer: "git fsck --lost-found",
    explanation:
      "`git fsck` reports dangling objects; `--lost-found` writes recoverable ones to .git/lost-found.",
  },
  {
    id: "git-gc-1",
    category: "git",
    level: "workflow",
    prompt: "Run housekeeping to compress the repository.",
    answer: "git gc",
    explanation:
      "`git gc` packs objects and prunes unreachable ones; `--aggressive` is rarely needed.",
  },
  {
    id: "git-count-objects",
    category: "git",
    level: "core",
    prompt: "Show how much disk space the repository's objects use.",
    answer: "git count-objects -vH",
    explanation:
      "`count-objects -vH` reports object counts and human-readable sizes.",
  },
  {
    id: "git-branch-rename-1",
    category: "git",
    level: "core",
    prompt: "Rename the current branch to 'better-name'.",
    answer: "git branch -m better-name",
    explanation:
      "`git branch -m newname` renames the current branch; `-m old new` renames another.",
  },
  {
    id: "git-push-set-upstream",
    category: "git",
    level: "core",
    prompt: "Push the current branch and set origin as its tracking remote.",
    answer: "git push -u origin HEAD",
    explanation:
      "`-u` (or `--set-upstream`) links the branch to origin so plain `git push` works later.",
  },
  {
    id: "git-branch-current",
    category: "git",
    level: "core",
    prompt: "Print the name of the current branch.",
    answer: "git branch --show-current",
    explanation:
      "`--show-current` prints just the branch name; `git rev-parse --abbrev-ref HEAD` also works.",
  },
  {
    id: "git-commit-verify-off-merge",
    category: "git",
    level: "workflow",
    prompt: "Skip hooks when creating a merge commit.",
    answer: "git merge --no-verify",
    explanation:
      "`--no-verify` on merge skips pre-merge-commit hooks.",
  },
  {
    id: "git-rm-file",
    category: "git",
    level: "core",
    prompt: "Delete file.txt and stage the deletion.",
    answer: "git rm file.txt",
    explanation:
      "`git rm` removes from both the worktree and the index, staging the change.",
  },
  {
    id: "git-log-date-filter",
    category: "git",
    level: "core",
    prompt: "Show commits from the last 7 days.",
    answer: "git log --since='7 days ago'",
    explanation:
      "`--since` filters by commit date; `--until` bounds the range.",
  },
  {
    id: "git-branch-tracking",
    category: "git",
    level: "core",
    prompt: "Show which remote branch the current branch tracks.",
    answer: "git status -sb",
    explanation:
      "`git status -sb` shows branch + tracking info like `[origin/main]` on the first line.",
  },
  {
    id: "git-commit-list-format",
    category: "git",
    level: "workflow",
    prompt: "Print each commit as 'hash — short message' for the last 5.",
    answer: "git log -5 --pretty=format:'%h — %s'",
    explanation:
      "`%h` is the short hash, `%s` the subject; `--pretty=format:` gives full control over log output.",
  },
  {
    id: "git-diff-check",
    category: "git",
    level: "workflow",
    prompt: "Scan for whitespace errors in the staged changes before committing.",
    answer: "git diff --cached --check",
    explanation:
      "`--check` flags trailing whitespace and conflict markers — run before committing.",
  },
  {
    id: "git-status-porcelain",
    category: "git",
    level: "workflow",
    prompt: "Get status in a stable format for a script to parse.",
    answer: "git status --porcelain",
    explanation:
      "`--porcelain` is the script-friendly status format, stable across git versions.",
  },
];
