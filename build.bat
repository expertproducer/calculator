@echo off
echo Building Next.js project...
npm run build
echo Copying out folder to dist...
if exist dist rmdir /s /q dist
xcopy out dist /e /i /h /y
echo Build complete! Files are in dist folder.
