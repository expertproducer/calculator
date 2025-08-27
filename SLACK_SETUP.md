# Настройка интеграции со Slack

## Шаг 1: Создание Slack App

1. Перейдите на [api.slack.com/apps](https://api.slack.com/apps)
2. Нажмите "Create New App"
3. Выберите "From scratch"
4. Введите название приложения (например, "C&C CookieComply Bot")
5. Выберите ваш workspace

## Шаг 2: Настройка Incoming Webhooks

1. В меню слева выберите "Incoming Webhooks"
2. Включите "Activate Incoming Webhooks"
3. Нажмите "Add New Webhook to Workspace"
4. Выберите канал, куда будут приходить уведомления
5. Скопируйте URL webhook'а

## Шаг 3: Настройка переменных окружения

Создайте файл `.env.local` в корне проекта и добавьте:

```bash
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR_WORKSPACE/YOUR_CHANNEL/YOUR_WEBHOOK_TOKEN
```

**Замените URL на ваш реальный webhook URL**

## Шаг 4: Перезапуск сервера

После добавления переменной окружения перезапустите сервер разработки:

```bash
npm run dev
```

## Проверка работы

1. Заполните форму на сайте
2. Отправьте заявку
3. Проверьте, пришло ли уведомление в выбранный Slack канал
4. Проверьте консоль сервера на наличие ошибок

## Устранение проблем

- **Webhook URL не настроен**: Проверьте, что переменная `SLACK_WEBHOOK_URL` добавлена в `.env.local`
- **403 Forbidden**: Проверьте правильность webhook URL
- **404 Not Found**: Webhook URL неверный или приложение не активировано
- **500 Internal Server Error**: Проверьте логи сервера для деталей ошибки

## Безопасность

- Никогда не коммитьте `.env.local` в git
- Webhook URL должен быть секретным
- Используйте HTTPS для production
