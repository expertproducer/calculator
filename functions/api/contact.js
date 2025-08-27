// Cloudflare Function для обработки контактной формы
export async function onRequestPost(context) {
  try {
    // Получаем данные из запроса
    const body = await context.request.json()
    const { name, email, message, url, stack, regions, languages, preferredCmp, integrations, locale, timestamp, userAgent } = body

    // Простая валидация
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ 
          success: false, 
          message: 'Name, email and message are required' 
        }),
        { 
          status: 400,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        }
      )
    }

    // Логируем данные для отладки
    console.log('Contact form submission:', { 
      name, 
      email, 
      message, 
      url, 
      stack, 
      regions, 
      languages, 
      preferredCmp, 
      integrations, 
      locale, 
      timestamp, 
      userAgent 
    })

    // Отправляем уведомление в Slack
    const slackWebhookUrl = context.env.CONTACT_SLACK_WEBHOOK;
    
    if (slackWebhookUrl) {
      try {
        console.log('Sending Slack notification...');
        
        const slackMessage = {
          text: '🎯 *Новая заявка с сайта C&C CookieComply*',
          blocks: [
            {
              type: 'section',
              fields: [
                { type: 'mrkdwn', text: `*Имя:*\n${name}` },
                { type: 'mrkdwn', text: `*Email:*\n${email}` },
                { type: 'mrkdwn', text: `*Сайт:*\n${url || 'Не указан'}` },
                { type: 'mrkdwn', text: `*Стек технологий:*\n${stack || 'Не указан'}` },
                { type: 'mrkdwn', text: `*Регионы:*\n${regions || 'Не указаны'}` },
                { type: 'mrkdwn', text: `*Языки:*\n${languages || 'Не указаны'}` },
                { type: 'mrkdwn', text: `*Предпочтительный CMP:*\n${preferredCmp || 'Не указан'}` },
                { type: 'mrkdwn', text: `*Интеграции:*\n${integrations || 'Не указаны'}` },
                { type: 'mrkdwn', text: `*Язык сайта:*\n${locale || 'Не указан'}` },
                { type: 'mrkdwn', text: `*Время отправки:*\n${timestamp || new Date().toISOString()}` }
              ]
            },
            {
              type: 'section',
              text: {
                type: 'mrkdwn',
                text: `*Сообщение:*\n${message}`
              }
            },
            {
              type: 'context',
              elements: [
                {
                  type: 'mrkdwn',
                  text: `🌐 User-Agent: ${userAgent || 'Не указан'}`
                }
              ]
            }
          ]
        };

        const slackResponse = await fetch(slackWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackMessage)
        });

        if (slackResponse.ok) {
          console.log('Slack notification sent successfully!');
        } else {
          console.error('Slack webhook error:', slackResponse.status, slackResponse.statusText);
        }
      } catch (slackError) {
        console.error('Slack notification failed:', slackError);
        // Не прерываем выполнение, если Slack недоступен
      }
    } else {
      console.warn('CONTACT_SLACK_WEBHOOK не настроен');
    }

    // Здесь можно добавить логику отправки email
    // Например, через SendGrid, Mailgun или другие сервисы
    
    // Пока просто возвращаем успех
    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully' 
      }),
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    )
  } catch (error) {
    console.error('Contact API error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        message: 'Internal server error' 
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      }
    )
  }
}

// Обработка OPTIONS запроса для CORS
export async function onRequestOptions() {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  })
}
