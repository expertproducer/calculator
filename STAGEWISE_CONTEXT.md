# Stagewise Context для проекта Calculator

## Описание проекта
Это многоязычный веб-калькулятор, построенный на Next.js 15 с использованием App Router. Проект развертывается на Cloudflare Pages.

## Ключевые технологии
- **Framework**: Next.js 15 с App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Cloudflare Pages
- **Internationalization**: Встроенная поддержка ru, en, de, fr

## Структура проекта

### `/app` - Основные страницы
- Использует Next.js App Router
- Поддержка интернационализации через папки `[locale]`
- Страницы: главная, услуги, кейсы, процесс, цены, FAQ, контакты

### `/components` - React компоненты
- Переиспользуемые UI компоненты
- Компоненты для SEO (StructuredData)
- Компоненты доступности (Accessibility)

### `/lib` - Утилиты
- `i18n.ts` - конфигурация интернационализации
- `types.ts` - TypeScript типы
- `schema.ts` - Zod схемы для валидации

### `/functions` - Cloudflare Functions
- API endpoints для обработки форм
- Serverless функции

## Правила разработки

### Именование
- **Все идентификаторы на английском**: переменные, функции, классы, файлы
- **UI текст на русском**: строки интерфейса
- **Комментарии на русском**: разрешены

### Структура файлов
```
app/[locale]/page.tsx          # Главная страница
app/[locale]/services/page.tsx # Страница услуг
components/Hero.tsx            # Компонент героя
lib/i18n.ts                   # Конфигурация i18n
```

### Деплой
- Сборка: `npm run build`
- Выходная папка: `out/`
- Платформа: Cloudflare Pages

## Особенности проекта
1. **Многоязычность**: Поддержка 4 языков через папки `[locale]`
2. **SEO**: Structured data для поисковых систем
3. **Производительность**: Оптимизация изображений и кода
4. **Доступность**: Соответствие стандартам a11y
5. **Адаптивность**: Responsive дизайн для всех устройств

## Рабочий процесс
- Разработка: `npm run dev`
- Сборка: `npm run build`
- Деплой: через Git push на Cloudflare Pages
- Очистка: `npm run clean`

## Важные файлы
- `next.config.js` - конфигурация Next.js
- `tailwind.config.js` - конфигурация Tailwind
- `wrangler.toml` - конфигурация Cloudflare
- `middleware.ts` - middleware для i18n
