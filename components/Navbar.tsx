'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Shield, Globe } from 'lucide-react'
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

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      })
    }
    setIsMenuOpen(false)
  }

  const localeTyped = (locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : 'en') as 'en' | 'de' | 'fr'
  
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
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ]

  const switchLanguage = (newLocale: string) => {
    console.log('Switching language to:', newLocale)
    console.log('Current pathname:', pathname)
    
    // Determine new path
    let newPath = '/'
    
    if (pathname === '/' || pathname === '/en' || pathname === '/de' || pathname === '/fr') {
      // Main page
      newPath = newLocale === 'en' ? '/' : `/${newLocale}/`
    } else {
      // Other pages (e.g. /privacy, /cookies)
      const pathWithoutLocale = pathname.replace(/^\/(en|de|fr)/, '') || '/'
      newPath = newLocale === 'en' ? pathWithoutLocale : `/${newLocale}${pathWithoutLocale}`
    }
    
    console.log('New path will be:', newPath)
    
    // Save language choice in cookie
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`
    
    // Navigate to new page
    console.log('Navigating to:', newPath)
    router.push(newPath)
    setShowLanguageMenu(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-apple border-b border-gray-200/50 dark:border-gray-700/50' 
        : 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Shield className="text-accent" size={28} />
            <span className="text-xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight">
              C&C CookieComply
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-600 dark:text-gray-300 hover:text-accent transition-colors duration-300 font-medium text-sm tracking-wide relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
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
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:text-accent transition-all duration-300 rounded-xl hover:bg-gray-100/50 dark:hover:bg-gray-800/50 border border-gray-200/60 dark:border-gray-700/60 cursor-pointer bg-white/60 dark:bg-gray-800/60 backdrop-blur-xl shadow-sm hover:shadow-apple"
                style={{ minWidth: '60px' }}
                type="button"
              >
                <Globe size={16} />
                <span>{locale.toUpperCase()}</span>
              </button>
              
              {/* Language Dropdown */}
              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white/90 dark:bg-gray-800/90 border border-gray-200/60 dark:border-gray-700/60 rounded-xl shadow-glass backdrop-blur-xl py-2 min-w-[140px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-gray-100/70 dark:hover:bg-gray-700/70 transition-colors rounded-lg mx-1 ${
                        locale === lang.code 
                          ? 'text-accent bg-primary-50/50 dark:bg-primary-900/20' 
                          : 'text-gray-700 dark:text-gray-300'
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
              className="md:hidden p-2 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700">
            <div className="pt-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-left px-4 py-3 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-lg transition-colors font-medium"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-4">
                <div className="px-4 py-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                  Language / Sprache / Langue
                </div>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 rounded-lg transition-colors ${
                        locale === lang.code 
                          ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                          : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800'
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
