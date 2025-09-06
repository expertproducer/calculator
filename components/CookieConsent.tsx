'use client'

import { useState, useEffect } from 'react'
import { Cookie, Settings, X, CheckCircle, AlertTriangle, Info } from 'lucide-react'
import { initializeGTM, sendConsentEvent } from '@/lib/gtm'
import { getContent } from '@/lib/i18n'

interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

export default function CookieConsent({ locale = 'en' }: { locale?: string }) {
  const [showBanner, setShowBanner] = useState(false)
  const [showPreferences, setShowPreferences] = useState(false)
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true,
    analytics: false,
    marketing: false,
    functional: false
  })

  const localeTyped = (locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : locale === 'es' ? 'es' : 'en') as 'en' | 'de' | 'fr' | 'es'

  const [translations, setTranslations] = useState({
    title: '',
    description: '',
    acceptAll: '',
    decline: '',
    preferences: '',
    preferencesTitle: '',
    essential: '',
    analytics: '',
    marketing: '',
    functional: '',
    alwaysActive: '',
    savePreferences: '',
    cancel: '',
    essentialDesc: '',
    analyticsDesc: '',
    marketingDesc: '',
    functionalDesc: ''
  })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const content = await getContent(localeTyped)
        const cc = (content?.cookieConsent || {}) as any
        if (mounted) setTranslations(cc)
      } catch {}
    })()
    // Check if consent already exists
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      setShowBanner(true)
    } else {
      const savedPrefs = JSON.parse(consent)
      setPreferences(savedPrefs)
      applyConsent(savedPrefs)
    }

    // Listen for cookie settings open event from footer
    const handleOpenPreferences = () => {
      setShowPreferences(true)
    }

    window.addEventListener('openCookiePreferences', handleOpenPreferences)

    return () => {
      mounted = false
      window.removeEventListener('openCookiePreferences', handleOpenPreferences)
    }
  }, [])

  const applyConsent = (prefs: CookiePreferences) => {
    // Essential cookies are always active
    
    // Initialize GTM only after getting consent
    if (prefs.analytics || prefs.marketing || prefs.functional) {
      initializeGTM(prefs)
    }
    
    // Send consent event
    sendConsentEvent(prefs)
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
  }

  const handleDecline = () => {
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
  }

  const handleSavePreferences = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences))
    setShowPreferences(false)
    setShowBanner(false)
    applyConsent(preferences)
  }

  const handlePreferencesChange = (type: keyof CookiePreferences) => {
    if (type === 'essential') return // Essential always true
    setPreferences(prev => ({
      ...prev,
      [type]: !prev[type]
    }))
  }

  if (!showBanner && !showPreferences) return null

  if (showPreferences) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <Settings className="text-blue-600" size={24} />
                {translations.preferencesTitle}
              </h2>
              <button
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Essential Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="text-green-600" size={20} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{translations.essential}</h3>
                  <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                    {translations.alwaysActive}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {translations.essentialDesc}
                </p>
              </div>

              {/* Analytics Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Info className="text-blue-600" size={20} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{translations.analytics}</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.analytics}
                      onChange={() => handlePreferencesChange('analytics')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {translations.analyticsDesc}
                </p>
              </div>

              {/* Marketing Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="text-orange-600" size={20} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{translations.marketing}</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.marketing}
                      onChange={() => handlePreferencesChange('marketing')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {translations.marketingDesc}
                </p>
              </div>

              {/* Functional Cookies */}
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Info className="text-purple-600" size={20} />
                  <h3 className="font-semibold text-gray-900 dark:text-white">{translations.functional}</h3>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferences.functional}
                      onChange={() => handlePreferencesChange('functional')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {translations.functionalDesc}
                </p>
              </div>
            </div>

            <div className="flex gap-3 mt-8">
              <button
                onClick={handleSavePreferences}
                className="flex-1 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                {translations.savePreferences}
              </button>
              <button
                onClick={() => setShowPreferences(false)}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                {translations.cancel}
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 shadow-2xl z-40">
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
          <div className="flex items-start gap-3 flex-1">
            <Cookie className="text-blue-600 mt-1" size={24} />
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {translations.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {translations.description}
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
            <button
              onClick={handleAcceptAll}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
            >
              {translations.acceptAll}
            </button>
            <button
              onClick={handleDecline}
              className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {translations.decline}
            </button>
            <button
              onClick={() => setShowPreferences(true)}
              className="px-6 py-3 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              {translations.preferences}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
