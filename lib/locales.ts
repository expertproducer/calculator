export const LOCALES = ["en", "de", "fr", "es"] as const;
export type Locale = typeof LOCALES[number];
export const DEFAULT_LOCALE: Locale = "en";

// Main domain and subdomain
export const BASE_URL = "https://cashandclash.com";
export const GDPR_SUBDOMAIN = "https://cashandclash.com";

// For building hreflang/canonical by slug
export function pathFor(locale: Locale, slug = "/") {
  const norm = slug.startsWith("/") ? slug : `/${slug}`;
  return locale === "en" ? `${norm}` : `/${locale}${norm}`;
}

export function languagesAlternates(slug = "/") {
  return {
    en: pathFor("en", slug),
    de: pathFor("de", slug),
    fr: pathFor("fr", slug),
    es: pathFor("es", slug),
  };
}

export function canonicalFor(locale: Locale, slug = "/") {
  return `${GDPR_SUBDOMAIN}${languagesAlternates(slug)[locale]}`;
}

// Full URLs for sitemap
export function fullUrlFor(locale: Locale, slug = "/") {
  return `${GDPR_SUBDOMAIN}${languagesAlternates(slug)[locale]}`;
}

// Metadata for different pages
export const PAGE_METADATA = {
  home: {
    en: {
      title: "Professional GDPR Compliance & CMP Setup | CookieComply",
      description: "Expert GDPR compliance services: CMP setup, cookie banner fixes, consent tracking & privacy policy creation. Get compliant fast with our proven solutions.",
      keywords: ["GDPR compliance", "CMP setup", "cookie banner", "consent management", "privacy compliance", "CCPA compliance", "cookie audit", "data protection"]
    },
    de: {
      title: "Professionelle DSGVO-Compliance & CMP-Einrichtung | CookieComply", 
      description: "Experten-DSGVO-Compliance-Services: CMP-Einrichtung, Cookie-Banner-Reparaturen, Consent-Tracking & Datenschutzerklärung. Schnell compliant werden mit bewährten Lösungen.",
      keywords: ["DSGVO Compliance", "CMP Einrichtung", "Cookie-Banner", "Consent Management", "Datenschutz-Compliance", "Cookie Audit", "Datenschutz", "GDPR"]
    },
    fr: {
      title: "Conformité RGPD Professionnelle & Configuration CMP | CookieComply",
      description: "Services experts de conformité RGPD : configuration CMP, réparation bannières cookies, tracking consentement & politique de confidentialité. Devenez conforme rapidement.",
      keywords: ["Conformité RGPD", "Configuration CMP", "Bannière cookies", "Gestion consentement", "Conformité confidentialité", "Audit cookies", "Protection données", "GDPR"]
    },
    es: {
      title: "Cumplimiento RGPD Profesional & Configuración CMP | CookieComply",
      description: "Servicios expertos de cumplimiento RGPD: configuración CMP, reparación banners cookies, seguimiento consentimiento & política privacidad. Cumpla rápidamente.",
      keywords: ["Cumplimiento RGPD", "Configuración CMP", "Banner cookies", "Gestión consentimiento", "Cumplimiento privacidad", "Auditoría cookies", "Protección datos", "GDPR"]
    }
  },
  blog: {
    en: {
      title: "GDPR & Privacy Compliance Blog | Expert Insights & Updates",
      description: "Stay updated with the latest GDPR compliance insights, CMP comparisons, cookie consent best practices, and privacy regulation updates from our experts.",
      keywords: ["GDPR blog", "privacy compliance", "cookie consent", "CMP comparison", "data protection updates", "privacy regulations"]
    },
    de: {
      title: "DSGVO & Datenschutz-Compliance Blog | Experten-Einblicke & Updates",
      description: "Bleiben Sie auf dem Laufenden mit den neuesten DSGVO-Compliance-Einblicken, CMP-Vergleichen, Cookie-Consent-Best-Practices und Datenschutz-Updates unserer Experten.",
      keywords: ["DSGVO Blog", "Datenschutz-Compliance", "Cookie-Consent", "CMP-Vergleich", "Datenschutz-Updates", "Datenschutzbestimmungen"]
    },
    fr: {
      title: "Blog Conformité RGPD & Confidentialité | Insights & Mises à jour",
      description: "Restez informé avec les dernières insights de conformité RGPD, comparaisons CMP, meilleures pratiques de consentement cookies et mises à jour réglementaires.",
      keywords: ["Blog RGPD", "conformité confidentialité", "consentement cookies", "comparaison CMP", "mises à jour protection données", "réglementations confidentialité"]
    },
    es: {
      title: "Blog Cumplimiento RGPD & Privacidad | Insights & Actualizaciones",
      description: "Manténgase actualizado con los últimos insights de cumplimiento RGPD, comparaciones CMP, mejores prácticas de consentimiento cookies y actualizaciones regulatorias.",
      keywords: ["Blog RGPD", "cumplimiento privacidad", "consentimiento cookies", "comparación CMP", "actualizaciones protección datos", "regulaciones privacidad"]
    }
  },
  contact: {
    en: {
      title: "Contact GDPR Compliance Experts | Free Consultation | CookieComply",
      description: "Get expert GDPR compliance help. Free consultation, custom solutions, and professional implementation. Contact our team for immediate assistance with your privacy compliance needs.",
      keywords: ["GDPR consultation", "privacy compliance help", "CMP implementation", "cookie compliance", "contact experts", "free consultation"]
    },
    de: {
      title: "DSGVO-Compliance-Experten kontaktieren | Kostenlose Beratung | CookieComply",
      description: "Holen Sie sich professionelle DSGVO-Compliance-Hilfe. Kostenlose Beratung, maßgeschneiderte Lösungen und professionelle Umsetzung. Kontaktieren Sie unser Team für sofortige Hilfe.",
      keywords: ["DSGVO-Beratung", "Datenschutz-Compliance-Hilfe", "CMP-Implementierung", "Cookie-Compliance", "Experten kontaktieren", "kostenlose Beratung"]
    },
    fr: {
      title: "Contacter les Experts Conformité RGPD | Consultation Gratuite | CookieComply",
      description: "Obtenez une aide experte en conformité RGPD. Consultation gratuite, solutions personnalisées et implémentation professionnelle. Contactez notre équipe pour une assistance immédiate.",
      keywords: ["consultation RGPD", "aide conformité confidentialité", "implémentation CMP", "conformité cookies", "contacter experts", "consultation gratuite"]
    },
    es: {
      title: "Contactar Expertos Cumplimiento RGPD | Consulta Gratuita | CookieComply",
      description: "Obtenga ayuda experta en cumplimiento RGPD. Consulta gratuita, soluciones personalizadas e implementación profesional. Contacte a nuestro equipo para asistencia inmediata.",
      keywords: ["consulta RGPD", "ayuda cumplimiento privacidad", "implementación CMP", "cumplimiento cookies", "contactar expertos", "consulta gratuita"]
    }
  },
  services: {
    en: {
      title: "GDPR Compliance Services | CMP Setup, Audits & Implementation",
      description: "Complete GDPR compliance services: website audits, CMP installation, cookie banner setup, consent logging, staff training, and ongoing monitoring. Get compliant today.",
      keywords: ["GDPR services", "CMP setup", "cookie audit", "compliance implementation", "consent management", "privacy services"]
    },
    de: {
      title: "DSGVO-Compliance-Services | CMP-Setup, Audits & Implementierung",
      description: "Vollständige DSGVO-Compliance-Services: Website-Audits, CMP-Installation, Cookie-Banner-Setup, Consent-Protokollierung, Mitarbeiterschulung und laufende Überwachung.",
      keywords: ["DSGVO-Services", "CMP-Setup", "Cookie-Audit", "Compliance-Implementierung", "Consent-Management", "Datenschutz-Services"]
    },
    fr: {
      title: "Services Conformité RGPD | Configuration CMP, Audits & Implémentation",
      description: "Services complets de conformité RGPD : audits de sites web, installation CMP, configuration bannière cookies, logging consentement, formation personnel et monitoring continu.",
      keywords: ["services RGPD", "configuration CMP", "audit cookies", "implémentation conformité", "gestion consentement", "services confidentialité"]
    },
    es: {
      title: "Servicios Cumplimiento RGPD | Configuración CMP, Auditorías e Implementación",
      description: "Servicios completos de cumplimiento RGPD: auditorías web, instalación CMP, configuración banner cookies, registro consentimiento, capacitación personal y monitoreo continuo.",
      keywords: ["servicios RGPD", "configuración CMP", "auditoría cookies", "implementación cumplimiento", "gestión consentimiento", "servicios privacidad"]
    }
  },
  cases: {
    en: {
      title: "GDPR Compliance Success Stories | Client Case Studies & Results",
      description: "Real client success stories: see how we helped businesses achieve GDPR compliance, reduce risks, and improve user trust with our proven solutions.",
      keywords: ["GDPR case studies", "compliance success stories", "client results", "GDPR implementation", "privacy compliance examples"]
    },
    de: {
      title: "DSGVO-Compliance Erfolgsgeschichten | Kunden-Fallstudien & Ergebnisse",
      description: "Echte Kunden-Erfolgsgeschichten: Sehen Sie, wie wir Unternehmen dabei geholfen haben, DSGVO-Compliance zu erreichen, Risiken zu reduzieren und Benutzervertrauen zu verbessern.",
      keywords: ["DSGVO-Fallstudien", "Compliance-Erfolgsgeschichten", "Kundenergebnisse", "DSGVO-Implementierung", "Datenschutz-Compliance-Beispiele"]
    },
    fr: {
      title: "Histoires de Succès Conformité RGPD | Études de Cas Clients & Résultats",
      description: "Vraies histoires de succès clients : voyez comment nous avons aidé les entreprises à atteindre la conformité RGPD, réduire les risques et améliorer la confiance utilisateur.",
      keywords: ["études de cas RGPD", "histoires de succès conformité", "résultats clients", "implémentation RGPD", "exemples conformité confidentialité"]
    },
    es: {
      title: "Historias de Éxito Cumplimiento RGPD | Casos de Estudio Clientes y Resultados",
      description: "Historias reales de éxito de clientes: vea cómo ayudamos a empresas a lograr cumplimiento RGPD, reducir riesgos y mejorar la confianza del usuario.",
      keywords: ["casos de estudio RGPD", "historias de éxito cumplimiento", "resultados clientes", "implementación RGPD", "ejemplos cumplimiento privacidad"]
    }
  },
  privacy: {
    en: {
      title: "Privacy Policy — CookieComply",
      description: "Our privacy policy explains how we collect, use, and protect your personal information in compliance with GDPR regulations."
    },
    de: {
      title: "Datenschutzerklärung — CookieComply",
      description: "Unsere Datenschutzerklärung erklärt, wie wir Ihre persönlichen Daten in Übereinstimmung mit den GDPR-Vorschriften sammeln, verwenden und schützen."
    },
    fr: {
      title: "Politique de Confidentialité — CookieComply",
      description: "Notre politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles conformément aux réglementations GDPR."
    },
    es: {
      title: "Política de Privacidad — CookieComply",
      description: "Nuestra política de privacidad explica cómo recopilamos, usamos y protegemos su información personal en cumplimiento con las regulaciones RGPD."
    }
  },
  cookies: {
    en: {
      title: "Cookie Policy — CookieComply",
      description: "Learn about how we use cookies and similar technologies on our website, and how you can manage your preferences."
    },
    de: {
      title: "Cookie-Richtlinie — CookieComply",
      description: "Erfahren Sie, wie wir Cookies und ähnliche Technologien auf unserer Website verwenden und wie Sie Ihre Einstellungen verwalten können."
    },
    fr: {
      title: "Politique des Cookies — CookieComply",
      description: "Découvrez comment nous utilisons les cookies et technologies similaires sur notre site et comment vous pouvez gérer vos préférences."
    },
    es: {
      title: "Política de Cookies — CookieComply",
      description: "Aprenda sobre cómo usamos cookies y tecnologías similares en nuestro sitio web, y cómo puede gestionar sus preferencias."
    }
  }
};
