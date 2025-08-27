import { MetadataRoute } from 'next'
import { GDPR_SUBDOMAIN } from '@/lib/locales'

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/_next/', '/admin/'],
      },
    ],
    sitemap: `${GDPR_SUBDOMAIN}/sitemap.xml`,
    host: GDPR_SUBDOMAIN,
  }
}
