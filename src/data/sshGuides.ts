/**
 * SSH guides — structured walkthroughs that teach concepts with
 * explanations, examples, and inline exercises.
 */

export interface GuideExercise {
  /** Short prompt asking the user to type a command. */
  prompt: string;
  /** The expected answer. */
  answer: string;
  /** Extra accepted spellings. */
  aliases?: string[];
  /** Shown after answering. */
  explanation: string;
}

export interface GuideSubsection {
  /** Subsection heading. */
  title: string;
  /** Markdown-like prose explaining the concept. */
  text: string[];
  /** Optional terminal-style code blocks. */
  codeBlocks?: { label?: string; code: string }[];
  /** Interactive exercises at the end of this subsection. */
  exercises?: GuideExercise[];
}

export interface GuideSection {
  /** Unique id for the section. */
  id: string;
  /** Section title shown in the nav and header. */
  title: string;
  /** One-line tagline. */
  tagline: string;
  /** Longer description. */
  description: string;
  /** Subsections making up the guide. */
  subsections: GuideSubsection[];
}

export const sshGuides: GuideSection[] = [
  {
    id: "ssh-fundamentals",
    title: "SSH Fundamentals",
    tagline: "connecting, authenticating, and running remote commands",
    description:
      "The essential building blocks of every SSH session — from your first connection to running commands without a shell.",
    subsections: [
      {
        title: "Your first connection",
        text: [
          "SSH (Secure Shell) gives you an encrypted terminal session on a remote machine. The simplest form is:",
          "SSH tries to log you in with your current local username. If the remote user is different, specify it before the `@`.",
          "On first connection, SSH asks you to verify the host key fingerprint. This prevents man-in-the-middle attacks — type `yes` to continue. The key is saved in `~/.ssh/known_hosts`.",
        ],
        codeBlocks: [
          { code: "ssh user@hostname" },
        ],
        exercises: [
          {
            prompt: "Connect to `example.com` as user `alice`.",
            answer: "ssh alice@example.com",
            explanation:
              "`ssh user@host` opens an encrypted shell. The `user@` prefix picks the login name.",
          },
          {
            prompt: "Connect to `example.com` as user `alice` over port `2222`.",
            answer: "ssh -p 2222 alice@example.com",
            aliases: [
              "ssh -p2222 alice@example.com",
              "ssh alice@example.com -p 2222",
              "ssh alice@example.com -p2222",
            ],
            explanation:
              "`-p` sets the port. Watch the case: ssh uses lowercase `-p`, scp uses uppercase `-P`.",
          },
        ],
      },
      {
        title: "Running remote commands",
        text: [
          "You don't need an interactive shell to use SSH. Any arguments after the host are executed remotely and the connection closes when they finish:",
          "Always quote the remote command when it uses shell features like pipes, redirects, or variable expansion. Without quotes, your local shell would interpret them.",
        ],
        codeBlocks: [
          { label: "Run a single command", code: "ssh user@host uptime" },
          {
            label: "Chain multiple commands",
            code: "ssh user@host 'cd /var/log && ls -la'",
          },
        ],
        exercises: [
          {
            prompt: "Run `df -h` on `example.com` without opening an interactive shell.",
            answer: "ssh example.com df -h",
            aliases: [
              "ssh user@example.com df -h",
              "ssh example.com df\n",
            ],
            explanation:
              "Anything after the host is run as a single remote command — SSH executes it and exits.",
          },
        ],
      },
      {
        title: "Logging in as a different user",
        text: [
          "The `-l` flag is the explicit form of the `user@` syntax. Both are equivalent:",
        ],
        codeBlocks: [
          { code: "ssh -l bob example.com" },
          { code: "ssh bob@example.com" },
        ],
        exercises: [
          {
            prompt: "Connect to `example.com`, logging in as user `bob`.",
            answer: "ssh -l bob example.com",
            aliases: [
              "ssh bob@example.com",
              "ssh example.com -l bob",
            ],
            explanation:
              "`-l` is the flag form of the `user@` syntax.",
          },
        ],
      },
      {
        title: "Debugging with verbose mode",
        text: [
          "When a connection fails, verbose mode is your first stop. Add `-v` (or `-vv`, `-vvv`) to see exactly what SSH is doing — key exchange, authentication, forwarding:",
        ],
        codeBlocks: [
          { code: "ssh -v user@host" },
          { code: "ssh -vvv user@host  # maximum detail" },
        ],
        exercises: [
          {
            prompt: "Connect to `example.com` with verbose output to debug a failing connection.",
            answer: "ssh -v alice@example.com",
            aliases: [
              "ssh -vv alice@example.com",
              "ssh -vvv alice@example.com",
            ],
            explanation:
              "`-v` prints connection debug info; more `v`s give progressively more detail.",
          },
        ],
      },
    ],
  },
  {
    id: "ssh-keys",
    title: "Keys & Authentication",
    tagline: "passwordless login with key pairs",
    description:
      "Public-key authentication is more secure and more convenient than passwords. Generate a key pair, copy the public key to the server, and never type a password again.",
    subsections: [
      {
        title: "Generating a key pair",
        text: [
          "ed25519 is the modern default — fast, small, and secure. RSA is only needed for older systems:",
          "The command creates two files in `~/.ssh/`: a private key (`id_ed25519`) and a public key (`id_ed25519.pub`). Never share the private key.",
          "Add a comment with `-C` to identify the key's purpose — conventionally your email:",
        ],
        codeBlocks: [
          {
            label: "Recommended (ed25519)",
            code: "ssh-keygen -t ed25519",
          },
          {
            label: "Legacy (RSA 4096-bit)",
            code: "ssh-keygen -t rsa -b 4096",
          },
          { code: "ssh-keygen -t ed25519 -C 'alice@example.com'" },
        ],
        exercises: [
          {
            prompt: "Generate a new ed25519 SSH key pair.",
            answer: "ssh-keygen -t ed25519",
            explanation:
              "`ed25519` is the modern default; it prompts for a file and passphrase.",
          },
          {
            prompt: "Generate a 4096-bit RSA key for a legacy server.",
            answer: "ssh-keygen -t rsa -b 4096",
            aliases: [
              "ssh-keygen -b 4096 -t rsa",
            ],
            explanation:
              "`-b 4096` sets the strength. Older servers may still require RSA.",
          },
        ],
      },
      {
        title: "Copying your key to the server",
        text: [
          "`ssh-copy-id` appends your public key to the server's `~/.ssh/authorized_keys` file, enabling passwordless login:",
          "You'll be prompted for your password one last time. After that, SSH uses key-based auth automatically.",
        ],
        codeBlocks: [
          { code: "ssh-copy-id user@example.com" },
          {
            label: "With a non-standard port",
            code: "ssh-copy-id -p 2222 user@example.com",
          },
        ],
        exercises: [
          {
            prompt: "Install your public key on `example.com` for passwordless login.",
            answer: "ssh-copy-id user@example.com",
            aliases: [
              "ssh-copy-id alice@example.com",
              "ssh-copy-id bob@example.com",
              "ssh-copy-id root@example.com",
              "ssh-copy-id admin@example.com",
            ],
            explanation:
              "`ssh-copy-id` appends your pubkey to the host's `~/.ssh/authorized_keys`.",
          },
        ],
      },
      {
        title: "Managing the SSH agent",
        text: [
          "The SSH agent caches your decrypted keys so you don't have to re-enter your passphrase for every connection:",
          "Add `AddKeysToAgent yes` to your `~/.ssh/config` so `ssh-add` runs automatically when needed.",
        ],
        codeBlocks: [
          { label: "Start the agent", code: "eval $(ssh-agent)" },
          { label: "Add a key", code: "ssh-add" },
          { label: "List loaded keys", code: "ssh-add -l" },
          { label: "Kill the agent", code: "ssh-agent -k" },
        ],
        exercises: [
          {
            prompt: "Start an SSH agent in the background and export its env vars.",
            answer: "eval $(ssh-agent)",
            aliases: [
              "eval \"$(ssh-agent)\"",
            ],
            explanation:
              "`eval $(ssh-agent)` starts the agent and exports `SSH_AUTH_SOCK` for this shell.",
          },
          {
            prompt: "Load your default SSH key into the agent.",
            answer: "ssh-add",
            explanation:
              "`ssh-add` loads `~/.ssh/id_ed25519` (and other defaults) into a running agent.",
          },
        ],
      },
      {
        title: "Key file permissions",
        text: [
          "SSH is strict about file permissions. If they're too open, SSH refuses to use the key:",
        ],
        codeBlocks: [
          {
            label: "Private key — owner only",
            code: "chmod 600 ~/.ssh/id_ed25519",
          },
          {
            label: "authorized_keys — owner only",
            code: "chmod 600 ~/.ssh/authorized_keys",
          },
          {
            label: "~/.ssh directory",
            code: "chmod 700 ~/.ssh",
          },
        ],
        exercises: [
          {
            prompt: "Fix permissions on your private key after copying it to a new machine.",
            answer: "chmod 600 ~/.ssh/id_ed25519",
            aliases: [
              "chmod 600 ~/.ssh/id_rsa",
              "chmod 600 ~/.ssh/id_dsa",
              "chmod 600 ~/.ssh/id_ecdsa",
            ],
            explanation:
              "Private keys must be owner-only (600) or SSH rejects them.",
          },
        ],
      },
    ],
  },
  {
    id: "ssh-config",
    title: "SSH Config",
    tagline: "aliases, defaults, and per-host settings",
    description:
      "The `~/.ssh/config` file turns long commands into short aliases and lets you set per-host defaults for user, key, port, and more.",
    subsections: [
      {
        title: "Host blocks",
        text: [
          "Each `Host` block matches one or more hostnames and sets options for them. Once configured, `ssh web` is all you need:",
        ],
        codeBlocks: [
          {
            label: "~/.ssh/config",
            code: `Host web
  HostName example.com
  User alice
  IdentityFile ~/.ssh/id_ed25519
  Port 22`,
          },
        ],
        exercises: [
          {
            prompt: "Define a config alias `web` for `alice@example.com` with your ed25519 key.",
            answer:
              "Host web\n  HostName example.com\n  User alice\n  IdentityFile ~/.ssh/id_ed25519",
            explanation:
              "A `Host` block binds options to an alias: `ssh web` then uses all of them.",
          },
        ],
      },
      {
        title: "Global defaults",
        text: [
          "A `Host *` block applies to every connection — perfect for keepalive and agent forwarding:",
        ],
        codeBlocks: [
          {
            label: "~/.ssh/config",
            code: `Host *
  ServerAliveInterval 30
  ServerAliveCountMax 3
  AddKeysToAgent yes
  ForwardAgent yes`,
          },
        ],
        exercises: [
          {
            prompt: "In SSH config, set a global keepalive interval of 30 seconds for all hosts.",
            answer: "ServerAliveInterval 30",
            explanation:
              "Under a `Host *` block, `ServerAliveInterval 30` applies everywhere.",
          },
        ],
      },
      {
        title: "Wildcard patterns",
        text: [
          "Host patterns support `*` and `?` globs, so a single block can cover many hosts:",
        ],
        codeBlocks: [
          {
            label: "~/.ssh/config",
            code: `Host *.staging.internal
  User deploy
  IdentityFile ~/.ssh/staging_key
  ProxyJump bastion`,
          },
        ],
        exercises: [
          {
            prompt: "Apply identity settings to every `*.example.com` host in config.",
            answer: "Host *.example.com\n  User deploy\n  IdentityFile ~/.ssh/example_key",
            explanation:
              "Host patterns support wildcards — a single block covers many hosts.",
          },
        ],
      },
      {
        title: "Checking your config",
        text: [
          "`ssh -G` prints the effective configuration for a host after all files are parsed — the fastest way to debug config issues:",
        ],
        codeBlocks: [
          { label: "Show effective config", code: "ssh -G web" },
        ],
        exercises: [
          {
            prompt: "Show which config options apply to host `web`.",
            answer: "ssh -G web",
            explanation:
              "`ssh -G` prints the effective configuration after all files are parsed.",
          },
        ],
      },
    ],
  },
  {
    id: "ssh-tunneling",
    title: "Tunneling & Port Forwarding",
    tagline: "local, remote, and dynamic tunnels",
    description:
      "SSH tunnels let you reach services behind firewalls by encrypting traffic through the SSH connection. Three types cover every use case.",
    subsections: [
      {
        title: "Local port forwarding (-L)",
        text: [
          "Local forwarding binds a port on your machine and forwards traffic through the SSH connection to a destination reachable from the server:",
          "After connecting, point your local client at `localhost:3306` and traffic is transparently forwarded.",
        ],
        codeBlocks: [
          {
            label: "Syntax",
            code: "ssh -L [bind_address:]local_port:remote_host:remote_port user@ssh_host",
          },
          {
            label: "Access a remote database on localhost:3306",
            code: "ssh -L 3306:localhost:3306 user@dbhost",
          },
          {
            label: "Access a service on another host in the remote network",
            code: "ssh -L 8080:internal-app:80 user@bastion",
          },
        ],
        exercises: [
          {
            prompt: "Forward local port 8080 to remote `localhost:80` through the SSH connection.",
            answer: "ssh -L 8080:localhost:80 user@host",
            aliases: [
              "ssh user@host -L 8080:localhost:80",
            ],
            explanation:
              "`-L local:remote` opens a tunnel — `localhost:8080` on your machine maps to `localhost:80` on the server.",
          },
        ],
      },
      {
        title: "Remote port forwarding (-R)",
        text: [
          "Remote forwarding exposes a local port to the remote network. The SSH server binds a port that reaches back to your machine:",
          "The server's port 9000 now forwards to your local port 3000. Requires `GatewayPorts yes` in the server's sshd_config to bind beyond localhost.",
        ],
        codeBlocks: [
          {
            label: "Expose local dev server to the remote network",
            code: "ssh -R 9000:localhost:3000 user@remote",
          },
        ],
        exercises: [
          {
            prompt: "Expose your local port 3000 to the remote host as port 9000.",
            answer: "ssh -R 9000:localhost:3000 user@host",
            aliases: [
              "ssh user@host -R 9000:localhost:3000",
            ],
            explanation:
              "`-R remote:local` makes the server's port 9000 reach your local port 3000.",
          },
        ],
      },
      {
        title: "Dynamic forwarding / SOCKS proxy (-D)",
        text: [
          "Dynamic forwarding creates a local SOCKS proxy. Any app that supports SOCKS can route traffic through the SSH tunnel:",
        ],
        codeBlocks: [
          {
            label: "Start a SOCKS5 proxy",
            code: "ssh -D 1080 user@host",
          },
          {
            label: "Then configure your browser to use localhost:1080 as SOCKS5 proxy",
            code: "# All browser traffic now flows through the SSH tunnel",
          },
        ],
        exercises: [
          {
            prompt: "Open a SOCKS5 proxy on local port 1080 through the SSH connection.",
            answer: "ssh -D 1080 user@host",
            aliases: [
              "ssh user@host -D 1080",
            ],
            explanation:
              "`-D` creates a dynamic SOCKS proxy — point your browser at `localhost:1080`.",
          },
        ],
      },
      {
        title: "Background tunnels",
        text: [
          "Use `-fN` to run tunnels in the background without a shell — useful for long-running forwards:",
          "`-f` backgrounds after authentication, `-N` skips running a remote command. The tunnel stays alive until you kill the process.",
        ],
        codeBlocks: [
          {
            label: "Background a tunnel",
            code: "ssh -fN -L 5432:localhost:5432 user@host",
          },
          {
            label: "Find and kill it later",
            code: "pgrep -f '5432'\nkill <PID>",
          },
        ],
        exercises: [
          {
            prompt:
              "Keep a tunnel alive in the background and suppress the remote shell.",
            answer: "ssh -fN -L 5432:localhost:5432 user@host",
            aliases: [
              "ssh user@host -fN -L 5432:localhost:5432",
              "ssh -f -N -L 5432:localhost:5432 user@host",
              "ssh -fNL -L 5432:localhost:5432 user@host",
              "ssh user@host -fNL -L 5432:localhost:5432",
            ],
            explanation:
              "`-f` backgrounds after auth, `-N` runs no command — a pure background tunnel.",
          },
        ],
      },
    ],
  },
  {
    id: "ssh-file-transfer",
    title: "File Transfer",
    tagline: "scp, sftp, and rsync over SSH",
    description:
      "SSH isn't just for terminals — it's the transport layer for secure file transfers. scp for quick copies, sftp for interactive browsing, rsync for efficient syncing.",
    subsections: [
      {
        title: "SCP — secure copy",
        text: [
          "`scp` copies files between hosts over SSH. The syntax mirrors `cp` with a `user@host:` prefix for remote paths:",
          "Watch the case: scp uses uppercase `-P` for port, while ssh uses lowercase `-p`.",
        ],
        codeBlocks: [
          {
            label: "Upload a file",
            code: "scp file.txt user@host:~/uploads/",
          },
          {
            label: "Download a file",
            code: "scp user@host:/var/log/app.log .",
          },
          {
            label: "Copy a directory (recursive)",
            code: "scp -r project/ user@host:~/project",
          },
          {
            label: "With a non-standard port (note: capital -P)",
            code: "scp -P 2222 file.txt user@host:~",
          },
        ],
        exercises: [
          {
            prompt: "Upload `app.conf` to `user@host`'s home directory.",
            answer: "scp app.conf user@host:",
            aliases: [
              "scp app.conf user@host:.",
              "scp app.conf user@host:~/",
            ],
            explanation:
              "Remote path defaults to home when you use `user@host:` with no path after the colon.",
          },
          {
            prompt: "Download a remote file `data.csv` to the current directory.",
            answer: "scp user@host:/path/to/data.csv .",
            explanation:
              "Remote path comes first when pulling: `scp user@host:remote local`.",
          },
        ],
      },
      {
        title: "Rsync — efficient syncing",
        text: [
          "`rsync` only transfers the differences between source and destination, making it ideal for large projects or frequent syncs:",
          "`-a` is archive mode (preserves permissions, timestamps, symlinks), `-v` is verbose, `-z` compresses for slow links, and `--delete` removes files in the destination that don't exist in the source.",
        ],
        codeBlocks: [
          {
            label: "Sync a project directory",
            code: "rsync -av project/ user@host:~/project",
          },
          {
            label: "Exclude directories",
            code: "rsync -av --exclude node_modules --exclude .git project/ user@host:~/project",
          },
          {
            label: "Dry-run to preview changes",
            code: "rsync -avn --delete project/ user@host:~/project",
          },
        ],
        exercises: [
          {
            prompt:
              "Sync the local `dist/` folder to the server, excluding `node_modules`.",
            answer:
              "rsync -av --exclude node_modules dist/ user@host:~/dist",
            explanation:
              "`rsync` uses SSH by default; `--exclude` keeps junk out of the transfer.",
          },
        ],
      },
      {
        title: "SFTP — interactive file browser",
        text: [
          "`sftp` gives you an interactive file-manager prompt with commands like `ls`, `cd`, `get`, and `put`:",
        ],
        codeBlocks: [
          { label: "Start SFTP session", code: "sftp user@host" },
          {
            label: "Common commands inside sftp",
            code: "sftp> ls\nsftp> cd /var/www\nsftp> get remote-file.txt\nsftp> put local-file.txt\nsftp> exit",
          },
        ],
        exercises: [
          {
            prompt: "Open an interactive SFTP session to `user@host`.",
            answer: "sftp user@host",
            explanation:
              "`sftp` gives a file-manager prompt with `get`/`put`/`ls`/`cd` commands.",
          },
        ],
      },
    ],
  },
  {
    id: "ssh-jump-hosts",
    title: "Jump Hosts & ProxyJump",
    tagline: "reaching private networks through bastion hosts",
    description:
      "Many production servers aren't directly accessible from the internet. Jump hosts (bastions) act as intermediaries — SSH's `-J` flag and `ProxyJump` config make this transparent.",
    subsections: [
      {
        title: "The -J flag",
        text: [
          "`-J` tells SSH to hop through one or more intermediate hosts before reaching the target. Each hop is separated by a comma:",
          "Each hop can carry its own `user@` prefix. The intermediate hosts must have `GatewayPorts` enabled or accept the default (localhost binding).",
        ],
        codeBlocks: [
          {
            label: "Single jump",
            code: "ssh -J bastion.example.com user@internal.host",
          },
          {
            label: "Multiple jumps",
            code: "ssh -J user@j1,user@j2 user@db.internal",
          },
        ],
        exercises: [
          {
            prompt:
              "Connect to `internal.host` as `alice`, jumping through `bastion.example.com`.",
            answer: "ssh -J bastion.example.com alice@internal.host",
            aliases: [
              "ssh alice@internal.host -J bastion.example.com",
            ],
            explanation:
              "`-J` (ProxyJump) chains through the jump host.",
          },
        ],
      },
      {
        title: "Config-based jumps",
        text: [
          "For repeated access, define the jump in your SSH config so you never type `-J` again:",
          "Now `ssh internal` automatically hops through bastion. You can also use `ProxyCommand` for more complex setups.",
        ],
        codeBlocks: [
          {
            label: "~/.ssh/config",
            code: `Host bastion
  HostName bastion.example.com
  User ops

Host internal
  HostName internal.host
  User alice
  ProxyJump bastion`,
          },
        ],
        exercises: [
          {
            prompt:
              "In SSH config, route all connections to host `db` through the jump host `bastion`.",
            answer: "ProxyJump bastion",
            explanation:
              "Under a `Host db` block, `ProxyJump bastion` makes every `ssh db` hop through bastion.",
          },
        ],
      },
    ],
  },
  {
    id: "ssh-hardening",
    title: "Server Hardening",
    tagline: "securing sshd_config on the server side",
    description:
      "A default SSH server is reasonably secure, but hardening sshd_config reduces the attack surface and enforces best practices.",
    subsections: [
      {
        title: "Disable password authentication",
        text: [
          "Force key-based auth only. This eliminates brute-force password attacks entirely:",
          "Make sure key auth works before disabling passwords — lock yourself out and you'll need console access.",
        ],
        codeBlocks: [
          {
            label: "/etc/ssh/sshd_config",
            code: "PasswordAuthentication no\nChallengeResponseAuthentication no",
          },
          {
            label: "Apply changes",
            code: "sudo systemctl reload ssh",
          },
        ],
        exercises: [
          {
            prompt: "Disable password logins on the server for everyone.",
            answer: "PasswordAuthentication no",
            explanation:
              "Set in `/etc/ssh/sshd_config`, then `systemctl restart ssh` — forces key auth.",
          },
        ],
      },
      {
        title: "Restrict root access",
        text: [
          "Direct root logins over SSH are a security risk. Use a regular user account and escalate with sudo:",
        ],
        codeBlocks: [
          {
            label: "/etc/ssh/sshd_config",
            code: "PermitRootLogin no",
          },
        ],
        exercises: [
          {
            prompt: "Prevent direct root SSH logins.",
            answer: "PermitRootLogin no",
            explanation:
              "`PermitRootLogin no` in sshd_config bans root over SSH — use sudo instead.",
          },
        ],
      },
      {
        title: "Limit authentication attempts",
        text: [
          "Reduce the window for brute-force attacks by limiting retries:",
        ],
        codeBlocks: [
          {
            label: "/etc/ssh/sshd_config",
            code: "MaxAuthTries 3",
          },
        ],
        exercises: [
          {
            prompt: "Limit SSH authentication attempts to 3 on the server.",
            answer: "MaxAuthTries 3",
            explanation:
              "`MaxAuthTries` limits password/key retries, slowing brute force.",
          },
        ],
      },
      {
        title: "Allow only specific users or groups",
        text: [
          "Whitelist who can log in rather than relying on firewall rules alone:",
        ],
        codeBlocks: [
          {
            label: "Allow specific users",
            code: "AllowUsers alice bob ops",
          },
          {
            label: "Allow by group",
            code: "AllowGroups developers ops",
          },
        ],
        exercises: [
          {
            prompt: "Restrict SSH logins to the users `alice` and `bob` on the server.",
            answer: "AllowUsers alice bob",
            explanation:
              "`AllowUsers` whitelists accounts; `DenyUsers` is the inverse.",
          },
        ],
      },
      {
        title: "Apply changes safely",
        text: [
          "Always validate the config before restarting — a typo can lock you out:",
        ],
        codeBlocks: [
          {
            label: "Validate config",
            code: "sshd -t",
          },
          {
            label: "Reload without dropping sessions",
            code: "sudo systemctl reload ssh",
          },
          {
            label: "Debug mode (run in a separate terminal)",
            code: "sudo sshd -d -p 2222",
          },
        ],
        exercises: [
          {
            prompt: "Validate the sshd_config file for syntax errors.",
            answer: "sshd -t",
            explanation:
              "`sshd -t` checks the config and prints problems before you restart.",
          },
          {
            prompt: "Apply sshd_config changes without killing active sessions.",
            answer: "sudo systemctl reload ssh",
            aliases: [
              "systemctl reload ssh",
              "sudo systemctl reload sshd",
              "systemctl reload sshd",
              "sudo service ssh reload",
              "service ssh reload",
            ],
            explanation:
              "`systemctl reload ssh` re-reads config gracefully; `restart` is heavier.",
          },
        ],
      },
    ],
  },
];
