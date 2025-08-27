# Деплой на Cloudflare Pages с функциями

Этот проект настроен для работы на Cloudflare Pages с использованием Cloudflare Functions для API.

## 🚀 Быстрый старт

### 1. Установка Wrangler CLI
```bash
npm install -g wrangler
```

### 2. Авторизация в Cloudflare
```bash
wrangler login
```

### 3. Настройка переменных окружения
Создайте файл `.env.local` в корне проекта:
```env
SLACK_WEBHOOK_URL=your_slack_webhook_url_here
```

### 4. Сборка и деплой
```bash
# Сборка проекта
npm run build

# Деплой на Cloudflare Pages
npx wrangler pages deploy .next --project-name calculator
```

## 📁 Структура проекта

- **`.next/`** - папка сборки Next.js (используется для деплоя)
- **`functions/`** - Cloudflare Functions (заменяют API роуты Next.js)
- **`app/`** - страницы и компоненты Next.js
- **`wrangler.toml`** - конфигурация Cloudflare

## 🔧 Как это работает

### Статические страницы
- Next.js собирает статические страницы в папку `.next`
- Cloudflare Pages раздает статический контент

### API функции
- Вместо API роутов Next.js используются Cloudflare Functions
- Функции находятся в папке `functions/`
- Автоматически доступны по адресу `/api/*`

### Контактная форма
- Функция `functions/api/contact.ts` обрабатывает POST запросы
- Отправляет уведомления в Slack
- Использует переменную окружения `SLACK_WEBHOOK_URL`

## 🌐 Переменные окружения

В Cloudflare Pages Dashboard настройте:

- `SLACK_WEBHOOK_URL` - URL вебхука Slack для уведомлений

## 🚨 Важные моменты

1. **НЕ используйте `output: 'export'`** в `next.config.js` - это отключает API
2. **API роуты Next.js не работают** в статическом экспорте
3. **Используйте Cloudflare Functions** для серверной логики
4. **Папка `.next`** используется для деплоя, а не `out`

## 🔍 Отладка

### Логи функций
```bash
wrangler pages deployment tail --project-name calculator
```

### Локальная разработка
```bash
# Запуск Next.js
npm run dev

# Запуск функций локально
wrangler pages dev .next --compatibility-date=2024-01-01
```

## 📚 Полезные ссылки

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Cloudflare Functions Documentation](https://developers.cloudflare.com/workers/)
- [Next.js Documentation](https://nextjs.org/docs)
