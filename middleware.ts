import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Keep in sync with next.config.js i18n.locales
const locales = ['en', 'de', 'fr', 'es'] as const
const defaultLocale = 'en'

// Middleware temporarily disabled for static export
// This file handles locale redirects but is incompatible with output: 'export'
// For static export, locale handling is done through generateStaticParams

export function middleware() {
  // Disabled for static export
  return
}

export const config = {
  matcher: []
}
