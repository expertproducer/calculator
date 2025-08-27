/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убираем статический экспорт для работы всех функций
  // output: 'export',
  
  // Убираем trailingSlash для стандартного поведения
  // trailingSlash: true,
  
  // Отключаем оптимизацию изображений для статического экспорта
  images: {
    unoptimized: true
  },
  
  // Указываем папку для сборки (Cloudflare Pages ожидает 'out')
  distDir: 'out'
}

module.exports = nextConfig
