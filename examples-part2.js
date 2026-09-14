/* Expanded examples — part 2 of 3 (process, network, users, packages) */
window.EXAMPLES = Object.assign(window.EXAMPLES || {}, {

  /* ---------- process ---------- */
  ps: [
    ["ps aux", "Every process, BSD style"],
    ["ps -ef --forest", "Process tree, UNIX style"],
    ["ps -u alice -o pid,%cpu,%mem,cmd", "One user, chosen columns"],
    ["ps aux --sort=-%mem | head", "Case: top memory consumers"],
    ["ps -p $$ -o comm=", "Case: name of the current shell"]
  ],
  top: [
    ["top", "Live process overview"],
    ["top -o %MEM", "Sort by memory"],
    ["top -p 1234", "Watch a single PID"],
    ["top -b -n 1 | head -15", "Case: one-shot snapshot for scripts"]
  ],
  htop: [
    ["htop", "Interactive viewer"],
    ["htop -u alice", "One user only"],
    ["htop -t", "Tree view by default"]
  ],
  kill: [
    ["kill 1234", "Ask PID 1234 to terminate (SIGTERM)"],
    ["kill -9 1234", "Force-kill a stuck process"],
    ["kill -HUP 4321", "Case: tell a daemon to reload its config"],
    ["kill -l", "List signal names and numbers"]
  ],
  killall: [
    ["killall firefox", "Kill every firefox process"],
    ["killall -u bob python", "Only bob's python processes"],
    ["killall -w app", "Wait until the processes are gone"]
  ],
  pkill: [
    ["pkill -f 'python app.py'", "Case: match the full command line"],
    ["pkill -u alice node", "All of alice's node processes"],
    ["pkill -HUP nginx", "Send SIGHUP to matching processes"]
  ],
  pgrep: [
    ["pgrep -a nginx", "PIDs plus command lines"],
    ["pgrep -f node", "Match full command lines"],
    ["pgrep -c chrome", "Case: count matching processes"]
  ],
  nice: [
    ["nice -n 10 ./backup.sh", "Run with lower priority"],
    ["sudo nice -n -5 make", "Higher priority (needs root)"],
    ["nice tar czf backup.tgz /data", "Case: keep backups from hogging CPU"]
  ],
  renice: [
    ["sudo renice -n 10 -p 1234", "Lower a running job's priority"],
    ["sudo renice -n 5 -u alice", "Case: all of alice's processes at once"]
  ],
  nohup: [
    ["nohup ./server.sh &", "Survive logout, output to nohup.out"],
    ["nohup long-job.sh > out.log 2>&1 &", "Case: custom log, errors included"]
  ],
  bg: [
    ["bg", "Resume the stopped job in background"],
    ["bg %2", "Resume job number 2"]
  ],
  fg: [
    ["fg", "Bring the job to the foreground"],
    ["fg %1", "Foreground job 1"]
  ],
  jobs: [
    ["jobs", "List this shell's jobs"],
    ["jobs -l", "Include PIDs"],
    ["jobs -r", "Only running ones"]
  ],
  disown: [
    ["disown %1", "Case: job survives shell exit"],
    ["disown -h %1", "Keep in list, but ignore SIGHUP"],
    ["disown -a", "Disown every job"]
  ],
  time: [
    ["time make", "Case: how long does the build take?"],
    ["time sleep 1", "Sanity check: real vs user/sys time"],
    ["{ time long-job.sh ; } 2> timing.txt", "Save timing to a file"]
  ],
  timeout: [
    ["timeout 30s ./test.sh", "Kill after 30 seconds"],
    ["timeout -s KILL 5m wget big.iso", "Hard KILL after 5 minutes"],
    ["timeout -k 10 30 ./flaky", "TERM at 30 s, KILL 10 s later"],
    ["timeout 2 curl -s http://host || echo down", "Case: quick reachability probe"]
  ],
  watch: [
    ["watch -n 1 'df -h'", "Case: disk usage, refreshed every second"],
    ["watch -d uptime", "Highlight what changes"],
    ["watch -g 'systemctl is-active app'", "Exit when the output changes"]
  ],
  pstree: [
    ["pstree", "The process family tree"],
    ["pstree -p alice", "One user's tree with PIDs"],
    ["pstree -s 1234", "Case: ancestry chain of one process"]
  ],
  pidof: [
    ["pidof sshd", "PIDs of the sshd daemon"],
    ["pidof -s bash", "Just one PID"]
  ],
  pidstat: [
    ["pidstat -u 2", "CPU per process every 2 s"],
    ["pidstat -d -p 1234", "Disk I/O of one process"],
    ["pidstat -r 1 5", "Case: memory/paging, five samples"]
  ],
  strace: [
    ["strace -f ls", "Syscalls of a command and its children"],
    ["sudo strace -p 1234", "Attach to a running process"],
    ["strace -e trace=network curl x.com", "Network syscalls only"],
    ["strace -c ./app", "Case: syscall time histogram"],
    ["strace -f -o trace.txt ./app", "Save a full trace for analysis"]
  ],
  ltrace: [
    ["ltrace ./a.out", "Library calls of a program"],
    ["ltrace -c ./app", "Summary of library call time"],
    ["ltrace -e malloc ./app", "Case: watch one function"]
  ],
  exec: [
    ["exec > log.txt 2>&1", "Case: redirect everything this shell prints"],
    ["exec nginx -g 'daemon off;'", "Case: replace the shell as PID 1 in containers"],
    ["exec < input.txt", "Read stdin from a file"]
  ],
  ulimit: [
    ["ulimit -a", "All current limits"],
    ["ulimit -n 4096", "Case: raise the open-file limit for this shell"],
    ["ulimit -u", "Max user processes"]
  ],
  trap: [
    ["trap 'rm -f \"$tmp\"' EXIT", "Case: clean up temp files on exit"],
    ["trap '' SIGINT", "Ignore Ctrl-C"],
    ["trap - INT", "Restore default Ctrl-C handling"],
    ["trap 'echo caught' USR1", "React to a custom signal"]
  ],
  lsof: [
    ["sudo lsof -i :80", "Case: who is listening on port 80?"],
    ["lsof -u alice", "Files opened by one user"],
    ["lsof +D /var/www", "Everything open under a directory"],
    ["sudo lsof /mnt/usb", "Case: why does umount say 'device busy'?"],
    ["lsof -p 1234", "Open files of one process"]
  ],

  /* ---------- network ---------- */
  ping: [
    ["ping -c 4 google.com", "Four pings then stop"],
    ["ping -i 0.2 8.8.8.8", "Fast probes (needs root)"],
    ["ping -M do -s 1472 host", "Case: test path MTU without fragmentation"]
  ],
  ip: [
    ["ip a", "Addresses on all interfaces"],
    ["ip route", "Routing table and default gateway"],
    ["sudo ip link set eth0 up", "Bring an interface up"],
    ["sudo ip addr add 10.0.0.5/24 dev eth0", "Add an IP address"],
    ["ip -brief a", "Case: compact address overview"]
  ],
  ifconfig: [
    ["ifconfig", "Interface overview (legacy)"],
    ["sudo ifconfig eth0 up", "Enable an interface"],
    ["ifconfig eth0 | grep inet", "Case: just its IP address"]
  ],
  netstat: [
    ["netstat -tulpn", "Case: all listening ports and their owners"],
    ["netstat -rn", "Routing table, numeric"],
    ["netstat -s | head", "Protocol statistics"]
  ],
  ss: [
    ["ss -tulpn", "Case: listening sockets with processes"],
    ["ss -tn state established", "Established TCP connections"],
    ["ss -s", "Socket summary counts"],
    ["ss -tn dst 10.0.0.5", "Connections to one host"]
  ],
  curl: [
    ["curl -O https://example.com/file.tgz", "Download keeping the remote name"],
    ["curl -s https://api.example.com | jq", "Case: silent API call piped to jq"],
    ["curl -I https://example.com", "Headers only"],
    ["curl -L -o page.html url", "Follow redirects into a file"],
    ["curl -X POST -d 'user=me' https://api/form", "POST form data"],
    ["curl -H 'Authorization: Bearer TOK' url", "Authenticated request"]
  ],
  wget: [
    ["wget -c big.iso", "Case: resume an interrupted download"],
    ["wget -q url -O out.html", "Quiet, custom output name"],
    ["wget -r -np -k https://site/docs/", "Mirror a docs section offline"],
    ["wget --limit-rate 200k big.iso", "Don't hog the connection"]
  ],
  ssh: [
    ["ssh alice@host", "Interactive login"],
    ["ssh -i key.pem ec2-user@host", "Log in with a specific key"],
    ["ssh alice@host 'df -h'", "Case: run one remote command"],
    ["ssh -L 8080:db:5432 alice@host", "Case: tunnel a remote database to localhost"],
    ["ssh -p 2222 alice@host", "Non-standard port"]
  ],
  scp: [
    ["scp file.txt alice@host:/tmp/", "Upload one file"],
    ["scp alice@host:/var/log/app.log .", "Download one file"],
    ["scp -r dir/ alice@host:backup/", "Copy a tree"],
    ["scp -C big.log alice@host:/tmp/", "Case: compress in transit"]
  ],
  sftp: [
    ["sftp alice@host", "Interactive session (get/put/ls)"],
    ["sftp -b jobs.txt alice@host", "Case: batch transfers from a script"]
  ],
  rsync: [
    ["rsync -avz dir/ alice@host:/backup/", "Case: incremental backup over SSH"],
    ["rsync -av --delete src/ dst/", "Mirror exactly, removing stale files"],
    ["rsync -nP big.iso host:/data/", "Resumable with progress bar"],
    ["rsync -avn src/ dst/", "Dry run: what would change?"],
    ["rsync -av --exclude '.git' src/ dst/", "Sync without .git"]
  ],
  nc: [
    ["nc -zv host 80", "Case: is a remote port open?"],
    ["nc -l 9999 < file", "Send a file to whoever connects"],
    ["nc host 9999 > received", "Receive it on the other side"],
    ["nc -u -l 5000", "Listen on UDP"]
  ],
  nmap: [
    ["nmap -p 22,80,443 host", "Check specific ports"],
    ["nmap -sV host", "Service and version detection"],
    ["sudo nmap -sS 192.168.1.0/24", "Case: stealth-scan the LAN"],
    ["nmap -sn 10.0.0.0/24", "Host discovery only (ping scan)"]
  ],
  traceroute: [
    ["traceroute 8.8.8.8", "Route to a host"],
    ["traceroute -n example.com", "Skip DNS lookups (faster)"],
    ["traceroute -I host", "Use ICMP probes"]
  ],
  mtr: [
    ["mtr -r -c 100 host", "Case: 100-probe report, then exit"],
    ["mtr host", "Live per-hop loss and latency"]
  ],
  dig: [
    ["dig example.com", "A record, full answer"],
    ["dig +short example.com", "Just the addresses"],
    ["dig MX example.com", "Mail servers"],
    ["dig @8.8.8.8 example.com", "Case: ask a specific resolver"],
    ["dig +trace example.com", "Follow delegation from the root"]
  ],
  nslookup: [
    ["nslookup example.com", "Resolve a name"],
    ["nslookup -type=MX example.com", "Mail records"],
    ["nslookup example.com 8.8.8.8", "Query a specific server"]
  ],
  host: [
    ["host example.com", "Quick name resolution"],
    ["host -t MX example.com", "Mail servers"],
    ["host 8.8.8.8", "Case: reverse lookup"]
  ],
  whois: [
    ["whois example.com", "Registration record"],
    ["whois -h whois.ripe.net 1.1.1.1", "Query a specific registry"]
  ],
  route: [
    ["route -n", "Routing table (legacy)"],
    ["sudo route add -net 10.1.0.0/16 gw 10.0.0.1", "Case: add a static route"]
  ],
  arp: [
    ["arp -a", "The neighbor cache"],
    ["arp -n", "Numeric output"],
    ["sudo arp -d 10.0.0.7", "Remove one entry"]
  ],
  ethtool: [
    ["ethtool eth0", "Link speed and duplex"],
    ["sudo ethtool -s eth0 speed 1000 duplex full autoneg off", "Pin the link settings"],
    ["ethtool -i eth0", "Driver and firmware"],
    ["ethtool -S eth0 | grep -i error", "Case: NIC error counters"]
  ],
  tcpdump: [
    ["sudo tcpdump -i eth0 port 80", "Watch HTTP traffic live"],
    ["sudo tcpdump -w cap.pcap host 10.0.0.5", "Case: capture for Wireshark"],
    ["sudo tcpdump -r cap.pcap -A", "Replay a capture as ASCII"],
    ["sudo tcpdump -ni any 'tcp[tcpflags] & tcp-syn != 0'", "Case: incoming connection attempts"]
  ],
  iptables: [
    ["sudo iptables -L -n -v", "List rules with counters"],
    ["sudo iptables -A INPUT -p tcp --dport 22 -j ACCEPT", "Allow SSH"],
    ["sudo iptables -A INPUT -s 10.0.0.0/8 -j DROP", "Block a network"],
    ["sudo iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE", "Case: NAT for routing"]
  ],
  nft: [
    ["sudo nft list ruleset", "Dump the active firewall"],
    ["sudo nft add table inet filter", "Create a base table"],
    ["sudo nft add rule inet filter input tcp dport 22 accept", "Case: allow SSH"]
  ],
  ufw: [
    ["sudo ufw allow 22", "Open SSH"],
    ["sudo ufw enable", "Turn the firewall on"],
    ["sudo ufw status verbose", "Show rules and defaults"],
    ["sudo ufw deny from 10.0.0.5", "Case: block one host"]
  ],
  "firewall-cmd": [
    ["sudo firewall-cmd --list-all", "Active zone configuration"],
    ["sudo firewall-cmd --add-service=http --permanent", "Allow HTTP (persistent)"],
    ["sudo firewall-cmd --reload", "Apply permanent changes"],
    ["sudo firewall-cmd --add-port=8080/tcp", "Case: open a port right now"]
  ],
  "ssh-keygen": [
    ["ssh-keygen -t ed25519", "Modern key pair with defaults"],
    ["ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa", "4096-bit RSA at a chosen path"],
    ["ssh-keygen -lf ~/.ssh/id_ed25519.pub", "Show a key's fingerprint"],
    ["ssh-keygen -R host", "Case: forget an old host key"]
  ],
  "ssh-copy-id": [
    ["ssh-copy-id alice@host", "Install your key for passwordless login"],
    ["ssh-copy-id -i ~/.ssh/id_ed25519.pub alice@host", "Choose which key to install"]
  ],
  socat: [
    ["socat TCP-LISTEN:8080,fork TCP:host:80", "Case: simple TCP proxy"],
    ["socat - UNIX-CONNECT:/var/run/app.sock", "Talk to a UNIX socket"],
    ["socat TCP:host:80 -", "Manual HTTP session"]
  ],
  telnet: [
    ["telnet host 25", "Case: probe an SMTP port by hand"],
    ["telnet localhost 6379", "Chat with a local Redis"]
  ],

  /* ---------- users ---------- */
  useradd: [
    ["sudo useradd -m -s /bin/bash alice", "Account with home dir and bash"],
    ["sudo useradd -G docker,sudo bob", "Add supplementary groups"],
    ["sudo useradd -e 2026-12-31 temp", "Case: account that expires"],
    ["sudo useradd -r svcuser", "System account, no login"]
  ],
  userdel: [
    ["sudo userdel alice", "Remove the account"],
    ["sudo userdel -r alice", "Also delete home and mail"],
    ["sudo userdel -f alice", "Force, even if logged in"]
  ],
  usermod: [
    ["sudo usermod -aG docker alice", "Case: add to a group (keeps existing groups)"],
    ["sudo usermod -s /bin/zsh bob", "Change login shell"],
    ["sudo usermod -L alice", "Lock the account"],
    ["sudo usermod -d /srv/alice -m alice", "Move the home directory"]
  ],
  adduser: [
    ["sudo adduser alice", "Interactive: home, password, details"],
    ["sudo adduser --system svc", "System service account"],
    ["sudo adduser --disabled-password deploy", "Case: key-only login account"]
  ],
  deluser: [
    ["sudo deluser alice", "Remove the account"],
    ["sudo deluser --remove-home alice", "Account plus its files"],
    ["sudo deluser --remove-home --backup alice", "Case: back up the home dir while removing"]
  ],
  groupadd: [
    ["sudo groupadd devs", "Create a group"],
    ["sudo groupadd -g 2000 team", "With a specific GID"]
  ],
  groupdel: [
    ["sudo groupdel devs", "Delete a group"],
    ["sudo groupdel -f oldteam", "Force, even if it is a primary group"]
  ],
  groupmod: [
    ["sudo groupmod -n engineers devs", "Rename a group"],
    ["sudo groupmod -g 2500 team", "Change the GID"]
  ],
  groups: [
    ["groups", "Groups you belong to"],
    ["groups alice", "Another user's groups"]
  ],
  newgrp: [
    ["newgrp docker", "Case: use a new group without re-login"],
    ["newgrp - devs", "Switch group with a fresh environment"]
  ],
  gpasswd: [
    ["sudo gpasswd -a alice devs", "Add a member"],
    ["sudo gpasswd -d bob devs", "Remove a member"],
    ["sudo gpasswd -M 'alice,bob' devs", "Case: set the exact member list"]
  ],
  passwd: [
    ["passwd", "Change your own password"],
    ["sudo passwd alice", "Change someone else's"],
    ["sudo passwd -l alice", "Lock an account"],
    ["sudo passwd -e alice", "Case: force a change at next login"]
  ],
  chage: [
    ["sudo chage -l alice", "Show password aging"],
    ["sudo chage -M 90 alice", "Expire the password every 90 days"],
    ["sudo chage -W 7 alice", "Warn a week before expiry"]
  ],
  chown: [
    ["sudo chown alice notes.txt", "Change the owner"],
    ["sudo chown -R www-data:www-data /var/www", "Case: fix a web root recursively"],
    ["chown --reference=a.txt b.txt", "Copy ownership from another file"]
  ],
  chgrp: [
    ["sudo chgrp devs /srv/project", "Change the group"],
    ["sudo chgrp -R devs src/", "Case: recursive group change"]
  ],
  chmod: [
    ["chmod 755 script.sh", "Owner rwx, others rx"],
    ["chmod u+x run.sh", "Grant just the owner execute"],
    ["chmod -R g+w team/", "Group write on a tree"],
    ["chmod go-rwx secret/", "Case: make a file private"]
  ],
  umask: [
    ["umask", "Show the current mask"],
    ["umask 027", "Case: new files private to you and your group"],
    ["umask -S", "Symbolic view: u=rwx,g=rx,o="]
  ],
  getent: [
    ["getent passwd alice", "User record as the system sees it"],
    ["getent group docker", "Group members"],
    ["getent hosts db.internal", "Case: name resolution including LDAP/hosts"]
  ],
  su: [
    ["su -", "Root login shell"],
    ["su - alice", "Become alice with her environment"],
    ["su -c 'systemctl restart nginx'", "Case: one root command, then back"]
  ],
  sudo: [
    ["sudo apt update", "One command as root"],
    ["sudo -i", "Full root login shell"],
    ["sudo -u postgres psql", "Case: run as a specific non-root user"],
    ["sudo -l", "What may I run?"],
    ["sudo -k", "Forget my cached credentials"]
  ],
  visudo: [
    ["sudo visudo", "Edit sudoers safely"],
    ["sudo visudo -f /etc/sudoers.d/team", "Drop-in file for a team"],
    ["sudo visudo -c", "Just check the syntax"]
  ],
  login: [
    ["login", "Start a session"],
    ["login alice", "Log in directly as alice"]
  ],
  logout: [
    ["logout", "End a login shell"],
    ["exit", "Case: equivalent in most shells"]
  ],

  /* ---------- packages ---------- */
  apt: [
    ["sudo apt update && sudo apt upgrade", "Case: refresh indexes, then upgrade"],
    ["sudo apt install htop git", "Install several packages"],
    ["apt search 'json parser'", "Search the catalog"],
    ["apt show curl", "Package details"],
    ["sudo apt purge nginx", "Remove package and its config"],
    ["sudo apt autoremove", "Reclaim space from old dependencies"]
  ],
  "apt-get": [
    ["sudo apt-get install -y build-essential", "Case: unattended install for scripts"],
    ["sudo apt-get dist-upgrade", "Upgrade with dependency changes"],
    ["sudo apt-get clean", "Delete cached .deb files"]
  ],
  aptitude: [
    ["aptitude search nginx", "Rich pattern search"],
    ["sudo aptitude install vim", "Install with the smarter resolver"],
    ["aptitude", "Case: full-screen package browser"]
  ],
  dpkg: [
    ["sudo dpkg -i pkg.deb", "Install a local .deb"],
    ["dpkg -l | grep nginx", "Installed packages matching a name"],
    ["dpkg -S /usr/bin/curl", "Case: which package owns this file?"],
    ["dpkg -L coreutils", "Files installed by a package"]
  ],
  yum: [
    ["sudo yum install nginx", "Install a package"],
    ["sudo yum update", "Update everything"],
    ["yum search log", "Search summaries"],
    ["yum info htop", "Package details"]
  ],
  dnf: [
    ["sudo dnf upgrade", "Update all packages"],
    ["sudo dnf install git", "Install a package"],
    ["sudo dnf autoremove", "Drop unneeded dependencies"],
    ["dnf repoquery --installed | wc -l", "Case: count installed packages"]
  ],
  rpm: [
    ["rpm -qa | grep bash", "Installed packages matching bash"],
    ["rpm -qf /usr/bin/wget", "Case: which package owns a file?"],
    ["sudo rpm -Uvh pkg.rpm", "Upgrade or install"],
    ["rpm -V nginx", "Verify files against the database"]
  ],
  pacman: [
    ["sudo pacman -Syu", "Case: sync databases and upgrade all (the Arch ritual)"],
    ["sudo pacman -S htop", "Install a package"],
    ["pacman -Ss vim", "Search repositories"],
    ["sudo pacman -Rns vim", "Remove with config and unneeded deps"]
  ],
  yay: [
    ["yay -S visual-studio-code-bin", "Install from the AUR"],
    ["yay -Syu", "Upgrade official and AUR packages"],
    ["yay -Ss spotify", "Case: search repos and the AUR together"]
  ],
  zypper: [
    ["sudo zypper install vim", "Install a package"],
    ["sudo zypper refresh && sudo zypper update", "Refresh, then update"],
    ["zypper search -s kernel", "Case: search every kernel package"]
  ],
  apk: [
    ["sudo apk add curl", "Install a package"],
    ["sudo apk update && sudo apk upgrade", "Refresh and upgrade"],
    ["apk search -v nginx", "Verbose search"]
  ],
  snap: [
    ["sudo snap install code --classic", "Case: install VS Code with full system access"],
    ["snap list", "Installed snaps"],
    ["sudo snap refresh", "Update all snaps"]
  ],
  flatpak: [
    ["flatpak install flathub org.gimp.GIMP", "Install GIMP from Flathub"],
    ["flatpak list", "Installed apps and runtimes"],
    ["flatpak update", "Update everything"]
  ],
  pip: [
    ["pip install requests", "Install from PyPI"],
    ["pip install -r requirements.txt", "Install a project's dependencies"],
    ["pip freeze > requirements.txt", "Case: pin the current environment"],
    ["pip install --user httpie", "Per-user install without root"]
  ],
  npm: [
    ["npm install express", "Add a dependency"],
    ["npm run build", "Run a package.json script"],
    ["npm i -g typescript", "Global CLI tool"],
    ["npm ci", "Case: clean install from the lockfile (CI)"]
  ],
  gem: [
    ["gem install bundler", "Install a gem"],
    ["gem list --local", "Installed gems"],
    ["gem update", "Update all gems"]
  ],
  cargo: [
    ["cargo new app", "Scaffold a new project"],
    ["cargo build --release", "Optimized build"],
    ["cargo test", "Run the test suite"],
    ["cargo add serde", "Case: add a dependency crate"]
  ]
});
