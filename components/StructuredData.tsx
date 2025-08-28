import { GDPR_SUBDOMAIN } from "@/lib/locales";

export default function StructuredData({ locale = "en" }: { locale?: "en"|"de"|"fr" }) {
  const t = {
    en: {
      serviceName: "GDPR Cookie Banner & CMP Setup Services",
      serviceDesc: "Consent Management implementation and compliant cookie banners for GDPR compliance.",
      faq: [
        ["How is a CMP different from a simple cookie banner?",
         "A CMP records consent by category and controls script loading before consent, ensuring GDPR compliance."],
        ["Can we keep our current banner design?",
         "Yes, we adapt CMP widgets to your brand guidelines while maintaining compliance."],
        ["What happens if we don't implement proper consent management?",
         "Non-compliance can result in fines up to €20 million or 4% of global annual revenue under GDPR."],
        ["How long does CMP implementation take?",
         "Typically 2-4 weeks depending on complexity and integrations required."],
        ["Do you provide ongoing support after implementation?",
         "Yes, we offer maintenance, updates, and compliance monitoring services."]
      ],
      url: `${GDPR_SUBDOMAIN}${locale==="en" ? "/" : `/${locale}/`}`,
      pricingUrl: `${GDPR_SUBDOMAIN}${locale==="en" ? "/#pricing" : `/${locale}/#pricing`}`,
    },
    de: {
      serviceName: "DSGVO Cookie-Banner & CMP Einrichtung Dienstleistungen",
      serviceDesc: "Consent-Management-Implementierung und konforme Banner für DSGVO-Compliance.",
      faq: [
        ["Worin unterscheidet sich ein CMP von einem einfachen Cookie-Banner?",
         "Ein CMP protokolliert Einwilligungen nach Kategorien und blockiert Skripte vor Consent, um DSGVO-Compliance zu gewährleisten."],
        ["Können wir unser Banner-Design behalten?",
         "Ja, wir passen CMP-Widgets an Ihr Brand-Design an und behalten dabei die Compliance bei."],
        ["Was passiert, wenn wir kein ordnungsgemäßes Consent-Management implementieren?",
         "Nicht-Compliance kann zu Bußgeldern von bis zu 20 Millionen Euro oder 4% des globalen Jahresumsatzes unter DSGVO führen."],
        ["Wie lange dauert die CMP-Implementierung?",
         "Typischerweise 2-4 Wochen, abhängig von der Komplexität und den erforderlichen Integrationen."],
        ["Bieten Sie laufende Unterstützung nach der Implementierung?",
         "Ja, wir bieten Wartung, Updates und Compliance-Überwachungsdienste an."]
      ],
      url: `${GDPR_SUBDOMAIN}/de/`,
      pricingUrl: `${GDPR_SUBDOMAIN}/de/#pricing`,
    },
    fr: {
      serviceName: "Services RGPD: Mise en place CMP & bannières cookies",
      serviceDesc: "Implémentation de Consent Management et bannières conformes pour la conformité RGPD.",
      faq: [
        ["Quelle différence entre CMP et simple bannière cookies ?",
         "Un CMP enregistre le consentement par catégorie et bloque les scripts avant le consentement, assurant la conformité RGPD."],
        ["Peut-on garder le design actuel ?",
         "Oui, nous adaptons les widgets CMP à votre charte tout en maintenant la conformité."],
        ["Que se passe-t-il si on n'implémente pas la gestion du consentement ?",
         "La non-conformité peut entraîner des amendes jusqu'à 20 millions d'euros ou 4% du chiffre d'affaires annuel mondial."],
        ["Combien de temps dure l'implémentation CMP ?",
         "Typiquement 2-4 semaines selon la complexité et les intégrations requises."],
        ["Offrez-vous un support continu après l'implémentation ?",
         "Oui, nous proposons maintenance, mises à jour et services de surveillance de conformité."]
      ],
      url: `${GDPR_SUBDOMAIN}/fr/`,
      pricingUrl: `${GDPR_SUBDOMAIN}/fr/#pricing`,
    },
  }[locale];

  const org = { 
    "@context":"https://schema.org", 
    "@type":"Organization",
    name:"C&C CookieComply", 
    url: GDPR_SUBDOMAIN, 
    logo:`${GDPR_SUBDOMAIN}/logo.svg`,
    description: "Professional GDPR compliance solutions for businesses",
    address: {
      "@type": "PostalAddress",
      addressCountry: "EU"
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: "contact@cashandclash.com"
    },
    sameAs: [
      "https://twitter.com/cashandclash",
      "https://linkedin.com/company/cashandclash"
    ]
  };

  const service = { 
    "@context":"https://schema.org", 
    "@type":"Service",
    name:t.serviceName, 
    description:t.serviceDesc, 
    url:t.url,
    provider:{ "@type":"Organization", name:"C&C CookieComply", url: GDPR_SUBDOMAIN },
    offers:{ "@type":"Offer", url:t.pricingUrl, availability:"https://schema.org/InStock" },
    areaServed: "EU",
    serviceType: "GDPR Compliance Consulting"
  };

  const faq = { 
    "@context":"https://schema.org", 
    "@type":"FAQPage",
    mainEntity: t.faq.map(([q,a]) => ({ 
      "@type":"Question", 
      name:q, 
      acceptedAnswer:{ "@type":"Answer", text:a }
    })) 
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(service) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }} />
    </>
  );
}
