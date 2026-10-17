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

## CI/CD

Workflow [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml) запускается после push в `main` и вручную через GitHub Actions.

Сначала workflow выполняет `npm ci`, `npm test` и `npm run build`. После успешной проверки он подключается к production-серверу по SSH и выполняет:

```bash
cd /var/www/streamer-stories
git pull --ff-only origin main
npm ci
npm run build
systemctl restart streamer-stories
```

В GitHub Repository settings нужно создать environment `production` и добавить secrets:

- `DEPLOY_HOST` — адрес сервера;
- `DEPLOY_USER` — SSH-пользователь;
- `DEPLOY_SSH_KEY` — приватный SSH-ключ deploy-пользователя;
- `DEPLOY_PORT` — SSH-порт, если используется не `22`.

На сервере заранее должны быть установлены Node.js/npm и Git, каталог `/var/www/streamer-stories` должен быть клоном этого репозитория, а deploy-пользователь должен иметь доступ к каталогу и право выполнить `systemctl restart streamer-stories`. Workflow автоматически пытается загрузить NVM из `$HOME/.nvm`; если Node.js установлен другим способом, `node` и `npm` должны быть доступны в non-interactive SSH-сессии. Приватный ключ не следует добавлять в репозиторий.
