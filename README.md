# C&C CookieComply - GDPR Compliance Solution

## 🚀 Быстрое развертывание

### 1. Разработка
```bash
npm run dev
```

### 2. Сборка проекта
```bash
npm run build
```

### 3. Развертывание на Cloudflare Pages
```bash
# Автоматический деплой через Wrangler
npm run deploy

# Или вручную
npx wrangler pages deploy .next --project-name calculator
```

## 📁 Структура проекта

```
Calculator/
├── .next/                   # Папка сборки Next.js
├── functions/              # Cloudflare Functions
│   ├── _worker.js         # Основной worker для Cloudflare Pages
│   └── api/
│       └── contact.js     # API контактной формы
├── app/                    # Next.js App Router
├── components/             # React компоненты
├── lib/                    # Утилиты и конфигурация
├── next.config.js          # Конфигурация Next.js
├── wrangler.toml           # Конфигурация Cloudflare
└── package.json            # Зависимости и скрипты
```

## 🔧 Технические детали

### API Endpoint
- **URL:** `/api/contact`
- **Метод:** POST
- **Формат:** JSON
- **Обработчик:** Cloudflare Functions

### Обязательные поля формы
- `name` - Имя
- `email` - Email
- `url` - URL сайта
- `message` - Сообщение

### Опциональные поля
- `stack` - Стек технологий
- `regions` - Регионы
- `languages` - Языки
- `locale` - Локаль

## 🌐 Поддерживаемые языки

- 🇷🇺 Русский (ru)
- 🇺🇸 Английский (en)
- 🇩🇪 Немецкий (de)
- 🇫🇷 Французский (fr)

## 📚 Документация

- [CLOUDFLARE_DEPLOY.md](./CLOUDFLARE_DEPLOY.md) - Подробная инструкция по развертыванию
- [SETUP.md](./SETUP.md) - Настройка проекта

## 🆘 Поддержка

Если форма не работает:
1. Проверьте логи в Cloudflare Dashboard
2. Убедитесь, что Functions включены
3. Проверьте, что все файлы загружены в проект

## 🎯 Что происходит при отправке формы

1. **Фронтенд** отправляет JSON данные на `/api/contact`
2. **Cloudflare Worker** (`_worker.js`) обрабатывает запрос
3. **API функция** (`functions/api/contact.js`) валидирует данные
4. **Ответ** возвращается пользователю

Теперь все должно работать без ошибок! 🎉 