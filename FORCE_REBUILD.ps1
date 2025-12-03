# Force Rebuild Script for Driver Profile Fix

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "FORCE REBUILD - Driver Profile Fix" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Stop any running Node processes
Write-Host "Step 1: Stopping any running servers..." -ForegroundColor Yellow
Get-Process node -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2
Write-Host "Done!" -ForegroundColor Green
Write-Host ""

# Step 2: Clear Vite cache
Write-Host "Step 2: Clearing Vite cache..." -ForegroundColor Yellow
$viteCachePath = "node_modules\.vite"
if (Test-Path $viteCachePath) {
    Remove-Item -Path $viteCachePath -Recurse -Force
    Write-Host "Vite cache cleared!" -ForegroundColor Green
} else {
    Write-Host "No Vite cache found." -ForegroundColor Gray
}
Write-Host ""

# Step 3: Clear dist folder
Write-Host "Step 3: Clearing dist folder..." -ForegroundColor Yellow
$distPath = "dist"
if (Test-Path $distPath) {
    Remove-Item -Path $distPath -Recurse -Force
    Write-Host "Dist folder cleared!" -ForegroundColor Green
} else {
    Write-Host "No dist folder found." -ForegroundColor Gray
}
Write-Host ""

# Step 4: Start dev server
Write-Host "Step 4: Starting dev server..." -ForegroundColor Yellow
Write-Host ""
Write-Host "After the server starts:" -ForegroundColor Cyan
Write-Host "1. Go to: http://localhost:5173/Ride_Your_Way_iosys/#/driver/profile" -ForegroundColor White
Write-Host "2. Press Ctrl+Shift+R to hard refresh" -ForegroundColor White
Write-Host ""
npm run dev
