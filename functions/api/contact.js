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
