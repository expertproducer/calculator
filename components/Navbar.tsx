'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Shield, Globe, Star } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

export default function Navbar({ locale }: { locale: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showLanguageMenu, setShowLanguageMenu] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (showLanguageMenu && !(event.target as Element).closest('.language-switcher')) {
        setShowLanguageMenu(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    document.addEventListener('click', handleClickOutside)
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showLanguageMenu])

  const navigateToPage = (page: string) => {
    const basePath = locale === 'en' ? '' : `/${locale}`
    router.push(`${basePath}/${page}`)
    setIsMenuOpen(false)
  }

  const localeTyped = (locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : locale === 'es' ? 'es' : 'en') as 'en' | 'de' | 'fr' | 'es'
  
  const translations = {
    en: {
      services: 'Services',
      process: 'Process', 
      pricing: 'Pricing',
      faq: 'FAQ',
      contact: 'Contact'
    },
    de: {
      services: 'Dienstleistungen',
      process: 'Prozess',
      pricing: 'Preise', 
      faq: 'FAQ',
      contact: 'Kontakt'
    },
    fr: {
      services: 'Services',
      process: 'Processus',
      pricing: 'Tarifs',
      faq: 'FAQ', 
      contact: 'Contact'
    },
    es: {
      services: 'Servicios',
      process: 'Proceso',
      pricing: 'Precios',
      faq: 'FAQ',
      contact: 'Contacto'
    }
  }[localeTyped]

  const navItems = [
    { id: 'services', label: translations.services },
    { id: 'process', label: translations.process },
    { id: 'pricing', label: translations.pricing },
    { id: 'faq', label: translations.faq },
    { id: 'contact', label: translations.contact }
  ]

  const languages = [
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'es', name: 'Español', flag: '🇪🇸' }
  ]

  const switchLanguage = (newLocale: string) => {
    console.log('Switching language to:', newLocale)
    console.log('Current pathname:', pathname)
    
    // Determine new path
    let newPath = '/'
    
    // Extract the current page path without locale
    let currentPagePath = '/'
    
    if (pathname === '/' || pathname === '/en' || pathname === '/de' || pathname === '/fr' || pathname === '/es') {
      // Main page
      currentPagePath = '/'
    } else {
      // Other pages - remove locale prefix
      currentPagePath = pathname.replace(/^\/(en|de|fr|es)/, '') || '/'
    }
    
    // Build new path
    if (newLocale === 'en') {
      newPath = currentPagePath
    } else {
      newPath = `/${newLocale}${currentPagePath}`
    }
    
    console.log('Current page path:', currentPagePath)
    console.log('New path will be:', newPath)
    
    // Save language choice in cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
    
    // Navigate to new page
    console.log('Navigating to:', newPath)
    router.push(newPath)
    setShowLanguageMenu(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white shadow-lg border-b border-gray-200' 
        : 'bg-white/95 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => {
              const basePath = locale === 'en' ? '/' : `/${locale}`
              router.push(basePath)
            }}
            className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
          >
            <div className="p-2 bg-blue-600 rounded-lg">
              <Shield className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">
              C&C CookieComply
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-medium text-sm tracking-wide relative group px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative language-switcher">
              <button
                onClick={() => {
                  console.log('Language switcher clicked!')
                  setShowLanguageMenu(!showLanguageMenu)
                }}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-lg hover:bg-blue-50 cursor-pointer border border-gray-200 hover:border-blue-300"
                style={{ minWidth: '70px' }}
                type="button"
              >
                <Globe size={16} className="text-blue-600" />
                <span>{locale.toUpperCase()}</span>
              </button>
              
              {/* Language Dropdown */}
              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-xl shadow-lg py-2 min-w-[160px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full px-4 py-3 text-left text-sm flex items-center gap-3 hover:bg-blue-50 transition-colors rounded-lg mx-1 ${
                        locale === lang.code 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="text-base">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors rounded-lg hover:bg-blue-50"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200">
            <div className="pt-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className="block w-full text-left px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="px-4 py-2 text-sm font-medium text-gray-600 flex items-center gap-2">
                  <Globe size={16} className="text-blue-600" />
                  Language / Sprache / Langue / Idioma
                </div>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 rounded-lg transition-all duration-300 ${
                        locale === lang.code 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:bg-blue-50'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span className="font-medium">{lang.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
