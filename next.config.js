/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for Cloudflare Pages (only in production)
  output: process.env.NODE_ENV === 'production' ? 'export' : undefined,
  
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
  },
  
  // Webpack configuration for production builds
  webpack: (config, { dev, isServer }) => {
    // Disable webpack cache in production to avoid large cache files
    if (!dev) {
      config.cache = false;
    }
    return config;
  }
}

module.exports = nextConfig
