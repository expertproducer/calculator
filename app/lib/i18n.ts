export type Locale = 'en' | 'de' | 'fr'

// Simple content loading - in real app you'd load from JSON files
export function getContent(locale: Locale) {
  const content = {
    en: {
      hero: {
        title: 'C&C CookieComply — GDPR CMP Setup & Cookie Banner Fixes',
        subtitle: 'We set up CMP, fix cookie banners, block trackers before consent, and log consent properly.',
        ctaPrimary: 'Fix my banner',
        ctaSecondary: 'Free quick check'
      },
      problem: {
        title: 'Common GDPR Compliance Issues',
        points: [
          'Non-compliant cookie banners',
          'Scripts loading before consent',
          'Missing consent logs',
          'Poor user experience'
        ]
      },
      services: {
        title: 'Our Services',
        items: [
          'CMP setup (Cookiebot, Iubenda, Usercentrics, Termly)',
          'Cookie banner fixes',
          'Script blocking before consent',
          'GTM integration',
          'Multilingual support',
          'Policy pages',
          'Consent logging',
          'QA & validation'
        ]
      },
      process: {
        title: 'How We Work',
        steps: [
          'Site audit & inventory',
          'CMP architecture design',
          'Technical setup',
          'Banner customization',
          'Testing & validation'
        ]
      },
      deliverables: {
        title: 'What You Get',
        items: [
          'Fully configured CMP',
          'Compliant cookie banner',
          'Preference center',
          'Policy pages',
          'Maintenance guide'
        ]
      },
      benefits: {
        title: 'Why Choose Us',
        items: [
          'End-to-end solution',
          'No dark patterns',
          'Proper GTM integration',
          'Multilingual support',
          'Consent logs & exports'
        ]
      },
      cases: {
        title: 'Case Studies',
        cards: [
          {
            title: 'E-commerce (DE)',
            before: 'Accept-only banner, scripts loaded immediately',
            after: 'Accept/Decline/Preferences, strict blocking, improved conversion'
          },
          {
            title: 'Media (FR)',
            before: 'Third-party cookies before consent, no preference center',
            after: 'Auto-blocking, preference center, FR/EN localization'
          },
          {
            title: 'SaaS (EU)',
            before: 'Inconsistent logic across subdomains',
            after: 'Unified CMP, consistent categories, centralized logging'
          }
        ]
      },
      pricing: {
        title: 'Pricing Plans',
        plans: [
          {
            name: 'Basic',
            features: ['Banner fix', 'Copy optimization', 'Basic blocking']
          },
          {
            name: 'Pro',
            features: ['CMP setup', 'GTM integration', 'Scan report', 'Policy pages']
          },
          {
            name: 'Business',
            features: ['Multi-domain', 'Migration', 'Custom events', 'White-label report']
          }
        ],
        note: 'Pricing & timelines on request (depend on stack, traffic, regions)'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'How is a CMP different from a simple banner?',
            answer: 'A CMP records lawful consent per category and controls script loading via consent events; a simple banner won\'t ensure proper pre-consent blocking.'
          },
          {
            question: 'Can we keep our current banner design?',
            answer: 'Yes, we adapt CMP widgets to your brand guidelines.'
          },
          {
            question: 'Do you support GPC / Do Not Sell?',
            answer: 'Where supported by the selected CMP and jurisdiction.'
          }
        ]
      },
      contact: {
        title: 'Get Started',
        subtitle: 'Tell us about your project',
        fields: {
          name: 'Name',
          email: 'Email',
          url: 'Website URL',
          stack: 'Tech Stack',
          regions: 'Target Regions',
          languages: 'Languages',
          cmp: 'Preferred CMP',
          integrations: 'Integrations',
          message: 'Message'
        },
        submit: 'Send Request'
      },
      footer: {
        copyright: '© 2024 C&C CookieComply by Cash & Clash',
        links: ['Privacy Policy', 'Cookie Policy', 'Contact']
      }
    },
    de: {
      // German translations (simplified for now)
      hero: {
        title: 'C&C CookieComply — GDPR CMP Einrichtung & Cookie-Banner Reparaturen',
        subtitle: 'Wir richten CMP ein, reparieren Cookie-Banner und blockieren Tracker vor der Zustimmung.',
        ctaPrimary: 'Meinen Banner reparieren',
        ctaSecondary: 'Kostenlose Schnellprüfung'
      },
      // ... other sections would have German translations
    },
    fr: {
      // French translations (simplified for now)
      hero: {
        title: 'C&C CookieComply — Configuration CMP GDPR & Corrections de Bannières',
        subtitle: 'Nous configurons CMP et corrigeons les bannières de cookies.',
        ctaPrimary: 'Corriger ma bannière',
        ctaSecondary: 'Vérification gratuite'
      },
      // ... other sections would have French translations
    }
  }
  
  return content[locale] || content.en
}

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/de')) return 'de'
  if (pathname.startsWith('/fr')) return 'fr'
  return 'en'
}
