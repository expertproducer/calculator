import { PAGE_METADATA } from '@/lib/locales'
import { Metadata } from 'next'
import CookieConsent from '@/components/CookieConsent'
import CookieSettingsButton from './CookieSettingsButton'

// Generate static pages for all locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' },
    { locale: 'es' }
  ]
}

// Generate metadata for the page
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = PAGE_METADATA.cookies[locale as keyof typeof PAGE_METADATA.cookies] || PAGE_METADATA.cookies.en
  
  return {
    title: meta.title,
    description: meta.description,
  }
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  // Static content for cookies page
  const cookiesContent = {
    en: {
      title: "Cookie Policy",
      content: [
        "We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from.",
        "By continuing to use our website, you consent to our use of cookies in accordance with this policy.",
        "You can manage your cookie preferences at any time using the settings below."
      ],
      manageCookieSettings: "Manage Cookie Settings",
      manageCookieDescription: "Customize your cookie preferences to control what information is collected and how it's used.",
      cookieSettings: "Cookie Settings"
    },
    de: {
      title: "Cookie-Richtlinie",
      content: [
        "Wir verwenden Cookies und ähnliche Technologien, um Ihr Browsing-Erlebnis zu verbessern, den Website-Verkehr zu analysieren und zu verstehen, woher unsere Besucher kommen.",
        "Durch die weitere Nutzung unserer Website stimmen Sie der Verwendung von Cookies gemäß dieser Richtlinie zu.",
        "Sie können Ihre Cookie-Einstellungen jederzeit mit den untenstehenden Einstellungen verwalten."
      ],
      manageCookieSettings: "Cookie-Einstellungen verwalten",
      manageCookieDescription: "Passen Sie Ihre Cookie-Einstellungen an, um zu kontrollieren, welche Informationen gesammelt und wie sie verwendet werden.",
      cookieSettings: "Cookie-Einstellungen"
    },
    fr: {
      title: "Politique des Cookies",
      content: [
        "Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience de navigation, analyser le trafic du site et comprendre d'où viennent nos visiteurs.",
        "En continuant à utiliser notre site web, vous consentez à notre utilisation des cookies conformément à cette politique.",
        "Vous pouvez gérer vos préférences de cookies à tout moment en utilisant les paramètres ci-dessous."
      ],
      manageCookieSettings: "Gérer les paramètres de cookies",
      manageCookieDescription: "Personnalisez vos préférences de cookies pour contrôler quelles informations sont collectées et comment elles sont utilisées.",
      cookieSettings: "Paramètres de cookies"
    }
  }
  
  const content = cookiesContent[locale as keyof typeof cookiesContent] || cookiesContent.en
  
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
              {content.manageCookieSettings}
            </h2>
            <p className="text-green-800 dark:text-green-200 mb-4">
              {content.manageCookieDescription}
            </p>
            <CookieSettingsButton 
              text={content.cookieSettings}
            />
          </div>
        </div>
      </div>
      <CookieConsent locale={locale} />
    </div>
  )
}
