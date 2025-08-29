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
        title: 'CMP Setup\nC&C CookieComply',
        subtitle: 'We set up CMP, fix cookie banners, block trackers before consent, and log consent properly.',
        cta: {
          primary: 'Fix my banner',
          secondary: 'Free quick check'
        }
      },
      problem: {
        title: 'Common GDPR & Cookie Banner Issues',
        points: [
          'Non-compliant cookie banners',
          'Scripts loading before consent',
          'Missing consent logs',
          'Poor user experience'
        ]
      },
      whyImportant: {
        title: 'Why Cookie Consent Management Matters',
        subtitle: 'As global privacy regulations become more stringent, businesses face challenges in maintaining compliance while delivering exceptional user experiences.',
        points: [
          'Comprehensive compliance with GDPR, CCPA, and emerging privacy laws',
          'Risk mitigation and penalty avoidance through proactive measures',
          'Enhanced user trust and transparency in data handling',
          'Maintained website functionality without sacrificing analytics'
        ],
        description: 'Our expertise bridges the gap between legal requirements and technical implementation, ensuring your website not only meets current standards but also provides meaningful, privacy-respecting insights into user behavior.'
      },
      services: {
        title: 'GDPR Services: CMP Setup & Cookie Banner Fixes',
        subtitle: 'Comprehensive solutions for full GDPR compliance',
        leadText: 'Cookie consent is not just a "banner for the sake of a banner", but a managed process: CMP (Cookiebot / Iubenda / Usercentrics / Termly) displays the first layer with equal Accept / Decline / Preferences buttons, and then according to your choice, only those tag categories for which permission has been granted are enabled; thus all non-essential scripts are blocked before consent and "self-starting" analytics and advertising disappear. Preference Center gives users transparent category descriptions and the ability to change their choice at any time, while providing stable consent events for technology: we pass signals to GTM/GA4/Ads/Meta so that triggers fire strictly after permission and data in reports remains legally clean. In parallel, we organize Privacy/Cookie Policy, add a permanent "Cookie Preferences" link in the footer, configure languages and geo-rules (one domain - several locales without duplicating tags). If you have multiple sites, we include cross-domain consent consolidation so users don\'t see repeated requests unnecessarily. All actions are recorded in consent logs with export capability for DPO/audit, and quality is ensured through testing of key scenarios: first visit, consent change and withdrawal, settings restoration. The result is predictable banner behavior, correct blocking before consent, clean marketing tool data, and clear reliance on documentation and logs.',
        sections: [
          {
            title: 'When consent is mandatory and what exactly is required',
            content: [
              'Before any reading/writing of information on the device (cookie, localStorage, SDK), **prior** consent is required, except for strictly necessary cookies. This follows from Art. 5(3) ePrivacy Directive; criteria for valid consent - according to GDPR and EDPB guidelines.',
              'The **accountability** principle: the operator must be able to **prove** compliance and the fact of consent.',
              'In France, the CNIL regulator requires that refusal be **as simple** as consent (button "Reject all"/"Continue without acceptance" on the first layer).',
              'For violations, substantial fines under Art. 83 GDPR are possible: up to **€20 million or 4%** of global turnover (whichever is greater).'
            ]
          },
          {
            title: 'What we do',
            subsections: [
              {
                title: 'CMP and banner',
                items: [
                  'Selection and deployment of CMP: **Cookiebot, Iubenda, Usercentrics, Termly**',
                  'First layer: **Accept / Decline / Preferences** without "dark patterns"',
                  'Preference Center: categories, descriptions, "Cookie Preferences" link in footer',
                  'Geo/languages: loading rules by regions (EN/DE/FR and others)'
                ]
              },
              {
                title: 'Blocking before consent',
                items: [
                  'We disable all non-essential tags before consent event',
                  'For GTM: we configure `triggers`/`variables` and pass consent events by categories',
                  'For "raw" code: we wrap calls/SDK in protective gates'
                ]
              },
              {
                title: 'Policies and logs',
                items: [
                  'Cookie/Privacy Policy (pages + links from banner)',
                  'Consent logs: source in CMP + export on demand (DPO/audit)',
                  'Tag/cookie inventory, "before/after" report'
                ]
              }
            ]
          },

          {
            title: 'What you get',
            items: [
              'Properly configured CMP and banner with **Accept / Decline / Preferences**',
              'Hard blocking of non-essential before consent',
              'Integration with GTM/analytics and consent events by categories',
              'Updated **Privacy/Cookie Policy** and permanent "Cookie Preferences" link',
              'Reports: tag/cookie inventory, "before/after" scans, audit checklist',
              'Support guide and consent log export'
            ]
          },
          {
            title: 'Integrations',
            content: '**GTM / gtag.js / Meta Pixel / GA4 / Hotjar / LinkedIn / TikTok** - through consent triggers. Server event buses/CRM - we pass consent flags.'
          }
        ],
        packages: [
          {
            name: 'Basic',
            description: 'banner fix + basic blocking + copywriting'
          },
          {
            name: 'Pro', 
            description: 'full CMP, GTM triggers, before/after scan, policies'
          },
          {
            name: 'Business',
            description: 'multi-domain/multi-locale, custom events, white-label reports'
          }
        ],
        note: 'exact pricing and SLA - after express diagnostics'
      },
      process: {
        title: 'Implementation Process: From Audit to Validation',
        subtitle: 'Our systematic 5-step approach ensures seamless CMP deployment with minimal disruption to your business operations.',
        leadText: 'Our **implementation methodology** is designed to minimize business disruption while ensuring comprehensive GDPR compliance. We begin with a thorough **legal requirements analysis** to understand your specific regulatory landscape, then proceed through **phased deployment** that allows for testing and validation at each stage. The process includes **stakeholder collaboration** with your legal, marketing, and technical teams, ensuring alignment across all departments. We implement **consent blocking** before any user interaction, configure **GTM triggers** based on granular consent categories, and provide **comprehensive documentation** for ongoing maintenance. Our approach guarantees that your CMP deployment is not only compliant but also optimized for user experience and data quality.',
        steps: [
          {
            title: 'Legal Requirements Analysis',
            description: 'We collaborate with your legal team to identify applicable privacy regulations and determine optimal consent mode configuration for your specific compliance needs.'
          },
          {
            title: 'CMP Script Deployment',
            description: 'Working with your marketing team, we deploy Cookie Management Platform scripts in a testing environment, providing consultation to address any technical bottlenecks.'
          },
          {
            title: 'GTM Integration & Configuration',
            description: 'We configure Google Tag Manager to ensure all tags fire appropriately based on user consent preferences, while identifying any hardcoded pixels requiring migration.'
          },
          {
            title: 'Production Deployment',
            description: 'After comprehensive testing, we support the deployment of CMP and GTM configurations to your live environment with minimal site disruption.'
          },
          {
            title: 'Data Impact Analysis',
            description: 'We quantify potential data loss from consent implementation and provide optimization recommendations to minimize impact on your analytics and marketing efforts.'
          }
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
      platforms: {
        title: 'Supported Cookie Management Platforms',
        subtitle: 'We work with all major CMP providers to deliver the best solution for your specific needs.',
        items: [
          {
            name: 'Cookiebot',
            description: 'Enterprise-grade solution with advanced consent modes and comprehensive compliance features'
          },
          {
            name: 'OneTrust',
            description: 'Industry-leading platform for complex multi-regional compliance requirements'
          },
          {
            name: 'Iubenda',
            description: 'User-friendly platform ideal for small to medium-sized businesses'
          },
          {
            name: 'Usercentrics',
            description: 'European-focused solution with strong GDPR compliance capabilities'
          },
          {
            name: 'Termly',
            description: 'Cost-effective option with automated scanning and policy generation'
          },
          {
            name: 'CookieYes',
            description: 'Flexible platform with extensive customization options'
          }
        ]
      },
      cases: {
        title: 'Case Studies',
        cards: [
          {
            title: 'E-commerce Audit (DE)',
            before: 'Accept-only banner, scripts loaded immediately',
            after: 'Accept/Decline/Preferences, strict blocking, improved conversion'
          },
          {
            title: 'Media Compliance (FR)',
            before: 'Third-party cookies before consent, no preference center',
            after: 'Auto-blocking, preference center, FR/EN localization'
          },
          {
            title: 'SaaS Platform (EU)',
            before: 'Inconsistent logic across subdomains',
            after: 'Unified CMP, consistent categories, centralized logging'
          }
        ]
      },
      pricing: {
        title: 'Pricing Plans',
        plans: [
          {
            name: 'Basic Plan',
            features: ['Banner fix', 'Copy optimization', 'Basic blocking']
          },
          {
            name: 'Pro Plan',
            features: ['CMP setup', 'GTM integration', 'Scan report', 'Policy pages']
          },
          {
            name: 'Business Plan',
            features: ['Multi-domain', 'Migration', 'Custom events', 'White-label report']
          }
        ],
        note: 'Pricing & timelines on request (depend on stack, traffic, regions)'
      },
      faq: {
        title: 'Frequently Asked Questions',
        items: [
          {
            question: 'What is a cookie consent tool and why do I need one?',
            answer: 'A cookie consent tool helps websites comply with privacy regulations by managing user consent for cookies. It provides transparency about data collection and allows users to control their preferences, which is crucial for GDPR and CCPA compliance.'
          },
          {
            question: 'How long does cookie consent tool implementation take?',
            answer: 'Implementation typically takes 1-3 weeks depending on your website\'s complexity. Sites with numerous pages may require longer for cookie scanning, and those with extensive tracking pixels need additional configuration time.'
          },
          {
            question: 'Can I customize the appearance of my cookie banner?',
            answer: 'Yes, the banner design can be fully customized to match your brand guidelines and desired user experience. We ensure compliance requirements are met while maintaining your visual identity.'
          },
          {
            question: 'What is the difference between Advanced and Basic Consent Mode?',
            answer: 'Advanced Consent Mode uses machine learning to fill data gaps from users who decline cookies, provided your site has sufficient traffic. Basic Consent Mode restricts data collection more strictly to meet minimum compliance requirements.'
          },
          {
            question: 'How do I handle data loss after CMP deployment?',
            answer: 'We help quantify data loss impact and implement strategies to minimize it. This includes advanced consent mode configuration and detailed reporting to understand the difference between actual user activity and captured analytics data.'
          },
          {
            question: 'What regulations do cookie consent tools cover?',
            answer: 'Cookie consent tools help comply with GDPR, CCPA, LGPD, PIPEDA, and other global privacy regulations that require user consent for data collection and processing.'
          },
          {
            question: 'Do you provide legal advice?',
            answer: 'While we have extensive technical expertise in cookie consent implementation, we do not provide legal advice. We recommend consulting with your legal team for specific compliance requirements.'
          },
          {
            question: 'Can the tool integrate with Google Analytics and other tracking systems?',
            answer: 'Yes, we specialize in integrating cookie consent tools with Google Analytics 4, Google Tag Manager, and various marketing platforms to ensure proper consent-based data collection.'
          }
        ]
      },
      contact: {
        title: 'Contact Us for GDPR CMP Setup',
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
        submit: 'Send Request',
        contactInfo: {
          title: 'Contact Us',
          email: 'Email',
          workingHours: 'Working Hours',
          location: 'Location',
          responseTime: 'Response within 24 hours',
          responseDescription: 'Quick response on business days. Weekends - by Monday.',
          whatYouGet: {
            title: 'What you\'ll get:',
            items: [
              'Free consultation',
              'Technical audit',
              'Personal proposal',
              'Timeline & cost estimate'
            ]
          }
        }
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
        title: 'CMP Einrichtung\nC&C CookieComply',
        subtitle: 'Wir richten CMP ein, reparieren Cookie-Banner und blockieren Tracker vor der Zustimmung.',
        cta: {
          primary: 'Meinen Banner reparieren',
          secondary: 'Kostenlose Schnellprüfung'
        }
      },
      problem: {
        title: 'Häufige DSGVO & Cookie-Banner Probleme',
        points: [
          'Nicht konforme Cookie-Banner',
          'Skripte werden vor der Zustimmung geladen',
          'Fehlende Zustimmungsprotokolle',
          'Schlechte Benutzererfahrung'
        ]
      },
      whyImportant: {
        title: 'Warum Cookie-Zustimmungsmanagement wichtig ist',
        subtitle: 'Da globale Datenschutzbestimmungen strenger werden, stehen Unternehmen vor Herausforderungen bei der Einhaltung der Compliance und der Bereitstellung außergewöhnlicher Benutzererfahrungen.',
        points: [
          'Umfassende Compliance mit DSGVO, CCPA und neuen Datenschutzgesetzen',
          'Risikominimierung und Vermeidung von Strafen durch proaktive Maßnahmen',
          'Erhöhtes Benutzervertrauen und Transparenz bei der Datenverarbeitung',
          'Beibehaltung der Website-Funktionalität ohne Beeinträchtigung der Analytik'
        ],
        description: 'Unsere Expertise überbrückt die Lücke zwischen rechtlichen Anforderungen und technischer Umsetzung und stellt sicher, dass Ihre Website nicht nur aktuellen Standards entspricht, sondern auch bedeutsame, datenschutzrechtlich konforme Einblicke in das Benutzerverhalten bietet.'
      },
      services: {
        title: 'DSGVO Services: CMP Einrichtung & Cookie-Banner Reparaturen',
        subtitle: 'Umfassende Lösungen für vollständige DSGVO-Compliance',
        leadText: 'Cookie-Zustimmung ist nicht nur ein "Banner um des Banners willen", sondern ein verwalteter Prozess: CMP (Cookiebot / Iubenda / Usercentrics / Termly) zeigt die erste Ebene mit gleichberechtigten Accept / Decline / Preferences Schaltflächen an, und dann werden je nach Ihrer Wahl nur die Tag-Kategorien aktiviert, für die eine Erlaubnis erteilt wurde; dadurch werden alle nicht-essentiellen Skripte vor der Zustimmung blockiert und "selbststartende" Analysen und Werbung verschwinden. Das Preference Center gibt Benutzern transparente Kategoriebeschreibungen und die Möglichkeit, ihre Wahl jederzeit zu ändern, während es der Technik stabile Zustimmungsereignisse liefert: Wir leiten Signale an GTM/GA4/Ads/Meta weiter, damit Trigger streng nach der Erlaubnis ausgelöst werden und Daten in Berichten rechtlich sauber bleiben. Parallel dazu organisieren wir Privacy/Cookie Policy, fügen einen permanenten "Cookie Preferences" Link im Footer hinzu, konfigurieren Sprachen und Geo-Regeln (eine Domain - mehrere Lokalisierungen ohne Duplizierung von Tags). Wenn Sie mehrere Websites haben, schließen wir die domänenübergreifende Zustimmungskonsolidierung ein, damit Benutzer keine wiederholten Anfragen unnötigerweise sehen. Alle Aktionen werden in Zustimmungsprotokollen mit Exportmöglichkeit für DPO/Audit aufgezeichnet, und die Qualität wird durch Tests von Schlüsselszenarien sichergestellt: erster Besuch, Zustimmungsänderung und -widerruf, Einstellungs-Wiederherstellung. Das Ergebnis ist vorhersagbares Banner-Verhalten, korrekte Blockierung vor der Zustimmung, saubere Marketing-Tool-Daten und klare Abhängigkeit von Dokumentation und Protokollen.',
        sections: [
          {
            title: 'Wann Zustimmung obligatorisch ist und was genau erforderlich ist',
            content: [
              'Vor jedem Lesen/Schreiben von Informationen auf dem Gerät (Cookie, localStorage, SDK) ist eine **vorherige** Zustimmung erforderlich, außer für streng notwendige Cookies. Dies folgt aus Art. 5(3) ePrivacy-Richtlinie; Kriterien für gültige Zustimmung - gemäß DSGVO und EDPB-Richtlinien.',
              'Das **Accountability**-Prinzip: Der Betreiber muss in der Lage sein, Compliance und die Tatsache der Zustimmung zu **beweisen**.',
              'In Frankreich verlangt der CNIL-Regulator, dass die Ablehnung **genauso einfach** ist wie die Zustimmung (Schaltfläche "Alle ablehnen"/"Ohne Annahme fortfahren" auf der ersten Ebene).',
              'Bei Verstößen sind erhebliche Geldstrafen nach Art. 83 DSGVO möglich: bis zu **20 Millionen € oder 4%** des weltweiten Umsatzes (je nachdem, was höher ist).'
            ]
          },
          {
            title: 'Was wir tun',
            subsections: [
              {
                title: 'CMP und Banner',
                items: [
                  'Auswahl und Bereitstellung von CMP: **Cookiebot, Iubenda, Usercentrics, Termly**',
                  'Erste Ebene: **Accept / Decline / Preferences** ohne "Dark Patterns"',
                  'Preference Center: Kategorien, Beschreibungen, "Cookie Preferences" Link im Footer',
                  'Geo/Sprachen: Lade-Regeln nach Regionen (EN/DE/FR und andere)'
                ]
              },
              {
                title: 'Blockierung vor Zustimmung',
                items: [
                  'Wir deaktivieren alle nicht-essentiellen Tags vor dem Consent-Event',
                  'Für GTM: Wir konfigurieren `triggers`/`variables` und leiten Consent-Events nach Kategorien weiter',
                  'Für "Roh"-Code: Wir wickeln Aufrufe/SDK in Schutz-Gates ein'
                ]
              },
              {
                title: 'Richtlinien und Protokolle',
                items: [
                  'Cookie/Privacy Policy (Seiten + Links vom Banner)',
                  'Consent-Logs: Quelle in CMP + Export auf Anfrage (DPO/Audit)',
                  'Tag/Cookie-Inventar, "Vorher/Nachher"-Bericht'
                ]
              }
            ]
          },

          {
            title: 'Was Sie bekommen',
            items: [
              'Korrekt konfiguriertes CMP und Banner mit **Accept / Decline / Preferences**',
              'Harte Blockierung von Nicht-Essentiellem vor der Zustimmung',
              'Integration mit GTM/Analytics und Consent-Events nach Kategorien',
              'Aktualisierte **Privacy/Cookie Policy** und permanenter "Cookie Preferences" Link',
              'Berichte: Tag/Cookie-Inventar, "Vorher/Nachher"-Scans, Audit-Checkliste',
              'Support-Anleitung und Consent-Log-Export'
            ]
          },
          {
            title: 'Integrationen',
            content: '**GTM / gtag.js / Meta Pixel / GA4 / Hotjar / LinkedIn / TikTok** - über Consent-Trigger. Server-Event-Busse/CRM - wir leiten Consent-Flags weiter.'
          }
        ],
        packages: [
          {
            name: 'Basic',
            description: 'Banner-Reparatur + grundlegende Blockierung + Copywriting'
          },
          {
            name: 'Pro', 
            description: 'vollständiges CMP, GTM-Trigger, Vorher/Nachher-Scan, Richtlinien'
          },
          {
            name: 'Business',
            description: 'Multi-Domain/Multi-Locale, benutzerdefinierte Events, White-Label-Berichte'
          }
        ],
        note: 'genaue Preise und SLA - nach Express-Diagnose'
      },
      process: {
        title: 'Implementierungsprozess: Vom Audit zur Validierung',
        subtitle: 'Unser systematischer 5-Schritt-Ansatz gewährleistet eine nahtlose CMP-Bereitstellung mit minimalen Störungen für Ihre Geschäftsabläufe.',
        leadText: 'Unsere **Implementierungsmethodik** ist darauf ausgelegt, Geschäftsstörungen zu minimieren und gleichzeitig umfassende DSGVO-Compliance zu gewährleisten. Wir beginnen mit einer gründlichen **Rechtsanforderungsanalyse**, um Ihre spezifische regulatorische Landschaft zu verstehen, und gehen dann durch **schrittweise Bereitstellung**, die Tests und Validierung in jeder Phase ermöglicht. Der Prozess umfasst **Stakeholder-Zusammenarbeit** mit Ihren Rechts-, Marketing- und Technikteams, um die Ausrichtung aller Abteilungen sicherzustellen. Wir implementieren **Zustimmungsblockierung** vor jeder Benutzerinteraktion, konfigurieren **GTM-Trigger** basierend auf granularen Zustimmungskategorien und stellen **umfassende Dokumentation** für laufende Wartung bereit. Unser Ansatz garantiert, dass Ihre CMP-Bereitstellung nicht nur konform ist, sondern auch für Benutzererfahrung und Datenqualität optimiert ist.',
        steps: [
          {
            title: 'Rechtsanforderungsanalyse',
            description: 'Wir arbeiten mit Ihrem Rechtsteam zusammen, um anwendbare Datenschutzvorschriften zu identifizieren und die optimale Zustimmungsmodus-Konfiguration für Ihre spezifischen Compliance-Anforderungen zu bestimmen.'
          },
          {
            title: 'CMP-Skript-Bereitstellung',
            description: 'Zusammen mit Ihrem Marketing-Team stellen wir CMP-Skripte in einer Testumgebung bereit und bieten Beratung zur Lösung technischer Engpässe.'
          },
          {
            title: 'GTM-Integration & Konfiguration',
            description: 'Wir konfigurieren Google Tag Manager, um sicherzustellen, dass alle Tags entsprechend den Benutzerpräferenzen ausgelöst werden, während wir hartcodierte Pixel identifizieren, die eine Migration erfordern.'
          },
          {
            title: 'Produktionsbereitstellung',
            description: 'Nach umfassenden Tests unterstützen wir die Bereitstellung von CMP- und GTM-Konfigurationen in Ihrer Live-Umgebung mit minimalen Störungen der Website.'
          },
          {
            title: 'Datenauswirkungsanalyse',
            description: 'Wir quantifizieren potenzielle Datenverluste durch die Zustimmungsimplementierung und geben Optimierungsempfehlungen, um die Auswirkungen auf Ihre Analytics- und Marketing-Bemühungen zu minimieren.'
          }
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
      platforms: {
        title: 'Unterstützte Cookie-Management-Plattformen',
        subtitle: 'Wir arbeiten mit allen wichtigen CMP-Anbietern zusammen, um die beste Lösung für Ihre spezifischen Bedürfnisse zu liefern.',
        items: [
          {
            name: 'Cookiebot',
            description: 'Enterprise-Grade-Lösung mit erweiterten Zustimmungsmodi und umfassenden Compliance-Features'
          },
          {
            name: 'OneTrust',
            description: 'Branchenführende Plattform für komplexe multiregionale Compliance-Anforderungen'
          },
          {
            name: 'Iubenda',
            description: 'Benutzerfreundliche Plattform ideal für kleine bis mittlere Unternehmen'
          },
          {
            name: 'Usercentrics',
            description: 'Europafokussierte Lösung mit starken DSGVO-Compliance-Fähigkeiten'
          },
          {
            name: 'Termly',
            description: 'Kosteneffektive Option mit automatisiertem Scannen und Policy-Generierung'
          },
          {
            name: 'CookieYes',
            description: 'Flexible Plattform mit umfangreichen Anpassungsoptionen'
          }
        ]
      },
      cases: {
        title: 'Fallstudien',
        cards: [
          {
            title: 'E-Commerce Audit (DE)',
            before: 'Nur-Akzeptieren-Banner, Skripte sofort geladen',
            after: 'Akzeptieren/Ablehnen/Einstellungen, strikte Blockierung, verbesserte Konversion'
          },
          {
            title: 'Medien Compliance (DE)',
            before: 'Third-Party-Cookies vor Zustimmung, kein Einstellungszentrum',
            after: 'Auto-Blockierung, Einstellungszentrum, DE/EN-Lokalisierung'
          },
          {
            title: 'SaaS Plattform (EU)',
            before: 'Inkonsistente Logik über Subdomains',
            after: 'Einheitliches CMP, konsistente Kategorien, zentrale Protokollierung'
          }
        ]
      },
      pricing: {
        title: 'Preispläne',
        plans: [
          {
            name: 'Basic Plan',
            features: ['Banner-Reparatur', 'Kopie-Optimierung', 'Grundlegende Blockierung']
          },
          {
            name: 'Pro Plan',
            features: ['CMP-Einrichtung', 'GTM-Integration', 'Scan-Bericht', 'Richtlinien-Seiten']
          },
          {
            name: 'Business Plan',
            features: ['Multi-Domain', 'Migration', 'Benutzerdefinierte Ereignisse', 'White-Label-Bericht']
          }
        ],
        note: 'Preise & Zeitpläne auf Anfrage (abhängig von Stack, Traffic, Regionen)'
      },
      faq: {
        title: 'Häufig gestellte Fragen',
        items: [
          {
            question: 'Was ist ein Cookie-Zustimmungstool und warum brauche ich es?',
            answer: 'Ein Cookie-Zustimmungstool hilft Websites, Datenschutzbestimmungen einzuhalten, indem es die Benutzerzustimmung für Cookies verwaltet. Es bietet Transparenz über die Datensammlung und ermöglicht Benutzern, ihre Präferenzen zu kontrollieren, was für die DSGVO- und CCPA-Compliance entscheidend ist.'
          },
          {
            question: 'Wie lange dauert die Implementierung eines Cookie-Zustimmungstools?',
            answer: 'Die Implementierung dauert typischerweise 1-3 Wochen, abhängig von der Komplexität Ihrer Website. Seiten mit zahlreichen Unterseiten können länger für das Cookie-Scannen benötigen, und solche mit umfangreichen Tracking-Pixeln benötigen zusätzliche Konfigurationszeit.'
          },
          {
            question: 'Kann ich das Aussehen meines Cookie-Banners anpassen?',
            answer: 'Ja, das Banner-Design kann vollständig an Ihre Markenrichtlinien und gewünschte Benutzererfahrung angepasst werden. Wir stellen sicher, dass Compliance-Anforderungen erfüllt werden, während Ihre visuelle Identität beibehalten wird.'
          },
          {
            question: 'Was ist der Unterschied zwischen erweitertem und grundlegendem Zustimmungsmodus?',
            answer: 'Der erweiterte Zustimmungsmodus nutzt maschinelles Lernen, um Datenlücken von Benutzern zu füllen, die Cookies ablehnen, vorausgesetzt, Ihre Seite hat ausreichend Traffic. Der grundlegende Zustimmungsmodus beschränkt die Datensammlung strenger, um minimale Compliance-Anforderungen zu erfüllen.'
          },
          {
            question: 'Wie gehe ich mit Datenverlusten nach CMP-Bereitstellung um?',
            answer: 'Wir helfen dabei, den Datenverlust zu quantifizieren und Strategien zu implementieren, um ihn zu minimieren. Dies umfasst die Konfiguration des erweiterten Zustimmungsmodus und detaillierte Berichterstattung, um den Unterschied zwischen tatsächlicher Benutzeraktivität und erfassten Analysedaten zu verstehen.'
          },
          {
            question: 'Welche Vorschriften decken Cookie-Zustimmungstools ab?',
            answer: 'Cookie-Zustimmungstools helfen bei der Einhaltung von DSGVO, CCPA, LGPD, PIPEDA und anderen globalen Datenschutzbestimmungen, die Benutzerzustimmung für Datensammlung und -verarbeitung erfordern.'
          },
          {
            question: 'Bieten Sie Rechtsberatung an?',
            answer: 'Obwohl wir umfangreiche technische Expertise in der Cookie-Zustimmungsimplementierung haben, bieten wir keine Rechtsberatung an. Wir empfehlen, sich mit Ihrem Rechtsteam für spezifische Compliance-Anforderungen zu beraten.'
          },
          {
            question: 'Kann das Tool mit Google Analytics und anderen Tracking-Systemen integriert werden?',
            answer: 'Ja, wir spezialisieren uns auf die Integration von Cookie-Zustimmungstools mit Google Analytics 4, Google Tag Manager und verschiedenen Marketing-Plattformen, um ordnungsgemäße zustimmungsbasierte Datensammlung sicherzustellen.'
          }
        ]
      },
      contact: {
        title: 'Kontaktieren Sie uns für DSGVO CMP Einrichtung',
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
        submit: 'Anfrage senden',
        contactInfo: {
          title: 'Kontaktieren Sie uns',
          email: 'E-Mail',
          workingHours: 'Arbeitszeiten',
          location: 'Standort',
          responseTime: 'Antwort innerhalb von 24 Stunden',
          responseDescription: 'Schnelle Antwort an Werktagen. Wochenenden - bis Montag.',
          whatYouGet: {
            title: 'Was Sie bekommen:',
            items: [
              'Kostenlose Beratung',
              'Technische Prüfung',
              'Persönlicher Vorschlag',
              'Zeitplan & Kostenkalkulation'
            ]
          }
        }
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
        title: 'Mise en place CMP\nC&C CookieComply',
        subtitle: 'Nous configurons CMP et corrigeons les bannières de cookies.',
        cta: {
          primary: 'Corriger ma bannière',
          secondary: 'Vérification gratuite'
        }
      },
      problem: {
        title: 'Problèmes courants RGPD & bannières cookies',
        points: [
          'Bannières de cookies non conformes',
          'Scripts chargés avant le consentement',
          'Journaux de consentement manquants',
          'Mauvaise expérience utilisateur'
        ]
      },
      whyImportant: {
        title: 'Pourquoi la gestion du consentement aux cookies est importante',
        subtitle: 'Alors que les réglementations mondiales de confidentialité deviennent plus strictes, les entreprises font face à des défis pour maintenir la conformité tout en offrant des expériences utilisateur exceptionnelles.',
        points: [
          'Conformité complète avec RGPD, CCPA et nouvelles lois de confidentialité',
          'Atténuation des risques et évitement des pénalités par des mesures proactives',
          'Confiance des utilisateurs renforcée et transparence dans le traitement des données',
          'Fonctionnalité du site web maintenue sans sacrifier l\'analytique'
        ],
        description: 'Notre expertise comble le fossé entre les exigences légales et l\'implémentation technique, garantissant que votre site web répond non seulement aux normes actuelles mais fournit également des insights significatifs et respectueux de la vie privée sur le comportement des utilisateurs.'
      },
      services: {
        title: 'Services RGPD: Configuration CMP & Corrections de Bannières',
        subtitle: 'Solutions complètes pour une conformité RGPD totale',
        leadText: 'Le consentement aux cookies n\'est pas juste une "bannière pour la bannière", mais un processus géré : CMP (Cookiebot / Iubenda / Usercentrics / Termly) affiche la première couche avec des boutons Accept / Decline / Preferences égaux, et ensuite selon votre choix, seules les catégories de tags pour lesquelles l\'autorisation a été accordée sont activées ; ainsi tous les scripts non-essentiels sont bloqués avant le consentement et les analyses et publicités "auto-démarrage" disparaissent. Le Centre de Préférences donne aux utilisateurs des descriptions transparentes des catégories et la possibilité de changer leur choix à tout moment, tout en fournissant des événements de consentement stables pour la technologie : nous transmettons des signaux à GTM/GA4/Ads/Meta pour que les déclencheurs se déclenchent strictement après autorisation et que les données dans les rapports restent juridiquement propres. En parallèle, nous organisons la Politique de Confidentialité/Cookies, ajoutons un lien permanent "Préférences de Cookies" dans le pied de page, configurons les langues et règles géographiques (un domaine - plusieurs localisations sans duplication de tags). Si vous avez plusieurs sites, nous incluons la consolidation du consentement inter-domaines pour que les utilisateurs ne voient pas de demandes répétées inutilement. Toutes les actions sont enregistrées dans les journaux de consentement avec capacité d\'export pour DPO/audit, et la qualité est assurée par des tests de scénarios clés : première visite, changement et retrait du consentement, restauration des paramètres. Le résultat est un comportement de bannière prévisible, un blocage correct avant consentement, des données d\'outils marketing propres et une dépendance claire à la documentation et aux journaux.',
        sections: [
          {
            title: 'Quand le consentement est obligatoire et ce qui est exactement requis',
            content: [
              'Avant toute lecture/écriture d\'informations sur l\'appareil (cookie, localStorage, SDK), un consentement **préalable** est requis, sauf pour les cookies strictement nécessaires. Cela découle de l\'Art. 5(3) Directive ePrivacy ; critères pour un consentement valide - selon RGPD et lignes directrices EDPB.',
              'Le principe **d\'accountability** : l\'opérateur doit être en mesure de **prouver** la conformité et le fait du consentement.',
              'En France, le régulateur CNIL exige que le refus soit **aussi simple** que le consentement (bouton "Rejeter tout"/"Continuer sans accepter" sur la première couche).',
              'Pour les violations, des amendes substantielles sous l\'Art. 83 RGPD sont possibles : jusqu\'à **20 millions € ou 4%** du chiffre d\'affaires mondial (selon ce qui est le plus élevé).'
            ]
          },
          {
            title: 'Ce que nous faisons',
            subsections: [
              {
                title: 'CMP et bannière',
                items: [
                  'Sélection et déploiement de CMP : **Cookiebot, Iubenda, Usercentrics, Termly**',
                  'Première couche : **Accept / Decline / Preferences** sans "dark patterns"',
                  'Centre de Préférences : catégories, descriptions, lien "Préférences de Cookies" dans le pied de page',
                  'Géo/langues : règles de chargement par régions (EN/DE/FR et autres)'
                ]
              },
              {
                title: 'Blocage avant consentement',
                items: [
                  'Nous désactivons tous les tags non-essentiels avant l\'événement de consentement',
                  'Pour GTM : nous configurons `triggers`/`variables` et transmettons les événements de consentement par catégories',
                  'Pour le code "brut" : nous enveloppons les appels/SDK dans des portes de protection'
                ]
              },
              {
                title: 'Politiques et journaux',
                items: [
                  'Politique de Cookies/Confidentialité (pages + liens de la bannière)',
                  'Journaux de consentement : source dans CMP + export à la demande (DPO/audit)',
                  'Inventaire des tags/cookies, rapport "avant/après"'
                ]
              }
            ]
          },

          {
            title: 'Ce que vous obtenez',
            items: [
              'CMP et bannière correctement configurés avec **Accept / Decline / Preferences**',
              'Blocage dur du non-essentiel avant consentement',
              'Intégration avec GTM/analytics et événements de consentement par catégories',
              '**Politique de Confidentialité/Cookies** mise à jour et lien permanent "Préférences de Cookies"',
              'Rapports : inventaire des tags/cookies, scans "avant/après", liste de contrôle d\'audit',
              'Guide de support et export des journaux de consentement'
            ]
          },
          {
            title: 'Intégrations',
            content: '**GTM / gtag.js / Meta Pixel / GA4 / Hotjar / LinkedIn / TikTok** - via des déclencheurs de consentement. Bus d\'événements serveur/CRM - nous transmettons les drapeaux de consentement.'
          }
        ],
        packages: [
          {
            name: 'Basic',
            description: 'correction de bannière + blocage de base + rédaction'
          },
          {
            name: 'Pro', 
            description: 'CMP complet, déclencheurs GTM, scan avant/après, politiques'
          },
          {
            name: 'Business',
            description: 'multi-domaines/multi-localisations, événements personnalisés, rapports white-label'
          }
        ],
        note: 'prix et SLA exacts - après diagnostic express'
      },
      process: {
        title: 'Processus d\'implémentation: De l\'audit à la validation',
        subtitle: 'Notre approche systématique en 5 étapes assure un déploiement CMP transparent avec une perturbation minimale de vos opérations commerciales.',
        leadText: 'Notre **méthodologie d\'implémentation** est conçue pour minimiser les perturbations commerciales tout en assurant une conformité RGPD complète. Nous commençons par une **analyse approfondie des exigences légales** pour comprendre votre paysage réglementaire spécifique, puis procédons par **déploiement par phases** qui permet des tests et une validation à chaque étape. Le processus inclut une **collaboration des parties prenantes** avec vos équipes juridiques, marketing et techniques, assurant l\'alignement de tous les départements. Nous implémentons le **blocage du consentement** avant toute interaction utilisateur, configurons les **déclencheurs GTM** basés sur des catégories de consentement granulaires, et fournissons une **documentation complète** pour la maintenance continue. Notre approche garantit que votre déploiement CMP est non seulement conforme, mais aussi optimisé pour l\'expérience utilisateur et la qualité des données.',
        steps: [
          {
            title: 'Analyse des exigences légales',
            description: 'Nous collaborons avec votre équipe juridique pour identifier les réglementations de confidentialité applicables et déterminer la configuration optimale du mode de consentement pour vos besoins de conformité spécifiques.'
          },
          {
            title: 'Déploiement des scripts CMP',
            description: 'En collaboration avec votre équipe marketing, nous déployons les scripts de la plateforme de gestion des cookies dans un environnement de test, fournissant une consultation pour résoudre tout goulot d\'étranglement technique.'
          },
          {
            title: 'Intégration et configuration GTM',
            description: 'Nous configurons Google Tag Manager pour garantir que tous les tags se déclenchent de manière appropriée selon les préférences de consentement des utilisateurs, tout en identifiant les pixels codés en dur nécessitant une migration.'
          },
          {
            title: 'Déploiement en production',
            description: 'Après des tests complets, nous soutenons le déploiement des configurations CMP et GTM dans votre environnement de production avec une perturbation minimale du site.'
          },
          {
            title: 'Analyse de l\'impact sur les données',
            description: 'Nous quantifions les pertes de données potentielles de l\'implémentation du consentement et fournissons des recommandations d\'optimisation pour minimiser l\'impact sur vos efforts d\'analyse et de marketing.'
          }
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
      platforms: {
        title: 'Plateformes de gestion des cookies supportées',
        subtitle: 'Nous travaillons avec tous les principaux fournisseurs CMP pour offrir la meilleure solution pour vos besoins spécifiques.',
        items: [
          {
            name: 'Cookiebot',
            description: 'Solution de niveau entreprise avec modes de consentement avancés et fonctionnalités de conformité complètes'
          },
          {
            name: 'OneTrust',
            description: 'Plateforme leader de l\'industrie pour les exigences de conformité multi-régionales complexes'
          },
          {
            name: 'Iubenda',
            description: 'Plateforme conviviale idéale pour les petites et moyennes entreprises'
          },
          {
            name: 'Usercentrics',
            description: 'Solution axée sur l\'Europe avec de fortes capacités de conformité RGPD'
          },
          {
            name: 'Termly',
            description: 'Option rentable avec scan automatisé et génération de politiques'
          },
          {
            name: 'CookieYes',
            description: 'Plateforme flexible avec de nombreuses options de personnalisation'
          }
        ]
      },
      cases: {
        title: 'Études de cas',
        cards: [
          {
            title: 'Audit E-commerce (FR)',
            before: 'Bannière acceptation uniquement, scripts chargés immédiatement',
            after: 'Accepter/Refuser/Préférences, blocage strict, conversion améliorée'
          },
          {
            title: 'Conformité Médias (FR)',
            before: 'Cookies tiers avant consentement, pas de centre de préférences',
            after: 'Blocage automatique, centre de préférences, localisation FR/EN'
          },
          {
            title: 'Plateforme SaaS (UE)',
            before: 'Logique incohérente sur les sous-domaines',
            after: 'CMP unifié, catégories cohérentes, journalisation centralisée'
          }
        ]
      },
      pricing: {
        title: 'Plans tarifaires',
        plans: [
          {
            name: 'Plan Basic',
            features: ['Correction de bannière', 'Optimisation de copie', 'Blocage de base']
          },
          {
            name: 'Plan Pro',
            features: ['Configuration CMP', 'Intégration GTM', 'Rapport de scan', 'Pages de politique']
          },
          {
            name: 'Plan Business',
            features: ['Multi-domaines', 'Migration', 'Événements personnalisés', 'Rapport white-label']
          }
        ],
        note: 'Prix & délais sur demande (dépendent de la stack, du trafic, des régions)'
      },
      faq: {
        title: 'Questions fréquemment posées',
        items: [
          {
            question: 'Qu\'est-ce qu\'un outil de consentement aux cookies et pourquoi en ai-je besoin ?',
            answer: 'Un outil de consentement aux cookies aide les sites web à se conformer aux réglementations de confidentialité en gérant le consentement des utilisateurs pour les cookies. Il offre de la transparence sur la collecte de données et permet aux utilisateurs de contrôler leurs préférences, ce qui est crucial pour la conformité RGPD et CCPA.'
          },
          {
            question: 'Combien de temps prend l\'implémentation d\'un outil de consentement aux cookies ?',
            answer: 'L\'implémentation prend généralement 1-3 semaines selon la complexité de votre site web. Les sites avec de nombreuses pages peuvent nécessiter plus de temps pour le scan des cookies, et ceux avec de nombreux pixels de suivi nécessitent un temps de configuration supplémentaire.'
          },
          {
            question: 'Puis-je personnaliser l\'apparence de ma bannière de cookies ?',
            answer: 'Oui, le design de la bannière peut être entièrement personnalisé pour correspondre à vos directives de marque et à l\'expérience utilisateur souhaitée. Nous nous assurons que les exigences de conformité sont respectées tout en maintenant votre identité visuelle.'
          },
          {
            question: 'Quelle est la différence entre le mode de consentement avancé et basique ?',
            answer: 'Le mode de consentement avancé utilise l\'apprentissage automatique pour combler les lacunes de données des utilisateurs qui refusent les cookies, à condition que votre site ait suffisamment de trafic. Le mode de consentement basique restreint plus strictement la collecte de données pour répondre aux exigences minimales de conformité.'
          },
          {
            question: 'Comment gérer la perte de données après le déploiement CMP ?',
            answer: 'Nous aidons à quantifier l\'impact de la perte de données et à implémenter des stratégies pour la minimiser. Cela inclut la configuration du mode de consentement avancé et des rapports détaillés pour comprendre la différence entre l\'activité réelle des utilisateurs et les données d\'analyse capturées.'
          },
          {
            question: 'Quelles réglementations couvrent les outils de consentement aux cookies ?',
            answer: 'Les outils de consentement aux cookies aident à se conformer au RGPD, CCPA, LGPD, PIPEDA et autres réglementations mondiales de confidentialité qui exigent le consentement des utilisateurs pour la collecte et le traitement des données.'
          },
          {
            question: 'Fournissez-vous des conseils juridiques ?',
            answer: 'Bien que nous ayons une expertise technique approfondie dans l\'implémentation du consentement aux cookies, nous ne fournissons pas de conseils juridiques. Nous recommandons de consulter votre équipe juridique pour les exigences de conformité spécifiques.'
          },
          {
            question: 'L\'outil peut-il s\'intégrer avec Google Analytics et d\'autres systèmes de suivi ?',
            answer: 'Oui, nous nous spécialisons dans l\'intégration d\'outils de consentement aux cookies avec Google Analytics 4, Google Tag Manager et diverses plateformes marketing pour assurer une collecte de données basée sur le consentement appropriée.'
          }
        ]
      },
      contact: {
        title: 'Contactez-nous pour la configuration CMP RGPD',
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
        submit: 'Envoyer la demande',
        contactInfo: {
          title: 'Contactez-nous',
          email: 'E-mail',
          workingHours: 'Heures de travail',
          location: 'Localisation',
          responseTime: 'Réponse sous 24 heures',
          responseDescription: 'Réponse rapide les jours ouvrables. Weekends - lundi.',
          whatYouGet: {
            title: 'Ce que vous obtiendrez :',
            items: [
              'Consultation gratuite',
              'Audit technique',
              'Proposition personnalisée',
              'Calendrier & estimation des coûts'
            ]
          }
        }
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
