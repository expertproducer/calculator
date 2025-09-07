'use client'

import Link from 'next/link'
import { Shield, Settings, Star, Mail } from 'lucide-react'

export default function Footer({ content, locale }: { content: any; locale: string }) {
  const currentYear = new Date().getFullYear()

  // Protection from undefined content
  if (!content || !content.footer) {
    return null
  }

  return (
    <footer className="bg-gray-900 border-t-2 border-gray-800">
      {/* Main Footer */}
      <div className="mx-auto w-full max-w-[1280px] px-5 py-3">
        {/* Верхняя строка: все ссылки и элементы в одну линию */}
        <div className="flex flex-wrap justify-center items-center gap-2 mb-2">
          <Link href={`${locale === 'en' ? '' : `/${locale}`}/services`} className="text-gray-200 hover:text-blue-300 transition-all duration-300 text-base px-2 py-1 rounded-lg hover:bg-blue-900/30 font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
            {content.footer.services}
          </Link>
          <Link href={`${locale === 'en' ? '' : `/${locale}`}/process`} className="text-gray-200 hover:text-blue-300 transition-all duration-300 text-base px-2 py-1 rounded-lg hover:bg-blue-900/30 font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
            {content.footer.process}
          </Link>
          <Link href={`${locale === 'en' ? '' : `/${locale}`}/pricing`} className="text-gray-200 hover:text-blue-300 transition-all duration-300 text-base px-2 py-1 rounded-lg hover:bg-blue-900/30 font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
            {content.footer.pricing}
          </Link>
          <Link href={`${locale === 'en' ? '' : `/${locale}`}/faq`} className="text-gray-200 hover:text-blue-300 transition-all duration-300 text-base px-2 py-1 rounded-lg hover:bg-blue-900/30 font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
            {content.footer.faq}
          </Link>
          <Link href={`${locale === 'en' ? '' : `/${locale}`}/contact`} className="text-gray-200 hover:text-blue-300 transition-all duration-300 text-base px-2 py-1 rounded-lg hover:bg-blue-900/30 font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
            {content.footer.contacts}
          </Link>
          <Link href={`/${locale}/privacy`} className="text-gray-200 hover:text-blue-300 transition-all duration-300 text-base px-2 py-1 rounded-lg hover:bg-blue-900/30 font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
            {content.footer.privacyPolicy}
          </Link>
          <Link href={`/${locale}/cookies`} className="text-gray-200 hover:text-blue-300 transition-all duration-300 text-base px-2 py-1 rounded-lg hover:bg-blue-900/30 font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
            {content.footer.cookiePolicy}
          </Link>
          <button 
            onClick={() => {
              const event = new CustomEvent('openCookiePreferences')
              window.dispatchEvent(event)
            }}
            className="text-gray-200 hover:text-blue-300 transition-all duration-300 flex items-center gap-1 text-base px-2 py-1 rounded-lg hover:bg-blue-900/30 font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]"
          >
            {content.footer.cookiePreferences}
          </button>
        </div>

        {/* Нижняя строка: копирайт и email по центру */}
        <div className="mx-auto flex flex-row justify-center items-center border-t-2 border-gray-800 pt-2 gap-4 px-4">
          <div className="text-gray-200 text-sm font-bold drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
            © {currentYear} CookieComply. {content.footer.allRightsReserved}
          </div>
          <span className="text-gray-100 font-bold px-2 py-1 rounded-lg bg-gray-800 border border-gray-700">team@cookiecomply.site</span>
        </div>
      </div>
    </footer>
  )
}
