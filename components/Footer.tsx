'use client'

import Link from 'next/link'
import { Shield, MapPin, Clock, Settings, Star, Mail, Phone } from 'lucide-react'

export default function Footer({ content, locale }: { content: any; locale: string }) {
  const currentYear = new Date().getFullYear()

  // Protection from undefined content
  if (!content || !content.footer) {
    return null
  }

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 bg-blue-600 rounded-xl">
                <Shield className="text-white w-8 h-8" />
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">C&C CookieComply</span>
            </div>
            <p className="text-gray-600 mb-8 max-w-md leading-relaxed text-lg">
              {content.footer.description}
            </p>
            <div className="flex flex-col gap-4 text-sm">
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="p-2 bg-green-600 rounded-lg">
                  <MapPin className="text-white w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">{content.footer.location}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="p-2 bg-purple-600 rounded-lg">
                  <Clock className="text-white w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">{content.footer.workingHours}</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 hover:shadow-md transition-all duration-300">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Mail className="text-white w-5 h-5" />
                </div>
                <span className="text-gray-700 font-medium">info@cashandclash.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Star className="text-white w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">{content.footer.quickLinks}</h3>
            </div>
            <ul className="space-y-4">
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/services`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm p-2 rounded-lg hover:bg-blue-50 inline-block font-medium">
                  {content.footer.services}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/process`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm p-2 rounded-lg hover:bg-blue-50 inline-block font-medium">
                  {content.footer.process}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/pricing`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm p-2 rounded-lg hover:bg-blue-50 inline-block font-medium">
                  {content.footer.pricing}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/faq`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm p-2 rounded-lg hover:bg-blue-50 inline-block font-medium">
                  {content.footer.faq}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/contact`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm p-2 rounded-lg hover:bg-blue-50 inline-block font-medium">
                  {content.footer.contacts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-600 rounded-lg">
                <Shield className="text-white w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">{content.footer.legalInfo}</h3>
            </div>
            <ul className="space-y-4">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm p-2 rounded-lg hover:bg-blue-50 inline-block font-medium">
                  {content.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-sm p-2 rounded-lg hover:bg-blue-50 inline-block font-medium">
                  {content.footer.cookiePolicy}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    // Open cookie settings
                    const event = new CustomEvent('openCookiePreferences')
                    window.dispatchEvent(event)
                  }}
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-blue-50"
                >
                  <div className="p-2 bg-purple-600 rounded-lg">
                    <Settings className="text-white w-5 h-5" />
                  </div>
                  <span className="font-medium">{content.footer.cookiePreferences}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-200 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm font-medium">
              © {currentYear} C&C CookieComply. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 bg-green-100 text-green-800 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="font-medium">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="font-medium">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
