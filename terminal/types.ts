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
  source?: string;
  size?: number;
  mediaType?: string;
}

export type VirtualFileSystem = Record<string, FsNode>;

export type NodeMetadata = Pick<FsNode, "owner" | "group" | "mode"> &
  Partial<Pick<FsNode, "size" | "mediaType">>;
