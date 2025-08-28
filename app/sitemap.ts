import type { MetadataRoute } from "next";
import { GDPR_SUBDOMAIN, fullUrlFor } from "@/lib/locales";

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();
  
  return [
    // Главные страницы
    {
      url: `${GDPR_SUBDOMAIN}/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 1,
      alternates: {
        languages: {
          en: `${GDPR_SUBDOMAIN}/`,
          de: `${GDPR_SUBDOMAIN}/de/`,
          fr: `${GDPR_SUBDOMAIN}/fr/`,
        },
      },
    },
    {
      url: `${GDPR_SUBDOMAIN}/de/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${GDPR_SUBDOMAIN}/`,
          de: `${GDPR_SUBDOMAIN}/de/`,
          fr: `${GDPR_SUBDOMAIN}/fr/`,
        },
      },
    },
    {
      url: `${GDPR_SUBDOMAIN}/fr/`,
      lastModified: currentDate,
      changeFrequency: "weekly",
      priority: 0.9,
      alternates: {
        languages: {
          en: `${GDPR_SUBDOMAIN}/`,
          de: `${GDPR_SUBDOMAIN}/de/`,
          fr: `${GDPR_SUBDOMAIN}/fr/`,
        },
      },
    },
    
    // Страницы политик
    {
      url: `${GDPR_SUBDOMAIN}/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${GDPR_SUBDOMAIN}/privacy`,
          de: `${GDPR_SUBDOMAIN}/de/privacy`,
          fr: `${GDPR_SUBDOMAIN}/fr/privacy`,
        },
      },
    },
    {
      url: `${GDPR_SUBDOMAIN}/de/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${GDPR_SUBDOMAIN}/privacy`,
          de: `${GDPR_SUBDOMAIN}/de/privacy`,
          fr: `${GDPR_SUBDOMAIN}/fr/privacy`,
        },
      },
    },
    {
      url: `${GDPR_SUBDOMAIN}/fr/privacy`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${GDPR_SUBDOMAIN}/privacy`,
          de: `${GDPR_SUBDOMAIN}/de/privacy`,
          fr: `${GDPR_SUBDOMAIN}/fr/privacy`,
        },
      },
    },
    
    {
      url: `${GDPR_SUBDOMAIN}/cookies`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${GDPR_SUBDOMAIN}/cookies`,
          de: `${GDPR_SUBDOMAIN}/de/cookies`,
          fr: `${GDPR_SUBDOMAIN}/fr/cookies`,
        },
      },
    },
    {
      url: `${GDPR_SUBDOMAIN}/de/cookies`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${GDPR_SUBDOMAIN}/cookies`,
          de: `${GDPR_SUBDOMAIN}/de/cookies`,
          fr: `${GDPR_SUBDOMAIN}/fr/cookies`,
        },
      },
    },
    {
      url: `${GDPR_SUBDOMAIN}/fr/cookies`,
      lastModified: currentDate,
      changeFrequency: "monthly",
      priority: 0.7,
      alternates: {
        languages: {
          en: `${GDPR_SUBDOMAIN}/cookies`,
          de: `${GDPR_SUBDOMAIN}/de/cookies`,
          fr: `${GDPR_SUBDOMAIN}/fr/cookies`,
        },
      },
    },
  ];
}
