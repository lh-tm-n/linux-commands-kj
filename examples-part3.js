/* Expanded examples — part 3 of 3 (archive, disk, shell, services, dev) */
window.EXAMPLES = Object.assign(window.EXAMPLES || {}, {

  /* ---------- archive ---------- */
  tar: [
    ["tar -czvf backup.tar.gz dir/", "Create a gzip tarball, verbose"],
    ["tar -xzvf backup.tar.gz", "Extract it"],
    ["tar -tf backup.tar.gz", "List contents without extracting"],
    ["tar -cJf src.tar.xz src/", "Best-ratio xz compression"],
    ["tar -xzf app.tar.gz -C /opt", "Case: extract into a specific directory"],
    ["tar --exclude='*.log' -czf logs.tar.gz /var/log", "Case: skip files while archiving"]
  ],
  gzip: [
    ["gzip big.log", "Compress, replacing the file"],
    ["gzip -9 huge.sql", "Maximum compression"],
    ["gzip -k data.txt", "Keep the original too"],
    ["gzip -t file.gz", "Case: test archive integrity"]
  ],
  gunzip: [
    ["gunzip file.gz", "Decompress in place"],
    ["gunzip -k file.gz", "Keep the .gz after extracting"],
    ["gunzip -c file.gz > out", "Decompress to another name"]
  ],
  bzip2: [
    ["bzip2 -9 data.txt", "High-ratio compression"],
    ["bzip2 -dk data.txt", "Compress, keep the original"],
    ["bzip2 -d file.bz2", "Decompress"]
  ],
  xz: [
    ["xz -9 -T0 kernel.tar", "Case: best ratio, all CPU cores"],
    ["xz -dk big.sql", "Keep the original"],
    ["xz -d file.xz", "Decompress"]
  ],
  zip: [
    ["zip -r site.zip public/", "Zip a directory tree"],
    ["zip -e secret.zip file", "Password-protect"],
    ["zip -9 -r best.zip dir/", "Maximum compression"],
    ["zip -r photos.zip imgs/ -x '*.tmp'", "Case: exclude junk while zipping"]
  ],
  unzip: [
    ["unzip archive.zip", "Extract here"],
    ["unzip archive.zip -d out/", "Extract into a folder"],
    ["unzip -l archive.zip", "List without extracting"],
    ["unzip -o -q archive.zip", "Case: overwrite silently in scripts"]
  ],
  "7z": [
    ["7z a out.7z dir/", "Create a 7z archive"],
    ["7z x archive.7z", "Extract with full paths"],
    ["7z l archive.7z", "List contents"],
    ["7z a -p secret.7z file", "Case: encrypted archive"]
  ],
  zstd: [
    ["zstd -19 big.tar", "Case: near-xz ratio, much faster"],
    ["zstd -T0 -3 logs.tar", "Fast, multi-threaded"],
    ["zstd -d file.tar.zst", "Decompress"]
  ],
  lz4: [
    ["lz4 huge.log", "Default: ultra-fast compression"],
    ["lz4 -9 data.bin", "High compression mode"],
    ["lz4 -d data.bin.lz4", "Decompress"]
  ],
  cpio: [
    ["ls | cpio -ov > backup.cpio", "Archive the listed files"],
    ["cpio -idmv < backup.cpio", "Extract, creating directories"],
    ["find . | cpio -ov > all.cpio", "Case: archive a whole tree"]
  ],
  ar: [
    ["ar rcs libfoo.a foo.o bar.o", "Case: create a static library"],
    ["ar t libfoo.a", "List members"],
    ["ar x libfoo.a", "Extract all members"]
  ],
  compress: [
    ["compress old.txt", "Legacy LZW compression (.Z)"],
    ["compress -d old.txt.Z", "Decompress"]
  ],

  /* ---------- disk ---------- */
  df: [
    ["df -h", "Space per filesystem"],
    ["df -h /var", "The filesystem holding a path"],
    ["df -i", "Case: inode usage instead of blocks"],
    ["df -hT --total", "Types, sizes, and a grand total"]
  ],
  du: [
    ["du -sh /var/log", "Total size of a directory"],
    ["du -h --max-depth=1 / | sort -h", "Case: biggest directories, ranked"],
    ["du -ah dir | sort -rh | head", "Case: largest individual files"],
    ["du -x /", "Stay on one filesystem"]
  ],
  lsblk: [
    ["lsblk", "Disks and partitions tree"],
    ["lsblk -f", "Filesystems, labels, UUIDs"],
    ["lsblk -o NAME,SIZE,TYPE,MOUNTPOINT", "Case: chosen columns only"]
  ],
  mount: [
    ["sudo mount /dev/sdb1 /mnt/usb", "Mount a partition"],
    ["sudo mount -o loop disk.img /mnt/img", "Case: mount an image file"],
    ["sudo mount -a", "Mount everything in /etc/fstab"],
    ["mount | column -t", "What is mounted right now?"]
  ],
  umount: [
    ["sudo umount /mnt/usb", "Detach a filesystem"],
    ["sudo umount -l /mnt/nfs", "Case: lazy-unmount a busy NFS share"]
  ],
  findmnt: [
    ["findmnt", "All mounts as a tree"],
    ["findmnt /home", "One mount point's details"],
    ["findmnt -t ext4", "Case: only ext4 mounts"]
  ],
  fdisk: [
    ["sudo fdisk -l", "List disks and partitions"],
    ["sudo fdisk /dev/sdb", "Interactive editor (m for the menu)"]
  ],
  parted: [
    ["sudo parted /dev/sdb print", "Show the partition table"],
    ["sudo parted -a opt /dev/sdb mkpart primary ext4 0% 100%", "Case: one aligned full-disk partition"],
    ["sudo parted /dev/sdb mklabel gpt", "Create a GPT label"]
  ],
  blkid: [
    ["blkid", "UUID and type of every device"],
    ["sudo blkid /dev/sda1", "One partition's attributes"],
    ["blkid -L backup", "Case: find a device by its label"]
  ],
  mkfs: [
    ["sudo mkfs.ext4 /dev/sdb1", "Format as ext4"],
    ["sudo mkfs.vfat -n DATA /dev/sdc1", "Case: FAT32 for cross-OS use"],
    ["sudo mkfs -t xfs /dev/nvme0n1p2", "XFS filesystem"]
  ],
  fsck: [
    ["sudo fsck -y /dev/sdb1", "Check and auto-repair (unmounted!)"],
    ["sudo fsck -n /dev/sda1", "Read-only check"],
    ["sudo fsck -f /dev/sda1", "Case: force check even if marked clean"]
  ],
  dd: [
    ["sudo dd if=ubuntu.iso of=/dev/sdb bs=4M status=progress", "Case: write a bootable USB stick"],
    ["dd if=/dev/zero of=test.img bs=1M count=100", "Create a 100 MB file"],
    ["sudo dd if=/dev/sda of=disk.img bs=4M status=progress", "Full disk image"],
    ["dd if=disk.img | gzip > disk.img.gz", "Case: compressed image via pipe"]
  ],
  sync: [
    ["sync", "Flush all pending writes"],
    ["sync /path/file", "Flush one file"]
  ],
  eject: [
    ["eject /dev/sr0", "Open the DVD tray"],
    ["eject -t /dev/sr0", "Close it again"]
  ],
  hdparm: [
    ["sudo hdparm -I /dev/sda", "Drive capabilities"],
    ["sudo hdparm -tT /dev/sda", "Case: benchmark read speeds"]
  ],
  smartctl: [
    ["sudo smartctl -H /dev/sda", "Case: one-line health verdict"],
    ["sudo smartctl -a /dev/sda", "All SMART data"],
    ["sudo smartctl -t short /dev/sda", "Run a short self-test"],
    ["sudo smartctl -l selftest /dev/sda", "Read self-test results"]
  ],
  swapon: [
    ["sudo swapon -a", "Enable all fstab swap"],
    ["swapon --show", "Current swap areas"],
    ["sudo swapon /swapfile", "Enable one file"]
  ],
  swapoff: [
    ["sudo swapoff /swapfile", "Disable one swap file"],
    ["sudo swapoff -a && sudo swapon -a", "Case: flush swap back into RAM"]
  ],
  mkswap: [
    ["sudo mkswap /swapfile", "Initialize a swap file"],
    ["sudo mkswap -L swap2 /dev/sdb2", "Swap partition with a label"]
  ],
  losetup: [
    ["sudo losetup -f --show disk.img", "Attach an image to a free loop device"],
    ["losetup -a", "List active loop devices"],
    ["sudo losetup -d /dev/loop0", "Detach"]
  ],
  tune2fs: [
    ["sudo tune2fs -l /dev/sda1", "Dump superblock settings"],
    ["sudo tune2fs -m 1 /dev/sda1", "Case: shrink root-reserved space to 1%"],
    ["sudo tune2fs -c 0 -i 0 /dev/sda1", "Disable automatic fsck checks"]
  ],
  resize2fs: [
    ["sudo resize2fs /dev/sda1", "Grow to fill the partition"],
    ["sudo resize2fs /dev/sda1 20G", "Set an explicit size"],
    ["sudo resize2fs -M /dev/sda1", "Case: shrink to the minimum"]
  ],
  badblocks: [
    ["sudo badblocks -sv /dev/sdb", "Read-only scan with progress"],
    ["sudo badblocks -n /dev/sdb", "Case: non-destructive read-write test"]
  ],

  /* ---------- shell ---------- */
  bash: [
    ["bash", "Start a subshell"],
    ["bash script.sh", "Run a script"],
    ["bash -x script.sh", "Case: trace every command (debugging)"],
    ["bash -c 'echo $((6*7))'", "One-liner from another context"],
    ["bash -l", "Login shell (loads profiles)"]
  ],
  sh: [
    ["sh setup.sh", "Run with POSIX semantics"],
    ["sh -c 'cmd1; cmd2'", "Compound one-liner"],
    ["sh -x script.sh", "Trace execution"]
  ],
  zsh: [
    ["zsh", "Start zsh"],
    ["zsh -c 'print -l **/*.py'", "Case: recursive glob one-liner"]
  ],
  fish: [
    ["fish", "Start fish"],
    ["fish -c 'echo $version'", "One-off fish command"]
  ],
  source: [
    ["source ~/.bashrc", "Reload your shell config"],
    ["source venv/bin/activate", "Case: enter a Python virtualenv"],
    [". ./env.sh", "POSIX spelling of source"]
  ],
  export: [
    ["export PATH=$PATH:/opt/bin", "Case: extend the command search path"],
    ["export EDITOR=vim", "Default editor for git and friends"],
    ["export -p", "List all exported variables"]
  ],
  unset: [
    ["unset MYVAR", "Remove a variable"],
    ["unset -f helper", "Remove a function"]
  ],
  alias: [
    ["alias ll='ls -la'", "Classic shortcut"],
    ["alias", "List all aliases"],
    ["alias gst='git status'", "Case: shorten a frequent command"]
  ],
  unalias: [
    ["unalias ll", "Remove one alias"],
    ["unalias -a", "Remove all aliases"]
  ],
  env: [
    ["env | grep -i proxy", "Case: inspect proxy settings"],
    ["env -i bash", "A shell with a pristine environment"],
    ["env FOO=bar ./app", "Run with an extra variable"]
  ],
  printenv: [
    ["printenv PATH", "One variable"],
    ["printenv | sort", "Everything, alphabetized"]
  ],
  set: [
    ["set -euo pipefail", "Case: defensive scripting mode"],
    ["set -x", "Trace commands (debug)"],
    ["set +x", "Stop tracing"],
    ["set", "Dump all shell variables"]
  ],
  history: [
    ["history 20", "Last 20 commands"],
    ["history | grep git", "Case: what git commands did I run?"],
    ["!123", "Re-run history entry 123"]
  ],
  man: [
    ["man grep", "Read grep's manual"],
    ["man 5 passwd", "File-format section"],
    ["man -k compress", "Case: search manuals by keyword"],
    ["man -a select", "Every matching page in turn"]
  ],
  info: [
    ["info coreutils", "GNU Texinfo docs"],
    ["info -k regex", "Case: search the Info indexes"]
  ],
  whatis: [
    ["whatis ls", "One-line description"],
    ["whatis -w 'git*'", "Wildcard lookup"]
  ],
  apropos: [
    ["apropos compress", "Case: which commands mention compression?"],
    ["apropos -e tar", "Exact-name search"]
  ],
  help: [
    ["help cd", "Help for a builtin"],
    ["help -d", "One line per builtin"]
  ],
  xargs: [
    ["find . -name '*.tmp' | xargs rm -f", "Delete everything found"],
    ["xargs -a urls.txt -P4 -n1 wget -q", "Case: four parallel downloads from a list"],
    ["find . -print0 | xargs -0 grep TODO", "Safe with spaces in filenames"],
    ["ls | xargs -I{} echo 'file: {}'", "Substitute into a template"]
  ],
  echo: [
    ["echo \"Hello $USER\"", "Print with variable expansion"],
    ["echo -e 'a\\tb'", "Interpret escapes"],
    ["echo -n 'no newline'", "Suppress the trailing newline"]
  ],
  printf: [
    ["printf '%-10s %5d\\n' name 42", "Padded columns"],
    ["printf '%.2f\\n' 3.14159", "Two decimals"],
    ["printf '%s\\n' *.txt", "Case: one filename per line, safely"]
  ],
  test: [
    ["test -f /etc/hosts && echo exists", "File check"],
    ["[ -d /tmp ] && echo dir", "Bracket form"],
    ["[ \"$1\" = 'go' ] || exit 1", "Case: guard a script argument"]
  ],
  expr: [
    ["expr 5 + 3", "Arithmetic: 8"],
    ["expr length 'hello'", "String length: 5"],
    ["expr 7 \\* 6", "Case: multiply (escape the *)"]
  ],
  seq: [
    ["seq 1 10", "1 through 10"],
    ["seq 0 2 10", "Even numbers 0..10"],
    ["for i in $(seq 1 5); do echo $i; done", "Case: counted loop"]
  ],
  yes: [
    ["yes | ./installer.sh", "Answer yes to every prompt"],
    ["yes n | ./risky.sh", "Case: answer no instead"]
  ],
  sleep: [
    ["sleep 5", "Pause 5 seconds"],
    ["sleep 1m30s", "Pause 90 seconds"],
    ["while ! ping -c1 host; do sleep 2; done", "Case: wait for a host to come up"]
  ],
  exit: [
    ["exit", "Leave the shell"],
    ["exit 1", "Signal failure to the caller"],
    ["[ -r file ] || exit 2", "Case: abort a script early"]
  ],
  clear: [
    ["clear", "Clear the screen"],
    ["clear && ls", "Fresh screen, then list"]
  ],
  screen: [
    ["screen -S work", "Start a named session"],
    ["screen -r work", "Reattach to it"],
    ["screen -ls", "List sessions"],
    ["screen -d -r work", "Case: steal the session from elsewhere"]
  ],
  tmux: [
    ["tmux new -s dev", "Named session"],
    ["tmux attach -t dev", "Reattach"],
    ["tmux ls", "List sessions"],
    ["tmux split-window -h", "Case: split the pane horizontally"]
  ],
  at: [
    ["echo './backup.sh' | at now + 5 minutes", "Case: one-shot delayed job"],
    ["at 02:00", "Schedule interactively"],
    ["atq", "List the pending queue"]
  ],
  crontab: [
    ["crontab -e", "Edit your schedule"],
    ["crontab -l", "Show it"],
    ["0 3 * * * /usr/local/bin/backup.sh", "Case: crontab line for nightly 03:00 runs"]
  ],
  chroot: [
    ["sudo chroot /mnt/recovery /bin/bash", "Case: rescue a broken system"],
    ["sudo chroot /newroot /usr/bin/app", "Run one command in a new root"]
  ],
  script: [
    ["script session.log", "Record everything you type"],
    ["script -c 'make test' out.txt", "Record one command"],
    ["script -t 2> timing.log", "Case: record with timing for replay"]
  ],
  read: [
    ["read -p 'Name: ' name", "Prompt into a variable"],
    ["read -s -p 'Password: ' pw", "Silent input"],
    ["read -t 5 -p 'Sure? ' ans || echo timeout", "Case: 5-second timeout"]
  ],
  getopts: [
    ["while getopts 'ab:' o; do echo \"$o $OPTARG\"; done", "Parse -a and -b value options"],
    ["while getopts 'hv' o; do case \"$o\" in h) usage;; esac; done", "Case: branch per flag in a loop"]
  ],
  logger: [
    ["logger 'Backup finished'", "Write to the system log"],
    ["logger -t myscript -p user.err 'disk full'", "Tagged error entry"],
    ["./job.sh 2>&1 | logger -t job", "Case: pipe output into syslog"]
  ],
  wall: [
    ["sudo wall 'Reboot in 5 minutes'", "Message every terminal"],
    ["wall < notice.txt", "Broadcast a file"]
  ],
  write: [
    ["write alice", "Chat with alice's terminal"],
    ["write bob pts/2", "Pick one of bob's sessions"]
  ],
  mesg: [
    ["mesg", "Am I open to messages?"],
    ["mesg n", "Case: block write/talk messages"]
  ],

  /* ---------- services ---------- */
  systemctl: [
    ["systemctl status nginx", "State, recent log lines, PIDs"],
    ["sudo systemctl enable --now docker", "Case: start now and at every boot"],
    ["sudo systemctl restart sshd", "Restart a service"],
    ["systemctl list-units --failed", "What failed to start?"],
    ["systemctl cat nginx", "Show the unit file"]
  ],
  service: [
    ["sudo service apache2 restart", "Classic service control"],
    ["sudo service cron status", "Is it running?"]
  ],
  shutdown: [
    ["sudo shutdown -h now", "Power off immediately"],
    ["sudo shutdown -r +10 'kernel update'", "Case: reboot in 10 min with a message"],
    ["sudo shutdown -c", "Cancel a pending shutdown"]
  ],
  reboot: [
    ["sudo reboot", "Restart now"],
    ["sudo systemctl reboot", "Case: the systemctl equivalent"]
  ],
  poweroff: [
    ["sudo poweroff", "Shut down and power off"],
    ["sudo systemctl poweroff", "The systemctl equivalent"]
  ],
  halt: [
    ["sudo halt", "Stop the system"],
    ["sudo halt -p", "Case: halt and power off"]
  ],
  init: [
    ["sudo init 3", "Switch to multiuser text mode (legacy)"],
    ["sudo init 6", "Case: reboot via the old runlevel syntax"]
  ],
  chkconfig: [
    ["chkconfig --list", "Services per runlevel"],
    ["sudo chkconfig nginx on", "Case: start at boot (legacy RHEL)"]
  ],
  "systemd-run": [
    ["sudo systemd-run --unit=cleanup rm -rf /tmp/x", "One-shot transient service"],
    ["sudo systemd-run --on-calendar='*-*-* 04:00:00' /usr/local/bin/job.sh", "Case: daily timer without cron"],
    ["sudo systemd-run -p MemoryMax=512M ./big-job", "Run with a memory cap"]
  ],
  loginctl: [
    ["loginctl list-sessions", "Active sessions"],
    ["loginctl terminate-user alice", "Log alice out everywhere"],
    ["sudo loginctl enable-linger alice", "Case: keep her services running after logout"]
  ],
  sysctl: [
    ["sysctl -a | grep tcp", "Browse networking knobs"],
    ["sudo sysctl -w vm.swappiness=10", "Case: change a value at runtime"],
    ["sudo sysctl -p", "Reload /etc/sysctl.conf"],
    ["sysctl net.ipv4.ip_forward", "Read one parameter"]
  ],
  modprobe: [
    ["sudo modprobe kvm", "Load a module and its dependencies"],
    ["sudo modprobe -r kvm", "Unload it"],
    ["modprobe -c | grep alias | head", "Case: inspect the module configuration"]
  ],
  insmod: [
    ["sudo insmod ./driver.ko", "Insert a module file directly"],
    ["sudo insmod ./driver.ko param=1", "Pass module parameters"]
  ],
  rmmod: [
    ["sudo rmmod kvm", "Remove a module"],
    ["sudo rmmod -f buggy", "Force removal (risky)"]
  ],
  "systemd-analyze": [
    ["systemd-analyze blame", "Slowest units at boot"],
    ["systemd-analyze critical-chain", "What delayed boot the most"],
    ["systemd-analyze plot > boot.svg", "Case: a timeline you can open in a browser"]
  ],

  /* ---------- dev ---------- */
  git: [
    ["git clone https://github.com/user/repo", "Copy a repository"],
    ["git status", "Working tree state"],
    ["git add -A && git commit -m 'fix'", "Stage everything and commit"],
    ["git log --oneline --graph -10", "Case: compact history graph"],
    ["git push origin main", "Publish commits"],
    ["git switch -c feature", "Create and switch to a branch"]
  ],
  gcc: [
    ["gcc -O2 main.c -o main", "Optimized build"],
    ["gcc -Wall -Wextra -g app.c", "Warnings plus debug symbols"],
    ["gcc -std=c11 prog.c -lm", "Case: link the math library"],
    ["gcc -c util.c", "Compile without linking"]
  ],
  "g++": [
    ["g++ -std=c++17 app.cpp -o app", "Modern C++ build"],
    ["g++ -Wall -O2 *.cpp -o app", "All sources, optimized"],
    ["g++ -g app.cpp && gdb ./a.out", "Case: compile for debugging"]
  ],
  make: [
    ["make", "Build the default target"],
    ["make -j$(nproc)", "Case: parallel build on all cores"],
    ["make -n install", "Dry run: show what would happen"],
    ["sudo make install", "Install after building"]
  ],
  gdb: [
    ["gdb ./a.out", "Debug a program"],
    ["sudo gdb -p 1234", "Attach to a live process"],
    ["gdb -ex run -ex bt --args ./app", "Case: run, then show the crash backtrace"],
    ["gdb ./app core", "Post-mortem of a core dump"]
  ],
  ldd: [
    ["ldd /bin/ls", "Shared libraries of a binary"],
    ["ldd ./app | grep 'not found'", "Case: spot missing libraries"]
  ],
  strip: [
    ["strip app", "Shrink by removing symbols"],
    ["strip -g app", "Debug symbols only"],
    ["objcopy --only-keep-debug app app.dbg && strip app", "Case: save symbols before stripping"]
  ],
  objdump: [
    ["objdump -d app | less", "Disassemble"],
    ["objdump -T libfoo.so", "Dynamic symbols"],
    ["objdump -x a.out | grep NEEDED", "Case: required libraries"]
  ],
  nm: [
    ["nm -D /usr/lib/x86_64-linux-gnu/libc.so.6 | head", "Dynamic symbols of libc"],
    ["nm -C app.o | grep ' T '", "Case: defined functions, C++ demangled"],
    ["nm -u app.o", "Undefined (needed) symbols"]
  ],
  readelf: [
    ["readelf -h /bin/ls", "ELF header"],
    ["readelf -d app | grep NEEDED", "Case: linked libraries"],
    ["readelf -S core | head", "Sections of an object"]
  ],
  bc: [
    ["echo 'scale=2; 22/7' | bc", "Pi to two decimals"],
    ["echo 'sqrt(2)' | bc -l", "Math library functions"],
    ["echo 'ibase=16; FF' | bc", "Case: hex to decimal"]
  ],
  md5sum: [
    ["md5sum file.iso", "Print the checksum"],
    ["md5sum -c sums.md5", "Verify files"],
    ["md5sum *.deb > sums.md5", "Case: generate a checksum file"]
  ],
  sha256sum: [
    ["sha256sum release.tar.gz", "Print the hash"],
    ["sha256sum -c SHA256SUMS", "Verify a download"],
    ["sha256sum file | cut -d' ' -f1", "Case: hash only, no filename"]
  ],
  sha1sum: [
    ["sha1sum file.bin", "Print the hash"],
    ["sha1sum -c sums.sha1", "Verify files"]
  ],
  cksum: [
    ["cksum data.bin", "CRC and size"],
    ["cksum *.bin", "Checksum several files"]
  ],
  base64: [
    ["echo -n secret | base64", "Encode"],
    ["base64 -d encoded.txt", "Decode"],
    ["base64 -w0 file.bin > file.b64", "Case: single-line encoding for configs"]
  ],
  mkfifo: [
    ["mkfifo /tmp/pipe", "Create a named pipe"],
    ["mkfifo -m 600 /tmp/pipe", "Private pipe"],
    ["cat /tmp/pipe", "Read it from one terminal…"],
    ["echo hello > /tmp/pipe", "Case: …while another writes to it"]
  ],
  dos2unix: [
    ["dos2unix script.sh", "Case: fix CRLF line endings"],
    ["dos2unix -n in.txt out.txt", "Convert to a new file"],
    ["dos2unix -k *.sh", "Keep modification dates"]
  ],
  "xdg-open": [
    ["xdg-open report.pdf", "Open in the default viewer"],
    ["xdg-open https://example.com", "Open in the default browser"],
    ["xdg-open .", "Case: open the file manager here"]
  ],
  expect: [
    ["expect deploy.exp", "Run an automation script"],
    ["expect -c 'spawn bash; interact'", "Case: spawn a program interactively"]
  ],
  units: [
    ["units '10 miles' km", "Distance conversion"],
    ["units '72 F' C", "Temperature"],
    ["units -t cups ml", "Terse: number only"]
  ],
  factor: [
    ["factor 123456", "Prime factors"],
    ["seq 100 105 | factor", "Case: factor a whole range"]
  ],
  shuf: [
    ["shuf -n 5 names.txt", "Draw five random lines"],
    ["shuf -i 1-100 -n 1", "One random number 1-100"],
    ["ls | shuf | head -3", "Case: three random files"]
  ],
  openssl: [
    ["openssl rand -base64 32", "Case: generate a random key"],
    ["openssl req -x509 -newkey rsa:4096 -nodes -days 365 -keyout key.pem -out cert.pem", "Self-signed certificate"],
    ["openssl s_client -connect example.com:443 -brief", "Inspect a TLS server"],
    ["openssl x509 -in cert.pem -noout -dates", "Check certificate expiry"]
  ],
  gpg: [
    ["gpg -c secret.txt", "Encrypt with a passphrase"],
    ["gpg -d secret.txt.gpg", "Decrypt"],
    ["gpg --verify file.sig", "Check a signature"],
    ["gpg --gen-key", "Case: create your key pair"]
  ],
  unix2dos: [
    ["unix2dos notes.txt", "Case: LF to CRLF for Windows"],
    ["unix2dos -n in.txt out.txt", "Convert to a new file"]
  ],
  "xdg-mime": [
    ["xdg-mime query filetype photo.jpg", "What type is this file?"],
    ["xdg-mime query default image/png", "Case: which app opens PNGs?"]
  ]
});
