import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Keep in sync with next.config.js i18n.locales
const locales = ['en', 'de', 'fr', 'es'] as const
const defaultLocale = 'en'

// Middleware for locale redirects
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname
  
  // Skip static files and API routes
  if (pathname.startsWith('/_next') || 
      pathname.startsWith('/api') || 
      pathname.startsWith('/images') ||
      pathname.startsWith('/favicon') ||
      pathname.includes('.')) {
    return
  }
  
  // Check if the pathname has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return

  // Redirect if there is no locale
  const locale = defaultLocale
  return NextResponse.redirect(
    new URL(`/${locale}${pathname}`, request.url)
  )
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    '/((?!_next|api|favicon.ico).*)',
  ],
}
