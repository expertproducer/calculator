# Настройка уведомлений для контактной формы

Этот файл содержит инструкции по настройке различных способов получения уведомлений о новых заявках с сайта.

## Вариант 1: Slack Webhook (самый простой)

1. Перейдите в ваш Slack workspace
2. Создайте новый канал для уведомлений (например, #leads)
3. В настройках канала выберите "Integrations" → "Add apps"
4. Найдите "Incoming Webhooks" и добавьте
5. Скопируйте URL webhook'а
6. Добавьте в переменные окружения:
   ```
   CONTACT_SLACK_WEBHOOK=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
   ```

## Вариант 2: Slack Bot API (более надежный)

1. Перейдите на https://api.slack.com/apps
2. Создайте новое приложение
3. В настройках OAuth & Permissions добавьте scope: `chat:write`
4. Установите приложение в ваш workspace
5. Скопируйте Bot User OAuth Token
6. Добавьте в переменные окружения:
   ```
   SLACK_BOT_TOKEN=xoxb-your-bot-token
   SLACK_CHANNEL=#leads
   ```

## Вариант 3: Discord Webhook (альтернатива Slack)

1. В Discord сервере выберите канал
2. Настройки канала → Integrations → Webhooks
3. Создайте новый webhook
4. Скопируйте URL
5. Добавьте в переменные окружения:
   ```
   DISCORD_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR/WEBHOOK/URL
   ```

## Вариант 4: Email через EmailJS

1. Зарегистрируйтесь на https://www.emailjs.com/
2. Создайте email template
3. Получите необходимые данные:
   - User ID
   - Template ID
   - Service ID
4. Добавьте в переменные окружения:
   ```
   EMAILJS_URL=https://api.emailjs.com/api/v1.0/email/send
   EMAILJS_TEMPLATE=your_template_id
   EMAILJS_USER_ID=your_user_id
   ADMIN_EMAIL=your-email@example.com
   ```

## Настройка переменных окружения в Cloudflare

1. Перейдите в Cloudflare Dashboard
2. Выберите ваш Workers & Pages
3. Перейдите в Settings → Environment variables
4. Добавьте нужные переменные

## Тестирование

После настройки протестируйте форму:
1. Заполните контактную форму на сайте
2. Проверьте логи в Cloudflare Dashboard
3. Убедитесь, что уведомления приходят

## Рекомендации

- **Для начала**: используйте Slack Webhook (самый простой)
- **Для продакшена**: Slack Bot API + Discord как резерв
- **Если ничего не работает**: EmailJS как последний вариант

## Устранение проблем

### Slack Webhook не работает:
- Проверьте правильность URL
- Убедитесь, что webhook активен
- Проверьте права доступа

### Slack Bot API не работает:
- Проверьте Bot Token
- Убедитесь, что бот добавлен в канал
- Проверьте scope permissions

### Discord не работает:
- Проверьте URL webhook'а
- Убедитесь, что webhook активен
- Проверьте права бота в канале
