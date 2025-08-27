/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // i18n configuration - handled by App Router
  experimental: {
    appDir: true
  },
  
  // Generate static pages for all locales
  async generateStaticParams() {
    return {
      '/': ['en', 'de', 'fr'],
      '/privacy': ['en', 'de', 'fr'],
      '/cookies': ['en', 'de', 'fr']
    }
  }
}

module.exports = nextConfig
