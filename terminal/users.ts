import type { TerminalUser } from "./types";

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

const normalizeUsername = (username: string) =>
  username.trim().toLowerCase().replace(/\s+/g, "_");

/** Public usernames become a path segment (/home/<name>), so keep them path-safe. */
export const isValidUsername = (username: string) =>
  /^[a-z0-9_-]{1,32}$/.test(normalizeUsername(username));

export const createPublicUser = (username: string): TerminalUser => {
  const normalizedUsername = normalizeUsername(username);
  return {
    username: normalizedUsername,
    uid: 1001,
    primaryGroup: "users",
    groups: ["users"],
    home: `/home/${normalizedUsername}`,
  };
};
