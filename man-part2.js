/* Man-page data — part 2 of 6 (system, process) */
window.MAN = Object.assign(window.MAN || {}, {

  /* ---------- system ---------- */
  uname: {
    desc2: "Prints kernel and machine information: kernel name, hostname, release, version, architecture, and operating system.",
    options: [
      ["-a, --all", "Print all information"],
      ["-r, --kernel-release", "Print the kernel release (e.g. 6.8.0-45-generic)"],
      ["-m, --machine", "Print the machine hardware name (e.g. x86_64)"],
      ["-n, --nodename", "Print the network node hostname"],
      ["-o, --operating-system", "Print the operating system (GNU/Linux)"]
    ],
    seeAlso: ["arch", "hostnamectl", "lsb_release"]
  },
  hostname: {
    desc2: "Shows or sets the system's host name. With no arguments it prints the current name; setting requires root and modern systems use hostnamectl.",
    options: [
      ["-I, --all-ip-addresses", "Print all IP addresses of the host"],
      ["-i, --ip-address", "Print the resolved IP address of the hostname"],
      ["-f, --fqdn", "Print the fully qualified domain name"],
      ["-s, --short", "Print the short hostname (before the first dot)"]
    ],
    seeAlso: ["hostnamectl", "ip", "dig"]
  },
  hostnamectl: {
    desc2: "Queries and changes the system hostname and related settings (static, transient, and pretty names) via systemd, persisting changes to /etc/hostname.",
    options: [
      ["status", "Show current hostname settings (default command)"],
      ["set-hostname NAME", "Set a new hostname"],
      ["set-timezone TZ", "Set the system timezone, e.g. Asia/Jakarta"],
      ["--no-ask-password", "Do not query the user for authentication"]
    ],
    seeAlso: ["hostname", "timedatectl", "uname"]
  },
  uptime: {
    desc2: "Prints the current time, how long the system has been running, the number of logged-in users, and the 1, 5, and 15 minute load averages.",
    options: [
      ["-p, --pretty", "Show uptime in a human-friendly format"],
      ["-s, --since", "Show the exact moment the system booted"],
      ["-i", "Show the idle time of the system"]
    ],
    seeAlso: ["w", "vmstat", "free"]
  },
  whoami: {
    desc2: "Prints the username associated with the current effective user ID — after sudo, this shows root, not the invoking user.",
    options: [
      ["--help", "Display a help message and exit"],
      ["--version", "Display version information and exit"]
    ],
    seeAlso: ["id", "w", "who"]
  },
  id: {
    desc2: "Prints user and group identity: the real and effective UID/GID and all group memberships for the current user or a named user.",
    options: [
      ["-u, --user", "Print only the effective user ID"],
      ["-g, --group", "Print only the effective group ID"],
      ["-G, --groups", "Print all group IDs"],
      ["-n, --name", "Print names instead of numbers (with -u/-g/-G)"]
    ],
    seeAlso: ["whoami", "groups", "w"]
  },
  w: {
    desc2: "Shows who is logged on and what each session is doing: login time, idle time, CPU usage, and the current command for every user.",
    options: [
      ["-h, --no-header", "Do not print the header line"],
      ["-u, --no-current", "Ignore the username when figuring out current process"],
      ["-s, --short", "Use the short format (no login time, JCPU, PCPU)"],
      ["-i, --ip-addr", "Display IP addresses instead of hostnames"]
    ],
    seeAlso: ["who", "uptime", "last"]
  },
  who: {
    desc2: "Prints a list of users currently logged in, with terminal, login time, and remote host for each session.",
    options: [
      ["-a, --all", "Same as -b -d --login -p -r -t -T -u"],
      ["-b, --boot", "Show the time of last system boot"],
      ["-u, --users", "List users logged in, with idle time"],
      ["-q, --count", "Print only login names and the number of users"]
    ],
    seeAlso: ["w", "last", "lastlog"]
  },
  last: {
    desc2: "Reads /var/log/wtmp and lists recent logins, logouts, and reboots, newest first.",
    options: [
      ["-n, --limit", "Tell last how many lines to print"],
      ["-a, --hostlast", "Display the hostname in the last column"],
      ["-F, --fulltimes", "Print full login and logout times and dates"],
      ["-x, --system", "Display system shutdown entries and run level changes"]
    ],
    seeAlso: ["lastlog", "who", "w"]
  },
  lastlog: {
    desc2: "Reports the most recent login of every user (or one user), reading /var/log/lastlog. Users marked **Never logged in** have never signed on.",
    options: [
      ["-u, --user", "Report only for the given login or UID"],
      ["-t, --time", "Print only logins more recent than DAYS days"],
      ["-b, --before", "Print only logins older than DAYS days"]
    ],
    seeAlso: ["last", "who"]
  },
  date: {
    desc2: "Prints the current date and time, or formats it with + directives (%Y year, %m month, %d day, %H:%M:%S time). With root it can also set the clock.",
    options: [
      ["-u, --utc", "Print or set Coordinated Universal Time"],
      ["-d, --date", "Display the time described by STRING, not now"],
      ["-I, --iso-8601", "Output an ISO-8601 date (add =date, =hours, =seconds)"],
      ["-R, --rfc-email", "Output in RFC 5322 format"],
      ["-s, --set", "Set the time described by STRING (root only)"]
    ],
    seeAlso: ["cal", "timedatectl", "touch"]
  },
  cal: {
    desc2: "Displays a simple text calendar for the given month or year, highlighting today's date.",
    options: [
      ["-1", "Show only the current month (default)"],
      ["-3", "Show previous, current, and next month"],
      ["-y", "Show a calendar for the whole year"],
      ["-j", "Display Julian dates (day numbers 1-366)"],
      ["-m", "Start weeks on Monday"]
    ],
    seeAlso: ["date", "timedatectl"]
  },
  timedatectl: {
    desc2: "Queries and changes the system clock and its settings, including timezone and NTP synchronization, through systemd.",
    options: [
      ["status", "Show current time settings (default)"],
      ["set-time TIME", "Set the system clock to a specific time"],
      ["set-timezone TZ", "Set the system timezone"],
      ["list-timezones", "List all known timezones"],
      ["set-ntp BOOL", "Enable or disable network time synchronization"]
    ],
    seeAlso: ["date", "hostnamectl", "cal"]
  },
  lscpu: {
    desc2: "Displays CPU architecture information gathered from sysfs and /proc/cpuinfo: model, cores, threads, sockets, caches, and flags.",
    options: [
      ["-e, --extended", "Print CPU information in human-readable table form"],
      ["-p, --parse", "Optimize output for easy parsing"],
      ["-s, --sysroot", "Collect CPU data for a different Linux instance"]
    ],
    seeAlso: ["nproc", "lsmem", "uname"]
  },
  lspci: {
    desc2: "Lists all PCI buses and devices attached to them — graphics cards, network interfaces, controllers — with vendor and device identification.",
    options: [
      ["-v, -vv", "Be verbose (more v's means more detail)"],
      ["-k", "Show kernel drivers handling each device"],
      ["-nn", "Show both numeric IDs and names"],
      ["-s slot", "Show only devices in the given slot"]
    ],
    seeAlso: ["lsusb", "lsmod", "lscpu"]
  },
  lsusb: {
    desc2: "Displays information about USB buses and the devices connected to them.",
    options: [
      ["-t", "Dump the physical USB device hierarchy as a tree"],
      ["-v, --verbose", "Print detailed device descriptors"],
      ["-d vendor:product", "Show only devices with the given vendor and product ID"],
      ["-s bus:devnum", "Show only the device on the given bus/device number"]
    ],
    seeAlso: ["lspci", "dmesg"]
  },
  lsmod: {
    desc2: "Shows the status of loaded kernel modules by formatting /proc/modules, listing each module's size and which other modules use it.",
    options: [
      ["-V, --version", "Display the kmod version"],
      ["-h, --help", "Display help text"]
    ],
    seeAlso: ["modprobe", "rmmod", "insmod"]
  },
  lsmem: {
    desc2: "Lists the ranges of available memory blocks with their online status and total memory size, useful on systems with memory hotplug.",
    options: [
      ["-a, --all", "List each individual memory block"],
      ["-b, --bytes", "Print sizes in bytes rather than human-readable form"],
      ["-n, --noheadings", "Do not print a header line"],
      ["-o, --output", "Select output columns"]
    ],
    seeAlso: ["free", "lscpu"]
  },
  free: {
    desc2: "Displays the amount of free and used physical and swap memory, plus the buffers and caches the kernel is using. 'available' is the realistic free figure.",
    options: [
      ["-h, --human", "Show all fields in human-readable units"],
      ["-s, --seconds", "Repeat printing every N seconds"],
      ["-m", "Display in mebibytes"],
      ["-g", "Display in gibibytes"],
      ["-t, --total", "Print a line showing column totals"]
    ],
    seeAlso: ["vmstat", "lsmem", "top"]
  },
  vmstat: {
    desc2: "Reports virtual memory statistics: processes, memory, paging, block IO, traps, and CPU activity, per interval.",
    options: [
      ["-s, --stats", "Display a table of various event counters and memory stats"],
      ["-a, --active", "Display active and inactive memory"],
      ["-w, --wide", "Wide output mode for large values"],
      ["-t, --timestamp", "Append a timestamp to each line"]
    ],
    seeAlso: ["iostat", "mpstat", "free"]
  },
  iostat: {
    desc2: "Reports CPU utilization and I/O statistics for block devices — throughput, request sizes, queue lengths, and wait times (-x extended stats).",
    options: [
      ["-x", "Display extended statistics (await, %util, aqu-sz)"],
      ["-c", "Display only the CPU utilization report"],
      ["-d", "Display only the device utilization report"],
      ["-m", "Display statistics in megabytes per second"],
      ["-p device|ALL", "Report for partitions of a device or all"]
    ],
    seeAlso: ["vmstat", "mpstat", "sar"]
  },
  mpstat: {
    desc2: "Reports processor-related statistics; with -P ALL it breaks usage down per CPU core, exposing imbalanced workloads.",
    options: [
      ["-P cpu-list|ALL", "Report for the given CPUs or all cores"],
      ["-u", "Report CPU utilization (default)"],
      ["-I keyword", "Report interrupt statistics"],
      ["-V", "Print version number"]
    ],
    seeAlso: ["sar", "vmstat", "iostat"]
  },
  sar: {
    desc2: "Collects, reports, and saves system activity: CPU, memory, paging, I/O, interrupts, and network counters. Historical data lives in /var/log/sa.",
    options: [
      ["-u", "Report CPU utilization (default)"],
      ["-r", "Report memory utilization statistics"],
      ["-b", "Report I/O and transfer rate statistics"],
      ["-n DEV", "Report network statistics per interface"],
      ["-f file", "Extract records from a saved activity file"]
    ],
    seeAlso: ["iostat", "mpstat", "vmstat"]
  },
  dmesg: {
    desc2: "Prints the kernel ring buffer: boot messages and hardware events (USB, disks, OOM kills, driver errors). -w follows new messages like a log tail.",
    options: [
      ["-w, --follow", "Wait for new messages (like tail -f)"],
      ["-T, --ctime", "Print human-readable timestamps"],
      ["-l, --level", "Restrict output to the given log levels"],
      ["-H, --human", "Human-friendly output: colors, paging, timestamps"],
      ["-C, --clear", "Clear the ring buffer"]
    ],
    seeAlso: ["journalctl", "lsusb", "lspci"]
  },
  journalctl: {
    desc2: "Queries the systemd journal, the structured log store for the whole system and all services, with filters by unit, boot, priority, and time range.",
    options: [
      ["-u, --unit", "Show messages from the specified service unit"],
      ["-f, --follow", "Follow the journal, printing new entries (like tail -f)"],
      ["-b, --boot", "Show messages from a specific boot (-1 = previous boot)"],
      ["-p, --priority", "Filter by priority: 0 emerg ... 7 debug"],
      ["--since, --until", "Filter by time, e.g. --since '1 hour ago'"],
      ["-k, --dmesg", "Show only kernel messages"],
      ["--disk-usage", "Show total disk usage of all journal files"]
    ],
    seeAlso: ["dmesg", "systemctl", "logger"]
  },
  arch: {
    desc2: "Prints the machine hardware name, equivalent to uname -m (e.g. x86_64, aarch64).",
    options: [
      ["--help", "Display a help message and exit"],
      ["--version", "Display version information and exit"]
    ],
    seeAlso: ["uname", "lscpu"]
  },
  nproc: {
    desc2: "Prints the number of processing units available to the current process, honoring affinity masks — the number to use for make -j.",
    options: [
      ["--all", "Print the number of installed processors, ignoring affinity"],
      ["--ignore N", "If possible, exclude N processing units"]
    ],
    seeAlso: ["lscpu", "make"]
  },
  tty: {
    desc2: "Prints the file name of the terminal connected to standard input (e.g. /dev/pts/3), or 'not a tty' when stdin is redirected.",
    options: [
      ["-s, --silent", "Print nothing; return an exit status only"]
    ],
    seeAlso: ["stty", "who", "w"]
  },
  stty: {
    desc2: "Prints or changes terminal line settings: baud rate, window size, echo, special character bindings, and raw/cooked modes.",
    options: [
      ["-a, --all", "Print all current settings in human-readable form"],
      ["-g, --save", "Print settings as a stty argument string"],
      ["-F, --file", "Open and use the specified device instead of stdin"],
      ["size", "Print the terminal size as rows columns"]
    ],
    seeAlso: ["tty", "mesg", "script"]
  },
  lsb_release: {
    desc2: "Prints Linux Standard Base and distribution information: distributor ID, description, release, and codename.",
    options: [
      ["-a, --all", "Display all of the above information"],
      ["-d, --description", "Display the distribution description"],
      ["-r, --release", "Display the release number"],
      ["-c, --codename", "Display the distribution codename"]
    ],
    seeAlso: ["uname", "hostnamectl", "inxi"]
  },
  inxi: {
    desc2: "A feature-rich system information tool that summarizes CPU, memory, graphics, audio, network, and disk details in one readable, optionally colored report.",
    options: [
      ["-b", "Basic output with the essentials"],
      ["-F", "Full output: most features in fixed order"],
      ["-x", "Add extra detail to the line items"],
      ["-z", "Filter sensitive data (IPs, MACs) for safe sharing"],
      ["-c scheme", "Set the color scheme (0 disables color)"]
    ],
    seeAlso: ["lsb_release", "lscpu", "free"]
  },

  /* ---------- process ---------- */
  ps: {
    desc2: "Reports a snapshot of currently running processes. BSD-style (ps aux) and UNIX-style (ps -ef) flags both work, plus custom output with -o.",
    options: [
      ["aux", "Show every process of every user with CPU/MEM stats (BSD style)"],
      ["-ef", "Show every process in full format (UNIX style)"],
      ["-o, --format", "Custom output columns, e.g. pid,ppid,%cpu,cmd"],
      ["-p, --pid", "Select by process ID list"],
      ["-u, --user", "Select by effective user name or ID"],
      ["--forest", "Draw an ASCII art process tree"]
    ],
    seeAlso: ["top", "pgrep", "pstree", "kill"]
  },
  top: {
    desc2: "A live, updating display of processes ordered by CPU or memory use, with system-wide load, CPU, and memory summaries at the top.",
    options: [
      ["-o FIELD", "Sort by the named field, e.g. -o %MEM"],
      ["-p pid", "Monitor only the given process IDs"],
      ["-u user", "Monitor only that user's processes"],
      ["-b, --batch", "Batch mode for scripting (no interaction)"],
      ["-d secs", "Delay between screen updates"]
    ],
    seeAlso: ["htop", "ps", "pidstat"]
  },
  htop: {
    desc2: "An interactive, colorful process viewer with mouse support, per-CPU meters, and easy kill/renice — a modern replacement for top.",
    options: [
      ["-t, --tree", "Show processes in tree view by default"],
      ["-u user", "Show only processes of the given user"],
      ["-p pid", "Show only the given PIDs"],
      ["-d delay", "Set the delay between updates in tenths of seconds"]
    ],
    seeAlso: ["top", "ps", "pgrep"]
  },
  kill: {
    desc2: "Sends a signal to processes by PID. The default is SIGTERM (polite request to exit); SIGKILL (9) cannot be caught and forces termination.",
    options: [
      ["-s, --signal", "Specify the signal to send, by name or number"],
      ["-l, --list", "List signal names and numbers"],
      ["-9 (SIGKILL)", "Kill immediately; the process cannot clean up"],
      ["-15 (SIGTERM)", "Ask the process to terminate gracefully (default)"],
      ["-HUP (SIGHUP)", "Hangup; many daemons reload configuration on it"]
    ],
    seeAlso: ["pkill", "killall", "trap", "ps"]
  },
  killall: {
    desc2: "Sends a signal to every process running under the given exact command names. Use pkill when you need pattern matching instead.",
    options: [
      ["-i, --interactive", "Ask for confirmation before killing"],
      ["-u, --user", "Kill only processes owned by the given user"],
      ["-w, --wait", "Wait until all killed processes have died"],
      ["-9, --signal", "Choose the signal (default TERM)"]
    ],
    seeAlso: ["pkill", "kill", "pgrep"]
  },
  pkill: {
    desc2: "Sends a signal to processes selected by name pattern and other attributes (user, terminal, parent) — kill with grep-like matching.",
    options: [
      ["-f", "Match the pattern against the full command line"],
      ["-u, --euid", "Select only processes whose effective user matches"],
      ["-9", "Send SIGKILL instead of SIGTERM"],
      ["-n, --newest", "Select only the newest matching process"],
      ["-x, --exact", "Require an exact match of the process name"]
    ],
    seeAlso: ["pgrep", "killall", "kill"]
  },
  pgrep: {
    desc2: "Finds process IDs whose name (or full command line with -f) matches a pattern, printing their PIDs — the query half of pkill.",
    options: [
      ["-a, --list-full", "List the full command line as well as the PID"],
      ["-f, --full", "Match against the full command line"],
      ["-l, --list-name", "List the process name as well as the PID"],
      ["-u, --euid", "Match only processes of the given user"],
      ["-x, --exact", "Match the process name exactly"]
    ],
    seeAlso: ["pkill", "ps", "pidof"]
  },
  nice: {
    desc2: "Runs a command with an adjusted scheduling priority. Higher niceness (up to 19) yields CPU to others; negative values grab more and require root.",
    options: [
      ["-n, --adjustment", "Add N to the niceness (default 10)"],
      ["--help", "Display help and exit"]
    ],
    seeAlso: ["renice", "nohup"]
  },
  renice: {
    desc2: "Alters the scheduling priority of one or more running processes, users, or process groups without restarting them.",
    options: [
      ["-n priority", "Specify the new niceness value"],
      ["-p, --pid", "Interpret arguments as process IDs (default)"],
      ["-u, --user", "Interpret arguments as usernames or UIDs"],
      ["-g, --pgrp", "Interpret arguments as process group IDs"]
    ],
    seeAlso: ["nice", "ps"]
  },
  nohup: {
    desc2: "Runs a command immune to hangup signals, so it keeps running after you log out; output goes to nohup.out unless redirected. Usually combined with & to background it.",
    options: [
      ["--help", "Display help and exit"],
      ["--version", "Display version information and exit"]
    ],
    seeAlso: ["screen", "tmux", "disown", "bg"]
  },
  bg: {
    desc2: "Resumes a stopped (Ctrl-Z) job in the background, as if it had been started with &.",
    options: [
      ["job_id", "Resume the job with the given id, e.g. %1 (default: current job)"]
    ],
    seeAlso: ["fg", "jobs", "disown"]
  },
  fg: {
    desc2: "Brings a backgrounded or stopped job to the foreground, reconnecting it to the terminal.",
    options: [
      ["job_id", "Select the job, e.g. %1 (default: current job)"]
    ],
    seeAlso: ["bg", "jobs"]
  },
  jobs: {
    desc2: "Lists the jobs started from the current shell with their state (Running, Stopped) and job id (%1, %2).",
    options: [
      ["-l", "List process IDs in addition to normal information"],
      ["-p", "List only the process IDs"],
      ["-r", "Restrict output to running jobs"],
      ["-s", "Restrict output to stopped jobs"]
    ],
    seeAlso: ["bg", "fg", "disown"]
  },
  disown: {
    desc2: "Removes a job from the shell's job table (or marks it to ignore SIGHUP), so it survives the shell exiting — a rescue for jobs started without nohup.",
    options: [
      ["-h", "Mark the job to not receive SIGHUP, but keep it in the table"],
      ["-a", "Disown all jobs"],
      ["-r", "Disown only running jobs"]
    ],
    seeAlso: ["nohup", "jobs", "bg"]
  },
  time: {
    desc2: "Runs a command and reports real (wall-clock), user, and system CPU time it consumed.",
    options: [
      ["-f format", "Use a custom output format (GNU time)"],
      ["-p", "Use the portable output format"],
      ["-v", "Verbose: also report memory usage (GNU time)"]
    ],
    seeAlso: ["timeout", "watch"]
  },
  timeout: {
    desc2: "Runs a command and kills it if it is still running after the given duration, exiting with status 124 — a safety net for scripts that may hang.",
    options: [
      ["-s, --signal", "Send this signal instead of TERM when time is up"],
      ["-k, --kill-after", "Send KILL if the process is still alive this long after the first signal"],
      ["--preserve-status", "Exit with the command's status even when timing out"],
      ["duration suffixes", "s seconds (default), m minutes, h hours, d days"]
    ],
    seeAlso: ["time", "watch", "kill"]
  },
  watch: {
    desc2: "Runs a command repeatedly (every 2 s by default) in a full-screen view, perfect for monitoring output like df -h or service status.",
    options: [
      ["-n, --interval", "Seconds between updates (fractions allowed)"],
      ["-d, --differences", "Highlight changes between updates"],
      ["-t, --no-title", "Turn off the header showing the command and interval"],
      ["-g, --chgexit", "Exit when the visible output changes"]
    ],
    seeAlso: ["time", "tail", "top"]
  },
  pstree: {
    desc2: "Draws running processes as a tree rooted at init/systemd, showing parent-child relationships; identical subtrees are collapsed with counts.",
    options: [
      ["-p", "Show PIDs (also disables collapsing)"],
      ["-u", "Show UID changes when a process's user differs"],
      ["-a", "Show command-line arguments"],
      ["-s pid", "Show the parent chain of the given process"]
    ],
    seeAlso: ["ps", "top", "kill"]
  },
  pidof: {
    desc2: "Prints the process IDs of all running instances of the named program; used heavily by init scripts.",
    options: [
      ["-s, --single", "Return only one PID"],
      ["-x", "Also match scripts with the given name"],
      ["-o pid", "Omit the given PID (or %PPID for the parent)"]
    ],
    seeAlso: ["pgrep", "ps"]
  },
  pidstat: {
    desc2: "Reports per-process statistics from /proc: CPU (-u), memory (-r), I/O (-d), context switches (-w) for selected or all tasks.",
    options: [
      ["-u", "Report CPU utilization (default)"],
      ["-r", "Report paging and memory utilization"],
      ["-d", "Report I/O statistics (kB read/written per second)"],
      ["-p pid|ALL", "Monitor the given PID or all tasks"]
    ],
    seeAlso: ["iostat", "vmstat", "top"]
  },
  strace: {
    desc2: "Intercepts and records the system calls a program makes and the signals it receives — the definitive tool for debugging 'why does this fail?' (open, stat, connect...).",
    options: [
      ["-p, --attach", "Attach to the running process with the given PID"],
      ["-f", "Follow child processes as they are created"],
      ["-e trace=set", "Trace only the named syscalls, e.g. -e trace=network"],
      ["-c", "Count time, calls, and errors per syscall"],
      ["-o file", "Write the trace to a file instead of stderr"]
    ],
    seeAlso: ["ltrace", "lsof", "gdb"]
  },
  ltrace: {
    desc2: "Runs a program while intercepting its calls to shared libraries (like malloc or strcmp), complementing strace which traces kernel calls.",
    options: [
      ["-p, --attach", "Attach to the running process with the given PID"],
      ["-f", "Trace child processes too"],
      ["-l, --library", "Display only calls to functions from the given library"],
      ["-c", "Print a statistical summary instead of a trace"]
    ],
    seeAlso: ["strace", "ldd", "gdb"]
  },
  exec: {
    desc2: "Replaces the current shell process with the given command — no new PID, and the command inherits the shell's file descriptors. Common as PID 1 in containers.",
    options: [
      ["-l", "Prefix argv[0] of the executed command with a dash (login shell behavior)"],
      ["-c", "Execute the command with an empty environment"],
      ["exec > file", "Redirect all subsequent shell output to file"]
    ],
    seeAlso: ["bash", "nohup", "trap"]
  },
  ulimit: {
    desc2: "Gets or sets resource limits for the shell and processes it starts: open files, max processes, stack size, core dump size.",
    options: [
      ["-a", "Show all current limits"],
      ["-n N", "Set/show the maximum number of open file descriptors"],
      ["-u N", "Set/show the maximum number of user processes"],
      ["-H", "Operate on the hard limit"],
      ["-S", "Operate on the soft limit (default)"]
    ],
    seeAlso: ["bash", "ps"]
  },
  lsof: {
    desc2: "Lists open files — regular files, sockets, pipes, devices — and the processes holding them. The classic way to find what is using a port or a mounted filesystem.",
    options: [
      ["-i :port", "List processes using a network port, e.g. -i :80"],
      ["-i proto", "List network files of a protocol, e.g. -i tcp"],
      ["-u user", "List files opened by the given user"],
      ["-p pid", "List files opened by the given PID"],
      ["+D dir", "Recursively list open files under a directory"],
      ["-n, -P", "Skip host/port name resolution (faster output)"]
    ],
    seeAlso: ["ss", "netstat", "ps"]
  },
  trap: {
    desc2: "Arranges for the shell to run commands when a signal arrives or when the shell exits — the basis of cleanup handlers in scripts.",
    options: [
      ["-l", "Print a list of signal names and numbers"],
      ["-p", "Print the trap commands associated with each signal"],
      ["trap '' SIG", "Ignore the signal"],
      ["trap - SIG", "Reset the signal to its default handling"]
    ],
    seeAlso: ["kill", "bash", "exec"]
  }
});
