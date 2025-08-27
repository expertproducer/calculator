// Cloudflare Pages Functions handler для API
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    
    // Обработка контактной формы
    if (url.pathname === '/api/contact') {
      try {
        const contactModule = await import('./contact.js');
        
        if (contactModule.onRequestPost && request.method === 'POST') {
          return await contactModule.onRequestPost({ request, env, ctx });
        } else if (contactModule.onRequestOptions && request.method === 'OPTIONS') {
          return await contactModule.onRequestOptions({ request, env, ctx });
        } else {
          return new Response('Method Not Allowed', { status: 405 });
        }
      } catch (error) {
        console.error('Contact function error:', error);
        return new Response('Internal Server Error', { status: 500 });
      }
    }
    
    return new Response('Not Found', { status: 404 });
  }
};
