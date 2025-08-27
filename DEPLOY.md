# Деплой на Cloudflare Pages

## Структура проекта

- `out/` - папка со статическими файлами (создается Next.js)
- `functions/` - Cloudflare Workers функции для API

## Настройка переменных окружения

В Cloudflare Pages Dashboard добавьте:

```
CONTACT_SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Команды для деплоя

1. **Сборка проекта:**
   ```bash
   npm run build
   ```

2. **Деплой через Wrangler:**
   ```bash
   npx wrangler pages deploy out
   ```

3. **Или через Cloudflare Dashboard:**
   - Подключите GitHub репозиторий
   - Укажите команду сборки: `npm run build`
   - Укажите папку вывода: `out`

## Проверка работы

После деплоя форма должна работать по адресу:
`https://your-domain.com/api/contact`

## Устранение проблем

- Убедитесь что папка `out` создается после `npm run build`
- Проверьте что переменная `CONTACT_SLACK_WEBHOOK` установлена
- В консоли браузера не должно быть ошибок CORS
