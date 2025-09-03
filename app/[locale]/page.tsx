import { getContent } from '@/lib/i18n'
import Hero from '@/components/Hero'
import { 
  WhyImportant, 
  Benefits, 
  Platforms, 
  CaseStudies, 
  Testimonials,
  UrgencyBanner,
  Contact, 
  FinalCTA, 
  Footer, 
  Navbar,
  GDPRCalculator,
  GDPRChecklist
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
        
        {/* Interactive Calculator */}
        <section id="calculator" className="py-16 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <GDPRCalculator content={content.calculator} />
          </div>
        </section>
        
        {/* Interactive Checklist */}
        <section id="checklist">
          <GDPRChecklist content={content.checklist} locale={locale} />
        </section>
        
        {/* Testimonials - New */}
        <section id="testimonials">
          <Testimonials content={content.testimonials} />
        </section>
        
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
