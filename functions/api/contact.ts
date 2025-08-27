interface ContactFormData {
  name: string;
  email: string;
  company: string;
  message: string;
  stack: string;
  regions: string;
  languages: string;
  preferredCmp: string;
  integrations: string;
  locale: string;
  timestamp: string;
  userAgent: string;
}

export async function onRequestPost(context: any) {
  try {
    const { request } = context;
    
    // Проверяем метод запроса
    if (request.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }
    
    // Получаем данные формы
    const formData = await request.formData();
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const company = formData.get('company') as string;
    const message = formData.get('message') as string;
    const stack = formData.get('stack') as string;
    const regions = formData.get('regions') as string;
    const languages = formData.get('languages') as string;
    const preferredCmp = formData.get('preferredCmp') as string;
    const integrations = formData.get('integrations') as string;
    const locale = formData.get('locale') as string;
    const timestamp = formData.get('timestamp') as string;
    const userAgent = formData.get('userAgent') as string;
    
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

export async function onRequestOptions(context: any) {
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
