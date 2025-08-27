/** @type {import('next').NextConfig} */
const nextConfig = {
  // Включаем статический экспорт для Cloudflare Pages
  output: 'export',
  
  // Убираем trailingSlash для стандартного поведения
  // trailingSlash: true,
  
  // Отключаем оптимизацию изображений для статического экспорта
  images: {
    unoptimized: true
  },
  
  // Убираем distDir, чтобы использовать стандартную папку .next
  // distDir: 'out'
}

module.exports = nextConfig
