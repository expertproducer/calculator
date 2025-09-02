import { getContent } from '../../../lib/i18n'
import { Contact } from '../../../components/AllComponents'
import { Navbar, Footer } from '../../../components/AllComponents'
import StructuredData from '../../../components/StructuredData'
import CookieConsent from '../../../components/CookieConsent'

export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' },
    { locale: 'es' }
  ]
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const content = await getContent(locale as 'en' | 'de' | 'fr' | 'es')
  
  return (
    <>
      <StructuredData />
      <div className="min-h-screen bg-white">
        <Navbar locale={locale} />
        
        {/* Spacing for fixed navigation */}
        <div className="pt-20"></div>
      
        <main>
          <Contact content={content.contact} />
        </main>
        
        <Footer content={content} locale={locale} />
      </div>
      <CookieConsent locale={locale} />
    </>
  )
}
