/* Man-page data — part 5 of 6 (shell) */
window.MAN = Object.assign(window.MAN || {}, {

  bash: {
    desc2: "The GNU Bourne-Again SHell: the default interactive shell and scripting language of nearly every Linux system, with history, completion, aliases, and jobs.",
    options: [
      ["script.sh", "Run commands from a script file"],
      ["-c 'cmd'", "Run a single command string and exit"],
      ["-x", "Print each command before executing it (debugging)"],
      ["-i", "Force interactive mode"],
      ["-l", "Start as a login shell (reads profile files)"]
    ],
    seeAlso: ["sh", "zsh", "set", "trap"]
  },
  sh: {
    desc2: "The POSIX Bourne shell, or whatever /bin/sh links to (often bash or dash). Scripts starting with #!/bin/sh should stick to portable POSIX syntax.",
    options: [
      ["script.sh", "Run commands from a file"],
      ["-c 'cmd'", "Run a single command string"],
      ["-s", "Read commands from standard input"],
      ["-x", "Trace commands as they execute"]
    ],
    seeAlso: ["bash", "zsh"]
  },
  zsh: {
    desc2: "The Z shell: a bash-compatible shell adding powerful globbing, spelling correction, advanced completion, and heavy customization (Oh My Zsh).",
    options: [
      ["-c 'cmd'", "Run a single command string"],
      ["-i", "Force interactive mode"],
      ["-x", "Print commands as they are executed"],
      ["-l", "Start as a login shell"]
    ],
    seeAlso: ["bash", "fish", "alias"]
  },
  fish: {
    desc2: "The Friendly Interactive SHell: sane defaults, autosuggestions, and syntax highlighting out of the box — at the cost of not being POSIX-compatible.",
    options: [
      ["-c 'cmd'", "Run a single command string"],
      ["-i", "Run in interactive mode"],
      ["-l, --login", "Run as a login shell"],
      ["-n", "Check the script for syntax errors without executing"]
    ],
    seeAlso: ["bash", "zsh"]
  },
  source: {
    desc2: "Reads and executes commands from a file in the current shell process (alias: '.'), so exported variables and functions persist — the standard way to load configs and virtualenvs.",
    options: [
      ["file", "The file to execute in the current shell"],
      ["args...", "Optional positional parameters passed to the file"]
    ],
    seeAlso: ["export", "bash"]
  },
  export: {
    desc2: "Marks shell variables for export to the environment of child processes; with no arguments it lists all currently exported variables.",
    options: [
      ["name=value", "Set and export a variable"],
      ["-p", "Print all exported names and values"],
      ["-f name", "Export a shell function instead of a variable"],
      ["-n name", "Stop exporting a variable"]
    ],
    seeAlso: ["env", "printenv", "source"]
  },
  unset: {
    desc2: "Removes a variable or function from the shell and its environment.",
    options: [
      ["-v name", "Remove a variable (the default)"],
      ["-f name", "Remove a function"]
    ],
    seeAlso: ["export", "env"]
  },
  alias: {
    desc2: "Defines or lists command shortcuts. Aliases live only in the current shell; put them in ~/.bashrc to make them permanent.",
    options: [
      ["name='command'", "Define an alias, e.g. alias ll='ls -la'"],
      ["name", "Show the definition of one alias"],
      ["-p", "Print all aliases in reusable form"],
      ["(no args)", "List all defined aliases"]
    ],
    seeAlso: ["unalias", "bash", "export"]
  },
  unalias: {
    desc2: "Removes an alias definition from the current shell.",
    options: [
      ["name...", "Remove the named aliases"],
      ["-a", "Remove all alias definitions"]
    ],
    seeAlso: ["alias"]
  },
  env: {
    desc2: "Runs a program in a modified environment, or (with no command) prints the current environment. env -i starts with an empty environment — useful for debugging.",
    options: [
      ["-i, --ignore-environment", "Start with an empty environment"],
      ["name=value cmd", "Set variables for the command only"],
      ["-u, --unset", "Remove a variable from the child's environment"],
      ["(no args)", "Print the environment"]
    ],
    seeAlso: ["printenv", "export"]
  },
  printenv: {
    desc2: "Prints the values of environment variables — all of them, or just the named ones.",
    options: [
      ["name...", "Print only the value(s) of the given variable(s)"],
      ["-0, --null", "End each output line with NUL instead of newline"]
    ],
    seeAlso: ["env", "export"]
  },
  set: {
    desc2: "Shows shell variables or changes shell options. The defensive-scripting trio set -euo pipefail exits on errors, undefined variables, and broken pipelines.",
    options: [
      ["-e", "Exit immediately if a command fails"],
      ["-u", "Treat unset variables as an error"],
      ["-x", "Print commands and arguments as they execute"],
      ["-o pipefail", "Pipeline status = last failing command"],
      ["+option", "Disable an option, e.g. +x"]
    ],
    seeAlso: ["bash", "trap", "export"]
  },
  history: {
    desc2: "Displays the shell's command history list; !! repeats the last command, !N repeats history entry N.",
    options: [
      ["n", "Show only the last n commands"],
      ["-c", "Clear the history list"],
      ["-d offset", "Delete the history entry at the given position"],
      ["-w", "Write the current list to the history file"]
    ],
    seeAlso: ["bash", "alias"]
  },
  man: {
    desc2: "Formats and displays the on-line reference manual pages, organized in numbered sections: 1 commands, 5 file formats, 8 system administration.",
    options: [
      ["section name", "Show a specific section, e.g. man 5 passwd"],
      ["-k, --apropos", "Search page names and descriptions (like apropos)"],
      ["-f, --whatis", "Show one-line descriptions (like whatis)"],
      ["-a", "Display all matching pages in sequence"],
      ["-w", "Print the location of the man page file"]
    ],
    seeAlso: ["info", "apropos", "whatis"]
  },
  info: {
    desc2: "Reads Texinfo documentation, the GNU projects' preferred doc format — richer and hyperlinked compared to man pages.",
    options: [
      ["node", "Open the given documentation node"],
      ["-a", "Show all matching manuals"],
      ["-k, --apropos", "Search all indices for a string"],
      ["-f file", "Specify the Info file to visit"]
    ],
    seeAlso: ["man", "whatis"]
  },
  whatis: {
    desc2: "Prints the one-line description from each matching man page header — a fast 'what is this command?' lookup.",
    options: [
      ["name...", "Command or keyword to look up"],
      ["-w, --wildcard", "Allow wildcards in the search"],
      ["-s, --sections", "Restrict the search to the given man sections"]
    ],
    seeAlso: ["apropos", "man"]
  },
  apropos: {
    desc2: "Searches man page names and descriptions for a keyword — the tool to use when you know what you want to do but not the command name.",
    options: [
      ["keyword...", "Search string (space-separated = AND by default)"],
      ["-e, --exact", "Match the search term exactly"],
      ["-r, --regex", "Treat the keyword as a regex"],
      ["-s, --sections", "Search only the listed sections"]
    ],
    seeAlso: ["whatis", "man"]
  },
  help: {
    desc2: "Displays help for bash built-in commands — the built-in equivalent of man for things like cd, export, and trap that have no separate man page.",
    options: [
      ["command", "Show help for the named builtin"],
      ["-d", "Print a short description of each builtin"],
      ["-m", "Display help in man-page style"],
      ["(no args)", "List all builtins"]
    ],
    seeAlso: ["man", "bash"]
  },
  xargs: {
    desc2: "Builds and executes command lines from standard input, splitting input into argument batches — turning any command into one that consumes piped lists (find | xargs).",
    options: [
      ["-I{}", "Replace {} in the command with each input line"],
      ["-n N", "Use at most N arguments per command"],
      ["-P N", "Run up to N commands in parallel"],
      ["-0", "Input items separated by NUL (pairs with find -print0)"],
      ["-p", "Prompt before running each command line"]
    ],
    seeAlso: ["find", "grep", "tee"]
  },
  echo: {
    desc2: "Writes its arguments to standard output, expanding variables and (with -e) backslash escapes. A shell builtin in most shells and also /bin/echo.",
    options: [
      ["-n", "Do not output the trailing newline"],
      ["-e", "Enable interpretation of backslash escapes (\\n, \\t)"],
      ["-E", "Disable escape interpretation (the default)"]
    ],
    seeAlso: ["printf", "cat"]
  },
  printf: {
    desc2: "Formats and prints arguments under C-style control of the output (%s, %d, %.2f, %-10s) — more precise and portable than echo for scripts.",
    options: [
      ["--help", "Display help and exit"],
      ["--version", "Display version information and exit"],
      ["FORMAT args", "First non-option argument is the format string"]
    ],
    seeAlso: ["echo", "awk"]
  },
  test: {
    desc2: "Evaluates conditional expressions over files, strings, and numbers, exiting 0 for true. Usually written as [ expression ] in shell scripts.",
    options: [
      ["-e / -f / -d", "File exists / is a regular file / is a directory"],
      ["-r / -w / -x", "File is readable / writable / executable"],
      ["-z / -n str", "String is empty / non-empty"],
      ["-eq, -ne, -lt, -gt", "Integer comparisons"],
      ["&&, ||, !", "Combine and negate expressions"]
    ],
    seeAlso: ["bash", "expr"]
  },
  expr: {
    desc2: "Evaluates arithmetic and string expressions and prints the result, e.g. expr 5 + 3. Bash arithmetic $((...)) is usually preferred.",
    options: [
      ["expression", "Evaluate and print the value"],
      ["--help", "Display help and exit"],
      ["--version", "Display version information and exit"]
    ],
    seeAlso: ["bc", "test", "seq"]
  },
  seq: {
    desc2: "Prints a sequence of numbers, one per line — the standard feeder for loops: for i in $(seq 1 10).",
    options: [
      ["first incr last", "Full form: start, step, and end"],
      ["-f format", "Use a printf-style format, e.g. -f '%03g'"],
      ["-s sep", "Use sep as the separator (default newline)"],
      ["-w", "Pad all numbers with leading zeros to equal width"]
    ],
    seeAlso: ["expr", "yes"]
  },
  yes: {
    desc2: "Prints 'y' (or a given string) endlessly until killed — used to auto-answer yes/no prompts of other programs.",
    options: [
      ["string", "Repeatedly output this string instead of 'y'"],
      ["--help", "Display help and exit"],
      ["--version", "Display version information and exit"]
    ],
    seeAlso: ["seq", "echo"]
  },
  sleep: {
    desc2: "Suspends execution for at least the given time. Suffixes: s seconds, m minutes, h hours, d days; fractions allowed.",
    options: [
      ["number[suffix]", "Duration to pause, e.g. 0.5, 90s, 2m"],
      ["--help", "Display help and exit"],
      ["--version", "Display version information and exit"]
    ],
    seeAlso: ["timeout", "at", "seq"]
  },
  exit: {
    desc2: "Exits the shell with the given status code (default: status of the last command). 0 means success; anything else signals an error to callers.",
    options: [
      ["status", "Numeric exit code: 0 success, 1-255 error codes"]
    ],
    seeAlso: ["bash", "logout", "trap"]
  },
  clear: {
    desc2: "Clears the terminal screen, scrolling it out of view (the output can still be found by scrolling up).",
    options: [
      ["-x", "Do not attempt to clear the scrollback buffer"],
      ["-T type", "Specify the terminal type explicitly"]
    ],
    seeAlso: ["stty", "tmux"]
  },
  screen: {
    desc2: "A terminal multiplexer: run sessions that detach and keep running, then reattach later or from another machine — the classic tool for long remote jobs.",
    options: [
      ["-S name", "Start a new named session"],
      ["-r name", "Reattach to a detached session"],
      ["-ls", "List sessions"],
      ["-d -r name", "Detach elsewhere and reattach here"],
      ["(Ctrl-a d)", "Detach the current session (key binding)"]
    ],
    seeAlso: ["tmux", "nohup", "ssh"]
  },
  tmux: {
    desc2: "A modern terminal multiplexer with windows and panes: persistent sessions over SSH, split-screen layouts, and scriptable control.",
    options: [
      ["new -s name", "Start a new named session"],
      ["attach -t name", "Reattach to a session"],
      ["ls", "List sessions"],
      ["kill-session -t name", "Destroy a session"],
      ["(Ctrl-b %/\")", "Split pane vertically / horizontally (key bindings)"]
    ],
    seeAlso: ["screen", "nohup", "ssh"]
  },
  at: {
    desc2: "Queues commands to run once at a specified time, even after you log out. atq lists the queue; atrm removes jobs.",
    options: [
      ["time", "When to run: now + 5 minutes, teatime, 02:00 tomorrow"],
      ["-f file", "Read the job from a file instead of stdin"],
      ["-l", "List pending jobs (same as atq)"],
      ["-d id", "Delete a job (same as atrm)"]
    ],
    seeAlso: ["crontab", "sleep"]
  },
  crontab: {
    desc2: "Manages per-user tables of scheduled jobs. Each line: minute hour day month weekday command. The @daily, @weekly, @reboot shortcuts also exist.",
    options: [
      ["-e", "Edit your crontab in $EDITOR"],
      ["-l", "List your crontab"],
      ["-r", "Remove your crontab (careful — no prompt!)"],
      ["-u user", "Operate on another user's crontab (root)"],
      ["file", "Install the given file as your new crontab"]
    ],
    sec: 1,
    seeAlso: ["at", "systemd-run", "logger"]
  },
  chroot: {
    desc2: "Runs a command (or shell) with a different root directory — used for system rescue, building images, and isolating software.",
    sec: 8,
    options: [
      ["newroot command", "Run command with newroot as /"],
      ["--userspec user:group", "Run as the specified user and group"],
      ["--groups list", "Set supplementary groups"]
    ],
    seeAlso: ["mount", "bash", "sudo"]
  },
  script: {
    desc2: "Records everything displayed in a terminal session (input and output) to a typescript file — useful for logging and creating tutorials.",
    options: [
      ["file", "Write the typescript to the given file (default: typescript)"],
      ["-c command", "Run and record a single command"],
      ["-t file", "Log timing data for later replay with scriptreplay"],
      ["-a", "Append to an existing file"]
    ],
    seeAlso: ["tee", "stty", "tmux"]
  },
  read: {
    desc2: "Reads a line from standard input and assigns it to shell variables, with options for prompts, silent input (passwords), and timeouts.",
    options: [
      ["-p prompt", "Display a prompt before reading"],
      ["-s", "Silent: do not echo input (passwords)"],
      ["-r", "Do not treat backslash as an escape (recommended)"],
      ["-n N", "Return after N characters instead of waiting for Enter"],
      ["-t secs", "Time out after secs seconds"]
    ],
    seeAlso: ["echo", "printf", "getopts"]
  },
  getopts: {
    desc2: "Parses single-letter options from a script's positional parameters in a while loop, setting variables per matched flag — POSIX option handling.",
    options: [
      ["optstring", "Valid option letters; trailing ':' means the option takes an argument"],
      ["name", "Variable receiving each parsed option letter"],
      ["OPTARG", "Variable holding the argument of options that take one"]
    ],
    seeAlso: ["read", "bash", "set"]
  },
  logger: {
    desc2: "Writes messages into the system log (syslog/journal) from shell scripts, with chosen facility and priority so they land where admins expect.",
    options: [
      ["-t, --tag", "Mark every line with the given tag"],
      ["-p, --priority", "Set facility.level, e.g. cron.info or user.err"],
      ["-n, --server", "Send to a remote syslog server"],
      ["-i", "Log the logger command's PID too"]
    ],
    seeAlso: ["journalctl", "dmesg", "wall"]
  },
  wall: {
    desc2: "Writes a message to the terminals of all currently logged-in users — the classic way to announce maintenance.",
    sec: 1,
    options: [
      ["message", "The text to broadcast (or read from stdin)"],
      ["-n, --nobanner", "Suppress the 'Broadcast message from...' header"],
      ["-t, --timeout", "Give up writing to terminals after N seconds"]
    ],
    seeAlso: ["write", "mesg", "logger"]
  },
  write: {
    desc2: "Sends a line-by-line chat message to another logged-in user's terminal. The recipient must allow messages (mesg y). End with Ctrl-D.",
    options: [
      ["user", "Target username to message"],
      ["tty", "Specific terminal when the user has several sessions"]
    ],
    seeAlso: ["wall", "mesg"]
  },
  mesg: {
    desc2: "Controls whether other users may write to your terminal with write or talk: mesg n says 'leave me alone'.",
    options: [
      ["y", "Allow messages to your terminal"],
      ["n", "Deny messages to your terminal"],
      ["(no args)", "Show the current setting (is y / is n)"]
    ],
    seeAlso: ["write", "wall"]
  }
});
