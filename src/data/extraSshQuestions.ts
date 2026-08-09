import type { QuizQuestion } from "./questions";

/**
 * Additional ssh questions — top up the dataset past 200 total.
 * Level: pareto = everyday muscle memory, core = standard knowledge,
 * workflow = multi-step scenarios.
 */
export const sshExtraQuestions: QuizQuestion[] = [
  {
    id: "ssh-run-command",
    category: "ssh",
    level: "pareto",
    prompt: "Run 'uptime' on host example.com over SSH without opening a shell.",
    answer: "ssh user@example.com uptime",
    explanation:
      "Any command after the host runs remotely and returns output — no interactive session needed.",
  },
  {
    id: "ssh-port-1",
    category: "ssh",
    level: "core",
    prompt: "Connect to host.example.com on port 2222.",
    answer: "ssh -p 2222 user@host.example.com",
    explanation:
      "`-p` sets the port. The config equivalent is `Port 2222` under a Host block.",
  },
  {
    id: "ssh-verbose-1",
    category: "ssh",
    level: "core",
    prompt: "Debug an SSH connection with maximum verbosity.",
    answer: "ssh -vvv user@host",
    explanation:
      "`-vvv` prints authentication and key-exchange detail — the first stop when SSH fails mysteriously.",
  },
  {
    id: "ssh-keygen-ed25519-1",
    category: "ssh",
    level: "core",
    prompt: "Generate a new ed25519 SSH key pair.",
    answer: "ssh-keygen -t ed25519",
    explanation:
      "`ed25519` is the modern default; it prompts for a file and passphrase.",
  },
  {
    id: "ssh-keygen-rsa-1",
    category: "ssh",
    level: "core",
    prompt: "Generate a 4096-bit RSA key for a legacy server.",
    answer: "ssh-keygen -t rsa -b 4096",
    explanation:
      "`-b 4096` sets the strength. Older servers may still require RSA.",
  },
  {
    id: "ssh-keygen-passphrase-1",
    category: "ssh",
    level: "core",
    prompt: "Change the passphrase on your existing private key.",
    answer: "ssh-keygen -p",
    explanation:
      "`ssh-keygen -p` prompts for the old and new passphrase on ~/.ssh/id_ed25519.",
  },
  {
    id: "ssh-keygen-fingerprint-1",
    category: "ssh",
    level: "core",
    prompt: "Show the fingerprint of your public key.",
    answer: "ssh-keygen -lf ~/.ssh/id_ed25519.pub",
    explanation:
      "`-l` prints the fingerprint; `-E sha256` (or md5) selects the format.",
  },
  {
    id: "ssh-copy-id-1",
    category: "ssh",
    level: "core",
    prompt: "Install your public key on host example.com for passwordless login.",
    answer: "ssh-copy-id user@example.com",
    explanation:
      "`ssh-copy-id` appends your pubkey to the host's ~/.ssh/authorized_keys.",
  },
  {
    id: "ssh-copy-id-port",
    category: "ssh",
    level: "core",
    prompt: "Install your key on example.com via port 2222.",
    answer: "ssh-copy-id -p 2222 user@example.com",
    explanation:
      "Pass the same `-p` you use to connect, or define the port in ~/.ssh/config.",
  },
  {
    id: "ssh-add-default",
    category: "ssh",
    level: "core",
    prompt: "Load your default SSH key into the agent.",
    answer: "ssh-add",
    explanation:
      "`ssh-add` loads ~/.ssh/id_ed25519 (and other defaults) into a running agent.",
  },
  {
    id: "ssh-add-list-1",
    category: "ssh",
    level: "core",
    prompt: "List the keys currently loaded in the SSH agent.",
    answer: "ssh-add -l",
    explanation:
      "`-l` lists fingerprints; `-L` prints full public keys; `-D` deletes all.",
  },
  {
    id: "ssh-add-remove",
    category: "ssh",
    level: "core",
    prompt: "Remove a specific key from the SSH agent.",
    answer: "ssh-add -d ~/.ssh/id_ed25519",
    explanation:
      "`-d` removes one key; `-D` clears the whole agent.",
  },
  {
    id: "ssh-agent-start-1",
    category: "ssh",
    level: "core",
    prompt: "Start an SSH agent in the background and print its env.",
    answer: "eval $(ssh-agent)",
    explanation:
      "`eval $(ssh-agent)` starts the agent and exports SSH_AUTH_SOCK for this shell.",
  },
  {
    id: "ssh-agent-kill",
    category: "ssh",
    level: "core",
    prompt: "Kill the current SSH agent process.",
    answer: "ssh-agent -k",
    explanation:
      "`ssh-agent -k` shuts down the agent (best run after `eval $(ssh-agent)` set its env).",
  },
  {
    id: "ssh-keygen-email-comment",
    category: "ssh",
    level: "core",
    prompt: "Generate a key with a comment identifying you (you@example.com).",
    answer: "ssh-keygen -t ed25519 -C 'you@example.com'",
    explanation:
      "The `-C` comment lands in the .pub file — conventionally the email.",
  },
  {
    id: "ssh-scp-pull",
    category: "ssh",
    level: "core",
    prompt: "Copy a file from a remote server to the local machine.",
    answer: "scp user@host:/path/file.txt .",
    explanation:
      "Remote path comes first when pulling: `scp user@host:remote local`.",
  },
  {
    id: "ssh-scp-push-dir",
    category: "ssh",
    level: "core",
    prompt: "Upload the local logs directory to the server's ~/backups.",
    answer: "scp -r logs user@host:~/backups",
    explanation:
      "`-r` recurses. `scp -P 2222` sets the port (capital P unlike ssh).",
  },
  {
    id: "ssh-sftp-interactive",
    category: "ssh",
    level: "core",
    prompt: "Open an interactive SFTP session to browse and transfer files.",
    answer: "sftp user@host",
    explanation:
      "`sftp` gives a file-manager prompt with get/put/ls/cd commands.",
  },
  {
    id: "ssh-sftp-batch",
    category: "ssh",
    level: "workflow",
    prompt: "Download file.txt from the server using SFTP in one non-interactive line.",
    answer: "echo 'get file.txt' | sftp user@host",
    explanation:
      "Piping commands into sftp runs them without an interactive session.",
  },
  {
    id: "ssh-rsync-push",
    category: "ssh",
    level: "core",
    prompt: "Sync the local project to the server over SSH with rsync.",
    answer: "rsync -av project/ user@host:~/project",
    explanation:
      "`rsync` uses SSH by default; `-a` preserves permissions and `-v` is verbose.",
  },
  {
    id: "ssh-tunnel-local-1",
    category: "ssh",
    level: "core",
    prompt: "Forward local port 8080 to remote localhost:80 through the SSH connection.",
    answer: "ssh -L 8080:localhost:80 user@host",
    explanation:
      "`-L local:remote` opens a tunnel: localhost:8080 on your machine maps to localhost:80 on the server.",
  },
  {
    id: "ssh-tunnel-remote-1",
    category: "ssh",
    level: "core",
    prompt: "Expose your local port 3000 to the remote host as port 9000.",
    answer: "ssh -R 9000:localhost:3000 user@host",
    explanation:
      "`-R remote:local` makes the server's port 9000 reach your local port 3000.",
  },
  {
    id: "ssh-tunnel-dynamic-1",
    category: "ssh",
    level: "core",
    prompt: "Open a SOCKS5 proxy on local port 1080 through the SSH connection.",
    answer: "ssh -D 1080 user@host",
    explanation:
      "`-D` creates a dynamic SOCKS proxy — point your browser at localhost:1080.",
  },
  {
    id: "ssh-jump-host",
    category: "ssh",
    level: "core",
    prompt: "Connect to internal.host by jumping through bastion.example.com.",
    answer: "ssh -J bastion.example.com user@internal.host",
    explanation:
      "`-J` (ProxyJump) chains through the jump host. Multiple hops: `-J a,b`.",
  },
  {
    id: "ssh-jump-config",
    category: "ssh",
    level: "workflow",
    prompt: "Route all connections to host 'db' through the jump host 'bastion' in config.",
    answer: "ProxyJump bastion",
    explanation:
      "Under a `Host db` block, `ProxyJump bastion` makes every `ssh db` hop through bastion.",
  },
  {
    id: "ssh-config-host-block",
    category: "ssh",
    level: "core",
    prompt: "Define a config alias 'web' for user@example.com with a specific identity file.",
    answer: "Host web\n  HostName example.com\n  User alice\n  IdentityFile ~/.ssh/id_ed25519",
    explanation:
      "A Host block binds options to an alias: `ssh web` then uses all of them.",
  },
  {
    id: "ssh-config-check",
    category: "ssh",
    level: "core",
    prompt: "Show which config options apply to host 'web'.",
    answer: "ssh -G web",
    explanation:
      "`ssh -G` prints the effective configuration after all files are parsed.",
  },
  {
    id: "ssh-config-alias-1",
    category: "ssh",
    level: "workflow",
    prompt: "Make 'ssh prod' connect to deploy@10.0.0.5 using your deploy key.",
    answer: "Host prod\n  HostName 10.0.0.5\n  User deploy\n  IdentityFile ~/.ssh/deploy_key",
    explanation:
      "An alias + IdentityFile keeps production hosts from reusing your personal key.",
  },
  {
    id: "ssh-known-hosts-check",
    category: "ssh",
    level: "core",
    prompt: "Look up the stored host key for example.com.",
    answer: "ssh-keygen -F example.com",
    explanation:
      "`ssh-keygen -F` searches known_hosts for a host entry; `-R` removes it.",
  },
  {
    id: "ssh-known-hosts-remove",
    category: "ssh",
    level: "workflow",
    prompt: "Remove the stale known_hosts entry for example.com after its key changed.",
    answer: "ssh-keygen -R example.com",
    explanation:
      "`-R` deletes the old entry so you can reconnect and accept the new key.",
  },
  {
    id: "ssh-known-hosts-verify",
    category: "ssh",
    level: "workflow",
    prompt: "Verify the host key fingerprint before the first connection.",
    answer: "ssh-keyscan example.com | ssh-keygen -lf -",
    explanation:
      "`ssh-keyscan` fetches the key and `-lf -` prints its fingerprint to compare with the admin.",
  },
  {
    id: "ssh-keyscan-1",
    category: "ssh",
    level: "core",
    prompt: "Fetch the SSH host keys of example.com.",
    answer: "ssh-keyscan example.com",
    explanation:
      "`ssh-keyscan` prints host keys — useful to pre-seed known_hosts in scripts.",
  },
  {
    id: "ssh-strict-host-check-off",
    category: "ssh",
    level: "workflow",
    prompt: "Connect while ignoring host key verification (first-time setup only).",
    answer: "ssh -o StrictHostKeyChecking=no user@host",
    explanation:
      "Disables host-key verification — a last resort for scripting; prefer known_hosts hygiene.",
  },
  {
    id: "ssh-no-password",
    category: "ssh",
    level: "core",
    prompt: "Forbid password authentication for this connection.",
    answer: "ssh -o PasswordAuthentication=no user@host",
    explanation:
      "Fails instead of prompting if only passwords are available — forces key auth.",
  },
  {
    id: "ssh-control-master",
    category: "ssh",
    level: "core",
    prompt: "Reuse an existing connection to the same host (multiplexing).",
    answer: "ssh -o ControlMaster=auto -o ControlPath=~/.ssh/cm-%r@%h:%p user@host",
    explanation:
      "ControlMaster + a ControlPath shares one TCP connection for later SSH/SCP commands.",
  },
  {
    id: "ssh-keepalive",
    category: "ssh",
    level: "core",
    prompt: "Send keepalive packets every 30 seconds to avoid disconnects.",
    answer: "ssh -o ServerAliveInterval=30 user@host",
    explanation:
      "`ServerAliveInterval` pings the server so idle connections don't drop.",
  },
  {
    id: "ssh-server-alive-count",
    category: "ssh",
    level: "core",
    prompt: "Drop the connection after 3 missed keepalive replies.",
    answer: "ssh -o ServerAliveCountMax=3 user@host",
    explanation:
      "Pair with ServerAliveInterval: after N unanswered pings, ssh gives up.",
  },
  {
    id: "ssh-tcp-keepalive",
    category: "ssh",
    level: "core",
    prompt: "Enable TCP-level keepalive for the connection.",
    answer: "ssh -o TCPKeepAlive=yes user@host",
    explanation:
      "Sends TCP keepalives even when idle, detecting dead peers sooner.",
  },
  {
    id: "ssh-connect-timeout",
    category: "ssh",
    level: "core",
    prompt: "Abort the connection attempt if it can't establish within 10 seconds.",
    answer: "ssh -o ConnectTimeout=10 user@host",
    explanation:
      "`ConnectTimeout` stops slow-connect hangs — useful in scripts.",
  },
  {
    id: "ssh-batch-mode",
    category: "ssh",
    level: "workflow",
    prompt: "Run an SSH command in a script, failing instead of prompting for a password.",
    answer: "ssh -o BatchMode=yes user@host 'command'",
    explanation:
      "BatchMode disables password prompting so scripts fail fast on missing keys.",
  },
  {
    id: "ssh-x11-1",
    category: "ssh",
    level: "core",
    prompt: "Forward X11 GUI applications over SSH.",
    answer: "ssh -X user@host",
    explanation:
      "`-X` forwards X11; `-Y` trusts the remote client (for older apps).",
  },
  {
    id: "ssh-agent-forward-1",
    category: "ssh",
    level: "core",
    prompt: "Forward your SSH agent so the remote host can use your local keys.",
    answer: "ssh -A user@host",
    explanation:
      "`-A` forwards the agent socket — lets you ssh onward from the remote without copying keys.",
  },
  {
    id: "ssh-agent-forward-config",
    category: "ssh",
    level: "core",
    prompt: "Enable agent forwarding for host 'git' in config.",
    answer: "ForwardAgent yes",
    explanation:
      "Under a Host block, `ForwardAgent yes` persists the `-A` behavior.",
  },
  {
    id: "ssh-github-test",
    category: "ssh",
    level: "core",
    prompt: "Test your GitHub SSH authentication without a shell.",
    answer: "ssh -T git@github.com",
    explanation:
      "GitHub replies with your username and exits — the canonical connectivity check.",
  },
  {
    id: "ssh-gitlab-test",
    category: "ssh",
    level: "core",
    prompt: "Test your GitLab SSH authentication.",
    answer: "ssh -T git@gitlab.com",
    explanation:
      "GitLab prints 'Welcome to GitLab, @user!' and closes the connection.",
  },
  {
    id: "ssh-dsa-ban",
    category: "ssh",
    level: "workflow",
    prompt: "Refuse DSA host keys for a connection (they're insecure).",
    answer: "ssh -o HostKeyAlgorithms=-ssh-dss user@host",
    explanation:
      "Prefixing an algorithm list with `-` removes it from the accepted set.",
  },
  {
    id: "ssh-cipher-selection",
    category: "ssh",
    level: "core",
    prompt: "Connect using only the chacha20-poly1305 cipher.",
    answer: "ssh -c chacha20-poly1305@openssh.com user@host",
    explanation:
      "`-c` picks the cipher — useful for compatibility or policy reasons.",
  },
  {
    id: "ssh-authorized-keys-format",
    category: "ssh",
    level: "workflow",
    prompt: "Add a colleague's public key to your account for access.",
    answer: "echo 'ssh-ed25519 AAAAC3… you@x' >> ~/.ssh/authorized_keys",
    explanation:
      "Appending the full pubkey line to authorized_keys grants that key access.",
  },
  {
    id: "ssh-authorized-keys-perms",
    category: "ssh",
    level: "workflow",
    prompt: "Fix permissions on authorized_keys so sshd accepts it.",
    answer: "chmod 600 ~/.ssh/authorized_keys",
    explanation:
      "OpenSSH refuses keys with group/world permissions — 600 is the norm.",
  },
  {
    id: "ssh-key-perms",
    category: "ssh",
    level: "workflow",
    prompt: "Fix permissions on your private key after copying it to a new machine.",
    answer: "chmod 600 ~/.ssh/id_ed25519",
    explanation:
      "Private keys must be owner-only (600) or ssh rejects them.",
  },
  {
    id: "ssh-hardening-passwords",
    category: "ssh",
    level: "workflow",
    prompt: "Disable password logins on the server for everyone.",
    answer: "PasswordAuthentication no",
    explanation:
      "Set in /etc/ssh/sshd_config, then `systemctl restart ssh` — forces key auth.",
  },
  {
    id: "ssh-hardening-root-1",
    category: "ssh",
    level: "workflow",
    prompt: "Prevent direct root SSH logins.",
    answer: "PermitRootLogin no",
    explanation:
      "`PermitRootLogin no` in sshd_config bans root over SSH — use sudo instead.",
  },
  {
    id: "ssh-hardening-empty-passwords",
    category: "ssh",
    level: "workflow",
    prompt: "Disallow accounts with empty passwords over SSH.",
    answer: "PermitEmptyPasswords no",
    explanation:
      "Another sshd_config hardening line: no blank-password logins.",
  },
  {
    id: "ssh-hardening-idle-timeout",
    category: "ssh",
    level: "workflow",
    prompt: "Disconnect SSH sessions idle for 5 minutes on the server.",
    answer: "ClientAliveInterval 300",
    explanation:
      "`ClientAliveInterval 300` in sshd_config drops idle clients after 5 minutes.",
  },
  {
    id: "ssh-hardening-max-auth",
    category: "ssh",
    level: "workflow",
    prompt: "Limit SSH authentication attempts to 3 on the server.",
    answer: "MaxAuthTries 3",
    explanation:
      "`MaxAuthTries` limits password/key retries, slowing brute force.",
  },
  {
    id: "ssh-hardening-ssh2-only",
    category: "ssh",
    level: "workflow",
    prompt: "Disable the legacy SSH protocol 1 on the server.",
    answer: "Protocol 2",
    explanation:
      "Modern sshd defaults to v2 only; `Protocol 2` enforces it explicitly.",
  },
  {
    id: "ssh-sshd-config-reload",
    category: "ssh",
    level: "workflow",
    prompt: "Apply sshd_config changes without killing active sessions.",
    answer: "sudo systemctl reload ssh",
    explanation:
      "`systemctl reload ssh` re-reads config gracefully; `restart` is heavier.",
  },
  {
    id: "ssh-sshd-test-config",
    category: "ssh",
    level: "workflow",
    prompt: "Validate the sshd_config file for syntax errors.",
    answer: "sshd -t",
    explanation:
      "`sshd -t` checks the config and prints problems before you restart.",
  },
  {
    id: "ssh-sshd-verbose-test",
    category: "ssh",
    level: "workflow",
    prompt: "Debug why a server refuses your connection using verbose sshd logging.",
    answer: "sshd -d",
    explanation:
      "`sshd -d` runs in debug mode on the server, printing each auth decision.",
  },
  {
    id: "ssh-tunnel-mysql",
    category: "ssh",
    level: "workflow",
    prompt: "Reach a database on the server's localhost:3306 from your machine.",
    answer: "ssh -L 3306:localhost:3306 user@host",
    explanation:
      "Forward local 3306 to the server's localhost:3306, then connect your DB client to 127.0.0.1.",
  },
  {
    id: "ssh-tunnel-http",
    category: "ssh",
    level: "workflow",
    prompt: "View a remote admin panel at localhost:80 through a tunnel.",
    answer: "ssh -L 8080:localhost:80 user@host",
    explanation:
      "Open http://localhost:8080 locally; it's forwarded to the server's port 80.",
  },
  {
    id: "ssh-reverse-db",
    category: "ssh",
    level: "workflow",
    prompt: "Expose your local dev database to a cloud VM that needs to reach it.",
    answer: "ssh -R 5432:localhost:5432 user@vm",
    explanation:
      "The VM's localhost:5432 forwards back to your local Postgres — no public IP needed.",
  },
  {
    id: "ssh-socks-browser",
    category: "ssh",
    level: "workflow",
    prompt: "Browse the web through the company network using a SOCKS tunnel.",
    answer: "ssh -D 1080 user@bastion",
    explanation:
      "Set your browser's SOCKS proxy to localhost:1080; all traffic flows through the tunnel.",
  },
  {
    id: "ssh-jump-multiple",
    category: "ssh",
    level: "workflow",
    prompt: "Reach db.internal through two jump hosts: j1 then j2.",
    answer: "ssh -J user@j1,user@j2 user@db.internal",
    explanation:
      "Comma-separated ProxyJump chain — each hop can carry its own user@.",
  },
  {
    id: "ssh-escape-sequence",
    category: "ssh",
    level: "core",
    prompt: "Terminate a hung SSH session from inside it.",
    answer: "~.",
    explanation:
      "A newline then `~.` closes the connection — the emergency exit for frozen sessions.",
  },
  {
    id: "ssh-escape-suspend",
    category: "ssh",
    level: "core",
    prompt: "Suspend the SSH session back to your local shell.",
    answer: "~Ctrl+z",
    explanation:
      "`~` followed by Ctrl+z backgrounds ssh; `fg` returns to it.",
  },
  {
    id: "ssh-escape-status",
    category: "ssh",
    level: "core",
    prompt: "List the active SSH forwarding connections from inside a session.",
    answer: "~#",
    explanation:
      "`~#` prints the list of forwarded connections — useful to inspect tunnels.",
  },
  {
    id: "ssh-local-port-check",
    category: "ssh",
    level: "workflow",
    prompt: "Check whether anything is already listening on local port 8080 before tunneling.",
    answer: "lsof -i :8080",
    explanation:
      "A busy port breaks the `-L` bind; lsof reveals the culprit.",
  },
  {
    id: "ssh-gateway-ports",
    category: "ssh",
    level: "workflow",
    prompt: "Let remote machines reach your forwarded port (bind 0.0.0.0).",
    answer: "ssh -L 0.0.0.0:8080:localhost:80 user@host",
    explanation:
      "Binding 0.0.0.0 exposes the tunnel beyond localhost; requires GatewayPorts on the server.",
  },
  {
    id: "ssh-exit-status",
    category: "ssh",
    level: "workflow",
    prompt: "Propagate a remote command's exit code back to your script.",
    answer: "ssh user@host 'command; exit $?'",
    explanation:
      "By default ssh returns 255 on connection failure; capturing the remote `exit $?` preserves the real code.",
  },
  {
    id: "ssh-environment-remote",
    category: "ssh",
    level: "workflow",
    prompt: "Set an env var for a remote command without persisting it.",
    answer: "ssh user@host 'MYVAR=1 ./script.sh'",
    explanation:
      "Prefix the remote command with the assignment — it applies only to that command.",
  },
  {
    id: "ssh-script-remote",
    category: "ssh",
    level: "workflow",
    prompt: "Run a local script file on the remote host without copying it first.",
    answer: "ssh user@host 'bash -s' < script.sh",
    explanation:
      "Stream the script over stdin; `bash -s` executes it remotely.",
  },
  {
    id: "ssh-remote-script-local-args",
    category: "ssh",
    level: "workflow",
    prompt: "Run a remote script passing it the argument 'prod'.",
    answer: "ssh user@host './deploy.sh prod'",
    explanation:
      "Quote the whole remote command so arguments stay intact on the remote shell.",
  },
  {
    id: "ssh-no-command-after",
    category: "ssh",
    level: "core",
    prompt: "Force a remote command even when the user requests an interactive shell.",
    answer: "ForceCommand /path/script.sh",
    explanation:
      "`ForceCommand` in sshd_config or authorized_keys pins what the connection runs.",
  },
  {
    id: "ssh-restrict-command",
    category: "ssh",
    level: "workflow",
    prompt: "Allow only 'git pull' when someone connects with this key.",
    answer: "command=\"git pull\" ssh-ed25519 AAAA… key",
    explanation:
      "A `command=` prefix in authorized_keys restricts that key to one command.",
  },
  {
    id: "ssh-key-type-check",
    category: "ssh",
    level: "workflow",
    prompt: "Check which key types the server accepts for your account.",
    answer: "ssh -o PreferredAuthentications=publickey -o PasswordAuthentication=no -v user@host",
    explanation:
      "Verbose output lists the offered key types — debugging key-auth rejections.",
  },
  {
    id: "ssh-auth-methods",
    category: "ssh",
    level: "workflow",
    prompt: "Force authentication via publickey only.",
    answer: "ssh -o PreferredAuthentications=publickey user@host",
    explanation:
      "Limits to key auth so you don't fall into a password prompt.",
  },
  {
    id: "ssh-compression",
    category: "ssh",
    level: "core",
    prompt: "Enable compression for a slow link.",
    answer: "ssh -C user@host",
    explanation:
      "`-C` compresses the stream — helps on slow connections, hurts on fast ones.",
  },
  {
    id: "ssh-log-level",
    category: "ssh",
    level: "core",
    prompt: "Show the connection log level in the server logs (VERBOSE).",
    answer: "LogLevel VERBOSE",
    explanation:
      "`LogLevel VERBOSE` in sshd_config records fingerprints and more for auditing.",
  },
  {
    id: "ssh-syslog-facility",
    category: "ssh",
    level: "workflow",
    prompt: "Log sshd messages to a dedicated facility for centralized logging.",
    answer: "SyslogFacility AUTH",
    explanation:
      "`SyslogFacility AUTH` routes auth logs to the auth facility (e.g. /var/log/auth.log).",
  },
  {
    id: "ssh-allow-users",
    category: "ssh",
    level: "workflow",
    prompt: "Restrict SSH logins to the users alice and bob on the server.",
    answer: "AllowUsers alice bob",
    explanation:
      "`AllowUsers` whitelists accounts; `DenyUsers` is the inverse.",
  },
  {
    id: "ssh-allow-groups",
    category: "ssh",
    level: "workflow",
    prompt: "Allow SSH only for members of the 'developers' group.",
    answer: "AllowGroups developers",
    explanation:
      "`AllowGroups` scopes login by group membership — a common hardening rule.",
  },
  {
    id: "ssh-pubkey-format",
    category: "ssh",
    level: "core",
    prompt: "Convert a private key to the OpenSSH format.",
    answer: "ssh-keygen -p -m PEM",
    explanation:
      "`-m` sets the format (PEM for legacy compat, RFC4716 for new).",
  },
  {
    id: "ssh-keygen-comment-view",
    category: "ssh",
    level: "core",
    prompt: "Show the comment stored in your public key file.",
    answer: "cut -d' ' -f3 ~/.ssh/id_ed25519.pub",
    explanation:
      "The third whitespace field of the .pub line is the comment.",
  },
  {
    id: "ssh-keygen-host-check",
    category: "ssh",
    level: "workflow",
    prompt: "Verify a downloaded key file matches your known fingerprint.",
    answer: "ssh-keygen -lf downloaded.pub",
    explanation:
      "Compute the fingerprint locally and compare against the published one.",
  },
  {
    id: "ssh-ssh-copy-id-nokey",
    category: "ssh",
    level: "workflow",
    prompt: "Install a specific key file onto the remote host.",
    answer: "ssh-copy-id -i ~/.ssh/work_key.pub user@host",
    explanation:
      "`-i` selects which public key to install.",
  },
  {
    id: "ssh-port-forwarding-pid",
    category: "ssh",
    level: "workflow",
    prompt: "Keep a tunnel alive in the background and find its PID later.",
    answer: "ssh -fN -L 8080:localhost:80 user@host",
    explanation:
      "`-f` backgrounds after auth, `-N` runs no command — a pure tunnel; find it with `pgrep -f '8080'`.",
  },
  {
    id: "ssh-no-shell-tunnel",
    category: "ssh",
    level: "workflow",
    prompt: "Open a tunnel without executing a remote command.",
    answer: "ssh -N -L 5432:localhost:5432 user@host",
    explanation:
      "`-N` tells ssh not to run anything remotely — pure port forwarding.",
  },
  {
    id: "ssh-tunnel-timeout",
    category: "ssh",
    level: "workflow",
    prompt: "Make a tunneled connection fail quickly if the server is unreachable.",
    answer: "ssh -o ConnectTimeout=5 -fN -L 8080:localhost:80 user@host",
    explanation:
      "ConnectTimeout prevents the backgrounded tunnel from hanging forever.",
  },
  {
    id: "ssh-alive-count-max",
    category: "ssh",
    level: "core",
    prompt: "Allow at most 2 unanswered keepalive probes before dropping.",
    answer: "ServerAliveCountMax 2",
    explanation:
      "Config form: after ServerAliveInterval probes go unanswered this many times, disconnect.",
  },
  {
    id: "ssh-gssapi",
    category: "ssh",
    level: "workflow",
    prompt: "Enable Kerberos/GSSAPI authentication for an enterprise host.",
    answer: "ssh -o GSSAPIAuthentication=yes user@host",
    explanation:
      "Enterprise environments often require GSSAPI against Kerberos domains.",
  },
  {
    id: "ssh-identities-only",
    category: "ssh",
    level: "workflow",
    prompt: "Use only the keys you name explicitly, ignoring agent keys.",
    answer: "ssh -o IdentitiesOnly=yes -i ~/.ssh/deploy_key user@host",
    explanation:
      "`IdentitiesOnly` stops ssh from trying every agent key when yours is rejected.",
  },
  {
    id: "ssh-visual-hostkey",
    category: "ssh",
    level: "workflow",
    prompt: "Show a visual (ASCII-art) fingerprint when connecting.",
    answer: "ssh -o VisualHostKey=yes user@host",
    explanation:
      "The art helps humans spot a changed host key at a glance.",
  },
  {
    id: "ssh-hash-known-hosts",
    category: "ssh",
    level: "workflow",
    prompt: "Hash entries in known_hosts so hosts aren't stored in plaintext.",
    answer: "HashKnownHosts yes",
    explanation:
      "A config option (default on in modern OpenSSH) that hashes known_hosts entries.",
  },
  {
    id: "ssh-check-config-parse",
    category: "ssh",
    level: "workflow",
    prompt: "Verify ~/.ssh/config parses cleanly before relying on it.",
    answer: "ssh -G hostname > /dev/null",
    explanation:
      "A successful `-G` means the config parsed; errors print to stderr.",
  },
  {
    id: "ssh-remote-command-output",
    category: "ssh",
    level: "workflow",
    prompt: "Grep a remote log file for 'ERROR' lines.",
    answer: "ssh user@host 'grep ERROR /var/log/app.log'",
    explanation:
      "Run the remote command inside quotes so the remote shell — not yours — expands things.",
  },
  {
    id: "ssh-remote-pipe-local",
    category: "ssh",
    level: "workflow",
    prompt: "Pipe a remote command's output into a local grep.",
    answer: "ssh user@host 'cat /var/log/app.log' | grep ERROR",
    explanation:
      "The pipe runs locally: remote output streams into your local grep.",
  },
  {
    id: "ssh-multiple-commands",
    category: "ssh",
    level: "workflow",
    prompt: "Run two commands on the remote host in sequence.",
    answer: "ssh user@host 'uptime && df -h'",
    explanation:
      "Quote the chain — `&&` keeps the remote shell in charge of ordering.",
  },
  {
    id: "ssh-read-remote-file",
    category: "ssh",
    level: "core",
    prompt: "Print a remote file without saving it locally.",
    answer: "ssh user@host 'cat /etc/os-release'",
    explanation:
      "cat over ssh streams the file contents to your terminal.",
  },
  {
    id: "ssh-write-remote-file",
    category: "ssh",
    level: "workflow",
    prompt: "Create a remote file with local content using a heredoc.",
    answer: "ssh user@host 'cat > /tmp/notes.txt' << 'EOF'\ncontent\nEOF",
    explanation:
      "A quoted heredoc feeds content over stdin; cat writes it remotely.",
  },
  {
    id: "ssh-sudo-remote",
    category: "ssh",
    level: "workflow",
    prompt: "Run a command with sudo on the remote host.",
    answer: "ssh -t user@host 'sudo apt update'",
    explanation:
      "`-t` allocates a TTY so sudo can prompt for the password remotely.",
  },
  {
    id: "ssh-tty-force",
    category: "ssh",
    level: "core",
    prompt: "Force a pseudo-terminal for a remote command.",
    answer: "ssh -t user@host 'top'",
    explanation:
      "Full-screen remote programs need `-t` even when running a single command.",
  },
  {
    id: "ssh-no-tty",
    category: "ssh",
    level: "core",
    prompt: "Suppress the pseudo-terminal for a non-interactive remote command.",
    answer: "ssh -T user@host 'ls'",
    explanation:
      "`-T` disables TTY allocation — avoids stray carriage returns in script output.",
  },
  {
    id: "ssh-key-types-list",
    category: "ssh",
    level: "core",
    prompt: "List the fingerprint of every key in the agent.",
    answer: "ssh-add -l",
    explanation:
      "`-l` prints each loaded key's fingerprint; `-L` shows full public keys.",
  },
  {
    id: "ssh-copy-dir-many",
    category: "ssh",
    level: "workflow",
    prompt: "Copy configs to several servers with a single command using a loop.",
    answer: "for h in srv1 srv2 srv3; do scp app.conf user@$h:~/; done",
    explanation:
      "A shell loop repeats the scp per host — quick ad-hoc fleet sync.",
  },
  {
    id: "ssh-rsync-exclude",
    category: "ssh",
    level: "workflow",
    prompt: "Sync to the server but skip node_modules and .git.",
    answer: "rsync -av --exclude node_modules --exclude .git project/ user@host:~/project",
    explanation:
      "`--exclude` patterns keep junk out of the transfer.",
  },
  {
    id: "ssh-rsync-compress",
    category: "ssh",
    level: "core",
    prompt: "Sync with compression enabled over a slow link.",
    answer: "rsync -avz project/ user@host:~/project",
    explanation:
      "`-z` compresses during transfer — a win on low-bandwidth links.",
  },
  {
    id: "ssh-rsync-delete-dry",
    category: "ssh",
    level: "workflow",
    prompt: "Dry-run a mirror sync to see what would be deleted remotely.",
    answer: "rsync -avn --delete project/ user@host:~/project",
    explanation:
      "`-n` (dry run) previews changes — check before running a destructive mirror.",
  },
  {
    id: "ssh-scp-quiet",
    category: "ssh",
    level: "core",
    prompt: "Copy a file over SSH suppressing the progress meter.",
    answer: "scp -q file.txt user@host:",
    explanation:
      "`-q` quiets output for cleaner script logs.",
  },
  {
    id: "ssh-scp-preserve",
    category: "ssh",
    level: "core",
    prompt: "Copy files preserving modification times and permissions.",
    answer: "scp -p file.txt user@host:",
    explanation:
      "`-p` preserves timestamps and modes (lowercase; capital -P is the port).",
  },
  {
    id: "ssh-keygen-randomart",
    category: "ssh",
    level: "core",
    prompt: "Display the randomart of a key for visual fingerprinting.",
    answer: "ssh-keygen -lvf ~/.ssh/id_ed25519.pub",
    explanation:
      "`-v` adds the ASCII randomart picture to the fingerprint output.",
  },
  {
    id: "ssh-keygen-change-format",
    category: "ssh",
    level: "workflow",
    prompt: "Convert an OpenSSH key to PEM format for old tools.",
    answer: "ssh-keygen -p -m PEM -f ~/.ssh/key",
    explanation:
      "`-m PEM` rewrites the key format in place (prompts for passphrase).",
  },
  {
    id: "ssh-config-wildcard",
    category: "ssh",
    level: "workflow",
    prompt: "Apply identity settings to every *.example.com host in config.",
    answer: "Host *.example.com\n  User deploy\n  IdentityFile ~/.ssh/example_key",
    explanation:
      "Host patterns support `*` and `?` — a single block covers many hosts.",
  },
  {
    id: "ssh-config-host-alias-many",
    category: "ssh",
    level: "workflow",
    prompt: "Define one alias 'vps' that also matches its IP address.",
    answer: "Host vps 203.0.113.7\n  HostName 203.0.113.7\n  User admin",
    explanation:
      "Multiple patterns on the Host line make both names resolve to the same settings.",
  },
  {
    id: "ssh-config-include",
    category: "ssh",
    level: "workflow",
    prompt: "Include extra config files from ~/.ssh/config.d/.",
    answer: "Include ~/.ssh/config.d/*",
    explanation:
      "`Include` (OpenSSH 7.3+) merges other config files — great for per-project hosts.",
  },
  {
    id: "ssh-local-command",
    category: "ssh",
    level: "workflow",
    prompt: "Run a local command when connecting (e.g. notify) via config.",
    answer: "LocalCommand echo 'connecting'",
    explanation:
      "`LocalCommand` runs on your machine at connect time (enable with `PermitLocalCommand yes`).",
  },
  {
    id: "ssh-alive-interval-config",
    category: "ssh",
    level: "core",
    prompt: "Set keepalive for all hosts in your config.",
    answer: "Host *\n  ServerAliveInterval 30",
    explanation:
      "A global `Host *` block applies ServerAliveInterval everywhere.",
  },
  {
    id: "ssh-forwarding-x11-config",
    category: "ssh",
    level: "core",
    prompt: "Enable X11 forwarding for one host in config.",
    answer: "ForwardX11 yes",
    explanation:
      "Under a Host block, `ForwardX11 yes` replaces the `-X` flag.",
  },
  {
    id: "ssh-identity-file-priority",
    category: "ssh",
    level: "workflow",
    prompt: "Offer a specific key first when connecting to a host.",
    answer: "IdentityFile ~/.ssh/special_key",
    explanation:
      "`IdentityFile` in the Host block makes that key the first offered.",
  },
  {
    id: "ssh-check-remote-key",
    category: "ssh",
    level: "workflow",
    prompt: "Show the fingerprint of the key stored on the server for you.",
    answer: "ssh user@host 'ssh-keygen -lf ~/.ssh/authorized_keys'",
    explanation:
      "Run ssh-keygen remotely against authorized_keys to list accepted fingerprints.",
  },
  {
    id: "ssh-authorized-keys-command",
    category: "ssh",
    level: "workflow",
    prompt: "Log every successful key login from the server's auth log.",
    answer: "sudo grep Accepted /var/log/auth.log",
    explanation:
      "`Accepted publickey for …` lines in auth.log record each key login.",
  },
  {
    id: "ssh-failed-logins",
    category: "ssh",
    level: "workflow",
    prompt: "Count failed SSH login attempts from the auth log.",
    answer: "grep -c 'Failed password' /var/log/auth.log",
    explanation:
      "Counts brute-force attempts; `grep 'Failed' … | tail` shows the latest.",
  },
  {
    id: "ssh-who-last",
    category: "ssh",
    level: "workflow",
    prompt: "See who logged in over SSH recently.",
    answer: "last -a | head",
    explanation:
      "`last` reads wtmp; `lastb` shows failed attempts (needs root).",
  },
  {
    id: "ssh-iptables-rate-limit",
    category: "ssh",
    level: "workflow",
    prompt: "Rate-limit new SSH connections with a firewall rule.",
    answer: "sudo iptables -A INPUT -p tcp --dport 22 -m state --state NEW -m recent --set",
    explanation:
      "Pair with `--update --seconds 60 --hitcount 4` to block rapid reconnect spamming.",
  },
  {
    id: "ssh-fail2ban-install",
    category: "ssh",
    level: "workflow",
    prompt: "Install fail2ban to auto-ban repeated SSH brute force.",
    answer: "sudo apt install fail2ban",
    explanation:
      "fail2ban watches auth logs and bans offending IPs via iptables.",
  },
  {
    id: "ssh-key-rotation",
    category: "ssh",
    level: "workflow",
    prompt: "Generate a fresh key pair for your current laptop.",
    answer: "ssh-keygen -t ed25519 -C 'me@laptop'",
    explanation:
      "New key + new comment; add the .pub to hosts and retire the old key.",
  },
  {
    id: "ssh-tunnel-one-liner-db",
    category: "ssh",
    level: "workflow",
    prompt: "Tunnel to the staging database without leaving your terminal.",
    answer: "ssh -fN -L 5432:db.internal:5432 user@bastion",
    explanation:
      "Background (`-f`), no command (`-N`), forward local 5432 to the DB through the bastion.",
  },
  {
    id: "ssh-connection-refused-check",
    category: "ssh",
    level: "workflow",
    prompt: "Check whether the remote sshd is listening on the expected port.",
    answer: "nc -zv host 22",
    explanation:
      "`nc -z` probes the port — if it fails, check sshd is running and firewalled.",
  },
  {
    id: "ssh-remote-version",
    category: "ssh",
    level: "workflow",
    prompt: "Check the remote OpenSSH version for security tracking.",
    answer: "ssh user@host 'sshd -V 2>&1'",
    explanation:
      "`sshd -V` prints the server version; `ssh -V` prints your client version.",
  },
  {
    id: "ssh-client-version",
    category: "ssh",
    level: "core",
    prompt: "Print your local OpenSSH client version.",
    answer: "ssh -V",
    explanation:
      "`ssh -V` reports the client version — useful when features behave differently.",
  },
  {
    id: "ssh-keygen-hostkey",
    category: "ssh",
    level: "workflow",
    prompt: "Generate a fresh host key for the server.",
    answer: "sudo ssh-keygen -t ed25519 -f /etc/ssh/ssh_host_ed25519_key",
    explanation:
      "Regenerating host keys invalidates known_hosts entries — do it only when needed.",
  },
  {
    id: "ssh-hostname-check",
    category: "ssh",
    level: "core",
    prompt: "Connect while ignoring the DNS-resolved hostname check.",
    answer: "ssh -o CheckHostIP=no user@host",
    explanation:
      "`CheckHostIP=no` skips verifying the host's IP matches known_hosts — for dynamic DNS setups.",
  },
  {
    id: "ssh-user-known-hosts",
    category: "ssh",
    level: "core",
    prompt: "Use a custom known_hosts file for this connection.",
    answer: "ssh -o UserKnownHostsFile=~/.ssh/known_hosts2 user@host",
    explanation:
      "Point UserKnownHostsFile elsewhere to keep separate host-key registries.",
  },
  {
    id: "ssh-askpass",
    category: "ssh",
    level: "workflow",
    prompt: "Use a graphical passphrase prompt instead of the terminal.",
    answer: "SSH_ASKPASS=ssh-askpass ssh-add",
    explanation:
      "With SSH_ASKPASS set (and no TTY), the agent asks for the passphrase via a GUI.",
  },
  {
    id: "ssh-key-timeout",
    category: "ssh",
    level: "core",
    prompt: "Load your key into the agent with a 1-hour lifetime.",
    answer: "ssh-add -t 3600",
    explanation:
      "`-t` expires the key from the agent after the given seconds.",
  },
  {
    id: "ssh-agent-forward-remote-check",
    category: "ssh",
    level: "workflow",
    prompt: "Check from the remote side whether agent forwarding is active.",
    answer: "echo $SSH_AUTH_SOCK",
    explanation:
      "If SSH_AUTH_SOCK is set remotely, the agent socket was forwarded.",
  },
  {
    id: "ssh-scp-two-hosts",
    category: "ssh",
    level: "workflow",
    prompt: "Copy a file directly between two remote hosts.",
    answer: "scp user1@hostA:/file user2@hostB:/dest",
    explanation:
      "scp transfers between two remotes, streaming through your machine.",
  },
  {
    id: "ssh-tunnel-split-db",
    category: "ssh",
    level: "workflow",
    prompt: "Open tunnels to both the DB and the cache in one connection.",
    answer: "ssh -L 5432:localhost:5432 -L 6379:localhost:6379 user@host",
    explanation:
      "Repeat `-L` to forward multiple ports through a single SSH connection.",
  },
  {
    id: "ssh-print-pubkey",
    category: "ssh",
    level: "core",
    prompt: "Print your public key to copy it into a service's settings.",
    answer: "cat ~/.ssh/id_ed25519.pub",
    explanation:
      "The .pub file is the shareable half — never share the private key.",
  },
  {
    id: "ssh-which-key-offered",
    category: "ssh",
    level: "workflow",
    prompt: "Debug which key was actually used to authenticate.",
    answer: "ssh -v user@host 2>&1 | grep -i 'Offering public key'",
    explanation:
      "Verbose mode prints each key offered; grep filters to the auth lines.",
  },
  {
    id: "ssh-verify-connection",
    category: "ssh",
    level: "workflow",
    prompt: "Verify SSH connectivity in a script and exit cleanly on failure.",
    answer: "ssh -q -o BatchMode=yes -o ConnectTimeout=5 user@host true",
    explanation:
      "`-q` silences output; `true` runs a harmless remote command; exit code reflects success.",
  },
  {
    id: "ssh-env-send",
    category: "ssh",
    level: "workflow",
    prompt: "Send a local environment variable to the remote command.",
    answer: "ssh -o SendEnv=MY_VAR user@host 'echo $MY_VAR'",
    explanation:
      "`SendEnv` forwards the variable if the server's AcceptEnv allows it.",
  },
  {
    id: "ssh-accept-env",
    category: "ssh",
    level: "workflow",
    prompt: "Allow the server to accept LANG from clients.",
    answer: "AcceptEnv LANG",
    explanation:
      "`AcceptEnv` in sshd_config whitelists variables clients may SendEnv.",
  },
  {
    id: "ssh-key-pubkey-lines",
    category: "ssh",
    level: "workflow",
    prompt: "Print each authorized key's comment to inventory access.",
    answer: "cut -d' ' -f3 ~/.ssh/authorized_keys",
    explanation:
      "The comment field (usually the owner's email) gives a quick access inventory.",
  },
  {
    id: "ssh-count-authorized",
    category: "ssh",
    level: "workflow",
    prompt: "Count how many public keys are authorized for your user.",
    answer: "wc -l ~/.ssh/authorized_keys",
    explanation:
      "Each non-comment line is one authorized key.",
  },
  {
    id: "ssh-revoke-key",
    category: "ssh",
    level: "workflow",
    prompt: "Remove a departing employee's key from your account.",
    answer: "sed -i '/comment-or-fingerprint/d' ~/.ssh/authorized_keys",
    explanation:
      "Delete the matching line; verify no session relies on it before applying.",
  },
  {
    id: "ssh-authorized-keys-from",
    category: "ssh",
    level: "workflow",
    prompt: "Point authorized_keys to a file managed elsewhere.",
    answer: "AuthorizedKeysFile .ssh/authorized_keys",
    explanation:
      "`AuthorizedKeysFile` (in sshd_config) can be customized per system policy.",
  },
  {
    id: "ssh-ciphers-list",
    category: "ssh",
    level: "core",
    prompt: "List the ciphers supported by your ssh client.",
    answer: "ssh -Q cipher",
    explanation:
      "`-Q cipher` lists supported ciphers; `-Q kex` lists key-exchange algorithms.",
  },
  {
    id: "ssh-kex-list",
    category: "ssh",
    level: "core",
    prompt: "List supported key-exchange algorithms.",
    answer: "ssh -Q kex",
    explanation:
      "KEX algorithms negotiate the session keys — useful when debugging 'no matching kex'.",
  },
  {
    id: "ssh-mac-list",
    category: "ssh",
    level: "core",
    prompt: "List supported MAC algorithms.",
    answer: "ssh -Q mac",
    explanation:
      "`-Q mac` prints message-authentication algorithms for the connection.",
  },
  {
    id: "ssh-hostkey-alg-list",
    category: "ssh",
    level: "core",
    prompt: "List supported host key algorithms.",
    answer: "ssh -Q hostkey",
    explanation:
      "Host-key algorithm list explains 'no matching host key type' errors.",
  },
  {
    id: "ssh-protocol-compat",
    category: "ssh",
    level: "workflow",
    prompt: "Connect to a legacy host that only supports ssh-rsa host keys.",
    answer: "ssh -o HostKeyAlgorithms=+ssh-rsa user@host",
    explanation:
      "The `+` prefix re-adds an algorithm the defaults dropped.",
  },
  {
    id: "ssh-sha1-sign",
    category: "ssh",
    level: "workflow",
    prompt: "Allow ssh-rsa signing for a very old server that needs SHA-1.",
    answer: "ssh -o PubkeyAcceptedAlgorithms=+ssh-rsa user@host",
    explanation:
      "Re-enabling ssh-rsa is a compatibility fallback for legacy servers.",
  },
  {
    id: "ssh-tunnel-target-local",
    category: "ssh",
    level: "workflow",
    prompt: "Tunnel to a service that only listens on the remote's localhost.",
    answer: "ssh -L 8080:localhost:8080 user@host",
    explanation:
      "Because the tunnel target is `localhost`, it refers to the server's own localhost — the key trick for internal services.",
  },
  {
    id: "ssh-tunnel-target-other",
    category: "ssh",
    level: "workflow",
    prompt: "Tunnel to another machine on the remote network (db2.internal:5432).",
    answer: "ssh -L 5432:db2.internal:5432 user@host",
    explanation:
      "The forward target can be any host reachable from the SSH server, not just localhost.",
  },
  {
    id: "ssh-tunnel-socks-port",
    category: "ssh",
    level: "workflow",
    prompt: "Start a SOCKS proxy on a non-default port to avoid clashes.",
    answer: "ssh -D 9999 user@host",
    explanation:
      "Any free local port works; apps then use localhost:9999 as the proxy.",
  },
  {
    id: "ssh-mosh-alternative",
    category: "ssh",
    level: "workflow",
    prompt: "Use a connection that survives network changes while SSH sessions die.",
    answer: "mosh user@host",
    explanation:
      "Mosh (mobile shell) keeps sessions alive across IP changes — a popular SSH alternative.",
  },
  {
    id: "ssh-screen-remote",
    category: "ssh",
    level: "workflow",
    prompt: "Keep a remote command running after the SSH connection drops.",
    answer: "ssh user@host 'tmux new -d -s job ./long.sh'",
    explanation:
      "Start the job in remote tmux (or screen/nohup) so it survives disconnects.",
  },
  {
    id: "ssh-remote-nohup",
    category: "ssh",
    level: "workflow",
    prompt: "Launch a remote process that ignores SIGHUP on disconnect.",
    answer: "ssh user@host 'nohup ./job.sh > job.log 2>&1 &'",
    explanation:
      "nohup + backgrounding detaches the job from the SSH session.",
  },
  {
    id: "ssh-remote-systemd",
    category: "ssh",
    level: "workflow",
    prompt: "Restart a systemd service on the remote host.",
    answer: "ssh user@host 'sudo systemctl restart app.service'",
    explanation:
      "Run systemctl remotely (use `-t` for the sudo prompt).",
  },
  {
    id: "ssh-remote-service-status",
    category: "ssh",
    level: "core",
    prompt: "Check a service's status on the remote host.",
    answer: "ssh user@host 'systemctl status app'",
    explanation:
      "`systemctl status` shows whether the remote service is running and healthy.",
  },
  {
    id: "ssh-remote-disk",
    category: "ssh",
    level: "core",
    prompt: "Check disk space on the remote host.",
    answer: "ssh user@host 'df -h'",
    explanation:
      "Run df remotely — the quick health check before deploys.",
  },
  {
    id: "ssh-remote-memory",
    category: "ssh",
    level: "core",
    prompt: "Check memory usage on the remote host.",
    answer: "ssh user@host 'free -h'",
    explanation:
      "`free -h` shows RAM/swap usage on the server.",
  },
  {
    id: "ssh-remote-tail",
    category: "ssh",
    level: "workflow",
    prompt: "Tail the application log on the remote server live.",
    answer: "ssh user@host 'tail -f /var/log/app.log'",
    explanation:
      "`tail -f` streams remotely — Ctrl+C stops it without killing the file.",
  },
  {
    id: "ssh-remote-grep-log",
    category: "ssh",
    level: "workflow",
    prompt: "Search yesterday's remote logs for a transaction id.",
    answer: "ssh user@host 'grep abc123 /var/log/app.log.1'",
    explanation:
      "Grep the rotated log remotely to trace a specific event.",
  },
  {
    id: "ssh-remote-disk-largest",
    category: "ssh",
    level: "workflow",
    prompt: "Find the largest files on the remote server's home.",
    answer: "ssh user@host 'du -sh ~/* | sort -rh | head'",
    explanation:
      "Remote du sorted by size — the disk-hog hunt.",
  },
  {
    id: "ssh-remote-process",
    category: "ssh",
    level: "workflow",
    prompt: "Check whether a remote process is running.",
    answer: "ssh user@host 'pgrep -a node'",
    explanation:
      "pgrep remotely lists matching PIDs with command lines.",
  },
  {
    id: "ssh-remote-kill",
    category: "ssh",
    level: "workflow",
    prompt: "Kill a stuck remote process by PID 1234.",
    answer: "ssh user@host 'kill 1234'",
    explanation:
      "Run kill remotely; `kill -9 1234` forces it if SIGTERM is ignored.",
  },
  {
    id: "ssh-remote-cron",
    category: "ssh",
    level: "workflow",
    prompt: "List the remote user's cron jobs.",
    answer: "ssh user@host 'crontab -l'",
    explanation:
      "`crontab -l` prints the remote crontab — verify scheduled jobs exist.",
  },
  {
    id: "ssh-remote-env",
    category: "ssh",
    level: "workflow",
    prompt: "Print the remote shell's environment variables.",
    answer: "ssh user@host 'env | sort'",
    explanation:
      "Inspect the remote environment, e.g. to check PATH on login shells.",
  },
  {
    id: "ssh-login-shell-check",
    category: "ssh",
    level: "workflow",
    prompt: "Confirm which shell the remote user gets on login.",
    answer: "ssh user@host 'echo $SHELL'",
    explanation:
      "$SHELL reveals the login shell — differences here cause many remote gotchas.",
  },
];
