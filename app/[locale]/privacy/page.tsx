import { getContent } from '../../lib/i18n'
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
  const content = getContent(locale as 'en' | 'de' | 'fr')
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{content.privacy.title}</h1>
        <div className="prose max-w-none">
          {content.privacy.content.map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {paragraph}
            </p>
          ))}
          
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <h2 className="text-xl font-semibold mb-4 text-blue-900 dark:text-blue-100">
              {content.privacy.manageCookieSettings}
            </h2>
            <p className="text-blue-800 dark:text-blue-200 mb-4">
              {content.privacy.manageCookieDescription}
            </p>
            <PrivacySettingsButton 
              text={content.privacy.cookieSettings}
            />
          </div>
        </div>
      </div>
      <CookieConsent locale={locale} />
    </div>
  )
}
