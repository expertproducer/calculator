import { getContent } from '../../lib/i18n'
import { PAGE_METADATA } from '@/lib/locales'
import { Metadata } from 'next'
import CookieConsent from '@/components/CookieConsent'
import PrivacySettingsButton from './PrivacySettingsButton'

// Генерируем статические страницы для всех локалей
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
  const localeTyped = (locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : 'en') as 'en' | 'de' | 'fr'
  
  const content = {
    en: {
      title: "Privacy Policy",
      content: [
        "We protect your personal information and comply with all GDPR requirements. Your data is used only to provide services and is never shared with third parties without your consent.",
        "We collect only the information necessary to provide our services: name, email, website URL, and technical project details.",
        "All data is stored securely and deleted upon your request or upon contract expiration. You have the right to access, modify, or delete your data at any time.",
        "We use cookies and similar technologies to improve website functionality and analyze traffic. You can manage your cookie preferences using the settings below."
      ]
    },
    de: {
      title: "Datenschutzerklärung", 
      content: [
        "Wir schützen Ihre persönlichen Daten und erfüllen alle GDPR-Anforderungen. Ihre Daten werden nur zur Erbringung von Dienstleistungen verwendet und niemals ohne Ihre Zustimmung an Dritte weitergegeben.",
        "Wir sammeln nur die Informationen, die zur Erbringung unserer Dienstleistungen erforderlich sind: Name, E-Mail, Website-URL und technische Projektdetails.",
        "Alle Daten werden sicher gespeichert und auf Ihre Anfrage oder bei Vertragsende gelöscht. Sie haben jederzeit das Recht, auf Ihre Daten zuzugreifen, sie zu ändern oder zu löschen.",
        "Wir verwenden Cookies und ähnliche Technologien, um die Website-Funktionalität zu verbessern und den Verkehr zu analysieren. Sie können Ihre Cookie-Einstellungen über die nachstehenden Einstellungen verwalten."
      ]
    },
    fr: {
      title: "Politique de Confidentialité",
      content: [
        "Nous protégeons vos informations personnelles et respectons toutes les exigences GDPR. Vos données sont utilisées uniquement pour fournir des services et ne sont jamais partagées avec des tiers sans votre consentement.",
        "Nous collectons uniquement les informations nécessaires pour fournir nos services : nom, email, URL du site web et détails techniques du projet.",
        "Toutes les données sont stockées de manière sécurisée et supprimées sur votre demande ou à l'expiration du contrat. Vous avez le droit d'accéder, de modifier ou de supprimer vos données à tout moment.",
        "Nous utilisons des cookies et des technologies similaires pour améliorer la fonctionnalité du site web et analyser le trafic. Vous pouvez gérer vos préférences de cookies en utilisant les paramètres ci-dessous."
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
          
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
              {localeTyped === 'de' ? 'Cookie-Einstellungen verwalten' : 
               localeTyped === 'fr' ? 'Gérer les paramètres des cookies' : 
               'Manage Cookie Settings'}
            </h2>
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              {localeTyped === 'de' ? 'Klicken Sie auf die Schaltfläche unten, um Ihre Cookie-Einstellungen zu verwalten.' :
               localeTyped === 'fr' ? 'Cliquez sur le bouton ci-dessous pour gérer vos paramètres de cookies.' :
               'Click the button below to manage your cookie settings.'}
            </p>
            <PrivacySettingsButton 
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
