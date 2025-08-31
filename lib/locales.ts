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
      title: "CMP Setup\nC&C CookieComply",
      description: "We set up CMP, fix cookie banners, block trackers before consent, and log consent properly. Professional GDPR compliance solutions for businesses.",
      keywords: ["GDPR compliance", "CMP setup", "cookie banner", "consent management", "privacy compliance"]
    },
    de: {
      title: "CMP Einrichtung\nC&C CookieComply",
      description: "Wir richten CMP ein, reparieren Cookie-Banner, blockieren Tracker vor der Zustimmung und protokollieren die Zustimmung ordnungsgemäß. Professionelle DSGVO-Compliance-Lösungen für Unternehmen.",
      keywords: ["DSGVO Compliance", "CMP Einrichtung", "Cookie-Banner", "Consent Management", "Datenschutz-Compliance"]
    },
    fr: {
      title: "Mise en place CMP\nC&C CookieComply",
      description: "Nous configurons CMP, corrigeons les bannières de cookies, bloquons les trackers avant le consentement et enregistrons le consentement correctement. Solutions professionnelles de conformité RGPD pour les entreprises.",
      keywords: ["Conformité RGPD", "Configuration CMP", "Bannière cookies", "Gestion consentement", "Conformité confidentialité"]
    },
    es: {
      title: "Configuración CMP\nC&C CookieComply",
      description: "Configuramos CMP, arreglamos banners de cookies, bloqueamos rastreadores antes del consentimiento y registramos el consentimiento correctamente. Soluciones profesionales de cumplimiento RGPD para empresas.",
      keywords: ["Cumplimiento RGPD", "Configuración CMP", "Banner cookies", "Gestión consentimiento", "Cumplimiento privacidad"]
    }
  },
  privacy: {
    en: {
      title: "Privacy Policy — C&C CookieComply",
      description: "Our privacy policy explains how we collect, use, and protect your personal information in compliance with GDPR regulations."
    },
    de: {
      title: "Datenschutzerklärung — C&C CookieComply",
      description: "Unsere Datenschutzerklärung erklärt, wie wir Ihre persönlichen Daten in Übereinstimmung mit den GDPR-Vorschriften sammeln, verwenden und schützen."
    },
    fr: {
      title: "Politique de Confidentialité — C&C CookieComply",
      description: "Notre politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles conformément aux réglementations GDPR."
    },
    es: {
      title: "Política de Privacidad — C&C CookieComply",
      description: "Nuestra política de privacidad explica cómo recopilamos, usamos y protegemos su información personal en cumplimiento con las regulaciones RGPD."
    }
  },
  cookies: {
    en: {
      title: "Cookie Policy — C&C CookieComply",
      description: "Learn about how we use cookies and similar technologies on our website, and how you can manage your preferences."
    },
    de: {
      title: "Cookie-Richtlinie — C&C CookieComply",
      description: "Erfahren Sie, wie wir Cookies und ähnliche Technologien auf unserer Website verwenden und wie Sie Ihre Einstellungen verwalten können."
    },
    fr: {
      title: "Politique des Cookies — C&C CookieComply",
      description: "Découvrez comment nous utilisons les cookies et technologies similaires sur notre site et comment vous pouvez gérer vos préférences."
    },
    es: {
      title: "Política de Cookies — C&C CookieComply",
      description: "Aprenda sobre cómo usamos cookies y tecnologías similares en nuestro sitio web, y cómo puede gestionar sus preferencias."
    }
  }
};
