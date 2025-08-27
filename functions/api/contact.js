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
    
    const body = await request.json();
    
    console.log('Received form data:', body);
    
    // Простая валидация
    if (!body.name || !body.email || !body.url || !body.stack || !body.regions || !body.languages || !body.message || !body.locale) {
      return new Response(JSON.stringify({ 
        success: false, 
        message: 'Missing required fields' 
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
    
    // Подготовка сообщения для Slack
    const slackMessage = {
      text: `🎯 *Новая заявка от ${body.name}*`,
      blocks: [
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Имя:*\n${body.name}` },
            { type: "mrkdwn", text: `*Email:*\n${body.email}` },
            { type: "mrkdwn", text: `*URL сайта:*\n${body.url}` },
            { type: "mrkdwn", text: `*Стек:*\n${body.stack}` },
            { type: "mrkdwn", text: `*Регионы:*\n${body.regions}` },
            { type: "mrkdwn", text: `*Языки:*\n${body.languages}` }
          ]
        },
        {
          type: "section",
          text: {
            type: "mrkdwn",
            text: `*Сообщение:*\n${body.message || 'Не указано'}`
          }
        },
        {
          type: "section",
          fields: [
            { type: "mrkdwn", text: `*Локаль:*\n${body.locale}` },
            { type: "mrkdwn", text: `*Время:*\n${body.timestamp || 'Не указано'}` }
          ]
        }
      ]
    };
    
    console.log('Slack message prepared:', slackMessage);
    
    // Отправка в Slack
    const slackWebhook = context.env.CONTACT_SLACK_WEBHOOK;
    if (slackWebhook) {
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
    } else {
      console.warn('CONTACT_SLACK_WEBHOOK environment variable not set');
    }
    
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
