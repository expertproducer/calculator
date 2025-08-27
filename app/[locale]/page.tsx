import { getContent } from '../lib/i18n'
import Hero from '../components/Hero'
import { Problem, Services, Process, Deliverables, Benefits, Cases, Pricing, FAQ, Contact, Footer, Navbar } from '../components/AllComponents'

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
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar locale={locale} />
      
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
  )
}
