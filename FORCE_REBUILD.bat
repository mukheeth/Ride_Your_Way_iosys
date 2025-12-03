@echo off
echo ========================================
echo FORCE REBUILD - Driver Profile Fix
echo ========================================
echo.
echo Step 1: Stopping any running servers...
taskkill /F /IM node.exe 2>nul
timeout /t 2 /nobreak >nul
echo.
echo Step 2: Clearing Vite cache...
if exist "node_modules\.vite" (
    rmdir /s /q "node_modules\.vite"
    echo Vite cache cleared!
) else (
    echo No Vite cache found.
)
echo.
echo Step 3: Clearing dist folder...
if exist "dist" (
    rmdir /s /q "dist"
    echo Dist folder cleared!
) else (
    echo No dist folder found.
)
echo.
echo Step 4: Starting dev server...
echo.
npm run dev
