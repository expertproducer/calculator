// Cloudflare Pages Function для обработки контактной формы
export async function onRequestPost(context) {
  try {
    const { request } = context;
    
    // Проверяем метод запроса
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    
    // Получаем данные формы
    const formData = await request.formData();
    const name = formData.get('name');
    const email = formData.get('email');
    const company = formData.get('company');
    const message = formData.get('message');
    const stack = formData.get('stack');
    const regions = formData.get('regions');
    const languages = formData.get('languages');
    const preferredCmp = formData.get('preferredCmp');
    const integrations = formData.get('integrations');
    const locale = formData.get('locale');
    const timestamp = formData.get('timestamp');
    const userAgent = formData.get('userAgent');
    
    // Валидация данных
    if (!name || !email || !message) {
      return new Response(JSON.stringify({
        error: 'Missing required fields: name, email, message'
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
    
    // Здесь можно добавить отправку email или сохранение в базу данных
    // Пока просто возвращаем успешный ответ
    
    // Логируем данные (в продакшене убрать)
    console.log('Form submission:', { 
      name, 
      email, 
      company, 
      message, 
      stack, 
      regions, 
      languages, 
      preferredCmp, 
      integrations, 
      locale, 
      timestamp, 
      userAgent 
    });
    
    return new Response(JSON.stringify({
      success: true,
      message: 'Form submitted successfully'
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
    console.error('Error processing form:', error);
    
    return new Response(JSON.stringify({
      error: 'Internal server error'
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

export async function onRequestOptions(context) {
  // Обработка preflight запроса
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type'
    }
  });
}
