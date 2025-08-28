import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { PAGE_METADATA, GDPR_SUBDOMAIN } from '@/lib/locales'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

// Генерируем статические layout'ы для всех локалей
export async function generateStaticParams() {
  return [
    { locale: 'en' },
    { locale: 'de' },
    { locale: 'fr' }
  ]
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const meta = PAGE_METADATA.home[locale as keyof typeof PAGE_METADATA.home] || PAGE_METADATA.home.en

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: 'C&C CookieComply' }],
    creator: 'C&C CookieComply',
    publisher: 'C&C CookieComply',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${GDPR_SUBDOMAIN}${locale === 'en' ? '/' : `/${locale}/`}`,
      siteName: 'C&C CookieComply',
      locale: locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: `${GDPR_SUBDOMAIN}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'C&C CookieComply - GDPR Compliance Solutions'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`${GDPR_SUBDOMAIN}/og-image.jpg`],
      creator: '@cashandclash',
      site: '@cashandclash'
    },
    alternates: {
      canonical: `${GDPR_SUBDOMAIN}${locale === 'en' ? '/' : `/${locale}/`}`,
      languages: {
        'en': `${GDPR_SUBDOMAIN}/`,
        'de': `${GDPR_SUBDOMAIN}/de/`,
        'fr': `${GDPR_SUBDOMAIN}/fr/`,
        'x-default': `${GDPR_SUBDOMAIN}/`
      },
    },
    verification: {
      google: 'your-google-verification-code',
      yandex: 'your-yandex-verification-code'
    }
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json?v=2.0.0" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="application-name" content="Financial Calculators" />
        <meta name="msapplication-TileImage" content="/favicon.png" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Hreflang tags */}
        <link rel="alternate" href={`${GDPR_SUBDOMAIN}/`} hrefLang="en" />
        <link rel="alternate" href={`${GDPR_SUBDOMAIN}/de/`} hrefLang="de" />
        <link rel="alternate" href={`${GDPR_SUBDOMAIN}/fr/`} hrefLang="fr" />
        <link rel="alternate" href={`${GDPR_SUBDOMAIN}/`} hrefLang="x-default" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "C&C CookieComply",
              "url": GDPR_SUBDOMAIN,
              "logo": `${GDPR_SUBDOMAIN}/logo.svg`,
              "description": "Professional GDPR compliance solutions for businesses",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "EU"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "email": "contact@cashandclash.com"
              },
              "sameAs": [
                "https://twitter.com/cashandclash",
                "https://linkedin.com/company/cashandclash"
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} ${inter.variable}`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
