const fs = require('fs');
const path = require('path');

function deleteFolderRecursive(folderPath) {
  if (fs.existsSync(folderPath)) {
    fs.readdirSync(folderPath).forEach((file) => {
      const curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolderRecursive(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(folderPath);
    console.log(`Deleted folder: ${folderPath}`);
  }
}

function deleteFileIfExists(filePath) {
  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
    console.log(`Deleted file: ${filePath}`);
  }
}

console.log('Cleaning webpack cache and large files...');

// Clean webpack cache folders
const cachePaths = [
  '.next/cache',
  'cache',
  'node_modules/.cache'
];

cachePaths.forEach(cachePath => {
  deleteFolderRecursive(cachePath);
});

// Clean specific large files
const largeFiles = [
  '.next/cache/webpack/server-production/0.pack',
  '.next/cache/webpack/server-production/1.pack',
  '.next/cache/webpack/client-production/0.pack',
  '.next/cache/webpack/client-production/1.pack'
];

largeFiles.forEach(file => {
  deleteFileIfExists(file);
});

console.log('Cache cleaning completed!');
