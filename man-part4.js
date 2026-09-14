/* Man-page data — part 4 of 6 (packages, archive, disk) */
window.MAN = Object.assign(window.MAN || {}, {

  /* ---------- packages ---------- */
  apt: {
    desc2: "The recommended command-line interface to Debian/Ubuntu package management: install, upgrade, search, and remove packages with dependency resolution.",
    options: [
      ["update", "Refresh the package index from all sources"],
      ["upgrade", "Install available upgrades for all packages"],
      ["install pkg...", "Install one or more packages"],
      ["remove / purge pkg...", "Remove a package (purge also deletes its config)"],
      ["search term", "Search package names and descriptions"],
      ["show pkg", "Display details about a package"],
      ["autoremove", "Remove packages no longer needed as dependencies"]
    ],
    seeAlso: ["apt-get", "dpkg", "aptitude"]
  },
  "apt-get": {
    desc2: "The lower-level APT command designed for scripts: the same operations as apt with stable, machine-friendly output.",
    options: [
      ["update", "Resynchronize the package index files"],
      ["install pkg...", "Install packages"],
      ["-y", "Assume yes to all prompts (scripting)"],
      ["dist-upgrade", "Upgrade with intelligent dependency handling"],
      ["autoremove / autoclean", "Clean up unused packages and cached .deb files"]
    ],
    seeAlso: ["apt", "dpkg"]
  },
  aptitude: {
    desc2: "An advanced apt frontend with a full-screen terminal UI and a powerful pattern-based search language; tracks automatically installed packages carefully.",
    options: [
      ["search pattern", "Search packages with aptitude's pattern language"],
      ["install / remove pkg", "Install or remove packages"],
      ["-y", "Assume yes to prompts"],
      ["(no arguments)", "Start the interactive full-screen interface"]
    ],
    seeAlso: ["apt", "apt-get"]
  },
  dpkg: {
    desc2: "The low-level Debian package manager: installs, removes, and inspects individual .deb files and queries the installed-package database. It does not resolve dependencies (apt does).",
    options: [
      ["-i, --install", "Install a .deb package file"],
      ["-l, --list", "List installed packages matching a pattern"],
      ["-L, --listfiles", "List files installed by a package"],
      ["-S, --search", "Find which package owns a given file"],
      ["-r / -P", "Remove a package / purge it including config"],
      ["-s, --status", "Show the status of a package"]
    ],
    seeAlso: ["apt", "apt-get", "rpm"]
  },
  yum: {
    desc2: "The classic RPM package manager on RHEL/CentOS 7 and earlier, handling installation, updates, and dependency resolution from configured repositories.",
    options: [
      ["install pkg...", "Install packages"],
      ["update / upgrade", "Update all installed packages"],
      ["remove pkg...", "Remove packages"],
      ["search term", "Search package names and summaries"],
      ["list installed|available", "List installed or available packages"],
      ["info pkg", "Show package details"]
    ],
    seeAlso: ["dnf", "rpm"]
  },
  dnf: {
    desc2: "The next-generation package manager for Fedora and RHEL 8+, replacing yum with better dependency solving and a compatible command syntax.",
    options: [
      ["install pkg...", "Install packages"],
      ["upgrade", "Update all installed packages"],
      ["remove pkg...", "Remove packages"],
      ["search term", "Search package metadata"],
      ["autoremove", "Remove unneeded dependency packages"],
      ["repoquery", "Query packages from repositories"]
    ],
    seeAlso: ["yum", "rpm"]
  },
  rpm: {
    desc2: "The low-level RPM package manager: installs and queries .rpm packages and the RPM database without repository or dependency resolution.",
    options: [
      ["-i, --install", "Install a package file"],
      ["-U, --upgrade", "Install or upgrade a package"],
      ["-qa", "Query all installed packages"],
      ["-ql pkg", "List files owned by a package"],
      ["-qf file", "Find which package owns a file"],
      ["-e pkg", "Erase (uninstall) a package"],
      ["-V pkg", "Verify a package's files against the database"]
    ],
    seeAlso: ["yum", "dnf", "dpkg"]
  },
  pacman: {
    desc2: "The package manager of Arch Linux: fast, simple, and consistent, syncing with remote repositories and building from the AUR via helpers like yay.",
    options: [
      ["-S pkg...", "Synchronize (install) packages"],
      ["-Syu", "Refresh databases and upgrade all packages (the Arch ritual)"],
      ["-R pkg...", "Remove packages (-Rs also removes unneeded dependencies)"],
      ["-Ss term", "Search repositories"],
      ["-Qi / -Ql", "Query installed package info / file list"]
    ],
    seeAlso: ["yay", "apt", "dnf"]
  },
  yay: {
    desc2: "An AUR helper for Arch Linux wrapping pacman and makepkg: searches and installs packages from the Arch User Repository with dependency resolution.",
    options: [
      ["-S pkg...", "Install from the repositories or the AUR"],
      ["-Syu", "Upgrade everything, including AUR packages"],
      ["-Ss term", "Search both official repos and the AUR"],
      ["-Rns pkg", "Remove a package with its config and dependencies"]
    ],
    seeAlso: ["pacman"]
  },
  zypper: {
    desc2: "The package manager of openSUSE and SUSE Linux, with repository management, dependency resolution, and a scriptable interface.",
    options: [
      ["install pkg...", "Install packages"],
      ["refresh", "Refresh all repository metadata"],
      ["update", "Update installed packages"],
      ["search term", "Search for packages"],
      ["remove pkg...", "Remove packages"],
      ["lr", "List configured repositories"]
    ],
    seeAlso: ["apt", "dnf"]
  },
  apk: {
    desc2: "The lightweight package manager of Alpine Linux, known for tiny images and fast operations; the default in most minimal containers.",
    options: [
      ["add pkg...", "Install packages"],
      ["del pkg...", "Remove packages"],
      ["update", "Refresh the repository index"],
      ["upgrade", "Upgrade all installed packages"],
      ["search term", "Search available packages"],
      ["info pkg", "Show package information"]
    ],
    seeAlso: ["apt", "pacman"]
  },
  snap: {
    desc2: "Installs and manages snap packages — self-contained, auto-updating application bundles from the Snap Store, sandboxed by AppArmor.",
    options: [
      ["install pkg...", "Install a snap (--classic for unconfined)"],
      ["list", "List installed snaps"],
      ["remove pkg", "Remove a snap"],
      ["refresh", "Refresh (update) all installed snaps"],
      ["find term", "Search the store"]
    ],
    seeAlso: ["flatpak", "apt"]
  },
  flatpak: {
    desc2: "Installs and runs sandboxed desktop applications with their own runtimes, mostly from the Flathub repository.",
    options: [
      ["install remote ref", "Install an app, e.g. flathub org.gimp.GIMP"],
      ["list", "List installed applications and runtimes"],
      ["run ref", "Run an installed application"],
      ["update", "Update installed applications and runtimes"],
      ["uninstall ref", "Remove an application"]
    ],
    seeAlso: ["snap", "apt"]
  },
  pip: {
    desc2: "The Python package installer: installs libraries from PyPI into site-packages (or a virtual environment, which is the recommended practice).",
    options: [
      ["install pkg...", "Install packages from PyPI"],
      ["install -r file", "Install from a requirements.txt file"],
      ["list / freeze", "List installed packages (freeze = requirements format)"],
      ["uninstall pkg", "Remove a package"],
      ["show pkg", "Show information about an installed package"]
    ],
    seeAlso: ["npm", "gem", "cargo"]
  },
  npm: {
    desc2: "The Node.js package manager: installs libraries from the npm registry into node_modules and runs project scripts defined in package.json.",
    options: [
      ["install [pkg...]", "Install dependencies (or a specific package)"],
      ["i -g pkg", "Install a package globally"],
      ["run script", "Run a script from package.json, e.g. npm run build"],
      ["uninstall pkg", "Remove a package"],
      ["list", "List installed packages"]
    ],
    seeAlso: ["pip", "cargo", "gem"]
  },
  gem: {
    desc2: "Manages Ruby gems — the Ruby ecosystem's packages — installing them from RubyGems.org.",
    options: [
      ["install gem...", "Install a gem"],
      ["list", "List installed gems"],
      ["uninstall gem", "Remove a gem"],
      ["update", "Update installed gems"],
      ["search term", "Search remote gems"]
    ],
    seeAlso: ["pip", "npm"]
  },
  cargo: {
    desc2: "The Rust toolchain's build system and package manager: creates projects, resolves crates from crates.io, builds, tests, and releases them.",
    options: [
      ["new / init", "Create a new project / initialize one here"],
      ["build", "Compile the project (--release for optimized)"],
      ["run", "Build and run the project"],
      ["test", "Run the project's tests"],
      ["add crate", "Add a dependency to Cargo.toml"]
    ],
    seeAlso: ["gcc", "make", "npm"]
  },

  /* ---------- archive ---------- */
  tar: {
    desc2: "The tape archiver: bundles files into a single archive, usually compressed (-z gzip, -J xz). Remember the mnemonic: eXtract = x, Create = c.",
    options: [
      ["-c, --create", "Create a new archive"],
      ["-x, --extract", "Extract files from an archive"],
      ["-t, --list", "List the contents of an archive"],
      ["-z, --gzip", "Filter the archive through gzip (.tar.gz)"],
      ["-J, --xz", "Filter the archive through xz (.tar.xz)"],
      ["-v, --verbose", "Verbosely list files processed"],
      ["-f, --file", "Use the given archive file name"],
      ["-C, --directory", "Change to DIRECTORY before operating"]
    ],
    seeAlso: ["gzip", "xz", "zip", "cpio"]
  },
  gzip: {
    desc2: "Compresses files with the DEFLATE algorithm, replacing each file with a .gz version (original data removed unless -k). Ubiquitous for logs and tarballs.",
    options: [
      ["-d, --decompress", "Decompress (same as gunzip)"],
      ["-k, --keep", "Keep the original file"],
      ["-9", "Maximum compression (slowest); -1 is fastest"],
      ["-t, --test", "Test the integrity of compressed files"],
      ["-c", "Write output to stdout, keep originals"]
    ],
    seeAlso: ["gunzip", "tar", "xz", "bzip2"]
  },
  gunzip: {
    desc2: "Decompresses gzip files, restoring the original name and contents; equivalent to gzip -d.",
    options: [
      ["-k, --keep", "Keep the .gz file after decompressing"],
      ["-t, --test", "Test the file integrity without extracting"],
      ["-c", "Write to stdout, keep the compressed file"],
      ["-f, --force", "Overwrite existing output files"]
    ],
    seeAlso: ["gzip", "zcat", "tar"]
  },
  bzip2: {
    desc2: "Compresses files with Burrows-Wheeler block sorting, generally achieving better ratios than gzip at the cost of speed.",
    options: [
      ["-d, --decompress", "Decompress"],
      ["-k, --keep", "Keep the input file"],
      ["-9", "Best compression; -1 fastest"],
      ["-t, --test", "Check compressed file integrity"],
      ["-z", "Force compression (the default)"]
    ],
    seeAlso: ["gzip", "xz", "tar"]
  },
  xz: {
    desc2: "Compresses files with LZMA2, offering the best general-purpose ratio on Linux (used for .tar.xz). Multi-threaded with -T.",
    options: [
      ["-d, --decompress", "Decompress"],
      ["-k, --keep", "Keep the input file"],
      ["-9", "Maximum compression preset"],
      ["-T, --threads", "Use multiple compression threads"],
      ["-t, --test", "Test the integrity of compressed files"]
    ],
    seeAlso: ["gzip", "bzip2", "zstd", "tar"]
  },
  zip: {
    desc2: "Creates ZIP archives, the de-facto cross-platform format readable by Windows, macOS, and every GUI archive manager.",
    options: [
      ["-r", "Recurse into directories"],
      ["-e, --encrypt", "Prompt for a password to encrypt the archive"],
      ["-9", "Maximum compression"],
      ["-x pattern", "Exclude files matching a pattern"],
      ["-q", "Quiet operation"]
    ],
    seeAlso: ["unzip", "tar", "7z"]
  },
  unzip: {
    desc2: "Extracts, lists, and tests ZIP archives, with options for selective extraction and character-set handling.",
    options: [
      ["-d dir", "Extract into the given directory"],
      ["-l", "List archive contents (short form)"],
      ["-v", "List contents verbosely with compression info"],
      ["-o", "Overwrite existing files without prompting"],
      ["-P pass", "Use the given password"]
    ],
    seeAlso: ["zip", "tar"]
  },
  "7z": {
    desc2: "The 7-Zip archiver: creates and extracts .7z archives (very high compression) as well as zip, tar, and other formats.",
    options: [
      ["a archive files...", "Add files to (create) an archive"],
      ["x archive", "Extract with full paths"],
      ["l archive", "List archive contents"],
      ["t archive", "Test archive integrity"],
      ["-p", "Prompt for (or set with -pPASS) a password"]
    ],
    seeAlso: ["zip", "tar", "xz"]
  },
  zstd: {
    desc2: "Zstandard compression: near-gzip ratios at dramatically higher speed, with an extreme mode at level 19 approaching xz. Increasingly used for packages and kernels.",
    options: [
      ["-d, --decompress", "Decompress"],
      ["-N (1-19)", "Compression level; higher = better ratio, slower"],
      ["--ultra -22", "Enable the highest compression levels"],
      ["-T0", "Use all available CPU cores"],
      ["-k, --keep", "Keep the input file"]
    ],
    seeAlso: ["xz", "gzip", "lz4"]
  },
  lz4: {
    desc2: "An extremely fast compression algorithm and tool, trading ratio for speed — used where throughput matters more than size.",
    options: [
      ["-d", "Decompress"],
      ["-9", "High compression mode"],
      ["-1", "Fastest mode (default)"],
      ["-t", "Test compressed files"]
    ],
    seeAlso: ["zstd", "gzip", "xz"]
  },
  cpio: {
    desc2: "Copies files into or out of a cpio archive, reading the file list from stdin. Used by initramfs tooling and RPM internals.",
    options: [
      ["-o, --create", "Create an archive from files listed on stdin"],
      ["-i, --extract", "Extract files from an archive"],
      ["-t, --list", "List the archive contents"],
      ["-v, --verbose", "List the file names processed"],
      ["-d", "Create leading directories when extracting"]
    ],
    seeAlso: ["tar", "ar"]
  },
  ar: {
    desc2: "Creates and manages static library archives (.a files) of object files, and extracts members from them.",
    options: [
      ["r", "Insert files into the archive, replacing members of the same name"],
      ["c", "Create the archive silently"],
      ["s", "Write an object-file index (like ranlib)"],
      ["x", "Extract members from the archive"],
      ["t", "Display a table of contents"]
    ],
    seeAlso: ["cpio", "tar", "nm"]
  },
  compress: {
    desc2: "The classic UNIX LZW compressor producing .Z files, kept for compatibility. Modern systems use gzip, xz, or zstd instead.",
    options: [
      ["-d", "Decompress (like uncompress)"],
      ["-f", "Force overwrite of existing output files"],
      ["-v", "Print the percentage reduction for each file"],
      ["-b bits", "Specify the code size in bits (max 16)"]
    ],
    seeAlso: ["gzip", "xz"]
  },

  /* ---------- disk ---------- */
  df: {
    desc2: "Reports how much space each mounted filesystem has: size, used, available, and use percentage, plus the mount point.",
    options: [
      ["-h, --human-readable", "Print sizes in K/M/G units"],
      ["-T, --print-type", "Show the filesystem type"],
      ["-i, --inodes", "List inode usage instead of block usage"],
      ["-x type", "Exclude filesystems of the given type"],
      ["--total", "Print a grand total line"]
    ],
    seeAlso: ["du", "lsblk", "findmnt"]
  },
  du: {
    desc2: "Estimates how much space files and directories actually use, recursively. du -sh path is the standard 'how big is this?' question.",
    options: [
      ["-s, --summarize", "Display only a total for each argument"],
      ["-h, --human-readable", "Print sizes in K/M/G units"],
      ["--max-depth=N", "Print totals only N levels deep"],
      ["-a", "Include individual files, not just directories"],
      ["-x", "Skip directories on different filesystems"]
    ],
    seeAlso: ["df", "lsblk", "find"]
  },
  lsblk: {
    desc2: "Lists block devices (disks, partitions, LVM) as a tree with sizes, types, filesystems, UUIDs, and mount points — the first command for 'what disks do I have?'",
    options: [
      ["-f, --fs", "Output filesystem info: type, label, UUID"],
      ["-a, --all", "Include empty devices"],
      ["-p", "Print full device paths"],
      ["-o, --output", "Choose output columns, e.g. NAME,SIZE,FSTYPE,MOUNTPOINT"]
    ],
    seeAlso: ["fdisk", "blkid", "df"]
  },
  mount: {
    desc2: "Attaches a filesystem (device, image, or remote share) to a directory in the tree. Entries in /etc/fstab are mounted automatically at boot or with mount -a.",
    sec: 8,
    options: [
      ["-t type", "Specify the filesystem type (usually auto-detected)"],
      ["-o opts", "Mount options, e.g. ro, loop, noexec"],
      ["-a, --all", "Mount everything in /etc/fstab"],
      ["-l", "List mounts with labels (also bare 'mount' lists all)"],
      ["--bind src dst", "Mount a directory at a second location"]
    ],
    seeAlso: ["umount", "findmnt", "blkid", "fdisk"]
  },
  umount: {
    desc2: "Detaches a mounted filesystem. If it reports 'target is busy', some process still has files open there — check with lsof or fuser.",
    sec: 8,
    options: [
      ["-l, --lazy", "Detach now, clean up references when no longer busy"],
      ["-f, --force", "Force unmount (e.g. unreachable NFS server)"],
      ["-a, --all", "Unmount all filesystems in /proc/self/mounts"],
      ["-R", "Recursively unmount a hierarchy"]
    ],
    seeAlso: ["mount", "findmnt", "lsof"]
  },
  findmnt: {
    desc2: "Displays mounted filesystems as a tree or list with source device, mount point, type, and options — a cleaner 'mount' listing.",
    options: [
      ["target", "Show only the filesystem mounted at the given path"],
      ["-t, --types", "Limit to the given filesystem types"],
      ["-r, --raw", "Raw output format"],
      ["--df", "Imitate df-style output"]
    ],
    seeAlso: ["mount", "umount", "df", "lsblk"]
  },
  fdisk: {
    desc2: "A menu-driven tool for creating and manipulating partition tables (MBR and GPT). -l lists the partition layout of disks without changing anything.",
    sec: 8,
    options: [
      ["-l, --list", "List the partition tables and exit"],
      ["-s, --getsz", "Print device size in sectors"],
      ["device", "Open the interactive editor on the device, e.g. /dev/sdb"],
      ["(interactive) m", "Show the command menu; p print, n new, d delete, w write"]
    ],
    seeAlso: ["parted", "lsblk", "mkfs"]
  },
  parted: {
    desc2: "A scriptable partition editor with full GPT support; can also resize some partitions. print shows the layout non-destructively.",
    sec: 8,
    options: [
      ["print", "Display the partition table"],
      ["mklabel gpt|msdos", "Create a new partition table"],
      ["mkpart", "Create a new partition"],
      ["rm N", "Delete partition number N"],
      ["-a opt", "Use optimal alignment for new partitions"]
    ],
    seeAlso: ["fdisk", "lsblk", "mkfs"]
  },
  blkid: {
    desc2: "Prints block device attributes: filesystem type, UUID, and label — the values needed for /etc/fstab entries.",
    sec: 8,
    options: [
      ["device", "Query only the given device"],
      ["-L label", "Find the device with the given filesystem label"],
      ["-U uuid", "Find the device with the given UUID"],
      ["-o format", "Choose output format: value, device, export, list"]
    ],
    seeAlso: ["lsblk", "mount", "findmnt"]
  },
  mkfs: {
    desc2: "Builds a new filesystem on a device or partition, destroying everything on it. Really a front end for mkfs.ext4, mkfs.vfat, etc.",
    sec: 8,
    options: [
      ["-t, --type", "Filesystem type: ext4, xfs, vfat, btrfs, ..."],
      ["-V", "Produce verbose output, including the command run"],
      ["device", "The target partition, e.g. /dev/sdb1"]
    ],
    seeAlso: ["fsck", "fdisk", "mount"]
  },
  fsck: {
    desc2: "Checks and optionally repairs a Linux filesystem. The filesystem should be unmounted (or read-only) — never run it on a mounted, writable filesystem.",
    sec: 8,
    options: [
      ["-y", "Assume yes to all repair prompts"],
      ["-n", "Assume no; check without changing anything"],
      ["-A", "Check all filesystems in /etc/fstab"],
      ["-t type", "Restrict to the given filesystem type"],
      ["-f", "Force a check even if marked clean"]
    ],
    seeAlso: ["mkfs", "mount", "smartctl"]
  },
  dd: {
    desc2: "Copies raw data block by block, converting on the fly — the tool for disk images, bootable USB sticks, and wiping. Extremely unforgiving of typos in of=.",
    sec: 8,
    options: [
      ["if=FILE", "Read input from FILE instead of stdin"],
      ["of=FILE", "Write output to FILE (or device) instead of stdout"],
      ["bs=N", "Read and write N bytes at a time (e.g. 4M)"],
      ["count=N", "Copy only N blocks"],
      ["status=progress", "Show ongoing transfer statistics"],
      ["conv=noerror,sync", "Keep going on read errors, padding with zeros"]
    ],
    seeAlso: ["cp", "shred", "mkfs"]
  },
  sync: {
    desc2: "Flushes all pending filesystem writes from kernel caches to the physical media, ensuring data is actually on disk before pulling the plug.",
    options: [
      ["-d, --data", "Sync only file data, not metadata"],
      ["-f, --file-system", "Sync the filesystems containing the given files"],
      ["file...", "Sync only the given files"]
    ],
    sec: 8,
    seeAlso: ["dd", "umount"]
  },
  eject: {
    desc2: "Ejects removable media — CD/DVD trays, USB drives, and other ejectable devices — by software command.",
    options: [
      ["-t", "Toggle: close the tray if open"],
      ["-T", "Same as -t (tray toggle)"],
      ["-r", "Eject CD-ROM"],
      ["-f", "Eject a floppy"],
      ["device", "Device to eject, e.g. /dev/sr0 (default /dev/sr0)"]
    ],
    seeAlso: ["mount", "umount", "lsblk"]
  },
  hdparm: {
    desc2: "Gets and sets SATA/IDE drive parameters and runs simple performance tests (-t timed reads).",
    sec: 8,
    options: [
      ["-I device", "Dump detailed drive identification and capabilities"],
      ["-t device", "Run a timed buffered-read benchmark"],
      ["-T device", "Benchmark cache reads"],
      ["-S n", "Set the standby (spindown) timeout"]
    ],
    seeAlso: ["smartctl", "lsblk", "dd"]
  },
  smartctl: {
    desc2: "Reads S.M.A.R.T. health data from disks: overall health verdict, temperature, reallocated sectors, and self-test history — the early-warning system for failing drives.",
    sec: 8,
    options: [
      ["-a device", "Print all SMART information"],
      ["-H device", "Print the overall health verdict (PASSED/FAILED)"],
      ["-t short|long", "Start a self-test"],
      ["-l selftest", "Show self-test results"],
      ["-i device", "Show device identity information"]
    ],
    seeAlso: ["hdparm", "fsck", "badblocks"]
  },
  swapon: {
    desc2: "Enables swap devices or swap files for paging; swapon -a activates everything listed in /etc/fstab at boot.",
    sec: 8,
    options: [
      ["-a, --all", "Enable all swap entries marked in /etc/fstab"],
      ["-s, --summary", "Display a summary of swap usage (like cat /proc/swaps)"],
      ["-p prio", "Set the swap area priority"],
      ["--show", "Show a definable table of swap areas"]
    ],
    seeAlso: ["swapoff", "mkswap", "free"]
  },
  swapoff: {
    desc2: "Disables swap areas, moving any paged-out data back into RAM first — which can take a while and needs enough free memory.",
    sec: 8,
    options: [
      ["-a, --all", "Disable all swap devices in /etc/fstab or /proc/swaps"],
      ["device|file", "Disable the given swap device or file"]
    ],
    seeAlso: ["swapon", "mkswap", "free"]
  },
  mkswap: {
    desc2: "Initializes a partition or file as Linux swap space so swapon can enable it.",
    sec: 8,
    options: [
      ["-L, --label", "Set a filesystem label"],
      ["-U, --uuid", "Set a specific UUID"],
      ["-f, --force", "Force setup even if the area looks in use"],
      ["size", "For files: create the swap area of the given size (KiB)"]
    ],
    seeAlso: ["swapon", "swapoff", "mkfs"]
  },
  losetup: {
    desc2: "Associates loop devices with regular files, making an image file mountable like a block device (-f picks a free device automatically).",
    sec: 8,
    options: [
      ["-f, --find", "Find (and with --show, print) the first unused loop device"],
      ["-d device", "Detach a loop device"],
      ["-a, --all", "List all configured loop devices"],
      ["-P", "Scan the image for partitions (creates loop0p1, ...)"]
    ],
    seeAlso: ["mount", "dd", "lsblk"]
  },
  tune2fs: {
    desc2: "Adjusts tunable parameters on ext2/3/4 filesystems: mount counts, check intervals, reserved blocks, and journaling.",
    sec: 8,
    options: [
      ["-l device", "List the filesystem's superblock contents"],
      ["-c count", "Max mounts between automatic fsck checks"],
      ["-i interval", "Max time between checks, e.g. 6m for six months"],
      ["-m percent", "Reserved block percentage for root (default 5)"]
    ],
    seeAlso: ["fsck", "resize2fs", "mkfs"]
  },
  resize2fs: {
    desc2: "Grows or shrinks ext2/3/4 filesystems, typically after resizing the underlying partition with fdisk or parted.",
    sec: 8,
    options: [
      ["device", "Resize the filesystem to the size of its device"],
      ["device size", "Resize to an explicit size, e.g. 20G"],
      ["-p", "Show progress bars"],
      ["-M device", "Shrink to the smallest workable size"]
    ],
    seeAlso: ["tune2fs", "fdisk", "fsck"]
  },
  badblocks: {
    desc2: "Scans a device for bad blocks, optionally recording or marking them so the filesystem avoids them. Destructive modes exist — read the manual first.",
    sec: 8,
    options: [
      ["-s", "Show the progress of the scan"],
      ["-v", "Verbose mode"],
      ["-n", "Non-destructive read-write test (safe-ish)"],
      ["-w", "Destructive write-mode test — ERASES ALL DATA"],
      ["-o file", "Write the list of bad blocks to a file"]
    ],
    seeAlso: ["fsck", "smartctl"]
  }
});
