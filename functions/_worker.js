// Cloudflare Pages Functions handler для папки /functions
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Обработка API запросов
    if (url.pathname.startsWith('/api/')) {
      try {
        const functionPath = url.pathname.replace('/api/', '');
        const functionModule = await import(`./api/${functionPath}.js`);
        
        if (functionModule.onRequestPost && request.method === 'POST') {
          return await functionModule.onRequestPost({ request, env, ctx });
        } else if (functionModule.onRequestOptions && request.method === 'OPTIONS') {
          return await functionModule.onRequestOptions({ request, env, ctx });
        } else {
          return new Response('Method Not Allowed', { status: 405 });
        }
      } catch (error) {
        console.error('Function error:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
