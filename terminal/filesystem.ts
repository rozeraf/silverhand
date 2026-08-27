import {
  DEFAULT_DIRECTORY_META,
  DEFAULT_FILE_META,
  META_OVERRIDES,
} from "./metadata";
import type {
  FsNode,
  Permission,
  TerminalUser,
  VirtualFileSystem,
} from "./types";

export { GUEST_USER, SILVERHAND_USER, createPublicUser } from "./users";
export type { FsNode, TerminalUser, VirtualFileSystem } from "./types";

const textFiles = import.meta.glob("./files/**/*.txt", {
  eager: true,
  query: "?raw",
  import: "default",
}) as Record<string, string>;

const assetFiles = import.meta.glob(
  "../assets/*.{webp,png,jpg,jpeg,svg,ico}",
  {
    eager: true,
    query: "?url",
    import: "default",
  },
) as Record<string, string>;

const musicFiles = import.meta.glob("../music/*.mp3", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const TEXT_EXTENSION_EXCEPTIONS = new Set([
  "/archives/public/incident.txt",
  "/archives/public/target.txt",
]);

const textSourceToVirtualPath = (sourcePath: string) => {
  const path = sourcePath.replace(/^\.\/files/, "");
  return TEXT_EXTENSION_EXCEPTIONS.has(path) ? path : path.replace(/\.txt$/, "");
};

const mediaSourceToVirtualPath = (sourcePath: string) => {
  if (sourcePath.startsWith("../assets/")) {
    return `/srv/silverhand/assets/${sourcePath.slice("../assets/".length)}`;
  }
  return `/srv/silverhand/music/${sourcePath.slice("../music/".length)}`;
};

const mediaTypeForPath = (path: string) => {
  const extension = path.split(".").at(-1)?.toLowerCase();
  const types: Record<string, string> = {
    ico: "image/x-icon",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    mp3: "audio/mpeg",
    png: "image/png",
    svg: "image/svg+xml",
    webp: "image/webp",
  };
  return extension ? types[extension] : undefined;
};

const parentPathInternal = (path: string) => {
  if (path === "/") return "/";
  const parts = path.split("/").filter(Boolean);
  parts.pop();
  return parts.length ? `/${parts.join("/")}` : "/";
};

const ensureDirectory = (fs: VirtualFileSystem, path: string) => {
  if (fs[path]) return;
  const parent = parentPathInternal(path);
  if (parent !== path) ensureDirectory(fs, parent);
  fs[path] = {
    type: "directory",
    ...DEFAULT_DIRECTORY_META,
    ...META_OVERRIDES[path as keyof typeof META_OVERRIDES],
  };
};

export const createFileSystem = (): VirtualFileSystem => {
  const fs: VirtualFileSystem = {};
  ensureDirectory(fs, "/");

  for (const [sourcePath, content] of Object.entries(textFiles)) {
    const path = textSourceToVirtualPath(sourcePath);
    ensureDirectory(fs, parentPathInternal(path));
    fs[path] = {
      type: "file",
      ...DEFAULT_FILE_META,
      content,
      size: new TextEncoder().encode(content).byteLength,
      ...META_OVERRIDES[path as keyof typeof META_OVERRIDES],
    };
  }

  for (const [sourcePath, source] of Object.entries({
    ...assetFiles,
    ...musicFiles,
  })) {
    const path = mediaSourceToVirtualPath(sourcePath);
    ensureDirectory(fs, parentPathInternal(path));
    fs[path] = {
      type: "file",
      ...DEFAULT_FILE_META,
      source,
      mediaType: mediaTypeForPath(path),
      ...META_OVERRIDES[path as keyof typeof META_OVERRIDES],
    };
  }

  return fs;
};

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

export const parentPath = parentPathInternal;

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
    .filter(
      ([candidate]) =>
        candidate !== path && parentPathInternal(candidate) === path,
    )
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
  const size =
    node.type === "file" ? node.size ?? (node.content || "").length : 4096;
  return `${formatMode(node)}  1 ${node.owner.padEnd(10)} ${node.group.padEnd(9)} ${String(size).padStart(5)} ${basename(path)}`;
};
