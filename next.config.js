/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Cloudflare Pages
  output: 'export',
  
  // Use default .next directory
  // distDir: 'dist',
  
  // Disable image optimization for better compatibility
  images: {
    unoptimized: true
  },
  
  // Disable trailing slash for better compatibility
  trailingSlash: false,
  
  // Disable type checking during build for static export
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during build for static export
  eslint: {
    ignoreDuringBuilds: true,
  }
}

module.exports = nextConfig
