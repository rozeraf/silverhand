/**
 * ФАЙЛ УПРАВЛЕНИЯ КАРТИНКАМИ (ASSETS)
 *
 * Чтобы заменить картинки:
 * 1. Если проект локальный: положите картинку в папку 'public' и укажите путь '/my-image.jpg'
 * 2. Если используете интернет: просто вставьте ссылку https://...
 */

export const ASSETS = {
  // Главный фон (Hero секция)
  heroBackground:
    "https://static0.thegamerimages.com/wordpress/wp-content/uploads/2021/01/cyberpunk-2077-johnny-silverhand-glasses.jpg?q=50&fit=crop&w=1600&h=900&dpr=1.5",

  // Картинка чипа/энграммы (Секция Engram)
  engramCard: "https://i.redd.it/xjga6t8mihaa1.jpg",

  // Текстура шума (зернистость на фоне)
  noiseTexture: "http://assets.iceable.com/img/noise-transparent.png",

  // Секция Арсенал
  silverArm:
    "https://i.etsystatic.com/45478307/r/il/2e1f03/5165531545/il_fullxfull.5165531545_8mso.jpg", // Абстрактный кибер-рукав или протез
  malorianGun:
    "https://storage.modworkshop.net/mods/images/132636_1668291848_1922616252580f415a274d98a2c717e5.webp", // Иконка или изображение пистолета

  // Секция Биография (Портрет слева)
  biographyPortrait:
    "https://mediaproxy.tvtropes.org/width/1200/https://static.tvtropes.org/pmwiki/pub/images/3376891_johnnysilverhand.png",

  // Секция Samurai (Лого и Общее фото)
  samuraiLogo:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Samurai_logo_Cyberpunk_2077.svg/2560px-Samurai_logo_Cyberpunk_2077.svg.png",
  samuraiAlbum:
    "https://i.scdn.co/image/ab67616d0000b273010b998df4924a619053229d", // Дефолтная обложка

  // МУЗЫКАЛЬНЫЕ ТРЕКИ
  // Примечание: Для локальной работы файлы .mp3 должны лежать в папке public/music/
  music: {
    chippinIn: "/music/chippin_in.mp3",
    neverFadeAway: "/music/never_fade_away.mp3",
    aLikeSupreme: "/music/a_like_supreme.mp3",
    archangel: "/music/archangel.mp3",
    blackDog: "/music/black_dog.mp3",
  },

  // ОБЛОЖКИ АЛЬБОМОВ / СИНГЛОВ
  albumCovers: {
    chippinIn: "https://upload.wikimedia.org/wikipedia/en/6/60/Cyberpunk_2077_-_Chippin%27_In.jpg",
    neverFadeAway: "https://i.scdn.co/image/ab67616d0000b273516556e42b262d04a4341505",
    aLikeSupreme: "https://i1.sndcdn.com/artworks-Z1X2c11432-0-t500x500.jpg",
    blackDog: "https://i.scdn.co/image/ab67616d0000b2733979505c21df22dc8f45f573",
    // Если обложки нет, будет использоваться samuraiAlbum
  }
};