# Настройка C&C CookieComply

## Переменные окружения

Создайте файл `.env.local` в корне проекта:

```bash
# Google Tag Manager ID
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX

# Site URLs
NEXT_PUBLIC_BASE_URL=https://cashandclash.com
NEXT_PUBLIC_GDPR_SUBDOMAIN=https://gdpr.cashandclash.com

# Contact form settings
CONTACT_EMAIL=contact@cashandclash.com
CONTACT_SLACK_WEBHOOK=
CONTACT_AIRTABLE_API_KEY=
CONTACT_AIRTABLE_BASE_ID=
```

## Что реализовано

### ✅ Метаданные и SEO
- Централизованные метаданные для всех локалей (en/de/fr)
- Open Graph и Twitter карточки
- Правильные canonical URLs и hreflang
- JSON-LD структурированные данные (Organization, Service, FAQ)
- Sitemap с поддержкой всех локалей
- Robots.txt

### ✅ Многоязычность
- Поддержка en/de/fr
- Автоматический редирект по Accept-Language
- Стабильные URL структуры
- Централизованное управление переводами

### ✅ GDPR Compliance
- CMP с тремя кнопками: Accept All / Decline / Preferences
- Блокировка не-essential скриптов до согласия
- GTM загружается только после согласия
- Страницы Privacy Policy и Cookie Policy
- Ссылка на настройки cookies в футере

### ✅ Контактная форма
- Валидация с Zod
- Honeypot защита от спама
- Поддержка всех локалей
- Готовность к интеграции с email/Slack/Airtable

## Структура файлов

```
lib/
├── locales.ts          # Централизованные настройки локалей
├── gtm.ts             # Управление Google Tag Manager
├── types.ts           # Дополнительные типы TypeScript
└── schema.ts          # Валидация форм

components/
├── StructuredData.tsx # JSON-LD разметка
├── CookieConsent.tsx  # CMP компонент
└── Footer.tsx         # Футер с ссылками

app/
├── sitemap.ts         # Sitemap для всех локалей
├── robots.ts          # Robots.txt
├── middleware.ts      # Авторедирект по языку
└── [locale]/          # Локализованные страницы
    ├── layout.tsx     # Метаданные
    ├── page.tsx       # Главная страница
    ├── privacy/       # Privacy Policy
    └── cookies/       # Cookie Policy
```

## Настройка GTM

1. Получите GTM ID из Google Tag Manager
2. Добавьте в `.env.local`: `NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX`
3. GTM будет загружаться только после получения согласия на cookies

## Настройка контактной формы

Форма готова к интеграции с:
- Email (SMTP)
- Slack webhook
- Airtable
- Другие сервисы

Добавьте соответствующие переменные в `.env.local`

## Развертывание

```bash
# Установка зависимостей
npm install

# Разработка
npm run dev

# Сборка
npm run build

# Экспорт статических файлов
npm run build:export
```

## Проверка

После развертывания проверьте:

1. **Метаданные**: View Page Source → должны быть все meta теги
2. **Hreflang**: Должны быть правильные ссылки на все локали
3. **CMP**: Должен появляться баннер cookies
4. **GTM**: Должен загружаться только после согласия
5. **Sitemap**: `/sitemap.xml` должен содержать все страницы
6. **Robots**: `/robots.txt` должен быть доступен

## Поддержка

Для вопросов по настройке обращайтесь к команде разработки.
