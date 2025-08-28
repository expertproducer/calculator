export type Locale = 'en' | 'de' | 'fr'

// Content types
interface PrivacyContent {
  title: string
  content: string[]
  manageCookieSettings: string
  manageCookieDescription: string
  cookieSettings: string
}

interface CookiesContent {
  title: string
  content: string[]
  manageCookieSettings: string
  manageCookieDescription: string
  cookieSettings: string
}

interface FooterContent {
  copyright: string
  links: string[]
  description: string
  location: string
  workingHours: string
  quickLinks: string
  services: string
  process: string
  pricing: string
  faq: string
  contacts: string
  legalInfo: string
  privacyPolicy: string
  cookiePolicy: string
  cookiePreferences: string
  allRightsReserved: string
}

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
        links: ['Privacy Policy', 'Cookie Policy', 'Contact'],
        description: 'Professional GDPR compliance solutions. We configure CMP, fix cookie banners and ensure proper logging of consents.',
        location: 'European Union',
        workingHours: 'CET 9:00-18:00',
        quickLinks: 'Quick Links',
        services: 'Services',
        process: 'Work Process',
        pricing: 'Pricing',
        faq: 'FAQ',
        contacts: 'Contacts',
        legalInfo: 'Legal Information',
        privacyPolicy: 'Privacy Policy',
        cookiePolicy: 'Cookie Policy',
        cookiePreferences: 'Cookie Preferences',
        allRightsReserved: 'All rights reserved.'
      },
      privacy: {
        title: 'Privacy Policy',
        content: [
          'We protect your personal information and comply with all GDPR requirements. Your data is used only to provide services and is never shared with third parties without your consent.',
          'We collect only the information necessary to provide our services: name, email, website URL, and technical project details.',
          'All data is stored securely and deleted upon your request or upon contract expiration. You have the right to access, modify, or delete your data at any time.',
          'We use cookies and similar technologies to improve website functionality and analyze traffic. You can manage your cookie preferences using the settings below.'
        ],
        manageCookieSettings: 'Manage Cookie Settings',
        manageCookieDescription: 'Click the button below to manage your cookie settings.',
        cookieSettings: 'Cookie Settings'
      },
      cookies: {
        title: 'Cookie Policy',
        content: [
          'We use cookies to improve website functionality and analyze traffic. By continuing to use the site, you agree to our cookie policy.',
          'Cookies are small text files stored on your device that help us improve user experience and provide personalized content.',
          'We use the following types of cookies:',
          '• Essential cookies: Required for basic site functionality',
          '• Analytics cookies: Help us understand how visitors use our site',
          '• Marketing cookies: Used to deliver relevant advertisements',
          '• Functional cookies: Enable enhanced functionality and personalization',
          'You can disable cookies in your browser settings, but this may affect website functionality. Use the settings below to manage your preferences.'
        ],
        manageCookieSettings: 'Manage Cookie Settings',
        manageCookieDescription: 'Click the button below to manage your cookie settings.',
        cookieSettings: 'Cookie Settings'
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
        links: ['Datenschutzrichtlinie', 'Cookie-Richtlinie', 'Kontakt'],
        description: 'Professionelle GDPR-Compliance-Lösungen. Wir konfigurieren CMP, reparieren Cookie-Banner und stellen ordnungsgemäße Protokollierung von Zustimmungen sicher.',
        location: 'Europäische Union',
        workingHours: 'CET 9:00-18:00',
        quickLinks: 'Schnelllinks',
        services: 'Dienstleistungen',
        process: 'Arbeitsprozess',
        pricing: 'Preise',
        faq: 'FAQ',
        contacts: 'Kontakte',
        legalInfo: 'Rechtliche Informationen',
        privacyPolicy: 'Datenschutzrichtlinie',
        cookiePolicy: 'Cookie-Richtlinie',
        cookiePreferences: 'Cookie-Einstellungen',
        allRightsReserved: 'Alle Rechte vorbehalten.'
      },
      privacy: {
        title: 'Datenschutzerklärung',
        content: [
          'Wir schützen Ihre persönlichen Daten und erfüllen alle GDPR-Anforderungen. Ihre Daten werden nur zur Erbringung von Dienstleistungen verwendet und niemals ohne Ihre Zustimmung an Dritte weitergegeben.',
          'Wir sammeln nur die Informationen, die zur Erbringung unserer Dienstleistungen erforderlich sind: Name, E-Mail, Website-URL und technische Projektdetails.',
          'Alle Daten werden sicher gespeichert und auf Ihre Anfrage oder bei Vertragsende gelöscht. Sie haben jederzeit das Recht, auf Ihre Daten zuzugreifen, sie zu ändern oder zu löschen.',
          'Wir verwenden Cookies und ähnliche Technologien, um die Website-Funktionalität zu verbessern und den Verkehr zu analysieren. Sie können Ihre Cookie-Einstellungen über die nachstehenden Einstellungen verwalten.'
        ],
        manageCookieSettings: 'Cookie-Einstellungen verwalten',
        manageCookieDescription: 'Klicken Sie auf die Schaltfläche unten, um Ihre Cookie-Einstellungen zu verwalten.',
        cookieSettings: 'Cookie-Einstellungen'
      },
      cookies: {
        title: 'Cookie-Richtlinie',
        content: [
          'Wir verwenden Cookies, um die Website-Funktionalität zu verbessern und den Verkehr zu analysieren. Durch die weitere Nutzung der Website stimmen Sie unserer Cookie-Richtlinie zu.',
          'Cookies sind kleine Textdateien, die auf Ihrem Gerät gespeichert werden und uns helfen, die Benutzererfahrung zu verbessern und personalisierte Inhalte bereitzustellen.',
          'Wir verwenden die folgenden Arten von Cookies:',
          '• Wesentliche Cookies: Erforderlich für grundlegende Website-Funktionalität',
          '• Analytics-Cookies: Helfen uns zu verstehen, wie Besucher unsere Website nutzen',
          '• Marketing-Cookies: Werden verwendet, um relevante Werbung zu liefern',
          '• Funktionale Cookies: Ermöglichen erweiterte Funktionalität und Personalisierung',
          'Sie können Cookies in Ihren Browser-Einstellungen deaktivieren, aber dies kann die Website-Funktionalität beeinträchtigen. Verwenden Sie die nachstehenden Einstellungen, um Ihre Präferenzen zu verwalten.'
        ],
        manageCookieSettings: 'Cookie-Einstellungen verwalten',
        manageCookieDescription: 'Klicken Sie auf die Schaltfläche unten, um Ihre Cookie-Einstellungen zu verwalten.',
        cookieSettings: 'Cookie-Einstellungen'
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
        links: ['Politique de confidentialité', 'Politique des cookies', 'Contact'],
        description: 'Solutions professionnelles de conformité GDPR. Nous configurons CMP, corrigeons les bannières de cookies et assurons une journalisation appropriée des consentements.',
        location: 'Union Européenne',
        workingHours: 'CET 9:00-18:00',
        quickLinks: 'Liens rapides',
        services: 'Services',
        process: 'Processus de travail',
        pricing: 'Tarifs',
        faq: 'FAQ',
        contacts: 'Contacts',
        legalInfo: 'Informations légales',
        privacyPolicy: 'Politique de confidentialité',
        cookiePolicy: 'Politique des cookies',
        cookiePreferences: 'Préférences de cookies',
        allRightsReserved: 'Tous droits réservés.'
      },
      privacy: {
        title: 'Politique de Confidentialité',
        content: [
          'Nous protégeons vos informations personnelles et respectons toutes les exigences GDPR. Vos données sont utilisées uniquement pour fournir des services et ne sont jamais partagées avec des tiers sans votre consentement.',
          'Nous collectons uniquement les informations nécessaires pour fournir nos services : nom, email, URL du site web et détails techniques du projet.',
          'Toutes les données sont stockées de manière sécurisée et supprimées sur votre demande ou à l\'expiration du contrat. Vous avez le droit d\'accéder, de modifier ou de supprimer vos données à tout moment.',
          'Nous utilisons des cookies et des technologies similaires pour améliorer la fonctionnalité du site web et analyser le trafic. Vous pouvez gérer vos préférences de cookies en utilisant les paramètres ci-dessous.'
        ],
        manageCookieSettings: 'Gérer les paramètres des cookies',
        manageCookieDescription: 'Cliquez sur le bouton ci-dessous pour gérer vos paramètres de cookies.',
        cookieSettings: 'Paramètres des cookies'
      },
      cookies: {
        title: 'Politique des Cookies',
        content: [
          'Nous utilisons des cookies pour améliorer la fonctionnalité du site web et analyser le trafic. En continuant à utiliser le site, vous acceptez notre politique de cookies.',
          'Les cookies sont de petits fichiers texte stockés sur votre appareil qui nous aident à améliorer l\'expérience utilisateur et à fournir du contenu personnalisé.',
          'Nous utilisons les types de cookies suivants :',
          '• Cookies essentiels : Requis pour la fonctionnalité de base du site',
          '• Cookies analytiques : Nous aident à comprendre comment les visiteurs utilisent notre site',
          '• Cookies marketing : Utilisés pour diffuser des publicités pertinentes',
          '• Cookies fonctionnels : Permettent une fonctionnalité améliorée et la personnalisation',
          'Vous pouvez désactiver les cookies dans les paramètres de votre navigateur, mais cela peut affecter la fonctionnalité du site web. Utilisez les paramètres ci-dessous pour gérer vos préférences.'
        ],
        manageCookieSettings: 'Gérer les paramètres des cookies',
        manageCookieDescription: 'Cliquez sur le bouton ci-dessous pour gérer vos paramètres de cookies.',
        cookieSettings: 'Paramètres des cookies'
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
