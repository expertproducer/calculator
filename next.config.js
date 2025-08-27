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
  }
}

module.exports = nextConfig
