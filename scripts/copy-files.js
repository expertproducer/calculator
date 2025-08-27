const fs = require('fs');
const path = require('path');

console.log('📁 Copying files after build...');

// Создаем папку functions в out если её нет
const functionsDir = path.join('out', 'functions');
if (!fs.existsSync(functionsDir)) {
    fs.mkdirSync(functionsDir, { recursive: true });
    console.log('✅ Created functions directory');
}

// Копируем _worker.js в корень out
const workerSource = path.join('functions', '_worker.js');
const workerDest = path.join('out', '_worker.js');

if (fs.existsSync(workerSource)) {
    fs.copyFileSync(workerSource, workerDest);
    console.log('✅ Copied _worker.js to out/');
} else {
    console.log('❌ _worker.js not found in functions/');
}

// Копируем папку api
const apiSource = path.join('functions', 'api');
const apiDest = path.join('out', 'functions', 'api');

if (fs.existsSync(apiSource)) {
    // Создаем папку api если её нет
    if (!fs.existsSync(apiDest)) {
        fs.mkdirSync(apiDest, { recursive: true });
    }
    
    // Копируем все файлы из api
    const files = fs.readdirSync(apiSource);
    files.forEach(file => {
        const sourceFile = path.join(apiSource, file);
        const destFile = path.join(apiDest, file);
        fs.copyFileSync(sourceFile, destFile);
        console.log(`✅ Copied ${file} to out/functions/api/`);
    });
} else {
    console.log('❌ API directory not found in functions/');
}

console.log('🎉 File copying completed!');
