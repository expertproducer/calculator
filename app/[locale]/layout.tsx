import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import { PAGE_METADATA, GDPR_SUBDOMAIN, LOCALES } from '@/lib/locales'
import StructuredData from '@/components/StructuredData'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
})

// Generate static layouts for all locales
export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
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
      locale: locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : locale === 'fr' ? 'fr_FR' : 'es_ES',
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
        'es': `${GDPR_SUBDOMAIN}/es/`,
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
    <div className={`${inter.className} ${inter.variable}`}>
      <StructuredData />
      {children}
    </div>
  )
}
