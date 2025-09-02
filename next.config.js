/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable static export for Cloudflare Pages with Functions
  // output: 'export' is disabled to allow API functions
  
  // Disable image optimization for better compatibility
  images: {
    unoptimized: true
  },
  
  // Disable trailing slash for better compatibility
  trailingSlash: false,
  
  // Enable server-side features for Cloudflare Functions
  experimental: {
    // Enable features that work with Cloudflare Functions
  }
}

module.exports = nextConfig
