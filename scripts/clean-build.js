const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🧹 Очистка проекта перед сборкой...');

// Функция для удаления папки
function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    console.log(`Удаляю папку: ${dirPath}`);
    fs.rmSync(dirPath, { recursive: true, force: true });
  }
}

// Функция для удаления файла
function removeFile(filePath) {
  if (fs.existsSync(filePath)) {
    console.log(`Удаляю файл: ${filePath}`);
    fs.unlinkSync(filePath);
  }
}

// Очищаем папки сборки
const dirsToRemove = [
  '.next',
  'out',
  'build',
  'dist',
  'node_modules/.cache'
];

dirsToRemove.forEach(dir => removeDirectory(dir));

// Очищаем npm кэш
console.log('🧹 Очистка npm кэша...');
try {
  execSync('npm cache clean --force', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️ Не удалось очистить npm кэш');
}

// Устанавливаем зависимости заново
console.log('📦 Переустановка зависимостей...');
try {
  execSync('npm ci', { stdio: 'inherit' });
} catch (error) {
  console.log('⚠️ Не удалось выполнить npm ci, пробуем npm install...');
  try {
    execSync('npm install', { stdio: 'inherit' });
  } catch (error) {
    console.error('❌ Ошибка при установке зависимостей:', error.message);
    process.exit(1);
  }
}

console.log('✅ Очистка завершена!');
console.log('🚀 Готов к сборке!');
