import type { MetadataRoute } from "next";
import { GDPR_SUBDOMAIN, fullUrlFor, LOCALES } from "@/lib/locales";

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  
  // Main pages for each locale
  const mainPages = [
    { slug: '', priority: 1.0, changeFreq: 'weekly' as const },
    { slug: '/blog', priority: 0.9, changeFreq: 'daily' as const },
    { slug: '/contact', priority: 0.8, changeFreq: 'monthly' as const },
    { slug: '/services', priority: 0.8, changeFreq: 'weekly' as const },
    { slug: '/cases', priority: 0.7, changeFreq: 'weekly' as const },
    { slug: '/privacy', priority: 0.3, changeFreq: 'yearly' as const },
    { slug: '/cookies', priority: 0.3, changeFreq: 'yearly' as const },
  ]

  // Blog posts
  const blogPosts = [
    'gdpr-consent-mode-v2-2025',
    'cookie-banner-best-practices', 
    'cmp-comparison-2025',
    'gdpr-compliance-checklist-2025'
  ]

  const sitemapEntries: MetadataRoute.Sitemap = []

  // Add main pages for all locales
  for (const page of mainPages) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: fullUrlFor(locale, page.slug),
        lastModified: currentDate,
        changeFrequency: page.changeFreq,
        priority: page.priority,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map(loc => [
              loc === 'en' ? 'x-default' : loc,
              fullUrlFor(loc, page.slug)
            ])
          )
        }
      })
    }
  }

  // Add blog posts for all locales
  for (const post of blogPosts) {
    for (const locale of LOCALES) {
      sitemapEntries.push({
        url: fullUrlFor(locale, `/blog/${post}`),
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
        alternates: {
          languages: Object.fromEntries(
            LOCALES.map(loc => [
              loc === 'en' ? 'x-default' : loc,
              fullUrlFor(loc, `/blog/${post}`)
            ])
          )
        }
      })
    }
  }

  return sitemapEntries
}
