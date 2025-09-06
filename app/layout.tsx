import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'C&C CookieComply',
  description: 'GDPR CMP Setup & Cookie Banner Fixes',
  manifest: '/manifest.json?v=2.0.0',
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.png', type: 'image/png' }
    ]
  },
  themeColor: '#3B82F6',
  other: {
    'msapplication-TileColor': '#3B82F6',
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'application-name': 'C&C CookieComply',
    'msapplication-TileImage': '/favicon.png',
    'msapplication-config': '/browserconfig.xml'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta httpEquiv="Cache-Control" content="no-cache, no-store, must-revalidate" />
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta httpEquiv="Expires" content="0" />
        
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        
        {/* DNS prefetch */}
        <link rel="dns-prefetch" href="//www.googletagmanager.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
      </head>
      <body suppressHydrationWarning>
        <div className="site-frame">
          {children}
        </div>
      </body>
    </html>
  )
}
