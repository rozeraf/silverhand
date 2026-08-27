export type Permission = "r" | "w" | "x";

export interface TerminalUser {
  username: string;
  uid: number;
  primaryGroup: string;
  groups: string[];
  home: string;
}

export interface FsNode {
  type: "file" | "directory";
  owner: string;
  group: string;
  mode: number;
  content?: string;
}

export type VirtualFileSystem = Record<string, FsNode>;

export const GUEST_USER: TerminalUser = {
  username: "guest",
  uid: 65534,
  primaryGroup: "guests",
  groups: ["guests"],
  home: "/home/guest",
};

export const SILVERHAND_USER: TerminalUser = {
  username: "silverhand",
  uid: 1000,
  primaryGroup: "samurai",
  groups: ["samurai", "relic", "wheel"],
  home: "/home/silverhand",
};

export const createPublicUser = (username: string): TerminalUser => {
  const normalizedUsername = username.toLowerCase().replace(/\s+/g, "_");
  return {
    username: normalizedUsername,
    uid: 1001,
    primaryGroup: "users",
    groups: ["users"],
    home: `/home/${normalizedUsername}`,
  };
};

export const createFileSystem = (): VirtualFileSystem => ({
  "/": { type: "directory", owner: "root", group: "root", mode: 0o755 },
  "/home": {
    type: "directory",
    owner: "root",
    group: "root",
    mode: 0o755,
  },
  "/home/guest": {
    type: "directory",
    owner: "guest",
    group: "guests",
    mode: 0o755,
  },
  "/home/guest/readme.txt": {
    type: "file",
    owner: "root",
    group: "users",
    mode: 0o644,
    content: [
      "NIGHT CITY ARCHIVES — PUBLIC ACCESS NODE",
      "",
      "Public records are mounted at /archives/public.",
      "Use 'help' to list available commands.",
      "Use 'id' to inspect your identity and groups.",
    ].join("\n"),
  },
  "/home/silverhand": {
    type: "directory",
    owner: "silverhand",
    group: "samurai",
    mode: 0o750,
  },
  "/home/silverhand/profile.txt": {
    type: "file",
    owner: "silverhand",
    group: "samurai",
    mode: 0o640,
    content: [
      "USER: Robert John Linder",
      "HANDLE: Johnny Silverhand",
      "AFFILIATION: SAMURAI",
      "STATUS: ENGRAM ACTIVE",
      "CLEARANCE: RELIC / FIELD OPERATIONS",
    ].join("\n"),
  },
  "/home/silverhand/notes.txt": {
    type: "file",
    owner: "silverhand",
    group: "samurai",
    mode: 0o600,
    content: [
      "Arasaka doesn't protect people. It protects ownership.",
      "Call Rogue before the next operation.",
      "Never stop fighting.",
    ].join("\n"),
  },
  "/archives": {
    type: "directory",
    owner: "root",
    group: "netwatch",
    mode: 0o755,
  },
  "/archives/public": {
    type: "directory",
    owner: "root",
    group: "users",
    mode: 0o755,
  },
  "/archives/public/night_city.txt": {
    type: "file",
    owner: "root",
    group: "users",
    mode: 0o644,
    content: [
      "NIGHT CITY MUNICIPAL ARCHIVE",
      "Population estimate: 6,964,425",
      "Administrative status: Free City",
      "Primary corporate presence: Arasaka, Militech, Kang Tao",
    ].join("\n"),
  },
  "/archives/bio_data": {
    type: "directory",
    owner: "root",
    group: "users",
    mode: 0o755,
  },
  "/archives/bio_data/johnny_silverhand.txt": {
    type: "file",
    owner: "silverhand",
    group: "samurai",
    mode: 0o644,
    content: [
      "LEGAL NAME: Robert John Linder",
      "KNOWN AS: Johnny Silverhand",
      "OCCUPATION: Rockerboy, vocalist, guitarist",
      "MILITARY RECORD: Central American Conflict",
      "CYBERWARE: Military-grade left arm prosthesis",
      "LAST VERIFIED PHYSICAL STATUS: KIA, 2023",
    ].join("\n"),
  },
  "/archives/arsenal_manifest": {
    type: "directory",
    owner: "silverhand",
    group: "samurai",
    mode: 0o750,
  },
  "/archives/arsenal_manifest/malorian_arms_3516.txt": {
    type: "file",
    owner: "silverhand",
    group: "samurai",
    mode: 0o640,
    content: [
      "MODEL: Malorian Arms 3516",
      "TYPE: Custom semiautomatic handgun",
      "CALIBER: 14mm",
      "OWNER: Johnny Silverhand",
      "FEATURES: Ricochet, wall penetration, incendiary discharge",
      "WARNING: Recoil exceeds safe limits for an unaugmented user.",
    ].join("\n"),
  },
  "/archives/relic": {
    type: "directory",
    owner: "root",
    group: "relic",
    mode: 0o750,
  },
  "/archives/relic/relic_source_code.v2": {
    type: "file",
    owner: "silverhand",
    group: "relic",
    mode: 0o640,
    content: [
      "RELIC 2.0 — PERSONALITY CONSTRUCT HEADER",
      "construct_id=JS-2023-ARSK",
      "subject=ROBERT_JOHN_LINDER",
      "integrity=86.4%",
      "host_overwrite=ACTIVE",
      "neural_sync=UNSTABLE",
    ].join("\n"),
  },
  "/archives/operations": {
    type: "directory",
    owner: "silverhand",
    group: "samurai",
    mode: 0o750,
  },
  "/archives/operations/arasaka_tower_2023.log": {
    type: "file",
    owner: "silverhand",
    group: "samurai",
    mode: 0o640,
    content: [
      "OPERATION: FALL OF THE TOWERS",
      "DATE: 2023-08-20",
      "CONTRACTOR: MILITECH",
      "FIELD COMMAND: MORGAN BLACKHAND",
      "STRIKE TEAM: ALPHA / OMEGA",
      "OBJECTIVE: DESTROY ARASAKA DATABASE CORE",
      "OUTCOME: TOWER DESTROYED; SUBJECT SILVERHAND LOST",
      "NOTE: Engram recollection diverges from the operation record.",
    ].join("\n"),
  },
});

