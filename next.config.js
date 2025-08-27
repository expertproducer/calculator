/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убираем статический экспорт - используем Cloudflare Functions
  // output: 'export',
  
  // Настраиваем для Cloudflare Pages
  trailingSlash: true,
  
  // Отключаем оптимизацию изображений для Cloudflare
  images: {
    unoptimized: true
  },
  
  // Включаем экспериментальные функции
  experimental: {
    appDir: true
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
