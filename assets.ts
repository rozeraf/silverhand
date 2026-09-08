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

const getMusic = (filename: string) => {
  const key = `./music/${filename}`;
  return musicFiles[key] || `/music/${filename}`;
};

const getAsset = (filename: string) => {
  const key = `./assets/${filename}`;
  return assetFiles[key] || `/assets/${filename}`;
};

export const ASSETS = {
  favicon: getAsset("samurai.png"),
  navLogo: getAsset("samurai.png"),
  heroBackground: getAsset("johnny_silverhand_hero.jpg"),
  engramCard: getAsset("relic.jpg"),
  noiseTexture: getAsset("stardust_noise.png"),
  silverArm: getAsset("arm.png"),
  vest: getAsset("vest.png"),
  malorianGun: getAsset("malorian_arms_3516.png"),
  biographyPortrait: getAsset("johnny_silverhand_portrait.webp"),
  samuraiLogo: getAsset("samurai.png"),
  samuraiAlbum: getAsset("chippin_in.jpg"),
  music: {
    chippinIn: getMusic("chippin_in.mp3"),
    neverFadeAway: getMusic("never_fade_away.mp3"),
    aLikeSupreme: getMusic("a_like_supreme.mp3"),
    archangel: getMusic("archangel.mp3"),
    blackDog: getMusic("black_dog.mp3"),
  },
  albumCovers: {
    chippinIn: getAsset("chippin_in.jpg"),
    neverFadeAway: getAsset("never_fade_away.webp"),
    aLikeSupreme: getAsset("a_like_supreme.png"),
    archangel: getAsset("archangel.jpg"),
    blackDog: getAsset("black_dog.jpg"),
  },
};
