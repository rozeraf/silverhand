import React, { useEffect, useState, useRef, FormEvent } from "react";
import { Terminal as TerminalIcon, X } from "lucide-react";

interface TerminalProps {
  isOpen: boolean;
  onClose: () => void;
  skipBoot?: boolean;
  onAuthSuccess?: (unlockedClassified: boolean) => void; // Updated callback signature
}

const RESERVED_USERS = [
  "silverhand",
  "johnny silverhand",
  "robert john linder",
];
const SECRET_PASS = "8492-AFX";

const Terminal: React.FC<TerminalProps> = ({
  isOpen,
  onClose,
  skipBoot = false,
  onAuthSuccess,
}) => {
  const [lines, setLines] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [isBooting, setIsBooting] = useState(!skipBoot);
  const [authMode, setAuthMode] = useState<"none" | "username" | "password">(
    "none",
  );
  const [tempUser, setTempUser] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus input on click
  const handleContainerClick = () => {
    if (!isBooting) inputRef.current?.focus();
  };

  // Scroll to bottom on new lines
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines, isBooting]);

  // Boot Sequence
  useEffect(() => {
    if (!isOpen) return;

    if (skipBoot) {
      setIsBooting(false);
      setLines([
        "NETWATCH_OS v.77.2 [Secure Connection Established]",
        "User: Unknown_Netrunner",
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

    // If we are in password mode, we treat the whole input as the password
    if (authMode === "password") {
      setLines((prev) => [...prev, `> *****`]);

      if (trimmed === SECRET_PASS) {
        setLines((prev) => [
          ...prev,
          "ACCESS GRANTED.",
          "CLASSIFIED DATA UNLOCKED.",
          "Welcome, Johnny.",
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
        // Reset auth mode completely, forcing user to type 'login <user>' again
        setAuthMode("none");
        setTempUser("");
      }
      return;
    }

    const [command, ...args] = trimmed.split(" ");
    const argString = args.join(" "); // For usernames with spaces
    setLines((prev) => [...prev, `> ${trimmed}`]);

    // Normal Command Mode
    switch (command.toLowerCase()) {
      case "help":
        setLines((prev) => [
          ...prev,
          "AVAILABLE COMMANDS:",
          "  login <username>  - Authenticate to system",
          "  whoami            - Show current user",
          "  ls                - List archive contents",
          "  clear             - Clear terminal screen",
          "  exit / boot       - Close terminal and enter site",
        ]);
        break;

      case "clear":
        setLines([]);
        break;

      case "ls":
        setLines((prev) => [
          ...prev,
          "drwxr-xr-x  bio_data/",
          "drwxr-xr-x  arsenal_manifest/",
          "-r--r--r--  relic_source_code.v2",
          localStorage.getItem("classified") === "true"
            ? "-rw-------  [CLASSIFIED] arasaka_tower_2023.log"
            : "-rw-------  [ENCRYPTED] arasaka_tower_2023.log (Access Denied)",
        ]);
        break;

      case "whoami":
        const user = localStorage.getItem("username") || "Guest_User";
        setLines((prev) => [
          ...prev,
          `Current User: ${user}`,
          `Clearance Level: ${user === "Silverhand" ? "MAXIMUM" : "RESTRICTED"}`,
        ]);
        break;

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
          setTempUser("Silverhand");
          setAuthMode("password");
          setLines((prev) => [
            ...prev,
            `User recognized: ${argString}`,
            "ENTER PASSPHRASE:",
          ]);
        } else {
          // Standard user login
          localStorage.setItem("username", argString);
          localStorage.setItem("authenticated", "true");
          // Important: Clear classified status if logging in as a normal user
          localStorage.removeItem("classified");

          setLines((prev) => [
            ...prev,
            `Authenticated as ${argString}.`,
            "Access granted to public archives.",
          ]);
          if (onAuthSuccess) onAuthSuccess(false); // False means no classified access
          setTimeout(onClose, 1000);
        }
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
      {/* Background FX */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(255,0,0,0.02),rgba(255,0,0,0.06))] bg-[size:100%_2px,3px_100%] pointer-events-none z-0"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-0"></div>

      <div className="relative z-10 w-full max-w-4xl mx-auto h-full flex flex-col border-2 border-[#ff003c] bg-black/90 shadow-[0_0_20px_rgba(255,0,60,0.2)]">
        {/* Header */}
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

        {/* Content Area */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 md:p-6 font-cyber text-sm md:text-base space-y-1 custom-scrollbar"
        >
          {lines.map((line, i) => (
            <div key={i} className="break-words whitespace-pre-wrap">
              {line}
            </div>
          ))}

          {/* Input Line */}
          {!isBooting && (
            <form onSubmit={handleSubmit} className="flex items-center mt-2">
              <span className="mr-2 text-[#fcee0a]">
                {authMode === "password" ? "PASSWORD>" : "USER@NC_NET >"}
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

          {/* Blinking Cursor if booting */}
          {isBooting && (
            <div className="w-2 h-4 bg-[#ff003c] animate-pulse inline-block mt-2"></div>
          )}
        </div>

        {/* Footer Status */}
        <div className="p-2 border-t border-[#ff003c]/30 text-xs text-[#fcee0a] flex justify-between uppercase">
          <span>STATUS: {isBooting ? "BOOTING..." : "ONLINE"}</span>
          <span>MEM: 64TB // ENCRYPTED</span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
