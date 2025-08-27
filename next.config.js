/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Cloudflare Pages
  output: 'export',
  trailingSlash: true,
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
