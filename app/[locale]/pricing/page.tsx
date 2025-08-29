import { getContent } from '../../../lib/i18n'
import { Pricing } from '../../../components/AllComponents'
import { Navbar, Footer } from '../../../components/AllComponents'
import StructuredData from '../../../components/StructuredData'
import PricingStructuredData from '../../../components/PricingStructuredData'
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
      title: 'Transparent Pricing Plans | CMP Implementation Services | C&C CookieComply',
      description: 'Clear pricing model: we charge only for implementation, you choose your CMP service plan. Basic, Pro, and Business packages with transparent costs.'
    },
    de: {
      title: 'Transparente Preispläne | CMP Implementierung Services | C&C CookieComply',
      description: 'Klares Preismodell: Wir berechnen nur die Implementierung, Sie wählen Ihren CMP-Serviceplan. Basic-, Pro- und Business-Pakete mit transparenten Kosten.'
    },
    fr: {
      title: 'Plans tarifaires transparents | Services d\'implémentation CMP | C&C CookieComply',
      description: 'Modèle de prix clair: nous facturons uniquement l\'implémentation, vous choisissez votre plan de service CMP. Forfaits Basic, Pro et Business avec des coûts transparents.'
    }
  }
  
  const currentMeta = metaData[locale as keyof typeof metaData] || metaData.en
  const canonicalUrl = `https://www.cashandclash.com/${locale}/pricing/`
  
  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://www.cashandclash.com/en/pricing/',
        'de': 'https://www.cashandclash.com/de/pricing/',
        'fr': 'https://www.cashandclash.com/fr/pricing/',
        'x-default': 'https://www.cashandclash.com/en/pricing/'
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

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as 'en' | 'de' | 'fr')
  
  return (
    <>
      <StructuredData locale={locale as 'en' | 'de' | 'fr'} />
      <PricingStructuredData locale={locale} />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar locale={locale} />
        
        {/* Spacing for fixed navigation */}
        <div className="pt-20"></div>
      
        <main>
          <Pricing content={content.pricing} />
        </main>
        
        <Footer content={content} locale={locale} />
      </div>
      <CookieConsent locale={locale} />
    </>
  )
}