export const normalizePath = (cwd: string, input = ".") => {
  const source = input.startsWith("/") ? input : `${cwd}/${input}`;
  const parts: string[] = [];

  for (const part of source.split("/")) {
    if (!part || part === ".") continue;
    if (part === "..") parts.pop();
    else parts.push(part);
  }

  return `/${parts.join("/")}` || "/";
};

export const parentPath = (path: string) => {
  if (path === "/") return "/";
  const parts = path.split("/").filter(Boolean);
  parts.pop();
  return parts.length ? `/${parts.join("/")}` : "/";
};

export const basename = (path: string) =>
  path === "/" ? "/" : path.split("/").filter(Boolean).at(-1) || "/";

export const hasPermission = (
  node: FsNode,
  user: TerminalUser,
  permission: Permission,
) => {
  const shift =
    node.owner === user.username
      ? 6
      : user.groups.includes(node.group)
        ? 3
        : 0;
  const value = (node.mode >> shift) & 0b111;
  const mask = permission === "r" ? 0b100 : permission === "w" ? 0b010 : 0b001;
  return (value & mask) !== 0;
};

export const canTraverse = (
  fs: VirtualFileSystem,
  path: string,
  user: TerminalUser,
) => {
  const parts = path.split("/").filter(Boolean);
  let current = "/";

  if (!hasPermission(fs["/"], user, "x")) return false;

  for (const part of parts) {
    current = current === "/" ? `/${part}` : `${current}/${part}`;
    const node = fs[current];
    if (!node) return false;
    if (node.type === "directory" && !hasPermission(node, user, "x")) {
      return false;
    }
  }

  return true;
};

export const listChildren = (fs: VirtualFileSystem, path: string) =>
  Object.entries(fs)
    .filter(([candidate]) => candidate !== path && parentPath(candidate) === path)
    .sort(([a], [b]) => a.localeCompare(b));

export const formatMode = (node: FsNode) => {
  const bits = [6, 3, 0]
    .map((shift) => {
      const value = (node.mode >> shift) & 0b111;
      return `${value & 4 ? "r" : "-"}${value & 2 ? "w" : "-"}${value & 1 ? "x" : "-"}`;
    })
    .join("");
  return `${node.type === "directory" ? "d" : "-"}${bits}`;
};

export const formatLongEntry = (path: string, node: FsNode) => {
  const size = node.type === "file" ? (node.content || "").length : 4096;
  return `${formatMode(node)}  1 ${node.owner.padEnd(10)} ${node.group.padEnd(9)} ${String(size).padStart(5)} ${basename(path)}`;
};
