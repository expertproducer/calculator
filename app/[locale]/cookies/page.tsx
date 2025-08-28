import { getContent } from '../../lib/i18n'
import { PAGE_METADATA } from '@/lib/locales'
import { Metadata } from 'next'
import CookieConsent from '@/components/CookieConsent'
import CookieSettingsButton from './CookieSettingsButton'

// Генерируем статические страницы для всех локалей
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const localeTyped = (locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : 'en') as 'en' | 'de' | 'fr'
  
  const content = {
    en: {
      title: "Cookie Policy",
      content: [
        "We use cookies to improve website functionality and analyze traffic. By continuing to use the site, you agree to our cookie policy.",
        "Cookies are small text files stored on your device that help us improve user experience and provide personalized content.",
        "We use the following types of cookies:",
        "• Essential cookies: Required for basic site functionality",
        "• Analytics cookies: Help us understand how visitors use our site",
        "• Marketing cookies: Used to deliver relevant advertisements",
        "• Functional cookies: Enable enhanced functionality and personalization",
        "You can disable cookies in your browser settings, but this may affect website functionality. Use the settings below to manage your preferences."
      ]
    },
    de: {
      title: "Cookie-Richtlinie",
      content: [
        "Wir verwenden Cookies, um die Website-Funktionalität zu verbessern und den Verkehr zu analysieren. Durch die weitere Nutzung der Website stimmen Sie unserer Cookie-Richtlinie zu.",
        "Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden und uns helfen, die Benutzererfahrung zu verbessern und personalisierte Inhalte bereitzustellen.",
        "Wir verwenden die folgenden Arten von Cookies:",
        "• Wesentliche Cookies: Erforderlich für grundlegende Website-Funktionalität",
        "• Analytics-Cookies: Helfen uns zu verstehen, wie Besucher unsere Website nutzen",
        "• Marketing-Cookies: Werden verwendet, um relevante Werbung zu liefern",
        "• Funktionale Cookies: Ermöglichen erweiterte Funktionalität und Personalisierung",
        "Sie können Cookies in Ihren Browser-Einstellungen deaktivieren, aber dies kann die Website-Funktionalität beeinträchtigen. Verwenden Sie die nachstehenden Einstellungen, um Ihre Präferenzen zu verwalten."
      ]
    },
    fr: {
      title: "Politique des Cookies",
      content: [
        "Nous utilisons des cookies pour améliorer la fonctionnalité du site web et analyser le trafic. En continuant à utiliser le site, vous acceptez notre politique de cookies.",
        "Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à améliorer l'expérience utilisateur et à fournir du contenu personnalisé.",
        "Nous utilisons les types de cookies suivants :",
        "• Cookies essentiels : Requis pour la fonctionnalité de base du site",
        "• Cookies analytiques : Nous aident à comprendre comment les visiteurs utilisent notre site",
        "• Cookies marketing : Utilisés pour diffuser des publicités pertinentes",
        "• Cookies fonctionnels : Permettent une fonctionnalité améliorée et la personnalisation",
        "Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter la fonctionnalité du site web. Utilisez les paramètres ci-dessous pour gérer vos préférences."
      ]
    }
  }[localeTyped]
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{content.title}</h1>
        <div className="prose max-w-none">
          {content.content.map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {paragraph}
            </p>
          ))}
          
          <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h2 className="text-xl font-semibold mb-4 text-green-900 dark:text-green-100">
              {localeTyped === 'de' ? 'Cookie-Einstellungen verwalten' : 
               localeTyped === 'fr' ? 'Gérer les paramètres des cookies' : 
               'Manage Cookie Settings'}
            </h2>
            <p className="text-green-800 dark:text-green-200 mb-4">
              {localeTyped === 'de' ? 'Klicken Sie auf die Schaltfläche unten, um Ihre Cookie-Einstellungen zu verwalten.' :
               localeTyped === 'fr' ? 'Cliquez sur le bouton ci-dessous pour gérer vos paramètres de cookies.' :
               'Click the button below to manage your cookie settings.'}
            </p>
            <CookieSettingsButton 
              text={localeTyped === 'de' ? 'Cookie-Einstellungen' :
                    localeTyped === 'fr' ? 'Paramètres des cookies' :
                    'Cookie Settings'}
            />
          </div>
        </div>
      </div>
      <CookieConsent locale={locale} />
    </div>
  )
}
