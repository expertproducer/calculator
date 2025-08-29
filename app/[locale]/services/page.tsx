import { getContent } from '../../../lib/i18n'
import Services from '../../../components/Services'
import { Navbar, Footer } from '../../../components/AllComponents'
import StructuredData from '../../../components/StructuredData'
import ServicesStructuredData from '../../../components/ServicesStructuredData'
import CookieConsent from '../../../components/CookieConsent'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const metaData = {
    en: {
      title: 'Cookie Consent & CMP Implementation — GDPR Services | C&C CookieComply',
      description: 'Professional CMP setup, cookie banner fixes, script blocking before consent, and proper consent logging. Cookiebot, Iubenda, Usercentrics, Termly support.'
    },
    de: {
      title: 'Cookie-Zustimmung & CMP Implementierung — DSGVO Services | C&C CookieComply',
      description: 'Professionelle CMP-Einrichtung, Cookie-Banner-Reparaturen, Skript-Blockierung vor Zustimmung und ordnungsgemäße Zustimmungsprotokollierung.'
    },
    fr: {
      title: 'Consentement aux cookies & Implémentation CMP — Services RGPD | C&C CookieComply',
      description: 'Configuration CMP professionnelle, corrections de bannières cookies, blocage de scripts avant consentement et journalisation appropriée des consentements.'
    },
    ru: {
      title: 'Внедрение CMP и настройка баннеров cookie — Услуги GDPR | C&C CookieComply',
      description: 'Внедряем CMP, настраиваем cookie-баннеры, блокируем трекеры до согласия и ведём корректные журналы согласий. Cookiebot, Iubenda, Usercentrics, Termly.'
    }
  }
  
  const currentMeta = metaData[locale as keyof typeof metaData] || metaData.en
  const canonicalUrl = `https://www.cashandclash.com/${locale}/services/`
  
  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://www.cashandclash.com/en/services/',
        'de': 'https://www.cashandclash.com/de/services/',
        'fr': 'https://www.cashandclash.com/fr/services/',
        'x-default': 'https://www.cashandclash.com/en/services/'
      }
    },
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: canonicalUrl,
      type: 'website',
      locale: locale,
      alternateLocale: ['en', 'de', 'fr'].filter(l => l !== locale)
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMeta.title,
      description: currentMeta.description
    }
  }
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as 'en' | 'de' | 'fr')
  
  return (
    <>
      <StructuredData locale={locale as 'en' | 'de' | 'fr'} />
      <ServicesStructuredData locale={locale} />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar locale={locale} />
        
        {/* Spacing for fixed navigation */}
        <div className="pt-20"></div>
      
        <main>
          <Services content={content.services} />
        </main>
        
        <Footer content={content} locale={locale} />
      </div>
      <CookieConsent locale={locale} />
    </>
  )
}
