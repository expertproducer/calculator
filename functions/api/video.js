// Cloudflare Function for serving video
export async function onRequest(context) {
  try {
    const videoPath = 'public/images/banners/demo/hero-background.mp4'
    
    // In Cloudflare Functions, we need to handle static assets differently
    // For now, we'll redirect to the static file
    return new Response(null, {
      status: 302,
      headers: {
        'Location': '/images/banners/demo/hero-background.mp4',
        'Cache-Control': 'public, max-age=31536000',
      },
    })
  } catch (error) {
    console.error('Error serving video:', error)
    return new Response('Video not found', { status: 404 })
  }
}
