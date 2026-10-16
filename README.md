# Streamer Stories

MVP исследовательского архива публичной истории стримеров на Nuxt 3, Vue 3 и TypeScript.

## Запуск

```bash
npm install
npm run dev
```

Откройте `http://localhost:3000` и профиль `/streamers/serega-pirat`.

## API

- `GET /api/streamers`
- `GET /api/streamers/:slug`
- `GET /api/streamers/:slug/timeline`
- `GET /api/streamers/:slug/sources`
- `GET /api/streamers/:slug/contacts`
- `GET /api/search?q=pirat`
- `GET /api/health`

Сейчас данные профиля хранятся в типизированном seed-файле для полностью воспроизводимого MVP. Источники проверены 17.10.2026: YouTube, Telegram и VK; Twitch и Trovo сохранены как ограниченные к проверке ссылки. Парсер не обходит ограничения платформ и не скачивает медиаматериалы. Следующий production-шаг — вынести доменные сущности в PostgreSQL/Prisma, добавить авторизованную модерацию и адаптеры официальных API.
