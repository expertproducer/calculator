import React from 'react'

interface FAQStructuredDataProps {
  locale: string
  faqItems: Array<{
    question: string
    answer: string
  }>
}

export default function FAQStructuredData({ locale, faqItems }: FAQStructuredDataProps) {
  const baseUrl = 'https://www.cashandclash.com'
  const currentUrl = `${baseUrl}/${locale}/faq/`
  
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "name": locale === 'en' ? "GDPR Compliance & CMP Implementation FAQ" : 
            locale === 'de' ? "DSGVO-Compliance & CMP Implementierung FAQ" :
            "FAQ sur la conformité RGPD & l'implémentation CMP",
    "description": locale === 'en' ? "Frequently asked questions about GDPR compliance, CMP implementation, and cookie consent tools" :
                  locale === 'de' ? "Häufig gestellte Fragen zu DSGVO-Compliance, CMP-Implementierung und Cookie-Zustimmungstools" :
                  "Questions fréquemment posées sur la conformité RGPD, l'implémentation CMP et les outils de consentement aux cookies",
    "mainEntity": faqItems.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.replace(/\*\*(.*?)\*\*/g, '$1').replace(/`([^`]+)`/g, '$1') // Remove markdown for JSON-LD
      }
    })),
    "provider": {
      "@type": "Organization",
      "name": "CookieComply",
      "url": baseUrl
    },
    "url": currentUrl
  }

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  )
}
