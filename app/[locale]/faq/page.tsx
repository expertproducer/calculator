import { getContent } from '../../../lib/i18n'
import { FAQ } from '../../../components/AllComponents'
import { Navbar, Footer } from '../../../components/AllComponents'
import StructuredData from '../../../components/StructuredData'
import FAQStructuredData from '../../../components/FAQStructuredData'
import CookieConsent from '../../../components/CookieConsent'
import { Metadata } from 'next'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' },
    { locale: 'es' }
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const metaData = {
    en: {
      title: 'FAQ - GDPR Compliance & CMP Implementation Questions | C&C CookieComply',
      description: 'Get answers to common questions about GDPR compliance, CMP implementation, cookie consent tools, and data protection requirements. Expert guidance for your compliance needs.'
    },
    de: {
      title: 'FAQ - DSGVO-Compliance & CMP Implementierung Fragen | C&C CookieComply',
      description: 'Erhalten Sie Antworten auf häufige Fragen zu DSGVO-Compliance, CMP-Implementierung, Cookie-Zustimmungstools und Datenschutzanforderungen. Expertenberatung für Ihre Compliance-Bedürfnisse.'
    },
    fr: {
      title: 'FAQ - Questions sur la conformité RGPD & l\'implémentation CMP | C&C CookieComply',
      description: 'Obtenez des réponses aux questions courantes sur la conformité RGPD, l\'implémentation CMP, les outils de consentement aux cookies et les exigences de protection des données. Conseils d\'experts pour vos besoins de conformité.'
    }
  }
  
  const currentMeta = metaData[locale as keyof typeof metaData] || metaData.en
  const canonicalUrl = `https://www.cashandclash.com/${locale}/faq/`
  
  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://www.cashandclash.com/en/faq/',
        'de': 'https://www.cashandclash.com/de/faq/',
        'fr': 'https://www.cashandclash.com/fr/faq/',
        'x-default': 'https://www.cashandclash.com/en/faq/'
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

export default async function FAQPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale as 'en' | 'de' | 'fr' | 'es')
  
  return (
    <>
      <StructuredData />
      <FAQStructuredData locale={locale} faqItems={content.faq.items} />
      <div className="min-h-screen bg-white">
        <Navbar locale={locale} />
        
        {/* Spacing for fixed navigation */}
        <div className="pt-20"></div>
      
        <main>
          <FAQ content={content.faq} />
        </main>
        
        <Footer content={content} locale={locale} />
      </div>
      <CookieConsent locale={locale} />
    </>
  )
}
