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
        ? 'bg-transparent' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => {
              const basePath = locale === 'en' ? '/' : `/${locale}`
              router.push(basePath)
            }}
            className="flex items-center gap-3 hover:opacity-80 transition-all duration-300 group"
          >
            <span className="text-xl font-bold text-white tracking-tight drop-shadow-lg">
              C&C
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className="text-white hover:text-cyan-400 transition-all duration-300 font-medium text-sm tracking-wide relative group px-3 py-2 rounded-lg hover:bg-cyan-400/10"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 transition-all duration-300 group-hover:w-full"></span>
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
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-white hover:text-cyan-400 transition-all duration-300 rounded-xl hover:bg-cyan-400/10 cursor-pointer bg-transparent shadow-sm hover:shadow-md"
                style={{ minWidth: '60px' }}
                type="button"
              >
                <div className="p-1 bg-transparent rounded-lg">
                  <Globe size={14} className="text-cyan-400" />
                </div>
                <span>{locale.toUpperCase()}</span>
              </button>
              
              {/* Language Dropdown */}
              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 bg-transparent border border-cyan-400/30 rounded-xl shadow-lg py-2 min-w-[140px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                                             className={`w-full px-4 py-2 text-left text-sm flex items-center gap-3 hover:bg-cyan-400/10 transition-colors rounded-lg mx-1 ${
                         locale === lang.code 
                           ? 'text-cyan-400 bg-cyan-400/20' 
                           : 'text-white'
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
                             className="md:hidden p-2 text-white hover:text-cyan-400 transition-colors rounded-lg hover:bg-cyan-400/10"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-200/50 dark:border-gray-700/50">
            <div className="pt-4 space-y-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                                     className="block w-full text-left px-4 py-3 text-white hover:text-cyan-400 hover:bg-cyan-400/10 rounded-lg transition-all duration-300 font-medium"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Language Switcher */}
                             <div className="border-t border-cyan-400/30 pt-4 mt-4">
                 <div className="px-4 py-2 text-sm font-medium text-cyan-300 flex items-center gap-2">
                   <div className="p-1 bg-transparent rounded-lg">
                     <Globe size={14} className="text-cyan-400" />
                   </div>
                   Language / Sprache / Langue
                 </div>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                                             className={`w-full px-4 py-3 text-left flex items-center gap-3 rounded-lg transition-all duration-300 ${
                         locale === lang.code 
                           ? 'text-cyan-400 bg-cyan-400/20' 
                           : 'text-white hover:bg-cyan-400/10'
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
