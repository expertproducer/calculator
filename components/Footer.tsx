'use client'

import Link from 'next/link'
import { Shield, MapPin, Clock, Settings, Star } from 'lucide-react'

export default function Footer({ content, locale }: { content: any; locale: string }) {
  const currentYear = new Date().getFullYear()

  // Защита от undefined content
  if (!content || !content.footer) {
    return null
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 backdrop-blur-xl text-white border-t border-gray-700/50">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 bg-gradient-to-br from-blue-100/20 to-blue-200/20 dark:from-blue-900/40 dark:to-blue-800/40 rounded-xl">
                <Shield className="text-blue-400" size={24} />
              </div>
              <span className="text-xl font-semibold tracking-tight">C&C CookieComply</span>
            </div>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed font-light">
              {content.footer.description}
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className="p-1 bg-gradient-to-br from-green-100/20 to-green-200/20 dark:from-green-900/40 dark:to-green-800/40 rounded-lg">
                  <MapPin className="text-green-400" size={16} />
                </div>
                <span>{content.footer.location}</span>
              </div>
              <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-all duration-300">
                <div className="p-1 bg-gradient-to-br from-purple-100/20 to-purple-200/20 dark:from-purple-900/40 dark:to-purple-800/40 rounded-lg">
                  <Clock className="text-purple-400" size={16} />
                </div>
                <span>{content.footer.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1 bg-gradient-to-br from-blue-100/20 to-blue-200/20 dark:from-blue-900/40 dark:to-blue-800/40 rounded-lg">
                <Star className="text-blue-400" size={16} />
              </div>
              <h3 className="text-lg font-medium text-gray-200 tracking-tight">{content.footer.quickLinks}</h3>
            </div>
            <ul className="space-y-4">
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/services`} className="text-gray-400 hover:text-white transition-all duration-300 text-sm p-2 rounded-lg hover:bg-white/5 inline-block">
                  {content.footer.services}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/process`} className="text-gray-400 hover:text-white transition-all duration-300 text-sm p-2 rounded-lg hover:bg-white/5 inline-block">
                  {content.footer.process}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/pricing`} className="text-gray-400 hover:text-white transition-all duration-300 text-sm p-2 rounded-lg hover:bg-white/5 inline-block">
                  {content.footer.pricing}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/faq`} className="text-gray-400 hover:text-white transition-all duration-300 text-sm p-2 rounded-lg hover:bg-white/5 inline-block">
                  {content.footer.faq}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/contact`} className="text-gray-400 hover:text-white transition-all duration-300 text-sm p-2 rounded-lg hover:bg-white/5 inline-block">
                  {content.footer.contacts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="p-1 bg-gradient-to-br from-green-100/20 to-green-200/20 dark:from-green-900/40 dark:to-green-800/40 rounded-lg">
                <Star className="text-green-400" size={16} />
              </div>
              <h3 className="text-lg font-medium text-gray-200 tracking-tight">{content.footer.legalInfo}</h3>
            </div>
            <ul className="space-y-4">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white transition-all duration-300 text-sm p-2 rounded-lg hover:bg-white/5 inline-block">
                  {content.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`} className="text-gray-400 hover:text-white transition-all duration-300 text-sm p-2 rounded-lg hover:bg-white/5 inline-block">
                  {content.footer.cookiePolicy}
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => {
                    // Открываем настройки cookies
                    const event = new CustomEvent('openCookiePreferences')
                    window.dispatchEvent(event)
                  }}
                  className="text-gray-400 hover:text-white transition-all duration-300 flex items-center gap-2 text-sm p-2 rounded-lg hover:bg-white/5"
                >
                  <div className="p-1 bg-gradient-to-br from-purple-100/20 to-purple-200/20 dark:from-purple-900/40 dark:to-purple-800/40 rounded-lg">
                    <Settings className="text-purple-400" size={16} />
                  </div>
                  {content.footer.cookiePreferences}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700/50 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © {currentYear} C&C CookieComply. All rights reserved.
            </div>
            
            <div className="flex items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <span>24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
