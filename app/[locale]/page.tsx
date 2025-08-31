import { getContent } from '../../lib/i18n'
import Hero from '../../components/Hero'
import { 
  WhyImportant, 
  // Services, 
  // Process, 
  Benefits, 
  Platforms, 
  CaseStudies, 
  Testimonials,
  UrgencyBanner,
  // Pricing, 
  // FAQ, 
  Contact, 
  FinalCTA, 
  Footer, 
  Navbar 
} from '../../components/AllComponents'
import StructuredData from '../../components/StructuredData'
import CookieConsent from '../../components/CookieConsent'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' },
    { locale: 'es' }
  ]
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as 'en' | 'de' | 'fr' | 'es')
  
  return (
    <>
      <StructuredData locale={locale as 'en' | 'de' | 'fr' | 'es'} />
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
        <Navbar locale={locale} />
        
        {/* Spacing for fixed navigation */}
        <div className="pt-20"></div>
      
      <main>
        <section id="hero">
          <Hero content={{...content.hero, problem: content.problem}} />
        </section>
        
        {/* Urgency Banner - New */}
        <section id="urgency">
          <UrgencyBanner content={content.urgency} />
        </section>
        
        {content.whyImportant && (
          <section id="why-important" className="bg-gradient-to-tl from-gray-50 via-white to-blue-50">
            <WhyImportant content={content.whyImportant} />
          </section>
        )}
        
        {/* <section id="services">
          <Services content={content.services} />
        </section>
        
        <section id="process">
          <Process content={content.process} />
        </section> */}
        
        <section id="benefits" className="bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <Benefits content={content.benefits} />
        </section>
        
        {content.platforms && (
          <section id="platforms" className="bg-gradient-to-tl from-gray-50 via-white to-blue-50">
            <Platforms content={content.platforms} />
          </section>
        )}
        
        <section id="case-studies" className="bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <CaseStudies content={content.cases} />
        </section>
        
        {/* Testimonials - New */}
        <section id="testimonials" className="bg-gradient-to-tl from-gray-50 via-white to-blue-50">
          <Testimonials content={content.testimonials} />
        </section>
        
        {/* <section id="pricing">
          <Pricing content={content.pricing} />
        </section>
        
        <section id="faq">
          <FAQ content={content.faq} />
        </section> */}
        
        <section id="contact" className="bg-gradient-to-br from-gray-50 via-white to-blue-50">
          <Contact content={content.contact} />
        </section>
        
        <section id="final-cta" className="bg-gradient-to-tl from-gray-50 via-white to-blue-50">
          <FinalCTA content={content.finalCTA} />
        </section>
      </main>
      
      <Footer content={content} locale={locale} />
      </div>
      <CookieConsent locale={locale} />
    </>
  )
}
