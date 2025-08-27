import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'

const inter = Inter({ subsets: ['latin'] })

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

  return {
    title: titles[locale as keyof typeof titles] || titles.en,
    description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
    openGraph: {
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      url: `https://gdpr.cashandclash.com/${locale}`,
      siteName: 'C&C CookieComply',
      locale: locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : 'fr_FR',
      type: 'website',
      images: [
        {
          url: 'https://gdpr.cashandclash.com/og-image.jpg',
          width: 1200,
          height: 630,
          alt: 'C&C CookieComply - GDPR Compliance Solutions'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale as keyof typeof titles] || titles.en,
      description: descriptions[locale as keyof typeof descriptions] || descriptions.en,
      images: ['https://gdpr.cashandclash.com/og-image.jpg']
    },
    alternates: {
      canonical: `https://gdpr.cashandclash.com/${locale}`,
      languages: {
        'en': 'https://gdpr.cashandclash.com/en',
        'de': 'https://gdpr.cashandclash.com/de',
        'fr': 'https://gdpr.cashandclash.com/fr',
      },
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
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <meta name="theme-color" content="#3B82F6" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}
