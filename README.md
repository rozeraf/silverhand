# Johnny Silverhand: The Engram

> Иммерсивный веб-трибьют персонажу Cyberpunk 2077, построенный на React 19 + Vite. Хакатон-проект 2026.

![preview](https://static0.thegamerimages.com/wordpress/wp-content/uploads/2021/01/cyberpunk-2077-johnny-silverhand-glasses.jpg?q=50&fit=crop&w=1600&h=900&dpr=1.5)

## Стек

| Слой | Технология |
|---|---|
| UI | React 19 |
| Сборка | Vite 7 |
| Типизация | TypeScript 5.8 |
| Стилизация | Tailwind CSS (CDN, конфиг inline) |
| Глитч-эффекты | `react-powerglitch` |
| Scramble-анимация | `use-scramble` |
| Иконки | `lucide-react` |

## Архитектура

```
/
├── index.html          # Tailwind CDN, CSS-переменные, кастомные шрифты
├── index.tsx           # Точка входа, SettingsProvider
├── App.tsx             # Оркестратор: состояние терминала, classified-доступ, оверлеи
├── assets.ts           # Единый реестр медиа (import.meta.glob + fallback URLs)
├── types.ts            # Общие интерфейсы
├── context/
│   └── SettingsContext.tsx   # Глобальные настройки → localStorage
└── components/
    ├── Terminal.tsx          # Интерактивный терминал с boot-sequence и авторизацией
    ├── Hero.tsx              # HUD с live-координатами из mousemove
    ├── Engram.tsx            # 3D tilt-эффект через rotateX/rotateY
    ├── Samurai.tsx           # Музыкальный плеер (Web Audio API)
    ├── GlitchText.tsx        # Глитч + scramble на одном компоненте
    ├── RevealOnScroll.tsx    # IntersectionObserver с направлением анимации
    ├── CustomCursor.tsx      # Кастомный курсор через direct DOM (не state)
    └── ...
```

**Ключевой принцип:** данные отделены от представления. Весь визуальный контент (изображения, аудио) живёт в `assets.ts` — менять тему можно без касания логики компонентов.

## Технические решения

### Производительность
- **Lazy loading + Suspense** — все секции ниже Hero загружаются по запросу, Hero рендерится мгновенно.
- **Direct DOM manipulation** в `CustomCursor` — позиция курсора обновляется через `ref.style.transform`, минуя React state и предотвращая ререндеры на каждый `mousemove`.
- **`import.meta.glob`** в Vite — локальные ассеты хешируются при сборке и кешируются браузером.

### Визуальные эффекты
- **CRT scanlines** — CSS `linear-gradient` с анимацией мерцания (`@keyframes scanline-flicker`).
- **Film grain** — анимированная текстура (`noise-bg`) с `transform: translate` на 10 ключевых кадрах.
- **3D Tilt** (Engram) — `rotateX/rotateY` вычисляются из координат мыши относительно центра контейнера, `transformStyle: preserve-3d`.
- **Глитч-текст** — `react-powerglitch` даёт периодический slice-эффект, `use-scramble` — анимацию декодирования при монтировании.

### Терминальная система авторизации
Компонент `Terminal` реализует двухэтапный вход: `login <username>` → passphrase. При успешной авторизации под зарезервированными именами (Silverhand) в `localStorage` устанавливается флаг `classified: true`, который разблокирует скрытую секцию `ClassifiedSection` без перезагрузки страницы.

### Настройки
`SettingsContext` персистит пять булевых флагов в `localStorage["cyber_settings"]`. Эффекты (scanlines, noise, custom cursor, анимации, boot sequence) переключаются без перезагрузки.

## Деплой

Проект разворачивается автоматически через GitHub Actions на Cloudflare Pages при пуше в `main`.

```
.github/workflows/pages-deployment.yaml
  push → main
    └── bun install && bun run build
          └── wrangler pages deploy dist --project-name=silverhand
```

Необходимые секреты репозитория: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID`.

## Запуск локально

```bash
bun install
bun dev        # dev-сервер
bun run build  # продакшен → dist/
bun run preview
```

## Дизайн-токены

```css
--cp-yellow: #fcee0a
--cp-blue:   #00f0ff
--cp-red:    #ff003c
--cp-bg:     #0b0b0b
```

Шрифты: **Orbitron** (`font-cyber`, заголовки) · **Rajdhani** (основной текст)

---

*Hackathon 2026*
