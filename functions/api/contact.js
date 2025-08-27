// Cloudflare Pages Function для обработки контактной формы
export async function onRequestPost(context) {
  try {
    const { request } = context;
    
    // Проверяем метод запроса
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { 
        status: 405,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // Получаем JSON данные
    let body;
    try {
      body = await request.json();
    } catch (error) {
      console.error('Failed to parse JSON:', error);
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Invalid JSON data' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    console.log('Received form data:', body);
    
    // Простая валидация обязательных полей
    if (!body.name || !body.email || !body.url || !body.message) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Missing required fields: name, email, url, message' 
      }), {
        status: 400,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // Проверка honeypot
    if (body.honeypot) {
      console.log('Honeypot triggered, treating as spam');
      return new Response(JSON.stringify({ 
        success: true, 
        message: 'Message sent successfully' 
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      });
    }
    
    // Подготовка сообщения для Slack (если настроен webhook)
    const slackMessage = {
      text: `🎯 *Новая заявка от ${body.name}*`,
      blocks: [
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Имя:*\n${body.name}` },
            { type: "mrkdwn", text: `*Email:*\n${body.email}` },
            { type: "mrkdwn", text: `*URL сайта:*\n${body.url}` },
            { type: "mrkdwn", text: `*Стек:*\n${body.stack || 'Не указано'}` },
            { type: "mrkdwn", text: `*Регионы:*\n${body.regions || 'Не указано'}` },
            { type: "mrkdwn", text: `*Языки:*\n${body.languages || 'Не указано'}` }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Сообщение:*\n${body.message}`
          }
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Локаль:*\n${body.locale || 'Не указано'}` },
            { type: "mrkdwn", text: `*Время:*\n${body.timestamp || 'Не указано'}` }
          ]
        }
      ]
    };
    
    console.log('Slack message prepared:', slackMessage);
    
    // Отправка в Slack (если настроен webhook)
    const slackWebhook = context.env.CONTACT_SLACK_WEBHOOK;
    if (slackWebhook) {
      try {
        console.log('Sending to Slack webhook');
        const slackResponse = await fetch(slackWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(slackMessage)
        });
        
        if (slackResponse.ok) {
          console.log('Slack message sent successfully');
        } else {
          console.error('Slack API error:', await slackResponse.text());
        }
      } catch (slackError) {
        console.error('Slack webhook error:', slackError);
        // Не прерываем выполнение, если Slack недоступен
      }
    } else {
      console.log('CONTACT_SLACK_WEBHOOK environment variable not set, skipping Slack notification');
    }
    
    // Возвращаем успешный ответ
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Thank you! We will contact you soon.' 
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
    
  } catch (error) {
    console.error('Contact form error:', error);
    
    return new Response(JSON.stringify({ 
      success: false, 
      message: 'Internal server error' 
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });
  }
}

// Обработка OPTIONS запроса для CORS
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
