/**
 * ФАЙЛ УПРАВЛЕНИЯ КАРТИНКАМИ (ASSETS)
 * Используем import.meta.glob для динамического импорта ассетов,
 * чтобы Vite включал их в билд и хешировал имена файлов.
 */

// Динамический импорт всех mp3 из папки music
const musicFiles = import.meta.glob("./music/*.mp3", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

// Динамический импорт всех webp из папки assets
const assetFiles = import.meta.glob("./assets/*.webp", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

// Хелпер для получения правильного пути после билда
const getMusic = (filename: string) => {
  const key = `./music/${filename}`;
  return musicFiles[key] || `/music/${filename}`;
};

const getAsset = (filename: string) => {
  const key = `./assets/${filename}`;
  return assetFiles[key] || `/assets/${filename}`;
};

export const ASSETS = {
  // Главный фон (Hero секция)
  heroBackground:
    "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2021/01/cyberpunk-2077-johnny-silverhand-glasses.jpg?q=50&fit=crop&w=1600&h=900&dpr=1.5",

  // Картинка чипа/энграммы (Секция Engram)
  engramCard: "https://i.redd.it/xjga6t8mihaa1.jpg",

  // Текстура шума (зернистость на фоне)
  noiseTexture: "https://www.transparenttextures.com/patterns/stardust.png",

  // Секция Арсенал
  silverArm:
    "https://i.etsystatic.com/45478307/r/il/2e1f03/5165531545/il_fullxfull.5165531545_8mso.jpg",
  malorianGun:
    "https://storage.modworkshop.net/mods/images/132636_1668291848_1922616252580f415a274d98a2c717e5.webp",

  // Секция Биография (Портрет слева)
  biographyPortrait:
    "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/3376891_johnnysilverhand.png",

  // Секция Samurai (Лого и Общее фото)
  samuraiLogo:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Samurai_logo_Cyberpunk_2077.svg/2560px-Samurai_logo_Cyberpunk_2077.svg.png",
  samuraiAlbum:
    "https://i.scdn.co/image/ab67616d0000b273010b998df4924a619053229d",

  // МУЗЫКАЛЬНЫЕ ТРЕКИ
  music: {
    chippinIn: getMusic("chippin_in.mp3"),
    neverFadeAway: getMusic("never_fade_away.mp3"),
    // Если файлы появятся в папке, они автоматически подтянутся.
    // Если их нет, останется путь-заглушка.
    aLikeSupreme: getMusic("a_like_supreme.mp3"),
    archangel: getMusic("archangel.mp3"),
    blackDog: getMusic("black_dog.mp3"),
  },

  // ОБЛОЖКИ АЛЬБОМОВ
  albumCovers: {
    chippinIn:
      "https://upload.wikimedia.org/wikipedia/en/6/60/Cyberpunk_2077_-_Chippin%27_In.jpg",
    neverFadeAway: getAsset("SamuraiNeverFadeAwayCover.webp"),
    aLikeSupreme: "https://i1.sndcdn.com/artworks-Z1X2c11432-0-t500x500.jpg",
    blackDog:
      "https://i.scdn.co/image/ab67616d0000b2733979505c21df22dc8f45f573",
  },
};
