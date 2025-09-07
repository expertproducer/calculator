'use client'

import { useEffect } from 'react'
import { GDPR_SUBDOMAIN } from '@/lib/locales'

export default function StructuredData() {
  useEffect(() => {
    // Add structured data to head
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "name": "CookieComply",
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
    
    document.head.appendChild(script)
    
    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
