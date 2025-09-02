// Основной worker для Cloudflare Pages
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url)
    
    // Redirect www to non-www
    if (url.hostname.startsWith('www.')) {
      const newHostname = url.hostname.replace('www.', '')
      const newUrl = `https://${newHostname}${url.pathname}${url.search}`
      return Response.redirect(newUrl, 301)
    }
    
    // Обрабатываем API запросы
    if (url.pathname.startsWith('/api/')) {
      // Импортируем и вызываем соответствующую функцию
      try {
        if (url.pathname === '/api/contact' && request.method === 'POST') {
          const { onRequestPost } = await import('./api/contact.js')
          return onRequestPost({ request, env, ctx })
        }
        
        if (url.pathname === '/api/contact' && request.method === 'OPTIONS') {
          const { onRequestOptions } = await import('./api/contact.js')
          return onRequestOptions()
        }
        
        // Если API endpoint не найден
        return new Response('API endpoint not found', { status: 404 })
      } catch (error) {
        console.error('API error:', error)
        return new Response('Internal server error', { status: 500 })
      }
    }
    
    // Для всех остальных запросов возвращаем null (позволяет Cloudflare Pages обработать статические файлы)
    return null
  }
}
