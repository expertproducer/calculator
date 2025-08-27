# Инструкция по деплою

## Cloudflare Pages

1. **Подключение репозитория:**
   - Зайдите в Cloudflare Dashboard
   - Выберите Pages
   - Нажмите "Create a project"
   - Подключите ваш GitHub репозиторий

2. **Настройка сборки:**
   - Build command: `npm run build`
   - Output directory: `out`
   - Node.js version: 18

3. **Включение Cloudflare Functions:**
   - В настройках проекта включите "Functions"
   - Убедитесь, что папка `functions` подключена

4. **Переменные окружения:**
   - `NODE_VERSION`: 18
   - `NEXT_PUBLIC_GDPR_SUBDOMAIN`: ваш домен

## Vercel

1. **Подключение репозитория:**
   - Зайдите на vercel.com
   - Подключите ваш GitHub репозиторий
   - Vercel автоматически определит Next.js

2. **Настройка:**
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `out`

## Netlify

1. **Подключение репозитория:**
   - Зайдите на netlify.com
   - Подключите ваш GitHub репозиторий

2. **Настройка сборки:**
   - Build command: `npm run build`
   - Publish directory: `out`

## Проверка работы

После деплоя:

1. **Проверьте главную страницу** - должна загружаться
2. **Проверьте локализацию** - `/en`, `/de`, `/fr`
3. **Проверьте форму** - должна отправляться без ошибок
4. **Проверьте консоль** - не должно быть ошибок 405

## Устранение проблем

### Ошибка 405 (Method Not Allowed)
- Убедитесь, что Cloudflare Functions включены
- Проверьте, что папка `functions` существует
- Проверьте логи в Cloudflare Dashboard

### Форма не отправляется
- Проверьте консоль браузера на ошибки
- Убедитесь, что API endpoint доступен
- Проверьте CORS настройки

### Страницы не загружаются
- Проверьте настройки перенаправления
- Убедитесь, что папка `out` содержит файлы
- Проверьте настройки роутинга
