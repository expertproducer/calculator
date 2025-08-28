export type Locale = 'en' | 'de' | 'fr'

// Simple content loading - in real app you'd load from JSON files
export function getContent(locale: Locale) {
  const content = {
    en: {
      hero: {
        title: 'C&C CookieComply — GDPR CMP Setup & Cookie Banner Fixes',
        subtitle: 'We set up CMP, fix cookie banners, block trackers before consent, and log consent properly.',
        cta: {
          primary: 'Fix my banner',
          secondary: 'Free quick check'
        }
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
      hero: {
        title: 'C&C CookieComply — GDPR CMP Einrichtung & Cookie-Banner Reparaturen',
        subtitle: 'Wir richten CMP ein, reparieren Cookie-Banner und blockieren Tracker vor der Zustimmung.',
        cta: {
          primary: 'Meinen Banner reparieren',
          secondary: 'Kostenlose Schnellprüfung'
        }
      },
      problem: {
        title: 'Häufige GDPR-Compliance-Probleme',
        points: [
          'Nicht konforme Cookie-Banner',
          'Skripte werden vor der Zustimmung geladen',
          'Fehlende Zustimmungsprotokolle',
          'Schlechte Benutzererfahrung'
        ]
      },
      services: {
        title: 'Unsere Dienstleistungen',
        items: [
          'CMP-Einrichtung (Cookiebot, Iubenda, Usercentrics, Termly)',
          'Cookie-Banner-Reparaturen',
          'Skript-Blockierung vor der Zustimmung',
          'GTM-Integration',
          'Mehrsprachige Unterstützung',
          'Richtlinien-Seiten',
          'Zustimmungsprotokollierung',
          'QA & Validierung'
        ]
      },
      process: {
        title: 'Wie wir arbeiten',
        steps: [
          'Website-Audit & Bestandsaufnahme',
          'CMP-Architektur-Design',
          'Technische Einrichtung',
          'Banner-Anpassung',
          'Tests & Validierung'
        ]
      },
      deliverables: {
        title: 'Was Sie bekommen',
        items: [
          'Vollständig konfiguriertes CMP',
          'Konformes Cookie-Banner',
          'Einstellungszentrum',
          'Richtlinien-Seiten',
          'Wartungsanleitung'
        ]
      },
      benefits: {
        title: 'Warum uns wählen',
        items: [
          'End-to-End-Lösung',
          'Keine Dark Patterns',
          'Proper GTM-Integration',
          'Mehrsprachige Unterstützung',
          'Zustimmungsprotokolle & Exporte'
        ]
      },
      cases: {
        title: 'Fallstudien',
        cards: [
          {
            title: 'E-Commerce (DE)',
            before: 'Nur-Akzeptieren-Banner, Skripte sofort geladen',
            after: 'Akzeptieren/Ablehnen/Einstellungen, strikte Blockierung, verbesserte Konversion'
          },
          {
            title: 'Medien (DE)',
            before: 'Third-Party-Cookies vor Zustimmung, kein Einstellungszentrum',
            after: 'Auto-Blockierung, Einstellungszentrum, DE/EN-Lokalisierung'
          },
          {
            title: 'SaaS (EU)',
            before: 'Inkonsistente Logik über Subdomains',
            after: 'Einheitliches CMP, konsistente Kategorien, zentrale Protokollierung'
          }
        ]
      },
      pricing: {
        title: 'Preispläne',
        plans: [
          {
            name: 'Basic',
            features: ['Banner-Reparatur', 'Kopie-Optimierung', 'Grundlegende Blockierung']
          },
          {
            name: 'Pro',
            features: ['CMP-Einrichtung', 'GTM-Integration', 'Scan-Bericht', 'Richtlinien-Seiten']
          },
          {
            name: 'Business',
            features: ['Multi-Domain', 'Migration', 'Benutzerdefinierte Ereignisse', 'White-Label-Bericht']
          }
        ],
        note: 'Preise & Zeitpläne auf Anfrage (abhängig von Stack, Traffic, Regionen)'
      },
      faq: {
        title: 'Häufig gestellte Fragen',
        items: [
          {
            question: 'Wie unterscheidet sich ein CMP von einem einfachen Banner?',
            answer: 'Ein CMP zeichnet rechtmäßige Zustimmung pro Kategorie auf und steuert das Laden von Skripten über Zustimmungsereignisse; ein einfaches Banner gewährleistet keine ordnungsgemäße Vor-Zustimmungs-Blockierung.'
          },
          {
            question: 'Können wir unser aktuelles Banner-Design beibehalten?',
            answer: 'Ja, wir passen CMP-Widgets an Ihre Markenrichtlinien an.'
          },
          {
            question: 'Unterstützen Sie GPC / Do Not Sell?',
            answer: 'Wo es von dem ausgewählten CMP und der Gerichtsbarkeit unterstützt wird.'
          }
        ]
      },
      contact: {
        title: 'Loslegen',
        subtitle: 'Erzählen Sie uns von Ihrem Projekt',
        fields: {
          name: 'Name',
          email: 'E-Mail',
          url: 'Website-URL',
          stack: 'Tech-Stack',
          regions: 'Zielregionen',
          languages: 'Sprachen',
          cmp: 'Bevorzugtes CMP',
          integrations: 'Integrationen',
          message: 'Nachricht'
        },
        submit: 'Anfrage senden'
      },
      footer: {
        copyright: '© 2024 C&C CookieComply von Cash & Clash',
        links: ['Datenschutzrichtlinie', 'Cookie-Richtlinie', 'Kontakt']
      }
    },
    fr: {
      hero: {
        title: 'C&C CookieComply — Configuration CMP GDPR & Corrections de Bannières',
        subtitle: 'Nous configurons CMP et corrigeons les bannières de cookies.',
        cta: {
          primary: 'Corriger ma bannière',
          secondary: 'Vérification gratuite'
        }
      },
      problem: {
        title: 'Problèmes courants de conformité GDPR',
        points: [
          'Bannières de cookies non conformes',
          'Scripts chargés avant le consentement',
          'Journaux de consentement manquants',
          'Mauvaise expérience utilisateur'
        ]
      },
      services: {
        title: 'Nos services',
        items: [
          'Configuration CMP (Cookiebot, Iubenda, Usercentrics, Termly)',
          'Corrections de bannières de cookies',
          'Blocage de scripts avant consentement',
          'Intégration GTM',
          'Support multilingue',
          'Pages de politique',
          'Journalisation du consentement',
          'QA & validation'
        ]
      },
      process: {
        title: 'Comment nous travaillons',
        steps: [
          'Audit du site & inventaire',
          'Conception de l\'architecture CMP',
          'Configuration technique',
          'Personnalisation de la bannière',
          'Tests & validation'
        ]
      },
      deliverables: {
        title: 'Ce que vous obtenez',
        items: [
          'CMP entièrement configuré',
          'Bannière de cookies conforme',
          'Centre de préférences',
          'Pages de politique',
          'Guide de maintenance'
        ]
      },
      benefits: {
        title: 'Pourquoi nous choisir',
        items: [
          'Solution de bout en bout',
          'Pas de dark patterns',
          'Intégration GTM appropriée',
          'Support multilingue',
          'Journaux de consentement & exports'
        ]
      },
      cases: {
        title: 'Études de cas',
        cards: [
          {
            title: 'E-commerce (FR)',
            before: 'Bannière acceptation uniquement, scripts chargés immédiatement',
            after: 'Accepter/Refuser/Préférences, blocage strict, conversion améliorée'
          },
          {
            title: 'Médias (FR)',
            before: 'Cookies tiers avant consentement, pas de centre de préférences',
            after: 'Blocage automatique, centre de préférences, localisation FR/EN'
          },
          {
            title: 'SaaS (UE)',
            before: 'Logique incohérente sur les sous-domaines',
            after: 'CMP unifié, catégories cohérentes, journalisation centralisée'
          }
        ]
      },
      pricing: {
        title: 'Plans tarifaires',
        plans: [
          {
            name: 'Basic',
            features: ['Correction de bannière', 'Optimisation de copie', 'Blocage de base']
          },
          {
            name: 'Pro',
            features: ['Configuration CMP', 'Intégration GTM', 'Rapport de scan', 'Pages de politique']
          },
          {
            name: 'Business',
            features: ['Multi-domaines', 'Migration', 'Événements personnalisés', 'Rapport white-label']
          }
        ],
        note: 'Prix & délais sur demande (dépendent de la stack, du trafic, des régions)'
      },
      faq: {
        title: 'Questions fréquemment posées',
        items: [
          {
            question: 'En quoi un CMP diffère-t-il d\'une simple bannière ?',
            answer: 'Un CMP enregistre le consentement légal par catégorie et contrôle le chargement des scripts via des événements de consentement ; une simple bannière ne garantit pas un blocage approprié avant consentement.'
          },
          {
            question: 'Pouvons-nous conserver notre design de bannière actuel ?',
            answer: 'Oui, nous adaptons les widgets CMP à vos directives de marque.'
          },
          {
            question: 'Supportez-vous GPC / Do Not Sell ?',
            answer: 'Là où c\'est supporté par le CMP sélectionné et la juridiction.'
          }
        ]
      },
      contact: {
        title: 'Commencer',
        subtitle: 'Parlez-nous de votre projet',
        fields: {
          name: 'Nom',
          email: 'E-mail',
          url: 'URL du site web',
          stack: 'Stack technique',
          regions: 'Régions cibles',
          languages: 'Langues',
          cmp: 'CMP préféré',
          integrations: 'Intégrations',
          message: 'Message'
        },
        submit: 'Envoyer la demande'
      },
      footer: {
        copyright: '© 2024 C&C CookieComply par Cash & Clash',
        links: ['Politique de confidentialité', 'Politique des cookies', 'Contact']
      }
    }
  }
  
  return content[locale] || content.en
}

export function getLocaleFromPath(pathname: string): Locale {
  if (pathname.startsWith('/de')) return 'de'
  if (pathname.startsWith('/fr')) return 'fr'
  return 'en'
}
