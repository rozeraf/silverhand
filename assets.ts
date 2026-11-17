const musicFiles = import.meta.glob("./music/*.mp3", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const assetFiles = import.meta.glob("./assets/*.{webp,png,jpg,jpeg,svg,ico}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

// Half-size copies for narrow screens; kept out of the terminal's VFS listing.
const smallFiles = import.meta.glob("./assets/sm/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const getMusic = (filename: string) => {
  const key = `./music/${filename}`;
  return musicFiles[key] || `/music/${filename}`;
};

const getAsset = (filename: string) => {
  const key = `./assets/${filename}`;
  return assetFiles[key] || `/assets/${filename}`;
};

/** `srcset` for an image that has a half-size copy in assets/sm. */
const responsive = (filename: string, smallWidth: number, fullWidth: number) => {
  const small = smallFiles[`./assets/sm/${filename}`];
  const full = getAsset(filename);
  return small ? `${small} ${smallWidth}w, ${full} ${fullWidth}w` : undefined;
};

export const ASSETS = {
  favicon: getAsset("samurai.png"),
  navLogo: getAsset("samurai.png"),
  heroBackground: getAsset("johnny_silverhand_hero.webp"),
  engramCard: getAsset("relic.webp"),
  silverArm: getAsset("arm.webp"),
  vest: getAsset("vest.webp"),
  malorianGun: getAsset("malorian_arms_3516.webp"),
  biographyPortrait: getAsset("johnny_silverhand_portrait.webp"),
  samuraiLogo: getAsset("samurai.png"),
  samuraiAlbum: getAsset("chippin_in.webp"),
  heroBackgroundSmall:
    smallFiles["./assets/sm/johnny_silverhand_hero.webp"] ??
    getAsset("johnny_silverhand_hero.webp"),
  srcSet: {
    silverArm: responsive("arm.webp", 700, 1400),
    vest: responsive("vest.webp", 700, 1400),
    malorianGun: responsive("malorian_arms_3516.webp", 800, 1920),
    biographyPortrait: responsive("johnny_silverhand_portrait.webp", 520, 900),
    engramCard: responsive("relic.webp", 900, 1920),
  },
  music: {
    chippinIn: getMusic("chippin_in.mp3"),
    neverFadeAway: getMusic("never_fade_away.mp3"),
    aLikeSupreme: getMusic("a_like_supreme.mp3"),
    archangel: getMusic("archangel.mp3"),
    blackDog: getMusic("black_dog.mp3"),
  },
  albumCovers: {
    chippinIn: getAsset("chippin_in.webp"),
    neverFadeAway: getAsset("never_fade_away.webp"),
    aLikeSupreme: getAsset("a_like_supreme.webp"),
    archangel: getAsset("archangel.jpg"),
    blackDog: getAsset("black_dog.jpg"),
  },
};
