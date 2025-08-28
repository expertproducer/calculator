import { getContent } from '../../lib/i18n'
import { PAGE_METADATA } from '@/lib/locales'
import { Metadata } from 'next'
import CookieConsent from '@/components/CookieConsent'
import CookieSettingsButton from './CookieSettingsButton'

// Generate static pages for all locales
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as 'en' | 'de' | 'fr')
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">{content.cookies.title}</h1>
        <div className="prose max-w-none">
          {content.cookies.content.map((paragraph, index) => (
            <p key={index} className="text-lg text-gray-700 dark:text-gray-300 mb-4">
              {paragraph}
            </p>
          ))}
          
          <div className="mt-8 p-6 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
            <h2 className="text-xl font-semibold mb-4 text-green-900 dark:text-green-100">
              {content.cookies.manageCookieSettings}
            </h2>
            <p className="text-green-800 dark:text-green-200 mb-4">
              {content.cookies.manageCookieDescription}
            </p>
            <CookieSettingsButton 
              text={content.cookies.cookieSettings}
            />
          </div>
        </div>
      </div>
      <CookieConsent locale={locale} />
    </div>
  )
}
