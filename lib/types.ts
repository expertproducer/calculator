// Основные типы для контента
export interface HeroContent {
  title: string
  subtitle: string
  description: string
  cta: {
    primary: string
    secondary: string
  }
}

export interface ProblemContent {
  title: string
  subtitle: string
  issues: string[]
}

export interface ServiceContent {
  title: string
  subtitle: string
  services: Array<{
    title: string
    description: string
    icon: string
  }>
}

export interface ProcessContent {
  title: string
  subtitle: string
  steps: Array<{
    number: number
    title: string
    description: string
  }>
}

export interface DeliverablesContent {
  title: string
  subtitle: string
  items: string[]
}

export interface BenefitsContent {
  title: string
  subtitle: string
  benefits: Array<{
    title: string
    description: string
    icon: string
  }>
}

export interface CaseStudy {
  industry: string
  before: string
  after: string
}

export interface CasesContent {
  title: string
  subtitle: string
  cases: CaseStudy[]
}

export interface PricingContent {
  title: string
  subtitle: string
  plans: Array<{
    name: string
    price: string
    features: string[]
    cta: string
  }>
}

export interface FAQItem {
  question: string
  answer: string
}

export interface FAQContent {
  title: string
  subtitle: string
  items: FAQItem[]
}

export interface ContactFields {
  name: string
  email: string
  url: string
  stack: string
  regions: string
  languages: string
  cmp: string
  integrations: string
  message: string
}

export interface ContactContent {
  title: string
  subtitle: string
  fields: ContactFields
  submit: string
}

export interface FooterContent {
  copyright: string
  links: string[]
}

export interface PageContent {
  hero: HeroContent
  problem: ProblemContent
  services: ServiceContent
  process: ProcessContent
  deliverables: DeliverablesContent
  benefits: BenefitsContent
  cases: CasesContent
  pricing: PricingContent
  faq: FAQContent
  contact: ContactContent
  footer: FooterContent
}

// Типы для форм
export interface ContactFormData {
  name: string
  email: string
  url: string
  stack: string
  regions: string
  languages: string
  preferredCmp?: string
  integrations?: string
  message: string
  honeypot: string
  locale: string
  timestamp: string
  userAgent: string
}

// Типы для cookies
export interface CookiePreferences {
  essential: boolean
  analytics: boolean
  marketing: boolean
  functional: boolean
}

// Типы для API
export interface ApiResponse {
  success: boolean
  message: string
  data?: any
}

// Типы для локализации
export type Locale = 'en' | 'de' | 'fr'

// Типы для метаданных
export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  openGraph?: {
    title: string
    description: string
    url: string
    image?: string
  }
  twitter?: {
    card: string
    title: string
    description: string
    image?: string
  }
}

// Типы для навигации
export interface NavItem {
  id: string
  label: string
  href?: string
}

// Типы для компонентов
export interface ComponentProps {
  content: any
  locale?: Locale
  className?: string
}

// Типы для SEO
export interface SEOData {
  title: string
  description: string
  canonical: string
  hreflang: Record<string, string>
  structuredData?: any
}

// Типы для производительности
export interface PerformanceMetrics {
  firstContentfulPaint: number
  largestContentfulPaint: number
  firstInputDelay: number
  cumulativeLayoutShift: number
}

// Типы для аналитики
export interface AnalyticsEvent {
  event: string
  category: string
  action: string
  label?: string
  value?: number
}

// Типы для доступности
export interface AccessibilityFeatures {
  highContrast: boolean
  reducedMotion: boolean
  screenReader: boolean
  keyboardNavigation: boolean
}
