# Script for creating Calculator project archive
# Excludes unnecessary files and folders

Write-Host "Preparing Calculator project archive..." -ForegroundColor Green

# Archive name with date
$archiveName = "Calculator-$(Get-Date -Format 'yyyy-MM-dd-HHmm').zip"
Write-Host "Creating archive: $archiveName" -ForegroundColor Yellow

# Create temporary directory for archive
$tempDir = "temp-archive"
if (Test-Path $tempDir) {
    Remove-Item $tempDir -Recurse -Force
}
New-Item -ItemType Directory -Name $tempDir | Out-Null

Write-Host "Copying needed files..." -ForegroundColor Yellow

# Copy main source folders
Copy-Item "app" -Destination "$tempDir/app" -Recurse -Force
Copy-Item "components" -Destination "$tempDir/components" -Recurse -Force
Copy-Item "lib" -Destination "$tempDir/lib" -Recurse -Force
Copy-Item "public" -Destination "$tempDir/public" -Recurse -Force
Copy-Item "types" -Destination "$tempDir/types" -Recurse -Force
Copy-Item "functions" -Destination "$tempDir/functions" -Recurse -Force
Copy-Item "scripts" -Destination "$tempDir/scripts" -Recurse -Force

# Copy configuration files
Copy-Item "*.js" -Destination $tempDir -Force
Copy-Item "*.ts" -Destination $tempDir -Force
Copy-Item "*.json" -Destination $tempDir -Force
Copy-Item "*.cjs" -Destination $tempDir -Force
Copy-Item "*.toml" -Destination $tempDir -Force
Copy-Item "*.md" -Destination $tempDir -Force
Copy-Item "*.ps1" -Destination $tempDir -Force

# Copy environment variables sample file
Copy-Item "env.sample" -Destination "$tempDir/.env.sample" -Force

# Create .gitignore for archive
@"
# Archive exclusions
node_modules/
.next/
dist/
build/
.vercel/
.cache/
.wrangler/
out/
*.log
.env*
!.env.sample
"@ | Out-File "$tempDir/.gitignore" -Encoding UTF8

Write-Host "Creating ZIP archive..." -ForegroundColor Yellow

# Create ZIP archive
try {
    Compress-Archive -Path "$tempDir/*" -DestinationPath $archiveName -Force
    Write-Host "Archive created successfully: $archiveName" -ForegroundColor Green
    Write-Host "Archive size: $((Get-Item $archiveName).Length / 1MB) MB" -ForegroundColor Cyan
} catch {
    Write-Host "Error creating archive: $_" -ForegroundColor Red
}

# Clean up temporary directory
Write-Host "Cleaning temporary files..." -ForegroundColor Yellow
Remove-Item $tempDir -Recurse -Force

Write-Host "Done! Archive $archiveName created successfully." -ForegroundColor Green
Write-Host "Archive contains only needed files for development." -ForegroundColor Cyan
