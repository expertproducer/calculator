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
  blog: string
  languagesTitle?: string
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

  const [labels, setLabels] = useState<NavbarLabels>({
    services: '',
    process: '',
    pricing: '',
    faq: '',
    contact: '',
    blog: ''
  })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        console.log('Loading translations for locale:', locale)
        const enContent = await getContent('en')
        const currentContent = await getContent(locale as 'en' | 'de' | 'fr' | 'es')
        const enNav = (enContent?.navbar || {}) as Partial<NavbarLabels>
        const nav = (currentContent?.navbar || {}) as Partial<NavbarLabels>
        if (mounted) {
          console.log('Setting labels:', { ...enNav, ...nav })
          setLabels({ ...enNav, ...nav } as NavbarLabels)
        }
      } catch (error) {
        console.error('Error loading translations:', error)
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
    { id: 'blog', label: labels.blog },
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
      <div className="mx-auto w-full max-w-[1280px] px-0 py-0">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <button 
            onClick={() => {
              const basePath = locale === 'en' ? '/' : `/${locale}`
              router.push(basePath)
            }}
            className="flex items-center gap-4 hover:opacity-80 transition-all duration-300 group transform hover:scale-105"
          >
            <div className="w-16 h-16 bg-transparent rounded-xl overflow-hidden flex items-center justify-center">
              <img src="/logo.svg" alt="CookieComply logo" className="w-full h-full object-contain" />
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigateToPage(item.id)}
                className="text-gray-700 hover:text-blue-600 transition-all duration-300 font-bold text-lg tracking-wide relative group px-2 py-1 rounded-lg hover:bg-blue-50 drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]"
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
                className="flex items-center gap-1 px-2 py-1 text-base font-semibold text-gray-700 hover:text-blue-600 transition-colors rounded-md hover:bg-blue-50 cursor-pointer border border-gray-200 hover:border-blue-300 shadow-sm"
                style={{ minWidth: '64px' }}
                type="button"
              >
                <Globe size={20} className="text-blue-600 drop-shadow-lg [text-shadow:_1px_1px_2px_rgb(0_0_0_/_20%)]" />
                <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{locale.toUpperCase()}</span>
              </button>
              
              {/* Language Dropdown */}
              {showLanguageMenu && (
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg py-1 w-44 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full px-3 py-2 text-left text-base flex items-center gap-2 hover:bg-blue-50 transition-colors rounded-md font-medium ${
                        locale === lang.code 
                          ? 'text-blue-600' 
                          : 'text-gray-700'
                      }`}
                    >
                      <span className="text-lg leading-none w-6 text-center">{lang.flag}</span>
                      <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{lang.name}</span>
                      {locale === lang.code && <span className="ml-auto text-blue-600">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-all duration-300 rounded-xl hover:bg-blue-50 shadow-lg hover:shadow-xl transform hover:scale-105"
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
                  {labels?.languagesTitle || 'Languages'}
                </div>
                <div className="space-y-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`w-full px-4 py-3 text-left flex items-center gap-3 rounded-lg transition-colors font-semibold text-base ${
                        locale === lang.code 
                          ? 'text-blue-600' 
                          : 'text-gray-700 hover:bg-blue-50'
                      }`}
                    >
                      <span className="text-xl w-6 text-center">{lang.flag}</span>
                      <span className="drop-shadow-md [text-shadow:_1px_1px_1px_rgb(0_0_0_/_15%)]">{lang.name}</span>
                      {locale === lang.code && <span className="ml-auto text-blue-600">✓</span>}
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
