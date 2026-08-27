import type { NodeMetadata } from "./types";

export const DEFAULT_FILE_META: NodeMetadata = {
  owner: "root",
  group: "users",
  mode: 0o644,
};

export const DEFAULT_DIRECTORY_META: NodeMetadata = {
  owner: "root",
  group: "users",
  mode: 0o755,
};

export const META_OVERRIDES = {
  "/": { owner: "root", group: "root", mode: 0o755 },
  "/home": { owner: "root", group: "root", mode: 0o755 },
  "/home/guest": { owner: "guest", group: "guests", mode: 0o755 },
  "/home/silverhand": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o750,
  },
  "/home/silverhand/profile": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o640,
  },
  "/home/silverhand/notes": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o600,
  },
  "/archives": { owner: "root", group: "netwatch", mode: 0o755 },
  "/archives/bio_data/johnny_silverhand": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o644,
  },
  "/archives/arsenal_manifest": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o750,
  },
  "/archives/arsenal_manifest/malorian_arms_3516": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o640,
  },
  "/archives/relic": { owner: "root", group: "relic", mode: 0o750 },
  "/archives/relic/relic_source_code": {
    owner: "silverhand",
    group: "relic",
    mode: 0o640,
  },
  "/archives/relic/relic_2.0_prototype_specifications": {
    owner: "hellman",
    group: "relic",
    mode: 0o640,
  },
  "/archives/operations": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o750,
  },
  "/archives/operations/arasaka_tower_2023": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o640,
  },
  "/srv": { owner: "root", group: "root", mode: 0o755 },
  "/srv/silverhand": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o755,
  },
  "/srv/silverhand/assets": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o755,
  },
  "/srv/silverhand/music": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o755,
  },
  "/srv/silverhand/assets/SamuraiNeverFadeAwayCover.webp": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o644,
    size: 52968,
    mediaType: "image/webp",
  },
  "/srv/silverhand/assets/image 1(1).png": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o644,
    size: 148110,
    mediaType: "image/png",
  },
  "/srv/silverhand/assets/image-removebg-preview.png": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o644,
    size: 159990,
    mediaType: "image/png",
  },
  "/srv/silverhand/music/chippin_in.mp3": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o644,
    size: 3360853,
    mediaType: "audio/mpeg",
  },
  "/srv/silverhand/music/never_fade_away.mp3": {
    owner: "silverhand",
    group: "samurai",
    mode: 0o644,
    size: 7610036,
    mediaType: "audio/mpeg",
  },
} satisfies Record<string, NodeMetadata>;
