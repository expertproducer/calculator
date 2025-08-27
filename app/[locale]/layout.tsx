import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const titles = {
    en: 'C&C CookieComply — GDPR CMP Setup & Cookie Banner Fixes',
    de: 'C&C CookieComply — GDPR CMP Einrichtung & Cookie-Banner Reparaturen',
    fr: 'C&C CookieComply — Configuration CMP GDPR & Corrections de Bannières de Cookies'
  }
  
  const descriptions = {
    en: 'We set up CMP, fix cookie banners, block trackers before consent, and log consent properly. Professional GDPR compliance solutions for businesses.',
    de: 'Wir richten CMP ein, reparieren Cookie-Banner, blockieren Tracker vor der Zustimmung und protokollieren die Zustimmung ordnungsgemäß.',
    fr: 'Nous configurons CMP, corrigeons les bannières de cookies, bloquons les trackers avant le consentement et enregistrons le consentement correctement.'
  }

  const baseUrl = 'https://gdpr.cashandclash.com'

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof titles] || descriptions.en,
    keywords: ['GDPR compliance', 'CMP setup', 'cookie banner', 'consent management', 'privacy compliance'],
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
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof titles] || descriptions.en,
      url: `${baseUrl}/${locale}`,
      siteName: 'C&C CookieComply',
      locale: locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: `${baseUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'C&C CookieComply - GDPR Compliance Solutions'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof titles] || descriptions.en,
      images: [`${baseUrl}/og-image.jpg`],
      creator: '@cashandclash',
      site: '@cashandclash'
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'en': `${baseUrl}/en`,
        'de': `${baseUrl}/de`,
        'fr': `${baseUrl}/fr`,
        'x-default': `${baseUrl}/en`
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
  const baseUrl = 'https://gdpr.cashandclash.com'
  
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="msapplication-TileColor" content="#3B82F6" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* Hreflang tags */}
        <link rel="alternate" href={`${baseUrl}/en`} hrefLang="en" />
        <link rel="alternate" href={`${baseUrl}/de`} hrefLang="de" />
        <link rel="alternate" href={`${baseUrl}/fr`} hrefLang="fr" />
        <link rel="alternate" href={`${baseUrl}/en`} hrefLang="x-default" />
        
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
              "url": baseUrl,
              "logo": `${baseUrl}/logo.svg`,
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
