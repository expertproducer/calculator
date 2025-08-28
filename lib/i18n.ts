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
        title: 'GDPR Cookie Banner & CMP Setup — C&C CookieComply (EU/EEA)',
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
        title: 'Услуги GDPR: настройка CMP и исправление баннеров cookie',
        subtitle: 'Комплексные решения для полного соответствия GDPR',
        leadText: 'Cookie-согласие — это не «баннер ради баннера», а управляемый процесс: CMP (Cookiebot / Iubenda / Usercentrics / Termly) выводит первый слой с равноправными кнопками Accept / Decline / Preferences, а затем по вашему выбору включает только те категории тегов, на которые дано разрешение; так блокируются все не-essential скрипты до согласия и исчезают «самостарты» аналитики и рекламы.',
        sections: [
          {
            title: 'Когда согласие обязательно и что именно требуется',
            content: [
              'Перед любым чтением/записью информации на устройство (cookie, localStorage, SDK) требуется **предварительное** согласие, за исключением строго необходимых cookie. Это следует из ст. 5(3) ePrivacy Directive; критерии действительного согласия — по GDPR и руководству EDPB.',
              'Принцип **accountability**: оператор обязан уметь **доказать** соответствие и факт согласия.',
              'Во Франции регулятор CNIL требует, чтобы отказ был **так же прост**, как согласие (кнопка «Reject all»/«Продолжить без принятия» на первом слое).',
              'За нарушения возможны существенные штрафы по ст. 83 GDPR: до **20 млн € или 4 %** мирового оборота (что больше).'
            ]
          },
          {
            title: 'Что мы делаем',
            subsections: [
              {
                title: 'CMP и баннер',
                items: [
                  'Выбор и развёртывание CMP: **Cookiebot, Iubenda, Usercentrics, Termly**',
                  'Первый слой: **Accept / Decline / Preferences** без «тёмных паттернов»',
                  'Preference Center: категории, описания, ссылка «Cookie Preferences» в футере',
                  'Гео/языки: правила загрузки по регионам (EN/DE/FR и др.)'
                ]
              },
              {
                title: 'Блокировка до согласия',
                items: [
                  'Отключаем все не-essential теги до consent-ивента',
                  'Для GTM: настраиваем `triggers`/`variables` и пробрасываем события согласия по категориям',
                  'Для «сырого» кода: оборачиваем вызовы/SDK в защитные гейты'
                ]
              },
              {
                title: 'Политики и журналы',
                items: [
                  'Cookie/Privacy Policy (страницы + ссылки из баннера)',
                  'Consent logs: источник в CMP + экспорт по требованию (DPO/аудит)',
                  'Инвентаризация тегов/куков, отчёт «до/после»'
                ]
              }
            ]
          },
          {
            title: 'Процесс: от аудита до валидации',
            steps: [
              'Аудит — скан домена/поддоменов, инвентарь cookie/скриптов',
              'Архитектура — выбор CMP/категорий, карта событий, языки/гео',
              'Имплементация — баннер, блокировки, GTM, Preference Center',
              'Копирайтинг — тексты баннера/политик, локализации',
              'Тесты и валидация — сценарии «новый пользователь», GTM-логика, отчёт «до/после»',
              'Передача — гайд по поддержке, доступы, экспорт шаблонов'
            ]
          },
          {
            title: 'Что вы получите',
            items: [
              'Корректно настроенный CMP и баннер с **Accept / Decline / Preferences**',
              'Жёсткая блокировка не-essential до согласия',
              'Связка с GTM/аналитикой и события согласия по категориям',
              'Обновлённые **Privacy/Cookie Policy** и постоянная ссылка «Cookie Preferences»',
              'Отчёты: инвентарь тегов/куков, сканы «до/после», чек-лист аудита',
              'Гайд по поддержке и экспорт логов согласий'
            ]
          },
          {
            title: 'Интеграции',
            content: '**GTM / gtag.js / Meta Pixel / GA4 / Hotjar / LinkedIn / TikTok** — через consent-триггеры. Серверные шины событий/CRM — прокидываем флаги согласия.'
          }
        ],
        packages: [
          {
            name: 'Basic',
            description: 'фикс баннера + базовая блокировка + копирайтинг'
          },
          {
            name: 'Pro', 
            description: 'полноценный CMP, GTM-триггеры, скан «до/после», политики'
          },
          {
            name: 'Business',
            description: 'мультидомен/мульти-локаль, кастомные ивенты, white-label отчёты'
          }
        ],
        note: 'точные цены и SLA — после экспресс-диагностики',
        faq: [
          {
            question: 'Чем CMP отличается от «просто баннера»?',
            answer: 'CMP фиксирует действительное согласие по категориям, управляет загрузкой скриптов до согласия и обеспечивает доказуемость (accountability).'
          },
          {
            question: 'Нужна ли кнопка «Отказать» на первом слое?',
            answer: 'В ряде юрисдикций (например, позиция CNIL) отказ должен быть так же прост, как согласие — «Reject all»/«Продолжить без принятия».'
          },
          {
            question: 'Какие cookie можно ставить без согласия?',
            answer: 'Строго необходимые для запрошенной услуги/сессии; все прочие требуют **предварительного** согласия.'
          },
          {
            question: 'Какие риски при несоблюдении?',
            answer: 'Штрафы до 20 млн € или 4 % глобального оборота, плюс предписания DPA.'
          }
        ]
      },
      process: {
        title: 'Implementation Process: From Audit to Validation',
        subtitle: 'Our systematic 5-step approach ensures seamless CMP deployment with minimal disruption to your business operations.',
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
        title: 'DSGVO Cookie-Banner & CMP Einrichtung — C&C CookieComply (EU/EWR)',
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
        title: 'DSGVO Dienstleistungen: CMP Einrichtung & Cookie-Banner Reparaturen',
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
        title: 'Implementierungsprozess: Vom Audit zur Validierung',
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
        title: 'Mise en place CMP & bannières cookies RGPD — C&C CookieComply (UE/EEE)',
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
        title: 'Processus d\'implémentation: De l\'audit à la validation',
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
