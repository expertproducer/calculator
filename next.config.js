/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages - DISABLED FOR CLOUDFLARE PAGES
  // output: 'export',
  
  // Disable image optimization for static export
  images: {
    unoptimized: true
  },
  
  // Disable trailing slash for better compatibility
  trailingSlash: false,
  
  // Disable server-side features for static export
  experimental: {
    // Disable features that don't work with static export
  }
}

module.exports = nextConfig
