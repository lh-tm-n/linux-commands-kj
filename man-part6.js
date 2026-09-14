/* Man-page data — part 6 of 6 (services, dev) */
window.MAN = Object.assign(window.MAN || {}, {

  /* ---------- services ---------- */
  systemctl: {
    desc2: "The control interface to systemd: start, stop, enable, and inspect services and other units, and query their logs and dependencies.",
    options: [
      ["status unit", "Show unit state, recent logs, and cgroup info"],
      ["start|stop|restart unit", "Control the unit right now"],
      ["enable|disable unit", "Start automatically at boot, or not"],
      ["enable --now unit", "Enable and start in one step"],
      ["list-units --failed", "Show units that failed to start"],
      ["daemon-reload", "Reload unit files after editing them"]
    ],
    seeAlso: ["journalctl", "service", "systemd-run"]
  },
  service: {
    desc2: "Runs SysV init scripts (/etc/init.d) in a predictable environment. On systemd systems it forwards most commands to systemctl.",
    sec: 8,
    options: [
      ["name start|stop|restart", "Control the named service"],
      ["name status", "Show the service status"],
      ["--status-all", "Run status for all init scripts"]
    ],
    seeAlso: ["systemctl", "chkconfig"]
  },
  shutdown: {
    desc2: "Brings the system down in a controlled way: warns logged-in users, stops services, then powers off (-h) or reboots (-r), immediately or at a scheduled time.",
    sec: 8,
    options: [
      ["-h", "Power off after shutdown (halt)"],
      ["-r", "Reboot after shutdown"],
      ["-c", "Cancel a pending shutdown"],
      ["now / +N / hh:mm", "When to shut down, e.g. +10 or 23:30"],
      ["message", "Optional wall message to logged-in users"]
    ],
    seeAlso: ["reboot", "poweroff", "systemctl"]
  },
  reboot: {
    desc2: "Reboots the machine. On systemd systems all reboot/halt/poweroff variants are equivalent and controlled by logind policies.",
    sec: 8,
    options: [
      ["-f, --force", "Reboot immediately without contacting the init system"],
      ["-i", "Shut down all network interfaces just before reboot"],
      ["-d, --no-wtmp", "Do not write the wtmp record"]
    ],
    seeAlso: ["shutdown", "poweroff", "systemctl"]
  },
  poweroff: {
    desc2: "Shuts the system down and instructs the hardware to switch off power.",
    sec: 8,
    options: [
      ["-f, --force", "Power off immediately without contacting the init system"],
      ["-i", "Shut down network interfaces first"],
      ["-d, --no-wtmp", "Do not write the wtmp record"]
    ],
    seeAlso: ["shutdown", "reboot", "halt"]
  },
  halt: {
    desc2: "Stops the system: halts the CPU after closing down services. Whether the machine powers off depends on hardware/settings — use poweroff to be sure.",
    sec: 8,
    options: [
      ["-p, --poweroff", "Power off the machine after halting"],
      ["-f, --force", "Halt immediately without contacting the init system"],
      ["-w, --wtmp-only", "Only write the wtmp record; do not halt"]
    ],
    seeAlso: ["poweroff", "shutdown", "reboot"]
  },
  init: {
    desc2: "The ancestor of all processes: traditionally switches between runlevels (3 = multiuser text, 5 = graphical). On systemd it maps to targets via systemctl.",
    sec: 8,
    options: [
      ["runlevel", "Switch to a runlevel: 0 halt, 1 single, 3 multiuser, 6 reboot"],
      ["-b, --emergency", "Boot into emergency mode"],
      ["telinit N", "Equivalent helper: change runlevel N"]
    ],
    seeAlso: ["systemctl", "shutdown"]
  },
  chkconfig: {
    desc2: "Manages which services start at which runlevels on RHEL-family systems, updating the init script symlinks. systemd systems use systemctl enable.",
    sec: 8,
    options: [
      ["--list", "List all services and their per-runlevel states"],
      ["name on|off", "Enable or disable the service at boot"],
      ["--add name", "Add a new service to chkconfig management"],
      ["--level N name on", "Set the service for specific runlevels"]
    ],
    seeAlso: ["service", "systemctl"]
  },
  "systemd-run": {
    desc2: "Runs a program as a transient systemd unit — with resource limits (CPUQuota, MemoryMax), as a scheduled timer, or in a private scope.",
    options: [
      ["--unit=NAME", "Name for the transient service unit"],
      ["--on-calendar=SPEC", "Run on a schedule, e.g. hourly, '*-*-* 04:00:00'"],
      ["--on-boot=SEC", "Run this many seconds after boot"],
      ["--property=P", "Set unit properties, e.g. CPUQuota=50%"],
      ["--scope", "Run in a transient scope unit instead of a service"]
    ],
    seeAlso: ["systemctl", "crontab", "at"]
  },
  loginctl: {
    desc2: "Introspects and controls the systemd login manager: list sessions, seats, and users, terminate or lock sessions, enable lingering.",
    options: [
      ["list-sessions", "List active sessions"],
      ["list-users", "List users known to the login manager"],
      ["terminate-session ID", "Terminate a session"],
      ["enable-linger USER", "Keep a user's services running after logout"],
      ["lock-sessions", "Ask all sessions to lock their screens"]
    ],
    seeAlso: ["systemctl", "who", "w"]
  },
  sysctl: {
    desc2: "Reads and writes kernel parameters under /proc/sys at runtime — networking, memory, and security tunables. Persist settings in /etc/sysctl.conf.",
    sec: 8,
    options: [
      ["-a", "Display all currently available values"],
      ["-w name=value", "Set a parameter, e.g. vm.swappiness=10"],
      ["-p file", "Load settings from a file (default /etc/sysctl.conf)"],
      ["name", "Print the value of a single parameter"]
    ],
    seeAlso: ["modprobe", "systemctl"]
  },
  modprobe: {
    desc2: "Intelligently adds or removes kernel modules, automatically loading any dependencies listed in modules.dep.",
    sec: 8,
    options: [
      ["module", "Load the named module (and its dependencies)"],
      ["-r, --remove", "Remove a module"],
      ["-l, --list", "List modules matching a pattern"],
      ["-c, --showconfig", "Show the effective configuration"],
      ["param=value", "Pass parameters to the module"]
    ],
    seeAlso: ["lsmod", "insmod", "rmmod"]
  },
  insmod: {
    desc2: "Inserts a kernel module file (.ko) directly into the running kernel. Unlike modprobe it does not resolve dependencies — prefer modprobe.",
    sec: 8,
    options: [
      ["module.ko", "The module object file to insert"],
      ["param=value", "Optional module parameters"],
      ["-f, --force", "Force load despite version mismatch (dangerous)"]
    ],
    seeAlso: ["modprobe", "lsmod", "rmmod"]
  },
  rmmod: {
    desc2: "Removes a loaded kernel module from the running kernel. The module must be unused; modprobe -r is the safer alternative.",
    sec: 8,
    options: [
      ["module", "Name of the module to remove"],
      ["-f, --force", "Attempt removal even if unsafe"],
      ["-s", "Send errors to syslog instead of stderr"]
    ],
    seeAlso: ["modprobe", "lsmod", "insmod"]
  },
  "systemd-analyze": {
    desc2: "Analyzes system boot performance: total times, per-unit startup costs (blame), the critical path, and unit file sanity checks.",
    options: [
      ["time", "Show total boot time by phase (default)"],
      ["blame", "List units sorted by initialization time"],
      ["critical-chain", "Print a tree of the time-critical chain of units"],
      ["plot", "Output an SVG boot timeline"],
      ["verify file", "Check unit files for correctness"]
    ],
    seeAlso: ["systemctl", "journalctl"]
  },

  /* ---------- dev ---------- */
  git: {
    desc2: "The distributed version control system: tracks history in snapshots (commits), works fully offline, and synchronizes through remotes like GitHub.",
    options: [
      ["clone url", "Copy a remote repository locally"],
      ["status", "Show the state of the working tree and index"],
      ["add / commit", "Stage changes / record them as a commit"],
      ["log", "Show commit history (--oneline --graph is popular)"],
      ["push / pull", "Send / fetch-and-merge changes with the remote"],
      ["branch / checkout / switch", "List, create, or switch branches"],
      ["diff", "Show unstaged changes"]
    ],
    seeAlso: ["make", "gcc"]
  },
  gcc: {
    desc2: "The GNU Compiler Collection front end for C: compiles, links, and optimizes programs. The workhorse compiler of the Linux world.",
    options: [
      ["-o file", "Write the output executable to file"],
      ["-Wall -Wextra", "Enable the standard warning sets"],
      ["-g", "Include debug symbols for gdb"],
      ["-O0..-O3", "Optimization level (-O2 is typical for release)"],
      ["-std=c11", "Select the C language standard"],
      ["-I dir / -L dir / -l lib", "Add include paths / library paths / link a library"]
    ],
    seeAlso: ["g++", "make", "gdb"]
  },
  "g++": {
    desc2: "The GNU C++ compiler: same driver as gcc with C++ defaults and automatic linking of the standard C++ library.",
    options: [
      ["-std=c++17", "Select the C++ standard (c++11, c++20, ...)"],
      ["-o file", "Write the output executable to file"],
      ["-Wall -Wextra", "Enable the standard warning sets"],
      ["-g / -O2", "Debug symbols / optimization"],
      ["-I dir / -l lib", "Add include paths / link libraries"]
    ],
    seeAlso: ["gcc", "make", "gdb"]
  },
  make: {
    desc2: "Builds targets defined in a Makefile, recompiling only what changed based on file timestamps — still the universal build entry point (make; sudo make install).",
    options: [
      ["-j N", "Run N jobs in parallel (use -j$(nproc))"],
      ["-n", "Dry run: print commands without executing"],
      ["-B, --always-make", "Unconditionally remake all targets"],
      ["-C dir", "Change to dir before reading the Makefile"],
      ["target", "Build a specific target, e.g. make install"]
    ],
    seeAlso: ["gcc", "cargo", "nproc"]
  },
  gdb: {
    desc2: "The GNU Debugger: run programs under control, stop on breakpoints, inspect variables and backtraces, and debug crashes from core dumps.",
    options: [
      ["-p pid", "Attach to a running process"],
      ["-ex cmd", "Execute a gdb command at startup"],
      ["--args prog", "Pass remaining arguments to the program"],
      ["-c core", "Analyze a core dump file"],
      ["(interactive)", "run, break, bt, print, step, continue, quit"]
    ],
    seeAlso: ["strace", "ltrace", "gcc"]
  },
  ldd: {
    desc2: "Lists the shared libraries a program needs and where the loader resolves them (or 'not found') — the first stop for missing-library errors.",
    options: [
      ["-v, --verbose", "Print all information, including symbol versions"],
      ["-u, --unused", "Print unused direct dependencies"],
      ["-d", "Perform relocations and report missing functions"]
    ],
    seeAlso: ["objdump", "nm", "strip"]
  },
  strip: {
    desc2: "Discards symbols and other non-essential sections from binaries and libraries, shrinking them — applied to release builds.",
    options: [
      ["-s, --strip-all", "Remove all symbols (the default)"],
      ["-g, --strip-debug", "Remove only debugging symbols"],
      ["-o file", "Write the stripped output to a new file"],
      ["--strip-unneeded", "Remove symbols not needed for relocation"]
    ],
    seeAlso: ["gcc", "nm", "objdump"]
  },
  objdump: {
    desc2: "Displays detailed information about object files: disassembly (-d), symbols (-t), dynamic dependencies (-T), and sections.",
    options: [
      ["-d, --disassemble", "Disassemble executable sections"],
      ["-T, --dynamic-syms", "Print the dynamic symbol table"],
      ["-x, --all-headers", "Display all available header information"],
      ["-S, --source", "Intermix source code with disassembly (needs -g build)"]
    ],
    seeAlso: ["nm", "readelf", "ldd"]
  },
  nm: {
    desc2: "Lists symbols from object files and libraries: T defined functions, U undefined (needed), D data — with -D for shared libraries.",
    options: [
      ["-D, --dynamic", "Show dynamic symbols (for shared objects)"],
      ["-u, --undefined-only", "Show only undefined symbols"],
      ["-g, --extern-only", "Show only external (global) symbols"],
      ["-C, --demangle", "Decode C++ symbol names to readable form"]
    ],
    seeAlso: ["objdump", "ldd", "readelf"]
  },
  readelf: {
    desc2: "Displays the ELF structure of binaries: headers, sections, program headers, symbol tables, and dynamic linking info.",
    options: [
      ["-h, --header", "Display the ELF file header"],
      ["-S, --sections", "Display all section headers"],
      ["-d, --dynamic", "Display the dynamic section"],
      ["-a, --all", "Equivalent to all of the above"]
    ],
    seeAlso: ["objdump", "nm", "file"]
  },
  bc: {
    desc2: "An arbitrary-precision calculator language; reads expressions from stdin. Set scale= for decimal places, and load the math library with -l for sqrt, s(), etc.",
    options: [
      ["-l, --mathlib", "Load the standard math library and set scale=20"],
      ["-q, --quiet", "Do not print the welcome banner"],
      ["-s, --standard", "Process exactly POSIX bc language"],
      ["-w, --warn", "Give warnings for extensions to POSIX bc"]
    ],
    seeAlso: ["expr", "awk"]
  },
  md5sum: {
    desc2: "Computes and verifies 128-bit MD5 checksums. Fine for spotting accidental corruption; too weak for security — use sha256sum there.",
    options: [
      ["-c, --check", "Read checksums from a file and verify them"],
      ["-b, --binary", "Read files in binary mode (default on Linux)"],
      ["--strict", "With -c, exit non-zero on improperly formatted lines"],
      ["-w, --warn", "Warn about malformed checksum lines"]
    ],
    seeAlso: ["sha256sum", "sha1sum", "cksum"]
  },
  sha256sum: {
    desc2: "Computes and verifies SHA-256 cryptographic hashes — the standard way to check downloads against published checksum files.",
    options: [
      ["-c, --check", "Verify files against a saved checksum file"],
      ["--quiet", "With -c, print only errors"],
      ["-b, --binary", "Read in binary mode"],
      ["--tag", "Output in BSD-style tagged format"]
    ],
    seeAlso: ["md5sum", "sha1sum", "gpg"]
  },
  sha1sum: {
    desc2: "Computes and verifies SHA-1 hashes. Still common in older tooling, but deprecated for security in favor of SHA-256.",
    options: [
      ["-c, --check", "Verify against a checksum file"],
      ["-b, --binary", "Read in binary mode"],
      ["--quiet", "With -c, print only errors"]
    ],
    seeAlso: ["sha256sum", "md5sum", "cksum"]
  },
  cksum: {
    desc2: "Prints a CRC checksum and the byte count of each file — a quick, simple integrity check (not cryptographic).",
    options: [
      ["--help", "Display help and exit"],
      ["--version", "Display version information and exit"],
      ["files...", "Files to checksum (default: stdin)"]
    ],
    seeAlso: ["md5sum", "sha256sum"]
  },
  base64: {
    desc2: "Encodes binary data as ASCII Base64 text, or decodes it back — common in HTTP auth headers, email attachments, and config tokens.",
    options: [
      ["-d, --decode", "Decode Base64 input back to binary"],
      ["-w cols", "Wrap encoded lines at cols characters (0 = no wrap)"],
      ["-i, --ignore-garbage", "When decoding, skip non-alphabet characters"]
    ],
    seeAlso: ["openssl", "xxd", "iconv"]
  },
  mkfifo: {
    desc2: "Creates a named pipe (FIFO): a file-like rendezvous where one process's writes become another's reads.",
    options: [
      ["-m, --mode", "Set the file permission bits, e.g. 600"],
      ["-Z", "Set the SELinux security context to the default"],
      ["--help", "Display help and exit"]
    ],
    seeAlso: ["mktemp", "cat", "bash"]
  },
  dos2unix: {
    desc2: "Converts text-file line endings between DOS/Windows (CRLF) and Unix (LF) — the fix for 'bad interpreter' errors on scripts edited in Windows.",
    options: [
      ["-k, --keepdate", "Preserve the file's modification date"],
      ["-n, --newfile", "Write to a new file instead of converting in place"],
      ["-q, --quiet", "Suppress warnings"],
      ["-b, --keep-bom", "Keep the byte-order mark (default removes it)"]
    ],
    seeAlso: ["unix2dos", "sed", "file"]
  },
  "xdg-open": {
    desc2: "Opens a file or URL with the user's preferred desktop application, as configured through MIME associations.",
    options: [
      ["file|url", "The file or URL to open"],
      ["--help", "Display help"],
      ["--manual", "Show the manual page"],
      ["--version", "Show version"]
    ],
    seeAlso: ["xdg-mime", "file"]
  },
  expect: {
    desc2: "Scripts dialogues with interactive programs: wait for prompts (expect) and answer them (send) — automating ssh, ftp, passwd, and friends.",
    options: [
      ["file", "Run the given expect script"],
      ["-c cmd", "Execute a command before the script"],
      ["-d", "Enable diagnostic output"],
      ["-f", "Turn off reading ~/.expect.rc"]
    ],
    seeAlso: ["ssh", "script"]
  },
  units: {
    desc2: "Converts quantities between thousands of units of measure — miles to km, Fahrenheit to Celsius, cups to milliliters — with full dimensional analysis.",
    options: [
      ["'from' to", "One-shot conversion, e.g. units '10 miles' km"],
      ["-f file", "Use a different units data file"],
      ["-t, --terse", "Terse output (only the number)"],
      ["-v, --verbose", "Verbose output"]
    ],
    seeAlso: ["bc", "expr"]
  },
  factor: {
    desc2: "Prints the prime factorization of each given whole number — a classic demo of number theory on the command line.",
    options: [
      ["number...", "The integers to factor (or read from stdin)"],
      ["--help", "Display help and exit"],
      ["--version", "Display version information and exit"]
    ],
    seeAlso: ["bc", "seq"]
  },
  shuf: {
    desc2: "Generates random permutations or random samples of input lines — shuffling playlists, picking lottery winners, randomizing test order.",
    options: [
      ["-n, --head-count", "Output at most N lines"],
      ["-i, --input-range", "Treat input as the range 1..N (e.g. -i 1-100)"],
      ["-r, --repeat", "Allow output lines to repeat"],
      ["-o, --output", "Write result to a file"]
    ],
    seeAlso: ["sort", "seq"]
  },
  openssl: {
    desc2: "The OpenSSL command-line toolkit: create keys and certificates, test TLS servers, and compute digests or random data.",
    options: [
      ["req -x509", "Generate a self-signed certificate and key"],
      ["s_client -connect host:port", "Connect to a TLS server and show its certificate"],
      ["x509 -in cert -text", "Inspect a certificate"],
      ["rand -base64 N", "Output N random bytes, Base64-encoded"],
      ["dgst -sha256 file", "Compute a cryptographic digest"]
    ],
    seeAlso: ["gpg", "sha256sum", "ssh-keygen"]
  },
  gpg: {
    desc2: "GNU Privacy Guard: encrypts and signs data with OpenPGP, verifies signatures, and manages keys for secure communication.",
    options: [
      ["-c, --symmetric", "Encrypt with a passphrase"],
      ["-e, --encrypt", "Encrypt for a recipient's public key"],
      ["-d, --decrypt", "Decrypt a file"],
      ["--verify", "Check a detached or clear signature"],
      ["--gen-key / --list-keys", "Create a key pair / list your keyring"]
    ],
    seeAlso: ["openssl", "sha256sum"]
  },
  unix2dos: {
    desc2: "Converts text file line endings from Unix (LF) to DOS/Windows (CRLF) — the reverse of dos2unix.",
    options: [
      ["-k, --keepdate", "Preserve the file's modification date"],
      ["-n, --newfile", "Convert from a source file to a new output file"],
      ["-q, --quiet", "Suppress warnings"]
    ],
    seeAlso: ["dos2unix", "sed", "file"]
  },
  "xdg-mime": {
    desc2: "Queries and configures the desktop's MIME database: file types and which application opens them.",
    options: [
      ["query filetype FILE", "Print the MIME type of a file"],
      ["query default TYPE", "Show the default application for a MIME type"],
      ["default app.desktop TYPE", "Set the default application for a MIME type"],
      ["install file", "Install a MIME type description"]
    ],
    seeAlso: ["xdg-open", "file"]
  }
});
