/* Man-page data — part 3 of 6 (network, users) */
window.MAN = Object.assign(window.MAN || {}, {

  /* ---------- network ---------- */
  ping: {
    desc2: "Sends ICMP ECHO_REQUEST packets to a host and reports each reply's round-trip time, verifying reachability and measuring latency and packet loss.",
    options: [
      ["-c count", "Stop after sending count packets"],
      ["-i interval", "Seconds between packets (fractions with root)"],
      ["-s size", "Set the payload size in bytes"],
      ["-W timeout", "Time to wait for a response, in seconds"],
      ["-4 / -6", "Force IPv4 or IPv6"]
    ],
    seeAlso: ["traceroute", "mtr", "ip"]
  },
  ip: {
    desc2: "The modern tool for configuring networking: addresses (ip a), routes (ip r), links (ip l), neighbors, and tunnels. Replaces ifconfig, route, and arp.",
    options: [
      ["a / addr", "Show or change addresses: ip a, ip addr add 10.0.0.5/24 dev eth0"],
      ["r / route", "Show or change the routing table: ip route add default via ..."],
      ["l / link", "Show or change interfaces: ip link set eth0 up"],
      ["-s", "Add statistics (errors, drops) to the output"],
      ["-brief", "Short one-line-per-item output"]
    ],
    seeAlso: ["ifconfig", "ss", "netstat"]
  },
  ifconfig: {
    desc2: "Configures or displays network interfaces the legacy way. Still common in older docs and tutorials, but ip is the modern replacement.",
    sec: 8,
    options: [
      ["up / down", "Activate or deactivate the interface"],
      ["netmask addr", "Set the network mask"],
      ["addr", "Set the IP address of the interface"],
      ["-a", "Show all interfaces, including ones that are down"]
    ],
    seeAlso: ["ip", "netstat", "ethtool"]
  },
  netstat: {
    desc2: "Shows network connections, listening ports, routing tables, and interface statistics. Superseded by ss and ip on modern systems.",
    options: [
      ["-t, --tcp", "Show TCP sockets"],
      ["-u, --udp", "Show UDP sockets"],
      ["-l, --listening", "Show only listening sockets"],
      ["-n, --numeric", "Show numeric addresses and ports (no DNS lookups)"],
      ["-p, --programs", "Show the PID and program owning each socket"],
      ["-r, --route", "Show the routing table"]
    ],
    seeAlso: ["ss", "ip", "lsof"]
  },
  ss: {
    desc2: "Dumps socket statistics directly from the kernel — the fast modern replacement for netstat. Same popular flag pattern: ss -tulpn.",
    options: [
      ["-t, --tcp", "Display TCP sockets"],
      ["-u, --udp", "Display UDP sockets"],
      ["-l, --listening", "Display listening sockets"],
      ["-n, --numeric", "Do not resolve service names"],
      ["-p, --processes", "Show process using each socket"],
      ["-s, --summary", "Print summary statistics"],
      ["state NAME", "Filter by state, e.g. state established"]
    ],
    seeAlso: ["netstat", "ip", "lsof"]
  },
  curl: {
    desc2: "Transfers data from or to a server using URL syntax, supporting HTTP(S), FTP, and many more protocols — the standard command-line HTTP client.",
    options: [
      ["-O, --remote-name", "Save the file under its remote name"],
      ["-o, --output", "Write output to the given file"],
      ["-s, --silent", "Silent mode: no progress meter, no errors"],
      ["-I, --head", "Fetch only the HTTP headers (HEAD request)"],
      ["-L, --location", "Follow HTTP redirects"],
      ["-X, --request", "Use a specific HTTP method, e.g. -X POST"],
      ["-d, --data", "Send data in a POST request (form-encoded)"],
      ["-H, --header", "Add a custom request header"]
    ],
    seeAlso: ["wget", "nc", "ssh"]
  },
  wget: {
    desc2: "Downloads files from the web non-interactively, with recursive mirroring, resume support, and timestamping for incremental syncs.",
    options: [
      ["-c, --continue", "Resume a partially downloaded file"],
      ["-O, --output-document", "Write to the given file instead of the remote name"],
      ["-r, --recursive", "Download recursively (combine with -np: no parents)"],
      ["-q, --quiet", "Turn off all output"],
      ["-b, --background", "Go to background after startup"],
      ["--limit-rate", "Limit the download speed, e.g. 200k"]
    ],
    seeAlso: ["curl", "rsync"]
  },
  ssh: {
    desc2: "Encrypts a remote login session over the network. Also tunnels TCP connections (-L) and runs one-off remote commands (ssh host cmd).",
    options: [
      ["-i file", "Use the given private key file"],
      ["-p port", "Connect to the given port (default 22)"],
      ["-L local:remote", "Forward a local port to a remote service"],
      ["-N", "Do not execute a remote command (tunnels only)"],
      ["-t", "Force pseudo-terminal allocation"],
      ["-v", "Verbose mode (more v's = more detail)"]
    ],
    seeAlso: ["scp", "sftp", "ssh-keygen", "rsync"]
  },
  scp: {
    desc2: "Copies files between hosts over an encrypted SSH connection, using the same authentication and options as ssh.",
    options: [
      ["-r", "Copy directories recursively"],
      ["-i file", "Use the given private key file"],
      ["-P port", "Connect to the given port (capital P here)"],
      ["-C", "Enable compression"],
      ["-p", "Preserve modification times and modes"]
    ],
    seeAlso: ["ssh", "rsync", "sftp"]
  },
  sftp: {
    desc2: "Opens an interactive, ftp-like session over SSH with commands like get, put, ls, and cd — useful where scp's one-shot model is too rigid.",
    options: [
      ["-P port", "Connect to the given port"],
      ["-i file", "Use the given private key file"],
      ["-b batchfile", "Run commands from a file non-interactively"],
      ["-C", "Enable compression"]
    ],
    seeAlso: ["scp", "ssh", "rsync"]
  },
  rsync: {
    desc2: "Synchronizes files and directories, transferring only the differences — fast for backups and mirrors. Works locally or over SSH. Mind the trailing slash semantics.",
    options: [
      ["-a, --archive", "Archive mode: recursive, preserves permissions, times, links"],
      ["-v, --verbose", "Increase verbosity"],
      ["-z, --compress", "Compress data during the transfer"],
      ["--delete", "Delete files in the destination that vanished at the source"],
      ["-n, --dry-run", "Show what would be done without doing it"],
      ["-P", "Same as --partial --progress: resumable with progress bar"]
    ],
    seeAlso: ["scp", "cp", "ssh"]
  },
  nc: {
    desc2: "Netcat reads and writes data across TCP or UDP connections — test ports, transfer files, listen as a server, or debug protocols by hand.",
    options: [
      ["-z", "Scan without sending data (port check)"],
      ["-v", "Verbose: report what happens"],
      ["-l", "Listen mode: act as a server"],
      ["-p port", "Specify the local source port"],
      ["-u", "Use UDP instead of TCP"],
      ["-w secs", "Timeout for connects and final reads"]
    ],
    seeAlso: ["ssh", "tcpdump", "socat"]
  },
  nmap: {
    desc2: "Scans hosts and networks to discover live machines, open ports, and running services (-sV), the standard tool for network inventory and security audits.",
    options: [
      ["-p range", "Scan only the given ports, e.g. -p 22,80,443 or 1-1000"],
      ["-sV", "Probe open ports to determine service/version"],
      ["-sS", "TCP SYN stealth scan (needs root)"],
      ["-O", "Enable OS detection"],
      ["-A", "Aggressive: OS + version + scripts + traceroute"],
      ["-Pn", "Skip host discovery; treat all hosts as online"]
    ],
    sec: 8,
    seeAlso: ["nc", "tcpdump", "ping"]
  },
  traceroute: {
    desc2: "Prints the path (routers) packets take to reach a host, with round-trip times per hop — for locating where latency or loss appears.",
    options: [
      ["-n", "Do not resolve hostnames (faster)"],
      ["-m hops", "Set the maximum number of hops"],
      ["-I", "Use ICMP ECHO instead of UDP"],
      ["-q n", "Number of probes per hop (default 3)"]
    ],
    seeAlso: ["mtr", "ping", "dig"]
  },
  mtr: {
    desc2: "Combines traceroute and ping, continuously probing every hop on the route and displaying live loss and latency statistics.",
    options: [
      ["-r, --report", "Report mode: print statistics and exit"],
      ["-c count", "Stop after count probes"],
      ["-n, --no-dns", "Do not resolve hostnames"],
      ["-4 / -6", "Force IPv4 or IPv6"]
    ],
    seeAlso: ["traceroute", "ping"]
  },
  dig: {
    desc2: "Queries DNS servers for any record type (A, AAAA, MX, TXT, NS...) with full control and detailed answers — the standard DNS debugging tool.",
    options: [
      ["+short", "Print only the essential answer"],
      ["+trace", "Trace delegation from the root servers down"],
      ["@server", "Query a specific DNS server, e.g. @8.8.8.8"],
      ["-x addr", "Reverse lookup for an IP address"],
      ["type", "Record type to query: A, AAAA, MX, TXT, NS, SOA..."]
    ],
    seeAlso: ["nslookup", "host", "ping"]
  },
  nslookup: {
    desc2: "Queries DNS interactively or one-shot for addresses and records; simpler than dig but less detailed. dig or host are usually preferred.",
    options: [
      ["name", "Look up the given name"],
      ["server", "Use the given DNS server for the query"],
      ["-type=T", "Set the query record type, e.g. -type=MX"],
      ["-querytype=T", "Alias for -type"]
    ],
    seeAlso: ["dig", "host"]
  },
  host: {
    desc2: "A simple DNS lookup utility that converts names to addresses and back, and can fetch MX, NS, and other records.",
    options: [
      ["-t type", "Specify the record type, e.g. -t MX"],
      ["-a", "Verbose 'all' output"],
      ["-C", "Compare SOA records across authoritative servers"],
      ["-T", "Use TCP for the query"]
    ],
    seeAlso: ["dig", "nslookup"]
  },
  whois: {
    desc2: "Queries WHOIS databases for the registration record of a domain or IP: registrar, creation and expiry dates, contacts, and nameservers.",
    options: [
      ["-h host", "Connect to the given WHOIS server"],
      ["-H", "Hide legal disclaimers"],
      ["-p port", "Connect to the given port"]
    ],
    seeAlso: ["dig", "host"]
  },
  route: {
    desc2: "Shows or manipulates the kernel IP routing table the legacy way (route -n). The modern replacement is ip route.",
    sec: 8,
    options: [
      ["-n", "Show numeric addresses (no DNS resolution)"],
      ["add", "Add a route: route add -net ... gw ..."],
      ["del", "Delete a route"],
      ["-e", "Use netstat-style verbose output"]
    ],
    seeAlso: ["ip", "netstat"]
  },
  arp: {
    desc2: "Displays and modifies the kernel's ARP cache, which maps IP addresses to MAC addresses on the local network. ip neigh is the modern form.",
    options: [
      ["-a", "Display the cache in BSD style (all entries)"],
      ["-n", "Show numeric addresses"],
      ["-d address", "Delete the cache entry for an address"],
      ["-s addr hwaddr", "Add a static ARP entry"]
    ],
    sec: 8,
    seeAlso: ["ip", "netstat"]
  },
  ethtool: {
    desc2: "Queries and controls network interface driver settings: link speed, duplex, autonegotiation, offloads, and ring buffer sizes.",
    sec: 8,
    options: [
      ["interface", "Show interface settings and link state"],
      ["-i interface", "Show driver and firmware information"],
      ["-S interface", "Show NIC-specific statistics counters"],
      ["-s interface", "Change settings, e.g. speed 1000 duplex full autoneg off"]
    ],
    seeAlso: ["ip", "ifconfig", "lspci"]
  },
  tcpdump: {
    desc2: "Captures packets on an interface and prints them in human-readable form or saves them to a pcap file for analysis in Wireshark. Filters use pcap syntax.",
    sec: 8,
    options: [
      ["-i interface", "Listen on the given interface (or any)"],
      ["-w file", "Write raw packets to a pcap file"],
      ["-r file", "Read packets from a pcap file"],
      ["-n", "Do not resolve hostnames or ports"],
      ["-c count", "Stop after count packets"],
      ["-A", "Print each packet as ASCII (for HTTP debugging)"],
      ["filter", "e.g. 'port 80', 'host 10.0.0.5', 'tcp and dst port 443'"]
    ],
    seeAlso: ["nmap", "nc", "ss"]
  },
  iptables: {
    desc2: "Configures the legacy netfilter firewall: rules in chains (INPUT, OUTPUT, FORWARD) that accept, drop, or NAT packets. nftables is the modern successor.",
    sec: 8,
    options: [
      ["-L, --list", "List the rules in a chain (add -n for numeric, -v for counters)"],
      ["-A chain rule", "Append a rule, e.g. -A INPUT -p tcp --dport 22 -j ACCEPT"],
      ["-D chain rule", "Delete a rule"],
      ["-P chain target", "Set the default policy of a chain"],
      ["-t table", "Select a table: filter (default), nat, mangle, raw"],
      ["-j target", "Jump target: ACCEPT, DROP, REJECT, SNAT, DNAT, MASQUERADE"]
    ],
    seeAlso: ["nft", "ufw", "firewall-cmd"]
  },
  nft: {
    desc2: "Configures nftables, the modern kernel packet filtering framework that replaces iptables, with one unified syntax for filtering and NAT.",
    sec: 8,
    options: [
      ["list ruleset", "Show the complete active configuration"],
      ["add table family name", "Create a table, e.g. add table inet filter"],
      ["add chain ...", "Create a chain within a table"],
      ["add rule ...", "Add a filtering/NAT rule to a chain"],
      ["-f file", "Load rules from a script file"]
    ],
    seeAlso: ["iptables", "ufw"]
  },
  ufw: {
    desc2: "Uncomplicated Firewall — a friendly Ubuntu/Debian frontend for iptables/nftables designed for simple allow/deny rules on a single host.",
    sec: 8,
    options: [
      ["enable / disable", "Turn the firewall on or off"],
      ["status verbose", "Show rules and logging state"],
      ["allow service|port", "Allow traffic, e.g. ufw allow 22 or ufw allow ssh"],
      ["deny / reject", "Drop or refuse matching traffic"],
      ["default allow|deny", "Set the default incoming/outgoing policy"]
    ],
    seeAlso: ["firewall-cmd", "iptables", "nft"]
  },
  "firewall-cmd": {
    desc2: "Controls firewalld, the dynamic firewall manager on Fedora/RHEL systems, using zones (public, trusted, ...) instead of raw rules.",
    sec: 8,
    options: [
      ["--state", "Check whether firewalld is active"],
      ["--list-all", "Show the active zone's services, ports, and rules"],
      ["--add-service=NAME", "Allow a service, e.g. http; add --permanent to persist"],
      ["--add-port=P/PROTO", "Open a port, e.g. 8080/tcp"],
      ["--reload", "Reload the firewall configuration"]
    ],
    seeAlso: ["ufw", "iptables", "nft"]
  },
  "ssh-keygen": {
    desc2: "Generates, converts, and manages SSH key pairs for authentication. Ed25519 is the recommended modern algorithm.",
    options: [
      ["-t type", "Key type: ed25519 (recommended), rsa, ecdsa"],
      ["-b bits", "Key size in bits (for RSA, use 4096)"],
      ["-f file", "Key file to write/read"],
      ["-C comment", "Attach a comment, typically user@host"],
      ["-N passphrase", "Set the passphrase on the command line (empty = none)"]
    ],
    seeAlso: ["ssh", "ssh-copy-id"]
  },
  "ssh-copy-id": {
    desc2: "Appends your public key to the remote host's ~/.ssh/authorized_keys so future ssh logins need no password.",
    options: [
      ["-i file", "Copy the given identity (public key) file"],
      ["-f", "Force: do not check if the key is already present"],
      ["-n", "Dry run: print the keys that would be installed"],
      ["-p port", "Connect to the given port"]
    ],
    seeAlso: ["ssh-keygen", "ssh"]
  },
  socat: {
    desc2: "Establishes two bidirectional byte streams and copies between them — connect anything to anything: TCP, UDP, UNIX sockets, files, processes.",
    options: [
      ["TCP-LISTEN:port", "Listen for a TCP connection (add ,fork for multiple)"],
      ["TCP:host:port", "Open a TCP client connection"],
      ["UNIX-CONNECT:path", "Connect to a UNIX domain socket"],
      ["EXEC:cmd", "Run a program and attach it to the stream"],
      ["-, !!", "Use stdin/stdout as one of the two endpoints"]
    ],
    seeAlso: ["nc", "ssh"]
  },
  telnet: {
    desc2: "Opens a plaintext TCP session to a host and port. Historically a remote login protocol; today mostly used to test whether a TCP port answers.",
    options: [
      ["host port", "Connect to the given host and port"],
      ["-4 / -6", "Force IPv4 or IPv6"],
      ["-l user", "Specify the remote user name"]
    ],
    seeAlso: ["nc", "ssh"]
  },

  /* ---------- users ---------- */
  useradd: {
    desc2: "Creates a user account and updates /etc/passwd, /etc/shadow, and group files. Debian systems usually prefer the friendlier adduser.",
    sec: 8,
    options: [
      ["-m, --create-home", "Create the user's home directory"],
      ["-s, --shell", "Set the login shell, e.g. /bin/bash"],
      ["-G, --groups", "Add the user to these supplementary groups"],
      ["-c, --comment", "Set the full name / comment field"],
      ["-u, --uid", "Choose a specific user ID"],
      ["-e, --expiredate", "Set the account expiry date"]
    ],
    seeAlso: ["usermod", "userdel", "adduser", "passwd"]
  },
  userdel: {
    desc2: "Removes a user account and its entries from the system files; -r also deletes the home directory and mail spool.",
    sec: 8,
    options: [
      ["-r, --remove", "Delete the home directory and mail spool"],
      ["-f, --force", "Force removal even if the user is logged in"],
      ["-Z, --selinux-user", "Remove the SELinux user mapping"]
    ],
    seeAlso: ["useradd", "usermod"]
  },
  usermod: {
    desc2: "Modifies an existing account: change shell, home directory, groups, expiry, or lock state.",
    sec: 8,
    options: [
      ["-aG, --append groups", "Add the user to supplementary groups (always use -a with -G)"],
      ["-s, --shell", "Change the login shell"],
      ["-d, --home", "Change the home directory (add -m to move contents)"],
      ["-L / -U", "Lock / unlock the password"],
      ["-l, --login", "Rename the account"]
    ],
    seeAlso: ["useradd", "groups", "gpasswd", "passwd"]
  },
  adduser: {
    desc2: "The friendly, interactive user creation script on Debian/Ubuntu: creates the home directory, copies skel files, and prompts for a password and details.",
    sec: 8,
    options: [
      ["--disabled-password", "Create the account without a usable password (key-based auth)"],
      ["--ingroup GROUP", "Add the user to GROUP as the initial group"],
      ["--system", "Create a system account (low UID, no password)"],
      ["--gecos GECOS", "Skip the finger information prompts"]
    ],
    seeAlso: ["useradd", "deluser", "passwd"]
  },
  deluser: {
    desc2: "The Debian/Ubuntu counterpart of adduser for removing users and groups, with options to clean up home and mail files.",
    sec: 8,
    options: [
      ["--remove-home", "Remove the home directory and mail spool"],
      ["--backup", "Back up files before removing them"],
      ["--group", "Remove a group instead of a user"]
    ],
    seeAlso: ["adduser", "userdel"]
  },
  groupadd: {
    desc2: "Creates a new group, updating /etc/group (and gshadow). Users are then added with usermod -aG or gpasswd -a.",
    sec: 8,
    options: [
      ["-g, --gid", "Use a specific group ID"],
      ["-r, --system", "Create a system group (GID below 1000)"],
      ["-f, --force", "Succeed even if the group already exists"]
    ],
    seeAlso: ["groupdel", "groupmod", "gpasswd"]
  },
  groupdel: {
    desc2: "Deletes a group from the system files. A group that is some user's primary group cannot be removed.",
    sec: 8,
    options: [
      ["-f, --force", "Delete the group even if it is a primary group"],
      ["-R, --root", "Operate in a chroot directory"]
    ],
    seeAlso: ["groupadd", "groupmod"]
  },
  groupmod: {
    desc2: "Modifies a group's definition: rename it or change its GID.",
    sec: 8,
    options: [
      ["-n, --new-name", "Rename the group"],
      ["-g, --gid", "Change the group ID (files keep the old GID unless fixed)"]
    ],
    seeAlso: ["groupadd", "groupdel"]
  },
  groups: {
    desc2: "Prints the names of all groups a user belongs to — the first is the primary (login) group.",
    options: [
      ["--help", "Display help and exit"],
      ["--version", "Display version information and exit"]
    ],
    seeAlso: ["id", "newgrp", "gpasswd"]
  },
  newgrp: {
    desc2: "Starts a new shell whose effective group ID is the named group, so newly created files get that group without logging out.",
    options: [
      ["-", "Simulate a full login (reset the environment)"],
      ["group", "Switch to the named group (must be a member)"]
    ],
    seeAlso: ["groups", "gpasswd", "su"]
  },
  gpasswd: {
    desc2: "Administers /etc/group: add or remove members and set group administrators or passwords.",
    options: [
      ["-a, --add", "Add a user to the group"],
      ["-d, --delete", "Remove a user from the group"],
      ["-M, --members", "Set the complete member list"],
      ["-A, --administrators", "Set the list of group administrators"]
    ],
    sec: 8,
    seeAlso: ["usermod", "groups", "groupadd"]
  },
  passwd: {
    desc2: "Changes a user's password by updating the shadow entry. Regular users may only change their own; root can change any account.",
    options: [
      ["-l, --lock", "Lock the account's password"],
      ["-u, --unlock", "Unlock the account's password"],
      ["-e, --expire", "Expire the password, forcing a change at next login"],
      ["-d, --delete", "Delete the password (passwordless login)"],
      ["-S, --status", "Display password status information"]
    ],
    seeAlso: ["chage", "useradd", "su"]
  },
  chage: {
    desc2: "Views and changes password aging policy: minimum/maximum days between changes, warning period, and account expiration.",
    sec: 8,
    options: [
      ["-l, --list", "Show the account's aging information"],
      ["-M, --maxdays", "Maximum number of days a password stays valid"],
      ["-W, --warndays", "Days of warning before expiry"],
      ["-E, --expiredate", "Date the account expires (YYYY-MM-DD)"]
    ],
    seeAlso: ["passwd", "usermod"]
  },
  chown: {
    desc2: "Changes the owning user and/or group of files. With -R it walks directory trees; ownership changes require root.",
    sec: 8,
    options: [
      ["-R, --recursive", "Operate on files and directories recursively"],
      ["-h", "Change the symlink itself, not its target"],
      ["-c, --changes", "Report only files whose ownership actually changed"],
      ["--reference=R", "Use the owner/group of file R as the reference"]
    ],
    seeAlso: ["chgrp", "chmod", "ls"]
  },
  chgrp: {
    desc2: "Changes the group ownership of files — the group-only half of chown.",
    options: [
      ["-R, --recursive", "Operate recursively on directories"],
      ["-h", "Change symbolic links themselves"],
      ["-c, --changes", "Report only changed files"],
      ["--reference=R", "Use file R's group as the reference"]
    ],
    seeAlso: ["chown", "chmod", "groups"]
  },
  chmod: {
    desc2: "Changes file permission bits using octal modes (755) or symbolic expressions (u+x, go-w) for owner, group, and others.",
    options: [
      ["-R, --recursive", "Change files and directories recursively"],
      ["-c, --changes", "Report only files that actually changed"],
      ["-v, --verbose", "Describe every file processed"],
      ["modes", "Octal: 755, 644; symbolic: u+x, g-w, o=r, a+rX"]
    ],
    seeAlso: ["chown", "chgrp", "umask"]
  },
  umask: {
    desc2: "Shows or sets the file-creation mask: permission bits subtracted from defaults (0666 files, 0777 dirs). 022 → files 644; 027 → group-readable, private.",
    options: [
      ["mask", "Set the mask, e.g. umask 027"],
      ["-S", "Display the mask symbolically, e.g. u=rwx,g=rx,o="],
      ["-p", "Print as a reusable shell command"]
    ],
    seeAlso: ["chmod", "mkdir", "bash"]
  },
  getent: {
    desc2: "Fetches entries from system name-service databases (passwd, group, hosts, services) including LDAP/NIS backends, showing what the system really resolves.",
    options: [
      ["database", "The database to query: passwd, group, hosts, ..."],
      ["key", "Optional key, e.g. a username for passwd"],
      ["-s, --service", "Restrict to a specific service from nsswitch.conf"]
    ],
    seeAlso: ["id", "groups", "hostname"]
  },
  su: {
    desc2: "Runs a shell as another user (root by default). su - starts a full login shell with the target's environment; plain su keeps most of yours.",
    options: [
      ["-, -l, --login", "Start a login shell with the target user's environment"],
      ["-c, --command", "Run a single command, then exit"],
      ["-s, --shell", "Use the given shell instead of the target's"],
      ["-m, --preserve-environment", "Keep the current environment"]
    ],
    seeAlso: ["sudo", "login", "bash"]
  },
  sudo: {
    desc2: "Executes a command as root or another user, as authorized by /etc/sudoers, with full audit logging of what was run.",
    sec: 8,
    options: [
      ["-i, --login", "Simulate an initial login as the target user"],
      ["-u, --user", "Run the command as the given user"],
      ["-l, --list", "List the commands you may run via sudo"],
      ["-s, --shell", "Run a shell as the target user"],
      ["-k, --reset-timestamp", "Invalidate the cached credentials (force re-auth)"],
      ["-E, --preserve-env", "Keep the user's environment where permitted"]
    ],
    seeAlso: ["su", "visudo"]
  },
  visudo: {
    desc2: "Edits the sudoers file with exclusive locking and syntax validation, preventing a broken file from locking everyone out of root.",
    sec: 8,
    options: [
      ["-f, --file", "Edit the given file instead of /etc/sudoers"],
      ["-c, --check", "Check the file for syntax errors only"],
      ["-s, --strict", "Strict mode: complain about unknown defaults"]
    ],
    seeAlso: ["sudo", "su"]
  },
  login: {
    desc2: "Begins a new session on the system, prompting for a username and password. Normally invoked automatically by getty on virtual consoles.",
    options: [
      ["-p, --preserve-environment", "Do not reset the environment"],
      ["-f, --skip-authentication", "Skip authentication (used by other programs)"],
      ["-h host", "Record the remote host name (network logins)"]
    ],
    seeAlso: ["su", "logout", "sudo"]
  },
  logout: {
    desc2: "Exits a login shell, ending the session and returning the terminal to the login prompt.",
    options: [
      ["--help", "Display help and exit"],
      ["--version", "Display version information and exit"]
    ],
    seeAlso: ["login", "exit", "su"]
  }
});
