/* Exit status + environment data — part 2 of 3 (process, network, users, packages) */
var OK = [["0", "Success"], ["1", "An error occurred"]];

window.EXITSTATUS = Object.assign(window.EXITSTATUS || {}, {
  /* process */
  ps: OK, top: OK, htop: OK,
  kill: [["0", "All signals were sent successfully"], ["1", "At least one signal could not be sent"]],
  killall: [["0", "At least one matching process was signaled"], ["1", "No matching process was found (or other failure)"]],
  pkill: [["0", "One or more processes matched"], ["1", "No processes matched"], ["2", "Syntax error in the command line"], ["3", "Fatal error"]],
  pgrep: [["0", "One or more processes matched"], ["1", "No processes matched"], ["2", "Syntax error in the command line"], ["3", "Fatal error"]],
  nice: [["125", "nice itself failed"], ["126", "Command found but not executable"], ["127", "Command not found"], ["Otherwise", "The command's exit status"]],
  renice: OK,
  nohup: [["(any)", "The exit status of the command run under nohup"]],
  bg: [["0", "Success"], ["1", "No such job, or an error occurred"]],
  fg: [["0", "Success"], ["1", "No such job, or an error occurred"]],
  jobs: [["0", "Success"]],
  disown: [["0", "Success"], ["1", "No such job, or an error occurred"]],
  time: [["126", "Command found but not executable"], ["127", "Command not found"], ["Otherwise", "The command's exit status"]],
  timeout: [["124", "The command timed out"], ["125", "timeout itself failed"], ["126", "Command found but not executable"], ["127", "Command not found"], ["137", "Command was sent SIGKILL (128 + 9)"], ["Otherwise", "The command's exit status"]],
  watch: [["0", "Normal termination"], ["Non-zero", "An error occurred"]],
  pstree: OK,
  pidof: [["0", "At least one matching process was found"], ["1", "No matching process was found"]],
  pidstat: OK,
  strace: [["(any)", "The exit status of the traced program"]],
  ltrace: [["(any)", "The exit status of the traced program"]],
  exec: [["(any)", "Replaces the shell; the exit status is that of the executed command"]],
  ulimit: OK, trap: OK,
  lsof: [["0", "Success"], ["1", "An error occurred"]],

  /* network */
  ping: [["0", "At least one response was received"], ["1", "No responses were received"], [">1", "An error occurred"]],
  ip: OK, ifconfig: OK, netstat: OK, ss: OK,
  curl: [["0", "Success"], ["6", "Could not resolve host"], ["7", "Failed to connect to host"], ["22", "HTTP page not retrieved (with -f)"], ["28", "Operation timed out"], ["1-97", "Other documented error codes"]],
  wget: [["0", "No problems occurred"], ["1", "Generic error code"], ["2", "Parse error (e.g. options)"], ["3", "File I/O error"], ["4", "Network failure"], ["5", "SSL verification failure"], ["6", "Username/password authentication failure"], ["7", "Protocol errors"], ["8", "Server issued an error response"]],
  ssh: [["255", "ssh itself failed (connection or authentication)"], ["Otherwise", "The remote command's exit status"]],
  scp: [["0", "Success"], ["1", "An error occurred"]],
  sftp: [["0", "Success"], ["1", "An error occurred"], ["255", "SSH connection failure"]],
  rsync: [["0", "Success"], ["23", "Partial transfer (some files could not be sent)"], ["24", "Source files vanished during transfer"], ["30", "Timeout in data send/receive"], ["1-14, 20-25, 30+", "Other documented error codes"]],
  nc: [["0", "Success"], ["1", "Failure"]],
  nmap: [["0", "Success"], ["1-9", "Documented error codes (e.g. no targets, scan failures)"]],
  traceroute: OK, mtr: OK,
  dig: [["0", "Success"], ["1-99", "Usage, network, or server errors (e.g. 9: no reply from server)"]],
  nslookup: [["0", "Success"], ["1", "No response from the requested server"]],
  host: OK, whois: OK, route: OK, arp: OK, ethtool: OK, tcpdump: OK,
  iptables: OK, nft: OK, ufw: OK, "firewall-cmd": OK,
  "ssh-keygen": OK, "ssh-copy-id": OK, socat: OK, telnet: OK,

  /* users */
  useradd: [["0", "Success"], ["1", "Password file could not be updated"], ["3", "Invalid argument to option"], ["4", "UID already in use"], ["9", "Username or group name already in use"], ["12", "Home directory could not be created"]],
  userdel: [["0", "Success"], ["1", "Password file could not be updated"], ["6", "The specified user does not exist"], ["8", "User is currently logged in"], ["12", "Home directory could not be removed"]],
  usermod: [["0", "Success"], ["1", "Password file could not be updated"], ["3", "Invalid argument to option"], ["6", "Specified group does not exist"], ["9", "Username already in use"], ["10", "Group file could not be updated"]],
  adduser: OK, deluser: OK,
  groupadd: [["0", "Success"], ["3", "Invalid argument to option"], ["4", "GID already used"], ["9", "Group name already in use"], ["10", "Group file could not be updated"]],
  groupdel: [["0", "Success"], ["6", "Specified group does not exist"], ["8", "Cannot remove a user's primary group"], ["10", "Group file could not be updated"]],
  groupmod: [["0", "Success"], ["3", "Invalid argument to option"], ["4", "GID already used"], ["6", "Specified group does not exist"], ["9", "Group name already in use"]],
  groups: OK, newgrp: OK, gpasswd: OK,
  passwd: [["0", "Success"], ["1", "Permission denied"], ["2", "Invalid combination of options"], ["6", "Invalid argument to option"], ["10", "Password or group file could not be updated"]],
  chage: [["0", "Success"], ["1", "Permission denied"], ["2", "Invalid syntax"]],
  chown: OK, chgrp: OK, chmod: OK,
  umask: [["0", "Success"], ["Non-zero", "Invalid mask or option"]],
  getent: [["0", "Entries were found and printed"], ["1", "Missing keys, or entry not found"], ["2", "Invalid syntax"], ["3", "Enumeration is not supported for this database"]],
  su: [["0", "Success"], ["1", "Authentication or execution failure"], ["Otherwise", "The command's exit status (with -c)"]],
  sudo: [["0", "Success"], ["1", "Generic sudo error"], ["126", "Command found but not executable"], ["127", "Command not found"], ["Otherwise", "The command's exit status"]],
  visudo: [["0", "No syntax errors were found"], ["1", "The sudoers file contains syntax errors"]],
  login: OK,
  logout: [["0", "Success"]],

  /* packages */
  apt: [["0", "Success"], ["100", "An error occurred"]],
  "apt-get": [["0", "Success"], ["100", "An error occurred"]],
  aptitude: OK, dpkg: OK, yum: OK, dnf: OK, rpm: OK, pacman: OK, yay: OK, zypper: OK, apk: OK,
  snap: OK, flatpak: OK, pip: OK, npm: OK, gem: OK, cargo: OK
});

