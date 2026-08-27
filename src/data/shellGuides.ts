/**
 * Shell guides — structured walkthroughs that teach concepts with
 * explanations, examples, and inline exercises.
 */

import type { GuideSection } from "./sshGuides";

export const shellGuides: GuideSection[] = [
  {
    id: "shell-fundamentals",
    title: "Shell Fundamentals",
    tagline: "navigating, listing, and manipulating files",
    description:
      "The building blocks of working in a terminal — moving around directories, listing files, copying, moving, and deleting.",
    subsections: [
      {
        title: "Navigating directories",
        text: [
          "`cd` changes your current directory. Without arguments it goes to your home directory. `pwd` prints where you are:",
          "`~` is shorthand for your home directory. `..` means one level up. `-` toggles to the previous directory.",
        ],
        codeBlocks: [
          { label: "Go to home directory", code: "cd ~" },
          { label: "Go up one level", code: "cd .." },
          { label: "Go to an absolute path", code: "cd /var/log" },
          { label: "Go back to previous directory", code: "cd -" },
          { label: "Print working directory", code: "pwd" },
        ],
        exercises: [
          {
            prompt: "Change to your home directory.",
            answer: "cd",
            aliases: ["cd ~", "cd ~/", "cd \"$HOME\""],
            explanation:
              "`cd` without arguments goes to `$HOME`. `cd ~` is equivalent.",
          },
          {
            prompt: "Print the current working directory.",
            answer: "pwd",
            explanation:
              "`pwd` (print working directory) shows where you are in the filesystem.",
          },
        ],
      },
      {
        title: "Listing files",
        text: [
          "`ls` lists directory contents. Add flags for detail and hidden files:",
          "`-l` shows permissions, owner, size, and date. `-a` shows hidden files (dotfiles). `-h` makes sizes human-readable.",
        ],
        codeBlocks: [
          { label: "Basic listing", code: "ls" },
          { label: "Long format with hidden files", code: "ls -la" },
          { label: "Human-readable sizes", code: "ls -lh" },
          { label: "Sort by modification time", code: "ls -lt" },
          { label: "Show only directories", code: "ls -d */" },
        ],
        exercises: [
          {
            prompt: "List all files including hidden ones in long format.",
            answer: "ls -la",
            aliases: ["ls -al", "ls -l -a", "ls -a -l"],
            explanation:
              "`-l` gives long format, `-a` shows dotfiles. Order doesn't matter.",
          },
        ],
      },
      {
        title: "Copying, moving, and deleting",
        text: [
          "`cp` copies files and directories. Use `-r` for directories. `mv` moves or renames. `rm` deletes permanently — there's no trash can in the terminal:",
          "There is no `undo` for `rm`. Triple-check before pressing Enter, especially with wildcards.",
        ],
        codeBlocks: [
          { label: "Copy a file", code: "cp file.txt backup.txt" },
          { label: "Copy a directory recursively", code: "cp -r dir1/ dir2/" },
          { label: "Move / rename a file", code: "mv old.txt new.txt" },
          { label: "Move into a directory", code: "mv file.txt ~/Downloads/" },
          { label: "Delete a file", code: "rm file.txt" },
          { label: "Delete a directory and its contents", code: "rm -rf directory/" },
        ],
        exercises: [
          {
            prompt: "Copy the file `data.csv` to `backup.csv` in the same directory.",
            answer: "cp data.csv backup.csv",
            explanation:
              "`cp source dest` makes an exact copy at the destination path.",
          },
          {
            prompt: "Move `config.yaml` into the `etc/` directory.",
            answer: "mv config.yaml etc/",
            aliases: ["mv config.yaml ./etc/"],
            explanation:
              "`mv` moves files to a directory when the destination ends with `/`.",
          },
          {
            prompt: "Remove the file `temp.log`.",
            answer: "rm temp.log",
            explanation:
              "`rm` deletes files permanently. Use `rm -i` for an interactive prompt.",
          },
        ],
      },
      {
        title: "Wildcards and globs",
        text: [
          "Glob patterns let you match multiple files at once. They're expanded by the shell before the command runs:",
        ],
        codeBlocks: [
          { label: "All files", code: "ls *.txt" },
          { label: "Single character wildcard", code: "ls file?.log" },
          { label: "Character set", code: "ls [abc]*.csv" },
          { label: "Everything starting with data", code: "ls data*" },
        ],
        exercises: [
          {
            prompt: "List all `.conf` files in the current directory.",
            answer: "ls *.conf",
            explanation:
              "`*` matches any characters, so `*.conf` matches all files ending in `.conf`.",
          },
        ],
      },
    ],
  },
  {
    id: "shell-pipes",
    title: "Pipes & Redirection",
    tagline: "chaining commands and controlling input/output",
    description:
      "The pipe `|` connects commands so the output of one feeds into the next. Redirection lets you send output to files instead of the screen.",
    subsections: [
      {
        title: "Piping output",
        text: [
          "The pipe `|` sends stdout of the left command to stdin of the right command. This is where the shell becomes powerful — small tools composed into powerful workflows:",
        ],
        codeBlocks: [
          { label: "Count files in a directory", code: "ls | wc -l" },
          { label: "Find large files", code: "ls -lh | sort -k5 -h" },
          { label: "Search command history", code: "history | grep ssh" },
          { label: "Chain three commands", code: "cat access.log | grep 404 | wc -l" },
        ],
        exercises: [
          {
            prompt: "Count the number of files listed by `ls -1`.",
            answer: "ls -1 | wc -l",
            aliases: ["ls | wc -l", "ls -1 | wc -l"],
            explanation:
              "`|` sends `ls` output to `wc -l` which counts lines.",
          },
        ],
      },
      {
        title: "Redirecting stdout and stderr",
        text: [
          "`>` sends stdout to a file (overwriting). `>>` appends. `2>` redirects stderr. `&>` sends both stdout and stderr to a file:",
        ],
        codeBlocks: [
          { label: "Overwrite a file", code: "echo 'hello' > output.txt" },
          { label: "Append to a file", code: "echo 'world' >> output.txt" },
          { label: "Suppress errors", code: "find / -name '*.conf' 2>/dev/null" },
          { label: "Save both stdout and stderr", code: "make 2>&1 > build.log" },
          { label: "Discard all output", code: "command > /dev/null 2>&1" },
        ],
        exercises: [
          {
            prompt: "Append the text `done` to `log.txt`.",
            answer: "echo done >> log.txt",
            aliases: ["echo 'done' >> log.txt", "echo \"done\" >> log.txt"],
            explanation:
              "`>>` appends to a file; `>` would overwrite it.",
          },
          {
            prompt: "Run `find /etc` and discard all output (stdout and stderr).",
            answer: "find /etc > /dev/null 2>&1",
            aliases: [
              "find /etc &> /dev/null",
              "find /etc 2>&1 > /dev/null",
              "find /etc >/dev/null 2>&1",
              "find /etc 1>/dev/null 2>&1",
            ],
            explanation:
              "`/dev/null` is a black hole — everything sent there vanishes.",
          },
        ],
      },
      {
        title: "Standard input and here documents",
        text: [
          "Commands that read stdin can receive input from pipes, files, or inline text. A here document (`<<EOF`) lets you embed multi-line input directly:",
        ],
        codeBlocks: [
          {
            label: "Pipe text into a command",
            code: "echo 'hello world' | tr ' ' '\\n'",
          },
          {
            label: "Here document",
            code: "cat <<EOF\nline 1\nline 2\nline 3\nEOF",
          },
          {
            label: "Here document into a file",
            code: "cat > config.yml <<EOF\nhost: localhost\nport: 8080\nEOF",
          },
        ],
        exercises: [
          {
            prompt: "Use a here document to write two lines to `data.txt`.",
            answer: "cat > data.txt <<EOF",
            explanation:
              "`<<EOF` starts a here document. End the input with `EOF` on its own line.",
          },
        ],
      },
    ],
  },
  {
    id: "shell-text-processing",
    title: "Text Processing",
    tagline: "grep, sed, awk, sort, cut, and tr",
    description:
      "The terminal has its own text processing toolkit — search patterns with grep, transform text with sed, extract columns with awk, and reshape data with sort, cut, and tr.",
    subsections: [
      {
        title: "grep — searching text",
        text: [
          "`grep` searches lines for patterns. It's the most-used text search tool in the terminal:",
          "`-i` ignores case. `-r` searches recursively. `-n` shows line numbers. `-v` inverts the match.",
        ],
        codeBlocks: [
          { label: "Search for a string", code: "grep 'error' logfile.txt" },
          { label: "Case-insensitive search", code: "grep -i 'error' logfile.txt" },
          { label: "Recursive search in a directory", code: "grep -r 'TODO' src/" },
          { label: "Show line numbers", code: "grep -n 'function' script.sh" },
          { label: "Invert match (lines NOT containing)", code: "grep -v 'debug' log.txt" },
          { label: "Count matches", code: "grep -c '404' access.log" },
          { label: "Extended regex (egrep)", code: "grep -E 'err(or|no)' log.txt" },
        ],
        exercises: [
          {
            prompt: "Search recursively for `FIXME` in the `src/` directory.",
            answer: "grep -r FIXME src/",
            aliases: [
              "grep -rn FIXME src/",
              "grep -r 'FIXME' src/",
              "grep -r \"FIXME\" src/",
            ],
            explanation:
              "`-r` searches all files recursively in the directory.",
          },
          {
            prompt: "Count how many lines in `access.log` contain `500`.",
            answer: "grep -c 500 access.log",
            aliases: ["grep -c '500' access.log", "grep -c \"500\" access.log"],
            explanation:
              "`-c` counts matching lines instead of printing them.",
          },
        ],
      },
      {
        title: "sed — stream editing",
        text: [
          "`sed` performs substitutions and transformations on text streams. The `s/find/replace/` syntax is the most common pattern:",
          "Use `-i` to edit files in place (always back up first!). Use `-n` with `p` to print only matching lines.",
        ],
        codeBlocks: [
          { label: "Replace first match per line", code: "sed 's/old/new/' file.txt" },
          { label: "Replace all matches per line", code: "sed 's/old/new/g' file.txt" },
          { label: "Edit file in place", code: "sed -i 's/old/new/g' config.txt" },
          { label: "Delete lines matching a pattern", code: "sed '/^#/d' config.txt" },
          { label: "Print only lines 5-10", code: "sed -n '5,10p' file.txt" },
        ],
        exercises: [
          {
            prompt: "Replace all occurrences of `foo` with `bar` in `file.txt` (print to stdout).",
            answer: "sed 's/foo/bar/g' file.txt",
            aliases: [
              "sed 's/foo/bar/g' < file.txt",
              "sed s/foo/bar/g file.txt",
            ],
            explanation:
              "`s/foo/bar/g` substitutes every `foo` with `bar` per line. Without `-g` only the first match per line is replaced.",
          },
        ],
      },
      {
        title: "awk — column processing",
        text: [
          "`awk` splits each line into fields and lets you operate on them. Fields are numbered `$1`, `$2`, etc. `$0` is the whole line:",
        ],
        codeBlocks: [
          { label: "Print the first column", code: "awk '{print $1}' data.txt" },
          { label: "Print columns 1 and 3", code: "awk '{print $1, $3}' data.txt" },
          { label: "Filter by column value", code: "awk '$3 > 100' data.txt" },
          { label: "Custom delimiter", code: "awk -F: '{print $1}' /etc/passwd" },
          { label: "Sum a column", code: "awk '{sum += $2} END {print sum}' data.txt" },
        ],
        exercises: [
          {
            prompt: "Print the third column of `data.tsv`.",
            answer: "awk '{print $3}' data.tsv",
            aliases: [
              "awk '{print $3}' < data.tsv",
              "awk '{print $3}' data.txt",
            ],
            explanation:
              "`$3` is the third whitespace-delimited field. Use `-F` for a custom delimiter.",
          },
        ],
      },
      {
        title: "sort, cut, uniq, tr",
        text: [
          "These utilities reshape and transform text. They're often combined with pipes:",
          "`sort -u` is equivalent to `sort | uniq`. `tr` translates or deletes individual characters.",
        ],
        codeBlocks: [
          { label: "Sort alphabetically", code: "sort names.txt" },
          { label: "Sort numerically", code: "sort -n numbers.txt" },
          { label: "Remove duplicates", code: "sort names.txt | uniq" },
          { label: "Cut specific fields", code: "cut -d: -f1,3 /etc/passwd" },
          { label: "Lowercase to uppercase", code: "tr 'a-z' 'A-Z' < input.txt" },
          { label: "Delete specific characters", code: "tr -d '\\r' < file.txt" },
        ],
        exercises: [
          {
            prompt: "Sort `names.txt` numerically.",
            answer: "sort -n names.txt",
            aliases: ["sort -n < names.txt"],
            explanation:
              "`-n` sorts by numeric value instead of lexicographic order.",
          },
          {
            prompt: "Remove duplicate lines from `data.txt` and sort the result.",
            answer: "sort -u data.txt",
            aliases: [
              "sort data.txt | uniq",
              "sort data.txt | uniq -u",
              "sort -u < data.txt",
            ],
            explanation:
              "`sort -u` is shorthand for `sort | uniq` — it sorts and deduplicates.",
          },
        ],
      },
    ],
  },
  {
    id: "shell-permissions",
    title: "Permissions & Ownership",
    tagline: "chmod, chown, and understanding rwx",
    description:
      "Unix permissions control who can read, write, and execute files. Understanding octal notation and ownership is essential for system administration.",
    subsections: [
      {
        title: "Understanding permissions",
        text: [
          "Every file has three permission sets: owner, group, and others. Each set has three bits: read (r), write (w), execute (x):",
          "In `ls -l`, the first column shows permissions: `-rwxr-xr--` means the owner has full access, group can read and execute, others can only read.",
        ],
        codeBlocks: [
          { label: "View permissions", code: "ls -l file.txt" },
          {
            label: "Permission breakdown",
            code: `- rwx r-x r--\n  │   │   └── others: read\n  │   └────── group: read, execute\n  └────────── owner: read, write, execute`,
          },
        ],
        exercises: [
          {
            prompt: "What permissions does `-rwxr-x---` give to the owner?",
            answer: "read, write, execute",
            aliases: [
              "rwx",
              "read, write, execute",
              "read write execute",
              "read+write+execute",
            ],
            explanation:
              "The first triplet `rwx` means the owner can read, write, and execute.",
          },
        ],
      },
      {
        title: "chmod — changing permissions",
        text: [
          "Octal notation uses numbers: 4=read, 2=write, 1=execute. Add them up for each set:",
          "Symbolic notation is more readable for specific changes:",
        ],
        codeBlocks: [
          { label: "Owner: rwx, Group: r-x, Others: r--", code: "chmod 754 file.txt" },
          { label: "Make executable", code: "chmod +x script.sh" },
          { label: "Remove write for everyone", code: "chmod a-w file.txt" },
          { label: "Owner full, group read only", code: "chmod u=rw,g=r file.txt" },
          { label: "Recursive", code: "chmod -R 755 directory/" },
        ],
        exercises: [
          {
            prompt: "Make `deploy.sh` executable for the owner only.",
            answer: "chmod u+x deploy.sh",
            aliases: ["chmod +x deploy.sh"],
            explanation:
              "`u+x` adds execute permission for the owner. `+x` adds it for everyone.",
          },
          {
            prompt: "Set permissions to 644 on `config.yaml`.",
            answer: "chmod 644 config.yaml",
            explanation:
              "644 = owner read+write (6), group read (4), others read (4). Common for config files.",
          },
        ],
      },
      {
        title: "chown — changing ownership",
        text: [
          "`chown` changes the owner and/or group of a file. You need root (sudo) for this:",
        ],
        codeBlocks: [
          { label: "Change owner", code: "sudo chown alice file.txt" },
          { label: "Change owner and group", code: "sudo chown alice:developers file.txt" },
          { label: "Recursive", code: "sudo chown -R alice:alice directory/" },
        ],
        exercises: [
          {
            prompt: "Change the owner of `app.log` to `alice`.",
            answer: "sudo chown alice app.log",
            aliases: ["chown alice app.log"],
            explanation:
              "`chown` changes file ownership. `sudo` is usually required.",
          },
        ],
      },
      {
        title: "Finding files",
        text: [
          "`find` searches the filesystem for files matching criteria. It's far more powerful than `locate`:",
        ],
        codeBlocks: [
          { label: "Find by name", code: "find / -name '*.conf' 2>/dev/null" },
          { label: "Find by type (file or directory)", code: "find . -type f -name '*.py'" },
          { label: "Find by size", code: "find . -size +100M" },
          { label: "Find by modification time", code: "find . -mtime -7  # modified in last 7 days" },
          { label: "Execute on each result", code: "find . -name '*.tmp' -exec rm {} +" },
        ],
        exercises: [
          {
            prompt: "Find all `.log` files under `/var` that are larger than 10MB.",
            answer: "find /var -name '*.log' -size +10M",
            aliases: ["find /var -name '*.log' -size +10M 2>/dev/null"],
            explanation:
              "`-name` matches by name pattern, `-size` filters by file size.",
          },
        ],
      },
    ],
  },
  {
    id: "shell-processes",
    title: "Process Management",
    tagline: "ps, top, kill, and background processes",
    description:
      "Running and managing processes in the terminal — from viewing what's running to killing unresponsive programs and running jobs in the background.",
    subsections: [
      {
        title: "Viewing processes",
        text: [
          "`ps` shows running processes. `top` and `htop` give a live-updating view:",
        ],
        codeBlocks: [
          { label: "Your processes", code: "ps aux" },
          { label: "Tree view", code: "ps auxf" },
          { label: "Live top", code: "top" },
          { label: "Filter by name", code: "ps aux | grep nginx" },
        ],
        exercises: [
          {
            prompt: "Show all running processes in BSD format.",
            answer: "ps aux",
            aliases: ["ps -aux", "ps -ef"],
            explanation:
              "`aux` shows all users' processes in user-oriented format.",
          },
        ],
      },
      {
        title: "Killing processes",
        text: [
          "`kill` sends a signal to a process. The most common signals are `SIGTERM` (15, default) and `SIGKILL` (9, force):",
          "Always try `SIGTERM` first — it lets the process clean up. Use `SIGKILL` only as a last resort.",
        ],
        codeBlocks: [
          { label: "Graceful termination", code: "kill 1234" },
          { label: "Force kill", code: "kill -9 1234" },
          { label: "Kill by name", code: "killall nginx" },
          { label: "Kill your own processes matching a name", code: "pkill -u $USER node" },
        ],
        exercises: [
          {
            prompt: "Force kill process with PID 5678.",
            answer: "kill -9 5678",
            aliases: ["kill -KILL 5678", "kill -SIGKILL 5678"],
            explanation:
              "`-9` sends SIGKILL, which immediately terminates the process.",
          },
        ],
      },
      {
        title: "Background and foreground",
        text: [
          "`&` runs a command in the background. `Ctrl-Z` suspends the current process. `bg` resumes it in the background. `fg` brings it to the foreground:",
        ],
        codeBlocks: [
          { label: "Run in background", code: "long-command &" },
          { label: "Suspend current process", code: "# press Ctrl-Z" },
          { label: "Resume in background", code: "bg" },
          { label: "Bring to foreground", code: "fg" },
          { label: "List background jobs", code: "jobs" },
        ],
        exercises: [
          {
            prompt: "Run `sleep 100` in the background.",
            answer: "sleep 100 &",
            explanation:
              "`&` at the end runs the command in the background, returning you to the prompt.",
          },
        ],
      },
      {
        title: "Disk and system info",
        text: [
          "Quick ways to check disk usage, memory, and system information:",
        ],
        codeBlocks: [
          { label: "Disk usage", code: "df -h" },
          { label: "Directory sizes", code: "du -sh *" },
          { label: "Memory usage", code: "free -h" },
          { label: "System info", code: "uname -a" },
          { label: "Environment variables", code: "env" },
        ],
        exercises: [
          {
            prompt: "Show disk usage in human-readable format.",
            answer: "df -h",
            explanation:
              "`-h` makes sizes human-readable (KB, MB, GB).",
          },
        ],
      },
    ],
  },
  {
    id: "shell-scripting",
    title: "Shell Scripting",
    tagline: "variables, conditionals, loops, and functions",
    description:
      "Write reusable scripts to automate tasks — variables for data, conditionals for decisions, loops for repetition, and functions for organization.",
    subsections: [
      {
        title: "Variables and strings",
        text: [
          "Variables in bash have no type — they hold strings by default. Use `$var` to access, `${var}` for clarity, and `\"$var\"` to prevent word splitting:",
          "Always quote variables in double quotes unless you specifically want word splitting. This prevents bugs with spaces in values.",
        ],
        codeBlocks: [
          { label: "Assign a variable", code: "name=\"alice\"" },
          { label: "Use a variable", code: "echo \"Hello, $name\"" },
          { label: "String length", code: "echo \"${#name}\"" },
          { label: "Default value", code: "echo \"${user:-guest}\"" },
          { label: "Command substitution", code: "today=$(date +%Y-%m-%d)" },
          { label: "Array", code: "colors=(red green blue)\necho \"${colors[1]}\"  # green" },
        ],
        exercises: [
          {
            prompt: "Set a variable called `path` to `/var/log` and print it.",
            answer: "path=/var/log && echo $path",
            aliases: [
              "path=/var/log; echo $path",
              "export path=/var/log; echo $path",
            ],
            explanation:
              "No spaces around `=` in assignment. Use `export` to make it available to child processes.",
          },
        ],
      },
      {
        title: "Conditionals",
        text: [
          "`if` / `elif` / `else` blocks test conditions. Use `[ ]` for POSIX tests or `[[ ]]` for bash-specific features (regex, pattern matching):",
          "`-f` tests if a file exists, `-d` tests for a directory, `-z` tests for empty string, `-eq` tests equality.",
        ],
        codeBlocks: [
          {
            label: "Basic if/else",
            code: "if [ -f config.yaml ]; then\n  echo \"config found\"\nelse\n  echo \"no config\"\nfi",
          },
          {
            label: "String comparison",
            code: 'if [[ "$name" == "alice" ]]; then\n  echo "welcome"\nfi',
          },
          {
            label: "Numeric comparison",
            code: "if [ $count -gt 10 ]; then\n  echo \"too many\"\nfi",
          },
          {
            label: "Test a command's exit code",
            code: "if command -v docker &>/dev/null; then\n  echo \"docker is installed\"\nfi",
          },
        ],
        exercises: [
          {
            prompt:
              "Check if a file called `data.csv` exists and print `found` if it does.",
            answer: "if [ -f data.csv ]; then echo found; fi",
            aliases: [
              "if [[ -f data.csv ]]; then echo found; fi",
              "test -f data.csv && echo found",
              "[ -f data.csv ] && echo found",
            ],
            explanation:
              "`-f` returns true if the path exists and is a regular file.",
          },
        ],
      },
      {
        title: "Loops",
        text: [
          "`for` loops iterate over lists. `while` loops run as long as a condition is true:",
        ],
        codeBlocks: [
          {
            label: "For loop over a list",
            code: "for f in *.txt; do\n  echo \"$f\"\ndone",
          },
          {
            label: "C-style for loop",
            code: "for ((i=1; i<=5; i++)); do\n  echo \"$i\"\ndone",
          },
          {
            label: "While loop",
            code: "while read -r line; do\n  echo \"$line\"\ndone < file.txt",
          },
          {
            label: "Read command line arguments",
            code: "for arg in \"$@\"; do\n  echo \"$arg\"\ndone",
          },
        ],
        exercises: [
          {
            prompt: "Loop over all `.log` files and print each filename.",
            answer: "for f in *.log; do echo $f; done",
            aliases: [
              "for f in *.log; do echo \"$f\"; done",
              "for f in *.log\ndo\necho $f\ndone",
            ],
            explanation:
              "`for ... in *.log` iterates over all files matching the glob.",
          },
        ],
      },
      {
        title: "Functions",
        text: [
          "Functions group reusable logic. Use `return` for exit codes and `echo` for output:",
          "Functions are called like commands: `my_function arg1 arg2`. Parameters are `$1`, `$2`, etc.",
        ],
        codeBlocks: [
          {
            label: "Basic function",
            code: "greet() {\n  echo \"Hello, $1!\"\n}\ngreet alice",
          },
          {
            label: "Function returning a value",
            code: "is_port_open() {\n  if nc -z \"localhost\" \"$1\" 2>/dev/null; then\n    return 0\n  fi\n  return 1\n}\nif is_port_open 8080; then\n  echo \"port 8080 is open\"\nfi",
          },
          {
            label: "Collecting output",
            code: "get_files() {\n  local dir=\"${1:-.}\"\n  find \"$dir\" -type f -name \"*.sh\"\n}\nfiles=$(get_files /opt)",
          },
        ],
        exercises: [
          {
            prompt:
              "Define a function called `backup` that copies a file with a `.bak` extension.",
            answer: "backup() { cp \"$1\" \"$1.bak\"; }",
            aliases: [
              "backup() { cp $1 $1.bak; }",
              "backup() { cp \"$1\" \"$1\".bak; }",
            ],
            explanation:
              "`$1` is the first argument. The function wraps `cp` to add `.bak`.",
          },
        ],
      },
    ],
  },
  {
    id: "shell-job-control",
    title: "Job Control & Shortcuts",
    tagline: "screen, tmux, and shell keyboard shortcuts",
    description:
      "Master your terminal workflow — detach sessions, split panes, use keyboard shortcuts to navigate and edit faster, and avoid re-typing long commands.",
    subsections: [
      {
        title: "Shell keyboard shortcuts",
        text: [
          "These shortcuts work in bash and zsh. They save enormous amounts of time once they become muscle memory:",
        ],
        codeBlocks: [
          { label: "Move cursor to start of line", code: "Ctrl-A" },
          { label: "Move cursor to end of line", code: "Ctrl-E" },
          { label: "Delete word backward", code: "Ctrl-W" },
          { label: "Delete to end of line", code: "Ctrl-K" },
          { label: "Yank (paste) last deletion", code: "Ctrl-Y" },
          { label: "Search command history", code: "Ctrl-R" },
          { label: "Clear the screen", code: "Ctrl-L" },
        ],
        exercises: [
          {
            prompt: "What shortcut moves the cursor to the beginning of the line?",
            answer: "Ctrl-A",
            aliases: ["ctrl-a", "C-a"],
            explanation:
              "Ctrl-A jumps to the start of the line, like Home but without reaching for the arrow keys.",
          },
          {
            prompt: "What shortcut searches backwards through command history?",
            answer: "Ctrl-R",
            aliases: ["ctrl-r", "C-r"],
            explanation:
              "Ctrl-R starts reverse-i-search — start typing to find matching commands.",
          },
        ],
      },
      {
        title: "Command history",
        text: [
          "The shell remembers every command you've run. Use history expansion to reuse past commands quickly:",
        ],
        codeBlocks: [
          { label: "Show history", code: "history" },
          { label: "Run last command", code: "!!" },
          { label: "Run last command with sudo", code: "sudo !!" },
          { label: "Replace text in last command", code: "^old^new^" },
          { label: "Last argument of previous command", code: " !$" },
        ],
        exercises: [
          {
            prompt: "How do you re-run the last command with `sudo` prepended?",
            answer: "sudo !!",
            explanation:
              "`!!` expands to the entire last command. `sudo !!` runs it as root.",
          },
        ],
      },
      {
        title: "Chaining and grouping",
        text: [
          "Control command execution flow with operators that chain or group commands:",
        ],
        codeBlocks: [
          { label: "Run sequentially", code: "cmd1 && cmd2" },
          { label: "Run if first fails", code: "cmd1 || cmd2" },
          { label: "Group in subshell", code: "(cmd1; cmd2; cmd3)" },
          { label: "Group in current shell", code: "{ cmd1; cmd2; cmd3; }" },
          { label: "Run in background, check later", code: "cmd1 &\necho \"started\"\nwait" },
        ],
        exercises: [
          {
            prompt: "Run `make` and only run `make install` if the build succeeds.",
            answer: "make && make install",
            explanation:
              "`&&` chains commands — the second only runs if the first succeeds (exit code 0).",
          },
        ],
      },
      {
        title: "Aliases and functions",
        text: [
          "Aliases are shortcuts for commands. Define them in `~/.bashrc` or `~/.zshrc`:",
          "Use functions instead of aliases when you need arguments or logic.",
        ],
        codeBlocks: [
          {
            label: "Useful aliases",
            code: `alias ll='ls -la'
alias gs='git status'
alias gp='git pull'
alias docker-clean='docker rm -f $(docker ps -aq)'`,
          },
          {
            label: "Persistent function",
            code: "# Add to ~/.bashrc or ~/.zshrc\nmkcd() {\n  mkdir -p \"$1\" && cd \"$1\"\n}",
          },
        ],
        exercises: [
          {
            prompt: "Create an alias `ll` that lists all files in long format.",
            answer: "alias ll='ls -la'",
            aliases: ["alias ll='ls -al'", "alias ll=\"ls -la\""],
            explanation:
              "`alias name='command'` creates a shortcut. Add it to your rc file for persistence.",
          },
        ],
      },
    ],
  },
];
