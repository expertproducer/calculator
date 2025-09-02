import { getContent } from '../../../lib/i18n'
import { Process } from '../../../components/AllComponents'
import { Navbar, Footer } from '../../../components/AllComponents'
import StructuredData from '../../../components/StructuredData'
import ProcessStructuredData from '../../../components/ProcessStructuredData'
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
      title: 'Implementation Process: From Audit to Validation | C&C CookieComply',
      description: 'Our systematic 5-step approach ensures seamless CMP deployment with minimal disruption. Legal analysis, CMP setup, GTM integration, production deployment, and data impact analysis.'
    },
    de: {
      title: 'Implementierungsprozess: Von der Prüfung zur Validierung | C&C CookieComply',
      description: 'Unser systematischer 5-Schritt-Ansatz gewährleistet eine nahtlose CMP-Bereitstellung mit minimalen Störungen. Rechtsanalyse, CMP-Einrichtung, GTM-Integration, Produktionsbereitstellung und Datenauswirkungsanalyse.'
    },
    fr: {
      title: 'Processus d\'implémentation: De l\'audit à la validation | C&C CookieComply',
      description: 'Notre approche systématique en 5 étapes assure un déploiement CMP transparent avec une perturbation minimale. Analyse juridique, configuration CMP, intégration GTM, déploiement en production et analyse de l\'impact sur les données.'
    },
    es: {
      title: 'Proceso de implementación: Del auditoría a la validación | C&C CookieComply',
      description: 'Nuestro enfoque sistemático de 5 pasos asegura un despliegue CMP sin problemas con mínima interrupción. Análisis legal, configuración CMP, integración GTM, despliegue en producción y análisis de impacto de datos.'
    }
  }
  
  const currentMeta = metaData[locale as keyof typeof metaData] || metaData.en
  const canonicalUrl = `https://www.cashandclash.com/${locale}/process/`
  
  return {
    title: currentMeta.title,
    description: currentMeta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'en': 'https://www.cashandclash.com/en/process/',
        'de': 'https://www.cashandclash.com/de/process/',
        'fr': 'https://www.cashandclash.com/fr/process/',
        'es': 'https://www.cashandclash.com/es/process/',
        'x-default': 'https://www.cashandclash.com/en/process/'
      }
    },
    openGraph: {
      title: currentMeta.title,
      description: currentMeta.description,
      url: canonicalUrl,
      type: 'website',
      locale: locale,
      alternateLocale: ['en', 'de', 'fr', 'es'].filter(l => l !== locale)
    },
    twitter: {
      card: 'summary_large_image',
      title: currentMeta.title,
      description: currentMeta.description
    }
  }
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale as 'en' | 'de' | 'fr' | 'es')
  
  return (
    <>
      <StructuredData />
      <ProcessStructuredData locale={locale} />
      <div className="min-h-screen bg-white">
        <Navbar locale={locale} />
        
        {/* Spacing for fixed navigation */}
        <div className="pt-20"></div>
      
        <main>
          <Process content={content.process} />
        </main>
        
        <Footer content={content} locale={locale} />
      </div>
      <CookieConsent locale={locale} />
    </>
  )
}
