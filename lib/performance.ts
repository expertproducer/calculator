// Утилиты для мониторинга производительности

export interface PerformanceMetrics {
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
  timeToInteractive: number
  totalBlockingTime: number
}

// Мониторинг Core Web Vitals
export function monitorCoreWebVitals(): Promise<PerformanceMetrics> {
  return new Promise((resolve) => {
    const metrics: Partial<PerformanceMetrics> = {}

    // First Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          metrics.firstContentfulPaint = entry.startTime
        }
      }
    }).observe({ entryTypes: ['paint'] })

    // Largest Contentful Paint
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
          metrics.largestContentfulPaint = entry.startTime
        }
      }
    }).observe({ entryTypes: ['largest-contentful-paint'] })

    // First Input Delay
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'first-input') {
          const firstInputEntry = entry as PerformanceEntry & { processingStart?: number }
          if (firstInputEntry.processingStart) {
            metrics.firstInputDelay = firstInputEntry.processingStart - entry.startTime
          }
        }
      }
    }).observe({ entryTypes: ['first-input'] })

    // Cumulative Layout Shift
    new PerformanceObserver((list) => {
      let cls = 0
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'layout-shift') {
          const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean, value?: number }
          if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
            cls += layoutShiftEntry.value
          }
        }
      }
      metrics.cumulativeLayoutShift = cls
    }).observe({ entryTypes: ['layout-shift'] })

    // Time to Interactive
    if ('timing' in performance && performance.timing) {
      const timing = performance.timing as PerformanceTiming
      if (timing.domInteractive && timing.navigationStart) {
        metrics.timeToInteractive = timing.domInteractive - timing.navigationStart
      }
    }

    // Total Blocking Time
    new PerformanceObserver((list) => {
      let tbt = 0
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'longtask') {
          tbt += entry.duration - 50
        }
      }
      metrics.totalBlockingTime = tbt
    }).observe({ entryTypes: ['longtask'] })

    // Ждем загрузки всех метрик
    setTimeout(() => {
      resolve(metrics as PerformanceMetrics)
    }, 5000)
  })
}

// Оптимизация изображений
export function optimizeImages() {
  // Lazy loading для изображений
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement
          if (img.dataset.src) {
            img.src = img.dataset.src
            img.classList.remove('lazy')
            imageObserver.unobserve(img)
          }
        }
      })
    })

    document.querySelectorAll('img[data-src]').forEach((img) => {
      imageObserver.observe(img)
    })
  }
}

// Оптимизация шрифтов
export function optimizeFonts() {
  // Preload критических шрифтов
  const criticalFonts = [
    '/fonts/inter-400.woff2',
    '/fonts/inter-600.woff2',
    '/fonts/inter-700.woff2'
  ]

  criticalFonts.forEach((font) => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.href = font
    link.as = 'font'
    link.type = 'font/woff2'
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Оптимизация ресурсов
export function optimizeResources() {
  // DNS prefetch для внешних доменов
  const domains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://www.googletagmanager.com'
  ]

  domains.forEach((domain) => {
    const link = document.createElement('link')
    link.rel = 'dns-prefetch'
    link.href = domain
    document.head.appendChild(link)
  })

  // Preconnect для критических ресурсов
  const criticalDomains = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com'
  ]

  criticalDomains.forEach((domain) => {
    const link = document.createElement('link')
    link.rel = 'preconnect'
    link.href = domain
    link.crossOrigin = 'anonymous'
    document.head.appendChild(link)
  })
}

// Мониторинг ошибок
export function monitorErrors() {
  window.addEventListener('error', (event) => {
    console.error('JavaScript Error:', {
      message: event.message,
      filename: event.filename,
      lineno: event.lineno,
      colno: event.colno,
      error: event.error
    })
  })

  window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled Promise Rejection:', {
      reason: event.reason
    })
  })
}

// Оптимизация анимаций
export function optimizeAnimations() {
  // Проверяем системные настройки
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
  
  if (prefersReducedMotion.matches) {
    document.documentElement.style.setProperty('--motion-reduce', '1')
  }

  // Оптимизируем анимации для производительности
  const animatedElements = document.querySelectorAll('[data-animate]')
  
  animatedElements.forEach((element) => {
    const htmlElement = element as HTMLElement
    htmlElement.style.willChange = 'transform, opacity'
  })
}

// Мониторинг памяти
export function monitorMemory() {
  if ('memory' in performance) {
    const memory = (performance as any).memory
    
    setInterval(() => {
      const used = Math.round(memory.usedJSHeapSize / 1048576)
      const total = Math.round(memory.totalJSHeapSize / 1048576)
      const limit = Math.round(memory.jsHeapSizeLimit / 1048576)
      
      if (used > total * 0.8) {
        console.warn('High memory usage:', { used, total, limit })
      }
    }, 10000)
  }
}

// Оптимизация загрузки страницы
export function optimizePageLoad() {
  // Отложенная загрузка не критических ресурсов
  const loadNonCriticalResources = () => {
    // Загружаем аналитику, чаты и другие не критичные скрипты
    const scripts = [
      'https://www.googletagmanager.com/gtag/js',
      'https://cdn.intercom.io/intercom.js'
    ]

    scripts.forEach((src) => {
      const script = document.createElement('script')
      script.src = src
      script.async = true
      document.body.appendChild(script)
    })
  }

  // Загружаем не критичные ресурсы после загрузки страницы
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadNonCriticalResources)
  } else {
    loadNonCriticalResources()
  }
}

// Основная функция оптимизации
export function initializePerformanceOptimization() {
  // Оптимизируем ресурсы
  optimizeResources()
  optimizeFonts()
  
  // Оптимизируем изображения
  optimizeImages()
  
  // Оптимизируем анимации
  optimizeAnimations()
  
  // Мониторим производительность
  monitorCoreWebVitals().then((metrics) => {
    console.log('Core Web Vitals:', metrics)
    
    // Отправляем метрики в аналитику
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'core_web_vitals', {
        event_category: 'Performance',
        event_label: 'Core Web Vitals',
        value: Math.round(metrics.largestContentfulPaint),
        custom_map: {
          fcp: metrics.firstContentfulPaint,
          lcp: metrics.largestContentfulPaint,
          fid: metrics.firstInputDelay,
          cls: metrics.cumulativeLayoutShift,
          tti: metrics.timeToInteractive,
          tbt: metrics.totalBlockingTime
        }
      })
    }
  })
  
  // Мониторим ошибки и память
  monitorErrors()
  monitorMemory()
  
  // Оптимизируем загрузку страницы
  optimizePageLoad()
}

// Утилиты для измерения производительности
export const performanceUtils = {
  // Измерение времени выполнения функции
  measureTime: <T>(fn: () => T, label: string): T => {
    const start = performance.now()
    const result = fn()
    const end = performance.now()
    console.log(`${label} took ${(end - start).toFixed(2)}ms`)
    return result
  },

  // Измерение времени выполнения асинхронной функции
  measureAsyncTime: async <T>(fn: () => Promise<T>, label: string): Promise<T> => {
    const start = performance.now()
    const result = await fn()
    const end = performance.now()
    console.log(`${label} took ${(end - start).toFixed(2)}ms`)
    return result
  },

  // Проверка производительности
  isPerformanceGood: (metrics: PerformanceMetrics): boolean => {
    return (
      metrics.firstContentfulPaint < 1800 &&
      metrics.largestContentfulPaint < 2500 &&
      metrics.firstInputDelay < 100 &&
      metrics.cumulativeLayoutShift < 0.1
    )
  }
}
