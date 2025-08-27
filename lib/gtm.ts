// Google Tag Manager configuration
export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-XXXXXXX'

// Инициализация GTM только после получения согласия
export function initializeGTM(consent: {
  analytics: boolean
  marketing: boolean
  functional: boolean
}) {
  if (typeof window === 'undefined') return

  // Создаем dataLayer если его нет
  if (!window.dataLayer) {
    window.dataLayer = []
  }

  // Отправляем событие согласия
  window.dataLayer.push({
    'gtm.start': new Date().getTime(),
    event: 'gtm.js',
    'consent.analytics': consent.analytics ? 'granted' : 'denied',
    'consent.marketing': consent.marketing ? 'granted' : 'denied',
    'consent.functional': consent.functional ? 'granted' : 'denied'
  })

  // Загружаем GTM скрипт
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)

  // Добавляем noscript fallback
  const noscript = document.createElement('noscript')
  const iframe = document.createElement('iframe')
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${GTM_ID}`
  iframe.height = '0'
  iframe.width = '0'
  iframe.style.display = 'none'
  iframe.style.visibility = 'hidden'
  noscript.appendChild(iframe)
  document.body.appendChild(noscript)
}

// Отправка событий в GTM
export function sendGTMEvent(eventName: string, parameters: Record<string, any> = {}) {
  if (typeof window === 'undefined' || !window.dataLayer) return

  window.dataLayer.push({
    event: eventName,
    ...parameters
  })
}

// Отправка события согласия на cookies
export function sendConsentEvent(consent: {
  analytics: boolean
  marketing: boolean
  functional: boolean
}) {
  sendGTMEvent('cookie_consent', {
    analytics: consent.analytics,
    marketing: consent.marketing,
    functional: consent.functional
  })
}
