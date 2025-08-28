import { Problem, Services, Process, Deliverables, Benefits, Cases, FAQ, Footer, Navbar } from '@/components/AllComponents'
import { getContent } from '@/lib/i18n'
import StructuredData from '@/components/StructuredData'
import Hero from '@/components/Hero'
import Pricing from '@/components/Pricing'
import Contact from '@/components/Contact'
import CookieConsent from '@/components/CookieConsent'

// Генерируем статические страницы для всех локалей
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const localeTyped = (locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : 'en') as 'en' | 'de' | 'fr'
  const content = getContent(localeTyped)

  return (
    <div>
      <StructuredData locale={localeTyped} />
      <Navbar locale={locale} />
      <Hero content={{
        title: content.hero.title,
        subtitle: content.hero.subtitle,
        cta: {
          primary: (content.hero as any).ctaPrimary,
          secondary: (content.hero as any).ctaSecondary
        }
      }} />
      <Problem content={content.problem} />
      <Services content={content.services} />
      <Process content={content.process} />
      <Deliverables content={content.deliverables} />
      <Benefits content={content.benefits} />
      <Cases content={content.cases} />
      <Pricing content={content.pricing} />
      <FAQ content={content.faq} />
      <Contact content={content.contact} locale={locale} />
      <Footer content={content.footer} locale={locale} />
      <CookieConsent locale={locale} />
    </div>
  )
}
