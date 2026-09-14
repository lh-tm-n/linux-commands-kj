/* Expanded examples — part 1 of 3 (files, text, system). Entries: [code] or [code, note] */
window.EXAMPLES = Object.assign(window.EXAMPLES || {}, {

  /* ---------- files ---------- */
  ls: [
    ["ls -la", "Long listing including hidden files"],
    ["ls -lhS", "Sort by size, human-readable sizes"],
    ["ls -lt | head", "Case: the five most recently modified files"],
    ["ls -R /etc | less", "Walk a directory tree page by page"],
    ["ls -1 *.conf | wc -l", "Case: count .conf files here"]
  ],
  cd: [
    ["cd", "Jump to your home directory"],
    ["cd -", "Go back to the previous directory"],
    ["cd /var/log", "Jump to an absolute path"],
    ["cd ../..", "Go up two levels"],
    ["cd -P symlinked", "Resolve symlinks to the physical path"]
  ],
  pwd: [
    ["pwd", "Print the current directory"],
    ["pwd -P", "Physical path, symlinks resolved"],
    ["cd /tmp && pwd", "Case: confirm where you landed"]
  ],
  cp: [
    ["cp file.txt /tmp/", "Copy a file into a directory"],
    ["cp -r dir/ backup/", "Copy a whole directory tree"],
    ["cp -a archive/ restore/", "Archive copy: keep permissions, times, links"],
    ["cp -u *.conf /etc/app/", "Copy only files newer than the destination"],
    ["cp -i big.iso /mnt/", "Case: ask before overwriting"]
  ],
  mv: [
    ["mv old.txt new.txt", "Rename a file"],
    ["mv file.txt /tmp/", "Move into another directory"],
    ["mv -i *.log archive/", "Move, prompting before overwriting"],
    ["mv -n report.pdf /srv/", "Never overwrite an existing destination"],
    ["mv -v src/ dst/", "Print each move as it happens"]
  ],
  rm: [
    ["rm notes.txt", "Delete a single file"],
    ["rm -r build/", "Delete a directory and everything in it"],
    ["rm -i *.tmp", "Confirm each deletion"],
    ["rm -f -- -weird-name", "Case: delete a file whose name starts with a dash"],
    ["rm -rI bigdir/", "One prompt before removing many files"]
  ],
  mkdir: [
    ["mkdir reports", "Create a directory"],
    ["mkdir -p a/b/c", "Create nested directories in one go"],
    ["mkdir -m 700 secrets", "Create with owner-only permissions"],
    ["mkdir -p logs/{app,db,web}", "Case: several subdirectories at once (brace expansion)"]
  ],
  rmdir: [
    ["rmdir empty/", "Remove an empty directory"],
    ["rmdir -p a/b/c", "Case: remove c, then b, then a if each is empty"]
  ],
  touch: [
    ["touch notes.txt", "Create an empty file"],
    ["touch file1 file2 file3", "Create several files at once"],
    ["touch -d '2026-01-01 12:00' file", "Set a specific modification time"],
    ["touch -a access-only", "Update only the access timestamp"]
  ],
  ln: [
    ["ln -s /usr/bin/python3 ~/py", "Symlink a convenient short name"],
    ["ln -s ../shared.conf ./conf", "Relative symlink inside a project"],
    ["ln file.txt hardlink", "Hard link: a second name for the same data"],
    ["ln -sf /opt/app/bin/app /usr/local/bin/app", "Case: replace an existing symlink in place"]
  ],
  stat: [
    ["stat file", "Full status: inode, links, timestamps"],
    ["stat -c '%A %U:%G %s bytes' file", "Permissions, owner, size on one line"],
    ["stat -c %y file", "Just the modification time"],
    ["stat -f /", "Case: filesystem status instead of file status"]
  ],
  file: [
    ["file /bin/ls", "Identify a binary"],
    ["file *.txt", "Check a batch of files"],
    ["file -i photo.dat", "Print MIME types"],
    ["file -z archive.gz", "Case: look inside a compressed file"]
  ],
  tree: [
    ["tree", "Show the directory structure"],
    ["tree -L 2", "Limit depth to two levels"],
    ["tree -d", "Directories only"],
    ["tree -h /var", "Human-readable sizes"],
    ["tree -a -I '.git'", "Case: include hidden files but skip .git"]
  ],
  basename: [
    ["basename /var/log/syslog", "Print 'syslog'"],
    ["basename main.c .c", "Strip the suffix too: 'main'"],
    ["basename \"$0\"", "Case: a script's own filename"]
  ],
  dirname: [
    ["dirname /etc/ssh/sshd_config", "Print '/etc/ssh'"],
    ["cd \"$(dirname \"$0\")\"", "Case: cd to the script's own directory"]
  ],
  realpath: [
    ["realpath ./link", "Resolve a symlink to its true path"],
    ["realpath ../notes.txt", "Absolute path of a relative one"],
    ["realpath -e missing.txt", "Fail unless every path component exists"]
  ],
  find: [
    ["find . -name '*.log'", "All .log files below here"],
    ["find . -name '*.log' -mtime +7 -delete", "Case: delete logs untouched for a week"],
    ["find /home -type f -size +100M", "Case: hunt down files over 100 MB"],
    ["find . -iname 'readme*'", "Case-insensitive name match"],
    ["find . -name '*.tmp' -exec rm {} +", "Delete matches via -exec"],
    ["find /var -type d -empty", "List empty directories"]
  ],
  locate: [
    ["locate passwd", "Find paths containing 'passwd'"],
    ["locate -i nginx.conf", "Case-insensitive search"],
    ["sudo updatedb && locate app.log", "Case: refresh the index for fresh files"],
    ["locate -c '*.py'", "Count matching files"]
  ],
  which: [
    ["which python3", "Full path of the python3 that would run"],
    ["which -a python", "Case: every python on your PATH, in order"]
  ],
  whereis: [
    ["whereis gcc", "Binary, source, and man page locations"],
    ["whereis -b ls", "Binaries only"]
  ],
  type: [
    ["type ls", "Alias, builtin, or file?"],
    ["type -a python", "All meanings, shell constructs first"],
    ["type -t cd", "One-word answer: builtin"]
  ],
  shred: [
    ["shred -u secret.txt", "Overwrite, then delete the file"],
    ["shred -n 5 -z disk.img", "Five random passes, then zeros"],
    ["shred -v -u key.pem", "Case: show progress while destroying"]
  ],
  mktemp: [
    ["mktemp", "Print a fresh temp file path"],
    ["mktemp -d", "Create a temp directory"],
    ["mktemp /tmp/report.XXXXXX", "Custom name pattern"],
    ["tmp=$(mktemp) && curl -o \"$tmp\" url", "Case: safe scratch file in scripts"]
  ],
  rename: [
    ["rename 's/\\.jpeg$/\\.jpg/' *.jpeg", "Case: fix extensions in bulk"],
    ["rename 'y/A-Z/a-z/' *", "Lowercase every filename"],
    ["rename -n 's/^/img-/' *", "Preview a prefix rename without applying"],
    ["rename 's/ /_/g' *.txt", "Replace spaces with underscores"]
  ],

  /* ---------- text ---------- */
  cat: [
    ["cat notes.txt", "Print a file"],
    ["cat a.txt b.txt > c.txt", "Concatenate files into one"],
    ["cat -n script.sh", "Number every line"],
    ["cat -A Makefile", "Case: reveal tabs (^I) and line ends ($)"]
  ],
  less: [
    ["less bigfile.log", "Scroll a huge file instantly"],
    ["dmesg | less", "Page through command output"],
    ["less +F app.log", "Case: follow like tail -f (Ctrl-C to stop)"],
    ["less -N -S wide.csv", "Line numbers, no wrapping of long lines"]
  ],
  more: [
    ["dmesg | more", "Page kernel messages"],
    ["more -d long.txt", "Friendlier [Press space] prompts"]
  ],
  head: [
    ["head -n 20 access.log", "First 20 lines"],
    ["head -c 512 binary.dat", "First 512 bytes"],
    ["head -5 *.csv", "Case: peek at several files at once"]
  ],
  tail: [
    ["tail -f app.log", "Follow the log as it grows"],
    ["tail -n 50 error.log", "Last 50 lines"],
    ["tail -F rotated.log", "Case: keep following across log rotation"],
    ["tail -n +100 file", "Everything from line 100 onward"]
  ],
  grep: [
    ["grep -i error app.log", "Case-insensitive search"],
    ["grep -rn 'TODO' src/", "Recursive search with line numbers"],
    ["grep -v '^#' config", "Show only non-comment lines"],
    ["grep -c 'timeout' *.log", "Count matches per file"],
    ["grep -E 'warn|fail' app.log", "Match either word (extended regex)"],
    ["grep -A3 -B1 'Exception' app.log", "Case: inspect a crash with context lines"],
    ["ps aux | grep nginx", "Case: find a running process"]
  ],
  egrep: [
    ["egrep 'cat|dog' animals.txt", "Match either pattern"],
    ["egrep -c '^[0-9]+$' data.txt", "Case: count lines that are pure numbers"]
  ],
  sed: [
    ["sed 's/foo/bar/g' file", "Replace on output (file untouched)"],
    ["sed -i 's/8080/9090/g' app.conf", "Case: edit a config file in place"],
    ["sed -n '10,20p' file", "Print only lines 10-20"],
    ["sed '/^#/d;/^$/d' config", "Strip comments and blank lines"],
    ["sed -i.bak 's/old/new/' file", "In-place edit keeping a .bak backup"]
  ],
  awk: [
    ["awk '{print $1, $3}' file", "Print columns 1 and 3"],
    ["awk -F: '{print $1}' /etc/passwd", "List usernames (colon-delimited)"],
    ["awk '{s+=$1} END {print s}' nums", "Case: sum a column of numbers"],
    ["awk '$3 > 100 {print $2, $3}' stats", "Case: filter rows by a numeric column"],
    ["awk -F, 'NR>1 {print $2}' data.csv", "CSV column, skipping the header"]
  ],
  cut: [
    ["cut -d: -f1 /etc/passwd", "First field of colon-separated lines"],
    ["cut -d, -f2,4 report.csv", "Two chosen CSV columns"],
    ["cut -c1-8 file", "First eight characters of each line"],
    ["cut -d' ' -f1 access.log | sort -u", "Case: unique IPs from a web log"]
  ],
  paste: [
    ["paste -d, a.txt b.txt", "Join two files line by line with commas"],
    ["paste -s nums.txt", "Case: collapse all lines into one tab-separated line"]
  ],
  sort: [
    ["sort names.txt", "Alphabetical sort"],
    ["sort -n sizes.txt", "Numeric instead of lexicographic"],
    ["sort -u emails.txt", "Sort and remove duplicates"],
    ["sort -k2,2nr stats.tsv", "By column 2, numeric, descending"],
    ["sort -t, -k3 data.csv", "Sort a CSV by its third field"],
    ["du -sh * | sort -h", "Case: directory sizes, smallest to largest"]
  ],
  uniq: [
    ["sort names.txt | uniq", "Deduplicate (sort first!)"],
    ["sort words | uniq -c | sort -rn", "Case: word frequency, most common first"],
    ["uniq -d dupes.txt", "Show only duplicated lines"]
  ],
  wc: [
    ["wc -l *.c", "Line counts per file"],
    ["wc -w README", "Word count"],
    ["find . -name '*.py' | wc -l", "Case: count files that find returns"]
  ],
  tr: [
    ["echo hello | tr 'a-z' 'A-Z'", "Uppercase a string"],
    ["tr -d '\\r' < win.txt > unix.txt", "Case: strip Windows carriage returns"],
    ["tr -s ' ' < notes", "Squeeze repeated spaces"],
    ["tr ',' '\\t' < data.csv", "Convert CSV to tab-separated"]
  ],
  tee: [
    ["make 2>&1 | tee build.log", "Case: watch output and save it"],
    ["cmd | tee -a history.log", "Append instead of overwrite"],
    ["echo hi | sudo tee /etc/motd", "Case: write a root-owned file from a pipe"]
  ],
  fmt: [
    ["fmt -w 60 README", "Reflow paragraphs to 60 columns"],
    ["fmt -s notes.txt", "Split long lines only"]
  ],
  fold: [
    ["fold -w 40 long.txt", "Hard-wrap at 40 columns"],
    ["fold -s notes.txt", "Case: wrap at word boundaries"]
  ],
  nl: [
    ["nl code.py", "Number non-empty lines"],
    ["nl -ba file", "Number every line, blank ones too"],
    ["nl -nrz -w4 file", "Zero-padded 4-wide numbers"]
  ],
  rev: [
    ["rev file.txt", "Reverse every line"],
    ["echo 'a.b.c' | rev | cut -d. -f1 | rev", "Case: extract the last dot-separated part"]
  ],
  tac: [
    ["tac app.log | head", "Case: newest lines first"],
    ["tac file > reversed", "Write the reversed file"]
  ],
  od: [
    ["od -c file.bin", "Character dump with escapes"],
    ["od -A x -t x1z file", "Hex dump with offsets"],
    ["od -t u2 nums.bin", "Case: read 16-bit unsigned integers"]
  ],
  xxd: [
    ["xxd -l 64 binary", "First 64 bytes in hex"],
    ["xxd -p file | head -1", "Plain hex, no offsets"],
    ["xxd -r hex.txt > bin", "Case: rebuild binary from a hex dump"]
  ],
  strings: [
    ["strings /bin/bash | grep GLIBC", "Case: check library versions in a binary"],
    ["strings -n 8 core", "Longer strings only"],
    ["strings -f *.o | grep password", "Case: hunt leaked secrets in object files"]
  ],
  diff: [
    ["diff old.txt new.txt", "Show line differences"],
    ["diff -u old new > fix.patch", "Case: produce a patch file"],
    ["diff -r dir1/ dir2/", "Compare whole trees"],
    ["diff -w a.conf b.conf", "Ignore whitespace changes"],
    ["diff -y --width 100 a b", "Side-by-side view"]
  ],
  cmp: [
    ["cmp a.bin b.bin", "First differing byte"],
    ["cmp -s f1 f2 && echo identical", "Case: silent yes/no comparison"],
    ["cmp -l a b | wc -l", "Count differing bytes"]
  ],
  patch: [
    ["patch < fix.diff", "Apply a patch"],
    ["patch -p1 < feature.patch", "Strip one leading path component"],
    ["patch -R < fix.diff", "Undo (reverse) a patch"],
    ["patch --dry-run < fix.diff", "Case: test without touching files"]
  ],
  column: [
    ["mount | column -t", "Case: align command output into a table"],
    ["column -s, -t < data.csv", "Pretty-print a CSV"],
    ["df -h | column -t", "Align disk usage output"]
  ],
  expand: [
    ["expand Makefile > Makefile.spaces", "Tabs to spaces"],
    ["expand -t 4 file", "Tab stops every 4 columns"],
    ["expand -i file", "Only leading tabs"]
  ],
  iconv: [
    ["iconv -f ISO-8859-1 -t UTF-8 old.txt > new.txt", "Case: legacy encoding to UTF-8"],
    ["iconv -l | grep -i utf", "List known encodings"],
    ["iconv -f UTF-8 -t ASCII//TRANSLIT in.txt", "Flatten accents to ASCII"]
  ],
  comm: [
    ["comm -12 a.txt b.txt", "Lines common to both (sorted files)"],
    ["comm -23 a.txt b.txt", "Only in the first file"],
    ["comm -3 <(sort a) <(sort b)", "Case: lines unique to either file"]
  ],
  join: [
    ["join -t, -1 1 -2 1 users.csv orders.csv", "Case: join two CSVs on field 1"],
    ["join <(sort -k1 a) <(sort -k1 b)", "Join requires sorted input"],
    ["join -v1 a.txt b.txt", "Lines of file 1 with no partner"]
  ],
  zcat: [
    ["zcat old.log.gz | grep error", "Case: search a compressed log without extracting"],
    ["zcat -f mixed.log", "Like cat, but also reads .gz"]
  ],
  zgrep: [
    ["zgrep 'timeout' *.log.gz", "Case: grep inside all gzipped logs"],
    ["zgrep -c ERROR app.log.1.gz", "Count errors in an archived log"]
  ],

  /* ---------- system ---------- */
  uname: [
    ["uname -a", "Everything: kernel, host, arch"],
    ["uname -r", "Just the kernel release"],
    ["uname -m", "CPU architecture (e.g. x86_64)"]
  ],
  hostname: [
    ["hostname", "Show the host name"],
    ["hostname -I", "Case: all assigned IP addresses"],
    ["hostname -f", "Fully qualified domain name"]
  ],
  hostnamectl: [
    ["hostnamectl", "Host name, OS, and kernel at a glance"],
    ["sudo hostnamectl set-hostname web01", "Case: rename the machine persistently"],
    ["hostnamectl status", "Same as bare hostnamectl"]
  ],
  uptime: [
    ["uptime", "Load averages and up-time"],
    ["uptime -p", "Human-friendly duration"],
    ["uptime -s", "Case: exact boot moment"]
  ],
  whoami: [
    ["whoami", "Your effective username"],
    ["sudo whoami", "Case: confirm sudo gives you root"]
  ],
  id: [
    ["id", "Your UID, GID, and groups"],
    ["id -u", "Just the numeric UID"],
    ["id alice", "Inspect another user"],
    ["id -nG", "Case: group names only"]
  ],
  w: [
    ["w", "Who is on and what they run"],
    ["w -h alice", "One user, no header"],
    ["w -s", "Short format"]
  ],
  who: [
    ["who", "Current logins"],
    ["who -b", "Case: when did the system boot?"],
    ["who -u", "Logins with idle time"]
  ],
  last: [
    ["last -n 10", "Ten most recent logins"],
    ["last reboot", "Reboot history"],
    ["last -F alice", "Full timestamps for one user"]
  ],
  lastlog: [
    ["lastlog", "Last login of every account"],
    ["lastlog -u root", "One user only"],
    ["lastlog -t 7", "Case: logins within the last week"]
  ],
  date: [
    ["date", "Current date and time"],
    ["date +%Y-%m-%d", "ISO-style date"],
    ["date +%s", "Unix epoch seconds"],
    ["date -u", "UTC time"],
    ["date -d 'tomorrow 09:00'", "Compute another moment"],
    ["date -d @1700000000", "Case: convert epoch back to a date"]
  ],
  cal: [
    ["cal", "This month"],
    ["cal 2026", "Whole year"],
    ["cal -3", "Previous, current, and next month"],
    ["cal -j", "Case: Julian day numbers"]
  ],
  timedatectl: [
    ["timedatectl", "Time, zone, and NTP status"],
    ["sudo timedatectl set-timezone Asia/Jakarta", "Case: change the timezone"],
    ["timedatectl list-timezones | grep Jakarta", "Find the right zone name"],
    ["sudo timedatectl set-ntp true", "Enable network time sync"]
  ],
  lscpu: [
    ["lscpu", "CPU model, cores, caches"],
    ["lscpu -e", "One line per logical CPU"],
    ["lscpu | grep -i 'model name'", "Case: just the CPU model"]
  ],
  lspci: [
    ["lspci", "List PCI devices"],
    ["lspci -v", "Verbose details"],
    ["lspci -nn", "Names plus numeric IDs"],
    ["lspci -k | grep -A3 -i vga", "Case: graphics card and its driver"]
  ],
  lsusb: [
    ["lsusb", "List USB devices"],
    ["lsusb -t", "Tree view of buses"],
    ["lsusb -d 046d:", "Case: filter by vendor ID (Logitech)"]
  ],
  lsmod: [
    ["lsmod", "Loaded kernel modules"],
    ["lsmod | grep kvm", "Case: is virtualization loaded?"],
    ["lsmod | awk 'NR>1 {print $1}' | sort", "Module names, sorted"]
  ],
  lsmem: [
    ["lsmem", "Memory block ranges and state"],
    ["lsmem -b", "Sizes in bytes"]
  ],
  free: [
    ["free -h", "Memory usage, human-readable"],
    ["free -s 2", "Refresh every 2 seconds"],
    ["free -h | grep Mem", "Case: the memory line only"]
  ],
  vmstat: [
    ["vmstat", "One-shot overview"],
    ["vmstat 1 5", "Case: sample every second, five times"],
    ["vmstat -s", "Event counters summary"]
  ],
  iostat: [
    ["iostat -x 2", "Case: extended disk stats every 2 s"],
    ["iostat -c", "CPU-only report"],
    ["iostat -m", "MB/s units"]
  ],
  mpstat: [
    ["mpstat -P ALL 1", "Case: per-core usage every second"],
    ["mpstat 5", "Overall CPU every 5 s"]
  ],
  sar: [
    ["sar -u 1 5", "CPU utilization, five samples"],
    ["sar -r", "Memory utilization"],
    ["sar -n DEV", "Case: network traffic per interface"],
    ["sar -b", "I/O transfer rates"]
  ],
  dmesg: [
    ["dmesg -T --level=err", "Case: timestamped errors only"],
    ["dmesg -w", "Follow new kernel messages"],
    ["dmesg | grep -i usb", "Case: what happened when I plugged it in?"],
    ["dmesg -H", "Human-friendly colored pager output"]
  ],
  journalctl: [
    ["journalctl -u nginx -f", "Case: follow one service's log"],
    ["journalctl -b -1 -p err", "Errors from the previous boot"],
    ["journalctl --since '1 hour ago'", "Recent entries only"],
    ["journalctl -k", "Kernel messages only"],
    ["journalctl --disk-usage", "Case: how much space do logs eat?"]
  ],
  arch: [
    ["arch", "Machine architecture"],
    ["uname -m", "Case: equivalent information"]
  ],
  nproc: [
    ["nproc", "Available CPUs"],
    ["make -j$(nproc)", "Case: parallel build using all cores"]
  ],
  tty: [
    ["tty", "Which terminal am I on?"],
    ["tty -s || echo 'not interactive'", "Case: branch scripts on interactivity"]
  ],
  stty: [
    ["stty -a", "All terminal settings"],
    ["stty size", "Rows and columns"],
    ["stty -echo", "Case: stop echoing typed characters"]
  ],
  lsb_release: [
    ["lsb_release -a", "Distribution details"],
    ["lsb_release -d", "Case: one-line description"]
  ],
  inxi: [
    ["inxi -Fxz", "Full system summary, sanitized for sharing"],
    ["inxi -b", "Just the basics"],
    ["inxi -n", "Network interfaces only"]
  ]
});
