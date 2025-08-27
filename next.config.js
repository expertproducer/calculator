/** @type {import('next').NextConfig} */
const nextConfig = {
  // Убираем статический экспорт для работы всех функций
  // output: 'export',
  
  // Убираем trailingSlash для стандартного поведения
  // trailingSlash: true,
  
  // Отключаем оптимизацию изображений для статического экспорта
  images: {
    unoptimized: true
  }
}

module.exports = nextConfig
