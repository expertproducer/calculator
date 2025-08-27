# Скрипт для развертывания на Cloudflare Pages
Write-Host "Starting deployment to Cloudflare Pages..." -ForegroundColor Green

# Шаг 1: Сборка проекта
Write-Host "Building project..." -ForegroundColor Yellow
npm run build

if ($LASTEXITCODE -ne 0) {
    Write-Host "Error building project!" -ForegroundColor Red
    exit 1
}

Write-Host "Project built successfully!" -ForegroundColor Green

# Шаг 2: Проверка папки out
if (-not (Test-Path "out")) {
    Write-Host "Folder 'out' not found!" -ForegroundColor Red
    exit 1
}

Write-Host "Folder 'out' found" -ForegroundColor Green

# Шаг 3: Проверка необходимых файлов
$requiredFiles = @("_worker.js", "functions/api/contact.js", "_redirects")
foreach ($file in $requiredFiles) {
    if (-not (Test-Path "out/$file")) {
        Write-Host "File '$file' not found in 'out' folder!" -ForegroundColor Red
        exit 1
    }
}

Write-Host "All required files found" -ForegroundColor Green

# Шаг 4: Инструкции по развертыванию
Write-Host "`nDeployment instructions:" -ForegroundColor Cyan
Write-Host "1. Go to Cloudflare Dashboard: https://dash.cloudflare.com/" -ForegroundColor White
Write-Host "2. Create new Pages project or update existing" -ForegroundColor White
Write-Host "3. Upload contents of 'out' folder to project" -ForegroundColor White
Write-Host "4. Make sure Functions are enabled in settings" -ForegroundColor White
Write-Host "5. Wait for deployment to complete" -ForegroundColor White

Write-Host "`nAlternative via Wrangler:" -ForegroundColor Cyan
Write-Host "npx wrangler pages deploy out" -ForegroundColor White

Write-Host "`nReady for deployment!" -ForegroundColor Green
