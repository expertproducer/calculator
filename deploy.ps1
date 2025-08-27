# Скрипт деплоя для Cloudflare Pages
# Убедитесь что у вас установлен Wrangler CLI: npm install -g wrangler

Write-Host "🚀 Начинаем деплой на Cloudflare Pages..." -ForegroundColor Green

# Очищаем предыдущие сборки
Write-Host "🧹 Очищаем предыдущие сборки..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "out") { Remove-Item -Recurse -Force "out" }

# Устанавливаем зависимости
Write-Host "📦 Устанавливаем зависимости..." -ForegroundColor Yellow
npm install

# Собираем проект
Write-Host "🔨 Собираем проект..." -ForegroundColor Yellow
npm run build

# Проверяем что сборка прошла успешно
if (-not (Test-Path ".next")) {
    Write-Host "❌ Ошибка: папка .next не найдена после сборки" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Сборка завершена успешно!" -ForegroundColor Green

# Деплоим на Cloudflare Pages
Write-Host "🚀 Деплоим на Cloudflare Pages..." -ForegroundColor Yellow
npx wrangler pages deploy .next --project-name calculator

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 Деплой завершен успешно!" -ForegroundColor Green
    Write-Host "🌐 Ваш сайт доступен на Cloudflare Pages" -ForegroundColor Cyan
} else {
    Write-Host "❌ Ошибка при деплое" -ForegroundColor Red
    exit 1
}
