'use client'

import Link from 'next/link'
import { Shield, MapPin, Clock, Settings } from 'lucide-react'

export default function Footer({ content, locale }: { content: any; locale: string }) {
  const currentYear = new Date().getFullYear()

  // Защита от undefined content
  if (!content || !content.footer) {
    return null
  }

  return (
    <footer className="bg-gray-900/95 backdrop-blur-xl text-white border-t border-gray-800/50">
      {/* Main Footer */}
      <div className="container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-8">
              <Shield className="text-gray-400" size={24} />
              <span className="text-xl font-semibold tracking-tight">C&C CookieComply</span>
            </div>
            <p className="text-gray-300 mb-8 max-w-md leading-relaxed font-light">
              {content.footer.description}
            </p>
            <div className="flex flex-col gap-3 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <MapPin className="text-gray-500" size={16} />
                <span>{content.footer.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="text-gray-500" size={16} />
                <span>{content.footer.workingHours}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-gray-200 tracking-tight">{content.footer.quickLinks}</h3>
            <ul className="space-y-4">
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/services`} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  {content.footer.services}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/process`} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  {content.footer.process}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/pricing`} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  {content.footer.pricing}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/faq`} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  {content.footer.faq}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/contact`} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  {content.footer.contacts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <h3 className="text-lg font-medium mb-6 text-gray-200 tracking-tight">{content.footer.legalInfo}</h3>
            <ul className="space-y-4">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
                  {content.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`} className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
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
                  className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2 text-sm"
                >
                  <Settings className="text-gray-500" size={16} />
                  {content.footer.cookiePreferences}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800/50">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-gray-300 text-sm font-medium">
              © {currentYear} C&C CookieComply by Cash & Clash. {content.footer.allRightsReserved}
            </p>
            
            <div className="flex items-center gap-8 text-sm text-gray-300">
              <Link href={`/${locale}/privacy`} className="hover:text-white transition-colors duration-300">
                {content.footer.links[0]}
              </Link>
              <Link href={`/${locale}/cookies`} className="hover:text-white transition-colors duration-300">
                {content.footer.links[1]}
              </Link>
                              <button 
                  onClick={() => {
                    const event = new CustomEvent('openCookiePreferences')
                    window.dispatchEvent(event)
                  }}
                  className="hover:text-white transition-colors duration-300"
                >
                  Cookie Preferences
                </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
