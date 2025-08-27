'use client'

import { useEffect, useState } from 'react'
import { Volume2, VolumeX, Eye, EyeOff, ArrowDown } from 'lucide-react'

// Компонент для пропуска к основному контенту
export function SkipToContentLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label="Перейти к основному контенту"
    >
      <ArrowDown size={16} className="inline mr-2" />
      Перейти к контенту
    </a>
  )
}

// Компонент для управления анимациями
export function MotionReducer() {
  const [reducedMotion, setReducedMotion] = useState(false)

  useEffect(() => {
    // Проверяем системные настройки
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)

    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.style.setProperty('--motion-reduce', '1')
    } else {
      document.documentElement.style.setProperty('--motion-reduce', '0')
    }
  }, [reducedMotion])

  return null
}

// Компонент для управления контрастом
export function ContrastToggle() {
  const [highContrast, setHighContrast] = useState(false)

  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
  }, [highContrast])

  return (
    <button
      onClick={() => setHighContrast(!highContrast)}
      className="fixed bottom-4 right-4 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
      aria-label={highContrast ? 'Отключить высокий контраст' : 'Включить высокий контраст'}
      aria-pressed={highContrast}
    >
      {highContrast ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  )
}

// Компонент для управления звуком
export function SoundToggle() {
  const [soundEnabled, setSoundEnabled] = useState(true)

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
    // Здесь можно добавить логику управления звуком
  }

  return (
    <button
      onClick={toggleSound}
      className="fixed bottom-4 right-20 z-50 p-3 bg-gray-800 text-white rounded-full shadow-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
      aria-label={soundEnabled ? 'Отключить звук' : 'Включить звук'}
      aria-pressed={!soundEnabled}
    >
      {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
    </button>
  )
}

// Компонент для улучшения навигации с клавиатуры
export function KeyboardNavigation() {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl + M - открыть/закрыть меню
      if (event.ctrlKey && event.key === 'm') {
        event.preventDefault()
        // Логика открытия/закрытия меню
      }

      // Ctrl + S - поиск
      if (event.ctrlKey && event.key === 's') {
        event.preventDefault()
        // Логика поиска
      }

      // Ctrl + H - помощь
      if (event.ctrlKey && event.key === 'h') {
        event.preventDefault()
        // Логика помощи
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [])

  return null
}

// Компонент для улучшения focus management
export function FocusManager() {
  useEffect(() => {
    // Сохраняем последний активный элемент
    let lastActiveElement: HTMLElement | null = null

    const handleFocusIn = (event: FocusEvent) => {
      lastActiveElement = event.target as HTMLElement
    }

    const handleFocusOut = () => {
      lastActiveElement = null
    }

    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)

    return () => {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
    }
  }, [])

  return null
}

// Компонент для улучшения screen reader поддержки
export function ScreenReaderSupport() {
  useEffect(() => {
    // Добавляем ARIA live regions для динамического контента
    const liveRegion = document.createElement('div')
    liveRegion.setAttribute('aria-live', 'polite')
    liveRegion.setAttribute('aria-atomic', 'true')
    liveRegion.className = 'sr-only'
    liveRegion.id = 'live-region'
    document.body.appendChild(liveRegion)

    return () => {
      if (liveRegion.parentNode) {
        liveRegion.parentNode.removeChild(liveRegion)
      }
    }
  }, [])

  return null
}

// Хук для управления focus trap
export function useFocusTrap(active: boolean = false) {
  useEffect(() => {
    if (!active) return

    const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    const container = document.activeElement?.closest('[data-focus-trap]')
    
    if (!container) return

    const focusableContent = container.querySelectorAll(focusableElements)
    const firstFocusableElement = focusableContent[0] as HTMLElement
    const lastFocusableElement = focusableContent[focusableContent.length - 1] as HTMLElement

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstFocusableElement) {
            lastFocusableElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastFocusableElement) {
            firstFocusableElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    document.addEventListener('keydown', handleTabKey)
    return () => document.removeEventListener('keydown', handleTabKey)
  }, [active])
}

