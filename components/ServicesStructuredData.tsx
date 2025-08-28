interface ServicesStructuredDataProps {
  locale: string
  faq: Array<{
    question: string
    answer: string
  }>
}

export default function ServicesStructuredData({ locale, faq }: ServicesStructuredDataProps) {
  const baseUrl = 'https://www.cashandclash.com'
  const currentUrl = `${baseUrl}/${locale}/services/`
  
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": locale === 'en' ? "Cookie Consent & CMP Implementation — GDPR Services" : 
            locale === 'de' ? "Cookie-Zustimmung & CMP-Implementierung — DSGVO-Services" :
            locale === 'fr' ? "Consentement aux cookies & Implémentation CMP — Services RGPD" :
            "Внедрение CMP и настройка баннеров cookie (GDPR)",
    "provider": {
      "@type": "Organization",
      "name": "C&C CookieComply",
      "url": baseUrl
    },
    "areaServed": ["EU", "EEA", "Switzerland"],
    "url": currentUrl,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "url": `${currentUrl}#pricing`
    }
  }

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/\*\*(.*?)\*\*/g, '$1') // Убираем markdown форматирование для JSON-LD
      }
    }))
  }

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
