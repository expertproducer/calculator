/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убираем статический экспорт для работы API роутов
  // output: 'export',
  
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
