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
  favicon: getAsset("image 1(1).png"),
  navLogo: getAsset("image 1(1).png"),
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
  samuraiLogo:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Samurai_logo_Cyberpunk_2077.svg/2560px-Samurai_logo_Cyberpunk_2077.svg.png",
  samuraiAlbum:
    "https://i.scdn.co/image/ab67616d0000b273010b998df4924a619053229d",
  music: {
    chippinIn: getMusic("chippin_in.mp3"),
    neverFadeAway: getMusic("never_fade_away.mp3"),
    aLikeSupreme: getMusic("a_like_supreme.mp3"),
    archangel: getMusic("archangel.mp3"),
    blackDog: getMusic("black_dog.mp3"),
  },
  albumCovers: {
    chippinIn:
      "https://upload.wikimedia.org/wikipedia/en/6/60/Cyberpunk_2077_-_Chippin%27_In.jpg",
    neverFadeAway: getAsset("SamuraiNeverFadeAwayCover.webp"),
    aLikeSupreme: "https://i1.sndcdn.com/artworks-Z1X2c11432-0-t500x500.jpg",
    blackDog:
      "https://i.scdn.co/image/ab67616d0000b2733979505c21df22dc8f45f573",
  },
};
