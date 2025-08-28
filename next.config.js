/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export for Cloudflare Pages
  output: 'export',
  
  // Disable image optimization for better compatibility
  images: {
    unoptimized: true
  },
  
  // SEO optimizations
  trailingSlash: false,
  
  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    return config;
  },
  
  // Performance optimizations
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },

  // Enable experimental features for better SEO
  experimental: {
    // optimizeCss: true, // Disabled due to critters module issues
  }
}

module.exports = nextConfig
