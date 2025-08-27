import { getContent } from '@/lib/i18n'
import Hero from '@/components/Hero'
import Problem from '@/components/Problem'
import Services from '@/components/Services'
import Process from '@/components/Process'
import Deliverables from '@/components/Deliverables'
import Benefits from '@/components/Benefits'
import Cases from '@/components/Cases'
import Pricing from '@/components/Pricing'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}

export default function HomePage({ params }: { params: { locale: string } }) {
  const content = getContent(params.locale)
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Navbar locale={params.locale} />
      
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
          <Contact content={content.contact} locale={params.locale} />
        </section>
      </main>
      
      <Footer content={content.footer} locale={params.locale} />
    </div>
  )
}
