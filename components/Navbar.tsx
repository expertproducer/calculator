'use client'

import { useState, useEffect } from 'react'
import { Menu, X, Shield, Globe, Star } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { getContent } from '@/lib/i18n'

type NavbarLabels = {
  services: string
  process: string
  pricing: string
  faq: string
  contact: string
}

const EN_FALLBACK: NavbarLabels = {
  services: 'Services',
  process: 'Process',
  pricing: 'Pricing',
  faq: 'FAQ',
  contact: 'Contact'
}

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

  const [labels, setLabels] = useState<NavbarLabels>(EN_FALLBACK)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const content = await getContent((locale === 'de' ? 'de' : locale === 'fr' ? 'fr' : locale === 'es' ? 'es' : 'en') as any)
        const nav = (content?.navbar || {}) as Partial<NavbarLabels>
        if (mounted) {
          setLabels({ ...EN_FALLBACK, ...nav })
        }
      } catch {
        // ignore and keep fallback
      }
    })()
    return () => {
      mounted = false
    }
  }, [locale])

  const navigateToPage = (page: string) => {
    const basePath = locale === 'en' ? '' : `/${locale}`
    router.push(`${basePath}/${page}`)
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: 'services', label: labels.services },
    { id: 'process', label: labels.process },
    { id: 'pricing', label: labels.pricing },
    { id: 'faq', label: labels.faq },
    { id: 'contact', label: labels.contact }
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
        ? 'bg-white/95 backdrop-blur-sm shadow-2xl border-b border-gray-100' 
        : 'bg-white/90 backdrop-blur-sm'
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => {
              const basePath = locale === 'en' ? '/' : `/${locale}`
              router.push(basePath)
            }}
            className="flex items-center gap-4 hover:opacity-80 transition-all duration-300 group transform hover:scale-105"
          >
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-2xl">
              <Shield className="text-white w-7 h-7 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
            </div>
            <span className="text-2xl font-black text-gray-900 tracking-tight drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]">
              C&C CookieComply
            </span>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-bold text-lg tracking-wide relative group px-6 py-3 rounded-xl hover:bg-blue-50 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]"
              >
                {item.label}
                <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300 group-hover:w-full rounded-full"></span>
              </button>
            ))}
          </div>

          {/* Language Switcher & Mobile Menu Button */}
          <div className="flex items-center gap-6">
            {/* Language Switcher */}
            <div className="relative language-switcher">
              <button
                onClick={() => {
                  console.log('Language switcher clicked!')
                  setShowLanguageMenu(!showLanguageMenu)
                }}
                className="flex items-center gap-3 px-6 py-3 text-lg font-bold text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-blue-50 cursor-pointer border-2 border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                style={{ minWidth: '80px' }}
                type="button"
              >
                <Globe size={20} className="text-blue-600 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{locale.toUpperCase()}</span>
              </button>
              
              {/* Language Dropdown */}
              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-3 bg-white border-2 border-gray-100 rounded-2xl shadow-2xl py-3 min-w-[180px] z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full px-6 py-4 text-left text-lg flex items-center gap-4 hover:bg-blue-50 transition-all duration-300 rounded-xl mx-2 font-bold ${
                        locale === lang.code 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="text-xl">{lang.flag}</span>
                      <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-3 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {isMenuOpen ? <X size={28} className="drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" /> : <Menu size={28} className="drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-6 border-t-2 border-gray-100">
            <div className="pt-6 space-y-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigateToPage(item.id)}
                  className="block w-full text-left px-6 py-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all duration-300 font-bold text-lg drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]"
                >
                  {item.label}
                </button>
              ))}
              
              {/* Mobile Language Switcher */}
              <div className="border-t-2 border-gray-100 pt-6 mt-6">
                <div className="px-6 py-3 text-lg font-bold text-gray-600 flex items-center gap-3 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">
                  <Globe size={20} className="text-blue-600 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                  Language / Sprache / Langue / Idioma
                </div>
                <div className="space-y-2">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full px-6 py-4 text-left flex items-center gap-4 rounded-xl transition-all duration-300 font-bold text-lg ${
                        locale === lang.code 
                          ? 'text-blue-600 bg-blue-50' 
                          : 'text-gray-700 hover:bg-blue-50'
                      }`}
                    >
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{lang.name}</span>
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
