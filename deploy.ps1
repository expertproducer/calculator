# Скрипт деплоя для Cloudflare Pages
Write-Host "🚀 Starting deployment to Cloudflare Pages..." -ForegroundColor Green

# Проверяем наличие необходимых файлов
$requiredFiles = @("next.config.js", "package.json", "wrangler.toml")

foreach ($file in $requiredFiles) {
    if (Test-Path $file) {
        Write-Host "✅ Found $file" -ForegroundColor Green
    } else {
        Write-Host "❌ Missing required file: $file" -ForegroundColor Red
        exit 1
    }
}

# Очищаем предыдущую сборку
if (Test-Path "out") {
    Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force "out"
}

# Собираем проект
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Деплоим на Cloudflare Pages
Write-Host "🚀 Deploying to Cloudflare Pages..." -ForegroundColor Yellow

# Используем wrangler для деплоя папки out
npx wrangler pages deploy out --project-name calculator

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Deployment failed!" -ForegroundColor Red
    exit 1
}

Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
Write-Host "🌐 Your site is now live on Cloudflare Pages!" -ForegroundColor Cyan
