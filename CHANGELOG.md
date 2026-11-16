# Changelog

Все заметные изменения проекта. Формат — [Keep a Changelog](https://keepachangelog.com/ru/1.1.0/), версии — [SemVer](https://semver.org/lang/ru/).
Файл генерируется [git-cliff](https://git-cliff.org) из Conventional Commits, руками не редактируется.

## [1.0.1] - 2026-11-16

### Исправления

- Clean up boot flow, terminal timers and build setup ([`01e9c57`](https://github.com/rozeraf/silverhand/commit/01e9c57562378d99043eedbba5899e7f258980d1))
- **player:** Keep playing on auto-advance and reflect play() failures ([`ea4cad0`](https://github.com/rozeraf/silverhand/commit/ea4cad0540b3e649475380b43160dd7593acfd21))
- **terminal:** Robust arg parsing, ~/ paths and safe usernames ([`0bd0751`](https://github.com/rozeraf/silverhand/commit/0bd0751ede27c8b77ec254cdcefef6b209dca07e))
- **ui:** Cursor on narrow windows, Engram hover ring, settings toggles ([`f96b6ba`](https://github.com/rozeraf/silverhand/commit/f96b6ba79db0a6d8f42d0e29475c1be0fe18242d))

### Документация

- Expand CLAUDE.md with detailed project architecture and metadata ([`0c76a0e`](https://github.com/rozeraf/silverhand/commit/0c76a0edf063c7a95dd447563b0d9e65f7ffa536))
- Rewrite CLAUDE.md around the dev → main workflow ([`5b9bd05`](https://github.com/rozeraf/silverhand/commit/5b9bd05a76b44b056b8dea0518ddf314d71c5db1))

## [1.0.0] - 2026-09-08

### Новое

- **ui:** Implement immersive Cyberpunk 2077 tribute website with advanced effects ([`62d3483`](https://github.com/rozeraf/silverhand/commit/62d34831e694e8809ac74af3f474b602c5626b1b))
- Add Arsenal section ([`03bf26e`](https://github.com/rozeraf/silverhand/commit/03bf26eba76c9a43c5775f37cac3352de719f6d4))
- **Arsenal:** Add background decorative elements ([`602f9df`](https://github.com/rozeraf/silverhand/commit/602f9df8acbaa6021b8a9d1434e9090d2e20fe59))
- **arsenal:** Use static asset for Silverhand's arm ([`77d2b29`](https://github.com/rozeraf/silverhand/commit/77d2b2908fd6e70a6dfe4f1f97ccd7e53511a03b))
- **assets:** Update image URLs for arsenal assets ([`41bb29e`](https://github.com/rozeraf/silverhand/commit/41bb29e313326fbb77d5e07f4fc942e437746c12))
- **Biography:** Add Johnny's portrait and refine layout ([`e205616`](https://github.com/rozeraf/silverhand/commit/e205616f941f15453e88f358069a3ef9b2725a86))
- **biography:** Add portrait image ([`a049d80`](https://github.com/rozeraf/silverhand/commit/a049d80741328367d9926fdd2adbd41658077c34))
- **assets:** Add images for biography and Samurai sections ([`279ba71`](https://github.com/rozeraf/silverhand/commit/279ba712769c8ebf2e9df703165930a373336641))
- **samurai:** Add Samurai band section ([`410844f`](https://github.com/rozeraf/silverhand/commit/410844f91608e6d40bdf9b7e067ad25af467fca4))
- Implement Samurai page and navigation integration ([`680e03c`](https://github.com/rozeraf/silverhand/commit/680e03c5855a3e94ed95e2dc0078b1e88229221e))
- **ui:** Add Samurai page overlay with music player and band history ([`d4871e7`](https://github.com/rozeraf/silverhand/commit/d4871e7638e4fddb88b7db4729e31d438b6ba055))
- Update asset URLs ([`8e4329c`](https://github.com/rozeraf/silverhand/commit/8e4329c29287ecf3a0d9287331553d494decca8e))
- **samurai:** Enhance music player with new icons and functionality ([`dd55cb8`](https://github.com/rozeraf/silverhand/commit/dd55cb87e2778c81c0d5cd3c5c3bb61f9834d7bb))
- **samurai:** Add Johnny Silverhand timeline events ([`d74a212`](https://github.com/rozeraf/silverhand/commit/d74a212fd50dc15c69b30bc643984f30d48374f7))
- **samurai:** Add music tracks and album covers ([`38daf86`](https://github.com/rozeraf/silverhand/commit/38daf860aa67316d281cfb75a765d652665a14be))
- **config:** Add localStorage-based boot sequence persistence ([`e9eb679`](https://github.com/rozeraf/silverhand/commit/e9eb679af37426d51ab170caf0235766a41ba9ab))
- **context:** Implement centralized settings management with localStorage persistence ([`34e51f0`](https://github.com/rozeraf/silverhand/commit/34e51f01629240e1746afa6dace8a774b5a8c6a4))
- **ui:** Enhance responsive design ([`c35c0e0`](https://github.com/rozeraf/silverhand/commit/c35c0e035ae792e409ee4f6218e6248556d6a951))
- **ui:** Add interactive terminal system with classified content access ([`4e521d0`](https://github.com/rozeraf/silverhand/commit/4e521d00cab66d92f78403e8493c1d50533d5e8c))
- Enhance asset handling and improve hero section responsiveness ([`7eed482`](https://github.com/rozeraf/silverhand/commit/7eed482454e531b06062a79bfd1b4054de8b758a))
- **terminal:** Add POSIX filesystem and permissions ([`8a511d8`](https://github.com/rozeraf/silverhand/commit/8a511d8b86f3172caedbb3f8cb24a52f86bb7b2b))
- **ui:** Add experimental CRT display shader ([`773c5d6`](https://github.com/rozeraf/silverhand/commit/773c5d626cb7e70afee24e7a8f8a9a0f7c6c60d3))
- **terminal:** Add POSIX filesystem and permissions ([`9e5a269`](https://github.com/rozeraf/silverhand/commit/9e5a269096f1e1904de2689df1a3eadac9b07d50))
- **terminal:** Rebuild virtual shell and filesystem ([`08ad0e6`](https://github.com/rozeraf/silverhand/commit/08ad0e677d19107c86293d6e2fc6dfea827fe508))
- **terminal:** Add archive records and login puzzle ([`7ab85d1`](https://github.com/rozeraf/silverhand/commit/7ab85d11dcce78b7c590a77b184f7a5b0a0a1eed))
- **site:** Add developer terminal puzzle note ([`89f0d36`](https://github.com/rozeraf/silverhand/commit/89f0d3611c3322c8818a5344fdd027aecf8a6de7))
- **player:** Sync local Samurai media library ([`e1ace52`](https://github.com/rozeraf/silverhand/commit/e1ace52332f3dd27dc9f356b3b38b704b4b6fff2))
- **arsenal:** Add Johnny's armored vest artwork ([`fad0534`](https://github.com/rozeraf/silverhand/commit/fad0534d91066f85a95f96c483baa1a1d8ee01e8))

### Исправления

- **Arsenal:** Correct character entity for ">" ([`4c14b70`](https://github.com/rozeraf/silverhand/commit/4c14b70d25a6bb2c352fb09d67ded8fdf690560e))
- **assets:** Resolve merge conflict in assets.ts file ([`037229d`](https://github.com/rozeraf/silverhand/commit/037229df4b503f9b0702fcb35a787a48990912ec))
- Update external asset URLs and text ([`96152ad`](https://github.com/rozeraf/silverhand/commit/96152adab48873736d449093b62bd4d1cc9fd6f7))
- **player:** Keep album artwork and rings square ([`e3a964d`](https://github.com/rozeraf/silverhand/commit/e3a964d909c202fc2cb1eb49244a6a9d0cc1f788))
- **player:** Keep album artwork and rings square ([`8e7270d`](https://github.com/rozeraf/silverhand/commit/8e7270dd6e99cbb753550fdff412a507cc6be924))

### Рефакторинг

- Improve project setup and configuration ([`bb3195f`](https://github.com/rozeraf/silverhand/commit/bb3195f32b0ca3126cb0bf1d5141e357bbae1909))
- **assets:** Update favicon and nav logo to local assets ([`9ede4ce`](https://github.com/rozeraf/silverhand/commit/9ede4ce176aedba0639354a4c01af8218b6f7b23))
- Remove comments, React.FC types, and eslint-disable directives ([`5704dd3`](https://github.com/rozeraf/silverhand/commit/5704dd31dd0ccfad765cbbc8d3b033119e2a949a))
- **assets:** Localize external site media ([`a6499a0`](https://github.com/rozeraf/silverhand/commit/a6499a028cf89131fe38044cdf009726eaf39003))

### Оформление

- Refine cyberpunk interface accents ([`6a32a6a`](https://github.com/rozeraf/silverhand/commit/6a32a6a4d7ec732397642663ff59c7c93596caef))

### Документация

- Rewrite README as technical hackathon document ([`216a981`](https://github.com/rozeraf/silverhand/commit/216a9819e168b9d4444721eade37ed0ad00dcc11))
- **readme:** Add Deploy section with CI/CD pipeline details ([`4bf6f75`](https://github.com/rozeraf/silverhand/commit/4bf6f751e67f7c95c413194c1f473a710bedd13f))
- Add todo.md ([`25554b7`](https://github.com/rozeraf/silverhand/commit/25554b7aa30a62123f6c40d352f8b3e27ca42e34))
- Refresh project documentation ([`1516994`](https://github.com/rozeraf/silverhand/commit/151699414f71f1a0967f247595ece67a3b3fdc2d))
- Remove prod branch mention ([`1e96dfd`](https://github.com/rozeraf/silverhand/commit/1e96dfdac8a96e639935187e6bb2f92920b4e9ee))

### CI и сборка

- Add GitHub Actions workflow for Cloudflare Pages deployment ([`6fdc9c2`](https://github.com/rozeraf/silverhand/commit/6fdc9c2cf0a9108e9892286dc07a34ac7bc8fbb1))
- Deploy Cloudflare Pages from prod with Bun ([`fed5d5c`](https://github.com/rozeraf/silverhand/commit/fed5d5c7f3017198f1a613357c73bf8bba71c889))
- Deploy only on releases and version tags ([`bfef4cf`](https://github.com/rozeraf/silverhand/commit/bfef4cfa55b9f626d0bc5d59115a428ce7765d83))

### Прочее

- **site:** Add copyright notices and refresh vest asset ([`6e6d1f8`](https://github.com/rozeraf/silverhand/commit/6e6d1f8466fb9f646176762f37128a5f6e427a89))

[1.0.1]: https://github.com/rozeraf/silverhand/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/rozeraf/silverhand/releases/tag/v1.0.0

