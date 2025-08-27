# Деплой на Cloudflare Pages - Пошаговая инструкция

## Что мы исправили

1. **Убрали старый API route** - Next.js API routes не работают при статическом экспорте
2. **Создали Cloudflare Worker** - для обработки контактной формы
3. **Настроили правильную структуру** - используем папку `out` и `functions`

## Структура проекта

```
Calculator/
├── out/                    # Статические файлы (создается Next.js)
├── functions/             # Cloudflare Workers
│   ├── _worker.js        # Основной worker
│   └── api/
│       └── contact.js    # API для контактной формы
├── next.config.js         # Конфигурация Next.js
├── wrangler.toml          # Конфигурация Cloudflare
└── package.json           # Зависимости и скрипты
```

## Шаг 1: Подготовка к деплою

1. **Убедитесь что проект собирается:**
   ```bash
   npm run build
   ```

2. **Проверьте что создалась папка `out`** с HTML файлами

## Шаг 2: Настройка Cloudflare Pages

1. **Зайдите в Cloudflare Dashboard:**
   - https://dash.cloudflare.com/
   - Выберите ваш аккаунт

2. **Создайте новый Pages проект:**
   - Pages → Create a project
   - Connect to Git
   - Выберите ваш репозиторий

3. **Настройте сборку:**
   - **Framework preset:** None
   - **Build command:** `npm run build`
   - **Build output directory:** `out`
   - **Root directory:** (оставьте пустым)

4. **Включите Functions:**
   - В настройках проекта найдите "Functions"
   - Включите "Functions" если не включены

## Шаг 3: Переменные окружения

В настройках проекта добавьте:

```
CONTACT_SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

## Шаг 4: Деплой

1. **Автоматический деплой:**
   - Cloudflare автоматически деплоит при push в main ветку

2. **Ручной деплой через Wrangler:**
   ```bash
   npx wrangler pages deploy out
   ```

## Шаг 5: Проверка

1. **Откройте ваш сайт** - должен загружаться
2. **Попробуйте отправить форму** - должна работать без ошибок
3. **Проверьте консоль браузера** - не должно быть ошибок 500

## Устранение проблем

### Ошибка "Output directory not found"
- Убедитесь что команда `npm run build` выполняется успешно
- Проверьте что папка `out` создается

### Форма не отправляется (500 ошибка)
- Проверьте что переменная `CONTACT_SLACK_WEBHOOK` установлена
- Проверьте логи в Cloudflare Dashboard → Pages → ваш проект → Functions

### CORS ошибки
- Убедитесь что Cloudflare Functions включены
- Проверьте что файлы в папке `functions/` правильные

## Тестирование локально

Для тестирования API локально:

```bash
npm run dev:static
```

Откройте `http://localhost:3000/test-api.html` для тестирования API.

## Что происходит при отправке формы

1. **Фронтенд** отправляет JSON данные на `/api/contact`
2. **Cloudflare Worker** (`functions/api/contact.js`) обрабатывает запрос
3. **Валидация** проверяет обязательные поля
4. **Slack интеграция** отправляет уведомление (если настроен webhook)
5. **Ответ** возвращается пользователю

## Поддержка

Если что-то не работает:
1. Проверьте логи в Cloudflare Dashboard
2. Убедитесь что все файлы загружены в репозиторий
3. Проверьте что переменные окружения установлены
