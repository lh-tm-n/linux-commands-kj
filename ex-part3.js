/* Exit status + environment data — part 3 of 3 (archive, disk, shell, services, dev) */
var OK = [["0", "Success"], ["1", "An error occurred"]];

window.EXITSTATUS = Object.assign(window.EXITSTATUS || {}, {
  /* archive */
  tar: [["0", "Success"], ["1", "Some files differ, or vanished while being read"], ["2", "Fatal error"]],
  gzip: [["0", "Success"], ["1", "A warning occurred"], ["2+", "An error occurred"]],
  gunzip: [["0", "Success"], ["1", "A warning occurred"], ["2+", "An error occurred"]],
  bzip2: [["0", "Success"], ["1", "A warning occurred"], ["2+", "An error occurred"]],
  xz: [["0", "Success"], ["1", "A warning occurred"], ["2+", "An error occurred"]],
  zip: [["0", "Success (no errors)"], ["12", "Nothing to do"], ["2-11", "Documented error codes (I/O, memory, usage...)"]],
  unzip: [["0", "Success"], ["1", "One or more warnings were encountered"], ["2-10", "Documented error codes"], ["11", "No matching files were found"]],
  "7z": [["0", "Success (no errors)"], ["1", "Warning (non-fatal)"], ["2", "Fatal error"], ["7", "Command line error"], ["8", "Not enough memory"], ["255", "Process was killed"]],
  zstd: [["0", "Success"], ["1", "A warning occurred"], ["2+", "An error occurred"]],
  lz4: OK, cpio: OK, ar: OK, compress: OK,

  /* disk */
  df: OK, du: OK, lsblk: OK,
  mount: [["0", "Success"], ["32", "Mount failure"], ["64", "Some mounts succeeded (when invoked with -a)"]],
  umount: [["0", "Success"], ["1", "Incorrect invocation or permissions"], ["2", "System error (out of memory, cannot fork)"], ["4", "Internal mount bug"], ["8", "User interrupt"], ["16", "Problems writing or locking /etc/mtab"], ["32", "Mount failure"]],
  findmnt: OK, fdisk: OK, parted: OK, blkid: OK, mkfs: OK,
  fsck: [["0", "No errors"], ["1", "Filesystem errors were corrected"], ["2", "System should be rebooted"], ["4", "Filesystem errors left uncorrected"], ["8", "Operational error"], ["16", "Usage or syntax error"], ["32", "Check canceled by user request"]],
  dd: OK, sync: OK, eject: OK, hdparm: OK,
  smartctl: [["0", "No problems detected"], ["1, 2, 4", "Command-line, device-open, or checksum errors"], ["8", "SMART: disk health test FAILED"], ["16, 32, 64", "Past failures, error-log entries, or failed self-tests (exit status is a bit-coded sum)"]],
  swapon: OK, swapoff: OK, mkswap: OK, losetup: OK, tune2fs: OK, resize2fs: OK,
  badblocks: [["0", "No bad blocks were found"], ["Non-zero", "Bad blocks were found, or an error occurred"]],

  /* shell */
  bash: [["0", "Success"], ["Non-zero", "The exit status of the last command executed"]],
  sh: [["0", "Success"], ["Non-zero", "The exit status of the last command executed"]],
  zsh: [["0", "Success"], ["Non-zero", "The exit status of the last command executed"]],
  fish: [["0", "Success"], ["Non-zero", "The exit status of the last command executed"]],
  source: [["(any)", "The exit status of the last command executed in the file"]],
  export: OK, unset: OK, alias: OK, unalias: OK,
  env: [["125", "env itself failed"], ["126", "Command found but not executable"], ["127", "Command not found"], ["Otherwise", "The command's exit status"]],
  printenv: [["0", "All named variables were found"], ["1", "At least one variable was not found, or an error occurred"]],
  set: OK, history: OK,
  man: [["0", "Success"], ["1", "Usage, syntax, or configuration file error"], ["2", "Operational error"], ["3", "A child process returned a non-zero exit status"], ["16", "At least one page did not exist or was not displayed"]],
  info: OK,
  whatis: [["0", "All keywords were matched"], ["1", "One or more keywords were not matched"]],
  apropos: [["0", "All keywords were matched"], ["1", "One or more keywords were not matched"]],
  help: OK,
  xargs: [["0", "Success"], ["123", "One or more invocations exited with status 1-125"], ["124", "Command exited with status 255"], ["125", "Command was killed by a signal"], ["126", "Command could not be run"], ["127", "Command was not found"], ["1", "Other error"]],
  echo: OK, printf: OK,
  test: [["0", "The expression is true"], ["1", "The expression is false or missing"]],
  expr: [["0", "The result is neither null nor 0"], ["1", "The result is null or 0"], ["2", "Invalid expression"], ["3", "Internal error"]],
  seq: OK, yes: OK, sleep: OK,
  exit: [["(any)", "Exits with the given status (default: the last command's status)"]],
  clear: OK,
  screen: [["0", "Successful completion"], ["Non-zero", "An error occurred, or the session was killed"]],
  tmux: OK, at: OK, crontab: OK,
  chroot: [["125", "chroot itself failed"], ["126", "Command found but not executable"], ["127", "Command not found"], ["Otherwise", "The command's exit status"]],
  script: OK,
  read: [["0", "A line was read successfully"], ["Non-zero", "End-of-file was reached, or the timeout (-t) expired"]],
  getopts: [["0", "An option was recognized (loop continues)"], ["1", "End of options reached, or an error"]],
  logger: OK, wall: OK, write: OK,
  mesg: [["0", "Messages are allowed (is y)"], ["1", "Messages are not allowed (is n)"], ["2", "An error occurred"]],

  /* services */
  systemctl: [["0", "Success"], ["1", "Generic error"], ["3", "Unimplemented functionality"], ["4", "Insufficient privileges"], ["5", "Unit not installed"], ["6", "Unit not loaded or not running"]],
  service: [["(any)", "The exit status of the init script invoked"]],
  shutdown: OK, reboot: OK, poweroff: OK, halt: OK, init: OK,
  chkconfig: [["0", "Success; or the service is enabled at the queried level"], ["1", "Error; or the service is disabled at the queried level"]],
  "systemd-run": OK, loginctl: OK,
  sysctl: [["0", "Success"], ["255", "At least one key was unknown or could not be set"]],
  modprobe: OK, insmod: OK, rmmod: OK, "systemd-analyze": OK,

  /* dev */
  git: [["0", "Success"], ["128", "A fatal error occurred"], ["129", "Usage error"], ["1-127", "Various command-specific errors"]],
  gcc: [["0", "Compilation and linking succeeded"], ["Non-zero", "Compilation, assembly, or linking errors"]],
  "g++": [["0", "Compilation and linking succeeded"], ["Non-zero", "Compilation, assembly, or linking errors"]],
  make: [["0", "All targets were built successfully"], ["1", "With -k: some targets failed but the rest were attempted"], ["2", "One or more targets failed"]],
  gdb: [["0", "Success"], ["Otherwise", "The debugged program's exit status"]],
  ldd: OK, strip: OK, objdump: OK, nm: OK, readelf: OK,
  bc: [["0", "Success"], ["1", "An error occurred"]],
  md5sum: [["0", "Success; with -c, all checksums matched"], ["1", "With -c, at least one checksum did not match"], ["2", "An error occurred"]],
  sha256sum: [["0", "Success; with -c, all checksums matched"], ["1", "With -c, at least one checksum did not match"], ["2", "An error occurred"]],
  sha1sum: [["0", "Success; with -c, all checksums matched"], ["1", "With -c, at least one checksum did not match"], ["2", "An error occurred"]],
  cksum: OK, base64: OK, mkfifo: OK, dos2unix: OK, "xdg-open": OK,
  expect: [["0", "Success"], ["1", "An error occurred"], ["Otherwise", "The exit status set by the script's exit command"]],
  units: [["0", "Success"], ["1", "The conversion failed (incompatible units or other error)"]],
  factor: OK, shuf: OK,
  openssl: [["0", "Success"], ["Non-zero", "An error occurred"]],
  gpg: [["0", "Success"], ["Non-zero", "An error occurred (e.g. 2: at least one bad signature)"]],
  unix2dos: OK, "xdg-mime": OK
});