// Компонент для улучшения доступности форм
export function FormAccessibility() {
  return (
    <div className="sr-only" aria-live="polite" aria-atomic="true">
      <div id="form-errors" aria-live="assertive" aria-atomic="true"></div>
      <div id="form-success" aria-live="polite" aria-atomic="true"></div>
    </div>
  )
}

// Компонент для улучшения доступности модальных окон
export function ModalAccessibility({ 
  isOpen, 
  title, 
  children 
}: { 
  isOpen: boolean
  title: string
  children: React.ReactNode 
}) {
  const [previousActiveElement, setPreviousActiveElement] = useState<HTMLElement | null>(null)

  useEffect(() => {
    if (isOpen) {
      // Сохраняем текущий активный элемент
      setPreviousActiveElement(document.activeElement as HTMLElement)
      
      // Устанавливаем focus на модальное окно
      const modal = document.getElementById('modal')
      if (modal) {
        modal.focus()
      }
    } else if (previousActiveElement) {
      // Возвращаем focus на предыдущий элемент
      previousActiveElement.focus()
    }
  }, [isOpen, previousActiveElement])

  if (!isOpen) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-focus-trap
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        aria-hidden="true"
      />
      
      {/* Modal content */}
      <div
        id="modal"
        tabIndex={-1}
        className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto focus:outline-none"
        role="document"
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 id="modal-title" className="text-2xl font-bold text-gray-900 dark:text-white">
            {title}
          </h2>
        </div>
        
        <div id="modal-description" className="p-6">
          {children}
        </div>
      </div>
    </div>
  )
}

// Основной компонент доступности
export default function Accessibility() {
  return (
    <>
      <SkipToContentLink />
      <MotionReducer />
      <ContrastToggle />
      <SoundToggle />
      <KeyboardNavigation />
      <FocusManager />
      <ScreenReaderSupport />
      <FormAccessibility />
      
      {/* CSS для улучшения доступности */}
      <style dangerouslySetInnerHTML={{
        __html: `
          /* High contrast mode */
          .high-contrast {
            --text-primary: #000000 !important;
            --text-secondary: #333333 !important;
            --bg-primary: #ffffff !important;
            --bg-secondary: #f0f0f0 !important;
            --accent: #0000ff !important;
            --border: #000000 !important;
          }
          
          .high-contrast * {
            color: var(--text-primary) !important;
            background-color: var(--bg-primary) !important;
            border-color: var(--border) !important;
          }
          
          .high-contrast .text-gray-600 {
            color: var(--text-secondary) !important;
          }
          
          .high-contrast .bg-gray-50 {
            background-color: var(--bg-secondary) !important;
          }
          
          .high-contrast .border-gray-200 {
            border-color: var(--border) !important;
          }
          
          /* Reduced motion */
          @media (prefers-reduced-motion: reduce) {
            *, *::before, *::after {
              animation-duration: 0.01ms !important;
              animation-iteration-count: 1 !important;
              transition-duration: 0.01ms !important;
            }
          }
          
          /* Focus styles */
          *:focus {
            outline: 2px solid #3b82f6 !important;
            outline-offset: 2px !important;
          }
          
          /* Skip link styles */
          .sr-only {
            position: absolute !important;
            width: 1px !important;
            height: 1px !important;
            padding: 0 !important;
            margin: -1px !important;
            overflow: hidden !important;
            clip: rect(0, 0, 0, 0) !important;
            white-space: nowrap !important;
            border: 0 !important;
          }
          
          .sr-only:focus {
            position: static !important;
            width: auto !important;
            height: auto !important;
            padding: 0.5rem !important;
            margin: 0 !important;
            overflow: visible !important;
            clip: auto !important;
            white-space: normal !important;
          }
        `
      }} />
    </>
  )
}
