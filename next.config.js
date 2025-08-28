/** @type {import('next').NextConfig} */
const nextConfig = {
  // Отключаем статическую генерацию - используем серверный рендеринг
  output: 'standalone',
  
  // Настраиваем для Cloudflare Pages
  trailingSlash: false,
  
  // Отключаем оптимизацию изображений для Cloudflare
  images: {
    unoptimized: true
  },
  
  // Настройки для интернационализации
  async redirects() {
    return [
      {
        source: '/de',
        destination: '/de/',
        permanent: true,
      },
      {
        source: '/fr', 
        destination: '/fr/',
        permanent: true,
      },
      {
        source: '/en',
        destination: '/en/',
        permanent: true,
      },
    ]
  },
  
  // Исключаем большие файлы webpack и кэша
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Исключаем серверные файлы из клиентской сборки
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Ограничиваем размер чанков
    config.optimization.splitChunks = {
      ...config.optimization.splitChunks,
      maxSize: 244000, // ~240KB
    };
    
    return config;
  },
  
  // Очищаем кэш после сборки
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  }
}

module.exports = nextConfig
