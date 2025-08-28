import { PAGE_METADATA } from '@/lib/locales'
import { Metadata } from 'next'
import CookieConsent from '@/components/CookieConsent'
import PrivacySettingsButton from './PrivacySettingsButton'

// Generate static pages for all locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const meta = PAGE_METADATA.privacy[locale as keyof typeof PAGE_METADATA.privacy] || PAGE_METADATA.privacy.en
  return {
    title: meta.title,
    description: meta.description
  }
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  
  // Static content for privacy page
  const privacyContent = {
    en: {
      title: "Privacy Policy",
      content: [
        "We are committed to protecting your privacy and ensuring the security of your personal information.",
        "This privacy policy explains how we collect, use, and protect your data in compliance with GDPR regulations.",
        "We only collect information that is necessary for providing our services and improving your experience."
      ],
      manageCookieSettings: "Manage Privacy Settings",
      manageCookieDescription: "Control how your personal information is collected and used across our services.",
      cookieSettings: "Privacy Settings"
    },
    de: {
      title: "Datenschutzerklärung",
      content: [
        "Wir verpflichten uns, Ihre Privatsphäre zu schützen und die Sicherheit Ihrer persönlichen Daten zu gewährleisten.",
        "Diese Datenschutzerklärung erklärt, wie wir Ihre Daten gemäß den GDPR-Vorschriften sammeln, verwenden und schützen.",
        "Wir sammeln nur Informationen, die für die Bereitstellung unserer Dienstleistungen und die Verbesserung Ihrer Erfahrung erforderlich sind."
      ],
      manageCookieSettings: "Datenschutzeinstellungen verwalten",
      manageCookieDescription: "Kontrollieren Sie, wie Ihre persönlichen Daten gesammelt und in unseren Diensten verwendet werden.",
      cookieSettings: "Datenschutzeinstellungen"
    },
    fr: {
      title: "Politique de Confidentialité",
      content: [
        "Nous nous engageons à protéger votre vie privée et à assurer la sécurité de vos informations personnelles.",
        "Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos données conformément aux réglementations GDPR.",
        "Nous ne collectons que les informations nécessaires pour fournir nos services et améliorer votre expérience."
      ],
      manageCookieSettings: "Gérer les paramètres de confidentialité",
      manageCookieDescription: "Contrôlez comment vos informations personnelles sont collectées et utilisées dans nos services.",
      cookieSettings: "Paramètres de confidentialité"
    }
  }
  
  const content = privacyContent[locale as keyof typeof privacyContent] || privacyContent.en
  
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
          
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
              {content.manageCookieSettings}
            </h2>
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              {content.manageCookieDescription}
            </p>
            <PrivacySettingsButton 
              text={content.cookieSettings}
            />
          </div>
        </div>
      </div>
      <CookieConsent locale={locale} />
    </div>
  )
}
