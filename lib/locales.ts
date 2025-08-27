export const LOCALES = ["en", "de", "fr"] as const;
export type Locale = typeof LOCALES[number];
export const DEFAULT_LOCALE: Locale = "en";

// Основной домен и поддомен
export const BASE_URL = "https://cashandclash.com";
export const GDPR_SUBDOMAIN = "https://gdpr.cashandclash.com";

// Для построения hreflang/каноникал по слагу
export function pathFor(locale: Locale, slug = "/") {
  const norm = slug.startsWith("/") ? slug : `/${slug}`;
  return locale === "en" ? `${norm}` : `/${locale}${norm}`;
}

export function languagesAlternates(slug = "/") {
  return {
    en: pathFor("en", slug),
    de: pathFor("de", slug),
    fr: pathFor("fr", slug),
  };
}

export function canonicalFor(locale: Locale, slug = "/") {
  return `${GDPR_SUBDOMAIN}${languagesAlternates(slug)[locale]}`;
}

// Полные URL для sitemap
export function fullUrlFor(locale: Locale, slug = "/") {
  return `${GDPR_SUBDOMAIN}${languagesAlternates(slug)[locale]}`;
}

// Метаданные для разных страниц
export const PAGE_METADATA = {
  home: {
    en: {
      title: "C&C CookieComply — GDPR CMP Setup & Cookie Banner Fixes",
      description: "We set up CMP, fix cookie banners, block trackers before consent, and log consent properly. Professional GDPR compliance solutions for businesses.",
      keywords: ["GDPR compliance", "CMP setup", "cookie banner", "consent management", "privacy compliance"]
    },
    de: {
      title: "C&C CookieComply — GDPR CMP Einrichtung & Cookie-Banner Reparaturen",
      description: "Wir richten CMP ein, reparieren Cookie-Banner, blockieren Tracker vor der Zustimmung und protokollieren die Zustimmung ordnungsgemäß. Professionelle GDPR-Compliance-Lösungen für Unternehmen.",
      keywords: ["GDPR Compliance", "CMP Einrichtung", "Cookie-Banner", "Consent Management", "Datenschutz-Compliance"]
    },
    fr: {
      title: "C&C CookieComply — Configuration CMP GDPR & Corrections de Bannières de Cookies",
      description: "Nous configurons CMP, corrigeons les bannières de cookies, bloquons les trackers avant le consentement et enregistrons le consentement correctement. Solutions professionnelles de conformité GDPR pour les entreprises.",
      keywords: ["Conformité GDPR", "Configuration CMP", "Bannière cookies", "Gestion consentement", "Conformité confidentialité"]
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
    }
  }
};
