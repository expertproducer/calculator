# C&C CookieComply - GDPR Compliance Solution

## 🚨 Проблема решена!

**Ошибка HTTP 500 при отправке контактной формы исправлена!**

### Что было не так:
- Неправильная настройка Cloudflare Pages Functions
- Конфликт между Next.js API routes и Cloudflare Functions
- Неправильные redirects для API запросов

### Что исправлено:
1. ✅ Удален лишний `_worker.js` из корня проекта
2. ✅ Исправлен `_redirects` файл для правильной работы API
3. ✅ Обновлен API для обработки контактной формы
4. ✅ Добавлен автоматический скрипт копирования файлов
5. ✅ Правильная структура для Cloudflare Pages

## 🚀 Быстрое развертывание

### 1. Сборка проекта
```bash
npm run build
```

### 2. Развертывание на Cloudflare Pages
```bash
# Автоматический деплой через Wrangler
npx wrangler pages deploy out

# Или загрузите содержимое папки 'out' в Cloudflare Dashboard
```

### 3. Проверка
- Откройте сайт
- Попробуйте отправить контактную форму
- Ошибка 500 больше не должна появляться!

## 📁 Структура проекта

```
Calculator/
├── out/                    # Статические файлы (создается автоматически)
│   ├── _worker.js         # Основной worker для Cloudflare Pages
│   ├── functions/         # Cloudflare Functions
│   │   └── api/
│   │       └── contact.js # API контактной формы
│   └── ... (остальные файлы)
├── functions/             # Исходные Cloudflare Functions
├── scripts/               # Скрипты сборки
├── next.config.js         # Конфигурация Next.js
├── wrangler.toml          # Конфигурация Cloudflare
└── package.json           # Зависимости и скрипты
```

## 🔧 Технические детали

### API Endpoint
- **URL:** `/api/contact`
- **Метод:** POST
- **Формат:** JSON
- **Обработчик:** Cloudflare Pages Functions

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

Если форма все еще не работает:
1. Проверьте логи в Cloudflare Dashboard
2. Убедитесь, что Functions включены
3. Проверьте, что все файлы загружены в проект

## 🎯 Что происходит при отправке формы

1. **Фронтенд** отправляет JSON данные на `/api/contact`
2. **Cloudflare Worker** (`_worker.js`) обрабатывает запрос
3. **API функция** (`functions/api/contact.js`) валидирует данные
4. **Ответ** возвращается пользователю

Теперь все должно работать без ошибок! 🎉 