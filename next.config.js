/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включаем статический экспорт для Cloudflare Pages
  output: 'export',
  
  // Указываем папку dist для Cloudflare Pages
  distDir: 'dist',
  
  // Убираем trailingSlash для стандартного поведения
  // trailingSlash: true,
  
  // Отключаем оптимизацию изображений для статического экспорта
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
