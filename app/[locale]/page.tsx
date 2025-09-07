import { getContent } from '@/lib/i18n'
import { 
  EnhancedTestimonials,
  Contact, 
  FinalCTA, 
  Footer, 
  Navbar,
  EuComplianceMap,
  EuGdprCharts,
  CompactServiceCalculator,
  CompactGDPRChecklist,
  UnifiedHeroSection,
  FinesLinks
} from '@/components/AllComponents'
import StructuredData from '@/components/StructuredData'
import CookieConsent from '@/components/CookieConsent'
import rawMapData from '../../eu_gdpr_map_v2_extended.json'

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale as 'en' | 'de' | 'fr' | 'es')
  const ISO2_TO_ISO3: Record<string, string> = {
    AT: 'AUT', BE: 'BEL', BG: 'BGR', HR: 'HRV', CY: 'CYP', CZ: 'CZE', DK: 'DNK',
    EE: 'EST', FI: 'FIN', FR: 'FRA', DE: 'DEU', GR: 'GRC', HU: 'HUN', IE: 'IRL',
    IT: 'ITA', LV: 'LVA', LT: 'LTU', LU: 'LUX', MT: 'MLT', NL: 'NLD', PL: 'POL',
    PT: 'PRT', RO: 'ROU', SK: 'SVK', SI: 'SVN', ES: 'ESP', SE: 'SWE', CH: 'CHE'
  }
  const countriesFromJson = (rawMapData as Array<{ code: string; sitesCount: number | null; consentRate?: number | null; regulator?: string | null; fineRisk?: string | null; violationsPattern?: string[] | null; marketDensity?: number | null }> )
    .map(item => ({
      code: ISO2_TO_ISO3[item.code] || item.code,
      sitesCount: item.sitesCount ?? 0,
      consentRate: (item.consentRate ?? undefined) as number | undefined,
      violationsFixed: undefined,
      name: undefined as any,
      regulator: item.regulator ?? undefined,
      fineRisk: item.fineRisk ?? undefined,
      violationsPattern: item.violationsPattern ?? undefined,
      marketDensity: item.marketDensity ?? undefined
    }))
    .filter(c => c.code && c.code.length === 3)
  
  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-white">
        <Navbar locale={locale} />
      
      <main>
        {/* Unified Hero Section - All content from banner to calculator */
        }
        <UnifiedHeroSection content={{
          hero: content.hero,
          urgency: content.urgency,
          heroBanner: content.heroBanner,
          whyImportant: content.whyImportant,
          benefits: content.benefits,
          platforms: content.platforms,
          cases: content.cases,
          deliverables: content.deliverables
        }} locale={locale} />

        {/* Second block with links to real fines and cases */}
        <FinesLinks content={content.finesLinks} />
        
        {/* Interactive Tools - Side by Side */}
        <section id="interactive-tools" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">{content.tools?.title}</h2>
              <p className="text-lg text-gray-600 leading-relaxed">{content.tools?.subtitle}</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <CompactServiceCalculator content={{
                title: content.calculator?.title,
                subtitle: content.calculator?.subtitle,
                total: content.calculator?.results?.total,
                contact: content.calculator?.results?.contact
              }} locale={locale} />
              <CompactGDPRChecklist content={{
                title: content.checklist?.title,
                subtitle: content.checklist?.subtitle,
                progress: content.checklist?.progress,
                completed: content.checklist?.completed,
                getHelp: content.checklist?.cta?.button
              }} locale={locale} />
            </div>
          </div>
        </section>
        
        {/* Enhanced Testimonials with Photos & Metrics */}
        <EnhancedTestimonials content={content.testimonials} />
        
        {/* EU Compliance Map */}
        <EuComplianceMap title={content.map?.title} subtitle={content.map?.subtitle} countries={countriesFromJson as any} />

        {/* GDPR Charts */}
        <EuGdprCharts />

        <section id="contact">
          <Contact content={content.contact} />
        </section>
        
        <section id="final-cta">
          <FinalCTA content={content.finalCTA} locale={locale} />
        </section>
      </main>
      
      <Footer content={content} locale={locale} />
      </div>
      <CookieConsent locale={locale} />
    </>
  )
}
