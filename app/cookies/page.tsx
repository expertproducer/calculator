import { PAGE_METADATA } from '@/lib/locales'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: PAGE_METADATA.cookies.en.title,
  description: PAGE_METADATA.cookies.en.description,
  alternates: {
    canonical: 'https://cashandclash.com/cookies',
    languages: {
      'en': 'https://cashandclash.com/cookies',
      'de': 'https://cashandclash.com/de/cookies',
      'fr': 'https://cashandclash.com/fr/cookies',
      'x-default': 'https://cashandclash.com/cookies'
    },
  },
}

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Cookie Policy
        </h1>
        <div className="prose max-w-none text-gray-700 dark:text-gray-300">
          <p className="text-lg mb-4">
            We use cookies to improve website functionality and analyze traffic. 
            By continuing to use the site, you agree to our cookie policy.
          </p>
          <p className="text-lg mb-4">
            Cookies are small text files stored on your device that help us 
            improve user experience and provide personalized content.
          </p>
          <p className="text-lg mb-4">
            We use the following types of cookies:
          </p>
          <ul className="list-disc pl-6 mb-4 text-lg">
            <li><strong>Essential cookies:</strong> Required for basic site functionality</li>
            <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
            <li><strong>Preference cookies:</strong> Remember your settings and preferences</li>
          </ul>
          <p className="text-lg mb-4">
            You can disable cookies in your browser settings, 
            but this may affect website functionality.
          </p>
          <p className="text-lg">
            For more information about our cookie usage, contact us at contact@cashandclash.com
          </p>
        </div>
      </div>
    </div>
  )
}
