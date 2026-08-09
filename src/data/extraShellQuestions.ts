import type { QuizQuestion } from "./questions";

/**
 * Additional shell questions — top up the dataset past 200 total.
 * Level: pareto = everyday muscle memory, core = standard knowledge,
 * workflow = multi-step scenarios.
 */
export const shellExtraQuestions: QuizQuestion[] = [
  {
    id: "shell-find-by-name",
    category: "shell",
    level: "pareto",
    prompt: "Find all files named 'config.yml' under the current directory.",
    answer: "find . -name config.yml",
    explanation:
      "`find . -name config.yml` searches recursively. `-iname` ignores case.",
  },
  {
    id: "shell-count-lines",
    category: "shell",
    level: "pareto",
    prompt: "Count the number of lines in file.txt.",
    answer: "wc -l file.txt",
    explanation:
      "`wc -l` counts lines. `wc -w` counts words, `wc -c` bytes.",
  },
  {
    id: "shell-print-file-start",
    category: "shell",
    level: "pareto",
    prompt: "Show the first 10 lines of file.txt.",
    answer: "head file.txt",
    explanation:
      "`head` prints the first 10 lines by default; `head -n 20` prints 20.",
  },
  {
    id: "shell-print-file-end",
    category: "shell",
    level: "pareto",
    prompt: "Show the last 10 lines of file.txt.",
    answer: "tail file.txt",
    explanation:
      "`tail` prints the last 10 lines. `tail -f` follows a growing file.",
  },
  {
    id: "shell-tail-follow",
    category: "shell",
    level: "pareto",
    prompt: "Follow the end of app.log as new lines are appended.",
    answer: "tail -f app.log",
    explanation:
      "`tail -f` streams new lines forever — the standard way to watch logs. `-F` retries when the file rotates.",
  },
  {
    id: "shell-grep-recursive",
    category: "shell",
    level: "pareto",
    prompt: "Search every file under the current directory for the word 'error'.",
    answer: "grep -r error .",
    explanation:
      "`grep -r` recurses into directories. Add `-i` to ignore case, `-n` to show line numbers.",
  },
  {
    id: "shell-grep-count",
    category: "shell",
    level: "core",
    prompt: "Count how many lines in file.txt contain 'todo'.",
    answer: "grep -c todo file.txt",
    explanation:
      "`grep -c` prints the number of matching lines rather than the lines themselves.",
  },
  {
    id: "shell-grep-invert",
    category: "shell",
    level: "core",
    prompt: "Show every line of file.txt that does NOT contain 'debug'.",
    answer: "grep -v debug file.txt",
    explanation:
      "`-v` inverts the match. Combine with `-n` and `-i` as needed.",
  },
  {
    id: "shell-sort-lines",
    category: "shell",
    level: "core",
    prompt: "Sort the lines of file.txt alphabetically.",
    answer: "sort file.txt",
    explanation:
      "`sort` orders lines. `-n` sorts numerically, `-r` reverses.",
  },
  {
    id: "shell-uniq-sorted",
    category: "shell",
    level: "core",
    prompt: "Remove duplicate adjacent lines from sorted.txt.",
    answer: "uniq sorted.txt",
    explanation:
      "`uniq` removes only *adjacent* duplicates, so pipe from `sort` first. `-c` counts repeats.",
  },
  {
    id: "shell-uniq-count",
    category: "shell",
    level: "core",
    prompt: "Show how many times each line appears in file.txt (sorted by count).",
    answer: "sort file.txt | uniq -c | sort -rn",
    explanation:
      "`sort` groups duplicates, `uniq -c` counts them, `sort -rn` orders by count descending.",
  },
  {
    id: "shell-cut-field",
    category: "shell",
    level: "core",
    prompt: "Print the second colon-separated field of each line of file.txt.",
    answer: "cut -d: -f2 file.txt",
    explanation:
      "`cut -d: -f2` splits on `:` and prints field 2 — handy for /etc/passwd-style data.",
  },
  {
    id: "shell-tr-lowercase",
    category: "shell",
    level: "core",
    prompt: "Convert every uppercase letter in file.txt to lowercase.",
    answer: "tr 'A-Z' 'a-z' < file.txt",
    explanation:
      "`tr 'A-Z' 'a-z'` maps ranges. `tr -d` deletes characters, `-s` squeezes repeats.",
  },
  {
    id: "shell-tr-delete",
    category: "shell",
    level: "core",
    prompt: "Delete every digit from file.txt.",
    answer: "tr -d '0-9' < file.txt",
    explanation:
      "`tr -d` deletes the listed characters instead of translating them.",
  },
  {
    id: "shell-pipe-errors-grep",
    category: "shell",
    level: "pareto",
    prompt: "Run 'make' but show only lines containing 'error' or 'warning'.",
    answer: "make 2>&1 | grep -E 'error|warning'",
    explanation:
      "`2>&1` merges stderr into stdout so grep sees build errors too. `-E` enables extended regex.",
  },
  {
    id: "shell-pipe-count-files",
    category: "shell",
    level: "core",
    prompt: "Count how many files are in the current directory (not subdirectories).",
    answer: "ls | wc -l",
    explanation:
      "`ls | wc -l` counts entries. For files only, `find . -maxdepth 1 -type f | wc -l` is more precise.",
  },
  {
    id: "shell-xargs-rm",
    category: "shell",
    level: "core",
    prompt: "Delete every file found by find named '*.tmp'.",
    answer: "find . -name '*.tmp' -delete",
    explanation:
      "`-delete` removes matches directly. `find . -name '*.tmp' | xargs rm` also works.",
  },
  {
    id: "shell-xargs-echo",
    category: "shell",
    level: "core",
    prompt: "Run 'echo' once for each line of files.txt.",
    answer: "xargs -L1 echo < files.txt",
    explanation:
      "`-L1` (or `-n1`) runs the command per input line. `xargs echo` alone runs it once with all lines.",
  },
  {
    id: "shell-tar-create",
    category: "shell",
    level: "core",
    prompt: "Create a tar archive of the src directory.",
    answer: "tar -cf src.tar src",
    explanation:
      "`-c` creates, `-f` names the archive. Add `z` (`-czf`) for gzip compression.",
  },
  {
    id: "shell-tar-extract",
    category: "shell",
    level: "core",
    prompt: "Extract archive.tar.gz into the current directory.",
    answer: "tar -xzf archive.tar.gz",
    explanation:
      "`-x` extracts, `-z` decompresses gzip, `-f` selects the file. `tar -xf` auto-detects the format.",
  },
  {
    id: "shell-tar-list",
    category: "shell",
    level: "core",
    prompt: "List the contents of backup.tar.gz without extracting.",
    answer: "tar -tzf backup.tar.gz",
    explanation:
      "`-t` lists archive contents. `-v` shows extra detail.",
  },
  {
    id: "shell-zip-files",
    category: "shell",
    level: "core",
    prompt: "Compress file1.txt and file2.txt into archive.zip.",
    answer: "zip archive.zip file1.txt file2.txt",
    explanation:
      "`zip archive.zip …` adds files to the archive. `unzip archive.zip` extracts it.",
  },
  {
    id: "shell-unzip",
    category: "shell",
    level: "core",
    prompt: "Extract archive.zip.",
    answer: "unzip archive.zip",
    explanation:
      "`unzip` extracts to the current directory; `unzip -l` lists contents first.",
  },
  {
    id: "shell-chmod-exec",
    category: "shell",
    level: "core",
    prompt: "Make script.sh executable.",
    answer: "chmod +x script.sh",
    explanation:
      "`chmod +x` adds execute permission. `chmod 755` sets rwxr-xr-x explicitly.",
  },
  {
    id: "shell-chmod-numeric",
    category: "shell",
    level: "core",
    prompt: "Set file.txt permissions to rw-r--r-- (owner read/write, others read).",
    answer: "chmod 644 file.txt",
    explanation:
      "`644` = rw-r--r--: owner 6 (rw), group 4 (r), others 4 (r).",
  },
  {
    id: "shell-chown-user",
    category: "shell",
    level: "core",
    prompt: "Change the owner of file.txt to user alice.",
    answer: "chown alice file.txt",
    explanation:
      "`chown alice file.txt` sets the owner. `chown alice:devs` also sets the group.",
  },
  {
    id: "shell-chown-recursive",
    category: "shell",
    level: "core",
    prompt: "Recursively change the owner of /srv/www to www-data.",
    answer: "chown -R www-data /srv/www",
    explanation:
      "`-R` applies to every file and directory below. Use `chown -R user:group` for both.",
  },
  {
    id: "shell-history-search",
    category: "shell",
    level: "core",
    prompt: "Search your shell history for commands containing 'docker'.",
    answer: "history | grep docker",
    explanation:
      "`history | grep docker` finds past commands. `Ctrl+r` also does interactive reverse search.",
  },
  {
    id: "shell-re-run-last",
    category: "shell",
    level: "pareto",
    prompt: "Re-run the last command you typed.",
    answer: "!!",
    explanation:
      "`!!` expands to the previous command line. `!$` expands to its last argument.",
  },
  {
    id: "shell-run-last-arg",
    category: "shell",
    level: "core",
    prompt: "Use the last argument of the previous command in a new command.",
    answer: "!$",
    explanation:
      "`!$` is the previous command's final word — e.g. `mkdir foo` then `cd !$`.",
  },
  {
    id: "shell-background-job",
    category: "shell",
    level: "core",
    prompt: "Start the 'sleep 100' command in the background.",
    answer: "sleep 100 &",
    explanation:
      "A trailing `&` backgrounds the job and returns the prompt immediately.",
  },
  {
    id: "shell-list-jobs",
    category: "shell",
    level: "core",
    prompt: "List the jobs running in the current shell.",
    answer: "jobs",
    explanation:
      "`jobs` shows background jobs with their job numbers. `jobs -l` adds PIDs.",
  },
  {
    id: "shell-bring-job-foreground",
    category: "shell",
    level: "core",
    prompt: "Bring job 2 to the foreground.",
    answer: "fg %2",
    explanation:
      "`fg %2` foregrounds job 2. `fg` without an argument foregrounds the most recent job.",
  },
  {
    id: "shell-background-running-job",
    category: "shell",
    level: "core",
    prompt: "Pause the current foreground job and move it to the background.",
    answer: "Ctrl+z",
    explanation:
      "`Ctrl+z` suspends the job; then `bg` resumes it in the background.",
  },
  {
    id: "shell-resume-background",
    category: "shell",
    level: "core",
    prompt: "Resume the suspended job in the background.",
    answer: "bg",
    explanation:
      "`bg` restarts a suspended job in the background, freeing the terminal.",
  },
  {
    id: "shell-kill-by-pid",
    category: "shell",
    level: "core",
    prompt: "Send SIGTERM to process 1234.",
    answer: "kill 1234",
    explanation:
      "`kill 1234` sends SIGTERM. `kill -9 1234` forces SIGKILL when graceful exit fails.",
  },
  {
    id: "shell-kill-by-name",
    category: "shell",
    level: "core",
    prompt: "Kill every process named 'node'.",
    answer: "pkill node",
    explanation:
      "`pkill node` signals processes by name. `pkill -f 'node server'` matches the full command line.",
  },
  {
    id: "shell-list-processes",
    category: "shell",
    level: "core",
    prompt: "Show all running processes with full command lines.",
    answer: "ps aux",
    explanation:
      "`ps aux` shows every process with CPU/memory usage. `ps -ef` is the SysV equivalent.",
  },
  {
    id: "shell-find-process",
    category: "shell",
    level: "core",
    prompt: "Find the PID of a process named 'python'.",
    answer: "pgrep python",
    explanation:
      "`pgrep python` prints matching PIDs. `pgrep -a` also shows the command line.",
  },
  {
    id: "shell-top-interactive",
    category: "shell",
    level: "core",
    prompt: "Launch an interactive process monitor.",
    answer: "top",
    explanation:
      "`top` shows live processes. `htop` is the friendlier alternative if installed.",
  },
  {
    id: "shell-nohup",
    category: "shell",
    level: "core",
    prompt: "Run a script that keeps running after you log out.",
    answer: "nohup ./script.sh &",
    explanation:
      "`nohup` ignores SIGHUP; with `&` the job survives logout. Output goes to nohup.out.",
  },
  {
    id: "shell-disown",
    category: "shell",
    level: "core",
    prompt: "Detach the last background job so it survives the shell closing.",
    answer: "disown",
    explanation:
      "`disown` removes a job from the shell's job table so it isn't killed on exit.",
  },
  {
    id: "shell-echo-var",
    category: "shell",
    level: "pareto",
    prompt: "Print the value of the PATH environment variable.",
    answer: "echo $PATH",
    explanation:
      "`$PATH` expands to the search path. Use `echo $HOME`, `$USER`, etc. for the others.",
  },
  {
    id: "shell-set-variable",
    category: "shell",
    level: "core",
    prompt: "Set a shell variable named 'greeting' to 'hello'.",
    answer: "greeting=hello",
    explanation:
      "`name=value` (no spaces!) sets a shell variable. `export greeting` makes it available to child processes.",
  },
  {
    id: "shell-export-variable",
    category: "shell",
    level: "core",
    prompt: "Export the variable API_KEY so child processes can read it.",
    answer: "export API_KEY",
    explanation:
      "`export` marks an existing variable for inheritance. `export API_KEY=xyz` sets and exports in one step.",
  },
  {
    id: "shell-persistent-export",
    category: "shell",
    level: "core",
    prompt: "Add 'export MY_FLAG=1' to your shell config so it loads every login.",
    answer: "echo 'export MY_FLAG=1' >> ~/.bashrc",
    explanation:
      "Appending to ~/.bashrc makes the export permanent. Source it with `source ~/.bashrc` to apply now.",
  },
  {
    id: "shell-command-substitution",
    category: "shell",
    level: "core",
    prompt: "Print today's date inside a sentence.",
    answer: "echo \"Today is $(date)\"",
    explanation:
      "`$(…)` runs the command and substitutes its output. Backticks do the same in older shells.",
  },
  {
    id: "shell-brace-expansion",
    category: "shell",
    level: "core",
    prompt: "Create files a.txt, b.txt, and c.txt in one command.",
    answer: "touch {a,b,c}.txt",
    explanation:
      "`{a,b,c}` expands to three words. `{1..5}` expands to 1 2 3 4 5.",
  },
  {
    id: "shell-glob-all-files",
    category: "shell",
    level: "core",
    prompt: "List every .log file in the current directory.",
    answer: "ls *.log",
    explanation:
      "`*.log` is a glob matching all files ending in .log. `?` matches a single character.",
  },
  {
    id: "shell-if-condition",
    category: "shell",
    level: "workflow",
    prompt: "Print 'exists' if file.txt exists.",
    answer: "test -f file.txt && echo exists",
    explanation:
      "`test -f` (or `[ -f … ]`) checks for a regular file; `&&` runs the echo only on success.",
  },
  {
    id: "shell-loop-files",
    category: "shell",
    level: "workflow",
    prompt: "Print the name of every .txt file in the current directory.",
    answer: "for f in *.txt; do echo $f; done",
    explanation:
      "The `for` loop iterates the glob. One-line syntax uses `;` separators.",
  },
  {
    id: "shell-loop-read",
    category: "shell",
    level: "workflow",
    prompt: "Read lines.txt line by line and echo each one.",
    answer: "while read line; do echo $line; done < lines.txt",
    explanation:
      "The `while read` idiom feeds each line into the loop body from the redirected file.",
  },
  {
    id: "shell-sed-replace",
    category: "shell",
    level: "core",
    prompt: "Replace the first 'foo' with 'bar' on each line of file.txt.",
    answer: "sed 's/foo/bar/' file.txt",
    explanation:
      "`sed 's/foo/bar/'` replaces the first occurrence per line. `g` flag makes it global.",
  },
  {
    id: "shell-sed-inplace",
    category: "shell",
    level: "core",
    prompt: "Replace all 'foo' with 'bar' in file.txt, saving in place.",
    answer: "sed -i 's/foo/bar/g' file.txt",
    explanation:
      "`-i` edits the file in place. On macOS use `sed -i ''`. Keep a backup with `-i.bak`.",
  },
  {
    id: "shell-sed-delete-lines",
    category: "shell",
    level: "core",
    prompt: "Delete every line containing 'comment' from file.txt.",
    answer: "sed '/comment/d' file.txt",
    explanation:
      "`/pattern/d` deletes matching lines. `sed '1,5d'` would delete the first five lines.",
  },
  {
    id: "shell-awk-field",
    category: "shell",
    level: "core",
    prompt: "Print the first whitespace-separated word of each line of file.txt.",
    answer: "awk '{print $1}' file.txt",
    explanation:
      "`awk` splits lines into fields; `$1` is the first. `$0` is the whole line.",
  },
  {
    id: "shell-awk-sum",
    category: "shell",
    level: "workflow",
    prompt: "Sum the numbers in the first column of data.txt.",
    answer: "awk '{sum += $1} END {print sum}' data.txt",
    explanation:
      "The `END` block runs after all lines, printing the accumulated total.",
  },
  {
    id: "shell-find-exec",
    category: "shell",
    level: "core",
    prompt: "Run 'file' on every .png found under the current directory.",
    answer: "find . -name '*.png' -exec file {} \\;",
    explanation:
      "`-exec … {} \\;` runs the command per match. Use `+` instead of `\\;` to batch args.",
  },
  {
    id: "shell-find-size",
    category: "shell",
    level: "core",
    prompt: "Find files larger than 100MB under /var.",
    answer: "find /var -size +100M",
    explanation:
      "`-size +100M` matches files over 100 megabytes. `-mtime +7` matches files older than 7 days.",
  },
  {
    id: "shell-find-newer",
    category: "shell",
    level: "core",
    prompt: "Find files modified in the last day.",
    answer: "find . -mtime -1",
    explanation:
      "`-mtime -1` = modified less than 24 hours ago; `+1` = more than a day ago.",
  },
  {
    id: "shell-grep-ip",
    category: "shell",
    level: "workflow",
    prompt: "Extract every IPv4 address from access.log.",
    answer: "grep -oE '([0-9]{1,3}\\.){3}[0-9]{1,3}' access.log",
    explanation:
      "`-o` prints only matches, `-E` uses extended regex. The pattern matches dotted quads.",
  },
  {
    id: "shell-curl-headers",
    category: "shell",
    level: "core",
    prompt: "Fetch only the HTTP headers from example.com.",
    answer: "curl -I https://example.com",
    explanation:
      "`-I` (HEAD) fetches headers only. `curl -s` silences progress output.",
  },
  {
    id: "shell-curl-download",
    category: "shell",
    level: "core",
    prompt: "Download a file from a URL and save it with its original name.",
    answer: "curl -O https://example.com/file.zip",
    explanation:
      "`-O` saves using the remote filename; `-o name` sets a custom name.",
  },
  {
    id: "shell-wget-mirror",
    category: "shell",
    level: "core",
    prompt: "Download an entire website for offline viewing.",
    answer: "wget -r https://example.com",
    explanation:
      "`wget -r` recursively mirrors a site. `wget -c` resumes interrupted downloads.",
  },
  {
    id: "shell-curl-post",
    category: "shell",
    level: "core",
    prompt: "Send a POST request with JSON body to an API.",
    answer: "curl -X POST -H 'Content-Type: application/json' -d '{\"a\":1}' https://api.example.com",
    explanation:
      "`-d` sends the body (implying POST), `-H` adds the JSON content type header.",
  },
  {
    id: "shell-scp-copy",
    category: "shell",
    level: "core",
    prompt: "Copy file.txt to user@host's home directory over SSH.",
    answer: "scp file.txt user@host:",
    explanation:
      "`scp source dest` copies over SSH. `scp -r` recurses directories.",
  },
  {
    id: "shell-scp-recursive",
    category: "shell",
    level: "core",
    prompt: "Copy the whole project dir to host 'web' at ~/projects.",
    answer: "scp -r project web:~/projects",
    explanation:
      "`-r` copies directories recursively. `scp -P 2222` sets a custom port.",
  },
  {
    id: "shell-rsync-sync",
    category: "shell",
    level: "core",
    prompt: "Sync the local backup dir to /backup on server 'nas'.",
    answer: "rsync -av backup/ nas:/backup/",
    explanation:
      "`-a` archive mode preserves attributes, `-v` is verbose, trailing slashes sync the dirs' contents.",
  },
  {
    id: "shell-rsync-delete",
    category: "shell",
    level: "workflow",
    prompt: "Mirror local/ to remote/ so remote has no extra files.",
    answer: "rsync -av --delete local/ host:remote/",
    explanation:
      "`--delete` removes files on the destination that aren't in the source — a true mirror.",
  },
  {
    id: "shell-symlink-create",
    category: "shell",
    level: "core",
    prompt: "Create a symbolic link 'current' pointing to v1.2.",
    answer: "ln -s v1.2 current",
    explanation:
      "`ln -s target link` makes a symlink. Without `-s` it creates a hard link.",
  },
  {
    id: "shell-which-command",
    category: "shell",
    level: "core",
    prompt: "Show the full path of the 'node' executable.",
    answer: "which node",
    explanation:
      "`which` prints the resolved path. `type node` also reports aliases and functions.",
  },
  {
    id: "shell-command-type",
    category: "shell",
    level: "core",
    prompt: "Find out whether 'll' is an alias, function, or binary.",
    answer: "type ll",
    explanation:
      "`type` classifies a command. `which` only finds binaries on PATH.",
  },
  {
    id: "shell-alias-create",
    category: "shell",
    level: "core",
    prompt: "Create an alias 'gs' for 'git status' in the current shell.",
    answer: "alias gs='git status'",
    explanation:
      "`alias name='command'` defines a shorthand. `unalias gs` removes it.",
  },
  {
    id: "shell-persist-alias",
    category: "shell",
    level: "core",
    prompt: "Make the 'gs' alias permanent across shell sessions.",
    answer: "echo \"alias gs='git status'\" >> ~/.bashrc",
    explanation:
      "Aliases defined on the command line vanish at logout; append them to ~/.bashrc (or ~/.zshrc) to persist.",
  },
  {
    id: "shell-source-config",
    category: "shell",
    level: "core",
    prompt: "Reload ~/.bashrc into the current shell without restarting.",
    answer: "source ~/.bashrc",
    explanation:
      "`source` (alias `.`) executes the file in the current shell, applying new aliases and exports.",
  },
  {
    id: "shell-umask-check",
    category: "shell",
    level: "core",
    prompt: "Show the current umask value.",
    answer: "umask",
    explanation:
      "`umask` prints the permission mask (e.g. 022). `umask 077` makes new files private.",
  },
  {
    id: "shell-date-format",
    category: "shell",
    level: "core",
    prompt: "Print the current date as YYYY-MM-DD.",
    answer: "date +%F",
    explanation:
      "`date +%F` is shorthand for `%Y-%m-%d`. `date +%s` prints the epoch timestamp.",
  },
  {
    id: "shell-sleep-command",
    category: "shell",
    level: "core",
    prompt: "Pause the shell for 5 seconds.",
    answer: "sleep 5",
    explanation:
      "`sleep 5` waits 5 seconds. Fractions work too: `sleep 0.5`.",
  },
  {
    id: "shell-echo-no-newline",
    category: "shell",
    level: "core",
    prompt: "Print 'Ready' without a trailing newline.",
    answer: "echo -n Ready",
    explanation:
      "`echo -n` omits the newline. `printf` is the more portable alternative.",
  },
  {
    id: "shell-printf-format",
    category: "shell",
    level: "core",
    prompt: "Print a number padded to 3 digits (e.g. 7 as 007).",
    answer: "printf '%03d\\n' 7",
    explanation:
      "`printf` uses C-style format strings; `%03d` zero-pads to width 3.",
  },
  {
    id: "shell-command-chain",
    category: "shell",
    level: "core",
    prompt: "Run 'configure' and only run 'make' if it succeeds.",
    answer: "configure && make",
    explanation:
      "`&&` runs the second command only if the first exits 0. `;` always runs both.",
  },
  {
    id: "shell-command-or",
    category: "shell",
    level: "core",
    prompt: "Run 'backup.sh', and if it fails print 'backup failed'.",
    answer: "backup.sh || echo 'backup failed'",
    explanation:
      "`||` runs the fallback when the first command fails. Great for error handling in one line.",
  },
  {
    id: "shell-stderr-redirect",
    category: "shell",
    level: "core",
    prompt: "Save only the error output of a command to errors.log.",
    answer: "command 2> errors.log",
    explanation:
      "`2>` redirects stderr. `>` redirects stdout. `2>&1` merges stderr into stdout.",
  },
  {
    id: "shell-both-redirect",
    category: "shell",
    level: "core",
    prompt: "Save both stdout and stderr of a command to output.log.",
    answer: "command > output.log 2>&1",
    explanation:
      "Redirect stdout first, then point stderr at the same place with `2>&1`.",
  },
  {
    id: "shell-append-file",
    category: "shell",
    level: "core",
    prompt: "Append 'done' to the end of log.txt.",
    answer: "echo done >> log.txt",
    explanation:
      "`>>` appends; `>` overwrites. Both create the file if it doesn't exist.",
  },
  {
    id: "shell-discard-output",
    category: "shell",
    level: "core",
    prompt: "Run a command and throw away all of its output.",
    answer: "command > /dev/null 2>&1",
    explanation:
      "`/dev/null` swallows stdout and stderr, keeping the terminal clean.",
  },
  {
    id: "shell-here-string",
    category: "shell",
    level: "core",
    prompt: "Feed the string 'hello world' to grep to search it.",
    answer: "grep hello <<< 'hello world'",
    explanation:
      "`<<<` is a here-string, feeding a single word as stdin. `<<EOF … EOF` is the multi-line heredoc.",
  },
  {
    id: "shell-ls-hidden",
    category: "shell",
    level: "pareto",
    prompt: "List all files including hidden ones in the current directory.",
    answer: "ls -a",
    explanation:
      "`-a` shows dotfiles. `ls -l` adds details, `ls -la` combines both.",
  },
  {
    id: "shell-ls-long",
    category: "shell",
    level: "pareto",
    prompt: "List files with permissions, owner, and size.",
    answer: "ls -l",
    explanation:
      "`ls -l` prints the long format. `ls -lh` makes sizes human-readable (K/M/G).",
  },
  {
    id: "shell-du-human",
    category: "shell",
    level: "core",
    prompt: "Show the disk usage of the current directory in human-readable form.",
    answer: "du -sh",
    explanation:
      "`-s` summarizes, `-h` is human-readable. `du -sh *` shows each item's usage.",
  },
  {
    id: "shell-df-human",
    category: "shell",
    level: "core",
    prompt: "Show free disk space on all mounted filesystems in human form.",
    answer: "df -h",
    explanation:
      "`df -h` reports filesystem usage. Watch for 100% volumes here.",
  },
  {
    id: "shell-free-memory",
    category: "shell",
    level: "core",
    prompt: "Show memory usage in human-readable form.",
    answer: "free -h",
    explanation:
      "`free -h` prints RAM totals, used, free, and swap.",
  },
  {
    id: "shell-whoami-1",
    category: "shell",
    level: "core",
    prompt: "Print the current username.",
    answer: "whoami",
    explanation:
      "`whoami` prints the effective user. `id -un` is equivalent.",
  },
  {
    id: "shell-uptime",
    category: "shell",
    level: "core",
    prompt: "Show how long the system has been running and the load average.",
    answer: "uptime",
    explanation:
      "`uptime` prints runtime, users, and load average.",
  },
  {
    id: "shell-dns-lookup",
    category: "shell",
    level: "core",
    prompt: "Look up the IP addresses for example.com.",
    answer: "dig example.com",
    explanation:
      "`dig` performs DNS queries. `host example.com` and `nslookup` are simpler alternatives.",
  },
  {
    id: "shell-ping-host",
    category: "shell",
    level: "core",
    prompt: "Check whether a host is reachable and see round-trip times.",
    answer: "ping example.com",
    explanation:
      "`ping` sends ICMP probes. `ping -c 4` stops after four replies.",
  },
  {
    id: "shell-route-trace",
    category: "shell",
    level: "core",
    prompt: "Trace the network path to example.com.",
    answer: "traceroute example.com",
    explanation:
      "`traceroute` shows each hop to the destination — useful for diagnosing where latency appears.",
  },
  {
    id: "shell-port-listen-check",
    category: "shell",
    level: "core",
    prompt: "Check whether anything is listening on port 8080.",
    answer: "ss -ltnp | grep 8080",
    explanation:
      "`ss -ltnp` lists listening TCP ports with processes; grep filters for 8080.",
  },
  {
    id: "shell-process-tree",
    category: "shell",
    level: "core",
    prompt: "Show the parent/child tree of running processes.",
    answer: "pstree",
    explanation:
      "`pstree` renders processes as a tree. `pstree -p` adds PIDs.",
  },
  {
    id: "shell-nice-process",
    category: "shell",
    level: "core",
    prompt: "Start a CPU-heavy job with low priority.",
    answer: "nice -n 10 ./heavy.sh",
    explanation:
      "`nice -n 10` lowers the scheduling priority (higher = nicer to other processes).",
  },
  {
    id: "shell-time-command",
    category: "shell",
    level: "core",
    prompt: "Measure how long a command takes to run.",
    answer: "time command",
    explanation:
      "`time` prints real, user, and sys times. `/usr/bin/time -v` gives more detail.",
  },
  {
    id: "shell-watch-command",
    category: "shell",
    level: "core",
    prompt: "Re-run 'df -h' every 2 seconds to watch disk space.",
    answer: "watch -n 2 df -h",
    explanation:
      "`watch` refreshes the command's output every interval; `-d` highlights differences.",
  },
  {
    id: "shell-watch-grep-log",
    category: "shell",
    level: "workflow",
    prompt: "Watch a log file for new 'ERROR' lines as they appear.",
    answer: "tail -f app.log | grep ERROR",
    explanation:
      "`tail -f` streams the file; grep filters to ERROR lines live.",
  },
  {
    id: "shell-json-format",
    category: "shell",
    level: "workflow",
    prompt: "Pretty-print the JSON in data.json for readability.",
    answer: "jq . data.json",
    explanation:
      "`jq .` formats JSON. `jq '.key'` extracts a field; `jq -r` outputs raw strings.",
  },
  {
    id: "shell-json-query",
    category: "shell",
    level: "workflow",
    prompt: "Print the 'name' field of each object in a JSON array file.",
    answer: "jq -r '.[].name' data.json",
    explanation:
      "`.[]` iterates array elements; `.name` picks the field; `-r` emits raw strings.",
  },
  {
    id: "shell-curl-status",
    category: "shell",
    level: "core",
    prompt: "Print only the HTTP status code of a request to example.com.",
    answer: "curl -s -o /dev/null -w '%{http_code}' https://example.com",
    explanation:
      "`-o /dev/null` discards the body and `-w '%{http_code}'` prints just the status.",
  },
  {
    id: "shell-curl-time",
    category: "shell",
    level: "core",
    prompt: "Show how long a request to example.com took, including DNS and connect.",
    answer: "curl -w 'total: %{time_total}s\\n' -o /dev/null -s https://example.com",
    explanation:
      "`-w` formats timing info; `time_total` is the full request duration.",
  },
  {
    id: "shell-extract-columns",
    category: "shell",
    level: "workflow",
    prompt: "Print columns 1 and 3 of a whitespace-separated table file.",
    answer: "awk '{print $1, $3}' table.txt",
    explanation:
      "`awk` splits on whitespace by default; `$1` and `$3` select the fields.",
  },
  {
    id: "shell-sort-version",
    category: "shell",
    level: "workflow",
    prompt: "Sort a list of version numbers in versions.txt from oldest to newest.",
    answer: "sort -V versions.txt",
    explanation:
      "`sort -V` understands version numbering (1.10 > 1.9), unlike plain lexicographic sort.",
  },
  {
    id: "shell-shuf-random",
    category: "shell",
    level: "core",
    prompt: "Print a random line from file.txt.",
    answer: "shuf -n 1 file.txt",
    explanation:
      "`shuf` randomizes input; `-n 1` takes one random line.",
  },
  {
    id: "shell-seq-numbers",
    category: "shell",
    level: "core",
    prompt: "Print the numbers 1 through 10, one per line.",
    answer: "seq 1 10",
    explanation:
      "`seq 1 10` prints 1–10. `seq 10` starts at 1; `seq 1 2 10` steps by 2.",
  },
  {
    id: "shell-yes-command",
    category: "shell",
    level: "core",
    prompt: "Answer 'yes' to every prompt in an install script.",
    answer: "yes | install_script",
    explanation:
      "`yes` prints 'y' forever, feeding confirmation prompts. `yes |` is the classic idiom.",
  },
  {
    id: "shell-tee-log",
    category: "shell",
    level: "core",
    prompt: "Run a build, showing output on screen while also saving it to build.log.",
    answer: "make | tee build.log",
    explanation:
      "`tee` duplicates stdin to both the terminal and the file. `tee -a` appends.",
  },
  {
    id: "shell-diff-files",
    category: "shell",
    level: "core",
    prompt: "Show the differences between old.txt and new.txt.",
    answer: "diff old.txt new.txt",
    explanation:
      "`diff` prints line changes. `diff -u` gives a unified (patch-style) format.",
  },
  {
    id: "shell-diff-recursive",
    category: "shell",
    level: "workflow",
    prompt: "Compare two directories and list which files differ.",
    answer: "diff -r dirA dirB",
    explanation:
      "`diff -r` recurses; `diff -rq` prints only a summary of differing files.",
  },
  {
    id: "shell-md5sum",
    category: "shell",
    level: "core",
    prompt: "Print the MD5 checksum of file.bin.",
    answer: "md5sum file.bin",
    explanation:
      "`md5sum` computes a hash to verify downloads. `sha256sum` is the stronger default.",
  },
  {
    id: "shell-strings-bin",
    category: "shell",
    level: "core",
    prompt: "Print the printable strings inside a binary file.",
    answer: "strings app.bin",
    explanation:
      "`strings` extracts human-readable text from binaries — handy for a first peek at an unknown file.",
  },
  {
    id: "shell-file-type",
    category: "shell",
    level: "core",
    prompt: "Identify the type of mystery-file.",
    answer: "file mystery-file",
    explanation:
      "`file` inspects the header and reports the real type regardless of extension.",
  },
  {
    id: "shell-lsof-port",
    category: "shell",
    level: "workflow",
    prompt: "Find which process is holding port 3000 open.",
    answer: "lsof -i :3000",
    explanation:
      "`lsof -i :3000` lists the process bound to port 3000 — the classic 'who owns the port' answer.",
  },
  {
    id: "shell-cat-number",
    category: "shell",
    level: "core",
    prompt: "Print file.txt with line numbers.",
    answer: "cat -n file.txt",
    explanation:
      "`cat -n` numbers lines. `nl file.txt` does the same on most systems.",
  },
  {
    id: "shell-less-search",
    category: "shell",
    level: "core",
    prompt: "Open file.txt in a pager so you can scroll and search.",
    answer: "less file.txt",
    explanation:
      "`less` pages through files; `/` searches within it, `q` quits.",
  },
  {
    id: "shell-touch-create",
    category: "shell",
    level: "pareto",
    prompt: "Create an empty file named newfile.txt.",
    answer: "touch newfile.txt",
    explanation:
      "`touch` creates the file (or updates its mtime if it exists).",
  },
  {
    id: "shell-mkdir-p-1",
    category: "shell",
    level: "pareto",
    prompt: "Create the nested directory tree a/b/c in one command.",
    answer: "mkdir -p a/b/c",
    explanation:
      "`-p` creates parents as needed and doesn't error when the path exists.",
  },
  {
    id: "shell-cp-recursive",
    category: "shell",
    level: "pareto",
    prompt: "Copy the entire folder src to a new folder dst.",
    answer: "cp -r src dst",
    explanation:
      "`-r` copies directories recursively. `cp -a` also preserves attributes.",
  },
  {
    id: "shell-mv-safe",
    category: "shell",
    level: "core",
    prompt: "Ask for confirmation before overwriting when moving file.txt to dst.",
    answer: "mv -i file.txt dst",
    explanation:
      "`-i` prompts before clobbering. `mv -n` never overwrites.",
  },
  {
    id: "shell-rm-dir",
    category: "shell",
    level: "core",
    prompt: "Remove the empty directory 'old'.",
    answer: "rmdir old",
    explanation:
      "`rmdir` only removes empty directories; `rm -r` handles non-empty ones.",
  },
  {
    id: "shell-rm-recursive-force",
    category: "shell",
    level: "core",
    prompt: "Force-remove the build directory and everything inside it.",
    answer: "rm -rf build",
    explanation:
      "`-r` recurses, `-f` suppresses prompts. Powerful and dangerous — double-check paths.",
  },
  {
    id: "shell-dotfile-bashrc",
    category: "shell",
    level: "workflow",
    prompt: "Edit your shell configuration file (bash).",
    answer: "vim ~/.bashrc",
    explanation:
      "~/.bashrc holds aliases, exports, and prompt setup for interactive bash.",
  },
  {
    id: "shell-add-path",
    category: "shell",
    level: "workflow",
    prompt: "Prepend ~/bin to PATH so its scripts are found first.",
    answer: "export PATH=$HOME/bin:$PATH",
    explanation:
      "Putting the dir first in PATH means it wins over system commands; add to ~/.bashrc to persist.",
  },
  {
    id: "shell-check-path",
    category: "shell",
    level: "core",
    prompt: "Print each directory in PATH on its own line.",
    answer: "echo $PATH | tr ':' '\\n'",
    explanation:
      "`tr ':' '\\n'` converts the colon-separated PATH into one entry per line.",
  },
  {
    id: "shell-run-sh-with-args",
    category: "shell",
    level: "workflow",
    prompt: "Run script.sh passing it three arguments.",
    answer: "./script.sh arg1 arg2 arg3",
    explanation:
      "Arguments appear as $1, $2, $3 inside the script. Ensure it's executable (`chmod +x`).",
  },
  {
    id: "shell-capture-exit",
    category: "shell",
    level: "workflow",
    prompt: "Print the exit status of the last command.",
    answer: "echo $?",
    explanation:
      "`$?` holds the previous command's exit code — 0 means success.",
  },
  {
    id: "shell-debug-xtrace",
    category: "shell",
    level: "workflow",
    prompt: "Run script.sh with every command echoed before execution.",
    answer: "bash -x script.sh",
    explanation:
      "`-x` (xtrace) prints each command — the fastest way to debug a script.",
  },
  {
    id: "shell-syntax-check",
    category: "shell",
    level: "workflow",
    prompt: "Check script.sh for syntax errors without running it.",
    answer: "bash -n script.sh",
    explanation:
      "`-n` parses the script and reports errors without executing anything.",
  },
  {
    id: "shell-find-largest",
    category: "shell",
    level: "workflow",
    prompt: "List the 5 largest files in the current directory by size.",
    answer: "ls -lS | head -6",
    explanation:
      "`ls -lS` sorts by size descending; `head -6` keeps the header plus the five largest.",
  },
  {
    id: "shell-disk-space-root",
    category: "shell",
    level: "core",
    prompt: "Show how full the root filesystem is.",
    answer: "df -h /",
    explanation:
      "`df -h /` reports usage of the root mount — the usual disk-full check.",
  },
  {
    id: "shell-cat-merge",
    category: "shell",
    level: "core",
    prompt: "Concatenate part1.txt and part2.txt into combined.txt.",
    answer: "cat part1.txt part2.txt > combined.txt",
    explanation:
      "`cat` prints both files in order; the redirect saves the result.",
  },
  {
    id: "shell-wc-words",
    category: "shell",
    level: "core",
    prompt: "Count words in essay.txt.",
    answer: "wc -w essay.txt",
    explanation:
      "`wc -w` counts whitespace-separated words.",
  },
  {
    id: "shell-history-clear",
    category: "shell",
    level: "core",
    prompt: "Clear the current shell's command history.",
    answer: "history -c",
    explanation:
      "`history -c` wipes the in-memory history. `history -cw` also clears the history file.",
  },
  {
    id: "shell-cd-home-1",
    category: "shell",
    level: "pareto",
    prompt: "Go to your home directory.",
    answer: "cd ~",
    explanation:
      "`cd ~` (or bare `cd`) returns home. `cd -` goes back to the previous directory.",
  },
  {
    id: "shell-cd-back-1",
    category: "shell",
    level: "pareto",
    prompt: "Return to the directory you were in before the last cd.",
    answer: "cd -",
    explanation:
      "`cd -` toggles to the previous working directory and prints it.",
  },
  {
    id: "shell-clear-screen",
    category: "shell",
    level: "pareto",
    prompt: "Clear the terminal screen.",
    answer: "clear",
    explanation:
      "`clear` empties the screen; `Ctrl+l` does it without typing a command.",
  },
  {
    id: "shell-terminal-reset",
    category: "shell",
    level: "core",
    prompt: "Reset a garbled terminal (e.g. after catting a binary file).",
    answer: "reset",
    explanation:
      "`reset` restores sane terminal settings. `stty sane` is the older remedy.",
  },
  {
    id: "shell-stty-sane",
    category: "shell",
    level: "core",
    prompt: "Restore terminal settings that a crashed program left broken.",
    answer: "stty sane",
    explanation:
      "`stty sane` resets common terminal flags; also try `reset` for a full fix.",
  },
  {
    id: "shell-shell-version",
    category: "shell",
    level: "core",
    prompt: "Print the version of the shell you're running.",
    answer: "bash --version",
    explanation:
      "`bash --version` reports the bash version; `$BASH_VERSION` prints it too.",
  },
  {
    id: "shell-environment-list",
    category: "shell",
    level: "core",
    prompt: "Print all exported environment variables.",
    answer: "env",
    explanation:
      "`env` lists the environment; `env | sort` gives an alphabetical view.",
  },
  {
    id: "shell-special-params",
    category: "shell",
    level: "workflow",
    prompt: "In a script, print the number of arguments passed to it.",
    answer: "echo $#",
    explanation:
      "`$#` is the argument count; `$@` is all arguments; `$0` is the script name.",
  },
  {
    id: "shell-case-command",
    category: "shell",
    level: "workflow",
    prompt: "In a script, handle 'start', 'stop', or any other verb.",
    answer: "case \"$1\" in start) echo starting;; stop) echo stopping;; *) echo unknown;; esac",
    explanation:
      "`case` matches patterns; each branch ends with `;;` and the block with `esac`.",
  },
  {
    id: "shell-function-def",
    category: "shell",
    level: "workflow",
    prompt: "Define a shell function 'greet' that echoes hello.",
    answer: "greet() { echo hello; }",
    explanation:
      "Functions are `name() { body; }`; call them like any command: `greet`.",
  },
  {
    id: "shell-array-shell",
    category: "shell",
    level: "workflow",
    prompt: "Define an array of fruits and print the first element.",
    answer: "fruits=(apple banana); echo ${fruits[0]}",
    explanation:
      "Arrays use parentheses; `${fruits[0]}` accesses elements and `${#fruits[@]}` counts them.",
  },
  {
    id: "shell-string-substring",
    category: "shell",
    level: "workflow",
    prompt: "Print the first 3 characters of the string in $s.",
    answer: "echo ${s:0:3}",
    explanation:
      "`${s:offset:length}` slices the string. `${s^^}` uppercases, `${s,,}` lowercases.",
  },
  {
    id: "shell-default-value",
    category: "shell",
    level: "workflow",
    prompt: "Use 'localhost' if the PORT variable is unset.",
    answer: "echo ${PORT:-localhost}",
    explanation:
      "`${var:-default}` substitutes the default when unset/empty; `:=` also assigns it.",
  },
  {
    id: "shell-literal-dollar",
    category: "shell",
    level: "core",
    prompt: "Echo the literal text '$HOME' without expanding it.",
    answer: "echo '$HOME'",
    explanation:
      "Single quotes prevent all expansion. Double quotes would expand $HOME to its value.",
  },
  {
    id: "shell-escape-dollar",
    category: "shell",
    level: "core",
    prompt: "Print the literal text $HOME using double quotes.",
    answer: "echo \"\\$HOME\"",
    explanation:
      "Backslash escapes the `$` inside double quotes, so `$HOME` prints literally.",
  },
  {
    id: "shell-command-not-found-path",
    category: "shell",
    level: "workflow",
    prompt: "A program you installed is 'command not found' — add its bin dir and check.",
    answer: "export PATH=$HOME/.local/bin:$PATH",
    explanation:
      "Appending/prefixing the install dir to PATH makes the binary discoverable; source ~/.bashrc to persist.",
  },
];
