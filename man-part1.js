/* Man-page data — part 1 of 6 (files, text) */
window.MAN = Object.assign(window.MAN || {}, {

  /* ---------- files ---------- */
  ls: {
    desc2: "Lists information about files in a directory, sorted alphabetically by default. With no arguments it lists the current directory.",
    options: [
      ["-a, --all", "Include hidden entries (names beginning with .)"],
      ["-l", "Long listing: permissions, links, owner, group, size, timestamp"],
      ["-h, --human-readable", "Print sizes in K/M/G units (with -l or -s)"],
      ["-r, --reverse", "Reverse the sort order"],
      ["-R, --recursive", "List subdirectories recursively"],
      ["-S", "Sort by file size, largest first"],
      ["-t", "Sort by modification time, newest first"]
    ],
    seeAlso: ["cd", "find", "stat", "tree"]
  },
  cd: {
    desc2: "Changes the shell's current working directory. With no argument, changes to the home directory; '-' means the previous directory.",
    options: [
      ["-L", "Follow symbolic links (the default)"],
      ["-P", "Use the physical directory structure, resolving symlinks"]
    ],
    seeAlso: ["pwd", "ls"]
  },
  pwd: {
    desc2: "Prints the absolute pathname of the current working directory to standard output.",
    options: [
      ["-L, --logical", "Print the value of $PWD even if it contains symlinks"],
      ["-P, --physical", "Print the physical directory, all symlinks resolved"]
    ],
    seeAlso: ["cd", "ls"]
  },
  cp: {
    desc2: "Copies files and directories. Copying a directory requires the recursive flag; -a preserves all attributes, making it ideal for backups.",
    options: [
      ["-r, -R, --recursive", "Copy directories recursively"],
      ["-a, --archive", "Same as -dR --preserve=all (permissions, times, links)"],
      ["-i, --interactive", "Prompt before overwriting an existing file"],
      ["-f, --force", "Remove and retry when an existing destination cannot be opened"],
      ["-u, --update", "Copy only when the source is newer than the destination"],
      ["-v, --verbose", "Explain what is being done"]
    ],
    seeAlso: ["mv", "rsync", "dd"]
  },
  mv: {
    desc2: "Moves or renames files and directories. A move within the same filesystem is an instant rename; across filesystems the data is copied then the source removed.",
    options: [
      ["-i, --interactive", "Prompt before overwriting"],
      ["-f, --force", "Do not prompt before overwriting"],
      ["-n, --no-clobber", "Never overwrite an existing file"],
      ["-u, --update", "Move only when the source is newer"],
      ["-v, --verbose", "Explain what is being done"]
    ],
    seeAlso: ["cp", "rm", "rename"]
  },
  rm: {
    desc2: "Removes files and directories. By default it does not remove directories; use -r for that. Removal is immediate — deleted files do not go to a trash.",
    options: [
      ["-r, -R, --recursive", "Remove directories and their contents recursively"],
      ["-f, --force", "Ignore nonexistent files and never prompt"],
      ["-i", "Prompt before every removal"],
      ["-I", "Prompt once before removing more than three files"],
      ["-d, --dir", "Remove empty directories"],
      ["-v, --verbose", "Explain what is being done"]
    ],
    seeAlso: ["rmdir", "shred", "find"]
  },
  mkdir: {
    desc2: "Creates directories. With -p it creates any missing parent directories and does not error if the directory already exists.",
    options: [
      ["-p, --parents", "Create parent directories as needed; no error if existing"],
      ["-m, --mode", "Set the permission mode (as in chmod) at creation"],
      ["-v, --verbose", "Print a message for each created directory"]
    ],
    seeAlso: ["rmdir", "ln", "cp"]
  },
  rmdir: {
    desc2: "Removes directories, but only if they are empty. For non-empty trees use rm -r instead.",
    options: [
      ["-p, --parents", "Remove the directory and its ancestors (a/b/c removes c, b, a)"],
      ["--ignore-fail-on-non-empty", "Ignore failures caused solely by a non-empty directory"],
      ["-v, --verbose", "Output a diagnostic for every directory processed"]
    ],
    seeAlso: ["rm", "mkdir"]
  },
  touch: {
    desc2: "Updates the access and modification times of files to the current time, creating any file that does not exist.",
    options: [
      ["-a", "Change only the access time"],
      ["-m", "Change only the modification time"],
      ["-c, --no-create", "Do not create files that do not exist"],
      ["-d, --date", "Use the given date/time string instead of now"],
      ["-t stamp", "Use [[CC]YY]MMDDhhmm[.ss] instead of the current time"]
    ],
    seeAlso: ["stat", "date"]
  },
  ln: {
    desc2: "Creates links between files. Symbolic links (-s) are path references usable across filesystems; hard links are additional names for the same inode.",
    options: [
      ["-s, --symbolic", "Make symbolic links instead of hard links"],
      ["-f, --force", "Remove existing destination files"],
      ["-i, --interactive", "Prompt whether to remove existing destinations"],
      ["-n", "Treat a symlink-to-directory as a normal file"],
      ["-v, --verbose", "Print the name of each linked file"]
    ],
    seeAlso: ["realpath", "stat", "ls"]
  },
  stat: {
    desc2: "Displays detailed file status: size, blocks, inode, permissions, ownership, and access/modify/change timestamps, or filesystem status with -f.",
    options: [
      ["-c, --format", "Use a custom printf-style format string"],
      ["-f, --file-system", "Display filesystem status instead of file status"],
      ["-L, --dereference", "Follow symbolic links"],
      ["-t, --terse", "Print the information in terse form"]
    ],
    seeAlso: ["ls", "file", "date"]
  },
  file: {
    desc2: "Classifies files by examining their contents (magic numbers), not their extensions, reporting the type such as text, ELF binary, or image data.",
    options: [
      ["-b, --brief", "Do not prepend filenames to output lines"],
      ["-i, --mime", "Output MIME type strings instead of descriptions"],
      ["-L, --dereference", "Follow symbolic links"],
      ["-z, --uncompress", "Look inside compressed files"]
    ],
    seeAlso: ["stat", "strings", "ls"]
  },
  tree: {
    desc2: "Recursively lists directory contents as an ASCII tree, showing the structure at a glance. Not installed by default on some distributions.",
    options: [
      ["-L level", "Descend only level directories deep"],
      ["-a", "Include hidden files"],
      ["-d", "List directories only"],
      ["-f", "Print the full path prefix for each file"],
      ["-h", "Print sizes in human-readable form"]
    ],
    seeAlso: ["ls", "find", "du"]
  },
  basename: {
    desc2: "Strips any directory prefix and optional suffix from a pathname, printing just the final component.",
    options: [
      ["-a", "Support multiple arguments, treating each as a pathname"],
      ["-s, --suffix", "Remove a trailing suffix as well"],
      ["-z, --zero", "End each output line with NUL instead of newline"]
    ],
    seeAlso: ["dirname", "realpath"]
  },
  dirname: {
    desc2: "Strips the last slash-separated component from a pathname, printing the remaining directory part.",
    options: [
      ["-z, --zero", "End each output line with NUL instead of newline"]
    ],
    seeAlso: ["basename", "realpath"]
  },
  realpath: {
    desc2: "Prints the resolved absolute path of a file, expanding all symlinks and relative components. All but the last component must exist unless -e/-m is given.",
    options: [
      ["-e, --canonicalize-existing", "All components of the path must exist"],
      ["-m, --canonicalize-missing", "No components need exist"],
      ["-q, --quiet", "Suppress most error messages"],
      ["-s, --strip", "Do not expand symlinks, only clean . and .. parts"]
    ],
    seeAlso: ["basename", "dirname", "pwd"]
  },
  find: {
    desc2: "Walks a directory tree and selects files matching tests (name, type, size, time), optionally running actions such as -print, -delete, or -exec on each match.",
    options: [
      ["-name pattern", "Match basename against a shell glob pattern"],
      ["-iname pattern", "Case-insensitive version of -name"],
      ["-type c", "Match by type: f file, d directory, l symlink, and more"],
      ["-size n[cwbkMG]", "Match by size, e.g. +100M means larger than 100 MB"],
      ["-mtime n", "Modified n days ago (-n newer, +n older)"],
      ["-exec cmd {} \\;", "Run a command on each match"],
      ["-delete", "Delete each matched file"]
    ],
    seeAlso: ["locate", "grep", "xargs", "tree"]
  },
  locate: {
    desc2: "Searches a prebuilt database of filenames, so results appear instantly. The database is refreshed by updatedb, typically via a daily cron job.",
    options: [
      ["-i, --ignore-case", "Ignore case when matching"],
      ["-n, --limit", "Stop after N matches"],
      ["-c, --count", "Print only the number of matches"],
      ["-r, --regexp", "Interpret the pattern as a regular expression"]
    ],
    seeAlso: ["find", "grep"]
  },
  which: {
    desc2: "Searches $PATH in order and prints the full path of the executable that would run for each given command name.",
    options: [
      ["-a, --all", "Print all matching executables in PATH, not just the first"],
      ["-s, --silent", "Print nothing; exit status indicates whether found"]
    ],
    seeAlso: ["whereis", "type"]
  },
  whereis: {
    desc2: "Locates the binary, source, and manual page files for a command, searching a fixed set of standard directories.",
    options: [
      ["-b", "Search only for binaries"],
      ["-m", "Search only for manual pages"],
      ["-s", "Search only for sources"],
      ["-u", "Show only commands with unusual entries"]
    ],
    seeAlso: ["which", "man", "type"]
  },
  type: {
    desc2: "Reports how the shell would interpret a name: an alias, a function, a builtin, a keyword, or a file on disk (hashed or found via PATH).",
    options: [
      ["-a", "Print all locations containing the named executable"],
      ["-t", "Print a one-word type: alias, function, builtin, file, keyword"],
      ["-p", "Print only the path that would be executed"]
    ],
    seeAlso: ["which", "whereis"]
  },
  shred: {
    desc2: "Overwrites a file multiple times with random data and optionally zeroes and unlinks it, making forensic recovery much harder. Ineffective on journaling or SSD storage.",
    options: [
      ["-n, --iterations", "Overwrite N times instead of the default 3"],
      ["-z, --zero", "Add a final overwrite with zeros to hide shredding"],
      ["-u", "Deallocate and remove the file after overwriting"],
      ["-v, --verbose", "Show progress"]
    ],
    seeAlso: ["rm", "dd"]
  },
  mktemp: {
    desc2: "Creates a temporary file or directory with an unpredictable name and safe permissions (0600), the standard way for scripts to get scratch space.",
    options: [
      ["-d, --directory", "Create a directory instead of a file"],
      ["-p dir", "Interpret the template relative to dir"],
      ["-u, --dry-run", "Print the name without creating anything (unsafe)"],
      ["-t", "Interpret the template as a single filename component"]
    ],
    seeAlso: ["chmod", "mkfifo"]
  },
  rename: {
    desc2: "Renames many files at once by applying a Perl-style substitution expression (or simple from/to replacement) to each filename.",
    options: [
      ["-n, --no-act", "Show what would be renamed without doing it"],
      ["-v, --verbose", "Print names of files successfully renamed"],
      ["-f, --force", "Overwrite existing destination files"]
    ],
    seeAlso: ["mv", "sed", "find"]
  },

  /* ---------- text ---------- */
  cat: {
    desc2: "Reads files (or standard input) and writes them sequentially to standard output. Commonly used to display files or concatenate several into one.",
    options: [
      ["-n, --number", "Number all output lines"],
      ["-b, --number-nonblank", "Number only non-empty output lines"],
      ["-s, --squeeze-blank", "Collapse consecutive blank lines into one"],
      ["-A, --show-all", "Display non-printing characters, line ends ($) and tabs (^I)"]
    ],
    seeAlso: ["less", "head", "tail", "more"]
  },
  less: {
    desc2: "Displays text one screen at a time with forward and backward scrolling and in-view search (/pattern). Unlike more it reads lazily, so huge files open instantly.",
    options: [
      ["-N", "Show line numbers in the margin"],
      ["-S", "Do not wrap long lines (scroll sideways instead)"],
      ["-i", "Search case-insensitively unless pattern has capitals"],
      ["-F", "Quit immediately if the whole file fits on one screen"],
      ["-R", "Output raw control characters (colored output)"]
    ],
    seeAlso: ["more", "cat", "tail"]
  },
  more: {
    desc2: "Displays text one screen at a time, advancing with space and quitting with q. A simpler, forward-only predecessor of less.",
    options: [
      ["-d", "Prompt with '[Press space to continue]' and helpful hints"],
      ["-p", "Clear the screen before displaying each page"],
      ["-s", "Squeeze multiple blank lines into one"],
      ["-num", "Set the screen size to num lines"]
    ],
    seeAlso: ["less", "cat"]
  },
  head: {
    desc2: "Prints the first part of files (10 lines by default). With several files it precedes each with a header naming the file.",
    options: [
      ["-n, --lines", "Print the first N lines (prefix - for all but the last N)"],
      ["-c, --bytes", "Print the first N bytes"],
      ["-q, --quiet", "Never print filename headers"],
      ["-v, --verbose", "Always print filename headers"]
    ],
    seeAlso: ["tail", "less", "cat"]
  },
  tail: {
    desc2: "Prints the last part of files (10 lines by default). With -f it follows the file, printing new lines as they are appended — the classic log watcher.",
    options: [
      ["-n, --lines", "Print the last N lines, or all but the first N with +N"],
      ["-f, --follow", "Output appended data as the file grows"],
      ["-F", "Follow by name, retrying if the file is rotated"],
      ["-c, --bytes", "Print the last N bytes"],
      ["-q, --quiet", "Never print filename headers"]
    ],
    seeAlso: ["head", "less", "grep"]
  },
  grep: {
    desc2: "Searches files or standard input for lines matching a pattern and prints them. The workhorse of shell pipelines, filtering output of almost any command.",
    options: [
      ["-i, --ignore-case", "Ignore case distinctions in the pattern"],
      ["-v, --invert-match", "Select lines that do NOT match"],
      ["-r, -R, --recursive", "Read all files under each directory recursively"],
      ["-n, --line-number", "Prefix each line with its line number"],
      ["-l, --files-with-matches", "Print only names of files containing matches"],
      ["-c, --count", "Print only a count of matching lines per file"],
      ["-w, --word-regexp", "Match whole words only"],
      ["-E", "Interpret the pattern as an extended regex (like egrep)"],
      ["-F", "Interpret the pattern as fixed strings (like fgrep)"],
      ["-o", "Print only the matched parts, one per line"],
      ["-A, -B, -C n", "Print n lines of trailing/leading/both context"]
    ],
    seeAlso: ["egrep", "sed", "awk", "find"]
  },
  egrep: {
    desc2: "Equivalent to grep -E: searches using extended regular expressions, where +, ?, |, ( ) work without backslashes.",
    options: [
      ["-i", "Ignore case distinctions"],
      ["-v", "Select non-matching lines"],
      ["-n", "Prefix output with line numbers"],
      ["-c", "Print only the number of matching lines"]
    ],
    seeAlso: ["grep", "sed"]
  },
  sed: {
    desc2: "A stream editor that applies editing commands (substitute, delete, print, insert) to each input line, one pass, without opening an editor. s/old/new/ is its most used command.",
    options: [
      ["-e script", "Add the script to the commands to execute"],
      ["-f script-file", "Read commands from a file"],
      ["-i", "Edit files in place (rewrites the file)"],
      ["-n, --quiet", "Suppress automatic printing; use p to print"],
      ["-E, -r", "Use extended regular expressions"],
      ["-u, --unbuffered", "Load minimal data and flush output buffers often"]
    ],
    seeAlso: ["awk", "grep", "cut"]
  },
  awk: {
    desc2: "A pattern-action language that splits each input line into fields ($1, $2, ...) and runs actions on matching lines, ideal for columnar data and quick reports.",
    options: [
      ["-F fs", "Use fs as the input field separator (default: whitespace)"],
      ["-v var=value", "Assign a value to a variable before execution"],
      ["-f progfile", "Read the awk program from a file"],
      ["-W dump-variables", "Dump global variables to awkvars.out (gawk)"]
    ],
    seeAlso: ["sed", "cut", "sort"]
  },
  cut: {
    desc2: "Extracts selected columns from each line: fields split by a delimiter (-d/-f) or fixed character ranges (-c). Fast, line-based, no regex.",
    options: [
      ["-d, --delimiter", "Use DELIM instead of TAB as the field delimiter"],
      ["-f, --fields", "Select only these fields, e.g. 1,3-5"],
      ["-c, --characters", "Select only these character positions"],
      ["-s, --only-delimited", "Do not print lines that lack the delimiter"]
    ],
    seeAlso: ["paste", "awk", "tr"]
  },
  paste: {
    desc2: "Concatenates corresponding lines of files side by side, separated by TABs (or a chosen delimiter), building columns from separate files.",
    options: [
      ["-d, --delimiters", "Reuse characters from LIST as separators in turn"],
      ["-s, --serial", "Paste one file at a time (rows) instead of in parallel"]
    ],
    seeAlso: ["cut", "join"]
  },
  sort: {
    desc2: "Sorts lines of text alphabetically, numerically, by month, by version, or by chosen key fields, with options for reverse order and unique lines.",
    options: [
      ["-n, --numeric-sort", "Compare according to string numerical value"],
      ["-r, --reverse", "Reverse the result of comparisons"],
      ["-u, --unique", "Output only the first of equal lines"],
      ["-k, --key", "Sort by a key field, e.g. -k2,2n"],
      ["-t, --field-separator", "Use SEP instead of the blank-to-nonblank transition"],
      ["-h, --human-numeric-sort", "Compare human-readable sizes like 2K, 1G"]
    ],
    seeAlso: ["uniq", "comm", "join"]
  },
  uniq: {
    desc2: "Removes or counts adjacent duplicate lines. Input must be sorted first (sort file | uniq) since only neighboring lines are compared.",
    options: [
      ["-c, --count", "Prefix each line with the number of repetitions"],
      ["-d, --repeated", "Print only lines that are repeated"],
      ["-u, --unique", "Print only lines that appear exactly once"],
      ["-i, --ignore-case", "Compare case-insensitively"],
      ["-f, --skip-fields", "Avoid comparing the first N fields"]
    ],
    seeAlso: ["sort", "wc", "comm"]
  },
  wc: {
    desc2: "Prints newline, word, and byte counts for each file (and a total), the standard way to count lines with wc -l.",
    options: [
      ["-l, --lines", "Print only the newline counts"],
      ["-w, --words", "Print only the word counts"],
      ["-c, --bytes", "Print only the byte counts"],
      ["-m, --chars", "Print only the character counts"],
      ["-L, --max-line-length", "Print the length of the longest line"]
    ],
    seeAlso: ["cat", "sort", "awk"]
  },
  tr: {
    desc2: "Translates, squeezes, or deletes single characters from standard input — e.g. case conversion, CR removal, or squeezing repeated spaces. Operates on characters, not lines.",
    options: [
      ["-c, -C, --complement", "Use the complement of SET1"],
      ["-d, --delete", "Delete characters in SET1; do not translate"],
      ["-s, --squeeze-repeats", "Replace each run of repeated characters with one"]
    ],
    seeAlso: ["sed", "cut", "expand"]
  },
  tee: {
    desc2: "Copies standard input to standard output and to one or more files, letting you see pipeline output while saving it. Its name comes from a T-splitter in plumbing.",
    options: [
      ["-a, --append", "Append to the files instead of overwriting"],
      ["-i, --ignore-interrupts", "Ignore SIGINT"]
    ],
    seeAlso: ["cat", "sort"]
  },
  fmt: {
    desc2: "Reformats paragraphs to a target width (default 75), joining short lines and splitting long ones while keeping indentation.",
    options: [
      ["-w, --width", "Set the maximum line width (default 75)"],
      ["-s, --split-only", "Split long lines only; do not join short ones"],
      ["-u, --uniform-spacing", "One space between words, two after sentences"]
    ],
    seeAlso: ["fold"]
  },
  fold: {
    desc2: "Wraps input lines to a specified width (default 80 columns), breaking long lines so they fit a terminal or page.",
    options: [
      ["-w, --width", "Use WIDTH columns instead of 80"],
      ["-s, --spaces", "Break at spaces between words when possible"],
      ["-b, --bytes", "Count bytes rather than columns"]
    ],
    seeAlso: ["fmt"]
  },
  nl: {
    desc2: "Numbers the lines of files, by default numbering only non-empty lines with width-6 right-aligned numbers.",
    options: [
      ["-b, --body-numbering", "Choose style: a all lines, t non-empty (default), n none"],
      ["-n, --number-format", "Format: ln left, rn right (default), rz right zero-padded"],
      ["-w, --number-width", "Use N columns for line numbers"]
    ],
    seeAlso: ["cat", "head"]
  },
  rev: {
    desc2: "Reverses the order of characters on every line. Useful for path manipulation tricks, e.g. extracting extensions.",
    options: [
      ["-V, --version", "Display version information"],
      ["-h, --help", "Display help text"]
    ],
    seeAlso: ["tac", "sort"]
  },
  tac: {
    desc2: "Writes files to standard output in reverse line order — the last line first. Handy for viewing newest-first logs.",
    options: [
      ["-b, --before", "Attach the separator before instead of after"],
      ["-s, --separator", "Use STRING as the record separator instead of newline"]
    ],
    seeAlso: ["rev", "head", "cat"]
  },
  od: {
    desc2: "Dumps file contents in octal, decimal, hexadecimal, character, or floating-point formats — the classic tool for inspecting binary data.",
    options: [
      ["-c", "Output characters (with C escapes for non-printables)"],
      ["-x", "Output hexadecimal 2-byte units"],
      ["-A radix", "Choose address radix: d decimal, o octal, x hex, n none"],
      ["-t type", "Choose output type, e.g. x1 single-byte hex, u4 unsigned int"],
      ["-N count", "Limit the dump to count input bytes"]
    ],
    seeAlso: ["xxd", "strings"]
  },
  xxd: {
    desc2: "Creates a hex dump of a file, or converts a hex dump back into binary with -r. Part of the Vim package.",
    options: [
      ["-l len", "Stop after len octets"],
      ["-p, --plain", "Output in plain hexdump style (no offsets)"],
      ["-r, --revert", "Reverse operation: convert hexdump back to binary"],
      ["-c cols", "Format cols octets per row"]
    ],
    seeAlso: ["od", "strings"]
  },
  strings: {
    desc2: "Prints sequences of printable characters (at least 4 by default) found in binary files — a quick way to find embedded paths, versions, or keys.",
    options: [
      ["-n, --bytes", "Set the minimum sequence length (default 4)"],
      ["-a, --all", "Scan the whole file, not just initialized data"],
      ["-e encoding", "Select character size/endianness: s, S, b, l, B, L"],
      ["-f, --print-file-name", "Print the filename before each string"]
    ],
    seeAlso: ["od", "xxd", "file"]
  },
  diff: {
    desc2: "Compares two files (or directory trees) and prints the differences in normal, context, or unified (-u) format. Unified diffs are the input format of patch.",
    options: [
      ["-u", "Output in unified format (the patch-friendly form)"],
      ["-r, --recursive", "Recursively compare subdirectories"],
      ["-i, --ignore-case", "Ignore case differences"],
      ["-w, --ignore-all-space", "Ignore all whitespace"],
      ["-q, --brief", "Report only whether files differ"],
      ["-y, --side-by-side", "Output in two columns"]
    ],
    seeAlso: ["cmp", "patch", "comm"]
  },
  cmp: {
    desc2: "Compares two files byte by byte and reports the first differing byte and line, or (with -s) only signals via exit status. Faster than diff for 'are they identical?'",
    options: [
      ["-l, --verbose", "Print byte number and differing values for every difference"],
      ["-s, --quiet", "Output nothing; set exit status only"],
      ["-n, --bytes", "Compare at most N bytes"]
    ],
    seeAlso: ["diff", "comm"]
  },
  patch: {
    desc2: "Applies a diff (patch) file to original files, updating them to the patched version. Understands context and unified diffs and can reverse them.",
    options: [
      ["-p num", "Strip num leading path components from patch filenames"],
      ["-R, --reverse", "Apply the patch in reverse (unpatch)"],
      ["-i patchfile", "Read the patch from patchfile"],
      ["--dry-run", "Test the patch without modifying any file"]
    ],
    seeAlso: ["diff"]
  },
  column: {
    desc2: "Formats input into multiple aligned columns (-t fills a table by splitting on whitespace or a separator), making command output readable.",
    options: [
      ["-t, --table", "Determine column widths and produce a table"],
      ["-s, --separator", "Use the given delimiters to split input"],
      ["-c, --output-width", "Format output to fit WIDTH characters"]
    ],
    seeAlso: ["expand", "sort"]
  },
  expand: {
    desc2: "Converts TAB characters into spaces (8 by default), preserving alignment. unexpand performs the inverse.",
    options: [
      ["-i, --initial", "Convert only leading TABs on each line"],
      ["-t, --tabs", "Set tab stops (single number or comma list)"]
    ],
    seeAlso: ["tr", "fold"]
  },
  iconv: {
    desc2: "Converts the character encoding of text from one codeset to another, e.g. legacy ISO-8859-1 files to UTF-8.",
    options: [
      ["-f, --from-code", "Specify the source encoding"],
      ["-t, --to-code", "Specify the target encoding"],
      ["-l, --list", "List all known coded character sets"],
      ["-c", "Omit invalid characters instead of aborting"]
    ],
    seeAlso: ["file"]
  },
  comm: {
    desc2: "Compares two sorted files line by line, printing three columns: lines unique to file 1, unique to file 2, and common to both. -12 selects the intersection.",
    options: [
      ["-1", "Suppress column 1 (lines unique to file 1)"],
      ["-2", "Suppress column 2 (lines unique to file 2)"],
      ["-3", "Suppress column 3 (lines common to both)"]
    ],
    seeAlso: ["sort", "uniq", "join"]
  },
  join: {
    desc2: "For each pair of input lines with identical join fields, writes a line combining the two — a relational 'join' over sorted text files.",
    options: [
      ["-t char", "Use char as the input and output field separator"],
      ["-1 N", "Join on field N of file 1"],
      ["-2 N", "Join on field N of file 2"],
      ["-a N", "Also print unpairable lines from file N"]
    ],
    seeAlso: ["paste", "comm", "sort"]
  },
  zcat: {
    desc2: "Decompresses gzip files to standard output without touching the originals, so you can read or pipe .gz files directly. Equivalent to gunzip -c.",
    options: [
      ["-f, --force", "Also work on files not in gzip format (copy through)"],
      ["-q, --quiet", "Suppress warnings"],
      ["-S, --suffix", "Use .suf instead of .gz as the compressed suffix"]
    ],
    seeAlso: ["gzip", "gunzip", "zgrep"]
  },
  zgrep: {
    desc2: "Runs grep on compressed (.gz) files, decompressing on the fly, so archived logs can be searched without extracting them first.",
    options: [
      ["-i", "Ignore case distinctions"],
      ["-v", "Select non-matching lines"],
      ["-n", "Show line numbers"],
      ["-e pattern", "Use pattern as the search pattern"]
    ],
    seeAlso: ["grep", "zcat", "gzip"]
  }
});