window.ENVVARS = Object.assign(window.ENVVARS || {}, {
  nohup: [
    ["HOME", "Location of the default nohup.out output file"]
  ],
  ssh: [
    ["SSH_AUTH_SOCK", "Socket used to contact the SSH authentication agent"],
    ["SSH_ASKPASS", "GUI program called to prompt for a passphrase"],
    ["DISPLAY", "Used for X11 forwarding when set"],
    ["SSH_CONNECTION / SSH_TTY", "Set by the server on the remote side: client IP, port, server IP, port / the allocated terminal"]
  ],
  scp: [
    ["SSH_AUTH_SOCK", "Socket used to contact the SSH authentication agent"],
    ["SSH_ASKPASS", "GUI program called to prompt for a passphrase"]
  ],
  sftp: [
    ["SSH_AUTH_SOCK", "Socket used to contact the SSH authentication agent"]
  ],
  curl: [
    ["http_proxy / https_proxy / all_proxy", "Proxy servers to route requests through"],
    ["no_proxy", "Comma-separated hosts to bypass the proxy for"],
    ["CURL_HOME", "Directory where curl looks for its .curlrc config"],
    ["SSL_CERT_FILE / SSL_CERT_DIR", "Extra CA certificates / directories for TLS verification"]
  ],
  wget: [
    ["http_proxy / https_proxy / ftp_proxy", "Proxy servers to route requests through"],
    ["no_proxy", "Comma-separated hosts to bypass the proxy for"],
    ["WGETRC", "Location of the user's wgetrc config file"]
  ],
  rsync: [
    ["RSYNC_RSH", "Remote shell to use instead of ssh (e.g. 'ssh -p 2222')"],
    ["RSYNC_PROXY", "Proxy server for rsync daemon connections"],
    ["RSYNC_PASSWORD", "Password for authenticated rsync:// modules"]
  ],
  su: [
    ["HOME, SHELL, USER, LOGNAME, PATH", "Reset to match the target user's account (unless -m is used)"]
  ],
  sudo: [
    ["SUDO_USER / SUDO_UID / SUDO_GID", "Set for the command: the invoking user, UID, and GID"],
    ["SUDO_COMMAND", "Set for the command: the command sudo was asked to run"],
    ["EDITOR / VISUAL", "Editor used by sudoedit"],
    ["SUDO_ASKPASS", "Helper program used with -A to read the password"]
  ],
  visudo: [
    ["EDITOR / VISUAL", "Editor used to edit the sudoers file"]
  ],
  login: [
    ["HOME, SHELL, USER, LOGNAME, MAIL, PATH", "Set from the target user's account entries at login"]
  ],
  apt: [
    ["DEBIAN_FRONTEND", "Interface used by maintainer scripts (e.g. noninteractive)"]
  ],
  "apt-get": [
    ["DEBIAN_FRONTEND", "Interface used by maintainer scripts (e.g. noninteractive)"]
  ],
  dpkg: [
    ["DEBIAN_FRONTEND", "Interface used by maintainer scripts (e.g. noninteractive)"]
  ]
});
