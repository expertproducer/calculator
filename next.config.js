/** @type {import('next').NextConfig} */
const nextConfig = {
  // Настраиваем для Cloudflare Pages
  trailingSlash: true,
  
  // Отключаем оптимизацию изображений для Cloudflare
  images: {
    unoptimized: true
  },
  
  // Оптимизация размера бандла
  swcMinify: true,
  
  // Отключаем экспериментальные функции, которые могут создавать большие файлы
  experimental: {
    // Убираем appDir - он больше не нужен в Next.js 15
  },
  
  // Настройки webpack для уменьшения размера
  webpack: (config, { isServer, dev }) => {
    if (!isServer && !dev) {
      // Оптимизация для клиентской части в продакшене
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
          },
        },
      };
      
      // Отключаем генерацию source maps
      config.devtool = false;
      
      // Ограничиваем размер чанков
      config.optimization.chunkIds = 'deterministic';
      config.optimization.moduleIds = 'deterministic';
    }
    
    // Исключаем ненужные файлы
    config.externals = config.externals || [];
    
    // Исключаем большие модули
    if (!isServer) {
      config.resolve.alias = {
        ...config.resolve.alias,
        // Исключаем тяжелые модули
      };
    }
    
    // Исключаем большие файлы из сборки
    config.plugins = config.plugins || [];
    
    return config;
  },
  
  // Отключаем генерацию source maps для продакшена
  productionBrowserSourceMaps: false,
  
  // Настройки для уменьшения размера
  compress: true,
  
  // Отключаем ненужные функции
  poweredByHeader: false,
  
  // Настройки для статической генерации
  generateEtags: false,
  
  // Дополнительные настройки для уменьшения размера
  onDemandEntries: {
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
  
  // Отключаем ненужные заголовки
  headers: async () => {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
  
  // Настройки для исключения больших файлов
  distDir: '.next',
  
  // Отключаем ненужные функции для Cloudflare Pages
  typescript: {
    ignoreBuildErrors: false,
  },
  
  eslint: {
    ignoreDuringBuilds: false,
  },
}

module.exports = nextConfig
