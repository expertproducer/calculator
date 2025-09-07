import React from 'react'

interface PricingStructuredDataProps {
  locale: string
}

export default function PricingStructuredData({ locale }: PricingStructuredDataProps) {
  const baseUrl = 'https://www.cashandclash.com'
  const currentUrl = `${baseUrl}/${locale}/pricing/`
  
  const pricingSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": locale === 'en' ? "CMP Implementation Services - Transparent Pricing" : 
            locale === 'de' ? "CMP Implementierung Services - Transparente Preise" :
            "Services d'implémentation CMP - Prix transparents",
    "description": locale === 'en' ? "Professional CMP implementation with transparent pricing model. We charge only for implementation, you choose your preferred CMP service plan." :
                  locale === 'de' ? "Professionelle CMP-Implementierung mit transparentem Preismodell. Wir berechnen nur die Implementierung, Sie wählen Ihren bevorzugten CMP-Serviceplan." :
                  "Implémentation CMP professionnelle avec un modèle de prix transparent. Nous facturons uniquement l'implémentation, vous choisissez votre plan de service CMP préféré.",
    "provider": {
      "@type": "Organization",
      "name": "CookieComply",
      "url": baseUrl
    },
    "url": currentUrl,
    "offers": [
      {
        "@type": "Offer",
        "name": locale === 'en' ? "Basic Implementation Package" : 
                locale === 'de' ? "Basic Implementierungspaket" : "Forfait d'implémentation de base",
        "description": locale === 'en' ? "Banner fix, copy optimization, basic blocking" :
                      locale === 'de' ? "Banner-Reparatur, Kopie-Optimierung, grundlegende Blockierung" :
                      "Correction de bannière, optimisation de copie, blocage de base",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": locale === 'en' ? "Pro Implementation Package" : 
                locale === 'de' ? "Pro Implementierungspaket" : "Forfait d'implémentation Pro",
        "description": locale === 'en' ? "CMP setup, GTM integration, scan report, policy pages" :
                      locale === 'de' ? "CMP-Einrichtung, GTM-Integration, Scan-Bericht, Richtlinien-Seiten" :
                      "Configuration CMP, intégration GTM, rapport de scan, pages de politique",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": locale === 'en' ? "Business Implementation Package" : 
                locale === 'de' ? "Business Implementierungspaket" : "Forfait d'implémentation Business",
        "description": locale === 'en' ? "Multi-domain, migration, custom events, white-label report" :
                      locale === 'de' ? "Multi-Domain, Migration, benutzerdefinierte Events, White-Label-Bericht" :
                      "Multi-domaines, migration, événements personnalisés, rapport white-label",
        "availability": "https://schema.org/InStock"
      }
    ],
    "areaServed": ["EU", "EEA", "Switzerland"],
    "serviceType": "CMP Implementation & GDPR Compliance"
  }

  return (
    <>
      <script 
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }}
      />
    </>
  )
}
