import { getContent } from '../lib/i18n'
import Hero from '../components/Hero'
import { Problem, Services, Process, Deliverables, Benefits, Cases, Pricing, FAQ, Contact, Footer, Navbar } from '../components/AllComponents'
import StructuredData from '../components/StructuredData'
import CookieConsent from '../components/CookieConsent'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = getContent(locale as 'en' | 'de' | 'fr')
  
  return (
    <>
      <StructuredData locale={locale as 'en' | 'de' | 'fr'} />
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <Navbar locale={locale} />
        
        {/* Отступ для фиксированной навигации */}
        <div className="pt-20"></div>
      
      <main>
        <section id="hero">
          <Hero content={content.hero} />
        </section>
        
        <section id="problem">
          <Problem content={content.problem} />
        </section>
        
        <section id="services">
          <Services content={content.services} />
        </section>
        
        <section id="process">
          <Process content={content.process} />
        </section>
        
        <section id="deliverables">
          <Deliverables content={content.deliverables} />
        </section>
        
        <section id="benefits">
          <Benefits content={content.benefits} />
        </section>
        
        <section id="cases">
          <Cases content={content.cases} />
        </section>
        
        <section id="pricing">
          <Pricing content={content.pricing} />
        </section>
        
        <section id="faq">
          <FAQ content={content.faq} />
        </section>
        
        <section id="contact">
          <Contact content={content.contact} locale={locale} />
        </section>
      </main>
      
      <Footer content={content.footer} locale={locale} />
      </div>
      <CookieConsent />
    </>
  )
}
