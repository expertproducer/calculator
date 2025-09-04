import { getContent } from '@/lib/i18n'
import { 
  EnhancedTestimonials,
  Contact, 
  FinalCTA, 
  Footer, 
  Navbar,
  EuComplianceMap,
  CompactServiceCalculator,
  CompactGDPRChecklist,
  UnifiedHeroSection
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
        {/* Unified Hero Section - All content from banner to calculator */}
        <UnifiedHeroSection content={{
          hero: content.hero,
          urgency: content.urgency,
          whyImportant: content.whyImportant,
          benefits: content.benefits,
          platforms: content.platforms,
          cases: content.cases
        }} locale={locale} />
        
        {/* Interactive Tools - Side by Side */}
        <section id="interactive-tools" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">Interactive Tools</h2>
              <p className="text-lg text-gray-600 leading-relaxed">Calculate costs and check your compliance status</p>
            </div>
            <div className="grid lg:grid-cols-2 gap-8">
              <CompactServiceCalculator content={{
                title: content.calculator?.title || 'Service Calculator',
                subtitle: content.calculator?.subtitle || 'Select services and get instant pricing',
                total: content.calculator?.results?.total || 'Total Cost',
                contact: content.calculator?.results?.contact || 'Get Quote'
              }} />
              <CompactGDPRChecklist content={{
                title: content.checklist?.title || 'GDPR Checklist',
                subtitle: content.checklist?.subtitle || 'Check your compliance status',
                progress: content.checklist?.progress || 'Progress',
                completed: content.checklist?.completed || 'Completed',
                getHelp: content.checklist?.cta?.button || 'Get Help'
              }} locale={locale} />
            </div>
          </div>
        </section>
        
        {/* Enhanced Testimonials with Photos & Metrics */}
        <EnhancedTestimonials content={content.testimonials} />
        
        {/* EU Compliance Map */}
        <EuComplianceMap title="Hover a country" subtitle="to see info" countries={countriesFromJson as any} />

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
