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
if (Test-Path ".next") {
    Write-Host "🧹 Cleaning previous build..." -ForegroundColor Yellow
    Remove-Item -Recurse -Force ".next"
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

try {
    npx wrangler pages deploy .next --project-name calculator
    Write-Host "✅ Deployment completed successfully!" -ForegroundColor Green
    Write-Host "🌐 Your site is now live at: https://cashandclash.com" -ForegroundColor Cyan
} catch {
    Write-Host "❌ Deployment failed: $_" -ForegroundColor Red
    exit 1
}
