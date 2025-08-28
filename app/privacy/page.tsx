import { PAGE_METADATA } from '@/lib/locales'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: PAGE_METADATA.privacy.en.title,
  description: PAGE_METADATA.privacy.en.description,
  alternates: {
    canonical: 'https://cashandclash.com/privacy',
    languages: {
      'en': 'https://cashandclash.com/privacy',
      'de': 'https://cashandclash.com/de/privacy',
      'fr': 'https://cashandclash.com/fr/privacy',
      'x-default': 'https://cashandclash.com/privacy'
    },
  },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
          Privacy Policy
        </h1>
        <div className="prose max-w-none text-gray-700 dark:text-gray-300">
          <p className="text-lg mb-4">
            We protect your personal information and comply with all GDPR requirements. 
            Your data is used only to provide services and is never shared with third parties.
          </p>
          <p className="text-lg mb-4">
            We collect only the information necessary to provide our services: 
            name, email, website URL, and technical project details.
          </p>
          <p className="text-lg mb-4">
            All data is stored securely and deleted upon your request 
            or when the contract expires.
          </p>
          <p className="text-lg mb-4">
            You have the right to access, correct, or delete your personal data at any time.
            Contact us at contact@cashandclash.com for any privacy-related requests.
          </p>
          <p className="text-lg">
            This privacy policy is effective as of the date of publication and may be updated periodically.
          </p>
        </div>
      </div>
    </div>
  )
}
