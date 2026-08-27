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
