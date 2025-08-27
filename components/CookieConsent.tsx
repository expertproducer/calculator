'use client'

import { useState, useEffect } from 'react'
import { X, Settings, Shield, Info } from 'lucide-react'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
  })

  useEffect(() => {
    // Проверяем, было ли уже принято решение
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      // Применяем сохраненные настройки
      const savedPreferences = JSON.parse(consent)
      setPreferences(savedPreferences)
      applyConsent(savedPreferences)
    }

    // Слушаем событие открытия настроек cookies из футера
    const handleOpenPreferences = () => {
      setShowPreferences(true)
    }

    window.addEventListener('openCookiePreferences', handleOpenPreferences)

    return () => {
      window.removeEventListener('openCookiePreferences', handleOpenPreferences)
    }
  }, [])

  const applyConsent = (consent: CookiePreferences) => {
    // Блокируем все не-essential скрипты до получения согласия
    if (!consent.analytics) {
      // Блокируем Google Analytics, Facebook Pixel и т.д.
      window.gtag = () => {}
      window.fbq = () => {}
    }
    
    if (!consent.marketing) {
      // Блокируем рекламные скрипты
      window.dataLayer = []
    }
    
    if (!consent.functional) {
      // Блокируем функциональные скрипты
      // (например, чаты, виджеты)
    }

    // Инициализируем GTM только после получения согласия
    if (consent.analytics || consent.marketing) {
      initializeGTM()
    }
  }

  const initializeGTM = () => {
    // Инициализируем Google Tag Manager
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        'gtm.start': new Date().getTime(),
        event: 'gtm.js'
      })
    }
  }

  const handleAcceptAll = () => {
    const allAccepted = {
      essential: true,
      analytics: true,
      marketing: true,
      functional: true
    }
    
    setPreferences(allAccepted)
    localStorage.setItem('cookie-consent', JSON.stringify(allAccepted))
    setShowBanner(false)
    applyConsent(allAccepted)
    
    // Отправляем событие согласия
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'granted',
        analytics_storage: 'granted',
        functionality_storage: 'granted'
      })
    }
  }

  const handleDeclineAll = () => {
    const onlyEssential = {
      essential: true,
      analytics: false,
      marketing: false,
      functional: false
    }
    
    setPreferences(onlyEssential)
    localStorage.setItem('cookie-consent', JSON.stringify(onlyEssential))
    setShowBanner(false)
    applyConsent(onlyEssential)
    
    // Отправляем событие отказа
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'denied'
      })
    }
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setShowBanner(false)
    setShowPreferences(false)
    applyConsent(preferences)
    
    // Отправляем событие с настройками
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        ad_storage: preferences.marketing ? 'granted' : 'denied',
        analytics_storage: preferences.analytics ? 'granted' : 'denied',
        functionality_storage: preferences.functional ? 'granted' : 'denied'
      })
    }
  }

  const handlePreferenceChange = (category: keyof CookiePreferences) => {
    if (category === 'essential') return // Essential всегда включены
    
    setPreferences(prev => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  if (!showBanner && !showPreferences) return null

  return (
    <>
      {/* Основной баннер */}
      {showBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-2xl">
          <div className="max-w-7xl mx-auto p-6">
            <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="text-blue-600 dark:text-blue-400" size={24} />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Мы используем cookies для улучшения вашего опыта
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  Мы используем cookies для анализа трафика, персонализации контента и рекламы. 
                  Essential cookies всегда активны для работы сайта. 
                  <a href="/en/cookies" className="text-blue-600 dark:text-blue-400 hover:underline ml-1">
                    Узнать больше
                  </a>
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <button
                  onClick={handleDeclineAll}
                  className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
                >
                  Отклонить все
                </button>
                <button
                  onClick={() => setShowPreferences(true)}
                  className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors flex items-center gap-2"
                >
                  <Settings size={16} />
                  Настройки
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                >
                  Принять все
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Модальное окно настроек */}
      {showPreferences && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Настройки cookies
                </h2>
                <button
                  onClick={() => setShowPreferences(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Essential Cookies */}
              <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={preferences.essential}
                      disabled
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Essential Cookies</h3>
                    <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded">
                      Всегда активны
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Необходимы для работы сайта. Не могут быть отключены.
                  </p>
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => handlePreferenceChange('analytics')}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Analytics Cookies</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Помогают нам понять, как используется сайт, для улучшения пользовательского опыта.
                  </p>
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => handlePreferenceChange('marketing')}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Marketing Cookies</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Используются для показа релевантной рекламы и отслеживания эффективности кампаний.
                  </p>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-start gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => handlePreferenceChange('functional')}
                      className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white">Functional Cookies</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Обеспечивают дополнительную функциональность, такую как чаты и виджеты.
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500 dark:text-gray-400 text-center">
                <Info size={14} className="inline mr-1" />
                Ваши настройки будут сохранены и применены ко всем страницам сайта.
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setShowPreferences(false)}
                className="px-6 py-3 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg font-medium transition-colors"
              >
                Отмена
              </button>
              <button
                onClick={handleSavePreferences}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors flex-1"
              >
                Сохранить настройки
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
