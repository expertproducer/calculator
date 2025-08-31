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
    <footer className="bg-gradient-to-br from-gray-50 via-white to-blue-50 border-t-2 border-gray-100">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl shadow-2xl">
                <Shield className="text-white w-8 h-8 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
              </div>
              <span className="text-3xl font-black text-gray-900 tracking-tight drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">C&C CookieComply</span>
            </div>
            <p className="text-gray-600 mb-10 max-w-md leading-relaxed text-xl font-semibold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
              {content.footer.description}
            </p>
            <div className="flex flex-col gap-6 text-lg">
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-2xl">
                  <MapPin className="text-white w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                </div>
                <span className="text-gray-700 font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{content.footer.location}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-2xl">
                  <Clock className="text-white w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                </div>
                <span className="text-gray-700 font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{content.footer.workingHours}</span>
              </div>
              <div className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-2xl">
                  <Mail className="text-white w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                </div>
                <span className="text-gray-700 font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">info@cashandclash.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-2xl">
                <Star className="text-white w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.footer.quickLinks}</h3>
            </div>
            <ul className="space-y-6">
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/services`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-lg p-3 rounded-xl hover:bg-blue-50 inline-block font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                  {content.footer.services}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/process`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-lg p-3 rounded-xl hover:bg-blue-50 inline-block font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                  {content.footer.process}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/pricing`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-lg p-3 rounded-xl hover:bg-blue-50 inline-block font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                  {content.footer.pricing}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/faq`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-lg p-3 rounded-xl hover:bg-blue-50 inline-block font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                  {content.footer.faq}
                </Link>
              </li>
              <li>
                <Link href={`${locale === 'en' ? '' : `/${locale}`}/contact`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-lg p-3 rounded-xl hover:bg-blue-50 inline-block font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                  {content.footer.contacts}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Privacy */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-2xl">
                <Shield className="text-white w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">{content.footer.legalInfo}</h3>
            </div>
            <ul className="space-y-6">
              <li>
                <Link href={`/${locale}/privacy`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-lg p-3 rounded-xl hover:bg-blue-50 inline-block font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                  {content.footer.privacyPolicy}
                </Link>
              </li>
              <li>
                <Link href={`/${locale}/cookies`} className="text-gray-600 hover:text-blue-600 transition-all duration-300 text-lg p-3 rounded-xl hover:bg-blue-50 inline-block font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
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
                  className="text-gray-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-4 text-lg p-3 rounded-xl hover:bg-blue-50"
                >
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-2xl">
                    <Settings className="text-white w-6 h-6 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                  </div>
                  <span className="font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{content.footer.cookiePreferences}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t-2 border-gray-100 mt-20 pt-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-gray-600 text-lg font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
              © {currentYear} C&C CookieComply. All rights reserved.
            </div>
            
            <div className="flex items-center gap-8 text-lg">
              <div className="flex items-center gap-3 bg-green-100 text-green-800 px-6 py-3 rounded-full shadow-lg drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                <span className="font-bold">GDPR Compliant</span>
              </div>
              <div className="flex items-center gap-3 bg-blue-100 text-blue-800 px-6 py-3 rounded-full shadow-lg drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                <div className="w-3 h-3 bg-blue-500 rounded-full shadow-lg"></div>
                <span className="font-bold">24/7 Support</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
