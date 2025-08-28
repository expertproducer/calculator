// Cloudflare Function для обработки контактной формы
export async function onRequestPost(context) {
  try {
    console.log('=== SLACK BOT API VERSION LOADED ===');
    console.log('Available env vars:', Object.keys(context.env));
    console.log('SLACK_BOT_TOKEN value:', context.env.SLACK_BOT_TOKEN ? 'SET' : 'NOT SET');
    console.log('SLACK_CHANNEL value:', context.env.SLACK_CHANNEL || '#leads');
    
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

    // Отправляем уведомление в Slack через Bot API
    const slackBotToken = context.env.SLACK_BOT_TOKEN;
    const slackChannel = context.env.SLACK_CHANNEL || '#leads';
    
    if (slackBotToken) {
      try {
        console.log('Sending Slack notification via Bot API...');
        
        const slackMessage = {
          channel: slackChannel,
          text: '🎯 Новая заявка с сайта C&C CookieComply',
          blocks: [
            {
              type: 'header',
              text: {
                type: 'plain_text',
                text: '🎯 Новая заявка с сайта C&C CookieComply'
              }
            },
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

        const slackResponse = await fetch('https://slack.com/api/chat.postMessage', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${slackBotToken}`
          },
          body: JSON.stringify(slackMessage)
        });

        const slackResult = await slackResponse.json();
        
        if (slackResult.ok) {
          console.log('Slack notification sent successfully!');
        } else {
          console.error('Slack API error:', slackResult.error);
        }
      } catch (slackError) {
        console.error('Slack notification failed:', slackError);
        // Не прерываем выполнение, если Slack недоступен
      }
    } else {
      console.warn('SLACK_BOT_TOKEN не настроен');
    }

    // Здесь можно добавить логику отправки email
    // Например, через SendGrid, Mailgun или другие сервисы
    
    // Резервный вариант: отправка через EmailJS или подобный сервис
    const emailjsUrl = context.env.EMAILJS_URL;
    const emailjsTemplate = context.env.EMAILJS_TEMPLATE;
    const emailjsUserId = context.env.EMAILJS_USER_ID;
    
    if (emailjsUrl && emailjsTemplate && emailjsUserId) {
      try {
        console.log('Sending email notification...');
        
        const emailData = {
          user_id: emailjsUserId,
          template_id: emailjsTemplate,
          template_params: {
            to_email: context.env.ADMIN_EMAIL || 'admin@example.com',
            from_name: name,
            from_email: email,
            message: message,
            website: url || 'Не указан',
            stack: stack || 'Не указан',
            regions: regions || 'Не указаны',
            languages: languages || 'Не указаны',
            preferred_cmp: preferredCmp || 'Не указан',
            integrations: integrations || 'Не указаны',
            locale: locale || 'Не указан',
            timestamp: timestamp || new Date().toISOString()
          }
        };

        const emailResponse = await fetch(emailjsUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(emailData)
        });

        if (emailResponse.ok) {
          console.log('Email notification sent successfully!');
        } else {
          console.error('Email service error:', emailResponse.status, emailResponse.statusText);
        }
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }
    }

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
