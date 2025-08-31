module.exports = {
  // Основная конфигурация проекта
  project: {
    name: 'Calculator',
    description: 'Многоязычный калькулятор с современным UI на Next.js',
    type: 'web-application',
    framework: 'next.js',
    deployment: 'cloudflare-pages'
  },

  // Структура проекта для AI-ассистента
  structure: {
    app: 'Next.js App Router - основные страницы и компоненты',
    components: 'React компоненты для UI',
    lib: 'Утилиты и конфигурации (i18n, типы, схемы)',
    public: 'Статические файлы (изображения, иконки)',
    functions: 'Cloudflare Functions для API',
    out: 'Собранные файлы для деплоя'
  },

  // Языки и технологии
  languages: {
    primary: 'typescript',
    styling: 'tailwindcss',
    markup: 'jsx'
  },

  // Особенности проекта
  features: {
    internationalization: 'Поддержка множественных языков (ru, en, de, fr)',
    responsive: 'Адаптивный дизайн',
    seo: 'SEO оптимизация с structured data',
    performance: 'Оптимизация производительности',
    accessibility: 'Доступность (a11y)'
  },

  // Правила разработки
  conventions: {
    naming: 'English-Only Identifiers',
    ui_text: 'Russian language in UI strings',
    comments: 'Russian comments allowed',
    files: 'English file names'
  },

  // Настройки деплоя
  deployment: {
    platform: 'cloudflare-pages',
    build_command: 'npm run build',
    output_directory: 'out'
  },

  // Настройки для VS Code расширения
  vscode: {
    // Автоматическое определение контекста
    autoContext: true,
    
    // Подсказки для AI-ассистента
    suggestions: {
      // Приоритетные файлы для анализа
      priorityFiles: [
        'app/[locale]/page.tsx',
        'components/Hero.tsx',
        'lib/i18n.ts',
        'middleware.ts'
      ],
      
      // Исключения из анализа
      excludePatterns: [
        'node_modules/**',
        '.next/**',
        'out/**',
        'dist/**'
      ]
    },

    // Настройки для генерации кода
    codeGeneration: {
      // Стиль кода
      style: {
        quotes: 'single',
        semicolons: true,
        trailingComma: 'es5'
      },
      
      // Шаблоны для компонентов
      templates: {
        component: {
          imports: ['react'],
          exports: 'named',
          styling: 'tailwind'
        }
      }
    }
  },

  // Интеграция с существующими инструментами
  integrations: {
    // ESLint конфигурация
    eslint: {
      configFile: '.eslintrc.cjs',
      autoFix: true
    },
    
    // TypeScript конфигурация
    typescript: {
      configFile: 'tsconfig.json',
      strictMode: true
    },
    
    // Tailwind конфигурация
    tailwind: {
      configFile: 'tailwind.config.js',
      autoComplete: true
    }
  }
};
