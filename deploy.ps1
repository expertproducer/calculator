# Cloudflare Pages deployment script
# Make sure you have Wrangler CLI installed: npm install -g wrangler

Write-Host "🚀 Starting deployment to Cloudflare Pages..." -ForegroundColor Green

# Clean previous builds
Write-Host "🧹 Cleaning previous builds..." -ForegroundColor Yellow
if (Test-Path ".next") { Remove-Item -Recurse -Force ".next" }
if (Test-Path "out") { Remove-Item -Recurse -Force "out" }

# Install dependencies
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

# Build project
Write-Host "🔨 Building project..." -ForegroundColor Yellow
npm run build

# Check if build was successful
if (-not (Test-Path ".next")) {
    Write-Host "❌ Error: .next folder not found after build" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Build completed successfully!" -ForegroundColor Green

# Deploy to Cloudflare Pages
Write-Host "🚀 Deploying to Cloudflare Pages..." -ForegroundColor Yellow
npx wrangler pages deploy .next --project-name calculator

if ($LASTEXITCODE -eq 0) {
    Write-Host "🎉 Deployment completed successfully!" -ForegroundColor Green
    Write-Host "🌐 Your site is available on Cloudflare Pages" -ForegroundColor Cyan
} else {
    Write-Host "❌ Error during deployment" -ForegroundColor Red
    exit 1
}
