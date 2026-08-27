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
  heroBackground:
    "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2021/01/cyberpunk-2077-johnny-silverhand-glasses.jpg?q=50&fit=crop&w=1600&h=900&dpr=1.5",
  engramCard: "https://i.redd.it/xjga6t8mihaa1.jpg",
  noiseTexture: "https://www.transparenttextures.com/patterns/stardust.png",
  silverArm:
    "https://i.etsystatic.com/45478307/r/il/2e1f03/5165531545/il_fullxfull.5165531545_8mso.jpg",
  malorianGun:
    "https://storage.modworkshop.net/mods/images/132636_1668291848_1922616252580f415a274d98a2c717e5.webp",
  biographyPortrait:
    "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/3376891_johnnysilverhand.png",
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
