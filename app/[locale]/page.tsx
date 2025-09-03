import { getContent } from '@/lib/i18n'
import Hero from '@/components/Hero'
import { 
  WhyImportant, 
  Benefits, 
  Platforms, 
  CaseStudies, 
  EnhancedTestimonials,
  UrgencyBanner,
  Contact, 
  FinalCTA, 
  Footer, 
  Navbar,
  CompactServiceCalculator,
  CompactGDPRChecklist
} from '@/components/AllComponents'
import StructuredData from '@/components/StructuredData'
import CookieConsent from '@/components/CookieConsent'



export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale as 'en' | 'de' | 'fr' | 'es')
  
  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-white">
        <Navbar locale={locale} />
      
      <main>
        <section id="hero">
          <Hero content={{...content.hero, problem: content.problem}} locale={locale} />
        </section>
        
        {/* Urgency Banner - New */}
        <section id="urgency">
          <UrgencyBanner content={content.urgency} locale={locale} />
        </section>
        
        {content.whyImportant && (
          <section id="why-important">
            <WhyImportant content={content.whyImportant} />
          </section>
        )}
        
        <section id="benefits">
          <Benefits content={content.benefits} />
        </section>
        
        {content.platforms && (
          <section id="platforms">
            <Platforms content={content.platforms} />
          </section>
        )}
        
        <section id="case-studies">
          <CaseStudies content={content.cases} locale={locale} />
        </section>
        
        {/* Interactive Tools - Side by Side */}
        <section id="interactive-tools" className="py-16 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Interactive Tools</h2>
              <p className="text-xl text-gray-600">Calculate costs and check your compliance status</p>
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
