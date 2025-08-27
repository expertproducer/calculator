// Основной worker для Cloudflare Pages
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Обработка API запросов
    if (url.pathname.startsWith('/api/')) {
      try {
        if (url.pathname === '/api/contact') {
          const contactModule = await import('./api/contact.js');
          
          if (request.method === 'POST') {
            return await contactModule.onRequestPost({ request, env, ctx });
          } else if (request.method === 'OPTIONS') {
            return await contactModule.onRequestOptions({ request, env, ctx });
          } else {
            return new Response('Method Not Allowed', { 
              status: 405,
              headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type'
              }
            });
          }
        }
        
        // Если API endpoint не найден
        return new Response('API endpoint not found', { 
          status: 404,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
        
      } catch (error) {
        console.error('API error:', error);
        return new Response('Internal Server Error', { 
          status: 500,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
          }
        });
      }
    }
    
    // Для всех остальных запросов возвращаем 404
    return new Response('Not Found', { status: 404 });
  }
};
