import type { Metadata } from 'next'
import { PAGE_METADATA, GDPR_SUBDOMAIN, LOCALES } from '@/lib/locales'

// Generate static layouts for all locales
export async function generateStaticParams() {
  return LOCALES.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  
  const meta = PAGE_METADATA.blog[locale as keyof typeof PAGE_METADATA.blog] || PAGE_METADATA.blog.en

  return {
    title: meta.title,
    description: meta.description,
    keywords: meta.keywords,
    authors: [{ name: 'C&C CookieComply Team' }],
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
      url: `${GDPR_SUBDOMAIN}${locale === 'en' ? '/blog' : `/${locale}/blog`}`,
      siteName: 'C&C CookieComply',
      locale: locale === 'en' ? 'en_US' : locale === 'de' ? 'de_DE' : locale === 'fr' ? 'fr_FR' : 'es_ES',
      type: 'website',
      images: [
        {
          url: `${GDPR_SUBDOMAIN}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: 'C&C CookieComply - GDPR Compliance Blog'
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
      canonical: `${GDPR_SUBDOMAIN}${locale === 'en' ? '/blog' : `/${locale}/blog`}`,
      languages: {
        'en': `${GDPR_SUBDOMAIN}/blog`,
        'de': `${GDPR_SUBDOMAIN}/de/blog`,
        'fr': `${GDPR_SUBDOMAIN}/fr/blog`,
        'es': `${GDPR_SUBDOMAIN}/es/blog`,
        'x-default': `${GDPR_SUBDOMAIN}/blog`
      },
    }
  }
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
