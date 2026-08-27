import React, { useEffect, useState, useRef, FormEvent } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";
import {
  SILVERHAND_USER,
  GUEST_USER,
  basename,
  canTraverse,
  createFileSystem,
  createPublicUser,
  formatLongEntry,
  formatMode,
  hasPermission,
  listChildren,
  normalizePath,
  parentPath,
  TerminalUser,
} from "./terminalFilesystem";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  skipBoot?: boolean;
  onAuthSuccess?: (unlockedClassified: boolean) => void;
}

const RESERVED_USERS = [
  "silverhand",
  "johnny silverhand",
  "robert john linder",
];
const SECRET_PASS = "8492-AFX";

const getStoredUser = (): TerminalUser => {
  const username = localStorage.getItem("username");
  if (username === "Silverhand") return SILVERHAND_USER;
  if (localStorage.getItem("authenticated") === "true" && username) {
    return createPublicUser(username);
  }
  return GUEST_USER;
};

const Terminal = ({
  isOpen,
  onClose,
  skipBoot = false,
  onAuthSuccess,
}: TerminalProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(!skipBoot);
  const [authMode, setAuthMode] = useState<"none" | "username" | "password">(
    "none",
  );
  const [sessionUser, setSessionUser] = useState<TerminalUser>(getStoredUser);
  const [cwd, setCwd] = useState(() => getStoredUser().home);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fsRef = useRef(createFileSystem());

  if (!fsRef.current[sessionUser.home]) {
    fsRef.current[sessionUser.home] = {
      type: "directory",
      owner: sessionUser.username,
      group: sessionUser.primaryGroup,
      mode: 0o750,
    };
  }

  const handleContainerClick = () => {
    if (!isBooting) inputRef.current?.focus();
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, isBooting]);

  useEffect(() => {
    if (!isOpen) return;

    if (skipBoot) {
      setIsBooting(false);
      setLines([
        "NETWATCH_OS v.77.2 [Secure Connection Established]",
        `Session restored for ${sessionUser.username} (uid=${sessionUser.uid})`,
        "Type 'help' for available commands.",
        "",
      ]);
      return;
    }

    const bootText = [
      "INITIALIZING RELIC BIOCHIP v2.0...",
      "CHECKING NEURAL LINK...",
      "ESTABLISHING SECURE CONNECTION...",
      "LOADING ENGRAM DATA...",
      "SYSTEM BREACH DETECTED... IGNORING...",
      "OVERRIDING SECURITY PROTOCOLS...",
      "CONNECTION ESTABLISHED.",
      " ",
      "WELCOME TO NIGHT CITY ARCHIVES.",
      "HINT: You must authenticate to proceed. Try: login <username>",
    ];

    let delay = 0;
    setLines([]);
    setIsBooting(true);

    bootText.forEach((line, index) => {
      delay += Math.random() * 300 + 100;
      setTimeout(() => {
        setLines((prev) => [...prev, line]);
        if (index === bootText.length - 1) {
          setIsBooting(false);
          setTimeout(() => inputRef.current?.focus(), 100);
        }
      }, delay);
    });
  }, [isOpen, skipBoot]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();

    if (authMode === "password") {
      setLines((prev) => [...prev, `> *****`]);

      if (trimmed === SECRET_PASS) {
        setSessionUser(SILVERHAND_USER);
        setCwd(SILVERHAND_USER.home);
        setLines((prev) => [
          ...prev,
          "ACCESS GRANTED.",
          `uid=${SILVERHAND_USER.uid}(${SILVERHAND_USER.username}) gid=1000(${SILVERHAND_USER.primaryGroup})`,
          `groups=${SILVERHAND_USER.groups.join(",")}`,
          `Home directory: ${SILVERHAND_USER.home}`,
        ]);
        localStorage.setItem("username", "Silverhand");
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("classified", "true");
        setAuthMode("none");
        if (onAuthSuccess) onAuthSuccess(true);
        setTimeout(onClose, 1500);
      } else {
        setLines((prev) => [
          ...prev,
          "ACCESS DENIED.",
          "INCORRECT PASSPHRASE.",
          "SESSION TERMINATED. PLEASE LOGIN AGAIN.",
        ]);
        setAuthMode("none");
      }
      return;
    }

    const [command, ...args] = trimmed.split(" ");
    const argString = args.join(" ");
    setLines((prev) => [...prev, `> ${trimmed}`]);

    switch (command.toLowerCase()) {
      case "help":
        setLines((prev) => [
          ...prev,
          "AVAILABLE COMMANDS:",
          "  login <username>  - Authenticate to system",
          "  logout            - End the current user session",
          "  whoami            - Print the current username",
          "  id / groups       - Show UID, primary group and memberships",
          "  pwd               - Print working directory",
          "  ls [-l] [path]    - List directory contents",
          "  cd [path]         - Change working directory",
          "  cat <file>        - Print a readable file",
          "  stat <path>       - Show owner, group and permissions",
          "  touch <file>      - Create a file when the directory is writable",
          "  mkdir <dir>       - Create a writable directory",
          "  write <file> TEXT - Replace a file when write access is granted",
          "  chmod MODE <path> - Change mode as the file owner",
          "  rm <file>         - Remove a file from a writable directory",
          "  clear             - Clear terminal screen",
          "  exit / boot       - Close terminal and enter site",
        ]);
        break;

      case "clear":
        setLines([]);
        break;

      case "pwd":
        setLines((prev) => [...prev, cwd]);
        break;

      case "whoami":
        setLines((prev) => [...prev, sessionUser.username]);
        break;

      case "id":
        setLines((prev) => [
          ...prev,
          `uid=${sessionUser.uid}(${sessionUser.username}) gid=${sessionUser.primaryGroup} groups=${sessionUser.groups.join(",")}`,
        ]);
        break;

      case "groups":
        setLines((prev) => [...prev, sessionUser.groups.join(" ")]);
        break;

      case "ls": {
        const long = args.includes("-l") || args.includes("-la") || args.includes("-al");
        const requested = args.find((arg) => !arg.startsWith("-")) || ".";
        const path = normalizePath(cwd, requested === "~" ? sessionUser.home : requested);
        const node = fsRef.current[path];

        if (!node) {
          setLines((prev) => [...prev, `ls: cannot access '${requested}': No such file or directory`]);
          break;
        }

        if (!canTraverse(fsRef.current, parentPath(path), sessionUser)) {
          setLines((prev) => [...prev, `ls: cannot open '${requested}': Permission denied`]);
          break;
        }

        if (node.type === "file") {
          setLines((prev) => [...prev, long ? formatLongEntry(path, node) : basename(path)]);
          break;
        }

        if (!canTraverse(fsRef.current, path, sessionUser) || !hasPermission(node, sessionUser, "r")) {
          setLines((prev) => [...prev, `ls: cannot open directory '${requested}': Permission denied`]);
          break;
        }

        const entries = listChildren(fsRef.current, path);
        const output = entries.length
          ? entries.map(([childPath, child]) =>
              long
                ? formatLongEntry(childPath, child)
                : `${basename(childPath)}${child.type === "directory" ? "/" : ""}`,
            )
          : [""];
        setLines((prev) => [...prev, ...output]);
        break;
      }

      case "cd": {
        const requested = argString || sessionUser.home;
        const path = normalizePath(cwd, requested === "~" ? sessionUser.home : requested);
        const node = fsRef.current[path];

        if (!node) {
          setLines((prev) => [...prev, `cd: ${requested}: No such file or directory`]);
        } else if (node.type !== "directory") {
          setLines((prev) => [...prev, `cd: ${requested}: Not a directory`]);
        } else if (!canTraverse(fsRef.current, path, sessionUser)) {
          setLines((prev) => [...prev, `cd: ${requested}: Permission denied`]);
        } else {
          setCwd(path);
        }
        break;
      }

      case "cat": {
        if (!argString) {
          setLines((prev) => [...prev, "cat: missing file operand"]);
          break;
        }
        const path = normalizePath(cwd, argString);
        const node = fsRef.current[path];
        if (!node) {
          setLines((prev) => [...prev, `cat: ${argString}: No such file or directory`]);
        } else if (node.type !== "file") {
          setLines((prev) => [...prev, `cat: ${argString}: Is a directory`]);
        } else if (
          !canTraverse(fsRef.current, parentPath(path), sessionUser) ||
          !hasPermission(node, sessionUser, "r")
        ) {
          setLines((prev) => [...prev, `cat: ${argString}: Permission denied`]);
        } else {
          setLines((prev) => [...prev, ...(node.content || "").split("\n")]);
        }
        break;
      }

      case "stat": {
        if (!argString) {
          setLines((prev) => [...prev, "stat: missing operand"]);
          break;
        }
        const path = normalizePath(cwd, argString);
        const node = fsRef.current[path];
        if (!node || !canTraverse(fsRef.current, parentPath(path), sessionUser)) {
          setLines((prev) => [...prev, `stat: cannot stat '${argString}': ${node ? "Permission denied" : "No such file or directory"}`]);
        } else {
          setLines((prev) => [
            ...prev,
            `  File: ${path}`,
            `  Type: ${node.type}`,
            `Access: (${node.mode.toString(8).padStart(3, "0")}/${formatMode(node)})  Owner: ${node.owner}  Group: ${node.group}`,
            `  Size: ${node.type === "file" ? (node.content || "").length : 4096} bytes`,
          ]);
        }
        break;
      }

      case "touch":
      case "mkdir": {
        if (!argString) {
          setLines((prev) => [...prev, `${command}: missing operand`]);
          break;
        }
        const path = normalizePath(cwd, argString);
        const parent = parentPath(path);
        const parentNode = fsRef.current[parent];
        if (fsRef.current[path]) {
          if (command === "mkdir") setLines((prev) => [...prev, `mkdir: cannot create '${argString}': File exists`]);
          break;
        }
        if (
          !parentNode ||
          parentNode.type !== "directory" ||
          !canTraverse(fsRef.current, parent, sessionUser) ||
          !hasPermission(parentNode, sessionUser, "w")
        ) {
          setLines((prev) => [...prev, `${command}: cannot create '${argString}': Permission denied`]);
          break;
        }
        fsRef.current[path] = {
          type: command === "mkdir" ? "directory" : "file",
          owner: sessionUser.username,
          group: sessionUser.primaryGroup,
          mode: command === "mkdir" ? 0o775 : 0o664,
          ...(command === "touch" ? { content: "" } : {}),
        };
        break;
      }

      case "write": {
        const [rawPath, ...contentParts] = args;
        if (!rawPath || !contentParts.length) {
          setLines((prev) => [...prev, "write: usage: write <file> <text>"]);
          break;
        }
        const path = normalizePath(cwd, rawPath);
        const node = fsRef.current[path];
        if (!node) {
          setLines((prev) => [...prev, `write: ${rawPath}: No such file`]);
        } else if (node.type !== "file") {
          setLines((prev) => [...prev, `write: ${rawPath}: Is a directory`]);
        } else if (
          !canTraverse(fsRef.current, parentPath(path), sessionUser) ||
          !hasPermission(node, sessionUser, "w")
        ) {
          setLines((prev) => [...prev, `write: ${rawPath}: Permission denied`]);
        } else {
          node.content = contentParts.join(" ");
        }
        break;
      }

      case "chmod": {
        const [rawMode, rawPath] = args;
        const mode = Number.parseInt(rawMode, 8);
        if (!rawMode || !rawPath || !/^[0-7]{3}$/.test(rawMode)) {
          setLines((prev) => [...prev, "chmod: usage: chmod <octal mode> <path>"]);
          break;
        }
        const path = normalizePath(cwd, rawPath);
        const node = fsRef.current[path];
        if (!node) {
          setLines((prev) => [...prev, `chmod: cannot access '${rawPath}': No such file or directory`]);
        } else if (node.owner !== sessionUser.username) {
          setLines((prev) => [...prev, `chmod: changing permissions of '${rawPath}': Operation not permitted`]);
        } else {
          node.mode = mode;
        }
        break;
      }

      case "rm": {
        if (!argString) {
          setLines((prev) => [...prev, "rm: missing operand"]);
          break;
        }
        const path = normalizePath(cwd, argString);
        const node = fsRef.current[path];
        const parent = parentPath(path);
        const parentNode = fsRef.current[parent];
        if (!node) {
          setLines((prev) => [...prev, `rm: cannot remove '${argString}': No such file`]);
        } else if (node.type === "directory") {
          setLines((prev) => [...prev, `rm: cannot remove '${argString}': Is a directory`]);
        } else if (
          !parentNode ||
          !canTraverse(fsRef.current, parent, sessionUser) ||
          !hasPermission(parentNode, sessionUser, "w")
        ) {
          setLines((prev) => [...prev, `rm: cannot remove '${argString}': Permission denied`]);
        } else {
          delete fsRef.current[path];
        }
        break;
      }

      case "exit":
      case "boot":
        setLines((prev) => [...prev, "Terminating session..."]);
        setTimeout(onClose, 500);
        break;

      case "login":
        if (!argString) {
          setLines((prev) => [...prev, "Usage: login <username>"]);
          break;
        }

        const isReserved = RESERVED_USERS.includes(argString.toLowerCase());

        if (isReserved) {
          setAuthMode("password");
          setLines((prev) => [
            ...prev,
            `User recognized: ${argString}`,
            "ENTER PASSPHRASE:",
          ]);
        } else {
          const publicUser = createPublicUser(argString);
          setSessionUser(publicUser);
          setCwd(publicUser.home);
          localStorage.setItem("username", argString);
          localStorage.setItem("authenticated", "true");
          localStorage.removeItem("classified");

          setLines((prev) => [
            ...prev,
            `Authenticated as ${argString}.`,
            "Access granted to public archives.",
          ]);
          if (onAuthSuccess) onAuthSuccess(false);
          setTimeout(onClose, 1000);
        }
        break;

      case "logout":
        localStorage.removeItem("username");
        localStorage.removeItem("authenticated");
        localStorage.removeItem("classified");
        setSessionUser(GUEST_USER);
        setCwd(GUEST_USER.home);
        setAuthMode("none");
        onAuthSuccess?.(false);
        setLines((prev) => [...prev, "Session closed. Continuing as guest."]);
        break;

      case "":
        break;

      default:
        setLines((prev) => [...prev, `Command not found: ${command}`]);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommand(input);
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[150] bg-black font-mono text-[#ff003c] p-4 md:p-8 flex flex-col overflow-hidden"
      onClick={handleContainerClick}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto h-full flex flex-col border-2 border-[#ff003c] bg-black/90 shadow-[0_0_20px_rgba(255,0,60,0.2)]">
        <div className="flex items-center justify-between bg-[#ff003c] text-black px-4 py-1 shrink-0">
          <div className="flex items-center gap-2 font-bold">
            <TerminalIcon size={16} />
            <span>NETWATCH_TERMINAL // CONNECTION_SECURE</span>
          </div>
          <button
            onClick={onClose}
            className="hover:bg-black hover:text-[#ff003c] p-1"
          >
            <X size={16} />
          </button>
        </div>

        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 font-cyber text-sm md:text-base space-y-1 custom-scrollbar"
        >
          {lines.map((line, i) => (
            <div key={i} className="break-words whitespace-pre-wrap">
              {line}
            </div>
          ))}

          {!isBooting && (
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="mr-2 text-[#fcee0a]">
                {authMode === "password"
                  ? "PASSWORD>"
                  : `${sessionUser.username}@NC_NET:${cwd}$`}
              </span>
              <input
                ref={inputRef}
                type={authMode === "password" ? "password" : "text"}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-[#00f0ff] font-mono caret-[#00f0ff]"
                autoFocus
                autoComplete="off"
                spellCheck="false"
              />
            </form>
          )}

          {isBooting && (
            <div className="w-2 h-4 bg-[#ff003c] animate-pulse inline-block mt-2"></div>
          )}
        </div>

        <div className="p-2 border-t border-[#ff003c]/30 text-xs text-[#fcee0a] flex justify-between uppercase">
          <span>STATUS: {isBooting ? "BOOTING..." : "ONLINE"}</span>
          <span>FS: POSIX // PERMISSIONS ENFORCED</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