window.ENVVARS = Object.assign(window.ENVVARS || {}, {
  tar: [
    ["TAPE", "Default tape device used when -f is omitted"],
    ["TMPDIR", "Directory used for temporary files"]
  ],
  bash: [
    ["HOME", "Your home directory; destination of a bare cd"],
    ["PATH", "Colon-separated list of directories searched for commands"],
    ["PS1 / PS2", "Primary and secondary command-line prompts"],
    ["IFS", "Internal field separator used for word splitting"],
    ["SHELL", "Path to your login shell"],
    ["TERM", "Terminal type, used for prompt and color support"],
    ["LANG / LC_ALL", "Locale settings affecting messages, sorting, and case"],
    ["HISTFILE / HISTSIZE", "History file location and number of entries remembered"],
    ["INPUTRC", "Location of the readline configuration file"]
  ],
  sh: [
    ["HOME / PATH / IFS", "Home directory, command search path, field separator"],
    ["ENV", "File sourced at startup by some POSIX shells"],
    ["LANG / LC_ALL", "Locale settings affecting messages and collation"]
  ],
  zsh: [
    ["ZDOTDIR", "Directory where zsh looks for its startup files"],
    ["HOME / PATH / IFS", "Home directory, command search path, field separator"],
    ["SHELL / TERM", "Login shell path and terminal type"]
  ],
  fish: [
    ["HOME / PATH", "Home directory and command search path"],
    ["fish_greeting", "Message shown at startup (set to empty to disable)"]
  ],
  man: [
    ["MANPATH", "Colon-separated list of directories to search for man pages"],
    ["MANPAGER / PAGER", "Program used to display the pages"],
    ["MANWIDTH", "Line width used for formatting"],
    ["MANOPT", "Options prepended to every man invocation"],
    ["LANG / LC_MESSAGES", "Locale selecting translated pages"]
  ],
  info: [
    ["INFOPATH", "Colon-separated list of directories searched for Info files"]
  ],
  whatis: [
    ["MANPATH", "Directories searched for the manual database"]
  ],
  apropos: [
    ["MANPATH", "Directories searched for the manual database"]
  ],
  git: [
    ["GIT_DIR / GIT_WORK_TREE", "Explicit repository and working-tree locations"],
    ["GIT_EDITOR / GIT_PAGER", "Editor for commit messages / pager for output"],
    ["GIT_SSH_COMMAND", "Custom ssh command for remote operations"],
    ["GIT_TERMINAL_PROMPT", "Set to 0 to never prompt interactively for credentials"]
  ],
  crontab: [
    ["EDITOR / VISUAL", "Editor used by crontab -e"]
  ],
  clear: [
    ["TERM", "Terminal type used to look up the right clear-screen sequence"]
  ],
  tmux: [
    ["TMUX / TMUX_PANE", "Set by tmux inside sessions: server socket and current pane id"],
    ["SHELL", "Shell used for new windows when default-shell is unset"]
  ],
  screen: [
    ["STY", "Name of the current screen session"],
    ["WINDOW", "Set by screen: number of the current window"],
    ["SCREENDIR", "Directory where session sockets are stored"]
  ],
  mktemp: [
    ["TMPDIR", "Directory where temporary files are created by default"]
  ],
  systemctl: [
    ["SYSTEMD_PAGER / SYSTEMD_LESS", "Pager and options used for long output"]
  ],
  journalctl: [
    ["SYSTEMD_PAGER / SYSTEMD_LESS", "Pager and options used for displaying the journal"]
  ],
  loginctl: [
    ["SYSTEMD_PAGER", "Pager used for long output"]
  ],
  "systemd-run": [
    ["SYSTEMD_PAGER", "Pager used for long output"]
  ],
  "systemd-analyze": [
    ["SYSTEMD_PAGER", "Pager used for long output"]
  ],
  hostnamectl: [
    ["SYSTEMD_PAGER", "Pager used for status output"]
  ],
  timedatectl: [
    ["SYSTEMD_PAGER", "Pager used for status output"]
  ],
  make: [
    ["MAKEFLAGS", "Flags passed to sub-makes automatically"],
    ["MAKELEVEL", "Nesting depth of recursive make invocations"],
    ["CURDIR", "Set by make: the working directory of the build"]
  ],
  gcc: [
    ["CPATH / C_INCLUDE_PATH", "Extra directories searched for header files"],
    ["LIBRARY_PATH", "Extra directories searched for libraries at link time"],
    ["GCC_EXEC_PREFIX", "Directory prefix for compiler subprograms"],
    ["TMPDIR", "Directory used for temporary files"]
  ],
  "g++": [
    ["CPATH / CPLUS_INCLUDE_PATH", "Extra directories searched for header files"],
    ["LIBRARY_PATH", "Extra directories searched for libraries at link time"]
  ],
  gdb: [
    ["HOME", "Location of the ~/.gdbinit startup file"],
    ["GDBHISTFILE", "File where the command history is saved"]
  ],
  bc: [
    ["BC_ENV_ARGS", "Arguments processed before reading input (e.g. -l)"],
    ["BC_LINE_LENGTH", "Output line wrap width"]
  ],
  openssl: [
    ["OPENSSL_CONF", "Location of the openssl.cnf configuration file"],
    ["SSL_CERT_FILE / SSL_CERT_DIR", "Extra CA certificates / directories for TLS verification"]
  ],
  gpg: [
    ["GNUPGHOME", "Directory used instead of ~/.gnupg for keys and config"]
  ],
  pip: [
    ["VIRTUAL_ENV", "Active virtual environment; pip installs into it"],
    ["PIP_CONFIG_FILE", "Location of the pip configuration file"],
    ["PIP_<OPTION>", "Any long option can be set, e.g. PIP_REQUIRE_VIRTUALENV=1"]
  ],
  npm: [
    ["NODE_ENV", "Environment label read by many packages (e.g. production)"],
    ["NPM_CONFIG_*", "Any npm config as an env var, e.g. NPM_CONFIG_PREFIX, NPM_CONFIG_REGISTRY"]
  ],
  cargo: [
    ["CARGO_HOME", "Directory for cargo's cache and installed binaries (default ~/.cargo)"],
    ["CARGO_TARGET_DIR", "Directory for build artifacts instead of ./target"],
    ["RUSTUP_HOME", "Directory for rustup toolchains"]
  ],
  "xdg-open": [
    ["BROWSER", "Preferred web browser fallback for URLs"],
    ["DISPLAY / WAYLAND_DISPLAY", "The graphical session to open applications in"]
  ],
  "xdg-mime": [
    ["DISPLAY / WAYLAND_DISPLAY", "The graphical session whose settings are queried"]
  ]
});
