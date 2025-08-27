# 🚀 Быстрое решение проблемы с большими файлами

## Проблема
```
Error: Pages only supports files up to 25 MiB in size
cache/webpack/server-production/0.pack is 32.2 MiB in size
```

## Решение за 3 шага

### 1. Установите зависимости
```bash
npm install
```

### 2. Выполните полную очистку и сборку
```bash
npm run build:full
```

### 3. Деплой
```bash
npm run deploy
```

## Что происходит

- `build:full` очищает все кэши и большие файлы
- Пересобирает проект с оптимизированными настройками
- Исключает файлы больше 25 МБ из деплоя

## Если проблема повторится

Просто выполните:
```bash
npm run clean:full
npm run build:full
npm run deploy
```

## Проверка

Перед деплоем проверьте размер:
```bash
du -sh .next
```

Должно быть меньше 100 МБ.
