const fs = require('fs');
const path = require('path');

// Создаем папку out если её нет
const outDir = path.join('out');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Копируем основные файлы
const filesToCopy = [
  { source: 'public', dest: 'out' },
  { source: 'next.config.js', dest: 'out' },
  { source: 'package.json', dest: 'out' }
];

filesToCopy.forEach(({ source, dest }) => {
  const sourcePath = path.join(source);
  const destPath = path.join(dest, path.basename(source));
  
  if (fs.existsSync(sourcePath)) {
    if (fs.lstatSync(sourcePath).isDirectory()) {
      // Копируем папку рекурсивно
      copyDir(sourcePath, destPath);
    } else {
      // Копируем файл
      fs.copyFileSync(sourcePath, destPath);
    }
    console.log(`✅ Copied ${source} to ${dest}/`);
  } else {
    console.log(`❌ ${source} not found`);
  }
});

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    
    if (fs.lstatSync(srcPath).isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

console.log('✅ Build files copied successfully!');
