import { getContent } from '../../lib/i18n'
import Hero from '../../components/Hero'
import { 
  WhyImportant, 
  Services, 
  Process, 
  Benefits, 
  Platforms, 
  CaseStudies, 
  Pricing, 
  FAQ, 
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
      <div className="min-h-screen bg-white">
        <Navbar locale={locale} />
        

      
      <main>
        <section id="hero">
          <Hero content={{...content.hero, problem: content.problem}} />
        </section>
        
        {content.whyImportant && (
          <section id="why-important">
            <WhyImportant content={content.whyImportant} />
          </section>
        )}
        
        <section id="services">
          <Services content={content.services} />
        </section>
        
        <section id="process">
          <Process content={content.process} />
        </section>
        
        <section id="benefits">
          <Benefits content={content.benefits} />
        </section>
        
        {content.platforms && (
          <section id="platforms">
            <Platforms content={content.platforms} />
          </section>
        )}
        
        <section id="case-studies">
          <CaseStudies content={content.cases} />
        </section>
        
        <section id="pricing">
          <Pricing content={content.pricing} />
        </section>
        
        <section id="faq">
          <FAQ content={content.faq} />
        </section>
        
        <section id="contact">
          <Contact content={content.contact} />
        </section>
        
        <section id="final-cta">
          <FinalCTA content={{ cta: content.hero.cta }} />
        </section>
      </main>
      
      <Footer content={content} locale={locale} />
      </div>
      <CookieConsent locale={locale} />
    </>
  )
}
